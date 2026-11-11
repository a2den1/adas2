// 떠 있는 판(목록·메뉴·색 고르기): 브라우저 맨 위 층(popover)에 띄워 어디에도 잘리지 않게 한다.
// 기준 요소 옆에 자리를 잡고, 아래 공간이 모자라면 위로 연다.
import { Spring } from './spring.js';

/**
 * @param {HTMLElement} pop popover 속성을 가진 요소
 * @param {Element|{x:number,y:number}} anchor
 * @param {{ match?: boolean, gap?: number, onClose?: Function, closeOnOutside?: Element[] }} o
 */
export function openPopover(pop, anchor, o = {}) {
  const gap = o.gap ?? 6;
  if (!pop.hasAttribute('popover')) pop.setAttribute('popover', 'manual');
  try { pop.showPopover(); } catch (_) { /* 이미 열림 */ }
  let up = null, alive = true, lx, ly, lw;
  const isEl = anchor instanceof Element;
  const place = () => {
    if (!alive) return;
    let r;
    if (isEl) {
      if (!anchor.isConnected) return close();
      r = anchor.getBoundingClientRect();
      if (o.match && lw !== r.width) { lw = r.width; pop.style.minWidth = `${r.width}px`; }
    } else r = { left: anchor.x, right: anchor.x, top: anchor.y, bottom: anchor.y, width: 0 };
    const w = pop.offsetWidth, h = pop.offsetHeight;
    if (up === null) up = r.bottom + gap + h > innerHeight - 8 && r.top - gap - h > 8;
    const x = Math.round(Math.min(Math.max(8, o.alignEnd ? r.right - w : r.left), innerWidth - w - 8));
    const y = Math.round(Math.min(Math.max(8, up ? r.top - gap - h : r.bottom + gap), innerHeight - h - 8));
    if (x !== lx) { lx = x; pop.style.left = `${x}px`; }
    if (y !== ly) { ly = y; pop.style.top = `${y}px`; }
    pop.dataset.side = up ? 'top' : 'bottom';
  };
  // 매 프레임 따라가지 않고, 자리가 바뀔 수 있는 때(스크롤·창 크기·내용 크기)에만 다시 잡는다
  let queued = 0;
  const later = () => { if (!queued) queued = requestAnimationFrame(() => { queued = 0; place(); }); };
  const ro = new ResizeObserver(later);
  const keep = [pop, ...(o.closeOnOutside || []), ...(isEl ? [anchor] : [])];
  const outside = e => { const path = e.composedPath(); if (!keep.some(k => path.includes(k))) close(); };
  const key = e => { if (e.key === 'Escape') { e.stopPropagation(); close(); } };
  // 기준 요소에 붙은 모서리에서 스프링으로 커진다
  // (같은 판을 닫는 중에 다시 열 수 있으니 스프링은 판마다 하나만 둔다)
  const sp = pop._a2sp || (pop._a2sp = new Spring(0, 'snap', p => {
    pop.style.transform = p === 1 ? '' : `scale(${0.72 + 0.28 * p})`;
    pop.style.opacity = p >= 0.35 ? '' : Math.max(0, p / 0.35);
  }, 0.002));
  sp.rest = null;
  place();
  pop.style.transformOrigin = `${o.alignEnd ? '100%' : '0%'} ${up ? '100%' : '0%'}`;
  sp.jump(0); sp.set(1);
  ro.observe(pop); if (isEl) ro.observe(anchor);
  addEventListener('scroll', later, { capture: true, passive: true });
  addEventListener('resize', later, { passive: true });
  setTimeout(() => { if (alive) { document.addEventListener('pointerdown', outside, true); addEventListener('keydown', key, true); } }, 0);
  function close() {
    if (!alive) return;
    alive = false;
    cancelAnimationFrame(queued); ro.disconnect();
    removeEventListener('scroll', later, { capture: true });
    removeEventListener('resize', later);
    document.removeEventListener('pointerdown', outside, true);
    removeEventListener('keydown', key, true);
    sp.rest = () => { try { pop.hidePopover(); } catch (_) {} };
    sp.set(0, { cfg: 'fxFast' });
    o.onClose && o.onClose();
  }
  return { close, get open() { return alive; } };
}

/** 같은 스타일의 떠 있는 판 CSS (목록·메뉴 공용) */
export const POPOVER_CSS = `
[popover] { position: fixed; inset: auto; margin: 0; padding: 0; border: 0; overflow: visible; background: none; color: inherit; }
.menu {
  min-width: 190px; max-height: min(380px, 60vh); overflow-y: auto; padding: 6px;
  border-radius: var(--a2-r-md); background: var(--a2-surface-high); box-shadow: var(--a2-shadow);
  font-family: var(--a2-font); font-size: var(--a2-fs); font-weight: var(--a2-weight); color: var(--a2-text);
  scrollbar-width: thin;
}
.item {
  display: flex; align-items: center; gap: 12px; min-height: 44px; padding: 0 14px; border-radius: var(--a2-r-xs);
  cursor: pointer; user-select: none; white-space: nowrap; transition: background-color var(--fx), border-radius var(--snap);
}
.item:hover, .item.active { background: var(--a2-fill-hover); }
.item[aria-disabled="true"] { opacity: 0.4; pointer-events: none; }
.item .grow { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; padding-top: 0.12em; }
.item .mark { color: var(--a2-accent); visibility: hidden; }
.item[aria-selected="true"] .mark { visibility: visible; }
.item:active { border-radius: var(--a2-r-md); }
.item[aria-selected="true"] { background: var(--a2-tonal); color: var(--a2-on-tonal); }
.item[aria-selected="true"] .grow { font-weight: var(--a2-weight-strong); }
.item[aria-selected="true"] .mark { color: inherit; }
.sep { height: 1px; margin: 5px 8px; background: var(--a2-fill-active); }
.empty { padding: 10px; color: var(--a2-text-muted); font-size: var(--a2-fs-sm); }
`;
