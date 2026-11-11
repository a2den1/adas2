// 떠 있는 판(목록·메뉴·색 고르기): 브라우저 맨 위 층(popover)에 띄워 어디에도 잘리지 않게 한다.
// 기준 요소 옆에 자리를 잡고, 아래 공간이 모자라면 위로 연다.
import { animate, reveal } from './animate.js';

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
  let anim = null, shown = 0;
  // 기준 요소 쪽에서 틀 안으로 밀려 나온다(아래로 열리면 위에서, 위로 열리면 아래에서)
  const paint = p => { shown = p; reveal(pop, p, up ? 'bottom' : 'top'); };
  place();
  paint(0);
  anim = animate({ p: 0 }, { p: 1 }, { duration: 0.26, ease: 'OutQuart', onUpdate: v => paint(v.p) });
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
    anim && anim.stop();
    animate({ p: shown }, { p: 0 }, { duration: 0.14, ease: 'InQuad', onUpdate: v => paint(v.p), onDone: () => { try { pop.hidePopover(); } catch (_) {} } });
    o.onClose && o.onClose();
  }
  return { close, get open() { return alive; } };
}

/** 같은 스타일의 떠 있는 판 CSS (목록·메뉴 공용) */
export const POPOVER_CSS = `
[popover] { position: fixed; inset: auto; margin: 0; padding: 0; border: 0; overflow: visible; background: none; color: inherit; }
/* 떠 있는 판도 테이고, 항목 하나하나가 조각이다 */
.menu {
  min-width: 180px; max-height: min(360px, 60vh); overflow-y: auto; padding: var(--a2-gap);
  border-radius: var(--a2-radius); background: var(--a2-raised); border: var(--a2-ring) solid var(--a2-line-strong); box-shadow: var(--a2-shadow);
  font-family: var(--a2-font); font-size: var(--a2-fs); font-weight: var(--a2-weight); color: var(--a2-text);
  scrollbar-width: thin;
}
.item {
  display: flex; align-items: center; gap: 10px; min-height: 36px; padding: 0 11px; border-radius: var(--ri);
  cursor: pointer; user-select: none; white-space: nowrap; transition: background-color calc(0.12s / var(--a2-speed));
}
.item:hover, .item.active { background: var(--a2-fill-hover); }
.item[aria-disabled="true"] { opacity: 0.4; pointer-events: none; }
.item .grow { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; padding-top: 0.12em; }
.item .mark { visibility: hidden; }
.item[aria-selected="true"] { background: var(--a2-accent); color: var(--a2-on-accent); }
.item[aria-selected="true"].active { background: var(--a2-accent-hover); }
.item[aria-selected="true"] .mark { visibility: visible; }
.item[aria-selected="true"] .grow { font-weight: var(--a2-weight-strong); }
.sep { height: 2px; margin: 4px 9px; border-radius: 1px; background: var(--a2-line); }
.empty { padding: 10px; color: var(--a2-text-muted); font-size: var(--a2-fs-sm); }
`;
