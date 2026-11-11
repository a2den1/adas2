import { A2Element, define, esc } from '../core/base.js';
import { openPopover, POPOVER_CSS } from '../core/popover.js';

const clamp = (v, a, b) => Math.min(Math.max(v, a), b);
const hex2 = n => Math.round(n).toString(16).padStart(2, '0');

/** '#rgb' '#rrggbb' '#rrggbbaa' → {r,g,b,a} (0~255, a 0~1) */
export function parseHex(s) {
  let h = String(s || '').trim().replace(/^#/, '');
  if (/^[0-9a-f]{3,4}$/i.test(h)) h = [...h].map(c => c + c).join('');
  if (!/^([0-9a-f]{6}|[0-9a-f]{8})$/i.test(h)) return null;
  const n = i => parseInt(h.slice(i, i + 2), 16);
  return { r: n(0), g: n(2), b: n(4), a: h.length === 8 ? n(6) / 255 : 1 };
}
const toHex = ({ r, g, b, a = 1 }, alpha) => `#${hex2(r)}${hex2(g)}${hex2(b)}${alpha && a < 1 ? hex2(a * 255) : ''}`.toUpperCase();
function rgb2hsv({ r, g, b }) {
  r /= 255; g /= 255; b /= 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
  let h = 0;
  if (d) h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return { h: (h * 60 + 360) % 360, s: mx ? d / mx : 0, v: mx };
}
function hsv2rgb({ h, s, v }) {
  const f = n => { const k = (n + h / 60) % 6; return (v - v * s * Math.max(0, Math.min(k, 4 - k, 1))) * 255; };
  return { r: f(5), g: f(3), b: f(1) };
}

const PRESETS = '#FF7A45,#F4B740,#5CCB8A,#3FB8C6,#4C8DFF,#8F6BFF,#E85D9A,#F3EEE9,#8A817A,#272421';

/**
 * <a2-color label="강조색" value="#FF7A45" alpha presets="#FF7A45,#4C8DFF">
 */
export class A2Color extends A2Element {
  static formAssociated = true;
  static delegatesFocus = true;
  static observedAttributes = ['label', 'hint', 'value', 'disabled', 'alpha', 'presets'];
  static styles = `${POPOVER_CSS}
:host { display: block; }
.box {
  display: flex; align-items: center; gap: 11px; width: 100%; height: var(--a2-h); padding: 0 14px 0 var(--a2-gap);
  border-radius: var(--a2-radius); border: var(--a2-ring) solid var(--a2-line-strong); touch-action: manipulation; transition: border-color var(--t1); text-align: left;
}
:host([open]) .box { border-color: var(--a2-accent); }
/* 고른 색이 조각으로 들어 있다 */
.sw { position: relative; flex: none; width: calc(var(--a2-h) - var(--in) * 2); height: calc(var(--a2-h) - var(--in) * 2); border-radius: var(--ri); overflow: hidden; transition: transform var(--t2) var(--pop); }
.box:active .sw { transform: scale(0.86); }
.sw::before, .chk { content: ''; position: absolute; inset: 0; background: repeating-conic-gradient(#bbb 0 25%, #eee 0 50%) 0 0 / 8px 8px; }
.sw i, .pv i { position: absolute; inset: 0; }
.hex { flex: 1; font-variant-numeric: tabular-nums; padding-top: 0.12em; letter-spacing: 0.02em; }
.menu { width: 256px; padding: 11px; display: flex; flex-direction: column; gap: 11px; max-height: none; overflow: visible; }
.sv { position: relative; height: 150px; border-radius: var(--ri); cursor: crosshair; touch-action: none; }
.sv .k { position: absolute; width: 18px; height: 18px; margin: -9px 0 0 -9px; border-radius: 6px; box-shadow: 0 0 0 2px #fff, 0 1px 4px rgba(0, 0, 0, 0.4); pointer-events: none; }
.bar { position: relative; height: 14px; border-radius: 5px; cursor: pointer; touch-action: none; }
.bar .k { position: absolute; top: 50%; width: 12px; height: 22px; margin: -11px 0 0 -6px; border-radius: 4px; background: #fff; box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2), 0 1px 4px rgba(0, 0, 0, 0.4); pointer-events: none; }
.hue { background: linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00); }
.al { overflow: visible; }
.al .chk { border-radius: 5px; background-size: 7px 7px; }
.al .g { position: absolute; inset: 0; border-radius: 5px; }
.row { display: flex; gap: 8px; align-items: center; }
.pv { position: relative; flex: none; width: 38px; height: 38px; border-radius: var(--ri); overflow: hidden; }
.hx { flex: 1; min-width: 0; height: 38px; padding: 0.12em 11px 0; border: var(--a2-ring) solid var(--a2-line-strong); outline: 0; border-radius: var(--ri); background: transparent; color: var(--a2-text); font-variant-numeric: tabular-nums; transition: border-color var(--t1); }
.hx:focus { border-color: var(--a2-accent); }
.ps { display: grid; grid-template-columns: repeat(10, 1fr); gap: 4px; }
.ps button { aspect-ratio: 1; border-radius: 5px; transition: transform var(--t2) var(--pop); }
.ps button:hover { transform: scale(1.16); }
.ps button:active { transform: scale(0.84); }
.ps:empty { display: none; }
`;
  render() {
    this.root.innerHTML = `${this.fieldHead('')}<button class="box" part="box" type="button" aria-haspopup="dialog"><span class="sw"><i></i></span><span class="hex"></span></button><div class="hint t" part="hint"></div>
<div class="pop" popover="manual"><div class="menu" part="menu" role="dialog" aria-label="색 고르기">
<div class="sv"><span class="k"></span></div>
<div class="bar hue" role="slider" tabindex="0" aria-label="색상"><span class="k"></span></div>
<div class="bar al" role="slider" tabindex="0" aria-label="투명도"><span class="chk"></span><span class="g"></span><span class="k"></span></div>
<div class="row"><span class="pv"><span class="chk"></span><i></i></span><input class="hx" spellcheck="false" aria-label="HEX"></div>
<div class="ps"></div></div></div>`;
    this.box = this.$('.box'); this.pop = this.$('.pop');
    const c = parseHex(this.str('value', '#FF7A45')) || parseHex('#FF7A45');
    this._hsv = rgb2hsv(c); this._a = c.a;
    this._init = this.hexValue;
    this.box.addEventListener('click', () => this.isOpen ? this._pop.close() : this.open());
    this.box.addEventListener('keydown', e => { if (e.key === 'ArrowDown') { e.preventDefault(); this.open(); } });
    this.drag(this.$('.sv'), (x, y) => { this._hsv.s = x; this._hsv.v = 1 - y; });
    this.drag(this.$('.hue'), x => { this._hsv.h = x * 360; });
    this.drag(this.$('.al'), x => { this._a = x; });
    this.barKeys(this.$('.hue'), d => { this._hsv.h = clamp(this._hsv.h + d * 3, 0, 360); });
    this.barKeys(this.$('.al'), d => { this._a = clamp(this._a + d * 0.02, 0, 1); });
    const hx = this.$('.hx');
    hx.addEventListener('input', () => { const p = parseHex(hx.value); if (p) { this._hsv = rgb2hsv(p); if (this.bool('alpha')) this._a = p.a; this.changed(true, false); } });
    hx.addEventListener('keydown', e => { if (e.key === 'Enter') { hx.value = this.hexValue; this.fire('change'); } });
    hx.addEventListener('blur', () => { hx.value = this.hexValue; });
    this.$('.ps').addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      const p = parseHex(b.dataset.c); this._hsv = rgb2hsv(p); this._a = p.a; this.changed(true); this.fire('change');
    });
  }
  get isOpen() { return !!this._pop?.open; }
  get rgb() { return hsv2rgb(this._hsv); }
  get hexValue() { return toHex({ ...this.rgb, a: this._a }, this.bool('alpha')); }
  get value() { return this.hexValue; }
  set value(v) { const p = parseHex(v); if (!p) return; this._hsv = rgb2hsv(p); this._a = this.bool('alpha') ? p.a : 1; if (this._rendered) this.paint(); }
  open() {
    if (this.disabled) return;
    this.setBool('open', true);
    this.paint();
    this._pop = openPopover(this.pop, this.box, { onClose: () => this.setBool('open', false) });
  }
  drag(el, set) {
    el.addEventListener('pointerdown', e => {
      if (e.button !== 0) return;
      e.preventDefault(); el.setPointerCapture(e.pointerId);
      const go = ev => { const r = el.getBoundingClientRect(); set(clamp((ev.clientX - r.left) / r.width, 0, 1), clamp((ev.clientY - r.top) / r.height, 0, 1)); this.changed(true); };
      go(e);
      const up = () => { el.removeEventListener('pointermove', go); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up); this.fire('change'); };
      el.addEventListener('pointermove', go); el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
    });
  }
  barKeys(el, step) {
    el.addEventListener('keydown', e => {
      const d = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[e.key];
      if (!d) return;
      e.preventDefault(); step(d * (e.shiftKey ? 5 : 1)); this.changed(true); this.fire('change');
    });
  }
  changed(user, hexBox = true) { this.paint(hexBox); if (user) this.fire('input'); }
  paint(hexBox = true) {
    const { h, s, v } = this._hsv, { r, g, b } = this.rgb, a = this._a, alpha = this.bool('alpha');
    const solid = `rgb(${r | 0} ${g | 0} ${b | 0})`, full = `rgb(${r | 0} ${g | 0} ${b | 0} / ${a})`;
    this.$('.sw i').style.background = full;
    this.$('.pv i').style.background = full;
    this.$('.hex').textContent = this.hexValue;
    const sv = this.$('.sv');
    sv.style.background = `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, hsl(${h} 100% 50%))`;
    Object.assign(sv.querySelector('.k').style, { left: `${s * 100}%`, top: `${(1 - v) * 100}%`, background: solid });
    this.$('.hue .k').style.left = `${(h / 360) * 100}%`;
    this.$('.hue').setAttribute('aria-valuenow', Math.round(h));
    const al = this.$('.al');
    al.style.display = alpha ? '' : 'none';
    al.querySelector('.g').style.background = `linear-gradient(to right, transparent, ${solid})`;
    al.querySelector('.k').style.left = `${a * 100}%`;
    al.setAttribute('aria-valuenow', Math.round(a * 100));
    if (hexBox && this.root.activeElement !== this.$('.hx')) this.$('.hx').value = this.hexValue;
    this.internals.setFormValue(this.hexValue);
  }
  attr(name, v) { if (name === 'value') { if (v && parseHex(v) && v.toUpperCase() !== this.hexValue) this.value = v; } else this.update(); }
  update() {
    this.paintField();
    this.box.disabled = this.disabled;
    if (this.hasAttribute('label')) this.box.setAttribute('aria-label', this.getAttribute('label'));
    const list = this.str('presets', PRESETS).split(',').map(s => s.trim()).filter(s => parseHex(s));
    this.$('.ps').innerHTML = this.getAttribute('presets') === '' ? '' : list.map(c => `<button type="button" data-c="${esc(c)}" style="background:${esc(c)}" aria-label="${esc(c)}"></button>`).join('');
    this.paint();
  }
  formResetCallback() { this.value = this._init; }
}
define('a2-color', A2Color);
