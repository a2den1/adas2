<div align="center">

<img src="docs/logo.svg" width="88" height="88" alt="adas2 logo">

# adas2

A UI framework built on Web Components

[한국어](README.md) · **English**

[![version](https://img.shields.io/badge/version-1.1.1-FF793F?style=flat-square)](https://github.com/a2den1/adas2/releases)
![size](https://img.shields.io/badge/min-36KB%20JS%20%2B%2014KB%20CSS-3E3E3E?style=flat-square)
![dependencies](https://img.shields.io/badge/dependencies-0-3E3E3E?style=flat-square)
[![license](https://img.shields.io/badge/license-adas2%20License-FF9B70?style=flat-square)](LICENSE)

[Demo](https://adas2-six.vercel.app) · [Install](#install) · [Components](#components) · [Theming](#size-and-color) · [License](#license)

<a href="https://adas2-six.vercel.app"><img src="docs/preview.png" width="820" alt="adas2 component preview"></a>

</div>

## Overview

adas2 is a set of UI components you use as HTML tags such as `<a2-button>` and `<a2-dropdown>`.

- Standard custom elements, so they work in plain HTML, React, Vue, Svelte and others.
- No runtime dependencies. Load one CSS file and one JS file.
- Change the overall size with a single `--a2-u` value and the colors with CSS variables.
- Keyboard support, ARIA roles, and respects `prefers-reduced-motion`.

## Components

<table>
  <tr>
    <td align="center" width="50%"><img src="docs/img/button.png" alt="Button"><br><b>Button</b> <code>a2-button</code></td>
    <td align="center" width="50%"><img src="docs/img/slider.png" alt="Slider"><br><b>Slider</b> <code>a2-slider</code></td>
  </tr>
  <tr>
    <td align="center"><img src="docs/img/dropdown.png" alt="Dropdown"><br><b>Dropdown</b> <code>a2-dropdown</code></td>
    <td align="center"><img src="docs/img/textfield.png" alt="Text field"><br><b>Text field</b> <code>a2-textfield</code></td>
  </tr>
  <tr>
    <td align="center"><img src="docs/img/split.png" alt="Split button"><br><b>Split button</b> <code>a2-split</code></td>
    <td align="center"><img src="docs/img/checkbox.png" alt="Checkbox"><br><b>Checkbox</b> <code>a2-checkbox</code></td>
  </tr>
  <tr>
    <td align="center"><img src="docs/img/navbar.png" alt="Navigation bar"><br><b>Navigation bar</b> <code>a2-navbar</code></td>
    <td align="center"><img src="docs/img/appbar.png" alt="App bar"><br><b>App bar</b> <code>a2-appbar</code></td>
  </tr>
  <tr>
    <td align="center"><img src="docs/img/datepicker.png" alt="Date picker"><br><b>Date picker</b> <code>a2-datepicker</code></td>
    <td align="center"><img src="docs/img/timepicker.png" alt="Time picker"><br><b>Time picker</b> <code>a2-timepicker</code></td>
  </tr>
  <tr>
    <td align="center"><img src="docs/img/loading.png" alt="Loading"><br><b>Loading</b> <code>a2-loading</code></td>
    <td align="center"><img src="docs/img/progress.png" alt="Progress bar"><br><b>Progress bar</b> <code>a2-progress</code></td>
  </tr>
  <tr>
    <td align="center"><img src="docs/img/list.png" alt="List"><br><b>List</b> <code>a2-list</code></td>
    <td align="center"><img src="docs/img/refresh.png" alt="Pull to refresh"><br><b>Pull to refresh</b> <code>a2-refresh</code></td>
  </tr>
  <tr>
    <td align="center" colspan="2"><img src="docs/img/modal.png" width="600" alt="Modal"><br><b>Modal</b> <code>a2-modal</code></td>
  </tr>
</table>

## Install

### CDN

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/web/static/pretendard.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/a2den1/adas2@v1.1.1/dist/adas2.min.css">
<script src="https://cdn.jsdelivr.net/gh/a2den1/adas2@v1.1.1/dist/adas2.min.js"></script>
```

The default font is [Pretendard](https://github.com/orioncactus/pretendard) and icons come from [Font Awesome 6](https://fontawesome.com) (solid).

### npm

```bash
npm install github:a2den1/adas2
```

```js
import 'adas2';          // registers the tags
import 'adas2/css';      // styles (if your bundler handles CSS)
import { Motion } from 'adas2';
```

Browser only. With server-side rendering, import it on the client.

## Example

```html
<a2-dropdown value="Item 1">
  <option>Item 1</option>
  <option>Item 2</option>
  <option>Item 3</option>
</a2-dropdown>

<a2-textfield label="Name"></a2-textfield>
<a2-checkbox checked>Have lunch</a2-checkbox>

<a2-button data-a2-modal="#confirm">Save</a2-button>
<a2-modal id="confirm" heading="Save changes?">
  Your changes are not applied until you save.
  <a2-button slot="actions" tone="soft" data-a2-close>Cancel</a2-button>
  <a2-button slot="actions" data-a2-close>Save</a2-button>
</a2-modal>

<script>
  document.querySelector('a2-dropdown')
    .addEventListener('change', e => console.log(e.detail.value));
</script>
```

## API

| Tag | HTML attributes | JS properties / methods | Events |
|---|---|---|---|
| `a2-button` | `disabled` `tone="soft"` `loading` | | `click` |
| `a2-slider` | `value` `min` `max` `step` `output` | `value` | `input` `change` |
| `a2-dropdown` + `<option>` | `value` `fit` `shadow` | `value` `selectedIndex` `setOpen()` `toggle()` `close()` | `change` `open` `close` |
| `a2-textfield` | `label` `value` `name` `type` | `value` `focus()` | `input` `change` |
| `a2-split` + `a2-split-item` | `selected` `menu` `open` on items | `selectedIndex` | `change` `open` `close` |
| `a2-navbar` + `a2-nav-item` | `value`, `icon` on items | `value` `select()` | `change` |
| `a2-appbar` | `heading` `back` | `setTitle()` | `back` |
| `a2-checkbox` | `checked` | `checked` | `change` |
| `a2-datepicker` | `value="2026-01-19"` | `value` `shift(n)` | `change` |
| `a2-timepicker` | `value="09:30"` `minute-step` | `value` `setMode('h' \| 'm')` | `input` `change` |
| `a2-modal` | `heading` `open` | `open(trigger?)` `close()` `isOpen` | `open` `close` |
| `a2-loading` | `tone="white"` | | |
| `a2-progress` | `value` (0–100, omit for indeterminate) | `value` | |
| `a2-list` + `a2-list-item` | `selectable`, `icon` `sub` `meta` `chevron` `selected` on items | `items` `selectedIndex` | `select` |
| `a2-refresh` | | `refresh()` `done()` `busy` | `refresh` |

<details>
<summary>Attribute notes</summary>

- `a2-slider` `output`: always shows the value in the thumb. Without it, the value shows only while dragging.
- `a2-dropdown` `fit`: sizes the label area to the text. `shadow`: adds a drop shadow.
- `a2-split-item` `menu`: an item that expands into a panel when pressed.
- `a2-nav-item` `icon`: a Font Awesome icon name (`house`, `magnifying-glass`, `user`, …).
- `a2-checkbox`: put text inside the tag to get the labeled style.
- `a2-modal`: opens from any element with `data-a2-modal="#id"`; closes with `data-a2-close`, Esc, or a click outside.
- `a2-button` `loading`: shows a spinner instead of the label and disables the button.
- `a2-loading`: set the size with `--a2-loading-size` (default 120 units). Use `tone="white"` on orange backgrounds.
- `a2-list` `selectable`: keeps the pressed item marked as selected. Without it, the mark shows only while pressing.
- `a2-list-item`: `icon` leading icon, `sub` secondary text, `meta` trailing text, `chevron` trailing arrow.
- `a2-refresh`: wraps its content in a scroll area. Give it a height; pulling down from the top and releasing fires `refresh`.

```js
document.querySelector('a2-refresh').addEventListener('refresh', e => {
  e.detail.waitUntil(fetch('/api/feed').then(r => r.json()).then(render)); // the spinner hides when this settles
});
```

</details>

## Size and color

```css
:root {
  --a2-u: .36px;            /* unit for every dimension. default .36px */
  --a2-picker-scale: 1.6;   /* extra scale for the date and time pickers */
  --a2-orange: #FF793F;     /* accent */
  --a2-orange-2: #FF9B70;
  --a2-orange-3: #FFCFBA;
  --a2-peach: #FFECE4;
  --a2-surface: #FFFFFF;
  --a2-font: "Pretendard", sans-serif;
}
```

To change only part of a page, set the variable on that element, e.g. `<section style="--a2-u: .5px">`.

## Animation engine

The spring animation used by the components is available directly.

```js
const box = document.querySelector('#box');
const m = new adas2.Motion({ x: 0, s: 1 }, v => {
  box.style.transform = `translateX(${v.x}px) scale(${v.s})`;
});

m.to({ x: 240, s: 1.2 });                                  // default spring
m.to({ x: 0 }, { x: adas2.springs.slow }, () => done());   // per-value spring, callback when done
m.set({ x: 0, s: 1 });                                     // apply immediately
```

`adas2.springs`: `base` · `fast` · `slow` · `press`

## Browser support

Chrome / Edge 111+, Safari 16.4+, Firefox 113+

## Development

```bash
npm install
npm run build      # src/ → dist/
npm run dev        # http://localhost:5880/docs/
```

| Path | Contents |
|---|---|
| `src/` | Source JS and CSS |
| `dist/` | Build output (script, ES module, minified) |
| `types/` | TypeScript declarations |
| `docs/` | Demo page and images |

Please report bugs and suggestions in [Issues](https://github.com/a2den1/adas2/issues).

## License

[adas2 License 1.0](LICENSE). This is not an open-source license.

| Allowed | Not allowed |
|---|---|
| Free use in personal and commercial projects | Modifying the source or distributed files |
| Loading via CDN or npm | Creating derivative works such as forks |
| Shipping unmodified files inside your product | Copying it and distributing or selling it as a separate library or template |
| Restyling through CSS variables, attributes and the API | Presenting it as your own work |

For any other use, please contact the copyright holder. © 2026 a2den1
