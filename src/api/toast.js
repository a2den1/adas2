// 화면 아래에 잠깐 뜨는 알림. 제자리의 틀 안에서 아래에서 위로 올라오고, 옆으로 밀어서 치울 수 있다.
import { ensureGlobal, sheet, BASE_CSS, icon, esc } from '../core/base.js';
import { reveal } from '../core/animate.js';
import { Spring, drag } from '../core/spring.js';

const CSS = `
:host { all: initial; }
.layer { position: fixed; inset: auto 0 0 0; margin: 0; padding: 0 16px 20px; border: 0; background: none; width: auto; height: auto; max-width: none; max-height: none; overflow: visible;
  display: flex; flex-direction: column-reverse; align-items: center; gap: 8px; pointer-events: none; }
:host([pos="top"]) .layer { inset: 0 0 auto 0; padding: 20px 16px 0; flex-direction: column; }
.toast {
  pointer-events: auto; display: flex; align-items: center; gap: 12px; max-width: min(480px, 100%); min-height: 50px; padding: 8px 8px 8px 18px;
  border-radius: var(--a2-r-md); background: var(--a2-tip); color: var(--a2-on-tip); box-shadow: var(--a2-shadow);
  font-family: var(--a2-font); font-size: var(--a2-fs); font-weight: var(--a2-weight); touch-action: pan-y; user-select: none; cursor: grab;
}
.toast.plain { padding-right: 20px; }
.ic { flex: none; }
.ic.success { color: var(--a2-success); } .ic.warning { color: var(--a2-warning); } .ic.danger { color: var(--a2-danger); } .ic.info { color: var(--a2-tip-accent); }
.msg { flex: 1; min-width: 0; line-height: 1.45; padding-top: 0.12em; }
.act { flex: none; height: 36px; padding: 0.12em 14px 0; border-radius: 18px; font-weight: var(--a2-weight-strong); color: var(--a2-tip-accent); transition: background-color calc(var(--a2-d-fx) / var(--a2-speed)), border-radius calc(var(--a2-d-snap) / var(--a2-speed)) var(--a2-e-snap); }
.act:hover { background: color-mix(in srgb, var(--a2-on-tip) 10%, transparent); }
.act:active { border-radius: 10px; }
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

const setT = el => { el.style.translate = `${el._fx?.x || 0}px ${el._fy?.x || 0}px`; };
/** 하나가 생기거나 사라질 때 나머지가 스프링으로 제자리를 찾아간다 */
function flip(fn) {
  const before = new Map([...layer.children].map(el => [el, el.getBoundingClientRect().top]));
  fn();
  for (const el of layer.children) {
    const b = before.get(el); if (b == null) continue;
    const d = b - el.getBoundingClientRect().top;
    if (Math.abs(d) < 1) continue;
    el._fy ||= new Spring(0, 'move', () => setT(el));
    el._fy.x += d; setT(el); el._fy.set(0);
  }
}

/**
 * toast('저장했습니다', { variant: 'success', duration: 3000, action: { label: '되돌리기', onClick } })
 * @returns {{ close(): void }}
 */
export function toast(message, o = {}) {
  ensureLayer();
  if (o.position) host.setAttribute('pos', o.position);
  const top = host.getAttribute('pos') === 'top';
  const v = o.variant && o.variant !== 'default' ? o.variant : null;
  const el = document.createElement('div');
  el.className = `toast${o.action ? '' : ' plain'}`;
  el.innerHTML = `${v ? `<span class="ic ${v}">${icon(v === 'info' ? 'info' : v, 16)}</span>` : ''}<span class="msg"></span>${o.action ? `<button class="act" type="button">${esc(o.action.label)}</button>` : ''}`;
  el.querySelector('.msg').textContent = message;
  let timer = 0, closed = false;
  const done = () => { flip(() => el.remove()); if (!layer.children.length) try { layer.hidePopover(); } catch (_) {} o.onClose && o.onClose(); };
  // 올라오기: 틀 안에서 아래(위쪽 알림은 위)에서 밀려 들어온다. 스프링이라 살짝 넘쳤다 돌아온다
  const up = new Spring(0, 'move', p => reveal(el, Math.min(p, 1), top ? 'top' : 'bottom'), 0.002);
  const close = () => {
    if (closed) return; closed = true; el._closing = true; clearTimeout(timer);
    up.rest = done;
    up.set(0, { cfg: 'fx' });
  };
  // 옆으로 밀기: 놓는 속도가 빠르거나 많이 밀었으면 그 방향으로 날아간다
  el._fx = new Spring(0, 'snap', () => setT(el));
  drag(el, {
    start: e => { if (e.target.closest('.act') || closed) return false; clearTimeout(timer); el._fx.stop(); },
    move: ({ dx }) => { el._fx.x = dx; setT(el); },
    end: ({ dx, vx }) => {
      const w = el.offsetWidth;
      if (Math.abs(vx) > 600 || Math.abs(dx) > w * 0.4) {
        const dir = (Math.abs(vx) > 600 ? vx : dx) > 0 ? 1 : -1;
        closed = true; el._closing = true;
        el._fx.rest = done;
        el._fx.set(dir * (w + innerWidth / 2), { cfg: 'fx', velocity: vx });
      } else { el._fx.set(0, { cfg: 'snap', velocity: vx }); arm(); }
    },
  });
  if (o.action) el.querySelector('.act').addEventListener('click', () => { o.action.onClick && o.action.onClick(); close(); });
  const dur = o.duration ?? (o.action ? 5000 : 3000);
  const arm = () => { clearTimeout(timer); if (dur > 0 && !closed) timer = setTimeout(close, dur); };
  el.addEventListener('pointerenter', () => clearTimeout(timer));
  el.addEventListener('pointerleave', arm);
  raise();
  // 너무 많이 쌓이면 오래된 것부터 닫는다
  const open = [...layer.children].filter(c => !c._closing);
  for (const c of open.slice(0, Math.max(0, open.length - (o.max ?? 4) + 1))) c._close?.();
  el._close = close;
  flip(() => layer.append(el));
  reveal(el, 0, top ? 'top' : 'bottom');
  up.set(1);
  arm();
  return { close };
}
