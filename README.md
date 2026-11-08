<div align="center">

<img src="docs/logo.svg" width="88" height="88" alt="adas2 로고">

# adas2

웹 컴포넌트로 만든 UI 프레임워크

**한국어** · [English](README.en.md)

[![version](https://img.shields.io/badge/version-1.1.0-FF793F?style=flat-square)](https://github.com/a2den1/adas2/releases)
![size](https://img.shields.io/badge/min-36KB%20JS%20%2B%2014KB%20CSS-3E3E3E?style=flat-square)
![dependencies](https://img.shields.io/badge/dependencies-0-3E3E3E?style=flat-square)
[![license](https://img.shields.io/badge/license-adas2%20License-FF9B70?style=flat-square)](LICENSE)

[데모](https://adas2-six.vercel.app) · [설치](#설치) · [컴포넌트](#컴포넌트) · [설정](#크기와-색) · [라이선스](#라이선스)

<a href="https://adas2-six.vercel.app"><img src="docs/preview.png" width="820" alt="adas2 컴포넌트 미리보기"></a>

</div>

## 소개

adas2는 `<a2-button>`, `<a2-dropdown>` 같은 HTML 태그로 쓰는 UI 컴포넌트 모음입니다.

- 표준 커스텀 엘리먼트라 순수 HTML, React, Vue, Svelte 등 어디서나 쓸 수 있습니다.
- 런타임 의존성이 없고, CSS 파일 하나와 JS 파일 하나만 불러오면 됩니다.
- `--a2-u` 값 하나로 전체 크기를, CSS 변수로 색을 바꿀 수 있습니다.
- 키보드 조작과 ARIA 역할을 지원하고, `prefers-reduced-motion` 설정을 따릅니다.

## 컴포넌트

<table>
  <tr>
    <td align="center" width="50%"><img src="docs/img/button.png" alt="버튼"><br><b>버튼</b> <code>a2-button</code></td>
    <td align="center" width="50%"><img src="docs/img/slider.png" alt="슬라이드바"><br><b>슬라이드바</b> <code>a2-slider</code></td>
  </tr>
  <tr>
    <td align="center"><img src="docs/img/dropdown.png" alt="드롭다운"><br><b>드롭다운</b> <code>a2-dropdown</code></td>
    <td align="center"><img src="docs/img/textfield.png" alt="텍스트 필드"><br><b>텍스트 필드</b> <code>a2-textfield</code></td>
  </tr>
  <tr>
    <td align="center"><img src="docs/img/split.png" alt="스플릿 버튼"><br><b>스플릿 버튼</b> <code>a2-split</code></td>
    <td align="center"><img src="docs/img/checkbox.png" alt="체크박스"><br><b>체크박스</b> <code>a2-checkbox</code></td>
  </tr>
  <tr>
    <td align="center"><img src="docs/img/navbar.png" alt="내비게이션바"><br><b>내비게이션바</b> <code>a2-navbar</code></td>
    <td align="center"><img src="docs/img/appbar.png" alt="앱바"><br><b>앱바</b> <code>a2-appbar</code></td>
  </tr>
  <tr>
    <td align="center"><img src="docs/img/datepicker.png" alt="날짜 선택"><br><b>날짜 선택</b> <code>a2-datepicker</code></td>
    <td align="center"><img src="docs/img/timepicker.png" alt="시간 선택"><br><b>시간 선택</b> <code>a2-timepicker</code></td>
  </tr>
  <tr>
    <td align="center"><img src="docs/img/loading.png" alt="로딩"><br><b>로딩</b> <code>a2-loading</code></td>
    <td align="center"><img src="docs/img/progress.png" alt="진행 바"><br><b>진행 바</b> <code>a2-progress</code></td>
  </tr>
  <tr>
    <td align="center"><img src="docs/img/list.png" alt="리스트"><br><b>리스트</b> <code>a2-list</code></td>
    <td align="center"><img src="docs/img/refresh.png" alt="끌어서 새로고침"><br><b>끌어서 새로고침</b> <code>a2-refresh</code></td>
  </tr>
  <tr>
    <td align="center" colspan="2"><img src="docs/img/modal.png" width="600" alt="모달"><br><b>모달</b> <code>a2-modal</code></td>
  </tr>
</table>

## 설치

### CDN

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/web/static/pretendard.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/a2den1/adas2@v1.1.0/dist/adas2.min.css">
<script src="https://cdn.jsdelivr.net/gh/a2den1/adas2@v1.1.0/dist/adas2.min.js"></script>
```

글꼴은 [Pretendard](https://github.com/orioncactus/pretendard), 아이콘은 [Font Awesome 6](https://fontawesome.com) (solid)을 씁니다.

### npm

```bash
npm install github:a2den1/adas2
```

```js
import 'adas2';          // 태그 등록
import 'adas2/css';      // 스타일 (번들러가 CSS 를 처리하는 경우)
import { Motion } from 'adas2';
```

브라우저에서만 동작합니다. 서버 렌더링을 쓰는 경우 클라이언트에서만 불러오세요.

## 사용 예

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
  document.querySelector('a2-dropdown')
    .addEventListener('change', e => console.log(e.detail.value));
</script>
```

## API

| 태그 | HTML 속성 | JS 속성·메서드 | 이벤트 |
|---|---|---|---|
| `a2-button` | `disabled` `tone="soft"` `loading` | | `click` |
| `a2-slider` | `value` `min` `max` `step` `output` | `value` | `input` `change` |
| `a2-dropdown` + `<option>` | `value` `fit` `shadow` | `value` `selectedIndex` `setOpen()` `toggle()` `close()` | `change` `open` `close` |
| `a2-textfield` | `label` `value` `name` `type` | `value` `focus()` | `input` `change` |
| `a2-split` + `a2-split-item` | 항목에 `selected` `menu` `open` | `selectedIndex` | `change` `open` `close` |
| `a2-navbar` + `a2-nav-item` | `value`, 항목에 `icon` | `value` `select()` | `change` |
| `a2-appbar` | `heading` `back` | `setTitle()` | `back` |
| `a2-checkbox` | `checked` | `checked` | `change` |
| `a2-datepicker` | `value="2026-01-19"` | `value` `shift(n)` | `change` |
| `a2-timepicker` | `value="09:30"` `minute-step` | `value` `setMode('h' \| 'm')` | `input` `change` |
| `a2-modal` | `heading` `open` | `open(trigger?)` `close()` `isOpen` | `open` `close` |
| `a2-loading` | `tone="white"` | | |
| `a2-progress` | `value` (0~100, 없으면 진행률 모름) | `value` | |
| `a2-list` + `a2-list-item` | `selectable`, 항목에 `icon` `sub` `meta` `chevron` `selected` | `items` `selectedIndex` | `select` |
| `a2-refresh` | | `refresh()` `done()` `busy` | `refresh` |

<details>
<summary>속성 설명</summary>

- `a2-slider` `output`: 손잡이 안에 값을 항상 표시합니다. 없으면 끄는 동안에만 표시합니다.
- `a2-dropdown` `fit`: 선택 칸의 폭을 글자 길이에 맞춥니다. `shadow`: 그림자를 넣습니다.
- `a2-split-item` `menu`: 누르면 판 모양으로 펼쳐지는 칸입니다.
- `a2-nav-item` `icon`: Font Awesome 아이콘 이름 (`house`, `magnifying-glass`, `user` 등).
- `a2-checkbox`: 태그 안에 글자를 넣으면 라벨이 붙은 형태가 됩니다.
- `a2-modal`: `data-a2-modal="#id"` 가 붙은 요소를 누르면 열리고, `data-a2-close` 가 붙은 요소·Esc·바깥 영역을 누르면 닫힙니다.
- `a2-button` `loading`: 글자 대신 로딩 표시를 보여 주고 누를 수 없게 합니다.
- `a2-loading`: 크기는 `--a2-loading-size`(기본 120 단위)로 바꿉니다. 주황 배경 위에서는 `tone="white"`.
- `a2-list` `selectable`: 누른 항목을 선택 상태로 표시합니다. 없으면 누르는 동안만 표시합니다.
- `a2-list-item`: `icon` 왼쪽 아이콘, `sub` 아래 설명, `meta` 오른쪽 글자, `chevron` 오른쪽 화살표.
- `a2-refresh`: 안의 내용을 스크롤 영역으로 감쌉니다. 높이를 지정해서 쓰고, 맨 위에서 아래로 끌었다 놓으면 `refresh` 이벤트가 납니다.

```js
document.querySelector('a2-refresh').addEventListener('refresh', e => {
  e.detail.waitUntil(fetch('/api/feed').then(r => r.json()).then(render)); // 끝나면 로딩 표시가 사라집니다
});
```

</details>

## 크기와 색

```css
:root {
  --a2-u: .36px;            /* 모든 치수의 단위. 기본 .36px */
  --a2-picker-scale: 1.6;   /* 날짜·시간 선택에만 곱하는 배율 */
  --a2-orange: #FF793F;     /* 강조색 */
  --a2-orange-2: #FF9B70;
  --a2-orange-3: #FFCFBA;
  --a2-peach: #FFECE4;
  --a2-surface: #FFFFFF;
  --a2-font: "Pretendard", sans-serif;
}
```

일부 영역만 바꾸려면 그 요소에 변수를 지정합니다. 예: `<section style="--a2-u: .5px">`

## 애니메이션 엔진

컴포넌트가 쓰는 스프링 애니메이션을 직접 쓸 수 있습니다.

```js
const box = document.querySelector('#box');
const m = new adas2.Motion({ x: 0, s: 1 }, v => {
  box.style.transform = `translateX(${v.x}px) scale(${v.s})`;
});

m.to({ x: 240, s: 1.2 });                                  // 기본 스프링
m.to({ x: 0 }, { x: adas2.springs.slow }, () => done());   // 값별 스프링, 끝나면 콜백
m.set({ x: 0, s: 1 });                                     // 애니메이션 없이 바로 적용
```

`adas2.springs`: `base` · `fast` · `slow` · `press`

## 브라우저 지원

Chrome·Edge 111 이상, Safari 16.4 이상, Firefox 113 이상

## 개발

```bash
npm install
npm run build      # src/ → dist/
npm run dev        # http://localhost:5880/docs/
```

| 경로 | 내용 |
|---|---|
| `src/` | 원본 JS·CSS |
| `dist/` | 빌드 결과 (스크립트, ES 모듈, 압축본) |
| `types/` | TypeScript 선언 |
| `docs/` | 데모 페이지와 이미지 |

버그 제보와 제안은 [Issues](https://github.com/a2den1/adas2/issues)에 남겨 주세요.

## 라이선스

[adas2 라이선스 1.0](LICENSE). 오픈소스 라이선스가 아닙니다.

| 허용 | 금지 |
|---|---|
| 개인·상업 프로젝트에서 무료로 사용 | 소스·배포 파일 수정 |
| CDN·npm 으로 불러와 사용 | 포크 등 2차적 저작물 제작 |
| 수정하지 않은 파일을 내 서비스에 포함해 배포 | 복제해서 별도 라이브러리·템플릿으로 배포·판매 |
| CSS 변수·속성·API 로 모양 변경 | 자신이 만든 것처럼 표시 |

그 밖의 사용은 저작권자에게 문의해 주세요. © 2026 a2den1
