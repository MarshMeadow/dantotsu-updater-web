import { useMemo, useState } from 'react'
import { Shield, ArrowRight } from 'lucide-react'

const STORAGE_KEY = 'dantotsu-verified'
const VALIDITY_MS = 7 * 24 * 60 * 60 * 1000

export function isVerified(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return false
    const data = JSON.parse(raw) as { until?: number }
    return typeof data.until === 'number' && data.until > Date.now()
  } catch {
    return false
  }
}

interface Puzzle {
  text: string
  answer: number
}

function createPuzzle(): Puzzle {
  const a = Math.floor(Math.random() * 10) + 2
  const b = Math.floor(Math.random() * 10) + 2
  const op = Math.random() > 0.5 ? '+' : '-'
  const answer = op === '+' ? a + b : a - b
  return { text: `${a} ${op} ${b}`, answer }
}

export default function Gate({ onVerify }: { onVerify: () => void }) {
  const puzzle = useMemo(createPuzzle, [])
  const [value, setValue] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault()
    setError(null)
    const n = Number(value.trim())
    if (Number.isNaN(n)) {
      setError('Please enter a number.')
      return
    }
    if (n !== puzzle.answer) {
      setError('That is not correct. Try again.')
      return
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ until: Date.now() + VALIDITY_MS }))
    } catch {
      // localStorage may be disabled in private browsing — still allow through.
    }
    onVerify()
  }

  return (
    <div className="gate" role="dialog" aria-modal="true" aria-labelledby="gate-title">
      <div className="gate-card">
        <Shield size={40} className="gate-icon" aria-hidden="true" />
        <h2 id="gate-title" className="gate-title">
          Verify you are human
        </h2>
        <p className="gate-desc">
          Solve the quick puzzle to continue. You won’t need to do this again for 7 days.
        </p>
        <form onSubmit={handleSubmit} className="gate-form" noValidate>
          <div className="gate-puzzle" aria-live="polite">
            What is <strong>{puzzle.text}</strong>?
          </div>
          <label htmlFor="puzzle-answer" className="sr-only">
            Puzzle answer
          </label>
          <input
            id="puzzle-answer"
            type="text"
            inputMode="numeric"
            pattern="-?[0-9]*"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="gate-input"
            placeholder="Answer"
            autoFocus
          />
          {error && (
            <p className="gate-error" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="button button-large"
            disabled={!value.trim()}
          >
            Continue
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  )
}
