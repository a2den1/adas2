// 스프링 물리. 값과 속도를 가지고 목표로 움직이며, 도중에 목표가 바뀌어도 속도를 그대로 이어받는다.
import { speed } from './animate.js';

/** 전체 움직임 설정. bounce: 0(튕김 없음)~1(기본)~1.5, 바꾸면 setMotion() 으로 */
export const motion = { bounce: 1 };

/** 스프링 종류. k: 강성(클수록 빠름), z: 감쇠비(1 이면 안 튕김, 작을수록 많이 튕김) */
export const SPRINGS = {
  snap: { k: 800, z: 0.6 },    // 작은 것: 손잡이, 누름
  move: { k: 380, z: 0.72 },   // 보통: 선택 표시, 판
  slow: { k: 200, z: 0.8 },    // 큰 것: 서랍, 화면
  fx: { k: 1600, z: 1 },       // 색·투명도처럼 튕기면 안 되는 것
  fxFast: { k: 3800, z: 1 },
};
const cfgOf = c => (typeof c === 'string' ? SPRINGS[c] || SPRINGS.move : c);
const zOf = c => Math.min(1, Math.max(0.2, 1 - (1 - c.z) * motion.bounce));

const active = new Set();
let raf = 0, last = 0, dog = 0;
const still = () => typeof document === 'undefined' || document.hidden || speed() >= 100;

function frame(now) {
  raf = 0;
  // 프레임이 늦게 와도 실제 흐른 시간만큼 나아간다(안에서 4ms 씩 잘게 나눠 계산하므로 길어도 안정적이다)
  const dt = Math.min(1, Math.max(0.001, (now - last) / 1000));
  last = now;
  for (const s of [...active]) s.step(dt);
  if (active.size) raf = requestAnimationFrame(frame);
  else if (dog) { clearInterval(dog); dog = 0; }
}
function wake() {
  if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); }
  // 프레임이 늦게 오는 환경을 위한 보조 타이머. 움직이는 것이 있을 때만 켠다
  if (!dog) dog = setInterval(() => { if (active.size && performance.now() - last > 120) { cancelAnimationFrame(raf); raf = 0; frame(performance.now()); } }, 100);
}
if (typeof document !== 'undefined') document.addEventListener('visibilitychange', () => { if (document.hidden) for (const s of [...active]) { s.jump(s.to); s.rest && s.rest(); } });

export class Spring {
  /**
   * @param {number} value 처음 값
   * @param {string|{k:number,z:number}} cfg 스프링 종류
   * @param {(x:number, s:Spring)=>void} onUpdate
   * @param {number} eps 이만큼 가까워지면 멈춘다(px 는 0.05, 0~1 값은 0.001 정도)
   */
  constructor(value = 0, cfg = 'move', onUpdate, eps = 0.05) { this.x = value; this.to = value; this.v = 0; this.cfg = cfg; this.on = onUpdate; this.eps = eps; this.rest = null; }
  /** 목표를 바꾼다. o.velocity 로 처음 속도(끌다 놓았을 때 등)를 줄 수 있다 */
  set(to, o) {
    if (o) { if (o.cfg) this.cfg = o.cfg; if (o.velocity != null) this.v = o.velocity; }
    this.to = to;
    if ((o && o.instant) || still()) { const was = this.x !== to || active.has(this); this.jump(to); if (was && this.rest) this.rest(); return this; }
    if (!active.has(this)) { active.add(this); wake(); }
    return this;
  }
  /** 바로 그 값으로(rest 는 부르지 않는다) */
  jump(x) {
    this.x = this.to = x; this.v = 0;
    active.delete(this);
    this.on && this.on(x, this);
    return this;
  }
  stop() { active.delete(this); this.v = 0; return this; }
  get moving() { return active.has(this); }
  step(dt) {
    const c = cfgOf(this.cfg), sp = speed(), k = c.k * sp * sp, d = 2 * zOf(c) * Math.sqrt(k);
    const n = Math.ceil(dt / 0.004), h = dt / n;
    let { x, v } = this; const to = this.to;
    for (let i = 0; i < n; i++) { v += (-k * (x - to) - d * v) * h; x += v * h; }
    if (Math.abs(x - to) < this.eps && Math.abs(v) < this.eps * 40) { this.x = to; this.v = 0; active.delete(this); this.on && this.on(to, this); this.rest && this.rest(); return; }
    this.x = x; this.v = v;
    this.on && this.on(x, this);
  }
}

/** 여러 값을 한 번에: springs({ x: 0, y: 0 }, 'move', v => …) → .set({ x: 10 }) */
export function springs(init, cfg, onUpdate, eps) {
  const cur = { ...init }, map = {};
  let queued = false;
  const flush = () => { queued = false; onUpdate(cur); };
  for (const k in init) map[k] = new Spring(init[k], cfg, x => { cur[k] = x; if (!queued) { queued = true; queueMicrotask(flush); } }, eps);
  return {
    cur, map,
    set(to, o) { for (const k in to) map[k].set(to[k], o && o.velocity && typeof o.velocity === 'object' ? { ...o, velocity: o.velocity[k] } : o); return this; },
    jump(to) { for (const k in to) map[k].jump(to[k]); return this; },
    get moving() { return Object.values(map).some(s => s.moving); },
  };
}

/** 스프링 움직임을 CSS linear() 곡선으로. transition 에 쓴다 */
const easeCache = new Map();
export function springEase(cfg) {
  const key = typeof cfg === 'string' ? `${cfg}:${motion.bounce}:${SPRINGS[cfg]?.k}:${SPRINGS[cfg]?.z}` : null;
  if (key && easeCache.has(key)) return easeCache.get(key);
  const out = computeEase(cfg);
  if (key) easeCache.set(key, out);
  return out;
}
function computeEase(cfg) {
  const c = cfgOf(cfg), k = c.k, d = 2 * zOf(c) * Math.sqrt(k), pts = [];
  let x = 0, v = 0, t = 0;
  const h = 1 / 600;
  for (let i = 0; i < 1800; i++) {
    if (i % 12 === 0) pts.push(x);
    v += (-k * (x - 1) - d * v) * h; x += v * h; t += h;
    if (i > 60 && Math.abs(x - 1) < 0.001 && Math.abs(v) < 0.02) break;
  }
  pts.push(1);
  return { ease: `linear(${pts.map(p => +p.toFixed(3)).join(',')})`, duration: +t.toFixed(3) };
}

let motionStyle = null;
/** 스프링 곡선을 CSS 변수(--a2-e-*, --a2-d-*)로 넣는다 */
export function installMotion() {
  if (typeof document === 'undefined' || !(window.CSS && CSS.supports && CSS.supports('transition-timing-function', 'linear(0, 1)'))) return;
  if (!motionStyle) { motionStyle = document.createElement('style'); motionStyle.dataset.adas2Motion = ''; document.head.append(motionStyle); }
  motionStyle.textContent = `:root{${['snap', 'move', 'slow', 'fx'].map(n => { const e = springEase(n); return `--a2-e-${n}:${e.ease};--a2-d-${n}:${e.duration}s`; }).join(';')}}`;
}
/** setMotion({ bounce: 0.5 }) — 튕김 정도를 바꾼다 */
export function setMotion(o = {}) {
  if (o.bounce != null) motion.bounce = Math.max(0, Math.min(1.6, +o.bounce));
  if (o.springs) for (const k in o.springs) SPRINGS[k] = { ...SPRINGS[k], ...o.springs[k] };
  installMotion();
  return { ...motion };
}

/**
 * 끌기. 포인터를 붙잡고 이동량과 놓는 순간의 속도(px/s)를 알려 준다.
 * drag(el, { start(e) → false 면 취소, move({dx,dy,e}), end({dx,dy,vx,vy,moved,e}) })
 */
export function drag(el, h) {
  el.addEventListener('pointerdown', e => {
    if (e.button !== 0) return;
    if (h.start && h.start(e) === false) return;
    const x0 = e.clientX, y0 = e.clientY, hist = [[x0, y0, e.timeStamp]];
    let moved = false;
    try { el.setPointerCapture(e.pointerId); } catch (_) {}
    const mv = ev => {
      const dx = ev.clientX - x0, dy = ev.clientY - y0;
      if (!moved && Math.hypot(dx, dy) > 3) moved = true;
      hist.push([ev.clientX, ev.clientY, ev.timeStamp]); if (hist.length > 6) hist.shift();
      h.move && h.move({ dx, dy, moved, e: ev });
    };
    const up = ev => {
      el.removeEventListener('pointermove', mv); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up);
      const a = hist[0], b = hist[hist.length - 1], dt = Math.max(1, b[2] - a[2]) / 1000;
      const fresh = ev.timeStamp - b[2] < 80;
      h.end && h.end({ dx: ev.clientX - x0, dy: ev.clientY - y0, vx: fresh ? (b[0] - a[0]) / dt : 0, vy: fresh ? (b[1] - a[1]) / dt : 0, moved, cancelled: ev.type === 'pointercancel', e: ev });
    };
    el.addEventListener('pointermove', mv); el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
  });
}

/** 끝을 넘어가면 점점 덜 따라오게(고무줄) */
export const rubber = (over, range = 120) => (over === 0 ? 0 : Math.sign(over) * range * (1 - 1 / (Math.abs(over) / range + 1)));
