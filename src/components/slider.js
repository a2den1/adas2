import { Component, pressable } from './base.js';
import { h, icon } from '../core/dom.js';
import { tweenNumber } from '../core/tween.js';
import { evaluate } from '../eval/evaluator.js';

const clamp = (v, a, b) => Math.min(Math.max(v, a), b);
const decimalsOf = step => { const s = String(step); return s.includes('.') ? s.split('.')[1].length : 0; };

/** 숫자 값 공통: 범위·간격·표시·계산식 입력 */
class NumberBase extends Component {
  setupNumber(o) {
    this.min = o.min ?? 0; this.max = o.max ?? 100; this.step = o.step ?? (this.max - this.min > 10 ? 1 : 0.01);
    this.decimals = o.decimals ?? decimalsOf(this.step);
    this._value = this.normalize(o.value ?? this.min);
  }
  normalize(v) {
    v = +v;
    if (!Number.isFinite(v)) return this._value ?? this.min;
    if (this.step) v = Math.round((v - this.min) / this.step) * this.step + this.min;
    return +clamp(v, this.min, this.max).toFixed(Math.min(10, this.decimals + 2));
  }
  format(v) { const f = this.opts.format; return typeof f === 'function' ? f(v) : (+v).toFixed(this.decimals); }
  /** 입력칸을 계산식 입력으로 만든다. hint 에 결과를 보여 준다 */
  wireExpr(input, hint) {
    const show = () => {
      const r = evaluate(input.value, { x: this._value });
      input.classList.toggle('a2-bad', !r.ok && input.value.trim() !== '');
      if (!r.ok) { hint.textContent = ''; return; }
      const v = this.normalize(r.value), plain = /^\s*-?\d*\.?\d+\s*$/.test(input.value) && +input.value === v;
      hint.textContent = plain ? '' : `= ${this.format(v)}`;
      hint.classList.toggle('a2-clamped', v !== +r.value.toFixed(Math.min(10, this.decimals + 2)));
    };
    input.addEventListener('input', show);
    input.addEventListener('focus', () => { input.value = String(this._value); input.select(); show(); this.el.classList.add('a2-editing'); });
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); input.blur(); }
      else if (e.key === 'Escape') { e.preventDefault(); this._cancel = true; input.blur(); }
      e.stopPropagation();
    });
    input.addEventListener('blur', () => {
      const r = this._cancel ? { ok: false } : evaluate(input.value, { x: this._value });
      this._cancel = false;
      this.el.classList.remove('a2-editing');
      if (r.ok) { this.set(r.value); this.emit('commit', this._value); }
      input.value = this.format(this._value);
      input.classList.remove('a2-bad');
      hint.textContent = '';
      this.afterEdit && this.afterEdit();
    });
  }
}

/** 슬라이더: 위쪽 줄에 라벨과 값, 아래에 막대와 손잡이 */
export class Slider extends NumberBase {
  constructor(o = {}) {
    super('slider', o);
    this.setupNumber(o);
    const el = this.el;
    this.header(el, o.label);
    this.hint = h('span', 'a2-expr-hint', this.headSlot);
    this.input = h('input', 'a2-num-input', this.headSlot);
    this.input.type = 'text'; this.input.inputMode = 'decimal'; this.input.spellcheck = false;
    this.input.setAttribute('aria-label', `${o.label || ''} 값`);
    if (o.unit) h('span', 'a2-unit', this.headSlot, o.unit);
    this.track = h('div', 'a2-track-area', el);
    this.track.tabIndex = 0;
    this.track.setAttribute('role', 'slider');
    this.track.setAttribute('aria-valuemin', this.min); this.track.setAttribute('aria-valuemax', this.max);
    const rail = h('div', 'a2-rail', this.track);
    this.fill = h('div', 'a2-rail-fill', rail);
    this.thumb = h('div', 'a2-rail-thumb', this.track);
    this._t = this.frac(); this.paint(this._t);
    this.wireExpr(this.input, this.hint);
    this.wirePointer();
    this.track.addEventListener('keydown', e => {
      const big = (this.max - this.min) / 10;
      const d = { ArrowRight: this.step, ArrowUp: this.step, ArrowLeft: -this.step, ArrowDown: -this.step, PageUp: big, PageDown: -big }[e.key];
      if (e.key === 'Home') this.set(this.min); else if (e.key === 'End') this.set(this.max);
      else if (d) this.set(this._value + d); else return;
      e.preventDefault(); this.emit('commit', this._value);
    });
    this.render(true);
  }
  frac(v = this._value) { return this.max === this.min ? 0 : (v - this.min) / (this.max - this.min); }
  paint(t) { t = clamp(t, 0, 1); this.track.style.setProperty('--a2-t', t); }
  render(instant) {
    const t = this.frac();
    this.track.setAttribute('aria-valuenow', this._value);
    if (document.activeElement !== this.input) this.input.value = this.format(this._value);
    this._ft && this._ft.kill();
    if (instant || this._dragging) { this._t = t; this.paint(t); }
    else this._ft = tweenNumber(this._t, t, 0.28, 'OutCubic', v => { this._t = v; this.paint(v); });
    this.paintReset();
  }
  wirePointer() {
    const tr = this.track;
    const at = x => { const r = tr.getBoundingClientRect(); return this.min + clamp((x - r.left) / (r.width || 1), 0, 1) * (this.max - this.min); };
    let down = false;
    tr.addEventListener('pointerdown', e => {
      if (e.button !== 0 || this.disabled) return;
      down = true; this._moved = false;
      try { tr.setPointerCapture(e.pointerId); } catch (_) {}
      this.el.classList.add('a2-active');
      this.set(at(e.clientX));            // 누른 자리로 (애니메이션)
    });
    tr.addEventListener('pointermove', e => {
      if (!down) return;
      this._dragging = true;
      this.set(at(e.clientX));
    });
    const end = () => {
      if (!down) return;
      down = false; this._dragging = false;
      this.el.classList.remove('a2-active');
      this.emit('commit', this._value);
    };
    tr.addEventListener('pointerup', end);
    tr.addEventListener('pointercancel', end);
  }
}

/** 숫자 스테퍼: 라벨 + [-] 값 [+]. 버튼을 누르고 있으면 계속 바뀐다 */
export class Stepper extends NumberBase {
  constructor(o = {}) {
    super('stepper', o);
    this.setupNumber({ step: 1, ...o });
    const el = this.el;
    const text = h('div', 'a2-row-text', el);
    this.header(text, o.label);
    if (o.description) h('div', 'a2-desc', text, o.description);
    const box = h('div', 'a2-stepper-box', el);
    this.minus = h('button', 'a2-step-btn', box); this.minus.type = 'button'; this.minus.setAttribute('aria-label', '줄이기'); icon('minus', '', this.minus);
    const mid = h('div', 'a2-stepper-mid', box);
    this.hint = h('span', 'a2-expr-hint', el);
    this.input = h('input', 'a2-num-input', mid);
    this.input.type = 'text'; this.input.inputMode = 'decimal'; this.input.spellcheck = false;
    if (o.unit) h('span', 'a2-unit', mid, o.unit);
    this.plus = h('button', 'a2-step-btn', box); this.plus.type = 'button'; this.plus.setAttribute('aria-label', '늘리기'); icon('plus', '', this.plus);
    this.wireExpr(this.input, this.hint);
    for (const [btn, d] of [[this.minus, -1], [this.plus, 1]]) {
      let t1 = 0, t2 = 0;
      const stop = () => { clearTimeout(t1); clearInterval(t2); if (btn._held) { btn._held = false; this.emit('commit', this._value); } };
      btn.addEventListener('pointerdown', e => {
        if (e.button !== 0 || this.disabled) return;
        btn._held = true;
        this.set(this._value + d * this.step);
        t1 = setTimeout(() => { t2 = setInterval(() => this.set(this._value + d * this.step), 55); }, 380);
      });
      for (const ev of ['pointerup', 'pointerleave', 'pointercancel']) btn.addEventListener(ev, stop);
      pressable(btn, () => { this.set(this._value + d * this.step); this.emit('commit', this._value); });
    }
    this.render(true);
  }
  render() {
    if (document.activeElement !== this.input) this.input.value = this.format(this._value);
    this.minus.disabled = this._value <= this.min;
    this.plus.disabled = this._value >= this.max;
    this.paintReset();
  }
}
