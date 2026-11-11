/*! adas2 v5.0.0 | (c) 2026 a2den1 | adas2 License: 사용 자유, 수정·2차 배포 금지 | https://github.com/a2den1/adas2 */
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
    A2Element: () => A2Element,
    BASE_CSS: () => BASE_CSS,
    Ease: () => Ease,
    SPRINGS: () => SPRINGS,
    Spring: () => Spring,
    addIcon: () => addIcon,
    alert: () => alert,
    animate: () => animate,
    confirm: () => confirm,
    default: () => index_default,
    define: () => define,
    defineTheme: () => defineTheme,
    drag: () => drag,
    evaluate: () => evaluate,
    icon: () => icon,
    keyNames: () => keyNames,
    matchKey: () => matches,
    openPopover: () => openPopover,
    prompt: () => prompt,
    reveal: () => reveal,
    ripple: () => ripple,
    rubber: () => rubber,
    setMotion: () => setMotion,
    springEase: () => springEase,
    springs: () => springs,
    theme: () => theme,
    themes: () => themes,
    toast: () => toast,
    version: () => version
  });

  // src/styles/global.css
  var global_default = '/* adas2 — 문서 전체에 한 번 들어가는 스타일: 글꼴, 색·모양·움직임 토큰, 정의 전 깜빡임 막기 */\n\n@font-face { font-family: "GmarketSans"; font-weight: 300; font-display: swap; src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansLight.woff") format("woff"); }\n@font-face { font-family: "GmarketSans"; font-weight: 500; font-display: swap; src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff") format("woff"); }\n@font-face { font-family: "GmarketSans"; font-weight: 700; font-display: swap; src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansBold.woff") format("woff"); }\n\n:root {\n  --a2-font: "GmarketSans", "Pretendard", system-ui, -apple-system, "Malgun Gothic", sans-serif;\n  --a2-weight: 300;\n  --a2-weight-strong: 500;\n  --a2-fs: 14px;\n  --a2-fs-sm: 12.5px;\n  --a2-fs-lg: 18px;\n  /* 크기 */\n  --a2-h: 44px;          /* 버튼·세그먼트 높이 */\n  --a2-h-field: 52px;    /* 입력칸 높이 */\n  /* 모양: 값이 클수록 둥글다 */\n  --a2-r-xs: 8px;\n  --a2-r-sm: 12px;\n  --a2-r-md: 16px;\n  --a2-r-lg: 22px;\n  --a2-r-xl: 28px;\n  --a2-r-full: 999px;\n  /* 움직임: 스프링 곡선은 스크립트가 계산해 덮어쓴다(아래는 linear() 를 모르는 브라우저용) */\n  --a2-speed: 1;\n  --a2-e-snap: cubic-bezier(0.3, 1.5, 0.5, 1);  --a2-d-snap: 0.35s;\n  --a2-e-move: cubic-bezier(0.3, 1.25, 0.4, 1); --a2-d-move: 0.5s;\n  --a2-e-slow: cubic-bezier(0.3, 1.15, 0.4, 1); --a2-d-slow: 0.7s;\n  --a2-e-fx: cubic-bezier(0.2, 0, 0, 1);        --a2-d-fx: 0.2s;\n}\n\n/* 어두운 화면 (기본) */\n:root, [data-a2-theme="dark"] {\n  color-scheme: dark;\n  --a2-bg: #1B1917;\n  --a2-surface: #25221F;\n  --a2-surface-high: #2F2B27;\n  --a2-surface-highest: #3A3530;\n  --a2-raised: #2F2B27;\n  --a2-fill: rgba(243, 238, 233, 0.07); --a2-fill-hover: rgba(243, 238, 233, 0.11); --a2-fill-active: rgba(243, 238, 233, 0.16);\n  --a2-line: rgba(243, 238, 233, 0.16); --a2-line-strong: rgba(243, 238, 233, 0.38);\n  --a2-accent: #FF7A45;\n  --a2-accent-hover: #FF8B5C;\n  --a2-accent-pressed: #EB6630;\n  --a2-accent-soft: rgba(255, 122, 69, 0.16);\n  --a2-on-accent: #2A1004;\n  --a2-accent-container: #5C2B14;\n  --a2-on-accent-container: #FFDCCD;\n  --a2-tonal: #473B33;\n  --a2-on-tonal: #F6E2D6;\n  --a2-text: #F3EEE9;\n  --a2-text-muted: rgba(243, 238, 233, 0.62);\n  --a2-text-faint: rgba(243, 238, 233, 0.34);\n  --a2-danger: #FF6B66;\n  --a2-on-danger: #2D0706;\n  --a2-success: #5CCB8A;\n  --a2-warning: #F4B740;\n  --a2-shadow: 0 14px 40px rgba(0, 0, 0, 0.45), 0 3px 10px rgba(0, 0, 0, 0.28);\n  --a2-shadow-sm: 0 2px 6px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.24);\n  --a2-scrim: rgba(10, 9, 8, 0.58);\n  --a2-tip: #EDE6DF;\n  --a2-on-tip: #25201C;\n  --a2-tip-accent: #B8460F;\n}\n\n/* 밝은 화면 */\n[data-a2-theme="light"] {\n  color-scheme: light;\n  --a2-bg: #FBF8F4;\n  --a2-surface: #F3EEE8;\n  --a2-surface-high: #ECE6DF;\n  --a2-surface-highest: #E4DDD5;\n  --a2-raised: #FFFFFF;\n  --a2-fill: rgba(41, 35, 31, 0.055); --a2-fill-hover: rgba(41, 35, 31, 0.09); --a2-fill-active: rgba(41, 35, 31, 0.14);\n  --a2-line: rgba(41, 35, 31, 0.18); --a2-line-strong: rgba(41, 35, 31, 0.44);\n  --a2-accent: #E65C22;\n  --a2-accent-hover: #F26A32;\n  --a2-accent-pressed: #CC4E18;\n  --a2-accent-soft: rgba(230, 92, 34, 0.13);\n  --a2-on-accent: #FFFFFF;\n  --a2-accent-container: #FFDCCD;\n  --a2-on-accent-container: #3A1403;\n  --a2-tonal: #EFDDD2;\n  --a2-on-tonal: #2C1E16;\n  --a2-text: #29231F;\n  --a2-text-muted: rgba(41, 35, 31, 0.64);\n  --a2-text-faint: rgba(41, 35, 31, 0.36);\n  --a2-danger: #D03A36;\n  --a2-on-danger: #FFFFFF;\n  --a2-success: #1F8F52;\n  --a2-warning: #B87A0A;\n  --a2-shadow: 0 14px 40px rgba(60, 40, 20, 0.16), 0 3px 10px rgba(60, 40, 20, 0.1);\n  --a2-shadow-sm: 0 2px 6px rgba(60, 40, 20, 0.12), 0 1px 2px rgba(60, 40, 20, 0.1);\n  --a2-scrim: rgba(40, 30, 20, 0.34);\n  --a2-tip: #322B26;\n  --a2-on-tip: #FBF8F4;\n  --a2-tip-accent: #FFA27A;\n}\n\n/* 바다 */\n[data-a2-theme="ocean"] {\n  color-scheme: dark;\n  --a2-bg: #14181E;\n  --a2-surface: #1D232B;\n  --a2-surface-high: #262D37;\n  --a2-surface-highest: #303947;\n  --a2-raised: #262D37;\n  --a2-fill: rgba(237, 241, 246, 0.07); --a2-fill-hover: rgba(237, 241, 246, 0.11); --a2-fill-active: rgba(237, 241, 246, 0.16);\n  --a2-line: rgba(237, 241, 246, 0.16); --a2-line-strong: rgba(237, 241, 246, 0.38);\n  --a2-accent: #6FA5FF;\n  --a2-accent-hover: #86B3FF;\n  --a2-accent-pressed: #5890EE;\n  --a2-accent-soft: rgba(111, 165, 255, 0.17);\n  --a2-on-accent: #06203F;\n  --a2-accent-container: #1B3D6E;\n  --a2-on-accent-container: #D7E5FF;\n  --a2-tonal: #33404F;\n  --a2-on-tonal: #DCE7F5;\n  --a2-text: #EDF1F6;\n  --a2-text-muted: rgba(237, 241, 246, 0.62);\n  --a2-text-faint: rgba(237, 241, 246, 0.34);\n  --a2-danger: #FF6F69;\n  --a2-on-danger: #2D0706;\n  --a2-success: #4FC68A;\n  --a2-warning: #F1B643;\n  --a2-shadow: 0 14px 40px rgba(0, 0, 0, 0.5), 0 3px 10px rgba(0, 0, 0, 0.32);\n  --a2-shadow-sm: 0 2px 6px rgba(0, 0, 0, 0.34), 0 1px 2px rgba(0, 0, 0, 0.26);\n  --a2-scrim: rgba(5, 8, 12, 0.58);\n  --a2-tip: #E3E9F1;\n  --a2-on-tip: #1A2029;\n  --a2-tip-accent: #2F62B8;\n}\n\n/* 정의되기 전에는 숨겨서 깜빡임을 막는다 */\n:is(a2-button, a2-split-button, a2-fab, a2-input, a2-textarea, a2-number, a2-select, a2-checkbox, a2-switch, a2-radio-group, a2-slider,\n    a2-segmented, a2-chip, a2-tabs, a2-color, a2-keybind, a2-card, a2-badge, a2-progress, a2-spinner, a2-dialog, a2-drawer, a2-menu):not(:defined) {\n  visibility: hidden;\n}\na2-option, a2-segment, a2-menu-item, a2-fab-item, a2-tab-panel { display: none; }\na2-tab-panel[data-on] { display: block; }\n\n@media (prefers-reduced-motion: reduce) { :root { --a2-speed: 1000; } }\n';

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
  /* 스프링 전환: transition: transform var(--snap) 처럼 쓴다 */
  --snap: calc(var(--a2-d-snap) / var(--a2-speed)) var(--a2-e-snap);
  --move: calc(var(--a2-d-move) / var(--a2-speed)) var(--a2-e-move);
  --slow: calc(var(--a2-d-slow) / var(--a2-speed)) var(--a2-e-slow);
  --fx: calc(var(--a2-d-fx) / var(--a2-speed)) var(--a2-e-fx); }
:host([hidden]) { display: none !important; }
*, *::before, *::after { box-sizing: border-box; }
button { font: inherit; color: inherit; letter-spacing: inherit; background: none; border: 0; padding: 0; margin: 0; cursor: pointer; touch-action: manipulation; }
input, textarea { font: inherit; color: inherit; letter-spacing: inherit; }
:focus { outline: none; }
:focus-visible { outline: 2px solid var(--a2-accent); outline-offset: 3px; }
svg { display: block; }
/* 작은 버튼의 누르는 범위를 보이는 것보다 넓힌다 */
.hit { position: relative; }
.hit::before { content: ''; position: absolute; inset: -7px; }
.t { padding-top: 0.12em; }   /* 지마켓 산스가 살짝 위로 떠 보이는 것 보정 */
/* 라벨·도움말 */
.label { display: flex; align-items: baseline; gap: 6px; margin-bottom: 8px; font-size: var(--a2-fs-sm); color: var(--a2-text-muted); }
.label:empty { display: none; }
.req { color: var(--a2-accent); }
.hint { margin: 6px 14px 0; font-size: var(--a2-fs-sm); color: var(--a2-text-muted); line-height: 1.45; }
.hint:empty { display: none; }
.hint.error { color: var(--a2-danger); }
:host([disabled]) { opacity: 0.42; pointer-events: none; }
/* 누른 자리에서 퍼지는 물결 */
.rp-box { position: absolute; inset: 0; border-radius: inherit; overflow: hidden; pointer-events: none; }
.rp { position: absolute; border-radius: 50%; background: currentColor; opacity: 0.14; pointer-events: none; }
`;
  function ripple(surface) {
    let box = null;
    surface.addEventListener("pointerdown", (e) => {
      if (e.button !== 0) return;
      if (!box) {
        box = document.createElement("span");
        box.className = "rp-box";
        surface.prepend(box);
      }
      const r = surface.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      const size = 2 * Math.hypot(Math.max(x, r.width - x), Math.max(y, r.height - y));
      const dot = document.createElement("span");
      dot.className = "rp";
      dot.style.cssText = `width:${size}px;height:${size}px;left:${x - size / 2}px;top:${y - size / 2}px`;
      box.append(dot);
      const grow = dot.animate([{ transform: "scale(0.12)" }, { transform: "scale(1)" }], { duration: 420, easing: "cubic-bezier(0.2, 0, 0, 1)", fill: "forwards" });
      let gone = false;
      const off = () => {
        if (gone) return;
        gone = true;
        removeEventListener("pointerup", off, true);
        removeEventListener("pointercancel", off, true);
        const out = () => {
          const a = dot.animate([{ opacity: 0.14 }, { opacity: 0 }], { duration: 260, fill: "forwards" });
          a.onfinish = a.oncancel = () => dot.remove();
        };
        if (grow.currentTime != null && grow.currentTime < 180) setTimeout(out, 180 - grow.currentTime);
        else out();
        setTimeout(() => dot.remove(), 900);
      };
      addEventListener("pointerup", off, true);
      addEventListener("pointercancel", off, true);
    });
  }
  var ICONS = {
    check: ["0 0 448 512", "M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"],
    chevron: ["0 0 512 512", "M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"],
    x: ["0 0 384 512", "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"],
    minus: ["0 0 448 512", "M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"],
    plus: ["0 0 448 512", "M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"],
    search: ["0 0 512 512", "M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"],
    eye: ["0 0 576 512", "M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"],
    eyeOff: ["0 0 640 512", "M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"],
    info: ["0 0 512 512", "M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"],
    success: ["0 0 512 512", "M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"],
    warning: ["0 0 512 512", "M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480L40 480c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24s24-10.7 24-24l0-112c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"],
    danger: ["0 0 512 512", "M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"]
  };
  var addIcon = (name, viewBox, d) => {
    ICONS[name] = [viewBox, d];
  };
  var icon = (name, size = 16) => {
    const [box, d] = ICONS[name] || ["0 0 16 16", ""];
    return `<svg width="${size}" height="${size}" viewBox="${box}" fill="currentColor" aria-hidden="true"><path d="${d}"/></svg>`;
  };
  var esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  var A2Element = class extends HTMLElement {
    static styles = "";
    static delegatesFocus = false;
    constructor() {
      super();
      ensureGlobal();
      this.root = this.attachShadow({ mode: "open", delegatesFocus: this.constructor.delegatesFocus });
      const C = this.constructor;
      if (!Object.prototype.hasOwnProperty.call(C, "_sheets")) C._sheets = [sheet(BASE_CSS), sheet(C.styles)];
      this.root.adoptedStyleSheets = C._sheets;
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
  var define = (name, cls) => {
    if (!customElements.get(name)) customElements.define(name, cls);
  };

  // src/elements/button.js
  var BUTTON_CSS = `
.b {
  position: relative; isolation: isolate; display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  height: var(--a2-h); min-width: var(--a2-h); padding: 0 calc(var(--a2-h) * 0.42); white-space: nowrap; user-select: none;
  font-weight: var(--a2-weight-strong); color: var(--fg);
  --r: calc(var(--a2-h) / 2); --rp: var(--a2-r-sm);
  --bg: transparent; --bd: var(--a2-line-strong); --fg: var(--a2-text); --hv: var(--a2-fill);
  border-radius: var(--r);
  transition: border-radius var(--snap), color var(--fx);
}
/* 누르는 범위는 보이는 면보다 사방으로 5px 넓다 */
.b::before { content: ''; position: absolute; inset: -5px; z-index: -1; }
.face {
  position: absolute; inset: 0; z-index: -1; border-radius: inherit; background: var(--bg); border: 1px solid var(--bd); pointer-events: none;
  transition: background-color var(--fx), border-color var(--fx), box-shadow var(--fx);
}
.face::after { content: ''; position: absolute; inset: -1px; border-radius: inherit; background: var(--hv); opacity: 0; transition: opacity var(--fx); }
.b:hover .face::after { opacity: 1; }
.b:active { border-radius: var(--rp); }
.rp-box { z-index: -1; }
:host([shape="square"]) .b { --r: var(--a2-r-md); --rp: var(--a2-r-xs); }
:host([variant="primary"]) .b { --bg: var(--a2-accent); --bd: transparent; --fg: var(--a2-on-accent); --hv: rgba(255, 255, 255, 0.12); }
:host([variant="tonal"]) .b, :host([variant="soft"]) .b { --bg: var(--a2-tonal); --bd: transparent; --fg: var(--a2-on-tonal); --hv: var(--a2-fill); }
:host([variant="ghost"]) .b { --bd: transparent; --fg: var(--a2-accent); --hv: var(--a2-accent-soft); }
:host([variant="elevated"]) .b { --bg: var(--a2-surface-high); --bd: transparent; --fg: var(--a2-accent); }
:host([variant="elevated"]) .face { box-shadow: var(--a2-shadow-sm); }
:host([variant="danger"]) .b { --bg: var(--a2-danger); --bd: transparent; --fg: var(--a2-on-danger); --hv: rgba(255, 255, 255, 0.12); }
/* 켜고 끄는 버튼: 켜지면 색이 차고 모양이 반대로 바뀐다 */
:host([selected]) .b { --bg: var(--a2-accent); --bd: transparent; --fg: var(--a2-on-accent); --hv: rgba(255, 255, 255, 0.12); --r: var(--a2-r-md); --rp: var(--a2-r-xs); }
:host([selected][shape="square"]) .b { --r: calc(var(--a2-h) / 2); --rp: var(--a2-r-sm); }
:host([size="xs"]) { --a2-h: 30px; --a2-fs: 12.5px; }
:host([size="sm"]) { --a2-h: 36px; --a2-fs: 13px; }
:host([size="lg"]) { --a2-h: 56px; --a2-fs: 16px; }
:host([size="xl"]) { --a2-h: 76px; --a2-fs: 20px; }
:host([size="lg"]) .b { --rp: var(--a2-r-md); gap: 10px; }
:host([size="xl"]) .b { --rp: var(--a2-r-lg); gap: 12px; }
.b.square { padding: 0; width: var(--a2-h); }
.lbl { display: inline-flex; align-items: center; gap: 8px; }
::slotted(svg), ::slotted(i) { flex: none; }
`;
  var A2Button = class extends A2Element {
    static formAssociated = true;
    static delegatesFocus = true;
    static observedAttributes = ["disabled", "loading", "type", "selected", "toggle"];
    static styles = `${BUTTON_CSS}
:host { display: inline-flex; vertical-align: middle; }
:host([block]) { display: flex; }
:host([block]) .b { width: 100%; }
.spin { display: none; position: absolute; width: 18px; height: 18px; border-radius: 50%; border: 2px solid currentColor; border-right-color: transparent; }
:host([loading]) .spin { display: block; animation: a2spin calc(0.75s / var(--a2-speed)) linear infinite; }
:host([loading]) .lbl, :host([loading]) slot[name] { visibility: hidden; }
:host([loading]) .b { pointer-events: none; }
@keyframes a2spin { to { rotate: 360deg; } }
`;
    render() {
      this.root.innerHTML = `<button class="b" part="base" type="button"><span class="face" part="face"></span><span class="spin" aria-hidden="true"></span><slot name="prefix"></slot><span class="lbl t"><slot></slot></span><slot name="suffix"></slot></button>`;
      this.btn = this.$("button");
      ripple(this.btn);
      this.btn.addEventListener("click", (e) => {
        if (this.disabled || this.bool("loading")) {
          e.preventDefault();
          e.stopImmediatePropagation();
          return;
        }
        if (this.bool("toggle")) {
          this.selected = !this.selected;
          this.fire("change");
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
      if (this.bool("toggle")) this.btn.setAttribute("aria-pressed", String(this.selected));
      else this.btn.removeAttribute("aria-pressed");
      const text = [...this.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim() || n.nodeType === 1 && !n.slot && !/^(svg|i)$/i.test(n.tagName));
      this.btn.classList.toggle("square", !text);
      if (this.hasAttribute("label")) this.btn.setAttribute("aria-label", this.getAttribute("label"));
    }
    get loading() {
      return this.bool("loading");
    }
    set loading(v) {
      this.setBool("loading", v);
    }
    get selected() {
      return this.bool("selected");
    }
    set selected(v) {
      this.setBool("selected", v);
    }
    click() {
      this.btn ? this.btn.click() : super.click();
    }
  };
  var A2SplitButton = class extends A2Element {
    static delegatesFocus = true;
    static observedAttributes = ["disabled", "open"];
    static styles = `${BUTTON_CSS}
:host { display: inline-flex; vertical-align: middle; gap: 2px; }
.b { --bg: var(--a2-tonal); --bd: transparent; --fg: var(--a2-on-tonal); }
:host([variant="primary"]) .b { --hv: rgba(255, 255, 255, 0.12); }
.lead { border-radius: var(--r) var(--in) var(--in) var(--r); --in: 6px; transition: border-radius var(--snap); }
.lead:active { --in: 14px; border-radius: var(--r) var(--in) var(--in) var(--r); }
.trail { padding: 0; width: calc(var(--a2-h) * 0.95); border-radius: var(--in) var(--r) var(--r) var(--in); --in: 6px; transition: border-radius var(--snap), width var(--snap); }
.trail:active { --in: 14px; border-radius: var(--in) var(--r) var(--r) var(--in); }
:host([open]) .trail { --in: var(--r); width: var(--a2-h); }
.chev { transition: transform var(--move); }
:host([open]) .chev { transform: rotate(180deg); }
`;
    render() {
      this.root.innerHTML = `<button class="b lead" part="base" type="button"><span class="face"></span><slot name="prefix"></slot><span class="lbl t"><slot></slot></span></button><button class="b trail" part="toggle" type="button" aria-haspopup="menu" aria-label="더 보기"><span class="face"></span><span class="chev">${icon("chevron", 12)}</span></button>`;
      this.lead = this.$(".lead");
      this.trail = this.$(".trail");
      ripple(this.lead);
      ripple(this.trail);
      this.trail.addEventListener("click", (e) => {
        e.stopPropagation();
        const m = this.menuEl;
        if (!m) {
          this.setBool("open", !this.bool("open"));
          this.emit("a2-toggle", { open: this.bool("open") });
          return;
        }
        if (m.isOpen) {
          m.close();
          return;
        }
        this.setBool("open", true);
        m.show(this.trail);
        m.addEventListener("a2-close", () => this.setBool("open", false), { once: true });
      });
    }
    get menuEl() {
      const id = this.getAttribute("menu");
      return id ? document.getElementById(id) : null;
    }
    update() {
      this.lead.disabled = this.trail.disabled = this.disabled;
      this.trail.setAttribute("aria-expanded", String(this.bool("open")));
    }
  };
  var A2FabItem = class extends HTMLElement {
    get value() {
      return this.getAttribute("value") ?? this.textContent.trim();
    }
  };
  var A2Fab = class extends A2Element {
    static delegatesFocus = true;
    static observedAttributes = ["label", "extended", "open", "disabled"];
    static styles = `
:host { position: relative; display: inline-flex; vertical-align: middle; --a2-h: 56px; --bg: var(--a2-accent-container); --fg: var(--a2-on-accent-container); }
:host([size="sm"]) { --a2-h: 44px; }
:host([size="lg"]) { --a2-h: 76px; }
:host([variant="primary"]) { --bg: var(--a2-accent); --fg: var(--a2-on-accent); }
:host([variant="tonal"]) { --bg: var(--a2-tonal); --fg: var(--a2-on-tonal); }
.f {
  position: relative; isolation: isolate; display: inline-flex; align-items: center; justify-content: center; gap: 10px; height: var(--a2-h); min-width: var(--a2-h); padding: 0;
  border-radius: calc(var(--a2-h) * 0.3); background: var(--bg); color: var(--fg); box-shadow: var(--a2-shadow-sm); font-weight: var(--a2-weight-strong); white-space: nowrap; user-select: none;
  transition: border-radius var(--snap), background-color var(--fx), color var(--fx), box-shadow var(--fx), transform var(--snap);
}
.f::before { content: ''; position: absolute; inset: -5px; z-index: -1; }
.f:hover { box-shadow: var(--a2-shadow); }
.f:active { border-radius: calc(var(--a2-h) * 0.2); transform: scale(0.96); }
.rp-box { z-index: -1; }
:host([extended]) .f { padding: 0 calc(var(--a2-h) * 0.36); }
.ic { display: grid; place-items: center; transition: transform var(--move); }
.txt { display: none; }
:host([extended]) .txt { display: block; }
/* 펼쳤을 때: 동그랗게, 강조색으로, + 가 돌아 × 가 된다 */
:host([open]) .f { border-radius: 50%; background: var(--a2-accent); color: var(--a2-on-accent); padding: 0; }
:host([open]) .ic { transform: rotate(135deg); }
:host([open]) .txt { display: none; }
.list { position: absolute; right: 0; bottom: calc(100% + 10px); display: flex; flex-direction: column-reverse; align-items: flex-end; gap: 6px; pointer-events: none; }
:host([align="start"]) .list { right: auto; left: 0; align-items: flex-start; }
.it {
  display: inline-flex; align-items: center; gap: 10px; height: 52px; padding: 0 22px; border-radius: 26px; background: var(--a2-accent-container); color: var(--a2-on-accent-container);
  font-weight: var(--a2-weight-strong); white-space: nowrap; box-shadow: var(--a2-shadow-sm);
  transform-origin: 100% 100%; transform: translateY(24px) scale(0.5); opacity: 0; visibility: hidden;
  transition: transform var(--fx), opacity var(--fx), visibility 0s linear calc(var(--a2-d-fx) / var(--a2-speed)), border-radius var(--snap);
}
:host([align="start"]) .it { transform-origin: 0 100%; }
.it:active { border-radius: var(--a2-r-md); }
:host([open]) .list { pointer-events: auto; }
:host([open]) .it { transform: none; opacity: 1; visibility: visible; transition: transform var(--move), opacity var(--fx), visibility 0s, border-radius var(--snap); transition-delay: calc(var(--i) * 45ms / var(--a2-speed)), calc(var(--i) * 45ms / var(--a2-speed)), 0s, 0s; }
.it svg, .it i { flex: none; }
`;
    render() {
      this.root.innerHTML = `<div class="list" part="list" role="menu"></div><button class="f" part="base" type="button"><span class="ic"><slot name="icon">${icon("plus", 18)}</slot></span><span class="txt t"></span></button>`;
      this.btn = this.$(".f");
      this.list = this.$(".list");
      ripple(this.btn);
      this.btn.addEventListener("click", (e) => {
        if (this.items.length) {
          e.stopPropagation();
          this.open = !this.open;
        }
      });
      this.list.addEventListener("click", (e) => {
        const it = e.target.closest(".it");
        if (!it) return;
        e.stopPropagation();
        const item = this.items[+it.dataset.i];
        this.open = false;
        item.dispatchEvent(new CustomEvent("a2-select", { bubbles: true, composed: true, detail: { value: item.value, item } }));
      });
      this._out = (e) => {
        if (!e.composedPath().includes(this)) this.open = false;
      };
      this._key = (e) => {
        if (e.key === "Escape") {
          e.stopPropagation();
          this.open = false;
          this.btn.focus();
        }
      };
      new MutationObserver(() => this.paintItems()).observe(this, { childList: true, subtree: true, characterData: true });
      this.paintItems();
    }
    get items() {
      return [...this.querySelectorAll(":scope > a2-fab-item")];
    }
    get open() {
      return this.bool("open");
    }
    set open(v) {
      this.setBool("open", v);
    }
    paintItems() {
      this.list.innerHTML = this.items.map((c, i) => {
        const ic = c.querySelector("svg, i");
        const text = [...c.childNodes].filter((n) => n !== ic).map((n) => n.textContent).join("").trim();
        return `<button class="it" type="button" role="menuitem" data-i="${i}" style="--i:${i}">${ic ? ic.outerHTML : ""}<span class="t">${esc(text)}</span></button>`;
      }).join("");
    }
    attr(name, v) {
      if (name === "open") {
        document.removeEventListener("pointerdown", this._out, true);
        removeEventListener("keydown", this._key, true);
        if (v != null) {
          document.addEventListener("pointerdown", this._out, true);
          addEventListener("keydown", this._key, true);
        }
        this.emit("a2-toggle", { open: v != null });
      }
      this.update();
    }
    disconnectedCallback() {
      document.removeEventListener("pointerdown", this._out, true);
      removeEventListener("keydown", this._key, true);
    }
    update() {
      this.btn.disabled = this.disabled;
      this.$(".txt").textContent = this.str("label");
      this.btn.setAttribute("aria-label", this.str("label", "더 보기"));
      if (this.items.length) this.btn.setAttribute("aria-expanded", String(this.open));
      for (const b of this.list.children) b.tabIndex = this.open ? 0 : -1;
    }
  };
  define("a2-button", A2Button);
  define("a2-split-button", A2SplitButton);
  define("a2-fab-item", A2FabItem);
  define("a2-fab", A2Fab);

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
    static formAssociated = true;
    static observedAttributes = ["label", "hint", "value", "disabled", "multiple"];
    static styles = `
:host { display: inline-block; vertical-align: middle; max-width: 100%; }
:host([block]) { display: block; }
:host([size="sm"]) { --a2-h: 36px; --a2-fs: 13px; }
:host([size="lg"]) { --a2-h: 56px; --a2-fs: 16px; }
.bar { display: inline-flex; gap: 2px; max-width: 100%; }
:host([block]) .bar { display: flex; }
.seg {
  position: relative; isolation: isolate; flex: 1 0 auto; height: var(--a2-h); min-width: calc(var(--a2-h) * 1.1); padding: 0.12em calc(var(--a2-h) * 0.36) 0;
  color: var(--a2-on-tonal); white-space: nowrap; user-select: none;
  --in: 7px; --out: calc(var(--a2-h) / 2); border-radius: var(--in);
  transition: border-radius var(--snap), width var(--snap), color var(--fx);
}
.seg:first-of-type { border-radius: var(--out) var(--in) var(--in) var(--out); }
.seg:last-of-type { border-radius: var(--in) var(--out) var(--out) var(--in); }
.seg:only-of-type { border-radius: var(--out); }
.face { position: absolute; inset: 0; z-index: -1; border-radius: inherit; background: var(--a2-tonal); transition: background-color var(--fx); pointer-events: none; }
.face::after { content: ''; position: absolute; inset: 0; border-radius: inherit; background: var(--a2-fill); opacity: 0; transition: opacity var(--fx); }
.seg:hover .face::after { opacity: 1; }
.rp-box { z-index: -1; }
.seg:active { --in: 14px; }
/* 고른 칸: 강조색, 네 귀가 모두 둥글다 */
.seg[aria-checked="true"] { color: var(--a2-on-accent); font-weight: var(--a2-weight-strong); border-radius: var(--out) !important; }
.seg[aria-checked="true"] .face { background: var(--a2-accent); }
.seg:disabled { opacity: 0.4; cursor: default; }
.seg:focus-visible { z-index: 1; }
`;
    render() {
      this.root.innerHTML = `<div class="label t" part="label"></div><div class="bar" part="base"></div><div class="hint t" part="hint"></div>`;
      this.bar = this.$(".bar");
      this._init = this.getAttribute("value");
      this.bar.addEventListener("click", (e) => {
        const b = e.target.closest(".seg");
        if (b) this.pick(b.dataset.v, true);
      });
      this.bar.addEventListener("pointerdown", (e) => {
        const b = e.target.closest(".seg");
        if (b && e.button === 0) this.squeeze(b);
      });
      this.bar.addEventListener("keydown", (e) => {
        const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
        if (!d) return;
        e.preventDefault();
        const bs = [...this.bar.querySelectorAll(".seg:not(:disabled)")], i = bs.indexOf(this.root.activeElement);
        const n = bs[(i + d + bs.length) % bs.length];
        if (n) {
          n.focus();
          if (!this.multiple) this.pick(n.dataset.v, true);
        }
      });
      new MutationObserver(() => this.build()).observe(this, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["disabled", "value"] });
      this.build();
    }
    get multiple() {
      return this.bool("multiple");
    }
    get segments() {
      return [...this.querySelectorAll("a2-segment")];
    }
    get value() {
      return this.multiple ? [...this._sel] : this._sel[0] ?? "";
    }
    set value(v) {
      this.setAttribute("value", Array.isArray(v) ? v.join(",") : v);
    }
    parse(v) {
      return v == null || v === "" ? [] : this.multiple ? String(v).split(",").map((s) => s.trim()).filter(Boolean) : [String(v)];
    }
    build() {
      const segs = this.segments;
      if (!this._sel) this._sel = this.parse(this.getAttribute("value"));
      this._sel = this._sel.filter((v) => segs.some((s) => s.value === v));
      if (!this._sel.length && !this.multiple) {
        const f = segs.find((s) => !s.disabled);
        if (f) this._sel = [f.value];
      }
      this.bar.textContent = "";
      for (const s of segs) {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "seg";
        b.dataset.v = s.value;
        b.innerHTML = `<span class="face"></span>${s.innerHTML}`;
        b.disabled = s.disabled;
        ripple(b);
        this.bar.append(b);
      }
      this.sync();
    }
    /** 누르는 칸은 넓어지고, 바로 옆 칸이 그만큼 좁아진다(묶음 전체 너비는 그대로) */
    squeeze(b) {
      const all = [...this.bar.querySelectorAll(".seg")], i = all.indexOf(b);
      const w = all.map((x) => x.getBoundingClientRect().width);
      const near = [all[i - 1], all[i + 1]].filter(Boolean);
      if (!near.length) return;
      const grow = Math.min(18, w[i] * 0.22);
      all.forEach((x, k) => {
        x.style.flex = "none";
        x.style.width = `${w[k]}px`;
      });
      b.offsetWidth;
      b.style.width = `${w[i] + grow}px`;
      for (const n of near) n.style.width = `${w[all.indexOf(n)] - grow / near.length}px`;
      const up = () => {
        removeEventListener("pointerup", up, true);
        removeEventListener("pointercancel", up, true);
        all.forEach((x, k) => {
          x.style.width = `${w[k]}px`;
        });
        clearTimeout(this._sq);
        this._sq = setTimeout(() => all.forEach((x) => {
          x.style.width = "";
          x.style.flex = "";
        }), 700);
      };
      clearTimeout(this._sq);
      addEventListener("pointerup", up, true);
      addEventListener("pointercancel", up, true);
    }
    pick(v, user) {
      if (this.multiple) {
        const i = this._sel.indexOf(v);
        if (i >= 0) this._sel.splice(i, 1);
        else this._sel.push(v);
      } else {
        if (this._sel[0] === v) return;
        this._sel = [v];
      }
      this.sync();
      if (user) {
        this.fire("input");
        this.fire("change");
      }
    }
    sync() {
      const multi = this.multiple;
      this.bar.setAttribute("role", multi ? "group" : "radiogroup");
      let first = true;
      for (const b of this.bar.querySelectorAll(".seg")) {
        const on = this._sel.includes(b.dataset.v);
        b.setAttribute("role", multi ? "checkbox" : "radio");
        b.setAttribute("aria-checked", String(on));
        b.tabIndex = multi || on || first && !this._sel.length ? 0 : -1;
        first = false;
      }
      const fd = new FormData();
      if (this.name) for (const v of this._sel) fd.append(this.name, v);
      this.internals.setFormValue(multi ? fd : this._sel[0] ?? null);
    }
    attr(name, v) {
      if (name === "value") {
        const nv = this.parse(v);
        if (nv.join() !== this._sel.join()) {
          this._sel = nv;
          this.sync();
        }
      } else this.update();
    }
    update() {
      this.paintField();
      if (this.hasAttribute("label")) this.bar.setAttribute("aria-label", this.str("label"));
      if (this.disabled) for (const b of this.bar.querySelectorAll(".seg")) b.disabled = true;
    }
    formResetCallback() {
      this._sel = this.parse(this._init);
      if (!this._sel.length && !this.multiple && this.segments[0]) this._sel = [this.segments[0].value];
      this.sync();
    }
  };
  define("a2-segment", A2Segment);
  define("a2-segmented", A2Segmented);

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
  var dog = 0;
  function frame(now) {
    raf = 0;
    last = now;
    for (const a of [...running]) a.step(now);
    if (running.size) raf = requestAnimationFrame(frame);
    else if (dog) {
      clearInterval(dog);
      dog = 0;
    }
  }
  function wake() {
    if (!raf) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
    if (!dog) dog = setInterval(() => {
      if (running.size && performance.now() - last > 120) {
        cancelAnimationFrame(raf);
        raf = 0;
        frame(performance.now());
      }
    }, 100);
  }
  if (typeof document !== "undefined") document.addEventListener("visibilitychange", () => {
    if (document.hidden) for (const a of [...running]) a.finish();
  });
  var spd = 1;
  var spdAt = -1e9;
  function speed() {
    const now = performance.now();
    if (now - spdAt > 400) {
      const v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--a2-speed"));
      spd = Number.isFinite(v) && v > 0 ? v : 1;
      spdAt = now;
    }
    return spd;
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
  function reveal(el, p, from = "bottom") {
    if (p >= 1) {
      el.style.transform = "";
      el.style.clipPath = "";
      return;
    }
    const q = (1 - p) * 100;
    if (from === "top") {
      el.style.transform = `translateY(${-q}%)`;
      el.style.clipPath = `inset(${q}% -80px -80px -80px)`;
    } else {
      el.style.transform = `translateY(${q}%)`;
      el.style.clipPath = `inset(-80px -80px ${q}% -80px)`;
    }
  }

  // src/core/spring.js
  var motion = { bounce: 1 };
  var SPRINGS = {
    snap: { k: 800, z: 0.6 },
    // 작은 것: 손잡이, 누름
    move: { k: 380, z: 0.72 },
    // 보통: 선택 표시, 판
    slow: { k: 200, z: 0.8 },
    // 큰 것: 서랍, 화면
    fx: { k: 1600, z: 1 },
    // 색·투명도처럼 튕기면 안 되는 것
    fxFast: { k: 3800, z: 1 }
  };
  var cfgOf = (c) => typeof c === "string" ? SPRINGS[c] || SPRINGS.move : c;
  var zOf = (c) => Math.min(1, Math.max(0.2, 1 - (1 - c.z) * motion.bounce));
  var active = /* @__PURE__ */ new Set();
  var raf2 = 0;
  var last2 = 0;
  var dog2 = 0;
  var still = () => typeof document === "undefined" || document.hidden || speed() >= 100;
  function frame2(now) {
    raf2 = 0;
    const dt = Math.min(1, Math.max(1e-3, (now - last2) / 1e3));
    last2 = now;
    for (const s of [...active]) s.step(dt);
    if (active.size) raf2 = requestAnimationFrame(frame2);
    else if (dog2) {
      clearInterval(dog2);
      dog2 = 0;
    }
  }
  function wake2() {
    if (!raf2) {
      last2 = performance.now();
      raf2 = requestAnimationFrame(frame2);
    }
    if (!dog2) dog2 = setInterval(() => {
      if (active.size && performance.now() - last2 > 120) {
        cancelAnimationFrame(raf2);
        raf2 = 0;
        frame2(performance.now());
      }
    }, 100);
  }
  if (typeof document !== "undefined") document.addEventListener("visibilitychange", () => {
    if (document.hidden) for (const s of [...active]) {
      s.jump(s.to);
      s.rest && s.rest();
    }
  });
  var Spring = class {
    /**
     * @param {number} value 처음 값
     * @param {string|{k:number,z:number}} cfg 스프링 종류
     * @param {(x:number, s:Spring)=>void} onUpdate
     * @param {number} eps 이만큼 가까워지면 멈춘다(px 는 0.05, 0~1 값은 0.001 정도)
     */
    constructor(value = 0, cfg = "move", onUpdate, eps = 0.05) {
      this.x = value;
      this.to = value;
      this.v = 0;
      this.cfg = cfg;
      this.on = onUpdate;
      this.eps = eps;
      this.rest = null;
    }
    /** 목표를 바꾼다. o.velocity 로 처음 속도(끌다 놓았을 때 등)를 줄 수 있다 */
    set(to, o) {
      if (o) {
        if (o.cfg) this.cfg = o.cfg;
        if (o.velocity != null) this.v = o.velocity;
      }
      this.to = to;
      if (o && o.instant || still()) {
        const was = this.x !== to || active.has(this);
        this.jump(to);
        if (was && this.rest) this.rest();
        return this;
      }
      if (!active.has(this)) {
        active.add(this);
        wake2();
      }
      return this;
    }
    /** 바로 그 값으로(rest 는 부르지 않는다) */
    jump(x) {
      this.x = this.to = x;
      this.v = 0;
      active.delete(this);
      this.on && this.on(x, this);
      return this;
    }
    stop() {
      active.delete(this);
      this.v = 0;
      return this;
    }
    get moving() {
      return active.has(this);
    }
    step(dt) {
      const c = cfgOf(this.cfg), sp2 = speed(), k = c.k * sp2 * sp2, d = 2 * zOf(c) * Math.sqrt(k);
      const n = Math.ceil(dt / 4e-3), h = dt / n;
      let { x, v } = this;
      const to = this.to;
      for (let i = 0; i < n; i++) {
        v += (-k * (x - to) - d * v) * h;
        x += v * h;
      }
      if (Math.abs(x - to) < this.eps && Math.abs(v) < this.eps * 40) {
        this.x = to;
        this.v = 0;
        active.delete(this);
        this.on && this.on(to, this);
        this.rest && this.rest();
        return;
      }
      this.x = x;
      this.v = v;
      this.on && this.on(x, this);
    }
  };
  function springs(init, cfg, onUpdate, eps) {
    const cur2 = { ...init }, map = {};
    let queued = false;
    const flush = () => {
      queued = false;
      onUpdate(cur2);
    };
    for (const k in init) map[k] = new Spring(init[k], cfg, (x) => {
      cur2[k] = x;
      if (!queued) {
        queued = true;
        queueMicrotask(flush);
      }
    }, eps);
    return {
      cur: cur2,
      map,
      set(to, o) {
        for (const k in to) map[k].set(to[k], o && o.velocity && typeof o.velocity === "object" ? { ...o, velocity: o.velocity[k] } : o);
        return this;
      },
      jump(to) {
        for (const k in to) map[k].jump(to[k]);
        return this;
      },
      get moving() {
        return Object.values(map).some((s) => s.moving);
      }
    };
  }
  var easeCache = /* @__PURE__ */ new Map();
  function springEase(cfg) {
    const key = typeof cfg === "string" ? `${cfg}:${motion.bounce}:${SPRINGS[cfg]?.k}:${SPRINGS[cfg]?.z}` : null;
    if (key && easeCache.has(key)) return easeCache.get(key);
    const out = computeEase(cfg);
    if (key) easeCache.set(key, out);
    return out;
  }
  function computeEase(cfg) {
    const c = cfgOf(cfg), k = c.k, d = 2 * zOf(c) * Math.sqrt(k), pts = [];
    let x = 0, v = 0, t = 0;
    const h = 1 / 600;
    for (let i = 0; i < 1800; i++) {
      if (i % 12 === 0) pts.push(x);
      v += (-k * (x - 1) - d * v) * h;
      x += v * h;
      t += h;
      if (i > 60 && Math.abs(x - 1) < 1e-3 && Math.abs(v) < 0.02) break;
    }
    pts.push(1);
    return { ease: `linear(${pts.map((p) => +p.toFixed(3)).join(",")})`, duration: +t.toFixed(3) };
  }
  var motionStyle = null;
  function installMotion() {
    if (typeof document === "undefined" || !(window.CSS && CSS.supports && CSS.supports("transition-timing-function", "linear(0, 1)"))) return;
    if (!motionStyle) {
      motionStyle = document.createElement("style");
      motionStyle.dataset.adas2Motion = "";
      document.head.append(motionStyle);
    }
    motionStyle.textContent = `:root{${["snap", "move", "slow", "fx"].map((n) => {
      const e = springEase(n);
      return `--a2-e-${n}:${e.ease};--a2-d-${n}:${e.duration}s`;
    }).join(";")}}`;
  }
  function setMotion(o = {}) {
    if (o.bounce != null) motion.bounce = Math.max(0, Math.min(1.6, +o.bounce));
    if (o.springs) for (const k in o.springs) SPRINGS[k] = { ...SPRINGS[k], ...o.springs[k] };
    installMotion();
    return { ...motion };
  }
  function drag(el, h) {
    el.addEventListener("pointerdown", (e) => {
      if (e.button !== 0) return;
      if (h.start && h.start(e) === false) return;
      const x0 = e.clientX, y0 = e.clientY, hist = [[x0, y0, e.timeStamp]];
      let moved = false;
      try {
        el.setPointerCapture(e.pointerId);
      } catch (_) {
      }
      const mv = (ev) => {
        const dx = ev.clientX - x0, dy = ev.clientY - y0;
        if (!moved && Math.hypot(dx, dy) > 3) moved = true;
        hist.push([ev.clientX, ev.clientY, ev.timeStamp]);
        if (hist.length > 6) hist.shift();
        h.move && h.move({ dx, dy, moved, e: ev });
      };
      const up = (ev) => {
        el.removeEventListener("pointermove", mv);
        el.removeEventListener("pointerup", up);
        el.removeEventListener("pointercancel", up);
        const a = hist[0], b = hist[hist.length - 1], dt = Math.max(1, b[2] - a[2]) / 1e3;
        const fresh = ev.timeStamp - b[2] < 80;
        h.end && h.end({ dx: ev.clientX - x0, dy: ev.clientY - y0, vx: fresh ? (b[0] - a[0]) / dt : 0, vy: fresh ? (b[1] - a[1]) / dt : 0, moved, cancelled: ev.type === "pointercancel", e: ev });
      };
      el.addEventListener("pointermove", mv);
      el.addEventListener("pointerup", up);
      el.addEventListener("pointercancel", up);
    });
  }
  var rubber = (over, range = 120) => over === 0 ? 0 : Math.sign(over) * range * (1 - 1 / (Math.abs(over) / range + 1));

  // src/elements/field.js
  var FIELD_CSS = `
:host { display: block; }
:host([size="sm"]) { --a2-h-field: 44px; --a2-fs: 13px; }
:host([size="lg"]) { --a2-h-field: 60px; --a2-fs: 16px; }
.f { position: relative; display: flex; align-items: center; gap: 10px; min-height: var(--a2-h-field); padding: 0 14px; cursor: text; --px: 0px; }
.ol {
  position: absolute; inset: -7px 0 0; margin: 0; padding: 0 10px; min-width: 0; text-align: left; pointer-events: none;
  border: 1px solid var(--a2-line-strong); border-radius: var(--a2-r-sm); background: transparent;
  transition: border-color var(--fx), background-color var(--fx);
}
.f:hover .ol { border-color: var(--a2-text-muted); }
.f:focus-within .ol, :host([open]) .ol { border-color: var(--a2-accent); border-width: 2px; padding: 0 9px; }
:host([error]) .ol { border-color: var(--a2-danger); }
legend { padding: 0; height: 14px; font-size: 0.86em; line-height: 14px; visibility: hidden; white-space: nowrap; overflow: hidden; max-width: 0.01px; transition: max-width var(--fx); }
legend span { display: inline-block; padding: 0 6px; }
legend:empty, legend.none { display: none; }
.up legend { max-width: 100%; }
.fl {
  position: absolute; left: 16px; top: 0; max-width: calc(100% - 32px); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; pointer-events: none;
  color: var(--a2-text-muted); transform-origin: 0 50%;
  transform: translate(var(--px), calc(var(--a2-h-field) / 2 - 50%));
  transition: transform var(--move), color var(--fx);
}
.fl:empty { display: none; }
.up .fl { transform: translate(0, -50%) scale(0.86); }
.f:focus-within .fl, :host([open]) .fl { color: var(--a2-accent); }
:host([error]) .fl { color: var(--a2-danger); }
.req { color: var(--a2-accent); margin-left: 2px; }
.ctl {
  position: relative; flex: 1; min-width: 0; height: var(--a2-h-field); padding: 0.12em 0 0; border: 0; outline: 0; background: transparent;
  color: var(--a2-text); caret-color: var(--a2-accent);
}
.ctl::placeholder { color: var(--a2-text-faint); transition: color var(--fx); }
.has-label:not(.up) .ctl::placeholder { color: transparent; }
.ctl::selection { background: var(--a2-accent-soft); }
.ctl:focus-visible { outline: 0; }
::slotted([slot="prefix"]), ::slotted([slot="suffix"]) { position: relative; color: var(--a2-text-muted); flex: none; }
.mini {
  flex: none; width: 28px; height: 28px; border-radius: 50%; display: none; place-items: center; color: var(--a2-text-muted);
  transition: background-color var(--fx), color var(--fx), transform var(--snap);
}
.mini:hover { background: var(--a2-fill-hover); color: var(--a2-text); }
.mini:active { transform: scale(0.86); }
.count { position: relative; flex: none; font-size: var(--a2-fs-sm); color: var(--a2-text-faint); padding-top: 0.12em; }
.count:empty { display: none; }
`;
  var BOX_CSS = `
.f { padding: 0; cursor: pointer; }
.box { position: relative; flex: 1; min-width: 0; display: flex; align-items: center; gap: 10px; min-height: var(--a2-h-field); padding: 6px 14px; text-align: left; border-radius: var(--a2-r-sm); }
.box:focus-visible { outline: 0; }
`;
  var boxShell = (inner) => `<div class="f" part="field"><fieldset class="ol" aria-hidden="true"><legend><span></span></legend></fieldset><label class="fl t" part="label"></label>${inner}</div><div class="hint t" part="hint"></div>`;
  function paintBox(el, up) {
    const lab = el.str("label"), f = el.$(".f");
    el.$(".fl").innerHTML = lab ? `${esc(lab)}${el.bool("required") ? '<span class="req">*</span>' : ""}` : "";
    el.$("legend span").textContent = lab ? `${lab}${el.bool("required") ? "*" : ""}` : "";
    el.$("legend").classList.toggle("none", !lab);
    f.classList.toggle("has-label", !!lab);
    f.classList.toggle("up", !!up);
    const hint = el.$(".hint"), err = el.getAttribute("error");
    hint.textContent = err || el.str("hint");
    hint.classList.toggle("error", !!err);
  }
  var fieldShell = (inner) => `<div class="f" part="box"><fieldset class="ol" aria-hidden="true"><legend><span></span></legend></fieldset><label class="fl t" part="label" for="f"></label>${inner}</div><div class="hint t" part="hint"></div>`;
  var FieldBase = class extends A2Element {
    static formAssociated = true;
    static delegatesFocus = true;
    bindField() {
      this.f = this.$(".f");
      this.f.addEventListener("pointerdown", (e) => {
        if (e.target === this.f || e.target.classList?.contains("fl")) {
          e.preventDefault();
          this.ctl.focus();
        }
      });
      this.ctl.addEventListener("focus", () => this.float());
      this.ctl.addEventListener("blur", () => this.float());
      const pre = this.root.querySelector("slot[name=prefix]");
      if (pre) pre.addEventListener("slotchange", () => {
        const w = pre.assignedElements().reduce((a, el) => a + el.getBoundingClientRect().width, 0);
        this.f.style.setProperty("--px", w ? `${w + 8}px` : "0px");
      });
    }
    /** 라벨을 위로 올릴지: 초점이 있거나 값이 있을 때 */
    float() {
      this.f.classList.toggle("up", this.root.activeElement === this.ctl || this.ctl.value !== "" || this.alwaysUp === true);
    }
    paintLabel() {
      const lab = this.str("label");
      this.$(".fl").innerHTML = lab ? `${esc(lab)}${this.bool("required") ? '<span class="req">*</span>' : ""}` : "";
      this.$("legend span").textContent = lab ? `${lab}${this.bool("required") ? "*" : ""}` : "";
      this.$("legend").classList.toggle("none", !lab);
      this.f.classList.toggle("has-label", !!lab);
      const hint = this.$(".hint"), err = this.getAttribute("error");
      hint.textContent = err || this.str("hint");
      hint.classList.toggle("error", !!err);
      if (lab) this.ctl.setAttribute("aria-label", lab);
    }
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
      this.float();
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
  var A2Input = class extends FieldBase {
    static observedAttributes = ["label", "hint", "error", "placeholder", "type", "disabled", "readonly", "required", "clearable", "maxlength", "minlength", "pattern", "autocomplete", "inputmode", "value"];
    static styles = FIELD_CSS;
    render() {
      this.root.innerHTML = fieldShell(`<slot name="prefix"></slot><input id="f" class="ctl" part="input"><button class="mini hit clear" type="button" tabindex="-1" aria-label="지우기">${icon("x", 12)}</button><button class="mini hit reveal" type="button" tabindex="-1" aria-label="보이기">${icon("eye", 15)}</button><slot name="suffix"></slot>`);
      this.ctl = this.$("input");
      this.ctl.value = this.str("value");
      this.bindField();
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
      this.paintLabel();
      this.copyAttrs(["placeholder", "readonly", "required", "maxlength", "minlength", "pattern", "autocomplete", "inputmode"]);
      const t = this.str("type", "text");
      this.ctl.type = t === "password" && this._reveal ? "text" : t;
      const rv = this.$(".reveal");
      rv.style.display = t === "password" ? "grid" : "none";
      if (rv.dataset.on !== String(!!this._reveal)) {
        rv.dataset.on = String(!!this._reveal);
        rv.innerHTML = icon(this._reveal ? "eyeOff" : "eye", 15);
        rv.setAttribute("aria-label", this._reveal ? "가리기" : "보이기");
      }
      this.after();
    }
    after() {
      super.after();
      this.$(".clear").style.display = this.bool("clearable") && this.ctl.value ? "grid" : "none";
    }
  };
  var A2Textarea = class extends FieldBase {
    static observedAttributes = ["label", "hint", "error", "placeholder", "disabled", "readonly", "required", "maxlength", "rows", "value"];
    static styles = `${FIELD_CSS}
.f { align-items: flex-start; padding: 15px 14px 12px; }
.ctl { height: auto; line-height: 1.6; resize: none; padding: 0; overflow: hidden; }
.count { align-self: flex-end; }
`;
    render() {
      this.root.innerHTML = fieldShell(`<textarea id="f" class="ctl" part="input"></textarea><span class="count"></span>`);
      this.ctl = this.$("textarea");
      this.ctl.value = this.str("value");
      this.bindField();
      this.ctl.addEventListener("input", () => this.after());
      this.ctl.addEventListener("change", () => this.fire("change"));
      let w = 0;
      new ResizeObserver(([e]) => {
        const nw = Math.round(e.contentRect.width);
        if (nw !== w) {
          w = nw;
          this.fit();
        }
      }).observe(this);
    }
    attr(name, v) {
      if (name === "value") {
        if (this.ctl.value !== (v ?? "")) this.value = v ?? "";
      } else this.update();
    }
    update() {
      this.paintLabel();
      this.copyAttrs(["placeholder", "readonly", "required", "maxlength"]);
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
  var clamp = (v, a, b) => Math.min(Math.max(v, a), b);
  var decimalsOf = (s) => {
    const t = String(s);
    return t.includes(".") ? t.split(".")[1].length : 0;
  };
  var A2Number = class extends A2Element {
    static formAssociated = true;
    static delegatesFocus = true;
    static observedAttributes = ["label", "hint", "error", "disabled", "required", "min", "max", "step", "unit", "value", "decimals"];
    static styles = `${FIELD_CSS}
.f { padding: 0 6px; gap: 4px; }
.mid { position: relative; flex: 1; min-width: 0; height: var(--a2-h-field); }
.ctl { position: absolute; inset: 0; width: 100%; text-align: center; font-variant-numeric: tabular-nums; opacity: 0; }
.ctl:focus { opacity: 1; }
/* 초점이 없을 때 보이는 숫자. 자리마다 틀이 있어 그 안에서 굴러 바뀐다 */
.roll { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; gap: 5px; padding-top: 0.12em; font-variant-numeric: tabular-nums; pointer-events: none; }
.ctl:focus + .roll { visibility: hidden; }
.d { position: relative; display: inline-block; overflow: clip; line-height: 1.5; vertical-align: top; }
.d .out { position: absolute; left: 0; top: 0; }
.unit { color: var(--a2-text-muted); font-size: var(--a2-fs-sm); }
.unit:empty { display: none; }
.step {
  flex: none; position: relative; width: calc(var(--a2-h-field) - 14px); height: calc(var(--a2-h-field) - 14px); border-radius: 50%; display: grid; place-items: center;
  color: var(--a2-text-muted); background: var(--a2-fill);
  transition: background-color var(--fx), color var(--fx), border-radius var(--snap), transform var(--snap);
}
.step::before { content: ''; position: absolute; inset: -5px; }
.step:hover { background: var(--a2-fill-hover); color: var(--a2-text); }
.step:active { border-radius: var(--a2-r-xs); background: var(--a2-accent-soft); color: var(--a2-accent); }
.step:disabled { opacity: 0.3; pointer-events: none; }
.calc { position: absolute; right: 8px; top: 50%; translate: 0 -50%; color: var(--a2-text-muted); font-size: var(--a2-fs-sm); padding-top: 0.12em; white-space: nowrap; pointer-events: none; }
.calc:empty { display: none; }
.calc.bad { color: var(--a2-danger); }
`;
    alwaysUp = true;
    render() {
      this.root.innerHTML = fieldShell(`<button class="step dec" type="button" tabindex="-1" aria-label="줄이기">${icon("minus", 12)}</button><div class="mid"><input id="f" class="ctl" part="input" inputmode="decimal" autocomplete="off"><div class="roll" aria-hidden="true"><span class="digits"></span><span class="unit"></span></div><span class="calc"></span></div><button class="step inc" type="button" tabindex="-1" aria-label="늘리기">${icon("plus", 12)}</button>`);
      this.ctl = this.$("input");
      this.f = this.$(".f");
      this.digits = this.$(".digits");
      this.f.classList.add("up");
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
      this.$(".mid").addEventListener("pointerdown", (e) => {
        if (e.target !== this.ctl) {
          e.preventDefault();
          this.ctl.focus();
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
            t2 = setInterval(() => this.bump(d), 70);
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
      const dir = nv > this._v ? 1 : -1;
      this._v = nv;
      if (this._rendered) {
        this.update();
        this.rollTo(dir);
      }
    }
    bump(dir, mult = 1) {
      const nv = this.clean(this._v + dir * this.step * mult);
      if (nv !== this._v) {
        this._v = nv;
        this.update();
        this.rollTo(dir);
        this.fire("input");
      }
    }
    /** 바뀐 자리만 굴린다. dir 1: 새 숫자가 아래에서 올라옴, -1: 위에서 내려옴 */
    rollTo(dir) {
      const next = this._v.toFixed(this.decimals), prev = this._shown ?? next;
      this._shown = next;
      const e = springEase("snap"), opt = { duration: e.duration * 1e3 / (parseFloat(getComputedStyle(this).getPropertyValue("--a2-speed")) || 1), easing: e.ease, fill: "both" };
      const len = Math.max(next.length, prev.length), a = prev.padStart(len), b = next.padStart(len);
      this.digits.textContent = "";
      for (let i = 0; i < len; i++) {
        if (b[i] === " ") continue;
        const d = document.createElement("span");
        d.className = "d";
        d.innerHTML = `<span class="in">${esc(b[i])}</span>`;
        this.digits.append(d);
        if (a[i] === b[i] || !dir || document.hidden) continue;
        const inn = d.firstChild, out = document.createElement("span");
        out.className = "out";
        out.textContent = a[i] === " " ? "" : a[i];
        d.append(out);
        try {
          inn.animate([{ transform: `translateY(${dir * 100}%)` }, { transform: "none" }], opt);
          out.animate([{ transform: "none" }, { transform: `translateY(${-dir * 100}%)` }], opt).onfinish = () => out.remove();
        } catch (_) {
          out.remove();
        }
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
          const dir = nv > this._v ? 1 : -1;
          this._v = nv;
          this.update();
          this.rollTo(dir);
          this.fire("input");
          this.fire("change");
          return;
        }
      }
      this.update();
    }
    attr(name, v) {
      if (name === "value") this.value = v;
      else this.update();
    }
    update() {
      const lab = this.str("label");
      this.$(".fl").innerHTML = lab ? `${esc(lab)}${this.bool("required") ? '<span class="req">*</span>' : ""}` : "";
      this.$("legend span").textContent = lab;
      this.$("legend").classList.toggle("none", !lab);
      const hint = this.$(".hint"), err = this.getAttribute("error");
      hint.textContent = err || this.str("hint");
      hint.classList.toggle("error", !!err);
      this.$(".unit").textContent = this.str("unit");
      if (this.root.activeElement !== this.ctl) this.ctl.value = this._v.toFixed(this.decimals);
      if (this._shown == null) this.rollTo(0);
      this.$(".dec").disabled = this._v <= this.min || this.disabled;
      this.$(".inc").disabled = this._v >= this.max || this.disabled;
      this.ctl.disabled = this.disabled;
      if (lab) this.ctl.setAttribute("aria-label", lab);
      this.internals.setFormValue(String(this._v));
    }
    formResetCallback() {
      this._v = this.clean(this.num("value", 0));
      this._shown = null;
      this.update();
    }
  };
  define("a2-input", A2Input);
  define("a2-textarea", A2Textarea);
  define("a2-number", A2Number);

  // src/elements/toggle.js
  var ROW_CSS = `
:host { display: inline-flex; vertical-align: middle; }
.c { position: relative; display: inline-flex; align-items: center; gap: 12px; cursor: pointer; user-select: none; min-height: 28px; touch-action: manipulation; outline: none; }
.c::before { content: ''; position: absolute; inset: -6px -6px; }
.halo { position: absolute; left: 50%; top: 50%; width: 40px; height: 40px; margin: -20px 0 0 -20px; border-radius: 50%; background: var(--a2-text); opacity: 0; transform: scale(0.5); transition: transform var(--snap), opacity var(--fx); pointer-events: none; }
.c:hover .halo { opacity: 0.08; transform: scale(1); }
.c:active .halo { opacity: 0.14; transform: scale(1.12); }
.c:focus-visible .halo { opacity: 0.14; transform: scale(1); }
.lbl:empty { display: none; }
`;
  var CheckBase = class extends A2Element {
    static formAssociated = true;
    static delegatesFocus = true;
    static observedAttributes = ["checked", "disabled", "required", "indeterminate", "value"];
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
    bindKeys(el) {
      el.addEventListener("keydown", (e) => {
        if (e.key === " " || e.key === "Enter" && this.isSwitch) {
          e.preventDefault();
          this.toggle();
        }
      });
    }
    aria() {
      this.ctl.setAttribute("aria-disabled", String(this.disabled));
      this.ctl.tabIndex = this.disabled ? -1 : 0;
      this.internals.setFormValue(this.checked ? this.value : null);
      if (this.bool("required") && !this.checked) this.internals.setValidity({ valueMissing: true }, "선택해 주세요.", this.ctl);
      else this.internals.setValidity({});
    }
    formResetCallback() {
      this.checked = this._init;
    }
  };
  var A2Checkbox = class extends CheckBase {
    static styles = `${ROW_CSS}
.box {
  flex: none; position: relative; width: 20px; height: 20px; border-radius: 6px; border: 2px solid var(--a2-line-strong);
  display: grid; place-items: center; color: var(--a2-on-accent);
  transition: background-color var(--fx), border-color var(--fx), transform var(--snap), border-radius var(--snap);
}
.c:hover .box { border-color: var(--a2-text); }
.c:active .box { transform: scale(0.82); border-radius: 8px; }
:host([checked]) .box, :host([indeterminate]) .box { background: var(--a2-accent); border-color: var(--a2-accent); }
.mark { position: absolute; inset: -2px; display: grid; place-items: center; }
/* 체크 표시는 왼쪽에서 오른쪽으로 드러나며 살짝 튀어나온다 */
.check { clip-path: inset(0 100% 0 0); transform: scale(0.6); transition: clip-path var(--fx), transform var(--snap); }
:host([checked]:not([indeterminate])) .check { clip-path: inset(0); transform: none; }
.dash { transform: scaleX(0); transition: transform var(--snap); }
:host([indeterminate]) .dash { transform: none; }
`;
    render() {
      this.root.innerHTML = `<div class="c" part="base" role="checkbox" tabindex="0"><span class="box" part="box"><span class="halo"></span><span class="mark check">${icon("check", 12)}</span><span class="mark dash"><svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><rect x="1.5" y="5" width="9" height="2.2" rx="1.1" fill="currentColor"/></svg></span></span><span class="lbl t"><slot></slot></span></div>`;
      this.ctl = this.$(".c");
      this.ctl.addEventListener("click", (e) => {
        e.preventDefault();
        this.toggle();
      });
      this.bindKeys(this.ctl);
    }
    get indeterminate() {
      return this.bool("indeterminate");
    }
    set indeterminate(v) {
      this.setBool("indeterminate", v);
    }
    update() {
      this.ctl.setAttribute("aria-checked", this.indeterminate ? "mixed" : String(this.checked));
      this.aria();
    }
  };
  var TRAVEL = 20;
  var A2Switch = class extends CheckBase {
    isSwitch = true;
    static styles = `${ROW_CSS}
.track {
  flex: none; position: relative; width: 52px; height: 32px; border-radius: 16px; background: var(--a2-fill-active); border: 2px solid var(--a2-line-strong);
  transition: background-color var(--fx), border-color var(--fx); touch-action: none;
}
:host([checked]) .track { background: var(--a2-accent); border-color: var(--a2-accent); }
.pos { position: absolute; left: 14px; top: 50%; width: 0; height: 0; transform: translateX(calc(var(--p, 0) * ${TRAVEL}px)); }
:host([checked]) .halo { background: var(--a2-accent); }
.thumb {
  position: absolute; left: 0; top: 0; width: 16px; height: 16px; margin: -8px 0 0 -8px; border-radius: 50%; background: var(--a2-text-muted);
  transition: width var(--snap), height var(--snap), margin var(--snap), background-color var(--fx);
}
:host([checked]) .thumb { width: 24px; height: 24px; margin: -12px 0 0 -12px; background: var(--a2-on-accent); }
.c:hover .thumb { background: var(--a2-text); }
:host([checked]) .c:hover .thumb { background: var(--a2-on-accent); }
.c:active .thumb, .c.drag .thumb { width: 28px; height: 28px; margin: -14px 0 0 -14px; }
`;
    render() {
      this.root.innerHTML = `<div class="c" part="base" role="switch" tabindex="0"><span class="track" part="track"><span class="pos"><span class="halo"></span><span class="thumb" part="thumb"></span></span></span><span class="lbl t"><slot></slot></span></div>`;
      this.ctl = this.$(".c");
      this.track = this.$(".track");
      this.pos = new Spring(this.checked ? 1 : 0, "snap", (x) => this.track.style.setProperty("--p", x.toFixed(4)), 2e-3);
      this.track.style.setProperty("--p", this.pos.x);
      this.bindKeys(this.ctl);
      let p0 = 0, dragged = false;
      drag(this.ctl, {
        start: () => {
          if (this.disabled) return false;
          p0 = this.pos.x;
          dragged = false;
        },
        move: ({ dx, moved }) => {
          if (!moved) return;
          dragged = true;
          this.ctl.classList.add("drag");
          const raw = p0 + dx / TRAVEL;
          this.pos.stop();
          this.pos.x = raw < 0 ? rubber(raw, 0.35) : raw > 1 ? 1 + rubber(raw - 1, 0.35) : raw;
          this.track.style.setProperty("--p", this.pos.x.toFixed(4));
        },
        end: ({ vx, cancelled }) => {
          this.ctl.classList.remove("drag");
          if (!dragged) {
            if (!cancelled) this.toggle();
            return;
          }
          const v = vx / TRAVEL, want = Math.abs(v) > 3 ? v > 0 : this.pos.x > 0.5;
          this._vel = v;
          if (want !== this.checked) this.toggle();
          else {
            this._vel = null;
            this.pos.set(want ? 1 : 0, { velocity: v });
          }
        }
      });
    }
    update() {
      this.ctl.setAttribute("aria-checked", String(this.checked));
      this.aria();
      const to = this.checked ? 1 : 0;
      if (this.pos.to !== to || this.pos.x !== to) this.pos.set(to, this._vel != null ? { velocity: this._vel } : void 0);
      this._vel = null;
    }
  };
  define("a2-checkbox", A2Checkbox);
  define("a2-switch", A2Switch);

  // src/elements/radio.js
  var A2Radio = class extends A2Element {
    static observedAttributes = ["checked", "disabled"];
    static styles = `${ROW_CSS}
:host { outline: none; }
:host(:focus-visible) .halo { opacity: 0.14; transform: scale(1); }
.dot { flex: none; position: relative; width: 20px; height: 20px; border-radius: 50%; border: 2px solid var(--a2-line-strong); transition: border-color var(--fx), transform var(--snap); }
.c:hover .dot { border-color: var(--a2-text); }
.c:active .dot { transform: scale(0.84); }
:host([checked]) .dot { border-color: var(--a2-accent); }
:host([checked]) .halo { background: var(--a2-accent); }
.dot::after { content: ''; position: absolute; inset: 3px; border-radius: 50%; background: var(--a2-accent); transform: scale(0); transition: transform var(--snap); }
:host([checked]) .dot::after { transform: scale(1); }
`;
    render() {
      this.setAttribute("role", "radio");
      this.root.innerHTML = `<div class="c" part="base"><span class="dot" part="dot"><span class="halo"></span></span><span class="lbl t"><slot></slot></span></div>`;
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
  var A2RadioGroup = class extends A2Element {
    static formAssociated = true;
    static observedAttributes = ["label", "hint", "error", "value", "disabled", "required", "direction"];
    static styles = `
:host { display: block; }
.label { margin-bottom: 12px; }
.hint { margin-left: 0; }
.list { display: flex; flex-direction: column; gap: 14px; }
:host([direction="row"]) .list { flex-direction: row; flex-wrap: wrap; gap: 14px 24px; }
`;
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
  define("a2-radio", A2Radio);
  define("a2-radio-group", A2RadioGroup);

  // src/elements/slider.js
  var clamp2 = (v, a, b) => Math.min(Math.max(v, a), b);
  var PAD = 6;
  var A2Slider = class extends A2Element {
    static formAssociated = true;
    static delegatesFocus = true;
    static observedAttributes = ["label", "hint", "error", "min", "max", "step", "value", "disabled", "show-value", "unit"];
    static styles = `
:host { display: block; --track: 16px; }
:host([size="sm"]) { --track: 8px; }
:host([size="lg"]) { --track: 28px; }
.head { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
.head .label { flex: 1; }
.hint { margin-left: 0; }
.out { font-size: var(--a2-fs-sm); color: var(--a2-text); font-variant-numeric: tabular-nums; margin-bottom: 8px; }
.out:empty { display: none; }
/* 모든 조각은 --p(0~1) 하나로 움직인다. 트랙 두 조각은 clip-path 로 잘라 레이아웃을 건드리지 않는다 */
.s { position: relative; height: calc(var(--track) + 28px); cursor: pointer; touch-action: none; user-select: none; container-type: inline-size; --p: 0; --x: calc(${PAD}px + (100cqw - ${PAD * 2}px) * var(--p)); --gap: 6px; --o: calc(var(--track) / 2); }
.tr { position: absolute; left: 0; right: 0; top: 50%; height: var(--track); margin-top: calc(var(--track) / -2); }
.act { background: var(--a2-accent); clip-path: inset(0 calc(100% - var(--x) + var(--gap)) 0 0 round var(--o) 3px 3px var(--o)); }
.inact { background: var(--a2-tonal); clip-path: inset(0 0 0 calc(var(--x) + var(--gap)) round 3px var(--o) var(--o) 3px); }
.inact::after { content: ''; position: absolute; right: calc(var(--track) / 2 - 2px); top: 50%; width: 4px; height: 4px; margin-top: -2px; border-radius: 50%; background: var(--a2-on-tonal); opacity: 0.7; }
.pos { position: absolute; top: 50%; left: 0; width: 0; height: 0; transform: translateX(var(--x)); }
.knob {
  position: absolute; left: -2px; top: calc((var(--track) + 28px) / -2); width: 4px; height: calc(var(--track) + 28px); border-radius: 2px; background: var(--a2-accent);
  transition: transform var(--snap);
}
.knob::before { content: ''; position: absolute; inset: 0 -12px; }
.s:hover .knob { transform: scaleX(1.25); }
.s.drag .knob { transform: scaleX(0.5); }
.knob:focus-visible { outline: 2px solid var(--a2-accent); outline-offset: 4px; }
/* 값 말풍선: 제자리의 틀 안에서 아래에서 위로 올라온다 */
.tipf { position: absolute; bottom: calc(var(--track) / 2 + 20px); left: 0; translate: -50% 0; width: max-content; overflow: clip; border-radius: 999px; pointer-events: none; }
.tip {
  min-width: 44px; padding: 9px 14px 7px; border-radius: 999px; background: var(--a2-tip); color: var(--a2-on-tip); text-align: center;
  font-size: var(--a2-fs); font-weight: var(--a2-weight-strong); white-space: nowrap; font-variant-numeric: tabular-nums;
  transform: translateY(102%); transition: transform var(--snap);
}
.s.drag .tip, .knob:focus-visible + .tipf .tip { transform: none; }
`;
    render() {
      this.root.innerHTML = `<div class="head"><div class="label t" part="label"></div><div class="out t"></div></div><div class="s" part="base"><div class="tr act" part="fill"></div><div class="tr inact" part="track"></div><div class="pos"><div class="knob" part="thumb" role="slider" tabindex="0"></div><div class="tipf"><div class="tip t"></div></div></div></div><div class="hint t" part="hint"></div>`;
      this.sEl = this.$(".s");
      this.knob = this.$(".knob");
      this._v = this.clean(this.num("value", (this.min + this.max) / 2));
      this._init = this._v;
      this.pos = new Spring(this.ratio(), "snap", (x) => this.sEl.style.setProperty("--p", x.toFixed(4)), 8e-4);
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
        if (this._rendered) {
          this.pos.set(this.ratio());
          this.text();
        }
      }
    }
    /** 트랙 위 좌표 → 값 */
    at(x) {
      const r = this.sEl.getBoundingClientRect(), w = r.width - PAD * 2;
      return this.min + clamp2((x - r.left - PAD) / (w || 1), 0, 1) * (this.max - this.min);
    }
    down(e) {
      if (e.button !== 0 || this.disabled) return;
      e.preventDefault();
      this.knob.focus({ preventScroll: true });
      this.sEl.setPointerCapture(e.pointerId);
      this.sEl.classList.add("drag");
      const start = this._v;
      this.set(this.at(e.clientX));
      const mv = (ev) => this.set(this.at(ev.clientX), "fxFast");
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
      this.set(nv);
      if (this._v !== before) this.fire("change");
    }
    set(v, cfg = "snap") {
      const nv = this.clean(v);
      if (nv === this._v) return;
      this._v = nv;
      this.pos.set(this.ratio(), { cfg });
      this.text();
      this.fire("input");
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
        this.pos.jump(this.ratio());
      }
      this.update();
    }
    update() {
      this.paintField();
      this.knob.setAttribute("aria-valuemin", this.min);
      this.knob.setAttribute("aria-valuemax", this.max);
      if (this.hasAttribute("label")) this.knob.setAttribute("aria-label", this.getAttribute("label"));
      this.knob.tabIndex = this.disabled ? -1 : 0;
      if (!this.pos.moving) this.pos.jump(this.ratio());
      this.text();
    }
    formResetCallback() {
      this._v = this._init;
      this.pos.set(this.ratio());
      this.text();
    }
  };
  define("a2-slider", A2Slider);

  // src/core/popover.js
  function openPopover(pop, anchor, o = {}) {
    const gap = o.gap ?? 6;
    if (!pop.hasAttribute("popover")) pop.setAttribute("popover", "manual");
    try {
      pop.showPopover();
    } catch (_) {
    }
    let up = null, alive = true, lx, ly, lw;
    const isEl = anchor instanceof Element;
    const place2 = () => {
      if (!alive) return;
      let r;
      if (isEl) {
        if (!anchor.isConnected) return close();
        r = anchor.getBoundingClientRect();
        if (o.match && lw !== r.width) {
          lw = r.width;
          pop.style.minWidth = `${r.width}px`;
        }
      } else r = { left: anchor.x, right: anchor.x, top: anchor.y, bottom: anchor.y, width: 0 };
      const w = pop.offsetWidth, h = pop.offsetHeight;
      if (up === null) up = r.bottom + gap + h > innerHeight - 8 && r.top - gap - h > 8;
      const x = Math.round(Math.min(Math.max(8, o.alignEnd ? r.right - w : r.left), innerWidth - w - 8));
      const y = Math.round(Math.min(Math.max(8, up ? r.top - gap - h : r.bottom + gap), innerHeight - h - 8));
      if (x !== lx) {
        lx = x;
        pop.style.left = `${x}px`;
      }
      if (y !== ly) {
        ly = y;
        pop.style.top = `${y}px`;
      }
      pop.dataset.side = up ? "top" : "bottom";
    };
    let queued = 0;
    const later = () => {
      if (!queued) queued = requestAnimationFrame(() => {
        queued = 0;
        place2();
      });
    };
    const ro = new ResizeObserver(later);
    const keep = [pop, ...o.closeOnOutside || [], ...isEl ? [anchor] : []];
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
    const sp2 = pop._a2sp || (pop._a2sp = new Spring(0, "snap", (p) => {
      pop.style.transform = p === 1 ? "" : `scale(${0.72 + 0.28 * p})`;
      pop.style.opacity = p >= 0.35 ? "" : Math.max(0, p / 0.35);
    }, 2e-3));
    sp2.rest = null;
    place2();
    pop.style.transformOrigin = `${o.alignEnd ? "100%" : "0%"} ${up ? "100%" : "0%"}`;
    sp2.jump(0);
    sp2.set(1);
    ro.observe(pop);
    if (isEl) ro.observe(anchor);
    addEventListener("scroll", later, { capture: true, passive: true });
    addEventListener("resize", later, { passive: true });
    setTimeout(() => {
      if (alive) {
        document.addEventListener("pointerdown", outside, true);
        addEventListener("keydown", key, true);
      }
    }, 0);
    function close() {
      if (!alive) return;
      alive = false;
      cancelAnimationFrame(queued);
      ro.disconnect();
      removeEventListener("scroll", later, { capture: true });
      removeEventListener("resize", later);
      document.removeEventListener("pointerdown", outside, true);
      removeEventListener("keydown", key, true);
      sp2.rest = () => {
        try {
          pop.hidePopover();
        } catch (_) {
        }
      };
      sp2.set(0, { cfg: "fxFast" });
      o.onClose && o.onClose();
    }
    return { close, get open() {
      return alive;
    } };
  }
  var POPOVER_CSS = `
[popover] { position: fixed; inset: auto; margin: 0; padding: 0; border: 0; overflow: visible; background: none; color: inherit; }
.menu {
  min-width: 190px; max-height: min(380px, 60vh); overflow-y: auto; padding: 6px;
  border-radius: var(--a2-r-md); background: var(--a2-surface-high); box-shadow: var(--a2-shadow);
  font-family: var(--a2-font); font-size: var(--a2-fs); font-weight: var(--a2-weight); color: var(--a2-text);
  scrollbar-width: thin;
}
.item {
  display: flex; align-items: center; gap: 12px; min-height: 44px; padding: 0 14px; border-radius: var(--a2-r-xs);
  cursor: pointer; user-select: none; white-space: nowrap; transition: background-color var(--fx), border-radius var(--snap);
}
.item:hover, .item.active { background: var(--a2-fill-hover); }
.item[aria-disabled="true"] { opacity: 0.4; pointer-events: none; }
.item .grow { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; padding-top: 0.12em; }
.item .mark { color: var(--a2-accent); visibility: hidden; }
.item[aria-selected="true"] .mark { visibility: visible; }
.item:active { border-radius: var(--a2-r-md); }
.item[aria-selected="true"] { background: var(--a2-tonal); color: var(--a2-on-tonal); }
.item[aria-selected="true"] .grow { font-weight: var(--a2-weight-strong); }
.item[aria-selected="true"] .mark { color: inherit; }
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
    static formAssociated = true;
    static delegatesFocus = true;
    static observedAttributes = ["label", "hint", "error", "placeholder", "value", "disabled", "required", "multiple", "searchable"];
    static styles = `${POPOVER_CSS}${FIELD_CSS}${BOX_CSS}
.val { flex: 1; min-width: 0; display: flex; flex-wrap: wrap; gap: 5px; align-items: center; }
.txt { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; padding-top: 0.12em; }
.ph { color: var(--a2-text-faint); }
.has-label:not(.up) .ph { visibility: hidden; }
.chev { flex: none; color: var(--a2-text-muted); transition: transform var(--move); }
:host([open]) .chev { transform: rotate(180deg); }
.chip {
  display: inline-flex; align-items: center; gap: 3px; height: 30px; padding: 0 5px 0 11px; border-radius: 8px;
  background: var(--a2-tonal); color: var(--a2-on-tonal); font-size: var(--a2-fs-sm); font-weight: var(--a2-weight-strong);
  animation: chipIn calc(var(--a2-d-snap) / var(--a2-speed)) var(--a2-e-snap);
}
@keyframes chipIn { from { transform: scale(0.6); } }
.chip span { padding-top: 0.12em; }
.chip i { position: relative; display: grid; place-items: center; width: 20px; height: 20px; border-radius: 50%; font-style: normal; cursor: pointer; }
.chip i::before { content: ''; position: absolute; inset: -5px; }
.chip i:hover { background: var(--a2-fill-active); }
.search { display: flex; align-items: center; gap: 10px; height: 44px; padding: 0 14px; margin-bottom: 6px; border-radius: 22px; background: var(--a2-fill); color: var(--a2-text-muted); }
.search input { flex: 1; min-width: 0; border: 0; outline: 0; background: none; color: var(--a2-text); padding-top: 0.12em; }
.search input::placeholder { color: var(--a2-text-faint); }
.list { display: flex; flex-direction: column; gap: 2px; }
`;
    render() {
      this.root.innerHTML = `${boxShell(`<button class="box" part="box" type="button" aria-haspopup="listbox"><span class="val"></span><span class="chev">${icon("chevron", 12)}</span></button>`)}
<div class="pop" popover="manual"><div class="menu" part="menu" role="listbox"><label class="search">${icon("search", 13)}<input placeholder="검색" aria-label="검색"></label><div class="list"></div></div></div>`;
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
      this._pop = openPopover(this.pop, this.$(".f"), { match: true, closeOnOutside: [this], onClose: () => {
        this.setBool("open", false);
        this.box.setAttribute("aria-expanded", "false");
        this.$(".f").classList.toggle("up", this._sel.length > 0);
      } });
      this.$(".f").classList.add("up");
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
      this.listEl.innerHTML = list.length ? list.map((o, i) => `<div class="item" role="option" data-i="${i}" aria-selected="${this._sel.includes(o.value)}" aria-disabled="${o.disabled}"><span class="grow">${esc(o.label)}</span><span class="mark">${icon("check", 13)}</span></div>`).join("") : `<div class="empty t">결과 없음</div>`;
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
      paintBox(this, this._sel.length > 0 || this.isOpen);
      const sel = this.selectedOptions, val = this.$(".val");
      if (!sel.length) val.innerHTML = `<span class="txt ph">${esc(this.str("placeholder", "선택"))}</span>`;
      else if (this.multiple) val.innerHTML = sel.map((o) => `<span class="chip"><span>${esc(o.label)}</span><i data-v="${esc(o.value)}" aria-label="빼기">${icon("x", 9)}</i></span>`).join("");
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
  define("a2-option", A2Option);
  define("a2-select", A2Select);

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
    static observedAttributes = ["value"];
    static styles = `
:host { display: block; }
.bar { position: relative; display: flex; overflow-x: auto; scrollbar-width: none; border-bottom: 1px solid var(--a2-line); margin-bottom: 18px; }
.tab {
  position: relative; flex: none; height: 46px; padding: 0.12em 18px 0; color: var(--a2-text-muted); white-space: nowrap; user-select: none;
  border-radius: var(--a2-r-xs) var(--a2-r-xs) 0 0; transition: color var(--fx);
}
:host([fit]) .tab { flex: 1; }
.tab::after { content: ''; position: absolute; inset: 0; border-radius: inherit; background: var(--a2-fill); opacity: 0; transition: opacity var(--fx); }
.tab:hover::after { opacity: 1; }
.tab:hover { color: var(--a2-text); }
.tab[aria-selected="true"] { color: var(--a2-accent); font-weight: var(--a2-weight-strong); }
.tab:disabled { opacity: 0.4; cursor: default; }
.tab:focus-visible { outline-offset: -3px; }
.tab span { position: relative; }
.ind { position: absolute; left: 0; bottom: 0; height: 3px; border-radius: 3px 3px 0 0; background: var(--a2-accent); visibility: hidden; pointer-events: none; }
.body { position: relative; overflow-x: clip; }
::slotted(a2-tab-panel) { display: block; }
::slotted(a2-tab-panel:not([data-on])) { display: none; }
`;
    render() {
      this.root.innerHTML = `<div class="bar" part="tabs" role="tablist"><span class="ind" part="indicator"></span></div><div class="body" part="body"><slot></slot></div>`;
      this.bar = this.$(".bar");
      this.ind = this.$(".ind");
      const put = () => {
        this.ind.style.left = `${this.l.x}px`;
        this.ind.style.width = `${Math.max(4, this.r.x - this.l.x)}px`;
      };
      this.l = new Spring(0, "move", put);
      this.r = new Spring(0, "move", put);
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
      document.fonts?.ready.then(() => this.place(true));
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
      for (const p of ps) {
        p.setAttribute("role", "tabpanel");
        const b = document.createElement("button");
        b.type = "button";
        b.className = "tab";
        b.dataset.v = p.value;
        b.setAttribute("role", "tab");
        const s = document.createElement("span");
        s.textContent = p.label;
        b.append(s);
        b.disabled = p.hasAttribute("disabled");
        ripple(b);
        this.bar.append(b);
      }
      this.sync(true);
    }
    pick(v, user) {
      if (v === this._v) return;
      const ps = this.panels, dir = ps.findIndex((p) => p.value === v) > ps.findIndex((p) => p.value === this._v) ? 1 : -1;
      this._v = v;
      this.sync(false, dir);
      if (user) this.emit("a2-change", { value: v });
    }
    sync(instant, dir = 1) {
      for (const b2 of this.bar.querySelectorAll(".tab")) {
        const on = b2.dataset.v === this._v;
        b2.setAttribute("aria-selected", String(on));
        b2.tabIndex = on ? 0 : -1;
      }
      for (const p of this.panels) {
        const on = p.value === this._v, was = p.hasAttribute("data-on");
        p.toggleAttribute("data-on", on);
        if (on && !was && !instant) {
          p._a2 ||= new Spring(0, "move", (x) => {
            p.style.transform = x ? `translateX(${x}px)` : "";
          });
          p._a2.jump(dir * 44);
          p._a2.set(0);
        }
      }
      const b = this.current;
      if (b && !instant) b.scrollIntoView({ block: "nearest", inline: "nearest" });
      this.place(instant, dir);
    }
    get current() {
      return [...this.bar.querySelectorAll(".tab")].find((x) => x.dataset.v === this._v);
    }
    /** 밑줄을 고른 탭의 글자 아래로. 가는 쪽 끝은 빠르게, 반대쪽 끝은 느리게 움직인다 */
    place(instant, dir = 1) {
      const b = this.current;
      if (!b || !b.offsetWidth) {
        this.ind.style.visibility = "hidden";
        return;
      }
      const t = b.firstElementChild, l = b.offsetLeft + t.offsetLeft - 2, r = l + t.offsetWidth + 4;
      this.ind.style.visibility = "visible";
      if (instant || this._placed !== true) {
        this._placed = true;
        this.l.jump(l);
        this.r.jump(r);
        return;
      }
      this.l.set(l, { cfg: dir > 0 ? "slow" : "snap" });
      this.r.set(r, { cfg: dir > 0 ? "snap" : "slow" });
    }
    attr(name, v) {
      if (name === "value" && v !== this._v && v != null) this.pick(v, false);
    }
  };
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
    static formAssociated = true;
    static delegatesFocus = true;
    static observedAttributes = ["label", "hint", "value", "disabled", "alpha", "presets"];
    static styles = `${POPOVER_CSS}${FIELD_CSS}${BOX_CSS}
.sw { position: relative; flex: none; width: 30px; height: 30px; border-radius: 50%; overflow: hidden; box-shadow: 0 0 0 1px var(--a2-line); transition: border-radius var(--snap); }
.box:active .sw, :host([open]) .sw { border-radius: 9px; }
.sw::before, .chk { content: ''; position: absolute; inset: 0; background: repeating-conic-gradient(#bbb 0 25%, #eee 0 50%) 0 0 / 8px 8px; }
.sw i, .pv i { position: absolute; inset: 0; }
.hex { flex: 1; font-variant-numeric: tabular-nums; padding-top: 0.12em; letter-spacing: 0.02em; }
.menu { width: 264px; padding: 14px; display: flex; flex-direction: column; gap: 14px; max-height: none; overflow: visible; border-radius: var(--a2-r-lg); }
.sv { position: relative; height: 156px; border-radius: var(--a2-r-sm); cursor: crosshair; touch-action: none; }
.k { transition: width var(--snap), height var(--snap), margin var(--snap); }
.sv .k { position: absolute; width: 18px; height: 18px; margin: -9px 0 0 -9px; border-radius: 50%; box-shadow: 0 0 0 2px #fff, 0 1px 4px rgba(0, 0, 0, 0.4); pointer-events: none; }
.sv:active .k { width: 26px; height: 26px; margin: -13px 0 0 -13px; }
.bar { position: relative; height: 16px; border-radius: 8px; cursor: pointer; touch-action: none; }
.bar .k { position: absolute; top: 50%; width: 6px; height: 28px; margin: -14px 0 0 -3px; border-radius: 3px; background: #fff; box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25), 0 1px 4px rgba(0, 0, 0, 0.4); pointer-events: none; }
.bar:active .k { width: 4px; margin-left: -2px; }
.bar:focus-visible { outline-offset: 4px; }
.hue { background: linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00); }
.al { overflow: visible; }
.al .chk { border-radius: 8px; background-size: 8px 8px; }
.al .g { position: absolute; inset: 0; border-radius: 8px; }
.row { display: flex; gap: 10px; align-items: center; }
.pv { position: relative; flex: none; width: 40px; height: 40px; border-radius: 50%; overflow: hidden; box-shadow: 0 0 0 1px var(--a2-line); }
.hx { flex: 1; min-width: 0; height: 40px; padding: 0.12em 14px 0; border: 1px solid var(--a2-line-strong); outline: 0; border-radius: 20px; background: transparent; color: var(--a2-text); font-variant-numeric: tabular-nums; transition: border-color var(--fx); }
.hx:focus { border-color: var(--a2-accent); }
.ps { display: grid; grid-template-columns: repeat(10, 1fr); gap: 5px; }
.ps button { aspect-ratio: 1; border-radius: 50%; box-shadow: inset 0 0 0 1px var(--a2-line); transition: transform var(--snap), border-radius var(--snap); }
.ps button:hover { transform: scale(1.18); }
.ps button:active { border-radius: 6px; }
.ps:empty { display: none; }
`;
    render() {
      this.root.innerHTML = `${boxShell(`<button class="box" part="box" type="button" aria-haspopup="dialog"><span class="sw"><i></i></span><span class="hex"></span></button>`)}
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
      this._pop = openPopover(this.pop, this.$(".f"), { closeOnOutside: [this], onClose: () => this.setBool("open", false) });
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
      paintBox(this, true);
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
    static formAssociated = true;
    static delegatesFocus = true;
    static observedAttributes = ["label", "hint", "value", "disabled", "placeholder"];
    static styles = `${FIELD_CSS}
.f { cursor: pointer; padding: 0 8px 0 14px; }
.box { position: absolute; inset: 0; border-radius: var(--a2-r-sm); }
.box:focus-visible { outline: 0; }
.f.rec .ol { border-color: var(--a2-accent); border-width: 2px; padding: 0 9px; background: var(--a2-accent-soft); }
.f.rec .fl { color: var(--a2-accent); }
.keys { position: relative; flex: 1; min-width: 0; display: flex; align-items: center; gap: 5px; overflow: hidden; pointer-events: none; height: var(--a2-h-field); }
/* 틀: 이 안에서만 보이고, 내용이 아래에서 올라온다 */
.kf { display: inline-block; overflow: clip; border-radius: 8px; }
.kf.txt { border-radius: 0; }
.kf > * { display: block; }
.kf.in > * { animation: rise calc(var(--a2-d-snap) / var(--a2-speed)) var(--a2-e-snap) both; }
@keyframes rise { from { transform: translateY(105%); } }
kbd {
  display: grid; place-items: center; min-width: 30px; height: 30px; padding: 0.12em 9px 0; border-radius: 8px;
  background: var(--a2-tonal); color: var(--a2-on-tonal); font: inherit; font-size: var(--a2-fs-sm); font-weight: var(--a2-weight-strong);
}
.plus { color: var(--a2-text-faint); font-size: var(--a2-fs-sm); }
.ph { padding: 0.12em 0 0; color: var(--a2-text-faint); line-height: 30px; white-space: nowrap; }
.rec .ph { color: var(--a2-accent); }
.x { position: relative; flex: none; width: 30px; height: 30px; border-radius: 50%; display: grid; place-items: center; color: var(--a2-text-muted); transition: background-color var(--fx), color var(--fx), transform var(--snap); }
.x:hover { background: var(--a2-fill-hover); color: var(--a2-text); }
.x:active { transform: scale(0.86); }
`;
    render() {
      this.root.innerHTML = `<div class="f up" part="box"><fieldset class="ol" aria-hidden="true"><legend><span></span></legend></fieldset><label class="fl t" part="label"></label><button class="box" type="button"></button><span class="keys"></span><button class="x hit" type="button" tabindex="-1" aria-label="비우기">${icon("x", 12)}</button></div><div class="hint t" part="hint"></div>`;
      this.f = this.$(".f");
      this.box = this.$(".box");
      this._v = comboString(parseCombo(this.str("value")));
      this._init = this._v;
      this._shown = [];
      this.box.addEventListener("click", () => this.rec ? this.stop() : this.start());
      this.$(".x").addEventListener("click", () => {
        this.set("");
        this.stop();
        this.box.focus();
      });
      const mods = (e) => ["Ctrl", "Alt", "Shift", "Meta"].filter((m) => ({ Ctrl: e.ctrlKey, Alt: e.altKey, Shift: e.shiftKey, Meta: e.metaKey })[m]);
      this.box.addEventListener("keydown", (e) => {
        if (!this.rec) {
          if (e.key === "Backspace" || e.key === "Delete") {
            e.preventDefault();
            this.set("");
          }
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        const m = mods(e);
        if (MOD_OF[e.code]) {
          this.paint(m);
          return;
        }
        if (!m.length && e.code === "Escape") {
          this.stop();
          return;
        }
        if (!m.length && (e.code === "Backspace" || e.code === "Delete")) {
          this.set("");
          this.stop();
          return;
        }
        this.set(comboString({ mods: m, key: e.code }));
        this.stop();
      });
      this.box.addEventListener("keyup", (e) => {
        if (this.rec) this.paint(mods(e));
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
      this.f.classList.add("rec");
      this.paint([]);
    }
    stop() {
      if (!this.rec) return;
      this.rec = false;
      this.f.classList.remove("rec");
      this.update();
    }
    set(v) {
      if (v === this._v) return;
      this._v = v;
      this.update();
      this.fire("input");
      this.fire("change");
    }
    /** mods 가 있으면 기록 중 미리보기. 새로 생긴 조각만 올라온다 */
    paint(mods) {
      const names = mods ? mods : keyNames(this._v);
      const ph = this.rec && !(mods && mods.length) ? "키를 누르세요" : this.str("placeholder", "없음");
      const parts = names.length ? names.map((n) => ["k", n]) : [["t", ph]];
      const old = this._shown, k = this.$(".keys");
      k.innerHTML = parts.map(([type, text], i) => {
        const fresh = this._painted && (!old[i] || old[i][0] !== type || old[i][1] !== text);
        const body = type === "k" ? `<kbd>${esc(text)}</kbd>` : `<span class="ph">${esc(text)}</span>`;
        return `${i ? '<span class="plus">+</span>' : ""}<span class="kf${type === "t" ? " txt" : ""}${fresh ? " in" : ""}">${body}</span>`;
      }).join("");
      this._shown = parts;
      this._painted = true;
      this.$(".x").style.visibility = this._v && !this.rec ? "visible" : "hidden";
    }
    attr(name, v) {
      if (name === "value") this.value = v;
      else this.update();
    }
    update() {
      const lab = this.str("label");
      this.$(".fl").textContent = lab;
      this.$("legend span").textContent = lab;
      this.$("legend").classList.toggle("none", !lab);
      const hint = this.$(".hint");
      hint.textContent = this.str("hint");
      this.box.disabled = this.disabled;
      this.box.setAttribute("aria-label", `${lab || "단축키"}: ${keyNames(this._v).join("+") || "없음"}`);
      if (!this.rec) this.paint(null);
      this.internals.setFormValue(this._v || null);
    }
    formResetCallback() {
      this._v = this._init;
      this.update();
    }
  };
  define("a2-keybind", A2Keybind);

  // src/elements/display.js
  var WAVE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='14'%3E%3Cpath d='M0 7Q10 0 20 7T40 7' fill='none' stroke='%23000' stroke-width='4'/%3E%3C/svg%3E")`;
  var A2Progress = class extends A2Element {
    static observedAttributes = ["value", "max", "label", "show-value", "variant"];
    static styles = `
:host { display: block; --c: var(--a2-accent); }
:host([variant="success"]) { --c: var(--a2-success); }
:host([variant="danger"]) { --c: var(--a2-danger); }
.head { display: flex; justify-content: space-between; gap: 12px; }
.head .label { flex: 1; }
.out { font-size: var(--a2-fs-sm); color: var(--a2-text-muted); font-variant-numeric: tabular-nums; margin-bottom: 8px; }
.out:empty { display: none; }
.w { position: relative; height: 14px; --p: 0; }
.a { position: absolute; left: 0; top: 0; bottom: 0; width: calc(var(--p) * 100%); overflow: hidden; transition: width var(--move); }
.wave { position: absolute; left: 0; top: 0; bottom: 0; width: 100vw; background: var(--c); -webkit-mask: ${WAVE} repeat-x 0 50% / 40px 14px; mask: ${WAVE} repeat-x 0 50% / 40px 14px; animation: flow calc(1.1s / var(--a2-speed)) linear infinite; }
@keyframes flow { to { -webkit-mask-position: 40px 50%; mask-position: 40px 50%; } }
:host([flat]) .wave, .w.done .wave { -webkit-mask: none; mask: none; animation: none; top: 5px; bottom: 5px; border-radius: 2px; }
.i { position: absolute; right: 0; top: 5px; height: 4px; left: calc(var(--p) * 100% + 6px); border-radius: 2px; background: var(--a2-tonal); transition: left var(--move); }
.w.done .i { display: none; }
.w::after { content: ''; position: absolute; right: 0; top: 5px; width: 4px; height: 4px; border-radius: 50%; background: var(--c); }
/* 끝을 모를 때: 물결 조각이 지나간다 */
.w.ind { overflow: clip; }
.w.ind .a { width: 34%; transition: none; animation: run calc(1.5s / var(--a2-speed)) cubic-bezier(0.5, 0.1, 0.4, 0.9) infinite; }
.w.ind .i { left: 0; transition: none; }
@keyframes run { from { translate: -110% 0; } to { translate: 310% 0; } }
`;
    render() {
      this.setAttribute("role", "progressbar");
      this.root.innerHTML = `<div class="head"><div class="label t" part="label"></div><div class="out t"></div></div><div class="w" part="track"><div class="i"></div><div class="a" part="fill"><div class="wave"></div></div></div>`;
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
      const v = this.value, max = this.num("max", 100) || 100, ind = v == null, w = this.$(".w");
      const p = ind ? 0 : Math.min(Math.max(v / max, 0), 1);
      w.classList.toggle("ind", ind);
      w.classList.toggle("done", !ind && p >= 1);
      w.style.setProperty("--p", p);
      this.$(".out").textContent = this.bool("show-value") && !ind ? `${Math.round(p * 100)}%` : "";
      if (ind) this.removeAttribute("aria-valuenow");
      else this.setAttribute("aria-valuenow", Math.round(p * 100));
      if (this.hasAttribute("label")) this.setAttribute("aria-label", this.getAttribute("label"));
    }
  };
  var SHAPES = [[4, 0.2], [6, 0.13], [2, 0.3], [8, 0.1], [3, 0.24], [5, 0.16], [0, 0]];
  var N = 64;
  var radii = ([n, a]) => Array.from({ length: N }, (_, i) => 1 - a * (1 - Math.cos(n * i * 2 * Math.PI / N)) / 2);
  var SHAPE_R = SHAPES.map(radii);
  var A2Spinner = class extends A2Element {
    static observedAttributes = ["size"];
    static styles = `
:host { display: inline-grid; place-items: center; vertical-align: middle; color: var(--a2-accent); line-height: 0; }
:host([contained]) { background: var(--a2-accent-container); color: var(--a2-on-accent-container); border-radius: 50%; box-sizing: content-box; }
`;
    render() {
      this.setAttribute("role", "status");
      if (!this.hasAttribute("aria-label")) this.setAttribute("aria-label", "불러오는 중");
      this.root.innerHTML = `<svg viewBox="-1.1 -1.1 2.2 2.2" fill="currentColor" aria-hidden="true"><path/></svg>`;
      this.path = this.$("path");
      this.i = 0;
      this.rot = 0;
      this.sp = new Spring(0, { k: 260, z: 0.62 }, (t) => this.draw(t), 2e-3);
      this.io = new IntersectionObserver(([e]) => {
        this.vis = e.isIntersecting;
        this.run();
      });
    }
    connectedCallback() {
      super.connectedCallback();
      this.io.observe(this);
    }
    disconnectedCallback() {
      this.io.disconnect();
      clearInterval(this.timer);
      this.timer = 0;
    }
    run() {
      clearInterval(this.timer);
      this.timer = 0;
      if (!this.vis) return;
      this.timer = setInterval(() => {
        if (!document.hidden) this.next();
      }, 700);
    }
    next() {
      this.i = (this.i + 1) % SHAPES.length;
      this.from = this.cur;
      this.rot0 = this.rot;
      this.rot += 2.2;
      this.sp.jump(0);
      this.sp.set(1);
    }
    /** t: 0(이전 모양) → 1(다음 모양). 스프링이라 1 을 조금 넘었다 돌아온다 */
    draw(t) {
      const to = SHAPE_R[this.i], from = this.from || to, rot = (this.rot0 ?? 0) + (this.rot - (this.rot0 ?? 0)) * t;
      let d = "";
      const cur2 = new Array(N);
      for (let k = 0; k < N; k++) {
        const r = from[k] + (to[k] - from[k]) * t, a = rot + k * 2 * Math.PI / N;
        cur2[k] = r;
        d += `${k ? "L" : "M"}${(r * Math.cos(a)).toFixed(3)} ${(r * Math.sin(a)).toFixed(3)}`;
      }
      this.cur = cur2;
      this.path.setAttribute("d", `${d}Z`);
    }
    update() {
      const s = this.num("size", 28);
      const svg = this.$("svg");
      svg.setAttribute("width", s);
      svg.setAttribute("height", s);
      this.style.padding = this.bool("contained") ? `${Math.round(s * 0.3)}px` : "";
      if (!this.cur) this.draw(1);
    }
  };
  var A2Badge = class extends A2Element {
    static styles = `
:host { display: inline-flex; vertical-align: middle; }
.b { display: inline-flex; align-items: center; gap: 6px; height: 26px; padding: 0.12em 11px 0; border-radius: 13px; font-size: var(--a2-fs-sm); font-weight: var(--a2-weight-strong); white-space: nowrap; background: var(--a2-tonal); color: var(--a2-on-tonal); --c: var(--a2-on-tonal); }
:host([variant="accent"]) .b { --c: var(--a2-accent); background: var(--a2-accent-container); color: var(--a2-on-accent-container); }
:host([variant="success"]) .b { --c: var(--a2-success); }
:host([variant="warning"]) .b { --c: var(--a2-warning); }
:host([variant="danger"]) .b { --c: var(--a2-danger); }
:host(:is([variant="success"], [variant="warning"], [variant="danger"])) .b { background: color-mix(in srgb, var(--c) 18%, transparent); color: var(--c); }
.dot { display: none; width: 6px; height: 6px; margin-top: -0.12em; border-radius: 50%; background: var(--c); }
:host([dot]) .dot { display: block; }
`;
    render() {
      this.root.innerHTML = `<span class="b" part="base"><span class="dot"></span><slot></slot></span>`;
    }
  };
  var A2Card = class extends A2Element {
    static observedAttributes = ["heading", "description", "interactive"];
    static styles = `
:host { display: block; }
.c { position: relative; border-radius: var(--a2-r-lg); background: var(--a2-surface); padding: 22px; transition: border-radius var(--snap), box-shadow var(--fx), background-color var(--fx); }
:host([variant="outlined"]) .c { background: transparent; border: 1px solid var(--a2-line); }
:host([variant="elevated"]) .c { background: var(--a2-surface-high); box-shadow: var(--a2-shadow-sm); }
:host([interactive]) .c { cursor: pointer; user-select: none; }
:host([interactive]) .c:hover { background: var(--a2-surface-high); }
:host([interactive][variant="elevated"]) .c:hover { box-shadow: var(--a2-shadow); }
:host([interactive]) .c:active { border-radius: var(--a2-r-sm); }
.h { font-size: var(--a2-fs-lg); font-weight: var(--a2-weight-strong); line-height: 1.35; padding-top: 0.12em; }
.d { margin-top: 6px; color: var(--a2-text-muted); line-height: 1.5; }
.h:empty, .d:empty { display: none; }
.body, .top, .foot { position: relative; }
.foot { display: flex; gap: 8px; justify-content: flex-end; flex-wrap: wrap; }
.foot.on { margin-top: 20px; }
`;
    render() {
      this.root.innerHTML = `<div class="c" part="base"><div class="top"><div class="h" part="heading"></div><div class="d" part="description"></div></div><div class="body"><slot></slot></div><div class="foot" part="footer"><slot name="footer"></slot></div></div>`;
      this.root.querySelector("slot[name=footer]").addEventListener("slotchange", (e) => this.$(".foot").classList.toggle("on", e.target.assignedElements().length > 0));
      if (this.bool("interactive")) {
        ripple(this.$(".c"));
        this.$(".c").tabIndex = 0;
      }
    }
    update() {
      this.$(".h").textContent = this.str("heading");
      this.$(".d").textContent = this.str("description");
      const empty = !this.str("heading") && !this.str("description");
      this.$(".top").style.display = empty ? "none" : "";
      this.$(".body").style.marginTop = empty || !this.childNodes.length ? "0" : "14px";
    }
  };
  var A2Chip = class extends A2Element {
    static formAssociated = true;
    static delegatesFocus = true;
    static observedAttributes = ["selected", "disabled", "removable"];
    static styles = `
:host { display: inline-flex; vertical-align: middle; }
.c {
  position: relative; isolation: isolate; display: inline-flex; align-items: center; height: 34px; padding: 0 14px; border-radius: 10px; white-space: nowrap; user-select: none;
  border: 1px solid var(--a2-line-strong); color: var(--a2-text); transition: border-radius var(--snap), background-color var(--fx), border-color var(--fx), color var(--fx);
}
.c::before { content: ''; position: absolute; inset: -5px; z-index: -1; }
.c:hover { background: var(--a2-fill); }
.c:active { border-radius: 17px; }
.rp-box { z-index: -1; }
:host([selected]) .c { background: var(--a2-tonal); border-color: transparent; color: var(--a2-on-tonal); }
.ck { display: inline-grid; place-items: center; width: 0; overflow: clip; transition: width var(--snap), margin var(--snap); }
.ck svg { flex: none; transform: scale(0); transition: transform var(--snap); }
:host([selected]) .ck { width: 14px; margin-right: 8px; }
:host([selected]) .ck svg { transform: none; }
.x { display: none; position: relative; width: 20px; height: 20px; margin: 0 -6px 0 6px; border-radius: 50%; place-items: center; color: var(--a2-text-muted); }
:host([removable]) .x { display: grid; }
.x:hover { background: var(--a2-fill-active); color: var(--a2-text); }
`;
    render() {
      this.root.innerHTML = `<button class="c" part="base" type="button"><span class="ck">${icon("check", 12)}</span><span class="t"><slot></slot></span><span class="x hit" role="button" aria-label="지우기">${icon("x", 9)}</span></button>`;
      this.btn = this.$(".c");
      ripple(this.btn);
      this.btn.addEventListener("click", (e) => {
        if (e.target.closest(".x")) {
          if (this.emit("a2-remove", { value: this.value })) this.remove();
          return;
        }
        if (this.bool("static")) return;
        this.selected = !this.selected;
        this.fire("input");
        this.fire("change");
      });
    }
    get selected() {
      return this.bool("selected");
    }
    set selected(v) {
      this.setBool("selected", v);
    }
    get value() {
      return this.str("value", this.textContent.trim());
    }
    update() {
      this.btn.disabled = this.disabled;
      this.btn.setAttribute("aria-pressed", String(this.selected));
      this.internals.setFormValue(this.selected ? this.value : null);
    }
  };
  define("a2-progress", A2Progress);
  define("a2-spinner", A2Spinner);
  define("a2-badge", A2Badge);
  define("a2-card", A2Card);
  define("a2-chip", A2Chip);

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
.panel { position: absolute; display: flex; flex-direction: column; background: var(--a2-surface-high); box-shadow: var(--a2-shadow); outline: none; will-change: transform; }
.head { display: flex; align-items: flex-start; gap: 12px; padding: 24px 24px 0; }
.titles { flex: 1; min-width: 0; }
.h { font-size: var(--a2-fs-lg); font-weight: var(--a2-weight-strong); line-height: 1.35; padding-top: 0.12em; }
.d { margin-top: 8px; color: var(--a2-text-muted); line-height: 1.55; }
.h:empty, .d:empty { display: none; }
.x { flex: none; width: 36px; height: 36px; margin: -6px -8px 0 0; border-radius: 50%; display: grid; place-items: center; color: var(--a2-text-muted); transition: background-color var(--fx), color var(--fx), transform var(--snap); }
.x:hover { background: var(--a2-fill-hover); color: var(--a2-text); }
.x:active { transform: scale(0.86); }
:host([no-close]) .x { display: none; }
.body { padding: 18px 24px 0; overflow: auto; line-height: 1.55; flex: 1 1 auto; min-height: 0; }
.foot { display: flex; gap: 8px; justify-content: flex-end; flex-wrap: wrap; padding: 24px; }
.foot:not(.on) { padding-top: 0; }
`;
  var OverlayBase = class extends A2Element {
    static observedAttributes = ["open", "heading", "description"];
    render() {
      this.root.innerHTML = `<dialog part="dialog"><div class="scrim" part="scrim"></div><div class="panel" part="panel" tabindex="-1" role="document"><div class="grab"></div><div class="head"><div class="titles"><div class="h" part="heading"></div><div class="d" part="description"></div></div><button class="x hit" type="button" aria-label="닫기">${icon("x", 14)}</button></div><div class="body" part="body"><slot></slot></div><div class="foot" part="footer"><slot name="footer"></slot></div></div></dialog>`;
      this.dlg = this.$("dialog");
      this.panel = this.$(".panel");
      this.scrim = this.$(".scrim");
      this.sp = new Spring(0, "move", (p) => this.paint(p), 2e-3);
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
    /** from: 이 요소 자리에서 펼쳐진다(주지 않으면 방금 초점이 있던 요소) */
    show(from) {
      this._from = from instanceof Element ? from : null;
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
      this.returnValue = "";
      this._ret = this._from || document.activeElement;
      if (!this.dlg.open) this.dlg.showModal();
      if (!this._locked) {
        this._locked = true;
        lockScroll(true);
      }
      this.origin(this._ret);
      const auto = this.querySelector("[autofocus]");
      if (auto) auto.focus();
      else this.panel.focus({ preventScroll: true });
      this.sp.rest = null;
      this.sp.set(1, { cfg: this.springIn || "move" });
      this.emit("a2-show");
    }
    doClose(velocity) {
      if (!this.dlg.open) return;
      this.sp.rest = () => {
        if (this.open) return;
        this.dlg.close();
        if (this._locked) {
          this._locked = false;
          lockScroll(false);
        }
        if (this._ret && this._ret.isConnected) this._ret.focus?.({ preventScroll: true });
        this.emit("a2-close", { returnValue: this.returnValue });
      };
      this.sp.set(0, { cfg: "fx", velocity: velocity ?? 0 });
    }
    origin() {
    }
    paint(p) {
      this._p = p;
      this.scrim.style.opacity = Math.min(1, Math.max(0, p));
    }
  };
  var A2Dialog = class extends OverlayBase {
    static styles = `${OVERLAY_CSS}
.panel { left: 50%; top: 50%; width: min(var(--w, 440px), calc(100vw - 32px)); max-height: calc(100dvh - 48px); border-radius: var(--a2-r-xl); translate: -50% -50%; }
:host([size="sm"]) { --w: 360px; }
:host([size="lg"]) { --w: 640px; }
`;
    /** 펼쳐지기 시작할 자리: 연 요소의 가운데와 크기 */
    origin(from) {
      this.panel.style.transform = "";
      const pr = this.panel.getBoundingClientRect();
      let o = { x: 0, y: 26, s: 0.86 };
      if (from && from !== document.body && from.getBoundingClientRect) {
        const r = from.getBoundingClientRect();
        if (r.width && r.bottom > 0 && r.top < innerHeight) o = { x: r.left + r.width / 2 - (pr.left + pr.width / 2), y: r.top + r.height / 2 - (pr.top + pr.height / 2), s: Math.min(0.9, Math.max(0.3, r.width / pr.width)) };
      }
      this.o = o;
      this.paint(this.sp.x);
    }
    paint(p) {
      super.paint(p);
      const o = this.o || { x: 0, y: 26, s: 0.86 }, q = 1 - p;
      this.panel.style.transform = p === 1 ? "" : `translate(${o.x * q}px, ${o.y * q}px) scale(${o.s + (1 - o.s) * p})`;
      this.panel.style.opacity = p >= 0.3 ? "" : Math.max(0, p / 0.3);
    }
  };
  var A2Drawer = class extends OverlayBase {
    springIn = "slow";
    static styles = `${OVERLAY_CSS}
/* 스프링이 조금 넘치더라도 가장자리가 비지 않게 화면 밖으로 60px 더 뻗어 있다 */
.panel { top: 0; bottom: 0; right: -60px; padding-right: 60px; width: calc(min(var(--w, 380px), 100vw) + 60px); border-radius: var(--a2-r-xl) 0 0 var(--a2-r-xl); }
:host([side="left"]) .panel { right: auto; left: -60px; padding-right: 0; padding-left: 60px; border-radius: 0 var(--a2-r-xl) var(--a2-r-xl) 0; }
:host([side="bottom"]) .panel { top: auto; left: 0; right: 0; bottom: -60px; padding: 0 0 60px; width: auto; max-height: calc(85dvh + 60px); border-radius: var(--a2-r-xl) var(--a2-r-xl) 0 0; }
.grab { display: none; }
:host([side="bottom"]) .grab { display: block; flex: none; height: 28px; cursor: grab; touch-action: none; position: relative; }
:host([side="bottom"]) .grab::after { content: ''; position: absolute; left: 50%; top: 12px; width: 36px; height: 4px; margin-left: -18px; border-radius: 2px; background: var(--a2-line-strong); transition: width var(--snap), margin var(--snap); }
:host([side="bottom"]) .grab:active::after { width: 56px; margin-left: -28px; }
:host([side="bottom"]) .head { padding-top: 6px; touch-action: none; }
`;
    render() {
      super.render();
      let h = 1;
      const onGrab = (el) => drag(el, {
        start: (e) => {
          if (this.str("side") !== "bottom" || e.target.closest(".x")) return false;
          h = this.panel.offsetHeight - 60;
          this.sp.stop();
        },
        move: ({ dy }) => {
          const p = 1 - dy / h;
          this.sp.x = p > 1 ? 1 + rubber(p - 1, 0.12) : p;
          this.paint(this.sp.x);
        },
        end: ({ dy, vy }) => {
          const v = -vy / h;
          if ((vy > 700 || dy / h > 0.34) && !this.bool("persistent")) {
            this._v0 = v;
            this.close();
          } else this.sp.set(1, { cfg: "move", velocity: v });
        }
      });
      onGrab(this.$(".grab"));
      onGrab(this.$(".head"));
    }
    origin() {
      this._size = 0;
      this.paint(this.sp.x);
    }
    doClose() {
      const v = this._v0;
      this._v0 = null;
      super.doClose(v);
    }
    paint(p) {
      super.paint(p);
      const side = this.str("side", "right"), q = 1 - p;
      const size = this._size || (this._size = (side === "bottom" ? this.panel.offsetHeight : this.panel.offsetWidth) - 60);
      const d = q * size;
      this.panel.style.transform = side === "left" ? `translateX(${-d}px)` : side === "bottom" ? `translateY(${d}px)` : `translateX(${d}px)`;
    }
  };
  define("a2-dialog", A2Dialog);
  define("a2-drawer", A2Drawer);

  // src/elements/menu.js
  var A2MenuItem = class extends HTMLElement {
    get value() {
      return this.getAttribute("value") ?? this.textContent.trim();
    }
  };
  var A2Menu = class extends A2Element {
    static observedAttributes = ["for", "trigger"];
    static styles = `${POPOVER_CSS}
:host { display: contents; }
.menu:focus { outline: none; }
.item .ic { flex: none; width: 18px; display: grid; place-items: center; color: var(--a2-text-muted); }
.item .ic:empty { display: none; }
.item.danger, .item.danger .ic { color: var(--a2-danger); }
.item.danger:hover, .item.danger.active { background: color-mix(in srgb, var(--a2-danger) 14%, transparent); }
.kb { flex: none; margin-left: 14px; color: var(--a2-text-faint); font-size: var(--a2-fs-sm); padding-top: 0.12em; }
.head { padding: 8px 10px 4px; color: var(--a2-text-faint); font-size: var(--a2-fs-sm); }
`;
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
  define("a2-menu-item", A2MenuItem);
  define("a2-menu", A2Menu);

  // src/api/toast.js
  var CSS2 = `
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
  var host = null;
  var layer = null;
  function ensureLayer() {
    ensureGlobal();
    if (host && host.isConnected) return;
    host = document.createElement("div");
    host.setAttribute("data-a2-toasts", "");
    const root = host.attachShadow({ mode: "open" });
    root.adoptedStyleSheets = [sheet(BASE_CSS), sheet(CSS2)];
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
  var setT = (el) => {
    el.style.translate = `${el._fx?.x || 0}px ${el._fy?.x || 0}px`;
  };
  function flip(fn) {
    const before = new Map([...layer.children].map((el) => [el, el.getBoundingClientRect().top]));
    fn();
    for (const el of layer.children) {
      const b = before.get(el);
      if (b == null) continue;
      const d = b - el.getBoundingClientRect().top;
      if (Math.abs(d) < 1) continue;
      el._fy ||= new Spring(0, "move", () => setT(el));
      el._fy.x += d;
      setT(el);
      el._fy.set(0);
    }
  }
  function toast(message, o = {}) {
    ensureLayer();
    if (o.position) host.setAttribute("pos", o.position);
    const top = host.getAttribute("pos") === "top";
    const v = o.variant && o.variant !== "default" ? o.variant : null;
    const el = document.createElement("div");
    el.className = `toast${o.action ? "" : " plain"}`;
    el.innerHTML = `${v ? `<span class="ic ${v}">${icon(v === "info" ? "info" : v, 16)}</span>` : ""}<span class="msg"></span>${o.action ? `<button class="act" type="button">${esc(o.action.label)}</button>` : ""}`;
    el.querySelector(".msg").textContent = message;
    let timer2 = 0, closed = false;
    const done = () => {
      flip(() => el.remove());
      if (!layer.children.length) try {
        layer.hidePopover();
      } catch (_) {
      }
      o.onClose && o.onClose();
    };
    const up = new Spring(0, "move", (p) => reveal(el, Math.min(p, 1), top ? "top" : "bottom"), 2e-3);
    const close = () => {
      if (closed) return;
      closed = true;
      el._closing = true;
      clearTimeout(timer2);
      up.rest = done;
      up.set(0, { cfg: "fx" });
    };
    el._fx = new Spring(0, "snap", () => setT(el));
    drag(el, {
      start: (e) => {
        if (e.target.closest(".act") || closed) return false;
        clearTimeout(timer2);
        el._fx.stop();
      },
      move: ({ dx }) => {
        el._fx.x = dx;
        setT(el);
      },
      end: ({ dx, vx }) => {
        const w = el.offsetWidth;
        if (Math.abs(vx) > 600 || Math.abs(dx) > w * 0.4) {
          const dir = (Math.abs(vx) > 600 ? vx : dx) > 0 ? 1 : -1;
          closed = true;
          el._closing = true;
          el._fx.rest = done;
          el._fx.set(dir * (w + innerWidth / 2), { cfg: "fx", velocity: vx });
        } else {
          el._fx.set(0, { cfg: "snap", velocity: vx });
          arm();
        }
      }
    });
    if (o.action) el.querySelector(".act").addEventListener("click", () => {
      o.action.onClick && o.action.onClick();
      close();
    });
    const dur = o.duration ?? (o.action ? 5e3 : 3e3);
    const arm = () => {
      clearTimeout(timer2);
      if (dur > 0 && !closed) timer2 = setTimeout(close, dur);
    };
    el.addEventListener("pointerenter", () => clearTimeout(timer2));
    el.addEventListener("pointerleave", arm);
    raise();
    const open = [...layer.children].filter((c) => !c._closing);
    for (const c of open.slice(0, Math.max(0, open.length - (o.max ?? 4) + 1))) c._close?.();
    el._close = close;
    flip(() => layer.append(el));
    reveal(el, 0, top ? "top" : "bottom");
    up.set(1);
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
      el.setAttribute("variant", b.primary ? danger ? "danger" : "primary" : "ghost");
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
  var CSS3 = `
.tip { position: fixed; inset: auto; margin: 0; border: 0; padding: 7px 12px 6px; max-width: 260px; border-radius: 10px; overflow: visible;
  background: var(--a2-tip); color: var(--a2-on-tip); font-family: var(--a2-font); font-size: var(--a2-fs-sm); font-weight: var(--a2-weight); line-height: 1.4;
  pointer-events: none; box-shadow: var(--a2-shadow-sm); }
`;
  var tip = null;
  var cur = null;
  var timer = 0;
  var shownAt = 0;
  var sp = null;
  function ensure() {
    if (tip) return;
    ensureGlobal();
    const host2 = document.createElement("div");
    host2.setAttribute("data-a2-tooltip", "");
    const root = host2.attachShadow({ mode: "open" });
    root.adoptedStyleSheets = [sheet(BASE_CSS), sheet(CSS3)];
    tip = document.createElement("div");
    tip.className = "tip";
    tip.setAttribute("popover", "manual");
    tip.setAttribute("role", "tooltip");
    tip.id = "a2-tooltip";
    root.append(tip);
    document.body.append(host2);
    sp = new Spring(0, "snap", (p) => {
      tip.style.transform = p === 1 ? "" : `scale(${0.5 + 0.5 * p})`;
      tip.style.opacity = p >= 0.4 ? "" : Math.max(0, p / 0.4);
    }, 2e-3);
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
    tip.style.transformOrigin = { top: "50% 100%", bottom: "50% 0%", left: "100% 50%", right: "0% 50%" }[side];
    sp.rest = null;
    sp.jump(0);
    sp.set(1, { cfg: "snap" });
    shownAt = performance.now();
    el.setAttribute("aria-describedby", "a2-tooltip");
  }
  function hide() {
    clearTimeout(timer);
    if (!cur) return;
    shownAt = performance.now();
    cur.removeAttribute("aria-describedby");
    cur = null;
    sp.rest = () => {
      if (!cur) try {
        tip.hidePopover();
      } catch (_) {
      }
    };
    sp.set(0, { cfg: "fxFast" });
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
    }, { passive: true });
    document.addEventListener("pointerout", (e) => {
      if (!e.relatedTarget) hide();
    }, { passive: true });
    document.addEventListener("focusin", (e) => {
      const el = target(e);
      if (el && el.matches(":focus-visible, :has(:focus-visible)")) show(el);
    });
    document.addEventListener("focusout", () => hide());
    document.addEventListener("pointerdown", () => hide(), true);
    addEventListener("keydown", (e) => {
      if (e.key === "Escape") hide();
    }, true);
    addEventListener("scroll", () => {
      if (cur) hide();
    }, { capture: true, passive: true });
  }

  // src/api/theme.js
  var NAMES2 = ["dark", "light", "ocean"];
  var mq = null;
  var mode = null;
  var apply = () => document.documentElement.setAttribute("data-a2-theme", mode === "auto" ? mq.matches ? "light" : "dark" : mode);
  function theme(name) {
    ensureGlobal();
    if (name === void 0) return mode || document.documentElement.getAttribute("data-a2-theme") || "dark";
    if (name !== "auto" && !NAMES2.includes(name)) throw new Error(`adas2: 알 수 없는 테마 "${name}". ${NAMES2.join(", ")}, auto 중 하나`);
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
  var themes = NAMES2;
  var blockOf = (name) => {
    const m = global_default.match(new RegExp(`\\[data-a2-theme="${name}"\\] \\{([^}]*)\\}`));
    return m ? m[1] : "";
  };
  var lum = (hex) => {
    const n = parseInt(hex.replace("#", "").replace(/^(.)(.)(.)$/, "$1$1$2$2$3$3").slice(0, 6), 16);
    const f = (v) => {
      v /= 255;
      return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * f(n >> 16) + 0.7152 * f(n >> 8 & 255) + 0.0722 * f(n & 255);
  };
  function defineTheme(name, { base = "dark", accent, tokens = {} } = {}) {
    ensureGlobal();
    if (!/^[a-z][\w-]*$/i.test(name) || name === "auto") throw new Error(`adas2: 테마 이름 "${name}" 은 쓸 수 없습니다`);
    const dark = base !== "light";
    let css = blockOf(base === "ocean" ? "ocean" : dark ? "dark" : "light");
    if (accent) {
      const on = lum(accent) > 0.36 ? "#111111" : "#FFFFFF";
      css += `
  --a2-accent: ${accent};
  --a2-accent-hover: color-mix(in oklab, ${accent} 86%, white);
  --a2-accent-pressed: color-mix(in oklab, ${accent} 86%, black);
  --a2-accent-soft: color-mix(in srgb, ${accent} 16%, transparent);
  --a2-on-accent: ${on};
  --a2-accent-container: color-mix(in oklab, ${accent} ${dark ? "36%, black" : "24%, white"});
  --a2-on-accent-container: color-mix(in oklab, ${accent} ${dark ? "22%, white" : "40%, black"});
  --a2-tonal: color-mix(in oklab, ${accent} 14%, var(--a2-surface-highest));
  --a2-on-tonal: color-mix(in oklab, ${accent} 12%, var(--a2-text));
  --a2-tip-accent: color-mix(in oklab, ${accent} ${dark ? "70%, black" : "70%, white"});`;
    }
    for (const k in tokens) css += `
  ${k.startsWith("--") ? k : `--a2-${k}`}: ${tokens[k]};`;
    let st = document.querySelector(`style[data-adas2-theme="${name}"]`);
    if (!st) {
      st = document.createElement("style");
      st.dataset.adas2Theme = name;
      document.head.append(st);
    }
    st.textContent = `[data-a2-theme="${name}"] {${css}
}`;
    if (!NAMES2.includes(name)) NAMES2.push(name);
    return name;
  }

  // src/index.js
  var version = "5.0.0";
  if (typeof document !== "undefined") {
    ensureGlobal();
    installMotion();
    installTooltips();
  }
  var index_default = {
    version,
    toast,
    alert,
    confirm,
    prompt,
    theme,
    themes,
    defineTheme,
    setMotion,
    A2Element,
    define,
    BASE_CSS,
    icon,
    addIcon,
    ripple,
    openPopover,
    Spring,
    springs,
    SPRINGS,
    springEase,
    drag,
    rubber,
    animate,
    reveal,
    Ease,
    evaluate,
    matchKey: matches,
    keyNames
  };
  return __toCommonJS(index_exports);
})();
adas2=adas2.default||adas2;
