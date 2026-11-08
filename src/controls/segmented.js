import { Control } from './control.js';
import { h, resolveOptions, themeVar } from '../core/dom.js';
import { tween } from '../core/tween.js';

export const SegmentedOptions = {
  values: [], value: undefined, defaultValue: null,
  display: v => String(v),
  height: null, fontSize: null,
  normalColor: null, activeColor: null, borderColor: null,
  onChanged: null, tooltip: null,
};

/** 2~4개 중 하나 고르기. 고른 칸의 색이 바뀐다 */
export class Segmented extends Control {
  constructor(parent, id, opts) {
    super(parent, id, resolveOptions(SegmentedOptions, opts), 'segmented');
    const o = this.opts, el = this.el;
    el.setAttribute('role', 'radiogroup');
    if (o.height != null) el.style.setProperty('--a2-h', o.height);
    if (o.fontSize != null) el.style.setProperty('--a2-fs', o.fontSize);
    this.mask = h('div', 'a2-seg-mask', el);
    this.addChangedDot();
    this.value = o.value !== undefined ? o.value : o.values[0];
    this.build();
    this.enableMiddleReset(el, false);
    new ResizeObserver(() => this.moveIndicator(true)).observe(this.mask);
  }
  set fontSize(v) { this.el.style.setProperty('--a2-fs', v); }
  color(name) {
    const o = this.opts;
    if (name === 'normal') return o.normalColor || themeVar(this.el, 'object-button');
    if (name === 'active') return o.activeColor || themeVar(this.el, 'object-active');
    return themeVar(this.el, name);
  }
  build() {
    this.mask.textContent = '';
    this.ind = h('div', 'a2-seg-ind', this.mask);
    this.segs = this.opts.values.map(v => {
      const s = h('button', 'a2-seg', this.mask, this.opts.display(v));
      s.type = 'button';
      s.setAttribute('role', 'radio');
      s._v = v;
      s.addEventListener('click', () => { if (!this.blocked) this.set(v, true); });
      return s;
    });
    this._placed = false;
    this.updateVisual(true);
    requestAnimationFrame(() => this.updateVisual(true));
  }
  /** 알약을 고른 칸으로 옮긴다 */
  moveIndicator(noAnimate) {
    const seg = (this.segs || []).find(s => this.equals(s._v, this.value));
    if (!seg || !seg.offsetWidth) { this.ind.style.opacity = seg ? '' : '0'; return; }
    const to = { x: seg.offsetLeft, w: seg.offsetWidth };
    this._it && this._it.kill();
    if (noAnimate || !this._placed) {
      this._ind = to;
      this.ind.style.transform = `translateX(${to.x}px)`; this.ind.style.width = `${to.w}px`;
      this._placed = true;
      return;
    }
    const from = this._ind || to;
    this._it = tween(from, to, 0.34, 'OutExpo', v => { this._ind = v; this.ind.style.transform = `translateX(${v.x}px)`; this.ind.style.width = `${v.w}px`; });
  }
  /** 목록을 바꾼다. 지금 값이 없으면 첫 값으로 */
  setValues(values, notify = false) {
    this.opts.values = values;
    if (!values.some(v => this.equals(v, this.value))) { const nv = values[0]; this.value = nv; if (notify && this.opts.onChanged) this.opts.onChanged(nv, this); }
    this.build();
  }
  updateVisual(noAnimate) {
    for (const s of this.segs || []) {
      const sel = this.equals(s._v, this.value);
      s.classList.toggle('a2-selected', sel);
      s.setAttribute('aria-checked', sel);
    }
    this.moveIndicator(noAnimate);
    this.paintChangedDot(true);
  }
}
