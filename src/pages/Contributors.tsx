import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AlertTriangle, ExternalLink, GitPullRequest, RefreshCw } from 'lucide-react'
import Seo from '../components/Seo'
import { fetchContributors } from '../api/github'
import type { Contributor } from '../api/types'
import { CONTRIBUTOR_REPOS } from '../constants/links'
import type { ContributorRepo } from '../constants/links'

const MAINTAINERS = [
  {
    name: 'rebelonion',
    role: 'Creator & lead developer of Dantotsu',
    url: 'https://github.com/rebelonion',
    avatar: 'https://github.com/rebelonion.png?size=160',
  },
  {
    name: 'itsmechinmoy',
    role: 'Maintainer of the updater & community releases',
    url: 'https://github.com/itsmechinmoy',
    avatar: 'https://github.com/itsmechinmoy.png?size=160',
  },
  {
    name: 'MarshMeadow',
    role: 'Creator & maintainer of this website',
    url: 'https://github.com/MarshMeadow',
    avatar: 'https://github.com/MarshMeadow.png?size=160',
  },
]

const MAX_SHOWN = 24

type RepoState =
  | { kind: 'loading' }
  | { kind: 'error' }
  | { kind: 'ok'; contributors: Contributor[] }

export default function Contributors() {
  const [states, setStates] = useState<Record<string, RepoState>>({})

  const loadRepo = (repo: ContributorRepo) => {
    setStates((s) => ({ ...s, [repo.url]: { kind: 'loading' } }))
    fetchContributors(repo.owner, repo.repo)
      .then((contributors) => {
        setStates((s) => ({ ...s, [repo.url]: { kind: 'ok', contributors } }))
      })
      .catch(() => {
        setStates((s) => ({ ...s, [repo.url]: { kind: 'error' } }))
      })
  }

  useEffect(() => {
    CONTRIBUTOR_REPOS.forEach(loadRepo)
  }, [])

  return (
    <div className="container">
      <Seo
        title="Contributors - Dantotsu Updater"
        description="Meet the maintainers and contributors behind Dantotsu, the community updater, and this website."
      />
      <article className="page-article">
        <h1>Contributors</h1>
        <p>
          Dantotsu, the updater, and this website are built by volunteers. Thank you to everyone who
          reports issues, opens pull requests, and helps keep the projects alive.
        </p>

        <section aria-labelledby="maintainers-title">
          <h2 id="maintainers-title">Project maintainers</h2>
          <div className="maintainer-grid">
            {MAINTAINERS.map((person) => (
              <a
                key={person.name}
                href={person.url}
                target="_blank"
                rel="noopener noreferrer"
                className="maintainer-card"
              >
                <img
                  src={person.avatar}
                  alt=""
                  className="maintainer-avatar"
                  loading="lazy"
                  width={64}
                  height={64}
                />
                <span className="maintainer-info">
                  <span className="maintainer-name">
                    {person.name}
                    <ExternalLink size={13} aria-hidden="true" />
                  </span>
                  <span className="maintainer-role">{person.role}</span>
                </span>
              </a>
            ))}
          </div>
        </section>

        {CONTRIBUTOR_REPOS.map((repo) => {
          const state = states[repo.url] ?? { kind: 'loading' as const }
          return (
            <section key={repo.url} aria-labelledby={`contrib-${repo.repo}`}>
              <h2 id={`contrib-${repo.repo}`}>{repo.label}</h2>
              <p>
                {repo.description}{' '}
                <a href={repo.url} target="_blank" rel="noopener noreferrer">
                  View repository
                </a>
              </p>

              {state.kind === 'loading' && (
                <div className="archive-loading" role="status" aria-live="polite">
                  <div className="spinner" aria-hidden="true" />
                  <p className="archive-loading-text">Loading contributors…</p>
                </div>
              )}

              {state.kind === 'error' && (
                <div className="contrib-error" role="alert">
                  <AlertTriangle size={18} aria-hidden="true" />
                  <span>Couldn’t load contributors for this repository.</span>
                  <button
                    type="button"
                    className="button button-secondary contrib-retry"
                    onClick={() => loadRepo(repo)}
                  >
                    <RefreshCw size={14} aria-hidden="true" />
                    Retry
                  </button>
                </div>
              )}

              {state.kind === 'ok' && state.contributors.length === 0 && (
                <p className="state">No contributors listed for this repository yet.</p>
              )}

              {state.kind === 'ok' && state.contributors.length > 0 && (
                <>
                  <div className="contrib-grid" role="list">
                    {state.contributors.slice(0, MAX_SHOWN).map((person, index) => (
                      <a
                        key={person.login}
                        href={person.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contrib-card"
                        role="listitem"
                        style={{ animationDelay: `${index * 40}ms` }}
                      >
                        <img
                          src={person.avatar}
                          alt=""
                          className="contrib-avatar"
                          loading="lazy"
                          width={56}
                          height={56}
                        />
                        <span className="contrib-name">{person.login}</span>
                        <span className="contrib-count">
                          {person.contributions} contribution{person.contributions === 1 ? '' : 's'}
                        </span>
                      </a>
                    ))}
                  </div>
                  {state.contributors.length > MAX_SHOWN && (
                    <p className="contrib-more">
                      <a href={`${repo.url}/graphs/contributors`} target="_blank" rel="noopener noreferrer">
                        + {state.contributors.length - MAX_SHOWN} more on GitHub →
                      </a>
                    </p>
                  )}
                </>
              )}
            </section>
          )
        })}

        <section aria-labelledby="contribute-title">
          <h2 id="contribute-title">Want to contribute?</h2>
          <p>
            Contributions of all kinds are welcome — code, bug reports, translations, design, and
            documentation. Pick a repository above, open an issue or pull request, and join the
            community on Discord or Telegram.
          </p>
          <div className="hero-fallbacks">
            {CONTRIBUTOR_REPOS.map((repo) => (
              <a
                key={repo.url}
                className="button button-secondary"
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitPullRequest size={16} aria-hidden="true" />
                {repo.label}
              </a>
            ))}
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
