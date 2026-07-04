// JSON Toolbox — format / validate / minify, fully client-side.
// Shows precise error positions (line:column) and quick stats about the data.

const $ = (s) => document.querySelector(s)
const input = $('#input')
const statusEl = $('#status')
const metaEl = $('#meta')

function setStatus(kind, msg) {
  statusEl.hidden = false
  statusEl.className = `status ${kind}`
  statusEl.textContent = msg
}
function clearStatus() { statusEl.hidden = true }

// Turn "position 123" from JSON.parse errors into line:column.
function describeError(err, text) {
  const m = /position (\d+)/.exec(err.message)
  if (!m) return err.message
  const pos = Number(m[1])
  const upto = text.slice(0, pos)
  const line = upto.split('\n').length
  const col = pos - upto.lastIndexOf('\n')
  return `${err.message.split(' at ')[0].trim()} — line ${line}, column ${col}`
}

function analyze(value) {
  let nodes = 0
  let depth = 0
  const walk = (v, d) => {
    nodes++
    depth = Math.max(depth, d)
    if (Array.isArray(v)) v.forEach((x) => walk(x, d + 1))
    else if (v && typeof v === 'object') Object.values(v).forEach((x) => walk(x, d + 1))
  }
  walk(value, 1)
  return { nodes, depth }
}

function updateMeta() {
  const bytes = new Blob([input.value]).size
  const kb = bytes < 1024 ? `${bytes} B` : `${(bytes / 1024).toFixed(1)} KB`
  let extra = ''
  try {
    const parsed = JSON.parse(input.value)
    const { nodes, depth } = analyze(parsed)
    extra = ` · valid ✓ · ${nodes} nodes · depth ${depth}`
  } catch { /* not valid yet */ }
  metaEl.textContent = input.value.trim() ? `${kb}${extra}` : ''
}

function run(transform) {
  const text = input.value.trim()
  if (!text) { setStatus('warn', 'Nothing to do — paste some JSON first.'); return }
  try {
    const parsed = JSON.parse(text)
    input.value = transform(parsed)
    setStatus('ok', 'Valid JSON ✓')
    updateMeta()
  } catch (err) {
    setStatus('err', describeError(err, text))
  }
}

$('#format').onclick = () => run((v) => JSON.stringify(v, null, 2))
$('#minify').onclick = () => run((v) => JSON.stringify(v))
$('#copy').onclick = async () => {
  try {
    await navigator.clipboard.writeText(input.value)
    setStatus('ok', 'Copied to clipboard.')
  } catch { setStatus('warn', 'Clipboard blocked — select and copy manually.') }
}
$('#clear').onclick = () => { input.value = ''; clearStatus(); updateMeta(); input.focus() }
$('#sample').onclick = () => {
  input.value = JSON.stringify({
    project: 'json-toolbox',
    valid: true,
    tags: ['json', 'formatter', 'validator'],
    nested: { arrays: [1, 2, 3], null_here: null, deep: { deeper: { value: 42 } } },
  }, null, 2)
  clearStatus()
  updateMeta()
}
input.addEventListener('input', () => { clearStatus(); updateMeta() })
updateMeta()
