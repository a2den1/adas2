// 창과 창 관리자. 구조·끌기·크기 조절·겹침 순서만 맡는다.
// 닫기 버튼은 창을 닫지 않고 'closeRequested' 를 알린다 — 숨기거나 지우는 건 쓰는 쪽이 정한다.
import { ensureDefaults } from './context.js';
import { h, icon, userIcon, resolveParent, scaleOf, resolveOptions } from './dom.js';

export const WindowOptions = {
  id: null, title: 'Window', size: [640, 480], position: null,
  icon: null, iconSize: 40, showCloseButton: true, draggable: true,
  resizable: false, minSize: [900, 500], showOutline: false, clipContent: false,
  topBarHeight: 72, padding: 12, panelColor: null, topBarColor: null,
  titleFontSize: null, bringToFrontOnFocus: true,
};

export class A2Window {
  constructor(manager, opts) {
    ensureDefaults();
    const o = this.opts = resolveOptions(WindowOptions, opts);
    this.id = o.id || o.title;
    this.manager = manager;
    this.handlers = {};
    const el = this.el = h('div', 'a2 a2-window', manager ? manager.root : null);
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', o.title);
    el.style.setProperty('--a2-top', o.topBarHeight);
    el.style.setProperty('--a2-pad', o.padding);
    el.style.setProperty('--a2-icon', o.iconSize);
    if (o.titleFontSize) el.style.setProperty('--a2-title-fs', o.titleFontSize);
    if (o.panelColor) el.style.setProperty('--a2-panel-bg', o.panelColor);
    if (o.topBarColor) el.style.setProperty('--a2-top-bar', o.topBarColor);
    if (o.clipContent) el.classList.add('a2-clip');
    this.topBar = h('div', 'a2-win-top', el);
    this.iconEl = null;
    this.titleEl = h('div', 'a2-win-title', this.topBar, o.title);
    this.setIcon(o.icon);
    if (o.showCloseButton) {
      this.closeBtn = h('button', 'a2-win-close', this.topBar);
      this.closeBtn.type = 'button';
      this.closeBtn.setAttribute('aria-label', '닫기');
      h('span', 'a2-win-close-bg', this.closeBtn);
      icon('x', '', this.closeBtn);
      this.closeBtn.addEventListener('click', () => this.emit('closeRequested', this));
      this.closeBtn.addEventListener('pointerdown', e => e.stopPropagation());
    }
    this.content = h('div', 'a2-win-content', el);
    if (o.showOutline) h('div', 'a2-win-outline', el);
    this.setSize(o.size[0], o.size[1]);
    requestAnimationFrame(() => this.setPosition(o.position));
    this.setPosition(o.position);
    el.addEventListener('pointerdown', () => { this.emit('focused', this); if (o.bringToFrontOnFocus) this.bringToFront(); }, true);
    if (o.draggable) this.wireDrag();
    if (o.resizable) this.wireResize();
  }
  /** 이벤트: 'closeRequested', 'focused', 'moved', 'resized' */
  on(name, fn) { (this.handlers[name] ||= new Set()).add(fn); return () => this.handlers[name].delete(fn); }
  emit(name, ...a) { for (const fn of this.handlers[name] || []) fn(...a); }
  get scale() { return scaleOf(this.el); }
  setTitle(t) { this.titleEl.textContent = t; this.el.setAttribute('aria-label', t); }
  setIcon(spec) {
    if (this.iconEl) { this.iconEl.remove(); this.iconEl = null; }
    if (spec) { this.iconEl = userIcon(spec, 'a2-win-icon', null); this.topBar.prepend(this.iconEl); }
    this.el.classList.toggle('a2-has-icon', !!spec);
  }
  /** 디자인 단위로 크기 */
  setSize(w, ht) { w = Math.max(120, +w || 0); ht = Math.max(this.opts.topBarHeight + 40, +ht || 0); this.w = w; this.h = ht; this.el.style.setProperty('--a2-w', w); this.el.style.setProperty('--a2-hh', ht); }
  /** 가운데 기준 위치(디자인 단위). null 이면 가운데 */
  setPosition(p) {
    const root = this.el.parentElement; if (!root) return;
    const s = this.scale, rw = root.clientWidth, rh = root.clientHeight;
    const cx = rw / 2 + (p ? p[0] * s : 0), cy = rh / 2 + (p ? p[1] * s : 0);
    this.x = cx - (this.w * s) / 2; this.y = cy - (this.h * s) / 2;
    this.applyPos();
  }
  applyPos() { this.el.style.transform = `translate(${Math.round(this.x)}px, ${Math.round(this.y)}px)`; }
  bringToFront() { if (this.manager) this.manager.bringToFront(this); else if (this.el.parentElement) this.el.parentElement.appendChild(this.el); }
  show() { this.el.hidden = false; this.bringToFront(); }
  hide() { this.el.hidden = true; }
  get visible() { return !this.el.hidden; }
  wireDrag() {
    let d = null;
    this.topBar.addEventListener('pointerdown', e => {
      if (e.button !== 0) return;
      d = { x: e.clientX, y: e.clientY, ox: this.x, oy: this.y };
      try { this.topBar.setPointerCapture(e.pointerId); } catch (_) {}
      this.el.classList.add('a2-dragging');
    });
    this.topBar.addEventListener('pointermove', e => {
      if (!d) return;
      const root = this.el.parentElement, wpx = this.el.offsetWidth, hpx = this.el.offsetHeight;
      const s = this.scale, keep = 60 * s;
      this.x = Math.min(Math.max(d.ox + e.clientX - d.x, keep - wpx), root.clientWidth - keep);
      this.y = Math.min(Math.max(d.oy + e.clientY - d.y, 0), root.clientHeight - keep);
      this.applyPos();
    });
    const end = () => { if (d) { d = null; this.el.classList.remove('a2-dragging'); this.emit('moved', this); } };
    this.topBar.addEventListener('pointerup', end);
    this.topBar.addEventListener('pointercancel', end);
  }
  wireResize() {
    this.el.classList.add('a2-resizable');
    for (const dir of ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw']) {
      const hd = h('div', `a2-win-resize a2-rs-${dir}`, this.el);
      let d = null;
      hd.addEventListener('pointerdown', e => {
        if (e.button !== 0) return;
        e.stopPropagation();
        d = { x: e.clientX, y: e.clientY, w: this.w, h: this.h, ox: this.x, oy: this.y };
        try { hd.setPointerCapture(e.pointerId); } catch (_) {}
      });
      hd.addEventListener('pointermove', e => {
        if (!d) return;
        const s = this.scale, dx = (e.clientX - d.x) / s, dy = (e.clientY - d.y) / s;
        const [mw, mh] = this.opts.minSize;
        let w = d.w, ht = d.h, x = d.ox, y = d.oy;
        if (dir.includes('e')) w = Math.max(mw, d.w + dx);
        if (dir.includes('s')) ht = Math.max(mh, d.h + dy);
        if (dir.includes('w')) { w = Math.max(mw, d.w - dx); x = d.ox + (d.w - w) * s; }
        if (dir.includes('n')) { ht = Math.max(mh, d.h - dy); y = d.oy + (d.h - ht) * s; }
        this.setSize(w, ht); this.x = x; this.y = y; this.applyPos();
      });
      const end = () => { if (d) { d = null; this.emit('resized', this); } };
      hd.addEventListener('pointerup', end); hd.addEventListener('pointercancel', end);
    }
  }
  dispose() { this.el.remove(); if (this.manager) this.manager.windows.delete(this); }
}

export class WindowManager {
  /** root 안에 창을 띄운다. root 는 position 이 정해진 요소(기본: 화면 전체 고정 레이어) */
  static create(root) { return new WindowManager(root); }
  constructor(root) {
    ensureDefaults();
    let r = resolveParent(root);
    if (!r) { r = h('div', 'a2-window-layer', document.body); }
    this.root = r;
    r.classList.add('a2-window-root');
    this.windows = new Set();
  }
  create(opts) {
    const w = new A2Window(this, opts);
    this.windows.add(w);
    return w;
  }
  get(id) { for (const w of this.windows) if (w.id === id) return w; return null; }
  bringToFront(w) { this.root.appendChild(w.el); }
}
