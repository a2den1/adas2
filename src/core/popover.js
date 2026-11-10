// 떠 있는 판(목록·메뉴·색 고르기): 브라우저 맨 위 층(popover)에 띄워 어디에도 잘리지 않게 한다.
// 기준 요소를 매 프레임 따라가고, 아래 공간이 모자라면 위로 연다.
import { animate } from './animate.js';

/**
 * @param {HTMLElement} pop popover 속성을 가진 요소
 * @param {Element|{x:number,y:number}} anchor
 * @param {{ match?: boolean, gap?: number, onClose?: Function, closeOnOutside?: Element[] }} o
 */
export function openPopover(pop, anchor, o = {}) {
  const gap = o.gap ?? 6;
  if (!pop.hasAttribute('popover')) pop.setAttribute('popover', 'manual');
  try { pop.showPopover(); } catch (_) { /* 이미 열림 */ }
  let up = null, raf = 0, alive = true;
  const place = () => {
    if (!alive) return;
    let r;
    if (anchor instanceof Element) {
      if (!anchor.isConnected) return close();
      r = anchor.getBoundingClientRect();
      if (o.match) pop.style.minWidth = `${r.width}px`;
    } else r = { left: anchor.x, right: anchor.x, top: anchor.y, bottom: anchor.y, width: 0 };
    const w = pop.offsetWidth, h = pop.offsetHeight;
    if (up === null) up = r.bottom + gap + h > innerHeight - 8 && r.top - gap - h > 8;
    const x = Math.min(Math.max(8, o.alignEnd ? r.right - w : r.left), innerWidth - w - 8);
    const y = Math.min(Math.max(8, up ? r.top - gap - h : r.bottom + gap), innerHeight - h - 8);
    pop.style.left = `${x}px`; pop.style.top = `${y}px`;
    pop.dataset.side = up ? 'top' : 'bottom';
    if (anchor instanceof Element) raf = requestAnimationFrame(place);
  };
  const keep = [pop, ...(o.closeOnOutside || []), ...(anchor instanceof Element ? [anchor] : [])];
  const outside = e => { const path = e.composedPath(); if (!keep.some(k => path.includes(k))) close(); };
  const key = e => { if (e.key === 'Escape') { e.stopPropagation(); close(); } };
  let anim = null;
  const paint = p => { pop.style.opacity = p; pop.style.transform = `translateY(${(1 - p) * (up ? 6 : -6)}px) scale(${0.97 + 0.03 * p})`; };
  paint(0);
  requestAnimationFrame(() => { place(); anim = animate({ p: 0 }, { p: 1 }, { duration: 0.18, ease: 'OutCubic', onUpdate: v => paint(v.p) }); });
  setTimeout(() => { if (alive) { document.addEventListener('pointerdown', outside, true); addEventListener('keydown', key, true); } }, 0);
  function close() {
    if (!alive) return;
    alive = false;
    cancelAnimationFrame(raf);
    document.removeEventListener('pointerdown', outside, true);
    removeEventListener('keydown', key, true);
    anim && anim.stop();
    animate({ p: Number(pop.style.opacity) || 1 }, { p: 0 }, { duration: 0.12, ease: 'OutSine', onUpdate: v => paint(v.p), onDone: () => { try { pop.hidePopover(); } catch (_) {} } });
    o.onClose && o.onClose();
  }
  return { close, get open() { return alive; } };
}

/** 같은 스타일의 떠 있는 판 CSS (목록·메뉴 공용) */
export const POPOVER_CSS = `
[popover] { position: fixed; inset: auto; margin: 0; padding: 0; border: 0; overflow: visible; background: none; color: inherit; }
.menu {
  min-width: 180px; max-height: min(360px, 60vh); overflow-y: auto; padding: 5px;
  border-radius: 12px; background: var(--a2-raised); box-shadow: var(--a2-shadow);
  font-family: var(--a2-font); font-size: var(--a2-fs); font-weight: var(--a2-weight); color: var(--a2-text);
  scrollbar-width: thin; transform-origin: top center;
}
[data-side="top"] .menu, .menu[data-side="top"] { transform-origin: bottom center; }
.item {
  display: flex; align-items: center; gap: 10px; min-height: 36px; padding: 0 10px; border-radius: 8px;
  cursor: pointer; user-select: none; white-space: nowrap; transition: background-color calc(0.12s / var(--a2-speed));
}
.item:hover, .item.active { background: var(--a2-fill-hover); }
.item[aria-disabled="true"] { opacity: 0.4; pointer-events: none; }
.item .grow { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; padding-top: 0.12em; }
.item .mark { color: var(--a2-accent); opacity: 0; transition: opacity calc(0.12s / var(--a2-speed)); }
.item[aria-selected="true"] .mark { opacity: 1; }
.item[aria-selected="true"] .grow { color: var(--a2-accent); font-weight: var(--a2-weight-strong); }
.sep { height: 1px; margin: 5px 8px; background: var(--a2-fill-active); }
.empty { padding: 10px; color: var(--a2-text-muted); font-size: var(--a2-fs-sm); }
`;
