import { A2Element, define } from '../core/base.js';
import { ROW_CSS } from './toggle.js';

/** <a2-radio value="a">라벨</a2-radio> — a2-radio-group 안에서 쓴다 */
export class A2Radio extends A2Element {
  static observedAttributes = ['checked', 'disabled'];
  static styles = `${ROW_CSS}
:host { outline: none; }
:host(:focus-visible) .halo { opacity: 0.14; transform: scale(1); }
.dot { flex: none; position: relative; width: 20px; height: 20px; border-radius: 50%; border: 2px solid var(--a2-line-strong); transition: border-color var(--fx), transform var(--snap); }
.c:hover .dot { border-color: var(--a2-text); }
.c:active .dot { transform: scale(0.84); }
:host([checked]) .dot { border-color: var(--a2-accent); }
:host([checked]) .halo { background: var(--a2-accent); }
.dot::after { content: ''; position: absolute; inset: 3px; border-radius: 50%; background: var(--a2-accent); transform: scale(0); transition: transform var(--snap); }
:host([checked]) .dot::after { transform: scale(1); }
`;
  render() {
    this.setAttribute('role', 'radio');
    this.root.innerHTML = `<div class="c" part="base"><span class="dot" part="dot"><span class="halo"></span></span><span class="lbl t"><slot></slot></span></div>`;
    this.addEventListener('click', () => { if (!this.disabled) this.closest('a2-radio-group')?.pick(this, true); });
  }
  update() {
    this.setAttribute('aria-checked', String(this.checked));
    this.setAttribute('aria-disabled', String(this.disabled));
  }
  get checked() { return this.bool('checked'); }
  set checked(v) { this.setBool('checked', v); }
  get value() { return this.str('value', this.textContent.trim()); }
  get disabled() { return this.bool('disabled') || !!this.closest('a2-radio-group')?.hasAttribute('disabled'); }
  set disabled(v) { this.setBool('disabled', v); }
}

/** <a2-radio-group label="크기" name="size" value="m" direction="row"> */
export class A2RadioGroup extends A2Element {
  static formAssociated = true;
  static observedAttributes = ['label', 'hint', 'error', 'value', 'disabled', 'required', 'direction'];
  static styles = `
:host { display: block; }
.label { margin-bottom: 12px; }
.hint { margin-left: 0; }
.list { display: flex; flex-direction: column; gap: 14px; }
:host([direction="row"]) .list { flex-direction: row; flex-wrap: wrap; gap: 14px 24px; }
`;
  render() {
    this.setAttribute('role', 'radiogroup');
    this.root.innerHTML = `<div class="label t" part="label"></div><div class="list" part="list"><slot></slot></div><div class="hint t" part="hint"></div>`;
    this._init = this.getAttribute('value');
    this.root.querySelector('slot').addEventListener('slotchange', () => this.update());
    this.addEventListener('keydown', e => {
      const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
      if (e.key === ' ' && e.target.matches?.('a2-radio')) { e.preventDefault(); this.pick(e.target, true); return; }
      if (!(e.key in keys)) return;
      e.preventDefault();
      const list = this.radios.filter(r => !r.disabled);
      const cur = list.indexOf(e.target.closest?.('a2-radio'));
      const next = list[(cur + keys[e.key] + list.length) % list.length];
      if (next) { next.focus(); this.pick(next, true); }
    });
  }
  get radios() { return [...this.querySelectorAll('a2-radio')]; }
  get value() { return this.radios.find(r => r.checked)?.value ?? this.str('value') ?? ''; }
  set value(v) { this.setAttribute('value', v); }
  pick(radio, user) {
    if (radio.checked && !user) return;
    const changed = !radio.checked;
    for (const r of this.radios) r.checked = r === radio;
    this.sync();
    if (user && changed) { this.fire('input'); this.fire('change'); }
  }
  attr(name, v) {
    if (name === 'value') { const r = this.radios.find(x => x.value === v); if (r) this.pick(r, false); else this.update(); }
    else this.update();
  }
  update() {
    this.paintField();
    const want = this.getAttribute('value');
    if (want != null && !this.radios.some(r => r.checked)) { const r = this.radios.find(x => x.value === want); if (r) r.checked = true; }
    this.sync();
  }
  sync() {
    const list = this.radios, on = list.find(r => r.checked) || list.find(r => !r.disabled);
    for (const r of list) r.tabIndex = r === on && !r.disabled ? 0 : -1;
    const v = list.find(r => r.checked)?.value ?? null;
    this.internals.setFormValue(v);
    if (this.bool('required') && v == null) this.internals.setValidity({ valueMissing: true }, '하나를 골라 주세요.', list[0]);
    else this.internals.setValidity({});
  }
  formResetCallback() {
    for (const r of this.radios) r.checked = this._init != null && r.value === this._init;
    this.sync();
  }
}

define('a2-radio', A2Radio);
define('a2-radio-group', A2RadioGroup);
