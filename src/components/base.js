// 모든 컴포넌트의 바탕: 값·기본값·이벤트·되돌리기 버튼·끄기
import { ensureSetup, onSettings } from '../core/settings.js';
import { h, icon, resolveParent } from '../core/dom.js';
import { tooltip } from '../core/tooltip.js';

const registry = new Map();
/** id 로 만든 컴포넌트를 찾는다 */
export const get = id => registry.get(id);

export class Component {
  constructor(kind, opts = {}, tag = 'div') {
    ensureSetup();
    this.kind = kind;
    this.opts = opts;
    this.handlers = {};
    this.el = h(tag, `a2 a2-${kind}`);
    this.disabled = false;
    if (opts.id) { this.id = opts.id; this.el.dataset.a2Id = opts.id; registry.set(opts.id, this); }
    if (opts.className) this.el.classList.add(...String(opts.className).split(/\s+/).filter(Boolean));
    if (opts.tooltip) tooltip(this.el, opts.tooltip);
    for (const [k, ev] of [['onChange', 'change'], ['onCommit', 'commit'], ['onClick', 'click']]) if (opts[k]) this.on(ev, opts[k]);
    this._off = onSettings(() => { if (!this.destroyed) requestAnimationFrame(() => this.render(true)); });
  }

  /** 부모(요소·선택자·빌더·패널·섹션)에 붙인다 */
  mount(parent) { const host = resolveParent(parent); if (host) host.appendChild(this.el); return this; }

  /** 이벤트: 'change'(값이 바뀌는 중), 'commit'(값이 정해짐), 컴포넌트마다 더 있음 */
  on(name, fn) { (this.handlers[name] ||= new Set()).add(fn); return this; }
  off(name, fn) { this.handlers[name] && this.handlers[name].delete(fn); return this; }
  emit(name, ...args) { for (const fn of this.handlers[name] || []) fn(...args, this); }

  get value() { return this._value; }
  set value(v) { this.set(v); }
  equals(a, b) { return a === b; }
  /** 값을 바꾼다. { silent: true } 면 change 이벤트를 내지 않는다 */
  set(v, { silent = false } = {}) {
    v = this.normalize ? this.normalize(v) : v;
    if (this.equals(v, this._value)) return this;
    this._value = v;
    this.render(false);
    if (!silent) this.emit('change', v);
    return this;
  }
  get hasDefault() { return this.opts.default !== undefined && this.opts.default !== null; }
  get changed() { return this.hasDefault && !this.equals(this._value, this.normalize ? this.normalize(this.opts.default) : this.opts.default); }
  /** 기본값으로 되돌린다 */
  reset() { if (this.hasDefault) { this.set(this.opts.default); this.emit('commit', this._value); } return this; }
  render() {}

  /** 제목 줄: 라벨 + 되돌리기 버튼 (+ 오른쪽 자리) */
  header(parent, label) {
    const head = h('div', 'a2-head', parent);
    this.labelEl = h('span', 'a2-head-label', head, label || '');
    if (this.hasDefault) {
      this.resetBtn = h('button', 'a2-reset', head);
      this.resetBtn.type = 'button';
      this.resetBtn.setAttribute('aria-label', '기본값으로');
      this.resetBtn.tabIndex = -1;
      icon('reset', '', this.resetBtn);
      this.resetBtn.addEventListener('click', e => { e.stopPropagation(); this.reset(); });
    }
    this.headSlot = h('span', 'a2-head-slot', head);
    return head;
  }
  paintReset() { if (this.resetBtn) { const on = this.changed; this.resetBtn.classList.toggle('a2-show', on); this.resetBtn.tabIndex = on ? 0 : -1; } }

  /** 끄기: 흐려지고 누를 수 없다 */
  disable(off = true) { this.disabled = !!off; this.el.classList.toggle('a2-disabled', this.disabled); this.el.inert = this.disabled; return this; }
  enable() { return this.disable(false); }
  destroy() {
    this.destroyed = true;
    this._off && this._off();
    if (this.id && registry.get(this.id) === this) registry.delete(this.id);
    this.el.remove();
  }
}

/** Enter·Space 로 누르기 */
export function pressable(el, fn) {
  el.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target === el) { e.preventDefault(); fn(e); } });
}
