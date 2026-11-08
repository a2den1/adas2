import { Control } from './control.js';
import { h, resolveOptions, themeVar } from '../core/dom.js';
import { tweenColor } from '../core/tween.js';

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
    this.border = h('div', 'a2-seg-border', el);
    this.addChangedDot();
    this.value = o.value !== undefined ? o.value : o.values[0];
    this.build();
    this.enableMiddleReset(el, false);
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
    this.segs = this.opts.values.map(v => {
      const s = h('button', 'a2-seg', this.mask, this.opts.display(v));
      s.type = 'button';
      s.setAttribute('role', 'radio');
      s._v = v;
      let hover = false, down = false;
      const target = () => {
        const sel = this.equals(v, this.value);
        if (down) return sel ? this.color('object-active-bright') : this.color('button-hover');
        if (sel) return hover ? this.color('object-active-bright') : this.color('active');
        return hover ? this.color('button-hover') : this.color('normal');
      };
      s._paint = (dur, noAnimate) => {
        s._t && s._t.kill();
        if (noAnimate) { s.style.backgroundColor = target(); return; }
        s._t = tweenColor(() => s.style.backgroundColor || this.color('normal'), c => { s.style.backgroundColor = c; }, target(), dur);
      };
      s.addEventListener('pointerenter', () => { hover = true; s._paint(0.12); });
      s.addEventListener('pointerleave', () => { hover = false; down = false; s._paint(0.12); });
      s.addEventListener('pointerdown', e => { if (e.button === 0) { down = true; s._paint(0.08); } });
      s.addEventListener('pointerup', () => { if (down) { down = false; s._paint(0.12); } });
      s.addEventListener('click', () => { if (!this.blocked) this.set(v, true); });
      return s;
    });
    this.updateVisual(true);
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
      s._paint(0.15, noAnimate);
    }
    this.paintChangedDot(true);
  }
}
