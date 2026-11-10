// alert / confirm / prompt 를 adas2 대화상자로. 모두 Promise 를 돌려준다.
import '../elements/overlay.js';
import '../elements/button.js';
import '../elements/input.js';

function build({ title, message, buttons, input, danger }) {
  const d = document.createElement('a2-dialog');
  d.setAttribute('size', 'sm');
  if (title) d.setAttribute('heading', title);
  if (message) d.setAttribute('description', message);
  d.setAttribute('no-close', '');
  let field = null;
  if (input) {
    field = document.createElement('a2-input');
    for (const [k, v] of Object.entries(input)) if (v != null && v !== false) field.setAttribute(k, v === true ? '' : v);
    field.setAttribute('autofocus', '');
    field.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.isComposing) { e.preventDefault(); d.close('ok'); } });
    d.append(field);
  }
  const foot = document.createElement('div');
  foot.slot = 'footer';
  foot.style.cssText = 'display:contents';
  buttons.forEach((b, i) => {
    const el = document.createElement('a2-button');
    el.textContent = b.label;
    el.setAttribute('data-close', b.value);
    el.setAttribute('variant', b.primary ? (danger ? 'danger' : 'primary') : 'secondary');
    if (b.primary && !input) el.setAttribute('autofocus', '');
    foot.append(el);
  });
  d.append(foot);
  document.body.append(d);
  return { d, field };
}

const run = (o, pick) => new Promise(resolve => {
  const { d, field } = build(o);
  d.addEventListener('a2-close', e => { resolve(pick(e.detail.returnValue, field)); d.remove(); }, { once: true });
  requestAnimationFrame(() => d.show());
});

const norm = (a, b) => (typeof a === 'object' && a ? a : { message: a, ...b });

/** await alert('저장했습니다') */
export const alert = (message, o = {}) => {
  const c = norm(message, o);
  return run({ ...c, buttons: [{ label: c.okText || '확인', value: 'ok', primary: true }] }, () => undefined);
};

/** if (await confirm('지울까요?', { danger: true })) … */
export const confirm = (message, o = {}) => {
  const c = norm(message, o);
  return run({ ...c, buttons: [{ label: c.cancelText || '취소', value: 'cancel' }, { label: c.okText || '확인', value: 'ok', primary: true }] }, v => v === 'ok');
};

/** const name = await prompt('이름', { value: '', placeholder: '' }) — 취소하면 null */
export const prompt = (message, o = {}) => {
  const c = norm(message, o);
  const input = { value: c.value ?? '', placeholder: c.placeholder, type: c.type, label: c.label };
  return run({ ...c, input, buttons: [{ label: c.cancelText || '취소', value: 'cancel' }, { label: c.okText || '확인', value: 'ok', primary: true }] }, (v, f) => (v === 'ok' ? f.value : null));
};
