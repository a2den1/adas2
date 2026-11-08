import { Component } from './base.js';
import { h, px } from '../core/dom.js';
import { tween, animate } from '../core/tween.js';

const toOpt = raw => (typeof raw === 'object' && raw !== null ? { label: String(raw.value), ...raw } : { value: raw, label: String(raw) });

/** 고른 칸 뒤의 알약이 옮겨 가는 선택 막대 (공통) */
function pillBar(owner, parent, options, cls) {
  const bar = h('div', cls, parent);
  const ind = h('div', 'a2-pill', bar);
  const btns = options.map(opt => {
    const b = h('button', 'a2-pill-btn', bar, opt.label);
    b.type = 'button';
    b.addEventListener('click', () => owner.pickValue(opt.value));
    return b;
  });
  let cur = null, tw = null;
  const move = (i, instant) => {
    const b = btns[i]; if (!b || !b.offsetWidth) return;
    const to = { x: b.offsetLeft, w: b.offsetWidth };
    tw && tw.kill();
    const put = v => { cur = v; ind.style.transform = `translateX(${v.x}px)`; ind.style.width = `${v.w}px`; };
    if (instant || !cur) put(to); else tw = tween(cur, to, 0.34, 'OutExpo', put);
  };
  new ResizeObserver(() => owner.render(true)).observe(bar);
  return { bar, btns, move };
}

/** 2~5개 중 하나 고르기 */
export class Segmented extends Component {
  constructor(o = {}) {
    super('segmented', o);
    this.options = (o.options || []).map(toOpt);
    if (o.label) this.header(this.el, o.label);
    this.p = pillBar(this, this.el, this.options, 'a2-seg-bar');
    this.p.bar.setAttribute('role', 'radiogroup');
    this._value = o.value !== undefined ? o.value : this.options[0] && this.options[0].value;
    this.render(true);
    requestAnimationFrame(() => this.render(true));
  }
  pickValue(v) { if (this.disabled) return; this.set(v); this.emit('commit', this._value); }
  render(instant) {
    const i = this.options.findIndex(x => this.equals(x.value, this._value));
    this.p.btns.forEach((b, k) => { b.classList.toggle('a2-on', k === i); b.setAttribute('aria-checked', k === i); b.setAttribute('role', 'radio'); });
    this.p.move(i, instant);
    this.paintReset();
  }
}

/**
 * 탭: 위에 탭 막대, 아래에 내용. 탭을 바꾸면 내용이 그 방향으로 밀려 바뀐다.
 * tabs: [{ value, label, build?: (body) => void }], tab.body 에 내용을 넣는다
 */
export class Tabs extends Component {
  constructor(o = {}) {
    super('tabs', o);
    this.options = (o.tabs || []).map((t, i) => ({ value: t.value ?? i, label: t.label ?? String(t.value ?? i), build: t.build }));
    this.p = pillBar(this, this.el, this.options, 'a2-tab-bar');
    this.p.bar.setAttribute('role', 'tablist');
    this.stage = h('div', 'a2-tab-stage', this.el);
    this.panes = this.options.map(t => {
      const pane = h('div', 'a2 a2-tab-pane', this.stage);
      pane.setAttribute('role', 'tabpanel');
      pane.hidden = true;
      if (t.build) t.build(pane);
      return pane;
    });
    this._value = o.value !== undefined ? o.value : this.options[0] && this.options[0].value;
    const i = this.index();
    if (this.panes[i]) this.panes[i].hidden = false;
    this.render(true);
    requestAnimationFrame(() => this.render(true));
  }
  index(v = this._value) { return this.options.findIndex(x => this.equals(x.value, v)); }
  /** 탭 내용 요소 */
  pane(value) { return this.panes[this.index(value)]; }
  pickValue(v) {
    if (this.disabled || this.equals(v, this._value)) return;
    const from = this.index(), to = this.index(v);
    this.set(v);
    this.slide(from, to);
    this.emit('commit', this._value);
  }
  slide(from, to) {
    const a = this.panes[from], b = this.panes[to];
    if (!a || !b) return;
    this._tw && this._tw.kill();
    for (const p of this.panes) if (p !== a && p !== b) p.hidden = true;
    const dir = to > from ? 1 : -1, d = px(this.el, 60);
    const H0 = this.stage.offsetHeight;
    a.hidden = false; b.hidden = false;
    a.classList.add('a2-leaving');
    const H1 = b.offsetHeight;
    this.stage.style.height = `${H0}px`;
    this._tw = animate({ p: 0 }, { p: 1 }, {
      duration: 0.36, ease: 'OutCubic',
      onUpdate: ({ p }) => {
        a.style.transform = `translateX(${-dir * d * p}px)`; a.style.opacity = 1 - p * 1.6;
        b.style.transform = `translateX(${dir * d * (1 - p)}px)`; b.style.opacity = Math.min(1, p * 1.4);
        this.stage.style.height = `${H0 + (H1 - H0) * p}px`;
      },
      onDone: () => {
        a.hidden = true; a.classList.remove('a2-leaving');
        a.style.transform = a.style.opacity = b.style.transform = b.style.opacity = '';
        this.stage.style.height = '';
      },
    });
  }
  render(instant) {
    const i = this.index();
    this.p.btns.forEach((b, k) => { b.classList.toggle('a2-on', k === i); b.setAttribute('aria-selected', k === i); b.setAttribute('role', 'tab'); });
    this.p.move(i, instant);
  }
}
