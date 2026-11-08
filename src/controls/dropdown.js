import { Control } from './control.js';
import { h, icon, px, resolveOptions } from '../core/dom.js';
import { tween, tweenNumber } from '../core/tween.js';

export const DropdownOptions = {
  values: [], value: undefined, defaultValue: null,
  display: v => String(v),
  onChanged: null, tooltip: null,
};
const GAP = 12;

/** 펼치면 아래 요소를 밀어내며 목록이 열리는 드롭다운 (한 개 고르기) */
export class Dropdown extends Control {
  constructor(parent, id, opts, kind = 'dropdown') {
    super(parent, id, resolveOptions(DropdownOptions, opts), kind);
    const o = this.opts, el = this.el;
    el.classList.add('a2-dd');
    this.expanded = false;
    this.header = h('div', 'a2-dd-header', el);
    this.header.tabIndex = 0;
    this.header.setAttribute('role', 'combobox');
    this.header.setAttribute('aria-expanded', 'false');
    this.addHoverOutline(this.header);
    this.addChangedDot(this.header);
    this.label = h('span', 'a2-label a2-dd-label', this.header);
    this.tri = icon('triangle', 'a2-dd-tri', this.header);
    this.list = h('div', 'a2-dd-list', el);
    this.list.setAttribute('role', 'listbox');
    this.initValue();
    this.build();
    this.header.addEventListener('click', () => { if (!this.blocked) this.toggleExpanded(); });
    this.header.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.toggleExpanded(); }
      else if (e.key === 'Escape') this.setExpanded(false);
    });
    this.enableMiddleReset(this.header);
    this.paintOpen(0, true);
  }
  initValue() { const o = this.opts; this.value = o.value !== undefined ? o.value : o.values[0]; }
  summary() { return this.opts.display(this.value); }
  build() {
    this.list.textContent = '';
    this.rows = this.opts.values.map(v => {
      const r = h('div', 'a2-dd-row', this.list);
      r.setAttribute('role', 'option');
      r.tabIndex = -1;
      r._v = v;
      h('span', 'a2-dd-row-text', r, this.opts.display(v));
      this.decorateRow(r, v);
      r.addEventListener('click', () => this.pick(v));
      return r;
    });
    this.updateVisual(true);
  }
  decorateRow() {}
  pick(v) { this.set(v, true); this.setExpanded(false); }

  setValues(values, notify = false) {
    this.opts.values = values;
    if (!values.some(v => this.equals(v, this.value))) { this.value = values[0]; if (notify && this.opts.onChanged) this.opts.onChanged(this.value, this); }
    this.build();
    if (this.expanded) this.paintOpen(1, true);
  }
  toggleExpanded() { this.setExpanded(!this.expanded); }
  setExpanded(open) {
    if (open === this.expanded) return;
    this.expanded = open;
    this.el.classList.toggle('a2-open', open);
    this.header.setAttribute('aria-expanded', open);
    // 높이(0.14 OutBack), 목록 투명도(0.16), 삼각형 회전(0.4 OutBack)
    this._ht && this._ht.kill(); this._at && this._at.kill(); this._rt && this._rt.kill();
    const from = this.el.getBoundingClientRect().height;
    const to = this.openHeight(open);
    this._ht = tweenNumber(from, to, 0.14, 'OutBack', v => { this.el.style.height = `${Math.max(v, this.closedHeight())}px`; },
      () => { if (!this.expanded) this.el.style.height = ''; });
    this._at = tweenNumber(+getComputedStyle(this.list).opacity, open ? 1 : 0, 0.16, 'OutSine', v => { this.list.style.opacity = v; });
    this._rt = tween({ r: this._rot || 0 }, { r: open ? 180 : 0 }, 0.4, 'OutBack', v => { this._rot = v.r; this.tri.style.transform = `rotate(${v.r}deg)`; });
    if (open) {
      this._outside = e => { if (!this.el.contains(e.target)) this.setExpanded(false); };
      setTimeout(() => document.addEventListener('pointerdown', this._outside), 0);
    } else if (this._outside) document.removeEventListener('pointerdown', this._outside);
  }
  closedHeight() { return this.header.getBoundingClientRect().height; }
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
  setBlocked(b) { super.setBlocked(b); if (b) this.setExpanded(false); }
  updateVisual(noAnimate) {
    this.label.textContent = this.summary();
    this.label.title = this.label.textContent;
    for (const r of this.rows || []) {
      const sel = this.isSelected(r._v);
      r.classList.toggle('a2-selected', sel);
      r.setAttribute('aria-selected', sel);
    }
    this.paintChangedDot(noAnimate);
  }
  isSelected(v) { return this.equals(v, this.value); }
}

export const MultiDropdownOptions = { ...DropdownOptions, value: [], summary: null };

/** 여러 개 고르기. 고른 값은 배열. 목록은 누른 뒤에도 열려 있다 */
export class MultiDropdown extends Dropdown {
  constructor(parent, id, opts) {
    super(parent, id, resolveOptions(MultiDropdownOptions, opts), 'multidropdown');
    this.el.classList.add('a2-dd');
  }
  initValue() { this.value = [...(this.opts.value || [])]; }
  equals(a, b) {
    if (!Array.isArray(a) || !Array.isArray(b)) return a === b;
    return a.length === b.length && a.every(x => b.includes(x));
  }
  summary() {
    const o = this.opts;
    if (o.summary) return o.summary(this.value);
    return this.value.length ? o.values.filter(v => this.value.includes(v)).map(o.display).join(', ') : '없음';
  }
  decorateRow(r) { r.classList.add('a2-dd-check-row'); icon('on', 'a2-check-on', r); icon('off', 'a2-check-off', r); r.prepend(h('div', 'a2-hover-outline')); }
  isSelected(v) { return this.value.includes(v); }
  pick(v) { this.toggle(v); }
  /** 한 값을 넣었다 뺐다 한다 */
  toggle(v, notify = true) {
    const next = this.value.includes(v) ? this.value.filter(x => x !== v) : this.opts.values.filter(x => x === v || this.value.includes(x));
    this.set(next, notify);
  }
  has(v) { return this.value.includes(v); }
  set(v, notify = true) {
    if (this.equals(v, this.value)) return;
    this.value = [...v];
    this.updateVisual(false);
    if (notify && this.opts.onChanged) this.opts.onChanged([...this.value], this);
  }
}
