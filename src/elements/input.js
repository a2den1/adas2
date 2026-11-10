import { A2Element, define, icon } from '../core/base.js';

const FIELD_CSS = `
:host { display: block; }
.box {
  position: relative; display: flex; align-items: center; gap: 8px; min-height: var(--a2-h); padding: 0 12px;
  border-radius: var(--a2-radius); background: var(--a2-fill); cursor: text;
  transition: background-color var(--t1), box-shadow var(--t1);
}
.box:hover { background: var(--a2-fill-hover); }
.box:focus-within { background: var(--a2-fill-active); }
:host([error]) .box { background: color-mix(in srgb, var(--a2-danger) 14%, var(--a2-fill)); }
.ctl {
  flex: 1; min-width: 0; height: var(--a2-h); padding: 0.12em 0 0; border: 0; outline: 0; background: transparent;
  color: var(--a2-text); caret-color: var(--a2-accent);
}
.ctl::placeholder { color: var(--a2-text-faint); }
.ctl::selection { background: var(--a2-accent-soft); }
.ctl:focus-visible { outline: 0; }
::slotted([slot="prefix"]), ::slotted([slot="suffix"]) { color: var(--a2-text-muted); flex: none; }
.mini {
  flex: none; width: 24px; height: 24px; border-radius: 6px; display: none; place-items: center; color: var(--a2-text-muted);
  transition: background-color var(--t1), color var(--t1);
}
.mini:hover { background: var(--a2-fill-active); color: var(--a2-text); }
.count { flex: none; font-size: var(--a2-fs-sm); color: var(--a2-text-faint); padding-top: 0.12em; }
.count:empty { display: none; }
`;

/** 공통: 폼 값·유효성 */
class FieldBase extends A2Element {
  static formAssociated = true;
  static delegatesFocus = true;
  syncForm() {
    if (!this.ctl) return;
    this.internals.setFormValue(this.ctl.value);
    this.internals.setValidity(this.ctl.validity, this.ctl.validationMessage, this.ctl);
  }
  get value() { return this.ctl ? this.ctl.value : this.str('value'); }
  set value(v) { if (this.ctl) { this.ctl.value = v ?? ''; this.after(); } else this.setAttribute('value', v ?? ''); }
  after() { this.syncForm(); }
  formResetCallback() { this.value = this.str('value'); }
  focus(o) { this.ctl ? this.ctl.focus(o) : super.focus(o); }
  select() { this.ctl && this.ctl.select(); }
  checkValidity() { return this.internals.checkValidity(); }
  reportValidity() { return this.internals.reportValidity(); }
  copyAttrs(list) {
    for (const a of list) {
      const v = this.getAttribute(a);
      if (v == null) this.ctl.removeAttribute(a); else this.ctl.setAttribute(a, v);
    }
    this.ctl.disabled = this.disabled;
  }
}

/**
 * <a2-input label="이름" placeholder="..." type="text|password|email|search|url|tel" clearable required maxlength hint error>
 *   <svg slot="prefix">…</svg>
 */
export class A2Input extends FieldBase {
  static observedAttributes = ['label', 'hint', 'error', 'placeholder', 'type', 'disabled', 'readonly', 'required', 'clearable', 'maxlength', 'minlength', 'pattern', 'autocomplete', 'inputmode', 'value'];
  static styles = FIELD_CSS;
  render() {
    this.root.innerHTML = `${this.fieldHead('f')}<div class="box" part="box"><slot name="prefix"></slot><input id="f" class="ctl" part="input"><button class="mini clear" type="button" tabindex="-1" aria-label="지우기">${icon('x', 14)}</button><button class="mini reveal" type="button" tabindex="-1" aria-label="보이기">${icon('eye', 16)}</button><slot name="suffix"></slot></div><div class="hint t" part="hint"></div>`;
    this.ctl = this.$('input');
    this.ctl.value = this.str('value');
    this.$('.box').addEventListener('pointerdown', e => { if (e.target === this.$('.box')) { e.preventDefault(); this.ctl.focus(); } });
    this.ctl.addEventListener('input', () => this.after());
    this.ctl.addEventListener('change', () => this.fire('change'));
    this.$('.clear').addEventListener('click', () => { this.ctl.value = ''; this.after(); this.fire('input'); this.fire('change'); this.ctl.focus(); });
    this.$('.reveal').addEventListener('click', () => {
      this._reveal = !this._reveal;
      this.update();
    });
  }
  attr(name, v) { if (name === 'value') { if (this.ctl.value !== (v ?? '')) this.value = v ?? ''; } else this.update(); }
  update() {
    this.paintField();
    this.copyAttrs(['placeholder', 'readonly', 'required', 'maxlength', 'minlength', 'pattern', 'autocomplete', 'inputmode']);
    const t = this.str('type', 'text');
    this.ctl.type = t === 'password' && this._reveal ? 'text' : t;
    const rv = this.$('.reveal');
    rv.style.display = t === 'password' ? 'grid' : 'none';
    if (rv.dataset.on !== String(!!this._reveal)) { rv.dataset.on = String(!!this._reveal); rv.innerHTML = icon(this._reveal ? 'eyeOff' : 'eye', 16); rv.setAttribute('aria-label', this._reveal ? '가리기' : '보이기'); }
    if (this.hasAttribute('label')) this.ctl.setAttribute('aria-label', this.getAttribute('label'));
    this.after();
  }
  after() {
    super.after();
    this.$('.clear').style.display = this.bool('clearable') && this.ctl.value ? 'grid' : 'none';
  }
}

/** <a2-textarea label rows="3" maxlength placeholder> — 내용에 맞춰 높이가 늘어난다 */
export class A2Textarea extends FieldBase {
  static observedAttributes = ['label', 'hint', 'error', 'placeholder', 'disabled', 'readonly', 'required', 'maxlength', 'rows', 'value'];
  static styles = `${FIELD_CSS}
.box { align-items: flex-start; padding: 10px 12px; }
.ctl { height: auto; line-height: 1.6; resize: none; padding: 0; overflow: hidden; }
.count { align-self: flex-end; }
`;
  render() {
    this.root.innerHTML = `${this.fieldHead('f')}<div class="box" part="box"><textarea id="f" class="ctl" part="input"></textarea><span class="count"></span></div><div class="hint t" part="hint"></div>`;
    this.ctl = this.$('textarea');
    this.ctl.value = this.str('value');
    this.$('.box').addEventListener('pointerdown', e => { if (e.target === this.$('.box')) { e.preventDefault(); this.ctl.focus(); } });
    this.ctl.addEventListener('input', () => this.after());
    this.ctl.addEventListener('change', () => this.fire('change'));
    new ResizeObserver(() => this.fit()).observe(this);
  }
  attr(name, v) { if (name === 'value') { if (this.ctl.value !== (v ?? '')) this.value = v ?? ''; } else this.update(); }
  update() {
    this.paintField();
    this.copyAttrs(['placeholder', 'readonly', 'required', 'maxlength']);
    if (this.hasAttribute('label')) this.ctl.setAttribute('aria-label', this.getAttribute('label'));
    this.after();
  }
  fit() {
    const lh = parseFloat(getComputedStyle(this.ctl).lineHeight) || 22;
    this.ctl.style.height = 'auto';
    this.ctl.style.height = `${Math.max(this.num('rows', 3) * lh, this.ctl.scrollHeight)}px`;
  }
  after() {
    super.after();
    const max = this.getAttribute('maxlength');
    this.$('.count').textContent = max ? `${this.ctl.value.length}/${max}` : '';
    this.fit();
  }
}

define('a2-input', A2Input);
define('a2-textarea', A2Textarea);
export { FIELD_CSS };
