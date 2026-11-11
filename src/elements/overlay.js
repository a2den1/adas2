import { A2Element, define, icon } from '../core/base.js';
import { Spring, drag, rubber } from '../core/spring.js';

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
.panel { position: absolute; display: flex; flex-direction: column; background: var(--a2-surface-high); box-shadow: var(--a2-shadow); outline: none; will-change: transform; }
.head { display: flex; align-items: flex-start; gap: 12px; padding: 24px 24px 0; }
.titles { flex: 1; min-width: 0; }
.h { font-size: var(--a2-fs-lg); font-weight: var(--a2-weight-strong); line-height: 1.35; padding-top: 0.12em; }
.d { margin-top: 8px; color: var(--a2-text-muted); line-height: 1.55; }
.h:empty, .d:empty { display: none; }
.x { flex: none; width: 36px; height: 36px; margin: -6px -8px 0 0; border-radius: 50%; display: grid; place-items: center; color: var(--a2-text-muted); transition: background-color var(--fx), color var(--fx), transform var(--snap); }
.x:hover { background: var(--a2-fill-hover); color: var(--a2-text); }
.x:active { transform: scale(0.86); }
:host([no-close]) .x { display: none; }
.body { padding: 18px 24px 0; overflow: auto; line-height: 1.55; flex: 1 1 auto; min-height: 0; }
.foot { display: flex; gap: 8px; justify-content: flex-end; flex-wrap: wrap; padding: 24px; }
.foot:not(.on) { padding-top: 0; }
`;

class OverlayBase extends A2Element {
  static observedAttributes = ['open', 'heading', 'description'];
  render() {
    this.root.innerHTML = `<dialog part="dialog"><div class="scrim" part="scrim"></div><div class="panel" part="panel" tabindex="-1" role="document"><div class="grab"></div><div class="head"><div class="titles"><div class="h" part="heading"></div><div class="d" part="description"></div></div><button class="x hit" type="button" aria-label="닫기">${icon('x', 14)}</button></div><div class="body" part="body"><slot></slot></div><div class="foot" part="footer"><slot name="footer"></slot></div></div></dialog>`;
    this.dlg = this.$('dialog'); this.panel = this.$('.panel'); this.scrim = this.$('.scrim');
    // p: 0(닫힘) → 1(열림). 스프링이라 열릴 때 1 을 살짝 넘었다 돌아온다
    this.sp = new Spring(0, 'move', p => this.paint(p), 0.002);
    this.$('.x').addEventListener('click', () => this.close());
    this.scrim.addEventListener('click', () => { if (!this.bool('persistent')) this.close(); });
    this.dlg.addEventListener('cancel', e => { e.preventDefault(); if (!this.bool('persistent')) this.close(); });
    this.root.querySelector('slot[name=footer]').addEventListener('slotchange', e => this.$('.foot').classList.toggle('on', e.target.assignedElements().length > 0));
    // 안쪽에서 data-close 가 붙은 것을 누르면 닫는다. 값은 data-close 의 값
    this.addEventListener('click', e => { const c = e.target.closest?.('[data-close]'); if (c && this.contains(c)) this.close(c.getAttribute('data-close') || ''); });
  }
  get open() { return this.bool('open'); }
  set open(v) { this.setBool('open', v); }
  /** from: 이 요소 자리에서 펼쳐진다(주지 않으면 방금 초점이 있던 요소) */
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
    this.returnValue = '';
    this._ret = this._from || document.activeElement;
    if (!this.dlg.open) this.dlg.showModal();
    if (!this._locked) { this._locked = true; lockScroll(true); }
    this.origin(this._ret);
    const auto = this.querySelector('[autofocus]');
    if (auto) auto.focus(); else this.panel.focus({ preventScroll: true });
    this.sp.rest = null;
    this.sp.set(1, { cfg: this.springIn || 'move' });
    this.emit('a2-show');
  }
  doClose(velocity) {
    if (!this.dlg.open) return;
    this.sp.rest = () => {
      if (this.open) return;
      this.dlg.close();
      if (this._locked) { this._locked = false; lockScroll(false); }
      if (this._ret && this._ret.isConnected) this._ret.focus?.({ preventScroll: true });
      this.emit('a2-close', { returnValue: this.returnValue });
    };
    this.sp.set(0, { cfg: 'fx', velocity: velocity ?? 0 });
  }
  origin() {}
  paint(p) { this._p = p; this.scrim.style.opacity = Math.min(1, Math.max(0, p)); }
}

/**
 * <a2-dialog heading="제목" description="설명" size="sm|lg" persistent no-close>
 *   내용 <div slot="footer"><a2-button data-close="ok">확인</a2-button></div>
 * </a2-dialog>
 * 연 요소(버튼)의 자리에서 커지며 나타나고, 닫으면 그 자리로 돌아간다.
 */
export class A2Dialog extends OverlayBase {
  static styles = `${OVERLAY_CSS}
.panel { left: 50%; top: 50%; width: min(var(--w, 440px), calc(100vw - 32px)); max-height: calc(100dvh - 48px); border-radius: var(--a2-r-xl); translate: -50% -50%; }
:host([size="sm"]) { --w: 360px; }
:host([size="lg"]) { --w: 640px; }
`;
  /** 펼쳐지기 시작할 자리: 연 요소의 가운데와 크기 */
  origin(from) {
    this.panel.style.transform = '';
    const pr = this.panel.getBoundingClientRect();
    let o = { x: 0, y: 26, s: 0.86 };
    if (from && from !== document.body && from.getBoundingClientRect) {
      const r = from.getBoundingClientRect();
      if (r.width && r.bottom > 0 && r.top < innerHeight) o = { x: r.left + r.width / 2 - (pr.left + pr.width / 2), y: r.top + r.height / 2 - (pr.top + pr.height / 2), s: Math.min(0.9, Math.max(0.3, r.width / pr.width)) };
    }
    this.o = o;
    this.paint(this.sp.x);
  }
  paint(p) {
    super.paint(p);
    const o = this.o || { x: 0, y: 26, s: 0.86 }, q = 1 - p;
    this.panel.style.transform = p === 1 ? '' : `translate(${o.x * q}px, ${o.y * q}px) scale(${o.s + (1 - o.s) * p})`;
    this.panel.style.opacity = p >= 0.3 ? '' : Math.max(0, p / 0.3);
  }
}

/**
 * <a2-drawer heading="설정" side="right|left|bottom">
 * 옆이나 아래에서 스프링으로 나온다. 아래 서랍은 위쪽 손잡이를 잡고 끌어내려 닫을 수 있다.
 */
export class A2Drawer extends OverlayBase {
  springIn = 'slow';
  static styles = `${OVERLAY_CSS}
/* 스프링이 조금 넘치더라도 가장자리가 비지 않게 화면 밖으로 60px 더 뻗어 있다 */
.panel { top: 0; bottom: 0; right: -60px; padding-right: 60px; width: calc(min(var(--w, 380px), 100vw) + 60px); border-radius: var(--a2-r-xl) 0 0 var(--a2-r-xl); }
:host([side="left"]) .panel { right: auto; left: -60px; padding-right: 0; padding-left: 60px; border-radius: 0 var(--a2-r-xl) var(--a2-r-xl) 0; }
:host([side="bottom"]) .panel { top: auto; left: 0; right: 0; bottom: -60px; padding: 0 0 60px; width: auto; max-height: calc(85dvh + 60px); border-radius: var(--a2-r-xl) var(--a2-r-xl) 0 0; }
.grab { display: none; }
:host([side="bottom"]) .grab { display: block; flex: none; height: 28px; cursor: grab; touch-action: none; position: relative; }
:host([side="bottom"]) .grab::after { content: ''; position: absolute; left: 50%; top: 12px; width: 36px; height: 4px; margin-left: -18px; border-radius: 2px; background: var(--a2-line-strong); transition: width var(--snap), margin var(--snap); }
:host([side="bottom"]) .grab:active::after { width: 56px; margin-left: -28px; }
:host([side="bottom"]) .head { padding-top: 6px; touch-action: none; }
`;
  render() {
    super.render();
    let h = 1;
    const onGrab = el => drag(el, {
      start: e => { if (this.str('side') !== 'bottom' || e.target.closest('.x')) return false; h = this.panel.offsetHeight - 60; this.sp.stop(); },
      move: ({ dy }) => { const p = 1 - dy / h; this.sp.x = p > 1 ? 1 + rubber(p - 1, 0.12) : p; this.paint(this.sp.x); },
      end: ({ dy, vy }) => {
        // 빠르게 내리거나 3분의 1 넘게 내리면 닫는다. 놓는 순간의 속도를 그대로 이어받는다
        const v = -vy / h;
        if ((vy > 700 || dy / h > 0.34) && !this.bool('persistent')) { this._v0 = v; this.close(); } else this.sp.set(1, { cfg: 'move', velocity: v });
      },
    });
    onGrab(this.$('.grab')); onGrab(this.$('.head'));
  }
  origin() { this._size = 0; this.paint(this.sp.x); }
  doClose() { const v = this._v0; this._v0 = null; super.doClose(v); }
  paint(p) {
    super.paint(p);
    const side = this.str('side', 'right'), q = 1 - p;
    const size = this._size || (this._size = (side === 'bottom' ? this.panel.offsetHeight : this.panel.offsetWidth) - 60);
    const d = q * size;
    this.panel.style.transform = side === 'left' ? `translateX(${-d}px)` : side === 'bottom' ? `translateY(${d}px)` : `translateX(${d}px)`;
  }
}

define('a2-dialog', A2Dialog);
define('a2-drawer', A2Drawer);
export { lockScroll };
