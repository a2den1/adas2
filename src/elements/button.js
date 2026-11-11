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
  position: relative; isolation: isolate; display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  width: 100%; height: var(--a2-h); padding: 0 16px; border-radius: var(--a2-radius);
  font-weight: var(--a2-weight-strong); white-space: nowrap; user-select: none; touch-action: manipulation;
  color: var(--a2-text); --bg: var(--a2-fill); --bd: var(--a2-line);
}
/* 누르는 범위는 보이는 면보다 사방으로 5px 넓고, 눌러도 줄어들지 않는다(줄어드는 것은 보이는 면뿐) */
.b::before { content: ''; position: absolute; inset: -5px; z-index: -1; }
.face {
  position: absolute; inset: 0; z-index: -1; border-radius: inherit; background: var(--bg); border: 1px solid var(--bd); pointer-events: none;
  transition: background-color var(--t1), border-color var(--t1), transform var(--t2) var(--spring);
}
.b:hover { --bg: var(--a2-fill-hover); --bd: var(--a2-line-strong); }
.b:active { --bg: var(--a2-fill-active); }
.b:active .face { transform: scale(0.96); transition-duration: 0.05s; }
:host([variant="primary"]) .b { color: var(--a2-on-accent); --bg: var(--a2-accent); --bd: color-mix(in srgb, var(--a2-accent) 76%, #000); }
:host([variant="primary"]) .b:hover { --bg: var(--a2-accent-hover); }
:host([variant="primary"]) .b:active { --bg: var(--a2-accent-pressed); }
:host([variant="soft"]) .b { color: var(--a2-accent); --bg: var(--a2-accent-soft); --bd: color-mix(in srgb, var(--a2-accent) 34%, transparent); }
:host([variant="soft"]) .b:hover { --bg: color-mix(in srgb, var(--a2-accent) 24%, transparent); --bd: color-mix(in srgb, var(--a2-accent) 55%, transparent); }
:host([variant="ghost"]) .b { --bg: transparent; }
:host([variant="ghost"]) .b:hover { --bg: var(--a2-fill-hover); }
:host([variant="danger"]) .b { color: #fff; --bg: var(--a2-danger); --bd: color-mix(in srgb, var(--a2-danger) 76%, #000); }
:host([variant="danger"]) .b:hover { --bg: color-mix(in srgb, var(--a2-danger) 86%, #fff); }
.b.square { width: var(--a2-h); padding: 0; }
.lbl { display: inline-flex; align-items: center; gap: 8px; }
::slotted(svg), ::slotted(i) { flex: none; }
.spin { display: none; position: absolute; width: 16px; height: 16px; border-radius: 50%; border: 2px solid currentColor; border-right-color: transparent; }
:host([loading]) .spin { display: block; animation: a2spin calc(0.75s / var(--a2-speed)) linear infinite; }
:host([loading]) .lbl, :host([loading]) slot[name] { visibility: hidden; }
:host([loading]) .b { pointer-events: none; }
@keyframes a2spin { to { rotate: 360deg; } }
`;
  render() {
    this.root.innerHTML = `<button class="b" part="base" type="button"><span class="face" part="face"></span><span class="spin" aria-hidden="true"></span><slot name="prefix"></slot><span class="lbl t"><slot></slot></span><slot name="suffix"></slot></button>`;
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
    const text = [...this.childNodes].some(n => (n.nodeType === 3 && n.textContent.trim()) || (n.nodeType === 1 && !n.slot && !/^(svg|i)$/i.test(n.tagName)));
    this.btn.classList.toggle('square', !text);
    if (this.hasAttribute('label')) this.btn.setAttribute('aria-label', this.getAttribute('label'));
  }
  get loading() { return this.bool('loading'); }
  set loading(v) { this.setBool('loading', v); }
  click() { this.btn ? this.btn.click() : super.click(); }
}
define('a2-button', A2Button);
