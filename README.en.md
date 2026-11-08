# <div align="center">adas2</div>

<div align="center">
  <img src="docs/logo.svg" height="160" alt="adas2 logo">
</div>

<div align="center">

### A UI toolkit for the web

Themes · Factory · Window manager · Tooltips · Shortcuts

[한국어](README.md) · **English** · [Demo](https://adas2-six.vercel.app)

</div>

<p align="center">
  <img src="docs/preview-dark.png" width="49%" alt="Dark theme">
  <img src="docs/preview-light.png" width="49%" alt="Light theme">
</p>

# 🛠️ Installation

## 📦 CDN

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/a2den1/adas2@v2.0.0/dist/adas2.min.css">
<script src="https://cdn.jsdelivr.net/gh/a2den1/adas2@v2.0.0/dist/adas2.min.js"></script>
```

The font is [Gmarket Sans](https://corp.gmarket.com/fonts/), loaded from a CDN inside the CSS, so nothing else is needed. Set the theme's `font` value to change it.

## 📦 npm

```bash
npm install github:a2den1/adas2
```

```js
import adas2, { Factory, Theme } from 'adas2';
import 'adas2/css';
```

Browser only.

## 🔧 From source

```bash
npm install
npm run build      # src/ → dist/
npm run dev        # http://localhost:5880/docs/
```

# ⌨️ Usage

### Setup

* **Configure once** at startup. Missing values fall back to defaults.
  ```js
  adas2.configure({
    config: { uiScale: 0.6, animationSpeed: 1 },
    theme: adas2.Theme.Dark,
    root: document.documentElement,   // element that receives the theme variables
  });
  ```
* **Or zero setup:** creating any control calls `adas2.ensureDefaults()` for you.
* **Config**

  | Name | Default | Description |
  |---|---|---|
  | `uiScale` | `0.6` | Multiplies every dimension (design units: row height 52, text 23) |
  | `animationSpeed` | `1` | `2` is twice as fast, `0` turns animation off |
  | `tooltipEnabled` | `true` | Enable tooltips |
  | `middleClickToDefault` | `true` | Middle click resets a control to its default |
  | `sliderSensitivity` | `1` | Slider drag sensitivity |

### Theme

* **Presets:** `Theme.Dark`, `Theme.Light`, `Theme.Ocean`
* **Derive your own** with `with()`. Themes are CSS variables, so existing controls update immediately.
  ```js
  adas2.setTheme(adas2.Theme.Dark.with({ panelBg: '#1A1A24', objectActive: '#7FD1AE' }));
  ```
* Keys include `panelBg` `topBar` `objectBg` `objectHover` `objectButton` `objectActive` `objectOnActive` `switchTrack` `buttonHover` `buttonPressed` `cardHeader` `cardPanel` `softRed` `text` `tooltipBg` `outline` `controlOutlineHover` `mathOk` `mathWarn` `mathErr` `cornerRadius` `controlHeight` `fontSizeBody` `fontSizeH1` `font` `fontMono` ([theme.js](src/core/theme.js))

### Create controls

* **Factory:** every `adas2.Factory` function takes `(parent, id, options)`. You can pass a configure function instead of an options object.
  ```js
  const F = adas2.Factory;
  F.button(parent, () => alert('hi'), 'Hello', 'btn_hello');          // short form
  F.toggle(parent, 'notify', { text: 'Notify', value: true, defaultValue: true });
  F.slider(parent, 'volume', o => { o.label = 'Volume'; o.max = 100; o.value = 70; o.format = 0; });
  ```
* **Or directly:** `new adas2.Slider(parent, 'volume', { ... })`
* A parent can be an element, a selector string, a window, a card or a scroll view.
* Controls with an id can be found with `adas2.getControl('volume')`.

| Factory | Main options | Description |
|---|---|---|
| `button` | `text` `icon` `onClick` | Text or icon button |
| `toggle` | `text` `value` `defaultValue` `onChanged` | Click anywhere on the row to toggle |
| `slider` | `label` `min` `max` `value` `defaultValue` `format` `onChanged` `onComplete` `dragStep` `scale` | Drag to change, click to type a value |
| `input` | `placeholder` `icon` `multiline` `monospace` `onChanged` `onEndEdit` | Text input |
| `segmented` | `values` `value` `display` `onChanged` | One of 2–4 options |
| `dropdown` | `values` `value` `display` `onChanged` | List that expands downward |
| `multiDropdown` | `values` `value` (array) `summary` `onChanged` | Multiple selection |
| `colorPicker` | `label` `value` `defaultValue` `onChanged` `onComplete` | Color wheel, RGB/HSV, hex |
| `card` | `title` `active` `onActiveChanged` `onDelete` | Group with an enable check, collapse and delete |
| `scrollView` | `spacing` `padding` `expand` | Smooth wheel scrolling area |
| `row` `stack` `text` | | Horizontal row, vertical stack, text |

Common methods: `set(value, notify)` `reset()` `setDefaultValue(value)` `setBlocked(bool)` `dispose()`

* **Slider input:** click the value to type an expression: `50+25`, `x*2` (x is the current value), `sqrt(2)*10`, `clamp(x, 0, 50)`. While typing, the result and range state are shown in color. Enter applies, Esc cancels.
* **Defaults:** with `defaultValue`, a dot appears at the top left when the value differs, and a middle click resets it.

### Windows

* `WindowManager` handles structure and z-order. Visibility and open/close animation are up to you. The close button raises `closeRequested` instead of closing.
  ```js
  const windows = adas2.WindowManager.create(document.body);
  const win = windows.create({ title: 'Hello', size: [640, 480], resizable: true });
  win.on('closeRequested', w => w.hide());
  F.toggle(win, 'opt', { text: 'Option' });
  ```
* Options: `title` `size` `position` `icon` `resizable` `minSize` `draggable` `showCloseButton` `clipContent` `padding` `topBarHeight` …
* Methods: `show()` `hide()` `setTitle()` `setIcon()` `setSize()` `setPosition()` `bringToFront()` `dispose()`

### Tooltips

```js
adas2.tooltip(element, 'Description');            // or tooltip: '...' in options
adas2.tooltip(element, () => `Value: ${v}`);       // functions are called each time it shows
```

### Shortcuts

Register named shortcuts with an optional hold time. They pause while a text input is focused.

```js
adas2.ShortcutManager.register('toggle', new adas2.KeyCombo('Backquote', 'Alt'), 0.4, {
  onPressed: () => toggle(),
  onHeld: () => resetLayout(),
});
```

Keys use `KeyboardEvent.code` (`KeyS`, `Backquote`, …). `Alt` `Ctrl` `Shift` `Meta` match either side.

### Page switching

```js
adas2.switchPage(new Map([[0, pageA], [1, pageB]]), 0, 1);
```

### Tweens

```js
adas2.tween({ x: 0 }, { x: 240 }, 0.45, 'OutExpo', v => { el.style.translate = `${v.x}px`; });
```

Eases: `Linear`, `In`/`Out`/`InOut` × `Sine` `Quad` `Cubic` `Quart` `Quint` `Expo` `Circ` `Back` `Elastic` `Bounce`

# 🧭 Layout

| Path | Contents |
|---|---|
| `src/core/` | Config, theme, context, easing, tween, windows, tooltip |
| `src/controls/` | Button, toggle, slider, input, segmented, dropdown, color picker, card, scroll |
| `src/factory/` | Factory |
| `src/input/` | Shortcuts |
| `src/transition/` | Page switching |
| `src/eval/` | Expression evaluator |
| `src/styles/` | CSS |
| `types/` | TypeScript declarations |

Browsers: Chrome / Edge 111+, Safari 16.4+, Firefox 121+

# ⚖️ License

### adas2

[adas2 License 1.0](LICENSE). This is not an open-source license.

| Allowed | Not allowed |
|---|---|
| Free use in personal and commercial projects | Modifying the source or distributed files |
| Loading via CDN or npm | Creating derivative works such as forks |
| Shipping unmodified files inside your product | Copying it and distributing or selling it as a separate library or template |
| Restyling through themes, CSS variables, options and the API | Presenting it as your own work |

© 2026 a2den1

### Credits

- The API layout (config, themes, factory, window manager) takes cues from [O5Kit](https://github.com/modlist-org/O5Kit) (a Unity uGUI toolkit). The code, design and artwork are adas2's own; no O5Kit files are included.
- The font (Gmarket Sans) is not bundled; it loads from a CDN. Copyright belongs to Gmarket.
