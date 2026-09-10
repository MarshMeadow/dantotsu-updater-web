import { NavLink } from 'react-router-dom'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout">
      <header className="site-header">
        <div className="container header-inner">
          <NavLink to="/" className="logo" aria-label="Dantotsu Updater home">
            Dantotsu Updater
          </NavLink>
          <nav className="site-nav" aria-label="Main navigation">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/dmca" className="nav-link">
              DMCA / Legal
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="main-content" id="main">
        {children}
      </main>
    </div>
  )
}
