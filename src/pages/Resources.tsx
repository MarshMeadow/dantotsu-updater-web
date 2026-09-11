import { NavLink } from 'react-router-dom'
import { ExternalLink, GitBranch, Shield, BookOpen } from 'lucide-react'
import Seo from '../components/Seo'
import {
  DANTOTSU_GITHUB,
  DANTOTSU_SOURCE,
  DANTOTSU_WEBSITE,
  UPDATER_REPO,
  WEBSITE_REPO,
  MAINTAINED_FORKS,
} from '../constants/links'

const OFFICIAL = [
  {
    name: 'Official Dantotsu Website',
    url: DANTOTSU_WEBSITE,
    description: 'The official Dantotsu homepage with downloads and documentation.',
  },
  {
    name: 'Dantotsu GitHub',
    url: DANTOTSU_GITHUB,
    description: 'The official Dantotsu GitHub repository for stable and pre-release builds.',
  },
  {
    name: 'Dantotsu Source (Forgejo)',
    url: DANTOTSU_SOURCE,
    description: 'The upstream development branch on the project’s own Git instance.',
  },
  {
    name: 'Updater Repository',
    url: UPDATER_REPO,
    description: 'The community updater repository this website fetches release information from.',
  },
  {
    name: 'Website Repository',
    url: WEBSITE_REPO,
    description: 'The source code for this website. Open an issue or pull request here.',
  },
]

export default function Resources() {
  return (
    <div className="container">
      <Seo
        title="Resources - Dantotsu Updater"
        description="Useful resources for Dantotsu and its forks, including official links, community forks, guides, and safety information."
      />
      <article className="page-article">
        <h1>Useful Resources</h1>
        <p>
          A curated list of official sources, community forks, install help, and safety information for
          Dantotsu and related projects.
        </p>

        <section aria-labelledby="resources-official-title">
          <h2 id="resources-official-title">Official & project links</h2>
          <div className="resource-list">
            {OFFICIAL.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="resource-card"
              >
                <div className="resource-main">
                  <ExternalLink size={20} className="resource-icon" aria-hidden="true" />
                  <div>
                    <h3 className="resource-name">{item.name}</h3>
                    <p className="resource-desc">{item.description}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section aria-labelledby="resources-forks-title">
          <h2 id="resources-forks-title">Maintained community forks</h2>
          <p>
            These are independently maintained projects based on Dantotsu. Always read their README and
            release notes before installing.
          </p>
          <div className="resource-list">
            {MAINTAINED_FORKS.map((fork) => (
              <a
                key={fork.name}
                href={fork.url}
                target="_blank"
                rel="noopener noreferrer"
                className="resource-card"
              >
                <div className="resource-main">
                  <GitBranch size={20} className="resource-icon" aria-hidden="true" />
                  <div>
                    <h3 className="resource-name">{fork.name}</h3>
                    <p className="resource-desc">{fork.description}</p>
                    <div className="resource-tags">
                      {fork.tags.map((tag) => (
                        <span key={tag} className="resource-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section aria-labelledby="resources-guides-title">
          <h2 id="resources-guides-title">Guides & help</h2>
          <div className="resource-list">
            <NavLink to="/" className="resource-card">
              <div className="resource-main">
                <BookOpen size={20} className="resource-icon" aria-hidden="true" />
                <div>
                  <h3 className="resource-name">How to install</h3>
                  <p className="resource-desc">Step-by-step install guide on the home page.</p>
                </div>
              </div>
            </NavLink>
            <NavLink to="/" className="resource-card">
              <div className="resource-main">
                <Shield size={20} className="resource-icon" aria-hidden="true" />
                <div>
                  <h3 className="resource-name">Staying safe online</h3>
                  <p className="resource-desc">Tips for safe downloads, scanning APKs, and general online safety.</p>
                </div>
              </div>
            </NavLink>
          </div>
        </section>

        <p>
          <NavLink to="/community">Community links →</NavLink> •{' '}
          <NavLink to="/">← Back to home</NavLink>
        </p>
      </article>
    </div>
  )
}
