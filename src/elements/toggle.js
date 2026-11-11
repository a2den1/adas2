import { A2Element, define } from '../core/base.js';

/** 체크박스·스위치 공통 */
class CheckBase extends A2Element {
  static formAssociated = true;
  static delegatesFocus = true;
  static observedAttributes = ['checked', 'disabled', 'required', 'indeterminate', 'value'];
  connectedCallback() { if (this._init === undefined) this._init = this.bool('checked'); super.connectedCallback(); }
  get checked() { return this.bool('checked'); }
  set checked(v) { this.setBool('checked', v); }
  get value() { return this.str('value', 'on'); }
  set value(v) { this.setAttribute('value', v); }
  toggle() {
    if (this.disabled) return;
    this.removeAttribute('indeterminate');
    this.checked = !this.checked;
    this.fire('input'); this.fire('change');
  }
  bindToggle(el) {
    el.addEventListener('click', e => { e.preventDefault(); this.toggle(); });
    el.addEventListener('keydown', e => { if (e.key === ' ' || (e.key === 'Enter' && this.isSwitch)) { e.preventDefault(); this.toggle(); } });
  }
  syncForm() {
    this.internals.setFormValue(this.checked ? this.value : null);
    if (this.bool('required') && !this.checked) this.internals.setValidity({ valueMissing: true }, '선택해 주세요.', this.ctl);
    else this.internals.setValidity({});
  }
  formResetCallback() { this.checked = this._init; }
}

/** <a2-checkbox checked indeterminate>라벨</a2-checkbox> */
export class A2Checkbox extends CheckBase {
  static styles = `
:host { display: inline-flex; vertical-align: middle; }
.c { position: relative; display: inline-flex; align-items: center; gap: 11px; cursor: pointer; user-select: none; min-height: 26px; touch-action: manipulation; }
.c::before { content: ''; position: absolute; inset: -6px -5px; }
.lbl:empty { display: none; }
.c { border-radius: 8px; }
.box { flex: none; position: relative; width: 24px; height: 24px; border-radius: 8px; border: var(--a2-ring) solid var(--a2-line-strong); transition: border-color var(--t2); }
.blk { position: absolute; inset: 3px; border-radius: 3px; background: var(--a2-accent); transform: scale(0); transition: transform var(--t3) var(--pop); }
.c:hover .box { border-color: var(--a2-text-muted); }
.c:active .blk { transform: scale(0.42); }
:host([checked]) .box, :host([indeterminate]) .box { border-color: var(--a2-accent); }
:host([checked]) .blk { transform: scale(1); }
:host([checked]) .c:active .blk { transform: scale(0.62); }
/* 일부만 고른 상태: 조각이 납작한 막대가 된다 */
:host([indeterminate]) .blk { transform: scale(1, 0.3); }
`;
  render() {
    this.root.innerHTML = `<div class="c" part="base" role="checkbox" tabindex="0"><span class="box" part="box"><span class="blk" part="block"></span></span><span class="lbl t"><slot></slot></span></div>`;
    this.ctl = this.$('.c');
    this.bindToggle(this.ctl);
  }
  get indeterminate() { return this.bool('indeterminate'); }
  set indeterminate(v) { this.setBool('indeterminate', v); }
  update() {
    this.ctl.setAttribute('aria-checked', this.indeterminate ? 'mixed' : String(this.checked));
    this.ctl.setAttribute('aria-disabled', String(this.disabled));
    this.ctl.tabIndex = this.disabled ? -1 : 0;
    this.syncForm();
  }
}

/** <a2-switch checked>라벨</a2-switch> */
export class A2Switch extends CheckBase {
  isSwitch = true;
  static styles = `
:host { display: inline-flex; vertical-align: middle; }
.c { position: relative; display: inline-flex; align-items: center; gap: 11px; cursor: pointer; user-select: none; min-height: 26px; touch-action: manipulation; }
.c::before { content: ''; position: absolute; inset: -6px -5px; }
.lbl:empty { display: none; }
.c { border-radius: 11px; }
.track { flex: none; position: relative; width: 52px; height: 30px; border-radius: 11px; border: var(--a2-ring) solid var(--a2-line-strong); transition: border-color var(--t2); }
.thumb {
  position: absolute; top: 3px; bottom: 3px; left: 3px; width: 20px; border-radius: 5px; background: var(--a2-text-muted);
  transition: transform var(--t3) var(--pop), width var(--t2) var(--pop), background-color var(--t2);
}
.c:hover .track { border-color: var(--a2-text-muted); }
.c:active .thumb { width: 26px; }
:host([checked]) .track { border-color: var(--a2-accent); }
:host([checked]) .thumb { transform: translateX(22px); background: var(--a2-accent); }
:host([checked]) .c:active .thumb { transform: translateX(16px); }
`;
  render() {
    this.root.innerHTML = `<div class="c" part="base" role="switch" tabindex="0"><span class="track" part="track"><span class="thumb" part="thumb"></span></span><span class="lbl t"><slot></slot></span></div>`;
    this.ctl = this.$('.c');
    this.bindToggle(this.ctl);
  }
  update() {
    this.ctl.setAttribute('aria-checked', String(this.checked));
    this.ctl.setAttribute('aria-disabled', String(this.disabled));
    this.ctl.tabIndex = this.disabled ? -1 : 0;
    this.syncForm();
  }
}

define('a2-checkbox', A2Checkbox);
define('a2-switch', A2Switch);
