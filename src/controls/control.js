// 모든 값 컨트롤의 공통 부분: 값·기본값·바뀜 점·가운데 클릭으로 기본값·막기
import { ctx, ensureDefaults, onContextChange } from '../core/context.js';
import { h, resolveParent } from '../core/dom.js';
import { tooltip } from '../core/tooltip.js';

const registry = new Map();
/** id 로 만든 컨트롤을 찾는다 */
export const getControl = id => registry.get(id);

export class Control {
  constructor(parent, id, opts, kind) {
    ensureDefaults();
    this.id = id || null;
    this.opts = opts;
    this.kind = kind;
    this.el = h('div', `a2 a2-ctl a2-${kind}`);
    if (id) { this.el.dataset.a2Id = id; registry.set(id, this); }
    this.blocked = false;
    const host = resolveParent(parent);
    if (host) host.appendChild(this.el);
    if (opts && opts.tooltip) tooltip(this.el, opts.tooltip);
    // 테마·설정이 바뀌면 칠해 둔 색을 새 테마로 다시 칠한다
    this._unsub = onContextChange(() => { if (!this.disposed) requestAnimationFrame(() => this.updateVisual(true)); });
  }

  /** 테마의 줄 높이 */
  get rowHeight() { return this.opts.height ?? ctx.theme.controlHeightFor(ctx.theme.fontSizeBody); }

  /** 바깥 테두리(마우스를 올리면 보임) */
  addHoverOutline(target = this.el) {
    this.outline = h('div', 'a2-hover-outline', null);
    target.prepend(this.outline);
    return this.outline;
  }

  /** 왼쪽 위 작은 점: 기본값과 다를 때 보인다 */
  addChangedDot(target = this.el, cls = '') {
    const dot = h('span', `a2-dot ${cls}`, target);
    (this.dots ||= []).push(dot);
    return dot;
  }
  paintChangedDot(noAnimate) {
    if (!this.dots) return;
    const has = this.opts.defaultValue !== undefined && this.opts.defaultValue !== null;
    const on = has && !this.equals(this.value, this.opts.defaultValue);
    for (const d of this.dots) {
      d.classList.toggle('a2-no-anim', !!noAnimate);
      d.classList.toggle('a2-on', on);
    }
  }

  /** 가운데 버튼 클릭 → 기본값 */
  enableMiddleReset(target = this.el, checkDiff = true) {
    target.addEventListener('mousedown', e => { if (e.button === 1) e.preventDefault(); });
    target.addEventListener('auxclick', e => {
      if (e.button !== 1 || this.blocked || !ctx.config.middleClickToDefault) return;
      const d = this.opts.defaultValue;
      if (d === undefined || d === null) return;
      if (checkDiff && this.equals(this.value, d)) return;
      e.preventDefault();
      this.reset(true);
      this.afterReset && this.afterReset();
    });
  }

  equals(a, b) { return a === b; }

  /** 값을 바꾼다. notify 가 false 면 onChanged 를 부르지 않는다. */
  set(v, notify = true) {
    if (this.equals(v, this.value)) return;
    this.value = v;
    this.updateVisual(false);
    if (notify && this.opts.onChanged) this.opts.onChanged(v, this);
  }
  /** 기본값으로 */
  reset(notify = true) {
    const d = this.opts.defaultValue;
    if (d !== undefined && d !== null) this.set(d, notify);
  }
  setDefaultValue(v, noAnimate) { this.opts.defaultValue = v; this.paintChangedDot(noAnimate); }
  updateVisual() {}

  /** 막으면 흐려지고 누를 수 없다 */
  setBlocked(blocked) {
    this.blocked = !!blocked;
    this.el.classList.toggle('a2-blocked', this.blocked);
    this.el.inert = this.blocked;
  }

  dispose() {
    if (this.id && registry.get(this.id) === this) registry.delete(this.id);
    this.disposed = true;
    this._unsub && this._unsub();
    this.el.remove();
  }
}
