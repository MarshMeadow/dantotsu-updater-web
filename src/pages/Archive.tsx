import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Download, Smartphone, Package, File, Calendar, ExternalLink, AlertTriangle } from 'lucide-react'
import Seo from '../components/Seo'
import type { Release } from '../api/types'
import { fetchAllReleases, formatBytes, formatDate, getPlatform, getReleaseType } from '../api/release'

const platformIcon = (name: string) => {
  const lower = name.toLowerCase()
  if (lower.endsWith('.apk')) return <Smartphone size={20} />
  if (lower.endsWith('.zip') || lower.endsWith('.tar.gz') || lower.endsWith('.tar')) return <Package size={20} />
  return <File size={20} />
}

type Status = { kind: 'loading' } | { kind: 'error'; message: string } | { kind: 'ok'; releases: Release[] }

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

  useEffect(() => {
    let active = true
    fetchAllReleases()
      .then((releases) => {
        if (active) {
          setStatus({ kind: 'ok', releases })
          setPage(1)
        }
      })
      .catch((err) => {
        if (active) {
          setStatus({
            kind: 'error',
            message: err instanceof Error ? err.message : 'Could not load releases.',
          })
        }
      })
    return () => {
      active = false
    }
  }, [])

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
          packages.
        </p>

        {status.kind === 'loading' && (
          <p role="status" className="state">
            Loading archive…
          </p>
        )}

        {status.kind === 'error' && (
          <div className="error-card" role="alert">
            <AlertTriangle size={32} className="error-icon" />
            <h2 className="error-title">Couldn’t load archive</h2>
            <p className="error-message">{status.message}</p>
          </div>
        )}

        {status.kind === 'ok' && status.releases.length === 0 && (
          <p role="status" className="state">
            No releases found in the archive.
          </p>
        )}

        {status.kind === 'ok' && status.releases.length > 0 && (
          <>
            <Pagination
              page={page}
              pageCount={pageCount}
              total={status.releases.length}
              onPage={setPage}
            />
            <div className="archive-list" role="list" style={{ marginTop: '1rem' }}>
              {pageReleases.map((release) => {
                const { type, className } = getReleaseType(release.tag_name, release.body)
                return (
                  <article key={release.tag_name} className="archive-item" role="listitem">
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
