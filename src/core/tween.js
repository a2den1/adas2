// 시간·이징 기반 트윈. 숫자(여러 개)와 색을 보간한다.
import { easeOf } from './ease.js';
import { settings } from './settings.js';

const running = new Set();
let raf = 0, last = 0;

function frame(now) {
  raf = 0; last = now;
  for (const t of [...running]) t._step(now);
  if (running.size) raf = requestAnimationFrame(frame);
}
function wake() { if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); } }
// 숨은 탭처럼 rAF 가 멈춘 곳에서도 끝까지 가도록
setInterval(() => {
  if (running.size && performance.now() - last > 90) { if (raf) cancelAnimationFrame(raf); raf = 0; frame(performance.now()); }
}, 60);

const reduce = typeof matchMedia === 'function' ? matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };

class TweenHandle {
  constructor(from, to, duration, ease, onUpdate, onDone) {
    this.from = from; this.to = to; this.ease = easeOf(ease);
    this.onUpdate = onUpdate; this.onDone = onDone;
    const speed = settings.animation;
    this.duration = speed > 0 && !reduce.matches ? (duration * 1000) / speed : 0;
    this.start = performance.now();
    this.alive = true;
    if (this.duration <= 0) { this._apply(1); this._finish(); return; }
    running.add(this); wake();
  }
  _apply(p) {
    const e = this.ease(p), out = {};
    for (const k in this.to) out[k] = this.from[k] + (this.to[k] - this.from[k]) * e;
    this.onUpdate(out, p);
  }
  _step(now) {
    if (!this.alive) return;
    const p = Math.min(1, (now - this.start) / this.duration);
    this._apply(p);
    if (p >= 1) this._finish();
  }
  _finish() { running.delete(this); if (!this.alive) return; this.alive = false; this.onDone && this.onDone(); }
  /** 멈춘다. 완료 콜백은 부르지 않는다. */
  kill() { this.alive = false; running.delete(this); }
  /** 끝 값으로 바로 보내고 완료 콜백을 부른다. */
  complete() { if (!this.alive) return; this._apply(1); this._finish(); }
}

/**
 * 값 묶음을 from → to 로 보간한다.
 * @returns {TweenHandle} kill() 로 멈춘다
 */
export function tween(from, to, duration, ease, onUpdate, onDone) {
  return new TweenHandle(from, to, duration, ease, onUpdate, onDone);
}

/**
 * 애니메이션: adas2.animate({ x: 0 }, { x: 100 }, { duration: 0.4, ease: 'OutCubic', onUpdate, onDone })
 */
export function animate(from, to, { duration = 0.3, ease = 'OutCubic', onUpdate = () => {}, onDone } = {}) {
  return new TweenHandle(from, to, duration, ease, onUpdate, onDone);
}

/** 숫자 하나 */
export function tweenNumber(from, to, duration, ease, onUpdate, onDone) {
  return tween({ v: from }, { v: to }, duration, ease, o => onUpdate(o.v), onDone);
}

// 색: '#rrggbb', '#rrggbbaa', 'rgb()/rgba()' → [r,g,b,a]
export function parseColor(c) {
  if (Array.isArray(c)) return c;
  c = String(c).trim();
  if (c[0] === '#') {
    const h = c.length === 4 || c.length === 5 ? [...c.slice(1)].map(x => x + x).join('') : c.slice(1);
    const n = i => parseInt(h.slice(i, i + 2), 16);
    return [n(0), n(2), n(4), h.length >= 8 ? n(6) / 255 : 1];
  }
  const m = c.match(/[\d.]+/g) || [0, 0, 0, 1];
  return [+m[0], +m[1], +m[2], m[3] === undefined ? 1 : +m[3]];
}
export const cssColor = ([r, g, b, a]) => `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${+a.toFixed(3)})`;
export function mixColor(a, b, p) {
  const A = parseColor(a), B = parseColor(b);
  return cssColor(A.map((x, i) => x + (B[i] - x) * p));
}

/** 색을 보간한다. getter 로 현재 색을 읽어 그 자리에서 시작한다. */
export function tweenColor(get, set, target, duration, ease = 'OutCubic', onDone) {
  const A = parseColor(get()), B = parseColor(target);
  return tween({ r: A[0], g: A[1], b: A[2], a: A[3] }, { r: B[0], g: B[1], b: B[2], a: B[3] }, duration, ease,
    o => set(cssColor([o.r, o.g, o.b, o.a])), onDone);
}
