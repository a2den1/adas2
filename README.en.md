<div align="center">

<img src="docs/logo.svg" width="88" height="88" alt="adas2 logo">

# adas2

A web component UI kit

[한국어](README.md) · **English** · [Demo](https://adas2-six.vercel.app)

[![version](https://img.shields.io/badge/version-4.0.1-FF7A45?style=flat-square)](https://github.com/a2den1/adas2/releases)
![dependencies](https://img.shields.io/badge/dependencies-0-29231F?style=flat-square)
[![license](https://img.shields.io/badge/license-adas2%20License-F26A32?style=flat-square)](LICENSE)

</div>

<p align="center">
  <img src="docs/preview-dark.png" width="49%" alt="Dark theme">
  <img src="docs/preview-light.png" width="49%" alt="Light theme">
</p>

## Overview

UI components you use as HTML tags, such as `<a2-button>` and `<a2-select>`.

- One script, no runtime dependencies.
- Input elements work inside a regular `<form>`: values go into `FormData` on submit, and `required` validation and `reset` work.
- `.value` and the `input` / `change` events behave like built-in inputs.
- Three themes (dark, light, ocean). Colors and sizes are CSS variables.
- Each element uses Shadow DOM, so page CSS does not leak in.

## Install

### CDN

```html
<script src="https://cdn.jsdelivr.net/gh/a2den1/adas2@v4.0.1/dist/adas2.min.js"></script>
```

The script adds the font (Gmarket Sans) and the color variables. To avoid a flash on first paint, put the CSS in `<head>` as well.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/a2den1/adas2@v4.0.1/dist/adas2.min.css">
```

### npm

```bash
npm install github:a2den1/adas2
```

```js
import adas2 from 'adas2';   // importing registers the <a2-*> tags
```

## Getting started

```html
<form id="signup">
  <a2-input name="name" label="Name" required></a2-input>
  <a2-select name="team" label="Team" placeholder="Choose">
    <a2-option value="design">Design</a2-option>
    <a2-option value="dev">Engineering</a2-option>
  </a2-select>
  <a2-slider name="level" label="Level" min="1" max="5" value="3" show-value></a2-slider>
  <a2-switch name="news" checked>Get updates</a2-switch>
  <a2-button type="submit" variant="primary">Submit</a2-button>
</form>

<script>
  document.getElementById('signup').addEventListener('submit', e => {
    e.preventDefault();
    console.log(Object.fromEntries(new FormData(e.target)));
    adas2.toast('Submitted', { variant: 'success' });
  });
</script>
```

## Components

Common attributes: `label` `hint` `error` `disabled` `required` `name` `size="sm|lg"`. Inputs expose `.value` and fire `input` (while changing) and `change` (committed).

| Tag | Main attributes | Notes |
|---|---|---|
| `a2-button` | `variant` (primary, soft, ghost, danger) `type` (submit, reset) `loading` `block` | Icons go in `slot="prefix"` / `slot="suffix"`; an icon with no text makes a square button |
| `a2-input` | `type` `placeholder` `clearable` `maxlength` `pattern` | Single line. `type="password"` adds a show button |
| `a2-textarea` | `rows` `maxlength` | Multi-line, grows with its content |
| `a2-number` | `min` `max` `step` `unit` `decimals` | − / + buttons that repeat while held. Accepts expressions like `50+25` or `x*2` (x is the current value) |
| `a2-checkbox` | `checked` `indeterminate` `value` | Checkbox |
| `a2-switch` | `checked` `value` | Switch |
| `a2-radio-group` · `a2-radio` | `value` `direction="row"` | Pick one. Arrow keys move the selection |
| `a2-slider` | `min` `max` `step` `show-value` `unit` | Click or drag the track; arrow keys, Home, End |
| `a2-select` · `a2-option` | `placeholder` `multiple` `searchable` | Popup list. With `multiple`, use `value="a,b"`; `.value` is an array |
| `a2-segmented` · `a2-segment` | `value` `block` | One of 2–5 options |
| `a2-tabs` · `a2-tab-panel` | `value`, `label` on panels | Tabs. Fires `a2-change` |
| `a2-color` | `alpha` `presets="#hex,…"` | Saturation/value area, hue and alpha bars, HEX input |
| `a2-keybind` | `value="Ctrl+KeyS"` | Shortcut input. Click, then press keys; Esc cancels, Backspace clears |
| `a2-progress` | `value` `max` `show-value` `variant` | Progress bar. Without `value` it is indeterminate |
| `a2-spinner` | `size` | Loading spinner |
| `a2-badge` | `variant` (accent, success, warning, danger) `dot` | Small label |
| `a2-card` | `heading` `description` `interactive` | Card. Buttons go in `slot="footer"` |
| `a2-dialog` | `heading` `description` `size` `persistent` `no-close` | Dialog. `show()` / `close(value)`, `a2-show` / `a2-close` events |
| `a2-drawer` | `side` (right, left, bottom) | Side or bottom sheet. Same API as the dialog |
| `a2-menu` · `a2-menu-item` | `for` `trigger="contextmenu"` `align="end"`, `shortcut` `danger` on items | Menu. Fires `a2-select` (`detail.value`) |

Inside a dialog, clicking an element with `data-close="value"` closes it with that value.

```html
<a2-dialog id="save" heading="Save changes?">
  <div slot="footer" style="display:contents">
    <a2-button data-close="no" variant="ghost">No</a2-button>
    <a2-button data-close="yes" variant="primary">Save</a2-button>
  </div>
</a2-dialog>
<script>
  save.show();
  save.addEventListener('a2-close', e => console.log(e.detail.returnValue));
</script>
```

For a tooltip, add `a2-tip="text"` to any element. Set the side with `a2-tip-side="top|bottom|left|right"`.

## Script API

```js
adas2.toast('Saved', { variant: 'success' });                     // info, success, warning, danger
adas2.toast('Deleted 1 item', { action: { label: 'Undo', onClick: undo } });

await adas2.alert('Update finished.');
if (await adas2.confirm('Delete this?', { title: 'Delete', okText: 'Delete', danger: true })) remove();
const name = await adas2.prompt('New name', { value: 'Document 1' }); // null when cancelled

adas2.theme('light');                                             // 'dark', 'light', 'ocean', 'auto'
adas2.animate({ x: 0 }, { x: 100 }, { duration: 0.3, ease: 'OutCubic', onUpdate: v => {} });
adas2.evaluate('x*2', { x: 5 });                                  // { ok: true, value: 10 }
addEventListener('keydown', e => { if (adas2.matchKey(e, 'Ctrl+KeyS')) save(); });
```

Built-in labels (cancel, OK, placeholders) are in Korean; pass `okText`, `cancelText` and `placeholder` to change them.

## Themes and styling

```html
<html data-a2-theme="light">
```

```css
:root {
  --a2-accent: #4C8DFF;     /* accent color */
  --a2-radius: 8px;         /* corner radius */
  --a2-h: 36px;             /* control height */
  --a2-fs: 13px;            /* font size */
  --a2-speed: 1.5;          /* animation speed (instant with reduced motion) */
}
```

| Variable | Meaning |
|---|---|
| `--a2-bg` `--a2-surface` `--a2-raised` | Page, cards, floating panels |
| `--a2-fill` `--a2-fill-hover` `--a2-fill-active` | Control background (translucent) |
| `--a2-accent` `--a2-accent-hover` `--a2-accent-pressed` `--a2-accent-soft` `--a2-on-accent` | Accent and text on it |
| `--a2-text` `--a2-text-muted` `--a2-text-faint` | Text |
| `--a2-danger` `--a2-success` `--a2-warning` | Status colors |
| `--a2-font` `--a2-weight` `--a2-weight-strong` | Font and weights (300, 500) |

Inner parts can be styled with `::part()`, for example `a2-input::part(box)`, `a2-button::part(base)`, `a2-slider::part(thumb)`.

## Development

```bash
npm install
npm run build      # src/ → dist/
npm run dev        # http://localhost:5880/docs/
```

| Path | Contents |
|---|---|
| `src/core/` | Base class, animation, popovers, shortcuts, expression evaluator |
| `src/elements/` | Components |
| `src/api/` | Toast, dialog functions, tooltip, theme |
| `src/styles/global.css` | Font and color variables |
| `types/` | TypeScript declarations |

Browsers: Chrome/Edge 114+, Safari 17+, Firefox 125+

## License

[adas2 License 1.0](LICENSE). This is not an open-source license.

| Allowed | Not allowed |
|---|---|
| Free use in personal and commercial projects | Modifying the source or distributed files |
| Loading via CDN or npm | Creating derivative works such as forks |
| Shipping unmodified files inside your product | Copying it and distributing or selling it as a separate library or template |
| Restyling through attributes, CSS variables and `::part()` | Presenting it as your own work |

The font (Gmarket Sans) is not bundled; it loads from a CDN and its copyright belongs to Gmarket. © 2026 a2den1
