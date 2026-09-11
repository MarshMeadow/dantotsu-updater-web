import { NavLink } from 'react-router-dom'
import { Download, Map, Scale, Users } from 'lucide-react'
import Seo from '../components/Seo'

const GROUPS = [
  {
    title: 'Get the app',
    icon: Download,
    links: [
      { to: '/', label: 'Home — latest release & install guide' },
      { to: '/archive', label: 'Release archive — older versions' },
      { to: '/obtainium', label: 'Obtainium guide — automatic updates' },
      { to: '/extensions', label: 'Extension setup (key required)' },
    ],
  },
  {
    title: 'Community',
    icon: Users,
    links: [
      { to: '/community', label: 'Community links — Discord & Telegram' },
      { to: '/contributors', label: 'Contributors & maintainers' },
      { to: '/history', label: 'History — from Saikou to Dantotsu' },
      { to: '/resources', label: 'Useful resources — forks, platforms, guides' },
    ],
  },
  {
    title: 'This site',
    icon: Map,
    links: [
      { to: '/sitemap', label: 'Sitemap — every page' },
      { to: '/settings', label: 'Settings — theme, language, animations' },
    ],
  },
  {
    title: 'Legal',
    icon: Scale,
    links: [
      { to: '/dmca', label: 'DMCA / Legal' },
      { to: '/privacy', label: 'Privacy policy' },
      { to: '/terms', label: 'Terms of use' },
    ],
  },
]

export default function Sitemap() {
  return (
    <div className="container">
      <Seo
        title="Sitemap - Dantotsu Updater"
        description="A complete list of pages on the Dantotsu Updater website."
      />
      <article className="page-article">
        <h1>
          <Map size={28} className="page-icon" aria-hidden="true" />
          Sitemap
        </h1>
        <p>Every page on this site, grouped by what you are looking for.</p>

        {GROUPS.map((group) => (
          <section key={group.title} aria-labelledby={`sitemap-${group.title}`}>
            <h2 id={`sitemap-${group.title}`}>
              <group.icon size={20} aria-hidden="true" /> {group.title}
            </h2>
            <ul className="sitemap-list">
              {group.links.map((link) => (
                <li key={link.to}>
                  <NavLink to={link.to}>{link.label}</NavLink>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <p>
          <NavLink to="/">← Back to home</NavLink>
        </p>
      </article>
    </div>
  )
}
