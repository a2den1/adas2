// 전역 상태: 지금 테마·설정·적용 대상 루트.
import { Config } from './config.js';
import { Theme } from './theme.js';

export const ctx = {
  config: Config.default,
  theme: Theme.Dark,
  root: null,
  ready: false,
};

const listeners = new Set();
/** 테마나 설정이 바뀔 때 부를 함수 */
export const onContextChange = fn => { listeners.add(fn); return () => listeners.delete(fn); };
const notify = () => { for (const fn of listeners) fn(ctx); };

function applyRoot() {
  const root = ctx.root || document.documentElement;
  ctx.theme.applyTo(root);
  root.style.setProperty('--a2-scale', String(ctx.config.uiScale));
  const sp = ctx.config.animationSpeed;
  root.style.setProperty('--a2-speed', String(sp > 0 ? sp : 10000));
  root.classList.add('a2-root');
}

/**
 * 한 번 설정한다. 빠진 값은 기본값을 쓴다.
 * @param {{config?: Config|object, theme?: Theme, root?: HTMLElement}} opts
 */
export function configure({ config, theme, root } = {}) {
  if (config) ctx.config = config instanceof Config ? config : new Config(config);
  if (theme) ctx.theme = theme;
  if (root) ctx.root = root;
  ctx.ready = true;
  applyRoot();
  notify();
}

/** 아무 설정 없이 기본값으로 바로 쓸 수 있게 한다. 이미 설정했으면 아무것도 하지 않는다. */
export function ensureDefaults() { if (!ctx.ready) configure({}); }

/** 테마를 바꾼다. CSS 변수라 이미 만든 컨트롤에도 바로 적용된다. */
export function setTheme(theme) { ctx.theme = theme; ensureDefaults(); applyRoot(); notify(); }

/** 설정 일부를 바꾼다. */
export function setConfig(over) { ctx.config = ctx.config.with(over); ensureDefaults(); applyRoot(); notify(); }
