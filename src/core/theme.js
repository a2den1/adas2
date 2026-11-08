// 테마. 값은 CSS 변수(--a2-*)로 루트 요소에 적용된다.
// theme.with({ panelBg: '#1d1d26' }) 로 일부만 바꾼 새 테마를 만든다.

const KEYS = {
  // 색
  panelBg: 'panel-bg',            // 창 배경
  topBar: 'top-bar',              // 창 위쪽 막대
  menuBg: 'menu-bg',              // 옆 메뉴 배경
  objectBg: 'object-bg',          // 컨트롤 기본 배경
  objectButton: 'object-button',  // 버튼 배경
  objectActive: 'object-active',  // 켜짐·선택·포커스 강조
  objectActiveBright: 'object-active-bright',
  menuHover: 'menu-hover',        // 선택 영역(글자 선택 등)
  cardHeader: 'card-header',
  cardPanel: 'card-panel',
  softRed: 'soft-red',            // 삭제·오류
  buttonHover: 'button-hover',
  buttonPressed: 'button-pressed',
  text: 'text',
  tooltipBg: 'tooltip-bg',
  overlayScrim: 'overlay-scrim',
  outline: 'outline',             // 창 테두리
  controlOutlineIdle: 'control-outline-idle',
  controlOutlineHover: 'control-outline-hover',
  mathOk: 'math-ok', mathWarn: 'math-warn', mathErr: 'math-err',
  channelR: 'channel-r', channelG: 'channel-g', channelB: 'channel-b',
  channelA: 'channel-a', channelS: 'channel-s', channelV: 'channel-v',
  // 숫자
  inactiveAlpha: 'inactive-alpha',
  textDimAlpha: 'text-dim-alpha',
  textFaintAlpha: 'text-faint-alpha',
  disabledContentAlpha: 'disabled-alpha',
  cornerRadius: 'radius',
  outlineWidth: 'outline-width',
  controlHeight: 'control-height',
  controlPaddingY: 'control-pad-y',
  lineHeight: 'line-height',
  fontSizeBody: 'font-body',
  fontSizeH1: 'font-h1',
  // 글꼴
  font: 'font',
  fontMono: 'font-mono',
};
const UNITLESS = new Set(['inactiveAlpha', 'textDimAlpha', 'textFaintAlpha', 'disabledContentAlpha', 'lineHeight']);
const SIZES = new Set(['cornerRadius', 'outlineWidth', 'controlHeight', 'controlPaddingY', 'fontSizeBody', 'fontSizeH1']);

export class Theme {
  constructor(values = {}) {
    Object.assign(this, BASE, values);
    Object.freeze(this);
  }
  /** 일부 값만 바꾼 새 테마 */
  with(over = {}) { return new Theme({ ...this, ...over }); }
  /** 글꼴 크기에 맞는 줄 높이. controlHeight 보다 작아지지 않는다. */
  controlHeightFor(fontSize) { return Math.max(this.controlHeight, fontSize * this.lineHeight + this.controlPaddingY * 2); }
  /** CSS 변수로 요소에 적용한다 */
  applyTo(el) {
    for (const [k, v] of Object.entries(KEYS)) {
      const val = this[k];
      if (val === undefined) continue;
      el.style.setProperty(`--a2-${v}`, SIZES.has(k) ? String(val) : UNITLESS.has(k) ? String(val) : val);
    }
    el.dataset.a2Theme = this.name || 'custom';
  }
  static get Dark() { return DARK; }
  static get Light() { return LIGHT; }
  static get Orange() { return ORANGE; }
}

const BASE = {
  name: 'dark',
  panelBg: '#25242E',
  topBar: '#414255',
  menuBg: '#6B6E8B',
  objectBg: '#3C3A4B',
  objectButton: '#7A83DF',
  objectActive: '#919AFF',
  objectActiveBright: '#CFD3FF',
  menuHover: 'rgba(162, 167, 224, 0.4)',
  cardHeader: '#4C4D66',
  cardPanel: '#2F2E3A',
  softRed: '#E2676D',
  buttonHover: '#9CA3EC',
  buttonPressed: '#CFD3FF',
  text: '#FFFFFF',
  tooltipBg: 'rgba(0, 0, 0, 0.6)',
  overlayScrim: 'rgba(0, 0, 0, 0.58)',
  outline: '#FFFFFF',
  controlOutlineIdle: 'rgba(255, 255, 255, 0)',
  controlOutlineHover: '#919AFF',
  mathOk: '#96FF91', mathWarn: '#FFE591', mathErr: '#FF9191',
  channelR: '#FF6B70', channelG: '#7AD17A', channelB: '#8F8FE6',
  channelA: '#737373', channelS: '#61C7FF', channelV: '#FFD159',
  inactiveAlpha: 0.4,
  textDimAlpha: 0.6,
  textFaintAlpha: 0.2,
  disabledContentAlpha: 0.42,
  cornerRadius: 12,
  outlineWidth: 2,
  controlHeight: 50,
  controlPaddingY: 8,
  lineHeight: 1.35,
  fontSizeBody: 24,
  fontSizeH1: 32,
  font: '"SUIT", "Pretendard", system-ui, -apple-system, "Malgun Gothic", sans-serif',
  fontMono: '"JetBrains Mono", ui-monospace, "Cascadia Mono", Consolas, monospace',
};

const DARK = new Theme();

const LIGHT = new Theme({
  name: 'light',
  panelBg: '#EDEDF2',
  topBar: '#D1D4E6',
  menuBg: '#C7C9E0',
  objectBg: '#E0E0EB',
  objectButton: '#6B75D9',
  objectActive: '#5966E6',
  objectActiveBright: '#3340BF',
  buttonHover: '#5560CF',
  buttonPressed: '#3340BF',
  cardHeader: '#D6D8E8',
  cardPanel: '#F6F6FA',
  text: '#1A1A24',
  tooltipBg: 'rgba(242, 242, 250, 0.95)',
  outline: 'rgba(26, 26, 36, 0.5)',
  controlOutlineHover: '#5966E6',
  menuHover: 'rgba(89, 102, 230, 0.25)',
  mathOk: '#1E9E3A', mathWarn: '#B08300', mathErr: '#D23C3C',
});

const ORANGE = new Theme({
  name: 'orange',
  objectButton: '#FF793F',
  objectActive: '#FF9B70',
  objectActiveBright: '#FFCFBA',
  buttonHover: '#FF8C59',
  buttonPressed: '#FFCFBA',
  controlOutlineHover: '#FF9B70',
  menuHover: 'rgba(255, 155, 112, 0.35)',
});
