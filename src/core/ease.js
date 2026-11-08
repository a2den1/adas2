// 이징 함수. t(0~1) → 진행률. 이름은 Ease.OutCubic 처럼 쓴다.
const { sin, cos, PI, pow, sqrt } = Math;
const c1 = 1.70158, c2 = c1 * 1.525, c3 = c1 + 1, c4 = (2 * PI) / 3, c5 = (2 * PI) / 4.5;

function outBounce(t) {
  const n1 = 7.5625, d1 = 2.75;
  if (t < 1 / d1) return n1 * t * t;
  if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
  if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
  return n1 * (t -= 2.625 / d1) * t + 0.984375;
}

export const Ease = Object.freeze({
  Linear: t => t,
  InSine: t => 1 - cos((t * PI) / 2),
  OutSine: t => sin((t * PI) / 2),
  InOutSine: t => -(cos(PI * t) - 1) / 2,
  InQuad: t => t * t,
  OutQuad: t => 1 - (1 - t) * (1 - t),
  InOutQuad: t => (t < 0.5 ? 2 * t * t : 1 - pow(-2 * t + 2, 2) / 2),
  InCubic: t => t * t * t,
  OutCubic: t => 1 - pow(1 - t, 3),
  InOutCubic: t => (t < 0.5 ? 4 * t * t * t : 1 - pow(-2 * t + 2, 3) / 2),
  InQuart: t => t ** 4,
  OutQuart: t => 1 - pow(1 - t, 4),
  InOutQuart: t => (t < 0.5 ? 8 * t ** 4 : 1 - pow(-2 * t + 2, 4) / 2),
  InQuint: t => t ** 5,
  OutQuint: t => 1 - pow(1 - t, 5),
  InOutQuint: t => (t < 0.5 ? 16 * t ** 5 : 1 - pow(-2 * t + 2, 5) / 2),
  InExpo: t => (t === 0 ? 0 : pow(2, 10 * t - 10)),
  OutExpo: t => (t === 1 ? 1 : 1 - pow(2, -10 * t)),
  InOutExpo: t => (t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? pow(2, 20 * t - 10) / 2 : (2 - pow(2, -20 * t + 10)) / 2),
  InCirc: t => 1 - sqrt(1 - t * t),
  OutCirc: t => sqrt(1 - pow(t - 1, 2)),
  InOutCirc: t => (t < 0.5 ? (1 - sqrt(1 - pow(2 * t, 2))) / 2 : (sqrt(1 - pow(-2 * t + 2, 2)) + 1) / 2),
  InBack: t => c3 * t ** 3 - c1 * t * t,
  OutBack: t => 1 + c3 * pow(t - 1, 3) + c1 * pow(t - 1, 2),
  InOutBack: t => (t < 0.5 ? (pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2 : (pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2),
  InElastic: t => (t === 0 ? 0 : t === 1 ? 1 : -pow(2, 10 * t - 10) * sin((t * 10 - 10.75) * c4)),
  OutElastic: t => (t === 0 ? 0 : t === 1 ? 1 : pow(2, -10 * t) * sin((t * 10 - 0.75) * c4) + 1),
  InOutElastic: t => (t === 0 ? 0 : t === 1 ? 1 : t < 0.5
    ? -(pow(2, 20 * t - 10) * sin((20 * t - 11.125) * c5)) / 2
    : (pow(2, -20 * t + 10) * sin((20 * t - 11.125) * c5)) / 2 + 1),
  InBounce: t => 1 - outBounce(1 - t),
  OutBounce: outBounce,
  InOutBounce: t => (t < 0.5 ? (1 - outBounce(1 - 2 * t)) / 2 : (1 + outBounce(2 * t - 1)) / 2),
});

/** 이름 또는 함수를 이징 함수로 바꾼다. */
export const easeOf = e => (typeof e === 'function' ? e : Ease[e] || Ease.OutCubic);
