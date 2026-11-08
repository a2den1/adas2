// DOM 도움 함수
import { ctx } from './context.js';

/** 요소를 만든다. h('div', 'a2-row', parent, '글자') */
export function h(tag, cls, parent, text) {
  const el = document.createElement(tag);
  if (cls) el.className = cls;
  if (text != null) el.textContent = text;
  if (parent) parent.appendChild(el);
  return el;
}

/** 부모로 요소, 선택자 문자열, 컨트롤(.el) 을 모두 받는다. */
export function resolveParent(p) {
  if (!p) return null;
  if (typeof p === 'string') return document.querySelector(p);
  if (p.content instanceof Element) return p.content;   // 창·카드
  if (p.el instanceof Element) return p.el;             // 컨트롤
  return p;
}

/** 요소에 적용된 UI 배율 */
export function scaleOf(el) {
  const v = parseFloat(getComputedStyle(el || document.documentElement).getPropertyValue('--a2-scale'));
  return Number.isFinite(v) && v > 0 ? v : ctx.config.uiScale;
}
/** 디자인 단위 → 실제 px */
export const px = (el, n) => n * scaleOf(el);

/** 테마 변수 값 */
export const themeVar = (el, name) => getComputedStyle(el || document.documentElement).getPropertyValue(`--a2-${name}`).trim();

// 아이콘: 직접 그린 SVG (currentColor)
const SVG = {
  triangle: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.2 8.6h13.6c.9 0 1.4 1.1.8 1.8l-6.8 7.6a1.1 1.1 0 0 1-1.6 0L4.4 10.4c-.6-.7-.1-1.8.8-1.8z" fill="currentColor"/></svg>',
  x: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 6.5l11 11M17.5 6.5l-11 11" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" fill="none"/></svg>',
  on: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="currentColor"/><path d="M7.2 12.4l3.2 3.1 6.4-6.6" stroke="var(--a2-panel-bg)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>',
  off: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.6" stroke="currentColor" stroke-width="2.8" fill="none"/></svg>',
};
export function icon(name, cls, parent) {
  const el = h('span', `a2-icon ${cls || ''}`, parent);
  el.innerHTML = SVG[name] || '';
  return el;
}
/** 사용자 아이콘: 문자열이면 클래스(예: Font Awesome), 요소면 그대로 */
export function userIcon(spec, cls, parent) {
  if (!spec) return null;
  const el = h('span', `a2-uicon ${cls || ''}`, parent);
  if (typeof spec === 'string') { if (spec.trim().startsWith('<')) el.innerHTML = spec; else h('i', spec, el); }
  else el.appendChild(spec);
  return el;
}

/** 옵션 객체 또는 설정 함수(o => { o.text = ... }) 를 옵션으로 만든다 */
export function resolveOptions(defaults, opts) {
  const o = { ...defaults };
  if (typeof opts === 'function') opts(o); else if (opts) Object.assign(o, opts);
  return o;
}
