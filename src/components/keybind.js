import { Component } from './base.js';
import { h } from '../core/dom.js';
import { keys, keyNames, parseCombo, comboToString } from '../core/keys.js';

const MOD_OF = { ControlLeft: 'Ctrl', ControlRight: 'Ctrl', AltLeft: 'Alt', AltRight: 'Alt', ShiftLeft: 'Shift', ShiftRight: 'Shift', MetaLeft: 'Meta', MetaRight: 'Meta' };

/**
 * 단축키 입력: 누르면 다음에 누른 키 조합을 기록한다. Esc 는 취소, Backspace 는 지우기.
 * onPress 를 주면 그 단축키로 바로 동작한다(바꾸면 따라 바뀜).
 */
export class KeyBind extends Component {
  constructor(o = {}) {
    super('keybind', o);
    const el = this.el;
    this._value = o.value ? comboToString(parseCombo(o.value)) : '';
    const text = h('div', 'a2-row-text', el);
    this.header(text, o.label);
    if (o.description) h('div', 'a2-desc', text, o.description);
    this.box = h('button', 'a2-keys', el);
    this.box.type = 'button';
    this.box.addEventListener('click', () => { if (!this.disabled) (this.recording ? this.stop() : this.record()); });
    if (o.onPress) {
      this.binding = keys.bind(this._value, o.onPress, { hold: o.hold, onHold: o.onHold });
      this.on('change', v => this.binding.rebind(v));
    }
    this.render(true);
  }
  normalize(v) { return v ? comboToString(parseCombo(v)) : ''; }
  record() {
    this.recording = true;
    this.el.classList.add('a2-recording');
    this.live('누를 키 조합');
    const mods = new Set();
    this._kd = e => {
      e.preventDefault(); e.stopPropagation();
      if (e.code === 'Escape') return this.stop();
      if ((e.code === 'Backspace' || e.code === 'Delete') && !mods.size) { this.set(''); this.emit('commit', ''); return this.stop(); }
      const m = MOD_OF[e.code];
      if (m) { mods.add(m); this.live([...mods].join('+') + '+…'); return; }
      this.set(comboToString({ mods: [...mods], key: e.code }));
      this.emit('commit', this._value);
      this.stop();
    };
    this._ku = e => { const m = MOD_OF[e.code]; if (m) { mods.delete(m); this.live(mods.size ? [...mods].join('+') + '+…' : '누를 키 조합'); } };
    this._out = e => { if (!this.el.contains(e.target)) this.stop(); };
    addEventListener('keydown', this._kd, true);
    addEventListener('keyup', this._ku, true);
    setTimeout(() => document.addEventListener('pointerdown', this._out, true), 0);
  }
  stop() {
    if (!this.recording) return;
    this.recording = false;
    this.el.classList.remove('a2-recording');
    removeEventListener('keydown', this._kd, true);
    removeEventListener('keyup', this._ku, true);
    document.removeEventListener('pointerdown', this._out, true);
    this.render(true);
  }
  live(t) { this.box.textContent = ''; h('span', 'a2-keys-live', this.box, t); }
  render() {
    if (this.recording) return;
    this.box.textContent = '';
    const names = keyNames(this._value);
    if (!names.length) h('span', 'a2-keys-empty', this.box, '없음');
    for (const n of names) h('kbd', 'a2-kbd', this.box, n);
    this.paintReset();
  }
  destroy() { this.stop(); this.binding && this.binding.unbind(); super.destroy(); }
}
