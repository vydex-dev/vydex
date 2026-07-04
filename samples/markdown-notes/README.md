# Markdown Notes

A local-first markdown notes app in a single page — open `index.html` and write.
No accounts, no servers, no tracking: everything lives in your browser.

## Features
- **Live preview** — markdown renders as you type (headings, bold/italic, code
  blocks, links, lists, quotes, dividers)
- **Local-first** — notes persist in `localStorage`, survive restarts
- **Export** — download any note as a real `.md` file
- **Zero dependencies** — vanilla HTML/CSS/JS, ~300 lines total, easy to extend

## Run it
Open `index.html` in any browser. That's the whole setup.

## Customize
All colors are CSS variables at the top of `style.css`. The markdown renderer is
a single function in `app.js` (`renderMarkdown`) — add your own rules in minutes.
