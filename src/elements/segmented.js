import { A2Element, define } from '../core/base.js';
import { slideIndicator } from '../core/animate.js';

/** <a2-segment value="day">일</a2-segment> */
export class A2Segment extends HTMLElement {
  get value() { return this.getAttribute('value') ?? this.textContent.trim(); }
  get disabled() { return this.hasAttribute('disabled'); }
}

/**
 * <a2-segmented label="보기" value="week" name="view" block>
 *   <a2-segment value="day">일</a2-segment> …
 * 선택 표시가 고른 칸으로 옮겨 간다.
 */
export class A2Segmented extends A2Element {
  static formAssociated = true;
  static observedAttributes = ['label', 'hint', 'value', 'disabled'];
  static styles = `
:host { display: inline-block; vertical-align: middle; max-width: 100%; }
:host([block]) { display: block; }
.bar { position: relative; display: inline-flex; gap: 2px; padding: 3px; border-radius: var(--a2-radius); background: var(--a2-fill); max-width: 100%; overflow-x: auto; scrollbar-width: none; }
:host([block]) .bar { display: flex; }
.ind { position: absolute; left: 0; top: 0; border-radius: calc(var(--a2-radius) - 3px); background: var(--a2-raised); box-shadow: 0 1px 3px rgba(0, 0, 0, 0.18); opacity: 0; pointer-events: none; }
.seg {
  position: relative; z-index: 1; flex: 1 0 auto; height: calc(var(--a2-h) - 6px); padding: 0.12em 14px 0; border-radius: calc(var(--a2-radius) - 3px);
  color: var(--a2-text-muted); white-space: nowrap; transition: color var(--t2);
}
.seg:hover { color: var(--a2-text); }
.seg[aria-checked="true"] { color: var(--a2-text); font-weight: var(--a2-weight-strong); }
.seg:disabled { opacity: 0.4; cursor: default; }
.seg:focus-visible { outline-offset: -2px; }
`;
  render() {
    this.root.innerHTML = `<div class="label t" part="label"></div><div class="bar" part="base" role="radiogroup"><span class="ind" part="indicator"></span></div><div class="hint t" part="hint"></div>`;
    this.bar = this.$('.bar'); this.ind = this.$('.ind');
    this._state = {};
    this._init = this.getAttribute('value');
    this.bar.addEventListener('click', e => { const b = e.target.closest('.seg'); if (b) this.pick(b.dataset.v, true); });
    this.bar.addEventListener('keydown', e => {
      const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      if (!d) return;
      e.preventDefault();
      const bs = [...this.bar.querySelectorAll('.seg:not(:disabled)')], i = bs.indexOf(this.root.activeElement);
      const n = bs[(i + d + bs.length) % bs.length];
      if (n) { n.focus(); this.pick(n.dataset.v, true); }
    });
    new MutationObserver(() => this.build()).observe(this, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['disabled', 'value'] });
    new ResizeObserver(() => this.place(true)).observe(this.bar);
    this.build();
  }
  get segments() { return [...this.querySelectorAll('a2-segment')]; }
  get value() { return this._v ?? ''; }
  set value(v) { this.setAttribute('value', v); }
  build() {
    const segs = this.segments;
    if (this._v == null || !segs.some(s => s.value === this._v)) this._v = this.getAttribute('value') ?? segs.find(s => !s.disabled)?.value;
    for (const b of this.bar.querySelectorAll('.seg')) b.remove();
    for (const s of segs) {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'seg'; b.dataset.v = s.value; b.setAttribute('role', 'radio');
      b.innerHTML = s.innerHTML; b.disabled = s.disabled;
      this.bar.append(b);
    }
    this.sync(true);
  }
  pick(v, user) {
    if (v === this._v) return;
    this._v = v;
    this.sync(false);
    if (user) { this.fire('input'); this.fire('change'); }
  }
  sync(instant) {
    for (const b of this.bar.querySelectorAll('.seg')) {
      const on = b.dataset.v === this._v;
      b.setAttribute('aria-checked', String(on));
      b.tabIndex = on ? 0 : -1;
    }
    this.place(instant);
    this.internals.setFormValue(this._v ?? null);
  }
  place(instant) {
    const b = [...this.bar.querySelectorAll('.seg')].find(x => x.dataset.v === this._v);
    if (b) slideIndicator(this.ind, b, this._state, instant);
    else this.ind.style.opacity = '0';
  }
  attr(name, v) { if (name === 'value') { if (v !== this._v) { this._v = v; this.sync(false); } } else this.update(); }
  update() {
    this.paintField();
    this.bar.setAttribute('aria-label', this.str('label'));
    for (const b of this.bar.querySelectorAll('.seg')) if (this.disabled) b.disabled = true;
    // 글꼴이 늦게 오면 칸 너비가 바뀐다
    document.fonts?.ready.then(() => this.place(true));
  }
  formResetCallback() { this._v = this._init ?? this.segments[0]?.value; this.sync(true); }
}

define('a2-segment', A2Segment);
define('a2-segmented', A2Segmented);
