// 전역 설정. adas2.configure({ config: { ... } }) 로 바꾼다.
export class Config {
  constructor(init = {}) {
    /** 모든 치수에 곱하는 배율. 디자인 단위(줄 높이 50, 글자 24)에 곱해진다. 기본 0.6 → 줄 높이 30px, 글자 14.4px */
    this.uiScale = 0.6;
    /** 툴팁 사용 여부 */
    this.tooltipEnabled = true;
    /** 가운데 버튼 클릭으로 기본값 되돌리기 */
    this.middleClickToDefault = true;
    /** 슬라이더를 끌 때의 감도 (1 = 그대로) */
    this.sliderSensitivity = 1;
    /** 애니메이션 속도 배율 (2 = 두 배 빠르게, 0 = 애니메이션 없음) */
    this.animationSpeed = 1;
    Object.assign(this, init);
  }
  with(over = {}) { return new Config({ ...this, ...over }); }
  static get default() { return DEFAULT; }
}
const DEFAULT = new Config();
