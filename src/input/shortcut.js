// 단축키. 키 이름은 KeyboardEvent.code (예: 'Backquote', 'KeyS', 'AltLeft').
// 'Alt' 'Ctrl' 'Shift' 'Meta' 는 왼쪽·오른쪽 아무거나로 본다.
const down = new Set();
const ALIAS = { Alt: ['AltLeft', 'AltRight'], Ctrl: ['ControlLeft', 'ControlRight'], Control: ['ControlLeft', 'ControlRight'], Shift: ['ShiftLeft', 'ShiftRight'], Meta: ['MetaLeft', 'MetaRight'] };
const isDown = k => (ALIAS[k] ? ALIAS[k].some(x => down.has(x)) : down.has(k));
const matches = (k, code) => (ALIAS[k] ? ALIAS[k].includes(code) : k === code);

export class KeyCombo {
  /** new KeyCombo('Backquote', 'Alt') */
  constructor(main, ...modifiers) { this.main = main; this.modifiers = modifiers; }
  get isHeld() { return isDown(this.main) && this.modifiers.every(isDown); }
  toString() { return [...this.modifiers, this.main].join('+'); }
  /** 'Alt+Backquote' 같은 글자에서 */
  static parse(s) { const parts = s.split('+').map(x => x.trim()); return new KeyCombo(parts.pop(), ...parts); }
}

const shortcuts = new Map();

export const ShortcutManager = {
  /** 글자 입력 중엔 단축키를 쉬게 한다. 바꿔 끼울 수 있다 */
  isSuspended: () => {
    const a = document.activeElement;
    return !!a && (a.tagName === 'INPUT' || a.tagName === 'TEXTAREA' || a.isContentEditable);
  },
  /**
   * @param {string} id 같은 id 로 다시 등록하면 바꿔친다
   * @param {KeyCombo|string} combo
   * @param {number} [holdSeconds] 이만큼 누르고 있으면 onHeld
   */
  register(id, combo, holdSeconds = 0, { onPressed, onHeld, onReleased } = {}) {
    const s = { id, combo: typeof combo === 'string' ? KeyCombo.parse(combo) : combo, holdSeconds, onPressed, onHeld, onReleased, pressed: false, held: false, timer: 0 };
    shortcuts.set(id, s);
    return s;
  },
  get: id => shortcuts.get(id),
  unregister: id => { const s = shortcuts.get(id); if (s) clearTimeout(s.timer); shortcuts.delete(id); },
  clear: () => { for (const s of shortcuts.values()) clearTimeout(s.timer); shortcuts.clear(); },
};

function reset(s) { s.pressed = false; s.held = false; clearTimeout(s.timer); }

addEventListener('keydown', e => {
  const first = !down.has(e.code);
  down.add(e.code);
  if (!first) return;
  if (ShortcutManager.isSuspended()) { for (const s of shortcuts.values()) reset(s); return; }
  for (const s of shortcuts.values()) {
    const c = s.combo;
    const involved = matches(c.main, e.code) || c.modifiers.some(m => matches(m, e.code));
    if (s.pressed || !involved || !c.isHeld) continue;
    s.pressed = true; s.held = false;
    e.preventDefault();
    s.onPressed && s.onPressed(s);
    if (s.holdSeconds > 0) s.timer = setTimeout(() => { if (s.pressed && c.isHeld && !s.held) { s.held = true; s.onHeld && s.onHeld(s); } }, s.holdSeconds * 1000);
  }
}, true);

addEventListener('keyup', e => {
  down.delete(e.code);
  for (const s of shortcuts.values()) {
    if (!s.pressed) continue;
    if (matches(s.combo.main, e.code)) { s.onReleased && s.onReleased(s); reset(s); }
    else if (!s.combo.isHeld) reset(s);
  }
}, true);

addEventListener('blur', () => { down.clear(); for (const s of shortcuts.values()) reset(s); });
