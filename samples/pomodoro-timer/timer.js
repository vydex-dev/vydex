// Pomodoro — focus timer with break cycles, completion stats and a gentle beep.
// Stats persist in localStorage; the tab title shows the countdown.

const DURATIONS = { focus: 25 * 60, short: 5 * 60, long: 15 * 60 }
const STATS_KEY = 'pomodoro-stats-v1'

const $ = (s) => document.querySelector(s)
const timeEl = $('#time')
const barEl = $('#bar')
const toggleBtn = $('#toggle')

let mode = 'focus'
let remaining = DURATIONS[mode]
let ticker = null

// ── stats ──────────────────────────────────────────────────────────────────
function loadStats() {
  try { return JSON.parse(localStorage.getItem(STATS_KEY)) ?? { total: 0, days: {} } } catch { return { total: 0, days: {} } }
}
function saveStats(s) {
  try { localStorage.setItem(STATS_KEY, JSON.stringify(s)) } catch { /* ignore */ }
}
function todayKey() { return new Date().toISOString().slice(0, 10) }
function renderStats() {
  const s = loadStats()
  $('#today').textContent = s.days[todayKey()] ?? 0
  $('#total').textContent = s.total
}
function recordPomodoro() {
  const s = loadStats()
  s.total += 1
  s.days[todayKey()] = (s.days[todayKey()] ?? 0) + 1
  saveStats(s)
  renderStats()
}

// ── beep (WebAudio, no assets) ─────────────────────────────────────────────
function beep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain).connect(ctx.destination)
    osc.frequency.value = 880
    gain.gain.setValueAtTime(0.2, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6)
    osc.start()
    osc.stop(ctx.currentTime + 0.6)
  } catch { /* audio blocked — fine */ }
}

// ── timer ──────────────────────────────────────────────────────────────────
function fmt(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, '0')
  const s = String(sec % 60).padStart(2, '0')
  return `${m}:${s}`
}
function render() {
  timeEl.textContent = fmt(remaining)
  document.title = ticker ? `${fmt(remaining)} · Pomodoro` : 'Pomodoro'
  barEl.style.width = `${(1 - remaining / DURATIONS[mode]) * 100}%`
}
function stop() {
  clearInterval(ticker)
  ticker = null
  toggleBtn.textContent = 'Start'
  toggleBtn.classList.add('primary')
}
function tick() {
  remaining -= 1
  if (remaining <= 0) {
    remaining = 0
    stop()
    beep()
    if (mode === 'focus') recordPomodoro()
    render()
    return
  }
  render()
}
toggleBtn.onclick = () => {
  if (ticker) { stop() } else {
    if (remaining === 0) remaining = DURATIONS[mode]
    ticker = setInterval(tick, 1000)
    toggleBtn.textContent = 'Pause'
    toggleBtn.classList.remove('primary')
  }
  render()
}
$('#reset').onclick = () => { stop(); remaining = DURATIONS[mode]; render() }

for (const btn of document.querySelectorAll('.mode')) {
  btn.onclick = () => {
    document.querySelector('.mode.active')?.classList.remove('active')
    btn.classList.add('active')
    mode = btn.dataset.set
    document.body.dataset.mode = mode
    stop()
    remaining = DURATIONS[mode]
    render()
  }
}

renderStats()
render()
