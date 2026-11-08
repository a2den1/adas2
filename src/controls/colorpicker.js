import { Control } from './control.js';
import { h, px, resolveOptions, themeVar } from '../core/dom.js';
import { tween, parseColor } from '../core/tween.js';
import { Slider } from './slider.js';

export const ColorPickerOptions = {
  value: '#FFFFFF', defaultValue: null, label: '',
  onChanged: null, onComplete: null, tooltip: null,
};

const clamp01 = v => Math.min(1, Math.max(0, v));
const hex2 = v => Math.round(clamp01(v) * 255).toString(16).padStart(2, '0').toUpperCase();
export function toHex({ r, g, b, a }) { return `#${hex2(r)}${hex2(g)}${hex2(b)}${a < 1 ? hex2(a) : ''}`; }
export function fromAny(c) {
  const [r, g, b, a] = parseColor(c);
  return { r: r / 255, g: g / 255, b: b / 255, a: a ?? 1 };
}
function rgb2hsv({ r, g, b }) {
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  let hh = 0;
  if (d) hh = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return { h: ((hh / 6) + 1) % 1, s: max ? d / max : 0, v: max };
}
function hsv2rgb(hh, s, v) {
  const f = n => { const k = (n + hh * 6) % 6; return v - v * s * Math.max(0, Math.min(k, 4 - k, 1)); };
  return { r: f(5), g: f(3), b: f(1) };
}
const lum = c => { const t = x => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4); return 0.2126 * t(c.r) + 0.7152 * t(c.g) + 0.0722 * t(c.b); };

/** 색 고르기. 줄을 누르면 색상환·채널 슬라이더·HEX 입력이 있는 창이 열린다 */
export class ColorPicker extends Control {
  constructor(parent, id, opts) {
    super(parent, id, resolveOptions(ColorPickerOptions, opts), 'colorpicker');
    const o = this.opts, el = this.el;
    this.rgba = fromAny(o.value);
    this.hsv = rgb2hsv(this.rgba);
    this.useHsv = false;
    el.tabIndex = 0;
    el.setAttribute('role', 'button');
    this.addHoverOutline();
    this.addChangedDot();
    this.label = h('span', 'a2-label', el, o.label);
    this.swatch = h('span', 'a2-swatch', el);
    this.swatchFill = h('span', 'a2-swatch-fill', this.swatch);
    this.swatchText = h('span', 'a2-swatch-text', this.swatch);
    el.addEventListener('click', e => { if (!this.blocked && !this.popup?.contains(e.target)) this.open(); });
    el.addEventListener('keydown', e => { if (e.target === el && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); this.open(); } });
    this.enableMiddleReset();
    this.updateVisual(true);
  }
  get value() { return toHex(this.rgba); }
  set value(v) { this.set(v, false); }
  equals(a, b) { return a && b && toHex(fromAny(a)) === toHex(fromAny(b)); }
  afterReset() { this.opts.onComplete && this.opts.onComplete(this.value, this); }
  set(v, notify = true) {
    const c = typeof v === 'string' ? fromAny(v) : { r: clamp01(v.r), g: clamp01(v.g), b: clamp01(v.b), a: clamp01(v.a ?? 1) };
    if (toHex(c) === this.value) return;
    this.rgba = c;
    const hsv = rgb2hsv(c);
    if (hsv.s > 0 && hsv.v > 0) this.hsv = hsv; else this.hsv = { ...this.hsv, s: hsv.s, v: hsv.v };
    this.updateVisual(false);
    if (notify && this.opts.onChanged) this.opts.onChanged(this.value, this);
  }
  setHsv(hh, s, v, notify = true) {
    this.hsv = { h: hh, s: clamp01(s), v: clamp01(v) };
    const c = hsv2rgb(this.hsv.h, this.hsv.s, this.hsv.v);
    this.rgba = { ...c, a: this.rgba.a };
    this.updateVisual(false);
    if (notify && this.opts.onChanged) this.opts.onChanged(this.value, this);
  }
  updateVisual(noAnimate) {
    const { r, g, b, a } = this.rgba;
    const css = `rgba(${r * 255}, ${g * 255}, ${b * 255}, ${a})`;
    this.swatchFill.style.background = css;
    this.swatchText.textContent = this.value;
    // 패널 위에 겹친 색 기준으로 글자색(흑/백) 고르기
    const bg = fromAny(themeVar(this.el, 'panel-bg') || '#25242E');
    const mixed = { r: r * a + bg.r * (1 - a), g: g * a + bg.g * (1 - a), b: b * a + bg.b * (1 - a) };
    const L = lum(mixed);
    this.swatchText.style.color = (L + 0.05) / 0.05 > 1.05 / (L + 0.05) ? '#000' : '#fff';
    this.paintChangedDot(noAnimate);
    if (this.popup) this.syncPopup();
  }

  // ── 창
  open() {
    if (this.popup) return;
    this.blocker = h('div', 'a2-cp-blocker', document.body);
    this.blocker.addEventListener('pointerdown', e => { if (e.button === 0) this.close(); });
    const p = this.popup = h('div', 'a2 a2-cp-popup', document.body);
    p.setAttribute('role', 'dialog');
    this.canvas = h('canvas', 'a2-cp-wheel', p);
    this.canvas.width = this.canvas.height = 256;
    this.ringHandle = h('span', 'a2-cp-handle a2-cp-ring-handle', p);
    this.triHandle = h('span', 'a2-cp-handle a2-cp-tri-handle', p);
    const tabs = h('div', 'a2-cp-tabs', p);
    this.tabRgb = h('button', 'a2-cp-tab', tabs, 'RGB'); this.tabHsv = h('button', 'a2-cp-tab', tabs, 'HSV');
    this.tabRgb.onclick = () => this.setMode(false); this.tabHsv.onclick = () => this.setMode(true);
    this.chanBox = h('div', 'a2-cp-channels', p);
    this.hexRow = h('div', 'a2-ctl a2-input a2-cp-hex a2-no-icon', p);
    h('div', 'a2-hover-outline', this.hexRow);
    this.hex = h('input', 'a2-field', this.hexRow);
    this.hex.spellcheck = false;
    this.hex.addEventListener('input', () => this.onHexType());
    this.hex.addEventListener('keydown', e => { if (e.key === 'Enter') this.hex.blur(); if (e.key === 'Escape') this.close(); e.stopPropagation(); });
    this.hex.addEventListener('blur', () => this.commitHex());
    this.buildChannels();
    this.wireWheel();
    this.drawWheel(true);
    this.syncPopup();
    this.place();
    this._place = () => this.place();
    addEventListener('resize', this._place); addEventListener('scroll', this._place, true);
    this._key = e => { if (e.key === 'Escape') this.close(); };
    addEventListener('keydown', this._key);
    p.style.opacity = '0';
    this._pt && this._pt.kill();
    this._pt = tween({ s: 0.96, o: 0 }, { s: 1, o: 1 }, 0.2, 'OutBack', v => { p.style.transform = `scale(${v.s})`; p.style.opacity = Math.min(1, v.o * 1.25); });
  }
  close() {
    const p = this.popup; if (!p) return;
    removeEventListener('resize', this._place); removeEventListener('scroll', this._place, true); removeEventListener('keydown', this._key);
    this.blocker.remove(); this.blocker = null;
    this.popup = null;
    this._pt && this._pt.kill();
    this._pt = tween({ s: 1, o: 1 }, { s: 0.96, o: 0 }, 0.16, 'OutSine', v => { p.style.transform = `scale(${v.s})`; p.style.opacity = v.o; }, () => p.remove());
    this.opts.onComplete && this.opts.onComplete(this.value, this);
  }
  place() {
    const r = this.el.getBoundingClientRect(), p = this.popup, m = px(this.el, 8);
    const w = p.offsetWidth, ht = p.offsetHeight;
    let x = r.left, y = r.bottom + px(this.el, 6);
    x = Math.min(Math.max(m, x), innerWidth - w - m);
    if (y + ht > innerHeight - m) y = Math.max(m, r.top - ht - px(this.el, 6));
    p.style.left = `${x}px`; p.style.top = `${y}px`;
  }
  setMode(useHsv) { this.useHsv = useHsv; this.buildChannels(); this.syncPopup(); }
  buildChannels() {
    this.chanBox.textContent = '';
    const names = this.useHsv ? ['H', 'S', 'V', 'A'] : ['R', 'G', 'B', 'A'];
    const colors = this.useHsv ? [null, 'channel-s', 'channel-v', 'channel-a'] : ['channel-r', 'channel-g', 'channel-b', 'channel-a'];
    const def = this.opts.defaultValue ? fromAny(this.opts.defaultValue) : null;
    const defHsv = def ? rgb2hsv(def) : null;
    this.chans = names.map((n, i) => {
      const key = n.toLowerCase();
      const dv = def ? (this.useHsv ? (key === 'a' ? def.a : defHsv[key]) : def[key]) : null;
      const s = new Slider(this.chanBox, null, {
        label: n, min: 0, max: 1, format: 3, value: this.chan(i), defaultValue: dv, height: 40,
        onChanged: v => this.setChannel(i, v),
      });
      if (colors[i]) s.fill.style.setProperty('--a2-fill', `var(--a2-${colors[i]})`);
      s._ci = i;
      return s;
    });
    this.tabRgb.classList.toggle('a2-on', !this.useHsv);
    this.tabHsv.classList.toggle('a2-on', this.useHsv);
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
    if (this.useHsv) { const hs = { ...this.hsv }; hs[['h', 's', 'v'][i]] = v; return this.setHsv(hs.h, hs.s, hs.v); }
    const c = { ...this.rgba }; c[['r', 'g', 'b'][i]] = v; this.set(c);
  }
  syncPopup() {
    if (!this.popup) return;
    for (const s of this.chans) s.set(this.chan(s._ci), false);
    if (this.useHsv) this.chans[0].fill.style.setProperty('--a2-fill', toHex({ ...hsv2rgb(this.hsv.h, 1, 1), a: 1 }));
    if (document.activeElement !== this.hex) { this.hex.value = toHex({ ...this.rgba, a: this.rgba.a }).slice(1).padEnd(8, 'F'); this.hexRow.style.removeProperty('--a2-state'); }
    this.drawWheel();
  }
  onHexType() {
    const t = this.hex.value.trim().replace(/^#/, '');
    let state = 'err';
    if (/^[0-9a-f]{6}([0-9a-f]{2})?$/i.test(t)) state = 'ok';
    else if (/^[0-9a-f]{0,8}$/i.test(t)) state = 'warn';
    this.hexRow.classList.add('a2-stated');
    this.hexRow.style.setProperty('--a2-state', `var(--a2-math-${state})`);
    if (state === 'ok') this.swatchFill.style.background = `#${t}`;
  }
  commitHex() {
    const t = this.hex.value.trim().replace(/^#/, '');
    this.hexRow.classList.remove('a2-stated');
    if (/^[0-9a-f]{6}([0-9a-f]{2})?$/i.test(t)) { this.set(`#${t}`); this.opts.onComplete && this.opts.onComplete(this.value, this); }
    this.updateVisual(true);
  }

  // ── 색상환: 바깥 고리 = 색상, 안쪽 삼각형 = 채도·명도
  geom() {
    const a = this.hsv.h * Math.PI * 2, R = 0.32;
    const pt = ang => ({ x: 0.5 + R * Math.cos(ang), y: 0.5 - R * Math.sin(ang) });
    return { hue: pt(a), white: pt(a + (2 * Math.PI) / 3), black: pt(a - (2 * Math.PI) / 3), a };
  }
  drawWheel(force) {
    const c = this.canvas, g = c.getContext('2d'), N = c.width;
    if (force || this._drawnHue !== this.hsv.h) {
      this._drawnHue = this.hsv.h;
      const img = g.createImageData(N, N), d = img.data, G = this.geom();
      const pure = hsv2rgb(this.hsv.h, 1, 1);
      const P = [G.hue, G.white, G.black].map(p => ({ x: p.x * N, y: p.y * N }));
      const det = (P[1].y - P[2].y) * (P[0].x - P[2].x) + (P[2].x - P[1].x) * (P[0].y - P[2].y);
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
        const dx = (x + 0.5) / N - 0.5, dy = (y + 0.5) / N - 0.5, dist = Math.hypot(dx, dy), i = (y * N + x) * 4;
        let rgb = null, alpha = 255;
        if (dist >= 0.37 && dist <= 0.49) {
          const hh = ((Math.atan2(-dy, dx) / (2 * Math.PI)) + 1) % 1;
          rgb = hsv2rgb(hh, 1, 1);
          const edge = Math.min(dist - 0.37, 0.49 - dist) * N; alpha = Math.min(255, edge * 255);
        } else {
          const X = x + 0.5, Y = y + 0.5;
          const w0 = ((P[1].y - P[2].y) * (X - P[2].x) + (P[2].x - P[1].x) * (Y - P[2].y)) / det;
          const w1 = ((P[2].y - P[0].y) * (X - P[2].x) + (P[0].x - P[2].x) * (Y - P[2].y)) / det;
          const w2 = 1 - w0 - w1;
          if (w0 >= -0.004 && w1 >= -0.004 && w2 >= -0.004) rgb = { r: pure.r * w0 + w1, g: pure.g * w0 + w1, b: pure.b * w0 + w1 };
        }
        if (rgb) { d[i] = rgb.r * 255; d[i + 1] = rgb.g * 255; d[i + 2] = rgb.b * 255; d[i + 3] = alpha; }
      }
      g.putImageData(img, 0, 0);
    }
    const G = this.geom(), { s, v } = this.hsv;
    const wH = s * v, wW = v * (1 - s), wB = 1 - v;
    const tx = G.hue.x * wH + G.white.x * wW + G.black.x * wB, ty = G.hue.y * wH + G.white.y * wW + G.black.y * wB;
    const rx = 0.5 + 0.43 * Math.cos(G.a), ry = 0.5 - 0.43 * Math.sin(G.a);
    const place = (el, x, y) => { el.style.left = `calc(var(--a2-wheel-x) + ${x} * var(--a2-wheel))`; el.style.top = `calc(var(--a2-wheel-y) + ${y} * var(--a2-wheel))`; };
    place(this.ringHandle, rx, ry); place(this.triHandle, tx, ty);
    this.triHandle.style.background = toHex({ ...this.rgba, a: 1 });
    this.ringHandle.style.background = toHex({ ...hsv2rgb(this.hsv.h, 1, 1), a: 1 });
  }
  wireWheel() {
    const c = this.canvas;
    let mode = null;
    const pos = e => { const r = c.getBoundingClientRect(); return { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height }; };
    const apply = e => {
      const p = pos(e);
      if (mode === 'ring') {
        const hh = ((Math.atan2(-(p.y - 0.5), p.x - 0.5) / (2 * Math.PI)) + 1) % 1;
        this.setHsv(hh, this.hsv.s, this.hsv.v);
      } else {
        const G = this.geom(), P = [G.hue, G.white, G.black];
        const det = (P[1].y - P[2].y) * (P[0].x - P[2].x) + (P[2].x - P[1].x) * (P[0].y - P[2].y);
        let w0 = ((P[1].y - P[2].y) * (p.x - P[2].x) + (P[2].x - P[1].x) * (p.y - P[2].y)) / det;
        let w1 = ((P[2].y - P[0].y) * (p.x - P[2].x) + (P[0].x - P[2].x) * (p.y - P[2].y)) / det;
        let w2 = 1 - w0 - w1;
        w0 = Math.max(0, w0); w1 = Math.max(0, w1); w2 = Math.max(0, w2);
        const sum = w0 + w1 + w2 || 1; w0 /= sum; w1 /= sum;
        const V = w0 + w1, S = V > 0 ? w0 / V : 0;
        this.setHsv(this.hsv.h, S, V);
      }
    };
    c.addEventListener('pointerdown', e => {
      if (e.button !== 0) return;
      const p = pos(e), d = Math.hypot(p.x - 0.5, p.y - 0.5);
      if (d > 0.56) return;
      mode = d >= 0.34 ? 'ring' : 'tri';
      try { c.setPointerCapture(e.pointerId); } catch (_) {}
      apply(e);
    });
    c.addEventListener('pointermove', e => { if (mode) apply(e); });
    const end = () => { if (mode) { mode = null; this.opts.onComplete && this.opts.onComplete(this.value, this); } };
    c.addEventListener('pointerup', end); c.addEventListener('pointercancel', end);
  }
  dispose() { this.close(); super.dispose(); }
}
