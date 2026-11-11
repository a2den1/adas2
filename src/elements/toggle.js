import { A2Element, define, icon } from '../core/base.js';
import { Spring, drag, rubber } from '../core/spring.js';

/* 체크박스·라디오·스위치 공통: 줄 전체가 누르는 범위이고, 표시 뒤에 둥근 상태 면이 스프링으로 커진다 */
export const ROW_CSS = `
:host { display: inline-flex; vertical-align: middle; }
.c { position: relative; display: inline-flex; align-items: center; gap: 12px; cursor: pointer; user-select: none; min-height: 28px; touch-action: manipulation; outline: none; }
.c::before { content: ''; position: absolute; inset: -6px -6px; }
.halo { position: absolute; left: 50%; top: 50%; width: 40px; height: 40px; margin: -20px 0 0 -20px; border-radius: 50%; background: var(--a2-text); opacity: 0; transform: scale(0.5); transition: transform var(--snap), opacity var(--fx); pointer-events: none; }
.c:hover .halo { opacity: 0.08; transform: scale(1); }
.c:active .halo { opacity: 0.14; transform: scale(1.12); }
.c:focus-visible .halo { opacity: 0.14; transform: scale(1); }
.lbl:empty { display: none; }
`;

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
  bindKeys(el) { el.addEventListener('keydown', e => { if (e.key === ' ' || (e.key === 'Enter' && this.isSwitch)) { e.preventDefault(); this.toggle(); } }); }
  aria() {
    this.ctl.setAttribute('aria-disabled', String(this.disabled));
    this.ctl.tabIndex = this.disabled ? -1 : 0;
    this.internals.setFormValue(this.checked ? this.value : null);
    if (this.bool('required') && !this.checked) this.internals.setValidity({ valueMissing: true }, '선택해 주세요.', this.ctl);
    else this.internals.setValidity({});
  }
  formResetCallback() { this.checked = this._init; }
}

/** <a2-checkbox checked indeterminate>라벨</a2-checkbox> */
export class A2Checkbox extends CheckBase {
  static styles = `${ROW_CSS}
.box {
  flex: none; position: relative; width: 20px; height: 20px; border-radius: 6px; border: 2px solid var(--a2-line-strong);
  display: grid; place-items: center; color: var(--a2-on-accent);
  transition: background-color var(--fx), border-color var(--fx), transform var(--snap), border-radius var(--snap);
}
.c:hover .box { border-color: var(--a2-text); }
.c:active .box { transform: scale(0.82); border-radius: 8px; }
:host([checked]) .box, :host([indeterminate]) .box { background: var(--a2-accent); border-color: var(--a2-accent); }
.mark { position: absolute; inset: -2px; display: grid; place-items: center; }
/* 체크 표시는 왼쪽에서 오른쪽으로 드러나며 살짝 튀어나온다 */
.check { clip-path: inset(0 100% 0 0); transform: scale(0.6); transition: clip-path var(--fx), transform var(--snap); }
:host([checked]:not([indeterminate])) .check { clip-path: inset(0); transform: none; }
.dash { transform: scaleX(0); transition: transform var(--snap); }
:host([indeterminate]) .dash { transform: none; }
`;
  render() {
    this.root.innerHTML = `<div class="c" part="base" role="checkbox" tabindex="0"><span class="box" part="box"><span class="halo"></span><span class="mark check">${icon('check', 12)}</span><span class="mark dash"><svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><rect x="1.5" y="5" width="9" height="2.2" rx="1.1" fill="currentColor"/></svg></span></span><span class="lbl t"><slot></slot></span></div>`;
    this.ctl = this.$('.c');
    this.ctl.addEventListener('click', e => { e.preventDefault(); this.toggle(); });
    this.bindKeys(this.ctl);
  }
  get indeterminate() { return this.bool('indeterminate'); }
  set indeterminate(v) { this.setBool('indeterminate', v); }
  update() {
    this.ctl.setAttribute('aria-checked', this.indeterminate ? 'mixed' : String(this.checked));
    this.aria();
  }
}

const TRAVEL = 20; // 손잡이가 움직이는 거리(px)

/**
 * <a2-switch checked>라벨</a2-switch>
 * 누르거나 손잡이를 끌어서 바꾼다. 손잡이는 스프링으로 움직이고, 끌다 놓으면 그 속도를 이어받는다.
 */
export class A2Switch extends CheckBase {
  isSwitch = true;
  static styles = `${ROW_CSS}
.track {
  flex: none; position: relative; width: 52px; height: 32px; border-radius: 16px; background: var(--a2-fill-active); border: 2px solid var(--a2-line-strong);
  transition: background-color var(--fx), border-color var(--fx); touch-action: none;
}
:host([checked]) .track { background: var(--a2-accent); border-color: var(--a2-accent); }
.pos { position: absolute; left: 14px; top: 50%; width: 0; height: 0; transform: translateX(calc(var(--p, 0) * ${TRAVEL}px)); }
:host([checked]) .halo { background: var(--a2-accent); }
.thumb {
  position: absolute; left: 0; top: 0; width: 16px; height: 16px; margin: -8px 0 0 -8px; border-radius: 50%; background: var(--a2-text-muted);
  transition: width var(--snap), height var(--snap), margin var(--snap), background-color var(--fx);
}
:host([checked]) .thumb { width: 24px; height: 24px; margin: -12px 0 0 -12px; background: var(--a2-on-accent); }
.c:hover .thumb { background: var(--a2-text); }
:host([checked]) .c:hover .thumb { background: var(--a2-on-accent); }
.c:active .thumb, .c.drag .thumb { width: 28px; height: 28px; margin: -14px 0 0 -14px; }
`;
  render() {
    this.root.innerHTML = `<div class="c" part="base" role="switch" tabindex="0"><span class="track" part="track"><span class="pos"><span class="halo"></span><span class="thumb" part="thumb"></span></span></span><span class="lbl t"><slot></slot></span></div>`;
    this.ctl = this.$('.c'); this.track = this.$('.track');
    this.pos = new Spring(this.checked ? 1 : 0, 'snap', x => this.track.style.setProperty('--p', x.toFixed(4)), 0.002);
    this.track.style.setProperty('--p', this.pos.x);
    this.bindKeys(this.ctl);
    let p0 = 0, dragged = false;
    drag(this.ctl, {
      start: () => { if (this.disabled) return false; p0 = this.pos.x; dragged = false; },
      move: ({ dx, moved }) => {
        if (!moved) return;
        dragged = true; this.ctl.classList.add('drag');
        const raw = p0 + dx / TRAVEL;
        this.pos.stop(); this.pos.x = raw < 0 ? rubber(raw, 0.35) : raw > 1 ? 1 + rubber(raw - 1, 0.35) : raw;
        this.track.style.setProperty('--p', this.pos.x.toFixed(4));
      },
      end: ({ vx, cancelled }) => {
        this.ctl.classList.remove('drag');
        if (!dragged) { if (!cancelled) this.toggle(); return; }
        const v = vx / TRAVEL, want = Math.abs(v) > 3 ? v > 0 : this.pos.x > 0.5;
        this._vel = v;
        if (want !== this.checked) this.toggle(); else { this._vel = null; this.pos.set(want ? 1 : 0, { velocity: v }); }
      },
    });
  }
  update() {
    this.ctl.setAttribute('aria-checked', String(this.checked));
    this.aria();
    const to = this.checked ? 1 : 0;
    if (this.pos.to !== to || this.pos.x !== to) this.pos.set(to, this._vel != null ? { velocity: this._vel } : undefined);
    this._vel = null;
  }
}

define('a2-checkbox', A2Checkbox);
define('a2-switch', A2Switch);
