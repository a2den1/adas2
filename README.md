# <div align="center">adas2</div>

<div align="center">
  <img src="docs/logo.svg" height="160" alt="adas2 로고">
</div>

<div align="center">

### 웹용 UI 툴킷

테마 · 팩토리 · 창 관리자 · 툴팁 · 단축키

**한국어** · [English](README.en.md) · [데모](https://adas2-six.vercel.app)

</div>

<p align="center">
  <img src="docs/preview-dark.png" width="49%" alt="다크 테마">
  <img src="docs/preview-light.png" width="49%" alt="라이트 테마">
</p>

# 🛠️ 설치

## 📦 CDN

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/a2den1/adas2@v2.0.1/dist/adas2.min.css">
<script src="https://cdn.jsdelivr.net/gh/a2den1/adas2@v2.0.1/dist/adas2.min.js"></script>
```

글꼴은 [지마켓 산스](https://corp.gmarket.com/fonts/)를 씁니다. CSS 안에서 CDN 으로 불러오므로 따로 넣지 않아도 됩니다. 바꾸려면 테마의 `font` 값을 지정합니다.

## 📦 npm

```bash
npm install github:a2den1/adas2
```

```js
import adas2, { Factory, Theme } from 'adas2';
import 'adas2/css';
```

브라우저 전용입니다.

## 🔧 소스에서 빌드

```bash
npm install
npm run build      # src/ → dist/
npm run dev        # http://localhost:5880/docs/
```

# ⌨️ 사용법

### 설정

* **한 번 설정:** 시작할 때 `adas2.configure(...)` 를 부릅니다. 빠진 값은 기본값을 씁니다.
  ```js
  adas2.configure({
    config: { uiScale: 0.6, animationSpeed: 1 },
    theme: adas2.Theme.Dark,
    root: document.documentElement,   // 테마 변수를 넣을 요소
  });
  ```
* **설정 없이 바로:** 컨트롤을 만들면 `adas2.ensureDefaults()` 가 자동으로 불려 기본값이 적용됩니다.
* **설정 값**

  | 이름 | 기본값 | 설명 |
  |---|---|---|
  | `uiScale` | `0.6` | 모든 치수에 곱하는 배율. 디자인 단위(줄 높이 52, 글자 23)에 곱합니다 |
  | `animationSpeed` | `1` | 애니메이션 속도. `2` 는 두 배 빠르게, `0` 은 끔 |
  | `tooltipEnabled` | `true` | 툴팁 사용 |
  | `middleClickToDefault` | `true` | 가운데 버튼 클릭으로 기본값 되돌리기 |
  | `sliderSensitivity` | `1` | 슬라이더 끌기 감도 |

### 테마

* **프리셋:** `Theme.Dark`, `Theme.Light`, `Theme.Ocean`
* **일부만 바꾸기:** `with()` 로 새 테마를 만들어 적용합니다. CSS 변수라 이미 만든 컨트롤에도 바로 적용됩니다.
  ```js
  adas2.setTheme(adas2.Theme.Dark.with({ panelBg: '#1A1A24', objectActive: '#7FD1AE' }));
  ```
* 바꿀 수 있는 값: `panelBg` `topBar` `objectBg` `objectHover` `objectButton` `objectActive` `objectOnActive` `switchTrack` `buttonHover` `buttonPressed` `cardHeader` `cardPanel` `softRed` `text` `tooltipBg` `outline` `controlOutlineHover` `mathOk` `mathWarn` `mathErr` `cornerRadius` `controlHeight` `fontSizeBody` `fontSizeH1` `font` `fontMono` `fontWeight` `fontWeightStrong` 등 ([theme.js](src/core/theme.js))

### 컨트롤 만들기

* **팩토리:** `adas2.Factory` 의 함수는 모두 `(부모, id, 옵션)` 순서입니다. 옵션 자리에 설정 함수를 넘겨도 됩니다.
  ```js
  const F = adas2.Factory;
  F.button(parent, () => alert('hi'), 'Hello', 'btn_hello');          // 짧은 형태
  F.toggle(parent, 'notify', { text: '알림', value: true, defaultValue: true });
  F.slider(parent, 'volume', o => { o.label = '음량'; o.max = 100; o.value = 70; o.format = 0; });
  ```
* **직접 만들기:** `new adas2.Slider(parent, 'volume', { ... })`
* 부모 자리에는 요소, 선택자 문자열, 창, 카드, 스크롤 영역을 모두 넣을 수 있습니다.
* id 를 준 컨트롤은 `adas2.getControl('volume')` 으로 찾습니다.

| 팩토리 | 주요 옵션 | 설명 |
|---|---|---|
| `button` | `text` `icon` `onClick` | 글자 또는 아이콘 버튼 |
| `toggle` | `text` `value` `defaultValue` `onChanged` | 줄 전체를 누르면 켜고 끕니다 |
| `slider` | `label` `min` `max` `value` `defaultValue` `format` `onChanged` `onComplete` `dragStep` `scale` | 끌어서 바꾸고, 누르면 값을 입력합니다 |
| `input` | `placeholder` `icon` `multiline` `monospace` `onChanged` `onEndEdit` | 글자 입력 |
| `segmented` | `values` `value` `display` `onChanged` | 2~4개 중 하나 |
| `dropdown` | `values` `value` `display` `onChanged` | 아래로 펼치는 목록 |
| `multiDropdown` | `values` `value`(배열) `summary` `onChanged` | 여러 개 고르기 |
| `colorPicker` | `label` `value` `defaultValue` `onChanged` `onComplete` | 색상환·RGB/HSV·HEX |
| `card` | `title` `active` `onActiveChanged` `onDelete` | 켜기 체크·접기·삭제가 있는 묶음 |
| `scrollView` | `spacing` `padding` `expand` | 휠로 부드럽게 굴러가는 영역 |
| `row` `stack` `text` | | 가로 줄, 세로 묶음, 글자 |

공통 메서드: `set(값, notify)` `reset()` `setDefaultValue(값)` `setBlocked(bool)` `dispose()`

* **슬라이더 값 입력:** 값 칸을 누르면 계산식을 쓸 수 있습니다. `50+25`, `x*2`(x 는 지금 값), `sqrt(2)*10`, `clamp(x, 0, 50)`. 입력하는 동안 결과와 범위 상태가 색으로 표시되고, Enter 로 적용, Esc 로 취소합니다.
* **기본값:** `defaultValue` 가 있으면 값이 다를 때 왼쪽 위에 점이 보이고, 가운데 버튼 클릭으로 되돌립니다.

### 창

* `WindowManager` 가 창 구조와 겹침 순서를 맡습니다. 보이기·숨기기와 열고 닫는 연출은 쓰는 쪽이 정합니다. 닫기 버튼은 창을 닫지 않고 `closeRequested` 를 알립니다.
  ```js
  const windows = adas2.WindowManager.create(document.body);
  const win = windows.create({ title: 'Hello', size: [640, 480], resizable: true });
  win.on('closeRequested', w => w.hide());
  F.toggle(win, 'opt', { text: '옵션' });
  ```
* 옵션: `title` `size` `position` `icon` `resizable` `minSize` `draggable` `showCloseButton` `clipContent` `padding` `topBarHeight` …
* 메서드: `show()` `hide()` `setTitle()` `setIcon()` `setSize()` `setPosition()` `bringToFront()` `dispose()`

### 툴팁

```js
adas2.tooltip(element, '설명');               // 또는 옵션에 tooltip: '설명'
adas2.tooltip(element, () => `지금 값: ${v}`);  // 함수면 보여 줄 때마다 부릅니다
```

### 단축키

이름을 붙여 등록하고, 누르고 있는 시간을 정할 수 있습니다. 글자를 입력하는 중에는 동작하지 않습니다.

```js
adas2.ShortcutManager.register('toggle', new adas2.KeyCombo('Backquote', 'Alt'), 0.4, {
  onPressed: () => toggle(),
  onHeld: () => resetLayout(),
});
```

키 이름은 `KeyboardEvent.code` 를 씁니다(`KeyS`, `Backquote` …). `Alt` `Ctrl` `Shift` `Meta` 는 왼쪽·오른쪽 모두 해당합니다.

### 페이지 전환

```js
adas2.switchPage(new Map([[0, pageA], [1, pageB]]), 0, 1);
```

### 트윈

```js
adas2.tween({ x: 0 }, { x: 240 }, 0.45, 'OutExpo', v => { el.style.translate = `${v.x}px`; });
```

이징: `Linear`, `In`/`Out`/`InOut` × `Sine` `Quad` `Cubic` `Quart` `Quint` `Expo` `Circ` `Back` `Elastic` `Bounce`

# 🧭 구조

| 경로 | 내용 |
|---|---|
| `src/core/` | 설정·테마·컨텍스트, 이징·트윈, 창, 툴팁 |
| `src/controls/` | 버튼·토글·슬라이더·입력·세그먼트·드롭다운·색 고르기·카드·스크롤 |
| `src/factory/` | 팩토리 |
| `src/input/` | 단축키 |
| `src/transition/` | 페이지 전환 |
| `src/eval/` | 계산식 해석기 |
| `src/styles/` | CSS |
| `types/` | TypeScript 선언 |

브라우저 지원: Chrome·Edge 111 이상, Safari 16.4 이상, Firefox 121 이상

# ⚖️ 라이선스

### adas2

[adas2 라이선스 1.0](LICENSE). 오픈소스 라이선스가 아닙니다.

| 허용 | 금지 |
|---|---|
| 개인·상업 프로젝트에서 무료로 사용 | 소스·배포 파일 수정 |
| CDN·npm 으로 불러와 사용 | 포크 등 2차적 저작물 제작 |
| 수정하지 않은 파일을 내 서비스에 포함해 배포 | 복제해서 별도 라이브러리·템플릿으로 배포·판매 |
| 테마·CSS 변수·옵션·API 로 모양 바꾸기 | 자신이 만든 것처럼 표시 |

© 2026 a2den1

### 참고

- API 구성(설정·테마·팩토리·창 관리자)은 [O5Kit](https://github.com/modlist-org/O5Kit)(Unity uGUI 툴킷)을 참고했습니다. 코드·디자인·그림은 adas2 가 새로 만든 것이며 O5Kit 의 파일은 들어 있지 않습니다.
- 글꼴(지마켓 산스)은 이 저장소에 들어 있지 않고 CDN 에서 불러옵니다. 저작권은 G마켓에 있습니다.
