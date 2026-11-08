/*! adas2 v3.0.0 | (c) 2026 a2den1 | adas2 License: 사용 자유, 수정·2차 배포 금지 | https://github.com/a2den1/adas2 */
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
    Builder: () => Builder,
    Button: () => Button,
    Checkbox: () => Checkbox,
    ColorPicker: () => ColorPicker,
    Component: () => Component,
    Ease: () => Ease,
    Field: () => Field,
    KeyBind: () => KeyBind,
    MultiSelect: () => MultiSelect,
    Panel: () => Panel,
    Progress: () => Progress,
    Radio: () => Radio,
    ScrollArea: () => ScrollArea,
    Section: () => Section,
    Segmented: () => Segmented,
    Select: () => Select,
    Slider: () => Slider,
    Spinner: () => Spinner,
    Stepper: () => Stepper,
    Switch: () => Switch,
    Tabs: () => Tabs,
    Theme: () => Theme,
    alert: () => alert,
    animate: () => animate,
    confirm: () => confirm,
    default: () => index_default,
    dialog: () => dialog,
    evaluate: () => evaluate,
    get: () => get,
    keys: () => keys,
    menu: () => menu,
    onSettings: () => onSettings,
    openMenu: () => openMenu,
    panel: () => panel,
    setTheme: () => setTheme,
    settings: () => settings,
    setup: () => setup,
    themes: () => themes,
    toast: () => toast,
    tooltip: () => tooltip,
    ui: () => ui,
    version: () => version
  });

  // src/core/theme.js
  var VARS = {
    bg: "bg",
    surface: "surface",
    surfaceHover: "surface-hover",
    surfaceActive: "surface-active",
    raised: "raised",
    accent: "accent",
    accentHover: "accent-hover",
    accentPressed: "accent-pressed",
    accentSoft: "accent-soft",
    onAccent: "on-accent",
    text: "text",
    textMuted: "text-muted",
    textFaint: "text-faint",
    danger: "danger",
    success: "success",
    warning: "warning",
    shadow: "shadow",
    scrim: "scrim",
    tooltip: "tooltip",
    radius: "radius",
    radiusLarge: "radius-lg",
    controlHeight: "ch",
    fontSize: "fs",
    fontSizeSmall: "fs-sm",
    fontSizeTitle: "fs-title",
    font: "font",
    weight: "weight",
    weightStrong: "weight-strong"
  };
  var Theme = class _Theme {
    constructor(values) {
      Object.assign(this, values);
      Object.freeze(this);
    }
    /** 일부 값만 바꾼 새 테마 */
    extend(over = {}) {
      return new _Theme({ ...this, ...over, name: over.name || `${this.name}+` });
    }
    /** 요소에 CSS 변수로 넣는다 */
    apply(el) {
      for (const [k, v] of Object.entries(VARS)) if (this[k] !== void 0) el.style.setProperty(`--a2-${v}`, String(this[k]));
      el.dataset.a2Theme = this.name;
    }
  };
  var font = '"GmarketSans", "Pretendard", system-ui, -apple-system, "Malgun Gothic", sans-serif';
  var sizes = { radius: 14, radiusLarge: 24, controlHeight: 52, fontSize: 24, fontSizeSmall: 20, fontSizeTitle: 32, font, weight: 300, weightStrong: 500 };
  var dark = new Theme({
    name: "dark",
    ...sizes,
    bg: "#1B1917",
    surface: "#272421",
    surfaceHover: "#2F2B28",
    surfaceActive: "#36312D",
    raised: "#2C2825",
    accent: "#FF7A45",
    accentHover: "#FF8B5C",
    accentPressed: "#EB6630",
    accentSoft: "rgba(255, 122, 69, 0.16)",
    onAccent: "#FFFFFF",
    text: "#F3EEE9",
    textMuted: "rgba(243, 238, 233, 0.58)",
    textFaint: "rgba(243, 238, 233, 0.3)",
    danger: "#F25F5C",
    success: "#5CCB8A",
    warning: "#F4B740",
    shadow: "0 18px 50px rgba(0, 0, 0, 0.45)",
    scrim: "rgba(10, 9, 8, 0.55)",
    tooltip: "rgba(14, 13, 12, 0.92)"
  });
  var light = new Theme({
    name: "light",
    ...sizes,
    bg: "#FAF7F3",
    surface: "#EFEAE4",
    surfaceHover: "#E8E2DA",
    surfaceActive: "#E0D9D0",
    raised: "#FFFFFF",
    accent: "#F26A32",
    accentHover: "#FF7A45",
    accentPressed: "#D9581F",
    accentSoft: "rgba(242, 106, 50, 0.13)",
    onAccent: "#FFFFFF",
    text: "#29231F",
    textMuted: "rgba(41, 35, 31, 0.58)",
    textFaint: "rgba(41, 35, 31, 0.3)",
    danger: "#D84542",
    success: "#259B5A",
    warning: "#C98A10",
    shadow: "0 18px 50px rgba(60, 40, 20, 0.16)",
    scrim: "rgba(40, 30, 20, 0.3)",
    tooltip: "rgba(41, 35, 31, 0.94)"
  });
  var ocean = new Theme({
    name: "ocean",
    ...sizes,
    bg: "#14181E",
    surface: "#1F252D",
    surfaceHover: "#262D37",
    surfaceActive: "#2D3540",
    raised: "#232A33",
    accent: "#4C8DFF",
    accentHover: "#649CFF",
    accentPressed: "#3676E6",
    accentSoft: "rgba(76, 141, 255, 0.16)",
    onAccent: "#FFFFFF",
    text: "#EDF1F6",
    textMuted: "rgba(237, 241, 246, 0.58)",
    textFaint: "rgba(237, 241, 246, 0.3)",
    danger: "#F2645F",
    success: "#4FC68A",
    warning: "#F1B643",
    shadow: "0 18px 50px rgba(0, 0, 0, 0.5)",
    scrim: "rgba(5, 8, 12, 0.55)",
    tooltip: "rgba(10, 13, 17, 0.92)"
  });
  var themes = Object.freeze({ dark, light, ocean });

  // src/core/settings.js
  var settings = {
    theme: themes.dark,
    /** 모든 치수에 곱하는 배율 (디자인 단위 × scale = px). 기본 0.6 */
    scale: 0.6,
    /** 애니메이션 속도. 2 = 두 배 빠르게, 0 = 끔 */
    animation: 1,
    tooltips: true,
    root: null,
    ready: false
  };
  var listeners = /* @__PURE__ */ new Set();
  var onSettings = (fn) => {
    listeners.add(fn);
    return () => listeners.delete(fn);
  };
  function apply() {
    const root = settings.root || document.documentElement;
    settings.theme.apply(root);
    root.style.setProperty("--a2-scale", String(settings.scale));
    root.style.setProperty("--a2-speed", String(settings.animation > 0 ? settings.animation : 1e4));
    root.classList.add("a2-root");
    for (const fn of listeners) fn(settings);
  }
  var pickTheme = (t) => t instanceof Theme ? t : themes[t] || settings.theme;
  function setup(o = {}) {
    if (o.theme) settings.theme = pickTheme(o.theme);
    for (const k of ["scale", "animation", "tooltips"]) if (o[k] !== void 0) settings[k] = o[k];
    if (o.root) settings.root = o.root;
    settings.ready = true;
    apply();
  }
  function ensureSetup() {
    if (!settings.ready) setup();
  }
  function setTheme(t) {
    settings.theme = pickTheme(t);
    ensureSetup();
    apply();
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
      const speed = settings.animation;
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
  function animate(from, to, { duration = 0.3, ease = "OutCubic", onUpdate = () => {
  }, onDone } = {}) {
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
    if (p.host instanceof Element) return p.host;
    if (p.body instanceof Element) return p.body;
    if (p.el instanceof Element) return p.el;
    return p;
  }
  function scaleOf(el) {
    const v = parseFloat(getComputedStyle(el || document.documentElement).getPropertyValue("--a2-scale"));
    return Number.isFinite(v) && v > 0 ? v : settings.scale;
  }
  var px = (el, n) => n * scaleOf(el);
  var P = (d) => `<svg viewBox="0 0 24 24" aria-hidden="true">${d}</svg>`;
  var L = (d, w = 2.4) => P(`<path d="${d}" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`);
  var SVG = {
    chevron: L("M6.5 9.5l5.5 5.5 5.5-5.5"),
    check: L("M5.5 12.5l4.2 4.2L18.5 7.8", 2.8),
    x: L("M7 7l10 10M17 7L7 17"),
    reset: L("M5 12a7 7 0 1 0 2.2-5.1M5 4.5v3.4h3.4", 2.2),
    minus: L("M6 12h12", 2.6),
    plus: L("M12 6v12M6 12h12", 2.6),
    info: P('<circle cx="12" cy="12" r="10" fill="currentColor"/><path d="M12 11v6M12 7.6v.1" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>'),
    ok: P('<circle cx="12" cy="12" r="10" fill="currentColor"/><path d="M7.6 12.4l3 3 5.8-6" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'),
    warn: P('<path d="M10.3 3.6a2 2 0 0 1 3.4 0l8 14A2 2 0 0 1 20 20.6H4a2 2 0 0 1-1.7-3l8-14z" fill="currentColor"/><path d="M12 9v4.6M12 16.8v.1" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>'),
    error: P('<circle cx="12" cy="12" r="10" fill="currentColor"/><path d="M8.6 8.6l6.8 6.8M15.4 8.6l-6.8 6.8" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>')
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
    ensureSetup();
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
      if (!settings.tooltips || !text) return;
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
      }, 140 / Math.max(settings.animation, 1e-3));
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
    const get2 = typeof text === "function" ? text : () => text;
    el.addEventListener("pointerenter", (e) => {
      if (e.pointerType !== "touch") Tooltip.show(get2());
    });
    el.addEventListener("pointerleave", () => Tooltip.hide());
    el.addEventListener("pointerdown", () => Tooltip.hide());
    return el;
  }

  // src/core/keys.js
  var MODS = ["Ctrl", "Alt", "Shift", "Meta"];
  var MOD_CODES = { Ctrl: ["ControlLeft", "ControlRight"], Alt: ["AltLeft", "AltRight"], Shift: ["ShiftLeft", "ShiftRight"], Meta: ["MetaLeft", "MetaRight"] };
  var down = /* @__PURE__ */ new Set();
  var isDown = (k) => MOD_CODES[k] ? MOD_CODES[k].some((c) => down.has(c)) : down.has(k);
  var modOf = (code) => MODS.find((m) => MOD_CODES[m].includes(code));
  function parseCombo(s) {
    const parts = String(s || "").split("+").map((x) => x.trim()).filter(Boolean);
    const mods = MODS.filter((m) => parts.includes(m) || m === "Ctrl" && parts.includes("Control"));
    const key = parts.filter((p) => !MODS.includes(p) && p !== "Control").pop() || "";
    return { mods, key };
  }
  var comboToString = ({ mods, key }) => [...MODS.filter((m) => mods.includes(m)), key].filter(Boolean).join("+");
  var NAMES = { Backquote: "`", Minus: "-", Equal: "=", BracketLeft: "[", BracketRight: "]", Backslash: "\\", Semicolon: ";", Quote: "'", Comma: ",", Period: ".", Slash: "/", Space: "Space", Enter: "Enter", Escape: "Esc", Backspace: "⌫", Tab: "Tab", ArrowUp: "↑", ArrowDown: "↓", ArrowLeft: "←", ArrowRight: "→", Delete: "Del" };
  function keyNames(s) {
    const { mods, key } = parseCombo(s);
    const nm = (k) => NAMES[k] || k.replace(/^Key/, "").replace(/^Digit/, "").replace(/^Numpad/, "Num ");
    return [...mods, ...key ? [nm(key)] : []];
  }
  var binds = /* @__PURE__ */ new Set();
  var keys = {
    /** 글자 입력 중에는 쉰다. 바꿔 끼울 수 있다 */
    paused: () => {
      const a = document.activeElement;
      return !!a && (a.tagName === "INPUT" || a.tagName === "TEXTAREA" || a.isContentEditable);
    },
    /**
     * @param {string} combo 'Alt+Backquote'
     * @param {(e: KeyboardEvent) => void} fn 눌렀을 때
     * @param {{ hold?: number, onHold?: Function, onRelease?: Function }} [o] hold 초만큼 누르고 있으면 onHold
     * @returns {{ combo: string, rebind(c: string): void, unbind(): void }}
     */
    bind(combo, fn, o = {}) {
      const b = { c: parseCombo(combo), fn, o, pressed: false, held: false, timer: 0 };
      binds.add(b);
      return {
        get combo() {
          return comboToString(b.c);
        },
        rebind(c) {
          b.c = parseCombo(c);
        },
        unbind() {
          clearTimeout(b.timer);
          binds.delete(b);
        }
      };
    },
    parse: parseCombo,
    names: keyNames
  };
  var held = (c) => c.key && isDown(c.key) && c.mods.every(isDown) && MODS.filter((m) => !c.mods.includes(m)).every((m) => !isDown(m));
  var reset = (b) => {
    b.pressed = false;
    b.held = false;
    clearTimeout(b.timer);
  };
  addEventListener("keydown", (e) => {
    const first = !down.has(e.code);
    down.add(e.code);
    if (!first || modOf(e.code)) return;
    if (keys.paused()) {
      binds.forEach(reset);
      return;
    }
    for (const b of binds) {
      if (b.pressed || b.c.key !== e.code || !held(b.c)) continue;
      b.pressed = true;
      e.preventDefault();
      b.fn && b.fn(e);
      if (b.o.hold > 0) b.timer = setTimeout(() => {
        if (b.pressed && held(b.c)) {
          b.held = true;
          b.o.onHold && b.o.onHold();
        }
      }, b.o.hold * 1e3);
    }
  }, true);
  addEventListener("keyup", (e) => {
    down.delete(e.code);
    for (const b of binds) if (b.pressed && (b.c.key === e.code || !held(b.c))) {
      if (b.c.key === e.code && b.o.onRelease) b.o.onRelease();
      reset(b);
    }
  }, true);
  addEventListener("blur", () => {
    down.clear();
    binds.forEach(reset);
  });

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

  // src/core/panel.js
  var layer = null;
  var topZ = 10;
  var getLayer = () => {
    if (!layer || !layer.isConnected) layer = h("div", "a2-panel-layer", document.body);
    return layer;
  };
  var Panel = class {
    /**
     * @param {{ title?: string, width?: number, height?: number, x?: number, y?: number, resizable?: boolean,
     *           minWidth?: number, minHeight?: number, closable?: boolean, onClose?: 'hide'|'destroy'|'none', hidden?: boolean, root?: Element }} o
     *   width·height·min* 는 디자인 단위(배율이 곱해짐), x·y 는 화면 px(없으면 가운데)
     */
    constructor(o = {}) {
      ensureSetup();
      this.opts = { width: 760, height: 900, minWidth: 480, minHeight: 360, closable: true, onClose: "hide", ...o };
      this.handlers = {};
      const root = o.root || getLayer();
      const el = this.el = h("div", "a2 a2-panel", root);
      el.setAttribute("role", "dialog");
      this.head = h("div", "a2-panel-head", el);
      this.titleEl = h("div", "a2-panel-title", this.head, o.title || "");
      if (this.opts.closable) {
        this.closeBtn = h("button", "a2-panel-close", this.head);
        this.closeBtn.type = "button";
        this.closeBtn.setAttribute("aria-label", "닫기");
        icon("x", "", this.closeBtn);
        this.closeBtn.addEventListener("pointerdown", (e) => e.stopPropagation());
        this.closeBtn.addEventListener("click", () => this.close());
      }
      this.body = h("div", "a2-panel-body", el);
      this.setSize(this.opts.width, this.opts.height);
      el.addEventListener("pointerdown", () => this.focus(), true);
      this.wireDrag();
      if (this.opts.resizable) this.wireResize();
      this.visible = !o.hidden;
      el.hidden = !!o.hidden;
      requestAnimationFrame(() => this.place(o.x, o.y));
      this.place(o.x, o.y);
      this.focus();
    }
    on(n, fn) {
      var _a;
      ((_a = this.handlers)[n] || (_a[n] = /* @__PURE__ */ new Set())).add(fn);
      return this;
    }
    emit(n, ...a) {
      for (const fn of this.handlers[n] || []) fn(...a, this);
    }
    get scale() {
      return scaleOf(this.el);
    }
    setTitle(t) {
      this.titleEl.textContent = t;
      this.el.setAttribute("aria-label", t);
      return this;
    }
    setSize(w, ht) {
      this.w = Math.max(this.opts.minWidth, w);
      this.h = Math.max(this.opts.minHeight, ht);
      this.el.style.setProperty("--a2-pw", this.w);
      this.el.style.setProperty("--a2-ph", this.h);
      return this;
    }
    place(x, y) {
      const p = this.el.parentElement;
      if (!p) return this;
      const W = p.clientWidth || innerWidth, H = p.clientHeight || innerHeight, w = this.el.offsetWidth, ht = this.el.offsetHeight;
      this.x = x ?? Math.round((W - w) / 2);
      this.y = y ?? Math.round(Math.max(8, (H - ht) / 2));
      this.el.style.translate = `${this.x}px ${this.y}px`;
      return this;
    }
    /** 맨 위로 (DOM 을 옮기지 않고 z-index 로) */
    focus() {
      if (+this.el.style.zIndex !== topZ) this.el.style.zIndex = String(++topZ);
      return this;
    }
    show() {
      if (this.visible) return this.focus();
      this.visible = true;
      this.el.hidden = false;
      this.focus();
      this._t && this._t.kill();
      this._t = animate({ p: 0 }, { p: 1 }, { duration: 0.24, ease: "OutCubic", onUpdate: ({ p }) => {
        this.el.style.opacity = p;
        this.el.style.scale = 0.96 + 0.04 * p;
      } });
      this.emit("show");
      return this;
    }
    hide() {
      if (!this.visible) return this;
      this.visible = false;
      this._t && this._t.kill();
      this._t = animate({ p: 1 }, { p: 0 }, { duration: 0.16, ease: "OutSine", onUpdate: ({ p }) => {
        this.el.style.opacity = p;
        this.el.style.scale = 0.97 + 0.03 * p;
      }, onDone: () => {
        if (!this.visible) this.el.hidden = true;
      } });
      this.emit("hide");
      return this;
    }
    toggle() {
      return this.visible ? this.hide() : this.show();
    }
    /** 닫기 버튼과 같다. onClose 옵션에 따라 숨기거나 없앤다 */
    close() {
      this.emit("close");
      if (this.opts.onClose === "destroy") this.destroy();
      else if (this.opts.onClose === "hide") this.hide();
      return this;
    }
    destroy() {
      this.el.remove();
      this.emit("destroy");
    }
    wireDrag() {
      let d = null;
      this.head.addEventListener("pointerdown", (e) => {
        if (e.button !== 0) return;
        d = { x: e.clientX, y: e.clientY, ox: this.x, oy: this.y };
        try {
          this.head.setPointerCapture(e.pointerId);
        } catch (_) {
        }
        this.el.classList.add("a2-moving");
      });
      this.head.addEventListener("pointermove", (e) => {
        if (!d) return;
        const p = this.el.parentElement, keep = 80;
        this.x = Math.min(Math.max(d.ox + e.clientX - d.x, keep - this.el.offsetWidth), (p.clientWidth || innerWidth) - keep);
        this.y = Math.min(Math.max(d.oy + e.clientY - d.y, 0), (p.clientHeight || innerHeight) - 40);
        this.el.style.translate = `${this.x}px ${this.y}px`;
      });
      const end = () => {
        if (d) {
          d = null;
          this.el.classList.remove("a2-moving");
          this.emit("move", this.x, this.y);
        }
      };
      this.head.addEventListener("pointerup", end);
      this.head.addEventListener("pointercancel", end);
    }
    wireResize() {
      for (const dir of ["e", "s", "se", "w", "sw"]) {
        const g = h("div", `a2-grip a2-grip-${dir}`, this.el);
        let d = null;
        g.addEventListener("pointerdown", (e) => {
          if (e.button) return;
          e.stopPropagation();
          d = { x: e.clientX, y: e.clientY, w: this.w, h: this.h, ox: this.x };
          try {
            g.setPointerCapture(e.pointerId);
          } catch (_) {
          }
        });
        g.addEventListener("pointermove", (e) => {
          if (!d) return;
          const s = this.scale, dx = (e.clientX - d.x) / s, dy = (e.clientY - d.y) / s;
          let w = d.w, ht = d.h;
          if (dir.includes("e")) w = d.w + dx;
          if (dir.includes("w")) w = d.w - dx;
          if (dir.includes("s")) ht = d.h + dy;
          this.setSize(w, ht);
          if (dir.includes("w")) {
            this.x = d.ox + (d.w - this.w) * s;
            this.el.style.translate = `${this.x}px ${this.y}px`;
          }
        });
        const end = () => {
          if (d) {
            d = null;
            this.emit("resize", this.w, this.h);
          }
        };
        g.addEventListener("pointerup", end);
        g.addEventListener("pointercancel", end);
      }
    }
  };

  // src/components/base.js
  var registry = /* @__PURE__ */ new Map();
  var get = (id) => registry.get(id);
  var Component = class {
    constructor(kind, opts = {}, tag = "div") {
      ensureSetup();
      this.kind = kind;
      this.opts = opts;
      this.handlers = {};
      this.el = h(tag, `a2 a2-${kind}`);
      this.disabled = false;
      if (opts.id) {
        this.id = opts.id;
        this.el.dataset.a2Id = opts.id;
        registry.set(opts.id, this);
      }
      if (opts.className) this.el.classList.add(...String(opts.className).split(/\s+/).filter(Boolean));
      if (opts.tooltip) tooltip(this.el, opts.tooltip);
      for (const [k, ev] of [["onChange", "change"], ["onCommit", "commit"], ["onClick", "click"]]) if (opts[k]) this.on(ev, opts[k]);
      this._off = onSettings(() => {
        if (!this.destroyed) requestAnimationFrame(() => this.render(true));
      });
    }
    /** 부모(요소·선택자·빌더·패널·섹션)에 붙인다 */
    mount(parent) {
      const host = resolveParent(parent);
      if (host) host.appendChild(this.el);
      return this;
    }
    /** 이벤트: 'change'(값이 바뀌는 중), 'commit'(값이 정해짐), 컴포넌트마다 더 있음 */
    on(name, fn) {
      var _a;
      ((_a = this.handlers)[name] || (_a[name] = /* @__PURE__ */ new Set())).add(fn);
      return this;
    }
    off(name, fn) {
      this.handlers[name] && this.handlers[name].delete(fn);
      return this;
    }
    emit(name, ...args) {
      for (const fn of this.handlers[name] || []) fn(...args, this);
    }
    get value() {
      return this._value;
    }
    set value(v) {
      this.set(v);
    }
    equals(a, b) {
      return a === b;
    }
    /** 값을 바꾼다. { silent: true } 면 change 이벤트를 내지 않는다 */
    set(v, { silent = false } = {}) {
      v = this.normalize ? this.normalize(v) : v;
      if (this.equals(v, this._value)) return this;
      this._value = v;
      this.render(false);
      if (!silent) this.emit("change", v);
      return this;
    }
    get hasDefault() {
      return this.opts.default !== void 0 && this.opts.default !== null;
    }
    get changed() {
      return this.hasDefault && !this.equals(this._value, this.normalize ? this.normalize(this.opts.default) : this.opts.default);
    }
    /** 기본값으로 되돌린다 */
    reset() {
      if (this.hasDefault) {
        this.set(this.opts.default);
        this.emit("commit", this._value);
      }
      return this;
    }
    render() {
    }
    /** 제목 줄: 라벨 + 되돌리기 버튼 (+ 오른쪽 자리) */
    header(parent, label) {
      const head = h("div", "a2-head", parent);
      this.labelEl = h("span", "a2-head-label", head, label || "");
      if (this.hasDefault) {
        this.resetBtn = h("button", "a2-reset", head);
        this.resetBtn.type = "button";
        this.resetBtn.setAttribute("aria-label", "기본값으로");
        this.resetBtn.tabIndex = -1;
        icon("reset", "", this.resetBtn);
        this.resetBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          this.reset();
        });
      }
      this.headSlot = h("span", "a2-head-slot", head);
      return head;
    }
    paintReset() {
      if (this.resetBtn) {
        const on = this.changed;
        this.resetBtn.classList.toggle("a2-show", on);
        this.resetBtn.tabIndex = on ? 0 : -1;
      }
    }
    /** 끄기: 흐려지고 누를 수 없다 */
    disable(off = true) {
      this.disabled = !!off;
      this.el.classList.toggle("a2-disabled", this.disabled);
      this.el.inert = this.disabled;
      return this;
    }
    enable() {
      return this.disable(false);
    }
    destroy() {
      this.destroyed = true;
      this._off && this._off();
      if (this.id && registry.get(this.id) === this) registry.delete(this.id);
      this.el.remove();
    }
  };
  function pressable(el, fn) {
    el.addEventListener("keydown", (e) => {
      if ((e.key === "Enter" || e.key === " ") && e.target === el) {
        e.preventDefault();
        fn(e);
      }
    });
  }

  // src/components/button.js
  var Button = class extends Component {
    constructor(o = {}) {
      super("btn", o, "button");
      const el = this.el;
      el.type = "button";
      el.classList.add(`a2-btn-${o.variant || "primary"}`);
      if (o.size === "sm") el.classList.add("a2-btn-sm");
      if (o.block) el.classList.add("a2-btn-block");
      if (o.icon) this.iconEl = userIcon(o.icon, "a2-btn-icon", el);
      this.textEl = h("span", "a2-btn-text", el, o.text ?? "");
      if (!o.text) el.classList.add("a2-btn-icon-only");
      el.addEventListener("click", (e) => {
        if (!this.disabled && !this.loading) this.emit("click", e);
      });
    }
    get text() {
      return this.textEl.textContent;
    }
    set text(t) {
      this.textEl.textContent = t;
    }
    /** 처리 중: 글자 대신 도는 표시, 누를 수 없음 */
    setLoading(on = true) {
      this.loading = !!on;
      this.el.classList.toggle("a2-loading", this.loading);
      this.el.setAttribute("aria-busy", this.loading);
      if (this.loading && !this.spin) {
        this.spin = h("span", "a2-btn-spin", this.el);
      }
      return this;
    }
  };

  // src/components/choice.js
  var Switch = class extends Component {
    constructor(o = {}) {
      super("switch", o);
      const el = this.el;
      this._value = !!o.value;
      el.tabIndex = 0;
      el.setAttribute("role", "switch");
      const text = h("div", "a2-row-text", el);
      this.header(text, o.label);
      if (o.description) h("div", "a2-desc", text, o.description);
      this.track = h("span", "a2-track", el);
      h("span", "a2-thumb", this.track);
      const flip = () => {
        if (this.disabled) return;
        this.set(!this._value);
        this.emit("commit", this._value);
      };
      el.addEventListener("click", (e) => {
        if (!e.target.closest(".a2-reset")) flip();
      });
      pressable(el, flip);
      this.render(true);
    }
    normalize(v) {
      return !!v;
    }
    toggle() {
      this.set(!this._value);
      return this;
    }
    render(instant) {
      this.el.classList.toggle("a2-on", this._value);
      this.el.setAttribute("aria-checked", this._value);
      this.track.classList.toggle("a2-instant", !!instant);
      this.paintReset();
    }
  };
  var Checkbox = class extends Component {
    constructor(o = {}) {
      super("check", o);
      const el = this.el;
      this._value = !!o.value;
      el.tabIndex = 0;
      el.setAttribute("role", "checkbox");
      this.box = h("span", "a2-box", el);
      icon("check", "", this.box);
      const text = h("div", "a2-row-text", el);
      this.header(text, o.label);
      if (o.description) h("div", "a2-desc", text, o.description);
      const flip = () => {
        if (this.disabled) return;
        this.set(!this._value);
        this.emit("commit", this._value);
      };
      el.addEventListener("click", (e) => {
        if (!e.target.closest(".a2-reset")) flip();
      });
      pressable(el, flip);
      this.render(true);
    }
    normalize(v) {
      return !!v;
    }
    render(instant) {
      this.el.classList.toggle("a2-on", this._value);
      this.el.setAttribute("aria-checked", this._value);
      this.box.classList.toggle("a2-instant", !!instant);
      this.paintReset();
    }
  };
  var Radio = class extends Component {
    constructor(o = {}) {
      super("radio", o);
      const el = this.el;
      el.setAttribute("role", "radiogroup");
      if (o.label) this.header(el, o.label);
      this.list = h("div", "a2-radio-list", el);
      this.items = (o.options || []).map((raw) => {
        const opt2 = typeof raw === "object" && raw !== null ? raw : { value: raw, label: String(raw) };
        const row = h("div", "a2-radio-item", this.list);
        row.tabIndex = 0;
        row.setAttribute("role", "radio");
        h("span", "a2-dot", row);
        const t = h("div", "a2-row-text", row);
        h("span", "a2-radio-label", t, opt2.label ?? String(opt2.value));
        if (opt2.description) h("div", "a2-desc", t, opt2.description);
        const pick = () => {
          if (this.disabled) return;
          this.set(opt2.value);
          this.emit("commit", this._value);
        };
        row.addEventListener("click", pick);
        pressable(row, pick);
        row.addEventListener("keydown", (e) => {
          const d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
          if (!d) return;
          e.preventDefault();
          const i = (this.items.findIndex((x) => x.row === row) + d + this.items.length) % this.items.length;
          this.items[i].row.focus();
          this.set(this.items[i].value);
          this.emit("commit", this._value);
        });
        return { row, value: opt2.value };
      });
      this._value = o.value !== void 0 ? o.value : this.items[0] && this.items[0].value;
      this.render(true);
    }
    render() {
      for (const it of this.items) {
        const on = this.equals(it.value, this._value);
        it.row.classList.toggle("a2-on", on);
        it.row.setAttribute("aria-checked", on);
      }
      this.paintReset();
    }
  };

  // src/components/slider.js
  var clamp = (v, a, b) => Math.min(Math.max(v, a), b);
  var decimalsOf = (step) => {
    const s = String(step);
    return s.includes(".") ? s.split(".")[1].length : 0;
  };
  var NumberBase = class extends Component {
    setupNumber(o) {
      this.min = o.min ?? 0;
      this.max = o.max ?? 100;
      this.step = o.step ?? (this.max - this.min > 10 ? 1 : 0.01);
      this.decimals = o.decimals ?? decimalsOf(this.step);
      this._value = this.normalize(o.value ?? this.min);
    }
    normalize(v) {
      v = +v;
      if (!Number.isFinite(v)) return this._value ?? this.min;
      if (this.step) v = Math.round((v - this.min) / this.step) * this.step + this.min;
      return +clamp(v, this.min, this.max).toFixed(Math.min(10, this.decimals + 2));
    }
    format(v) {
      const f = this.opts.format;
      return typeof f === "function" ? f(v) : (+v).toFixed(this.decimals);
    }
    /** 입력칸을 계산식 입력으로 만든다. hint 에 결과를 보여 준다 */
    wireExpr(input, hint) {
      const show = () => {
        const r = evaluate(input.value, { x: this._value });
        input.classList.toggle("a2-bad", !r.ok && input.value.trim() !== "");
        if (!r.ok) {
          hint.textContent = "";
          return;
        }
        const v = this.normalize(r.value), plain = /^\s*-?\d*\.?\d+\s*$/.test(input.value) && +input.value === v;
        hint.textContent = plain ? "" : `= ${this.format(v)}`;
        hint.classList.toggle("a2-clamped", v !== +r.value.toFixed(Math.min(10, this.decimals + 2)));
      };
      input.addEventListener("input", show);
      input.addEventListener("focus", () => {
        input.value = String(this._value);
        input.select();
        show();
        this.el.classList.add("a2-editing");
      });
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          input.blur();
        } else if (e.key === "Escape") {
          e.preventDefault();
          this._cancel = true;
          input.blur();
        }
        e.stopPropagation();
      });
      input.addEventListener("blur", () => {
        const r = this._cancel ? { ok: false } : evaluate(input.value, { x: this._value });
        this._cancel = false;
        this.el.classList.remove("a2-editing");
        if (r.ok) {
          this.set(r.value);
          this.emit("commit", this._value);
        }
        input.value = this.format(this._value);
        input.classList.remove("a2-bad");
        hint.textContent = "";
        this.afterEdit && this.afterEdit();
      });
    }
  };
  var Slider = class extends NumberBase {
    constructor(o = {}) {
      super("slider", o);
      this.setupNumber(o);
      const el = this.el;
      this.header(el, o.label);
      this.hint = h("span", "a2-expr-hint", this.headSlot);
      this.input = h("input", "a2-num-input", this.headSlot);
      this.input.type = "text";
      this.input.inputMode = "decimal";
      this.input.spellcheck = false;
      this.input.setAttribute("aria-label", `${o.label || ""} 값`);
      if (o.unit) h("span", "a2-unit", this.headSlot, o.unit);
      this.track = h("div", "a2-track-area", el);
      this.track.tabIndex = 0;
      this.track.setAttribute("role", "slider");
      this.track.setAttribute("aria-valuemin", this.min);
      this.track.setAttribute("aria-valuemax", this.max);
      const rail = h("div", "a2-rail", this.track);
      this.fill = h("div", "a2-rail-fill", rail);
      this.thumb = h("div", "a2-rail-thumb", this.track);
      this._t = this.frac();
      this.paint(this._t);
      this.wireExpr(this.input, this.hint);
      this.wirePointer();
      this.track.addEventListener("keydown", (e) => {
        const big = (this.max - this.min) / 10;
        const d = { ArrowRight: this.step, ArrowUp: this.step, ArrowLeft: -this.step, ArrowDown: -this.step, PageUp: big, PageDown: -big }[e.key];
        if (e.key === "Home") this.set(this.min);
        else if (e.key === "End") this.set(this.max);
        else if (d) this.set(this._value + d);
        else return;
        e.preventDefault();
        this.emit("commit", this._value);
      });
      this.render(true);
    }
    frac(v = this._value) {
      return this.max === this.min ? 0 : (v - this.min) / (this.max - this.min);
    }
    paint(t) {
      t = clamp(t, 0, 1);
      this.track.style.setProperty("--a2-t", t);
    }
    render(instant) {
      const t = this.frac();
      this.track.setAttribute("aria-valuenow", this._value);
      if (document.activeElement !== this.input) this.input.value = this.format(this._value);
      this._ft && this._ft.kill();
      if (instant || this._dragging) {
        this._t = t;
        this.paint(t);
      } else this._ft = tweenNumber(this._t, t, 0.28, "OutCubic", (v) => {
        this._t = v;
        this.paint(v);
      });
      this.paintReset();
    }
    wirePointer() {
      const tr = this.track;
      const at = (x) => {
        const r = tr.getBoundingClientRect();
        return this.min + clamp((x - r.left) / (r.width || 1), 0, 1) * (this.max - this.min);
      };
      let down2 = false;
      tr.addEventListener("pointerdown", (e) => {
        if (e.button !== 0 || this.disabled) return;
        down2 = true;
        this._moved = false;
        try {
          tr.setPointerCapture(e.pointerId);
        } catch (_) {
        }
        this.el.classList.add("a2-active");
        this.set(at(e.clientX));
      });
      tr.addEventListener("pointermove", (e) => {
        if (!down2) return;
        this._dragging = true;
        this.set(at(e.clientX));
      });
      const end = () => {
        if (!down2) return;
        down2 = false;
        this._dragging = false;
        this.el.classList.remove("a2-active");
        this.emit("commit", this._value);
      };
      tr.addEventListener("pointerup", end);
      tr.addEventListener("pointercancel", end);
    }
  };
  var Stepper = class extends NumberBase {
    constructor(o = {}) {
      super("stepper", o);
      this.setupNumber({ step: 1, ...o });
      const el = this.el;
      const text = h("div", "a2-row-text", el);
      this.header(text, o.label);
      if (o.description) h("div", "a2-desc", text, o.description);
      const box2 = h("div", "a2-stepper-box", el);
      this.minus = h("button", "a2-step-btn", box2);
      this.minus.type = "button";
      this.minus.setAttribute("aria-label", "줄이기");
      icon("minus", "", this.minus);
      const mid = h("div", "a2-stepper-mid", box2);
      this.hint = h("span", "a2-expr-hint", el);
      this.input = h("input", "a2-num-input", mid);
      this.input.type = "text";
      this.input.inputMode = "decimal";
      this.input.spellcheck = false;
      if (o.unit) h("span", "a2-unit", mid, o.unit);
      this.plus = h("button", "a2-step-btn", box2);
      this.plus.type = "button";
      this.plus.setAttribute("aria-label", "늘리기");
      icon("plus", "", this.plus);
      this.wireExpr(this.input, this.hint);
      for (const [btn, d] of [[this.minus, -1], [this.plus, 1]]) {
        let t1 = 0, t2 = 0;
        const stop = () => {
          clearTimeout(t1);
          clearInterval(t2);
          if (btn._held) {
            btn._held = false;
            this.emit("commit", this._value);
          }
        };
        btn.addEventListener("pointerdown", (e) => {
          if (e.button !== 0 || this.disabled) return;
          btn._held = true;
          this.set(this._value + d * this.step);
          t1 = setTimeout(() => {
            t2 = setInterval(() => this.set(this._value + d * this.step), 55);
          }, 380);
        });
        for (const ev of ["pointerup", "pointerleave", "pointercancel"]) btn.addEventListener(ev, stop);
        pressable(btn, () => {
          this.set(this._value + d * this.step);
          this.emit("commit", this._value);
        });
      }
      this.render(true);
    }
    render() {
      if (document.activeElement !== this.input) this.input.value = this.format(this._value);
      this.minus.disabled = this._value <= this.min;
      this.plus.disabled = this._value >= this.max;
      this.paintReset();
    }
  };

  // src/components/field.js
  var Field = class extends Component {
    constructor(o = {}) {
      super("field", o);
      const el = this.el;
      this._value = o.value ?? "";
      if (o.label) this.header(el, o.label);
      this.box = h("label", "a2-field-box", el);
      if (o.icon) userIcon(o.icon, "a2-field-icon", this.box);
      this.input = h(o.multiline ? "textarea" : "input", "a2-field-input", this.box);
      if (!o.multiline) this.input.type = o.type || "text";
      if (o.multiline) {
        this.box.classList.add("a2-multiline");
        this.input.rows = o.rows || 3;
      }
      this.input.placeholder = o.placeholder || "";
      this.input.value = this._value;
      this.input.spellcheck = false;
      if (o.maxLength) {
        this.input.maxLength = o.maxLength;
        this.counter = h("span", "a2-field-count", this.headSlot || el);
      }
      if (o.label) this.input.setAttribute("aria-label", o.label);
      this.input.addEventListener("input", () => {
        this._value = this.input.value;
        this.render(false);
        this.emit("change", this._value);
      });
      this.input.addEventListener("change", () => this.emit("commit", this._value));
      this.input.addEventListener("focus", () => this.box.classList.add("a2-focus"));
      this.input.addEventListener("blur", () => this.box.classList.remove("a2-focus"));
      this.render(true);
    }
    normalize(v) {
      return v == null ? "" : String(v);
    }
    render() {
      if (this.input.value !== this._value) this.input.value = this._value;
      if (this.counter) this.counter.textContent = `${this._value.length}/${this.opts.maxLength}`;
      this.paintReset();
    }
    focus() {
      this.input.focus();
      return this;
    }
  };

  // src/core/float.js
  function openFloat({ anchor, className = "", align = "start", gap = 8, onClose }) {
    const el = h("div", `a2 a2-float ${className}`, document.body);
    let up = null, alive = true, raf2 = 0, t = null;
    const place = () => {
      if (!alive) return;
      const g = px(el, gap);
      let r;
      if (anchor instanceof Element) {
        if (!anchor.isConnected) return close();
        r = anchor.getBoundingClientRect();
        if (align === "stretch") el.style.width = `${r.width}px`;
      } else r = { left: anchor.x, right: anchor.x, top: anchor.y, bottom: anchor.y, width: 0 };
      const w = el.offsetWidth, ht = el.offsetHeight;
      if (up === null) up = r.bottom + g + ht > innerHeight && r.top - g - ht > 0;
      let x = Math.min(Math.max(8, r.left), innerWidth - w - 8);
      let y = up ? r.top - g - ht : r.bottom + g;
      y = Math.min(Math.max(8, y), innerHeight - ht - 8);
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.classList.toggle("a2-up", up);
      if (anchor instanceof Element) raf2 = requestAnimationFrame(place);
    };
    const outside = (e) => {
      if (!el.contains(e.target) && !(anchor instanceof Element && anchor.contains(e.target))) close();
    };
    const key = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        close();
      }
    };
    function close() {
      if (!alive) return;
      alive = false;
      cancelAnimationFrame(raf2);
      document.removeEventListener("pointerdown", outside, true);
      removeEventListener("keydown", key, true);
      t && t.kill();
      t = animate({ p: 1 }, { p: 0 }, { duration: 0.14, ease: "OutSine", onUpdate: (v) => paint(v.p), onDone: () => el.remove() });
      onClose && onClose();
    }
    const paint = (p) => {
      el.style.opacity = p;
      el.style.transform = `translateY(${(1 - p) * (up ? 6 : -6) * px(el, 1)}px) scale(${0.97 + 0.03 * p})`;
    };
    paint(0);
    requestAnimationFrame(() => {
      place();
      t = animate({ p: 0 }, { p: 1 }, { duration: 0.2, ease: "OutCubic", onUpdate: (v) => paint(v.p) });
    });
    setTimeout(() => {
      if (alive) {
        document.addEventListener("pointerdown", outside, true);
        addEventListener("keydown", key, true);
      }
    }, 0);
    return { el, close, get open() {
      return alive;
    }, place };
  }

  // src/components/select.js
  var toOpt = (raw) => typeof raw === "object" && raw !== null ? { label: String(raw.value), ...raw } : { value: raw, label: String(raw) };
  function listKeys(list, rows, onPick) {
    let i = rows.findIndex((r) => r.classList.contains("a2-on"));
    const focus = (n) => {
      i = (n + rows.length) % rows.length;
      rows.forEach((r, k) => r.classList.toggle("a2-kbd", k === i));
      rows[i].scrollIntoView({ block: "nearest" });
    };
    list.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        focus(i + 1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        focus(i - 1);
      } else if ((e.key === "Enter" || e.key === " ") && i >= 0) {
        e.preventDefault();
        onPick(i);
      }
    });
    list.tabIndex = -1;
    setTimeout(() => list.focus({ preventScroll: true }), 0);
  }
  var Select = class extends Component {
    constructor(o = {}, kind = "select") {
      super(kind, o);
      const el = this.el;
      this.options = (o.options || []).map(toOpt);
      if (o.label) this.header(el, o.label);
      this.box = h("button", "a2-select-box", el);
      this.box.type = "button";
      this.box.setAttribute("aria-haspopup", "listbox");
      this.text = h("span", "a2-select-text", this.box);
      this.chev = icon("chevron", "a2-select-chev", this.box);
      this._value = this.initial(o);
      this.box.addEventListener("click", () => {
        if (!this.disabled) this.toggle();
      });
      this.box.addEventListener("keydown", (e) => {
        if (e.key === "ArrowDown" && !this.float) {
          e.preventDefault();
          this.open();
        }
      });
      this.render(true);
    }
    initial(o) {
      return o.value !== void 0 ? o.value : this.options[0] && this.options[0].value;
    }
    labelOf(v) {
      const f = this.options.find((x) => this.equals(x.value, v));
      return f ? f.label : v ?? "";
    }
    summary() {
      return this.labelOf(this._value);
    }
    isOn(v) {
      return this.equals(v, this._value);
    }
    get isOpen() {
      return !!(this.float && this.float.open);
    }
    toggle() {
      this.isOpen ? this.close() : this.open();
    }
    open() {
      if (this.isOpen) return;
      this.el.classList.add("a2-open");
      this.box.setAttribute("aria-expanded", "true");
      this.float = openFloat({ anchor: this.box, align: "stretch", className: "a2-menu a2-select-menu", onClose: () => {
        this.el.classList.remove("a2-open");
        this.box.setAttribute("aria-expanded", "false");
        this.float = null;
      } });
      const list = this.float.el;
      list.setAttribute("role", "listbox");
      this.rows = this.options.map((opt2, i) => {
        const r = h("div", "a2-menu-item", list);
        r.setAttribute("role", "option");
        h("span", "a2-menu-label", r, opt2.label);
        icon("check", "a2-menu-check", r);
        r.addEventListener("click", () => this.pick(i));
        return r;
      });
      this.paintRows();
      listKeys(list, this.rows, (i) => this.pick(i));
    }
    close() {
      this.float && this.float.close();
    }
    pick(i) {
      this.set(this.options[i].value);
      this.emit("commit", this._value);
      this.close();
      this.box.focus({ preventScroll: true });
    }
    paintRows() {
      (this.rows || []).forEach((r, i) => {
        const on = this.isOn(this.options[i].value);
        r.classList.toggle("a2-on", on);
        r.setAttribute("aria-selected", on);
      });
    }
    /** 목록을 바꾼다. 지금 값이 없으면 첫 값으로 */
    setOptions(options) {
      this.options = options.map(toOpt);
      if (!this.options.some((x) => this.isOn(x.value))) this.set(this.initial({}));
      this.render(true);
      return this;
    }
    render() {
      const s = this.summary();
      this.text.textContent = s || this.opts.placeholder || "";
      this.text.classList.toggle("a2-placeholder", !s);
      this.paintRows();
      this.paintReset();
    }
    destroy() {
      this.close();
      super.destroy();
    }
  };
  var MultiSelect = class extends Select {
    constructor(o = {}) {
      super(o, "select");
      this.el.classList.add("a2-multi");
    }
    initial(o) {
      return [...o.value || []];
    }
    normalize(v) {
      return this.options ? this.options.map((x) => x.value).filter((x) => (v || []).includes(x)) : [...v || []];
    }
    equals(a, b) {
      return Array.isArray(a) && Array.isArray(b) ? a.length === b.length && a.every((x, i) => x === b[i]) : a === b;
    }
    isOn(v) {
      return (this._value || []).includes(v);
    }
    summary() {
      if (this.opts.summary) return this.opts.summary(this._value);
      const n = this._value.length;
      if (!n) return "";
      const labels = this._value.map((v) => this.labelOf(v));
      return n <= 2 ? labels.join(", ") : `${labels.slice(0, 2).join(", ")} 외 ${n - 2}개`;
    }
    pick(i) {
      const v = this.options[i].value;
      this.set(this.isOn(v) ? this._value.filter((x) => x !== v) : [...this._value, v]);
      this.emit("commit", this._value);
    }
    open() {
      super.open();
      this.float && this.float.el.classList.add("a2-multi-menu");
    }
  };
  function openMenu(x, y, items) {
    ensureSetup();
    const f = openFloat({ anchor: { x, y }, className: "a2-menu a2-context-menu", gap: 2 });
    const rows = [];
    for (const it of items) {
      if (it === "-" || it === null) {
        h("div", "a2-menu-sep", f.el);
        continue;
      }
      const r = h("div", "a2-menu-item", f.el);
      r.setAttribute("role", "menuitem");
      if (it.danger) r.classList.add("a2-danger");
      if (it.disabled) r.classList.add("a2-off");
      if (it.icon) userIcon(it.icon, "a2-menu-icon", r);
      h("span", "a2-menu-label", r, it.label);
      if (it.shortcut) h("span", "a2-menu-key", r, it.shortcut);
      r.addEventListener("click", () => {
        if (it.disabled) return;
        f.close();
        it.onSelect && it.onSelect();
      });
      rows.push(r);
    }
    listKeys(f.el, rows, (i) => rows[i].click());
    return f;
  }
  function menu(target2, items) {
    const el = typeof target2 === "string" ? document.querySelector(target2) : target2;
    el.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      openMenu(e.clientX, e.clientY, typeof items === "function" ? items(e) : items);
    });
    return el;
  }

  // src/components/segmented.js
  var toOpt2 = (raw) => typeof raw === "object" && raw !== null ? { label: String(raw.value), ...raw } : { value: raw, label: String(raw) };
  function pillBar(owner, parent, options, cls) {
    const bar = h("div", cls, parent);
    const ind = h("div", "a2-pill", bar);
    const btns = options.map((opt2) => {
      const b = h("button", "a2-pill-btn", bar, opt2.label);
      b.type = "button";
      b.addEventListener("click", () => owner.pickValue(opt2.value));
      return b;
    });
    let cur = null, tw = null;
    const move = (i, instant) => {
      const b = btns[i];
      if (!b || !b.offsetWidth) return;
      const to = { x: b.offsetLeft, w: b.offsetWidth };
      tw && tw.kill();
      const put = (v) => {
        cur = v;
        ind.style.transform = `translateX(${v.x}px)`;
        ind.style.width = `${v.w}px`;
      };
      if (instant || !cur) put(to);
      else tw = tween(cur, to, 0.34, "OutExpo", put);
    };
    new ResizeObserver(() => owner.render(true)).observe(bar);
    return { bar, btns, move };
  }
  var Segmented = class extends Component {
    constructor(o = {}) {
      super("segmented", o);
      this.options = (o.options || []).map(toOpt2);
      if (o.label) this.header(this.el, o.label);
      this.p = pillBar(this, this.el, this.options, "a2-seg-bar");
      this.p.bar.setAttribute("role", "radiogroup");
      this._value = o.value !== void 0 ? o.value : this.options[0] && this.options[0].value;
      this.render(true);
      requestAnimationFrame(() => this.render(true));
    }
    pickValue(v) {
      if (this.disabled) return;
      this.set(v);
      this.emit("commit", this._value);
    }
    render(instant) {
      const i = this.options.findIndex((x) => this.equals(x.value, this._value));
      this.p.btns.forEach((b, k) => {
        b.classList.toggle("a2-on", k === i);
        b.setAttribute("aria-checked", k === i);
        b.setAttribute("role", "radio");
      });
      this.p.move(i, instant);
      this.paintReset();
    }
  };
  var Tabs = class extends Component {
    constructor(o = {}) {
      super("tabs", o);
      this.options = (o.tabs || []).map((t, i2) => ({ value: t.value ?? i2, label: t.label ?? String(t.value ?? i2), build: t.build }));
      this.p = pillBar(this, this.el, this.options, "a2-tab-bar");
      this.p.bar.setAttribute("role", "tablist");
      this.stage = h("div", "a2-tab-stage", this.el);
      this.panes = this.options.map((t) => {
        const pane = h("div", "a2 a2-tab-pane", this.stage);
        pane.setAttribute("role", "tabpanel");
        pane.hidden = true;
        if (t.build) t.build(pane);
        return pane;
      });
      this._value = o.value !== void 0 ? o.value : this.options[0] && this.options[0].value;
      const i = this.index();
      if (this.panes[i]) this.panes[i].hidden = false;
      this.render(true);
      requestAnimationFrame(() => this.render(true));
    }
    index(v = this._value) {
      return this.options.findIndex((x) => this.equals(x.value, v));
    }
    /** 탭 내용 요소 */
    pane(value) {
      return this.panes[this.index(value)];
    }
    pickValue(v) {
      if (this.disabled || this.equals(v, this._value)) return;
      const from = this.index(), to = this.index(v);
      this.set(v);
      this.slide(from, to);
      this.emit("commit", this._value);
    }
    slide(from, to) {
      const a = this.panes[from], b = this.panes[to];
      if (!a || !b) return;
      this._tw && this._tw.kill();
      for (const p of this.panes) if (p !== a && p !== b) p.hidden = true;
      const dir = to > from ? 1 : -1, d = px(this.el, 60);
      const H0 = this.stage.offsetHeight;
      a.hidden = false;
      b.hidden = false;
      a.classList.add("a2-leaving");
      const H1 = b.offsetHeight;
      this.stage.style.height = `${H0}px`;
      this._tw = animate({ p: 0 }, { p: 1 }, {
        duration: 0.36,
        ease: "OutCubic",
        onUpdate: ({ p }) => {
          a.style.transform = `translateX(${-dir * d * p}px)`;
          a.style.opacity = 1 - p * 1.6;
          b.style.transform = `translateX(${dir * d * (1 - p)}px)`;
          b.style.opacity = Math.min(1, p * 1.4);
          this.stage.style.height = `${H0 + (H1 - H0) * p}px`;
        },
        onDone: () => {
          a.hidden = true;
          a.classList.remove("a2-leaving");
          a.style.transform = a.style.opacity = b.style.transform = b.style.opacity = "";
          this.stage.style.height = "";
        }
      });
    }
    render(instant) {
      const i = this.index();
      this.p.btns.forEach((b, k) => {
        b.classList.toggle("a2-on", k === i);
        b.setAttribute("aria-selected", k === i);
        b.setAttribute("role", "tab");
      });
      this.p.move(i, instant);
    }
  };

  // src/components/color.js
  var c01 = (v) => Math.min(1, Math.max(0, v));
  var hx = (v) => Math.round(c01(v) * 255).toString(16).padStart(2, "0").toUpperCase();
  var toHex = ({ r, g, b, a = 1 }) => `#${hx(r)}${hx(g)}${hx(b)}${a < 1 ? hx(a) : ""}`;
  function fromAny(c) {
    const [r, g, b, a] = parseColor(c);
    return { r: r / 255, g: g / 255, b: b / 255, a: a ?? 1 };
  }
  function rgb2hsv({ r, g, b }) {
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
    let hh = 0;
    if (d) hh = mx === r ? (g - b) / d % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
    return { h: (hh / 6 + 1) % 1, s: mx ? d / mx : 0, v: mx };
  }
  function hsv2rgb(hh, s, v) {
    const f = (n) => {
      const k = (n + hh * 6) % 6;
      return v - v * s * Math.max(0, Math.min(k, 4 - k, 1));
    };
    return { r: f(5), g: f(3), b: f(1) };
  }
  var PRESETS = ["#FF7A45", "#F4B740", "#5CCB8A", "#3FC1C9", "#4C8DFF", "#8E7CFF", "#F25F8A", "#F3EEE9", "#8A847E", "#1B1917"];
  var ColorPicker = class extends Component {
    constructor(o = {}) {
      super("color", o);
      if (o.label) this.header(this.el, o.label);
      this.box = h("button", "a2-select-box a2-color-box", this.el);
      this.box.type = "button";
      this.sw = h("span", "a2-swatch", this.box);
      this.swFill = h("span", "a2-swatch-fill", this.sw);
      this.text = h("span", "a2-select-text a2-color-text", this.box);
      this.rgba = fromAny(o.value || "#FF7A45");
      this.hsv = rgb2hsv(this.rgba);
      this._value = toHex(this.rgba);
      this.box.addEventListener("click", () => {
        if (!this.disabled) this.float && this.float.open ? this.close() : this.open();
      });
      this.render(true);
    }
    normalize(v) {
      return typeof v === "string" ? toHex(fromAny(v)) : toHex(v);
    }
    set(v, o) {
      const hex = this.normalize(v);
      if (hex === this._value) return this;
      this.rgba = fromAny(hex);
      const hsv = rgb2hsv(this.rgba);
      this.hsv = { h: hsv.s > 0 && hsv.v > 0 ? hsv.h : this.hsv.h, s: hsv.v > 0 ? hsv.s : this.hsv.s, v: hsv.v };
      return super.set(hex, o);
    }
    setHsv(hh, s, v, a = this.rgba.a) {
      this.hsv = { h: c01(hh), s: c01(s), v: c01(v) };
      this.rgba = { ...hsv2rgb(this.hsv.h, this.hsv.s, this.hsv.v), a: c01(a) };
      const hex = toHex(this.rgba);
      if (hex !== this._value) {
        this._value = hex;
        this.render(false);
        this.emit("change", hex);
      }
    }
    render() {
      const { r, g, b, a } = this.rgba;
      this.swFill.style.background = `rgba(${r * 255}, ${g * 255}, ${b * 255}, ${a})`;
      this.text.textContent = this._value;
      this.paintReset();
      this.paintPopup();
    }
    open() {
      this.el.classList.add("a2-open");
      this.float = openFloat({ anchor: this.box, className: "a2-color-pop", onClose: () => {
        this.el.classList.remove("a2-open");
        this.float = null;
        this.emit("commit", this._value);
      } });
      const p = this.float.el;
      this.sv = h("div", "a2-sv", p);
      this.svDot = h("span", "a2-sv-dot", this.sv);
      this.hue = h("div", "a2-bar a2-hue", p);
      this.hueDot = h("span", "a2-bar-dot", this.hue);
      this.alpha = h("div", "a2-bar a2-alpha", p);
      this.alphaFill = h("span", "a2-alpha-fill", this.alpha);
      this.alphaDot = h("span", "a2-bar-dot", this.alpha);
      const row = h("div", "a2-color-row", p);
      this.hex = h("input", "a2-field-input a2-hex", row);
      this.hex.spellcheck = false;
      this.hex.maxLength = 9;
      this.preview = h("span", "a2-swatch a2-color-preview", row);
      this.previewFill = h("span", "a2-swatch-fill", this.preview);
      const pre = h("div", "a2-presets", p);
      for (const c of this.opts.presets || PRESETS) {
        const s = h("button", "a2-preset", pre);
        s.type = "button";
        s.style.background = c;
        s.title = c;
        s.addEventListener("click", () => {
          this.set(c);
        });
      }
      const drag = (el, fn) => {
        let on = false;
        const at = (e) => {
          const r = el.getBoundingClientRect();
          fn(c01((e.clientX - r.left) / r.width), c01((e.clientY - r.top) / r.height));
        };
        el.addEventListener("pointerdown", (e) => {
          if (e.button) return;
          on = true;
          try {
            el.setPointerCapture(e.pointerId);
          } catch (_) {
          }
          at(e);
        });
        el.addEventListener("pointermove", (e) => {
          if (on) at(e);
        });
        el.addEventListener("pointerup", () => {
          on = false;
        });
      };
      drag(this.sv, (x, y) => this.setHsv(this.hsv.h, x, 1 - y));
      drag(this.hue, (x) => this.setHsv(x, this.hsv.s, this.hsv.v));
      drag(this.alpha, (x) => this.setHsv(this.hsv.h, this.hsv.s, this.hsv.v, x));
      this.hex.addEventListener("input", () => {
        const t = this.hex.value.trim().replace(/^#/, "");
        const ok = /^([0-9a-f]{6}|[0-9a-f]{8})$/i.test(t);
        this.hex.classList.toggle("a2-bad", !ok && !/^[0-9a-f]{0,8}$/i.test(t));
        if (ok) this.set(`#${t}`);
      });
      this.hex.addEventListener("keydown", (e) => {
        if (e.key === "Enter") this.close();
        e.stopPropagation();
      });
      this.paintPopup();
    }
    close() {
      this.float && this.float.close();
    }
    paintPopup() {
      if (!this.float || !this.sv) return;
      const { h: hh, s, v } = this.hsv, pure = toHex({ ...hsv2rgb(hh, 1, 1), a: 1 }), solid = toHex({ ...this.rgba, a: 1 });
      this.sv.style.setProperty("--a2-hue", pure);
      this.svDot.style.left = `${s * 100}%`;
      this.svDot.style.top = `${(1 - v) * 100}%`;
      this.svDot.style.background = solid;
      this.hueDot.style.left = `${hh * 100}%`;
      this.hueDot.style.background = pure;
      this.alphaFill.style.background = `linear-gradient(to right, transparent, ${solid})`;
      this.alphaDot.style.left = `${this.rgba.a * 100}%`;
      this.previewFill.style.background = this.swFill.style.background;
      if (document.activeElement !== this.hex) {
        this.hex.value = this._value;
        this.hex.classList.remove("a2-bad");
      }
    }
    destroy() {
      this.close();
      super.destroy();
    }
  };

  // src/components/keybind.js
  var MOD_OF = { ControlLeft: "Ctrl", ControlRight: "Ctrl", AltLeft: "Alt", AltRight: "Alt", ShiftLeft: "Shift", ShiftRight: "Shift", MetaLeft: "Meta", MetaRight: "Meta" };
  var KeyBind = class extends Component {
    constructor(o = {}) {
      super("keybind", o);
      const el = this.el;
      this._value = o.value ? comboToString(parseCombo(o.value)) : "";
      const text = h("div", "a2-row-text", el);
      this.header(text, o.label);
      if (o.description) h("div", "a2-desc", text, o.description);
      this.box = h("button", "a2-keys", el);
      this.box.type = "button";
      this.box.addEventListener("click", () => {
        if (!this.disabled) this.recording ? this.stop() : this.record();
      });
      if (o.onPress) {
        this.binding = keys.bind(this._value, o.onPress, { hold: o.hold, onHold: o.onHold });
        this.on("change", (v) => this.binding.rebind(v));
      }
      this.render(true);
    }
    normalize(v) {
      return v ? comboToString(parseCombo(v)) : "";
    }
    record() {
      this.recording = true;
      this.el.classList.add("a2-recording");
      this.live("누를 키 조합");
      const mods = /* @__PURE__ */ new Set();
      this._kd = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.code === "Escape") return this.stop();
        if ((e.code === "Backspace" || e.code === "Delete") && !mods.size) {
          this.set("");
          this.emit("commit", "");
          return this.stop();
        }
        const m = MOD_OF[e.code];
        if (m) {
          mods.add(m);
          this.live([...mods].join("+") + "+…");
          return;
        }
        this.set(comboToString({ mods: [...mods], key: e.code }));
        this.emit("commit", this._value);
        this.stop();
      };
      this._ku = (e) => {
        const m = MOD_OF[e.code];
        if (m) {
          mods.delete(m);
          this.live(mods.size ? [...mods].join("+") + "+…" : "누를 키 조합");
        }
      };
      this._out = (e) => {
        if (!this.el.contains(e.target)) this.stop();
      };
      addEventListener("keydown", this._kd, true);
      addEventListener("keyup", this._ku, true);
      setTimeout(() => document.addEventListener("pointerdown", this._out, true), 0);
    }
    stop() {
      if (!this.recording) return;
      this.recording = false;
      this.el.classList.remove("a2-recording");
      removeEventListener("keydown", this._kd, true);
      removeEventListener("keyup", this._ku, true);
      document.removeEventListener("pointerdown", this._out, true);
      this.render(true);
    }
    live(t) {
      this.box.textContent = "";
      h("span", "a2-keys-live", this.box, t);
    }
    render() {
      if (this.recording) return;
      this.box.textContent = "";
      const names = keyNames(this._value);
      if (!names.length) h("span", "a2-keys-empty", this.box, "없음");
      for (const n of names) h("kbd", "a2-kbd", this.box, n);
      this.paintReset();
    }
    destroy() {
      this.stop();
      this.binding && this.binding.unbind();
      super.destroy();
    }
  };

  // src/components/feedback.js
  var Progress = class extends Component {
    constructor(o = {}) {
      super("progress", o);
      if (o.label || o.showValue) {
        this.header(this.el, o.label || "");
        this.pct = h("span", "a2-progress-pct", this.headSlot);
      }
      this.track = h("div", "a2-progress-track", this.el);
      this.track.setAttribute("role", "progressbar");
      this.fill = h("div", "a2-progress-fill", this.track);
      this._value = o.value === void 0 ? null : o.value;
      this._shown = this._value ?? 0;
      this.render(true);
    }
    normalize(v) {
      return v === null || v === void 0 ? null : Math.min(1, Math.max(0, +v));
    }
    render(instant) {
      const v = this._value, ind = v === null;
      this.el.classList.toggle("a2-indeterminate", ind);
      if (this.pct) this.pct.textContent = ind ? "" : `${Math.round(v * 100)}%`;
      if (ind) {
        this.track.removeAttribute("aria-valuenow");
        this.fill.style.width = "";
        return;
      }
      this.track.setAttribute("aria-valuenow", Math.round(v * 100));
      this._t && this._t.kill();
      if (instant) {
        this._shown = v;
        this.fill.style.width = `${v * 100}%`;
      } else this._t = tweenNumber(this._shown, v, 0.45, "OutCubic", (x) => {
        this._shown = x;
        this.fill.style.width = `${x * 100}%`;
      });
    }
  };
  var Spinner = class extends Component {
    constructor(o = {}) {
      super("spinner", o, "span");
      this.el.setAttribute("role", "status");
      this.el.setAttribute("aria-label", o.label || "불러오는 중");
      if (o.size) this.el.style.setProperty("--a2-spin", o.size);
    }
  };
  var stack = null;
  var TOAST_ICON = { info: "info", success: "ok", warning: "warn", error: "error" };
  function toast(text, o = {}) {
    ensureSetup();
    if (!stack || !stack.isConnected) stack = h("div", "a2 a2-toasts", document.body);
    const type = o.type || "info";
    const el = h("div", `a2-toast a2-toast-${type}`, stack);
    el.setAttribute("role", type === "error" ? "alert" : "status");
    icon(TOAST_ICON[type] || "info", "a2-toast-icon", el);
    h("span", "a2-toast-text", el, text);
    let closed = false, timer = 0;
    const close = () => {
      if (closed) return;
      closed = true;
      clearTimeout(timer);
      const hgt = el.offsetHeight;
      animate({ p: 1 }, { p: 0 }, { duration: 0.22, ease: "InCubic", onUpdate: ({ p }) => {
        el.style.opacity = p;
        el.style.transform = `translateY(${(1 - p) * 12}px) scale(${0.96 + 0.04 * p})`;
        el.style.marginTop = `${-(1 - p) * hgt}px`;
      }, onDone: () => el.remove() });
    };
    if (o.action) {
      const b = h("button", "a2-toast-action", el, o.action.label);
      b.type = "button";
      b.addEventListener("click", () => {
        o.action.onClick && o.action.onClick();
        close();
      });
    }
    el.addEventListener("click", (e) => {
      if (!e.target.closest(".a2-toast-action")) close();
    });
    animate({ p: 0 }, { p: 1 }, { duration: 0.32, ease: "OutBack", onUpdate: ({ p }) => {
      el.style.opacity = Math.min(1, p * 1.4);
      el.style.transform = `translateY(${(1 - p) * 18}px) scale(${0.94 + 0.06 * p})`;
    } });
    const dur = o.duration ?? 3;
    if (dur > 0) {
      timer = setTimeout(close, dur * 1e3);
      el.addEventListener("pointerenter", () => clearTimeout(timer));
      el.addEventListener("pointerleave", () => {
        if (!closed) timer = setTimeout(close, 1200);
      });
    }
    return { close };
  }
  function dialog(o = {}) {
    ensureSetup();
    return new Promise((resolve) => {
      const layer2 = h("div", "a2 a2-dialog-layer", document.body);
      const scrim = h("div", "a2-scrim", layer2);
      const box2 = h("div", "a2-dialog", layer2);
      box2.setAttribute("role", "dialog");
      box2.setAttribute("aria-modal", "true");
      if (o.title) {
        const t = h("h2", "a2-dialog-title", box2, o.title);
        box2.setAttribute("aria-label", o.title);
        t.id = `a2d${Date.now()}`;
      }
      if (o.message) h("p", "a2-dialog-msg", box2, o.message);
      if (o.content) o.content(h("div", "a2-dialog-body", box2));
      const actions = h("div", "a2-dialog-actions", box2);
      let done = false, prevFocus = document.activeElement;
      const close = (v) => {
        if (done) return;
        done = true;
        removeEventListener("keydown", key, true);
        animate({ p: 1 }, { p: 0 }, { duration: 0.16, ease: "OutSine", onUpdate: ({ p }) => paint(p), onDone: () => {
          layer2.remove();
          prevFocus && prevFocus.focus && prevFocus.focus({ preventScroll: true });
        } });
        resolve(v);
      };
      const btns = (o.buttons || [{ label: "확인", value: true, variant: "primary" }]).map((b) => {
        const btn = new Button({ text: b.label, variant: b.variant || "soft" }).mount(actions);
        btn.on("click", () => close(b.value));
        return btn;
      });
      const key = (e) => {
        if (e.key === "Escape" && o.dismissable !== false) {
          e.stopPropagation();
          close(void 0);
        }
      };
      addEventListener("keydown", key, true);
      scrim.addEventListener("click", () => {
        if (o.dismissable !== false) close(void 0);
      });
      const paint = (p) => {
        scrim.style.opacity = p;
        box2.style.opacity = Math.min(1, p * 1.3);
        box2.style.transform = `translateY(${(1 - p) * 16}px) scale(${0.96 + 0.04 * p})`;
      };
      paint(0);
      animate({ p: 0 }, { p: 1 }, { duration: 0.28, ease: "OutCubic", onUpdate: ({ p }) => paint(p) });
      const primary = btns[btns.length - 1];
      setTimeout(() => primary && primary.el.focus({ preventScroll: true }), 30);
    });
  }
  var confirm = (message, o = {}) => dialog({
    title: o.title,
    message,
    ...o,
    buttons: [{ label: o.cancel || "취소", value: false, variant: "soft" }, { label: o.ok || "확인", value: true, variant: o.danger ? "danger" : "primary" }]
  }).then((v) => v === true);
  var alert = (message, o = {}) => dialog({ title: o.title, message, buttons: [{ label: o.ok || "확인", value: true, variant: "primary" }] }).then(() => void 0);

  // src/components/layout.js
  var Section = class extends Component {
    constructor(o = {}) {
      super("section", o, "section");
      const el = this.el;
      this._value = o.enabled !== false;
      this.expanded = !o.collapsed;
      const head = h("div", "a2-section-head", el);
      this.titleBtn = h(o.collapsible ? "button" : "div", "a2-section-title", head);
      if (o.collapsible) {
        this.titleBtn.type = "button";
        this.titleBtn.setAttribute("aria-expanded", this.expanded);
      }
      const tt = h("div", "a2-section-tt", this.titleBtn);
      h("span", "a2-section-name", tt, o.title || "");
      if (o.description) h("span", "a2-desc", tt, o.description);
      if (o.collapsible) {
        this.chev = icon("chevron", "a2-section-chev", this.titleBtn);
        this.titleBtn.addEventListener("click", () => this.setExpanded(!this.expanded));
      }
      if (o.toggle) {
        this.sw = h("button", "a2-section-switch", head);
        this.sw.type = "button";
        this.sw.setAttribute("role", "switch");
        this.sw.setAttribute("aria-label", `${o.title || ""} 켜기`);
        const tr = h("span", "a2-track", this.sw);
        h("span", "a2-thumb", tr);
        this.sw.addEventListener("click", () => {
          this.set(!this._value);
          this.emit("commit", this._value);
        });
      }
      if (o.actions) for (const a of o.actions) {
        const b = h("button", "a2-section-action", head);
        b.type = "button";
        b.title = a.label || "";
        if (a.icon) {
          const ic = h("span", "a2-uicon", b);
          if (a.icon.startsWith("<")) ic.innerHTML = a.icon;
          else h("i", a.icon, ic);
        } else b.textContent = a.label;
        if (a.danger) b.classList.add("a2-danger");
        b.addEventListener("click", () => a.onClick && a.onClick(this));
      }
      this.wrap = h("div", "a2-section-wrap", el);
      this.body = h("div", "a2-section-body", this.wrap);
      if (!this.expanded) {
        this.wrap.hidden = true;
        el.classList.add("a2-collapsed");
      }
      this.render(true);
    }
    normalize(v) {
      return !!v;
    }
    get enabled() {
      return this._value;
    }
    render() {
      this.el.classList.toggle("a2-section-off", !this._value);
      this.body.inert = !this._value;
      if (this.sw) {
        this.sw.classList.toggle("a2-on", this._value);
        this.sw.setAttribute("aria-checked", this._value);
      }
    }
    setExpanded(open) {
      if (open === this.expanded) return this;
      this.expanded = open;
      this.el.classList.toggle("a2-collapsed", !open);
      if (this.titleBtn.tagName === "BUTTON") this.titleBtn.setAttribute("aria-expanded", open);
      const w = this.wrap;
      this._t && this._t.kill();
      w.hidden = false;
      const from = w.getBoundingClientRect().height;
      w.style.height = "auto";
      const to = open ? w.getBoundingClientRect().height : 0;
      w.style.height = `${from}px`;
      w.style.overflow = "hidden";
      this._t = animate({ v: from }, { v: to }, { duration: 0.26, ease: "OutCubic", onUpdate: ({ v }) => {
        w.style.height = `${v}px`;
      }, onDone: () => {
        w.style.height = "";
        w.style.overflow = "";
        if (!this.expanded) w.hidden = true;
      } });
      this.emit("toggle", open);
      return this;
    }
  };
  var ScrollArea = class extends Component {
    constructor(o = {}) {
      super("scroll", o);
      this.body = h("div", "a2-scroll-body", this.el);
      if (o.height) this.el.style.height = typeof o.height === "number" ? `${o.height}px` : o.height;
      let target2 = 0, raf2 = 0;
      const step = () => {
        const d = target2 - this.el.scrollTop;
        if (Math.abs(d) < 0.5) {
          this.el.scrollTop = target2;
          raf2 = 0;
          return;
        }
        this.el.scrollTop += d * 0.2;
        raf2 = requestAnimationFrame(step);
      };
      this.el.addEventListener("wheel", (e) => {
        if (e.ctrlKey || e.deltaMode === 2) return;
        const max = this.el.scrollHeight - this.el.clientHeight;
        if (max <= 0) return;
        if (!raf2) target2 = this.el.scrollTop;
        const next = Math.min(max, Math.max(0, target2 + e.deltaY * (e.deltaMode === 1 ? 32 : 1)));
        if (next === target2) return;
        e.preventDefault();
        target2 = next;
        if (!raf2) raf2 = requestAnimationFrame(step);
      }, { passive: false });
    }
  };

  // src/ui.js
  var opt = (label, o) => typeof label === "object" && label !== null && !Array.isArray(label) ? label : { ...o, label };
  var Builder = class _Builder {
    constructor(host) {
      ensureSetup();
      this.host = resolveParent(host);
    }
    add(c) {
      c.mount(this.host);
      return c;
    }
    /** ui.button('저장', onClick, { variant }) 또는 ui.button({ text, icon, variant, onClick }) */
    button(text, onClick, o = {}) {
      const p = typeof text === "object" && text !== null ? text : { ...o, text, onClick };
      return this.add(new Button(p));
    }
    switch(label, o) {
      return this.add(new Switch(opt(label, o)));
    }
    checkbox(label, o) {
      return this.add(new Checkbox(opt(label, o)));
    }
    /** ui.radio('정렬', ['이름', '날짜'], { value }) */
    radio(label, options, o = {}) {
      return this.add(new Radio(typeof label === "object" ? label : { ...o, label, options }));
    }
    slider(label, o) {
      return this.add(new Slider(opt(label, o)));
    }
    stepper(label, o) {
      return this.add(new Stepper(opt(label, o)));
    }
    field(label, o) {
      return this.add(new Field(opt(label, o)));
    }
    select(label, options, o = {}) {
      return this.add(new Select(typeof label === "object" ? label : { ...o, label, options }));
    }
    multiSelect(label, options, o = {}) {
      return this.add(new MultiSelect(typeof label === "object" ? label : { ...o, label, options }));
    }
    segmented(options, o = {}) {
      return this.add(new Segmented(Array.isArray(options) ? { ...o, options } : options));
    }
    color(label, o) {
      return this.add(new ColorPicker(opt(label, o)));
    }
    keybind(label, o) {
      return this.add(new KeyBind(opt(label, o)));
    }
    progress(label, o) {
      return this.add(new Progress(opt(label, o)));
    }
    spinner(o = {}) {
      return this.add(new Spinner(o));
    }
    /** ui.tabs([{ label, build: tab => tab.slider(...) }]) — build 는 빌더를 받는다 */
    tabs(tabs, o = {}) {
      const t = new Tabs({ ...o, tabs: tabs.map((x) => ({ ...x, build: x.build ? (body) => x.build(new _Builder(body)) : null })) });
      return this.add(t);
    }
    /** ui.section('제목', { toggle, collapsible, description }, s => { s.slider(...) }) */
    section(title, o = {}, fill) {
      if (typeof o === "function") {
        fill = o;
        o = {};
      }
      const s = this.add(new Section({ ...o, title }));
      s.ui = new _Builder(s.body);
      if (fill) fill(s.ui);
      return s;
    }
    scroll(o = {}, fill) {
      if (typeof o === "function") {
        fill = o;
        o = {};
      }
      const sc = this.add(new ScrollArea(o));
      sc.ui = new _Builder(sc.body);
      if (fill) fill(sc.ui);
      return sc;
    }
    /** 가로로 나란히 */
    row(fill, o = {}) {
      const el = h("div", "a2 a2-row", this.host);
      if (o.gap != null) el.style.setProperty("--a2-gap", o.gap);
      if (fill) fill(new _Builder(el));
      return el;
    }
    /** 세로로 쌓기 */
    stack(fill, o = {}) {
      const el = h("div", "a2 a2-stack", this.host);
      if (o.gap != null) el.style.setProperty("--a2-gap", o.gap);
      if (fill) fill(new _Builder(el));
      return el;
    }
    text(t, o = {}) {
      return h("p", `a2 a2-text${o.muted ? " a2-muted" : ""}${o.small ? " a2-small" : ""}`, this.host, t);
    }
    title(t) {
      return h("h2", "a2 a2-title", this.host, t);
    }
    divider() {
      return h("hr", "a2 a2-divider", this.host);
    }
  };
  var ui = (host) => new Builder(host);
  function panel(o = {}, fill) {
    const p = new Panel(o);
    p.ui = new Builder(p.body);
    if (fill) fill(p.ui);
    return p;
  }

  // src/index.js
  var version = true ? "3.0.0" : "dev";
  var api = {
    version,
    setup,
    setTheme,
    settings,
    onSettings,
    Theme,
    themes,
    Ease,
    animate,
    tooltip,
    keys,
    evaluate,
    ui,
    panel,
    Builder,
    Panel,
    get,
    toast,
    dialog,
    confirm,
    alert,
    menu,
    openMenu,
    Component,
    Button,
    Switch,
    Checkbox,
    Radio,
    Slider,
    Stepper,
    Field,
    Select,
    MultiSelect,
    Segmented,
    Tabs,
    ColorPicker,
    KeyBind,
    Progress,
    Spinner,
    Section,
    ScrollArea
  };
  var index_default = api;
  return __toCommonJS(index_exports);
})();
adas2=adas2.default||adas2;
