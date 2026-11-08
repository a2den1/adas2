// 테마: 색·크기·글꼴. 루트 요소에 CSS 변수(--a2-*)로 들어간다.
// adas2.themes.dark.extend({ accent: '#4C95FF' }) 처럼 일부만 바꾼 테마를 만든다.

const VARS = {
  bg: 'bg', surface: 'surface', surfaceHover: 'surface-hover', surfaceActive: 'surface-active', raised: 'raised',
  accent: 'accent', accentHover: 'accent-hover', accentPressed: 'accent-pressed', accentSoft: 'accent-soft', onAccent: 'on-accent',
  text: 'text', textMuted: 'text-muted', textFaint: 'text-faint',
  danger: 'danger', success: 'success', warning: 'warning',
  shadow: 'shadow', scrim: 'scrim', tooltip: 'tooltip',
  radius: 'radius', radiusLarge: 'radius-lg', controlHeight: 'ch',
  fontSize: 'fs', fontSizeSmall: 'fs-sm', fontSizeTitle: 'fs-title',
  font: 'font', weight: 'weight', weightStrong: 'weight-strong',
};

export class Theme {
  constructor(values) { Object.assign(this, values); Object.freeze(this); }
  /** 일부 값만 바꾼 새 테마 */
  extend(over = {}) { return new Theme({ ...this, ...over, name: over.name || `${this.name}+` }); }
  /** 요소에 CSS 변수로 넣는다 */
  apply(el) {
    for (const [k, v] of Object.entries(VARS)) if (this[k] !== undefined) el.style.setProperty(`--a2-${v}`, String(this[k]));
    el.dataset.a2Theme = this.name;
  }
}

const font = '"GmarketSans", "Pretendard", system-ui, -apple-system, "Malgun Gothic", sans-serif';
const sizes = { radius: 14, radiusLarge: 24, controlHeight: 52, fontSize: 24, fontSizeSmall: 20, fontSizeTitle: 32, font, weight: 300, weightStrong: 500 };

const dark = new Theme({
  name: 'dark', ...sizes,
  bg: '#1B1917', surface: '#272421', surfaceHover: '#2F2B28', surfaceActive: '#36312D', raised: '#2C2825',
  accent: '#FF7A45', accentHover: '#FF8B5C', accentPressed: '#EB6630', accentSoft: 'rgba(255, 122, 69, 0.16)', onAccent: '#FFFFFF',
  text: '#F3EEE9', textMuted: 'rgba(243, 238, 233, 0.58)', textFaint: 'rgba(243, 238, 233, 0.3)',
  danger: '#F25F5C', success: '#5CCB8A', warning: '#F4B740',
  shadow: '0 18px 50px rgba(0, 0, 0, 0.45)', scrim: 'rgba(10, 9, 8, 0.55)', tooltip: 'rgba(14, 13, 12, 0.92)',
});

const light = new Theme({
  name: 'light', ...sizes,
  bg: '#FAF7F3', surface: '#EFEAE4', surfaceHover: '#E8E2DA', surfaceActive: '#E0D9D0', raised: '#FFFFFF',
  accent: '#F26A32', accentHover: '#FF7A45', accentPressed: '#D9581F', accentSoft: 'rgba(242, 106, 50, 0.13)', onAccent: '#FFFFFF',
  text: '#29231F', textMuted: 'rgba(41, 35, 31, 0.58)', textFaint: 'rgba(41, 35, 31, 0.3)',
  danger: '#D84542', success: '#259B5A', warning: '#C98A10',
  shadow: '0 18px 50px rgba(60, 40, 20, 0.16)', scrim: 'rgba(40, 30, 20, 0.3)', tooltip: 'rgba(41, 35, 31, 0.94)',
});

const ocean = new Theme({
  name: 'ocean', ...sizes,
  bg: '#14181E', surface: '#1F252D', surfaceHover: '#262D37', surfaceActive: '#2D3540', raised: '#232A33',
  accent: '#4C8DFF', accentHover: '#649CFF', accentPressed: '#3676E6', accentSoft: 'rgba(76, 141, 255, 0.16)', onAccent: '#FFFFFF',
  text: '#EDF1F6', textMuted: 'rgba(237, 241, 246, 0.58)', textFaint: 'rgba(237, 241, 246, 0.3)',
  danger: '#F2645F', success: '#4FC68A', warning: '#F1B643',
  shadow: '0 18px 50px rgba(0, 0, 0, 0.5)', scrim: 'rgba(5, 8, 12, 0.55)', tooltip: 'rgba(10, 13, 17, 0.92)',
});

export const themes = Object.freeze({ dark, light, ocean });
