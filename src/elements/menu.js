import { A2Element, define, esc } from '../core/base.js';
import { openPopover, POPOVER_CSS } from '../core/popover.js';
import { keyNames } from '../core/keys.js';

/** <a2-menu-item value="copy" shortcut="Ctrl+KeyC" danger disabled>복사</a2-menu-item> */
export class A2MenuItem extends HTMLElement {
  get value() { return this.getAttribute('value') ?? this.textContent.trim(); }
}

/**
 * <a2-menu for="버튼 id" trigger="click|contextmenu" align="start|end">
 *   <a2-menu-item value="copy">복사</a2-menu-item>
 *   <hr>
 *   <a2-menu-item value="delete" danger>삭제</a2-menu-item>
 * </a2-menu>
 * 고르면 a2-select 이벤트(detail.value, detail.item)가 난다.
 */
export class A2Menu extends A2Element {
  static observedAttributes = ['for', 'trigger'];
  static styles = `${POPOVER_CSS}
:host { display: contents; }
.menu:focus { outline: none; }
.item .ic { flex: none; width: 18px; display: grid; place-items: center; color: var(--a2-text-muted); }
.item .ic:empty { display: none; }
.item.danger, .item.danger .ic { color: var(--a2-danger); }
.item.danger:hover, .item.danger.active { background: color-mix(in srgb, var(--a2-danger) 14%, transparent); }
.kb { flex: none; margin-left: 14px; color: var(--a2-text-faint); font-size: var(--a2-fs-sm); padding-top: 0.12em; }
.head { padding: 8px 10px 4px; color: var(--a2-text-faint); font-size: var(--a2-fs-sm); }
`;
  render() {
    this.root.innerHTML = `<div class="pop" popover="manual"><div class="menu" part="menu" role="menu" tabindex="-1"></div></div>`;
    this.pop = this.$('.pop'); this.list = this.$('.menu');
    this._active = -1;
    this._onTrigger = e => {
      if (this.str('trigger', 'click') === 'contextmenu') { e.preventDefault(); this.show({ x: e.clientX, y: e.clientY }); }
      else this.isOpen ? this.close() : this.show(e.currentTarget, e.detail === 0);
    };
    this._onKey = e => { if (e.key === 'ArrowDown' && !this.isOpen && this.str('trigger', 'click') === 'click') { e.preventDefault(); this.show(e.currentTarget, true); } };
    this.list.addEventListener('click', e => { const it = e.target.closest('.item'); if (it) this.choose(+it.dataset.i); });
    this.list.addEventListener('pointermove', e => { const it = e.target.closest('.item'); if (it) this.mark(+it.dataset.i); });
    this.list.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') { e.preventDefault(); this.step(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); this.step(-1); }
      else if (e.key === 'Home') { e.preventDefault(); this._active = -1; this.step(1); }
      else if (e.key === 'End') { e.preventDefault(); this._active = this.entries.length; this.step(-1); }
      else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (this._active >= 0) this.choose(this._active); }
      else if (e.key === 'Tab') this.close();
    });
  }
  get entries() { return [...this.querySelectorAll(':scope > a2-menu-item')]; }
  get isOpen() { return !!this._pop?.open; }
  attr() { this.bind(); }
  connectedCallback() { super.connectedCallback(); this.bind(); }
  disconnectedCallback() { this.unbind(); this._pop?.close(); }
  unbind() {
    if (!this._target) return;
    this._target.removeEventListener('click', this._onTrigger);
    this._target.removeEventListener('contextmenu', this._onTrigger);
    this._target.removeEventListener('keydown', this._onKey);
    this._target = null;
  }
  bind() {
    this.unbind();
    const id = this.getAttribute('for');
    const t = id ? document.getElementById(id) : null;
    if (!t) { if (id && !this._retry) { this._retry = true; requestAnimationFrame(() => this.bind()); } return; }
    this._target = t;
    t.setAttribute('aria-haspopup', 'menu');
    t.addEventListener(this.str('trigger', 'click') === 'contextmenu' ? 'contextmenu' : 'click', this._onTrigger);
    t.addEventListener('keydown', this._onKey);
  }
  paintList() {
    let i = 0;
    this.list.innerHTML = [...this.children].map(c => {
      if (c.tagName === 'HR') return '<div class="sep" role="separator"></div>';
      if (c.tagName === 'A2-MENU-LABEL') return `<div class="head t">${esc(c.textContent)}</div>`;
      if (c.tagName !== 'A2-MENU-ITEM') return '';
      const ic = c.querySelector('[slot=icon]');
      const kb = c.getAttribute('shortcut');
      const text = [...c.childNodes].filter(n => !(n.nodeType === 1 && n.slot === 'icon')).map(n => n.textContent).join('').trim();
      return `<div class="item${c.hasAttribute('danger') ? ' danger' : ''}" role="menuitem" data-i="${i++}" aria-disabled="${c.hasAttribute('disabled')}"><span class="ic">${ic ? ic.outerHTML.replace(/\sslot="icon"/, '') : ''}</span><span class="grow">${esc(text)}</span>${kb ? `<span class="kb">${esc(keyNames(kb).join('+'))}</span>` : ''}</div>`;
    }).join('');
  }
  /** @param {Element|{x:number,y:number}} at */
  show(at, kb) {
    if (this.isOpen) this._pop.close();
    at = at || this._target;
    this.paintList();
    this._active = -1;
    this._target?.setAttribute('aria-expanded', 'true');
    this._pop = openPopover(this.pop, at, { gap: 6, alignEnd: this.str('align') === 'end', closeOnOutside: this._target && at === this._target ? [this._target] : [], onClose: () => { this._target?.setAttribute('aria-expanded', 'false'); this.emit('a2-close'); } });
    requestAnimationFrame(() => { this.list.focus({ preventScroll: true }); if (kb) this.step(1); });
  }
  close() { if (this.isOpen) { this._pop.close(); this._target?.focus?.({ preventScroll: true }); } }
  mark(i) { this._active = i; this.list.querySelectorAll('.item').forEach(el => el.classList.toggle('active', +el.dataset.i === i)); }
  step(d) {
    const items = this.entries, n = items.length;
    if (!n) return;
    let i = this._active;
    for (let k = 0; k < n; k++) { i = (i + d + n) % n; if (!items[i].hasAttribute('disabled')) break; }
    this.mark(i);
    this.list.querySelector(`.item[data-i="${i}"]`)?.scrollIntoView({ block: 'nearest' });
  }
  choose(i) {
    const item = this.entries[i];
    if (!item || item.hasAttribute('disabled')) return;
    this.close();
    item.dispatchEvent(new CustomEvent('a2-select', { bubbles: true, composed: true, detail: { value: item.value, item } }));
  }
}

define('a2-menu-item', A2MenuItem);
define('a2-menu', A2Menu);
