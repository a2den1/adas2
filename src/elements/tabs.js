import { A2Element, define } from '../core/base.js';
import { slideIndicator, animate } from '../core/animate.js';

/** <a2-tab-panel label="개요" value="overview">내용</a2-tab-panel> */
export class A2TabPanel extends HTMLElement {
  get value() { return this.getAttribute('value') ?? this.getAttribute('label') ?? ''; }
  get label() { return this.getAttribute('label') ?? this.value; }
}

/**
 * <a2-tabs value="overview">
 *   <a2-tab-panel label="개요" value="overview">…</a2-tab-panel>
 * 탭 이름은 패널의 label 에서 가져온다. 선택 표시는 탭 사이를 옮겨 가고, 패널은 짧게 겹쳐 바뀐다.
 */
export class A2Tabs extends A2Element {
  static observedAttributes = ['value'];
  static styles = `
:host { display: block; }
.bar { position: relative; display: flex; gap: 4px; overflow-x: auto; scrollbar-width: none; padding: 2px; margin: -2px -2px 14px; }
.ind { position: absolute; left: 0; top: 0; border-radius: 999px; background: var(--a2-accent-soft); opacity: 0; pointer-events: none; }
.tab {
  position: relative; z-index: 1; flex: none; height: 36px; padding: 0.12em 16px 0; border-radius: 999px;
  color: var(--a2-text-muted); white-space: nowrap; transition: color var(--t2), background-color var(--t1);
}
.tab:hover { color: var(--a2-text); background: var(--a2-fill); }
.tab[aria-selected="true"] { color: var(--a2-accent); font-weight: var(--a2-weight-strong); background: none; }
.tab:disabled { opacity: 0.4; cursor: default; }
.body { position: relative; }
::slotted(a2-tab-panel) { display: block; }
::slotted(a2-tab-panel:not([data-on])) { display: none; }
`;
  render() {
    this.root.innerHTML = `<div class="bar" part="tabs" role="tablist"><span class="ind" part="indicator"></span></div><div class="body" part="body"><slot></slot></div>`;
    this.bar = this.$('.bar'); this.ind = this.$('.ind');
    this._state = {};
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
    this.build();
  }
  get panels() { return [...this.children].filter(c => c.tagName === 'A2-TAB-PANEL'); }
  get value() { return this._v ?? ''; }
  set value(v) { this.setAttribute('value', v); }
  build() {
    const ps = this.panels;
    if (this._v == null || !ps.some(p => p.value === this._v)) this._v = this.getAttribute('value') ?? ps.find(p => !p.hasAttribute('disabled'))?.value;
    for (const b of this.bar.querySelectorAll('.tab')) b.remove();
    ps.forEach((p, i) => {
      if (!p.id) p.id = `a2tp-${Math.random().toString(36).slice(2, 8)}`;
      p.setAttribute('role', 'tabpanel');
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'tab'; b.dataset.v = p.value; b.setAttribute('role', 'tab');
      b.textContent = p.label; b.disabled = p.hasAttribute('disabled');
      this.bar.append(b);
    });
    this.sync(true);
  }
  pick(v, user) {
    if (v === this._v) return;
    this._v = v;
    this.sync(false);
    if (user) this.emit('a2-change', { value: v });
  }
  sync(instant) {
    for (const b of this.bar.querySelectorAll('.tab')) {
      const on = b.dataset.v === this._v;
      b.setAttribute('aria-selected', String(on));
      b.tabIndex = on ? 0 : -1;
    }
    for (const p of this.panels) {
      const on = p.value === this._v, was = p.hasAttribute('data-on');
      p.toggleAttribute('data-on', on);
      if (on && !was && !instant) {
        p.style.opacity = '0';
        animate({ p: 0 }, { p: 1 }, { duration: 0.22, ease: 'OutCubic', onUpdate: v => { p.style.opacity = v.p; p.style.transform = `translateY(${(1 - v.p) * 6}px)`; }, onDone: () => { p.style.opacity = ''; p.style.transform = ''; } });
      }
    }
    const b = [...this.bar.querySelectorAll('.tab')].find(x => x.dataset.v === this._v);
    if (b && !instant) b.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    this.place(instant);
  }
  place(instant) {
    const b = [...this.bar.querySelectorAll('.tab')].find(x => x.dataset.v === this._v);
    if (b) slideIndicator(this.ind, b, this._state, instant); else this.ind.style.opacity = '0';
  }
  attr(name, v) { if (name === 'value' && v !== this._v) { this._v = v; this.sync(false); } }
  update() { document.fonts?.ready.then(() => this.place(true)); }
}

define('a2-tab-panel', A2TabPanel);
define('a2-tabs', A2Tabs);
