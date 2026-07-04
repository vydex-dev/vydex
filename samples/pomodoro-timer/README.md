# Pomodoro

A minimal, good-looking pomodoro timer. Open `index.html` — that's it.

## Features
- **25/5/15 cycles** — focus, short break, long break; theme shifts with the mode
- **Daily stats** — completed pomodoros per day + all-time total (`localStorage`)
- **Countdown in the tab title** — see the time from any tab
- **Completion beep** — generated with WebAudio, no sound files needed
- **Zero dependencies** — three small files of vanilla HTML/CSS/JS

## Run it
Open `index.html` in any browser.

## Customize
Durations are one object at the top of `timer.js` (`DURATIONS`). Colors are CSS
variables in `style.css` — the break theme is a one-line override.
