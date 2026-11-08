// DOM 도움 함수
import { settings } from './settings.js';

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
  if (p.host instanceof Element) return p.host;         // 빌더
  if (p.body instanceof Element) return p.body;         // 패널·섹션
  if (p.el instanceof Element) return p.el;             // 컴포넌트
  return p;
}

/** 요소에 적용된 UI 배율 */
export function scaleOf(el) {
  const v = parseFloat(getComputedStyle(el || document.documentElement).getPropertyValue('--a2-scale'));
  return Number.isFinite(v) && v > 0 ? v : settings.scale;
}
/** 디자인 단위 → 실제 px */
export const px = (el, n) => n * scaleOf(el);

/** 테마 변수 값 */
export const themeVar = (el, name) => getComputedStyle(el || document.documentElement).getPropertyValue(`--a2-${name}`).trim();

// 아이콘: 직접 그린 SVG (currentColor)
const P = d => `<svg viewBox="0 0 24 24" aria-hidden="true">${d}</svg>`;
const L = (d, w = 2.4) => P(`<path d="${d}" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`);
const SVG = {
  chevron: L('M6.5 9.5l5.5 5.5 5.5-5.5'),
  check: L('M5.5 12.5l4.2 4.2L18.5 7.8', 2.8),
  x: L('M7 7l10 10M17 7L7 17'),
  reset: L('M5 12a7 7 0 1 0 2.2-5.1M5 4.5v3.4h3.4', 2.2),
  minus: L('M6 12h12', 2.6),
  plus: L('M12 6v12M6 12h12', 2.6),
  info: P('<circle cx="12" cy="12" r="10" fill="currentColor"/><path d="M12 11v6M12 7.6v.1" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>'),
  ok: P('<circle cx="12" cy="12" r="10" fill="currentColor"/><path d="M7.6 12.4l3 3 5.8-6" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'),
  warn: P('<path d="M10.3 3.6a2 2 0 0 1 3.4 0l8 14A2 2 0 0 1 20 20.6H4a2 2 0 0 1-1.7-3l8-14z" fill="currentColor"/><path d="M12 9v4.6M12 16.8v.1" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>'),
  error: P('<circle cx="12" cy="12" r="10" fill="currentColor"/><path d="M8.6 8.6l6.8 6.8M15.4 8.6l-6.8 6.8" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>'),
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
