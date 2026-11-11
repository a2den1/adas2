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
  --t1: calc(0.14s / var(--a2-speed)); --t2: calc(0.24s / var(--a2-speed)); --t3: calc(0.34s / var(--a2-speed)); --spring: cubic-bezier(0.3, 0.9, 0.25, 1); --pop: cubic-bezier(0.3, 1.5, 0.5, 1);
  /* 테와 조각: --in 은 바깥 가장자리에서 조각까지, --ri 는 조각의 모서리 */
  --in: calc(var(--a2-ring) + var(--a2-gap)); --ri: calc(var(--a2-radius) - var(--a2-ring) - var(--a2-gap)); }
:host([hidden]) { display: none !important; }
*, *::before, *::after { box-sizing: border-box; }
button { font: inherit; color: inherit; letter-spacing: inherit; background: none; border: 0; padding: 0; margin: 0; cursor: pointer; }
input, textarea { font: inherit; color: inherit; letter-spacing: inherit; }
:focus { outline: none; }
:focus-visible { outline: 2px solid var(--a2-accent); outline-offset: 2px; }
svg { display: block; }
/* 작은 버튼의 누르는 범위를 보이는 것보다 넓힌다 */
.hit { position: relative; }
.hit::before { content: ''; position: absolute; inset: -7px; }
.t { padding-top: 0.12em; }   /* 지마켓 산스가 살짝 위로 떠 보이는 것 보정 */
/* 라벨·도움말 */
.label { display: flex; align-items: baseline; gap: 6px; margin-bottom: 7px; font-size: var(--a2-fs-sm); color: var(--a2-text-muted); }
.label:empty { display: none; }
.req { color: var(--a2-accent); }
.hint { margin-top: 6px; font-size: var(--a2-fs-sm); color: var(--a2-text-muted); line-height: 1.45; }
.hint:empty { display: none; }
.hint.error { color: var(--a2-danger); }
:host([size="sm"]) { --a2-h: 36px; --a2-fs: 13px; --a2-radius: 12px; }
:host([size="lg"]) { --a2-h: 52px; --a2-fs: 16px; --a2-radius: 17px; }
:host([disabled]) { opacity: 0.45; pointer-events: none; }
`;

// 아이콘: Font Awesome Free 6.7.2 (https://fontawesome.com, 아이콘 CC BY 4.0) 의 solid 모양
const ICONS = {
  check: ['0 0 448 512', 'M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z'],
  chevron: ['0 0 512 512', 'M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z'],
  x: ['0 0 384 512', 'M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z'],
  minus: ['0 0 448 512', 'M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z'],
  plus: ['0 0 448 512', 'M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z'],
  search: ['0 0 512 512', 'M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z'],
  eye: ['0 0 576 512', 'M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z'],
  eyeOff: ['0 0 640 512', 'M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z'],
  info: ['0 0 512 512', 'M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z'],
  success: ['0 0 512 512', 'M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z'],
  warning: ['0 0 512 512', 'M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480L40 480c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24s24-10.7 24-24l0-112c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z'],
  danger: ['0 0 512 512', 'M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z'],
};
/** 아이콘 SVG. size 는 한 변 크기(px) */
export const icon = (name, size = 16) => {
  const [box, d] = ICONS[name] || ['0 0 16 16', ''];
  return `<svg width="${size}" height="${size}" viewBox="${box}" fill="currentColor" aria-hidden="true"><path d="${d}"/></svg>`;
};

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
    const C = this.constructor;
    if (!Object.prototype.hasOwnProperty.call(C, '_sheets')) C._sheets = [sheet(BASE_CSS), sheet(C.styles)];
    this.root.adoptedStyleSheets = C._sheets;
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
