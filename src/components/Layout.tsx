import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, Settings, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import Search from './Search'
import LanguagePicker from './LanguagePicker'
import { useI18n } from '../i18n'

const links = [
  { to: '/', key: 'nav.home' },
  { to: '/archive', key: 'nav.archive' },
  { to: '/obtainium', key: 'nav.obtainium' },
  { to: '/resources', key: 'nav.resources' },
  { to: '/community', key: 'nav.community' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const { t } = useI18n()

  return (
    <div className="layout">
      <header className="site-header">
        <div className="container header-inner">
          <NavLink to="/" className="logo" aria-label="Dantotsu Updater home">
            Dantotsu Updater
          </NavLink>
          <button
            type="button"
            className="menu-toggle"
            aria-label={open ? t('a11y.closeMenu') : t('a11y.openMenu')}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
          <nav
            id="site-menu"
            className={`site-nav ${open ? 'is-open' : ''}`}
            aria-label="Main navigation"
          >
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                onClick={() => setOpen(false)}
              >
                {t(link.key)}
              </NavLink>
            ))}
            <NavLink
              to="/settings"
              className={({ isActive }) => `icon-nav-link${isActive ? ' active' : ''}`}
              aria-label={t('nav.settings')}
              title={t('nav.settings')}
              onClick={() => setOpen(false)}
            >
              <Settings size={18} aria-hidden="true" />
            </NavLink>
            <Search />
            <LanguagePicker />
            <ThemeToggle />
          </nav>
        </div>
      </header>
      <main className="main-content" id="main">
        {children}
      </main>
    </div>
  )
}
