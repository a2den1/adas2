import { A2Element, define, icon, esc } from '../core/base.js';
import { MOD_OF, parseCombo, comboString, keyNames } from '../core/keys.js';
import { FIELD_CSS } from './field.js';

/**
 * <a2-keybind label="저장" value="Ctrl+KeyS">
 * 누르면 기록을 시작하고, 다음에 누른 키 조합이 값이 된다. Esc 는 취소, Backspace 는 비우기.
 * 안내 글자와 키 표시는 각자의 틀 안에서 아래에서 위로 올라온다.
 */
export class A2Keybind extends A2Element {
  static formAssociated = true;
  static delegatesFocus = true;
  static observedAttributes = ['label', 'hint', 'value', 'disabled', 'placeholder'];
  static styles = `${FIELD_CSS}
.f { cursor: pointer; padding: 0 8px 0 14px; }
.box { position: absolute; inset: 0; border-radius: var(--a2-r-sm); }
.box:focus-visible { outline: 0; }
.f.rec .ol { border-color: var(--a2-accent); border-width: 2px; padding: 0 9px; background: var(--a2-accent-soft); }
.f.rec .fl { color: var(--a2-accent); }
.keys { position: relative; flex: 1; min-width: 0; display: flex; align-items: center; gap: 5px; overflow: hidden; pointer-events: none; height: var(--a2-h-field); }
/* 틀: 이 안에서만 보이고, 내용이 아래에서 올라온다 */
.kf { display: inline-block; overflow: clip; border-radius: 8px; }
.kf.txt { border-radius: 0; }
.kf > * { display: block; }
.kf.in > * { animation: rise calc(var(--a2-d-snap) / var(--a2-speed)) var(--a2-e-snap) both; }
@keyframes rise { from { transform: translateY(105%); } }
kbd {
  display: grid; place-items: center; min-width: 30px; height: 30px; padding: 0.12em 9px 0; border-radius: 8px;
  background: var(--a2-tonal); color: var(--a2-on-tonal); font: inherit; font-size: var(--a2-fs-sm); font-weight: var(--a2-weight-strong);
}
.plus { color: var(--a2-text-faint); font-size: var(--a2-fs-sm); }
.ph { padding: 0.12em 0 0; color: var(--a2-text-faint); line-height: 30px; white-space: nowrap; }
.rec .ph { color: var(--a2-accent); }
.x { position: relative; flex: none; width: 30px; height: 30px; border-radius: 50%; display: grid; place-items: center; color: var(--a2-text-muted); transition: background-color var(--fx), color var(--fx), transform var(--snap); }
.x:hover { background: var(--a2-fill-hover); color: var(--a2-text); }
.x:active { transform: scale(0.86); }
`;
  render() {
    this.root.innerHTML = `<div class="f up" part="box"><fieldset class="ol" aria-hidden="true"><legend><span></span></legend></fieldset><label class="fl t" part="label"></label><button class="box" type="button"></button><span class="keys"></span><button class="x hit" type="button" tabindex="-1" aria-label="비우기">${icon('x', 12)}</button></div><div class="hint t" part="hint"></div>`;
    this.f = this.$('.f'); this.box = this.$('.box');
    this._v = comboString(parseCombo(this.str('value')));
    this._init = this._v;
    this._shown = [];
    this.box.addEventListener('click', () => (this.rec ? this.stop() : this.start()));
    this.$('.x').addEventListener('click', () => { this.set(''); this.stop(); this.box.focus(); });
    const mods = e => ['Ctrl', 'Alt', 'Shift', 'Meta'].filter(m => ({ Ctrl: e.ctrlKey, Alt: e.altKey, Shift: e.shiftKey, Meta: e.metaKey })[m]);
    this.box.addEventListener('keydown', e => {
      if (!this.rec) {
        if (e.key === 'Backspace' || e.key === 'Delete') { e.preventDefault(); this.set(''); }
        return;
      }
      e.preventDefault(); e.stopPropagation();
      const m = mods(e);
      if (MOD_OF[e.code]) { this.paint(m); return; }
      if (!m.length && e.code === 'Escape') { this.stop(); return; }
      if (!m.length && (e.code === 'Backspace' || e.code === 'Delete')) { this.set(''); this.stop(); return; }
      this.set(comboString({ mods: m, key: e.code }));
      this.stop();
    });
    this.box.addEventListener('keyup', e => { if (this.rec) this.paint(mods(e)); });
    this.box.addEventListener('blur', () => this.stop());
  }
  get value() { return this._v; }
  set value(v) { this._v = comboString(parseCombo(v)); if (this._rendered) this.update(); }
  get recording() { return !!this.rec; }
  start() { if (this.disabled) return; this.rec = true; this.f.classList.add('rec'); this.paint([]); }
  stop() { if (!this.rec) return; this.rec = false; this.f.classList.remove('rec'); this.update(); }
  set(v) {
    if (v === this._v) return;
    this._v = v;
    this.update();
    this.fire('input'); this.fire('change');
  }
  /** mods 가 있으면 기록 중 미리보기. 새로 생긴 조각만 올라온다 */
  paint(mods) {
    const names = mods ? mods : keyNames(this._v);
    const ph = this.rec && !(mods && mods.length) ? '키를 누르세요' : this.str('placeholder', '없음');
    const parts = names.length ? names.map(n => ['k', n]) : [['t', ph]];
    const old = this._shown, k = this.$('.keys');
    k.innerHTML = parts.map(([type, text], i) => {
      const fresh = this._painted && (!old[i] || old[i][0] !== type || old[i][1] !== text);
      const body = type === 'k' ? `<kbd>${esc(text)}</kbd>` : `<span class="ph">${esc(text)}</span>`;
      return `${i ? '<span class="plus">+</span>' : ''}<span class="kf${type === 't' ? ' txt' : ''}${fresh ? ' in' : ''}">${body}</span>`;
    }).join('');
    this._shown = parts; this._painted = true;
    this.$('.x').style.visibility = this._v && !this.rec ? 'visible' : 'hidden';
  }
  attr(name, v) { if (name === 'value') this.value = v; else this.update(); }
  update() {
    const lab = this.str('label');
    this.$('.fl').textContent = lab;
    this.$('legend span').textContent = lab;
    this.$('legend').classList.toggle('none', !lab);
    const hint = this.$('.hint'); hint.textContent = this.str('hint');
    this.box.disabled = this.disabled;
    this.box.setAttribute('aria-label', `${lab || '단축키'}: ${keyNames(this._v).join('+') || '없음'}`);
    if (!this.rec) this.paint(null);
    this.internals.setFormValue(this._v || null);
  }
  formResetCallback() { this._v = this._init; this.update(); }
}
define('a2-keybind', A2Keybind);
