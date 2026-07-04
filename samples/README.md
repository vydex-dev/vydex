# Sample projects — seed content for the marketplace

Eight small, genuinely useful, dependency-free projects. Ready-to-upload ZIPs
are in `dist/` (rebuild any time: `powershell samples/build-zips.ps1`).

**Upload:** `/explore/new` → drag the ZIP → paste the details below → publish.
Add 1–2 screenshots per listing (open the project's `index.html`, screenshot it) —
listings with previews convert far better.

---

| # | ZIP | Title | Category | Price | Tags |
|---|-----|-------|----------|-------|------|
| 1 | `markdown-notes.zip` | Markdown Notes | Apps | Free | `notes` `markdown` `local-first` `vanilla-js` |
| 2 | `pomodoro-timer.zip` | Pomodoro | Apps | Free | `pomodoro` `timer` `productivity` `vanilla-js` |
| 3 | `json-toolbox.zip` | JSON Toolbox | Apps | Free | `json` `formatter` `validator` `devtools` |
| 4 | `pixel-clock.zip` | Pixel Clock | Apps | Free | `clock` `widget` `retro` `vanilla-js` |
| 5 | `retro-ui-kit.zip` | Retro UI Kit | UI Components | $4 | `css` `ui-kit` `retro` `design-system` |
| 6 | `css-loaders-pack.zip` | CSS Loaders Pack | UI Components | Free | `css` `loaders` `spinners` `animation` |
| 7 | `ai-dev-prompt-pack.zip` | AI Dev Prompt Pack | Prompts | $3 | `prompts` `ai` `claude` `productivity` |
| 8 | `launch-landing-template.zip` | Launchpad Landing Template | Templates | $5 | `landing-page` `template` `html` `startup` |

Mix of free/paid is deliberate: free items drive downloads and reviews, paid
items show the buying flow works. Prices are suggestions — tweak freely.

---

## Descriptions (paste into the form)

**1. Markdown Notes** — Local-first markdown notes with live preview and .md
export. No accounts, no servers — everything stays in your browser. Vanilla
HTML/CSS/JS, ~300 lines, easy to extend.

**2. Pomodoro** — Minimal pomodoro timer: 25/5/15 cycles, daily stats, countdown
in the tab title and a WebAudio completion beep. Zero dependencies — open
index.html and focus.

**3. JSON Toolbox** — Format, validate and minify JSON entirely in the browser.
Precise line:column error positions, structure stats, one-click copy. Safe for
private payloads: there is no server.

**4. Pixel Clock** — A tiny retro clock widget with a light/dark theme toggle
that remembers your choice. The perfect "first project" to poke around in.

**5. Retro UI Kit** — Pixel-flavored UI components in pure CSS: buttons, cards,
forms, badges, a CSS-only toggle, striped progress, alerts, tooltip and table.
One file, themeable with five variables, no build step.

**6. CSS Loaders Pack** — 8 loading spinners in one CSS file. One element each,
size & color via variables, zero JS. Demo page with click-to-copy snippets.

**7. AI Dev Prompt Pack** — 25 battle-tested prompts for shipping software with
AI assistants: spec-first planning, debugging that diagnoses before it fixes,
safe refactoring, adversarial code review and tests that actually catch bugs.
Each prompt has a fill-in structure and a note on when to use it.

**8. Launchpad Landing Template** — A product landing you can ship tonight:
hero, features, pricing, FAQ, footer in two static files. Rebrand by changing
four CSS variables. Semantic HTML, native accordions, no frameworks.

---

## Or push via CLI

Copy a project OUT of this repo first (so `git archive` packs only it):

```powershell
xcopy /E /I samples\markdown-notes %USERPROFILE%\markdown-notes
cd %USERPROFILE%\markdown-notes
git init; git add -A; git commit -m "init"
vydex push --title "Markdown Notes"
```
