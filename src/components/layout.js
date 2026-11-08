import { Component } from './base.js';
import { h, icon } from '../core/dom.js';
import { animate } from '../core/tween.js';

/**
 * 섹션: 제목(+설명) 아래로 내용을 묶는다.
 * toggle: true 면 제목 오른쪽에 스위치(끄면 내용이 흐려짐), collapsible: true 면 제목을 눌러 접기
 */
export class Section extends Component {
  constructor(o = {}) {
    super('section', o, 'section');
    const el = this.el;
    this._value = o.enabled !== false;
    this.expanded = !o.collapsed;
    const head = h('div', 'a2-section-head', el);
    this.titleBtn = h(o.collapsible ? 'button' : 'div', 'a2-section-title', head);
    if (o.collapsible) { this.titleBtn.type = 'button'; this.titleBtn.setAttribute('aria-expanded', this.expanded); }
    const tt = h('div', 'a2-section-tt', this.titleBtn);
    h('span', 'a2-section-name', tt, o.title || '');
    if (o.description) h('span', 'a2-desc', tt, o.description);
    if (o.collapsible) { this.chev = icon('chevron', 'a2-section-chev', this.titleBtn); this.titleBtn.addEventListener('click', () => this.setExpanded(!this.expanded)); }
    if (o.toggle) {
      this.sw = h('button', 'a2-section-switch', head);
      this.sw.type = 'button'; this.sw.setAttribute('role', 'switch'); this.sw.setAttribute('aria-label', `${o.title || ''} 켜기`);
      const tr = h('span', 'a2-track', this.sw); h('span', 'a2-thumb', tr);
      this.sw.addEventListener('click', () => { this.set(!this._value); this.emit('commit', this._value); });
    }
    if (o.actions) for (const a of o.actions) {
      const b = h('button', 'a2-section-action', head); b.type = 'button'; b.title = a.label || '';
      if (a.icon) { const ic = h('span', 'a2-uicon', b); if (a.icon.startsWith('<')) ic.innerHTML = a.icon; else h('i', a.icon, ic); } else b.textContent = a.label;
      if (a.danger) b.classList.add('a2-danger');
      b.addEventListener('click', () => a.onClick && a.onClick(this));
    }
    this.wrap = h('div', 'a2-section-wrap', el);
    this.body = h('div', 'a2-section-body', this.wrap);
    if (!this.expanded) { this.wrap.hidden = true; el.classList.add('a2-collapsed'); }
    this.render(true);
  }
  normalize(v) { return !!v; }
  get enabled() { return this._value; }
  render() {
    this.el.classList.toggle('a2-section-off', !this._value);
    this.body.inert = !this._value;
    if (this.sw) { this.sw.classList.toggle('a2-on', this._value); this.sw.setAttribute('aria-checked', this._value); }
  }
  setExpanded(open) {
    if (open === this.expanded) return this;
    this.expanded = open;
    this.el.classList.toggle('a2-collapsed', !open);
    if (this.titleBtn.tagName === 'BUTTON') this.titleBtn.setAttribute('aria-expanded', open);
    const w = this.wrap;
    this._t && this._t.kill();
    w.hidden = false;
    const from = w.getBoundingClientRect().height;
    w.style.height = 'auto';
    const to = open ? w.getBoundingClientRect().height : 0;
    w.style.height = `${from}px`;
    w.style.overflow = 'hidden';
    this._t = animate({ v: from }, { v: to }, { duration: 0.26, ease: 'OutCubic', onUpdate: ({ v }) => { w.style.height = `${v}px`; }, onDone: () => {
      w.style.height = ''; w.style.overflow = ''; if (!this.expanded) w.hidden = true;
    } });
    this.emit('toggle', open);
    return this;
  }
}

/** 부드럽게 굴러가는 스크롤 영역. 내용은 .body 에 */
export class ScrollArea extends Component {
  constructor(o = {}) {
    super('scroll', o);
    this.body = h('div', 'a2-scroll-body', this.el);
    if (o.height) this.el.style.height = typeof o.height === 'number' ? `${o.height}px` : o.height;
    let target = 0, raf = 0;
    const step = () => {
      const d = target - this.el.scrollTop;
      if (Math.abs(d) < 0.5) { this.el.scrollTop = target; raf = 0; return; }
      this.el.scrollTop += d * 0.2; raf = requestAnimationFrame(step);
    };
    this.el.addEventListener('wheel', e => {
      if (e.ctrlKey || e.deltaMode === 2) return;
      const max = this.el.scrollHeight - this.el.clientHeight;
      if (max <= 0) return;
      if (!raf) target = this.el.scrollTop;
      const next = Math.min(max, Math.max(0, target + e.deltaY * (e.deltaMode === 1 ? 32 : 1)));
      if (next === target) return;
      e.preventDefault(); target = next;
      if (!raf) raf = requestAnimationFrame(step);
    }, { passive: false });
  }
}
