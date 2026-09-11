import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CornerDownLeft, FileText, Search as SearchIcon } from 'lucide-react'
import { SEARCH_INDEX, type SearchItem } from '../data/searchIndex'
import { useI18n } from '../i18n'

function matches(item: SearchItem, query: string): boolean {
  const haystack = `${item.title} ${item.description} ${item.keywords.join(' ')}`.toLowerCase()
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((token) => haystack.includes(token))
}

export default function Search() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const results = useMemo(
    () => (query.trim() ? SEARCH_INDEX.filter((item) => matches(item, query)) : SEARCH_INDEX),
    [query],
  )

  const openSearch = useCallback(() => {
    setOpen(true)
    setQuery('')
    setActive(0)
  }, [])

  const closeSearch = useCallback(() => setOpen(false), [])

  const go = useCallback(
    (item: SearchItem) => {
      closeSearch()
      navigate(item.to)
      if (item.section) {
        const id = item.section
        window.setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 120)
      } else {
        window.scrollTo({ top: 0 })
      }
    },
    [closeSearch, navigate],
  )

  // Global shortcut: Ctrl+K / Cmd+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        openSearch()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openSearch])

  // Focus input and lock scroll while open
  useEffect(() => {
    if (!open) return
    inputRef.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Keep highlighted result visible
  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: 'nearest' })
  }, [active])

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeSearch()
    } else if (e.key === 'ArrowDown' && results.length > 0) {
      e.preventDefault()
      setActive((i) => (i + 1) % results.length)
    } else if (e.key === 'ArrowUp' && results.length > 0) {
      e.preventDefault()
      setActive((i) => (i - 1 + results.length) % results.length)
    } else if (e.key === 'Enter' && results[active]) {
      go(results[active])
    }
  }

  return (
    <>
      <button
        type="button"
        className="search-trigger"
        onClick={openSearch}
        aria-label={t('search.label')}
        title={`${t('search.label')} (Ctrl+K)`}
      >
        <SearchIcon size={18} aria-hidden="true" />
        <span className="search-trigger-label">{t('search.label')}</span>
        <kbd className="search-kbd">Ctrl K</kbd>
      </button>

      {open && (
        <div className="search-overlay" role="presentation" onClick={closeSearch}>
          <div
            className="search-dialog"
            role="dialog"
            aria-modal="true"
            aria-label={t('search.label')}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="search-input-row">
              <SearchIcon size={18} aria-hidden="true" className="search-input-icon" />
              <input
                ref={inputRef}
                type="text"
                className="search-input"
                placeholder={t('search.placeholder')}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setActive(0)
                }}
                onKeyDown={onInputKey}
                role="combobox"
                aria-expanded="true"
                aria-controls="search-results"
                aria-activedescendant={results[active] ? `search-result-${active}` : undefined}
              />
            </div>

            <div className="search-results" id="search-results" role="listbox" ref={listRef}>
              {results.length === 0 ? (
                <p className="search-empty">{t('search.noResults')}</p>
              ) : (
                results.map((item, i) => (
                  <button
                    key={`${item.to}-${item.section ?? ''}`}
                    type="button"
                    id={`search-result-${i}`}
                    data-index={i}
                    role="option"
                    aria-selected={i === active}
                    className={`search-result${i === active ? ' active' : ''}`}
                    style={{ animationDelay: `${Math.min(i * 25, 200)}ms` }}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(item)}
                  >
                    <FileText size={16} aria-hidden="true" className="search-result-icon" />
                    <span className="search-result-text">
                      <span className="search-result-title">{item.title}</span>
                      <span className="search-result-desc">{item.description}</span>
                    </span>
                    <CornerDownLeft size={14} aria-hidden="true" className="search-result-enter" />
                  </button>
                ))
              )}
            </div>

            <div className="search-footer">
              <span className="search-hint">
                <kbd className="search-kbd">↑↓</kbd> {t('search.hint')}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
