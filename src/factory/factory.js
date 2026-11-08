// 팩토리: 컨트롤을 한 줄로 만든다. 모두 (부모, id, 옵션 | 설정 함수) 순서.
import { ensureDefaults } from '../core/context.js';
import { h, resolveParent } from '../core/dom.js';
import { tooltip } from '../core/tooltip.js';
import { Button } from '../controls/button.js';
import { Toggle } from '../controls/toggle.js';
import { Slider } from '../controls/slider.js';
import { Input } from '../controls/input.js';
import { Segmented } from '../controls/segmented.js';
import { Dropdown, MultiDropdown } from '../controls/dropdown.js';
import { ColorPicker } from '../controls/colorpicker.js';
import { Card, ScrollView } from '../controls/card.js';

export const Factory = {
  /**
   * 버튼. Factory.button(parent, id, { text, onClick })
   * 또는 짧게 Factory.button(parent, onClick, '글자', 'id')
   */
  button(parent, a, b, c) {
    if (typeof a === 'function') return new Button(parent, c || null, { onClick: a, text: b ?? '' });
    return new Button(parent, a, b);
  },
  toggle: (parent, id, opts) => new Toggle(parent, id, opts),
  slider: (parent, id, opts) => new Slider(parent, id, opts),
  input: (parent, id, opts) => new Input(parent, id, opts),
  segmented: (parent, id, opts) => new Segmented(parent, id, opts),
  dropdown: (parent, id, opts) => new Dropdown(parent, id, opts),
  multiDropdown: (parent, id, opts) => new MultiDropdown(parent, id, opts),
  colorPicker: (parent, id, opts) => new ColorPicker(parent, id, opts),
  card: (parent, opts) => new Card(parent, opts),
  scrollView: (parent, opts) => new ScrollView(parent, opts),

  /** 컨트롤 한 줄 높이의 빈 줄 (가로로 나란히 놓기) */
  row(parent, height) {
    ensureDefaults();
    const el = h('div', 'a2 a2-row', resolveParent(parent));
    if (height != null) el.style.setProperty('--a2-h', height);
    return el;
  },
  /** 세로로 쌓는 묶음 */
  stack(parent, gap = 8) {
    ensureDefaults();
    const el = h('div', 'a2 a2-stack', resolveParent(parent));
    el.style.setProperty('--a2-gap', gap);
    return el;
  },
  /** 글자. { h1: true } 면 제목, { dim: true } 면 흐린 글자 */
  text(parent, text, { h1 = false, dim = false } = {}) {
    ensureDefaults();
    const el = h(h1 ? 'h2' : 'p', `a2 a2-text${h1 ? ' a2-h1' : ''}${dim ? ' a2-dim' : ''}`, resolveParent(parent), text);
    return el;
  },
  tooltip,
};
