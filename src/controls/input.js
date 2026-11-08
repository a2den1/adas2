import { Control } from './control.js';
import { h, userIcon, resolveOptions } from '../core/dom.js';

export const InputOptions = {
  value: '', defaultValue: null, placeholder: '', icon: null,
  multiline: false, monospace: false,
  onChanged: null, onEndEdit: null, tooltip: null,
};

/** 글자 입력칸 */
export class Input extends Control {
  constructor(parent, id, opts) {
    super(parent, id, resolveOptions(InputOptions, opts), 'input');
    const o = this.opts, el = this.el;
    this.value = o.value ?? '';
    if (o.multiline) el.classList.add('a2-multiline');
    if (o.monospace) el.classList.add('a2-mono');
    this.addHoverOutline();
    this.addChangedDot();
    this.field = h(o.multiline ? 'textarea' : 'input', 'a2-field', el);
    if (!o.multiline) this.field.type = 'text';
    this.field.placeholder = o.placeholder;
    this.field.value = this.value;
    this.field.spellcheck = false;
    if (o.icon) this.iconEl = userIcon(o.icon, 'a2-input-icon', el);
    else el.classList.add('a2-no-icon');
    el.addEventListener('pointerup', e => { if (e.button === 0 && e.target !== this.field) this.field.focus(); });
    this.field.addEventListener('focus', () => el.classList.add('a2-focus'));
    this.field.addEventListener('blur', () => { el.classList.remove('a2-focus'); o.onEndEdit && o.onEndEdit(this.value, this); });
    this.field.addEventListener('input', () => {
      this.value = this.field.value;
      this.paintChangedDot(false);
      o.onChanged && o.onChanged(this.value, this);
    });
    this.enableMiddleReset();
    this.paintChangedDot(true);
  }
  afterReset() { this.opts.onEndEdit && this.opts.onEndEdit(this.value, this); }
  updateVisual(noAnimate) { if (this.field.value !== this.value) this.field.value = this.value; this.paintChangedDot(noAnimate); }
  focus() { this.field.focus(); }
}
