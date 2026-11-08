<div align="center">

<img src="docs/logo.svg" width="88" height="88" alt="adas2 로고">

# adas2

웹용 UI 툴킷

**한국어** · [English](README.en.md) · [데모](https://adas2-six.vercel.app)

[![version](https://img.shields.io/badge/version-3.0.0-FF7A45?style=flat-square)](https://github.com/a2den1/adas2/releases)
![dependencies](https://img.shields.io/badge/dependencies-0-29231F?style=flat-square)
[![license](https://img.shields.io/badge/license-adas2%20License-F26A32?style=flat-square)](LICENSE)

</div>

<p align="center">
  <img src="docs/preview-dark.png" width="49%" alt="다크 테마">
  <img src="docs/preview-light.png" width="49%" alt="라이트 테마">
</p>

## 소개

버튼·스위치·슬라이더·고르기·색 고르기·탭 같은 입력 컴포넌트와 패널·토스트·대화상자·메뉴를 한 번에 쓸 수 있는 툴킷입니다.

- 런타임 의존성이 없고, CSS 하나와 JS 하나만 불러오면 됩니다.
- 빌더(`adas2.ui`)로 한 줄씩 화면을 만들거나, 컴포넌트를 직접 만들 수 있습니다.
- 테마 3종(dark·light·ocean)을 바로 바꿀 수 있고, 색·크기·글꼴을 원하는 대로 바꿀 수 있습니다.
- 기본값이 있는 컴포넌트는 값이 바뀌면 되돌리기(↺) 버튼이 나타납니다.
- 숫자 입력칸은 `50+25`, `x*2`(x 는 지금 값) 같은 계산식을 받습니다.

## 설치

### CDN

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/a2den1/adas2@v3.0.0/dist/adas2.min.css">
<script src="https://cdn.jsdelivr.net/gh/a2den1/adas2@v3.0.0/dist/adas2.min.js"></script>
```

글꼴(지마켓 산스)은 CSS 가 알아서 불러옵니다.

### npm

```bash
npm install github:a2den1/adas2
```

```js
import adas2 from 'adas2';
import 'adas2/css';
```

브라우저 전용입니다.

## 시작하기

```js
adas2.setup({ theme: 'dark', scale: 0.6 });   // 생략하면 기본값

const ui = adas2.ui('#settings');

ui.switch('알림 받기', { value: true, default: true });
ui.slider('음량', { min: 0, max: 100, value: 70, unit: '%', onChange: v => console.log(v) });
ui.select('품질', ['낮음', '보통', '높음'], { value: '보통' });
ui.button('저장', () => adas2.toast('저장했어요', { type: 'success' }));

ui.section('고급', { collapsible: true, toggle: true }, s => {
  s.stepper('재시도 횟수', { min: 0, max: 10, value: 3 });
  s.keybind('빠른 저장', { value: 'Ctrl+KeyS', onPress: save });
});
```

## 컴포넌트

빌더 메서드는 모두 컴포넌트를 돌려줍니다. 컴포넌트는 `.value`, `.set(v)`, `.reset()`, `.on('change' | 'commit', fn)`, `.disable()`, `.destroy()` 를 가집니다.

| 빌더 | 주요 옵션 | 설명 |
|---|---|---|
| `button(text, onClick)` | `variant`(primary·soft·ghost·danger) `icon` `size` `block` | 버튼. `setLoading(true)` 로 처리 중 표시 |
| `switch(label)` | `value` `default` `description` | 오른쪽 스위치 |
| `checkbox(label)` | `value` `default` `description` | 왼쪽 체크 |
| `radio(label, options)` | `value` `default` | 여러 줄 중 하나. 옵션에 `description` 가능 |
| `slider(label)` | `min` `max` `step` `value` `default` `unit` `decimals` `format` | 막대를 누르거나 끌기, 숫자를 눌러 직접 입력 |
| `stepper(label)` | `min` `max` `step` `value` `default` `unit` | − / + 버튼, 누르고 있으면 계속 바뀜 |
| `field(label)` | `placeholder` `icon` `multiline` `maxLength` `type` | 글자 입력 |
| `select(label, options)` | `value` `default` `placeholder` | 아래로 뜨는 목록 |
| `multiSelect(label, options)` | `value`(배열) `summary` | 여러 개 고르기 |
| `segmented(options)` | `value` `label` `default` | 2~5개 중 하나 |
| `color(label)` | `value` `default` `presets` | 채도·명도 판, 색상·투명도 막대, HEX, 미리 정한 색 |
| `keybind(label)` | `value` `default` `onPress` `hold` | 단축키 입력. `onPress` 를 주면 그 키로 바로 동작 |
| `progress(label)` | `value`(0~1, `null` 이면 끝을 모름) `showValue` | 진행 바 |
| `spinner()` | `size` | 도는 표시 |
| `tabs(tabs)` | `value` | `[{ label, build: t => ... }]`, 바꾸면 내용이 밀려 바뀜 |
| `section(title, opts, fill)` | `description` `toggle` `collapsible` `collapsed` `actions` | 제목 아래로 묶기 |
| `scroll(opts, fill)` | `height` | 부드럽게 굴러가는 영역 |
| `row(fill)` `stack(fill)` `text(t)` `title(t)` `divider()` | | 배치·글자 |

옵션은 공통으로 `id`(나중에 `adas2.get(id)`), `tooltip`, `className`, `onChange`, `onCommit` 을 받습니다.

## 패널·알림·메뉴

```js
// 떠 있는 패널: 위쪽을 끌어 옮기고, resizable 이면 가장자리로 크기 조절
const p = adas2.panel({ title: '설정', width: 640, height: 820, resizable: true }, ui => {
  ui.switch('어두운 화면', { value: true });
});
p.show(); p.hide(); p.toggle(); p.on('close', () => {});

adas2.toast('저장했어요', { type: 'success' });                    // info · success · warning · error
adas2.toast('3개를 지웠어요', { action: { label: '되돌리기', onClick: undo } });

if (await adas2.confirm('지울까요?', { title: '지우기', ok: '지우기', danger: true })) remove();
await adas2.alert('업데이트를 마쳤어요.');
const v = await adas2.dialog({ title, message, buttons: [{ label: '나중에', value: 0 }, { label: '지금', value: 1, variant: 'primary' }] });

adas2.menu(element, [                                              // 오른쪽 클릭 메뉴
  { label: '복사', icon: 'fa-regular fa-copy', shortcut: 'Ctrl+C', onSelect: copy },
  '-',
  { label: '지우기', danger: true, onSelect: remove },
]);

adas2.tooltip(element, '설명');
```

## 단축키

```js
const k = adas2.keys.bind('Alt+Backquote', togglePanel, { hold: 0.6, onHold: resetLayout });
k.rebind('Ctrl+KeyK');
k.unbind();
```

키 이름은 `KeyboardEvent.code`(`KeyS`, `Backquote` …)를 쓰고, `Ctrl` `Alt` `Shift` `Meta` 는 왼쪽·오른쪽 모두 해당합니다. 글자 입력 중에는 동작하지 않습니다.

## 테마

```js
adas2.setTheme('light');                                           // 'dark' · 'light' · 'ocean'
adas2.setTheme(adas2.themes.dark.extend({ accent: '#4C8DFF', radius: 10 }));
adas2.setup({ scale: 0.7, animation: 1.5 });                       // 전체 크기, 애니메이션 속도(0 이면 끔)
```

| 테마 값 | 설명 |
|---|---|
| `bg` `surface` `surfaceHover` `surfaceActive` `raised` | 바탕, 컨트롤, 올렸을 때, 누를 때, 떠 있는 판 |
| `accent` `accentHover` `accentPressed` `accentSoft` `onAccent` | 강조색과 그 위 글자 |
| `text` `textMuted` `textFaint` | 글자 |
| `danger` `success` `warning` | 상태 색 |
| `radius` `radiusLarge` `controlHeight` `fontSize` `fontSizeSmall` `fontSizeTitle` | 크기(디자인 단위, `scale` 이 곱해짐) |
| `font` `weight` `weightStrong` | 글꼴과 굵기 |

## 그 밖의 도구

- `adas2.animate(from, to, { duration, ease, onUpdate, onDone })` — 값 애니메이션. 이징: `Linear`, `In`/`Out`/`InOut` × `Sine` `Quad` `Cubic` `Quart` `Quint` `Expo` `Circ` `Back` `Elastic` `Bounce`
- `adas2.evaluate('x*2', { x: 5 })` — 숫자 입력칸이 쓰는 계산식 해석기

## 개발

```bash
npm install
npm run build      # src/ → dist/
npm run dev        # http://localhost:5880/docs/
```

| 경로 | 내용 |
|---|---|
| `src/core/` | 설정·테마·애니메이션·패널·떠 있는 판·툴팁·단축키 |
| `src/components/` | 컴포넌트 |
| `src/ui.js` | 빌더 |
| `src/styles/` | CSS |
| `types/` | TypeScript 선언 |

브라우저: Chrome·Edge 111 이상, Safari 16.4 이상, Firefox 121 이상

## 라이선스

[adas2 라이선스 1.0](LICENSE). 오픈소스 라이선스가 아닙니다.

| 허용 | 금지 |
|---|---|
| 개인·상업 프로젝트에서 무료로 사용 | 소스·배포 파일 수정 |
| CDN·npm 으로 불러와 사용 | 포크 등 2차적 저작물 제작 |
| 수정하지 않은 파일을 내 서비스에 포함해 배포 | 복제해서 별도 라이브러리·템플릿으로 배포·판매 |
| 테마·옵션·API 로 모양 바꾸기 | 자신이 만든 것처럼 표시 |

글꼴(지마켓 산스)은 이 저장소에 들어 있지 않고 CDN 에서 불러오며, 저작권은 G마켓에 있습니다. © 2026 a2den1
