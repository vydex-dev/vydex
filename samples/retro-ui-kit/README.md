# Retro UI Kit

Pixel-flavored UI components in **pure CSS** — hard shadows, chunky borders, and
a theme you can swap in five variables. No JavaScript, no build step.

## What's inside (`kit.css`)
| Component | Classes |
|---|---|
| Buttons | `.rk-btn`, `--primary`, `--danger`, `:disabled` |
| Card | `.rk-card`, `__title`, `__body` |
| Inputs | `.rk-input`, `.rk-select`, `.rk-textarea`, `.rk-label` |
| Badges | `.rk-badge`, `--ok`, `--warn`, `--danger` |
| Toggle | `.rk-toggle` (pure-CSS checkbox switch) |
| Progress | `.rk-progress` + `__fill` (striped) |
| Alerts | `.rk-alert`, `--ok`, `--warn`, `--danger` |
| Tooltip | `.rk-tooltip` with `data-tip="…"` |
| Table | `.rk-table` |

## Use it
```html
<link rel="stylesheet" href="kit.css" />
<button class="rk-btn rk-btn--primary">Ship it</button>
```

## Theme it
Override the variables — the whole kit follows:
```css
:root { --rk-primary: #58e07e; --rk-bg: #0a0a0a; }
```

Open `index.html` for a live demo of every component.
