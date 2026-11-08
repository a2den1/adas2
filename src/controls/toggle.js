import { Control } from './control.js';
import { h, icon, resolveOptions } from '../core/dom.js';
import { tweenNumber } from '../core/tween.js';

export const ToggleOptions = { value: false, defaultValue: null, text: '', onChanged: null, tooltip: null };

/** 켜고 끄기. 줄 전체를 누르면 바뀐다 */
export class Toggle extends Control {
  constructor(parent, id, opts) {
    super(parent, id, resolveOptions(ToggleOptions, opts), 'toggle');
    const o = this.opts, el = this.el;
    this.value = !!o.value;
    el.setAttribute('role', 'switch');
    el.tabIndex = 0;
    this.addHoverOutline();
    this.addChangedDot();
    this.label = h('span', 'a2-label', el, o.text);
    this.knob = h('span', 'a2-knob', el);
    this.onIcon = icon('on', 'a2-knob-on', this.knob);
    this.offIcon = icon('off', 'a2-knob-off', this.knob);
    el.addEventListener('click', () => { if (!this.blocked) this.toggle(true); });
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.toggle(true); } });
    this.enableMiddleReset();
    this.updateVisual(true);
  }
  toggle(notify = true) { this.set(!this.value, notify); }
  updateVisual(noAnimate) {
    const on = this.value;
    this.el.setAttribute('aria-checked', on);
    this.el.classList.toggle('a2-on', on);
    this.paintChangedDot(noAnimate);
    if (noAnimate) return;
    // 바뀔 때 30 → 26 으로 살짝 튀는 크기 변화
    this._pop && this._pop.kill();
    this._pop = tweenNumber(30, 26, 0.3, 'OutQuad', v => this.knob.style.setProperty('--a2-knob', v),
      () => this.knob.style.removeProperty('--a2-knob'));
  }
}
