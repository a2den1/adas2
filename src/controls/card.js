import { ensureDefaults } from '../core/context.js';
import { h, icon, resolveParent, resolveOptions } from '../core/dom.js';
import { tween, tweenNumber } from '../core/tween.js';

export const CardOptions = {
  title: '', active: true, onActiveChanged: null, onDelete: null,
  showDelete: true, showActiveToggle: true, collapsed: false,
};

/** 카드: 머리(켜기 체크·제목·접기·삭제) + 내용. 내용은 card.content 에 넣는다 */
export class Card {
  constructor(parent, opts) {
    ensureDefaults();
    const o = this.opts = resolveOptions(CardOptions, opts);
    this.el = h('div', 'a2 a2-card', resolveParent(parent));
    this.header = h('div', 'a2-card-header', this.el);
    this.active = !!o.active;
    this.expanded = !o.collapsed;
    if (o.showActiveToggle) {
      this.check = h('button', 'a2-card-check', this.header);
      this.check.type = 'button';
      this.check.setAttribute('role', 'checkbox');
      icon('on', 'a2-knob-on', this.check); icon('off', 'a2-knob-off', this.check);
      this.check.addEventListener('click', () => this.setActive(!this.active, true));
    }
    this.titleBtn = h('button', 'a2-card-title', this.header);
    this.titleBtn.type = 'button';
    this.titleText = h('span', 'a2-card-title-text', this.titleBtn, o.title);
    this.tri = icon('triangle', 'a2-card-tri', this.titleBtn);
    this.titleBtn.setAttribute('aria-expanded', this.expanded);
    this.titleBtn.addEventListener('click', () => this.setExpanded(!this.expanded));
    if (o.showDelete && o.onDelete) {
      this.del = h('button', 'a2-card-delete', this.header);
      this.del.type = 'button';
      this.del.setAttribute('aria-label', '삭제');
      h('div', 'a2-hover-outline', this.del);
      icon('x', '', this.del);
      this.del.addEventListener('click', () => o.onDelete(this));
    }
    this.body = h('div', 'a2-card-body', this.el);
    this.content = h('div', 'a2-card-content', this.body);
    this._rot = this.expanded ? 180 : 0;
    this.tri.style.transform = `rotate(${this._rot}deg)`;
    this.tri.classList.toggle('a2-on', this.expanded);
    if (!this.expanded) { this.body.style.height = '0px'; this.body.hidden = true; }
    this.paintActive(true);
  }
  set title(t) { this.titleText.textContent = t; }
  /** 켜기/끄기: 꺼지면 내용이 흐려지고 누를 수 없다 */
  setActive(on, notify = true) {
    this.active = !!on;
    this.paintActive(false);
    if (notify && this.opts.onActiveChanged) this.opts.onActiveChanged(this.active, this);
  }
  paintActive(noAnimate) {
    if (!this.check) { this.body.classList.toggle('a2-inactive', !this.active); this.body.inert = !this.active; return; }
    this.check.classList.toggle('a2-on', this.active);
    this.check.setAttribute('aria-checked', this.active);
    this.body.classList.toggle('a2-inactive', !this.active);
    this.body.inert = !this.active;
    if (noAnimate) return;
    this._pop && this._pop.kill();
    this._pop = tweenNumber(30, 26, 0.3, 'OutQuad', v => this.check.style.setProperty('--a2-knob', v), () => this.check.style.removeProperty('--a2-knob'));
  }
  /** 접기/펼치기 (0.18초 OutCubic) */
  setExpanded(open) {
    if (open === this.expanded) return;
    this.expanded = open;
    this.titleBtn.setAttribute('aria-expanded', open);
    const b = this.body;
    this._ht && this._ht.kill();
    b.hidden = false;
    const from = b.getBoundingClientRect().height;
    b.style.height = 'auto';
    const full = b.getBoundingClientRect().height;
    b.style.height = `${from}px`;
    this._ht = tweenNumber(from, open ? full : 0, 0.18, 'OutCubic', v => { b.style.height = `${v}px`; }, () => {
      if (this.expanded) b.style.height = ''; else b.hidden = true;
    });
    this._rt && this._rt.kill();
    this._rt = tween({ r: this._rot }, { r: open ? 180 : 0 }, 0.4, 'OutBack', v => { this._rot = v.r; this.tri.style.transform = `rotate(${v.r}deg)`; });
    this.tri.classList.toggle('a2-on', open);
  }
  dispose() { this.el.remove(); }
}

/** 부드럽게 굴러가는 스크롤 영역. 내용은 scroll.content 에 넣는다 */
export class ScrollView {
  constructor(parent, { spacing = 12, padding = 0, expand = false } = {}) {
    ensureDefaults();
    this.el = h('div', 'a2 a2-scroll', resolveParent(parent));
    if (expand) this.el.classList.add('a2-expand');
    this.viewport = h('div', 'a2-scroll-viewport', this.el);
    this.content = h('div', 'a2-scroll-content', this.viewport);
    this.viewport.style.setProperty('--a2-pad', padding);
    this.content.style.setProperty('--a2-gap', spacing);
    let target = 0, anim = 0;
    const step = () => {
      const vp = this.viewport, cur = vp.scrollTop, d = target - cur;
      if (Math.abs(d) < 0.5) { vp.scrollTop = target; anim = 0; return; }
      vp.scrollTop = cur + d * 0.22;
      anim = requestAnimationFrame(step);
    };
    this.viewport.addEventListener('wheel', e => {
      if (e.ctrlKey) return;
      const vp = this.viewport, max = vp.scrollHeight - vp.clientHeight;
      if (max <= 0) return;
      if (!anim) target = vp.scrollTop;
      const next = Math.min(max, Math.max(0, target + e.deltaY * (e.deltaMode === 1 ? 32 : 1)));
      if (next === target && (next === 0 || next === max)) return;
      e.preventDefault();
      target = next;
      if (!anim) anim = requestAnimationFrame(step);
    }, { passive: false });
    // 오른쪽 버튼으로 끌어서 스크롤
    let drag = null;
    this.viewport.addEventListener('pointerdown', e => { if (e.button === 2) { drag = { y: e.clientY, top: this.viewport.scrollTop }; try { this.viewport.setPointerCapture(e.pointerId); } catch (_) {} } });
    this.viewport.addEventListener('pointermove', e => { if (drag) { this.viewport.scrollTop = drag.top - (e.clientY - drag.y); target = this.viewport.scrollTop; drag.moved = true; } });
    this.viewport.addEventListener('pointerup', () => { drag = null; });
    this.viewport.addEventListener('contextmenu', e => { if (drag && drag.moved) e.preventDefault(); });
  }
}
