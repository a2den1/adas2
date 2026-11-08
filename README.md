<p align="center">
  <img src="docs/logo.svg" width="96" height="96" alt="adas2">
</p>

<h1 align="center">adas2</h1>

<p align="center">
  요소가 끊기지 않고 이어지며 바뀌는 웹 컴포넌트 UI 프레임워크.<br>
  빌드 도구 없이 <code>&lt;script&gt;</code> 하나, CSS 하나로 씁니다.
</p>

<p align="center">
  <a href="https://adas2-six.vercel.app"><b>데모</b></a> ·
  <a href="#설치">설치</a> ·
  <a href="#컴포넌트">컴포넌트</a> ·
  <a href="#스프링-엔진">스프링 엔진</a>
</p>

---

- **이어지는 움직임** — 상태가 바뀌면 컷이나 페이드 대신 위치·크기·모서리·색이 스프링 하나로 함께 옮겨 갑니다.
  드롭다운에서 고른 항목은 그대로 맨 위로 미끄러져 커지고, 모달은 누른 버튼이 늘어나서 판이 됩니다.
- **표준 커스텀 엘리먼트** — `<a2-dropdown>` 같은 태그가 그냥 HTML이라 React·Vue·Svelte·순수 HTML 어디서든 동작합니다.
- **의존성 0** — 런타임 라이브러리가 없습니다. 압축본 JS 약 29KB, CSS 약 10KB.
- **치수 하나로 크기 조절** — 모든 치수가 `--a2-u` 한 값의 배수라서 한 줄로 전체 크기를 바꿉니다.
- **접근성** — 키보드 조작(Enter·Space·방향키·Esc), ARIA 역할, `prefers-reduced-motion` 을 지원합니다.

## 설치

### CDN

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/web/static/pretendard.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/a2den1/adas2@v1.0.0/dist/adas2.min.css">
<script src="https://cdn.jsdelivr.net/gh/a2den1/adas2@v1.0.0/dist/adas2.min.js"></script>
```

글꼴은 [Pretendard](https://github.com/orioncactus/pretendard), 아이콘은 [Font Awesome 6](https://fontawesome.com) (solid)을 씁니다.

### npm (GitHub에서 설치)

```bash
npm install github:a2den1/adas2
```

```js
import 'adas2';            // 태그 등록
import 'adas2/css';        // 스타일 (번들러가 CSS 를 처리할 때)
import { Motion } from 'adas2';
```

브라우저 전용입니다(서버 렌더링 시에는 클라이언트에서만 불러오세요).

## 빠른 시작

```html
<a2-dropdown value="항목 1">
  <option>항목 1</option>
  <option>항목 2</option>
  <option>항목 3</option>
</a2-dropdown>

<a2-textfield label="이름"></a2-textfield>
<a2-checkbox checked>밥 먹기</a2-checkbox>

<a2-button data-a2-modal="#confirm">저장</a2-button>
<a2-modal id="confirm" heading="저장할까요?">
  바꾼 내용은 저장하기 전까지 반영되지 않아요.
  <a2-button slot="actions" tone="soft" data-a2-close>취소</a2-button>
  <a2-button slot="actions" data-a2-close>저장</a2-button>
</a2-modal>

<script>
  document.querySelector('a2-dropdown').addEventListener('change', e => console.log(e.detail.value));
</script>
```

## 컴포넌트

| 태그 | 속성 | 속성·메서드 (JS) | 이벤트 |
|---|---|---|---|
| `<a2-button>` | `disabled` `tone="soft"` | | `click` |
| `<a2-slider>` | `value` `min` `max` `step` `output` | `value` | `input` `change` |
| `<a2-dropdown>` + `<option>` | `value` `fit` `shadow` | `value` `selectedIndex` `setOpen()` `toggle()` `close()` | `change` `open` `close` |
| `<a2-textfield>` | `label` `value` `name` `type` | `value` `focus()` | `input` `change` |
| `<a2-split>` + `<a2-split-item>` | 항목에 `selected` `menu` `open` | `selectedIndex` | `change` `open` `close` |
| `<a2-navbar>` + `<a2-nav-item>` | `value`, 항목에 `icon` | `value` `select()` | `change` |
| `<a2-appbar>` | `heading` `back` | `setTitle()` | `back` |
| `<a2-checkbox>` | `checked` (안에 글자를 넣으면 라벨형) | `checked` | `change` |
| `<a2-datepicker>` | `value="2026-01-19"` | `value` `shift(±n)` | `change` |
| `<a2-timepicker>` | `value="09:30"` `minute-step` | `value` `setMode('h'\|'m')` | `input` `change` |
| `<a2-modal>` | `heading` `open` | `open(trigger?)` `close()` `isOpen` | `open` `close` |

- **슬라이드바** `output` 이 있으면 손잡이 안에 값이 늘 보이고, 없으면 끄는 동안만 보입니다.
- **드롭다운** `fit` 은 흰 면 폭을 글자에 맞춰 늘였다 줄였다 합니다. `shadow` 는 그림자를 붙입니다.
- **스플릿 버튼** 고른 칸이 넓어지고 이웃 칸이 조금 넓어집니다. `menu` 칸은 누르면 그 자리에서 판으로 커집니다.
- **내비게이션바** `icon` 은 Font Awesome 이름(`house`, `magnifying-glass`, `user` …)입니다.
- **모달** `data-a2-modal="#id"` 가 붙은 요소를 누르면 그 요소에서 모달이 열립니다. `data-a2-close` 가 붙은 요소는 닫기 버튼이 됩니다. Esc·배경 클릭으로도 닫힙니다.

## 크기와 색

```css
:root {
  --a2-u: .36px;            /* 모든 치수의 단위 (기본). 1px 이면 원본 디자인 크기 */
  --a2-picker-scale: 1.6;   /* 날짜·시간 선택만 이만큼 더 크게 */
  --a2-orange: #FF793F;     /* 강조색 */
  --a2-orange-2: #FF9B70;
  --a2-orange-3: #FFCFBA;
  --a2-peach: #FFECE4;
  --a2-surface: #FFFFFF;
  --a2-font: "Pretendard", sans-serif;
}
```

특정 영역만 바꾸려면 그 요소에 같은 변수를 주면 됩니다: `<section style="--a2-u: .5px">`.

## 스프링 엔진

컴포넌트가 쓰는 엔진을 그대로 쓸 수 있습니다. 값 여러 개를 한 번에 스프링으로 옮기고, 매 프레임 `render` 를 부릅니다.

```js
const box = document.querySelector('#box');
const m = new adas2.Motion({ x: 0, s: 1 }, v => {
  box.style.transform = `translateX(${v.x}px) scale(${v.s})`;
});

m.to({ x: 240, s: 1.2 });                                  // 기본 스프링 (약 300ms, ζ≈0.7)
m.to({ x: 0 }, { x: adas2.springs.slow }, () => done());   // 키별 스프링, 멈추면 콜백
m.set({ x: 0, s: 1 });                                     // 애니메이션 없이 바로
```

`adas2.springs` — `base`(기본) · `fast`(앞서 가는 쪽) · `slow`(따라오는 쪽) · `press`(누름 반응).
숨은 탭처럼 `requestAnimationFrame` 이 멈춘 곳에서도 실제 시간에 맞춰 끝납니다.

## 개발

```bash
npm install
npm run build      # src/ → dist/
npm run dev        # http://localhost:5880/docs/
```

| 경로 | 내용 |
|---|---|
| `src/` | 원본 `adas2.js`, `adas2.css` |
| `dist/` | 빌드 결과: 스크립트·ES 모듈·압축본 |
| `types/` | TypeScript 선언 (`HTMLElementTagNameMap` 포함) |
| `docs/` | 데모 페이지 |

## 라이선스

[MIT](LICENSE)
