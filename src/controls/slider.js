import { Control } from './control.js';
import { ctx } from '../core/context.js';
import { h, resolveOptions, themeVar } from '../core/dom.js';
import { tweenNumber, parseColor, cssColor } from '../core/tween.js';
import { evaluate } from '../eval/evaluator.js';

export const SliderOptions = {
  min: 0, max: 100, value: 0, defaultValue: null,
  /** 소수 자리 수(숫자) 또는 v => 문자열 */
  format: 2,
  label: '',
  clampDrag: true, clampInput: true,
  inputMin: null, inputMax: null,
  dragFilter: null, inputFilter: null,
  /** 비선형 눈금: { normalize(min, v, max) → 0~1, denormalize(min, t, max) → v } */
  scale: null,
  onChanged: null, onComplete: null,
  showFill: true,
  /** 1px 끌 때 바뀌는 값. 없으면 컨트롤 폭 = 전체 범위 */
  dragStep: null,
  tooltip: null,
};

const clamp = (v, a, b) => Math.min(Math.max(v, a), b);
const STATE = { normal: 'ok', under: 'warn', over: 'warn', error: 'err' };

/** 슬라이더. 끌어서 바꾸고, 누르면 값을 입력(계산식 가능)한다 */
export class Slider extends Control {
  constructor(parent, id, opts) {
    super(parent, id, resolveOptions(SliderOptions, opts), 'slider');
    const o = this.opts, el = this.el;
    this.value = clamp(+o.value, Math.min(o.min, o.max), Math.max(o.min, o.max));
    el.setAttribute('role', 'slider');
    this.addHoverOutline();
    this.addChangedDot();
    this.fill = h('div', 'a2-fill', el);
    if (!o.showFill) this.fill.style.display = 'none';
    this.addChangedDot(this.fill, 'a2-dot-in-fill');
    this.label = h('span', 'a2-label', el, o.label);
    this.preview = h('span', 'a2-preview', el);
    this.input = h('input', 'a2-value', el);
    this.input.type = 'text';
    this.input.spellcheck = false;
    this.input.setAttribute('aria-label', o.label || 'value');
    this.input.tabIndex = -1;
    el.tabIndex = 0;
    this._frac = this.normalize();
    this.paintFill(this._frac);
    this.input.value = this.fmt(this.value);
    this.paintChangedDot(true);
    this.wireDrag();
    this.wireInput();
    this.enableMiddleReset(el, false);
    el.addEventListener('keydown', e => {
      if (e.target !== el) return;
      const step = o.dragStep || (o.max - o.min) / 100;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); this.set(this.limit(this.value + step), true); }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); this.set(this.limit(this.value - step), true); }
      else if (e.key === 'Enter') { e.preventDefault(); this.beginEdit(); }
    });
  }

  afterReset() { this.opts.onComplete && this.opts.onComplete(this.value, this); }
  fmt(v) { const f = this.opts.format; return typeof f === 'function' ? f(v) : (+v).toFixed(f); }
  limit(v) { const o = this.opts; return o.clampDrag ? clamp(v, Math.min(o.min, o.max), Math.max(o.min, o.max)) : v; }
  normalize(v = this.value) {
    const o = this.opts;
    if (o.scale) return o.scale.normalize(o.min, v, o.max);
    return o.max === o.min ? 0 : (v - o.min) / (o.max - o.min);
  }
  denormalize(t) { const o = this.opts; return o.scale ? o.scale.denormalize(o.min, t, o.max) : o.min + t * (o.max - o.min); }
  setNormalized(t, notify = true) { this.set(this.denormalize(t), notify); }

  paintFill(frac) { this.fill.style.width = `${clamp(frac, 0, 1) * 100}%`; }
  animateFill(to, dur) {
    this._ft && this._ft.kill();
    this._ft = tweenNumber(this._frac, to, dur, 'OutExpo', v => { this._frac = v; this.paintFill(v); });
  }

  set(v, notify = true) {
    v = +v;
    if (Number.isNaN(v) || v === this.value) return;
    this.value = v;
    this.updateVisual(false);
    if (notify && this.opts.onChanged) this.opts.onChanged(v, this);
  }
  setDefaultValue(v, noAnimate) {
    const o = this.opts;
    if (v != null) { if (o.dragFilter) v = o.dragFilter(v); v = this.limit(v); }
    super.setDefaultValue(v, noAnimate);
  }
  updateVisual(noAnimate) {
    this.el.setAttribute('aria-valuenow', this.value);
    if (document.activeElement !== this.input) this.input.value = this.fmt(this.value);
    const t = this.normalize();
    if (noAnimate) { this._ft && this._ft.kill(); this._frac = t; this.paintFill(t); } else this.animateFill(t, this._dragging ? 0.12 : 0.6);
    this.paintChangedDot(noAnimate);
  }

  // ── 끌기: 포인터 잠금으로 화면 끝에 막히지 않게 한다
  wireDrag() {
    const el = this.el, o = this.opts;
    let start = null, lastX = 0, cached = 0;
    el.addEventListener('pointerdown', e => {
      if (e.button !== 0 || this.blocked) return;
      if (document.activeElement === this.input && e.target === this.input) return; // 입력 중엔 글자 커서
      start = { x: e.clientX, y: e.clientY }; lastX = e.clientX; cached = this.value;
      try { el.setPointerCapture(e.pointerId); } catch (_) {}
    });
    el.addEventListener('pointermove', e => {
      if (!start) return;
      if (!this._dragging) {
        if (Math.abs(e.clientX - start.x) < 3) return;
        this._dragging = true;
        el.classList.add('a2-dragging');
        if (document.activeElement === this.input) this.input.blur();
        if (e.pointerType === 'mouse' && el.requestPointerLock) { try { const p = el.requestPointerLock(); p && p.catch && p.catch(() => {}); } catch (_) {} }
      }
      const locked = document.pointerLockElement === el;
      const dx = locked ? e.movementX : e.clientX - lastX;
      lastX = e.clientX;
      if (!dx) return;
      const w = this.input.getBoundingClientRect().width || el.getBoundingClientRect().width || 1;
      const sens = ctx.config.sliderSensitivity;
      if (o.dragStep) cached += dx * o.dragStep * sens;
      else if (o.scale) cached = this.denormalize(this.normalize(cached) + (dx / w) * sens);
      else cached += (dx * (o.max - o.min) * sens) / w;
      cached = this.limit(cached);
      this.set(o.dragFilter ? o.dragFilter(cached) : cached, true);
    });
    const end = e => {
      if (!start) return;
      const dragged = this._dragging;
      start = null; this._dragging = false;
      el.classList.remove('a2-dragging');
      if (document.pointerLockElement === el) document.exitPointerLock();
      if (dragged) { o.onComplete && o.onComplete(this.value, this); return; }
      if (e.type === 'pointerup') this.beginEdit();
    };
    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', end);
  }

  // ── 입력: 계산식 + 미리보기
  beginEdit() {
    if (this.blocked) return;
    this.input.tabIndex = 0;
    this.input.focus();
    this.input.value = String(this.value);
    this.input.select();
  }
  ranges() {
    const o = this.opts;
    const iLo = o.inputMin ?? o.min, iHi = o.inputMax ?? o.max;
    let lo = Math.max(Math.min(o.min, o.max), iLo), hi = Math.min(Math.max(o.min, o.max), iHi);
    if (lo > hi) { lo = iLo; hi = iHi; }
    return { iLo, iHi, lo, hi };
  }
  wireInput() {
    const inp = this.input, o = this.opts;
    inp.addEventListener('focus', () => { this.el.classList.add('a2-editing'); this.onType(); });
    inp.addEventListener('input', () => this.onType());
    inp.addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); inp.blur(); }
      else if (e.key === 'Escape') { e.preventDefault(); this._cancel = true; inp.blur(); }
      e.stopPropagation();
    });
    inp.addEventListener('blur', () => {
      const cancel = this._cancel; this._cancel = false;
      this.el.classList.remove('a2-editing');
      inp.tabIndex = -1;
      const r = cancel ? { ok: false } : evaluate(inp.value, { x: this.value });
      if (r.ok) {
        let v = r.value;
        if (o.clampInput) { const { iLo, iHi } = this.ranges(); v = clamp(v, iLo, iHi); }
        if (o.inputFilter) v = o.inputFilter(v);
        this.set(v, true);
        o.onComplete && o.onComplete(this.value, this);
      }
      inp.value = this.fmt(this.value);
      this.endStateVisuals();
    });
  }
  onType() {
    const text = this.input.value, o = this.opts;
    const r = evaluate(text, { x: this.value });
    if (!r.ok) { this.setStateVisuals('error', null); this.preview.textContent = ''; return; }
    let shown = r.value, state = 'normal';
    if (o.clampInput) {
      const { lo, hi } = this.ranges();
      if (r.value < lo) { shown = lo; state = 'under'; } else if (r.value > hi) { shown = hi; state = 'over'; }
    }
    const plain = /^\s*[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?\s*$/i.test(text) && Math.abs(parseFloat(text) - shown) < 1e-7;
    this.preview.textContent = '';
    if (!(plain && state === 'normal')) {
      const sym = state === 'normal' ? '=' : state === 'over' ? '<' : '>';
      this.preview.append(`${this.fmt(shown)} ${sym} `);
      h('span', 'a2-ghost', this.preview, text);
    }
    this.setStateVisuals(state, shown);
  }
  setStateVisuals(state, value) {
    const color = themeVar(this.el, `math-${STATE[state]}`);
    this.el.style.setProperty('--a2-state', color);
    const c = parseColor(color);
    this.fill.style.backgroundColor = value == null ? 'transparent' : cssColor([c[0], c[1], c[2], 0.3]);
    this.el.classList.add('a2-stated');
    if (value != null) this.animateFill(this.normalize(value), 0.4);
  }
  endStateVisuals() {
    this.preview.textContent = '';
    this.el.classList.remove('a2-stated');
    this.el.style.removeProperty('--a2-state');
    this.fill.style.backgroundColor = '';
    this.animateFill(this.normalize(), 0.4);
  }
}
