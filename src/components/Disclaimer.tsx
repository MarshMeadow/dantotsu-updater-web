import { useRef, useEffect } from 'react'
import { Shield, Check } from 'lucide-react'
import { DISCLAIMER, RISK_NOTICE } from '../constants/legal'

const STORAGE_KEY = 'dantotsu-disclaimer'
const VALIDITY_MS = 30 * 24 * 60 * 60 * 1000

export function isDisclaimerAccepted(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return false
    const data = JSON.parse(raw) as { until?: number }
    return typeof data.until === 'number' && data.until > Date.now()
  } catch {
    return false
  }
}

export default function Disclaimer({ onAccept }: { onAccept: () => void }) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    buttonRef.current?.focus()
  }, [])

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ until: Date.now() + VALIDITY_MS }))
    } catch {
      // localStorage may be disabled — still allow through.
    }
    onAccept()
  }

  return (
    <div className="gate" role="dialog" aria-modal="true" aria-labelledby="disclaimer-title">
      <div className="gate-card" style={{ maxWidth: '34rem' }}>
        <Shield size={40} className="gate-icon" aria-hidden="true" />
        <h2 id="disclaimer-title" className="gate-title">
          Disclaimer & DMCA
        </h2>
        <p className="gate-desc">
          Please read and acknowledge the following before entering the site.
        </p>
        <div className="disclaimer-scroll" role="region" aria-label="Disclaimer text" tabIndex={0}>
          <p className="disclaimer-text">{DISCLAIMER}</p>
          <p className="disclaimer-text">{RISK_NOTICE}</p>
          <p className="disclaimer-text">
            This website does not host, store, upload, modify, repackage, or distribute anime, manga,
            streams, or other copyrighted media. It only provides informational links to publicly
            available software sources. All trademarks and copyrights belong to their respective owners.
          </p>
        </div>
        <div className="disclaimer-actions">
          <button ref={buttonRef} type="button" className="button button-large" onClick={accept}>
            <Check size={18} />
            I understand
          </button>
        </div>
      </div>
    </div>
  )
}
