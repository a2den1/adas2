/*! adas2 v1.1.2 | (c) 2026 a2den1 | adas2 License: 사용 자유, 수정·2차 배포 금지 | https://github.com/a2den1/adas2 */
/* adas2 — UI framework
   상태 변화는 스프링 애니메이션(adas2.Motion)으로 처리한다.
   <link rel="stylesheet" href="adas2.css"> + <script src="adas2.js"></script> 만 넣으면 a2-* 태그를 쓸 수 있다.
   아이콘은 Font Awesome 6 (fa-solid) 을 쓴다. */
(() => {
  'use strict';

  /* ───────────── 스프링 엔진 ───────────── */
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const SP = {
    base: { k: 380, c: 35 },    // ζ≈0.9, 약 300ms. 출렁임 거의 없음
    fast: { k: 640, c: 46 },    // 앞쪽 끝
    slow: { k: 220, c: 27 },    // 뒤쪽 끝
    press: { k: 900, c: 54 },   // 누름 반응
  };
  const live = new Set();
  let raf = 0, last = 0;
  function frame(now, slow) {
    raf = 0;
    let dt = (now - last) / 1000; last = now;
    if (!(dt > 0)) dt = 1 / 60;
    dt = Math.min(dt, slow ? 0.25 : 1 / 30); // 타이머가 느려진 탭에서도 실제 시간대로 끝나게
    for (const m of [...live]) m.step(dt);
    if (live.size) raf = requestAnimationFrame(frame);
  }
  function wake() { if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); } }
  // 숨은 탭 등에서 rAF 가 멈추면 직접 돌린다
  setInterval(() => {
    if (live.size && performance.now() - last > 90) { if (raf) cancelAnimationFrame(raf); raf = 0; frame(performance.now(), true); }
  }, 60);

  class Motion {
    constructor(init, render, spring = SP.base) {
      this.v = { ...init }; this.t = { ...init }; this.vel = {}; this.sp = {};
      for (const k in init) this.vel[k] = 0;
      this.def = spring; this.render = render; this.onRest = null;
      render(this.v, this);
    }
    to(target, springs, onRest) {
      for (const k in target) {
        if (!(k in this.v)) { this.v[k] = target[k]; this.vel[k] = 0; }
        this.t[k] = target[k];
      }
      if (springs) Object.assign(this.sp, springs);
      if (onRest !== undefined) this.onRest = onRest;
      if (reduce.matches) return this.set(target);
      live.add(this); wake();
      return this;
    }
    set(target) {
      for (const k in target) { this.v[k] = this.t[k] = target[k]; this.vel[k] = 0; }
      live.delete(this);
      this.render(this.v, this);
      const f = this.onRest; this.onRest = null; if (f) f(this);
      return this;
    }
    step(dt) {
      const n = Math.max(1, Math.ceil(dt / 0.004)), h = dt / n;
      let rest = true;
      for (const k in this.t) {
        const s = this.sp[k] || this.def, T = this.t[k];
        let x = this.v[k], v = this.vel[k];
        for (let i = 0; i < n; i++) { v += (-s.k * (x - T) - s.c * v) * h; x += v * h; }
        if (Math.abs(x - T) < 1e-3 && Math.abs(v) < 1e-2) { x = T; v = 0; } else rest = false;
        this.v[k] = x; this.vel[k] = v;
      }
      this.render(this.v, this);
      if (rest) { live.delete(this); const f = this.onRest; this.onRest = null; if (f) f(this); }
    }
  }

  /* ───────────── 도움 함수 ───────────── */
  const u = n => `calc(var(--u) * ${+n.toFixed(3)})`;
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const lerp = (a, b, p) => a + (b - a) * p;
  const rgb = h => h[0] === '#' ? [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)) : (h.match(/[\d.]+/g) || [0, 0, 0]).slice(0, 3).map(Number);
  const mix = (a, b, p) => { p = clamp(p); const A = rgb(a), B = rgb(b); return `rgb(${A.map((x, i) => Math.round(lerp(x, B[i], p))).join(',')})`; };
  const C = {
    orange: '#FF793F', ink: '#3E3E3E', muted: '#838383', field: '#505050', date: '#515151', black: '#000000', white: '#FFFFFF',
  };
  const unitOf = (el, designPx) => el.getBoundingClientRect().width / designPx || 1;
  const emit = (el, type, detail) => el.dispatchEvent(new CustomEvent(type, { bubbles: true, detail }));
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function press(el, down, up) {
    el.addEventListener('pointerdown', e => { if (e.button === 0) down(e); });
    for (const t of ['pointerup', 'pointercancel', 'pointerleave']) el.addEventListener(t, up);
  }
  function keyClick(el) {
    el.addEventListener('keydown', e => {
      if (e.target !== el) return;
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); }
    });
  }

  class Base extends HTMLElement {
    connectedCallback() {
      if (this._built) return;
      this._built = true;
      this.classList.add('a2');
      this.build();
    }
    build() {}
  }

  /* ───────────── 버튼 ───────────── */
  class A2Button extends Base {
    static get observedAttributes() { return ['loading']; }
    build() {
      this.setAttribute('role', 'button');
      if (!this.hasAttribute('tabindex')) this.tabIndex = 0;
      const m = new Motion({ s: 1 }, v => { this.style.transform = v.s === 1 ? '' : `scale(${v.s})`; }, SP.press);
      press(this, () => m.to({ s: 0.955 }), () => m.to({ s: 1 }, { s: SP.base }));
      this.addEventListener('pointerdown', () => { m.sp.s = SP.press; });
      keyClick(this);
      this.syncLoading();
    }
    // loading 속성: 글자 대신 로딩 표시, 누를 수 없음
    syncLoading() {
      const on = this.hasAttribute('loading');
      let sp = this.querySelector(':scope > .a2-btn-spin');
      if (on && !sp) {
        sp = document.createElement('a2-loading');
        sp.className = 'a2-btn-spin';
        if (this.getAttribute('tone') !== 'soft') sp.setAttribute('tone', 'white');
        this.appendChild(sp);
      }
      if (!on && sp) sp.remove();
      this.setAttribute('aria-busy', on);
    }
    attributeChangedCallback() { if (this._built) this.syncLoading(); }
  }

  /* ───────────── 슬라이드바 ───────────── */
  class A2Slider extends Base {
    static get observedAttributes() { return ['value']; }
    build() {
      this.min = +(this.getAttribute('min') ?? 0);
      this.max = +(this.getAttribute('max') ?? 100);
      this.step = +(this.getAttribute('step') ?? 1);
      this._v = this.clampV(+(this.getAttribute('value') ?? this.min));
      this.setAttribute('role', 'slider');
      if (!this.hasAttribute('tabindex')) this.tabIndex = 0;
      this.innerHTML = '<div class="a2-slider-track"></div><div class="a2-slider-thumb"><span class="a2-slider-out"></span></div>';
      this.thumb = this.querySelector('.a2-slider-thumb');
      this.out = this.querySelector('.a2-slider-out');
      const always = () => this.hasAttribute('output');
      this.m = new Motion({ x: this.frac(), o: always() ? 1 : 0 }, v => {
        this.thumb.style.transform = `translateX(${u(v.x * 710)})`;
        const o = clamp(v.o);
        this.out.style.opacity = o;
        this.out.style.filter = o > 0.999 ? '' : `blur(${u((1 - o) * 10)})`;
      });
      this.paintText();
      let drag = false;
      const fromX = e => {
        const r = this.getBoundingClientRect(), k = r.width / 880;
        const f = clamp(((e.clientX - r.left) / k - 85) / 710);
        this.setValue(this.min + f * (this.max - this.min), true);
      };
      this.addEventListener('pointerdown', e => {
        if (e.button !== 0) return;
        drag = this._drag = true; try { this.setPointerCapture(e.pointerId); } catch (_) {}
        this.m.to({ o: 1 }); fromX(e);
      });
      this.addEventListener('pointermove', e => { if (drag) fromX(e); });
      const end = () => {
        if (!drag) return; drag = this._drag = false;
        if (!always()) this.m.to({ o: 0 });
        emit(this, 'change', { value: this._v });
      };
      this.addEventListener('pointerup', end);
      this.addEventListener('pointercancel', end);
      this.addEventListener('keydown', e => {
        const big = (this.max - this.min) / 10;
        const d = { ArrowRight: this.step, ArrowUp: this.step, ArrowLeft: -this.step, ArrowDown: -this.step, PageUp: big, PageDown: -big }[e.key];
        if (e.key === 'Home') this.setValue(this.min, true);
        else if (e.key === 'End') this.setValue(this.max, true);
        else if (d) this.setValue(this._v + d, true);
        else return;
        e.preventDefault();
        emit(this, 'change', { value: this._v });
      });
    }
    clampV(v) { const s = this.step || 1; return clamp(Math.round((v - this.min) / s) * s + this.min, this.min, this.max); }
    frac() { return (this._v - this.min) / ((this.max - this.min) || 1); }
    paintText() { this.out.textContent = `${Math.round(this.frac() * 100)}%`; this.setAttribute('aria-valuenow', this._v); }
    setValue(v, user) {
      const nv = this.clampV(v);
      if (nv === this._v && this.m) return;
      this._v = nv;
      if (!this.m) return;
      this.m.to({ x: this.frac() }, { x: this._drag ? SP.fast : SP.base });
      this.paintText();
      if (user) emit(this, 'input', { value: nv });
    }
    get value() { return this._v; }
    set value(v) { this.setValue(+v); }
    attributeChangedCallback(n, o, v) { if (this._built && o !== v) this.setValue(+v); }
  }

  /* ───────────── 드롭다운 ─────────────
     펼치면 흰 면이 아래로 길어지며 목록이 보이고, 고른 항목이 맨 위 칸으로 옮겨진다. */
  const DD = { top: { x: 39.6, y: 55.3, s: 1 }, list: { x: 39.25, y: 155.85, s: 0.75 }, pitch: 62.1, pad: 20.8, gap: 12, padR: 50 };
  class A2Dropdown extends Base {
    build() {
      const src = [...this.querySelectorAll('option')];
      this.opts = src.map(o => ({ label: o.textContent.trim(), value: o.getAttribute('value') ?? o.textContent.trim() }));
      let sel = this.opts.findIndex(o => o.value === this.getAttribute('value'));
      if (sel < 0) sel = Math.max(0, src.findIndex(o => o.hasAttribute('selected')));
      this.sel = sel; this.open = false; this.fit = this.hasAttribute('fit');
      this.setAttribute('role', 'combobox');
      this.setAttribute('aria-expanded', 'false');
      if (!this.hasAttribute('tabindex')) this.tabIndex = 0;
      this.innerHTML = '<div class="a2-dd-field"><span class="a2-dd-measure"></span></div><div class="a2-dd-toggle"><i class="fa-solid fa-chevron-down a2-dd-chev"></i></div>';
      this.field = this.querySelector('.a2-dd-field');
      this.toggleEl = this.querySelector('.a2-dd-toggle');
      this.chev = this.querySelector('.a2-dd-chev');
      this.measureEl = this.querySelector('.a2-dd-measure');
      this.items = this.opts.map((o, i) => {
        const el = document.createElement('div');
        el.className = 'a2-dd-item'; el.textContent = o.label; el.setAttribute('role', 'option');
        this.field.appendChild(el);
        el.addEventListener('click', e => { if (this.open) { e.stopPropagation(); this.select(i, true); } });
        const m = new Motion({ x: 0, y: 0, s: 1, c: 0 }, v => {
          el.style.transform = `translate(${u(v.x)}, ${u(v.y)}) scale(${v.s})`;
          el.style.color = mix(C.ink, C.muted, v.c);
          this.fadeItem(el, v.c);
        });
        return { el, m };
      });
      this.widths = this.opts.map(() => 0);
      this.measure();
      this.m = new Motion({ p: 0, w: this.fieldW() }, v => this.paint(v));
      this.place(false);
      document.fonts && document.fonts.ready.then(() => { this.measure(); this.m.set({ w: this.fieldW() }); });

      this.addEventListener('click', () => this.toggle());
      document.addEventListener('pointerdown', e => { if (this.open && !this.contains(e.target)) this.close(); });
      this.addEventListener('keydown', e => {
        if (e.target !== this) return;
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.toggle(); }
        else if (e.key === 'Escape') this.close();
        else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault();
          const n = this.opts.length, d = e.key === 'ArrowDown' ? 1 : -1;
          this.select((this.sel + d + n) % n, true, true);
        }
      });
    }
    // 목록 자리(c=1)에 있는 항목은 펼쳐진 만큼만 보인다. 맨 위로 올라가는 항목은 c 가 줄며 계속 보인다.
    fadeItem(el, c) {
      const o = lerp(1, clamp(this._p || 0), clamp(c));
      el.style.opacity = o;
      el.style.filter = o > 0.999 ? '' : `blur(${u((1 - o) * 6)})`;
    }
    measure() {
      const k = unitOf(this.toggleEl, 170);
      this.widths = this.opts.map(o => { this.measureEl.textContent = o.label; return this.measureEl.getBoundingClientRect().width / k; });
      // 겉 폭(레이아웃)은 가장 넓은 상태로 고정한다. 애니메이션 중 옆 요소가 밀리지 않도록.
      const maxW = this.fit ? DD.top.x + Math.max(0, ...this.widths) + DD.padR : 363;
      this.style.width = u(maxW + DD.gap + 170);
    }
    fieldW() {
      if (!this.fit) return 363;
      const w = this.open ? Math.max(...this.widths) : this.widths[this.sel];
      return DD.top.x + w + DD.padR;
    }
    paint(v) {
      const p = v.p, extra = (this.opts.length - 1) * DD.pitch + DD.pad;
      this._p = p;
      if (this.items) for (const it of this.items) this.fadeItem(it.el, it.m.v.c);
      this.field.style.height = u(170 + extra * Math.max(0, p));
      this.field.style.width = u(v.w);
      this.field.style.borderBottomRightRadius = u(40 * clamp(p));
      this.toggleEl.style.left = u(v.w + DD.gap);
      const cx = lerp(81.5, 82.5, p), cy = lerp(86.5, 83.5, p);
      this.chev.style.transform = `translate(${u(cx - 38.5)}, ${u(cy - 43.1)}) rotate(${180 * p}deg)`;
    }
    place(anim) {
      const order = [this.sel, ...this.opts.map((_, i) => i).filter(i => i !== this.sel)];
      order.forEach((idx, j) => {
        const t = j === 0 ? { ...DD.top, c: 0 } : { x: DD.list.x, y: DD.list.y + (j - 1) * DD.pitch, s: DD.list.s, c: 1 };
        this.items[idx].el.setAttribute('aria-selected', j === 0);
        anim ? this.items[idx].m.to(t) : this.items[idx].m.set(t);
      });
    }
    setOpen(o) {
      if (this.open === o) return;
      this.open = o;
      this.setAttribute('aria-expanded', o);
      if (o) this.style.zIndex = 20;
      this.m.to({ p: o ? 1 : 0, w: this.fieldW() }, null, o ? null : () => { if (!this.open) this.style.zIndex = ''; });
      emit(this, o ? 'open' : 'close');
    }
    toggle() { this.setOpen(!this.open); }
    close() { this.setOpen(false); }
    select(i, user, keepOpen) {
      const changed = i !== this.sel;
      this.sel = i;
      this.place(true);
      if (!keepOpen) this.close();
      this.m.to({ w: this.fieldW() });
      if (changed && user) emit(this, 'change', { value: this.value, index: i });
    }
    get value() { return this.opts[this.sel] && this.opts[this.sel].value; }
    set value(v) { const i = this.opts.findIndex(o => o.value === String(v)); if (i >= 0) this.select(i, false, true); }
    get selectedIndex() { return this.sel; }
  }

  /* ───────────── 텍스트 필드 ─────────────
     제목이 위로 올라가며 작아지고 주황으로 바뀐다(플로팅 라벨). */
  const TF = { rest: { x: 52.6, y: 61.8, s: 1 }, float: { x: 35.4, y: 30.5, s: 38 / 49.6 } };
  class A2Textfield extends Base {
    build() {
      this.innerHTML = '<span class="a2-tf-label"></span><input class="a2-tf-input" type="text">';
      this.label = this.querySelector('.a2-tf-label');
      this.input = this.querySelector('.a2-tf-input');
      this.label.textContent = this.getAttribute('label') ?? '';
      this.input.value = this.getAttribute('value') ?? '';
      if (this.hasAttribute('name')) this.input.name = this.getAttribute('name');
      if (this.hasAttribute('type')) this.input.type = this.getAttribute('type');
      this.input.setAttribute('aria-label', this.label.textContent);
      const up = () => document.activeElement === this.input || this.input.value !== '';
      this.m = new Motion({ p: up() ? 1 : 0 }, v => {
        const p = v.p, a = TF.rest, b = TF.float;
        this.label.style.transform = `translate(${u(lerp(a.x, b.x, p))}, ${u(lerp(a.y, b.y, p))}) scale(${lerp(a.s, b.s, p)})`;
        this.label.style.color = mix(C.field, C.orange, p);
        this.input.style.opacity = clamp(p * 1.5);
      });
      this.addEventListener('pointerdown', e => { if (e.target !== this.input) { e.preventDefault(); this.input.focus(); } });
      this.input.addEventListener('focus', () => this.m.to({ p: 1 }));
      this.input.addEventListener('blur', () => { if (!this.input.value) this.m.to({ p: 0 }); });
      this.input.addEventListener('input', () => emit(this, 'input', { value: this.input.value }));
      this.input.addEventListener('change', () => emit(this, 'change', { value: this.input.value }));
    }
    get value() { return this.input ? this.input.value : this.getAttribute('value') ?? ''; }
    set value(v) { if (!this.input) return this.setAttribute('value', v); this.input.value = v; this.m.to({ p: (v || document.activeElement === this.input) ? 1 : 0 }); }
    focus() { this.input && this.input.focus(); }
  }

  /* ───────────── 스플릿 버튼 ─────────────
     고른 칸은 325, 이웃은 241 로 늘어난다. menu 칸은 그 자리에서 250×250 판으로 변한다. */
  const SPL = { w: 171, gap: 11, r: 37, sel: 325, near: 241, menu: 250, menuR: 63 };
  class A2Split extends Base {
    build() {
      this.items = [...this.children].filter(c => c.tagName === 'A2-SPLIT-ITEM');
      this.sel = this.items.findIndex(i => i.hasAttribute('selected'));
      this.setAttribute('role', 'group');
      this.items.forEach((it, i) => {
        it.classList.add('a2');
        it.setAttribute('role', 'button');
        if (!it.hasAttribute('tabindex')) it.tabIndex = 0;
        keyClick(it);
        it._open = it.hasAttribute('open');
        it._m = new Motion({ x: 0, w: SPL.w, h: SPL.w, tl: 0, tr: 0, br: 0, bl: 0, s: 1 }, v => {
          it.style.transform = `translateX(${u(v.x)})` + (v.s !== 1 ? ` scale(${v.s})` : '');
          it.style.width = u(v.w); it.style.height = u(v.h);
          it.style.borderRadius = `${u(v.tl)} ${u(v.tr)} ${u(v.br)} ${u(v.bl)}`;
        });
        press(it, () => it._m.to({ s: 0.96 }, { s: SP.press }), () => it._m.to({ s: 1 }, { s: SP.base }));
        it.addEventListener('click', () => {
          if (it.hasAttribute('menu')) { it._open = !it._open; it.toggleAttribute('open', it._open); emit(it, it._open ? 'open' : 'close'); }
          else { this.sel = this.sel === i ? -1 : i; emit(this, 'change', { index: this.sel }); }
          this.layout(true);
        });
      });
      this.layout(false);
      document.addEventListener('pointerdown', e => {
        if (this.contains(e.target)) return;
        let any = false;
        for (const it of this.items) if (it._open) { it._open = false; it.removeAttribute('open'); any = true; }
        if (any) this.layout(true);
      });
    }
    layout(anim) {
      const n = this.items.length; let x = 0;
      this.items.forEach((it, i) => {
        const first = i === 0, lastI = i === n - 1;
        let w = SPL.w, h = SPL.w, r = [first ? SPL.r : 0, lastI ? SPL.r : 0, lastI ? SPL.r : 0, first ? SPL.r : 0];
        if (it._open) { w = h = SPL.menu; r = [first ? SPL.menuR : 0, SPL.menuR, SPL.menuR, SPL.menuR]; }
        else if (this.sel >= 0 && !it.hasAttribute('menu')) {
          if (i === this.sel) w = SPL.sel; else if (Math.abs(i - this.sel) === 1) w = SPL.near;
        }
        it.setAttribute('aria-pressed', i === this.sel);
        it.style.zIndex = it._open ? 5 : '';
        const t = { x, w, h, tl: r[0], tr: r[1], br: r[2], bl: r[3] };
        anim ? it._m.to(t) : it._m.set(t);
        x += w + SPL.gap;
      });
      this.style.width = u(x - SPL.gap);
    }
    get selectedIndex() { return this.sel; }
    set selectedIndex(i) { this.sel = +i; this.layout(true); }
  }
  class A2SplitItem extends HTMLElement {}

  /* ───────────── 플로팅 내비게이션바 ─────────────
     아래 주황 탭이 앞쪽 끝은 빨리, 뒤쪽 끝은 늦게 따라가며 늘었다 줄어든다. */
  const NAV = {
    centers3: [153, 373.5, 585],
    icon: { house: { f: 100, cy: 128 }, 'magnifying-glass': { f: 109, cy: 127.5 }, user: { f: 110, cy: 125 } },
    def: { f: 104, cy: 127 }, ind: 148, dim: [1, 0.84, 0.64, 0.5],
  };
  class A2Navbar extends Base {
    build() {
      this.items = [...this.children].filter(c => c.tagName === 'A2-NAV-ITEM');
      const n = this.items.length;
      this.centers = n === 3 ? NAV.centers3 : this.items.map((_, i) => n === 1 ? 375.5 : lerp(153, 598, i / (n - 1)));
      this.sel = Math.max(0, +(this.getAttribute('value') ?? this.items.findIndex(i => i.hasAttribute('selected'))));
      this.setAttribute('role', 'tablist');
      this.ind = document.createElement('div'); this.ind.className = 'a2-nav-ind';
      this.appendChild(this.ind);
      this.items.forEach((it, i) => {
        it.classList.add('a2');
        it.setAttribute('role', 'tab');
        if (!it.hasAttribute('tabindex')) it.tabIndex = 0;
        keyClick(it);
        const name = it.getAttribute('icon') || 'circle';
        const cfg = NAV.icon[name] || NAV.def;
        it.innerHTML = `<i class="fa-solid fa-${esc(name)}"></i>`;
        const ic = it.firstChild;
        ic.style.fontSize = u(cfg.f);
        it.style.left = u(this.centers[i]); it.style.top = u(cfg.cy);
        it._m = new Motion({ p: 0, o: 1, s: 1 }, v => {
          ic.style.color = mix(C.black, C.orange, v.p);
          ic.style.opacity = lerp(v.o, 1, clamp(v.p));
          ic.style.transform = `translate(-50%, -50%) scale(${v.s})`;
        });
        press(it, () => it._m.to({ s: 0.9 }, { s: SP.press }), () => it._m.to({ s: 1 }, { s: SP.base }));
        it.addEventListener('click', () => this.select(i, true));
      });
      const c0 = this.centers[this.sel];
      this.im = new Motion({ l: c0 - NAV.ind / 2, r: c0 + NAV.ind / 2 }, v => {
        this.ind.style.transform = `translateX(${u(v.l)})`;
        this.ind.style.width = u(Math.max(v.r - v.l, 24));
      });
      this.paintItems(false);
      this.addEventListener('keydown', e => {
        const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        if (!d) return;
        const i = clamp(this.sel + d, 0, n - 1);
        this.select(i, true); this.items[i].focus();
      });
    }
    paintItems(anim) {
      this.items.forEach((it, i) => {
        const d = Math.abs(i - this.sel);
        const t = { p: d === 0 ? 1 : 0, o: NAV.dim[Math.min(d, NAV.dim.length - 1)] };
        it.setAttribute('aria-selected', d === 0);
        anim ? it._m.to(t) : it._m.set(t);
      });
    }
    select(i, user) {
      if (i === this.sel) return;
      const right = i > this.sel; this.sel = i;
      const c = this.centers[i];
      this.im.to({ l: c - NAV.ind / 2, r: c + NAV.ind / 2 }, right ? { r: SP.fast, l: SP.slow } : { l: SP.fast, r: SP.slow });
      this.paintItems(true);
      if (user) emit(this, 'change', { index: i });
    }
    get value() { return this.sel; }
    set value(i) { this.select(+i); }
  }
  class A2NavItem extends HTMLElement {}

  /* ───────────── 앱바 ───────────── */
  class A2Appbar extends Base {
    static get observedAttributes() { return ['heading', 'back']; }
    build() {
      this.innerHTML = '<div class="a2-ab-back" role="button" aria-label="뒤로" tabindex="0"><i class="fa-solid fa-chevron-left"></i></div>';
      this.backEl = this.firstChild;
      keyClick(this.backEl);
      this.cur = this.makeTitle(this.getAttribute('heading') ?? '');
      this.cur._m.set({ y: 0, o: 1 });
      const hasBack = () => this.hasAttribute('back');
      this.bm = new Motion({ b: hasBack() ? 1 : 0, s: 1 }, v => {
        this.backEl.style.opacity = clamp(v.b);
        this.backEl.style.transform = `translateX(${u((1 - v.b) * -40)}) scale(${v.s})`;
        this.backEl.style.pointerEvents = v.b > 0.5 ? '' : 'none';
        this.titleX = lerp(36, 89.7, v.b);
        for (const el of this.querySelectorAll('.a2-ab-title')) el._paint && el._paint();
      });
      press(this.backEl, () => this.bm.to({ s: 0.85 }, { s: SP.press }), () => this.bm.to({ s: 1 }, { s: SP.base }));
      this.backEl.addEventListener('click', () => emit(this, 'back'));
    }
    makeTitle(text) {
      const el = document.createElement('div');
      el.className = 'a2-ab-title'; el.textContent = text;
      this.appendChild(el);
      el._paint = () => {
        const v = el._v || { y: 0, o: 1 };
        el.style.transform = `translate(${u(this.titleX ?? 89.7)}, ${u(v.y)})`;
        el.style.opacity = clamp(v.o);
        el.style.filter = v.o > 0.999 ? '' : `blur(${u((1 - clamp(v.o)) * 8)})`;
      };
      el._m = new Motion({ y: 46, o: 0 }, v => { el._v = v; el._paint(); });
      return el;
    }
    setTitle(text, dir = 1) {
      if (!this.cur || this.cur.textContent === text) return;
      const old = this.cur;
      old._m.to({ y: -46 * dir, o: 0 }, null, () => old.remove());
      this.cur = this.makeTitle(text);
      this.cur._m.set({ y: 46 * dir, o: 0 });
      this.cur._m.to({ y: 0, o: 1 });
    }
    attributeChangedCallback(n, o, v) {
      if (!this._built || o === v) return;
      if (n === 'heading') this.setTitle(v ?? '');
      if (n === 'back') this.bm.to({ b: v === null ? 0 : 1 });
    }
  }

  /* ───────────── 체크박스 ─────────────
     안쪽 흰 칸이 체크 표시가 시작되는 점으로 오그라들고, 그 점에서 체크가 그려진다. */
  class A2Checkbox extends Base {
    static get observedAttributes() { return ['checked']; }
    build() {
      const text = this.textContent.trim();
      this.setAttribute('role', 'checkbox');
      if (!this.hasAttribute('tabindex')) this.tabIndex = 0;
      this.innerHTML = '<div class="a2-cb-box"><div class="a2-cb-hole"></div><i class="fa-solid fa-check"></i></div>' + (text ? `<span class="a2-cb-label">${esc(text)}</span>` : '');
      this.classList.toggle('a2-has-label', !!text);
      const box = this.querySelector('.a2-cb-box'), hole = box.firstChild, check = box.lastChild;
      hole.style.transformOrigin = '18% 56%';
      this._c = this.hasAttribute('checked');
      this.m = new Motion({ p: this._c ? 1 : 0, s: 1 }, v => {
        const hs = clamp(1 - v.p * 1.6);
        hole.style.transform = `scale(${hs})`;
        hole.style.visibility = hs < 0.01 ? 'hidden' : '';
        const cp = clamp((v.p - 0.3) / 0.7);
        check.style.clipPath = `inset(-10% ${(1 - cp) * 100}% -10% -10%)`;
        check.style.opacity = cp > 0 ? 1 : 0;
        box.style.transform = v.s !== 1 ? `scale(${v.s})` : '';
      });
      this.setAttribute('aria-checked', this._c);
      press(this, () => this.m.to({ s: 0.94 }, { s: SP.press }), () => this.m.to({ s: 1 }, { s: SP.base }));
      this.addEventListener('click', () => { this.checked = !this._c; emit(this, 'change', { checked: this._c }); });
      keyClick(this);
    }
    get checked() { return !!this._c; }
    set checked(c) {
      c = !!c;
      if (c !== this.hasAttribute('checked')) this.toggleAttribute('checked', c);
      if (!this.m || c === this._c) return;
      this._c = c; this.setAttribute('aria-checked', c);
      this.m.to({ p: c ? 1 : 0 });
    }
    attributeChangedCallback(n, o, v) { if (this._built) this.checked = v !== null; }
  }

  /* ───────────── 숫자 칩 (날짜·시간 공용) ───────────── */
  function numChip(parent, text, onClick) {
    const el = document.createElement('div');
    el.className = 'a2-num';
    el.innerHTML = `<b>${esc(text)}</b>`;
    parent.appendChild(el);
    const b = el.firstChild;
    el.addEventListener('click', e => { e.stopPropagation(); onClick && onClick(); });
    el._m = new Motion({ x: 0, y: 0, o: 0, p: 0, s: 1 }, v => {
      el.style.transform = `translate(${u(v.x)}, ${u(v.y)})`;
      const o = clamp(v.o);
      el.style.opacity = o;
      el.style.filter = o > 0.999 ? '' : `blur(${u((1 - o) * 10)})`;
      el.style.color = mix(el._base || C.date, C.white, v.p);
      b.style.fontWeight = v.p > 0.5 ? 800 : 400;
      if (el._next != null && v.o < 0.15) { b.textContent = el._next; el._next = null; el._m.to({ o: 1, s: 1 }); }
      b.style.transform = `scale(${lerp(1, el._big || 1, clamp(v.p)) * v.s})`;
    });
    return el;
  }

  /* ───────────── 날짜 선택 ─────────────
     요일에 맞춘 7칸 격자. 선택 표시는 고른 날로 이동하고, 달을 바꾸면 숫자가 새 칸으로 옮겨진다. */
  const CAL = {
    x0: 28, cw: (555 - 56) / 7, wdY: 140, y0: 197, rh: 60,
    pill: { w: 64, h: 52 }, big: 1.12, wd: ['일', '월', '화', '수', '목', '금', '토'],
  };
  class A2Datepicker extends Base {
    build() {
      const now = new Date();
      this.today = { y: now.getFullYear(), m: now.getMonth() + 1, d: now.getDate() };
      const m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(this.getAttribute('value') || '');
      this.y = m ? +m[1] : this.today.y;
      this.mo = m ? +m[2] : this.today.m;
      this.d = m ? +m[3] : this.today.d;
      this.setAttribute('role', 'group');
      if (!this.hasAttribute('tabindex')) this.tabIndex = 0;
      this.innerHTML =
        `<div class="a2-mini a2-date-mini"><a2-dropdown fit shadow value="${this.mo}">${Array.from({ length: 12 }, (_, i) => `<option value="${i + 1}">${i + 1}월</option>`).join('')}</a2-dropdown></div>` +
        '<div class="a2-date-year"></div>' +
        '<div class="a2-date-nav a2-date-prev" role="button" aria-label="이전 달"><i class="fa-solid fa-chevron-left"></i></div>' +
        '<div class="a2-date-nav a2-date-next" role="button" aria-label="다음 달"><i class="fa-solid fa-chevron-right"></i></div>' +
        CAL.wd.map((w, i) => `<span class="a2-wd" style="left:${u(CAL.x0 + CAL.cw * (i + 0.5))}">${w}</span>`).join('') +
        '<div class="a2-pill"></div>';
      this.dd = this.querySelector('a2-dropdown');
      this.yearEl = this.querySelector('.a2-date-year');
      this.pill = this.querySelector('.a2-pill');
      this.chips = new Map();
      this.pm = new Motion({ l: 0, r: 0, y: 0 }, v => {
        this.pill.style.transform = `translate(${u(v.l)}, ${u(v.y - CAL.pill.h / 2)})`;
        this.pill.style.width = u(Math.max(v.r - v.l, 16));
      });
      this.dd.addEventListener('change', e => { e.stopPropagation(); this.go(this.y, +this.dd.value, true); });
      for (const [sel, d] of [['.a2-date-prev', -1], ['.a2-date-next', 1]]) {
        const btn = this.querySelector(sel), ic = btn.firstChild;
        const bm = new Motion({ s: 1 }, v => { ic.style.scale = v.s; });
        press(btn, () => bm.to({ s: 0.8 }, { s: SP.press }), () => bm.to({ s: 1 }, { s: SP.base }));
        btn.addEventListener('click', () => this.shift(d, true));
      }
      this.addEventListener('keydown', e => {
        if (e.target !== this) return;
        const step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[e.key];
        if (!step) return;
        e.preventDefault();
        const t = new Date(this.y, this.mo - 1, this.d + step);
        if (t.getMonth() + 1 !== this.mo || t.getFullYear() !== this.y) { this.d = t.getDate(); this.go(t.getFullYear(), t.getMonth() + 1, true); }
        else this.pick(t.getDate(), true);
      });
      this.layout(false);
    }
    days() { return new Date(this.y, this.mo, 0).getDate(); }
    cell(d) {
      const first = new Date(this.y, this.mo - 1, 1).getDay(), i = first + d - 1;
      return { x: CAL.x0 + CAL.cw * (i % 7 + 0.5), y: CAL.y0 + CAL.rh * Math.floor(i / 7) };
    }
    layout(anim) {
      const n = this.days();
      this.yearEl.textContent = `${this.y}`;
      for (let d = 1; d <= n; d++) {
        const p = this.cell(d);
        let el = this.chips.get(d);
        if (!el || el._dying) {
          if (el) el.remove();
          el = numChip(this, d, () => this.pick(d, true));
          el._big = CAL.big;
          this.chips.set(d, el);
          el._m.set({ x: p.x, y: p.y, o: 0, s: 0.6 });
          anim ? el._m.to({ o: 1, s: 1 }) : el._m.set({ o: 1, s: 1 });
        } else {
          anim ? el._m.to({ x: p.x, y: p.y, o: 1 }) : el._m.set({ x: p.x, y: p.y, o: 1 });
        }
        const today = this.y === this.today.y && this.mo === this.today.m && d === this.today.d;
        el._base = today ? C.orange : C.date;
      }
      for (const [d, el] of this.chips) {
        if (d > n && !el._dying) {
          el._dying = true;
          const done = () => { el.remove(); if (this.chips.get(d) === el) this.chips.delete(d); };
          anim ? el._m.to({ o: 0, s: 0.6 }, null, done) : done();
        }
      }
      this.pick(Math.min(this.d, n), false, anim);
    }
    pick(d, user, anim = true) {
      const prev = this.d;
      this.d = d;
      for (const [k, el] of this.chips) if (!el._dying) {
        const t = { p: k === d ? 1 : 0 };
        anim ? el._m.to(t) : el._m.set(t);
        el.setAttribute('aria-selected', k === d);
      }
      const c = this.cell(d), goal = { l: c.x - CAL.pill.w / 2, r: c.x + CAL.pill.w / 2, y: c.y };
      const right = goal.l > this.pm.t.l;
      if (anim && this._placed) this.pm.to(goal, right ? { r: SP.fast, l: SP.slow, y: SP.base } : { l: SP.fast, r: SP.slow, y: SP.base });
      else this.pm.set(goal);
      this._placed = true;
      if (user && d !== prev) emit(this, 'change', { value: this.value });
    }
    shift(dm, user) {
      const t = new Date(this.y, this.mo - 1 + dm, 1);
      this.go(t.getFullYear(), t.getMonth() + 1, user);
    }
    go(y, mo, user) {
      if (y === this.y && mo === this.mo) return;
      this.y = y; this.mo = mo;
      if (this.dd.value !== String(mo)) this.dd.value = mo;
      this.layout(true);
      if (user) emit(this, 'change', { value: this.value });
    }
    get value() { return `${this.y}-${String(this.mo).padStart(2, '0')}-${String(this.d).padStart(2, '0')}`; }
    set value(v) {
      const m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(v || ''); if (!m) return;
      this.d = +m[3];
      if (+m[1] !== this.y || +m[2] !== this.mo) this.go(+m[1], +m[2]); else this.pick(this.d, false);
    }
  }

  /* ───────────── 시간 선택 ─────────────
     주황 칸이 원을 따라 돌아가고, 시 → 분으로 넘어가면 숫자가 제자리에서 바뀐다. */
  const CLK = { c: 179, R: 134, pillH: 50, step: 5 };
  class A2Timepicker extends Base {
    build() {
      const now = new Date();
      const m = /^(\d{1,2}):(\d{2})$/.exec(this.getAttribute('value') || '');
      this.h = m ? +m[1] % 24 : now.getHours();
      this.mi = m ? +m[2] % 60 : now.getMinutes();
      this.step = +(this.getAttribute('minute-step') ?? CLK.step) || 5;
      this.mi = Math.round(this.mi / this.step) * this.step % 60;
      this.mode = 'h';
      this.innerHTML =
        `<div class="a2-mini a2-time-mini"><a2-dropdown fit shadow value="${this.h < 12 ? 'am' : 'pm'}"><option value="am">오전</option><option value="pm">오후</option></a2-dropdown></div>` +
        '<div class="a2-clock"><div class="a2-pill"></div><div class="a2-clock-read"><span class="a2-rh"></span>:<span class="a2-rm"></span></div></div>';
      this.dd = this.querySelector('a2-dropdown');
      this.clock = this.querySelector('.a2-clock');
      this.pill = this.clock.querySelector('.a2-pill');
      this.rh = this.clock.querySelector('.a2-rh');
      this.rm = this.clock.querySelector('.a2-rm');
      this.chips = Array.from({ length: 12 }, (_, i) => {
        const el = numChip(this.clock, this.label(i), () => {});
        el._m.set({ o: 1 });
        el.style.transform = '';
        const a = i * 30 * Math.PI / 180;
        el.style.left = u(CLK.c + CLK.R * Math.sin(a)); el.style.top = u(CLK.c - CLK.R * Math.cos(a));
        el.style.translate = '-50% -50%';
        el.style.pointerEvents = 'none';
        return el;
      });
      this.pm = new Motion({ a: this.angle(), w: 64 }, v => {
        const a = v.a * Math.PI / 180;
        this.pill.style.left = u(CLK.c + CLK.R * Math.sin(a)); this.pill.style.top = u(CLK.c - CLK.R * Math.cos(a));
        this.pill.style.width = u(v.w);
        this.pill.style.translate = '-50% -50%';
      });
      this.paint(false);
      this.dd.addEventListener('change', e => {
        e.stopPropagation();
        const pm = this.dd.value === 'pm';
        if (pm !== this.h >= 12) { this.h = (this.h + 12) % 24; this.paint(true); emit(this, 'change', { value: this.value }); }
      });
      this.rh.addEventListener('click', () => this.setMode('h'));
      this.rm.addEventListener('click', () => this.setMode('m'));
      let drag = false;
      const at = e => {
        const r = this.clock.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        let a = Math.atan2(dx, -dy) * 180 / Math.PI; if (a < 0) a += 360;
        if (this.mode === 'h') {
          const idx = Math.round(a / 30) % 12;
          const h = (idx === 0 ? 0 : idx) + (this.h >= 12 ? 12 : 0);
          if (h !== this.h) { this.h = h; this.paint(true); emit(this, 'input', { value: this.value }); }
        } else {
          const mi = Math.round(a / (6 * this.step)) * this.step % 60;
          if (mi !== this.mi) { this.mi = mi; this.paint(true); emit(this, 'input', { value: this.value }); }
        }
      };
      this.clock.addEventListener('pointerdown', e => {
        if (e.button !== 0 || e.target.closest('.a2-clock-read')) return;
        drag = true; try { this.clock.setPointerCapture(e.pointerId); } catch (_) {} at(e);
      });
      this.clock.addEventListener('pointermove', e => { if (drag) at(e); });
      const end = () => {
        if (!drag) return; drag = false;
        emit(this, 'change', { value: this.value });
        if (this.mode === 'h') this.setMode('m');
      };
      this.clock.addEventListener('pointerup', end);
      this.clock.addEventListener('pointercancel', end);
      this.setAttribute('role', 'group');
    }
    label(i) { return this.mode === 'h' ? String(i === 0 ? 12 : i) : String(i * 5).padStart(2, '0'); }
    idx() { return this.mode === 'h' ? this.h % 12 : this.mi / 5; }
    angle() { return this.mode === 'h' ? (this.h % 12) * 30 : this.mi * 6; }
    paint(anim) {
      const sel = this.idx();
      this.chips.forEach((el, i) => { const t = { p: i === sel ? 1 : 0 }; anim ? el._m.to(t) : el._m.set(t); });
      const cur = this.pm.t.a, goal = this.angle();
      const a = cur + (((goal - cur) % 360) + 540) % 360 - 180;
      const w = Math.max(CLK.pillH, this.label(Math.round(sel) % 12).length * 22.5 + 20);
      anim ? this.pm.to({ a, w }) : this.pm.set({ a, w });
      this.rh.textContent = String(this.h % 12 === 0 ? 12 : this.h % 12).padStart(2, '0');
      this.rm.textContent = String(this.mi).padStart(2, '0');
      this.rh.style.color = this.mode === 'h' ? C.orange : '';
      this.rm.style.color = this.mode === 'm' ? C.orange : '';
      const pmv = this.h >= 12 ? 'pm' : 'am';
      if (this.dd.value !== pmv) this.dd.value = pmv;
    }
    setMode(mode) {
      if (mode === this.mode) return;
      this.mode = mode;
      // 숫자는 흐려졌다가 새 값으로 바뀌어 다시 또렷해진다 — 칩 자체는 제자리
      this.chips.forEach((el, i) => { el._next = this.label(i); el._m.to({ o: 0, s: 0.8 }); });
      this.paint(true);
    }
    get value() { return `${String(this.h).padStart(2, '0')}:${String(this.mi).padStart(2, '0')}`; }
    set value(v) {
      const m = /^(\d{1,2}):(\d{2})$/.exec(v || ''); if (!m) return;
      this.h = +m[1] % 24; this.mi = Math.round(+m[2] / this.step) * this.step % 60; this.paint(true);
    }
  }

  /* ───────────── 모달 ─────────────
     data-a2-modal="#id" 가 붙은 요소를 누르면 그 요소 위치·크기에서 모달 판으로 커지고, 닫으면 돌아간다.
     여는 요소 없이 open() 하면 화면 가운데서 열린다. */
  let locks = 0, saved = null;
  function lockScroll(on) {
    const html = document.documentElement, body = document.body;
    if (on) {
      if (locks++) return;
      const bar = innerWidth - html.clientWidth;
      const gutter = /stable/.test(getComputedStyle(html).scrollbarGutter || '');
      saved = { o: html.style.overflow, p: body.style.paddingRight };
      html.style.overflow = 'hidden';
      if (bar > 0 && !gutter) body.style.paddingRight = `${(parseFloat(getComputedStyle(body).paddingRight) || 0) + bar}px`;
    } else {
      if (!locks || --locks) return;
      html.style.overflow = saved.o; body.style.paddingRight = saved.p;
    }
  }
  class A2Modal extends Base {
    build() {
      const kids = [...this.childNodes];
      const layer = this.layer = document.createElement('div');
      layer.className = 'a2-modal-layer a2';
      layer.innerHTML =
        '<div class="a2-modal-back"></div>' +
        '<div class="a2-modal-panel" role="dialog" aria-modal="true" tabindex="-1">' +
        '<div class="a2-modal-ghost"></div>' +
        '<div class="a2-modal-content"><h2 class="a2-modal-title"></h2><div class="a2-modal-body"></div><div class="a2-modal-actions"></div></div></div>';
      this.back = layer.querySelector('.a2-modal-back');
      this.panel = layer.querySelector('.a2-modal-panel');
      this.ghost = layer.querySelector('.a2-modal-ghost');
      this.content = layer.querySelector('.a2-modal-content');
      this.titleEl = layer.querySelector('.a2-modal-title');
      const body = layer.querySelector('.a2-modal-body'), actions = layer.querySelector('.a2-modal-actions');
      for (const k of kids) (k.nodeType === 1 && k.getAttribute('slot') === 'actions' ? actions : body).appendChild(k);
      const h = this.getAttribute('heading');
      if (h) { this.titleEl.textContent = h; this.panel.setAttribute('aria-label', h); } else this.titleEl.remove();
      document.body.appendChild(layer);
      this.isOpen = false;
      this.m = new Motion({ p: 0 }, v => this.paint(v.p), { k: 300, c: 32 });
      this.back.addEventListener('click', () => this.close());
      layer.addEventListener('click', e => { if (e.target.closest('[data-a2-close]')) this.close(); });
      layer.addEventListener('keydown', e => { if (e.key === 'Escape') { e.stopPropagation(); this.close(); } });
      addEventListener('resize', () => { if (this.isOpen) { this.measure(); this.paint(this.m.v.p); } });
      if (this.hasAttribute('open')) this.open();
    }
    unit() { return (parseFloat(getComputedStyle(this.content).paddingLeft) || 26) / 72; }
    measure() {
      const k = this.unit(), W = Math.min(1000 * k, innerWidth - 32);
      this.content.style.width = `${W}px`;
      const H = Math.min(this.content.offsetHeight, innerHeight - 32);
      this.to = { x: (innerWidth - W) / 2, y: (innerHeight - H) / 2, w: W, h: H, r: 66 * k };
      const t = this.trigger && this.trigger.isConnected ? this.trigger : null;
      if (t) {
        const r = t.getBoundingClientRect(), cs = getComputedStyle(t);
        this.from = { x: r.left, y: r.top, w: r.width, h: r.height, r: parseFloat(cs.borderTopLeftRadius) || 0, bg: cs.backgroundColor, fg: cs.color };
      } else {
        const s = 0.86;
        this.from = { x: this.to.x + W * (1 - s) / 2, y: this.to.y + H * (1 - s) / 2, w: W * s, h: H * s, r: this.to.r, bg: '#FFFFFF', fg: '#000000', fade: true };
      }
    }
    paint(p) {
      if (!this.to) return;
      const a = this.from, b = this.to, q = Math.max(0, p);
      const st = this.panel.style;
      st.left = `${lerp(a.x, b.x, q)}px`; st.top = `${lerp(a.y, b.y, q)}px`;
      st.width = `${Math.max(1, lerp(a.w, b.w, q))}px`; st.height = `${Math.max(1, lerp(a.h, b.h, q))}px`;
      st.borderRadius = `${Math.max(0, lerp(a.r, b.r, clamp(p)))}px`;
      st.background = a.bg.startsWith('rgba(0, 0, 0, 0') ? '#fff' : mix(a.bg, '#FFFFFF', clamp(p * 1.6));
      st.opacity = a.fade ? clamp(p * 2) : 1;
      this.back.style.opacity = clamp(p);
      const co = clamp((p - 0.4) / 0.6);
      this.content.style.opacity = co;
      this.content.style.filter = co > 0.999 ? '' : `blur(${(1 - co) * 8}px)`;
      const go = clamp(1 - p * 2.5);
      this.ghost.style.opacity = go;
      this.ghost.style.filter = go > 0.999 ? '' : `blur(${(1 - go) * 6}px)`;
    }
    open(trigger) {
      if (this.isOpen) return;
      this.isOpen = true;
      this.trigger = trigger || null;
      this.ghost.innerHTML = '';
      if (this.trigger) {
        const cs = getComputedStyle(this.trigger);
        this.ghost.innerHTML = this.trigger.innerHTML;
        Object.assign(this.ghost.style, { color: cs.color, font: cs.font, letterSpacing: cs.letterSpacing });
      }
      this.layer.classList.add('a2-on');
      this.measure();
      this.m.set({ p: 0 });
      if (this.trigger) this.trigger.style.visibility = 'hidden';
      if (!this._locked) { this._locked = true; lockScroll(true); }
      this.m.to({ p: 1 }, null, null);
      this.panel.focus({ preventScroll: true });
      emit(this, 'open');
    }
    close() {
      if (!this.isOpen) return;
      this.isOpen = false;
      this.measure();
      this.m.to({ p: 0 }, null, () => {
        if (this.isOpen) return;
        this.layer.classList.remove('a2-on');
        if (this.trigger) { this.trigger.style.visibility = ''; this.trigger.focus && this.trigger.focus({ preventScroll: true }); }
        if (this._locked) { this._locked = false; lockScroll(false); }
      });
      emit(this, 'close');
    }
    disconnectedCallback() { /* 레이어는 body 에 남겨 둔다: 다시 붙으면 그대로 쓴다 */ }
  }
  document.addEventListener('click', e => {
    const t = e.target.closest && e.target.closest('[data-a2-modal]');
    if (!t) return;
    const m = document.querySelector(t.getAttribute('data-a2-modal'));
    if (m && m.open) m.open(t);
  });

  /* ───────────── 로딩 ───────────── */
  class A2Loading extends Base {
    build() {
      this.setAttribute('role', 'progressbar');
      if (!this.hasAttribute('aria-label')) this.setAttribute('aria-label', '로딩 중');
      this.innerHTML = '<svg viewBox="0 0 50 50" aria-hidden="true">' +
        '<circle class="a2-ld-arc" cx="25" cy="25" r="20" fill="none" stroke-width="7"/></svg>';
    }
    // 수동 모드(a2-ld-manual)에서 p(0~1) 만큼 호를 그린다. 끌어서 새로고침에서 쓴다.
    // 호 길이는 최대 80 — CSS 회전 애니메이션(a2-arc) 50% 지점의 길이와 같게 맞춰 둔다
    setProgress(p) {
      const svg = this.firstChild; if (!svg) return;
      this._rot = -90 + clamp(p) * 270;
      svg.style.animationDelay = svg.lastChild.style.animationDelay = '';
      svg.lastChild.style.strokeDasharray = `${Math.max(1, clamp(p) * 80)} 200`;
      svg.style.transform = `rotate(${this._rot}deg)`;
    }
    // 수동 모드의 지금 모습(각도·호 길이) 그대로 CSS 회전을 시작한다.
    // a2-arc 를 50%(길이 80, 오프셋 -20)부터 돌리고, 오프셋만큼 앞당겨진 각도를 a2-spin 시작 각도에서 빼 준다.
    spinFromCurrent() {
      const svg = this.firstChild; if (!svg) return;
      const arc = svg.lastChild;
      const still = reduce.matches;            // 줄인 움직임: 호 길이 애니메이션 없음, 회전 2.4초
      const shift = still ? 0 : 20 / (2 * Math.PI * 20) * 360;
      const spinDur = still ? 2.4 : 1.1;
      const start = ((((this._rot ?? -90) - shift) % 360) + 360) % 360;
      svg.style.animationDelay = `${-(start / 360) * spinDur}s`;
      arc.style.animationDelay = still ? '' : '-0.7s';
      svg.style.transform = ''; arc.style.strokeDasharray = '';
      this.classList.remove('a2-ld-manual');
    }
  }

  /* ───────────── 진행 바 ───────────── */
  class A2Progress extends Base {
    static get observedAttributes() { return ['value']; }
    build() {
      this.setAttribute('role', 'progressbar');
      this.setAttribute('aria-valuemin', 0);
      this.setAttribute('aria-valuemax', 100);
      this.innerHTML = '<div class="a2-pg-fill"></div>';
      this.fill = this.firstChild;
      this.m = new Motion({ w: 0 }, v => { this.fill.style.width = `${clamp(v.w, 0, 100)}%`; });
      this.sync(false);
    }
    sync(anim) {
      const raw = this.getAttribute('value');
      const ind = raw === null || raw === '';
      this.classList.toggle('a2-indeterminate', ind);
      if (ind) { this.removeAttribute('aria-valuenow'); this.fill.style.width = ''; return; }
      const v = clamp(+raw || 0, 0, 100);
      this.setAttribute('aria-valuenow', v);
      anim ? this.m.to({ w: v }) : this.m.set({ w: v });
    }
    get value() { const r = this.getAttribute('value'); return r === null ? null : +r; }
    set value(v) { if (v === null || v === undefined) this.removeAttribute('value'); else this.setAttribute('value', v); }
    attributeChangedCallback(n, o, v) { if (this._built && o !== v) this.sync(true); }
  }

  /* ───────────── 리스트 ───────────── */
  class A2ListItem extends Base {
    build() {
      const title = this.textContent.trim();
      const icon = this.getAttribute('icon'), sub = this.getAttribute('sub'), meta = this.getAttribute('meta');
      this.setAttribute('role', 'listitem');
      if (!this.hasAttribute('tabindex')) this.tabIndex = 0;
      this.innerHTML =
        (icon ? `<span class="a2-li-icon"><i class="fa-solid fa-${esc(icon)}"></i></span>` : '') +
        `<span class="a2-li-text"><span class="a2-li-title">${esc(title)}</span>${sub ? `<span class="a2-li-sub">${esc(sub)}</span>` : ''}</span>` +
        (meta ? `<span class="a2-li-meta">${esc(meta)}</span>` : '') +
        (this.hasAttribute('chevron') ? '<span class="a2-li-chev"><i class="fa-solid fa-chevron-right"></i></span>' : '');
      keyClick(this);
    }
  }
  class A2List extends Base {
    build() {
      this.setAttribute('role', 'list');
      this.hl = document.createElement('div');
      this.hl.className = 'a2-list-hl';
      this.prepend(this.hl);
      this.m = new Motion({ y: 0, h: 0, o: 0 }, v => {
        this.hl.style.transform = `translateY(${v.y}px)`;
        this.hl.style.height = `${Math.max(0, v.h)}px`;
        this.hl.style.opacity = clamp(v.o);
      });
      this.cur = null;
      const sel = this.querySelector(':scope > a2-list-item[selected]');
      // 처음 선택된 항목: 표시만 켜 두고 위치는 아래 ResizeObserver 가 레이아웃이 잡힌 뒤 맞춘다
      if (this.hasAttribute('selectable') && sel) { this.cur = sel; this.m.set({ o: 1 }); }
      this.addEventListener('pointerdown', e => {
        const it = e.target.closest('a2-list-item');
        if (!it || it.parentNode !== this || e.button !== 0) return;
        if (!this.hasAttribute('selectable')) this.moveTo(it, this.m.v.o > 0.05, 1);
      });
      const release = () => { if (!this.hasAttribute('selectable')) this.m.to({ o: 0 }); };
      for (const t of ['pointerup', 'pointercancel', 'pointerleave']) this.addEventListener(t, release);
      this.addEventListener('click', e => {
        const it = e.target.closest('a2-list-item');
        if (!it || it.parentNode !== this) return;
        if (this.hasAttribute('selectable')) {
          for (const x of this.items) { x.toggleAttribute('selected', x === it); x.setAttribute('aria-selected', x === it); }
          this.moveTo(it, this.m.v.o > 0.05, 1);
        }
        emit(this, 'select', { index: this.items.indexOf(it), item: it });
      });
      const relayout = () => { if (this.cur && this.cur.isConnected) this.moveTo(this.cur, false, this.m.t.o); };
      new ResizeObserver(relayout).observe(this);
      setTimeout(relayout, 0);
      if (document.fonts) document.fonts.ready.then(relayout);
    }
    get items() { return [...this.querySelectorAll(':scope > a2-list-item')]; }
    moveTo(it, anim, o) {
      this.cur = it;
      const t = { y: it.offsetTop, h: it.offsetHeight, o };
      if (anim) this.m.to(t);
      else { this.m.set({ y: t.y, h: t.h }); this.m.to({ o }); }
    }
    get selectedIndex() { return this.items.findIndex(x => x.hasAttribute('selected')); }
    set selectedIndex(i) { const it = this.items[i]; if (it) it.click(); }
  }

  /* ───────────── 끌어서 새로고침 ─────────────
     맨 위에서 아래로 끌었다 놓으면 refresh 이벤트가 난다.
     e.detail.waitUntil(promise) 를 부르면 그 작업이 끝날 때까지 로딩 표시가 남는다. */
  const RF = { size: 96, threshold: 230, hold: 170 };
  class A2Refresh extends Base {
    build() {
      const kids = [...this.childNodes];
      this.innerHTML = '<div class="a2-rf-ind"><a2-loading class="a2-ld-manual"></a2-loading></div><div class="a2-rf-scroll"></div>';
      this.ind = this.firstChild;
      this.spin = this.ind.firstChild;
      this.scroll = this.lastChild;
      for (const k of kids) this.scroll.appendChild(k);
      this.busy = false;
      this._unit = () => (parseFloat(getComputedStyle(this.ind).width) || 35) / RF.size;
      this.m = new Motion({ y: 0 }, v => this.paint(v.y));
      let y0 = null, pulling = false;
      const resist = dist => { const L = RF.threshold * this._unit() * 1.8; return L * (1 - Math.exp(-dist * 0.6 / L)); };
      const start = y => { if (this.busy || this.scroll.scrollTop > 0) return; y0 = y; pulling = false; };
      const move = (y, e) => {
        if (y0 === null) return;
        const dy = y - y0;
        if (!pulling && (dy <= 4 || this.scroll.scrollTop > 0)) { if (dy < 0) y0 = null; return; }
        pulling = true;
        if (e.cancelable) e.preventDefault();
        this.m.set({ y: resist(dy) });
      };
      const end = () => {
        if (y0 === null) return;
        y0 = null;
        if (!pulling) return;
        pulling = false;
        if (this.m.v.y >= RF.threshold * this._unit()) this.refresh();
        else this.m.to({ y: 0 });
      };
      this.scroll.addEventListener('touchstart', e => start(e.touches[0].clientY), { passive: true });
      this.scroll.addEventListener('touchmove', e => move(e.touches[0].clientY, e), { passive: false });
      this.scroll.addEventListener('touchend', end);
      this.scroll.addEventListener('touchcancel', end);
      this.scroll.addEventListener('pointerdown', e => { if (e.pointerType === 'mouse' && e.button === 0) start(e.clientY); });
      addEventListener('pointermove', e => { if (e.pointerType === 'mouse' && y0 !== null) move(e.clientY, e); });
      addEventListener('pointerup', e => { if (e.pointerType === 'mouse') end(); });
    }
    paint(y) {
      const k = this._unit(), T = RF.threshold * k, S = RF.size * k;
      this.scroll.style.transform = y > 0.01 ? `translateY(${y}px)` : '';
      const p = clamp(y / T);
      this.ind.style.transform = `translateY(${Math.max(y / 2 - S / 2, -S)}px) scale(${0.6 + 0.4 * p})`;
      this.ind.style.opacity = clamp(y / (T * 0.4));
      if (!this.busy && this.spin.setProgress) this.spin.setProgress(p);
      this.classList.toggle('a2-pulling', y > 0.5);
    }
    refresh() {
      if (this.busy) return;
      this.busy = true;
      this.setAttribute('aria-busy', 'true');
      if (this.spin.spinFromCurrent) this.spin.spinFromCurrent();
      else this.spin.classList.remove('a2-ld-manual');
      this.m.to({ y: RF.hold * this._unit() });
      const jobs = [];
      emit(this, 'refresh', { waitUntil: p => jobs.push(Promise.resolve(p)) });
      (jobs.length ? Promise.allSettled(jobs) : new Promise(r => setTimeout(r, 900))).then(() => this.done());
    }
    done() {
      if (!this.busy) return;
      this.m.to({ y: 0 }, null, () => {
        this.busy = false;
        this.removeAttribute('aria-busy');
        this.spin.classList.add('a2-ld-manual');
        if (this.spin.setProgress) this.spin.setProgress(0);
      });
    }
  }

  const defs = {
    'a2-button': A2Button, 'a2-slider': A2Slider, 'a2-dropdown': A2Dropdown, 'a2-textfield': A2Textfield,
    'a2-split': A2Split, 'a2-split-item': A2SplitItem, 'a2-navbar': A2Navbar, 'a2-nav-item': A2NavItem,
    'a2-appbar': A2Appbar, 'a2-checkbox': A2Checkbox, 'a2-datepicker': A2Datepicker, 'a2-timepicker': A2Timepicker, 'a2-modal': A2Modal,
    'a2-loading': A2Loading, 'a2-progress': A2Progress, 'a2-list': A2List, 'a2-list-item': A2ListItem, 'a2-refresh': A2Refresh,
  };
  const define = () => { for (const [n, c] of Object.entries(defs)) if (!customElements.get(n)) customElements.define(n, c); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', define); else define();

  window.adas2 = { Motion, springs: SP, version: '1.1.2' };
})();
