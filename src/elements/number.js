import { A2Element, define, icon } from '../core/base.js';
import { evaluate } from '../core/evaluator.js';
import { FIELD_CSS } from './input.js';

const clamp = (v, a, b) => Math.min(Math.max(v, a), b);
const decimalsOf = s => { const t = String(s); return t.includes('.') ? t.split('.')[1].length : 0; };

/**
 * <a2-number label="수량" value="3" min="0" max="10" step="1" unit="개">
 * 입력칸에 50+25, x*2 (x 는 지금 값) 같은 계산식을 쓸 수 있다. 버튼을 누르고 있으면 계속 바뀐다.
 */
export class A2Number extends A2Element {
  static formAssociated = true;
  static delegatesFocus = true;
  static observedAttributes = ['label', 'hint', 'error', 'disabled', 'required', 'min', 'max', 'step', 'unit', 'value', 'decimals'];
  static styles = `${FIELD_CSS}
.box { padding: 0 var(--a2-gap); gap: 2px; }
.ctl { text-align: center; font-variant-numeric: tabular-nums; }
.step {
  flex: none; position: relative; width: calc(var(--a2-h) - var(--in) * 2); height: calc(var(--a2-h) - var(--in) * 2); touch-action: manipulation; border-radius: var(--ri);
  display: grid; place-items: center; background: var(--a2-fill-hover); color: var(--a2-text-muted);
  transition: background-color var(--t1), color var(--t1), transform var(--t2) var(--pop);
}
.step::before { content: ''; position: absolute; inset: -4px; }
.step:hover { background: var(--a2-fill-active); color: var(--a2-text); }
.step:active { transform: scale(0.86); background: var(--a2-accent); color: var(--a2-on-accent); }
.step:disabled { opacity: 0.3; pointer-events: none; }
.unit { flex: none; color: var(--a2-text-muted); font-size: var(--a2-fs-sm); padding: 0.12em 6px 0 0; }
.unit:empty, .calc:empty { display: none; }
.calc { flex: none; color: var(--a2-text-muted); font-size: var(--a2-fs-sm); padding-top: 0.12em; white-space: nowrap; }
.calc.bad { color: var(--a2-danger); }
`;
  render() {
    this.root.innerHTML = `${this.fieldHead('f')}<div class="box" part="box"><button class="step dec" type="button" tabindex="-1" aria-label="줄이기">${icon('minus', 12)}</button><input id="f" class="ctl" part="input" inputmode="decimal" autocomplete="off"><span class="calc"></span><span class="unit"></span><button class="step inc" type="button" tabindex="-1" aria-label="늘리기">${icon('plus', 12)}</button></div><div class="hint t" part="hint"></div>`;
    this.ctl = this.$('input');
    this._v = this.clean(this.num('value', this.num('min', 0) > 0 ? this.num('min', 0) : 0));
    this.ctl.addEventListener('input', () => this.preview());
    this.ctl.addEventListener('focus', () => { this.ctl.value = String(this._v); this.ctl.select(); });
    this.ctl.addEventListener('blur', () => this.commit());
    this.ctl.addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); this.commit(); this.ctl.select(); }
      else if (e.key === 'Escape') { this.ctl.value = String(this._v); this.preview(); }
      else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') { e.preventDefault(); this.bump(e.key === 'ArrowUp' ? 1 : -1, e.shiftKey ? 10 : 1); this.ctl.value = String(this._v); this.fire('change'); }
    });
    for (const [sel, d] of [['.dec', -1], ['.inc', 1]]) {
      const b = this.$(sel);
      let t1 = 0, t2 = 0, held = false;
      const stop = () => { clearTimeout(t1); clearInterval(t2); if (held) { held = false; this.fire('change'); } };
      b.addEventListener('pointerdown', e => {
        if (e.button !== 0) return;
        e.preventDefault(); held = true; this.bump(d);
        t1 = setTimeout(() => { t2 = setInterval(() => this.bump(d), 55); }, 380);
      });
      for (const ev of ['pointerup', 'pointerleave', 'pointercancel']) b.addEventListener(ev, stop);
    }
  }
  get min() { return this.num('min', -Infinity); }
  get max() { return this.num('max', Infinity); }
  get step() { return this.num('step', 1); }
  get decimals() { return this.num('decimals', decimalsOf(this.step)); }
  clean(v) {
    v = +v;
    if (!Number.isFinite(v)) return this._v ?? 0;
    const base = Number.isFinite(this.min) ? this.min : 0;
    v = Math.round((v - base) / this.step) * this.step + base;
    return +clamp(v, this.min, this.max).toFixed(Math.min(10, this.decimals));
  }
  get value() { return this._v; }
  set value(v) { const nv = this.clean(v); if (nv === this._v) return; this._v = nv; if (this._rendered) this.update(); }
  bump(dir, mult = 1) { const nv = this.clean(this._v + dir * this.step * mult); if (nv !== this._v) { this._v = nv; this.update(); this.fire('input'); } }
  preview() {
    const r = evaluate(this.ctl.value, { x: this._v }), c = this.$('.calc');
    const plain = /^\s*-?\d*\.?\d+\s*$/.test(this.ctl.value);
    c.classList.toggle('bad', !r.ok && this.ctl.value.trim() !== '');
    c.textContent = !r.ok ? (this.ctl.value.trim() ? '?' : '') : plain ? '' : `= ${this.clean(r.value)}`;
  }
  commit() {
    const r = evaluate(this.ctl.value, { x: this._v });
    this.$('.calc').textContent = '';
    if (r.ok) { const nv = this.clean(r.value); if (nv !== this._v) { this._v = nv; this.fire('input'); this.fire('change'); } }
    this.update();
  }
  attr(name, v) { if (name === 'value') this.value = v; else this.update(); }
  update() {
    this.paintField();
    this.$('.unit').textContent = this.str('unit');
    if (this.root.activeElement !== this.ctl) this.ctl.value = this._v.toFixed(this.decimals);
    this.$('.dec').disabled = this._v <= this.min || this.disabled;
    this.$('.inc').disabled = this._v >= this.max || this.disabled;
    this.ctl.disabled = this.disabled;
    if (this.hasAttribute('label')) this.ctl.setAttribute('aria-label', this.getAttribute('label'));
    this.internals.setFormValue(String(this._v));
  }
  formResetCallback() { this._v = this.clean(this.num('value', 0)); this.update(); }
}
define('a2-number', A2Number);
