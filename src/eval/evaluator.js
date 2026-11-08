// 숫자 입력칸에 쓰는 계산식 해석기. eval 을 쓰지 않는다.
// 지원: + - * / % ^ ( ), 단항 + -, 상수 pi e, 함수 sin cos tan asin acos atan sqrt abs floor ceil round
//       log(밑 10) ln exp min max pow clamp, 그리고 x (현재 값)
const FNS = {
  sin: Math.sin, cos: Math.cos, tan: Math.tan, asin: Math.asin, acos: Math.acos, atan: Math.atan,
  sqrt: Math.sqrt, abs: Math.abs, floor: Math.floor, ceil: Math.ceil, round: Math.round,
  log: Math.log10, ln: Math.log, exp: Math.exp, min: Math.min, max: Math.max, pow: Math.pow,
  clamp: (v, a, b) => Math.min(Math.max(v, a), b),
};
const CONSTS = { pi: Math.PI, e: Math.E };

function tokenize(src) {
  const out = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (/\s/.test(c)) { i++; continue; }
    if (/[0-9.]/.test(c)) {
      const m = /^(\d*\.?\d+(?:e[+-]?\d+)?|\d+\.)/i.exec(src.slice(i));
      if (!m) throw new Error(`숫자 형식: ${src.slice(i, i + 4)}`);
      out.push({ t: 'num', v: parseFloat(m[0]) }); i += m[0].length; continue;
    }
    if (/[a-z_]/i.test(c)) {
      const m = /^[a-z_][a-z0-9_]*/i.exec(src.slice(i));
      out.push({ t: 'id', v: m[0].toLowerCase() }); i += m[0].length; continue;
    }
    if ('+-*/%^(),'.includes(c)) { out.push({ t: c }); i++; continue; }
    throw new Error(`알 수 없는 문자: ${c}`);
  }
  return out;
}

/**
 * 식을 계산한다.
 * @param {string} src 식
 * @param {object} [vars] 변수 (예: { x: 현재값 })
 * @returns {{ ok: boolean, value?: number, error?: string }}
 */
export function evaluate(src, vars = {}) {
  try {
    const tk = tokenize(String(src));
    let p = 0;
    const peek = () => tk[p], eat = t => { if (tk[p] && tk[p].t === t) return tk[p++]; throw new Error(`'${t}' 가 필요합니다`); };
    const expr = () => {
      let v = term();
      while (peek() && (peek().t === '+' || peek().t === '-')) v = tk[p++].t === '+' ? v + term() : v - term();
      return v;
    };
    const term = () => {
      let v = unary();
      for (;;) {
        const t = peek(); if (!t) break;
        if (t.t === '*') { p++; v *= unary(); }
        else if (t.t === '/') { p++; v /= unary(); }
        else if (t.t === '%') { p++; v %= unary(); }
        else if (t.t === 'num' || t.t === 'id' || t.t === '(') v *= unary(); // 2pi, 3(4+1)
        else break;
      }
      return v;
    };
    const unary = () => {
      const t = peek();
      if (t && t.t === '-') { p++; return -unary(); }
      if (t && t.t === '+') { p++; return unary(); }
      return power();
    };
    const power = () => {
      const b = atom();
      if (peek() && peek().t === '^') { p++; return Math.pow(b, unary()); }
      return b;
    };
    const atom = () => {
      const t = tk[p++];
      if (!t) throw new Error('식이 끝났습니다');
      if (t.t === 'num') return t.v;
      if (t.t === '(') { const v = expr(); eat(')'); return v; }
      if (t.t === 'id') {
        if (peek() && peek().t === '(') {
          const fn = FNS[t.v]; if (!fn) throw new Error(`없는 함수: ${t.v}`);
          p++; const args = [];
          if (!(peek() && peek().t === ')')) { args.push(expr()); while (peek() && peek().t === ',') { p++; args.push(expr()); } }
          eat(')');
          return fn(...args);
        }
        if (t.v in vars) return +vars[t.v];
        if (t.v in CONSTS) return CONSTS[t.v];
        throw new Error(`없는 이름: ${t.v}`);
      }
      throw new Error(`예상하지 못한 '${t.t}'`);
    };
    if (!tk.length) return { ok: false, error: '비어 있음' };
    const value = expr();
    if (p < tk.length) throw new Error(`남은 글자: ${tk[p].t === 'num' || tk[p].t === 'id' ? tk[p].v : tk[p].t}`);
    if (!Number.isFinite(value)) return { ok: false, error: '숫자가 아님' };
    return { ok: true, value };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}
