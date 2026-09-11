import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Download, Smartphone, Package, File, Calendar, ExternalLink, AlertTriangle, RefreshCw, Server } from 'lucide-react'
import Seo from '../components/Seo'
import type { Release } from '../api/types'
import {
  fetchAllReleases,
  formatBytes,
  formatDate,
  getPlatform,
  getReleaseType,
  ReleaseSourcesError,
} from '../api/release'
import type { SourceFailure } from '../api/release'

const platformIcon = (name: string) => {
  const lower = name.toLowerCase()
  if (lower.endsWith('.apk')) return <Smartphone size={20} />
  if (lower.endsWith('.zip') || lower.endsWith('.tar.gz') || lower.endsWith('.tar')) return <Package size={20} />
  return <File size={20} />
}

type Status =
  | { kind: 'loading'; attempt?: string }
  | { kind: 'error'; failures: SourceFailure[] }
  | { kind: 'ok'; releases: Release[]; sourceName: string; usedFallback: boolean }

const PER_PAGE = 5

function Pagination({
  page,
  pageCount,
  total,
  onPage,
}: {
  page: number
  pageCount: number
  total: number
  onPage: (p: number) => void
}) {
  return (
    <nav className="archive-pagination" aria-label="Archive pages">
      <button
        type="button"
        className="button"
        onClick={() => onPage(page - 1)}
        disabled={page <= 1}
      >
        Previous
      </button>
      <span className="archive-page-info">
        Page {page} of {pageCount} ({total} release{total === 1 ? '' : 's'})
      </span>
      <button
        type="button"
        className="button"
        onClick={() => onPage(page + 1)}
        disabled={page >= pageCount}
      >
        Next
      </button>
    </nav>
  )
}

export default function Archive() {
  const [status, setStatus] = useState<Status>({ kind: 'loading' })
  const [page, setPage] = useState(1)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const result = await fetchAllReleases((source) => {
          if (active) setStatus({ kind: 'loading', attempt: source.name })
        })
        if (active) {
          setStatus({
            kind: 'ok',
            releases: result.releases,
            sourceName: result.source.name,
            usedFallback: result.failures.length > 0,
          })
          setPage(1)
        }
      } catch (err) {
        if (active) {
          const failures =
            err instanceof ReleaseSourcesError
              ? err.failures
              : [
                  {
                    source: 'Release sources',
                    error: err instanceof Error ? err.message : 'Could not load releases.',
                  },
                ]
          setStatus({ kind: 'error', failures })
        }
      }
    }
    load()
    return () => {
      active = false
    }
  }, [reloadKey])

  const pageReleases =
    status.kind === 'ok'
      ? status.releases.slice((page - 1) * PER_PAGE, page * PER_PAGE)
      : []

  const pageCount =
    status.kind === 'ok' ? Math.ceil(status.releases.length / PER_PAGE) : 0

  return (
    <div className="container">
      <Seo
        title="Archive - Dantotsu Updater"
        description="Browse older versions and Android releases of the Dantotsu updater."
      />
      <article className="page-article">
        <h1>Release Archive</h1>
        <p>
          Browse older releases from the community updater repository. Click any release to view its
          files on GitHub. Dantotsu is an Android app — each release provides Android <code>.apk</code>{' '}
          packages. Releases are fetched from several sources — if one fails, the next is tried
          automatically.
        </p>

        {status.kind === 'loading' && (
          <div className="archive-loading" role="status" aria-live="polite">
            <div className="spinner" aria-hidden="true" />
            <p key={status.attempt ?? 'start'} className="archive-loading-text">
              {status.attempt ? `Trying ${status.attempt}…` : 'Loading archive…'}
            </p>
          </div>
        )}

        {status.kind === 'error' && (
          <div className="error-card archive-error" role="alert">
            <AlertTriangle size={32} className="error-icon" />
            <h2 className="error-title">Couldn’t load archive</h2>
            <p className="error-message">
              All release sources failed. Check your connection or try again.
            </p>
            <ul className="error-sources">
              {status.failures.map((failure) => (
                <li key={failure.source}>
                  <span className="error-source-name">{failure.source}</span>
                  <span className="error-source-detail">{failure.error}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="button"
              onClick={() => setReloadKey((key) => key + 1)}
            >
              <RefreshCw size={16} aria-hidden="true" />
              Try again
            </button>
          </div>
        )}

        {status.kind === 'ok' && status.releases.length === 0 && (
          <p role="status" className="state">
            No releases found in the archive.
          </p>
        )}

        {status.kind === 'ok' && status.releases.length > 0 && (
          <>
            <p className={`archive-source${status.usedFallback ? ' is-fallback' : ''}`}>
              <Server size={14} aria-hidden="true" />
              Source: {status.sourceName}
              {status.usedFallback && ' — primary source unavailable, using a fallback'}
            </p>
            <Pagination
              page={page}
              pageCount={pageCount}
              total={status.releases.length}
              onPage={setPage}
            />
            <div className="archive-list" role="list" style={{ marginTop: '1rem' }}>
              {pageReleases.map((release, index) => {
                const { type, className } = getReleaseType(release.tag_name, release.body)
                return (
                  <article
                    key={release.tag_name}
                    className="archive-item"
                    role="listitem"
                    style={{ animationDelay: `${index * 90}ms` }}
                  >
                    <div className="archive-header">
                      <div className="archive-meta">
                        <h2 className="archive-title">
                          <a
                            href={release.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="archive-link"
                          >
                            {release.name}
                          </a>
                        </h2>
                        <span className={`badge ${className}`}>{type}</span>
                        <time className="archive-date" dateTime={release.published_at}>
                          <Calendar size={14} aria-hidden="true" />
                          {formatDate(release.published_at)}
                        </time>
                      </div>
                      <a
                        href={release.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button button-secondary"
                      >
                        <ExternalLink size={16} />
                        View on GitHub
                      </a>
                    </div>

                    {release.assets.length === 0 ? (
                      <p className="state">No files attached to this release.</p>
                    ) : (
                      <div className="cards archive-cards" role="list">
                        {release.assets.map((asset) => (
                          <article className="card" key={asset.name} role="listitem">
                            <div className="card-icon">{platformIcon(asset.name)}</div>
                            <h3 className="card-title">{getPlatform(asset.name)}</h3>
                            <p className="card-sub">{asset.name}</p>
                            <div className="card-row">
                              <span>Type</span>
                              <span>{asset.content_type}</span>
                            </div>
                            <div className="card-row">
                              <span>Size</span>
                              <span>{formatBytes(asset.size)}</span>
                            </div>
                            <a
                              className="card-button"
                              href={asset.browser_download_url}
                              aria-label={`Download ${asset.name}`}
                            >
                              <Download size={16} />
                              Download
                            </a>
                          </article>
                        ))}
                      </div>
                    )}

                    {release.body && (
                      <details className="archive-notes">
                        <summary>Release notes</summary>
                        <pre className="release-body">{release.body}</pre>
                      </details>
                    )}
                  </article>
                )
              })}
            </div>
            <Pagination
              page={page}
              pageCount={pageCount}
              total={status.releases.length}
              onPage={setPage}
            />
          </>
        )}

        <p>
          <NavLink to="/">← Back to home</NavLink>
        </p>
      </article>
    </div>
  )
}
