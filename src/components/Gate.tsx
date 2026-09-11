import { useEffect, useMemo, useRef, useState } from 'react'
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

interface PuzzleBase {
  question: string
  correct: string
  wrong: string[]
}

interface Puzzle {
  question: string
  correct: string
  options: string[]
}

const PUZZLES: PuzzleBase[] = [
  {
    question: 'What app is this website for?',
    correct: 'Dantotsu',
    wrong: ['Google', 'Netflix', 'TikTok'],
  },
  {
    question: 'Which one is a fruit?',
    correct: 'Apple',
    wrong: ['Car', 'Rock', 'House'],
  },
  {
    question: 'Which animal barks?',
    correct: 'Dog',
    wrong: ['Cat', 'Fish', 'Bird'],
  },
  {
    question: 'What do you use to see in the dark?',
    correct: 'Flashlight',
    wrong: ['Spoon', 'Sock', 'Banana'],
  },
  {
    question: 'Which of these is not a color?',
    correct: 'Table',
    wrong: ['Blue', 'Red', 'Green'],
  },
]

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function createPuzzle(): Puzzle {
  const base = PUZZLES[Math.floor(Math.random() * PUZZLES.length)]
  return {
    question: base.question,
    correct: base.correct,
    options: shuffle([base.correct, ...base.wrong]),
  }
}

function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
  ).filter((el) => {
    if (el.getAttribute('tabindex') === '-1') return false
    if (
      'disabled' in el &&
      (el as HTMLButtonElement | HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement).disabled
    ) {
      return false
    }
    const style = window.getComputedStyle(el)
    return style.display !== 'none' && style.visibility !== 'hidden'
  })
}

export default function Gate({ onVerify }: { onVerify: () => void }) {
  const puzzle = useMemo(createPuzzle, [])
  const [error, setError] = useState<string | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    const container = card as HTMLElement
    const first = getFocusable(container)[0]
    first?.focus()

    function handleKey(e: KeyboardEvent) {
      if (e.key !== 'Tab') return
      const items = getFocusable(container)
      if (items.length === 0) return
      if (e.shiftKey) {
        if (document.activeElement === items[0]) {
          e.preventDefault()
          items[items.length - 1].focus()
        }
      } else {
        if (document.activeElement === items[items.length - 1]) {
          e.preventDefault()
          items[0].focus()
        }
      }
    }

    card.addEventListener('keydown', handleKey)
    return () => card.removeEventListener('keydown', handleKey)
  }, [])

  const check = (option: string) => {
    setError(null)
    if (option !== puzzle.correct) {
      setError('Not quite. Try another option.')
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
      <div className="gate-card" ref={cardRef}>
        <Shield size={40} className="gate-icon" aria-hidden="true" />
        <h2 id="gate-title" className="gate-title">
          Verify you are human
        </h2>
        <p className="gate-desc">
          Pick the correct answer to continue. You won’t need to do this again for 7 days.
        </p>
        <div className="gate-question" aria-live="polite">
          {puzzle.question}
        </div>
        <div className="gate-options" role="group" aria-label="Answer choices">
          {puzzle.options.map((option) => (
            <button
              key={option}
              type="button"
              className="gate-option"
              onClick={() => check(option)}
            >
              {option}
              <ArrowRight size={16} className="gate-option-icon" />
            </button>
          ))}
        </div>
        {error && (
          <p className="gate-error" role="alert">
            {error}
          </p>
        )}
      </div>
    </div>
  )
}
