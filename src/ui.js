// 빌더: adas2.ui(부모) 로 만들고, 메서드마다 컴포넌트를 만들어 붙인다.
import { ensureSetup } from './core/settings.js';
import { h, resolveParent } from './core/dom.js';
import { Button } from './components/button.js';
import { Switch, Checkbox, Radio } from './components/choice.js';
import { Slider, Stepper } from './components/slider.js';
import { Field } from './components/field.js';
import { Select, MultiSelect } from './components/select.js';
import { Segmented, Tabs } from './components/segmented.js';
import { ColorPicker } from './components/color.js';
import { KeyBind } from './components/keybind.js';
import { Progress, Spinner } from './components/feedback.js';
import { Section, ScrollArea } from './components/layout.js';
import { Panel } from './core/panel.js';

const opt = (label, o) => (typeof label === 'object' && label !== null && !Array.isArray(label) ? label : { ...o, label });

export class Builder {
  constructor(host) { ensureSetup(); this.host = resolveParent(host); }
  add(c) { c.mount(this.host); return c; }

  /** ui.button('저장', onClick, { variant }) 또는 ui.button({ text, icon, variant, onClick }) */
  button(text, onClick, o = {}) {
    const p = typeof text === 'object' && text !== null ? text : { ...o, text, onClick };
    return this.add(new Button(p));
  }
  switch(label, o) { return this.add(new Switch(opt(label, o))); }
  checkbox(label, o) { return this.add(new Checkbox(opt(label, o))); }
  /** ui.radio('정렬', ['이름', '날짜'], { value }) */
  radio(label, options, o = {}) { return this.add(new Radio(typeof label === 'object' ? label : { ...o, label, options })); }
  slider(label, o) { return this.add(new Slider(opt(label, o))); }
  stepper(label, o) { return this.add(new Stepper(opt(label, o))); }
  field(label, o) { return this.add(new Field(opt(label, o))); }
  select(label, options, o = {}) { return this.add(new Select(typeof label === 'object' ? label : { ...o, label, options })); }
  multiSelect(label, options, o = {}) { return this.add(new MultiSelect(typeof label === 'object' ? label : { ...o, label, options })); }
  segmented(options, o = {}) { return this.add(new Segmented(Array.isArray(options) ? { ...o, options } : options)); }
  color(label, o) { return this.add(new ColorPicker(opt(label, o))); }
  keybind(label, o) { return this.add(new KeyBind(opt(label, o))); }
  progress(label, o) { return this.add(new Progress(opt(label, o))); }
  spinner(o = {}) { return this.add(new Spinner(o)); }
  /** ui.tabs([{ label, build: tab => tab.slider(...) }]) — build 는 빌더를 받는다 */
  tabs(tabs, o = {}) {
    const t = new Tabs({ ...o, tabs: tabs.map(x => ({ ...x, build: x.build ? body => x.build(new Builder(body)) : null })) });
    return this.add(t);
  }
  /** ui.section('제목', { toggle, collapsible, description }, s => { s.slider(...) }) */
  section(title, o = {}, fill) {
    if (typeof o === 'function') { fill = o; o = {}; }
    const s = this.add(new Section({ ...o, title }));
    s.ui = new Builder(s.body);
    if (fill) fill(s.ui);
    return s;
  }
  scroll(o = {}, fill) {
    if (typeof o === 'function') { fill = o; o = {}; }
    const sc = this.add(new ScrollArea(o));
    sc.ui = new Builder(sc.body);
    if (fill) fill(sc.ui);
    return sc;
  }
  /** 가로로 나란히 */
  row(fill, o = {}) { const el = h('div', 'a2 a2-row', this.host); if (o.gap != null) el.style.setProperty('--a2-gap', o.gap); if (fill) fill(new Builder(el)); return el; }
  /** 세로로 쌓기 */
  stack(fill, o = {}) { const el = h('div', 'a2 a2-stack', this.host); if (o.gap != null) el.style.setProperty('--a2-gap', o.gap); if (fill) fill(new Builder(el)); return el; }
  text(t, o = {}) { return h('p', `a2 a2-text${o.muted ? ' a2-muted' : ''}${o.small ? ' a2-small' : ''}`, this.host, t); }
  title(t) { return h('h2', 'a2 a2-title', this.host, t); }
  divider() { return h('hr', 'a2 a2-divider', this.host); }
}

/** 빌더 만들기 */
export const ui = host => new Builder(host);

/** 패널을 만들고 패널 내용용 빌더(panel.ui)를 붙인다 */
export function panel(o = {}, fill) {
  const p = new Panel(o);
  p.ui = new Builder(p.body);
  if (fill) fill(p.ui);
  return p;
}
