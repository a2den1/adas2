// 시간·이징 애니메이션. --a2-speed 로 빠르기를 바꾼다(움직임 줄이기 설정이면 즉시).
import { Ease } from './ease.js';

const running = new Set();
let raf = 0, last = 0, dog = 0;
function frame(now) {
  raf = 0; last = now;
  for (const a of [...running]) a.step(now);
  if (running.size) raf = requestAnimationFrame(frame);
  else if (dog) { clearInterval(dog); dog = 0; }
}
function wake() {
  if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); }
  // 프레임이 늦게 오는 환경을 위한 보조 타이머. 도는 애니메이션이 있을 때만 켠다
  if (!dog) dog = setInterval(() => { if (running.size && performance.now() - last > 120) { cancelAnimationFrame(raf); raf = 0; frame(performance.now()); } }, 100);
}
if (typeof document !== 'undefined') document.addEventListener('visibilitychange', () => { if (document.hidden) for (const a of [...running]) a.finish(); });

let spd = 1, spdAt = -1e9;
export function speed() {
  const now = performance.now();
  if (now - spdAt > 400) {
    const v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--a2-speed'));
    spd = Number.isFinite(v) && v > 0 ? v : 1; spdAt = now;
  }
  return spd;
}

/**
 * animate({ x: 0 }, { x: 100 }, { duration: 0.3, ease: 'OutCubic', onUpdate: v => ..., onDone })
 * @returns {{ stop(): void, finish(): void }}
 */
export function animate(from, to, { duration = 0.3, ease = 'OutCubic', onUpdate = () => {}, onDone } = {}) {
  const fn = typeof ease === 'function' ? ease : Ease[ease] || Ease.OutCubic;
  const ms = (duration * 1000) / speed();
  const start = performance.now();
  const a = {
    alive: true,
    apply(p) { const e = fn(p), o = {}; for (const k in to) o[k] = from[k] + (to[k] - from[k]) * e; onUpdate(o, p); },
    step(now) { if (!a.alive) return; const p = Math.min(1, (now - start) / ms); a.apply(p); if (p >= 1) a.end(); },
    end() { running.delete(a); if (!a.alive) return; a.alive = false; onDone && onDone(); },
    stop() { a.alive = false; running.delete(a); },
    finish() { if (a.alive) { a.apply(1); a.end(); } },
  };
  // 화면이 가려진 탭에선 프레임이 돌지 않으므로 바로 끝낸다(닫기 같은 마무리가 멈추지 않게)
  if (ms < 16 || (typeof document !== 'undefined' && document.hidden)) { a.apply(1); a.end(); return a; }
  running.add(a); wake();
  return a;
}

/**
 * 틀 안에서 밀려 들어오는 모양. 요소가 놓일 자리를 틀로 삼아, 그 안에서만 보이게 자르고 내용을 옮긴다.
 * 투명도는 쓰지 않는다. p: 0(다 가려짐) → 1(제자리), from: 들어오는 쪽
 */
export function reveal(el, p, from = 'bottom') {
  if (p >= 1) { el.style.transform = ''; el.style.clipPath = ''; return; }
  const q = (1 - p) * 100;
  // 그림자는 잘리지 않게 다른 세 변은 넉넉히 둔다
  if (from === 'top') { el.style.transform = `translateY(${-q}%)`; el.style.clipPath = `inset(${q}% -80px -80px -80px)`; }
  else { el.style.transform = `translateY(${q}%)`; el.style.clipPath = `inset(-80px -80px ${q}% -80px)`; }
}

/** 요소의 left/width 를 다른 요소 위치로 옮기는 선택 표시 */
export function slideIndicator(ind, target, state, instant) {
  if (!target || !target.offsetWidth) return state;
  const to = { x: target.offsetLeft, y: target.offsetTop, w: target.offsetWidth, h: target.offsetHeight };
  const c = state.cur;
  if (c && c.x === to.x && c.y === to.y && c.w === to.w && c.h === to.h && !state.anim?.alive) return state;
  state.anim && state.anim.stop();
  const put = v => { ind.style.transform = `translate(${v.x}px, ${v.y}px)`; ind.style.width = `${v.w}px`; ind.style.height = `${v.h}px`; state.cur = v; };
  if (instant || !state.cur) put(to);
  else state.anim = animate(state.cur, to, { duration: 0.32, ease: 'OutExpo', onUpdate: put });
  ind.style.visibility = 'visible';
  return state;
}
