// 떠 있는 판(목록·메뉴·색 고르기): body 에 붙여 잘리지 않게 하고, 기준 요소를 따라간다.
import { h, px } from './dom.js';
import { animate } from './tween.js';

/**
 * @param {object} o
 * @param {Element|{x:number,y:number}} o.anchor 기준 요소 또는 화면 좌표
 * @param {string} [o.className]
 * @param {'start'|'stretch'} [o.align] stretch 면 기준 요소 폭에 맞춘다
 * @param {() => void} [o.onClose]
 */
export function openFloat({ anchor, className = '', align = 'start', gap = 8, onClose }) {
  const el = h('div', `a2 a2-float ${className}`, document.body);
  let up = null, alive = true, raf = 0, t = null;
  const place = () => {
    if (!alive) return;
    const g = px(el, gap);
    let r;
    if (anchor instanceof Element) {
      if (!anchor.isConnected) return close();
      r = anchor.getBoundingClientRect();
      if (align === 'stretch') el.style.width = `${r.width}px`;
    } else r = { left: anchor.x, right: anchor.x, top: anchor.y, bottom: anchor.y, width: 0 };
    const w = el.offsetWidth, ht = el.offsetHeight;
    if (up === null) up = r.bottom + g + ht > innerHeight && r.top - g - ht > 0;
    let x = Math.min(Math.max(8, r.left), innerWidth - w - 8);
    let y = up ? r.top - g - ht : r.bottom + g;
    y = Math.min(Math.max(8, y), innerHeight - ht - 8);
    el.style.left = `${x}px`; el.style.top = `${y}px`;
    el.classList.toggle('a2-up', up);
    if (anchor instanceof Element) raf = requestAnimationFrame(place);
  };
  const outside = e => { if (!el.contains(e.target) && !(anchor instanceof Element && anchor.contains(e.target))) close(); };
  const key = e => { if (e.key === 'Escape') { e.stopPropagation(); close(); } };
  function close() {
    if (!alive) return;
    alive = false;
    cancelAnimationFrame(raf);
    document.removeEventListener('pointerdown', outside, true);
    removeEventListener('keydown', key, true);
    t && t.kill();
    t = animate({ p: 1 }, { p: 0 }, { duration: 0.14, ease: 'OutSine', onUpdate: v => paint(v.p), onDone: () => el.remove() });
    onClose && onClose();
  }
  const paint = p => { el.style.opacity = p; el.style.transform = `translateY(${(1 - p) * (up ? 6 : -6) * px(el, 1)}px) scale(${0.97 + 0.03 * p})`; };
  paint(0);
  requestAnimationFrame(() => {
    place();
    t = animate({ p: 0 }, { p: 1 }, { duration: 0.2, ease: 'OutCubic', onUpdate: v => paint(v.p) });
  });
  setTimeout(() => { if (alive) { document.addEventListener('pointerdown', outside, true); addEventListener('keydown', key, true); } }, 0);
  return { el, close, get open() { return alive; }, place };
}
