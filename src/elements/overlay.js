import { A2Element, define, icon } from '../core/base.js';
import { animate } from '../core/animate.js';

// 열린 창이 하나라도 있으면 문서 스크롤을 막는다. 스크롤바가 사라져도 화면이 옆으로 밀리지 않게 그만큼 채운다.
let locks = 0, saved = null;
function lockScroll(on) {
  const de = document.documentElement;
  if (on && locks++ === 0) {
    const gap = innerWidth - de.clientWidth;
    saved = { o: de.style.overflow, p: document.body.style.paddingRight };
    de.style.overflow = 'hidden';
    if (gap > 0) document.body.style.paddingRight = `${(parseFloat(getComputedStyle(document.body).paddingRight) || 0) + gap}px`;
  } else if (!on && locks > 0 && --locks === 0 && saved) {
    de.style.overflow = saved.o; document.body.style.paddingRight = saved.p; saved = null;
  }
}

const OVERLAY_CSS = `
:host { display: contents; }
dialog { position: fixed; inset: 0; width: 100%; height: 100%; max-width: none; max-height: none; margin: 0; padding: 0; border: 0; background: none; overflow: hidden; color: var(--a2-text); font: inherit; outline: none; }
dialog::backdrop { background: none; }
.scrim { position: absolute; inset: 0; background: var(--a2-scrim); opacity: 0; }
.panel { position: absolute; display: flex; flex-direction: column; background: var(--a2-raised); border: 1px solid var(--a2-line); box-shadow: var(--a2-shadow); outline: none; }
.head { display: flex; align-items: flex-start; gap: 12px; padding: 22px 22px 0; }
.titles { flex: 1; min-width: 0; }
.h { font-size: var(--a2-fs-lg); font-weight: var(--a2-weight-strong); line-height: 1.35; padding-top: 0.12em; }
.d { margin-top: 6px; color: var(--a2-text-muted); font-size: var(--a2-fs-sm); line-height: 1.5; }
.h:empty, .d:empty { display: none; }
.x { flex: none; width: 32px; height: 32px; margin: -4px -6px 0 0; border-radius: 8px; display: grid; place-items: center; color: var(--a2-text-muted); transition: background-color var(--t1), color var(--t1); }
.x:hover { background: var(--a2-fill-hover); color: var(--a2-text); }
:host([no-close]) .x { display: none; }
.body { padding: 16px 22px 0; overflow: auto; line-height: 1.55; flex: 1 1 auto; min-height: 0; }
.foot { display: flex; gap: 8px; justify-content: flex-end; flex-wrap: wrap; padding: 22px; }
.foot:not(.on) { padding-top: 0; }
`;

class OverlayBase extends A2Element {
  static observedAttributes = ['open', 'heading', 'description'];
  render() {
    this.root.innerHTML = `<dialog part="dialog"><div class="scrim" part="scrim"></div><div class="panel" part="panel" tabindex="-1" role="document"><div class="head"><div class="titles"><div class="h" part="heading"></div><div class="d" part="description"></div></div><button class="x hit" type="button" aria-label="닫기">${icon('x', 14)}</button></div><div class="body" part="body"><slot></slot></div><div class="foot" part="footer"><slot name="footer"></slot></div></div></dialog>`;
    this.dlg = this.$('dialog'); this.panel = this.$('.panel'); this.scrim = this.$('.scrim');
    this.$('.x').addEventListener('click', () => this.close());
    this.scrim.addEventListener('click', () => { if (!this.bool('persistent')) this.close(); });
    this.dlg.addEventListener('cancel', e => { e.preventDefault(); if (!this.bool('persistent')) this.close(); });
    this.root.querySelector('slot[name=footer]').addEventListener('slotchange', e => this.$('.foot').classList.toggle('on', e.target.assignedElements().length > 0));
    // 안쪽에서 data-close 가 붙은 것을 누르면 닫는다. 값은 data-close 의 값
    this.addEventListener('click', e => { const c = e.target.closest?.('[data-close]'); if (c && this.contains(c)) this.close(c.getAttribute('data-close') || ''); });
  }
  get open() { return this.bool('open'); }
  set open(v) { this.setBool('open', v); }
  /** from: 이 요소 자리에서 펼쳐진다(주지 않으면 방금 초점이 있던 요소, 보통 누른 버튼) */
  show(from) { this._from = from instanceof Element ? from : null; this.open = true; return this; }
  close(returnValue) { if (returnValue !== undefined) this.returnValue = returnValue; this.open = false; return this; }
  attr(name, v, old) {
    if (name === 'open') (v != null) === (old != null) || (v != null ? this.doOpen() : this.doClose());
    else this.update();
  }
  connectedCallback() { super.connectedCallback(); if (this.open && !this.dlg.open) this.doOpen(); }
  disconnectedCallback() { if (this._locked) { this._locked = false; lockScroll(false); } }
  update() {
    this.$('.h').textContent = this.str('heading');
    this.$('.d').textContent = this.str('description');
    const lab = this.str('heading') || this.str('label');
    if (lab) this.dlg.setAttribute('aria-label', lab); else this.dlg.removeAttribute('aria-label');
  }
  doOpen() {
    if (this.dlg.open) return;
    this.returnValue = '';
    this._ret = document.activeElement;
    this.dlg.showModal();
    this.origin(this._from || this._ret);
    if (!this._locked) { this._locked = true; lockScroll(true); }
    const auto = this.querySelector('[autofocus]');
    if (auto) auto.focus(); else this.panel.focus({ preventScroll: true });
    this._anim?.stop();
    const from = this._p ?? 0;
    this._anim = animate({ p: from }, { p: 1 }, { duration: 0.46, ease: 'OutExpo', onUpdate: v => this.paint(v.p) });
    this.emit('a2-show');
  }
  doClose() {
    if (!this.dlg.open) return;
    this._anim?.stop();
    this._anim = animate({ p: this._p ?? 1 }, { p: 0 }, {
      duration: 0.2, ease: 'InQuad', onUpdate: v => this.paint(v.p),
      onDone: () => {
        this.dlg.close();
        if (this._locked) { this._locked = false; lockScroll(false); }
        if (this._ret && this._ret.isConnected) this._ret.focus?.({ preventScroll: true });
        this.emit('a2-close', { returnValue: this.returnValue });
      },
    });
  }
  origin() {}
  paint(p) { this._p = p; this.scrim.style.opacity = p; }
}

/**
 * <a2-dialog heading="제목" description="설명" persistent no-close>
 *   내용 <div slot="footer"><a2-button data-close="ok">확인</a2-button></div>
 * </a2-dialog>
 */
export class A2Dialog extends OverlayBase {
  static styles = `${OVERLAY_CSS}
.panel { left: 50%; top: 50%; width: min(var(--w, 440px), calc(100vw - 32px)); max-height: calc(100dvh - 48px); border-radius: 18px; translate: -50% -50%; }
:host([size="sm"]) { --w: 360px; }
:host([size="lg"]) { --w: 640px; }
`;
  /** 펼쳐지기 시작할 자리: 연 요소의 가운데와 너비. 화면에 없으면 제자리에서 조금 작게 */
  origin(from) {
    this.panel.style.transform = '';
    const pr = this.panel.getBoundingClientRect();
    let o = { x: 0, y: 0, s: 0.9 };
    if (from && from !== document.body && from.getBoundingClientRect) {
      const r = from.getBoundingClientRect();
      if (r.width && r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth) {
        o = { x: r.left + r.width / 2 - (pr.left + pr.width / 2), y: r.top + r.height / 2 - (pr.top + pr.height / 2), s: Math.min(0.9, Math.max(0.25, r.width / pr.width)) };
      }
    }
    this.o = o;
    this.paint(this._p ?? 0);
  }
  paint(p) {
    super.paint(p);
    const o = this.o || { x: 0, y: 0, s: 0.9 }, q = 1 - p;
    this.panel.style.transform = p >= 1 ? '' : `translate(${o.x * q}px, ${o.y * q}px) scale(${o.s + (1 - o.s) * p})`;
    // 처음 잠깐만 흐리게: 버튼에서 떨어져 나오는 순간이 튀어 보이지 않게
    this.panel.style.opacity = p >= 0.3 ? '' : Math.max(0, p / 0.3);
  }
}

/** <a2-drawer heading="설정" side="right|left|bottom"> */
export class A2Drawer extends OverlayBase {
  static styles = `${OVERLAY_CSS}
.panel { top: 0; bottom: 0; right: 0; width: min(var(--w, 380px), 100vw); }
:host([side="left"]) .panel { right: auto; left: 0; }
:host([side="bottom"]) .panel { top: auto; left: 0; right: 0; width: auto; max-height: 85dvh; border-radius: 20px 20px 0 0; }
:host([side="bottom"]) .panel::before { content: ''; align-self: center; width: 36px; height: 4px; margin-top: 10px; border-radius: 2px; background: var(--a2-fill-active); }
:host([side="bottom"]) .head { padding-top: 14px; }
`;
  paint(p) {
    super.paint(p);
    const side = this.str('side', 'right'), q = (1 - p) * 100;
    this.panel.style.transform = side === 'left' ? `translateX(${-q}%)` : side === 'bottom' ? `translateY(${q}%)` : `translateX(${q}%)`;
  }
}

define('a2-dialog', A2Dialog);
define('a2-drawer', A2Drawer);
export { lockScroll };
