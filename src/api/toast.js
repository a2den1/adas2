// 화면 아래에 잠깐 뜨는 알림. 여러 개면 위로 쌓이고, 하나가 사라지면 나머지가 제자리로 내려온다.
import { ensureGlobal, sheet, BASE_CSS, icon, esc } from '../core/base.js';
import { animate } from '../core/animate.js';

const CSS = `
:host { all: initial; }
.layer { position: fixed; inset: auto 0 0 0; margin: 0; padding: 0 16px 20px; border: 0; background: none; width: auto; height: auto; max-width: none; max-height: none; overflow: visible;
  display: flex; flex-direction: column-reverse; align-items: center; gap: 8px; pointer-events: none; }
:host([pos="top"]) .layer { inset: 0 0 auto 0; padding: 20px 16px 0; flex-direction: column; }
.toast {
  pointer-events: auto; display: flex; align-items: center; gap: 10px; max-width: min(460px, 100%); min-height: 44px; padding: 8px 8px 8px 14px;
  border-radius: 14px; background: var(--a2-tip); color: var(--a2-bg); box-shadow: var(--a2-shadow);
  font-family: var(--a2-font); font-size: var(--a2-fs); font-weight: var(--a2-weight);
}
.toast.plain { padding-right: 16px; }
.ic { flex: none; }
.ic.success { color: var(--a2-success); } .ic.warning { color: var(--a2-warning); } .ic.danger { color: var(--a2-danger); } .ic.info { color: var(--a2-accent); }
.msg { flex: 1; min-width: 0; line-height: 1.45; padding-top: 0.12em; }
.act { flex: none; height: 30px; padding: 0.12em 12px 0; border-radius: 9px; font-weight: var(--a2-weight-strong); color: var(--a2-accent); }
.act:hover { background: color-mix(in srgb, var(--a2-bg) 10%, transparent); }
`;

let host = null, layer = null;
function ensureLayer() {
  ensureGlobal();
  if (host && host.isConnected) return;
  host = document.createElement('div');
  host.setAttribute('data-a2-toasts', '');
  const root = host.attachShadow({ mode: 'open' });
  root.adoptedStyleSheets = [sheet(BASE_CSS), sheet(CSS)];
  layer = document.createElement('div');
  layer.className = 'layer';
  layer.setAttribute('popover', 'manual');
  layer.setAttribute('role', 'status');
  layer.setAttribute('aria-live', 'polite');
  root.append(layer);
  document.body.append(host);
}
/** 맨 위 층 순서를 다시 잡아서 열린 대화상자보다 위에 보이게 */
function raise() {
  try { if (layer.matches(':popover-open')) layer.hidePopover(); layer.showPopover(); } catch (_) {}
}

/** 다른 알림의 자리 이동을 부드럽게 */
function flip(fn) {
  const items = [...layer.children], before = new Map(items.map(el => [el, el.getBoundingClientRect().top]));
  fn();
  for (const el of layer.children) {
    const b = before.get(el); if (b == null) continue;
    const d = b - el.getBoundingClientRect().top;
    if (Math.abs(d) < 1) continue;
    el._fl?.stop();
    el._fl = animate({ y: d }, { y: 0 }, { duration: 0.32, ease: 'OutExpo', onUpdate: v => { el.style.translate = `0 ${v.y}px`; } });
  }
}

/**
 * toast('저장했습니다', { variant: 'success', duration: 3000, action: { label: '되돌리기', onClick } })
 * @returns {{ close(): void }}
 */
export function toast(message, o = {}) {
  ensureLayer();
  if (o.position) host.setAttribute('pos', o.position);
  const v = o.variant && o.variant !== 'default' ? o.variant : null;
  const el = document.createElement('div');
  el.className = `toast${o.action ? '' : ' plain'}`;
  el.innerHTML = `${v ? `<span class="ic ${v}">${icon(v === 'info' ? 'info' : v, 18)}</span>` : ''}<span class="msg"></span>${o.action ? `<button class="act" type="button">${esc(o.action.label)}</button>` : ''}`;
  el.querySelector('.msg').textContent = message;
  let timer = 0, closed = false;
  const close = () => {
    if (closed) return; closed = true; clearTimeout(timer);
    el._in?.stop();
    animate({ p: 1 }, { p: 0 }, {
      duration: 0.18, ease: 'OutSine',
      onUpdate: q => { el.style.opacity = q.p; el.style.transform = `scale(${0.92 + 0.08 * q.p})`; },
      onDone: () => { flip(() => el.remove()); if (!layer.children.length) try { layer.hidePopover(); } catch (_) {} o.onClose && o.onClose(); },
    });
  };
  if (o.action) el.querySelector('.act').addEventListener('click', () => { o.action.onClick && o.action.onClick(); close(); });
  const dur = o.duration ?? (o.action ? 5000 : 3000);
  const arm = () => { clearTimeout(timer); if (dur > 0) timer = setTimeout(close, dur); };
  el.addEventListener('pointerenter', () => clearTimeout(timer));
  el.addEventListener('pointerleave', arm);
  raise();
  // 너무 많이 쌓이면 오래된 것부터 닫는다
  while (layer.children.length >= (o.max ?? 4)) layer.children[0]._close?.();
  el._close = close;
  flip(() => layer.append(el));
  const top = host.getAttribute('pos') === 'top';
  el._in = animate({ p: 0 }, { p: 1 }, { duration: 0.42, ease: 'OutExpo', onUpdate: q => { el.style.opacity = Math.min(1, q.p * 2); el.style.transform = `translateY(${(1 - q.p) * (top ? -16 : 16)}px) scale(${0.94 + 0.06 * q.p})`; } });
  arm();
  return { close };
}
