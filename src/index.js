// adas2 — 웹용 UI 툴킷
import { configure, ensureDefaults, setTheme, setConfig, ctx, onContextChange } from './core/context.js';
import { Config } from './core/config.js';
import { Theme } from './core/theme.js';
import { Ease } from './core/ease.js';
import { tween, tweenNumber, tweenColor } from './core/tween.js';
import { Tooltip, tooltip } from './core/tooltip.js';
import { A2Window, WindowManager } from './core/window.js';
import { evaluate } from './eval/evaluator.js';
import { Control, getControl } from './controls/control.js';
import { Button } from './controls/button.js';
import { Toggle } from './controls/toggle.js';
import { Slider } from './controls/slider.js';
import { Input } from './controls/input.js';
import { Segmented } from './controls/segmented.js';
import { Dropdown, MultiDropdown } from './controls/dropdown.js';
import { ColorPicker } from './controls/colorpicker.js';
import { Card, ScrollView } from './controls/card.js';
import { Factory } from './factory/factory.js';
import { PageSwitcher, switchPage } from './transition/pageSwitcher.js';
import { KeyCombo, ShortcutManager } from './input/shortcut.js';

/* global __VERSION__ */
export const version = typeof __VERSION__ !== 'undefined' ? __VERSION__ : 'dev';

export {
  configure, ensureDefaults, setTheme, setConfig, onContextChange,
  Config, Theme, Ease, tween, tweenNumber, tweenColor, evaluate,
  Tooltip, tooltip, A2Window as Window, WindowManager,
  Control, getControl, Button, Toggle, Slider, Input, Segmented, Dropdown, MultiDropdown, ColorPicker, Card, ScrollView,
  Factory, PageSwitcher, switchPage, KeyCombo, ShortcutManager,
};

const adas2 = {
  version,
  get context() { return ctx; },
  configure, ensureDefaults, setTheme, setConfig, onContextChange,
  Config, Theme, Ease, tween, tweenNumber, tweenColor, evaluate,
  Tooltip, tooltip, Window: A2Window, WindowManager,
  Control, getControl, Button, Toggle, Slider, Input, Segmented, Dropdown, MultiDropdown, ColorPicker, Card, ScrollView,
  Factory, PageSwitcher, switchPage, KeyCombo, ShortcutManager,
};
export default adas2;
