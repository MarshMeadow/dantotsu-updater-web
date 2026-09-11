let installed = false

function isInput(el: EventTarget | null): boolean {
  if (!(el instanceof HTMLElement)) return false
  const tag = el.tagName.toLowerCase()
  return tag === 'input' || tag === 'textarea' || el.isContentEditable
}

function blockDevTools(e: KeyboardEvent) {
  const ctrlOrMeta = e.ctrlKey || e.metaKey
  const shift = e.shiftKey
  const key = e.key

  // F12, Ctrl+Shift+I/J/C, Ctrl+U, Ctrl+S
  if (
    key === 'F12' ||
    (ctrlOrMeta && shift && (key === 'I' || key === 'J' || key === 'C')) ||
    (ctrlOrMeta && (key === 'u' || key === 'U' || key === 's' || key === 'S'))
  ) {
    e.preventDefault()
    e.stopPropagation()
  }
}

export function initProtections() {
  if (installed || typeof window === 'undefined') return
  installed = true

  // Disable right-click context menu
  window.addEventListener('contextmenu', (e) => {
    e.preventDefault()
  }, true)

  // Disable copy/cut/drag for most content (but allow inside inputs for usability)
  window.addEventListener('copy', (e) => {
    if (!isInput(e.target)) e.preventDefault()
  }, true)

  window.addEventListener('cut', (e) => {
    if (!isInput(e.target)) e.preventDefault()
  }, true)

  window.addEventListener('dragstart', (e) => {
    if (!isInput(e.target)) e.preventDefault()
  }, true)

  // Block common dev-tools and view-source shortcuts
  window.addEventListener('keydown', blockDevTools, true)
}
