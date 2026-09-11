import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import './index.css'
import { LanguageProvider } from './i18n'
import { initProtections } from './utils/protections'

initProtections()

try {
  if (localStorage.getItem('dantotsu-animations') === 'off') {
    document.documentElement.dataset.animations = 'off'
  }
} catch {
  // ignore
}

try {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <HelmetProvider>
        <LanguageProvider>
          <HashRouter>
            <App />
          </HashRouter>
        </LanguageProvider>
      </HelmetProvider>
    </StrictMode>,
  )
} catch (err) {
  const show = (window as unknown as { __showBootError?: (msg: string) => void }).__showBootError
  if (show) show('Failed to start app: ' + (err instanceof Error ? err.message : String(err)))
  else console.error(err)
}
