import { Component } from './base.js';
import { ensureSetup } from '../core/settings.js';
import { h, icon } from '../core/dom.js';
import { animate, tweenNumber } from '../core/tween.js';
import { Button } from './button.js';

/** 진행 바: value 0~1, null 이면 끝을 모르는 상태 */
export class Progress extends Component {
  constructor(o = {}) {
    super('progress', o);
    if (o.label || o.showValue) { this.header(this.el, o.label || ''); this.pct = h('span', 'a2-progress-pct', this.headSlot); }
    this.track = h('div', 'a2-progress-track', this.el);
    this.track.setAttribute('role', 'progressbar');
    this.fill = h('div', 'a2-progress-fill', this.track);
    this._value = o.value === undefined ? null : o.value;
    this._shown = this._value ?? 0;
    this.render(true);
  }
  normalize(v) { return v === null || v === undefined ? null : Math.min(1, Math.max(0, +v)); }
  render(instant) {
    const v = this._value, ind = v === null;
    this.el.classList.toggle('a2-indeterminate', ind);
    if (this.pct) this.pct.textContent = ind ? '' : `${Math.round(v * 100)}%`;
    if (ind) { this.track.removeAttribute('aria-valuenow'); this.fill.style.width = ''; return; }
    this.track.setAttribute('aria-valuenow', Math.round(v * 100));
    this._t && this._t.kill();
    if (instant) { this._shown = v; this.fill.style.width = `${v * 100}%`; }
    else this._t = tweenNumber(this._shown, v, 0.45, 'OutCubic', x => { this._shown = x; this.fill.style.width = `${x * 100}%`; });
  }
}

/** 도는 표시 */
export class Spinner extends Component {
  constructor(o = {}) {
    super('spinner', o, 'span');
    this.el.setAttribute('role', 'status');
    this.el.setAttribute('aria-label', o.label || '불러오는 중');
    if (o.size) this.el.style.setProperty('--a2-spin', o.size);
  }
}

// ── 토스트: 아래 가운데에 잠깐 뜨는 알림
let stack = null;
const TOAST_ICON = { info: 'info', success: 'ok', warning: 'warn', error: 'error' };
/**
 * @param {string} text
 * @param {{ type?: 'info'|'success'|'warning'|'error', duration?: number, action?: { label: string, onClick: Function } }} [o]
 */
export function toast(text, o = {}) {
  ensureSetup();
  if (!stack || !stack.isConnected) stack = h('div', 'a2 a2-toasts', document.body);
  const type = o.type || 'info';
  const el = h('div', `a2-toast a2-toast-${type}`, stack);
  el.setAttribute('role', type === 'error' ? 'alert' : 'status');
  icon(TOAST_ICON[type] || 'info', 'a2-toast-icon', el);
  h('span', 'a2-toast-text', el, text);
  let closed = false, timer = 0;
  const close = () => {
    if (closed) return; closed = true; clearTimeout(timer);
    const hgt = el.offsetHeight;
    animate({ p: 1 }, { p: 0 }, { duration: 0.22, ease: 'InCubic', onUpdate: ({ p }) => {
      el.style.opacity = p; el.style.transform = `translateY(${(1 - p) * 12}px) scale(${0.96 + 0.04 * p})`;
      el.style.marginTop = `${-(1 - p) * hgt}px`;
    }, onDone: () => el.remove() });
  };
  if (o.action) {
    const b = h('button', 'a2-toast-action', el, o.action.label);
    b.type = 'button';
    b.addEventListener('click', () => { o.action.onClick && o.action.onClick(); close(); });
  }
  el.addEventListener('click', e => { if (!e.target.closest('.a2-toast-action')) close(); });
  animate({ p: 0 }, { p: 1 }, { duration: 0.32, ease: 'OutBack', onUpdate: ({ p }) => {
    el.style.opacity = Math.min(1, p * 1.4); el.style.transform = `translateY(${(1 - p) * 18}px) scale(${0.94 + 0.06 * p})`;
  } });
  const dur = o.duration ?? 3;
  if (dur > 0) {
    timer = setTimeout(close, dur * 1000);
    el.addEventListener('pointerenter', () => clearTimeout(timer));
    el.addEventListener('pointerleave', () => { if (!closed) timer = setTimeout(close, 1200); });
  }
  return { close };
}

// ── 대화상자
/**
 * @param {{ title?: string, message?: string, content?: (body: HTMLElement) => void,
 *           buttons?: { label: string, value?: any, variant?: string }[], dismissable?: boolean }} o
 * @returns {Promise<any>} 누른 버튼의 value (바깥·Esc 로 닫으면 undefined)
 */
export function dialog(o = {}) {
  ensureSetup();
  return new Promise(resolve => {
    const layer = h('div', 'a2 a2-dialog-layer', document.body);
    const scrim = h('div', 'a2-scrim', layer);
    const box = h('div', 'a2-dialog', layer);
    box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true');
    if (o.title) { const t = h('h2', 'a2-dialog-title', box, o.title); box.setAttribute('aria-label', o.title); t.id = `a2d${Date.now()}`; }
    if (o.message) h('p', 'a2-dialog-msg', box, o.message);
    if (o.content) o.content(h('div', 'a2-dialog-body', box));
    const actions = h('div', 'a2-dialog-actions', box);
    let done = false, prevFocus = document.activeElement;
    const close = v => {
      if (done) return; done = true;
      removeEventListener('keydown', key, true);
      animate({ p: 1 }, { p: 0 }, { duration: 0.16, ease: 'OutSine', onUpdate: ({ p }) => paint(p), onDone: () => { layer.remove(); prevFocus && prevFocus.focus && prevFocus.focus({ preventScroll: true }); } });
      resolve(v);
    };
    const btns = (o.buttons || [{ label: '확인', value: true, variant: 'primary' }]).map(b => {
      const btn = new Button({ text: b.label, variant: b.variant || 'soft' }).mount(actions);
      btn.on('click', () => close(b.value));
      return btn;
    });
    const key = e => { if (e.key === 'Escape' && o.dismissable !== false) { e.stopPropagation(); close(undefined); } };
    addEventListener('keydown', key, true);
    scrim.addEventListener('click', () => { if (o.dismissable !== false) close(undefined); });
    const paint = p => { scrim.style.opacity = p; box.style.opacity = Math.min(1, p * 1.3); box.style.transform = `translateY(${(1 - p) * 16}px) scale(${0.96 + 0.04 * p})`; };
    paint(0);
    animate({ p: 0 }, { p: 1 }, { duration: 0.28, ease: 'OutCubic', onUpdate: ({ p }) => paint(p) });
    const primary = btns[btns.length - 1];
    setTimeout(() => primary && primary.el.focus({ preventScroll: true }), 30);
  });
}
/** 확인/취소. 확인이면 true */
export const confirm = (message, o = {}) => dialog({
  title: o.title, message, ...o,
  buttons: [{ label: o.cancel || '취소', value: false, variant: 'soft' }, { label: o.ok || '확인', value: true, variant: o.danger ? 'danger' : 'primary' }],
}).then(v => v === true);
/** 알림 */
export const alert = (message, o = {}) => dialog({ title: o.title, message, buttons: [{ label: o.ok || '확인', value: true, variant: 'primary' }] }).then(() => undefined);
