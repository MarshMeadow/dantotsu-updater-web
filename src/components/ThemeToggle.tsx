import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

type Theme = 'dark' | 'light'

const STORAGE_KEY = 'dantotsu-theme'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    // ignore
  }
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme())

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // ignore
    }
  }, [theme])

  const next = theme === 'dark' ? 'light' : 'dark'
  const label = `Switch to ${next} theme`

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setTheme(next)}
      aria-label={label}
      title={label}
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      <span className="sr-only">{label}</span>
    </button>
  )
}
