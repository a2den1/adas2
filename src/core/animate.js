// 시간·이징 애니메이션. --a2-speed 로 빠르기를 바꾼다(움직임 줄이기 설정이면 즉시).
import { Ease } from './ease.js';

const running = new Set();
let raf = 0, last = 0;
function frame(now) {
  raf = 0; last = now;
  for (const a of [...running]) a.step(now);
  if (running.size) raf = requestAnimationFrame(frame);
}
function wake() { if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); } }
setInterval(() => { if (running.size && performance.now() - last > 120) { cancelAnimationFrame(raf); raf = 0; frame(performance.now()); } }, 100);

export function speed() {
  const v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--a2-speed'));
  return Number.isFinite(v) && v > 0 ? v : 1;
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
  if (ms < 16) { a.apply(1); a.end(); return a; }
  running.add(a); wake();
  return a;
}

/** 요소의 left/width 를 다른 요소 위치로 옮기는 선택 표시 */
export function slideIndicator(ind, target, state, instant) {
  if (!target || !target.offsetWidth) return state;
  const to = { x: target.offsetLeft, y: target.offsetTop, w: target.offsetWidth, h: target.offsetHeight };
  state.anim && state.anim.stop();
  const put = v => { ind.style.transform = `translate(${v.x}px, ${v.y}px)`; ind.style.width = `${v.w}px`; ind.style.height = `${v.h}px`; state.cur = v; };
  if (instant || !state.cur) put(to);
  else state.anim = animate(state.cur, to, { duration: 0.32, ease: 'OutExpo', onUpdate: put });
  ind.style.opacity = '1';
  return state;
}
