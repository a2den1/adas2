import { A2Element, define, icon, ripple, esc } from '../core/base.js';

/* 버튼 공통 모양. 둥근 알약이 기본이고, 누르면 모서리가 스프링으로 각지게 바뀐다. */
export const BUTTON_CSS = `
.b {
  position: relative; isolation: isolate; display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  height: var(--a2-h); min-width: var(--a2-h); padding: 0 calc(var(--a2-h) * 0.42); white-space: nowrap; user-select: none;
  font-weight: var(--a2-weight-strong); color: var(--fg);
  --r: calc(var(--a2-h) / 2); --rp: var(--a2-r-sm);
  --bg: transparent; --bd: var(--a2-line-strong); --fg: var(--a2-text); --hv: var(--a2-fill);
  border-radius: var(--r);
  transition: border-radius var(--snap), color var(--fx);
}
/* 누르는 범위는 보이는 면보다 사방으로 5px 넓다 */
.b::before { content: ''; position: absolute; inset: -5px; z-index: -1; }
.face {
  position: absolute; inset: 0; z-index: -1; border-radius: inherit; background: var(--bg); border: 1px solid var(--bd); pointer-events: none;
  transition: background-color var(--fx), border-color var(--fx), box-shadow var(--fx);
}
.face::after { content: ''; position: absolute; inset: -1px; border-radius: inherit; background: var(--hv); opacity: 0; transition: opacity var(--fx); }
.b:hover .face::after { opacity: 1; }
.b:active { border-radius: var(--rp); }
.rp-box { z-index: -1; }
:host([shape="square"]) .b { --r: var(--a2-r-md); --rp: var(--a2-r-xs); }
:host([variant="primary"]) .b { --bg: var(--a2-accent); --bd: transparent; --fg: var(--a2-on-accent); --hv: rgba(255, 255, 255, 0.12); }
:host([variant="tonal"]) .b, :host([variant="soft"]) .b { --bg: var(--a2-tonal); --bd: transparent; --fg: var(--a2-on-tonal); --hv: var(--a2-fill); }
:host([variant="ghost"]) .b { --bd: transparent; --fg: var(--a2-accent); --hv: var(--a2-accent-soft); }
:host([variant="elevated"]) .b { --bg: var(--a2-surface-high); --bd: transparent; --fg: var(--a2-accent); }
:host([variant="elevated"]) .face { box-shadow: var(--a2-shadow-sm); }
:host([variant="danger"]) .b { --bg: var(--a2-danger); --bd: transparent; --fg: var(--a2-on-danger); --hv: rgba(255, 255, 255, 0.12); }
/* 켜고 끄는 버튼: 켜지면 색이 차고 모양이 반대로 바뀐다 */
:host([selected]) .b { --bg: var(--a2-accent); --bd: transparent; --fg: var(--a2-on-accent); --hv: rgba(255, 255, 255, 0.12); --r: var(--a2-r-md); --rp: var(--a2-r-xs); }
:host([selected][shape="square"]) .b { --r: calc(var(--a2-h) / 2); --rp: var(--a2-r-sm); }
:host([size="xs"]) { --a2-h: 30px; --a2-fs: 12.5px; }
:host([size="sm"]) { --a2-h: 36px; --a2-fs: 13px; }
:host([size="lg"]) { --a2-h: 56px; --a2-fs: 16px; }
:host([size="xl"]) { --a2-h: 76px; --a2-fs: 20px; }
:host([size="lg"]) .b { --rp: var(--a2-r-md); gap: 10px; }
:host([size="xl"]) .b { --rp: var(--a2-r-lg); gap: 12px; }
.b.square { padding: 0; width: var(--a2-h); }
.lbl { display: inline-flex; align-items: center; gap: 8px; }
::slotted(svg), ::slotted(i) { flex: none; }
`;

/**
 * <a2-button variant="primary|tonal|ghost|elevated|danger" size="xs|sm|lg|xl" shape="square" type="submit|reset" toggle selected loading block>
 */
export class A2Button extends A2Element {
  static formAssociated = true;
  static delegatesFocus = true;
  static observedAttributes = ['disabled', 'loading', 'type', 'selected', 'toggle'];
  static styles = `${BUTTON_CSS}
:host { display: inline-flex; vertical-align: middle; }
:host([block]) { display: flex; }
:host([block]) .b { width: 100%; }
.spin { display: none; position: absolute; width: 18px; height: 18px; border-radius: 50%; border: 2px solid currentColor; border-right-color: transparent; }
:host([loading]) .spin { display: block; animation: a2spin calc(0.75s / var(--a2-speed)) linear infinite; }
:host([loading]) .lbl, :host([loading]) slot[name] { visibility: hidden; }
:host([loading]) .b { pointer-events: none; }
@keyframes a2spin { to { rotate: 360deg; } }
`;
  render() {
    this.root.innerHTML = `<button class="b" part="base" type="button"><span class="face" part="face"></span><span class="spin" aria-hidden="true"></span><slot name="prefix"></slot><span class="lbl t"><slot></slot></span><slot name="suffix"></slot></button>`;
    this.btn = this.$('button');
    ripple(this.btn);
    this.btn.addEventListener('click', e => {
      if (this.disabled || this.bool('loading')) { e.preventDefault(); e.stopImmediatePropagation(); return; }
      if (this.bool('toggle')) { this.selected = !this.selected; this.fire('change'); }
      const f = this.form, t = this.str('type', 'button');
      if (f && t === 'submit') f.requestSubmit();
      else if (f && t === 'reset') f.reset();
    });
    this.root.querySelector('slot:not([name])').addEventListener('slotchange', () => this.update());
  }
  update() {
    this.btn.disabled = this.disabled;
    this.btn.setAttribute('aria-busy', this.bool('loading'));
    if (this.bool('toggle')) this.btn.setAttribute('aria-pressed', String(this.selected)); else this.btn.removeAttribute('aria-pressed');
    const text = [...this.childNodes].some(n => (n.nodeType === 3 && n.textContent.trim()) || (n.nodeType === 1 && !n.slot && !/^(svg|i)$/i.test(n.tagName)));
    this.btn.classList.toggle('square', !text);
    if (this.hasAttribute('label')) this.btn.setAttribute('aria-label', this.getAttribute('label'));
  }
  get loading() { return this.bool('loading'); }
  set loading(v) { this.setBool('loading', v); }
  get selected() { return this.bool('selected'); }
  set selected(v) { this.setBool('selected', v); }
  click() { this.btn ? this.btn.click() : super.click(); }
}

/**
 * <a2-split-button variant="primary|tonal" menu="메뉴 id">저장</a2-split-button>
 * 앞쪽은 보통 버튼(click), 뒤쪽 화살표는 menu 로 연결한 <a2-menu> 를 연다. 열리면 화살표 쪽이 둥글게 바뀐다.
 */
export class A2SplitButton extends A2Element {
  static delegatesFocus = true;
  static observedAttributes = ['disabled', 'open'];
  static styles = `${BUTTON_CSS}
:host { display: inline-flex; vertical-align: middle; gap: 2px; }
.b { --bg: var(--a2-tonal); --bd: transparent; --fg: var(--a2-on-tonal); }
:host([variant="primary"]) .b { --hv: rgba(255, 255, 255, 0.12); }
.lead { border-radius: var(--r) var(--in) var(--in) var(--r); --in: 6px; transition: border-radius var(--snap); }
.lead:active { --in: 14px; border-radius: var(--r) var(--in) var(--in) var(--r); }
.trail { padding: 0; width: calc(var(--a2-h) * 0.95); border-radius: var(--in) var(--r) var(--r) var(--in); --in: 6px; transition: border-radius var(--snap), width var(--snap); }
.trail:active { --in: 14px; border-radius: var(--in) var(--r) var(--r) var(--in); }
:host([open]) .trail { --in: var(--r); width: var(--a2-h); }
.chev { transition: transform var(--move); }
:host([open]) .chev { transform: rotate(180deg); }
`;
  render() {
    this.root.innerHTML = `<button class="b lead" part="base" type="button"><span class="face"></span><slot name="prefix"></slot><span class="lbl t"><slot></slot></span></button><button class="b trail" part="toggle" type="button" aria-haspopup="menu" aria-label="더 보기"><span class="face"></span><span class="chev">${icon('chevron', 12)}</span></button>`;
    this.lead = this.$('.lead'); this.trail = this.$('.trail');
    ripple(this.lead); ripple(this.trail);
    this.trail.addEventListener('click', e => {
      e.stopPropagation();
      const m = this.menuEl;
      if (!m) { this.setBool('open', !this.bool('open')); this.emit('a2-toggle', { open: this.bool('open') }); return; }
      if (m.isOpen) { m.close(); return; }
      this.setBool('open', true);
      m.show(this.trail);
      m.addEventListener('a2-close', () => this.setBool('open', false), { once: true });
    });
  }
  get menuEl() { const id = this.getAttribute('menu'); return id ? document.getElementById(id) : null; }
  update() {
    this.lead.disabled = this.trail.disabled = this.disabled;
    this.trail.setAttribute('aria-expanded', String(this.bool('open')));
  }
}

/** <a2-fab-item value="note">메모</a2-fab-item> — a2-fab 안에 넣으면 눌렀을 때 펼쳐지는 항목 */
export class A2FabItem extends HTMLElement {
  get value() { return this.getAttribute('value') ?? this.textContent.trim(); }
}

/**
 * <a2-fab label="새로 만들기" extended variant="primary|tonal" size="sm|lg">
 *   <svg>…</svg>                       ← 아이콘(없으면 +)
 *   <a2-fab-item value="note">메모</a2-fab-item>   ← 있으면 누를 때 위로 펼쳐진다
 * </a2-fab>
 * 항목을 고르면 a2-select 이벤트(detail.value)가 난다.
 */
export class A2Fab extends A2Element {
  static delegatesFocus = true;
  static observedAttributes = ['label', 'extended', 'open', 'disabled'];
  static styles = `
:host { position: relative; display: inline-flex; vertical-align: middle; --a2-h: 56px; --bg: var(--a2-accent-container); --fg: var(--a2-on-accent-container); }
:host([size="sm"]) { --a2-h: 44px; }
:host([size="lg"]) { --a2-h: 76px; }
:host([variant="primary"]) { --bg: var(--a2-accent); --fg: var(--a2-on-accent); }
:host([variant="tonal"]) { --bg: var(--a2-tonal); --fg: var(--a2-on-tonal); }
.f {
  position: relative; isolation: isolate; display: inline-flex; align-items: center; justify-content: center; gap: 10px; height: var(--a2-h); min-width: var(--a2-h); padding: 0;
  border-radius: calc(var(--a2-h) * 0.3); background: var(--bg); color: var(--fg); box-shadow: var(--a2-shadow-sm); font-weight: var(--a2-weight-strong); white-space: nowrap; user-select: none;
  transition: border-radius var(--snap), background-color var(--fx), color var(--fx), box-shadow var(--fx), transform var(--snap);
}
.f::before { content: ''; position: absolute; inset: -5px; z-index: -1; }
.f:hover { box-shadow: var(--a2-shadow); }
.f:active { border-radius: calc(var(--a2-h) * 0.2); transform: scale(0.96); }
.rp-box { z-index: -1; }
:host([extended]) .f { padding: 0 calc(var(--a2-h) * 0.36); }
.ic { display: grid; place-items: center; transition: transform var(--move); }
.txt { display: none; }
:host([extended]) .txt { display: block; }
/* 펼쳤을 때: 동그랗게, 강조색으로, + 가 돌아 × 가 된다 */
:host([open]) .f { border-radius: 50%; background: var(--a2-accent); color: var(--a2-on-accent); padding: 0; }
:host([open]) .ic { transform: rotate(135deg); }
:host([open]) .txt { display: none; }
.list { position: absolute; right: 0; bottom: calc(100% + 10px); display: flex; flex-direction: column-reverse; align-items: flex-end; gap: 6px; pointer-events: none; }
:host([align="start"]) .list { right: auto; left: 0; align-items: flex-start; }
.it {
  display: inline-flex; align-items: center; gap: 10px; height: 52px; padding: 0 22px; border-radius: 26px; background: var(--a2-accent-container); color: var(--a2-on-accent-container);
  font-weight: var(--a2-weight-strong); white-space: nowrap; box-shadow: var(--a2-shadow-sm);
  transform-origin: 100% 100%; transform: translateY(24px) scale(0.5); opacity: 0; visibility: hidden;
  transition: transform var(--fx), opacity var(--fx), visibility 0s linear calc(var(--a2-d-fx) / var(--a2-speed)), border-radius var(--snap);
}
:host([align="start"]) .it { transform-origin: 0 100%; }
.it:active { border-radius: var(--a2-r-md); }
:host([open]) .list { pointer-events: auto; }
:host([open]) .it { transform: none; opacity: 1; visibility: visible; transition: transform var(--move), opacity var(--fx), visibility 0s, border-radius var(--snap); transition-delay: calc(var(--i) * 45ms / var(--a2-speed)), calc(var(--i) * 45ms / var(--a2-speed)), 0s, 0s; }
.it svg, .it i { flex: none; }
`;
  render() {
    this.root.innerHTML = `<div class="list" part="list" role="menu"></div><button class="f" part="base" type="button"><span class="ic"><slot name="icon">${icon('plus', 18)}</slot></span><span class="txt t"></span></button>`;
    this.btn = this.$('.f'); this.list = this.$('.list');
    ripple(this.btn);
    this.btn.addEventListener('click', e => { if (this.items.length) { e.stopPropagation(); this.open = !this.open; } });
    this.list.addEventListener('click', e => {
      const it = e.target.closest('.it'); if (!it) return;
      e.stopPropagation();
      const item = this.items[+it.dataset.i];
      this.open = false;
      item.dispatchEvent(new CustomEvent('a2-select', { bubbles: true, composed: true, detail: { value: item.value, item } }));
    });
    this._out = e => { if (!e.composedPath().includes(this)) this.open = false; };
    this._key = e => { if (e.key === 'Escape') { e.stopPropagation(); this.open = false; this.btn.focus(); } };
    new MutationObserver(() => this.paintItems()).observe(this, { childList: true, subtree: true, characterData: true });
    this.paintItems();
  }
  get items() { return [...this.querySelectorAll(':scope > a2-fab-item')]; }
  get open() { return this.bool('open'); }
  set open(v) { this.setBool('open', v); }
  paintItems() {
    this.list.innerHTML = this.items.map((c, i) => {
      const ic = c.querySelector('svg, i');
      const text = [...c.childNodes].filter(n => n !== ic).map(n => n.textContent).join('').trim();
      return `<button class="it" type="button" role="menuitem" data-i="${i}" style="--i:${i}">${ic ? ic.outerHTML : ''}<span class="t">${esc(text)}</span></button>`;
    }).join('');
  }
  attr(name, v) {
    if (name === 'open') {
      document.removeEventListener('pointerdown', this._out, true); removeEventListener('keydown', this._key, true);
      if (v != null) { document.addEventListener('pointerdown', this._out, true); addEventListener('keydown', this._key, true); }
      this.emit('a2-toggle', { open: v != null });
    }
    this.update();
  }
  disconnectedCallback() { document.removeEventListener('pointerdown', this._out, true); removeEventListener('keydown', this._key, true); }
  update() {
    this.btn.disabled = this.disabled;
    this.$('.txt').textContent = this.str('label');
    this.btn.setAttribute('aria-label', this.str('label', '더 보기'));
    if (this.items.length) this.btn.setAttribute('aria-expanded', String(this.open));
    for (const b of this.list.children) b.tabIndex = this.open ? 0 : -1;
  }
}

define('a2-button', A2Button);
define('a2-split-button', A2SplitButton);
define('a2-fab-item', A2FabItem);
define('a2-fab', A2Fab);
