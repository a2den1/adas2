import { Component, pressable } from './base.js';
import { h, icon } from '../core/dom.js';

/** 스위치 줄: 왼쪽 라벨(+설명), 오른쪽 스위치 */
export class Switch extends Component {
  constructor(o = {}) {
    super('switch', o);
    const el = this.el;
    this._value = !!o.value;
    el.tabIndex = 0;
    el.setAttribute('role', 'switch');
    const text = h('div', 'a2-row-text', el);
    this.header(text, o.label);
    if (o.description) h('div', 'a2-desc', text, o.description);
    this.track = h('span', 'a2-track', el);
    h('span', 'a2-thumb', this.track);
    const flip = () => { if (this.disabled) return; this.set(!this._value); this.emit('commit', this._value); };
    el.addEventListener('click', e => { if (!e.target.closest('.a2-reset')) flip(); });
    pressable(el, flip);
    this.render(true);
  }
  normalize(v) { return !!v; }
  toggle() { this.set(!this._value); return this; }
  render(instant) {
    this.el.classList.toggle('a2-on', this._value);
    this.el.setAttribute('aria-checked', this._value);
    this.track.classList.toggle('a2-instant', !!instant);
    this.paintReset();
  }
}

/** 체크박스 줄: 왼쪽 네모 + 라벨 */
export class Checkbox extends Component {
  constructor(o = {}) {
    super('check', o);
    const el = this.el;
    this._value = !!o.value;
    el.tabIndex = 0;
    el.setAttribute('role', 'checkbox');
    this.box = h('span', 'a2-box', el);
    icon('check', '', this.box);
    const text = h('div', 'a2-row-text', el);
    this.header(text, o.label);
    if (o.description) h('div', 'a2-desc', text, o.description);
    const flip = () => { if (this.disabled) return; this.set(!this._value); this.emit('commit', this._value); };
    el.addEventListener('click', e => { if (!e.target.closest('.a2-reset')) flip(); });
    pressable(el, flip);
    this.render(true);
  }
  normalize(v) { return !!v; }
  render(instant) {
    this.el.classList.toggle('a2-on', this._value);
    this.el.setAttribute('aria-checked', this._value);
    this.box.classList.toggle('a2-instant', !!instant);
    this.paintReset();
  }
}

/** 라디오: 여러 줄 중 하나. options 는 값 배열 또는 { value, label, description } 배열 */
export class Radio extends Component {
  constructor(o = {}) {
    super('radio', o);
    const el = this.el;
    el.setAttribute('role', 'radiogroup');
    if (o.label) this.header(el, o.label);
    this.list = h('div', 'a2-radio-list', el);
    this.items = (o.options || []).map(raw => {
      const opt = typeof raw === 'object' && raw !== null ? raw : { value: raw, label: String(raw) };
      const row = h('div', 'a2-radio-item', this.list);
      row.tabIndex = 0;
      row.setAttribute('role', 'radio');
      h('span', 'a2-dot', row);
      const t = h('div', 'a2-row-text', row);
      h('span', 'a2-radio-label', t, opt.label ?? String(opt.value));
      if (opt.description) h('div', 'a2-desc', t, opt.description);
      const pick = () => { if (this.disabled) return; this.set(opt.value); this.emit('commit', this._value); };
      row.addEventListener('click', pick);
      pressable(row, pick);
      row.addEventListener('keydown', e => {
        const d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
        if (!d) return;
        e.preventDefault();
        const i = (this.items.findIndex(x => x.row === row) + d + this.items.length) % this.items.length;
        this.items[i].row.focus(); this.set(this.items[i].value); this.emit('commit', this._value);
      });
      return { row, value: opt.value };
    });
    this._value = o.value !== undefined ? o.value : this.items[0] && this.items[0].value;
    this.render(true);
  }
  render() {
    for (const it of this.items) {
      const on = this.equals(it.value, this._value);
      it.row.classList.toggle('a2-on', on);
      it.row.setAttribute('aria-checked', on);
    }
    this.paintReset();
  }
}
