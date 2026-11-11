import { A2Element, define, icon, esc } from '../core/base.js';
import { evaluate } from '../core/evaluator.js';
import { springEase } from '../core/spring.js';

/*
 * 입력칸 공통 모양: 외곽선이 있고, 라벨은 칸 안에 있다가 글자를 넣거나 초점이 가면 위 선으로 올라가 선을 가른다.
 * 선이 갈라지는 자리는 fieldset 의 legend 로 만든다.
 */
export const FIELD_CSS = `
:host { display: block; }
:host([size="sm"]) { --a2-h-field: 44px; --a2-fs: 13px; }
:host([size="lg"]) { --a2-h-field: 60px; --a2-fs: 16px; }
.f { position: relative; display: flex; align-items: center; gap: 10px; min-height: var(--a2-h-field); padding: 0 14px; cursor: text; --px: 0px; }
.ol {
  position: absolute; inset: -7px 0 0; margin: 0; padding: 0 10px; min-width: 0; text-align: left; pointer-events: none;
  border: 1px solid var(--a2-line-strong); border-radius: var(--a2-r-sm); background: transparent;
  transition: border-color var(--fx), background-color var(--fx);
}
.f:hover .ol { border-color: var(--a2-text-muted); }
.f:focus-within .ol, :host([open]) .ol { border-color: var(--a2-accent); border-width: 2px; padding: 0 9px; }
:host([error]) .ol { border-color: var(--a2-danger); }
legend { padding: 0; height: 14px; font-size: 0.86em; line-height: 14px; visibility: hidden; white-space: nowrap; overflow: hidden; max-width: 0.01px; transition: max-width var(--fx); }
legend span { display: inline-block; padding: 0 6px; }
legend:empty, legend.none { display: none; }
.up legend { max-width: 100%; }
.fl {
  position: absolute; left: 16px; top: 0; max-width: calc(100% - 32px); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; pointer-events: none;
  color: var(--a2-text-muted); transform-origin: 0 50%;
  transform: translate(var(--px), calc(var(--a2-h-field) / 2 - 50%));
  transition: transform var(--move), color var(--fx);
}
.fl:empty { display: none; }
.up .fl { transform: translate(0, -50%) scale(0.86); }
.f:focus-within .fl, :host([open]) .fl { color: var(--a2-accent); }
:host([error]) .fl { color: var(--a2-danger); }
.req { color: var(--a2-accent); margin-left: 2px; }
.ctl {
  position: relative; flex: 1; min-width: 0; height: var(--a2-h-field); padding: 0.12em 0 0; border: 0; outline: 0; background: transparent;
  color: var(--a2-text); caret-color: var(--a2-accent);
}
.ctl::placeholder { color: var(--a2-text-faint); transition: color var(--fx); }
.has-label:not(.up) .ctl::placeholder { color: transparent; }
.ctl::selection { background: var(--a2-accent-soft); }
.ctl:focus-visible { outline: 0; }
::slotted([slot="prefix"]), ::slotted([slot="suffix"]) { position: relative; color: var(--a2-text-muted); flex: none; }
.mini {
  flex: none; width: 28px; height: 28px; border-radius: 50%; display: none; place-items: center; color: var(--a2-text-muted);
  transition: background-color var(--fx), color var(--fx), transform var(--snap);
}
.mini:hover { background: var(--a2-fill-hover); color: var(--a2-text); }
.mini:active { transform: scale(0.86); }
.count { position: relative; flex: none; font-size: var(--a2-fs-sm); color: var(--a2-text-faint); padding-top: 0.12em; }
.count:empty { display: none; }
`;

/** 버튼처럼 누르는 칸(고르기·색)의 껍데기와 라벨 칠하기 */
export const BOX_CSS = `
.f { padding: 0; cursor: pointer; }
.box { position: relative; flex: 1; min-width: 0; display: flex; align-items: center; gap: 10px; min-height: var(--a2-h-field); padding: 6px 14px; text-align: left; border-radius: var(--a2-r-sm); }
.box:focus-visible { outline: 0; }
`;
export const boxShell = inner => `<div class="f" part="field"><fieldset class="ol" aria-hidden="true"><legend><span></span></legend></fieldset><label class="fl t" part="label"></label>${inner}</div><div class="hint t" part="hint"></div>`;
export function paintBox(el, up) {
  const lab = el.str('label'), f = el.$('.f');
  el.$('.fl').innerHTML = lab ? `${esc(lab)}${el.bool('required') ? '<span class="req">*</span>' : ''}` : '';
  el.$('legend span').textContent = lab ? `${lab}${el.bool('required') ? '*' : ''}` : '';
  el.$('legend').classList.toggle('none', !lab);
  f.classList.toggle('has-label', !!lab);
  f.classList.toggle('up', !!up);
  const hint = el.$('.hint'), err = el.getAttribute('error');
  hint.textContent = err || el.str('hint');
  hint.classList.toggle('error', !!err);
}

const fieldShell = inner => `<div class="f" part="box"><fieldset class="ol" aria-hidden="true"><legend><span></span></legend></fieldset><label class="fl t" part="label" for="f"></label>${inner}</div><div class="hint t" part="hint"></div>`;

/** 공통: 뜨는 라벨, 폼 값·유효성 */
class FieldBase extends A2Element {
  static formAssociated = true;
  static delegatesFocus = true;
  bindField() {
    this.f = this.$('.f');
    this.f.addEventListener('pointerdown', e => { if (e.target === this.f || e.target.classList?.contains('fl')) { e.preventDefault(); this.ctl.focus(); } });
    this.ctl.addEventListener('focus', () => this.float());
    this.ctl.addEventListener('blur', () => this.float());
    const pre = this.root.querySelector('slot[name=prefix]');
    if (pre) pre.addEventListener('slotchange', () => {
      const w = pre.assignedElements().reduce((a, el) => a + el.getBoundingClientRect().width, 0);
      this.f.style.setProperty('--px', w ? `${w + 8}px` : '0px');
    });
  }
  /** 라벨을 위로 올릴지: 초점이 있거나 값이 있을 때 */
  float() { this.f.classList.toggle('up', this.root.activeElement === this.ctl || this.ctl.value !== '' || this.alwaysUp === true); }
  paintLabel() {
    const lab = this.str('label');
    this.$('.fl').innerHTML = lab ? `${esc(lab)}${this.bool('required') ? '<span class="req">*</span>' : ''}` : '';
    this.$('legend span').textContent = lab ? `${lab}${this.bool('required') ? '*' : ''}` : '';
    this.$('legend').classList.toggle('none', !lab);
    this.f.classList.toggle('has-label', !!lab);
    const hint = this.$('.hint'), err = this.getAttribute('error');
    hint.textContent = err || this.str('hint');
    hint.classList.toggle('error', !!err);
    if (lab) this.ctl.setAttribute('aria-label', lab);
  }
  syncForm() {
    if (!this.ctl) return;
    this.internals.setFormValue(this.ctl.value);
    this.internals.setValidity(this.ctl.validity, this.ctl.validationMessage, this.ctl);
  }
  get value() { return this.ctl ? this.ctl.value : this.str('value'); }
  set value(v) { if (this.ctl) { this.ctl.value = v ?? ''; this.after(); } else this.setAttribute('value', v ?? ''); }
  after() { this.syncForm(); this.float(); }
  formResetCallback() { this.value = this.str('value'); }
  focus(o) { this.ctl ? this.ctl.focus(o) : super.focus(o); }
  select() { this.ctl && this.ctl.select(); }
  checkValidity() { return this.internals.checkValidity(); }
  reportValidity() { return this.internals.reportValidity(); }
  copyAttrs(list) {
    for (const a of list) { const v = this.getAttribute(a); if (v == null) this.ctl.removeAttribute(a); else this.ctl.setAttribute(a, v); }
    this.ctl.disabled = this.disabled;
  }
}

/**
 * <a2-input label="이름" placeholder="..." type="text|password|email|search|url|tel" clearable required maxlength hint error>
 *   <svg slot="prefix">…</svg>
 */
export class A2Input extends FieldBase {
  static observedAttributes = ['label', 'hint', 'error', 'placeholder', 'type', 'disabled', 'readonly', 'required', 'clearable', 'maxlength', 'minlength', 'pattern', 'autocomplete', 'inputmode', 'value'];
  static styles = FIELD_CSS;
  render() {
    this.root.innerHTML = fieldShell(`<slot name="prefix"></slot><input id="f" class="ctl" part="input"><button class="mini hit clear" type="button" tabindex="-1" aria-label="지우기">${icon('x', 12)}</button><button class="mini hit reveal" type="button" tabindex="-1" aria-label="보이기">${icon('eye', 15)}</button><slot name="suffix"></slot>`);
    this.ctl = this.$('input');
    this.ctl.value = this.str('value');
    this.bindField();
    this.ctl.addEventListener('input', () => this.after());
    this.ctl.addEventListener('change', () => this.fire('change'));
    this.$('.clear').addEventListener('click', () => { this.ctl.value = ''; this.after(); this.fire('input'); this.fire('change'); this.ctl.focus(); });
    this.$('.reveal').addEventListener('click', () => { this._reveal = !this._reveal; this.update(); });
  }
  attr(name, v) { if (name === 'value') { if (this.ctl.value !== (v ?? '')) this.value = v ?? ''; } else this.update(); }
  update() {
    this.paintLabel();
    this.copyAttrs(['placeholder', 'readonly', 'required', 'maxlength', 'minlength', 'pattern', 'autocomplete', 'inputmode']);
    const t = this.str('type', 'text');
    this.ctl.type = t === 'password' && this._reveal ? 'text' : t;
    const rv = this.$('.reveal');
    rv.style.display = t === 'password' ? 'grid' : 'none';
    if (rv.dataset.on !== String(!!this._reveal)) { rv.dataset.on = String(!!this._reveal); rv.innerHTML = icon(this._reveal ? 'eyeOff' : 'eye', 15); rv.setAttribute('aria-label', this._reveal ? '가리기' : '보이기'); }
    this.after();
  }
  after() {
    super.after();
    this.$('.clear').style.display = this.bool('clearable') && this.ctl.value ? 'grid' : 'none';
  }
}

/** <a2-textarea label rows="3" maxlength placeholder> — 내용에 맞춰 높이가 늘어난다 */
export class A2Textarea extends FieldBase {
  static observedAttributes = ['label', 'hint', 'error', 'placeholder', 'disabled', 'readonly', 'required', 'maxlength', 'rows', 'value'];
  static styles = `${FIELD_CSS}
.f { align-items: flex-start; padding: 15px 14px 12px; }
.ctl { height: auto; line-height: 1.6; resize: none; padding: 0; overflow: hidden; }
.count { align-self: flex-end; }
`;
  render() {
    this.root.innerHTML = fieldShell(`<textarea id="f" class="ctl" part="input"></textarea><span class="count"></span>`);
    this.ctl = this.$('textarea');
    this.ctl.value = this.str('value');
    this.bindField();
    this.ctl.addEventListener('input', () => this.after());
    this.ctl.addEventListener('change', () => this.fire('change'));
    // 너비가 바뀔 때만 다시 잰다(높이는 fit 이 바꾸므로 되돌아오지 않게)
    let w = 0;
    new ResizeObserver(([e]) => { const nw = Math.round(e.contentRect.width); if (nw !== w) { w = nw; this.fit(); } }).observe(this);
  }
  attr(name, v) { if (name === 'value') { if (this.ctl.value !== (v ?? '')) this.value = v ?? ''; } else this.update(); }
  update() {
    this.paintLabel();
    this.copyAttrs(['placeholder', 'readonly', 'required', 'maxlength']);
    this.after();
  }
  fit() {
    const lh = parseFloat(getComputedStyle(this.ctl).lineHeight) || 22;
    this.ctl.style.height = 'auto';
    this.ctl.style.height = `${Math.max(this.num('rows', 3) * lh, this.ctl.scrollHeight)}px`;
  }
  after() {
    super.after();
    const max = this.getAttribute('maxlength');
    this.$('.count').textContent = max ? `${this.ctl.value.length}/${max}` : '';
    this.fit();
  }
}

const clamp = (v, a, b) => Math.min(Math.max(v, a), b);
const decimalsOf = s => { const t = String(s); return t.includes('.') ? t.split('.')[1].length : 0; };

/**
 * <a2-number label="수량" value="3" min="0" max="10" step="1" unit="개">
 * 입력칸에 50+25, x*2 (x 는 지금 값) 같은 계산식을 쓸 수 있다. 버튼을 누르고 있으면 계속 바뀐다.
 * 값이 바뀌면 바뀐 자리 숫자가 틀 안에서 위아래로 굴러 바뀐다.
 */
export class A2Number extends A2Element {
  static formAssociated = true;
  static delegatesFocus = true;
  static observedAttributes = ['label', 'hint', 'error', 'disabled', 'required', 'min', 'max', 'step', 'unit', 'value', 'decimals'];
  static styles = `${FIELD_CSS}
.f { padding: 0 6px; gap: 4px; }
.mid { position: relative; flex: 1; min-width: 0; height: var(--a2-h-field); }
.ctl { position: absolute; inset: 0; width: 100%; text-align: center; font-variant-numeric: tabular-nums; opacity: 0; }
.ctl:focus { opacity: 1; }
/* 초점이 없을 때 보이는 숫자. 자리마다 틀이 있어 그 안에서 굴러 바뀐다 */
.roll { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; gap: 5px; padding-top: 0.12em; font-variant-numeric: tabular-nums; pointer-events: none; }
.ctl:focus + .roll { visibility: hidden; }
.d { position: relative; display: inline-block; overflow: clip; line-height: 1.5; vertical-align: top; }
.d .out { position: absolute; left: 0; top: 0; }
.unit { color: var(--a2-text-muted); font-size: var(--a2-fs-sm); }
.unit:empty { display: none; }
.step {
  flex: none; position: relative; width: calc(var(--a2-h-field) - 14px); height: calc(var(--a2-h-field) - 14px); border-radius: 50%; display: grid; place-items: center;
  color: var(--a2-text-muted); background: var(--a2-fill);
  transition: background-color var(--fx), color var(--fx), border-radius var(--snap), transform var(--snap);
}
.step::before { content: ''; position: absolute; inset: -5px; }
.step:hover { background: var(--a2-fill-hover); color: var(--a2-text); }
.step:active { border-radius: var(--a2-r-xs); background: var(--a2-accent-soft); color: var(--a2-accent); }
.step:disabled { opacity: 0.3; pointer-events: none; }
.calc { position: absolute; right: 8px; top: 50%; translate: 0 -50%; color: var(--a2-text-muted); font-size: var(--a2-fs-sm); padding-top: 0.12em; white-space: nowrap; pointer-events: none; }
.calc:empty { display: none; }
.calc.bad { color: var(--a2-danger); }
`;
  alwaysUp = true;
  render() {
    this.root.innerHTML = fieldShell(`<button class="step dec" type="button" tabindex="-1" aria-label="줄이기">${icon('minus', 12)}</button><div class="mid"><input id="f" class="ctl" part="input" inputmode="decimal" autocomplete="off"><div class="roll" aria-hidden="true"><span class="digits"></span><span class="unit"></span></div><span class="calc"></span></div><button class="step inc" type="button" tabindex="-1" aria-label="늘리기">${icon('plus', 12)}</button>`);
    this.ctl = this.$('input'); this.f = this.$('.f'); this.digits = this.$('.digits');
    this.f.classList.add('up');
    this._v = this.clean(this.num('value', this.num('min', 0) > 0 ? this.num('min', 0) : 0));
    this.ctl.addEventListener('input', () => this.preview());
    this.ctl.addEventListener('focus', () => { this.ctl.value = String(this._v); this.ctl.select(); });
    this.ctl.addEventListener('blur', () => this.commit());
    this.ctl.addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); this.commit(); this.ctl.select(); }
      else if (e.key === 'Escape') { this.ctl.value = String(this._v); this.preview(); }
      else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') { e.preventDefault(); this.bump(e.key === 'ArrowUp' ? 1 : -1, e.shiftKey ? 10 : 1); this.ctl.value = String(this._v); this.fire('change'); }
    });
    this.$('.mid').addEventListener('pointerdown', e => { if (e.target !== this.ctl) { e.preventDefault(); this.ctl.focus(); } });
    for (const [sel, d] of [['.dec', -1], ['.inc', 1]]) {
      const b = this.$(sel);
      let t1 = 0, t2 = 0, held = false;
      const stop = () => { clearTimeout(t1); clearInterval(t2); if (held) { held = false; this.fire('change'); } };
      b.addEventListener('pointerdown', e => {
        if (e.button !== 0) return;
        e.preventDefault(); held = true; this.bump(d);
        t1 = setTimeout(() => { t2 = setInterval(() => this.bump(d), 70); }, 380);
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
  set value(v) { const nv = this.clean(v); if (nv === this._v) return; const dir = nv > this._v ? 1 : -1; this._v = nv; if (this._rendered) { this.update(); this.rollTo(dir); } }
  bump(dir, mult = 1) { const nv = this.clean(this._v + dir * this.step * mult); if (nv !== this._v) { this._v = nv; this.update(); this.rollTo(dir); this.fire('input'); } }
  /** 바뀐 자리만 굴린다. dir 1: 새 숫자가 아래에서 올라옴, -1: 위에서 내려옴 */
  rollTo(dir) {
    const next = this._v.toFixed(this.decimals), prev = this._shown ?? next;
    this._shown = next;
    const e = springEase('snap'), opt = { duration: (e.duration * 1000) / (parseFloat(getComputedStyle(this).getPropertyValue('--a2-speed')) || 1), easing: e.ease, fill: 'both' };
    const len = Math.max(next.length, prev.length), a = prev.padStart(len), b = next.padStart(len);
    this.digits.textContent = '';
    for (let i = 0; i < len; i++) {
      if (b[i] === ' ') continue;
      const d = document.createElement('span');
      d.className = 'd';
      d.innerHTML = `<span class="in">${esc(b[i])}</span>`;
      this.digits.append(d);
      if (a[i] === b[i] || !dir || document.hidden) continue;
      const inn = d.firstChild, out = document.createElement('span');
      out.className = 'out'; out.textContent = a[i] === ' ' ? '' : a[i];
      d.append(out);
      try {
        inn.animate([{ transform: `translateY(${dir * 100}%)` }, { transform: 'none' }], opt);
        out.animate([{ transform: 'none' }, { transform: `translateY(${-dir * 100}%)` }], opt).onfinish = () => out.remove();
      } catch (_) { out.remove(); }
    }
  }
  preview() {
    const r = evaluate(this.ctl.value, { x: this._v }), c = this.$('.calc');
    const plain = /^\s*-?\d*\.?\d+\s*$/.test(this.ctl.value);
    c.classList.toggle('bad', !r.ok && this.ctl.value.trim() !== '');
    c.textContent = !r.ok ? (this.ctl.value.trim() ? '?' : '') : plain ? '' : `= ${this.clean(r.value)}`;
  }
  commit() {
    const r = evaluate(this.ctl.value, { x: this._v });
    this.$('.calc').textContent = '';
    if (r.ok) { const nv = this.clean(r.value); if (nv !== this._v) { const dir = nv > this._v ? 1 : -1; this._v = nv; this.update(); this.rollTo(dir); this.fire('input'); this.fire('change'); return; } }
    this.update();
  }
  attr(name, v) { if (name === 'value') this.value = v; else this.update(); }
  update() {
    const lab = this.str('label');
    this.$('.fl').innerHTML = lab ? `${esc(lab)}${this.bool('required') ? '<span class="req">*</span>' : ''}` : '';
    this.$('legend span').textContent = lab;
    this.$('legend').classList.toggle('none', !lab);
    const hint = this.$('.hint'), err = this.getAttribute('error');
    hint.textContent = err || this.str('hint'); hint.classList.toggle('error', !!err);
    this.$('.unit').textContent = this.str('unit');
    if (this.root.activeElement !== this.ctl) this.ctl.value = this._v.toFixed(this.decimals);
    if (this._shown == null) this.rollTo(0);
    this.$('.dec').disabled = this._v <= this.min || this.disabled;
    this.$('.inc').disabled = this._v >= this.max || this.disabled;
    this.ctl.disabled = this.disabled;
    if (lab) this.ctl.setAttribute('aria-label', lab);
    this.internals.setFormValue(String(this._v));
  }
  formResetCallback() { this._v = this.clean(this.num('value', 0)); this._shown = null; this.update(); }
}

define('a2-input', A2Input);
define('a2-textarea', A2Textarea);
define('a2-number', A2Number);
