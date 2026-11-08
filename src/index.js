// adas2 — 웹용 UI 툴킷
import { setup, setTheme, settings, onSettings } from './core/settings.js';
import { Theme, themes } from './core/theme.js';
import { Ease } from './core/ease.js';
import { animate } from './core/tween.js';
import { tooltip } from './core/tooltip.js';
import { keys } from './core/keys.js';
import { evaluate } from './eval/evaluator.js';
import { Panel } from './core/panel.js';
import { ui, panel, Builder } from './ui.js';
import { Component, get } from './components/base.js';
import { Button } from './components/button.js';
import { Switch, Checkbox, Radio } from './components/choice.js';
import { Slider, Stepper } from './components/slider.js';
import { Field } from './components/field.js';
import { Select, MultiSelect, menu, openMenu } from './components/select.js';
import { Segmented, Tabs } from './components/segmented.js';
import { ColorPicker } from './components/color.js';
import { KeyBind } from './components/keybind.js';
import { Progress, Spinner, toast, dialog, confirm, alert } from './components/feedback.js';
import { Section, ScrollArea } from './components/layout.js';

/* global __VERSION__ */
export const version = typeof __VERSION__ !== 'undefined' ? __VERSION__ : 'dev';

const api = {
  version, setup, setTheme, settings, onSettings, Theme, themes, Ease, animate, tooltip, keys, evaluate,
  ui, panel, Builder, Panel, get, toast, dialog, confirm, alert, menu, openMenu,
  Component, Button, Switch, Checkbox, Radio, Slider, Stepper, Field, Select, MultiSelect,
  Segmented, Tabs, ColorPicker, KeyBind, Progress, Spinner, Section, ScrollArea,
};
export {
  setup, setTheme, settings, onSettings, Theme, themes, Ease, animate, tooltip, keys, evaluate,
  ui, panel, Builder, Panel, get, toast, dialog, confirm, alert, menu, openMenu,
  Component, Button, Switch, Checkbox, Radio, Slider, Stepper, Field, Select, MultiSelect,
  Segmented, Tabs, ColorPicker, KeyBind, Progress, Spinner, Section, ScrollArea,
};
export default api;
