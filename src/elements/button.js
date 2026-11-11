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
  width: 100%; height: var(--a2-h); padding: 0 calc(var(--in) + 14px); border-radius: var(--a2-radius);
  font-weight: var(--a2-weight-strong); white-space: nowrap; user-select: none; touch-action: manipulation;
  color: var(--fg); --fg: var(--a2-text); --bg: transparent; --bd: var(--a2-line-strong);
}
/* 누르는 범위는 보이는 테보다 사방으로 5px 넓고, 눌러도 줄어들지 않는다 */
.b::before { content: ''; position: absolute; inset: -5px; z-index: -1; }
/* 테: 바깥 선 */
.face { position: absolute; inset: 0; z-index: -1; border-radius: inherit; border: var(--a2-ring) solid var(--bd); pointer-events: none; transition: border-color var(--t1); }
/* 조각: 테 안쪽 면. 누르면 안으로 줄어든다 */
.face::after {
  content: ''; position: absolute; inset: var(--a2-gap); border-radius: var(--ri); background: var(--bg);
  transition: background-color var(--t1), inset var(--t2) var(--pop), border-radius var(--t2) var(--pop);
}
.b:hover { --bg: var(--a2-fill-hover); }
.b:active .face::after { inset: calc(var(--a2-gap) + 3px); border-radius: calc(var(--ri) - 2px); transition-duration: var(--t1), 0.07s, 0.07s; }
:host([variant="primary"]) .b { --fg: var(--a2-on-accent); --bg: var(--a2-accent); --bd: var(--a2-accent); }
:host([variant="primary"]) .b:hover { --bg: var(--a2-accent-hover); }
:host([variant="soft"]) .b { --fg: var(--a2-accent); --bg: var(--a2-accent-soft); --bd: color-mix(in srgb, var(--a2-accent) 55%, transparent); }
:host([variant="soft"]) .b:hover { --bg: color-mix(in srgb, var(--a2-accent) 26%, transparent); }
:host([variant="ghost"]) .b { --bd: transparent; }
:host([variant="danger"]) .b { --fg: #fff; --bg: var(--a2-danger); --bd: var(--a2-danger); }
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
