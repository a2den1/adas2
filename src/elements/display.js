import { A2Element, define } from '../core/base.js';

/** <a2-progress value="40" max="100" label="올리는 중" show-value> — value 가 없으면 계속 도는 막대 */
export class A2Progress extends A2Element {
  static observedAttributes = ['value', 'max', 'label', 'show-value', 'variant'];
  static styles = `
:host { display: block; }
.head { display: flex; justify-content: space-between; gap: 12px; }
.head .label { flex: 1; }
.out { font-size: var(--a2-fs-sm); color: var(--a2-text-muted); font-variant-numeric: tabular-nums; margin-bottom: 7px; }
.out:empty { display: none; }
.track { position: relative; height: 6px; border-radius: 3px; background: var(--a2-fill-active); box-shadow: inset 0 0 0 1px var(--a2-line); overflow: hidden; }
.fill { position: absolute; inset: 0 auto 0 0; width: 100%; border-radius: 3px; background: var(--a2-accent); transform-origin: left; transform: scaleX(0); transition: transform var(--t3) var(--spring); }
:host([variant="success"]) .fill { background: var(--a2-success); }
:host([variant="danger"]) .fill { background: var(--a2-danger); }
.ind .fill { width: 40%; transform: none; transition: none; animation: run calc(1.3s / var(--a2-speed)) cubic-bezier(0.6, 0.1, 0.4, 0.9) infinite; }
@keyframes run { from { translate: -100% 0; } to { translate: 250% 0; } }
`;
  render() {
    this.setAttribute('role', 'progressbar');
    this.root.innerHTML = `<div class="head"><div class="label t" part="label"></div><div class="out t"></div></div><div class="track" part="track"><div class="fill" part="fill"></div></div>`;
  }
  get value() { return this.num('value', null); }
  set value(v) { if (v == null) this.removeAttribute('value'); else this.setAttribute('value', v); }
  update() {
    this.paintField();
    const v = this.value, max = this.num('max', 100) || 100, ind = v == null;
    this.$('.track').classList.toggle('ind', ind);
    const p = ind ? 0 : Math.min(Math.max(v / max, 0), 1);
    this.$('.fill').style.transform = ind ? '' : `scaleX(${p})`;
    this.$('.out').textContent = this.bool('show-value') && !ind ? `${Math.round(p * 100)}%` : '';
    if (ind) this.removeAttribute('aria-valuenow'); else this.setAttribute('aria-valuenow', Math.round(p * 100));
    if (this.hasAttribute('label')) this.setAttribute('aria-label', this.getAttribute('label'));
  }
}

/** <a2-spinner size="24"> */
export class A2Spinner extends A2Element {
  static observedAttributes = ['size'];
  static styles = `
:host { display: inline-block; vertical-align: middle; color: var(--a2-accent); line-height: 0; }
svg { animation: rot calc(0.9s / var(--a2-speed)) linear infinite; }
circle { stroke-dasharray: 44 100; stroke-linecap: round; animation: dash calc(1.6s / var(--a2-speed)) ease-in-out infinite; }
@keyframes rot { to { rotate: 360deg; } }
@keyframes dash { 0% { stroke-dasharray: 6 100; } 50% { stroke-dasharray: 40 100; } 100% { stroke-dasharray: 6 100; stroke-dashoffset: -50; } }
`;
  render() { this.setAttribute('role', 'status'); if (!this.hasAttribute('aria-label')) this.setAttribute('aria-label', '불러오는 중'); }
  update() {
    const s = this.num('size', 22);
    this.root.innerHTML = `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2.6"/></svg>`;
  }
}

/** <a2-badge variant="accent|success|warning|danger|neutral" dot>새 기능</a2-badge> */
export class A2Badge extends A2Element {
  static styles = `
:host { display: inline-flex; vertical-align: middle; }
.b { display: inline-flex; align-items: center; gap: 6px; height: 24px; padding: 0.12em 9px 0; border-radius: 7px; font-size: var(--a2-fs-sm); font-weight: var(--a2-weight-strong); white-space: nowrap; background: var(--a2-fill); border: 1px solid var(--a2-line); color: var(--a2-text-muted); --c: var(--a2-text-muted); }
:host([variant="accent"]) .b { --c: var(--a2-accent); }
:host([variant="success"]) .b { --c: var(--a2-success); }
:host([variant="warning"]) .b { --c: var(--a2-warning); }
:host([variant="danger"]) .b { --c: var(--a2-danger); }
:host([variant]:not([variant="neutral"])) .b { background: color-mix(in srgb, var(--c) 14%, transparent); border-color: color-mix(in srgb, var(--c) 36%, transparent); color: var(--c); }
.dot { display: none; width: 6px; height: 6px; margin-top: -0.12em; border-radius: 50%; background: var(--c); }
:host([dot]) .dot { display: block; }
`;
  render() { this.root.innerHTML = `<span class="b" part="base"><span class="dot"></span><slot></slot></span>`; }
}

/** <a2-card heading="제목" description="설명"> 내용 <div slot="footer">…</div> </a2-card> */
export class A2Card extends A2Element {
  static observedAttributes = ['heading', 'description'];
  static styles = `
:host { display: block; }
.c { border-radius: var(--a2-radius-lg); background: var(--a2-surface); border: 1px solid var(--a2-line); padding: 20px; }
:host([interactive]) .c { cursor: pointer; transition: background-color var(--t1), transform var(--t2) var(--spring); }
:host([interactive]) .c:hover { background: var(--a2-surface-hover); }
:host([interactive]) .c:active { transform: scale(0.985); }
.h { font-size: var(--a2-fs-lg); font-weight: var(--a2-weight-strong); line-height: 1.35; padding-top: 0.12em; }
.d { margin-top: 5px; color: var(--a2-text-muted); line-height: 1.5; font-size: var(--a2-fs-sm); }
.h:empty, .d:empty { display: none; }
.foot { display: flex; gap: 8px; justify-content: flex-end; flex-wrap: wrap; }
.foot.on { margin-top: 18px; }
`;
  render() {
    this.root.innerHTML = `<div class="c" part="base"><div class="top"><div class="h" part="heading"></div><div class="d" part="description"></div></div><div class="body"><slot></slot></div><div class="foot" part="footer"><slot name="footer"></slot></div></div>`;
    this.root.querySelector('slot[name=footer]').addEventListener('slotchange', e => this.$('.foot').classList.toggle('on', e.target.assignedElements().length > 0));
  }
  update() {
    this.$('.h').textContent = this.str('heading');
    this.$('.d').textContent = this.str('description');
    const empty = !this.str('heading') && !this.str('description');
    this.$('.top').style.display = empty ? 'none' : '';
    this.$('.body').style.marginTop = empty ? '0' : '16px';
  }
}

define('a2-progress', A2Progress);
define('a2-spinner', A2Spinner);
define('a2-badge', A2Badge);
define('a2-card', A2Card);
