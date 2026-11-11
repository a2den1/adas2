<div align="center">

<img src="docs/logo.svg" width="88" height="88" alt="adas2 logo">

# adas2

A web component UI kit

[한국어](README.md) · **English** · [Demo](https://adas2-six.vercel.app)

[![version](https://img.shields.io/badge/version-5.0.0-FF7A45?style=flat-square)](https://github.com/a2den1/adas2/releases)
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
- Three themes (dark, light, ocean), and you can make a new one from a single accent color.
- Motion is computed with springs; the bounce amount is adjustable.
- Each element uses Shadow DOM, so page CSS does not leak in.

## Install

### CDN

```html
<script src="https://cdn.jsdelivr.net/gh/a2den1/adas2@v5.0.0/dist/adas2.min.js"></script>
```

The script adds the font (Gmarket Sans) and the color variables. To avoid a flash on first paint, put the CSS in `<head>` as well.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/a2den1/adas2@v5.0.0/dist/adas2.min.css">
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

Common attributes: `label` `hint` `error` `disabled` `required` `name`. Inputs expose `.value` and fire `input` (while changing) and `change` (committed).

| Tag | Main attributes | Notes |
|---|---|---|
| `a2-button` | `variant` (primary, tonal, ghost, elevated, danger) `size` (xs, sm, lg, xl) `shape="square"` `toggle` `selected` `type` `loading` `block` | Button. Corners change shape while pressed. `toggle` makes it an on/off button |
| `a2-split-button` | `variant` `menu="menu id"` | Leading button plus a trailing arrow that opens the linked `a2-menu` |
| `a2-fab` · `a2-fab-item` | `label` `extended` `variant` `size` | Floating button. With items it expands upward on click and fires `a2-select` |
| `a2-segmented` · `a2-segment` | `value` `block` `multiple` `size` | Connected button group. The pressed segment widens and its neighbors give way |
| `a2-input` | `type` `placeholder` `clearable` `maxlength` `pattern` | Single line. The label starts inside and moves up onto the outline |
| `a2-textarea` | `rows` `maxlength` | Multi-line, grows with its content |
| `a2-number` | `min` `max` `step` `unit` `decimals` | Minus / plus buttons and expressions (`50+25`, `x*2`). Changed digits roll |
| `a2-checkbox` | `checked` `indeterminate` `value` | Checkbox |
| `a2-switch` | `checked` `value` | Switch. Click it or drag the thumb |
| `a2-radio-group` · `a2-radio` | `value` `direction="row"` | Pick one. Arrow keys move the selection |
| `a2-slider` | `min` `max` `step` `show-value` `unit` `size` (sm, lg) | Click or drag the track; arrow keys, Home, End |
| `a2-select` · `a2-option` | `placeholder` `multiple` `searchable` | Popup list. With `multiple`, use `value="a,b"`; `.value` is an array |
| `a2-chip` | `selected` `removable` `static` `value` | Small on/off pill. `removable` fires `a2-remove` |
| `a2-tabs` · `a2-tab-panel` | `value` `fit`, `label` on panels | Tabs. Fires `a2-change` |
| `a2-color` | `alpha` `presets="#hex,…"` | Saturation/value area, hue and alpha bars, HEX input |
| `a2-keybind` | `value="Ctrl+KeyS"` | Shortcut input. Click, then press keys; Esc cancels, Backspace clears |
| `a2-progress` | `value` `max` `show-value` `variant` `flat` | Wavy progress bar. Without `value` it is indeterminate |
| `a2-spinner` | `size` `contained` | Loading indicator that changes shape as it turns |
| `a2-badge` | `variant` (accent, success, warning, danger) `dot` | Small label |
| `a2-card` | `heading` `description` `variant` (outlined, elevated) `interactive` | Card |
| `a2-dialog` | `heading` `description` `size` `persistent` `no-close` | Dialog. `show(opener)` / `close(value)`, `a2-show` / `a2-close` events. Grows from the opener |
| `a2-drawer` | `side` (right, left, bottom) | Side or bottom sheet. The bottom sheet can be dragged down to close |
| `a2-menu` · `a2-menu-item` | `for` `trigger="contextmenu"` `align="end"`, `shortcut` `danger` on items | Menu. Fires `a2-select` (`detail.value`) |

Inside a dialog, clicking an element with `data-close="value"` closes it with that value. For a tooltip, add `a2-tip="text"` to any element.

## Script API

```js
adas2.toast('Saved', { variant: 'success' });                     // info, success, warning, danger. Swipe sideways to dismiss
adas2.toast('Deleted 1 item', { action: { label: 'Undo', onClick: undo } });

await adas2.alert('Update finished.');
if (await adas2.confirm('Delete this?', { title: 'Delete', okText: 'Delete', danger: true })) remove();
const name = await adas2.prompt('New name', { value: 'Document 1' }); // null when cancelled

adas2.theme('light');                                             // 'dark', 'light', 'ocean', 'auto'
adas2.evaluate('x*2', { x: 5 });                                  // { ok: true, value: 10 }
addEventListener('keydown', e => { if (adas2.matchKey(e, 'Ctrl+KeyS')) save(); });
```

Built-in labels (cancel, OK, placeholders) are in Korean; pass `okText`, `cancelText` and `placeholder` to change them.

## Customizing and extending

```js
// A theme from one accent color; the other colors are derived from it
adas2.defineTheme('mint', { base: 'dark', accent: '#3FD0A5' });
adas2.theme('mint');

// Motion: bounce amount (0 turns overshoot off) and spring values
adas2.setMotion({ bounce: 0.5 });
adas2.setMotion({ springs: { snap: { k: 600, z: 0.7 } } });

// Add an icon
adas2.addIcon('star', '0 0 576 512', 'M316.9 18C311.6 7 300.4 0 288.1 0s…');
```

```css
:root {
  --a2-accent: #4C8DFF;     /* accent color */
  --a2-r-md: 10px;          /* corner radius (xs, sm, md, lg, xl) */
  --a2-h: 40px;             /* button height */
  --a2-h-field: 48px;       /* field height */
  --a2-speed: 1.5;          /* motion speed (instant with reduced motion) */
}
```

| Variable | Meaning |
|---|---|
| `--a2-bg` `--a2-surface` `--a2-surface-high` `--a2-surface-highest` | Page and the surfaces on it |
| `--a2-accent` `--a2-on-accent` `--a2-accent-container` `--a2-on-accent-container` | Accent, its soft container, and text on them |
| `--a2-tonal` `--a2-on-tonal` | Lower-emphasis surface and its text |
| `--a2-line` `--a2-line-strong` `--a2-fill` `--a2-fill-hover` | Outlines and hover overlay |
| `--a2-text` `--a2-text-muted` `--a2-text-faint` | Text |
| `--a2-danger` `--a2-success` `--a2-warning` | Status colors |
| `--a2-tip` `--a2-on-tip` | Toast and tooltip background and text |
| `--a2-r-xs` … `--a2-r-xl` | Corner radii |

Inner parts can be styled with `::part()`, for example `a2-input::part(box)`, `a2-button::part(base)`, `a2-slider::part(thumb)`.

### Writing your own element

The base class and the spring are exported.

```js
const { A2Element, define, Spring, drag, ripple } = adas2;

class Knob extends A2Element {
  static styles = `.k { width: 64px; height: 64px; border-radius: 50%; background: var(--a2-tonal); }`;
  render() {
    this.root.innerHTML = `<div class="k"></div>`;
    const k = this.$('.k');
    const turn = new Spring(0, 'snap', deg => { k.style.rotate = `${deg}deg`; });
    drag(k, { move: ({ dx }) => turn.jump(dx), end: ({ vx }) => turn.set(0, { velocity: vx }) });   // springs back, keeping the release velocity
  }
}
define('x-knob', Knob);
```

## Development

```bash
npm install
npm run build      # src/ → dist/
npm run dev        # http://localhost:5880/docs/
```

| Path | Contents |
|---|---|
| `src/core/` | Base class, springs, popovers, shortcuts, expression evaluator |
| `src/elements/` | Components |
| `src/api/` | Toast, dialog functions, tooltip, theme |
| `src/styles/global.css` | Font and color variables |
| `types/` | TypeScript declarations |

Browsers: Chrome/Edge 114+, Safari 17.2+, Firefox 125+

## License

[adas2 License 1.0](LICENSE). This is not an open-source license.

| Allowed | Not allowed |
|---|---|
| Free use in personal and commercial projects | Modifying the source or distributed files |
| Loading via CDN or npm | Creating derivative works such as forks |
| Shipping unmodified files inside your product | Copying it and distributing or selling it as a separate library or template |
| Restyling through attributes, CSS variables and `::part()` | Presenting it as your own work |

The font (Gmarket Sans) is not bundled; it loads from a CDN and its copyright belongs to Gmarket. Icons are from [Font Awesome Free](https://fontawesome.com) (CC BY 4.0). © 2026 a2den1
