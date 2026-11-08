import { Control } from './control.js';
import { h, userIcon, resolveOptions, themeVar } from '../core/dom.js';
import { tweenColor } from '../core/tween.js';

export const ButtonOptions = { text: '', icon: null, iconPadding: 5, height: null, onClick: null, tooltip: null };

/** 버튼. 글자 버튼 또는 아이콘 버튼 */
export class Button extends Control {
  constructor(parent, id, opts) {
    super(parent, id, resolveOptions(ButtonOptions, opts), 'button');
    const o = this.opts, el = this.el;
    el.setAttribute('role', 'button');
    el.tabIndex = 0;
    if (o.height != null) el.style.setProperty('--a2-h', o.height);
    this.addHoverOutline();
    if (o.icon) {
      el.classList.add('a2-icon-button');
      el.style.setProperty('--a2-icon-pad', o.iconPadding);
      this.iconEl = userIcon(o.icon, 'a2-btn-icon', el);
    } else {
      this.label = h('span', 'a2-btn-text', el, o.text);
    }
    this._bg = () => themeVar(el, 'object-button');
    this.normalColor = null;
    let hover = false, down = false;
    const paint = (color, dur, clear) => { this._t && this._t.kill(); this._t = tweenColor(() => el.style.backgroundColor || this.normal(), c => { el.style.backgroundColor = c; }, color, dur, 'OutSine', clear ? () => { el.style.backgroundColor = ''; } : null); };
    this._paint = paint;
    el.addEventListener('pointerenter', () => { hover = true; if (!down) paint(themeVar(el, 'button-hover'), 0.12); });
    el.addEventListener('pointerleave', () => { hover = false; down = false; paint(this.normal(), 0.12, true); });
    el.addEventListener('pointerdown', e => { if (e.button === 0) { down = true; paint(themeVar(el, 'button-pressed'), 0.08); } });
    el.addEventListener('pointerup', () => { if (!down) return; down = false; paint(hover ? themeVar(el, 'button-hover') : this.normal(), 0.12, !hover); });
    el.addEventListener('click', () => { if (!this.blocked && o.onClick) o.onClick(this); });
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.click(true); } });
  }
  normal() { return this.normalColor || this._bg(); }
  get text() { return this.label ? this.label.textContent : ''; }
  set text(t) { if (this.label) this.label.textContent = t; }
  /** 코드로 누른다 */
  click(notify = true) {
    if (notify && this.opts.onClick) this.opts.onClick(this);
    this._paint(themeVar(this.el, 'button-pressed'), 0.06);
    setTimeout(() => this._paint(this.el.matches(':hover') ? themeVar(this.el, 'button-hover') : this.normal(), 0.12, !this.el.matches(':hover')), 60);
  }
  /** 테마가 바뀌었을 때 원래 색으로 */
  updateVisual(noAnimate) {
    if (noAnimate) { this._t && this._t.kill(); this.el.style.backgroundColor = ''; return; }
    this._paint(this.normal(), 0.2, true);
  }
}
