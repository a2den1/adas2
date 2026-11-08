/*! adas2 v2.0.0 | (c) 2026 a2den1 | adas2 License: 사용 자유, 수정·2차 배포 금지 | https://github.com/a2den1/adas2 */
var adas2 = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
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

  // src/index.js
  var index_exports = {};
  __export(index_exports, {
    Button: () => Button,
    Card: () => Card,
    ColorPicker: () => ColorPicker,
    Config: () => Config,
    Control: () => Control,
    Dropdown: () => Dropdown,
    Ease: () => Ease,
    Factory: () => Factory,
    Input: () => Input,
    KeyCombo: () => KeyCombo,
    MultiDropdown: () => MultiDropdown,
    PageSwitcher: () => PageSwitcher,
    ScrollView: () => ScrollView,
    Segmented: () => Segmented,
    ShortcutManager: () => ShortcutManager,
    Slider: () => Slider,
    Theme: () => Theme,
    Toggle: () => Toggle,
    Tooltip: () => Tooltip,
    Window: () => A2Window,
    WindowManager: () => WindowManager,
    configure: () => configure,
    default: () => index_default,
    ensureDefaults: () => ensureDefaults,
    evaluate: () => evaluate,
    getControl: () => getControl,
    onContextChange: () => onContextChange,
    setConfig: () => setConfig,
    setTheme: () => setTheme,
    switchPage: () => switchPage,
    tooltip: () => tooltip,
    tween: () => tween,
    tweenColor: () => tweenColor,
    tweenNumber: () => tweenNumber,
    version: () => version
  });

  // src/core/config.js
  var Config = class _Config {
    constructor(init = {}) {
      this.uiScale = 0.6;
      this.tooltipEnabled = true;
      this.middleClickToDefault = true;
      this.sliderSensitivity = 1;
      this.animationSpeed = 1;
      Object.assign(this, init);
    }
    with(over = {}) {
      return new _Config({ ...this, ...over });
    }
    static get default() {
      return DEFAULT;
    }
  };
  var DEFAULT = new Config();

  // src/core/theme.js
  var KEYS = {
    // 색
    panelBg: "panel-bg",
    // 창 배경
    topBar: "top-bar",
    // 창 위쪽 막대
    menuBg: "menu-bg",
    // 옆 메뉴 배경
    objectBg: "object-bg",
    // 컨트롤 기본 배경
    objectButton: "object-button",
    // 버튼 배경
    objectActive: "object-active",
    // 켜짐·선택·포커스 강조
    objectActiveBright: "object-active-bright",
    menuHover: "menu-hover",
    // 선택 영역(글자 선택 등)
    cardHeader: "card-header",
    cardPanel: "card-panel",
    softRed: "soft-red",
    // 삭제·오류
    buttonHover: "button-hover",
    buttonPressed: "button-pressed",
    text: "text",
    tooltipBg: "tooltip-bg",
    overlayScrim: "overlay-scrim",
    outline: "outline",
    // 창 테두리
    controlOutlineIdle: "control-outline-idle",
    controlOutlineHover: "control-outline-hover",
    mathOk: "math-ok",
    mathWarn: "math-warn",
    mathErr: "math-err",
    channelR: "channel-r",
    channelG: "channel-g",
    channelB: "channel-b",
    channelA: "channel-a",
    channelS: "channel-s",
    channelV: "channel-v",
    // 숫자
    inactiveAlpha: "inactive-alpha",
    textDimAlpha: "text-dim-alpha",
    textFaintAlpha: "text-faint-alpha",
    disabledContentAlpha: "disabled-alpha",
    cornerRadius: "radius",
    outlineWidth: "outline-width",
    controlHeight: "control-height",
    controlPaddingY: "control-pad-y",
    lineHeight: "line-height",
    fontSizeBody: "font-body",
    fontSizeH1: "font-h1",
    // 글꼴
    font: "font",
    fontMono: "font-mono"
  };
  var UNITLESS = /* @__PURE__ */ new Set(["inactiveAlpha", "textDimAlpha", "textFaintAlpha", "disabledContentAlpha", "lineHeight"]);
  var SIZES = /* @__PURE__ */ new Set(["cornerRadius", "outlineWidth", "controlHeight", "controlPaddingY", "fontSizeBody", "fontSizeH1"]);
  var Theme = class _Theme {
    constructor(values = {}) {
      Object.assign(this, BASE, values);
      Object.freeze(this);
    }
    /** 일부 값만 바꾼 새 테마 */
    with(over = {}) {
      return new _Theme({ ...this, ...over });
    }
    /** 글꼴 크기에 맞는 줄 높이. controlHeight 보다 작아지지 않는다. */
    controlHeightFor(fontSize) {
      return Math.max(this.controlHeight, fontSize * this.lineHeight + this.controlPaddingY * 2);
    }
    /** CSS 변수로 요소에 적용한다 */
    applyTo(el) {
      for (const [k, v] of Object.entries(KEYS)) {
        const val = this[k];
        if (val === void 0) continue;
        el.style.setProperty(`--a2-${v}`, SIZES.has(k) ? String(val) : UNITLESS.has(k) ? String(val) : val);
      }
      el.dataset.a2Theme = this.name || "custom";
    }
    static get Dark() {
      return DARK;
    }
    static get Light() {
      return LIGHT;
    }
    static get Orange() {
      return ORANGE;
    }
  };
  var BASE = {
    name: "dark",
    panelBg: "#25242E",
    topBar: "#414255",
    menuBg: "#6B6E8B",
    objectBg: "#3C3A4B",
    objectButton: "#7A83DF",
    objectActive: "#919AFF",
    objectActiveBright: "#CFD3FF",
    menuHover: "rgba(162, 167, 224, 0.4)",
    cardHeader: "#4C4D66",
    cardPanel: "#2F2E3A",
    softRed: "#E2676D",
    buttonHover: "#9CA3EC",
    buttonPressed: "#CFD3FF",
    text: "#FFFFFF",
    tooltipBg: "rgba(0, 0, 0, 0.6)",
    overlayScrim: "rgba(0, 0, 0, 0.58)",
    outline: "#FFFFFF",
    controlOutlineIdle: "rgba(255, 255, 255, 0)",
    controlOutlineHover: "#919AFF",
    mathOk: "#96FF91",
    mathWarn: "#FFE591",
    mathErr: "#FF9191",
    channelR: "#FF6B70",
    channelG: "#7AD17A",
    channelB: "#8F8FE6",
    channelA: "#737373",
    channelS: "#61C7FF",
    channelV: "#FFD159",
    inactiveAlpha: 0.4,
    textDimAlpha: 0.6,
    textFaintAlpha: 0.2,
    disabledContentAlpha: 0.42,
    cornerRadius: 12,
    outlineWidth: 2,
    controlHeight: 50,
    controlPaddingY: 8,
    lineHeight: 1.35,
    fontSizeBody: 24,
    fontSizeH1: 32,
    font: '"SUIT", "Pretendard", system-ui, -apple-system, "Malgun Gothic", sans-serif',
    fontMono: '"JetBrains Mono", ui-monospace, "Cascadia Mono", Consolas, monospace'
  };
  var DARK = new Theme();
  var LIGHT = new Theme({
    name: "light",
    panelBg: "#EDEDF2",
    topBar: "#D1D4E6",
    menuBg: "#C7C9E0",
    objectBg: "#E0E0EB",
    objectButton: "#6B75D9",
    objectActive: "#5966E6",
    objectActiveBright: "#3340BF",
    buttonHover: "#5560CF",
    buttonPressed: "#3340BF",
    cardHeader: "#D6D8E8",
    cardPanel: "#F6F6FA",
    text: "#1A1A24",
    tooltipBg: "rgba(242, 242, 250, 0.95)",
    outline: "rgba(26, 26, 36, 0.5)",
    controlOutlineHover: "#5966E6",
    menuHover: "rgba(89, 102, 230, 0.25)",
    mathOk: "#1E9E3A",
    mathWarn: "#B08300",
    mathErr: "#D23C3C"
  });
  var ORANGE = new Theme({
    name: "orange",
    objectButton: "#FF793F",
    objectActive: "#FF9B70",
    objectActiveBright: "#FFCFBA",
    buttonHover: "#FF8C59",
    buttonPressed: "#FFCFBA",
    controlOutlineHover: "#FF9B70",
    menuHover: "rgba(255, 155, 112, 0.35)"
  });

  // src/core/context.js
  var ctx = {
    config: Config.default,
    theme: Theme.Dark,
    root: null,
    ready: false
  };
  var listeners = /* @__PURE__ */ new Set();
  var onContextChange = (fn) => {
    listeners.add(fn);
    return () => listeners.delete(fn);
  };
  var notify = () => {
    for (const fn of listeners) fn(ctx);
  };
  function applyRoot() {
    const root = ctx.root || document.documentElement;
    ctx.theme.applyTo(root);
    root.style.setProperty("--a2-scale", String(ctx.config.uiScale));
    const sp = ctx.config.animationSpeed;
    root.style.setProperty("--a2-speed", String(sp > 0 ? sp : 1e4));
    root.classList.add("a2-root");
  }
  function configure({ config, theme, root } = {}) {
    if (config) ctx.config = config instanceof Config ? config : new Config(config);
    if (theme) ctx.theme = theme;
    if (root) ctx.root = root;
    ctx.ready = true;
    applyRoot();
    notify();
  }
  function ensureDefaults() {
    if (!ctx.ready) configure({});
  }
  function setTheme(theme) {
    ctx.theme = theme;
    ensureDefaults();
    applyRoot();
    notify();
  }
  function setConfig(over) {
    ctx.config = ctx.config.with(over);
    ensureDefaults();
    applyRoot();
    notify();
  }

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
  var easeOf = (e) => typeof e === "function" ? e : Ease[e] || Ease.OutCubic;

  // src/core/tween.js
  var running = /* @__PURE__ */ new Set();
  var raf = 0;
  var last = 0;
  function frame(now) {
    raf = 0;
    last = now;
    for (const t of [...running]) t._step(now);
    if (running.size) raf = requestAnimationFrame(frame);
  }
  function wake() {
    if (!raf) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
  }
  setInterval(() => {
    if (running.size && performance.now() - last > 90) {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      frame(performance.now());
    }
  }, 60);
  var reduce = typeof matchMedia === "function" ? matchMedia("(prefers-reduced-motion: reduce)") : { matches: false };
  var TweenHandle = class {
    constructor(from, to, duration, ease, onUpdate, onDone) {
      this.from = from;
      this.to = to;
      this.ease = easeOf(ease);
      this.onUpdate = onUpdate;
      this.onDone = onDone;
      const speed = ctx.config.animationSpeed;
      this.duration = speed > 0 && !reduce.matches ? duration * 1e3 / speed : 0;
      this.start = performance.now();
      this.alive = true;
      if (this.duration <= 0) {
        this._apply(1);
        this._finish();
        return;
      }
      running.add(this);
      wake();
    }
    _apply(p) {
      const e = this.ease(p), out = {};
      for (const k in this.to) out[k] = this.from[k] + (this.to[k] - this.from[k]) * e;
      this.onUpdate(out, p);
    }
    _step(now) {
      if (!this.alive) return;
      const p = Math.min(1, (now - this.start) / this.duration);
      this._apply(p);
      if (p >= 1) this._finish();
    }
    _finish() {
      running.delete(this);
      if (!this.alive) return;
      this.alive = false;
      this.onDone && this.onDone();
    }
    /** 멈춘다. 완료 콜백은 부르지 않는다. */
    kill() {
      this.alive = false;
      running.delete(this);
    }
    /** 끝 값으로 바로 보내고 완료 콜백을 부른다. */
    complete() {
      if (!this.alive) return;
      this._apply(1);
      this._finish();
    }
  };
  function tween(from, to, duration, ease, onUpdate, onDone) {
    return new TweenHandle(from, to, duration, ease, onUpdate, onDone);
  }
  function tweenNumber(from, to, duration, ease, onUpdate, onDone) {
    return tween({ v: from }, { v: to }, duration, ease, (o) => onUpdate(o.v), onDone);
  }
  function parseColor(c) {
    if (Array.isArray(c)) return c;
    c = String(c).trim();
    if (c[0] === "#") {
      const h2 = c.length === 4 || c.length === 5 ? [...c.slice(1)].map((x) => x + x).join("") : c.slice(1);
      const n = (i) => parseInt(h2.slice(i, i + 2), 16);
      return [n(0), n(2), n(4), h2.length >= 8 ? n(6) / 255 : 1];
    }
    const m = c.match(/[\d.]+/g) || [0, 0, 0, 1];
    return [+m[0], +m[1], +m[2], m[3] === void 0 ? 1 : +m[3]];
  }
  var cssColor = ([r, g, b, a]) => `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${+a.toFixed(3)})`;
  function tweenColor(get, set, target2, duration, ease = "OutCubic", onDone) {
    const A = parseColor(get()), B = parseColor(target2);
    return tween(
      { r: A[0], g: A[1], b: A[2], a: A[3] },
      { r: B[0], g: B[1], b: B[2], a: B[3] },
      duration,
      ease,
      (o) => set(cssColor([o.r, o.g, o.b, o.a])),
      onDone
    );
  }

  // src/core/dom.js
  function h(tag, cls, parent, text) {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (text != null) el.textContent = text;
    if (parent) parent.appendChild(el);
    return el;
  }
  function resolveParent(p) {
    if (!p) return null;
    if (typeof p === "string") return document.querySelector(p);
    if (p.content instanceof Element) return p.content;
    if (p.el instanceof Element) return p.el;
    return p;
  }
  function scaleOf(el) {
    const v = parseFloat(getComputedStyle(el || document.documentElement).getPropertyValue("--a2-scale"));
    return Number.isFinite(v) && v > 0 ? v : ctx.config.uiScale;
  }
  var px = (el, n) => n * scaleOf(el);
  var themeVar = (el, name) => getComputedStyle(el || document.documentElement).getPropertyValue(`--a2-${name}`).trim();
  var SVG = {
    triangle: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.2 8.6h13.6c.9 0 1.4 1.1.8 1.8l-6.8 7.6a1.1 1.1 0 0 1-1.6 0L4.4 10.4c-.6-.7-.1-1.8.8-1.8z" fill="currentColor"/></svg>',
    x: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 6.5l11 11M17.5 6.5l-11 11" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" fill="none"/></svg>',
    on: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="currentColor"/><path d="M7.2 12.4l3.2 3.1 6.4-6.6" stroke="var(--a2-panel-bg)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>',
    off: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.6" stroke="currentColor" stroke-width="2.8" fill="none"/></svg>'
  };
  function icon(name, cls, parent) {
    const el = h("span", `a2-icon ${cls || ""}`, parent);
    el.innerHTML = SVG[name] || "";
    return el;
  }
  function userIcon(spec, cls, parent) {
    if (!spec) return null;
    const el = h("span", `a2-uicon ${cls || ""}`, parent);
    if (typeof spec === "string") {
      if (spec.trim().startsWith("<")) el.innerHTML = spec;
      else h("i", spec, el);
    } else el.appendChild(spec);
    return el;
  }
  function resolveOptions(defaults, opts) {
    const o = { ...defaults };
    if (typeof opts === "function") opts(o);
    else if (opts) Object.assign(o, opts);
    return o;
  }

  // src/core/tooltip.js
  var box = null;
  var alphaTween = null;
  var delayTimer = 0;
  var follow = 0;
  var mouse = { x: 0, y: 0 };
  var pos = { x: 0, y: 0 };
  var current = null;
  addEventListener("pointermove", (e) => {
    mouse = { x: e.clientX, y: e.clientY };
  }, { passive: true });
  function ensureBox() {
    if (box) return box;
    ensureDefaults();
    box = h("div", "a2 a2-tooltip", document.body);
    box.setAttribute("role", "tooltip");
    box.style.opacity = "0";
    return box;
  }
  function target() {
    const s = scaleOf(box);
    let x = mouse.x + 24 * s, y = mouse.y + 28 * s;
    const w = box.offsetWidth, ht = box.offsetHeight;
    x = Math.min(x, innerWidth - w - 4);
    y = Math.min(y, innerHeight - ht - 4);
    if (x < 4) x = 4;
    if (y < 4) y = 4;
    return { x, y };
  }
  function loop() {
    if (!current) {
      follow = 0;
      return;
    }
    const t = target();
    pos.x += (t.x - pos.x) * 0.6;
    pos.y += (t.y - pos.y) * 0.6;
    box.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
    follow = requestAnimationFrame(loop);
  }
  function fade(to, done) {
    alphaTween && alphaTween.kill();
    alphaTween = tweenNumber(+box.style.opacity || 0, to, 0.16, "OutSine", (v) => {
      box.style.opacity = v;
    }, done);
  }
  var Tooltip = {
    /** 글자를 보여 준다 */
    show(text) {
      if (!ctx.config.tooltipEnabled || !text) return;
      ensureBox();
      current = text;
      box.textContent = text;
      box.style.display = "block";
      box.style.opacity = "0";
      const s = scaleOf(box);
      pos = { x: mouse.x + 20 * s, y: mouse.y + 20 * s };
      box.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      clearTimeout(delayTimer);
      delayTimer = setTimeout(() => {
        if (current !== text) return;
        fade(1);
        if (!follow) follow = requestAnimationFrame(loop);
      }, 140 / Math.max(ctx.config.animationSpeed, 1e-3));
    },
    hide() {
      if (!box || !current) return;
      current = null;
      clearTimeout(delayTimer);
      fade(0, () => {
        if (!current) box.style.display = "none";
      });
    }
  };
  function tooltip(el, text) {
    const get = typeof text === "function" ? text : () => text;
    el.addEventListener("pointerenter", (e) => {
      if (e.pointerType !== "touch") Tooltip.show(get());
    });
    el.addEventListener("pointerleave", () => Tooltip.hide());
    el.addEventListener("pointerdown", () => Tooltip.hide());
    return el;
  }

  // src/core/window.js
  var WindowOptions = {
    id: null,
    title: "Window",
    size: [640, 480],
    position: null,
    icon: null,
    iconSize: 40,
    showCloseButton: true,
    draggable: true,
    resizable: false,
    minSize: [900, 500],
    showOutline: true,
    clipContent: false,
    topBarHeight: 60,
    padding: 12,
    panelColor: null,
    topBarColor: null,
    titleFontSize: null,
    bringToFrontOnFocus: true
  };
  var A2Window = class {
    constructor(manager, opts) {
      ensureDefaults();
      const o = this.opts = resolveOptions(WindowOptions, opts);
      this.id = o.id || o.title;
      this.manager = manager;
      this.handlers = {};
      const el = this.el = h("div", "a2 a2-window", manager ? manager.root : null);
      el.setAttribute("role", "dialog");
      el.setAttribute("aria-label", o.title);
      el.style.setProperty("--a2-top", o.topBarHeight);
      el.style.setProperty("--a2-pad", o.padding);
      el.style.setProperty("--a2-icon", o.iconSize);
      if (o.titleFontSize) el.style.setProperty("--a2-title-fs", o.titleFontSize);
      if (o.panelColor) el.style.setProperty("--a2-panel-bg", o.panelColor);
      if (o.topBarColor) el.style.setProperty("--a2-top-bar", o.topBarColor);
      if (o.clipContent) el.classList.add("a2-clip");
      this.topBar = h("div", "a2-win-top", el);
      this.iconEl = null;
      this.titleEl = h("div", "a2-win-title", this.topBar, o.title);
      this.setIcon(o.icon);
      if (o.showCloseButton) {
        this.closeBtn = h("button", "a2-win-close", this.topBar);
        this.closeBtn.type = "button";
        this.closeBtn.setAttribute("aria-label", "닫기");
        h("span", "a2-win-close-bg", this.closeBtn);
        icon("x", "", this.closeBtn);
        this.closeBtn.addEventListener("click", () => this.emit("closeRequested", this));
        this.closeBtn.addEventListener("pointerdown", (e) => e.stopPropagation());
      }
      this.content = h("div", "a2-win-content", el);
      if (o.showOutline) h("div", "a2-win-outline", el);
      this.setSize(o.size[0], o.size[1]);
      requestAnimationFrame(() => this.setPosition(o.position));
      this.setPosition(o.position);
      el.addEventListener("pointerdown", () => {
        this.emit("focused", this);
        if (o.bringToFrontOnFocus) this.bringToFront();
      }, true);
      if (o.draggable) this.wireDrag();
      if (o.resizable) this.wireResize();
    }
    /** 이벤트: 'closeRequested', 'focused', 'moved', 'resized' */
    on(name, fn) {
      var _a;
      ((_a = this.handlers)[name] || (_a[name] = /* @__PURE__ */ new Set())).add(fn);
      return () => this.handlers[name].delete(fn);
    }
    emit(name, ...a) {
      for (const fn of this.handlers[name] || []) fn(...a);
    }
    get scale() {
      return scaleOf(this.el);
    }
    setTitle(t) {
      this.titleEl.textContent = t;
      this.el.setAttribute("aria-label", t);
    }
    setIcon(spec) {
      if (this.iconEl) {
        this.iconEl.remove();
        this.iconEl = null;
      }
      if (spec) {
        this.iconEl = userIcon(spec, "a2-win-icon", null);
        this.topBar.prepend(this.iconEl);
      }
      this.el.classList.toggle("a2-has-icon", !!spec);
    }
    /** 디자인 단위로 크기 */
    setSize(w, ht) {
      w = Math.max(120, +w || 0);
      ht = Math.max(this.opts.topBarHeight + 40, +ht || 0);
      this.w = w;
      this.h = ht;
      this.el.style.setProperty("--a2-w", w);
      this.el.style.setProperty("--a2-hh", ht);
    }
    /** 가운데 기준 위치(디자인 단위). null 이면 가운데 */
    setPosition(p) {
      const root = this.el.parentElement;
      if (!root) return;
      const s = this.scale, rw = root.clientWidth, rh = root.clientHeight;
      const cx = rw / 2 + (p ? p[0] * s : 0), cy = rh / 2 + (p ? p[1] * s : 0);
      this.x = cx - this.w * s / 2;
      this.y = cy - this.h * s / 2;
      this.applyPos();
    }
    applyPos() {
      this.el.style.transform = `translate(${Math.round(this.x)}px, ${Math.round(this.y)}px)`;
    }
    bringToFront() {
      if (this.manager) this.manager.bringToFront(this);
      else if (this.el.parentElement) this.el.parentElement.appendChild(this.el);
    }
    show() {
      this.el.hidden = false;
      this.bringToFront();
    }
    hide() {
      this.el.hidden = true;
    }
    get visible() {
      return !this.el.hidden;
    }
    wireDrag() {
      let d = null;
      this.topBar.addEventListener("pointerdown", (e) => {
        if (e.button !== 0) return;
        d = { x: e.clientX, y: e.clientY, ox: this.x, oy: this.y };
        try {
          this.topBar.setPointerCapture(e.pointerId);
        } catch (_) {
        }
        this.el.classList.add("a2-dragging");
      });
      this.topBar.addEventListener("pointermove", (e) => {
        if (!d) return;
        const root = this.el.parentElement, wpx = this.el.offsetWidth, hpx = this.el.offsetHeight;
        const s = this.scale, keep = 60 * s;
        this.x = Math.min(Math.max(d.ox + e.clientX - d.x, keep - wpx), root.clientWidth - keep);
        this.y = Math.min(Math.max(d.oy + e.clientY - d.y, 0), root.clientHeight - keep);
        this.applyPos();
      });
      const end = () => {
        if (d) {
          d = null;
          this.el.classList.remove("a2-dragging");
          this.emit("moved", this);
        }
      };
      this.topBar.addEventListener("pointerup", end);
      this.topBar.addEventListener("pointercancel", end);
    }
    wireResize() {
      this.el.classList.add("a2-resizable");
      for (const dir of ["n", "s", "e", "w", "ne", "nw", "se", "sw"]) {
        const hd = h("div", `a2-win-resize a2-rs-${dir}`, this.el);
        let d = null;
        hd.addEventListener("pointerdown", (e) => {
          if (e.button !== 0) return;
          e.stopPropagation();
          d = { x: e.clientX, y: e.clientY, w: this.w, h: this.h, ox: this.x, oy: this.y };
          try {
            hd.setPointerCapture(e.pointerId);
          } catch (_) {
          }
        });
        hd.addEventListener("pointermove", (e) => {
          if (!d) return;
          const s = this.scale, dx = (e.clientX - d.x) / s, dy = (e.clientY - d.y) / s;
          const [mw, mh] = this.opts.minSize;
          let w = d.w, ht = d.h, x = d.ox, y = d.oy;
          if (dir.includes("e")) w = Math.max(mw, d.w + dx);
          if (dir.includes("s")) ht = Math.max(mh, d.h + dy);
          if (dir.includes("w")) {
            w = Math.max(mw, d.w - dx);
            x = d.ox + (d.w - w) * s;
          }
          if (dir.includes("n")) {
            ht = Math.max(mh, d.h - dy);
            y = d.oy + (d.h - ht) * s;
          }
          this.setSize(w, ht);
          this.x = x;
          this.y = y;
          this.applyPos();
        });
        const end = () => {
          if (d) {
            d = null;
            this.emit("resized", this);
          }
        };
        hd.addEventListener("pointerup", end);
        hd.addEventListener("pointercancel", end);
      }
    }
    dispose() {
      this.el.remove();
      if (this.manager) this.manager.windows.delete(this);
    }
  };
  var WindowManager = class _WindowManager {
    /** root 안에 창을 띄운다. root 는 position 이 정해진 요소(기본: 화면 전체 고정 레이어) */
    static create(root) {
      return new _WindowManager(root);
    }
    constructor(root) {
      ensureDefaults();
      let r = resolveParent(root);
      if (!r) {
        r = h("div", "a2-window-layer", document.body);
      }
      this.root = r;
      r.classList.add("a2-window-root");
      this.windows = /* @__PURE__ */ new Set();
    }
    create(opts) {
      const w = new A2Window(this, opts);
      this.windows.add(w);
      return w;
    }
    get(id) {
      for (const w of this.windows) if (w.id === id) return w;
      return null;
    }
    bringToFront(w) {
      this.root.appendChild(w.el);
    }
  };

  // src/eval/evaluator.js
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

  // src/controls/control.js
  var registry = /* @__PURE__ */ new Map();
  var getControl = (id) => registry.get(id);
  var Control = class {
    constructor(parent, id, opts, kind) {
      ensureDefaults();
      this.id = id || null;
      this.opts = opts;
      this.kind = kind;
      this.el = h("div", `a2 a2-ctl a2-${kind}`);
      if (id) {
        this.el.dataset.a2Id = id;
        registry.set(id, this);
      }
      this.blocked = false;
      const host = resolveParent(parent);
      if (host) host.appendChild(this.el);
      if (opts && opts.tooltip) tooltip(this.el, opts.tooltip);
      this._unsub = onContextChange(() => {
        if (!this.disposed) requestAnimationFrame(() => this.updateVisual(true));
      });
    }
    /** 테마의 줄 높이 */
    get rowHeight() {
      return this.opts.height ?? ctx.theme.controlHeightFor(ctx.theme.fontSizeBody);
    }
    /** 바깥 테두리(마우스를 올리면 보임) */
    addHoverOutline(target2 = this.el) {
      this.outline = h("div", "a2-hover-outline", null);
      target2.prepend(this.outline);
      return this.outline;
    }
    /** 왼쪽 위 작은 점: 기본값과 다를 때 보인다 */
    addChangedDot(target2 = this.el, cls = "") {
      const dot = h("span", `a2-dot ${cls}`, target2);
      (this.dots || (this.dots = [])).push(dot);
      return dot;
    }
    paintChangedDot(noAnimate) {
      if (!this.dots) return;
      const has = this.opts.defaultValue !== void 0 && this.opts.defaultValue !== null;
      const on = has && !this.equals(this.value, this.opts.defaultValue);
      for (const d of this.dots) {
        d.classList.toggle("a2-no-anim", !!noAnimate);
        d.classList.toggle("a2-on", on);
      }
    }
    /** 가운데 버튼 클릭 → 기본값 */
    enableMiddleReset(target2 = this.el, checkDiff = true) {
      target2.addEventListener("mousedown", (e) => {
        if (e.button === 1) e.preventDefault();
      });
      target2.addEventListener("auxclick", (e) => {
        if (e.button !== 1 || this.blocked || !ctx.config.middleClickToDefault) return;
        const d = this.opts.defaultValue;
        if (d === void 0 || d === null) return;
        if (checkDiff && this.equals(this.value, d)) return;
        e.preventDefault();
        this.reset(true);
        this.afterReset && this.afterReset();
      });
    }
    equals(a, b) {
      return a === b;
    }
    /** 값을 바꾼다. notify 가 false 면 onChanged 를 부르지 않는다. */
    set(v, notify2 = true) {
      if (this.equals(v, this.value)) return;
      this.value = v;
      this.updateVisual(false);
      if (notify2 && this.opts.onChanged) this.opts.onChanged(v, this);
    }
    /** 기본값으로 */
    reset(notify2 = true) {
      const d = this.opts.defaultValue;
      if (d !== void 0 && d !== null) this.set(d, notify2);
    }
    setDefaultValue(v, noAnimate) {
      this.opts.defaultValue = v;
      this.paintChangedDot(noAnimate);
    }
    updateVisual() {
    }
    /** 막으면 흐려지고 누를 수 없다 */
    setBlocked(blocked) {
      this.blocked = !!blocked;
      this.el.classList.toggle("a2-blocked", this.blocked);
      this.el.inert = this.blocked;
    }
    dispose() {
      if (this.id && registry.get(this.id) === this) registry.delete(this.id);
      this.disposed = true;
      this._unsub && this._unsub();
      this.el.remove();
    }
  };

  // src/controls/button.js
  var ButtonOptions = { text: "", icon: null, iconPadding: 5, height: null, onClick: null, tooltip: null };
  var Button = class extends Control {
    constructor(parent, id, opts) {
      super(parent, id, resolveOptions(ButtonOptions, opts), "button");
      const o = this.opts, el = this.el;
      el.setAttribute("role", "button");
      el.tabIndex = 0;
      if (o.height != null) el.style.setProperty("--a2-h", o.height);
      this.addHoverOutline();
      if (o.icon) {
        el.classList.add("a2-icon-button");
        el.style.setProperty("--a2-icon-pad", o.iconPadding);
        this.iconEl = userIcon(o.icon, "a2-btn-icon", el);
      } else {
        this.label = h("span", "a2-btn-text", el, o.text);
      }
      this._bg = () => themeVar(el, "object-button");
      this.normalColor = null;
      let hover = false, down2 = false;
      const paint = (color, dur, clear) => {
        this._t && this._t.kill();
        this._t = tweenColor(() => el.style.backgroundColor || this.normal(), (c) => {
          el.style.backgroundColor = c;
        }, color, dur, "OutSine", clear ? () => {
          el.style.backgroundColor = "";
        } : null);
      };
      this._paint = paint;
      el.addEventListener("pointerenter", () => {
        hover = true;
        if (!down2) paint(themeVar(el, "button-hover"), 0.12);
      });
      el.addEventListener("pointerleave", () => {
        hover = false;
        down2 = false;
        paint(this.normal(), 0.12, true);
      });
      el.addEventListener("pointerdown", (e) => {
        if (e.button === 0) {
          down2 = true;
          paint(themeVar(el, "button-pressed"), 0.08);
        }
      });
      el.addEventListener("pointerup", () => {
        if (!down2) return;
        down2 = false;
        paint(hover ? themeVar(el, "button-hover") : this.normal(), 0.12, !hover);
      });
      el.addEventListener("click", () => {
        if (!this.blocked && o.onClick) o.onClick(this);
      });
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.click(true);
        }
      });
    }
    normal() {
      return this.normalColor || this._bg();
    }
    get text() {
      return this.label ? this.label.textContent : "";
    }
    set text(t) {
      if (this.label) this.label.textContent = t;
    }
    /** 코드로 누른다 */
    click(notify2 = true) {
      if (notify2 && this.opts.onClick) this.opts.onClick(this);
      this._paint(themeVar(this.el, "button-pressed"), 0.06);
      setTimeout(() => this._paint(this.el.matches(":hover") ? themeVar(this.el, "button-hover") : this.normal(), 0.12, !this.el.matches(":hover")), 60);
    }
    /** 테마가 바뀌었을 때 원래 색으로 */
    updateVisual(noAnimate) {
      if (noAnimate) {
        this._t && this._t.kill();
        this.el.style.backgroundColor = "";
        return;
      }
      this._paint(this.normal(), 0.2, true);
    }
  };

  // src/controls/toggle.js
  var ToggleOptions = { value: false, defaultValue: null, text: "", onChanged: null, tooltip: null };
  var Toggle = class extends Control {
    constructor(parent, id, opts) {
      super(parent, id, resolveOptions(ToggleOptions, opts), "toggle");
      const o = this.opts, el = this.el;
      this.value = !!o.value;
      el.setAttribute("role", "switch");
      el.tabIndex = 0;
      this.addHoverOutline();
      this.addChangedDot();
      this.label = h("span", "a2-label", el, o.text);
      this.knob = h("span", "a2-knob", el);
      this.onIcon = icon("on", "a2-knob-on", this.knob);
      this.offIcon = icon("off", "a2-knob-off", this.knob);
      el.addEventListener("click", () => {
        if (!this.blocked) this.toggle(true);
      });
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.toggle(true);
        }
      });
      this.enableMiddleReset();
      this.updateVisual(true);
    }
    toggle(notify2 = true) {
      this.set(!this.value, notify2);
    }
    updateVisual(noAnimate) {
      const on = this.value;
      this.el.setAttribute("aria-checked", on);
      this.el.classList.toggle("a2-on", on);
      this.paintChangedDot(noAnimate);
      if (noAnimate) return;
      this._pop && this._pop.kill();
      this._pop = tweenNumber(
        30,
        26,
        0.3,
        "OutQuad",
        (v) => this.knob.style.setProperty("--a2-knob", v),
        () => this.knob.style.removeProperty("--a2-knob")
      );
    }
  };

  // src/controls/slider.js
  var SliderOptions = {
    min: 0,
    max: 100,
    value: 0,
    defaultValue: null,
    /** 소수 자리 수(숫자) 또는 v => 문자열 */
    format: 2,
    label: "",
    clampDrag: true,
    clampInput: true,
    inputMin: null,
    inputMax: null,
    dragFilter: null,
    inputFilter: null,
    /** 비선형 눈금: { normalize(min, v, max) → 0~1, denormalize(min, t, max) → v } */
    scale: null,
    onChanged: null,
    onComplete: null,
    showFill: true,
    /** 1px 끌 때 바뀌는 값. 없으면 컨트롤 폭 = 전체 범위 */
    dragStep: null,
    tooltip: null
  };
  var clamp = (v, a, b) => Math.min(Math.max(v, a), b);
  var STATE = { normal: "ok", under: "warn", over: "warn", error: "err" };
  var Slider = class extends Control {
    constructor(parent, id, opts) {
      super(parent, id, resolveOptions(SliderOptions, opts), "slider");
      const o = this.opts, el = this.el;
      this.value = clamp(+o.value, Math.min(o.min, o.max), Math.max(o.min, o.max));
      el.setAttribute("role", "slider");
      this.addHoverOutline();
      this.addChangedDot();
      this.fill = h("div", "a2-fill", el);
      if (!o.showFill) this.fill.style.display = "none";
      this.addChangedDot(this.fill, "a2-dot-in-fill");
      this.label = h("span", "a2-label", el, o.label);
      this.preview = h("span", "a2-preview", el);
      this.input = h("input", "a2-value", el);
      this.input.type = "text";
      this.input.spellcheck = false;
      this.input.setAttribute("aria-label", o.label || "value");
      this.input.tabIndex = -1;
      el.tabIndex = 0;
      this._frac = this.normalize();
      this.paintFill(this._frac);
      this.input.value = this.fmt(this.value);
      this.paintChangedDot(true);
      this.wireDrag();
      this.wireInput();
      this.enableMiddleReset(el, false);
      el.addEventListener("keydown", (e) => {
        if (e.target !== el) return;
        const step = o.dragStep || (o.max - o.min) / 100;
        if (e.key === "ArrowRight" || e.key === "ArrowUp") {
          e.preventDefault();
          this.set(this.limit(this.value + step), true);
        } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
          e.preventDefault();
          this.set(this.limit(this.value - step), true);
        } else if (e.key === "Enter") {
          e.preventDefault();
          this.beginEdit();
        }
      });
    }
    afterReset() {
      this.opts.onComplete && this.opts.onComplete(this.value, this);
    }
    fmt(v) {
      const f = this.opts.format;
      return typeof f === "function" ? f(v) : (+v).toFixed(f);
    }
    limit(v) {
      const o = this.opts;
      return o.clampDrag ? clamp(v, Math.min(o.min, o.max), Math.max(o.min, o.max)) : v;
    }
    normalize(v = this.value) {
      const o = this.opts;
      if (o.scale) return o.scale.normalize(o.min, v, o.max);
      return o.max === o.min ? 0 : (v - o.min) / (o.max - o.min);
    }
    denormalize(t) {
      const o = this.opts;
      return o.scale ? o.scale.denormalize(o.min, t, o.max) : o.min + t * (o.max - o.min);
    }
    setNormalized(t, notify2 = true) {
      this.set(this.denormalize(t), notify2);
    }
    paintFill(frac) {
      this.fill.style.width = `${clamp(frac, 0, 1) * 100}%`;
    }
    animateFill(to, dur) {
      this._ft && this._ft.kill();
      this._ft = tweenNumber(this._frac, to, dur, "OutExpo", (v) => {
        this._frac = v;
        this.paintFill(v);
      });
    }
    set(v, notify2 = true) {
      v = +v;
      if (Number.isNaN(v) || v === this.value) return;
      this.value = v;
      this.updateVisual(false);
      if (notify2 && this.opts.onChanged) this.opts.onChanged(v, this);
    }
    setDefaultValue(v, noAnimate) {
      const o = this.opts;
      if (v != null) {
        if (o.dragFilter) v = o.dragFilter(v);
        v = this.limit(v);
      }
      super.setDefaultValue(v, noAnimate);
    }
    updateVisual(noAnimate) {
      this.el.setAttribute("aria-valuenow", this.value);
      if (document.activeElement !== this.input) this.input.value = this.fmt(this.value);
      const t = this.normalize();
      if (noAnimate) {
        this._ft && this._ft.kill();
        this._frac = t;
        this.paintFill(t);
      } else this.animateFill(t, this._dragging ? 0.12 : 0.6);
      this.paintChangedDot(noAnimate);
    }
    // ── 끌기: 포인터 잠금으로 화면 끝에 막히지 않게 한다
    wireDrag() {
      const el = this.el, o = this.opts;
      let start = null, lastX = 0, cached = 0;
      el.addEventListener("pointerdown", (e) => {
        if (e.button !== 0 || this.blocked) return;
        if (document.activeElement === this.input && e.target === this.input) return;
        start = { x: e.clientX, y: e.clientY };
        lastX = e.clientX;
        cached = this.value;
        try {
          el.setPointerCapture(e.pointerId);
        } catch (_) {
        }
      });
      el.addEventListener("pointermove", (e) => {
        if (!start) return;
        if (!this._dragging) {
          if (Math.abs(e.clientX - start.x) < 3) return;
          this._dragging = true;
          el.classList.add("a2-dragging");
          if (document.activeElement === this.input) this.input.blur();
          if (e.pointerType === "mouse" && el.requestPointerLock) {
            try {
              const p = el.requestPointerLock();
              p && p.catch && p.catch(() => {
              });
            } catch (_) {
            }
          }
        }
        const locked = document.pointerLockElement === el;
        const dx = locked ? e.movementX : e.clientX - lastX;
        lastX = e.clientX;
        if (!dx) return;
        const w = this.input.getBoundingClientRect().width || el.getBoundingClientRect().width || 1;
        const sens = ctx.config.sliderSensitivity;
        if (o.dragStep) cached += dx * o.dragStep * sens;
        else if (o.scale) cached = this.denormalize(this.normalize(cached) + dx / w * sens);
        else cached += dx * (o.max - o.min) * sens / w;
        cached = this.limit(cached);
        this.set(o.dragFilter ? o.dragFilter(cached) : cached, true);
      });
      const end = (e) => {
        if (!start) return;
        const dragged = this._dragging;
        start = null;
        this._dragging = false;
        el.classList.remove("a2-dragging");
        if (document.pointerLockElement === el) document.exitPointerLock();
        if (dragged) {
          o.onComplete && o.onComplete(this.value, this);
          return;
        }
        if (e.type === "pointerup") this.beginEdit();
      };
      el.addEventListener("pointerup", end);
      el.addEventListener("pointercancel", end);
    }
    // ── 입력: 계산식 + 미리보기
    beginEdit() {
      if (this.blocked) return;
      this.input.tabIndex = 0;
      this.input.focus();
      this.input.value = String(this.value);
      this.input.select();
    }
    ranges() {
      const o = this.opts;
      const iLo = o.inputMin ?? o.min, iHi = o.inputMax ?? o.max;
      let lo = Math.max(Math.min(o.min, o.max), iLo), hi = Math.min(Math.max(o.min, o.max), iHi);
      if (lo > hi) {
        lo = iLo;
        hi = iHi;
      }
      return { iLo, iHi, lo, hi };
    }
    wireInput() {
      const inp = this.input, o = this.opts;
      inp.addEventListener("focus", () => {
        this.el.classList.add("a2-editing");
        this.onType();
      });
      inp.addEventListener("input", () => this.onType());
      inp.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          inp.blur();
        } else if (e.key === "Escape") {
          e.preventDefault();
          this._cancel = true;
          inp.blur();
        }
        e.stopPropagation();
      });
      inp.addEventListener("blur", () => {
        const cancel = this._cancel;
        this._cancel = false;
        this.el.classList.remove("a2-editing");
        inp.tabIndex = -1;
        const r = cancel ? { ok: false } : evaluate(inp.value, { x: this.value });
        if (r.ok) {
          let v = r.value;
          if (o.clampInput) {
            const { iLo, iHi } = this.ranges();
            v = clamp(v, iLo, iHi);
          }
          if (o.inputFilter) v = o.inputFilter(v);
          this.set(v, true);
          o.onComplete && o.onComplete(this.value, this);
        }
        inp.value = this.fmt(this.value);
        this.endStateVisuals();
      });
    }
    onType() {
      const text = this.input.value, o = this.opts;
      const r = evaluate(text, { x: this.value });
      if (!r.ok) {
        this.setStateVisuals("error", null);
        this.preview.textContent = "";
        return;
      }
      let shown = r.value, state = "normal";
      if (o.clampInput) {
        const { lo, hi } = this.ranges();
        if (r.value < lo) {
          shown = lo;
          state = "under";
        } else if (r.value > hi) {
          shown = hi;
          state = "over";
        }
      }
      const plain = /^\s*[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?\s*$/i.test(text) && Math.abs(parseFloat(text) - shown) < 1e-7;
      this.preview.textContent = "";
      if (!(plain && state === "normal")) {
        const sym = state === "normal" ? "=" : state === "over" ? "<" : ">";
        this.preview.append(`${this.fmt(shown)} ${sym} `);
        h("span", "a2-ghost", this.preview, text);
      }
      this.setStateVisuals(state, shown);
    }
    setStateVisuals(state, value) {
      const color = themeVar(this.el, `math-${STATE[state]}`);
      this.el.style.setProperty("--a2-state", color);
      const c = parseColor(color);
      this.fill.style.backgroundColor = value == null ? "transparent" : cssColor([c[0], c[1], c[2], 0.3]);
      this.el.classList.add("a2-stated");
      if (value != null) this.animateFill(this.normalize(value), 0.4);
    }
    endStateVisuals() {
      this.preview.textContent = "";
      this.el.classList.remove("a2-stated");
      this.el.style.removeProperty("--a2-state");
      this.fill.style.backgroundColor = "";
      this.animateFill(this.normalize(), 0.4);
    }
  };

  // src/controls/input.js
  var InputOptions = {
    value: "",
    defaultValue: null,
    placeholder: "",
    icon: null,
    multiline: false,
    monospace: false,
    onChanged: null,
    onEndEdit: null,
    tooltip: null
  };
  var Input = class extends Control {
    constructor(parent, id, opts) {
      super(parent, id, resolveOptions(InputOptions, opts), "input");
      const o = this.opts, el = this.el;
      this.value = o.value ?? "";
      if (o.multiline) el.classList.add("a2-multiline");
      if (o.monospace) el.classList.add("a2-mono");
      this.addHoverOutline();
      this.addChangedDot();
      this.field = h(o.multiline ? "textarea" : "input", "a2-field", el);
      if (!o.multiline) this.field.type = "text";
      this.field.placeholder = o.placeholder;
      this.field.value = this.value;
      this.field.spellcheck = false;
      if (o.icon) this.iconEl = userIcon(o.icon, "a2-input-icon", el);
      else el.classList.add("a2-no-icon");
      el.addEventListener("pointerup", (e) => {
        if (e.button === 0 && e.target !== this.field) this.field.focus();
      });
      this.field.addEventListener("focus", () => el.classList.add("a2-focus"));
      this.field.addEventListener("blur", () => {
        el.classList.remove("a2-focus");
        o.onEndEdit && o.onEndEdit(this.value, this);
      });
      this.field.addEventListener("input", () => {
        this.value = this.field.value;
        this.paintChangedDot(false);
        o.onChanged && o.onChanged(this.value, this);
      });
      this.enableMiddleReset();
      this.paintChangedDot(true);
    }
    afterReset() {
      this.opts.onEndEdit && this.opts.onEndEdit(this.value, this);
    }
    updateVisual(noAnimate) {
      if (this.field.value !== this.value) this.field.value = this.value;
      this.paintChangedDot(noAnimate);
    }
    focus() {
      this.field.focus();
    }
  };

  // src/controls/segmented.js
  var SegmentedOptions = {
    values: [],
    value: void 0,
    defaultValue: null,
    display: (v) => String(v),
    height: null,
    fontSize: null,
    normalColor: null,
    activeColor: null,
    borderColor: null,
    onChanged: null,
    tooltip: null
  };
  var Segmented = class extends Control {
    constructor(parent, id, opts) {
      super(parent, id, resolveOptions(SegmentedOptions, opts), "segmented");
      const o = this.opts, el = this.el;
      el.setAttribute("role", "radiogroup");
      if (o.height != null) el.style.setProperty("--a2-h", o.height);
      if (o.fontSize != null) el.style.setProperty("--a2-fs", o.fontSize);
      this.mask = h("div", "a2-seg-mask", el);
      this.border = h("div", "a2-seg-border", el);
      this.addChangedDot();
      this.value = o.value !== void 0 ? o.value : o.values[0];
      this.build();
      this.enableMiddleReset(el, false);
    }
    set fontSize(v) {
      this.el.style.setProperty("--a2-fs", v);
    }
    color(name) {
      const o = this.opts;
      if (name === "normal") return o.normalColor || themeVar(this.el, "object-button");
      if (name === "active") return o.activeColor || themeVar(this.el, "object-active");
      return themeVar(this.el, name);
    }
    build() {
      this.mask.textContent = "";
      this.segs = this.opts.values.map((v) => {
        const s = h("button", "a2-seg", this.mask, this.opts.display(v));
        s.type = "button";
        s.setAttribute("role", "radio");
        s._v = v;
        let hover = false, down2 = false;
        const target2 = () => {
          const sel = this.equals(v, this.value);
          if (down2) return sel ? this.color("object-active-bright") : this.color("button-hover");
          if (sel) return hover ? this.color("object-active-bright") : this.color("active");
          return hover ? this.color("button-hover") : this.color("normal");
        };
        s._paint = (dur, noAnimate) => {
          s._t && s._t.kill();
          if (noAnimate) {
            s.style.backgroundColor = target2();
            return;
          }
          s._t = tweenColor(() => s.style.backgroundColor || this.color("normal"), (c) => {
            s.style.backgroundColor = c;
          }, target2(), dur);
        };
        s.addEventListener("pointerenter", () => {
          hover = true;
          s._paint(0.12);
        });
        s.addEventListener("pointerleave", () => {
          hover = false;
          down2 = false;
          s._paint(0.12);
        });
        s.addEventListener("pointerdown", (e) => {
          if (e.button === 0) {
            down2 = true;
            s._paint(0.08);
          }
        });
        s.addEventListener("pointerup", () => {
          if (down2) {
            down2 = false;
            s._paint(0.12);
          }
        });
        s.addEventListener("click", () => {
          if (!this.blocked) this.set(v, true);
        });
        return s;
      });
      this.updateVisual(true);
    }
    /** 목록을 바꾼다. 지금 값이 없으면 첫 값으로 */
    setValues(values, notify2 = false) {
      this.opts.values = values;
      if (!values.some((v) => this.equals(v, this.value))) {
        const nv = values[0];
        this.value = nv;
        if (notify2 && this.opts.onChanged) this.opts.onChanged(nv, this);
      }
      this.build();
    }
    updateVisual(noAnimate) {
      for (const s of this.segs || []) {
        const sel = this.equals(s._v, this.value);
        s.classList.toggle("a2-selected", sel);
        s.setAttribute("aria-checked", sel);
        s._paint(0.15, noAnimate);
      }
      this.paintChangedDot(true);
    }
  };

  // src/controls/dropdown.js
  var DropdownOptions = {
    values: [],
    value: void 0,
    defaultValue: null,
    display: (v) => String(v),
    onChanged: null,
    tooltip: null
  };
  var GAP = 12;
  var Dropdown = class extends Control {
    constructor(parent, id, opts, kind = "dropdown") {
      super(parent, id, resolveOptions(DropdownOptions, opts), kind);
      const o = this.opts, el = this.el;
      el.classList.add("a2-dd");
      this.expanded = false;
      this.header = h("div", "a2-dd-header", el);
      this.header.tabIndex = 0;
      this.header.setAttribute("role", "combobox");
      this.header.setAttribute("aria-expanded", "false");
      this.addHoverOutline(this.header);
      this.addChangedDot(this.header);
      this.label = h("span", "a2-label a2-dd-label", this.header);
      this.tri = icon("triangle", "a2-dd-tri", this.header);
      this.list = h("div", "a2-dd-list", el);
      this.list.setAttribute("role", "listbox");
      this.initValue();
      this.build();
      this.header.addEventListener("click", () => {
        if (!this.blocked) this.toggleExpanded();
      });
      this.header.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.toggleExpanded();
        } else if (e.key === "Escape") this.setExpanded(false);
      });
      this.enableMiddleReset(this.header);
      this.paintOpen(0, true);
    }
    initValue() {
      const o = this.opts;
      this.value = o.value !== void 0 ? o.value : o.values[0];
    }
    summary() {
      return this.opts.display(this.value);
    }
    build() {
      this.list.textContent = "";
      this.rows = this.opts.values.map((v) => {
        const r = h("div", "a2-dd-row", this.list);
        r.setAttribute("role", "option");
        r.tabIndex = -1;
        r._v = v;
        h("span", "a2-dd-row-text", r, this.opts.display(v));
        this.decorateRow(r, v);
        r.addEventListener("click", () => this.pick(v));
        return r;
      });
      this.updateVisual(true);
    }
    decorateRow() {
    }
    pick(v) {
      this.set(v, true);
      this.setExpanded(false);
    }
    setValues(values, notify2 = false) {
      this.opts.values = values;
      if (!values.some((v) => this.equals(v, this.value))) {
        this.value = values[0];
        if (notify2 && this.opts.onChanged) this.opts.onChanged(this.value, this);
      }
      this.build();
      if (this.expanded) this.paintOpen(1, true);
    }
    toggleExpanded() {
      this.setExpanded(!this.expanded);
    }
    setExpanded(open) {
      if (open === this.expanded) return;
      this.expanded = open;
      this.el.classList.toggle("a2-open", open);
      this.header.setAttribute("aria-expanded", open);
      this._ht && this._ht.kill();
      this._at && this._at.kill();
      this._rt && this._rt.kill();
      const from = this.el.getBoundingClientRect().height;
      const to = this.openHeight(open);
      this._ht = tweenNumber(
        from,
        to,
        0.14,
        "OutBack",
        (v) => {
          this.el.style.height = `${Math.max(v, this.closedHeight())}px`;
        },
        () => {
          if (!this.expanded) this.el.style.height = "";
        }
      );
      this._at = tweenNumber(+getComputedStyle(this.list).opacity, open ? 1 : 0, 0.16, "OutSine", (v) => {
        this.list.style.opacity = v;
      });
      this._rt = tween({ r: this._rot || 0 }, { r: open ? 180 : 0 }, 0.4, "OutBack", (v) => {
        this._rot = v.r;
        this.tri.style.transform = `rotate(${v.r}deg)`;
      });
      if (open) {
        this._outside = (e) => {
          if (!this.el.contains(e.target)) this.setExpanded(false);
        };
        setTimeout(() => document.addEventListener("pointerdown", this._outside), 0);
      } else if (this._outside) document.removeEventListener("pointerdown", this._outside);
    }
    closedHeight() {
      return this.header.getBoundingClientRect().height;
    }
    openHeight(open) {
      const H = this.closedHeight();
      return open ? H + px(this.el, GAP) + this.list.scrollHeight : H;
    }
    paintOpen(p, noAnimate) {
      if (!noAnimate) return;
      this.list.style.opacity = p;
      this._rot = p ? 180 : 0;
      this.tri.style.transform = `rotate(${this._rot}deg)`;
      if (p) this.el.style.height = `${this.openHeight(true)}px`;
    }
    setBlocked(b) {
      super.setBlocked(b);
      if (b) this.setExpanded(false);
    }
    updateVisual(noAnimate) {
      this.label.textContent = this.summary();
      this.label.title = this.label.textContent;
      for (const r of this.rows || []) {
        const sel = this.isSelected(r._v);
        r.classList.toggle("a2-selected", sel);
        r.setAttribute("aria-selected", sel);
      }
      this.paintChangedDot(noAnimate);
    }
    isSelected(v) {
      return this.equals(v, this.value);
    }
  };
  var MultiDropdownOptions = { ...DropdownOptions, value: [], summary: null };
  var MultiDropdown = class extends Dropdown {
    constructor(parent, id, opts) {
      super(parent, id, resolveOptions(MultiDropdownOptions, opts), "multidropdown");
      this.el.classList.add("a2-dd");
    }
    initValue() {
      this.value = [...this.opts.value || []];
    }
    equals(a, b) {
      if (!Array.isArray(a) || !Array.isArray(b)) return a === b;
      return a.length === b.length && a.every((x) => b.includes(x));
    }
    summary() {
      const o = this.opts;
      if (o.summary) return o.summary(this.value);
      return this.value.length ? o.values.filter((v) => this.value.includes(v)).map(o.display).join(", ") : "없음";
    }
    decorateRow(r) {
      r.classList.add("a2-dd-check-row");
      icon("on", "a2-check-on", r);
      icon("off", "a2-check-off", r);
      r.prepend(h("div", "a2-hover-outline"));
    }
    isSelected(v) {
      return this.value.includes(v);
    }
    pick(v) {
      this.toggle(v);
    }
    /** 한 값을 넣었다 뺐다 한다 */
    toggle(v, notify2 = true) {
      const next = this.value.includes(v) ? this.value.filter((x) => x !== v) : this.opts.values.filter((x) => x === v || this.value.includes(x));
      this.set(next, notify2);
    }
    has(v) {
      return this.value.includes(v);
    }
    set(v, notify2 = true) {
      if (this.equals(v, this.value)) return;
      this.value = [...v];
      this.updateVisual(false);
      if (notify2 && this.opts.onChanged) this.opts.onChanged([...this.value], this);
    }
  };

  // src/controls/colorpicker.js
  var ColorPickerOptions = {
    value: "#FFFFFF",
    defaultValue: null,
    label: "",
    onChanged: null,
    onComplete: null,
    tooltip: null
  };
  var clamp01 = (v) => Math.min(1, Math.max(0, v));
  var hex2 = (v) => Math.round(clamp01(v) * 255).toString(16).padStart(2, "0").toUpperCase();
  function toHex({ r, g, b, a }) {
    return `#${hex2(r)}${hex2(g)}${hex2(b)}${a < 1 ? hex2(a) : ""}`;
  }
  function fromAny(c) {
    const [r, g, b, a] = parseColor(c);
    return { r: r / 255, g: g / 255, b: b / 255, a: a ?? 1 };
  }
  function rgb2hsv({ r, g, b }) {
    const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
    let hh = 0;
    if (d) hh = max === r ? (g - b) / d % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    return { h: (hh / 6 + 1) % 1, s: max ? d / max : 0, v: max };
  }
  function hsv2rgb(hh, s, v) {
    const f = (n) => {
      const k = (n + hh * 6) % 6;
      return v - v * s * Math.max(0, Math.min(k, 4 - k, 1));
    };
    return { r: f(5), g: f(3), b: f(1) };
  }
  var lum = (c) => {
    const t = (x) => x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
    return 0.2126 * t(c.r) + 0.7152 * t(c.g) + 0.0722 * t(c.b);
  };
  var ColorPicker = class extends Control {
    constructor(parent, id, opts) {
      super(parent, id, resolveOptions(ColorPickerOptions, opts), "colorpicker");
      const o = this.opts, el = this.el;
      this.rgba = fromAny(o.value);
      this.hsv = rgb2hsv(this.rgba);
      this.useHsv = false;
      el.tabIndex = 0;
      el.setAttribute("role", "button");
      this.addHoverOutline();
      this.addChangedDot();
      this.label = h("span", "a2-label", el, o.label);
      this.swatch = h("span", "a2-swatch", el);
      this.swatchFill = h("span", "a2-swatch-fill", this.swatch);
      this.swatchText = h("span", "a2-swatch-text", this.swatch);
      el.addEventListener("click", (e) => {
        if (!this.blocked && !this.popup?.contains(e.target)) this.open();
      });
      el.addEventListener("keydown", (e) => {
        if (e.target === el && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          this.open();
        }
      });
      this.enableMiddleReset();
      this.updateVisual(true);
    }
    get value() {
      return toHex(this.rgba);
    }
    set value(v) {
      this.set(v, false);
    }
    equals(a, b) {
      return a && b && toHex(fromAny(a)) === toHex(fromAny(b));
    }
    afterReset() {
      this.opts.onComplete && this.opts.onComplete(this.value, this);
    }
    set(v, notify2 = true) {
      const c = typeof v === "string" ? fromAny(v) : { r: clamp01(v.r), g: clamp01(v.g), b: clamp01(v.b), a: clamp01(v.a ?? 1) };
      if (toHex(c) === this.value) return;
      this.rgba = c;
      const hsv = rgb2hsv(c);
      if (hsv.s > 0 && hsv.v > 0) this.hsv = hsv;
      else this.hsv = { ...this.hsv, s: hsv.s, v: hsv.v };
      this.updateVisual(false);
      if (notify2 && this.opts.onChanged) this.opts.onChanged(this.value, this);
    }
    setHsv(hh, s, v, notify2 = true) {
      this.hsv = { h: hh, s: clamp01(s), v: clamp01(v) };
      const c = hsv2rgb(this.hsv.h, this.hsv.s, this.hsv.v);
      this.rgba = { ...c, a: this.rgba.a };
      this.updateVisual(false);
      if (notify2 && this.opts.onChanged) this.opts.onChanged(this.value, this);
    }
    updateVisual(noAnimate) {
      const { r, g, b, a } = this.rgba;
      const css = `rgba(${r * 255}, ${g * 255}, ${b * 255}, ${a})`;
      this.swatchFill.style.background = css;
      this.swatchText.textContent = this.value;
      const bg = fromAny(themeVar(this.el, "panel-bg") || "#25242E");
      const mixed = { r: r * a + bg.r * (1 - a), g: g * a + bg.g * (1 - a), b: b * a + bg.b * (1 - a) };
      const L = lum(mixed);
      this.swatchText.style.color = (L + 0.05) / 0.05 > 1.05 / (L + 0.05) ? "#000" : "#fff";
      this.paintChangedDot(noAnimate);
      if (this.popup) this.syncPopup();
    }
    // ── 창
    open() {
      if (this.popup) return;
      this.blocker = h("div", "a2-cp-blocker", document.body);
      this.blocker.addEventListener("pointerdown", (e) => {
        if (e.button === 0) this.close();
      });
      const p = this.popup = h("div", "a2 a2-cp-popup", document.body);
      p.setAttribute("role", "dialog");
      this.canvas = h("canvas", "a2-cp-wheel", p);
      this.canvas.width = this.canvas.height = 256;
      this.ringHandle = h("span", "a2-cp-handle a2-cp-ring-handle", p);
      this.triHandle = h("span", "a2-cp-handle a2-cp-tri-handle", p);
      const tabs = h("div", "a2-cp-tabs", p);
      this.tabRgb = h("button", "a2-cp-tab", tabs, "RGB");
      this.tabHsv = h("button", "a2-cp-tab", tabs, "HSV");
      this.tabRgb.onclick = () => this.setMode(false);
      this.tabHsv.onclick = () => this.setMode(true);
      this.chanBox = h("div", "a2-cp-channels", p);
      this.hexRow = h("div", "a2-ctl a2-input a2-cp-hex a2-no-icon", p);
      h("div", "a2-hover-outline", this.hexRow);
      this.hex = h("input", "a2-field", this.hexRow);
      this.hex.spellcheck = false;
      this.hex.addEventListener("input", () => this.onHexType());
      this.hex.addEventListener("keydown", (e) => {
        if (e.key === "Enter") this.hex.blur();
        if (e.key === "Escape") this.close();
        e.stopPropagation();
      });
      this.hex.addEventListener("blur", () => this.commitHex());
      this.buildChannels();
      this.wireWheel();
      this.drawWheel(true);
      this.syncPopup();
      this.place();
      this._place = () => this.place();
      addEventListener("resize", this._place);
      addEventListener("scroll", this._place, true);
      this._key = (e) => {
        if (e.key === "Escape") this.close();
      };
      addEventListener("keydown", this._key);
      p.style.opacity = "0";
      this._pt && this._pt.kill();
      this._pt = tween({ s: 0.96, o: 0 }, { s: 1, o: 1 }, 0.2, "OutBack", (v) => {
        p.style.transform = `scale(${v.s})`;
        p.style.opacity = Math.min(1, v.o * 1.25);
      });
    }
    close() {
      const p = this.popup;
      if (!p) return;
      removeEventListener("resize", this._place);
      removeEventListener("scroll", this._place, true);
      removeEventListener("keydown", this._key);
      this.blocker.remove();
      this.blocker = null;
      this.popup = null;
      this._pt && this._pt.kill();
      this._pt = tween({ s: 1, o: 1 }, { s: 0.96, o: 0 }, 0.16, "OutSine", (v) => {
        p.style.transform = `scale(${v.s})`;
        p.style.opacity = v.o;
      }, () => p.remove());
      this.opts.onComplete && this.opts.onComplete(this.value, this);
    }
    place() {
      const r = this.el.getBoundingClientRect(), p = this.popup, m = px(this.el, 8);
      const w = p.offsetWidth, ht = p.offsetHeight;
      let x = r.left, y = r.bottom + px(this.el, 6);
      x = Math.min(Math.max(m, x), innerWidth - w - m);
      if (y + ht > innerHeight - m) y = Math.max(m, r.top - ht - px(this.el, 6));
      p.style.left = `${x}px`;
      p.style.top = `${y}px`;
    }
    setMode(useHsv) {
      this.useHsv = useHsv;
      this.buildChannels();
      this.syncPopup();
    }
    buildChannels() {
      this.chanBox.textContent = "";
      const names = this.useHsv ? ["H", "S", "V", "A"] : ["R", "G", "B", "A"];
      const colors = this.useHsv ? [null, "channel-s", "channel-v", "channel-a"] : ["channel-r", "channel-g", "channel-b", "channel-a"];
      const def = this.opts.defaultValue ? fromAny(this.opts.defaultValue) : null;
      const defHsv = def ? rgb2hsv(def) : null;
      this.chans = names.map((n, i) => {
        const key = n.toLowerCase();
        const dv = def ? this.useHsv ? key === "a" ? def.a : defHsv[key] : def[key] : null;
        const s = new Slider(this.chanBox, null, {
          label: n,
          min: 0,
          max: 1,
          format: 3,
          value: this.chan(i),
          defaultValue: dv,
          height: 40,
          onChanged: (v) => this.setChannel(i, v)
        });
        if (colors[i]) s.fill.style.setProperty("--a2-fill", `var(--a2-${colors[i]})`);
        s._ci = i;
        return s;
      });
      this.tabRgb.classList.toggle("a2-on", !this.useHsv);
      this.tabHsv.classList.toggle("a2-on", this.useHsv);
    }
    chan(i) {
      if (i === 3) return this.rgba.a;
      if (this.useHsv) return [this.hsv.h, this.hsv.s, this.hsv.v][i];
      return [this.rgba.r, this.rgba.g, this.rgba.b][i];
    }
    /** 채널 하나를 0~1 로 바꾼다 (모드에 따라 RGB 또는 HSV) */
    setChannel(i, v) {
      v = clamp01(v);
      if (i === 3) return this.set({ ...this.rgba, a: v });
      if (this.useHsv) {
        const hs = { ...this.hsv };
        hs[["h", "s", "v"][i]] = v;
        return this.setHsv(hs.h, hs.s, hs.v);
      }
      const c = { ...this.rgba };
      c[["r", "g", "b"][i]] = v;
      this.set(c);
    }
    syncPopup() {
      if (!this.popup) return;
      for (const s of this.chans) s.set(this.chan(s._ci), false);
      if (this.useHsv) this.chans[0].fill.style.setProperty("--a2-fill", toHex({ ...hsv2rgb(this.hsv.h, 1, 1), a: 1 }));
      if (document.activeElement !== this.hex) {
        this.hex.value = toHex({ ...this.rgba, a: this.rgba.a }).slice(1).padEnd(8, "F");
        this.hexRow.style.removeProperty("--a2-state");
      }
      this.drawWheel();
    }
    onHexType() {
      const t = this.hex.value.trim().replace(/^#/, "");
      let state = "err";
      if (/^[0-9a-f]{6}([0-9a-f]{2})?$/i.test(t)) state = "ok";
      else if (/^[0-9a-f]{0,8}$/i.test(t)) state = "warn";
      this.hexRow.classList.add("a2-stated");
      this.hexRow.style.setProperty("--a2-state", `var(--a2-math-${state})`);
      if (state === "ok") this.swatchFill.style.background = `#${t}`;
    }
    commitHex() {
      const t = this.hex.value.trim().replace(/^#/, "");
      this.hexRow.classList.remove("a2-stated");
      if (/^[0-9a-f]{6}([0-9a-f]{2})?$/i.test(t)) {
        this.set(`#${t}`);
        this.opts.onComplete && this.opts.onComplete(this.value, this);
      }
      this.updateVisual(true);
    }
    // ── 색상환: 바깥 고리 = 색상, 안쪽 삼각형 = 채도·명도
    geom() {
      const a = this.hsv.h * Math.PI * 2, R = 0.32;
      const pt = (ang) => ({ x: 0.5 + R * Math.cos(ang), y: 0.5 - R * Math.sin(ang) });
      return { hue: pt(a), white: pt(a + 2 * Math.PI / 3), black: pt(a - 2 * Math.PI / 3), a };
    }
    drawWheel(force) {
      const c = this.canvas, g = c.getContext("2d"), N = c.width;
      if (force || this._drawnHue !== this.hsv.h) {
        this._drawnHue = this.hsv.h;
        const img = g.createImageData(N, N), d = img.data, G2 = this.geom();
        const pure = hsv2rgb(this.hsv.h, 1, 1);
        const P = [G2.hue, G2.white, G2.black].map((p) => ({ x: p.x * N, y: p.y * N }));
        const det = (P[1].y - P[2].y) * (P[0].x - P[2].x) + (P[2].x - P[1].x) * (P[0].y - P[2].y);
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
          const dx = (x + 0.5) / N - 0.5, dy = (y + 0.5) / N - 0.5, dist = Math.hypot(dx, dy), i = (y * N + x) * 4;
          let rgb = null, alpha = 255;
          if (dist >= 0.37 && dist <= 0.49) {
            const hh = (Math.atan2(-dy, dx) / (2 * Math.PI) + 1) % 1;
            rgb = hsv2rgb(hh, 1, 1);
            const edge = Math.min(dist - 0.37, 0.49 - dist) * N;
            alpha = Math.min(255, edge * 255);
          } else {
            const X = x + 0.5, Y = y + 0.5;
            const w0 = ((P[1].y - P[2].y) * (X - P[2].x) + (P[2].x - P[1].x) * (Y - P[2].y)) / det;
            const w1 = ((P[2].y - P[0].y) * (X - P[2].x) + (P[0].x - P[2].x) * (Y - P[2].y)) / det;
            const w2 = 1 - w0 - w1;
            if (w0 >= -4e-3 && w1 >= -4e-3 && w2 >= -4e-3) rgb = { r: pure.r * w0 + w1, g: pure.g * w0 + w1, b: pure.b * w0 + w1 };
          }
          if (rgb) {
            d[i] = rgb.r * 255;
            d[i + 1] = rgb.g * 255;
            d[i + 2] = rgb.b * 255;
            d[i + 3] = alpha;
          }
        }
        g.putImageData(img, 0, 0);
      }
      const G = this.geom(), { s, v } = this.hsv;
      const wH = s * v, wW = v * (1 - s), wB = 1 - v;
      const tx = G.hue.x * wH + G.white.x * wW + G.black.x * wB, ty = G.hue.y * wH + G.white.y * wW + G.black.y * wB;
      const rx = 0.5 + 0.43 * Math.cos(G.a), ry = 0.5 - 0.43 * Math.sin(G.a);
      const place = (el, x, y) => {
        el.style.left = `calc(var(--a2-wheel-x) + ${x} * var(--a2-wheel))`;
        el.style.top = `calc(var(--a2-wheel-y) + ${y} * var(--a2-wheel))`;
      };
      place(this.ringHandle, rx, ry);
      place(this.triHandle, tx, ty);
      this.triHandle.style.background = toHex({ ...this.rgba, a: 1 });
      this.ringHandle.style.background = toHex({ ...hsv2rgb(this.hsv.h, 1, 1), a: 1 });
    }
    wireWheel() {
      const c = this.canvas;
      let mode = null;
      const pos2 = (e) => {
        const r = c.getBoundingClientRect();
        return { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height };
      };
      const apply = (e) => {
        const p = pos2(e);
        if (mode === "ring") {
          const hh = (Math.atan2(-(p.y - 0.5), p.x - 0.5) / (2 * Math.PI) + 1) % 1;
          this.setHsv(hh, this.hsv.s, this.hsv.v);
        } else {
          const G = this.geom(), P = [G.hue, G.white, G.black];
          const det = (P[1].y - P[2].y) * (P[0].x - P[2].x) + (P[2].x - P[1].x) * (P[0].y - P[2].y);
          let w0 = ((P[1].y - P[2].y) * (p.x - P[2].x) + (P[2].x - P[1].x) * (p.y - P[2].y)) / det;
          let w1 = ((P[2].y - P[0].y) * (p.x - P[2].x) + (P[0].x - P[2].x) * (p.y - P[2].y)) / det;
          let w2 = 1 - w0 - w1;
          w0 = Math.max(0, w0);
          w1 = Math.max(0, w1);
          w2 = Math.max(0, w2);
          const sum = w0 + w1 + w2 || 1;
          w0 /= sum;
          w1 /= sum;
          const V = w0 + w1, S = V > 0 ? w0 / V : 0;
          this.setHsv(this.hsv.h, S, V);
        }
      };
      c.addEventListener("pointerdown", (e) => {
        if (e.button !== 0) return;
        const p = pos2(e), d = Math.hypot(p.x - 0.5, p.y - 0.5);
        if (d > 0.56) return;
        mode = d >= 0.34 ? "ring" : "tri";
        try {
          c.setPointerCapture(e.pointerId);
        } catch (_) {
        }
        apply(e);
      });
      c.addEventListener("pointermove", (e) => {
        if (mode) apply(e);
      });
      const end = () => {
        if (mode) {
          mode = null;
          this.opts.onComplete && this.opts.onComplete(this.value, this);
        }
      };
      c.addEventListener("pointerup", end);
      c.addEventListener("pointercancel", end);
    }
    dispose() {
      this.close();
      super.dispose();
    }
  };

  // src/controls/card.js
  var CardOptions = {
    title: "",
    active: true,
    onActiveChanged: null,
    onDelete: null,
    showDelete: true,
    showActiveToggle: true,
    collapsed: false
  };
  var Card = class {
    constructor(parent, opts) {
      ensureDefaults();
      const o = this.opts = resolveOptions(CardOptions, opts);
      this.el = h("div", "a2 a2-card", resolveParent(parent));
      this.header = h("div", "a2-card-header", this.el);
      this.active = !!o.active;
      this.expanded = !o.collapsed;
      if (o.showActiveToggle) {
        this.check = h("button", "a2-card-check", this.header);
        this.check.type = "button";
        this.check.setAttribute("role", "checkbox");
        icon("on", "a2-knob-on", this.check);
        icon("off", "a2-knob-off", this.check);
        this.check.addEventListener("click", () => this.setActive(!this.active, true));
      }
      this.titleBtn = h("button", "a2-card-title", this.header);
      this.titleBtn.type = "button";
      this.titleText = h("span", "a2-card-title-text", this.titleBtn, o.title);
      this.tri = icon("triangle", "a2-card-tri", this.titleBtn);
      this.titleBtn.setAttribute("aria-expanded", this.expanded);
      this.titleBtn.addEventListener("click", () => this.setExpanded(!this.expanded));
      if (o.showDelete && o.onDelete) {
        this.del = h("button", "a2-card-delete", this.header);
        this.del.type = "button";
        this.del.setAttribute("aria-label", "삭제");
        h("div", "a2-hover-outline", this.del);
        icon("x", "", this.del);
        this.del.addEventListener("click", () => o.onDelete(this));
      }
      this.body = h("div", "a2-card-body", this.el);
      this.content = h("div", "a2-card-content", this.body);
      this._rot = this.expanded ? 180 : 0;
      this.tri.style.transform = `rotate(${this._rot}deg)`;
      this.tri.classList.toggle("a2-on", this.expanded);
      if (!this.expanded) {
        this.body.style.height = "0px";
        this.body.hidden = true;
      }
      this.paintActive(true);
    }
    set title(t) {
      this.titleText.textContent = t;
    }
    /** 켜기/끄기: 꺼지면 내용이 흐려지고 누를 수 없다 */
    setActive(on, notify2 = true) {
      this.active = !!on;
      this.paintActive(false);
      if (notify2 && this.opts.onActiveChanged) this.opts.onActiveChanged(this.active, this);
    }
    paintActive(noAnimate) {
      if (!this.check) {
        this.body.classList.toggle("a2-inactive", !this.active);
        this.body.inert = !this.active;
        return;
      }
      this.check.classList.toggle("a2-on", this.active);
      this.check.setAttribute("aria-checked", this.active);
      this.body.classList.toggle("a2-inactive", !this.active);
      this.body.inert = !this.active;
      if (noAnimate) return;
      this._pop && this._pop.kill();
      this._pop = tweenNumber(30, 26, 0.3, "OutQuad", (v) => this.check.style.setProperty("--a2-knob", v), () => this.check.style.removeProperty("--a2-knob"));
    }
    /** 접기/펼치기 (0.18초 OutCubic) */
    setExpanded(open) {
      if (open === this.expanded) return;
      this.expanded = open;
      this.titleBtn.setAttribute("aria-expanded", open);
      const b = this.body;
      this._ht && this._ht.kill();
      b.hidden = false;
      const from = b.getBoundingClientRect().height;
      b.style.height = "auto";
      const full = b.getBoundingClientRect().height;
      b.style.height = `${from}px`;
      this._ht = tweenNumber(from, open ? full : 0, 0.18, "OutCubic", (v) => {
        b.style.height = `${v}px`;
      }, () => {
        if (this.expanded) b.style.height = "";
        else b.hidden = true;
      });
      this._rt && this._rt.kill();
      this._rt = tween({ r: this._rot }, { r: open ? 180 : 0 }, 0.4, "OutBack", (v) => {
        this._rot = v.r;
        this.tri.style.transform = `rotate(${v.r}deg)`;
      });
      this.tri.classList.toggle("a2-on", open);
    }
    dispose() {
      this.el.remove();
    }
  };
  var ScrollView = class {
    constructor(parent, { spacing = 12, padding = 0, expand = false } = {}) {
      ensureDefaults();
      this.el = h("div", "a2 a2-scroll", resolveParent(parent));
      if (expand) this.el.classList.add("a2-expand");
      this.viewport = h("div", "a2-scroll-viewport", this.el);
      this.content = h("div", "a2-scroll-content", this.viewport);
      this.viewport.style.setProperty("--a2-pad", padding);
      this.content.style.setProperty("--a2-gap", spacing);
      let target2 = 0, anim = 0;
      const step = () => {
        const vp = this.viewport, cur = vp.scrollTop, d = target2 - cur;
        if (Math.abs(d) < 0.5) {
          vp.scrollTop = target2;
          anim = 0;
          return;
        }
        vp.scrollTop = cur + d * 0.22;
        anim = requestAnimationFrame(step);
      };
      this.viewport.addEventListener("wheel", (e) => {
        if (e.ctrlKey) return;
        const vp = this.viewport, max = vp.scrollHeight - vp.clientHeight;
        if (max <= 0) return;
        if (!anim) target2 = vp.scrollTop;
        const next = Math.min(max, Math.max(0, target2 + e.deltaY * (e.deltaMode === 1 ? 32 : 1)));
        if (next === target2 && (next === 0 || next === max)) return;
        e.preventDefault();
        target2 = next;
        if (!anim) anim = requestAnimationFrame(step);
      }, { passive: false });
      let drag = null;
      this.viewport.addEventListener("pointerdown", (e) => {
        if (e.button === 2) {
          drag = { y: e.clientY, top: this.viewport.scrollTop };
          try {
            this.viewport.setPointerCapture(e.pointerId);
          } catch (_) {
          }
        }
      });
      this.viewport.addEventListener("pointermove", (e) => {
        if (drag) {
          this.viewport.scrollTop = drag.top - (e.clientY - drag.y);
          target2 = this.viewport.scrollTop;
          drag.moved = true;
        }
      });
      this.viewport.addEventListener("pointerup", () => {
        drag = null;
      });
      this.viewport.addEventListener("contextmenu", (e) => {
        if (drag && drag.moved) e.preventDefault();
      });
    }
  };

  // src/factory/factory.js
  var Factory = {
    /**
     * 버튼. Factory.button(parent, id, { text, onClick })
     * 또는 짧게 Factory.button(parent, onClick, '글자', 'id')
     */
    button(parent, a, b, c) {
      if (typeof a === "function") return new Button(parent, c || null, { onClick: a, text: b ?? "" });
      return new Button(parent, a, b);
    },
    toggle: (parent, id, opts) => new Toggle(parent, id, opts),
    slider: (parent, id, opts) => new Slider(parent, id, opts),
    input: (parent, id, opts) => new Input(parent, id, opts),
    segmented: (parent, id, opts) => new Segmented(parent, id, opts),
    dropdown: (parent, id, opts) => new Dropdown(parent, id, opts),
    multiDropdown: (parent, id, opts) => new MultiDropdown(parent, id, opts),
    colorPicker: (parent, id, opts) => new ColorPicker(parent, id, opts),
    card: (parent, opts) => new Card(parent, opts),
    scrollView: (parent, opts) => new ScrollView(parent, opts),
    /** 컨트롤 한 줄 높이의 빈 줄 (가로로 나란히 놓기) */
    row(parent, height) {
      ensureDefaults();
      const el = h("div", "a2 a2-row", resolveParent(parent));
      if (height != null) el.style.setProperty("--a2-h", height);
      return el;
    },
    /** 세로로 쌓는 묶음 */
    stack(parent, gap = 8) {
      ensureDefaults();
      const el = h("div", "a2 a2-stack", resolveParent(parent));
      el.style.setProperty("--a2-gap", gap);
      return el;
    },
    /** 글자. { h1: true } 면 제목, { dim: true } 면 흐린 글자 */
    text(parent, text, { h1 = false, dim = false } = {}) {
      ensureDefaults();
      const el = h(h1 ? "h2" : "p", `a2 a2-text${h1 ? " a2-h1" : ""}${dim ? " a2-dim" : ""}`, resolveParent(parent), text);
      return el;
    },
    tooltip
  };

  // src/transition/pageSwitcher.js
  var running2 = [];
  function switchPage(pages, from, to) {
    const get = (k) => pages instanceof Map ? pages.get(k) : pages[k];
    const keys = pages instanceof Map ? [...pages.keys()] : Object.keys(pages).map((k) => Array.isArray(pages) ? +k : k);
    const a = get(from), b = get(to);
    if (from === to || !a || !b) return false;
    for (const t of running2) t.kill();
    running2 = [];
    const off = 1100 * scaleOf(b);
    const put = (el, x, o, interactive) => {
      el.style.transform = `translateX(${x}px)`;
      el.style.opacity = o;
      el.inert = !interactive;
      el.style.pointerEvents = interactive ? "" : "none";
    };
    for (const k of keys) {
      const el = get(k);
      if (el && el !== a && el !== b) {
        put(el, -off, 0, false);
        el.hidden = true;
      }
    }
    a.hidden = false;
    b.hidden = false;
    put(a, 0, 1, false);
    put(b, off, 0, false);
    running2.push(
      tween({ x: 0 }, { x: -off }, 0.45, "OutExpo", (v) => {
        a.style.transform = `translateX(${v.x}px)`;
      }, () => {
        a.hidden = true;
      }),
      tween({ o: 1 }, { o: 0 }, 0.3, "OutSine", (v) => {
        a.style.opacity = v.o;
      }),
      tween({ x: off }, { x: 0 }, 0.45, "OutExpo", (v) => {
        b.style.transform = `translateX(${v.x}px)`;
      }, () => {
        b.style.transform = "";
      }),
      tween({ o: 0 }, { o: 1 }, 0.3, "OutSine", (v) => {
        b.style.opacity = v.o;
      })
    );
    setTimeout(() => {
      b.inert = false;
      b.style.pointerEvents = "";
    }, 100);
    return true;
  }
  var PageSwitcher = { switchPage };

  // src/input/shortcut.js
  var down = /* @__PURE__ */ new Set();
  var ALIAS = { Alt: ["AltLeft", "AltRight"], Ctrl: ["ControlLeft", "ControlRight"], Control: ["ControlLeft", "ControlRight"], Shift: ["ShiftLeft", "ShiftRight"], Meta: ["MetaLeft", "MetaRight"] };
  var isDown = (k) => ALIAS[k] ? ALIAS[k].some((x) => down.has(x)) : down.has(k);
  var matches = (k, code) => ALIAS[k] ? ALIAS[k].includes(code) : k === code;
  var KeyCombo = class _KeyCombo {
    /** new KeyCombo('Backquote', 'Alt') */
    constructor(main, ...modifiers) {
      this.main = main;
      this.modifiers = modifiers;
    }
    get isHeld() {
      return isDown(this.main) && this.modifiers.every(isDown);
    }
    toString() {
      return [...this.modifiers, this.main].join("+");
    }
    /** 'Alt+Backquote' 같은 글자에서 */
    static parse(s) {
      const parts = s.split("+").map((x) => x.trim());
      return new _KeyCombo(parts.pop(), ...parts);
    }
  };
  var shortcuts = /* @__PURE__ */ new Map();
  var ShortcutManager = {
    /** 글자 입력 중엔 단축키를 쉬게 한다. 바꿔 끼울 수 있다 */
    isSuspended: () => {
      const a = document.activeElement;
      return !!a && (a.tagName === "INPUT" || a.tagName === "TEXTAREA" || a.isContentEditable);
    },
    /**
     * @param {string} id 같은 id 로 다시 등록하면 바꿔친다
     * @param {KeyCombo|string} combo
     * @param {number} [holdSeconds] 이만큼 누르고 있으면 onHeld
     */
    register(id, combo, holdSeconds = 0, { onPressed, onHeld, onReleased } = {}) {
      const s = { id, combo: typeof combo === "string" ? KeyCombo.parse(combo) : combo, holdSeconds, onPressed, onHeld, onReleased, pressed: false, held: false, timer: 0 };
      shortcuts.set(id, s);
      return s;
    },
    get: (id) => shortcuts.get(id),
    unregister: (id) => {
      const s = shortcuts.get(id);
      if (s) clearTimeout(s.timer);
      shortcuts.delete(id);
    },
    clear: () => {
      for (const s of shortcuts.values()) clearTimeout(s.timer);
      shortcuts.clear();
    }
  };
  function reset(s) {
    s.pressed = false;
    s.held = false;
    clearTimeout(s.timer);
  }
  addEventListener("keydown", (e) => {
    const first = !down.has(e.code);
    down.add(e.code);
    if (!first) return;
    if (ShortcutManager.isSuspended()) {
      for (const s of shortcuts.values()) reset(s);
      return;
    }
    for (const s of shortcuts.values()) {
      const c = s.combo;
      const involved = matches(c.main, e.code) || c.modifiers.some((m) => matches(m, e.code));
      if (s.pressed || !involved || !c.isHeld) continue;
      s.pressed = true;
      s.held = false;
      e.preventDefault();
      s.onPressed && s.onPressed(s);
      if (s.holdSeconds > 0) s.timer = setTimeout(() => {
        if (s.pressed && c.isHeld && !s.held) {
          s.held = true;
          s.onHeld && s.onHeld(s);
        }
      }, s.holdSeconds * 1e3);
    }
  }, true);
  addEventListener("keyup", (e) => {
    down.delete(e.code);
    for (const s of shortcuts.values()) {
      if (!s.pressed) continue;
      if (matches(s.combo.main, e.code)) {
        s.onReleased && s.onReleased(s);
        reset(s);
      } else if (!s.combo.isHeld) reset(s);
    }
  }, true);
  addEventListener("blur", () => {
    down.clear();
    for (const s of shortcuts.values()) reset(s);
  });

  // src/index.js
  var version = true ? "2.0.0" : "dev";
  var adas2 = {
    version,
    get context() {
      return ctx;
    },
    configure,
    ensureDefaults,
    setTheme,
    setConfig,
    onContextChange,
    Config,
    Theme,
    Ease,
    tween,
    tweenNumber,
    tweenColor,
    evaluate,
    Tooltip,
    tooltip,
    Window: A2Window,
    WindowManager,
    Control,
    getControl,
    Button,
    Toggle,
    Slider,
    Input,
    Segmented,
    Dropdown,
    MultiDropdown,
    ColorPicker,
    Card,
    ScrollView,
    Factory,
    PageSwitcher,
    switchPage,
    KeyCombo,
    ShortcutManager
  };
  var index_default = adas2;
  return __toCommonJS(index_exports);
})();
adas2=adas2.default||adas2;
