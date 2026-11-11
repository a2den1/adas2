// adas2 — 웹 컴포넌트 UI 모음. 스크립트 하나를 넣으면 <a2-*> 태그를 바로 쓸 수 있다.
import { ensureGlobal, A2Element, define, icon, addIcon, ripple, BASE_CSS } from './core/base.js';
import './elements/button.js';
import './elements/segmented.js';
import './elements/field.js';
import './elements/toggle.js';
import './elements/radio.js';
import './elements/slider.js';
import './elements/select.js';
import './elements/tabs.js';
import './elements/color.js';
import './elements/keybind.js';
import './elements/display.js';
import './elements/overlay.js';
import './elements/menu.js';
import { toast } from './api/toast.js';
import { alert, confirm, prompt } from './api/dialogs.js';
import { installTooltips } from './api/tooltip.js';
import { theme, themes, defineTheme } from './api/theme.js';
import { animate, reveal } from './core/animate.js';
import { Spring, springs, SPRINGS, setMotion, installMotion, springEase, drag, rubber } from './core/spring.js';
import { openPopover } from './core/popover.js';
import { Ease } from './core/ease.js';
import { evaluate } from './core/evaluator.js';
import { matches as matchKey, keyNames } from './core/keys.js';

export const version = __VERSION__;

if (typeof document !== 'undefined') {
  ensureGlobal();
  installMotion();
  installTooltips();
}

// 직접 요소를 만들 때 쓰는 것들: class extends A2Element, define('x-…', …), Spring, drag, ripple, openPopover
export {
  toast, alert, confirm, prompt, theme, themes, defineTheme, setMotion,
  A2Element, define, BASE_CSS, icon, addIcon, ripple, openPopover,
  Spring, springs, SPRINGS, springEase, drag, rubber, animate, reveal, Ease, evaluate, matchKey, keyNames,
};
export default {
  version, toast, alert, confirm, prompt, theme, themes, defineTheme, setMotion,
  A2Element, define, BASE_CSS, icon, addIcon, ripple, openPopover,
  Spring, springs, SPRINGS, springEase, drag, rubber, animate, reveal, Ease, evaluate, matchKey, keyNames,
};
