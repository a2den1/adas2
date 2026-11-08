import { Component } from './base.js';
import { h } from '../core/dom.js';
import { parseColor } from '../core/tween.js';
import { openFloat } from '../core/float.js';

const c01 = v => Math.min(1, Math.max(0, v));
const hx = v => Math.round(c01(v) * 255).toString(16).padStart(2, '0').toUpperCase();
export const toHex = ({ r, g, b, a = 1 }) => `#${hx(r)}${hx(g)}${hx(b)}${a < 1 ? hx(a) : ''}`;
export function fromAny(c) { const [r, g, b, a] = parseColor(c); return { r: r / 255, g: g / 255, b: b / 255, a: a ?? 1 }; }
function rgb2hsv({ r, g, b }) {
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
  let hh = 0;
  if (d) hh = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return { h: ((hh / 6) + 1) % 1, s: mx ? d / mx : 0, v: mx };
}
function hsv2rgb(hh, s, v) {
  const f = n => { const k = (n + hh * 6) % 6; return v - v * s * Math.max(0, Math.min(k, 4 - k, 1)); };
  return { r: f(5), g: f(3), b: f(1) };
}
const PRESETS = ['#FF7A45', '#F4B740', '#5CCB8A', '#3FC1C9', '#4C8DFF', '#8E7CFF', '#F25F8A', '#F3EEE9', '#8A847E', '#1B1917'];

/** 색 고르기: 상자를 누르면 채도·명도 판, 색상 막대, 투명도 막대, HEX, 미리 정한 색이 뜬다 */
export class ColorPicker extends Component {
  constructor(o = {}) {
    super('color', o);
    if (o.label) this.header(this.el, o.label);
    this.box = h('button', 'a2-select-box a2-color-box', this.el);
    this.box.type = 'button';
    this.sw = h('span', 'a2-swatch', this.box);
    this.swFill = h('span', 'a2-swatch-fill', this.sw);
    this.text = h('span', 'a2-select-text a2-color-text', this.box);
    this.rgba = fromAny(o.value || '#FF7A45');
    this.hsv = rgb2hsv(this.rgba);
    this._value = toHex(this.rgba);
    this.box.addEventListener('click', () => { if (!this.disabled) (this.float && this.float.open ? this.close() : this.open()); });
    this.render(true);
  }
  normalize(v) { return typeof v === 'string' ? toHex(fromAny(v)) : toHex(v); }
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
    if (hex !== this._value) { this._value = hex; this.render(false); this.emit('change', hex); }
  }
  render() {
    const { r, g, b, a } = this.rgba;
    this.swFill.style.background = `rgba(${r * 255}, ${g * 255}, ${b * 255}, ${a})`;
    this.text.textContent = this._value;
    this.paintReset();
    this.paintPopup();
  }
  open() {
    this.el.classList.add('a2-open');
    this.float = openFloat({ anchor: this.box, className: 'a2-color-pop', onClose: () => { this.el.classList.remove('a2-open'); this.float = null; this.emit('commit', this._value); } });
    const p = this.float.el;
    this.sv = h('div', 'a2-sv', p); this.svDot = h('span', 'a2-sv-dot', this.sv);
    this.hue = h('div', 'a2-bar a2-hue', p); this.hueDot = h('span', 'a2-bar-dot', this.hue);
    this.alpha = h('div', 'a2-bar a2-alpha', p); this.alphaFill = h('span', 'a2-alpha-fill', this.alpha); this.alphaDot = h('span', 'a2-bar-dot', this.alpha);
    const row = h('div', 'a2-color-row', p);
    this.hex = h('input', 'a2-field-input a2-hex', row);
    this.hex.spellcheck = false; this.hex.maxLength = 9;
    this.preview = h('span', 'a2-swatch a2-color-preview', row); this.previewFill = h('span', 'a2-swatch-fill', this.preview);
    const pre = h('div', 'a2-presets', p);
    for (const c of this.opts.presets || PRESETS) {
      const s = h('button', 'a2-preset', pre); s.type = 'button'; s.style.background = c; s.title = c;
      s.addEventListener('click', () => { this.set(c); });
    }
    const drag = (el, fn) => {
      let on = false;
      const at = e => { const r = el.getBoundingClientRect(); fn(c01((e.clientX - r.left) / r.width), c01((e.clientY - r.top) / r.height)); };
      el.addEventListener('pointerdown', e => { if (e.button) return; on = true; try { el.setPointerCapture(e.pointerId); } catch (_) {} at(e); });
      el.addEventListener('pointermove', e => { if (on) at(e); });
      el.addEventListener('pointerup', () => { on = false; });
    };
    drag(this.sv, (x, y) => this.setHsv(this.hsv.h, x, 1 - y));
    drag(this.hue, x => this.setHsv(x, this.hsv.s, this.hsv.v));
    drag(this.alpha, x => this.setHsv(this.hsv.h, this.hsv.s, this.hsv.v, x));
    this.hex.addEventListener('input', () => {
      const t = this.hex.value.trim().replace(/^#/, '');
      const ok = /^([0-9a-f]{6}|[0-9a-f]{8})$/i.test(t);
      this.hex.classList.toggle('a2-bad', !ok && !/^[0-9a-f]{0,8}$/i.test(t));
      if (ok) this.set(`#${t}`);
    });
    this.hex.addEventListener('keydown', e => { if (e.key === 'Enter') this.close(); e.stopPropagation(); });
    this.paintPopup();
  }
  close() { this.float && this.float.close(); }
  paintPopup() {
    if (!this.float || !this.sv) return;
    const { h: hh, s, v } = this.hsv, pure = toHex({ ...hsv2rgb(hh, 1, 1), a: 1 }), solid = toHex({ ...this.rgba, a: 1 });
    this.sv.style.setProperty('--a2-hue', pure);
    this.svDot.style.left = `${s * 100}%`; this.svDot.style.top = `${(1 - v) * 100}%`; this.svDot.style.background = solid;
    this.hueDot.style.left = `${hh * 100}%`; this.hueDot.style.background = pure;
    this.alphaFill.style.background = `linear-gradient(to right, transparent, ${solid})`;
    this.alphaDot.style.left = `${this.rgba.a * 100}%`;
    this.previewFill.style.background = this.swFill.style.background;
    if (document.activeElement !== this.hex) { this.hex.value = this._value; this.hex.classList.remove('a2-bad'); }
  }
  destroy() { this.close(); super.destroy(); }
}
