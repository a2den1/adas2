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
.track { position: relative; height: 18px; border-radius: 10px; border: var(--a2-ring) solid var(--a2-line-strong); }
.in { position: absolute; inset: 3px; border-radius: 4px; overflow: hidden; }
.fill { position: absolute; inset: 0 auto 0 0; width: 100%; border-radius: 4px; background: var(--a2-accent); transform-origin: left; transform: scaleX(0); transition: transform var(--t3) var(--spring); }
:host([variant="success"]) .fill { background: var(--a2-success); }
:host([variant="danger"]) .fill { background: var(--a2-danger); }
.ind .fill { width: 36%; transform: none; transition: none; animation: run calc(1.3s / var(--a2-speed)) cubic-bezier(0.6, 0.1, 0.4, 0.9) infinite; }
@keyframes run { from { translate: -100% 0; } to { translate: 280% 0; } }
`;
  render() {
    this.setAttribute('role', 'progressbar');
    this.root.innerHTML = `<div class="head"><div class="label t" part="label"></div><div class="out t"></div></div><div class="track" part="track"><div class="in"><div class="fill" part="fill"></div></div></div>`;
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
:host { display: inline-block; vertical-align: middle; line-height: 0; }
.sp { display: block; position: relative; width: var(--s); height: var(--s); border-radius: 32%; border: var(--a2-ring) solid var(--a2-line-strong); }
.sp i { position: absolute; left: 11%; top: 11%; width: 36%; height: 36%; border-radius: 26%; background: var(--a2-accent); animation: orbit calc(1.3s / var(--a2-speed)) infinite; }
@keyframes orbit {
  0%, 100% { translate: 0 0; animation-timing-function: cubic-bezier(0.6, 0, 0.2, 1); }
  25% { translate: 117% 0; animation-timing-function: cubic-bezier(0.6, 0, 0.2, 1); }
  50% { translate: 117% 117%; animation-timing-function: cubic-bezier(0.6, 0, 0.2, 1); }
  75% { translate: 0 117%; animation-timing-function: cubic-bezier(0.6, 0, 0.2, 1); }
}
`;
  render() { this.setAttribute('role', 'status'); if (!this.hasAttribute('aria-label')) this.setAttribute('aria-label', '불러오는 중'); }
  update() {
    const s = this.num('size', 22);
    this.root.innerHTML = `<span class="sp" part="base" style="--s:${s}px"><i></i></span>`;
  }
}

/** <a2-badge variant="accent|success|warning|danger|neutral" dot>새 기능</a2-badge> */
export class A2Badge extends A2Element {
  static styles = `
:host { display: inline-flex; vertical-align: middle; }
.b { display: inline-flex; padding: 2px; border-radius: 9px; border: var(--a2-ring) solid var(--c); --c: var(--a2-line-strong); --f: var(--a2-fill-active); --t: var(--a2-text-muted); }
.in { display: inline-flex; align-items: center; gap: 6px; height: 18px; padding: 0.12em 8px 0; border-radius: 5px; background: var(--f); color: var(--t); font-size: var(--a2-fs-sm); font-weight: var(--a2-weight-strong); white-space: nowrap; }
:host([variant="accent"]) .b { --c: var(--a2-accent); --f: var(--a2-accent); --t: var(--a2-on-accent); }
:host([variant="success"]) .b { --c: var(--a2-success); }
:host([variant="warning"]) .b { --c: var(--a2-warning); }
:host([variant="danger"]) .b { --c: var(--a2-danger); }
:host(:is([variant="success"], [variant="warning"], [variant="danger"])) .b { --f: color-mix(in srgb, var(--c) 20%, transparent); --t: var(--c); }
.dot { display: none; width: 6px; height: 6px; margin-top: -0.12em; border-radius: 2px; background: currentColor; }
:host([dot]) .dot { display: block; }
`;
  render() { this.root.innerHTML = `<span class="b" part="base"><span class="in"><span class="dot"></span><slot></slot></span></span>`; }
}

/** <a2-card heading="제목" description="설명"> 내용 <div slot="footer">…</div> </a2-card> */
export class A2Card extends A2Element {
  static observedAttributes = ['heading', 'description'];
  static styles = `
:host { display: block; }
.c { position: relative; isolation: isolate; border-radius: var(--a2-radius-lg); border: var(--a2-ring) solid var(--a2-line); padding: 20px; transition: border-color var(--t1); }
.c::before { content: ''; position: absolute; inset: var(--a2-gap); z-index: -1; border-radius: calc(var(--a2-radius-lg) - var(--in)); transition: background-color var(--t1), inset var(--t2) var(--pop); }
:host([interactive]) .c { cursor: pointer; }
:host([interactive]) .c:hover { border-color: var(--a2-line-strong); }
:host([interactive]) .c:hover::before { background: var(--a2-fill); }
:host([interactive]) .c:active::before { inset: calc(var(--a2-gap) + 4px); background: var(--a2-fill-hover); }
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
