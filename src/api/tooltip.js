// a2-tip="설명" 속성이 있는 아무 요소에 마우스를 올리거나 키보드로 가면 짧은 설명이 뜬다.
// a2-tip-side="top|bottom|left|right" 로 방향을 바꾼다.
import { ensureGlobal, sheet, BASE_CSS } from '../core/base.js';
import { animate } from '../core/animate.js';

const CSS = `
.tip { position: fixed; inset: auto; margin: 0; border: 0; padding: 6px 10px 5px; max-width: 260px; border-radius: 8px; overflow: visible;
  background: var(--a2-tip); color: var(--a2-bg); font-family: var(--a2-font); font-size: var(--a2-fs-sm); font-weight: var(--a2-weight); line-height: 1.4;
  pointer-events: none; box-shadow: var(--a2-shadow); }
`;

let tip = null, cur = null, timer = 0, anim = null, shownAt = 0;
function ensure() {
  if (tip) return;
  ensureGlobal();
  const host = document.createElement('div');
  host.setAttribute('data-a2-tooltip', '');
  const root = host.attachShadow({ mode: 'open' });
  root.adoptedStyleSheets = [sheet(BASE_CSS), sheet(CSS)];
  tip = document.createElement('div');
  tip.className = 'tip';
  tip.setAttribute('popover', 'manual');
  tip.setAttribute('role', 'tooltip');
  tip.id = 'a2-tooltip';
  root.append(tip);
  document.body.append(host);
}
function place(el) {
  const r = el.getBoundingClientRect(), w = tip.offsetWidth, h = tip.offsetHeight, g = 8;
  let side = el.getAttribute('a2-tip-side') || 'top';
  if (side === 'top' && r.top - h - g < 4) side = 'bottom';
  if (side === 'bottom' && r.bottom + h + g > innerHeight - 4) side = 'top';
  let x = side === 'left' ? r.left - w - g : side === 'right' ? r.right + g : r.left + r.width / 2 - w / 2;
  let y = side === 'top' ? r.top - h - g : side === 'bottom' ? r.bottom + g : r.top + r.height / 2 - h / 2;
  x = Math.min(Math.max(4, x), innerWidth - w - 4); y = Math.min(Math.max(4, y), innerHeight - h - 4);
  tip.style.left = `${x}px`; tip.style.top = `${y}px`;
  return side;
}
function show(el) {
  ensure();
  cur = el;
  tip.textContent = el.getAttribute('a2-tip');
  try { if (tip.matches(':popover-open')) tip.hidePopover(); tip.showPopover(); } catch (_) {}
  const side = place(el);
  const dx = side === 'left' ? 4 : side === 'right' ? -4 : 0, dy = side === 'top' ? 4 : side === 'bottom' ? -4 : 0;
  anim?.stop();
  anim = animate({ p: 0 }, { p: 1 }, { duration: 0.16, ease: 'OutCubic', onUpdate: v => { tip.style.opacity = v.p; tip.style.transform = `translate(${dx * (1 - v.p)}px, ${dy * (1 - v.p)}px)`; } });
  shownAt = performance.now();
  el.setAttribute('aria-describedby', 'a2-tooltip');
}
function hide() {
  clearTimeout(timer);
  if (!cur) return;
  shownAt = performance.now();
  cur.removeAttribute('aria-describedby');
  cur = null;
  anim?.stop();
  anim = animate({ p: Number(tip.style.opacity) || 1 }, { p: 0 }, { duration: 0.1, ease: 'Linear', onUpdate: v => { tip.style.opacity = v.p; }, onDone: () => { if (!cur) try { tip.hidePopover(); } catch (_) {} } });
}
const target = e => e.composedPath().find(n => n instanceof Element && n.hasAttribute('a2-tip'));

let installed = false;
export function installTooltips() {
  if (installed || typeof document === 'undefined') return;
  installed = true;
  document.addEventListener('pointerover', e => {
    if (e.pointerType === 'touch') return;
    const el = target(e);
    if (el === cur) return;
    if (!el) { hide(); return; }
    clearTimeout(timer);
    // 방금 다른 설명을 보고 있었다면 바로 보여 준다
    const quick = cur || performance.now() - shownAt < 300;
    timer = setTimeout(() => show(el), quick ? 0 : 450);
  });
  // 창 밖으로 나갈 때
  document.addEventListener('pointerout', e => { if (!e.relatedTarget) hide(); });
  document.addEventListener('focusin', e => { const el = target(e); if (el && el.matches(':focus-visible, :has(:focus-visible)')) show(el); });
  document.addEventListener('focusout', () => hide());
  document.addEventListener('pointerdown', () => hide(), true);
  addEventListener('keydown', e => { if (e.key === 'Escape') hide(); }, true);
  addEventListener('scroll', () => hide(), true);
}
