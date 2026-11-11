import { A2Element, define, icon, ripple } from '../core/base.js';
import { Spring } from '../core/spring.js';

const WAVE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='14'%3E%3Cpath d='M0 7Q10 0 20 7T40 7' fill='none' stroke='%23000' stroke-width='4'/%3E%3C/svg%3E")`;

/**
 * <a2-progress value="40" max="100" label="올리는 중" show-value flat>
 * 진행한 부분은 물결치며 흐르고, 남은 부분은 곧은 선이다. value 가 없으면 끝을 모르는 표시. flat 이면 물결 없이.
 */
export class A2Progress extends A2Element {
  static observedAttributes = ['value', 'max', 'label', 'show-value', 'variant'];
  static styles = `
:host { display: block; --c: var(--a2-accent); }
:host([variant="success"]) { --c: var(--a2-success); }
:host([variant="danger"]) { --c: var(--a2-danger); }
.head { display: flex; justify-content: space-between; gap: 12px; }
.head .label { flex: 1; }
.out { font-size: var(--a2-fs-sm); color: var(--a2-text-muted); font-variant-numeric: tabular-nums; margin-bottom: 8px; }
.out:empty { display: none; }
.w { position: relative; height: 14px; --p: 0; }
.a { position: absolute; left: 0; top: 0; bottom: 0; width: calc(var(--p) * 100%); overflow: hidden; transition: width var(--move); }
.wave { position: absolute; left: 0; top: 0; bottom: 0; width: 100vw; background: var(--c); -webkit-mask: ${WAVE} repeat-x 0 50% / 40px 14px; mask: ${WAVE} repeat-x 0 50% / 40px 14px; animation: flow calc(1.1s / var(--a2-speed)) linear infinite; }
@keyframes flow { to { -webkit-mask-position: 40px 50%; mask-position: 40px 50%; } }
:host([flat]) .wave, .w.done .wave { -webkit-mask: none; mask: none; animation: none; top: 5px; bottom: 5px; border-radius: 2px; }
.i { position: absolute; right: 0; top: 5px; height: 4px; left: calc(var(--p) * 100% + 6px); border-radius: 2px; background: var(--a2-tonal); transition: left var(--move); }
.w.done .i { display: none; }
.w::after { content: ''; position: absolute; right: 0; top: 5px; width: 4px; height: 4px; border-radius: 50%; background: var(--c); }
/* 끝을 모를 때: 물결 조각이 지나간다 */
.w.ind { overflow: clip; }
.w.ind .a { width: 34%; transition: none; animation: run calc(1.5s / var(--a2-speed)) cubic-bezier(0.5, 0.1, 0.4, 0.9) infinite; }
.w.ind .i { left: 0; transition: none; }
@keyframes run { from { translate: -110% 0; } to { translate: 310% 0; } }
`;
  render() {
    this.setAttribute('role', 'progressbar');
    this.root.innerHTML = `<div class="head"><div class="label t" part="label"></div><div class="out t"></div></div><div class="w" part="track"><div class="i"></div><div class="a" part="fill"><div class="wave"></div></div></div>`;
  }
  get value() { return this.num('value', null); }
  set value(v) { if (v == null) this.removeAttribute('value'); else this.setAttribute('value', v); }
  update() {
    this.paintField();
    const v = this.value, max = this.num('max', 100) || 100, ind = v == null, w = this.$('.w');
    const p = ind ? 0 : Math.min(Math.max(v / max, 0), 1);
    w.classList.toggle('ind', ind);
    w.classList.toggle('done', !ind && p >= 1);
    w.style.setProperty('--p', p);
    this.$('.out').textContent = this.bool('show-value') && !ind ? `${Math.round(p * 100)}%` : '';
    if (ind) this.removeAttribute('aria-valuenow'); else this.setAttribute('aria-valuenow', Math.round(p * 100));
    if (this.hasAttribute('label')) this.setAttribute('aria-label', this.getAttribute('label'));
  }
}

// 로딩 표시가 차례로 바뀌는 모양들: [돌기 수, 깊이]
const SHAPES = [[4, 0.2], [6, 0.13], [2, 0.3], [8, 0.1], [3, 0.24], [5, 0.16], [0, 0]];
const N = 64;
const radii = ([n, a]) => Array.from({ length: N }, (_, i) => 1 - a * (1 - Math.cos((n * i * 2 * Math.PI) / N)) / 2);
const SHAPE_R = SHAPES.map(radii);

/**
 * <a2-spinner size="40" contained>
 * 모양이 스프링으로 바뀌면서 도는 로딩 표시. 화면에 보일 때만 움직인다.
 */
export class A2Spinner extends A2Element {
  static observedAttributes = ['size'];
  static styles = `
:host { display: inline-grid; place-items: center; vertical-align: middle; color: var(--a2-accent); line-height: 0; }
:host([contained]) { background: var(--a2-accent-container); color: var(--a2-on-accent-container); border-radius: 50%; box-sizing: content-box; }
`;
  render() {
    this.setAttribute('role', 'status');
    if (!this.hasAttribute('aria-label')) this.setAttribute('aria-label', '불러오는 중');
    this.root.innerHTML = `<svg viewBox="-1.1 -1.1 2.2 2.2" fill="currentColor" aria-hidden="true"><path/></svg>`;
    this.path = this.$('path');
    this.i = 0; this.rot = 0;
    this.sp = new Spring(0, { k: 260, z: 0.62 }, t => this.draw(t), 0.002);
    this.io = new IntersectionObserver(([e]) => { this.vis = e.isIntersecting; this.run(); });
  }
  connectedCallback() { super.connectedCallback(); this.io.observe(this); }
  disconnectedCallback() { this.io.disconnect(); clearInterval(this.timer); this.timer = 0; }
  run() {
    clearInterval(this.timer); this.timer = 0;
    if (!this.vis) return;
    this.timer = setInterval(() => { if (!document.hidden) this.next(); }, 700);
  }
  next() {
    this.i = (this.i + 1) % SHAPES.length; this.from = this.cur; this.rot0 = this.rot; this.rot += 2.2;
    this.sp.jump(0); this.sp.set(1);
  }
  /** t: 0(이전 모양) → 1(다음 모양). 스프링이라 1 을 조금 넘었다 돌아온다 */
  draw(t) {
    const to = SHAPE_R[this.i], from = this.from || to, rot = (this.rot0 ?? 0) + (this.rot - (this.rot0 ?? 0)) * t;
    let d = '';
    const cur = new Array(N);
    for (let k = 0; k < N; k++) {
      const r = from[k] + (to[k] - from[k]) * t, a = rot + (k * 2 * Math.PI) / N;
      cur[k] = r;
      d += `${k ? 'L' : 'M'}${(r * Math.cos(a)).toFixed(3)} ${(r * Math.sin(a)).toFixed(3)}`;
    }
    this.cur = cur;
    this.path.setAttribute('d', `${d}Z`);
  }
  update() {
    const s = this.num('size', 28);
    const svg = this.$('svg'); svg.setAttribute('width', s); svg.setAttribute('height', s);
    this.style.padding = this.bool('contained') ? `${Math.round(s * 0.3)}px` : '';
    if (!this.cur) this.draw(1);
  }
}

/** <a2-badge variant="accent|success|warning|danger|neutral" dot>새 기능</a2-badge> */
export class A2Badge extends A2Element {
  static styles = `
:host { display: inline-flex; vertical-align: middle; }
.b { display: inline-flex; align-items: center; gap: 6px; height: 26px; padding: 0.12em 11px 0; border-radius: 13px; font-size: var(--a2-fs-sm); font-weight: var(--a2-weight-strong); white-space: nowrap; background: var(--a2-tonal); color: var(--a2-on-tonal); --c: var(--a2-on-tonal); }
:host([variant="accent"]) .b { --c: var(--a2-accent); background: var(--a2-accent-container); color: var(--a2-on-accent-container); }
:host([variant="success"]) .b { --c: var(--a2-success); }
:host([variant="warning"]) .b { --c: var(--a2-warning); }
:host([variant="danger"]) .b { --c: var(--a2-danger); }
:host(:is([variant="success"], [variant="warning"], [variant="danger"])) .b { background: color-mix(in srgb, var(--c) 18%, transparent); color: var(--c); }
.dot { display: none; width: 6px; height: 6px; margin-top: -0.12em; border-radius: 50%; background: var(--c); }
:host([dot]) .dot { display: block; }
`;
  render() { this.root.innerHTML = `<span class="b" part="base"><span class="dot"></span><slot></slot></span>`; }
}

/**
 * <a2-card heading="제목" description="설명" variant="outlined|elevated" interactive> 내용 <div slot="footer">…</div> </a2-card>
 */
export class A2Card extends A2Element {
  static observedAttributes = ['heading', 'description', 'interactive'];
  static styles = `
:host { display: block; }
.c { position: relative; border-radius: var(--a2-r-lg); background: var(--a2-surface); padding: 22px; transition: border-radius var(--snap), box-shadow var(--fx), background-color var(--fx); }
:host([variant="outlined"]) .c { background: transparent; border: 1px solid var(--a2-line); }
:host([variant="elevated"]) .c { background: var(--a2-surface-high); box-shadow: var(--a2-shadow-sm); }
:host([interactive]) .c { cursor: pointer; user-select: none; }
:host([interactive]) .c:hover { background: var(--a2-surface-high); }
:host([interactive][variant="elevated"]) .c:hover { box-shadow: var(--a2-shadow); }
:host([interactive]) .c:active { border-radius: var(--a2-r-sm); }
.h { font-size: var(--a2-fs-lg); font-weight: var(--a2-weight-strong); line-height: 1.35; padding-top: 0.12em; }
.d { margin-top: 6px; color: var(--a2-text-muted); line-height: 1.5; }
.h:empty, .d:empty { display: none; }
.body, .top, .foot { position: relative; }
.foot { display: flex; gap: 8px; justify-content: flex-end; flex-wrap: wrap; }
.foot.on { margin-top: 20px; }
`;
  render() {
    this.root.innerHTML = `<div class="c" part="base"><div class="top"><div class="h" part="heading"></div><div class="d" part="description"></div></div><div class="body"><slot></slot></div><div class="foot" part="footer"><slot name="footer"></slot></div></div>`;
    this.root.querySelector('slot[name=footer]').addEventListener('slotchange', e => this.$('.foot').classList.toggle('on', e.target.assignedElements().length > 0));
    if (this.bool('interactive')) { ripple(this.$('.c')); this.$('.c').tabIndex = 0; }
  }
  update() {
    this.$('.h').textContent = this.str('heading');
    this.$('.d').textContent = this.str('description');
    const empty = !this.str('heading') && !this.str('description');
    this.$('.top').style.display = empty ? 'none' : '';
    this.$('.body').style.marginTop = empty || !this.childNodes.length ? '0' : '14px';
  }
}

/**
 * <a2-chip selected value="rock">록</a2-chip>
 * 켜고 끄는 작은 알약. 켜지면 체크 표시가 자리를 벌리며 들어온다. removable 이면 × 로 지운다(a2-remove 이벤트).
 */
export class A2Chip extends A2Element {
  static formAssociated = true;
  static delegatesFocus = true;
  static observedAttributes = ['selected', 'disabled', 'removable'];
  static styles = `
:host { display: inline-flex; vertical-align: middle; }
.c {
  position: relative; isolation: isolate; display: inline-flex; align-items: center; height: 34px; padding: 0 14px; border-radius: 10px; white-space: nowrap; user-select: none;
  border: 1px solid var(--a2-line-strong); color: var(--a2-text); transition: border-radius var(--snap), background-color var(--fx), border-color var(--fx), color var(--fx);
}
.c::before { content: ''; position: absolute; inset: -5px; z-index: -1; }
.c:hover { background: var(--a2-fill); }
.c:active { border-radius: 17px; }
.rp-box { z-index: -1; }
:host([selected]) .c { background: var(--a2-tonal); border-color: transparent; color: var(--a2-on-tonal); }
.ck { display: inline-grid; place-items: center; width: 0; overflow: clip; transition: width var(--snap), margin var(--snap); }
.ck svg { flex: none; transform: scale(0); transition: transform var(--snap); }
:host([selected]) .ck { width: 14px; margin-right: 8px; }
:host([selected]) .ck svg { transform: none; }
.x { display: none; position: relative; width: 20px; height: 20px; margin: 0 -6px 0 6px; border-radius: 50%; place-items: center; color: var(--a2-text-muted); }
:host([removable]) .x { display: grid; }
.x:hover { background: var(--a2-fill-active); color: var(--a2-text); }
`;
  render() {
    this.root.innerHTML = `<button class="c" part="base" type="button"><span class="ck">${icon('check', 12)}</span><span class="t"><slot></slot></span><span class="x hit" role="button" aria-label="지우기">${icon('x', 9)}</span></button>`;
    this.btn = this.$('.c');
    ripple(this.btn);
    this.btn.addEventListener('click', e => {
      if (e.target.closest('.x')) { if (this.emit('a2-remove', { value: this.value })) this.remove(); return; }
      if (this.bool('static')) return;
      this.selected = !this.selected; this.fire('input'); this.fire('change');
    });
  }
  get selected() { return this.bool('selected'); }
  set selected(v) { this.setBool('selected', v); }
  get value() { return this.str('value', this.textContent.trim()); }
  update() {
    this.btn.disabled = this.disabled;
    this.btn.setAttribute('aria-pressed', String(this.selected));
    this.internals.setFormValue(this.selected ? this.value : null);
  }
}

define('a2-progress', A2Progress);
define('a2-spinner', A2Spinner);
define('a2-badge', A2Badge);
define('a2-card', A2Card);
define('a2-chip', A2Chip);
