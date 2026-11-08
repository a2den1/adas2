// 단축키. 'Alt+Backquote', 'Ctrl+KeyS' 처럼 쓴다. 키 이름은 KeyboardEvent.code.
// Alt·Ctrl·Shift·Meta 는 왼쪽·오른쪽 아무거나로 본다.
const MODS = ['Ctrl', 'Alt', 'Shift', 'Meta'];
const MOD_CODES = { Ctrl: ['ControlLeft', 'ControlRight'], Alt: ['AltLeft', 'AltRight'], Shift: ['ShiftLeft', 'ShiftRight'], Meta: ['MetaLeft', 'MetaRight'] };
const down = new Set();
const isDown = k => (MOD_CODES[k] ? MOD_CODES[k].some(c => down.has(c)) : down.has(k));
const modOf = code => MODS.find(m => MOD_CODES[m].includes(code));

/** 'Alt+Backquote' → { mods: ['Alt'], key: 'Backquote' } */
export function parseCombo(s) {
  const parts = String(s || '').split('+').map(x => x.trim()).filter(Boolean);
  const mods = MODS.filter(m => parts.includes(m) || (m === 'Ctrl' && parts.includes('Control')));
  const key = parts.filter(p => !MODS.includes(p) && p !== 'Control').pop() || '';
  return { mods, key };
}
export const comboToString = ({ mods, key }) => [...MODS.filter(m => mods.includes(m)), key].filter(Boolean).join('+');

const NAMES = { Backquote: '`', Minus: '-', Equal: '=', BracketLeft: '[', BracketRight: ']', Backslash: '\\', Semicolon: ';', Quote: "'", Comma: ',', Period: '.', Slash: '/', Space: 'Space', Enter: 'Enter', Escape: 'Esc', Backspace: '⌫', Tab: 'Tab', ArrowUp: '↑', ArrowDown: '↓', ArrowLeft: '←', ArrowRight: '→', Delete: 'Del' };
/** 화면에 보여 줄 이름: 'Alt+Backquote' → ['Alt', '`'] */
export function keyNames(s) {
  const { mods, key } = parseCombo(s);
  const nm = k => NAMES[k] || k.replace(/^Key/, '').replace(/^Digit/, '').replace(/^Numpad/, 'Num ');
  return [...mods, ...(key ? [nm(key)] : [])];
}

const binds = new Set();
export const keys = {
  /** 글자 입력 중에는 쉰다. 바꿔 끼울 수 있다 */
  paused: () => { const a = document.activeElement; return !!a && (a.tagName === 'INPUT' || a.tagName === 'TEXTAREA' || a.isContentEditable); },
  /**
   * @param {string} combo 'Alt+Backquote'
   * @param {(e: KeyboardEvent) => void} fn 눌렀을 때
   * @param {{ hold?: number, onHold?: Function, onRelease?: Function }} [o] hold 초만큼 누르고 있으면 onHold
   * @returns {{ combo: string, rebind(c: string): void, unbind(): void }}
   */
  bind(combo, fn, o = {}) {
    const b = { c: parseCombo(combo), fn, o, pressed: false, held: false, timer: 0 };
    binds.add(b);
    return {
      get combo() { return comboToString(b.c); },
      rebind(c) { b.c = parseCombo(c); },
      unbind() { clearTimeout(b.timer); binds.delete(b); },
    };
  },
  parse: parseCombo, names: keyNames,
};
const held = c => c.key && isDown(c.key) && c.mods.every(isDown) && MODS.filter(m => !c.mods.includes(m)).every(m => !isDown(m));
const reset = b => { b.pressed = false; b.held = false; clearTimeout(b.timer); };

addEventListener('keydown', e => {
  const first = !down.has(e.code);
  down.add(e.code);
  if (!first || modOf(e.code)) return;
  if (keys.paused()) { binds.forEach(reset); return; }
  for (const b of binds) {
    if (b.pressed || b.c.key !== e.code || !held(b.c)) continue;
    b.pressed = true; e.preventDefault();
    b.fn && b.fn(e);
    if (b.o.hold > 0) b.timer = setTimeout(() => { if (b.pressed && held(b.c)) { b.held = true; b.o.onHold && b.o.onHold(); } }, b.o.hold * 1000);
  }
}, true);
addEventListener('keyup', e => {
  down.delete(e.code);
  for (const b of binds) if (b.pressed && (b.c.key === e.code || !held(b.c))) { if (b.c.key === e.code && b.o.onRelease) b.o.onRelease(); reset(b); }
}, true);
addEventListener('blur', () => { down.clear(); binds.forEach(reset); });
