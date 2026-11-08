// 전역 설정: 테마·배율·애니메이션 속도·툴팁
import { Theme, themes } from './theme.js';

export const settings = {
  theme: themes.dark,
  /** 모든 치수에 곱하는 배율 (디자인 단위 × scale = px). 기본 0.6 */
  scale: 0.6,
  /** 애니메이션 속도. 2 = 두 배 빠르게, 0 = 끔 */
  animation: 1,
  tooltips: true,
  root: null,
  ready: false,
};

const listeners = new Set();
export const onSettings = fn => { listeners.add(fn); return () => listeners.delete(fn); };

function apply() {
  const root = settings.root || document.documentElement;
  settings.theme.apply(root);
  root.style.setProperty('--a2-scale', String(settings.scale));
  root.style.setProperty('--a2-speed', String(settings.animation > 0 ? settings.animation : 10000));
  root.classList.add('a2-root');
  for (const fn of listeners) fn(settings);
}

const pickTheme = t => (t instanceof Theme ? t : themes[t] || settings.theme);

/**
 * 한 번 설정한다. 부르지 않아도 기본값으로 동작한다.
 * @param {{theme?: string|Theme, scale?: number, animation?: number, tooltips?: boolean, root?: HTMLElement}} o
 */
export function setup(o = {}) {
  if (o.theme) settings.theme = pickTheme(o.theme);
  for (const k of ['scale', 'animation', 'tooltips']) if (o[k] !== undefined) settings[k] = o[k];
  if (o.root) settings.root = o.root;
  settings.ready = true;
  apply();
}
export function ensureSetup() { if (!settings.ready) setup(); }
/** 테마 바꾸기: 'dark' | 'light' | 'ocean' | Theme */
export function setTheme(t) { settings.theme = pickTheme(t); ensureSetup(); apply(); }
