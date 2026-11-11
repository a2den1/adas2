// 테마: 'dark' | 'light' | 'ocean' | 'auto'(시스템 설정을 따라 dark/light)
import { ensureGlobal } from '../core/base.js';

const NAMES = ['dark', 'light', 'ocean'];
let mq = null, mode = null;
const apply = () => document.documentElement.setAttribute('data-a2-theme', mode === 'auto' ? (mq.matches ? 'light' : 'dark') : mode);

/** theme('light') 로 바꾸고, theme() 는 지금 설정을 돌려준다 */
export function theme(name) {
  ensureGlobal();
  if (name === undefined) return mode || document.documentElement.getAttribute('data-a2-theme') || 'dark';
  if (name !== 'auto' && !NAMES.includes(name)) throw new Error(`adas2: 알 수 없는 테마 "${name}". dark, light, ocean, auto 중 하나`);
  mode = name;
  if (name === 'auto' && !mq) { mq = matchMedia('(prefers-color-scheme: light)'); mq.addEventListener('change', () => mode === 'auto' && apply()); }
  if (name === 'auto') apply(); else document.documentElement.setAttribute('data-a2-theme', name);
  document.dispatchEvent(new CustomEvent('a2-theme', { detail: { theme: name } }));
  return name;
}
export const themes = [...NAMES];
