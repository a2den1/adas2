<div align="center">

<img src="docs/logo.svg" width="88" height="88" alt="adas2 로고">

# adas2

웹 컴포넌트 UI 모음

**한국어** · [English](README.en.md) · [데모](https://adas2-six.vercel.app)

[![version](https://img.shields.io/badge/version-4.1.1-FF7A45?style=flat-square)](https://github.com/a2den1/adas2/releases)
![dependencies](https://img.shields.io/badge/dependencies-0-29231F?style=flat-square)
[![license](https://img.shields.io/badge/license-adas2%20License-F26A32?style=flat-square)](LICENSE)

</div>

<p align="center">
  <img src="docs/preview-dark.png" width="49%" alt="다크 테마">
  <img src="docs/preview-light.png" width="49%" alt="라이트 테마">
</p>

## 소개

`<a2-button>`, `<a2-select>` 같은 HTML 태그로 쓰는 UI 컴포넌트 모음입니다.

- 스크립트 하나만 넣으면 됩니다. 런타임 의존성이 없습니다.
- 입력 요소는 일반 `<form>` 안에서 동작합니다. 제출하면 `FormData` 에 값이 들어가고, `required` 검사와 `reset` 도 됩니다.
- `input`·`change` 이벤트와 `.value` 를 기본 입력 요소처럼 씁니다.
- 테마 3종(dark·light·ocean)이 있고, CSS 변수로 색과 크기를 바꿀 수 있습니다.
- 각 요소는 Shadow DOM 을 쓰므로 페이지의 CSS 와 섞이지 않습니다.

## 설치

### CDN

```html
<script src="https://cdn.jsdelivr.net/gh/a2den1/adas2@v4.1.1/dist/adas2.min.js"></script>
```

글꼴(지마켓 산스)과 색 변수는 스크립트가 넣습니다. 첫 화면이 깜빡이지 않게 하려면 CSS 를 `<head>` 에 먼저 넣으세요.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/a2den1/adas2@v4.1.1/dist/adas2.min.css">
```

### npm

```bash
npm install github:a2den1/adas2
```

```js
import adas2 from 'adas2';   // 불러오면 <a2-*> 태그가 등록됩니다
```

## 시작하기

```html
<form id="signup">
  <a2-input name="name" label="이름" required></a2-input>
  <a2-select name="team" label="팀" placeholder="고르세요">
    <a2-option value="design">디자인</a2-option>
    <a2-option value="dev">개발</a2-option>
  </a2-select>
  <a2-slider name="level" label="숙련도" min="1" max="5" value="3" show-value></a2-slider>
  <a2-switch name="news" checked>소식 받기</a2-switch>
  <a2-button type="submit" variant="primary">제출</a2-button>
</form>

<script>
  document.getElementById('signup').addEventListener('submit', e => {
    e.preventDefault();
    console.log(Object.fromEntries(new FormData(e.target)));
    adas2.toast('제출했습니다', { variant: 'success' });
  });
</script>
```

## 컴포넌트

공통 속성: `label` `hint` `error` `disabled` `required` `name` `size="sm|lg"`. 입력 요소는 `.value` 를 읽고 쓸 수 있고 `input`(바뀌는 중)·`change`(정해짐) 이벤트를 냅니다.

| 태그 | 주요 속성 | 설명 |
|---|---|---|
| `a2-button` | `variant`(primary·soft·ghost·danger) `type`(submit·reset) `loading` `block` | 버튼. 아이콘은 `slot="prefix"`·`slot="suffix"`, 글자 없이 아이콘만 넣으면 정사각형 |
| `a2-input` | `type` `placeholder` `clearable` `maxlength` `pattern` | 한 줄 입력. `type="password"` 면 보이기 버튼이 생김 |
| `a2-textarea` | `rows` `maxlength` | 여러 줄 입력. 내용에 맞춰 높이가 늘어남 |
| `a2-number` | `min` `max` `step` `unit` `decimals` | − / + 버튼, 누르고 있으면 계속 바뀜. `50+25`, `x*2`(x 는 지금 값) 같은 계산식 입력 |
| `a2-checkbox` | `checked` `indeterminate` `value` | 체크박스 |
| `a2-switch` | `checked` `value` | 스위치 |
| `a2-radio-group` · `a2-radio` | `value` `direction="row"` | 하나 고르기. 방향키로 옮김 |
| `a2-slider` | `min` `max` `step` `show-value` `unit` | 트랙을 누르거나 끌기, 방향키·Home·End |
| `a2-select` · `a2-option` | `placeholder` `multiple` `searchable` | 떠서 열리는 목록. `multiple` 이면 `value="a,b"`, `.value` 는 배열 |
| `a2-segmented` · `a2-segment` | `value` `block` | 2~5개 중 하나 |
| `a2-tabs` · `a2-tab-panel` | `value`, 패널에 `label` | 탭. `a2-change` 이벤트 |
| `a2-color` | `alpha` `presets="#hex,…"` | 채도·명도 판, 색상·투명도 막대, HEX 입력 |
| `a2-keybind` | `value="Ctrl+KeyS"` | 단축키 입력. 누르고 키를 치면 기록, Esc 취소, Backspace 비우기 |
| `a2-progress` | `value` `max` `show-value` `variant` | 진행 바. `value` 가 없으면 끝을 모르는 막대 |
| `a2-spinner` | `size` | 도는 표시 |
| `a2-badge` | `variant`(accent·success·warning·danger) `dot` | 짧은 표시 |
| `a2-card` | `heading` `description` `interactive` | 카드. 버튼은 `slot="footer"` |
| `a2-dialog` | `heading` `description` `size` `persistent` `no-close` | 대화상자. `show()`·`close(값)`, `a2-show`·`a2-close` 이벤트 |
| `a2-drawer` | `side`(right·left·bottom) | 옆이나 아래에서 나오는 판. 대화상자와 같은 API |
| `a2-menu` · `a2-menu-item` | `for` `trigger="contextmenu"` `align="end"`, 항목에 `shortcut` `danger` | 메뉴. 고르면 `a2-select` 이벤트(`detail.value`) |

대화상자 안에서 `data-close="값"` 이 붙은 요소를 누르면 그 값으로 닫힙니다.

```html
<a2-dialog id="save" heading="저장할까요?">
  <div slot="footer" style="display:contents">
    <a2-button data-close="no" variant="ghost">아니요</a2-button>
    <a2-button data-close="yes" variant="primary">저장</a2-button>
  </div>
</a2-dialog>
<script>
  save.show();
  save.addEventListener('a2-close', e => console.log(e.detail.returnValue));
</script>
```

툴팁은 아무 요소에 `a2-tip="설명"` 을 붙이면 됩니다. 방향은 `a2-tip-side="top|bottom|left|right"`.

## 스크립트 API

```js
adas2.toast('저장했습니다', { variant: 'success' });              // info · success · warning · danger
adas2.toast('1개를 지웠습니다', { action: { label: '되돌리기', onClick: undo } });

await adas2.alert('업데이트를 마쳤습니다.');
if (await adas2.confirm('지울까요?', { title: '삭제', okText: '삭제', danger: true })) remove();
const name = await adas2.prompt('새 이름', { value: '문서 1' }); // 취소하면 null

adas2.theme('light');                                             // 'dark' · 'light' · 'ocean' · 'auto'
adas2.animate({ x: 0 }, { x: 100 }, { duration: 0.3, ease: 'OutCubic', onUpdate: v => {} });
adas2.evaluate('x*2', { x: 5 });                                  // { ok: true, value: 10 }
addEventListener('keydown', e => { if (adas2.matchKey(e, 'Ctrl+KeyS')) save(); });
```

## 테마와 꾸미기

```html
<html data-a2-theme="light">
```

```css
:root {
  --a2-accent: #4C8DFF;     /* 강조색 */
  --a2-radius: 8px;         /* 모서리 */
  --a2-h: 36px;             /* 컨트롤 높이 */
  --a2-fs: 13px;            /* 글자 크기 */
  --a2-speed: 1.5;          /* 애니메이션 빠르기(움직임 줄이기 설정이면 즉시) */
}
```

| 변수 | 설명 |
|---|---|
| `--a2-bg` `--a2-surface` `--a2-raised` | 바탕, 카드, 떠 있는 판 |
| `--a2-fill` `--a2-fill-hover` `--a2-fill-active` | 컨트롤 바탕(반투명) |
| `--a2-line` `--a2-line-strong` | 외곽선 |
| `--a2-accent` `--a2-accent-hover` `--a2-accent-pressed` `--a2-accent-soft` `--a2-on-accent` | 강조색과 그 위 글자 |
| `--a2-text` `--a2-text-muted` `--a2-text-faint` | 글자 |
| `--a2-danger` `--a2-success` `--a2-warning` | 상태 색 |
| `--a2-tip` `--a2-on-tip` | 알림·툴팁 바탕과 글자 |
| `--a2-font` `--a2-weight` `--a2-weight-strong` | 글꼴과 굵기(300, 500) |

요소 안쪽은 `::part()` 로 꾸밀 수 있습니다. 예: `a2-input::part(box)`, `a2-button::part(base)`, `a2-slider::part(thumb)`.

## 개발

```bash
npm install
npm run build      # src/ → dist/
npm run dev        # http://localhost:5880/docs/
```

| 경로 | 내용 |
|---|---|
| `src/core/` | 기본 클래스, 애니메이션, 떠 있는 판, 단축키, 계산식 |
| `src/elements/` | 컴포넌트 |
| `src/api/` | 토스트, 대화상자 함수, 툴팁, 테마 |
| `src/styles/global.css` | 글꼴과 색 변수 |
| `types/` | TypeScript 선언 |

브라우저: Chrome·Edge 114 이상, Safari 17 이상, Firefox 125 이상

## 라이선스

[adas2 라이선스 1.0](LICENSE). 오픈소스 라이선스가 아닙니다.

| 허용 | 금지 |
|---|---|
| 개인·상업 프로젝트에서 무료로 사용 | 소스·배포 파일 수정 |
| CDN·npm 으로 불러와 사용 | 포크 등 2차적 저작물 제작 |
| 수정하지 않은 파일을 내 서비스에 포함해 배포 | 복제해서 별도 라이브러리·템플릿으로 배포·판매 |
| 속성·CSS 변수·`::part()` 로 모양 바꾸기 | 자신이 만든 것처럼 표시 |

글꼴(지마켓 산스)은 이 저장소에 들어 있지 않고 CDN 에서 불러오며, 저작권은 G마켓에 있습니다. 아이콘은 [Font Awesome Free](https://fontawesome.com)(CC BY 4.0)입니다. © 2026 a2den1
