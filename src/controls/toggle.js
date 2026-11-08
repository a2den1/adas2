import { Control } from './control.js';
import { h, resolveOptions } from '../core/dom.js';

export const ToggleOptions = { value: false, defaultValue: null, text: '', onChanged: null, tooltip: null };

/** 스위치 하나를 만든다 (토글·카드에서 같이 쓴다) */
export function makeSwitch(parent) {
  const sw = h('span', 'a2-switch', parent);
  h('span', 'a2-switch-knob', sw);
  return sw;
}

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
    this.sw = makeSwitch(el);
    el.addEventListener('click', () => { if (!this.blocked) this.toggle(true); });
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.toggle(true); } });
    this.enableMiddleReset();
    this.updateVisual(true);
  }
  toggle(notify = true) { this.set(!this.value, notify); }
  updateVisual(noAnimate) {
    const on = this.value;
    this.el.setAttribute('aria-checked', on);
    this.sw.classList.toggle('a2-no-anim', !!noAnimate);
    this.el.classList.toggle('a2-on', on);
    this.paintChangedDot(noAnimate);
  }
}
