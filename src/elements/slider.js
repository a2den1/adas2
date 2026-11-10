import { A2Element, define } from '../core/base.js';
import { animate } from '../core/animate.js';

const clamp = (v, a, b) => Math.min(Math.max(v, a), b);

/**
 * <a2-slider label="음량" min="0" max="100" step="1" value="40" show-value unit="%">
 * 트랙 어디를 눌러도 그 자리로 가고, 그대로 끌 수 있다. 끄는 동안 값 말풍선이 뜬다.
 */
export class A2Slider extends A2Element {
  static formAssociated = true;
  static delegatesFocus = true;
  static observedAttributes = ['label', 'hint', 'error', 'min', 'max', 'step', 'value', 'disabled', 'show-value', 'unit'];
  static styles = `
:host { display: block; --thumb: 20px; }
.head { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
.head .label { flex: 1; }
.out { font-size: var(--a2-fs-sm); color: var(--a2-text); font-variant-numeric: tabular-nums; margin-bottom: 7px; }
.out:empty { display: none; }
.s { position: relative; height: 28px; cursor: pointer; touch-action: none; user-select: none; }
.rail { position: absolute; left: 0; right: 0; top: 50%; height: 6px; margin-top: -3px; border-radius: 3px; background: var(--a2-fill-active); overflow: hidden; }
.fill { position: absolute; left: 0; top: 0; bottom: 0; width: 0; background: var(--a2-accent); border-radius: 3px; }
.knob {
  position: absolute; top: 50%; left: 0; width: var(--thumb); height: var(--thumb); margin: calc(var(--thumb) / -2) 0 0 calc(var(--thumb) / -2);
  border-radius: 50%; background: #fff; box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  transition: transform var(--t2) var(--spring);
}
.s:hover .knob { transform: scale(1.08); }
.s.drag .knob { transform: scale(1.18); }
.knob:focus-visible { outline: 2px solid var(--a2-accent); outline-offset: 3px; }
.tip {
  position: absolute; bottom: calc(100% + 10px); left: 50%; translate: -50% 0; padding: 5px 9px 4px; border-radius: 8px;
  background: var(--a2-tip); color: var(--a2-bg); font-size: var(--a2-fs-sm); font-weight: var(--a2-weight-strong); white-space: nowrap; font-variant-numeric: tabular-nums;
  opacity: 0; transform: translateY(4px) scale(0.9); pointer-events: none;
  transition: opacity var(--t1), transform var(--t2) var(--spring);
}
.s.drag .tip, .knob:focus-visible .tip { opacity: 1; transform: none; }
`;
  render() {
    this.root.innerHTML = `<div class="head"><div class="label t" part="label"></div><div class="out t"></div></div><div class="s" part="base"><div class="rail" part="track"><div class="fill" part="fill"></div></div><div class="knob" part="thumb" role="slider" tabindex="0"><div class="tip t"></div></div></div><div class="hint t" part="hint"></div>`;
    this.sEl = this.$('.s'); this.knob = this.$('.knob'); this.fill = this.$('.fill');
    this._v = this.clean(this.num('value', (this.min + this.max) / 2));
    this._init = this._v;
    this._shown = this.ratio();
    this.sEl.addEventListener('pointerdown', e => this.down(e));
    this.knob.addEventListener('keydown', e => this.key(e));
  }
  get min() { return this.num('min', 0); }
  get max() { return Math.max(this.num('max', 100), this.min); }
  get step() { return this.num('step', 1) || 1; }
  clean(v) {
    v = Math.round((+v - this.min) / this.step) * this.step + this.min;
    const d = (String(this.step).split('.')[1] || '').length;
    return +clamp(v, this.min, this.max).toFixed(d);
  }
  ratio(v = this._v) { return this.max === this.min ? 0 : (v - this.min) / (this.max - this.min); }
  get value() { return this._v; }
  set value(v) { const nv = this.clean(v); if (nv !== this._v) { this._v = nv; if (this._rendered) this.move(false); } }

  /** 트랙 위 좌표 → 값. 손잡이 반지름만큼 양끝을 비워서 손잡이가 밖으로 나가지 않는다 */
  at(x) {
    const r = this.sEl.getBoundingClientRect(), pad = this.knob.offsetWidth / 2, w = r.width - pad * 2;
    return this.min + clamp((x - r.left - pad) / (w || 1), 0, 1) * (this.max - this.min);
  }
  down(e) {
    if (e.button !== 0 || this.disabled) return;
    e.preventDefault();
    this.knob.focus({ preventScroll: true });
    this.sEl.setPointerCapture(e.pointerId);
    this.sEl.classList.add('drag');
    const start = this._v;
    const onKnob = e.target === this.knob || this.knob.contains(e.target);
    this.set(this.at(e.clientX), !onKnob);
    const mv = ev => this.set(this.at(ev.clientX), false);
    const up = () => {
      this.sEl.classList.remove('drag');
      this.sEl.removeEventListener('pointermove', mv);
      this.sEl.removeEventListener('pointerup', up);
      this.sEl.removeEventListener('pointercancel', up);
      if (this._v !== start) this.fire('change');
    };
    this.sEl.addEventListener('pointermove', mv);
    this.sEl.addEventListener('pointerup', up);
    this.sEl.addEventListener('pointercancel', up);
  }
  key(e) {
    const big = Math.max(this.step, (this.max - this.min) / 10);
    const d = { ArrowRight: this.step, ArrowUp: this.step, ArrowLeft: -this.step, ArrowDown: -this.step, PageUp: big, PageDown: -big }[e.key];
    let nv;
    if (d != null) nv = this._v + d * (e.shiftKey ? 10 : 1);
    else if (e.key === 'Home') nv = this.min;
    else if (e.key === 'End') nv = this.max;
    else return;
    e.preventDefault();
    const before = this._v;
    this.set(nv, true);
    if (this._v !== before) this.fire('change');
  }
  set(v, smooth) {
    const nv = this.clean(v);
    if (nv === this._v) return;
    this._v = nv;
    this.move(smooth);
    this.fire('input');
  }
  /** 화면 위치만 옮긴다. 누른 자리로 갈 때는 부드럽게, 끄는 중에는 바로 */
  move(smooth) {
    const to = this.ratio();
    this._anim?.stop();
    if (!smooth) { this._shown = to; this.paint(); }
    else this._anim = animate({ p: this._shown }, { p: to }, { duration: 0.22, ease: 'OutCubic', onUpdate: v => { this._shown = v.p; this.paint(); } });
    this.text();
  }
  paint() {
    const pad = this.knob.offsetWidth / 2 || 10;
    const x = `calc(${pad}px + (100% - ${pad * 2}px) * ${this._shown})`;
    this.knob.style.left = x;
    this.fill.style.width = x;
  }
  text() {
    const s = `${this._v}${this.str('unit')}`;
    this.$('.tip').textContent = s;
    this.$('.out').textContent = this.bool('show-value') ? s : '';
    this.knob.setAttribute('aria-valuenow', this._v);
    this.knob.setAttribute('aria-valuetext', s);
    this.internals.setFormValue(String(this._v));
  }
  attr(name, v) {
    if (name === 'value') { this.value = v; return; }
    if (name === 'min' || name === 'max' || name === 'step') { this._v = this.clean(this._v); this._shown = this.ratio(); }
    this.update();
  }
  update() {
    this.paintField();
    this.knob.setAttribute('aria-valuemin', this.min);
    this.knob.setAttribute('aria-valuemax', this.max);
    if (this.hasAttribute('label')) this.knob.setAttribute('aria-label', this.getAttribute('label'));
    this.knob.tabIndex = this.disabled ? -1 : 0;
    this._shown = this.ratio();
    this.paint(); this.text();
  }
  formResetCallback() { this._v = this._init; this.update(); }
}
define('a2-slider', A2Slider);
