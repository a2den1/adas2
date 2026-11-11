// 테마: 'dark' | 'light' | 'ocean' | 'auto'(시스템 설정을 따라 dark/light) + defineTheme 으로 만든 것
import { ensureGlobal } from '../core/base.js';
import globalCss from '../styles/global.css';

const NAMES = ['dark', 'light', 'ocean'];
let mq = null, mode = null;
const apply = () => document.documentElement.setAttribute('data-a2-theme', mode === 'auto' ? (mq.matches ? 'light' : 'dark') : mode);

/** theme('light') 로 바꾸고, theme() 는 지금 설정을 돌려준다 */
export function theme(name) {
  ensureGlobal();
  if (name === undefined) return mode || document.documentElement.getAttribute('data-a2-theme') || 'dark';
  if (name !== 'auto' && !NAMES.includes(name)) throw new Error(`adas2: 알 수 없는 테마 "${name}". ${NAMES.join(', ')}, auto 중 하나`);
  mode = name;
  if (name === 'auto' && !mq) { mq = matchMedia('(prefers-color-scheme: light)'); mq.addEventListener('change', () => mode === 'auto' && apply()); }
  if (name === 'auto') apply(); else document.documentElement.setAttribute('data-a2-theme', name);
  document.dispatchEvent(new CustomEvent('a2-theme', { detail: { theme: name } }));
  return name;
}
export const themes = NAMES;

const blockOf = name => { const m = globalCss.match(new RegExp(`\\[data-a2-theme="${name}"\\] \\{([^}]*)\\}`)); return m ? m[1] : ''; };
const lum = hex => {
  const n = parseInt(hex.replace('#', '').replace(/^(.)(.)(.)$/, '$1$1$2$2$3$3').slice(0, 6), 16);
  const f = v => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * f(n >> 16) + 0.7152 * f((n >> 8) & 255) + 0.0722 * f(n & 255);
};

/**
 * 강조색 하나로 새 테마를 만든다. 나머지 색(누름, 연한 바탕, 그 위 글자)은 강조색에서 계산한다.
 * defineTheme('mint', { base: 'dark', accent: '#3FD0A5', tokens: { '--a2-r-md': '10px' } }); theme('mint');
 */
export function defineTheme(name, { base = 'dark', accent, tokens = {} } = {}) {
  ensureGlobal();
  if (!/^[a-z][\w-]*$/i.test(name) || name === 'auto') throw new Error(`adas2: 테마 이름 "${name}" 은 쓸 수 없습니다`);
  const dark = base !== 'light';
  let css = blockOf(base === 'ocean' ? 'ocean' : dark ? 'dark' : 'light');
  if (accent) {
    const on = lum(accent) > 0.36 ? '#111111' : '#FFFFFF';
    css += `
  --a2-accent: ${accent};
  --a2-accent-hover: color-mix(in oklab, ${accent} 86%, white);
  --a2-accent-pressed: color-mix(in oklab, ${accent} 86%, black);
  --a2-accent-soft: color-mix(in srgb, ${accent} 16%, transparent);
  --a2-on-accent: ${on};
  --a2-accent-container: color-mix(in oklab, ${accent} ${dark ? '36%, black' : '24%, white'});
  --a2-on-accent-container: color-mix(in oklab, ${accent} ${dark ? '22%, white' : '40%, black'});
  --a2-tonal: color-mix(in oklab, ${accent} 14%, var(--a2-surface-highest));
  --a2-on-tonal: color-mix(in oklab, ${accent} 12%, var(--a2-text));
  --a2-tip-accent: color-mix(in oklab, ${accent} ${dark ? '70%, black' : '70%, white'});`;
  }
  for (const k in tokens) css += `\n  ${k.startsWith('--') ? k : `--a2-${k}`}: ${tokens[k]};`;
  let st = document.querySelector(`style[data-adas2-theme="${name}"]`);
  if (!st) { st = document.createElement('style'); st.dataset.adas2Theme = name; document.head.append(st); }
  st.textContent = `[data-a2-theme="${name}"] {${css}\n}`;
  if (!NAMES.includes(name)) NAMES.push(name);
  return name;
}
