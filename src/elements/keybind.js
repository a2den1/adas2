import { A2Element, define, icon, esc } from '../core/base.js';
import { MOD_OF, parseCombo, comboString, keyNames } from '../core/keys.js';

/**
 * <a2-keybind label="저장" value="Ctrl+KeyS">
 * 누르면 기록을 시작하고, 다음에 누른 키 조합이 값이 된다. Esc 는 취소, Backspace 는 비우기.
 */
export class A2Keybind extends A2Element {
  static formAssociated = true;
  static delegatesFocus = true;
  static observedAttributes = ['label', 'hint', 'value', 'disabled', 'placeholder'];
  static styles = `
:host { display: block; }
.box { display: flex; align-items: center; gap: 8px; width: 100%; height: var(--a2-h); padding: 0 6px 0 8px; border-radius: var(--a2-radius); background: var(--a2-fill); border: 1px solid var(--a2-line); touch-action: manipulation; transition: background-color var(--t1), border-color var(--t1); text-align: left; }
.box:hover { background: var(--a2-fill-hover); border-color: var(--a2-line-strong); }
.box.rec { background: var(--a2-accent-soft); border-color: var(--a2-accent); }
.keys { flex: 1; min-width: 0; display: flex; align-items: center; gap: 4px; overflow: hidden; }
kbd {
  display: inline-grid; place-items: center; min-width: 26px; height: 26px; padding: 0.12em 7px 0; border-radius: 6px;
  background: var(--a2-raised); border: 1px solid var(--a2-line); box-shadow: 0 1px 0 rgba(0, 0, 0, 0.28); font: inherit; font-size: var(--a2-fs-sm); font-weight: var(--a2-weight-strong);
}
.plus { color: var(--a2-text-faint); font-size: var(--a2-fs-sm); }
.ph { padding: 0.12em 4px 0; color: var(--a2-text-faint); }
.rec .ph { color: var(--a2-accent); }
.x { flex: none; width: 26px; height: 26px; border-radius: 6px; display: grid; place-items: center; color: var(--a2-text-muted); }
.x:hover { background: var(--a2-fill-active); color: var(--a2-text); }
`;
  render() {
    this.root.innerHTML = `${this.fieldHead('')}<button class="box" part="box" type="button"><span class="keys"></span><span class="x hit" role="button" aria-label="비우기">${icon('x', 12)}</span></button><div class="hint t" part="hint"></div>`;
    this.box = this.$('.box');
    this._v = comboString(parseCombo(this.str('value')));
    this._init = this._v;
    this.box.addEventListener('click', e => {
      if (e.target.closest('.x')) { e.stopPropagation(); this.set(''); this.stop(); return; }
      this.rec ? this.stop() : this.start();
    });
    this.box.addEventListener('keydown', e => this.key(e));
    this.box.addEventListener('keyup', e => {
      if (!this.rec) return;
      const mods = ['Ctrl', 'Alt', 'Shift', 'Meta'].filter(m => ({ Ctrl: e.ctrlKey, Alt: e.altKey, Shift: e.shiftKey, Meta: e.metaKey })[m]);
      this.paint(mods);
    });
    this.box.addEventListener('blur', () => this.stop());
  }
  get value() { return this._v; }
  set value(v) { this._v = comboString(parseCombo(v)); if (this._rendered) this.update(); }
  get recording() { return !!this.rec; }
  start() { if (this.disabled) return; this.rec = true; this.box.classList.add('rec'); this.paint([]); }
  stop() { if (!this.rec) return; this.rec = false; this.box.classList.remove('rec'); this.update(); }
  key(e) {
    if (!this.rec) {
      if (e.key === 'Backspace' || e.key === 'Delete') { e.preventDefault(); this.set(''); }
      return;
    }
    e.preventDefault(); e.stopPropagation();
    const mods = ['Ctrl', 'Alt', 'Shift', 'Meta'].filter(m => ({ Ctrl: e.ctrlKey, Alt: e.altKey, Shift: e.shiftKey, Meta: e.metaKey })[m]);
    if (MOD_OF[e.code]) { this.paint(mods); return; }
    if (!mods.length && e.code === 'Escape') { this.stop(); return; }
    if (!mods.length && (e.code === 'Backspace' || e.code === 'Delete')) { this.set(''); this.stop(); return; }
    this.set(comboString({ mods, key: e.code }));
    this.stop();
  }
  set(v) {
    if (v === this._v) return;
    this._v = v;
    this.update();
    this.fire('input'); this.fire('change');
  }
  /** mods 가 있으면 기록 중 미리보기 */
  paint(mods) {
    const k = this.$('.keys');
    const names = mods ? mods : keyNames(this._v);
    const ph = this.rec && !(mods && mods.length) ? '키를 누르세요' : this.str('placeholder', '없음');
    k.innerHTML = names.length ? names.map(n => `<kbd>${esc(n)}</kbd>`).join('<span class="plus">+</span>') + (this.rec ? '<span class="plus">+</span>' : '') : `<span class="ph">${esc(ph)}</span>`;
    this.$('.x').style.visibility = this._v && !this.rec ? 'visible' : 'hidden';
  }
  attr(name, v) { if (name === 'value') this.value = v; else this.update(); }
  update() {
    this.paintField();
    this.box.disabled = this.disabled;
    this.box.setAttribute('aria-label', `${this.str('label', '단축키')}: ${keyNames(this._v).join('+') || '없음'}`);
    if (!this.rec) this.paint(null);
    this.internals.setFormValue(this._v || null);
  }
  formResetCallback() { this._v = this._init; this.update(); }
}
define('a2-keybind', A2Keybind);
