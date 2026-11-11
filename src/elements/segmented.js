import { A2Element, define, ripple } from '../core/base.js';

/** <a2-segment value="day">일</a2-segment> */
export class A2Segment extends HTMLElement {
  get value() { return this.getAttribute('value') ?? this.textContent.trim(); }
  get disabled() { return this.hasAttribute('disabled'); }
}

/**
 * <a2-segmented label="보기" value="week" name="view" block multiple>
 *   <a2-segment value="day">일</a2-segment> …
 * 붙어 있는 버튼 묶음. 고른 칸은 색이 차고 둥글어지며, 누르는 칸은 넓어지고 옆 칸이 그만큼 눌린다.
 * multiple 이면 여러 칸을 켤 수 있고 value 는 "a,b".
 */
export class A2Segmented extends A2Element {
  static formAssociated = true;
  static observedAttributes = ['label', 'hint', 'value', 'disabled', 'multiple'];
  static styles = `
:host { display: inline-block; vertical-align: middle; max-width: 100%; }
:host([block]) { display: block; }
:host([size="sm"]) { --a2-h: 36px; --a2-fs: 13px; }
:host([size="lg"]) { --a2-h: 56px; --a2-fs: 16px; }
.bar { display: inline-flex; gap: 2px; max-width: 100%; }
:host([block]) .bar { display: flex; }
.seg {
  position: relative; isolation: isolate; flex: 1 0 auto; height: var(--a2-h); min-width: calc(var(--a2-h) * 1.1); padding: 0.12em calc(var(--a2-h) * 0.36) 0;
  color: var(--a2-on-tonal); white-space: nowrap; user-select: none;
  --in: 7px; --out: calc(var(--a2-h) / 2); border-radius: var(--in);
  transition: border-radius var(--snap), width var(--snap), color var(--fx);
}
.seg:first-of-type { border-radius: var(--out) var(--in) var(--in) var(--out); }
.seg:last-of-type { border-radius: var(--in) var(--out) var(--out) var(--in); }
.seg:only-of-type { border-radius: var(--out); }
.face { position: absolute; inset: 0; z-index: -1; border-radius: inherit; background: var(--a2-tonal); transition: background-color var(--fx); pointer-events: none; }
.face::after { content: ''; position: absolute; inset: 0; border-radius: inherit; background: var(--a2-fill); opacity: 0; transition: opacity var(--fx); }
.seg:hover .face::after { opacity: 1; }
.rp-box { z-index: -1; }
.seg:active { --in: 14px; }
/* 고른 칸: 강조색, 네 귀가 모두 둥글다 */
.seg[aria-checked="true"] { color: var(--a2-on-accent); font-weight: var(--a2-weight-strong); border-radius: var(--out) !important; }
.seg[aria-checked="true"] .face { background: var(--a2-accent); }
.seg:disabled { opacity: 0.4; cursor: default; }
.seg:focus-visible { z-index: 1; }
`;
  render() {
    this.root.innerHTML = `<div class="label t" part="label"></div><div class="bar" part="base"></div><div class="hint t" part="hint"></div>`;
    this.bar = this.$('.bar');
    this._init = this.getAttribute('value');
    this.bar.addEventListener('click', e => { const b = e.target.closest('.seg'); if (b) this.pick(b.dataset.v, true); });
    this.bar.addEventListener('pointerdown', e => { const b = e.target.closest('.seg'); if (b && e.button === 0) this.squeeze(b); });
    this.bar.addEventListener('keydown', e => {
      const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      if (!d) return;
      e.preventDefault();
      const bs = [...this.bar.querySelectorAll('.seg:not(:disabled)')], i = bs.indexOf(this.root.activeElement);
      const n = bs[(i + d + bs.length) % bs.length];
      if (n) { n.focus(); if (!this.multiple) this.pick(n.dataset.v, true); }
    });
    new MutationObserver(() => this.build()).observe(this, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['disabled', 'value'] });
    this.build();
  }
  get multiple() { return this.bool('multiple'); }
  get segments() { return [...this.querySelectorAll('a2-segment')]; }
  get value() { return this.multiple ? [...this._sel] : (this._sel[0] ?? ''); }
  set value(v) { this.setAttribute('value', Array.isArray(v) ? v.join(',') : v); }
  parse(v) { return v == null || v === '' ? [] : this.multiple ? String(v).split(',').map(s => s.trim()).filter(Boolean) : [String(v)]; }
  build() {
    const segs = this.segments;
    if (!this._sel) this._sel = this.parse(this.getAttribute('value'));
    this._sel = this._sel.filter(v => segs.some(s => s.value === v));
    if (!this._sel.length && !this.multiple) { const f = segs.find(s => !s.disabled); if (f) this._sel = [f.value]; }
    this.bar.textContent = '';
    for (const s of segs) {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'seg'; b.dataset.v = s.value;
      b.innerHTML = `<span class="face"></span>${s.innerHTML}`; b.disabled = s.disabled;
      ripple(b);
      this.bar.append(b);
    }
    this.sync();
  }
  /** 누르는 칸은 넓어지고, 바로 옆 칸이 그만큼 좁아진다(묶음 전체 너비는 그대로) */
  squeeze(b) {
    const all = [...this.bar.querySelectorAll('.seg')], i = all.indexOf(b);
    const w = all.map(x => x.getBoundingClientRect().width);
    const near = [all[i - 1], all[i + 1]].filter(Boolean);
    if (!near.length) return;
    const grow = Math.min(18, w[i] * 0.22);
    all.forEach((x, k) => { x.style.flex = 'none'; x.style.width = `${w[k]}px`; });
    b.offsetWidth; // 지금 너비에서 시작
    b.style.width = `${w[i] + grow}px`;
    for (const n of near) n.style.width = `${w[all.indexOf(n)] - grow / near.length}px`;
    const up = () => {
      removeEventListener('pointerup', up, true); removeEventListener('pointercancel', up, true);
      all.forEach((x, k) => { x.style.width = `${w[k]}px`; });
      clearTimeout(this._sq);
      this._sq = setTimeout(() => all.forEach(x => { x.style.width = ''; x.style.flex = ''; }), 700);
    };
    clearTimeout(this._sq);
    addEventListener('pointerup', up, true); addEventListener('pointercancel', up, true);
  }
  pick(v, user) {
    if (this.multiple) { const i = this._sel.indexOf(v); if (i >= 0) this._sel.splice(i, 1); else this._sel.push(v); }
    else { if (this._sel[0] === v) return; this._sel = [v]; }
    this.sync();
    if (user) { this.fire('input'); this.fire('change'); }
  }
  sync() {
    const multi = this.multiple;
    this.bar.setAttribute('role', multi ? 'group' : 'radiogroup');
    let first = true;
    for (const b of this.bar.querySelectorAll('.seg')) {
      const on = this._sel.includes(b.dataset.v);
      b.setAttribute('role', multi ? 'checkbox' : 'radio');
      b.setAttribute('aria-checked', String(on));
      b.tabIndex = multi || on || (first && !this._sel.length) ? 0 : -1;
      first = false;
    }
    const fd = new FormData();
    if (this.name) for (const v of this._sel) fd.append(this.name, v);
    this.internals.setFormValue(multi ? fd : (this._sel[0] ?? null));
  }
  attr(name, v) {
    if (name === 'value') { const nv = this.parse(v); if (nv.join() !== this._sel.join()) { this._sel = nv; this.sync(); } }
    else this.update();
  }
  update() {
    this.paintField();
    if (this.hasAttribute('label')) this.bar.setAttribute('aria-label', this.str('label'));
    if (this.disabled) for (const b of this.bar.querySelectorAll('.seg')) b.disabled = true;
  }
  formResetCallback() { this._sel = this.parse(this._init); if (!this._sel.length && !this.multiple && this.segments[0]) this._sel = [this.segments[0].value]; this.sync(); }
}

define('a2-segment', A2Segment);
define('a2-segmented', A2Segmented);
