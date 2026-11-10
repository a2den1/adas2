// 모든 adas2 요소의 바탕: Shadow DOM, 공유 스타일, 이벤트, 폼 연결 도우미
import globalCss from '../styles/global.css';

let globalDone = false;
/** 문서에 글꼴·색 토큰을 한 번 넣는다 */
export function ensureGlobal() {
  if (globalDone || typeof document === 'undefined') return;
  globalDone = true;
  if (document.querySelector('style[data-adas2]')) return;
  const s = document.createElement('style');
  s.dataset.adas2 = '';
  s.textContent = globalCss;
  document.head.prepend(s);
}

const sheets = new Map();
export function sheet(text) {
  let s = sheets.get(text);
  if (!s) { s = new CSSStyleSheet(); s.replaceSync(text); sheets.set(text, s); }
  return s;
}

/** 모든 요소에 공통인 그림자 안 스타일 */
export const BASE_CSS = `
:host { box-sizing: border-box; font-family: var(--a2-font); font-weight: var(--a2-weight); font-size: var(--a2-fs); color: var(--a2-text); letter-spacing: -0.01em; -webkit-tap-highlight-color: transparent;
  --t1: calc(0.14s / var(--a2-speed)); --t2: calc(0.24s / var(--a2-speed)); --t3: calc(0.34s / var(--a2-speed)); --spring: cubic-bezier(0.3, 0.9, 0.25, 1); }
:host([hidden]) { display: none !important; }
*, *::before, *::after { box-sizing: border-box; }
button { font: inherit; color: inherit; letter-spacing: inherit; background: none; border: 0; padding: 0; margin: 0; cursor: pointer; }
input, textarea { font: inherit; color: inherit; letter-spacing: inherit; }
:focus { outline: none; }
:focus-visible { outline: 2px solid var(--a2-accent); outline-offset: 2px; }
svg { display: block; }
.t { padding-top: 0.12em; }   /* 지마켓 산스가 살짝 위로 떠 보이는 것 보정 */
/* 라벨·도움말 */
.label { display: flex; align-items: baseline; gap: 6px; margin-bottom: 7px; font-size: var(--a2-fs-sm); color: var(--a2-text-muted); }
.label:empty { display: none; }
.req { color: var(--a2-accent); }
.hint { margin-top: 6px; font-size: var(--a2-fs-sm); color: var(--a2-text-muted); line-height: 1.45; }
.hint:empty { display: none; }
.hint.error { color: var(--a2-danger); }
:host([size="sm"]) { --a2-h: 32px; --a2-fs: 13px; }
:host([size="lg"]) { --a2-h: 48px; --a2-fs: 16px; }
:host([disabled]) { opacity: 0.45; pointer-events: none; }
`;

const ICONS = {
  check: '<path d="M5.5 12.5l4.2 4.2L18.5 7.8" stroke-width="2.6"/>',
  chevron: '<path d="M6.5 9.5l5.5 5.5 5.5-5.5" stroke-width="2.3"/>',
  x: '<path d="M7 7l10 10M17 7L7 17" stroke-width="2.3"/>',
  minus: '<path d="M6 12h12" stroke-width="2.4"/>',
  plus: '<path d="M12 6v12M6 12h12" stroke-width="2.4"/>',
  search: '<circle cx="11" cy="11" r="6.5" stroke-width="2.2"/><path d="M16 16l4 4" stroke-width="2.2"/>',
  eye: '<path d="M2.5 12s3.5-6.5 9.5-6.5 9.5 6.5 9.5 6.5-3.5 6.5-9.5 6.5S2.5 12 2.5 12z" stroke-width="2"/><circle cx="12" cy="12" r="2.8" stroke-width="2"/>',
  eyeOff: '<path d="M4 4l16 16M9.9 5.7A9.8 9.8 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a17 17 0 0 1-3 3.7M6.2 7.4A16.6 16.6 0 0 0 2.5 12s3.5 6.5 9.5 6.5c1.5 0 2.9-.4 4.1-1" stroke-width="2"/>',
  info: '<circle cx="12" cy="12" r="9.5" stroke-width="2"/><path d="M12 11v5.5M12 7.8v.1" stroke-width="2.4"/>',
  success: '<circle cx="12" cy="12" r="9.5" stroke-width="2"/><path d="M8 12.4l2.8 2.8 5.2-5.6" stroke-width="2.2"/>',
  warning: '<path d="M10.3 4.2a2 2 0 0 1 3.4 0l7.7 13.3a2 2 0 0 1-1.7 3H4.3a2 2 0 0 1-1.7-3z" stroke-width="2"/><path d="M12 9.5v4.3M12 17v.1" stroke-width="2.4"/>',
  danger: '<circle cx="12" cy="12" r="9.5" stroke-width="2"/><path d="M9 9l6 6M15 9l-6 6" stroke-width="2.2"/>',
};
/** 직접 그린 선 아이콘 */
export const icon = (name, size = 18) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;

export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
let uid = 0;
export const nextId = p => `${p}-${++uid}`;

export class A2Element extends HTMLElement {
  static styles = '';
  static delegatesFocus = false;
  constructor() {
    super();
    ensureGlobal();
    this.root = this.attachShadow({ mode: 'open', delegatesFocus: this.constructor.delegatesFocus });
    this.root.adoptedStyleSheets = [sheet(BASE_CSS), sheet(this.constructor.styles)];
    if (this.constructor.formAssociated) this.internals = this.attachInternals();
  }
  connectedCallback() {
    if (!this._rendered) { this._rendered = true; this.render(); }
    this.update();
  }
  attributeChangedCallback(name, oldV, newV) { if (this._rendered && oldV !== newV) this.attr(name, newV, oldV); }
  /** 속성이 바뀌었을 때. 기본은 update() */
  attr() { this.update(); }
  render() {}
  update() {}
  $(sel) { return this.root.querySelector(sel); }
  /** 문서까지 올라가는 이벤트 */
  emit(type, detail) { return this.dispatchEvent(new CustomEvent(type, { bubbles: true, composed: true, cancelable: true, detail })); }
  /** 네이티브처럼 input·change 이벤트 */
  fire(type) { this.dispatchEvent(new Event(type, { bubbles: true, composed: type === 'input' })); }
  bool(name) { return this.hasAttribute(name); }
  setBool(name, on) { this.toggleAttribute(name, !!on); }
  str(name, d = '') { const v = this.getAttribute(name); return v == null ? d : v; }
  num(name, d) { const v = this.getAttribute(name); return v == null || v === '' || Number.isNaN(+v) ? d : +v; }
  get disabled() { return this.bool('disabled'); }
  set disabled(v) { this.setBool('disabled', v); }
  get name() { return this.str('name'); }
  set name(v) { this.setAttribute('name', v); }
  /** 폼 안에서 꺼짐 상태가 바뀔 때 */
  formDisabledCallback(d) { this._formDisabled = d; this.toggleAttribute('data-form-disabled', d); }
  get form() { return this.internals ? this.internals.form : null; }
  /** 라벨·도움말 묶음 */
  fieldHead(id) { return `<label class="label t" part="label" for="${id || ''}"></label>`; }
  paintField() {
    const lab = this.$('.label'), hint = this.$('.hint');
    if (lab) lab.innerHTML = this.hasAttribute('label') ? `${esc(this.getAttribute('label'))}${this.bool('required') ? '<span class="req">*</span>' : ''}` : '';
    if (hint) {
      const err = this.getAttribute('error');
      hint.textContent = err || this.str('hint');
      hint.classList.toggle('error', !!err);
    }
  }
}

export const define = (name, cls) => { if (!customElements.get(name)) customElements.define(name, cls); };
