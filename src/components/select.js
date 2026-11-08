import { Component, pressable } from './base.js';
import { ensureSetup } from '../core/settings.js';
import { h, icon, userIcon } from '../core/dom.js';
import { openFloat } from '../core/float.js';

const toOpt = raw => (typeof raw === 'object' && raw !== null ? { label: String(raw.value), ...raw } : { value: raw, label: String(raw) });

/** 목록 판에서 방향키로 움직이기 */
function listKeys(list, rows, onPick) {
  let i = rows.findIndex(r => r.classList.contains('a2-on'));
  const focus = n => { i = (n + rows.length) % rows.length; rows.forEach((r, k) => r.classList.toggle('a2-kbd', k === i)); rows[i].scrollIntoView({ block: 'nearest' }); };
  list.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); focus(i + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); focus(i - 1); }
    else if ((e.key === 'Enter' || e.key === ' ') && i >= 0) { e.preventDefault(); onPick(i); }
  });
  list.tabIndex = -1;
  setTimeout(() => list.focus({ preventScroll: true }), 0);
}

/** 고르기: 위에 라벨, 상자를 누르면 아래에 목록이 뜬다 */
export class Select extends Component {
  constructor(o = {}, kind = 'select') {
    super(kind, o);
    const el = this.el;
    this.options = (o.options || []).map(toOpt);
    if (o.label) this.header(el, o.label);
    this.box = h('button', 'a2-select-box', el);
    this.box.type = 'button';
    this.box.setAttribute('aria-haspopup', 'listbox');
    this.text = h('span', 'a2-select-text', this.box);
    this.chev = icon('chevron', 'a2-select-chev', this.box);
    this._value = this.initial(o);
    this.box.addEventListener('click', () => { if (!this.disabled) this.toggle(); });
    this.box.addEventListener('keydown', e => { if (e.key === 'ArrowDown' && !this.float) { e.preventDefault(); this.open(); } });
    this.render(true);
  }
  initial(o) { return o.value !== undefined ? o.value : this.options[0] && this.options[0].value; }
  labelOf(v) { const f = this.options.find(x => this.equals(x.value, v)); return f ? f.label : (v ?? ''); }
  summary() { return this.labelOf(this._value); }
  isOn(v) { return this.equals(v, this._value); }
  get isOpen() { return !!(this.float && this.float.open); }
  toggle() { this.isOpen ? this.close() : this.open(); }
  open() {
    if (this.isOpen) return;
    this.el.classList.add('a2-open');
    this.box.setAttribute('aria-expanded', 'true');
    this.float = openFloat({ anchor: this.box, align: 'stretch', className: 'a2-menu a2-select-menu', onClose: () => {
      this.el.classList.remove('a2-open'); this.box.setAttribute('aria-expanded', 'false'); this.float = null;
    } });
    const list = this.float.el;
    list.setAttribute('role', 'listbox');
    this.rows = this.options.map((opt, i) => {
      const r = h('div', 'a2-menu-item', list);
      r.setAttribute('role', 'option');
      h('span', 'a2-menu-label', r, opt.label);
      icon('check', 'a2-menu-check', r);
      r.addEventListener('click', () => this.pick(i));
      return r;
    });
    this.paintRows();
    listKeys(list, this.rows, i => this.pick(i));
  }
  close() { this.float && this.float.close(); }
  pick(i) { this.set(this.options[i].value); this.emit('commit', this._value); this.close(); this.box.focus({ preventScroll: true }); }
  paintRows() { (this.rows || []).forEach((r, i) => { const on = this.isOn(this.options[i].value); r.classList.toggle('a2-on', on); r.setAttribute('aria-selected', on); }); }
  /** 목록을 바꾼다. 지금 값이 없으면 첫 값으로 */
  setOptions(options) {
    this.options = options.map(toOpt);
    if (!this.options.some(x => this.isOn(x.value))) this.set(this.initial({}));
    this.render(true);
    return this;
  }
  render() {
    const s = this.summary();
    this.text.textContent = s || this.opts.placeholder || '';
    this.text.classList.toggle('a2-placeholder', !s);
    this.paintRows();
    this.paintReset();
  }
  destroy() { this.close(); super.destroy(); }
}

/** 여러 개 고르기: 값은 배열, 목록은 고른 뒤에도 열려 있다 */
export class MultiSelect extends Select {
  constructor(o = {}) { super(o, 'select'); this.el.classList.add('a2-multi'); }
  initial(o) { return [...(o.value || [])]; }
  normalize(v) { return this.options ? this.options.map(x => x.value).filter(x => (v || []).includes(x)) : [...(v || [])]; }
  equals(a, b) { return Array.isArray(a) && Array.isArray(b) ? a.length === b.length && a.every((x, i) => x === b[i]) : a === b; }
  isOn(v) { return (this._value || []).includes(v); }
  summary() {
    if (this.opts.summary) return this.opts.summary(this._value);
    const n = this._value.length;
    if (!n) return '';
    const labels = this._value.map(v => this.labelOf(v));
    return n <= 2 ? labels.join(', ') : `${labels.slice(0, 2).join(', ')} 외 ${n - 2}개`;
  }
  pick(i) {
    const v = this.options[i].value;
    this.set(this.isOn(v) ? this._value.filter(x => x !== v) : [...this._value, v]);
    this.emit('commit', this._value);
  }
  open() { super.open(); this.float && this.float.el.classList.add('a2-multi-menu'); }
}

/**
 * 메뉴를 화면 좌표에 연다.
 * items: { label, icon, shortcut, danger, disabled, onSelect } 또는 '-' (구분선)
 */
export function openMenu(x, y, items) {
  ensureSetup();
  const f = openFloat({ anchor: { x, y }, className: 'a2-menu a2-context-menu', gap: 2 });
  const rows = [];
  for (const it of items) {
    if (it === '-' || it === null) { h('div', 'a2-menu-sep', f.el); continue; }
    const r = h('div', 'a2-menu-item', f.el);
    r.setAttribute('role', 'menuitem');
    if (it.danger) r.classList.add('a2-danger');
    if (it.disabled) r.classList.add('a2-off');
    if (it.icon) userIcon(it.icon, 'a2-menu-icon', r);
    h('span', 'a2-menu-label', r, it.label);
    if (it.shortcut) h('span', 'a2-menu-key', r, it.shortcut);
    r.addEventListener('click', () => { if (it.disabled) return; f.close(); it.onSelect && it.onSelect(); });
    rows.push(r);
  }
  listKeys(f.el, rows, i => rows[i].click());
  return f;
}

/** 요소에 오른쪽 클릭 메뉴를 붙인다. items 는 배열 또는 배열을 돌려주는 함수 */
export function menu(target, items) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  el.addEventListener('contextmenu', e => {
    e.preventDefault();
    openMenu(e.clientX, e.clientY, typeof items === 'function' ? items(e) : items);
  });
  return el;
}

export { pressable };
