import { Component } from './base.js';
import { h, userIcon } from '../core/dom.js';

/**
 * 버튼. variant: 'primary'(기본) | 'soft' | 'ghost' | 'danger', size: 'md' | 'sm'
 */
export class Button extends Component {
  constructor(o = {}) {
    super('btn', o, 'button');
    const el = this.el;
    el.type = 'button';
    el.classList.add(`a2-btn-${o.variant || 'primary'}`);
    if (o.size === 'sm') el.classList.add('a2-btn-sm');
    if (o.block) el.classList.add('a2-btn-block');
    if (o.icon) this.iconEl = userIcon(o.icon, 'a2-btn-icon', el);
    this.textEl = h('span', 'a2-btn-text', el, o.text ?? '');
    if (!o.text) el.classList.add('a2-btn-icon-only');
    el.addEventListener('click', e => { if (!this.disabled && !this.loading) this.emit('click', e); });
  }
  get text() { return this.textEl.textContent; }
  set text(t) { this.textEl.textContent = t; }
  /** 처리 중: 글자 대신 도는 표시, 누를 수 없음 */
  setLoading(on = true) {
    this.loading = !!on;
    this.el.classList.toggle('a2-loading', this.loading);
    this.el.setAttribute('aria-busy', this.loading);
    if (this.loading && !this.spin) { this.spin = h('span', 'a2-btn-spin', this.el); }
    return this;
  }
}
