import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const links = [
  { to: '/', label: 'Home' },
  { to: '/community', label: 'Community' },
  { to: '/resources', label: 'Resources' },
  { to: '/archive', label: 'Archive' },
  { to: '/dmca', label: 'DMCA / Legal' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

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
            aria-label={open ? 'Close menu' : 'Open menu'}
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
                {link.label}
              </NavLink>
            ))}
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
