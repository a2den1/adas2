import { Component } from './base.js';
import { h, userIcon } from '../core/dom.js';

/** 글자 입력: 위에 라벨, 아래 입력 상자. multiline 이면 여러 줄 */
export class Field extends Component {
  constructor(o = {}) {
    super('field', o);
    const el = this.el;
    this._value = o.value ?? '';
    if (o.label) this.header(el, o.label);
    this.box = h('label', 'a2-field-box', el);
    if (o.icon) userIcon(o.icon, 'a2-field-icon', this.box);
    this.input = h(o.multiline ? 'textarea' : 'input', 'a2-field-input', this.box);
    if (!o.multiline) this.input.type = o.type || 'text';
    if (o.multiline) { this.box.classList.add('a2-multiline'); this.input.rows = o.rows || 3; }
    this.input.placeholder = o.placeholder || '';
    this.input.value = this._value;
    this.input.spellcheck = false;
    if (o.maxLength) { this.input.maxLength = o.maxLength; this.counter = h('span', 'a2-field-count', this.headSlot || el); }
    if (o.label) this.input.setAttribute('aria-label', o.label);
    this.input.addEventListener('input', () => { this._value = this.input.value; this.render(false); this.emit('change', this._value); });
    this.input.addEventListener('change', () => this.emit('commit', this._value));
    this.input.addEventListener('focus', () => this.box.classList.add('a2-focus'));
    this.input.addEventListener('blur', () => this.box.classList.remove('a2-focus'));
    this.render(true);
  }
  normalize(v) { return v == null ? '' : String(v); }
  render() {
    if (this.input.value !== this._value) this.input.value = this._value;
    if (this.counter) this.counter.textContent = `${this._value.length}/${this.opts.maxLength}`;
    this.paintReset();
  }
  focus() { this.input.focus(); return this; }
}
