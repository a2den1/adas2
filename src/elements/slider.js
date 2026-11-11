import { A2Element, define } from '../core/base.js';
import { Spring } from '../core/spring.js';

const clamp = (v, a, b) => Math.min(Math.max(v, a), b);
const PAD = 6; // 손잡이 가운데가 닿는 양끝 여백(px)

/**
 * <a2-slider label="음량" min="0" max="100" step="1" value="40" show-value unit="%" size="sm|lg">
 * 굵은 트랙 위를 가는 손잡이가 가른다. 트랙 어디를 눌러도 그 자리로 스프링처럼 가고, 그대로 끌 수 있다.
 */
export class A2Slider extends A2Element {
  static formAssociated = true;
  static delegatesFocus = true;
  static observedAttributes = ['label', 'hint', 'error', 'min', 'max', 'step', 'value', 'disabled', 'show-value', 'unit'];
  static styles = `
:host { display: block; --track: 16px; }
:host([size="sm"]) { --track: 8px; }
:host([size="lg"]) { --track: 28px; }
.head { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
.head .label { flex: 1; }
.hint { margin-left: 0; }
.out { font-size: var(--a2-fs-sm); color: var(--a2-text); font-variant-numeric: tabular-nums; margin-bottom: 8px; }
.out:empty { display: none; }
/* 모든 조각은 --p(0~1) 하나로 움직인다. 트랙 두 조각은 clip-path 로 잘라 레이아웃을 건드리지 않는다 */
.s { position: relative; height: calc(var(--track) + 28px); cursor: pointer; touch-action: none; user-select: none; container-type: inline-size; --p: 0; --x: calc(${PAD}px + (100cqw - ${PAD * 2}px) * var(--p)); --gap: 6px; --o: calc(var(--track) / 2); }
.tr { position: absolute; left: 0; right: 0; top: 50%; height: var(--track); margin-top: calc(var(--track) / -2); }
.act { background: var(--a2-accent); clip-path: inset(0 calc(100% - var(--x) + var(--gap)) 0 0 round var(--o) 3px 3px var(--o)); }
.inact { background: var(--a2-tonal); clip-path: inset(0 0 0 calc(var(--x) + var(--gap)) round 3px var(--o) var(--o) 3px); }
.inact::after { content: ''; position: absolute; right: calc(var(--track) / 2 - 2px); top: 50%; width: 4px; height: 4px; margin-top: -2px; border-radius: 50%; background: var(--a2-on-tonal); opacity: 0.7; }
.pos { position: absolute; top: 50%; left: 0; width: 0; height: 0; transform: translateX(var(--x)); }
.knob {
  position: absolute; left: -2px; top: calc((var(--track) + 28px) / -2); width: 4px; height: calc(var(--track) + 28px); border-radius: 2px; background: var(--a2-accent);
  transition: transform var(--snap);
}
.knob::before { content: ''; position: absolute; inset: 0 -12px; }
.s:hover .knob { transform: scaleX(1.25); }
.s.drag .knob { transform: scaleX(0.5); }
.knob:focus-visible { outline: 2px solid var(--a2-accent); outline-offset: 4px; }
/* 값 말풍선: 제자리의 틀 안에서 아래에서 위로 올라온다 */
.tipf { position: absolute; bottom: calc(var(--track) / 2 + 20px); left: 0; translate: -50% 0; width: max-content; overflow: clip; border-radius: 999px; pointer-events: none; }
.tip {
  min-width: 44px; padding: 9px 14px 7px; border-radius: 999px; background: var(--a2-tip); color: var(--a2-on-tip); text-align: center;
  font-size: var(--a2-fs); font-weight: var(--a2-weight-strong); white-space: nowrap; font-variant-numeric: tabular-nums;
  transform: translateY(102%); transition: transform var(--snap);
}
.s.drag .tip, .knob:focus-visible + .tipf .tip { transform: none; }
`;
  render() {
    this.root.innerHTML = `<div class="head"><div class="label t" part="label"></div><div class="out t"></div></div><div class="s" part="base"><div class="tr act" part="fill"></div><div class="tr inact" part="track"></div><div class="pos"><div class="knob" part="thumb" role="slider" tabindex="0"></div><div class="tipf"><div class="tip t"></div></div></div></div><div class="hint t" part="hint"></div>`;
    this.sEl = this.$('.s'); this.knob = this.$('.knob');
    this._v = this.clean(this.num('value', (this.min + this.max) / 2));
    this._init = this._v;
    this.pos = new Spring(this.ratio(), 'snap', x => this.sEl.style.setProperty('--p', x.toFixed(4)), 0.0008);
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
  set value(v) { const nv = this.clean(v); if (nv !== this._v) { this._v = nv; if (this._rendered) { this.pos.set(this.ratio()); this.text(); } } }

  /** 트랙 위 좌표 → 값 */
  at(x) {
    const r = this.sEl.getBoundingClientRect(), w = r.width - PAD * 2;
    return this.min + clamp((x - r.left - PAD) / (w || 1), 0, 1) * (this.max - this.min);
  }
  down(e) {
    if (e.button !== 0 || this.disabled) return;
    e.preventDefault();
    this.knob.focus({ preventScroll: true });
    this.sEl.setPointerCapture(e.pointerId);
    this.sEl.classList.add('drag');
    const start = this._v;
    this.set(this.at(e.clientX));
    // 끄는 동안은 튕기지 않고 바로 따라오게
    const mv = ev => this.set(this.at(ev.clientX), 'fxFast');
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
    this.set(nv);
    if (this._v !== before) this.fire('change');
  }
  set(v, cfg = 'snap') {
    const nv = this.clean(v);
    if (nv === this._v) return;
    this._v = nv;
    this.pos.set(this.ratio(), { cfg });
    this.text();
    this.fire('input');
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
    if (name === 'min' || name === 'max' || name === 'step') { this._v = this.clean(this._v); this.pos.jump(this.ratio()); }
    this.update();
  }
  update() {
    this.paintField();
    this.knob.setAttribute('aria-valuemin', this.min);
    this.knob.setAttribute('aria-valuemax', this.max);
    if (this.hasAttribute('label')) this.knob.setAttribute('aria-label', this.getAttribute('label'));
    this.knob.tabIndex = this.disabled ? -1 : 0;
    if (!this.pos.moving) this.pos.jump(this.ratio());
    this.text();
  }
  formResetCallback() { this._v = this._init; this.pos.set(this.ratio()); this.text(); }
}
define('a2-slider', A2Slider);
