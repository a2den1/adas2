// 키 조합: 'Ctrl+Shift+KeyS' 처럼 쓴다. 키 이름은 KeyboardEvent.code.
const MODS = ['Ctrl', 'Alt', 'Shift', 'Meta'];
export const MOD_OF = { ControlLeft: 'Ctrl', ControlRight: 'Ctrl', AltLeft: 'Alt', AltRight: 'Alt', ShiftLeft: 'Shift', ShiftRight: 'Shift', MetaLeft: 'Meta', MetaRight: 'Meta' };

export function parseCombo(s) {
  const parts = String(s || '').split('+').map(x => x.trim()).filter(Boolean);
  return { mods: MODS.filter(m => parts.includes(m) || (m === 'Ctrl' && parts.includes('Control'))), key: parts.filter(p => !MODS.includes(p) && p !== 'Control').pop() || '' };
}
export const comboString = ({ mods, key }) => [...MODS.filter(m => mods.includes(m)), key].filter(Boolean).join('+');

const NAMES = { Backquote: '`', Minus: '-', Equal: '=', BracketLeft: '[', BracketRight: ']', Backslash: '\\', Semicolon: ';', Quote: "'", Comma: ',', Period: '.', Slash: '/', Space: 'Space', Enter: 'Enter', Escape: 'Esc', Backspace: '⌫', Tab: 'Tab', ArrowUp: '↑', ArrowDown: '↓', ArrowLeft: '←', ArrowRight: '→', Delete: 'Del' };
/** 화면용 이름: 'Ctrl+KeyS' → ['Ctrl', 'S'] */
export function keyNames(s) {
  const { mods, key } = parseCombo(s);
  const n = k => NAMES[k] || k.replace(/^Key/, '').replace(/^Digit/, '').replace(/^Numpad/, 'Num ');
  return [...mods, ...(key ? [n(key)] : [])];
}
/** 이 키 이벤트가 조합과 맞는가 */
export function matches(e, combo) {
  const c = typeof combo === 'string' ? parseCombo(combo) : combo;
  if (!c.key || e.code !== c.key) return false;
  const want = m => c.mods.includes(m);
  return e.ctrlKey === want('Ctrl') && e.altKey === want('Alt') && e.shiftKey === want('Shift') && e.metaKey === want('Meta');
}
