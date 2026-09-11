import { useEffect, useState } from 'react'
import { Lock, Unlock, KeyRound, CheckCircle, AlertTriangle } from 'lucide-react'
import Seo from '../components/Seo'
import { EXTENSIONS_KEY } from '../constants/auth'

const STORAGE_KEY = 'dantotsu-ext-unlocked'

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
  const [error, setError] = useState<string | null>(null)
  const [hintOpen, setHintOpen] = useState(false)

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
            <input
              id="extensions-key"
              type="password"
              className="key-gate-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') tryUnlock()
              }}
              placeholder="Enter key"
              autoFocus
            />
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
