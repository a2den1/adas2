// 툴팁: 화면에 하나만 있다. 마우스를 올리고 0.14초 뒤 나타나 커서를 따라간다.
import { ctx, ensureDefaults } from './context.js';
import { h, scaleOf } from './dom.js';
import { tweenNumber } from './tween.js';

let box = null, alphaTween = null, delayTimer = 0, follow = 0;
let mouse = { x: 0, y: 0 }, pos = { x: 0, y: 0 }, current = null;

addEventListener('pointermove', e => { mouse = { x: e.clientX, y: e.clientY }; }, { passive: true });

function ensureBox() {
  if (box) return box;
  ensureDefaults();
  box = h('div', 'a2 a2-tooltip', document.body);
  box.setAttribute('role', 'tooltip');
  box.style.opacity = '0';
  return box;
}

function target() {
  const s = scaleOf(box);
  let x = mouse.x + 24 * s, y = mouse.y + 28 * s;
  const w = box.offsetWidth, ht = box.offsetHeight;
  x = Math.min(x, innerWidth - w - 4); y = Math.min(y, innerHeight - ht - 4);
  if (x < 4) x = 4; if (y < 4) y = 4;
  return { x, y };
}
function loop() {
  if (!current) { follow = 0; return; }
  const t = target();
  pos.x += (t.x - pos.x) * 0.6; pos.y += (t.y - pos.y) * 0.6;   // 아주 빠른 감쇠 따라가기
  box.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
  follow = requestAnimationFrame(loop);
}
function fade(to, done) {
  alphaTween && alphaTween.kill();
  alphaTween = tweenNumber(+box.style.opacity || 0, to, 0.16, 'OutSine', v => { box.style.opacity = v; }, done);
}

export const Tooltip = {
  /** 글자를 보여 준다 */
  show(text) {
    if (!ctx.config.tooltipEnabled || !text) return;
    ensureBox();
    current = text;
    box.textContent = text;
    box.style.display = 'block';
    box.style.opacity = '0';
    const s = scaleOf(box);
    pos = { x: mouse.x + 20 * s, y: mouse.y + 20 * s };
    box.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
    clearTimeout(delayTimer);
    delayTimer = setTimeout(() => {
      if (current !== text) return;
      fade(1);
      if (!follow) follow = requestAnimationFrame(loop);
    }, 140 / Math.max(ctx.config.animationSpeed, 0.001));
  },
  hide() {
    if (!box || !current) return;
    current = null;
    clearTimeout(delayTimer);
    fade(0, () => { if (!current) box.style.display = 'none'; });
  },
};

/** 요소에 툴팁을 붙인다. text 는 문자열 또는 문자열을 돌려주는 함수 */
export function tooltip(el, text) {
  const get = typeof text === 'function' ? text : () => text;
  el.addEventListener('pointerenter', e => { if (e.pointerType !== 'touch') Tooltip.show(get()); });
  el.addEventListener('pointerleave', () => Tooltip.hide());
  el.addEventListener('pointerdown', () => Tooltip.hide());
  return el;
}
