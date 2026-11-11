import { A2Element, define, icon } from '../core/base.js';

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
.c { position: relative; display: inline-flex; align-items: center; gap: 10px; cursor: pointer; user-select: none; min-height: 24px; border-radius: 6px; touch-action: manipulation; }
.c::before { content: ''; position: absolute; inset: -6px -5px; }
.box {
  flex: none; position: relative; width: 20px; height: 20px; border-radius: 6px; background: var(--a2-fill); border: 1px solid var(--a2-line-strong);
  display: grid; place-items: center; color: var(--a2-on-accent);
  transition: background-color var(--t2), border-color var(--t2), transform var(--t1) var(--spring);
}
.c:hover .box { background: var(--a2-fill-active); border-color: var(--a2-text-muted); }
.c:active .box { transform: scale(0.88); }
:host([checked]) .box, :host([indeterminate]) .box { background: var(--a2-accent); border-color: var(--a2-accent); }
.mark { position: absolute; inset: -1px; display: grid; place-items: center; }
/* 체크 표시는 왼쪽에서 오른쪽으로 드러난다 */
.check { clip-path: inset(0 100% 0 0); transition: clip-path var(--t2) ease-out; }
:host([checked]:not([indeterminate])) .check { clip-path: inset(0); }
.dash { transform: scaleX(0); transition: transform var(--t2) var(--spring); }
:host([indeterminate]) .dash { transform: none; }
.lbl:empty { display: none; }
`;
  render() {
    this.root.innerHTML = `<div class="c" part="base" role="checkbox" tabindex="0"><span class="box" part="box"><span class="mark check">${icon('check', 12)}</span><span class="mark dash"><svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><rect x="1" y="5" width="10" height="2.2" rx="1.1" fill="currentColor"/></svg></span></span><span class="lbl t"><slot></slot></span></div>`;
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
.c { position: relative; display: inline-flex; align-items: center; gap: 10px; cursor: pointer; user-select: none; min-height: 24px; border-radius: 13px; touch-action: manipulation; }
.c::before { content: ''; position: absolute; inset: -6px -5px; }
.track {
  flex: none; position: relative; width: 42px; height: 26px; border-radius: 13px; background: var(--a2-fill-active); border: 1px solid var(--a2-line-strong);
  transition: background-color var(--t2), border-color var(--t2);
}
.c:hover .track { border-color: var(--a2-text-muted); }
:host([checked]) .track { background: var(--a2-accent); border-color: var(--a2-accent); }
:host([checked]) .c:hover .track { background: var(--a2-accent-hover); border-color: var(--a2-accent-hover); }
.thumb {
  position: absolute; top: 3px; left: 3px; width: 18px; height: 18px; border-radius: 9px; background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
  transition: transform var(--t3) var(--spring), width var(--t2) var(--spring);
}
.c:active .thumb { width: 23px; }
:host([checked]) .thumb { transform: translateX(16px); }
:host([checked]) .c:active .thumb { transform: translateX(11px); }
.lbl:empty { display: none; }
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
