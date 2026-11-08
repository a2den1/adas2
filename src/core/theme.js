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
  objectHover: 'object-hover',
  objectOnActive: 'object-on-active',
  switchTrack: 'switch-track',
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
  static get Ocean() { return OCEAN; }
}

const BASE = {
  name: 'dark',
  panelBg: '#1E1C1A',            // 창·패널
  topBar: '#1E1C1A',             // 창 위쪽 (패널과 같은 색)
  menuBg: '#3A3632',
  objectBg: '#2C2926',           // 컨트롤 바탕
  objectHover: '#36322E',        // 마우스를 올렸을 때 컨트롤 바탕
  objectButton: '#FF793F',       // 버튼
  objectActive: '#FF8A55',       // 켜짐·선택
  objectActiveBright: '#FFB792',
  objectOnActive: '#FFFFFF',     // 강조색 위의 글자
  switchTrack: '#4A4540',        // 꺼진 스위치 바탕
  menuHover: 'rgba(255, 138, 85, 0.3)',
  cardHeader: '#262320',
  cardPanel: '#262320',
  softRed: '#F0605D',
  buttonHover: '#FF8C5A',
  buttonPressed: '#E8662F',
  text: '#F4EFEA',
  tooltipBg: 'rgba(12, 11, 10, 0.86)',
  overlayScrim: 'rgba(0, 0, 0, 0.5)',
  outline: 'rgba(255, 255, 255, 0.06)',
  controlOutlineIdle: 'rgba(255, 255, 255, 0)',
  controlOutlineHover: 'rgba(255, 255, 255, 0)',
  mathOk: '#7EE08A', mathWarn: '#FFD166', mathErr: '#FF7A7A',
  channelR: '#FF6B6B', channelG: '#5FD38D', channelB: '#5B8CFF',
  channelA: '#8A847E', channelS: '#4CC9F0', channelV: '#FFC94D',
  inactiveAlpha: 0.4,
  textDimAlpha: 0.6,
  textFaintAlpha: 0.3,
  disabledContentAlpha: 0.42,
  cornerRadius: 22,
  outlineWidth: 2,
  controlHeight: 52,
  controlPaddingY: 8,
  lineHeight: 1.4,
  fontSizeBody: 23,
  fontSizeH1: 32,
  font: '"GmarketSans", "Pretendard", system-ui, -apple-system, "Malgun Gothic", sans-serif',
  fontMono: '"GmarketSans", "Pretendard", system-ui, sans-serif',
};

const DARK = new Theme();

const LIGHT = new Theme({
  name: 'light',
  panelBg: '#FBF8F5',
  topBar: '#FBF8F5',
  menuBg: '#E2DBD3',
  objectBg: '#F0EBE5',
  objectHover: '#E8E1D9',
  objectButton: '#FF793F',
  objectActive: '#FF6E2F',
  objectActiveBright: '#FFA77E',
  objectOnActive: '#FFFFFF',
  switchTrack: '#D9D1C8',
  menuHover: 'rgba(255, 110, 47, 0.22)',
  cardHeader: '#F5F0EA',
  cardPanel: '#F5F0EA',
  buttonHover: '#FF8A55',
  buttonPressed: '#E8662F',
  text: '#2A2420',
  tooltipBg: 'rgba(42, 36, 32, 0.92)',
  outline: 'rgba(0, 0, 0, 0.05)',
  mathOk: '#1F9D4C', mathWarn: '#B7791F', mathErr: '#D64545',
});

const OCEAN = new Theme({
  name: 'ocean',
  panelBg: '#161A20',
  topBar: '#161A20',
  menuBg: '#2E3642',
  objectBg: '#222831',
  objectHover: '#2B323D',
  objectButton: '#3D8BFF',
  objectActive: '#4C95FF',
  objectActiveBright: '#9CC3FF',
  switchTrack: '#3A4350',
  menuHover: 'rgba(76, 149, 255, 0.3)',
  cardHeader: '#1C2129',
  cardPanel: '#1C2129',
  buttonHover: '#5A9DFF',
  buttonPressed: '#2C74E0',
  text: '#EEF2F7',
});
