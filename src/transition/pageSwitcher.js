// 페이지 전환: 지금 페이지는 왼쪽으로, 새 페이지는 오른쪽에서 들어온다.
import { tween } from '../core/tween.js';
import { scaleOf } from '../core/dom.js';

let running = [];

/**
 * @param {Map|object|Element[]} pages 키 → 요소
 * @param {*} from 지금 페이지 키
 * @param {*} to 보여 줄 페이지 키
 * @returns {boolean} 전환했으면 true
 */
export function switchPage(pages, from, to) {
  const get = k => (pages instanceof Map ? pages.get(k) : pages[k]);
  const keys = pages instanceof Map ? [...pages.keys()] : Object.keys(pages).map(k => (Array.isArray(pages) ? +k : k));
  const a = get(from), b = get(to);
  if (from === to || !a || !b) return false;
  for (const t of running) t.kill();
  running = [];
  const off = 1100 * scaleOf(b);
  const put = (el, x, o, interactive) => { el.style.transform = `translateX(${x}px)`; el.style.opacity = o; el.inert = !interactive; el.style.pointerEvents = interactive ? '' : 'none'; };
  for (const k of keys) { const el = get(k); if (el && el !== a && el !== b) { put(el, -off, 0, false); el.hidden = true; } }
  a.hidden = false; b.hidden = false;
  put(a, 0, 1, false); put(b, off, 0, false);
  running.push(
    tween({ x: 0 }, { x: -off }, 0.45, 'OutExpo', v => { a.style.transform = `translateX(${v.x}px)`; }, () => { a.hidden = true; }),
    tween({ o: 1 }, { o: 0 }, 0.3, 'OutSine', v => { a.style.opacity = v.o; }),
    tween({ x: off }, { x: 0 }, 0.45, 'OutExpo', v => { b.style.transform = `translateX(${v.x}px)`; }, () => { b.style.transform = ''; }),
    tween({ o: 0 }, { o: 1 }, 0.3, 'OutSine', v => { b.style.opacity = v.o; }),
  );
  setTimeout(() => { b.inert = false; b.style.pointerEvents = ''; }, 100);
  return true;
}

export const PageSwitcher = { switchPage };
