import { A2Element, define, icon, esc } from '../core/base.js';
import { openPopover, POPOVER_CSS } from '../core/popover.js';

/** <a2-option value="a" disabled>사과</a2-option> */
export class A2Option extends HTMLElement {
  get value() { return this.getAttribute('value') ?? this.textContent.trim(); }
  get label() { return this.getAttribute('label') ?? this.textContent.trim(); }
  get disabled() { return this.hasAttribute('disabled'); }
}

/**
 * <a2-select label="과일" placeholder="고르세요" value="a" multiple searchable name="fruit">
 *   <a2-option value="a">사과</a2-option>
 */
export class A2Select extends A2Element {
  static formAssociated = true;
  static delegatesFocus = true;
  static observedAttributes = ['label', 'hint', 'error', 'placeholder', 'value', 'disabled', 'required', 'multiple', 'searchable'];
  static styles = `${POPOVER_CSS}
:host { display: block; }
.box {
  display: flex; align-items: center; gap: 8px; width: 100%; min-height: var(--a2-h); padding: 4px 10px 4px 12px; text-align: left;
  border-radius: var(--a2-radius); background: var(--a2-fill); transition: background-color var(--t1);
}
.box:hover { background: var(--a2-fill-hover); }
:host([open]) .box { background: var(--a2-fill-active); }
:host([error]) .box { background: color-mix(in srgb, var(--a2-danger) 14%, var(--a2-fill)); }
.val { flex: 1; min-width: 0; display: flex; flex-wrap: wrap; gap: 4px; align-items: center; }
.txt { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; padding-top: 0.12em; }
.ph { color: var(--a2-text-faint); }
.chev { flex: none; color: var(--a2-text-muted); transition: transform var(--t3) var(--spring); }
:host([open]) .chev { transform: rotate(180deg); }
.chip {
  display: inline-flex; align-items: center; gap: 2px; height: 26px; padding: 0 4px 0 9px; border-radius: 7px;
  background: var(--a2-accent-soft); color: var(--a2-accent); font-size: var(--a2-fs-sm); font-weight: var(--a2-weight-strong);
  animation: chipIn var(--t2) var(--spring);
}
.chip span { padding-top: 0.12em; }
.chip i { display: grid; place-items: center; width: 18px; height: 18px; border-radius: 5px; font-style: normal; cursor: pointer; }
.chip i:hover { background: color-mix(in srgb, var(--a2-accent) 22%, transparent); }
@keyframes chipIn { from { transform: scale(0.7); opacity: 0; } }
.search { display: flex; align-items: center; gap: 8px; height: 36px; padding: 0 10px; margin-bottom: 4px; border-radius: 8px; background: var(--a2-fill); color: var(--a2-text-muted); }
.search input { flex: 1; min-width: 0; border: 0; outline: 0; background: none; color: var(--a2-text); padding-top: 0.12em; }
.search input::placeholder { color: var(--a2-text-faint); }
.list { display: flex; flex-direction: column; gap: 1px; }
`;
  render() {
    this.root.innerHTML = `${this.fieldHead('')}<button class="box" part="box" type="button" aria-haspopup="listbox"><span class="val"></span><span class="chev">${icon('chevron', 16)}</span></button><div class="hint t" part="hint"></div>
<div class="pop" popover="manual"><div class="menu" part="menu" role="listbox"><label class="search">${icon('search', 15)}<input placeholder="검색" aria-label="검색"></label><div class="list"></div></div></div>`;
    this.box = this.$('.box'); this.pop = this.$('.pop'); this.listEl = this.$('.list'); this.q = this.$('.search input');
    this._sel = this.parseValue(this.getAttribute('value'));
    this._init = [...this._sel];
    this._active = -1;
    this.box.addEventListener('click', e => {
      const x = e.target.closest('.chip i');
      if (x) { e.stopPropagation(); this.toggleValue(x.dataset.v); return; }
      this.isOpen ? this.close() : this.open();
    });
    this.box.addEventListener('keydown', e => this.key(e));
    this.q.addEventListener('keydown', e => this.key(e));
    this.q.addEventListener('input', () => { this._active = 0; this.paintList(); });
    this.listEl.addEventListener('pointerdown', e => e.preventDefault());
    this.listEl.addEventListener('click', e => {
      const it = e.target.closest('.item');
      if (it) this.choose(this.shown[+it.dataset.i]);
    });
    this.listEl.addEventListener('pointermove', e => {
      const it = e.target.closest('.item');
      if (it && +it.dataset.i !== this._active) { this._active = +it.dataset.i; this.markActive(false); }
    });
    new MutationObserver(() => this.update()).observe(this, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['value', 'label', 'disabled'] });
  }
  get multiple() { return this.bool('multiple'); }
  get options() { return [...this.querySelectorAll('a2-option')]; }
  parseValue(v) {
    if (v == null || v === '') return [];
    return this.multiple ? String(v).split(',').map(s => s.trim()).filter(Boolean) : [String(v)];
  }
  get value() { return this.multiple ? [...this._sel] : (this._sel[0] ?? ''); }
  set value(v) {
    this._sel = Array.isArray(v) ? v.map(String) : this.parseValue(v);
    if (!this.multiple) this._sel = this._sel.slice(0, 1);
    if (this._rendered) this.update();
  }
  get selectedOptions() { return this.options.filter(o => this._sel.includes(o.value)); }
  get isOpen() { return !!this._pop?.open; }

  open() {
    if (this.disabled || this.isOpen) return;
    this.setBool('open', true);
    this.box.setAttribute('aria-expanded', 'true');
    this.q.value = '';
    this.$('.search').style.display = this.bool('searchable') ? 'flex' : 'none';
    const first = this.options.findIndex(o => this._sel.includes(o.value));
    this._active = Math.max(0, first);
    this.paintList();
    this._pop = openPopover(this.pop, this.box, { match: true, onClose: () => { this.setBool('open', false); this.box.setAttribute('aria-expanded', 'false'); } });
    if (this.bool('searchable')) this.q.focus({ preventScroll: true });
    this.markActive(true);
  }
  close(refocus = true) {
    if (!this.isOpen) return;
    this._pop.close();
    if (refocus) this.box.focus();
  }
  get shown() {
    const q = this.q.value.trim().toLowerCase();
    return this.options.filter(o => !q || o.label.toLowerCase().includes(q));
  }
  paintList() {
    const list = this.shown;
    this.listEl.innerHTML = list.length
      ? list.map((o, i) => `<div class="item" role="option" data-i="${i}" aria-selected="${this._sel.includes(o.value)}" aria-disabled="${o.disabled}"><span class="grow">${esc(o.label)}</span><span class="mark">${icon('check', 16)}</span></div>`).join('')
      : `<div class="empty t">결과 없음</div>`;
    this.markActive(false);
  }
  markActive(scroll) {
    const items = [...this.listEl.querySelectorAll('.item')];
    items.forEach((el, i) => el.classList.toggle('active', i === this._active));
    if (scroll) items[this._active]?.scrollIntoView({ block: 'nearest' });
  }
  move(d) {
    const list = this.shown;
    if (!list.length) return;
    // 끝에서 처음으로 돌아가지 않고, 꺼진 항목은 건너뛴다
    for (let i = this._active + d; i >= 0 && i < list.length; i += d) {
      if (!list[i].disabled) { this._active = i; break; }
    }
    this.markActive(true);
  }
  key(e) {
    const k = e.key;
    if (!this.isOpen) {
      if (k === 'ArrowDown' || k === 'ArrowUp' || k === 'Enter' || k === ' ') { e.preventDefault(); this.open(); }
      else if (k.length === 1 && !this.multiple) this.typeahead(k, true);
      return;
    }
    if (k === 'ArrowDown') { e.preventDefault(); this.move(1); }
    else if (k === 'ArrowUp') { e.preventDefault(); this.move(-1); }
    else if (k === 'Home') { e.preventDefault(); this._active = 0; this.markActive(true); }
    else if (k === 'End') { e.preventDefault(); this._active = this.shown.length - 1; this.markActive(true); }
    else if (k === 'Enter' || (k === ' ' && e.target === this.box)) { e.preventDefault(); const o = this.shown[this._active]; if (o) this.choose(o); }
    else if (k === 'Tab') this.close(false);
    else if (k.length === 1 && e.target === this.box) this.typeahead(k, false);
  }
  /** 글자를 치면 그 글자로 시작하는 항목으로 */
  typeahead(ch, pick) {
    clearTimeout(this._tt);
    this._typed = (this._typed || '') + ch.toLowerCase();
    this._tt = setTimeout(() => { this._typed = ''; }, 600);
    const list = this.shown, i = list.findIndex(o => !o.disabled && o.label.toLowerCase().startsWith(this._typed));
    if (i < 0) return;
    if (pick) this.choose(list[i]); else { this._active = i; this.markActive(true); }
  }
  choose(o) {
    if (!o || o.disabled) return;
    if (this.multiple) { this.toggleValue(o.value); this.paintList(); return; }
    const changed = this._sel[0] !== o.value;
    this._sel = [o.value];
    this.update();
    this.close();
    if (changed) { this.fire('input'); this.fire('change'); }
  }
  toggleValue(v) {
    const i = this._sel.indexOf(v);
    if (i >= 0) this._sel.splice(i, 1); else this._sel.push(v);
    this.update();
    this.fire('input'); this.fire('change');
  }
  attr(name, v) { if (name === 'value') this.value = v; else this.update(); }
  update() {
    this.paintField();
    const sel = this.selectedOptions, val = this.$('.val');
    if (!sel.length) val.innerHTML = `<span class="txt ph">${esc(this.str('placeholder', '선택'))}</span>`;
    else if (this.multiple) val.innerHTML = sel.map(o => `<span class="chip"><span>${esc(o.label)}</span><i data-v="${esc(o.value)}" aria-label="빼기">${icon('x', 12)}</i></span>`).join('');
    else val.innerHTML = `<span class="txt">${esc(sel[0].label)}</span>`;
    this.box.disabled = this.disabled;
    if (this.hasAttribute('label')) this.box.setAttribute('aria-label', this.getAttribute('label'));
    if (this.isOpen) this.paintList();
    const fd = new FormData();
    if (this.name) for (const v of this._sel) fd.append(this.name, v);
    this.internals.setFormValue(this.multiple ? fd : (this._sel[0] ?? null));
    if (this.bool('required') && !this._sel.length) this.internals.setValidity({ valueMissing: true }, '골라 주세요.', this.box);
    else this.internals.setValidity({});
  }
  formResetCallback() { this._sel = [...this._init]; this.update(); }
}

define('a2-option', A2Option);
define('a2-select', A2Select);
