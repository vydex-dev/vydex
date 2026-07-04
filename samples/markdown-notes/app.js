// Markdown Notes — dependency-free notes app with live markdown preview.
// Notes persist in localStorage; export any note as a .md file.

const KEY = 'md-notes-v1'

const $ = (s) => document.querySelector(s)
const listEl = $('#note-list')
const titleEl = $('#note-title')
const bodyEl = $('#note-body')
const previewEl = $('#preview')

let notes = load()
let currentId = notes[0]?.id ?? null

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) ?? [] } catch { return [] }
}
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(notes)) } catch { /* storage full/blocked */ }
}
function current() {
  return notes.find((n) => n.id === currentId) ?? null
}

// ── tiny markdown renderer (headings, emphasis, code, links, lists, quotes) ──
function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
function inline(s) {
  return s
    .replace(/`([^`]+)`/g, (_, c) => `<code>${c}</code>`)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
}
function renderMarkdown(src) {
  const lines = esc(src).split('\n')
  const out = []
  let inCode = false
  let listMode = null // 'ul' | 'ol' | null

  const closeList = () => { if (listMode) { out.push(`</${listMode}>`); listMode = null } }

  for (const raw of lines) {
    if (raw.trim().startsWith('```')) {
      closeList()
      out.push(inCode ? '</code></pre>' : '<pre><code>')
      inCode = !inCode
      continue
    }
    if (inCode) { out.push(raw + '\n'); continue }

    const h = raw.match(/^(#{1,4})\s+(.*)$/)
    const ul = raw.match(/^\s*[-*]\s+(.*)$/)
    const ol = raw.match(/^\s*\d+\.\s+(.*)$/)

    if (h) { closeList(); out.push(`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`) }
    else if (ul) { if (listMode !== 'ul') { closeList(); out.push('<ul>'); listMode = 'ul' } out.push(`<li>${inline(ul[1])}</li>`) }
    else if (ol) { if (listMode !== 'ol') { closeList(); out.push('<ol>'); listMode = 'ol' } out.push(`<li>${inline(ol[1])}</li>`) }
    else if (raw.startsWith('&gt; ')) { closeList(); out.push(`<blockquote>${inline(raw.slice(5))}</blockquote>`) }
    else if (raw.trim() === '---') { closeList(); out.push('<hr>') }
    else if (raw.trim() === '') { closeList() }
    else { closeList(); out.push(`<p>${inline(raw)}</p>`) }
  }
  closeList()
  if (inCode) out.push('</code></pre>')
  return out.join('')
}

// ── UI ────────────────────────────────────────────────────────────────────
function renderList() {
  listEl.innerHTML = ''
  for (const n of notes) {
    const li = document.createElement('li')
    li.textContent = n.title || 'Untitled'
    li.className = n.id === currentId ? 'active' : ''
    li.onclick = () => { currentId = n.id; renderAll() }
    listEl.appendChild(li)
  }
}
function renderEditor() {
  const n = current()
  titleEl.value = n?.title ?? ''
  bodyEl.value = n?.body ?? ''
  previewEl.innerHTML = n ? renderMarkdown(n.body) : '<p class="hint">Create a note to start.</p>'
  titleEl.disabled = bodyEl.disabled = !n
}
function renderAll() { renderList(); renderEditor() }

$('#new-note').onclick = () => {
  const n = { id: Date.now().toString(36), title: '', body: '', updated: Date.now() }
  notes.unshift(n)
  currentId = n.id
  save(); renderAll(); titleEl.focus()
}
$('#delete').onclick = () => {
  if (!current()) return
  if (!confirm('Delete this note?')) return
  notes = notes.filter((n) => n.id !== currentId)
  currentId = notes[0]?.id ?? null
  save(); renderAll()
}
$('#export').onclick = () => {
  const n = current()
  if (!n) return
  const blob = new Blob([`# ${n.title || 'Untitled'}\n\n${n.body}`], { type: 'text/markdown' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = `${(n.title || 'note').replace(/[^a-z0-9-_ ]/gi, '')}.md`
  a.click()
  URL.revokeObjectURL(a.href)
}
titleEl.oninput = () => { const n = current(); if (!n) return; n.title = titleEl.value; n.updated = Date.now(); save(); renderList() }
bodyEl.oninput = () => { const n = current(); if (!n) return; n.body = bodyEl.value; n.updated = Date.now(); save(); previewEl.innerHTML = renderMarkdown(n.body) }

if (notes.length === 0) {
  notes = [{
    id: 'welcome',
    title: 'Welcome 👋',
    body: '# Markdown Notes\n\nEverything is saved **locally** in your browser.\n\n- Live preview on the right\n- `inline code` and **bold** and *italic*\n- Export any note as a `.md` file\n\n```\nno accounts, no servers, no tracking\n```\n\n> Tip: create a new note with the + button.',
    updated: Date.now(),
  }]
  currentId = 'welcome'
  save()
}
renderAll()
