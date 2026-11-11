import { A2Element, define, ripple } from '../core/base.js';
import { Spring } from '../core/spring.js';

/** <a2-tab-panel label="개요" value="overview">내용</a2-tab-panel> */
export class A2TabPanel extends HTMLElement {
  get value() { return this.getAttribute('value') ?? this.getAttribute('label') ?? ''; }
  get label() { return this.getAttribute('label') ?? this.value; }
}

/**
 * <a2-tabs value="overview" fit>
 *   <a2-tab-panel label="개요" value="overview">…</a2-tab-panel>
 * 탭 이름은 패널의 label 에서 가져온다. 밑줄 표시는 가는 쪽 끝이 먼저 나가고 뒤쪽 끝이 따라와서 늘어났다 줄어든다.
 * 내용은 옮겨 가는 방향에서 밀려 들어온다.
 */
export class A2Tabs extends A2Element {
  static observedAttributes = ['value'];
  static styles = `
:host { display: block; }
.bar { position: relative; display: flex; overflow-x: auto; scrollbar-width: none; border-bottom: 1px solid var(--a2-line); margin-bottom: 18px; }
.tab {
  position: relative; flex: none; height: 46px; padding: 0.12em 18px 0; color: var(--a2-text-muted); white-space: nowrap; user-select: none;
  border-radius: var(--a2-r-xs) var(--a2-r-xs) 0 0; transition: color var(--fx);
}
:host([fit]) .tab { flex: 1; }
.tab::after { content: ''; position: absolute; inset: 0; border-radius: inherit; background: var(--a2-fill); opacity: 0; transition: opacity var(--fx); }
.tab:hover::after { opacity: 1; }
.tab:hover { color: var(--a2-text); }
.tab[aria-selected="true"] { color: var(--a2-accent); font-weight: var(--a2-weight-strong); }
.tab:disabled { opacity: 0.4; cursor: default; }
.tab:focus-visible { outline-offset: -3px; }
.tab span { position: relative; }
.ind { position: absolute; left: 0; bottom: 0; height: 3px; border-radius: 3px 3px 0 0; background: var(--a2-accent); visibility: hidden; pointer-events: none; }
.body { position: relative; overflow-x: clip; }
::slotted(a2-tab-panel) { display: block; }
::slotted(a2-tab-panel:not([data-on])) { display: none; }
`;
  render() {
    this.root.innerHTML = `<div class="bar" part="tabs" role="tablist"><span class="ind" part="indicator"></span></div><div class="body" part="body"><slot></slot></div>`;
    this.bar = this.$('.bar'); this.ind = this.$('.ind');
    const put = () => { this.ind.style.left = `${this.l.x}px`; this.ind.style.width = `${Math.max(4, this.r.x - this.l.x)}px`; };
    this.l = new Spring(0, 'move', put); this.r = new Spring(0, 'move', put);
    this.bar.addEventListener('click', e => { const b = e.target.closest('.tab'); if (b) this.pick(b.dataset.v, true); });
    this.bar.addEventListener('keydown', e => {
      const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      const bs = [...this.bar.querySelectorAll('.tab:not(:disabled)')];
      let n;
      if (d) n = bs[(bs.indexOf(this.root.activeElement) + d + bs.length) % bs.length];
      else if (e.key === 'Home') n = bs[0];
      else if (e.key === 'End') n = bs[bs.length - 1];
      if (!n) return;
      e.preventDefault(); n.focus(); this.pick(n.dataset.v, true);
    });
    new MutationObserver(() => this.build()).observe(this, { childList: true, attributes: true, subtree: true, attributeFilter: ['label', 'value', 'disabled'] });
    new ResizeObserver(() => this.place(true)).observe(this.bar);
    document.fonts?.ready.then(() => this.place(true));
    this.build();
  }
  get panels() { return [...this.children].filter(c => c.tagName === 'A2-TAB-PANEL'); }
  get value() { return this._v ?? ''; }
  set value(v) { this.setAttribute('value', v); }
  build() {
    const ps = this.panels;
    if (this._v == null || !ps.some(p => p.value === this._v)) this._v = this.getAttribute('value') ?? ps.find(p => !p.hasAttribute('disabled'))?.value;
    for (const b of this.bar.querySelectorAll('.tab')) b.remove();
    for (const p of ps) {
      p.setAttribute('role', 'tabpanel');
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'tab'; b.dataset.v = p.value; b.setAttribute('role', 'tab');
      const s = document.createElement('span'); s.textContent = p.label; b.append(s);
      b.disabled = p.hasAttribute('disabled');
      ripple(b);
      this.bar.append(b);
    }
    this.sync(true);
  }
  pick(v, user) {
    if (v === this._v) return;
    const ps = this.panels, dir = ps.findIndex(p => p.value === v) > ps.findIndex(p => p.value === this._v) ? 1 : -1;
    this._v = v;
    this.sync(false, dir);
    if (user) this.emit('a2-change', { value: v });
  }
  sync(instant, dir = 1) {
    for (const b of this.bar.querySelectorAll('.tab')) {
      const on = b.dataset.v === this._v;
      b.setAttribute('aria-selected', String(on));
      b.tabIndex = on ? 0 : -1;
    }
    for (const p of this.panels) {
      const on = p.value === this._v, was = p.hasAttribute('data-on');
      p.toggleAttribute('data-on', on);
      if (on && !was && !instant) {
        // 옮겨 가는 방향에서 밀려 들어온다
        p._a2 ||= new Spring(0, 'move', x => { p.style.transform = x ? `translateX(${x}px)` : ''; });
        p._a2.jump(dir * 44); p._a2.set(0);
      }
    }
    const b = this.current;
    if (b && !instant) b.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    this.place(instant, dir);
  }
  get current() { return [...this.bar.querySelectorAll('.tab')].find(x => x.dataset.v === this._v); }
  /** 밑줄을 고른 탭의 글자 아래로. 가는 쪽 끝은 빠르게, 반대쪽 끝은 느리게 움직인다 */
  place(instant, dir = 1) {
    const b = this.current;
    if (!b || !b.offsetWidth) { this.ind.style.visibility = 'hidden'; return; }
    const t = b.firstElementChild, l = b.offsetLeft + t.offsetLeft - 2, r = l + t.offsetWidth + 4;
    this.ind.style.visibility = 'visible';
    if (instant || this._placed !== true) { this._placed = true; this.l.jump(l); this.r.jump(r); return; }
    this.l.set(l, { cfg: dir > 0 ? 'slow' : 'snap' });
    this.r.set(r, { cfg: dir > 0 ? 'snap' : 'slow' });
  }
  attr(name, v) { if (name === 'value' && v !== this._v && v != null) this.pick(v, false); }
}

define('a2-tab-panel', A2TabPanel);
define('a2-tabs', A2Tabs);
