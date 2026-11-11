// adas2 — 웹 컴포넌트 UI 모음. 스크립트 하나를 넣으면 <a2-*> 태그를 바로 쓸 수 있다.
import { ensureGlobal } from './core/base.js';
import './elements/button.js';
import './elements/input.js';
import './elements/number.js';
import './elements/toggle.js';
import './elements/radio.js';
import './elements/slider.js';
import './elements/select.js';
import './elements/segmented.js';
import './elements/tabs.js';
import './elements/color.js';
import './elements/keybind.js';
import './elements/display.js';
import './elements/overlay.js';
import './elements/menu.js';
import { toast } from './api/toast.js';
import { alert, confirm, prompt } from './api/dialogs.js';
import { installTooltips } from './api/tooltip.js';
import { theme, themes } from './api/theme.js';
import { animate } from './core/animate.js';
import { Ease } from './core/ease.js';
import { evaluate } from './core/evaluator.js';
import { matches as matchKey, keyNames } from './core/keys.js';

export const version = __VERSION__;

if (typeof document !== 'undefined') {
  ensureGlobal();
  installTooltips();
}

export { toast, alert, confirm, prompt, theme, themes, animate, Ease, evaluate, matchKey, keyNames };
export default { version, toast, alert, confirm, prompt, theme, themes, animate, Ease, evaluate, matchKey, keyNames };
