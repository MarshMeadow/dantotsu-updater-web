import { useEffect, useState } from 'react'
import { Lock, Unlock, KeyRound, CheckCircle, AlertTriangle, ExternalLink, Eye, EyeOff } from 'lucide-react'
import Seo from '../components/Seo'
import { EXTENSIONS_KEY } from '../constants/auth'

const STORAGE_KEY = 'dantotsu-ext-unlocked'

const EXTENSION_SOURCES = [
  {
    name: 'Aniyomi Extensions',
    url: 'https://github.com/aniyomiorg/aniyomi-extensions',
    description: 'Official extension catalog for the Aniyomi fork. Some extensions are archived, but the repo is a common reference.',
    tags: ['anime', 'manga'],
  },
  {
    name: 'Keiyoushi Extensions',
    url: 'https://keiyoushi.github.io/',
    description: 'A popular community extension repo for Mihon, Tachiyomi, and compatible forks.',
    tags: ['manga', 'anime'],
  },
  {
    name: 'Yuzono / Aniyomi Extensions',
    url: 'https://yuzono.github.io/extensions-aniyomi/',
    description: 'Extension catalog for Aniyomi and Anikku users.',
    tags: ['anime', 'manga'],
  },
  {
    name: 'Tachiyomi Extensions (archived)',
    url: 'https://github.com/tachiyomiorg/extensions',
    description: 'The original Tachiyomi extension catalog. Archived, but still useful for reference and older forks.',
    tags: ['manga', 'archived'],
  },
]

const QUICK_URLS = [
  {
    name: 'Keiyoushi repo index (Mihon/Tachiyomi style)',
    url: 'https://raw.githubusercontent.com/keiyoushi/extensions/repo/index.min.json',
    tags: ['mihon', 'tachiyomi'],
  },
  {
    name: 'MiguelMA3 filtered repo index',
    url: 'https://raw.githubusercontent.com/MiguelMA3/mihon-extensions/mypack/index.min.json',
    tags: ['mihon', 'filtered'],
  },
]

function isUnlocked(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

export default function Extensions() {
  const [status, setStatus] = useState<'locked' | 'unlocked'>(isUnlocked() ? 'unlocked' : 'locked')
  const [input, setInput] = useState('')
  const [showKey, setShowKey] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hintOpen, setHintOpen] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

  const copyUrl = (url: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          setCopied(url)
          window.setTimeout(() => setCopied((c) => (c === url ? null : c)), 2000)
        })
        .catch(() => setCopied(null))
    }
  }

  useEffect(() => {
    setStatus(isUnlocked() ? 'unlocked' : 'locked')
  }, [])

  const tryUnlock = () => {
    setError(null)
    if (input.trim() === EXTENSIONS_KEY) {
      try {
        localStorage.setItem(STORAGE_KEY, 'true')
      } catch {
        // storage may be unavailable; still allow through.
      }
      setStatus('unlocked')
    } else {
      setError('Incorrect key. Please ask the site owner for the current key.')
    }
  }

  const lockAgain = () => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
    setStatus('locked')
    setInput('')
  }

  if (status === 'locked') {
    return (
      <div className="container">
        <Seo
          title="Extensions - Dantotsu Updater"
          description="Key-protected extension setup guide for Dantotsu."
        />
        <div className="key-gate">
          <div className="key-gate-card" role="dialog" aria-modal="true" aria-labelledby="key-title">
            <Lock size={40} className="key-gate-icon" aria-hidden="true" />
            <h1 id="key-title" className="key-gate-title">
              Extension setup
            </h1>
            <p className="key-gate-desc">
              This page is key-protected. Enter the extensions key to continue.
            </p>
            <label htmlFor="extensions-key" className="sr-only">
              Extensions key
            </label>
            <div className="key-gate-input-wrap">
              <input
                id="extensions-key"
                type={showKey ? 'text' : 'password'}
                className="key-gate-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') tryUnlock()
                }}
                placeholder="Enter key"
                autoFocus
              />
              <button
                type="button"
                className="key-gate-eye"
                onClick={() => setShowKey((v) => !v)}
                aria-label={showKey ? 'Hide key' : 'Show key'}
                aria-pressed={showKey}
              >
                {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <button type="button" className="button button-large" onClick={tryUnlock}>
              <KeyRound size={18} />
              Unlock
            </button>
            <button
              type="button"
              className="button button-text"
              onClick={() => setHintOpen((v) => !v)}
              aria-expanded={hintOpen}
            >
              {hintOpen ? 'Hide hint' : 'Need a hint?'}
            </button>
            {hintOpen && (
              <p className="key-gate-hint" role="note">
                It is the original Dantotsu developer&apos;s GitHub username — one word, all lowercase,
                like a layered vegetable that started the uprising.
              </p>
            )}
            {error && (
              <p className="key-gate-error" role="alert">
                <AlertTriangle size={16} aria-hidden="true" />
                {error}
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <Seo
        title="Extension Setup - Dantotsu Updater"
        description="A guide for setting up extensions in Dantotsu."
      />
      <article className="page-article">
        <h1>
          <Unlock size={28} className="page-icon" aria-hidden="true" />
          Setting up Dantotsu extensions
        </h1>
        <p>
          Extensions are how Dantotsu connects to different content sources. This guide covers the
          general setup flow. Exact steps may change depending on the extension repo you use.
        </p>

        <section aria-labelledby="ext-step1">
          <h2 id="ext-step1">
            <CheckCircle size={18} aria-hidden="true" /> Step 1 — Install Dantotsu
          </h2>
          <p>
            Download and install the latest Dantotsu APK from the home page or a fork you trust. Make
            sure your device allows installing from unknown sources.
          </p>
        </section>

        <section aria-labelledby="ext-step2">
          <h2 id="ext-step2">
            <CheckCircle size={18} aria-hidden="true" /> Step 2 — Open the extensions section
          </h2>
          <p>
            Open the Dantotsu app and go to the <strong>Browse</strong> or <strong>Extensions</strong>{' '}
            section. Look for an option to add or manage extension repositories.
          </p>
        </section>

        <section aria-labelledby="ext-step3">
          <h2 id="ext-step3">
            <CheckCircle size={18} aria-hidden="true" /> Step 3 — Add a trusted extension repo
          </h2>
          <p>
            Paste the URL of a trusted extension repository. Do not use repos or extensions from
            strangers or sketchy links. Stick to well-known community sources.
          </p>
        </section>

        <section aria-labelledby="ext-step4">
          <h2 id="ext-step4">
            <CheckCircle size={18} aria-hidden="true" /> Step 4 — Enable the extensions you want
          </h2>
          <p>
            After loading the repo, enable the extensions you want to use. You can usually toggle them on
            or off inside the app.
          </p>
        </section>

        <section aria-labelledby="ext-step5">
          <h2 id="ext-step5">
            <CheckCircle size={18} aria-hidden="true" /> Step 5 — Restart if needed
          </h2>
          <p>
            Some extensions or repos may ask you to restart Dantotsu before they appear. Close the app
            fully and reopen it if content does not show up.
          </p>
        </section>

        <section aria-labelledby="ext-sources">
          <h2 id="ext-sources">Known extension sources</h2>
          <p>
            These are well-known community sources for anime and manga extensions. Always verify a repo
            before adding it to your app.
          </p>
          <div className="resource-list">
            {EXTENSION_SOURCES.map((source) => (
              <a
                key={source.name}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="resource-card"
              >
                <div className="resource-main">
                  <ExternalLink size={20} className="resource-icon" aria-hidden="true" />
                  <div>
                    <h3 className="resource-name">{source.name}</h3>
                    <p className="resource-desc">{source.description}</p>
                    <div className="resource-tags">
                      {source.tags.map((tag) => (
                        <span key={tag} className="resource-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section aria-labelledby="ext-quick">
          <h2 id="ext-quick">Quick-add JSON links</h2>
          <p>
            For apps that accept a raw repo index URL, click the copy button next to the link and paste it
            into your app&apos;s extension repository settings.
          </p>
          <div className="quick-list">
            {QUICK_URLS.map((item) => (
              <div key={item.name} className="quick-row">
                <div className="quick-info">
                  <h3 className="quick-name">{item.name}</h3>
                  <div className="quick-tags">
                    {item.tags.map((tag) => (
                      <span key={tag} className="resource-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="quick-copy">
                  <input
                    type="text"
                    readOnly
                    value={item.url}
                    className="quick-input"
                    aria-label={`${item.name} URL`}
                    onFocus={(e) => e.target.select()}
                  />
                  <button
                    type="button"
                    className="button"
                    onClick={() => copyUrl(item.url)}
                  >
                    {copied === item.url ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <p className="quick-note">
            Note: Aniyomi usually installs extensions as APK files or through its own catalog. The JSON
            links above are for Mihon/Tachiyomi-style repo systems.
          </p>
        </section>

        <section aria-labelledby="ext-safety">
          <h2 id="ext-safety">Stay safe with extensions</h2>
          <ul>
            <li>Only install extensions from sources you trust.</li>
            <li>Do not share your Dantotsu or tracker account details with extensions.</li>
            <li>If an extension asks for unnecessary permissions, remove it.</li>
            <li>Keep Dantotsu updated to the latest version for the best security.</li>
          </ul>
        </section>

        <p>
          <button type="button" className="button button-secondary" onClick={lockAgain}>
            <Lock size={16} />
            Lock this page again
          </button>
        </p>
      </article>
    </div>
  )
}
