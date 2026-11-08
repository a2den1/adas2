// 떠 있는 패널(창). 위쪽을 끌어 옮기고, 가장자리로 크기를 바꾸고, 누르면 맨 위로 온다.
import { ensureSetup } from './settings.js';
import { h, icon, scaleOf } from './dom.js';
import { animate } from './tween.js';

let layer = null, topZ = 10;
const getLayer = () => { if (!layer || !layer.isConnected) layer = h('div', 'a2-panel-layer', document.body); return layer; };

export class Panel {
  /**
   * @param {{ title?: string, width?: number, height?: number, x?: number, y?: number, resizable?: boolean,
   *           minWidth?: number, minHeight?: number, closable?: boolean, onClose?: 'hide'|'destroy'|'none', hidden?: boolean, root?: Element }} o
   *   width·height·min* 는 디자인 단위(배율이 곱해짐), x·y 는 화면 px(없으면 가운데)
   */
  constructor(o = {}) {
    ensureSetup();
    this.opts = { width: 760, height: 900, minWidth: 480, minHeight: 360, closable: true, onClose: 'hide', ...o };
    this.handlers = {};
    const root = o.root || getLayer();
    const el = this.el = h('div', 'a2 a2-panel', root);
    el.setAttribute('role', 'dialog');
    this.head = h('div', 'a2-panel-head', el);
    this.titleEl = h('div', 'a2-panel-title', this.head, o.title || '');
    if (this.opts.closable) {
      this.closeBtn = h('button', 'a2-panel-close', this.head);
      this.closeBtn.type = 'button'; this.closeBtn.setAttribute('aria-label', '닫기');
      icon('x', '', this.closeBtn);
      this.closeBtn.addEventListener('pointerdown', e => e.stopPropagation());
      this.closeBtn.addEventListener('click', () => this.close());
    }
    this.body = h('div', 'a2-panel-body', el);
    this.setSize(this.opts.width, this.opts.height);
    el.addEventListener('pointerdown', () => this.focus(), true);
    this.wireDrag();
    if (this.opts.resizable) this.wireResize();
    this.visible = !o.hidden;
    el.hidden = !!o.hidden;
    requestAnimationFrame(() => this.place(o.x, o.y));
    this.place(o.x, o.y);
    this.focus();
  }
  on(n, fn) { (this.handlers[n] ||= new Set()).add(fn); return this; }
  emit(n, ...a) { for (const fn of this.handlers[n] || []) fn(...a, this); }
  get scale() { return scaleOf(this.el); }
  setTitle(t) { this.titleEl.textContent = t; this.el.setAttribute('aria-label', t); return this; }
  setSize(w, ht) { this.w = Math.max(this.opts.minWidth, w); this.h = Math.max(this.opts.minHeight, ht); this.el.style.setProperty('--a2-pw', this.w); this.el.style.setProperty('--a2-ph', this.h); return this; }
  place(x, y) {
    const p = this.el.parentElement; if (!p) return this;
    const W = p.clientWidth || innerWidth, H = p.clientHeight || innerHeight, w = this.el.offsetWidth, ht = this.el.offsetHeight;
    this.x = x ?? Math.round((W - w) / 2); this.y = y ?? Math.round(Math.max(8, (H - ht) / 2));
    this.el.style.translate = `${this.x}px ${this.y}px`;
    return this;
  }
  /** 맨 위로 (DOM 을 옮기지 않고 z-index 로) */
  focus() { if (+this.el.style.zIndex !== topZ) this.el.style.zIndex = String(++topZ); return this; }
  show() {
    if (this.visible) return this.focus();
    this.visible = true; this.el.hidden = false; this.focus();
    this._t && this._t.kill();
    this._t = animate({ p: 0 }, { p: 1 }, { duration: 0.24, ease: 'OutCubic', onUpdate: ({ p }) => { this.el.style.opacity = p; this.el.style.scale = 0.96 + 0.04 * p; } });
    this.emit('show');
    return this;
  }
  hide() {
    if (!this.visible) return this;
    this.visible = false;
    this._t && this._t.kill();
    this._t = animate({ p: 1 }, { p: 0 }, { duration: 0.16, ease: 'OutSine', onUpdate: ({ p }) => { this.el.style.opacity = p; this.el.style.scale = 0.97 + 0.03 * p; }, onDone: () => { if (!this.visible) this.el.hidden = true; } });
    this.emit('hide');
    return this;
  }
  toggle() { return this.visible ? this.hide() : this.show(); }
  /** 닫기 버튼과 같다. onClose 옵션에 따라 숨기거나 없앤다 */
  close() {
    this.emit('close');
    if (this.opts.onClose === 'destroy') this.destroy(); else if (this.opts.onClose === 'hide') this.hide();
    return this;
  }
  destroy() { this.el.remove(); this.emit('destroy'); }
  wireDrag() {
    let d = null;
    this.head.addEventListener('pointerdown', e => {
      if (e.button !== 0) return;
      d = { x: e.clientX, y: e.clientY, ox: this.x, oy: this.y };
      try { this.head.setPointerCapture(e.pointerId); } catch (_) {}
      this.el.classList.add('a2-moving');
    });
    this.head.addEventListener('pointermove', e => {
      if (!d) return;
      const p = this.el.parentElement, keep = 80;
      this.x = Math.min(Math.max(d.ox + e.clientX - d.x, keep - this.el.offsetWidth), (p.clientWidth || innerWidth) - keep);
      this.y = Math.min(Math.max(d.oy + e.clientY - d.y, 0), (p.clientHeight || innerHeight) - 40);
      this.el.style.translate = `${this.x}px ${this.y}px`;
    });
    const end = () => { if (d) { d = null; this.el.classList.remove('a2-moving'); this.emit('move', this.x, this.y); } };
    this.head.addEventListener('pointerup', end); this.head.addEventListener('pointercancel', end);
  }
  wireResize() {
    for (const dir of ['e', 's', 'se', 'w', 'sw']) {
      const g = h('div', `a2-grip a2-grip-${dir}`, this.el);
      let d = null;
      g.addEventListener('pointerdown', e => { if (e.button) return; e.stopPropagation(); d = { x: e.clientX, y: e.clientY, w: this.w, h: this.h, ox: this.x }; try { g.setPointerCapture(e.pointerId); } catch (_) {} });
      g.addEventListener('pointermove', e => {
        if (!d) return;
        const s = this.scale, dx = (e.clientX - d.x) / s, dy = (e.clientY - d.y) / s;
        let w = d.w, ht = d.h;
        if (dir.includes('e')) w = d.w + dx;
        if (dir.includes('w')) w = d.w - dx;
        if (dir.includes('s')) ht = d.h + dy;
        this.setSize(w, ht);
        if (dir.includes('w')) { this.x = d.ox + (d.w - this.w) * s; this.el.style.translate = `${this.x}px ${this.y}px`; }
      });
      const end = () => { if (d) { d = null; this.emit('resize', this.w, this.h); } };
      g.addEventListener('pointerup', end); g.addEventListener('pointercancel', end);
    }
  }
}

/** 패널을 만든다. panel.ui 로 내용을 채운다 */
export const panel = o => new Panel(o);
