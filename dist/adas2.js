/*! adas2 v4.0.1 | (c) 2026 a2den1 | adas2 License: 사용 자유, 수정·2차 배포 금지 | https://github.com/a2den1/adas2 */
var adas2 = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __export = (target2, all) => {
    for (var name in all)
      __defProp(target2, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  // src/index.js
  var index_exports = {};
  __export(index_exports, {
    Ease: () => Ease,
    alert: () => alert,
    animate: () => animate,
    confirm: () => confirm,
    default: () => index_default,
    evaluate: () => evaluate,
    keyNames: () => keyNames,
    matchKey: () => matches,
    prompt: () => prompt,
    theme: () => theme,
    themes: () => themes,
    toast: () => toast,
    version: () => version
  });

  // src/styles/global.css
  var global_default = '/* adas2 — 문서 전체에 한 번 들어가는 스타일: 글꼴, 색 토큰, 정의 전 깜빡임 막기 */\r\n\r\n@font-face { font-family: "GmarketSans"; font-weight: 300; font-display: swap; src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansLight.woff") format("woff"); }\r\n@font-face { font-family: "GmarketSans"; font-weight: 500; font-display: swap; src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff") format("woff"); }\r\n@font-face { font-family: "GmarketSans"; font-weight: 700; font-display: swap; src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansBold.woff") format("woff"); }\r\n\r\n:root {\r\n  --a2-font: "GmarketSans", "Pretendard", system-ui, -apple-system, "Malgun Gothic", sans-serif;\r\n  --a2-weight: 300;\r\n  --a2-weight-strong: 500;\r\n  --a2-fs: 14px;\r\n  --a2-fs-sm: 12.5px;\r\n  --a2-fs-lg: 17px;\r\n  --a2-h: 40px;\r\n  --a2-radius: 10px;\r\n  --a2-radius-lg: 16px;\r\n  --a2-speed: 1;\r\n}\r\n\r\n/* 어두운 화면 (기본) */\r\n:root, [data-a2-theme="dark"] {\r\n  --a2-fill: rgba(243, 238, 233, 0.07); --a2-fill-hover: rgba(243, 238, 233, 0.1); --a2-fill-active: rgba(243, 238, 233, 0.14);\r\n  color-scheme: dark;\r\n  --a2-bg: #1B1917;\r\n  --a2-surface: #272421;\r\n  --a2-surface-hover: #2F2B28;\r\n  --a2-surface-active: #36312D;\r\n  --a2-raised: #2C2825;\r\n  --a2-accent: #FF7A45;\r\n  --a2-accent-hover: #FF8B5C;\r\n  --a2-accent-pressed: #EB6630;\r\n  --a2-accent-soft: rgba(255, 122, 69, 0.16);\r\n  --a2-on-accent: #FFFFFF;\r\n  --a2-text: #F3EEE9;\r\n  --a2-text-muted: rgba(243, 238, 233, 0.58);\r\n  --a2-text-faint: rgba(243, 238, 233, 0.3);\r\n  --a2-danger: #F25F5C;\r\n  --a2-success: #5CCB8A;\r\n  --a2-warning: #F4B740;\r\n  --a2-shadow: 0 12px 36px rgba(0, 0, 0, 0.42), 0 2px 8px rgba(0, 0, 0, 0.25);\r\n  --a2-scrim: rgba(10, 9, 8, 0.55);\r\n  --a2-tip: rgba(14, 13, 12, 0.94);\r\n}\r\n\r\n/* 밝은 화면 */\r\n[data-a2-theme="light"] {\r\n  --a2-fill: rgba(41, 35, 31, 0.06); --a2-fill-hover: rgba(41, 35, 31, 0.09); --a2-fill-active: rgba(41, 35, 31, 0.13);\r\n  color-scheme: light;\r\n  --a2-bg: #FAF7F3;\r\n  --a2-surface: #EFEAE4;\r\n  --a2-surface-hover: #E8E2DA;\r\n  --a2-surface-active: #E0D9D0;\r\n  --a2-raised: #FFFFFF;\r\n  --a2-accent: #F26A32;\r\n  --a2-accent-hover: #FF7A45;\r\n  --a2-accent-pressed: #D9581F;\r\n  --a2-accent-soft: rgba(242, 106, 50, 0.13);\r\n  --a2-on-accent: #FFFFFF;\r\n  --a2-text: #29231F;\r\n  --a2-text-muted: rgba(41, 35, 31, 0.58);\r\n  --a2-text-faint: rgba(41, 35, 31, 0.3);\r\n  --a2-danger: #D84542;\r\n  --a2-success: #259B5A;\r\n  --a2-warning: #C98A10;\r\n  --a2-shadow: 0 12px 36px rgba(60, 40, 20, 0.14), 0 2px 8px rgba(60, 40, 20, 0.08);\r\n  --a2-scrim: rgba(40, 30, 20, 0.3);\r\n  --a2-tip: rgba(41, 35, 31, 0.94);\r\n}\r\n\r\n/* 바다 */\r\n[data-a2-theme="ocean"] {\r\n  --a2-fill: rgba(237, 241, 246, 0.07); --a2-fill-hover: rgba(237, 241, 246, 0.1); --a2-fill-active: rgba(237, 241, 246, 0.14);\r\n  color-scheme: dark;\r\n  --a2-bg: #14181E;\r\n  --a2-surface: #1F252D;\r\n  --a2-surface-hover: #262D37;\r\n  --a2-surface-active: #2D3540;\r\n  --a2-raised: #232A33;\r\n  --a2-accent: #4C8DFF;\r\n  --a2-accent-hover: #649CFF;\r\n  --a2-accent-pressed: #3676E6;\r\n  --a2-accent-soft: rgba(76, 141, 255, 0.16);\r\n  --a2-on-accent: #FFFFFF;\r\n  --a2-text: #EDF1F6;\r\n  --a2-text-muted: rgba(237, 241, 246, 0.58);\r\n  --a2-text-faint: rgba(237, 241, 246, 0.3);\r\n  --a2-danger: #F2645F;\r\n  --a2-success: #4FC68A;\r\n  --a2-warning: #F1B643;\r\n  --a2-shadow: 0 12px 36px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3);\r\n  --a2-scrim: rgba(5, 8, 12, 0.55);\r\n  --a2-tip: rgba(10, 13, 17, 0.94);\r\n}\r\n\r\n/* 정의되기 전에는 숨겨서 깜빡임을 막는다 */\r\n:is(a2-button, a2-input, a2-textarea, a2-number, a2-select, a2-checkbox, a2-switch, a2-radio-group, a2-slider,\r\n    a2-segmented, a2-tabs, a2-color, a2-keybind, a2-card, a2-badge, a2-progress, a2-spinner, a2-dialog, a2-drawer, a2-menu):not(:defined) {\r\n  visibility: hidden;\r\n}\r\na2-option, a2-segment, a2-menu-item, a2-tab-panel { display: none; }\r\na2-tab-panel[data-on] { display: block; }\r\n\r\n@media (prefers-reduced-motion: reduce) { :root { --a2-speed: 1000; } }\r\n';

  // src/core/base.js
  var globalDone = false;
  function ensureGlobal() {
    if (globalDone || typeof document === "undefined") return;
    globalDone = true;
    if (document.querySelector("style[data-adas2]")) return;
    const s = document.createElement("style");
    s.dataset.adas2 = "";
    s.textContent = global_default;
    document.head.prepend(s);
  }
  var sheets = /* @__PURE__ */ new Map();
  function sheet(text) {
    let s = sheets.get(text);
    if (!s) {
      s = new CSSStyleSheet();
      s.replaceSync(text);
      sheets.set(text, s);
    }
    return s;
  }
  var BASE_CSS = `
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
  var ICONS = {
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
    danger: '<circle cx="12" cy="12" r="9.5" stroke-width="2"/><path d="M9 9l6 6M15 9l-6 6" stroke-width="2.2"/>'
  };
  var icon = (name, size = 18) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`;
  var esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  var A2Element = class extends HTMLElement {
    constructor() {
      super();
      ensureGlobal();
      this.root = this.attachShadow({ mode: "open", delegatesFocus: this.constructor.delegatesFocus });
      this.root.adoptedStyleSheets = [sheet(BASE_CSS), sheet(this.constructor.styles)];
      if (this.constructor.formAssociated) this.internals = this.attachInternals();
    }
    connectedCallback() {
      if (!this._rendered) {
        this._rendered = true;
        this.render();
      }
      this.update();
    }
    attributeChangedCallback(name, oldV, newV) {
      if (this._rendered && oldV !== newV) this.attr(name, newV, oldV);
    }
    /** 속성이 바뀌었을 때. 기본은 update() */
    attr() {
      this.update();
    }
    render() {
    }
    update() {
    }
    $(sel) {
      return this.root.querySelector(sel);
    }
    /** 문서까지 올라가는 이벤트 */
    emit(type, detail) {
      return this.dispatchEvent(new CustomEvent(type, { bubbles: true, composed: true, cancelable: true, detail }));
    }
    /** 네이티브처럼 input·change 이벤트 */
    fire(type) {
      this.dispatchEvent(new Event(type, { bubbles: true, composed: type === "input" }));
    }
    bool(name) {
      return this.hasAttribute(name);
    }
    setBool(name, on) {
      this.toggleAttribute(name, !!on);
    }
    str(name, d = "") {
      const v = this.getAttribute(name);
      return v == null ? d : v;
    }
    num(name, d) {
      const v = this.getAttribute(name);
      return v == null || v === "" || Number.isNaN(+v) ? d : +v;
    }
    get disabled() {
      return this.bool("disabled");
    }
    set disabled(v) {
      this.setBool("disabled", v);
    }
    get name() {
      return this.str("name");
    }
    set name(v) {
      this.setAttribute("name", v);
    }
    /** 폼 안에서 꺼짐 상태가 바뀔 때 */
    formDisabledCallback(d) {
      this._formDisabled = d;
      this.toggleAttribute("data-form-disabled", d);
    }
    get form() {
      return this.internals ? this.internals.form : null;
    }
    /** 라벨·도움말 묶음 */
    fieldHead(id) {
      return `<label class="label t" part="label" for="${id || ""}"></label>`;
    }
    paintField() {
      const lab = this.$(".label"), hint = this.$(".hint");
      if (lab) lab.innerHTML = this.hasAttribute("label") ? `${esc(this.getAttribute("label"))}${this.bool("required") ? '<span class="req">*</span>' : ""}` : "";
      if (hint) {
        const err = this.getAttribute("error");
        hint.textContent = err || this.str("hint");
        hint.classList.toggle("error", !!err);
      }
    }
  };
  __publicField(A2Element, "styles", "");
  __publicField(A2Element, "delegatesFocus", false);
  var define = (name, cls) => {
    if (!customElements.get(name)) customElements.define(name, cls);
  };

  // src/elements/button.js
  var A2Button = class extends A2Element {
    render() {
      this.root.innerHTML = `<button class="b" part="base" type="button"><span class="spin" aria-hidden="true"></span><slot name="prefix"></slot><span class="lbl t"><slot></slot></span><slot name="suffix"></slot></button>`;
      this.btn = this.$("button");
      this.btn.addEventListener("click", (e) => {
        if (this.disabled || this.bool("loading")) {
          e.preventDefault();
          e.stopImmediatePropagation();
          return;
        }
        const f = this.form, t = this.str("type", "button");
        if (f && t === "submit") f.requestSubmit();
        else if (f && t === "reset") f.reset();
      });
      this.root.querySelector("slot:not([name])").addEventListener("slotchange", () => this.update());
    }
    update() {
      this.btn.disabled = this.disabled;
      this.btn.setAttribute("aria-busy", this.bool("loading"));
      const text = [...this.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim() || n.nodeType === 1 && !n.slot && n.tagName !== "SVG" && n.tagName !== "I");
      this.btn.classList.toggle("square", !text);
      if (this.hasAttribute("label")) this.btn.setAttribute("aria-label", this.getAttribute("label"));
    }
    get loading() {
      return this.bool("loading");
    }
    set loading(v) {
      this.setBool("loading", v);
    }
    click() {
      this.btn ? this.btn.click() : super.click();
    }
  };
  __publicField(A2Button, "formAssociated", true);
  __publicField(A2Button, "delegatesFocus", true);
  __publicField(A2Button, "observedAttributes", ["disabled", "loading", "type"]);
  __publicField(A2Button, "styles", `
:host { display: inline-flex; vertical-align: middle; }
:host([block]) { display: flex; }
.b {
  position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  width: 100%; height: var(--a2-h); padding: 0 16px; border-radius: var(--a2-radius);
  font-weight: var(--a2-weight-strong); white-space: nowrap; user-select: none;
  background: var(--a2-fill); color: var(--a2-text);
  transition: background-color var(--t1), color var(--t1), transform var(--t1) var(--spring);
}
.b:hover { background: var(--a2-fill-hover); }
.b:active { transform: scale(0.97); background: var(--a2-fill-active); }
:host([variant="primary"]) .b { background: var(--a2-accent); color: var(--a2-on-accent); }
:host([variant="primary"]) .b:hover { background: var(--a2-accent-hover); }
:host([variant="primary"]) .b:active { background: var(--a2-accent-pressed); }
:host([variant="soft"]) .b { background: var(--a2-accent-soft); color: var(--a2-accent); }
:host([variant="soft"]) .b:hover { background: color-mix(in srgb, var(--a2-accent) 24%, transparent); }
:host([variant="ghost"]) .b { background: transparent; }
:host([variant="ghost"]) .b:hover { background: var(--a2-fill-hover); }
:host([variant="danger"]) .b { background: var(--a2-danger); color: #fff; }
:host([variant="danger"]) .b:hover { background: color-mix(in srgb, var(--a2-danger) 86%, #fff); }
.b.square { width: var(--a2-h); padding: 0; }
.lbl { display: inline-flex; align-items: center; gap: 8px; }
::slotted(svg), ::slotted(i) { flex: none; }
.spin { position: absolute; width: 16px; height: 16px; border-radius: 50%; border: 2px solid currentColor; border-right-color: transparent; opacity: 0; animation: a2spin calc(0.75s / var(--a2-speed)) linear infinite; }
:host([loading]) .spin { opacity: 1; }
:host([loading]) .lbl, :host([loading]) slot[name] { visibility: hidden; }
:host([loading]) .b { pointer-events: none; }
@keyframes a2spin { to { rotate: 360deg; } }
`);
  define("a2-button", A2Button);

  // src/elements/input.js
  var FIELD_CSS = `
:host { display: block; }
.box {
  position: relative; display: flex; align-items: center; gap: 8px; min-height: var(--a2-h); padding: 0 12px;
  border-radius: var(--a2-radius); background: var(--a2-fill); cursor: text;
  transition: background-color var(--t1), box-shadow var(--t1);
}
.box:hover { background: var(--a2-fill-hover); }
.box:focus-within { background: var(--a2-fill-active); }
:host([error]) .box { background: color-mix(in srgb, var(--a2-danger) 14%, var(--a2-fill)); }
.ctl {
  flex: 1; min-width: 0; height: var(--a2-h); padding: 0.12em 0 0; border: 0; outline: 0; background: transparent;
  color: var(--a2-text); caret-color: var(--a2-accent);
}
.ctl::placeholder { color: var(--a2-text-faint); }
.ctl::selection { background: var(--a2-accent-soft); }
.ctl:focus-visible { outline: 0; }
::slotted([slot="prefix"]), ::slotted([slot="suffix"]) { color: var(--a2-text-muted); flex: none; }
.mini {
  flex: none; width: 24px; height: 24px; border-radius: 6px; display: none; place-items: center; color: var(--a2-text-muted);
  transition: background-color var(--t1), color var(--t1);
}
.mini:hover { background: var(--a2-fill-active); color: var(--a2-text); }
.count { flex: none; font-size: var(--a2-fs-sm); color: var(--a2-text-faint); padding-top: 0.12em; }
.count:empty { display: none; }
`;
  var FieldBase = class extends A2Element {
    syncForm() {
      if (!this.ctl) return;
      this.internals.setFormValue(this.ctl.value);
      this.internals.setValidity(this.ctl.validity, this.ctl.validationMessage, this.ctl);
    }
    get value() {
      return this.ctl ? this.ctl.value : this.str("value");
    }
    set value(v) {
      if (this.ctl) {
        this.ctl.value = v ?? "";
        this.after();
      } else this.setAttribute("value", v ?? "");
    }
    after() {
      this.syncForm();
    }
    formResetCallback() {
      this.value = this.str("value");
    }
    focus(o) {
      this.ctl ? this.ctl.focus(o) : super.focus(o);
    }
    select() {
      this.ctl && this.ctl.select();
    }
    checkValidity() {
      return this.internals.checkValidity();
    }
    reportValidity() {
      return this.internals.reportValidity();
    }
    copyAttrs(list) {
      for (const a of list) {
        const v = this.getAttribute(a);
        if (v == null) this.ctl.removeAttribute(a);
        else this.ctl.setAttribute(a, v);
      }
      this.ctl.disabled = this.disabled;
    }
  };
  __publicField(FieldBase, "formAssociated", true);
  __publicField(FieldBase, "delegatesFocus", true);
  var A2Input = class extends FieldBase {
    render() {
      this.root.innerHTML = `${this.fieldHead("f")}<div class="box" part="box"><slot name="prefix"></slot><input id="f" class="ctl" part="input"><button class="mini clear" type="button" tabindex="-1" aria-label="지우기">${icon("x", 14)}</button><button class="mini reveal" type="button" tabindex="-1" aria-label="보이기">${icon("eye", 16)}</button><slot name="suffix"></slot></div><div class="hint t" part="hint"></div>`;
      this.ctl = this.$("input");
      this.ctl.value = this.str("value");
      this.$(".box").addEventListener("pointerdown", (e) => {
        if (e.target === this.$(".box")) {
          e.preventDefault();
          this.ctl.focus();
        }
      });
      this.ctl.addEventListener("input", () => this.after());
      this.ctl.addEventListener("change", () => this.fire("change"));
      this.$(".clear").addEventListener("click", () => {
        this.ctl.value = "";
        this.after();
        this.fire("input");
        this.fire("change");
        this.ctl.focus();
      });
      this.$(".reveal").addEventListener("click", () => {
        this._reveal = !this._reveal;
        this.update();
      });
    }
    attr(name, v) {
      if (name === "value") {
        if (this.ctl.value !== (v ?? "")) this.value = v ?? "";
      } else this.update();
    }
    update() {
      this.paintField();
      this.copyAttrs(["placeholder", "readonly", "required", "maxlength", "minlength", "pattern", "autocomplete", "inputmode"]);
      const t = this.str("type", "text");
      this.ctl.type = t === "password" && this._reveal ? "text" : t;
      const rv = this.$(".reveal");
      rv.style.display = t === "password" ? "grid" : "none";
      if (rv.dataset.on !== String(!!this._reveal)) {
        rv.dataset.on = String(!!this._reveal);
        rv.innerHTML = icon(this._reveal ? "eyeOff" : "eye", 16);
        rv.setAttribute("aria-label", this._reveal ? "가리기" : "보이기");
      }
      if (this.hasAttribute("label")) this.ctl.setAttribute("aria-label", this.getAttribute("label"));
      this.after();
    }
    after() {
      super.after();
      this.$(".clear").style.display = this.bool("clearable") && this.ctl.value ? "grid" : "none";
    }
  };
  __publicField(A2Input, "observedAttributes", ["label", "hint", "error", "placeholder", "type", "disabled", "readonly", "required", "clearable", "maxlength", "minlength", "pattern", "autocomplete", "inputmode", "value"]);
  __publicField(A2Input, "styles", FIELD_CSS);
  var A2Textarea = class extends FieldBase {
    render() {
      this.root.innerHTML = `${this.fieldHead("f")}<div class="box" part="box"><textarea id="f" class="ctl" part="input"></textarea><span class="count"></span></div><div class="hint t" part="hint"></div>`;
      this.ctl = this.$("textarea");
      this.ctl.value = this.str("value");
      this.$(".box").addEventListener("pointerdown", (e) => {
        if (e.target === this.$(".box")) {
          e.preventDefault();
          this.ctl.focus();
        }
      });
      this.ctl.addEventListener("input", () => this.after());
      this.ctl.addEventListener("change", () => this.fire("change"));
      new ResizeObserver(() => this.fit()).observe(this);
    }
    attr(name, v) {
      if (name === "value") {
        if (this.ctl.value !== (v ?? "")) this.value = v ?? "";
      } else this.update();
    }
    update() {
      this.paintField();
      this.copyAttrs(["placeholder", "readonly", "required", "maxlength"]);
      if (this.hasAttribute("label")) this.ctl.setAttribute("aria-label", this.getAttribute("label"));
      this.after();
    }
    fit() {
      const lh = parseFloat(getComputedStyle(this.ctl).lineHeight) || 22;
      this.ctl.style.height = "auto";
      this.ctl.style.height = `${Math.max(this.num("rows", 3) * lh, this.ctl.scrollHeight)}px`;
    }
    after() {
      super.after();
      const max = this.getAttribute("maxlength");
      this.$(".count").textContent = max ? `${this.ctl.value.length}/${max}` : "";
      this.fit();
    }
  };
  __publicField(A2Textarea, "observedAttributes", ["label", "hint", "error", "placeholder", "disabled", "readonly", "required", "maxlength", "rows", "value"]);
  __publicField(A2Textarea, "styles", `${FIELD_CSS}
.box { align-items: flex-start; padding: 10px 12px; }
.ctl { height: auto; line-height: 1.6; resize: none; padding: 0; overflow: hidden; }
.count { align-self: flex-end; }
`);
  define("a2-input", A2Input);
  define("a2-textarea", A2Textarea);

  // src/core/evaluator.js
  var FNS = {
    sin: Math.sin,
    cos: Math.cos,
    tan: Math.tan,
    asin: Math.asin,
    acos: Math.acos,
    atan: Math.atan,
    sqrt: Math.sqrt,
    abs: Math.abs,
    floor: Math.floor,
    ceil: Math.ceil,
    round: Math.round,
    log: Math.log10,
    ln: Math.log,
    exp: Math.exp,
    min: Math.min,
    max: Math.max,
    pow: Math.pow,
    clamp: (v, a, b) => Math.min(Math.max(v, a), b)
  };
  var CONSTS = { pi: Math.PI, e: Math.E };
  function tokenize(src) {
    const out = [];
    let i = 0;
    while (i < src.length) {
      const c = src[i];
      if (/\s/.test(c)) {
        i++;
        continue;
      }
      if (/[0-9.]/.test(c)) {
        const m = /^(\d*\.?\d+(?:e[+-]?\d+)?|\d+\.)/i.exec(src.slice(i));
        if (!m) throw new Error(`숫자 형식: ${src.slice(i, i + 4)}`);
        out.push({ t: "num", v: parseFloat(m[0]) });
        i += m[0].length;
        continue;
      }
      if (/[a-z_]/i.test(c)) {
        const m = /^[a-z_][a-z0-9_]*/i.exec(src.slice(i));
        out.push({ t: "id", v: m[0].toLowerCase() });
        i += m[0].length;
        continue;
      }
      if ("+-*/%^(),".includes(c)) {
        out.push({ t: c });
        i++;
        continue;
      }
      throw new Error(`알 수 없는 문자: ${c}`);
    }
    return out;
  }
  function evaluate(src, vars = {}) {
    try {
      const tk = tokenize(String(src));
      let p = 0;
      const peek = () => tk[p], eat = (t) => {
        if (tk[p] && tk[p].t === t) return tk[p++];
        throw new Error(`'${t}' 가 필요합니다`);
      };
      const expr = () => {
        let v = term();
        while (peek() && (peek().t === "+" || peek().t === "-")) v = tk[p++].t === "+" ? v + term() : v - term();
        return v;
      };
      const term = () => {
        let v = unary();
        for (; ; ) {
          const t = peek();
          if (!t) break;
          if (t.t === "*") {
            p++;
            v *= unary();
          } else if (t.t === "/") {
            p++;
            v /= unary();
          } else if (t.t === "%") {
            p++;
            v %= unary();
          } else if (t.t === "num" || t.t === "id" || t.t === "(") v *= unary();
          else break;
        }
        return v;
      };
      const unary = () => {
        const t = peek();
        if (t && t.t === "-") {
          p++;
          return -unary();
        }
        if (t && t.t === "+") {
          p++;
          return unary();
        }
        return power();
      };
      const power = () => {
        const b = atom();
        if (peek() && peek().t === "^") {
          p++;
          return Math.pow(b, unary());
        }
        return b;
      };
      const atom = () => {
        const t = tk[p++];
        if (!t) throw new Error("식이 끝났습니다");
        if (t.t === "num") return t.v;
        if (t.t === "(") {
          const v = expr();
          eat(")");
          return v;
        }
        if (t.t === "id") {
          if (peek() && peek().t === "(") {
            const fn = FNS[t.v];
            if (!fn) throw new Error(`없는 함수: ${t.v}`);
            p++;
            const args = [];
            if (!(peek() && peek().t === ")")) {
              args.push(expr());
              while (peek() && peek().t === ",") {
                p++;
                args.push(expr());
              }
            }
            eat(")");
            return fn(...args);
          }
          if (t.v in vars) return +vars[t.v];
          if (t.v in CONSTS) return CONSTS[t.v];
          throw new Error(`없는 이름: ${t.v}`);
        }
        throw new Error(`예상하지 못한 '${t.t}'`);
      };
      if (!tk.length) return { ok: false, error: "비어 있음" };
      const value = expr();
      if (p < tk.length) throw new Error(`남은 글자: ${tk[p].t === "num" || tk[p].t === "id" ? tk[p].v : tk[p].t}`);
      if (!Number.isFinite(value)) return { ok: false, error: "숫자가 아님" };
      return { ok: true, value };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  }

  // src/elements/number.js
  var clamp = (v, a, b) => Math.min(Math.max(v, a), b);
  var decimalsOf = (s) => {
    const t = String(s);
    return t.includes(".") ? t.split(".")[1].length : 0;
  };
  var A2Number = class extends A2Element {
    render() {
      this.root.innerHTML = `${this.fieldHead("f")}<div class="box" part="box"><button class="step dec" type="button" tabindex="-1" aria-label="줄이기">${icon("minus", 16)}</button><input id="f" class="ctl" part="input" inputmode="decimal" autocomplete="off"><span class="calc"></span><span class="unit"></span><button class="step inc" type="button" tabindex="-1" aria-label="늘리기">${icon("plus", 16)}</button></div><div class="hint t" part="hint"></div>`;
      this.ctl = this.$("input");
      this._v = this.clean(this.num("value", this.num("min", 0) > 0 ? this.num("min", 0) : 0));
      this.ctl.addEventListener("input", () => this.preview());
      this.ctl.addEventListener("focus", () => {
        this.ctl.value = String(this._v);
        this.ctl.select();
      });
      this.ctl.addEventListener("blur", () => this.commit());
      this.ctl.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          this.commit();
          this.ctl.select();
        } else if (e.key === "Escape") {
          this.ctl.value = String(this._v);
          this.preview();
        } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
          e.preventDefault();
          this.bump(e.key === "ArrowUp" ? 1 : -1, e.shiftKey ? 10 : 1);
          this.ctl.value = String(this._v);
          this.fire("change");
        }
      });
      for (const [sel, d] of [[".dec", -1], [".inc", 1]]) {
        const b = this.$(sel);
        let t1 = 0, t2 = 0, held = false;
        const stop = () => {
          clearTimeout(t1);
          clearInterval(t2);
          if (held) {
            held = false;
            this.fire("change");
          }
        };
        b.addEventListener("pointerdown", (e) => {
          if (e.button !== 0) return;
          e.preventDefault();
          held = true;
          this.bump(d);
          t1 = setTimeout(() => {
            t2 = setInterval(() => this.bump(d), 55);
          }, 380);
        });
        for (const ev of ["pointerup", "pointerleave", "pointercancel"]) b.addEventListener(ev, stop);
      }
    }
    get min() {
      return this.num("min", -Infinity);
    }
    get max() {
      return this.num("max", Infinity);
    }
    get step() {
      return this.num("step", 1);
    }
    get decimals() {
      return this.num("decimals", decimalsOf(this.step));
    }
    clean(v) {
      v = +v;
      if (!Number.isFinite(v)) return this._v ?? 0;
      const base = Number.isFinite(this.min) ? this.min : 0;
      v = Math.round((v - base) / this.step) * this.step + base;
      return +clamp(v, this.min, this.max).toFixed(Math.min(10, this.decimals));
    }
    get value() {
      return this._v;
    }
    set value(v) {
      const nv = this.clean(v);
      if (nv === this._v) return;
      this._v = nv;
      if (this._rendered) this.update();
    }
    bump(dir, mult = 1) {
      const nv = this.clean(this._v + dir * this.step * mult);
      if (nv !== this._v) {
        this._v = nv;
        this.update();
        this.fire("input");
      }
    }
    preview() {
      const r = evaluate(this.ctl.value, { x: this._v }), c = this.$(".calc");
      const plain = /^\s*-?\d*\.?\d+\s*$/.test(this.ctl.value);
      c.classList.toggle("bad", !r.ok && this.ctl.value.trim() !== "");
      c.textContent = !r.ok ? this.ctl.value.trim() ? "?" : "" : plain ? "" : `= ${this.clean(r.value)}`;
    }
    commit() {
      const r = evaluate(this.ctl.value, { x: this._v });
      this.$(".calc").textContent = "";
      if (r.ok) {
        const nv = this.clean(r.value);
        if (nv !== this._v) {
          this._v = nv;
          this.fire("input");
          this.fire("change");
        }
      }
      this.update();
    }
    attr(name, v) {
      if (name === "value") this.value = v;
      else this.update();
    }
    update() {
      this.paintField();
      this.$(".unit").textContent = this.str("unit");
      if (this.root.activeElement !== this.ctl) this.ctl.value = this._v.toFixed(this.decimals);
      this.$(".dec").disabled = this._v <= this.min || this.disabled;
      this.$(".inc").disabled = this._v >= this.max || this.disabled;
      this.ctl.disabled = this.disabled;
      if (this.hasAttribute("label")) this.ctl.setAttribute("aria-label", this.getAttribute("label"));
      this.internals.setFormValue(String(this._v));
    }
    formResetCallback() {
      this._v = this.clean(this.num("value", 0));
      this.update();
    }
  };
  __publicField(A2Number, "formAssociated", true);
  __publicField(A2Number, "delegatesFocus", true);
  __publicField(A2Number, "observedAttributes", ["label", "hint", "error", "disabled", "required", "min", "max", "step", "unit", "value", "decimals"]);
  __publicField(A2Number, "styles", `${FIELD_CSS}
.box { padding: 0 4px; gap: 2px; }
.ctl { text-align: center; font-variant-numeric: tabular-nums; }
.step { flex: none; width: calc(var(--a2-h) - 8px); height: calc(var(--a2-h) - 8px); border-radius: calc(var(--a2-radius) - 3px); display: grid; place-items: center; color: var(--a2-text-muted); transition: background-color var(--t1), color var(--t1), transform var(--t1); }
.step:hover { background: var(--a2-fill-active); color: var(--a2-text); }
.step:active { transform: scale(0.9); }
.step:disabled { opacity: 0.3; pointer-events: none; }
.unit { flex: none; color: var(--a2-text-muted); font-size: var(--a2-fs-sm); padding-top: 0.12em; }
.unit:empty, .calc:empty { display: none; }
.calc { flex: none; color: var(--a2-text-muted); font-size: var(--a2-fs-sm); padding-top: 0.12em; white-space: nowrap; }
.calc.bad { color: var(--a2-danger); }
`);
  define("a2-number", A2Number);

  // src/elements/toggle.js
  var CheckBase = class extends A2Element {
    connectedCallback() {
      if (this._init === void 0) this._init = this.bool("checked");
      super.connectedCallback();
    }
    get checked() {
      return this.bool("checked");
    }
    set checked(v) {
      this.setBool("checked", v);
    }
    get value() {
      return this.str("value", "on");
    }
    set value(v) {
      this.setAttribute("value", v);
    }
    toggle() {
      if (this.disabled) return;
      this.removeAttribute("indeterminate");
      this.checked = !this.checked;
      this.fire("input");
      this.fire("change");
    }
    bindToggle(el) {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        this.toggle();
      });
      el.addEventListener("keydown", (e) => {
        if (e.key === " " || e.key === "Enter" && this.isSwitch) {
          e.preventDefault();
          this.toggle();
        }
      });
    }
    syncForm() {
      this.internals.setFormValue(this.checked ? this.value : null);
      if (this.bool("required") && !this.checked) this.internals.setValidity({ valueMissing: true }, "선택해 주세요.", this.ctl);
      else this.internals.setValidity({});
    }
    formResetCallback() {
      this.checked = this._init;
    }
  };
  __publicField(CheckBase, "formAssociated", true);
  __publicField(CheckBase, "delegatesFocus", true);
  __publicField(CheckBase, "observedAttributes", ["checked", "disabled", "required", "indeterminate", "value"]);
  var A2Checkbox = class extends CheckBase {
    render() {
      this.root.innerHTML = `<div class="c" part="base" role="checkbox" tabindex="0"><span class="box" part="box"><span class="mark check">${icon("check", 15)}</span><span class="mark dash"><svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><rect x="1" y="5" width="10" height="2.2" rx="1.1" fill="currentColor"/></svg></span></span><span class="lbl t"><slot></slot></span></div>`;
      this.ctl = this.$(".c");
      this.bindToggle(this.ctl);
    }
    get indeterminate() {
      return this.bool("indeterminate");
    }
    set indeterminate(v) {
      this.setBool("indeterminate", v);
    }
    update() {
      this.ctl.setAttribute("aria-checked", this.indeterminate ? "mixed" : String(this.checked));
      this.ctl.setAttribute("aria-disabled", String(this.disabled));
      this.ctl.tabIndex = this.disabled ? -1 : 0;
      this.syncForm();
    }
  };
  __publicField(A2Checkbox, "styles", `
:host { display: inline-flex; vertical-align: middle; }
.c { display: inline-flex; align-items: center; gap: 10px; cursor: pointer; user-select: none; min-height: 24px; border-radius: 6px; }
.box {
  flex: none; position: relative; width: 20px; height: 20px; border-radius: 6px; background: var(--a2-fill-active);
  display: grid; place-items: center; color: var(--a2-on-accent);
  transition: background-color var(--t2), transform var(--t1) var(--spring);
}
.c:hover .box { background: color-mix(in srgb, var(--a2-text) 16%, var(--a2-fill)); }
.c:active .box { transform: scale(0.88); }
:host([checked]) .box, :host([indeterminate]) .box { background: var(--a2-accent); }
.mark { position: absolute; inset: 0; display: grid; place-items: center; }
.mark svg path { stroke-dasharray: 20; stroke-dashoffset: 20; transition: stroke-dashoffset var(--t2) ease-out; }
:host([checked]:not([indeterminate])) .check svg path { stroke-dashoffset: 0; }
.dash { opacity: 0; transform: scaleX(0.3); transition: opacity var(--t1), transform var(--t2) var(--spring); }
:host([indeterminate]) .dash { opacity: 1; transform: none; }
.lbl:empty { display: none; }
`);
  var A2Switch = class extends CheckBase {
    constructor() {
      super(...arguments);
      __publicField(this, "isSwitch", true);
    }
    render() {
      this.root.innerHTML = `<div class="c" part="base" role="switch" tabindex="0"><span class="track" part="track"><span class="thumb" part="thumb"></span></span><span class="lbl t"><slot></slot></span></div>`;
      this.ctl = this.$(".c");
      this.bindToggle(this.ctl);
    }
    update() {
      this.ctl.setAttribute("aria-checked", String(this.checked));
      this.ctl.setAttribute("aria-disabled", String(this.disabled));
      this.ctl.tabIndex = this.disabled ? -1 : 0;
      this.syncForm();
    }
  };
  __publicField(A2Switch, "styles", `
:host { display: inline-flex; vertical-align: middle; }
.c { display: inline-flex; align-items: center; gap: 10px; cursor: pointer; user-select: none; min-height: 24px; border-radius: 13px; }
.track {
  flex: none; position: relative; width: 40px; height: 24px; border-radius: 12px; background: var(--a2-fill-active);
  transition: background-color var(--t2);
}
.c:hover .track { background: color-mix(in srgb, var(--a2-text) 16%, var(--a2-fill)); }
:host([checked]) .track { background: var(--a2-accent); }
:host([checked]) .c:hover .track { background: var(--a2-accent-hover); }
.thumb {
  position: absolute; top: 3px; left: 3px; width: 18px; height: 18px; border-radius: 9px; background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
  transition: transform var(--t3) var(--spring), width var(--t2) var(--spring);
}
.c:active .thumb { width: 23px; }
:host([checked]) .thumb { transform: translateX(16px); }
:host([checked]) .c:active .thumb { transform: translateX(11px); }
.lbl:empty { display: none; }
`);
  define("a2-checkbox", A2Checkbox);
  define("a2-switch", A2Switch);

  // src/elements/radio.js
  var A2Radio = class extends A2Element {
    render() {
      this.setAttribute("role", "radio");
      this.root.innerHTML = `<div class="r" part="base"><span class="dot" part="dot"></span><span class="lbl t"><slot></slot></span></div>`;
      this.addEventListener("click", () => {
        if (!this.disabled) this.closest("a2-radio-group")?.pick(this, true);
      });
    }
    update() {
      this.setAttribute("aria-checked", String(this.checked));
      this.setAttribute("aria-disabled", String(this.disabled));
    }
    get checked() {
      return this.bool("checked");
    }
    set checked(v) {
      this.setBool("checked", v);
    }
    get value() {
      return this.str("value", this.textContent.trim());
    }
    get disabled() {
      return this.bool("disabled") || !!this.closest("a2-radio-group")?.hasAttribute("disabled");
    }
    set disabled(v) {
      this.setBool("disabled", v);
    }
  };
  __publicField(A2Radio, "observedAttributes", ["checked", "disabled"]);
  __publicField(A2Radio, "styles", `
:host { display: inline-flex; vertical-align: middle; border-radius: 12px; outline: none; }
:host(:focus-visible) .dot { outline: 2px solid var(--a2-accent); outline-offset: 2px; }
.r { display: inline-flex; align-items: center; gap: 10px; cursor: pointer; user-select: none; min-height: 24px; }
.dot {
  flex: none; position: relative; width: 20px; height: 20px; border-radius: 50%; background: var(--a2-fill-active);
  transition: background-color var(--t2), transform var(--t1) var(--spring);
}
.r:hover .dot { background: color-mix(in srgb, var(--a2-text) 16%, var(--a2-fill)); }
.r:active .dot { transform: scale(0.88); }
:host([checked]) .dot { background: var(--a2-accent); }
.dot::after {
  content: ''; position: absolute; inset: 6px; border-radius: 50%; background: var(--a2-on-accent);
  transform: scale(0); transition: transform var(--t3) var(--spring);
}
:host([checked]) .dot::after { transform: scale(1); }
.lbl:empty { display: none; }
`);
  var A2RadioGroup = class extends A2Element {
    render() {
      this.setAttribute("role", "radiogroup");
      this.root.innerHTML = `<div class="label t" part="label"></div><div class="list" part="list"><slot></slot></div><div class="hint t" part="hint"></div>`;
      this._init = this.getAttribute("value");
      this.root.querySelector("slot").addEventListener("slotchange", () => this.update());
      this.addEventListener("keydown", (e) => {
        const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
        if (e.key === " " && e.target.matches?.("a2-radio")) {
          e.preventDefault();
          this.pick(e.target, true);
          return;
        }
        if (!(e.key in keys)) return;
        e.preventDefault();
        const list = this.radios.filter((r) => !r.disabled);
        const cur2 = list.indexOf(e.target.closest?.("a2-radio"));
        const next = list[(cur2 + keys[e.key] + list.length) % list.length];
        if (next) {
          next.focus();
          this.pick(next, true);
        }
      });
    }
    get radios() {
      return [...this.querySelectorAll("a2-radio")];
    }
    get value() {
      return this.radios.find((r) => r.checked)?.value ?? this.str("value") ?? "";
    }
    set value(v) {
      this.setAttribute("value", v);
    }
    pick(radio, user) {
      if (radio.checked && !user) return;
      const changed = !radio.checked;
      for (const r of this.radios) r.checked = r === radio;
      this.sync();
      if (user && changed) {
        this.fire("input");
        this.fire("change");
      }
    }
    attr(name, v) {
      if (name === "value") {
        const r = this.radios.find((x) => x.value === v);
        if (r) this.pick(r, false);
        else this.update();
      } else this.update();
    }
    update() {
      this.paintField();
      const want = this.getAttribute("value");
      if (want != null && !this.radios.some((r) => r.checked)) {
        const r = this.radios.find((x) => x.value === want);
        if (r) r.checked = true;
      }
      this.sync();
    }
    sync() {
      const list = this.radios, on = list.find((r) => r.checked) || list.find((r) => !r.disabled);
      for (const r of list) r.tabIndex = r === on && !r.disabled ? 0 : -1;
      const v = list.find((r) => r.checked)?.value ?? null;
      this.internals.setFormValue(v);
      if (this.bool("required") && v == null) this.internals.setValidity({ valueMissing: true }, "하나를 골라 주세요.", list[0]);
      else this.internals.setValidity({});
    }
    formResetCallback() {
      for (const r of this.radios) r.checked = this._init != null && r.value === this._init;
      this.sync();
    }
  };
  __publicField(A2RadioGroup, "formAssociated", true);
  __publicField(A2RadioGroup, "observedAttributes", ["label", "hint", "error", "value", "disabled", "required", "direction"]);
  __publicField(A2RadioGroup, "styles", `
:host { display: block; }
.list { display: flex; flex-direction: column; gap: 12px; }
:host([direction="row"]) .list { flex-direction: row; flex-wrap: wrap; gap: 12px 20px; }
`);
  define("a2-radio", A2Radio);
  define("a2-radio-group", A2RadioGroup);

  // src/core/ease.js
  var { sin, cos, PI, pow, sqrt } = Math;
  var c1 = 1.70158;
  var c2 = c1 * 1.525;
  var c3 = c1 + 1;
  var c4 = 2 * PI / 3;
  var c5 = 2 * PI / 4.5;
  function outBounce(t) {
    const n1 = 7.5625, d1 = 2.75;
    if (t < 1 / d1) return n1 * t * t;
    if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
    if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
    return n1 * (t -= 2.625 / d1) * t + 0.984375;
  }
  var Ease = Object.freeze({
    Linear: (t) => t,
    InSine: (t) => 1 - cos(t * PI / 2),
    OutSine: (t) => sin(t * PI / 2),
    InOutSine: (t) => -(cos(PI * t) - 1) / 2,
    InQuad: (t) => t * t,
    OutQuad: (t) => 1 - (1 - t) * (1 - t),
    InOutQuad: (t) => t < 0.5 ? 2 * t * t : 1 - pow(-2 * t + 2, 2) / 2,
    InCubic: (t) => t * t * t,
    OutCubic: (t) => 1 - pow(1 - t, 3),
    InOutCubic: (t) => t < 0.5 ? 4 * t * t * t : 1 - pow(-2 * t + 2, 3) / 2,
    InQuart: (t) => t ** 4,
    OutQuart: (t) => 1 - pow(1 - t, 4),
    InOutQuart: (t) => t < 0.5 ? 8 * t ** 4 : 1 - pow(-2 * t + 2, 4) / 2,
    InQuint: (t) => t ** 5,
    OutQuint: (t) => 1 - pow(1 - t, 5),
    InOutQuint: (t) => t < 0.5 ? 16 * t ** 5 : 1 - pow(-2 * t + 2, 5) / 2,
    InExpo: (t) => t === 0 ? 0 : pow(2, 10 * t - 10),
    OutExpo: (t) => t === 1 ? 1 : 1 - pow(2, -10 * t),
    InOutExpo: (t) => t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? pow(2, 20 * t - 10) / 2 : (2 - pow(2, -20 * t + 10)) / 2,
    InCirc: (t) => 1 - sqrt(1 - t * t),
    OutCirc: (t) => sqrt(1 - pow(t - 1, 2)),
    InOutCirc: (t) => t < 0.5 ? (1 - sqrt(1 - pow(2 * t, 2))) / 2 : (sqrt(1 - pow(-2 * t + 2, 2)) + 1) / 2,
    InBack: (t) => c3 * t ** 3 - c1 * t * t,
    OutBack: (t) => 1 + c3 * pow(t - 1, 3) + c1 * pow(t - 1, 2),
    InOutBack: (t) => t < 0.5 ? pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2) / 2 : (pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2,
    InElastic: (t) => t === 0 ? 0 : t === 1 ? 1 : -pow(2, 10 * t - 10) * sin((t * 10 - 10.75) * c4),
    OutElastic: (t) => t === 0 ? 0 : t === 1 ? 1 : pow(2, -10 * t) * sin((t * 10 - 0.75) * c4) + 1,
    InOutElastic: (t) => t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? -(pow(2, 20 * t - 10) * sin((20 * t - 11.125) * c5)) / 2 : pow(2, -20 * t + 10) * sin((20 * t - 11.125) * c5) / 2 + 1,
    InBounce: (t) => 1 - outBounce(1 - t),
    OutBounce: outBounce,
    InOutBounce: (t) => t < 0.5 ? (1 - outBounce(1 - 2 * t)) / 2 : (1 + outBounce(2 * t - 1)) / 2
  });

  // src/core/animate.js
  var running = /* @__PURE__ */ new Set();
  var raf = 0;
  var last = 0;
  function frame(now) {
    raf = 0;
    last = now;
    for (const a of [...running]) a.step(now);
    if (running.size) raf = requestAnimationFrame(frame);
  }
  function wake() {
    if (!raf) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
  }
  if (typeof document !== "undefined") document.addEventListener("visibilitychange", () => {
    if (document.hidden) for (const a of [...running]) a.finish();
  });
  setInterval(() => {
    if (running.size && performance.now() - last > 120) {
      cancelAnimationFrame(raf);
      raf = 0;
      frame(performance.now());
    }
  }, 100);
  function speed() {
    const v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--a2-speed"));
    return Number.isFinite(v) && v > 0 ? v : 1;
  }
  function animate(from, to, { duration = 0.3, ease = "OutCubic", onUpdate = () => {
  }, onDone } = {}) {
    const fn = typeof ease === "function" ? ease : Ease[ease] || Ease.OutCubic;
    const ms = duration * 1e3 / speed();
    const start = performance.now();
    const a = {
      alive: true,
      apply(p) {
        const e = fn(p), o = {};
        for (const k in to) o[k] = from[k] + (to[k] - from[k]) * e;
        onUpdate(o, p);
      },
      step(now) {
        if (!a.alive) return;
        const p = Math.min(1, (now - start) / ms);
        a.apply(p);
        if (p >= 1) a.end();
      },
      end() {
        running.delete(a);
        if (!a.alive) return;
        a.alive = false;
        onDone && onDone();
      },
      stop() {
        a.alive = false;
        running.delete(a);
      },
      finish() {
        if (a.alive) {
          a.apply(1);
          a.end();
        }
      }
    };
    if (ms < 16 || typeof document !== "undefined" && document.hidden) {
      a.apply(1);
      a.end();
      return a;
    }
    running.add(a);
    wake();
    return a;
  }
  function slideIndicator(ind, target2, state, instant) {
    if (!target2 || !target2.offsetWidth) return state;
    const to = { x: target2.offsetLeft, y: target2.offsetTop, w: target2.offsetWidth, h: target2.offsetHeight };
    state.anim && state.anim.stop();
    const put = (v) => {
      ind.style.transform = `translate(${v.x}px, ${v.y}px)`;
      ind.style.width = `${v.w}px`;
      ind.style.height = `${v.h}px`;
      state.cur = v;
    };
    if (instant || !state.cur) put(to);
    else state.anim = animate(state.cur, to, { duration: 0.32, ease: "OutExpo", onUpdate: put });
    ind.style.opacity = "1";
    return state;
  }

  // src/elements/slider.js
  var clamp2 = (v, a, b) => Math.min(Math.max(v, a), b);
  var A2Slider = class extends A2Element {
    render() {
      this.root.innerHTML = `<div class="head"><div class="label t" part="label"></div><div class="out t"></div></div><div class="s" part="base"><div class="rail" part="track"><div class="fill" part="fill"></div></div><div class="knob" part="thumb" role="slider" tabindex="0"><div class="tip t"></div></div></div><div class="hint t" part="hint"></div>`;
      this.sEl = this.$(".s");
      this.knob = this.$(".knob");
      this.fill = this.$(".fill");
      this._v = this.clean(this.num("value", (this.min + this.max) / 2));
      this._init = this._v;
      this._shown = this.ratio();
      this.sEl.addEventListener("pointerdown", (e) => this.down(e));
      this.knob.addEventListener("keydown", (e) => this.key(e));
    }
    get min() {
      return this.num("min", 0);
    }
    get max() {
      return Math.max(this.num("max", 100), this.min);
    }
    get step() {
      return this.num("step", 1) || 1;
    }
    clean(v) {
      v = Math.round((+v - this.min) / this.step) * this.step + this.min;
      const d = (String(this.step).split(".")[1] || "").length;
      return +clamp2(v, this.min, this.max).toFixed(d);
    }
    ratio(v = this._v) {
      return this.max === this.min ? 0 : (v - this.min) / (this.max - this.min);
    }
    get value() {
      return this._v;
    }
    set value(v) {
      const nv = this.clean(v);
      if (nv !== this._v) {
        this._v = nv;
        if (this._rendered) this.move(false);
      }
    }
    /** 트랙 위 좌표 → 값. 손잡이 반지름만큼 양끝을 비워서 손잡이가 밖으로 나가지 않는다 */
    at(x) {
      const r = this.sEl.getBoundingClientRect(), pad = this.knob.offsetWidth / 2, w = r.width - pad * 2;
      return this.min + clamp2((x - r.left - pad) / (w || 1), 0, 1) * (this.max - this.min);
    }
    down(e) {
      if (e.button !== 0 || this.disabled) return;
      e.preventDefault();
      this.knob.focus({ preventScroll: true });
      this.sEl.setPointerCapture(e.pointerId);
      this.sEl.classList.add("drag");
      const start = this._v;
      const onKnob = e.target === this.knob || this.knob.contains(e.target);
      this.set(this.at(e.clientX), !onKnob);
      const mv = (ev) => this.set(this.at(ev.clientX), false);
      const up = () => {
        this.sEl.classList.remove("drag");
        this.sEl.removeEventListener("pointermove", mv);
        this.sEl.removeEventListener("pointerup", up);
        this.sEl.removeEventListener("pointercancel", up);
        if (this._v !== start) this.fire("change");
      };
      this.sEl.addEventListener("pointermove", mv);
      this.sEl.addEventListener("pointerup", up);
      this.sEl.addEventListener("pointercancel", up);
    }
    key(e) {
      const big = Math.max(this.step, (this.max - this.min) / 10);
      const d = { ArrowRight: this.step, ArrowUp: this.step, ArrowLeft: -this.step, ArrowDown: -this.step, PageUp: big, PageDown: -big }[e.key];
      let nv;
      if (d != null) nv = this._v + d * (e.shiftKey ? 10 : 1);
      else if (e.key === "Home") nv = this.min;
      else if (e.key === "End") nv = this.max;
      else return;
      e.preventDefault();
      const before = this._v;
      this.set(nv, true);
      if (this._v !== before) this.fire("change");
    }
    set(v, smooth) {
      const nv = this.clean(v);
      if (nv === this._v) return;
      this._v = nv;
      this.move(smooth);
      this.fire("input");
    }
    /** 화면 위치만 옮긴다. 누른 자리로 갈 때는 부드럽게, 끄는 중에는 바로 */
    move(smooth) {
      const to = this.ratio();
      this._anim?.stop();
      if (!smooth) {
        this._shown = to;
        this.paint();
      } else this._anim = animate({ p: this._shown }, { p: to }, { duration: 0.22, ease: "OutCubic", onUpdate: (v) => {
        this._shown = v.p;
        this.paint();
      } });
      this.text();
    }
    paint() {
      const pad = this.knob.offsetWidth / 2 || 10;
      const x = `calc(${pad}px + (100% - ${pad * 2}px) * ${this._shown})`;
      this.knob.style.left = x;
      this.fill.style.width = x;
    }
    text() {
      const s = `${this._v}${this.str("unit")}`;
      this.$(".tip").textContent = s;
      this.$(".out").textContent = this.bool("show-value") ? s : "";
      this.knob.setAttribute("aria-valuenow", this._v);
      this.knob.setAttribute("aria-valuetext", s);
      this.internals.setFormValue(String(this._v));
    }
    attr(name, v) {
      if (name === "value") {
        this.value = v;
        return;
      }
      if (name === "min" || name === "max" || name === "step") {
        this._v = this.clean(this._v);
        this._shown = this.ratio();
      }
      this.update();
    }
    update() {
      this.paintField();
      this.knob.setAttribute("aria-valuemin", this.min);
      this.knob.setAttribute("aria-valuemax", this.max);
      if (this.hasAttribute("label")) this.knob.setAttribute("aria-label", this.getAttribute("label"));
      this.knob.tabIndex = this.disabled ? -1 : 0;
      this._shown = this.ratio();
      this.paint();
      this.text();
    }
    formResetCallback() {
      this._v = this._init;
      this.update();
    }
  };
  __publicField(A2Slider, "formAssociated", true);
  __publicField(A2Slider, "delegatesFocus", true);
  __publicField(A2Slider, "observedAttributes", ["label", "hint", "error", "min", "max", "step", "value", "disabled", "show-value", "unit"]);
  __publicField(A2Slider, "styles", `
:host { display: block; --thumb: 20px; }
.head { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
.head .label { flex: 1; }
.out { font-size: var(--a2-fs-sm); color: var(--a2-text); font-variant-numeric: tabular-nums; margin-bottom: 7px; }
.out:empty { display: none; }
.s { position: relative; height: 28px; cursor: pointer; touch-action: none; user-select: none; }
.rail { position: absolute; left: 0; right: 0; top: 50%; height: 6px; margin-top: -3px; border-radius: 3px; background: var(--a2-fill-active); overflow: hidden; }
.fill { position: absolute; left: 0; top: 0; bottom: 0; width: 0; background: var(--a2-accent); border-radius: 3px; }
.knob {
  position: absolute; top: 50%; left: 0; width: var(--thumb); height: var(--thumb); margin: calc(var(--thumb) / -2) 0 0 calc(var(--thumb) / -2);
  border-radius: 50%; background: #fff; box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  transition: transform var(--t2) var(--spring);
}
.s:hover .knob { transform: scale(1.08); }
.s.drag .knob { transform: scale(1.18); }
.knob:focus-visible { outline: 2px solid var(--a2-accent); outline-offset: 3px; }
.tip {
  position: absolute; bottom: calc(100% + 10px); left: 50%; translate: -50% 0; padding: 5px 9px 4px; border-radius: 8px;
  background: var(--a2-tip); color: var(--a2-bg); font-size: var(--a2-fs-sm); font-weight: var(--a2-weight-strong); white-space: nowrap; font-variant-numeric: tabular-nums;
  opacity: 0; transform: translateY(4px) scale(0.9); pointer-events: none;
  transition: opacity var(--t1), transform var(--t2) var(--spring);
}
.s.drag .tip, .knob:focus-visible .tip { opacity: 1; transform: none; }
`);
  define("a2-slider", A2Slider);

  // src/core/popover.js
  function openPopover(pop, anchor, o = {}) {
    const gap = o.gap ?? 6;
    if (!pop.hasAttribute("popover")) pop.setAttribute("popover", "manual");
    try {
      pop.showPopover();
    } catch (_) {
    }
    let up = null, raf2 = 0, alive = true;
    const place2 = () => {
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
      pop.style.left = `${x}px`;
      pop.style.top = `${y}px`;
      pop.dataset.side = up ? "top" : "bottom";
      cancelAnimationFrame(raf2);
      if (anchor instanceof Element) raf2 = requestAnimationFrame(place2);
    };
    const keep = [pop, ...o.closeOnOutside || [], ...anchor instanceof Element ? [anchor] : []];
    const outside = (e) => {
      const path = e.composedPath();
      if (!keep.some((k) => path.includes(k))) close();
    };
    const key = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        close();
      }
    };
    let anim2 = null;
    const paint = (p) => {
      pop.style.opacity = p;
      pop.style.transform = `translateY(${(1 - p) * (up ? 6 : -6)}px) scale(${0.97 + 0.03 * p})`;
    };
    paint(0);
    place2();
    anim2 = animate({ p: 0 }, { p: 1 }, { duration: 0.18, ease: "OutCubic", onUpdate: (v) => paint(v.p) });
    setTimeout(() => {
      if (alive) {
        document.addEventListener("pointerdown", outside, true);
        addEventListener("keydown", key, true);
      }
    }, 0);
    function close() {
      if (!alive) return;
      alive = false;
      cancelAnimationFrame(raf2);
      document.removeEventListener("pointerdown", outside, true);
      removeEventListener("keydown", key, true);
      anim2 && anim2.stop();
      animate({ p: Number(pop.style.opacity) || 1 }, { p: 0 }, { duration: 0.12, ease: "OutSine", onUpdate: (v) => paint(v.p), onDone: () => {
        try {
          pop.hidePopover();
        } catch (_) {
        }
      } });
      o.onClose && o.onClose();
    }
    return { close, get open() {
      return alive;
    } };
  }
  var POPOVER_CSS = `
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

  // src/elements/select.js
  var A2Option = class extends HTMLElement {
    get value() {
      return this.getAttribute("value") ?? this.textContent.trim();
    }
    get label() {
      return this.getAttribute("label") ?? this.textContent.trim();
    }
    get disabled() {
      return this.hasAttribute("disabled");
    }
  };
  var A2Select = class extends A2Element {
    render() {
      this.root.innerHTML = `${this.fieldHead("")}<button class="box" part="box" type="button" aria-haspopup="listbox"><span class="val"></span><span class="chev">${icon("chevron", 16)}</span></button><div class="hint t" part="hint"></div>
<div class="pop" popover="manual"><div class="menu" part="menu" role="listbox"><label class="search">${icon("search", 15)}<input placeholder="검색" aria-label="검색"></label><div class="list"></div></div></div>`;
      this.box = this.$(".box");
      this.pop = this.$(".pop");
      this.listEl = this.$(".list");
      this.q = this.$(".search input");
      this._sel = this.parseValue(this.getAttribute("value"));
      this._init = [...this._sel];
      this._active = -1;
      this.box.addEventListener("click", (e) => {
        const x = e.target.closest(".chip i");
        if (x) {
          e.stopPropagation();
          this.toggleValue(x.dataset.v);
          return;
        }
        this.isOpen ? this.close() : this.open();
      });
      this.box.addEventListener("keydown", (e) => this.key(e));
      this.q.addEventListener("keydown", (e) => this.key(e));
      this.q.addEventListener("input", () => {
        this._active = 0;
        this.paintList();
      });
      this.listEl.addEventListener("pointerdown", (e) => e.preventDefault());
      this.listEl.addEventListener("click", (e) => {
        const it = e.target.closest(".item");
        if (it) this.choose(this.shown[+it.dataset.i]);
      });
      this.listEl.addEventListener("pointermove", (e) => {
        const it = e.target.closest(".item");
        if (it && +it.dataset.i !== this._active) {
          this._active = +it.dataset.i;
          this.markActive(false);
        }
      });
      new MutationObserver(() => this.update()).observe(this, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["value", "label", "disabled"] });
    }
    get multiple() {
      return this.bool("multiple");
    }
    get options() {
      return [...this.querySelectorAll("a2-option")];
    }
    parseValue(v) {
      if (v == null || v === "") return [];
      return this.multiple ? String(v).split(",").map((s) => s.trim()).filter(Boolean) : [String(v)];
    }
    get value() {
      return this.multiple ? [...this._sel] : this._sel[0] ?? "";
    }
    set value(v) {
      this._sel = Array.isArray(v) ? v.map(String) : this.parseValue(v);
      if (!this.multiple) this._sel = this._sel.slice(0, 1);
      if (this._rendered) this.update();
    }
    get selectedOptions() {
      return this.options.filter((o) => this._sel.includes(o.value));
    }
    get isOpen() {
      return !!this._pop?.open;
    }
    open() {
      if (this.disabled || this.isOpen) return;
      this.setBool("open", true);
      this.box.setAttribute("aria-expanded", "true");
      this.q.value = "";
      this.$(".search").style.display = this.bool("searchable") ? "flex" : "none";
      const first = this.options.findIndex((o) => this._sel.includes(o.value));
      this._active = Math.max(0, first);
      this.paintList();
      this._pop = openPopover(this.pop, this.box, { match: true, onClose: () => {
        this.setBool("open", false);
        this.box.setAttribute("aria-expanded", "false");
      } });
      if (this.bool("searchable")) this.q.focus({ preventScroll: true });
      this.markActive(true);
    }
    close(refocus = true) {
      if (!this.isOpen) return;
      this._pop.close();
      if (refocus) this.box.focus();
    }
    get shown() {
      const q = this.q.value.trim().toLowerCase();
      return this.options.filter((o) => !q || o.label.toLowerCase().includes(q));
    }
    paintList() {
      const list = this.shown;
      this.listEl.innerHTML = list.length ? list.map((o, i) => `<div class="item" role="option" data-i="${i}" aria-selected="${this._sel.includes(o.value)}" aria-disabled="${o.disabled}"><span class="grow">${esc(o.label)}</span><span class="mark">${icon("check", 16)}</span></div>`).join("") : `<div class="empty t">결과 없음</div>`;
      this.markActive(false);
    }
    markActive(scroll) {
      const items = [...this.listEl.querySelectorAll(".item")];
      items.forEach((el, i) => el.classList.toggle("active", i === this._active));
      if (scroll) items[this._active]?.scrollIntoView({ block: "nearest" });
    }
    move(d) {
      const list = this.shown;
      if (!list.length) return;
      for (let i = this._active + d; i >= 0 && i < list.length; i += d) {
        if (!list[i].disabled) {
          this._active = i;
          break;
        }
      }
      this.markActive(true);
    }
    key(e) {
      const k = e.key;
      if (!this.isOpen) {
        if (k === "ArrowDown" || k === "ArrowUp" || k === "Enter" || k === " ") {
          e.preventDefault();
          this.open();
        } else if (k.length === 1 && !this.multiple) this.typeahead(k, true);
        return;
      }
      if (k === "ArrowDown") {
        e.preventDefault();
        this.move(1);
      } else if (k === "ArrowUp") {
        e.preventDefault();
        this.move(-1);
      } else if (k === "Home") {
        e.preventDefault();
        this._active = 0;
        this.markActive(true);
      } else if (k === "End") {
        e.preventDefault();
        this._active = this.shown.length - 1;
        this.markActive(true);
      } else if (k === "Enter" || k === " " && e.target === this.box) {
        e.preventDefault();
        const o = this.shown[this._active];
        if (o) this.choose(o);
      } else if (k === "Tab") this.close(false);
      else if (k.length === 1 && e.target === this.box) this.typeahead(k, false);
    }
    /** 글자를 치면 그 글자로 시작하는 항목으로 */
    typeahead(ch, pick) {
      clearTimeout(this._tt);
      this._typed = (this._typed || "") + ch.toLowerCase();
      this._tt = setTimeout(() => {
        this._typed = "";
      }, 600);
      const list = this.shown, i = list.findIndex((o) => !o.disabled && o.label.toLowerCase().startsWith(this._typed));
      if (i < 0) return;
      if (pick) this.choose(list[i]);
      else {
        this._active = i;
        this.markActive(true);
      }
    }
    choose(o) {
      if (!o || o.disabled) return;
      if (this.multiple) {
        this.toggleValue(o.value);
        this.paintList();
        return;
      }
      const changed = this._sel[0] !== o.value;
      this._sel = [o.value];
      this.update();
      this.close();
      if (changed) {
        this.fire("input");
        this.fire("change");
      }
    }
    toggleValue(v) {
      const i = this._sel.indexOf(v);
      if (i >= 0) this._sel.splice(i, 1);
      else this._sel.push(v);
      this.update();
      this.fire("input");
      this.fire("change");
    }
    attr(name, v) {
      if (name === "value") this.value = v;
      else this.update();
    }
    update() {
      this.paintField();
      const sel = this.selectedOptions, val = this.$(".val");
      if (!sel.length) val.innerHTML = `<span class="txt ph">${esc(this.str("placeholder", "선택"))}</span>`;
      else if (this.multiple) val.innerHTML = sel.map((o) => `<span class="chip"><span>${esc(o.label)}</span><i data-v="${esc(o.value)}" aria-label="빼기">${icon("x", 12)}</i></span>`).join("");
      else val.innerHTML = `<span class="txt">${esc(sel[0].label)}</span>`;
      this.box.disabled = this.disabled;
      if (this.hasAttribute("label")) this.box.setAttribute("aria-label", this.getAttribute("label"));
      if (this.isOpen) this.paintList();
      const fd = new FormData();
      if (this.name) for (const v of this._sel) fd.append(this.name, v);
      this.internals.setFormValue(this.multiple ? fd : this._sel[0] ?? null);
      if (this.bool("required") && !this._sel.length) this.internals.setValidity({ valueMissing: true }, "골라 주세요.", this.box);
      else this.internals.setValidity({});
    }
    formResetCallback() {
      this._sel = [...this._init];
      this.update();
    }
  };
  __publicField(A2Select, "formAssociated", true);
  __publicField(A2Select, "delegatesFocus", true);
  __publicField(A2Select, "observedAttributes", ["label", "hint", "error", "placeholder", "value", "disabled", "required", "multiple", "searchable"]);
  __publicField(A2Select, "styles", `${POPOVER_CSS}
:host { display: block; }
.box {
  display: flex; align-items: center; gap: 8px; width: 100%; min-height: var(--a2-h); padding: 4px 10px 4px 12px; text-align: left;
  border-radius: var(--a2-radius); background: var(--a2-fill); transition: background-color var(--t1);
}
.box:hover { background: var(--a2-fill-hover); }
:host([open]) .box { background: var(--a2-fill-active); }
:host([error]) .box { background: color-mix(in srgb, var(--a2-danger) 14%, var(--a2-fill)); }
.val { flex: 1; min-width: 0; display: flex; flex-wrap: wrap; gap: 4px; align-items: center; }
.txt { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; padding-top: 0.12em; }
.ph { color: var(--a2-text-faint); }
.chev { flex: none; color: var(--a2-text-muted); transition: transform var(--t3) var(--spring); }
:host([open]) .chev { transform: rotate(180deg); }
.chip {
  display: inline-flex; align-items: center; gap: 2px; height: 26px; padding: 0 4px 0 9px; border-radius: 7px;
  background: var(--a2-accent-soft); color: var(--a2-accent); font-size: var(--a2-fs-sm); font-weight: var(--a2-weight-strong);
  animation: chipIn var(--t2) var(--spring);
}
.chip span { padding-top: 0.12em; }
.chip i { display: grid; place-items: center; width: 18px; height: 18px; border-radius: 5px; font-style: normal; cursor: pointer; }
.chip i:hover { background: color-mix(in srgb, var(--a2-accent) 22%, transparent); }
@keyframes chipIn { from { transform: scale(0.7); opacity: 0; } }
.search { display: flex; align-items: center; gap: 8px; height: 36px; padding: 0 10px; margin-bottom: 4px; border-radius: 8px; background: var(--a2-fill); color: var(--a2-text-muted); }
.search input { flex: 1; min-width: 0; border: 0; outline: 0; background: none; color: var(--a2-text); padding-top: 0.12em; }
.search input::placeholder { color: var(--a2-text-faint); }
.list { display: flex; flex-direction: column; gap: 1px; }
`);
  define("a2-option", A2Option);
  define("a2-select", A2Select);

  // src/elements/segmented.js
  var A2Segment = class extends HTMLElement {
    get value() {
      return this.getAttribute("value") ?? this.textContent.trim();
    }
    get disabled() {
      return this.hasAttribute("disabled");
    }
  };
  var A2Segmented = class extends A2Element {
    render() {
      this.root.innerHTML = `<div class="label t" part="label"></div><div class="bar" part="base" role="radiogroup"><span class="ind" part="indicator"></span></div><div class="hint t" part="hint"></div>`;
      this.bar = this.$(".bar");
      this.ind = this.$(".ind");
      this._state = {};
      this._init = this.getAttribute("value");
      this.bar.addEventListener("click", (e) => {
        const b = e.target.closest(".seg");
        if (b) this.pick(b.dataset.v, true);
      });
      this.bar.addEventListener("keydown", (e) => {
        const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
        if (!d) return;
        e.preventDefault();
        const bs = [...this.bar.querySelectorAll(".seg:not(:disabled)")], i = bs.indexOf(this.root.activeElement);
        const n = bs[(i + d + bs.length) % bs.length];
        if (n) {
          n.focus();
          this.pick(n.dataset.v, true);
        }
      });
      new MutationObserver(() => this.build()).observe(this, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["disabled", "value"] });
      new ResizeObserver(() => this.place(true)).observe(this.bar);
      this.build();
    }
    get segments() {
      return [...this.querySelectorAll("a2-segment")];
    }
    get value() {
      return this._v ?? "";
    }
    set value(v) {
      this.setAttribute("value", v);
    }
    build() {
      const segs = this.segments;
      if (this._v == null || !segs.some((s) => s.value === this._v)) this._v = this.getAttribute("value") ?? segs.find((s) => !s.disabled)?.value;
      for (const b of this.bar.querySelectorAll(".seg")) b.remove();
      for (const s of segs) {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "seg";
        b.dataset.v = s.value;
        b.setAttribute("role", "radio");
        b.innerHTML = s.innerHTML;
        b.disabled = s.disabled;
        this.bar.append(b);
      }
      this.sync(true);
    }
    pick(v, user) {
      if (v === this._v) return;
      this._v = v;
      this.sync(false);
      if (user) {
        this.fire("input");
        this.fire("change");
      }
    }
    sync(instant) {
      for (const b of this.bar.querySelectorAll(".seg")) {
        const on = b.dataset.v === this._v;
        b.setAttribute("aria-checked", String(on));
        b.tabIndex = on ? 0 : -1;
      }
      this.place(instant);
      this.internals.setFormValue(this._v ?? null);
    }
    place(instant) {
      const b = [...this.bar.querySelectorAll(".seg")].find((x) => x.dataset.v === this._v);
      if (b) slideIndicator(this.ind, b, this._state, instant);
      else this.ind.style.opacity = "0";
    }
    attr(name, v) {
      if (name === "value") {
        if (v !== this._v) {
          this._v = v;
          this.sync(false);
        }
      } else this.update();
    }
    update() {
      this.paintField();
      this.bar.setAttribute("aria-label", this.str("label"));
      for (const b of this.bar.querySelectorAll(".seg")) if (this.disabled) b.disabled = true;
      document.fonts?.ready.then(() => this.place(true));
    }
    formResetCallback() {
      this._v = this._init ?? this.segments[0]?.value;
      this.sync(true);
    }
  };
  __publicField(A2Segmented, "formAssociated", true);
  __publicField(A2Segmented, "observedAttributes", ["label", "hint", "value", "disabled"]);
  __publicField(A2Segmented, "styles", `
:host { display: inline-block; vertical-align: middle; max-width: 100%; }
:host([block]) { display: block; }
.bar { position: relative; display: inline-flex; gap: 2px; padding: 3px; border-radius: var(--a2-radius); background: var(--a2-fill); max-width: 100%; overflow-x: auto; scrollbar-width: none; }
:host([block]) .bar { display: flex; }
.ind { position: absolute; left: 0; top: 0; border-radius: calc(var(--a2-radius) - 3px); background: var(--a2-raised); box-shadow: 0 1px 3px rgba(0, 0, 0, 0.18); opacity: 0; pointer-events: none; }
.seg {
  position: relative; z-index: 1; flex: 1 0 auto; height: calc(var(--a2-h) - 6px); padding: 0.12em 14px 0; border-radius: calc(var(--a2-radius) - 3px);
  color: var(--a2-text-muted); white-space: nowrap; transition: color var(--t2);
}
.seg:hover { color: var(--a2-text); }
.seg[aria-checked="true"] { color: var(--a2-text); font-weight: var(--a2-weight-strong); }
.seg:disabled { opacity: 0.4; cursor: default; }
.seg:focus-visible { outline-offset: -2px; }
`);
  define("a2-segment", A2Segment);
  define("a2-segmented", A2Segmented);

  // src/elements/tabs.js
  var A2TabPanel = class extends HTMLElement {
    get value() {
      return this.getAttribute("value") ?? this.getAttribute("label") ?? "";
    }
    get label() {
      return this.getAttribute("label") ?? this.value;
    }
  };
  var A2Tabs = class extends A2Element {
    render() {
      this.root.innerHTML = `<div class="bar" part="tabs" role="tablist"><span class="ind" part="indicator"></span></div><div class="body" part="body"><slot></slot></div>`;
      this.bar = this.$(".bar");
      this.ind = this.$(".ind");
      this._state = {};
      this.bar.addEventListener("click", (e) => {
        const b = e.target.closest(".tab");
        if (b) this.pick(b.dataset.v, true);
      });
      this.bar.addEventListener("keydown", (e) => {
        const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        const bs = [...this.bar.querySelectorAll(".tab:not(:disabled)")];
        let n;
        if (d) n = bs[(bs.indexOf(this.root.activeElement) + d + bs.length) % bs.length];
        else if (e.key === "Home") n = bs[0];
        else if (e.key === "End") n = bs[bs.length - 1];
        if (!n) return;
        e.preventDefault();
        n.focus();
        this.pick(n.dataset.v, true);
      });
      new MutationObserver(() => this.build()).observe(this, { childList: true, attributes: true, subtree: true, attributeFilter: ["label", "value", "disabled"] });
      new ResizeObserver(() => this.place(true)).observe(this.bar);
      this.build();
    }
    get panels() {
      return [...this.children].filter((c) => c.tagName === "A2-TAB-PANEL");
    }
    get value() {
      return this._v ?? "";
    }
    set value(v) {
      this.setAttribute("value", v);
    }
    build() {
      const ps = this.panels;
      if (this._v == null || !ps.some((p) => p.value === this._v)) this._v = this.getAttribute("value") ?? ps.find((p) => !p.hasAttribute("disabled"))?.value;
      for (const b of this.bar.querySelectorAll(".tab")) b.remove();
      ps.forEach((p, i) => {
        if (!p.id) p.id = `a2tp-${Math.random().toString(36).slice(2, 8)}`;
        p.setAttribute("role", "tabpanel");
        const b = document.createElement("button");
        b.type = "button";
        b.className = "tab";
        b.dataset.v = p.value;
        b.setAttribute("role", "tab");
        b.textContent = p.label;
        b.disabled = p.hasAttribute("disabled");
        this.bar.append(b);
      });
      this.sync(true);
    }
    pick(v, user) {
      if (v === this._v) return;
      this._v = v;
      this.sync(false);
      if (user) this.emit("a2-change", { value: v });
    }
    sync(instant) {
      for (const b2 of this.bar.querySelectorAll(".tab")) {
        const on = b2.dataset.v === this._v;
        b2.setAttribute("aria-selected", String(on));
        b2.tabIndex = on ? 0 : -1;
      }
      for (const p of this.panels) {
        const on = p.value === this._v, was = p.hasAttribute("data-on");
        p.toggleAttribute("data-on", on);
        if (on && !was && !instant) {
          p.style.opacity = "0";
          animate({ p: 0 }, { p: 1 }, { duration: 0.22, ease: "OutCubic", onUpdate: (v) => {
            p.style.opacity = v.p;
            p.style.transform = `translateY(${(1 - v.p) * 6}px)`;
          }, onDone: () => {
            p.style.opacity = "";
            p.style.transform = "";
          } });
        }
      }
      const b = [...this.bar.querySelectorAll(".tab")].find((x) => x.dataset.v === this._v);
      if (b && !instant) b.scrollIntoView({ block: "nearest", inline: "nearest" });
      this.place(instant);
    }
    place(instant) {
      const b = [...this.bar.querySelectorAll(".tab")].find((x) => x.dataset.v === this._v);
      if (b) slideIndicator(this.ind, b, this._state, instant);
      else this.ind.style.opacity = "0";
    }
    attr(name, v) {
      if (name === "value" && v !== this._v) {
        this._v = v;
        this.sync(false);
      }
    }
    update() {
      document.fonts?.ready.then(() => this.place(true));
    }
  };
  __publicField(A2Tabs, "observedAttributes", ["value"]);
  __publicField(A2Tabs, "styles", `
:host { display: block; }
.bar { position: relative; display: flex; gap: 4px; overflow-x: auto; scrollbar-width: none; padding: 2px; margin: -2px -2px 14px; }
.ind { position: absolute; left: 0; top: 0; border-radius: 999px; background: var(--a2-accent-soft); opacity: 0; pointer-events: none; }
.tab {
  position: relative; z-index: 1; flex: none; height: 36px; padding: 0.12em 16px 0; border-radius: 999px;
  color: var(--a2-text-muted); white-space: nowrap; transition: color var(--t2), background-color var(--t1);
}
.tab:hover { color: var(--a2-text); background: var(--a2-fill); }
.tab[aria-selected="true"] { color: var(--a2-accent); font-weight: var(--a2-weight-strong); background: none; }
.tab:disabled { opacity: 0.4; cursor: default; }
.body { position: relative; }
::slotted(a2-tab-panel) { display: block; }
::slotted(a2-tab-panel:not([data-on])) { display: none; }
`);
  define("a2-tab-panel", A2TabPanel);
  define("a2-tabs", A2Tabs);

  // src/elements/color.js
  var clamp3 = (v, a, b) => Math.min(Math.max(v, a), b);
  var hex2 = (n) => Math.round(n).toString(16).padStart(2, "0");
  function parseHex(s) {
    let h = String(s || "").trim().replace(/^#/, "");
    if (/^[0-9a-f]{3,4}$/i.test(h)) h = [...h].map((c) => c + c).join("");
    if (!/^([0-9a-f]{6}|[0-9a-f]{8})$/i.test(h)) return null;
    const n = (i) => parseInt(h.slice(i, i + 2), 16);
    return { r: n(0), g: n(2), b: n(4), a: h.length === 8 ? n(6) / 255 : 1 };
  }
  var toHex = ({ r, g, b, a = 1 }, alpha) => `#${hex2(r)}${hex2(g)}${hex2(b)}${alpha && a < 1 ? hex2(a * 255) : ""}`.toUpperCase();
  function rgb2hsv({ r, g, b }) {
    r /= 255;
    g /= 255;
    b /= 255;
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
    let h = 0;
    if (d) h = mx === r ? (g - b) / d % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
    return { h: (h * 60 + 360) % 360, s: mx ? d / mx : 0, v: mx };
  }
  function hsv2rgb({ h, s, v }) {
    const f = (n) => {
      const k = (n + h / 60) % 6;
      return (v - v * s * Math.max(0, Math.min(k, 4 - k, 1))) * 255;
    };
    return { r: f(5), g: f(3), b: f(1) };
  }
  var PRESETS = "#FF7A45,#F4B740,#5CCB8A,#3FB8C6,#4C8DFF,#8F6BFF,#E85D9A,#F3EEE9,#8A817A,#272421";
  var A2Color = class extends A2Element {
    render() {
      this.root.innerHTML = `${this.fieldHead("")}<button class="box" part="box" type="button" aria-haspopup="dialog"><span class="sw"><i></i></span><span class="hex"></span></button><div class="hint t" part="hint"></div>
<div class="pop" popover="manual"><div class="menu" part="menu" role="dialog" aria-label="색 고르기">
<div class="sv"><span class="k"></span></div>
<div class="bar hue" role="slider" tabindex="0" aria-label="색상"><span class="k"></span></div>
<div class="bar al" role="slider" tabindex="0" aria-label="투명도"><span class="chk"></span><span class="g"></span><span class="k"></span></div>
<div class="row"><span class="pv"><span class="chk"></span><i></i></span><input class="hx" spellcheck="false" aria-label="HEX"></div>
<div class="ps"></div></div></div>`;
      this.box = this.$(".box");
      this.pop = this.$(".pop");
      const c = parseHex(this.str("value", "#FF7A45")) || parseHex("#FF7A45");
      this._hsv = rgb2hsv(c);
      this._a = c.a;
      this._init = this.hexValue;
      this.box.addEventListener("click", () => this.isOpen ? this._pop.close() : this.open());
      this.box.addEventListener("keydown", (e) => {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          this.open();
        }
      });
      this.drag(this.$(".sv"), (x, y) => {
        this._hsv.s = x;
        this._hsv.v = 1 - y;
      });
      this.drag(this.$(".hue"), (x) => {
        this._hsv.h = x * 360;
      });
      this.drag(this.$(".al"), (x) => {
        this._a = x;
      });
      this.barKeys(this.$(".hue"), (d) => {
        this._hsv.h = clamp3(this._hsv.h + d * 3, 0, 360);
      });
      this.barKeys(this.$(".al"), (d) => {
        this._a = clamp3(this._a + d * 0.02, 0, 1);
      });
      const hx = this.$(".hx");
      hx.addEventListener("input", () => {
        const p = parseHex(hx.value);
        if (p) {
          this._hsv = rgb2hsv(p);
          if (this.bool("alpha")) this._a = p.a;
          this.changed(true, false);
        }
      });
      hx.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          hx.value = this.hexValue;
          this.fire("change");
        }
      });
      hx.addEventListener("blur", () => {
        hx.value = this.hexValue;
      });
      this.$(".ps").addEventListener("click", (e) => {
        const b = e.target.closest("button");
        if (!b) return;
        const p = parseHex(b.dataset.c);
        this._hsv = rgb2hsv(p);
        this._a = p.a;
        this.changed(true);
        this.fire("change");
      });
    }
    get isOpen() {
      return !!this._pop?.open;
    }
    get rgb() {
      return hsv2rgb(this._hsv);
    }
    get hexValue() {
      return toHex({ ...this.rgb, a: this._a }, this.bool("alpha"));
    }
    get value() {
      return this.hexValue;
    }
    set value(v) {
      const p = parseHex(v);
      if (!p) return;
      this._hsv = rgb2hsv(p);
      this._a = this.bool("alpha") ? p.a : 1;
      if (this._rendered) this.paint();
    }
    open() {
      if (this.disabled) return;
      this.setBool("open", true);
      this.paint();
      this._pop = openPopover(this.pop, this.box, { onClose: () => this.setBool("open", false) });
    }
    drag(el, set) {
      el.addEventListener("pointerdown", (e) => {
        if (e.button !== 0) return;
        e.preventDefault();
        el.setPointerCapture(e.pointerId);
        const go = (ev) => {
          const r = el.getBoundingClientRect();
          set(clamp3((ev.clientX - r.left) / r.width, 0, 1), clamp3((ev.clientY - r.top) / r.height, 0, 1));
          this.changed(true);
        };
        go(e);
        const up = () => {
          el.removeEventListener("pointermove", go);
          el.removeEventListener("pointerup", up);
          el.removeEventListener("pointercancel", up);
          this.fire("change");
        };
        el.addEventListener("pointermove", go);
        el.addEventListener("pointerup", up);
        el.addEventListener("pointercancel", up);
      });
    }
    barKeys(el, step) {
      el.addEventListener("keydown", (e) => {
        const d = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[e.key];
        if (!d) return;
        e.preventDefault();
        step(d * (e.shiftKey ? 5 : 1));
        this.changed(true);
        this.fire("change");
      });
    }
    changed(user, hexBox = true) {
      this.paint(hexBox);
      if (user) this.fire("input");
    }
    paint(hexBox = true) {
      const { h, s, v } = this._hsv, { r, g, b } = this.rgb, a = this._a, alpha = this.bool("alpha");
      const solid = `rgb(${r | 0} ${g | 0} ${b | 0})`, full = `rgb(${r | 0} ${g | 0} ${b | 0} / ${a})`;
      this.$(".sw i").style.background = full;
      this.$(".pv i").style.background = full;
      this.$(".hex").textContent = this.hexValue;
      const sv = this.$(".sv");
      sv.style.background = `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, hsl(${h} 100% 50%))`;
      Object.assign(sv.querySelector(".k").style, { left: `${s * 100}%`, top: `${(1 - v) * 100}%`, background: solid });
      this.$(".hue .k").style.left = `${h / 360 * 100}%`;
      this.$(".hue").setAttribute("aria-valuenow", Math.round(h));
      const al = this.$(".al");
      al.style.display = alpha ? "" : "none";
      al.querySelector(".g").style.background = `linear-gradient(to right, transparent, ${solid})`;
      al.querySelector(".k").style.left = `${a * 100}%`;
      al.setAttribute("aria-valuenow", Math.round(a * 100));
      if (hexBox && this.root.activeElement !== this.$(".hx")) this.$(".hx").value = this.hexValue;
      this.internals.setFormValue(this.hexValue);
    }
    attr(name, v) {
      if (name === "value") {
        if (v && parseHex(v) && v.toUpperCase() !== this.hexValue) this.value = v;
      } else this.update();
    }
    update() {
      this.paintField();
      this.box.disabled = this.disabled;
      if (this.hasAttribute("label")) this.box.setAttribute("aria-label", this.getAttribute("label"));
      const list = this.str("presets", PRESETS).split(",").map((s) => s.trim()).filter((s) => parseHex(s));
      this.$(".ps").innerHTML = this.getAttribute("presets") === "" ? "" : list.map((c) => `<button type="button" data-c="${esc(c)}" style="background:${esc(c)}" aria-label="${esc(c)}"></button>`).join("");
      this.paint();
    }
    formResetCallback() {
      this.value = this._init;
    }
  };
  __publicField(A2Color, "formAssociated", true);
  __publicField(A2Color, "delegatesFocus", true);
  __publicField(A2Color, "observedAttributes", ["label", "hint", "value", "disabled", "alpha", "presets"]);
  __publicField(A2Color, "styles", `${POPOVER_CSS}
:host { display: block; }
.box { display: flex; align-items: center; gap: 10px; width: 100%; height: var(--a2-h); padding: 0 12px 0 6px; border-radius: var(--a2-radius); background: var(--a2-fill); transition: background-color var(--t1); text-align: left; }
.box:hover { background: var(--a2-fill-hover); }
:host([open]) .box { background: var(--a2-fill-active); }
.sw { position: relative; flex: none; width: calc(var(--a2-h) - 12px); height: calc(var(--a2-h) - 12px); border-radius: calc(var(--a2-radius) - 4px); overflow: hidden; }
.sw::before, .chk { content: ''; position: absolute; inset: 0; background: repeating-conic-gradient(#bbb 0 25%, #eee 0 50%) 0 0 / 8px 8px; }
.sw i, .pv i { position: absolute; inset: 0; }
.hex { flex: 1; font-variant-numeric: tabular-nums; padding-top: 0.12em; letter-spacing: 0.02em; }
.menu { width: 248px; padding: 12px; display: flex; flex-direction: column; gap: 12px; max-height: none; overflow: visible; }
.sv { position: relative; height: 150px; border-radius: 8px; cursor: crosshair; touch-action: none; }
.sv .k { position: absolute; width: 16px; height: 16px; margin: -8px 0 0 -8px; border-radius: 50%; box-shadow: 0 0 0 2px #fff, 0 1px 4px rgba(0,0,0,.4); pointer-events: none; }
.bar { position: relative; height: 12px; border-radius: 6px; cursor: pointer; touch-action: none; }
.bar .k { position: absolute; top: 50%; width: 16px; height: 16px; margin: -8px 0 0 -8px; border-radius: 50%; background: #fff; box-shadow: 0 1px 4px rgba(0,0,0,.4); pointer-events: none; }
.hue { background: linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00); }
.al { overflow: visible; }
.al .chk { border-radius: 6px; background-size: 6px 6px; }
.al .g { position: absolute; inset: 0; border-radius: 6px; }
.row { display: flex; gap: 8px; align-items: center; }
.pv { position: relative; flex: none; width: 34px; height: 34px; border-radius: 8px; overflow: hidden; }
.hx { flex: 1; min-width: 0; height: 34px; padding: 0.12em 10px 0; border: 0; outline: 0; border-radius: 8px; background: var(--a2-fill); color: var(--a2-text); font-variant-numeric: tabular-nums; }
.hx:focus { background: var(--a2-fill-active); }
.ps { display: grid; grid-template-columns: repeat(10, 1fr); gap: 4px; }
.ps button { aspect-ratio: 1; border-radius: 6px; transition: transform var(--t1) var(--spring); }
.ps button:hover { transform: scale(1.15); }
.ps:empty { display: none; }
`);
  define("a2-color", A2Color);

  // src/core/keys.js
  var MODS = ["Ctrl", "Alt", "Shift", "Meta"];
  var MOD_OF = { ControlLeft: "Ctrl", ControlRight: "Ctrl", AltLeft: "Alt", AltRight: "Alt", ShiftLeft: "Shift", ShiftRight: "Shift", MetaLeft: "Meta", MetaRight: "Meta" };
  function parseCombo(s) {
    const parts = String(s || "").split("+").map((x) => x.trim()).filter(Boolean);
    return { mods: MODS.filter((m) => parts.includes(m) || m === "Ctrl" && parts.includes("Control")), key: parts.filter((p) => !MODS.includes(p) && p !== "Control").pop() || "" };
  }
  var comboString = ({ mods, key }) => [...MODS.filter((m) => mods.includes(m)), key].filter(Boolean).join("+");
  var NAMES = { Backquote: "`", Minus: "-", Equal: "=", BracketLeft: "[", BracketRight: "]", Backslash: "\\", Semicolon: ";", Quote: "'", Comma: ",", Period: ".", Slash: "/", Space: "Space", Enter: "Enter", Escape: "Esc", Backspace: "⌫", Tab: "Tab", ArrowUp: "↑", ArrowDown: "↓", ArrowLeft: "←", ArrowRight: "→", Delete: "Del" };
  function keyNames(s) {
    const { mods, key } = parseCombo(s);
    const n = (k) => NAMES[k] || k.replace(/^Key/, "").replace(/^Digit/, "").replace(/^Numpad/, "Num ");
    return [...mods, ...key ? [n(key)] : []];
  }
  function matches(e, combo) {
    const c = typeof combo === "string" ? parseCombo(combo) : combo;
    if (!c.key || e.code !== c.key) return false;
    const want = (m) => c.mods.includes(m);
    return e.ctrlKey === want("Ctrl") && e.altKey === want("Alt") && e.shiftKey === want("Shift") && e.metaKey === want("Meta");
  }

  // src/elements/keybind.js
  var A2Keybind = class extends A2Element {
    render() {
      this.root.innerHTML = `${this.fieldHead("")}<button class="box" part="box" type="button"><span class="keys"></span><span class="x" role="button" aria-label="비우기">${icon("x", 14)}</span></button><div class="hint t" part="hint"></div>`;
      this.box = this.$(".box");
      this._v = comboString(parseCombo(this.str("value")));
      this._init = this._v;
      this.box.addEventListener("click", (e) => {
        if (e.target.closest(".x")) {
          e.stopPropagation();
          this.set("");
          this.stop();
          return;
        }
        this.rec ? this.stop() : this.start();
      });
      this.box.addEventListener("keydown", (e) => this.key(e));
      this.box.addEventListener("keyup", (e) => {
        if (!this.rec) return;
        const mods = ["Ctrl", "Alt", "Shift", "Meta"].filter((m) => ({ Ctrl: e.ctrlKey, Alt: e.altKey, Shift: e.shiftKey, Meta: e.metaKey })[m]);
        this.paint(mods);
      });
      this.box.addEventListener("blur", () => this.stop());
    }
    get value() {
      return this._v;
    }
    set value(v) {
      this._v = comboString(parseCombo(v));
      if (this._rendered) this.update();
    }
    get recording() {
      return !!this.rec;
    }
    start() {
      if (this.disabled) return;
      this.rec = true;
      this.box.classList.add("rec");
      this.paint([]);
    }
    stop() {
      if (!this.rec) return;
      this.rec = false;
      this.box.classList.remove("rec");
      this.update();
    }
    key(e) {
      if (!this.rec) {
        if (e.key === "Backspace" || e.key === "Delete") {
          e.preventDefault();
          this.set("");
        }
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      const mods = ["Ctrl", "Alt", "Shift", "Meta"].filter((m) => ({ Ctrl: e.ctrlKey, Alt: e.altKey, Shift: e.shiftKey, Meta: e.metaKey })[m]);
      if (MOD_OF[e.code]) {
        this.paint(mods);
        return;
      }
      if (!mods.length && e.code === "Escape") {
        this.stop();
        return;
      }
      if (!mods.length && (e.code === "Backspace" || e.code === "Delete")) {
        this.set("");
        this.stop();
        return;
      }
      this.set(comboString({ mods, key: e.code }));
      this.stop();
    }
    set(v) {
      if (v === this._v) return;
      this._v = v;
      this.update();
      this.fire("input");
      this.fire("change");
    }
    /** mods 가 있으면 기록 중 미리보기 */
    paint(mods) {
      const k = this.$(".keys");
      const names = mods ? mods : keyNames(this._v);
      const ph = this.rec && !(mods && mods.length) ? "키를 누르세요" : this.str("placeholder", "없음");
      k.innerHTML = names.length ? names.map((n) => `<kbd>${esc(n)}</kbd>`).join('<span class="plus">+</span>') + (this.rec ? '<span class="plus">+</span>' : "") : `<span class="ph">${esc(ph)}</span>`;
      this.$(".x").style.visibility = this._v && !this.rec ? "visible" : "hidden";
    }
    attr(name, v) {
      if (name === "value") this.value = v;
      else this.update();
    }
    update() {
      this.paintField();
      this.box.disabled = this.disabled;
      this.box.setAttribute("aria-label", `${this.str("label", "단축키")}: ${keyNames(this._v).join("+") || "없음"}`);
      if (!this.rec) this.paint(null);
      this.internals.setFormValue(this._v || null);
    }
    formResetCallback() {
      this._v = this._init;
      this.update();
    }
  };
  __publicField(A2Keybind, "formAssociated", true);
  __publicField(A2Keybind, "delegatesFocus", true);
  __publicField(A2Keybind, "observedAttributes", ["label", "hint", "value", "disabled", "placeholder"]);
  __publicField(A2Keybind, "styles", `
:host { display: block; }
.box { display: flex; align-items: center; gap: 8px; width: 100%; height: var(--a2-h); padding: 0 6px 0 8px; border-radius: var(--a2-radius); background: var(--a2-fill); transition: background-color var(--t1); text-align: left; }
.box:hover { background: var(--a2-fill-hover); }
.box.rec { background: var(--a2-accent-soft); }
.keys { flex: 1; min-width: 0; display: flex; align-items: center; gap: 4px; overflow: hidden; }
kbd {
  display: inline-grid; place-items: center; min-width: 26px; height: 26px; padding: 0.12em 7px 0; border-radius: 6px;
  background: var(--a2-raised); box-shadow: 0 1px 0 rgba(0, 0, 0, 0.28); font: inherit; font-size: var(--a2-fs-sm); font-weight: var(--a2-weight-strong);
  animation: kIn var(--t2) var(--spring);
}
@keyframes kIn { from { transform: translateY(3px); opacity: 0; } }
.plus { color: var(--a2-text-faint); font-size: var(--a2-fs-sm); }
.ph { padding: 0.12em 4px 0; color: var(--a2-text-faint); }
.rec .ph { color: var(--a2-accent); }
.x { flex: none; width: 26px; height: 26px; border-radius: 6px; display: grid; place-items: center; color: var(--a2-text-muted); }
.x:hover { background: var(--a2-fill-active); color: var(--a2-text); }
`);
  define("a2-keybind", A2Keybind);

  // src/elements/display.js
  var A2Progress = class extends A2Element {
    render() {
      this.setAttribute("role", "progressbar");
      this.root.innerHTML = `<div class="head"><div class="label t" part="label"></div><div class="out t"></div></div><div class="track" part="track"><div class="fill" part="fill"></div></div>`;
    }
    get value() {
      return this.num("value", null);
    }
    set value(v) {
      if (v == null) this.removeAttribute("value");
      else this.setAttribute("value", v);
    }
    update() {
      this.paintField();
      const v = this.value, max = this.num("max", 100) || 100, ind = v == null;
      this.$(".track").classList.toggle("ind", ind);
      const p = ind ? 0 : Math.min(Math.max(v / max, 0), 1);
      this.$(".fill").style.transform = ind ? "" : `scaleX(${p})`;
      this.$(".out").textContent = this.bool("show-value") && !ind ? `${Math.round(p * 100)}%` : "";
      if (ind) this.removeAttribute("aria-valuenow");
      else this.setAttribute("aria-valuenow", Math.round(p * 100));
      if (this.hasAttribute("label")) this.setAttribute("aria-label", this.getAttribute("label"));
    }
  };
  __publicField(A2Progress, "observedAttributes", ["value", "max", "label", "show-value", "variant"]);
  __publicField(A2Progress, "styles", `
:host { display: block; }
.head { display: flex; justify-content: space-between; gap: 12px; }
.head .label { flex: 1; }
.out { font-size: var(--a2-fs-sm); color: var(--a2-text-muted); font-variant-numeric: tabular-nums; margin-bottom: 7px; }
.out:empty { display: none; }
.track { position: relative; height: 6px; border-radius: 3px; background: var(--a2-fill-active); overflow: hidden; }
.fill { position: absolute; inset: 0 auto 0 0; width: 100%; border-radius: 3px; background: var(--a2-accent); transform-origin: left; transform: scaleX(0); transition: transform var(--t3) var(--spring); }
:host([variant="success"]) .fill { background: var(--a2-success); }
:host([variant="danger"]) .fill { background: var(--a2-danger); }
.ind .fill { width: 40%; transform: none; transition: none; animation: run calc(1.3s / var(--a2-speed)) cubic-bezier(0.6, 0.1, 0.4, 0.9) infinite; }
@keyframes run { from { translate: -100% 0; } to { translate: 250% 0; } }
`);
  var A2Spinner = class extends A2Element {
    render() {
      this.setAttribute("role", "status");
      if (!this.hasAttribute("aria-label")) this.setAttribute("aria-label", "불러오는 중");
    }
    update() {
      const s = this.num("size", 22);
      this.root.innerHTML = `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2.6"/></svg>`;
    }
  };
  __publicField(A2Spinner, "observedAttributes", ["size"]);
  __publicField(A2Spinner, "styles", `
:host { display: inline-block; vertical-align: middle; color: var(--a2-accent); line-height: 0; }
svg { animation: rot calc(0.9s / var(--a2-speed)) linear infinite; }
circle { stroke-dasharray: 44 100; stroke-linecap: round; animation: dash calc(1.6s / var(--a2-speed)) ease-in-out infinite; }
@keyframes rot { to { rotate: 360deg; } }
@keyframes dash { 0% { stroke-dasharray: 6 100; } 50% { stroke-dasharray: 40 100; } 100% { stroke-dasharray: 6 100; stroke-dashoffset: -50; } }
`);
  var A2Badge = class extends A2Element {
    render() {
      this.root.innerHTML = `<span class="b" part="base"><span class="dot"></span><slot></slot></span>`;
    }
  };
  __publicField(A2Badge, "styles", `
:host { display: inline-flex; vertical-align: middle; }
.b { display: inline-flex; align-items: center; gap: 6px; height: 24px; padding: 0.12em 9px 0; border-radius: 7px; font-size: var(--a2-fs-sm); font-weight: var(--a2-weight-strong); white-space: nowrap; background: var(--a2-fill-active); color: var(--a2-text-muted); --c: var(--a2-text-muted); }
:host([variant="accent"]) .b { --c: var(--a2-accent); }
:host([variant="success"]) .b { --c: var(--a2-success); }
:host([variant="warning"]) .b { --c: var(--a2-warning); }
:host([variant="danger"]) .b { --c: var(--a2-danger); }
:host([variant]:not([variant="neutral"])) .b { background: color-mix(in srgb, var(--c) 16%, transparent); color: var(--c); }
.dot { display: none; width: 6px; height: 6px; margin-top: -0.12em; border-radius: 50%; background: var(--c); }
:host([dot]) .dot { display: block; }
`);
  var A2Card = class extends A2Element {
    render() {
      this.root.innerHTML = `<div class="c" part="base"><div class="top"><div class="h" part="heading"></div><div class="d" part="description"></div></div><div class="body"><slot></slot></div><div class="foot" part="footer"><slot name="footer"></slot></div></div>`;
      this.root.querySelector("slot[name=footer]").addEventListener("slotchange", (e) => this.$(".foot").classList.toggle("on", e.target.assignedElements().length > 0));
    }
    update() {
      this.$(".h").textContent = this.str("heading");
      this.$(".d").textContent = this.str("description");
      const empty = !this.str("heading") && !this.str("description");
      this.$(".top").style.display = empty ? "none" : "";
      this.$(".body").style.marginTop = empty ? "0" : "16px";
    }
  };
  __publicField(A2Card, "observedAttributes", ["heading", "description"]);
  __publicField(A2Card, "styles", `
:host { display: block; }
.c { border-radius: var(--a2-radius-lg); background: var(--a2-surface); padding: 20px; }
:host([interactive]) .c { cursor: pointer; transition: background-color var(--t1), transform var(--t2) var(--spring); }
:host([interactive]) .c:hover { background: var(--a2-surface-hover); }
:host([interactive]) .c:active { transform: scale(0.985); }
.h { font-size: var(--a2-fs-lg); font-weight: var(--a2-weight-strong); line-height: 1.35; padding-top: 0.12em; }
.d { margin-top: 5px; color: var(--a2-text-muted); line-height: 1.5; font-size: var(--a2-fs-sm); }
.h:empty, .d:empty { display: none; }
.foot { display: flex; gap: 8px; justify-content: flex-end; flex-wrap: wrap; }
.foot.on { margin-top: 18px; }
`);
  define("a2-progress", A2Progress);
  define("a2-spinner", A2Spinner);
  define("a2-badge", A2Badge);
  define("a2-card", A2Card);

  // src/elements/overlay.js
  var locks = 0;
  var saved = null;
  function lockScroll(on) {
    const de = document.documentElement;
    if (on && locks++ === 0) {
      const gap = innerWidth - de.clientWidth;
      saved = { o: de.style.overflow, p: document.body.style.paddingRight };
      de.style.overflow = "hidden";
      if (gap > 0) document.body.style.paddingRight = `${(parseFloat(getComputedStyle(document.body).paddingRight) || 0) + gap}px`;
    } else if (!on && locks > 0 && --locks === 0 && saved) {
      de.style.overflow = saved.o;
      document.body.style.paddingRight = saved.p;
      saved = null;
    }
  }
  var OVERLAY_CSS = `
:host { display: contents; }
dialog { position: fixed; inset: 0; width: 100%; height: 100%; max-width: none; max-height: none; margin: 0; padding: 0; border: 0; background: none; overflow: hidden; color: var(--a2-text); font: inherit; outline: none; }
dialog::backdrop { background: none; }
.scrim { position: absolute; inset: 0; background: var(--a2-scrim); opacity: 0; }
.panel { position: absolute; display: flex; flex-direction: column; background: var(--a2-raised); box-shadow: var(--a2-shadow); outline: none; }
.head { display: flex; align-items: flex-start; gap: 12px; padding: 22px 22px 0; }
.titles { flex: 1; min-width: 0; }
.h { font-size: var(--a2-fs-lg); font-weight: var(--a2-weight-strong); line-height: 1.35; padding-top: 0.12em; }
.d { margin-top: 6px; color: var(--a2-text-muted); font-size: var(--a2-fs-sm); line-height: 1.5; }
.h:empty, .d:empty { display: none; }
.x { flex: none; width: 32px; height: 32px; margin: -4px -6px 0 0; border-radius: 8px; display: grid; place-items: center; color: var(--a2-text-muted); transition: background-color var(--t1), color var(--t1); }
.x:hover { background: var(--a2-fill-hover); color: var(--a2-text); }
:host([no-close]) .x { display: none; }
.body { padding: 16px 22px 0; overflow: auto; line-height: 1.55; flex: 1 1 auto; min-height: 0; }
.foot { display: flex; gap: 8px; justify-content: flex-end; flex-wrap: wrap; padding: 22px; }
.foot:not(.on) { padding-top: 0; }
`;
  var OverlayBase = class extends A2Element {
    render() {
      this.root.innerHTML = `<dialog part="dialog"><div class="scrim" part="scrim"></div><div class="panel" part="panel" tabindex="-1" role="document"><div class="head"><div class="titles"><div class="h" part="heading"></div><div class="d" part="description"></div></div><button class="x" type="button" aria-label="닫기">${icon("x", 16)}</button></div><div class="body" part="body"><slot></slot></div><div class="foot" part="footer"><slot name="footer"></slot></div></div></dialog>`;
      this.dlg = this.$("dialog");
      this.panel = this.$(".panel");
      this.scrim = this.$(".scrim");
      this.$(".x").addEventListener("click", () => this.close());
      this.scrim.addEventListener("click", () => {
        if (!this.bool("persistent")) this.close();
      });
      this.dlg.addEventListener("cancel", (e) => {
        e.preventDefault();
        if (!this.bool("persistent")) this.close();
      });
      this.root.querySelector("slot[name=footer]").addEventListener("slotchange", (e) => this.$(".foot").classList.toggle("on", e.target.assignedElements().length > 0));
      this.addEventListener("click", (e) => {
        const c = e.target.closest?.("[data-close]");
        if (c && this.contains(c)) this.close(c.getAttribute("data-close") || "");
      });
    }
    get open() {
      return this.bool("open");
    }
    set open(v) {
      this.setBool("open", v);
    }
    show() {
      this.open = true;
      return this;
    }
    close(returnValue) {
      if (returnValue !== void 0) this.returnValue = returnValue;
      this.open = false;
      return this;
    }
    attr(name, v, old) {
      if (name === "open") v != null === (old != null) || (v != null ? this.doOpen() : this.doClose());
      else this.update();
    }
    connectedCallback() {
      super.connectedCallback();
      if (this.open && !this.dlg.open) this.doOpen();
    }
    disconnectedCallback() {
      if (this._locked) {
        this._locked = false;
        lockScroll(false);
      }
    }
    update() {
      this.$(".h").textContent = this.str("heading");
      this.$(".d").textContent = this.str("description");
      const lab = this.str("heading") || this.str("label");
      if (lab) this.dlg.setAttribute("aria-label", lab);
      else this.dlg.removeAttribute("aria-label");
    }
    doOpen() {
      if (this.dlg.open) return;
      this.returnValue = "";
      this._ret = document.activeElement;
      this.dlg.showModal();
      if (!this._locked) {
        this._locked = true;
        lockScroll(true);
      }
      const auto = this.querySelector("[autofocus]");
      if (auto) auto.focus();
      else this.panel.focus({ preventScroll: true });
      this._anim?.stop();
      const from = this._p ?? 0;
      this._anim = animate({ p: from }, { p: 1 }, { duration: 0.36, ease: "OutExpo", onUpdate: (v) => this.paint(v.p) });
      this.emit("a2-show");
    }
    doClose() {
      if (!this.dlg.open) return;
      this._anim?.stop();
      this._anim = animate({ p: this._p ?? 1 }, { p: 0 }, {
        duration: 0.2,
        ease: "OutCubic",
        onUpdate: (v) => this.paint(v.p),
        onDone: () => {
          this.dlg.close();
          if (this._locked) {
            this._locked = false;
            lockScroll(false);
          }
          if (this._ret && this._ret.isConnected) this._ret.focus?.({ preventScroll: true });
          this.emit("a2-close", { returnValue: this.returnValue });
        }
      });
    }
    paint(p) {
      this._p = p;
      this.scrim.style.opacity = p;
    }
  };
  __publicField(OverlayBase, "observedAttributes", ["open", "heading", "description"]);
  var A2Dialog = class extends OverlayBase {
    paint(p) {
      super.paint(p);
      this.panel.style.opacity = Math.min(1, p * 1.6);
      this.panel.style.transform = `scale(${0.94 + 0.06 * p}) translateY(${(1 - p) * 10}px)`;
    }
  };
  __publicField(A2Dialog, "styles", `${OVERLAY_CSS}
.panel { left: 50%; top: 50%; width: min(var(--w, 440px), calc(100vw - 32px)); max-height: calc(100dvh - 48px); border-radius: 18px; translate: -50% -50%; }
:host([size="sm"]) { --w: 360px; }
:host([size="lg"]) { --w: 640px; }
`);
  var A2Drawer = class extends OverlayBase {
    paint(p) {
      super.paint(p);
      const side = this.str("side", "right"), q = (1 - p) * 100;
      this.panel.style.transform = side === "left" ? `translateX(${-q}%)` : side === "bottom" ? `translateY(${q}%)` : `translateX(${q}%)`;
    }
  };
  __publicField(A2Drawer, "styles", `${OVERLAY_CSS}
.panel { top: 0; bottom: 0; right: 0; width: min(var(--w, 380px), 100vw); }
:host([side="left"]) .panel { right: auto; left: 0; }
:host([side="bottom"]) .panel { top: auto; left: 0; right: 0; width: auto; max-height: 85dvh; border-radius: 20px 20px 0 0; }
:host([side="bottom"]) .panel::before { content: ''; align-self: center; width: 36px; height: 4px; margin-top: 10px; border-radius: 2px; background: var(--a2-fill-active); }
:host([side="bottom"]) .head { padding-top: 14px; }
`);
  define("a2-dialog", A2Dialog);
  define("a2-drawer", A2Drawer);

  // src/elements/menu.js
  var A2MenuItem = class extends HTMLElement {
    get value() {
      return this.getAttribute("value") ?? this.textContent.trim();
    }
  };
  var A2Menu = class extends A2Element {
    render() {
      this.root.innerHTML = `<div class="pop" popover="manual"><div class="menu" part="menu" role="menu" tabindex="-1"></div></div>`;
      this.pop = this.$(".pop");
      this.list = this.$(".menu");
      this._active = -1;
      this._onTrigger = (e) => {
        if (this.str("trigger", "click") === "contextmenu") {
          e.preventDefault();
          this.show({ x: e.clientX, y: e.clientY });
        } else this.isOpen ? this.close() : this.show(e.currentTarget, e.detail === 0);
      };
      this._onKey = (e) => {
        if (e.key === "ArrowDown" && !this.isOpen && this.str("trigger", "click") === "click") {
          e.preventDefault();
          this.show(e.currentTarget, true);
        }
      };
      this.list.addEventListener("click", (e) => {
        const it = e.target.closest(".item");
        if (it) this.choose(+it.dataset.i);
      });
      this.list.addEventListener("pointermove", (e) => {
        const it = e.target.closest(".item");
        if (it) this.mark(+it.dataset.i);
      });
      this.list.addEventListener("keydown", (e) => {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          this.step(1);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          this.step(-1);
        } else if (e.key === "Home") {
          e.preventDefault();
          this._active = -1;
          this.step(1);
        } else if (e.key === "End") {
          e.preventDefault();
          this._active = this.entries.length;
          this.step(-1);
        } else if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (this._active >= 0) this.choose(this._active);
        } else if (e.key === "Tab") this.close();
      });
    }
    get entries() {
      return [...this.querySelectorAll(":scope > a2-menu-item")];
    }
    get isOpen() {
      return !!this._pop?.open;
    }
    attr() {
      this.bind();
    }
    connectedCallback() {
      super.connectedCallback();
      this.bind();
    }
    disconnectedCallback() {
      this.unbind();
      this._pop?.close();
    }
    unbind() {
      if (!this._target) return;
      this._target.removeEventListener("click", this._onTrigger);
      this._target.removeEventListener("contextmenu", this._onTrigger);
      this._target.removeEventListener("keydown", this._onKey);
      this._target = null;
    }
    bind() {
      this.unbind();
      const id = this.getAttribute("for");
      const t = id ? document.getElementById(id) : null;
      if (!t) {
        if (id && !this._retry) {
          this._retry = true;
          requestAnimationFrame(() => this.bind());
        }
        return;
      }
      this._target = t;
      t.setAttribute("aria-haspopup", "menu");
      t.addEventListener(this.str("trigger", "click") === "contextmenu" ? "contextmenu" : "click", this._onTrigger);
      t.addEventListener("keydown", this._onKey);
    }
    paintList() {
      let i = 0;
      this.list.innerHTML = [...this.children].map((c) => {
        if (c.tagName === "HR") return '<div class="sep" role="separator"></div>';
        if (c.tagName === "A2-MENU-LABEL") return `<div class="head t">${esc(c.textContent)}</div>`;
        if (c.tagName !== "A2-MENU-ITEM") return "";
        const ic = c.querySelector("[slot=icon]");
        const kb = c.getAttribute("shortcut");
        const text = [...c.childNodes].filter((n) => !(n.nodeType === 1 && n.slot === "icon")).map((n) => n.textContent).join("").trim();
        return `<div class="item${c.hasAttribute("danger") ? " danger" : ""}" role="menuitem" data-i="${i++}" aria-disabled="${c.hasAttribute("disabled")}"><span class="ic">${ic ? ic.outerHTML.replace(/\sslot="icon"/, "") : ""}</span><span class="grow">${esc(text)}</span>${kb ? `<span class="kb">${esc(keyNames(kb).join("+"))}</span>` : ""}</div>`;
      }).join("");
    }
    /** @param {Element|{x:number,y:number}} at */
    show(at, kb) {
      if (this.isOpen) this._pop.close();
      at = at || this._target;
      this.paintList();
      this._active = -1;
      this._target?.setAttribute("aria-expanded", "true");
      this._pop = openPopover(this.pop, at, { gap: 6, alignEnd: this.str("align") === "end", closeOnOutside: this._target && at === this._target ? [this._target] : [], onClose: () => {
        this._target?.setAttribute("aria-expanded", "false");
        this.emit("a2-close");
      } });
      this.list.focus({ preventScroll: true });
      if (kb) this.step(1);
    }
    close() {
      if (this.isOpen) {
        this._pop.close();
        this._target?.focus?.({ preventScroll: true });
      }
    }
    mark(i) {
      this._active = i;
      this.list.querySelectorAll(".item").forEach((el) => el.classList.toggle("active", +el.dataset.i === i));
    }
    step(d) {
      const items = this.entries, n = items.length;
      if (!n) return;
      let i = this._active;
      for (let k = 0; k < n; k++) {
        i = (i + d + n) % n;
        if (!items[i].hasAttribute("disabled")) break;
      }
      this.mark(i);
      this.list.querySelector(`.item[data-i="${i}"]`)?.scrollIntoView({ block: "nearest" });
    }
    choose(i) {
      const item = this.entries[i];
      if (!item || item.hasAttribute("disabled")) return;
      this.close();
      item.dispatchEvent(new CustomEvent("a2-select", { bubbles: true, composed: true, detail: { value: item.value, item } }));
    }
  };
  __publicField(A2Menu, "observedAttributes", ["for", "trigger"]);
  __publicField(A2Menu, "styles", `${POPOVER_CSS}
:host { display: contents; }
.menu:focus { outline: none; }
.item .ic { flex: none; width: 18px; display: grid; place-items: center; color: var(--a2-text-muted); }
.item .ic:empty { display: none; }
.item.danger, .item.danger .ic { color: var(--a2-danger); }
.item.danger:hover, .item.danger.active { background: color-mix(in srgb, var(--a2-danger) 14%, transparent); }
.kb { flex: none; margin-left: 14px; color: var(--a2-text-faint); font-size: var(--a2-fs-sm); padding-top: 0.12em; }
.head { padding: 8px 10px 4px; color: var(--a2-text-faint); font-size: var(--a2-fs-sm); }
`);
  define("a2-menu-item", A2MenuItem);
  define("a2-menu", A2Menu);

  // src/api/toast.js
  var CSS = `
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
  var host = null;
  var layer = null;
  function ensureLayer() {
    ensureGlobal();
    if (host && host.isConnected) return;
    host = document.createElement("div");
    host.setAttribute("data-a2-toasts", "");
    const root = host.attachShadow({ mode: "open" });
    root.adoptedStyleSheets = [sheet(BASE_CSS), sheet(CSS)];
    layer = document.createElement("div");
    layer.className = "layer";
    layer.setAttribute("popover", "manual");
    layer.setAttribute("role", "status");
    layer.setAttribute("aria-live", "polite");
    root.append(layer);
    document.body.append(host);
  }
  function raise() {
    try {
      if (layer.matches(":popover-open")) layer.hidePopover();
      layer.showPopover();
    } catch (_) {
    }
  }
  function flip(fn) {
    const items = [...layer.children], before = new Map(items.map((el) => [el, el.getBoundingClientRect().top]));
    fn();
    for (const el of layer.children) {
      const b = before.get(el);
      if (b == null) continue;
      const d = b - el.getBoundingClientRect().top;
      if (Math.abs(d) < 1) continue;
      el._fl?.stop();
      el._fl = animate({ y: d }, { y: 0 }, { duration: 0.32, ease: "OutExpo", onUpdate: (v) => {
        el.style.translate = `0 ${v.y}px`;
      } });
    }
  }
  function toast(message, o = {}) {
    ensureLayer();
    if (o.position) host.setAttribute("pos", o.position);
    const v = o.variant && o.variant !== "default" ? o.variant : null;
    const el = document.createElement("div");
    el.className = `toast${o.action ? "" : " plain"}`;
    el.innerHTML = `${v ? `<span class="ic ${v}">${icon(v === "info" ? "info" : v, 18)}</span>` : ""}<span class="msg"></span>${o.action ? `<button class="act" type="button">${esc(o.action.label)}</button>` : ""}`;
    el.querySelector(".msg").textContent = message;
    let timer2 = 0, closed = false;
    const close = () => {
      if (closed) return;
      closed = true;
      clearTimeout(timer2);
      el._in?.stop();
      animate({ p: 1 }, { p: 0 }, {
        duration: 0.18,
        ease: "OutSine",
        onUpdate: (q) => {
          el.style.opacity = q.p;
          el.style.transform = `scale(${0.92 + 0.08 * q.p})`;
        },
        onDone: () => {
          flip(() => el.remove());
          if (!layer.children.length) try {
            layer.hidePopover();
          } catch (_) {
          }
          o.onClose && o.onClose();
        }
      });
    };
    if (o.action) el.querySelector(".act").addEventListener("click", () => {
      o.action.onClick && o.action.onClick();
      close();
    });
    const dur = o.duration ?? (o.action ? 5e3 : 3e3);
    const arm = () => {
      clearTimeout(timer2);
      if (dur > 0) timer2 = setTimeout(close, dur);
    };
    el.addEventListener("pointerenter", () => clearTimeout(timer2));
    el.addEventListener("pointerleave", arm);
    raise();
    while (layer.children.length >= (o.max ?? 4)) layer.children[0]._close?.();
    el._close = close;
    flip(() => layer.append(el));
    const top = host.getAttribute("pos") === "top";
    el._in = animate({ p: 0 }, { p: 1 }, { duration: 0.42, ease: "OutExpo", onUpdate: (q) => {
      el.style.opacity = Math.min(1, q.p * 2);
      el.style.transform = `translateY(${(1 - q.p) * (top ? -16 : 16)}px) scale(${0.94 + 0.06 * q.p})`;
    } });
    arm();
    return { close };
  }

  // src/api/dialogs.js
  function build({ title, message, buttons, input, danger }) {
    const d = document.createElement("a2-dialog");
    d.setAttribute("size", "sm");
    if (title) d.setAttribute("heading", title);
    if (message) d.setAttribute("description", message);
    d.setAttribute("no-close", "");
    let field = null;
    if (input) {
      field = document.createElement("a2-input");
      for (const [k, v] of Object.entries(input)) if (v != null && v !== false) field.setAttribute(k, v === true ? "" : v);
      field.setAttribute("autofocus", "");
      field.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.isComposing) {
          e.preventDefault();
          d.close("ok");
        }
      });
      d.append(field);
    }
    const foot = document.createElement("div");
    foot.slot = "footer";
    foot.style.cssText = "display:contents";
    buttons.forEach((b, i) => {
      const el = document.createElement("a2-button");
      el.textContent = b.label;
      el.setAttribute("data-close", b.value);
      el.setAttribute("variant", b.primary ? danger ? "danger" : "primary" : "secondary");
      if (b.primary && !input) el.setAttribute("autofocus", "");
      foot.append(el);
    });
    d.append(foot);
    document.body.append(d);
    return { d, field };
  }
  var run = (o, pick) => new Promise((resolve) => {
    const { d, field } = build(o);
    d.addEventListener("a2-close", (e) => {
      resolve(pick(e.detail.returnValue, field));
      d.remove();
    }, { once: true });
    d.show();
  });
  var norm = (a, b) => typeof a === "object" && a ? a : { message: a, ...b };
  var alert = (message, o = {}) => {
    const c = norm(message, o);
    return run({ ...c, buttons: [{ label: c.okText || "확인", value: "ok", primary: true }] }, () => void 0);
  };
  var confirm = (message, o = {}) => {
    const c = norm(message, o);
    return run({ ...c, buttons: [{ label: c.cancelText || "취소", value: "cancel" }, { label: c.okText || "확인", value: "ok", primary: true }] }, (v) => v === "ok");
  };
  var prompt = (message, o = {}) => {
    const c = norm(message, o);
    const input = { value: c.value ?? "", placeholder: c.placeholder, type: c.type, label: c.label };
    return run({ ...c, input, buttons: [{ label: c.cancelText || "취소", value: "cancel" }, { label: c.okText || "확인", value: "ok", primary: true }] }, (v, f) => v === "ok" ? f.value : null);
  };

  // src/api/tooltip.js
  var CSS2 = `
.tip { position: fixed; inset: auto; margin: 0; border: 0; padding: 6px 10px 5px; max-width: 260px; border-radius: 8px; overflow: visible;
  background: var(--a2-tip); color: var(--a2-bg); font-family: var(--a2-font); font-size: var(--a2-fs-sm); font-weight: var(--a2-weight); line-height: 1.4;
  pointer-events: none; box-shadow: var(--a2-shadow); }
`;
  var tip = null;
  var cur = null;
  var timer = 0;
  var anim = null;
  var shownAt = 0;
  function ensure() {
    if (tip) return;
    ensureGlobal();
    const host2 = document.createElement("div");
    host2.setAttribute("data-a2-tooltip", "");
    const root = host2.attachShadow({ mode: "open" });
    root.adoptedStyleSheets = [sheet(BASE_CSS), sheet(CSS2)];
    tip = document.createElement("div");
    tip.className = "tip";
    tip.setAttribute("popover", "manual");
    tip.setAttribute("role", "tooltip");
    tip.id = "a2-tooltip";
    root.append(tip);
    document.body.append(host2);
  }
  function place(el) {
    const r = el.getBoundingClientRect(), w = tip.offsetWidth, h = tip.offsetHeight, g = 8;
    let side = el.getAttribute("a2-tip-side") || "top";
    if (side === "top" && r.top - h - g < 4) side = "bottom";
    if (side === "bottom" && r.bottom + h + g > innerHeight - 4) side = "top";
    let x = side === "left" ? r.left - w - g : side === "right" ? r.right + g : r.left + r.width / 2 - w / 2;
    let y = side === "top" ? r.top - h - g : side === "bottom" ? r.bottom + g : r.top + r.height / 2 - h / 2;
    x = Math.min(Math.max(4, x), innerWidth - w - 4);
    y = Math.min(Math.max(4, y), innerHeight - h - 4);
    tip.style.left = `${x}px`;
    tip.style.top = `${y}px`;
    return side;
  }
  function show(el) {
    ensure();
    cur = el;
    tip.textContent = el.getAttribute("a2-tip");
    try {
      if (tip.matches(":popover-open")) tip.hidePopover();
      tip.showPopover();
    } catch (_) {
    }
    const side = place(el);
    const dx = side === "left" ? 4 : side === "right" ? -4 : 0, dy = side === "top" ? 4 : side === "bottom" ? -4 : 0;
    anim?.stop();
    anim = animate({ p: 0 }, { p: 1 }, { duration: 0.16, ease: "OutCubic", onUpdate: (v) => {
      tip.style.opacity = v.p;
      tip.style.transform = `translate(${dx * (1 - v.p)}px, ${dy * (1 - v.p)}px)`;
    } });
    shownAt = performance.now();
    el.setAttribute("aria-describedby", "a2-tooltip");
  }
  function hide() {
    clearTimeout(timer);
    if (!cur) return;
    shownAt = performance.now();
    cur.removeAttribute("aria-describedby");
    cur = null;
    anim?.stop();
    anim = animate({ p: Number(tip.style.opacity) || 1 }, { p: 0 }, { duration: 0.1, ease: "Linear", onUpdate: (v) => {
      tip.style.opacity = v.p;
    }, onDone: () => {
      if (!cur) try {
        tip.hidePopover();
      } catch (_) {
      }
    } });
  }
  var target = (e) => e.composedPath().find((n) => n instanceof Element && n.hasAttribute("a2-tip"));
  var installed = false;
  function installTooltips() {
    if (installed || typeof document === "undefined") return;
    installed = true;
    document.addEventListener("pointerover", (e) => {
      if (e.pointerType === "touch") return;
      const el = target(e);
      if (el === cur) return;
      if (!el) {
        hide();
        return;
      }
      clearTimeout(timer);
      const quick = cur || performance.now() - shownAt < 300;
      timer = setTimeout(() => show(el), quick ? 0 : 450);
    });
    document.addEventListener("pointerout", (e) => {
      if (!e.relatedTarget) hide();
    });
    document.addEventListener("focusin", (e) => {
      const el = target(e);
      if (el && el.matches(":focus-visible, :has(:focus-visible)")) show(el);
    });
    document.addEventListener("focusout", () => hide());
    document.addEventListener("pointerdown", () => hide(), true);
    addEventListener("keydown", (e) => {
      if (e.key === "Escape") hide();
    }, true);
    addEventListener("scroll", () => hide(), true);
  }

  // src/api/theme.js
  var NAMES2 = ["dark", "light", "ocean"];
  var mq = null;
  var mode = null;
  var apply = () => document.documentElement.setAttribute("data-a2-theme", mode === "auto" ? mq.matches ? "light" : "dark" : mode);
  function theme(name) {
    ensureGlobal();
    if (name === void 0) return mode || document.documentElement.getAttribute("data-a2-theme") || "dark";
    if (name !== "auto" && !NAMES2.includes(name)) throw new Error(`adas2: 알 수 없는 테마 "${name}". dark, light, ocean, auto 중 하나`);
    mode = name;
    if (name === "auto" && !mq) {
      mq = matchMedia("(prefers-color-scheme: light)");
      mq.addEventListener("change", () => mode === "auto" && apply());
    }
    if (name === "auto") apply();
    else document.documentElement.setAttribute("data-a2-theme", name);
    document.dispatchEvent(new CustomEvent("a2-theme", { detail: { theme: name } }));
    return name;
  }
  var themes = [...NAMES2];

  // src/index.js
  var version = "4.0.1";
  if (typeof document !== "undefined") {
    ensureGlobal();
    installTooltips();
  }
  var index_default = { version, toast, alert, confirm, prompt, theme, themes, animate, Ease, evaluate, matchKey: matches, keyNames };
  return __toCommonJS(index_exports);
})();
adas2=adas2.default||adas2;
