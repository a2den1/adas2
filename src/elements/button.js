import { A2Element, define } from '../core/base.js';

/**
 * <a2-button variant="primary|secondary|soft|ghost|danger" size="sm|lg" type="button|submit|reset" loading block>
 */
export class A2Button extends A2Element {
  static formAssociated = true;
  static delegatesFocus = true;
  static observedAttributes = ['disabled', 'loading', 'type'];
  static styles = `
:host { display: inline-flex; vertical-align: middle; }
:host([block]) { display: flex; }
.b {
  position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  width: 100%; height: var(--a2-h); padding: 0 16px; border-radius: var(--a2-radius);
  font-weight: var(--a2-weight-strong); white-space: nowrap; user-select: none;
  background: var(--a2-fill); color: var(--a2-text);
  transition: background-color var(--t1), color var(--t1), transform var(--t1) var(--spring);
}
.b:hover { background: var(--a2-fill-hover); }
.b:active { transform: scale(0.97); background: var(--a2-fill-active); }
:host([variant="primary"]) .b { background: var(--a2-accent); color: var(--a2-on-accent); }
:host([variant="primary"]) .b:hover { background: var(--a2-accent-hover); }
:host([variant="primary"]) .b:active { background: var(--a2-accent-pressed); }
:host([variant="soft"]) .b { background: var(--a2-accent-soft); color: var(--a2-accent); }
:host([variant="soft"]) .b:hover { background: color-mix(in srgb, var(--a2-accent) 24%, transparent); }
:host([variant="ghost"]) .b { background: transparent; }
:host([variant="ghost"]) .b:hover { background: var(--a2-fill-hover); }
:host([variant="danger"]) .b { background: var(--a2-danger); color: #fff; }
:host([variant="danger"]) .b:hover { background: color-mix(in srgb, var(--a2-danger) 86%, #fff); }
.b.square { width: var(--a2-h); padding: 0; }
.lbl { display: inline-flex; align-items: center; gap: 8px; }
::slotted(svg), ::slotted(i) { flex: none; }
.spin { position: absolute; width: 16px; height: 16px; border-radius: 50%; border: 2px solid currentColor; border-right-color: transparent; opacity: 0; animation: a2spin calc(0.75s / var(--a2-speed)) linear infinite; }
:host([loading]) .spin { opacity: 1; }
:host([loading]) .lbl, :host([loading]) slot[name] { visibility: hidden; }
:host([loading]) .b { pointer-events: none; }
@keyframes a2spin { to { rotate: 360deg; } }
`;
  render() {
    this.root.innerHTML = `<button class="b" part="base" type="button"><span class="spin" aria-hidden="true"></span><slot name="prefix"></slot><span class="lbl t"><slot></slot></span><slot name="suffix"></slot></button>`;
    this.btn = this.$('button');
    this.btn.addEventListener('click', e => {
      if (this.disabled || this.bool('loading')) { e.preventDefault(); e.stopImmediatePropagation(); return; }
      const f = this.form, t = this.str('type', 'button');
      if (f && t === 'submit') f.requestSubmit();
      else if (f && t === 'reset') f.reset();
    });
    this.root.querySelector('slot:not([name])').addEventListener('slotchange', () => this.update());
  }
  update() {
    this.btn.disabled = this.disabled;
    this.btn.setAttribute('aria-busy', this.bool('loading'));
    const text = [...this.childNodes].some(n => (n.nodeType === 3 && n.textContent.trim()) || (n.nodeType === 1 && !n.slot && n.tagName !== 'SVG' && n.tagName !== 'I'));
    this.btn.classList.toggle('square', !text);
    if (this.hasAttribute('label')) this.btn.setAttribute('aria-label', this.getAttribute('label'));
  }
  get loading() { return this.bool('loading'); }
  set loading(v) { this.setBool('loading', v); }
  click() { this.btn ? this.btn.click() : super.click(); }
}
define('a2-button', A2Button);
