import { useEffect, useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  Download,
  MessageCircle,
  ExternalLink,
  Smartphone,
  Shield,
  Code,
  Users,
  Zap,
  AlertTriangle,
  Calendar,
  Tag,
  File,
  Package,
  Info,
  Globe,
  GitFork,
  HelpCircle,
  Monitor,
  CheckCircle,
  Heart,
  Puzzle,
  RefreshCw,
  Star,
} from 'lucide-react'
import { fetchLatestRelease, formatBytes, formatDate, getPlatform, getReleaseType } from '../api/release'
import { formatCount, timeAgo } from '../api/github'
import { useDiscordStats, useRepoMeta } from '../hooks/useStats'
import type { Release } from '../api/types'
import Seo from '../components/Seo'
import { DISCLAIMER, RISK_NOTICE } from '../constants/legal'
import {
  DANTOTSU_DISCORD,
  DANTOTSU_GITHUB,
  DANTOTSU_SOURCE,
  DANTOTSU_TELEGRAM,
  DANTOTSU_WEBSITE,
  DARTOTSU_REPO,
  MAINTAINED_FORKS,
  OBTAINIUM_ADD,
  OBTAINIUM_GITHUB,
  TELEGRAM_POST,
  UPDATER_REPO,
  UPDATER_TELEGRAM,
  REBELONION_SPONSOR,
} from '../constants/links'

type Status = { kind: 'loading' } | { kind: 'error'; message: string } | { kind: 'ok'; release: Release }

const FORK_URLS = MAINTAINED_FORKS.map((fork) => fork.url)
const DISCORD_INVITE_CODE = DANTOTSU_DISCORD.split('/').pop() ?? ''

const platformIcon = (name: string) => {
  const lower = name.toLowerCase()
  if (lower.endsWith('.apk')) return <Smartphone size={20} />
  if (lower.endsWith('.zip') || lower.endsWith('.tar.gz') || lower.endsWith('.tar')) return <Package size={20} />
  return <File size={20} />
}

export default function Home() {
  const [status, setStatus] = useState<Status>({ kind: 'loading' })

  useEffect(() => {
    let active = true
    fetchLatestRelease()
      .then((release) => {
        if (active) setStatus({ kind: 'ok', release })
      })
      .catch((err) => {
        if (active) setStatus({ kind: 'error', message: err instanceof Error ? err.message : 'Unknown error' })
      })
    return () => {
      active = false
    }
  }, [])

  const primaryDownload = useMemo(() => {
    if (status.kind !== 'ok') return null
    const lowerAssets = status.release.assets.map((a) => ({
      ...a,
      lower: a.name.toLowerCase(),
    }))
    const universal = lowerAssets.find((a) => a.lower.endsWith('.apk') && a.lower.includes('universal'))
    const firstApk = lowerAssets.find((a) => a.lower.endsWith('.apk'))
    return (universal ?? firstApk) ?? null
  }, [status])

  const forkMeta = useRepoMeta(FORK_URLS)
  const discord = useDiscordStats(DISCORD_INVITE_CODE)

  return (
    <>
      <Seo
        title="Download the Latest Version"
        description="Download the latest version of Dantotsu, an open-source anime streaming app for Android. View release notes, forks, and community links."
      />
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-glow hero-glow-2" aria-hidden="true" />
        <div className="container hero-content">
          <h1 id="hero-title" className="hero-title gradient-text">
            Dantotsu Updater
          </h1>
          <p className="hero-subtitle">
            Download the latest version of Dantotsu, an open-source anime
            streaming application for Android. This is an independent community
            mirror for the updater repository.
          </p>

          <div className="hero-actions">
            {status.kind === 'loading' && (
              <div className="skeleton-block" aria-busy="true" aria-live="polite">
                <div className="skeleton skeleton-title" />
                <div className="skeleton skeleton-button" />
              </div>
            )}

            {status.kind === 'error' && (
              <div className="error-card" role="alert">
                <AlertTriangle size={32} className="error-icon" />
                <h2 className="error-title">Couldn’t load release data</h2>
                <p className="error-message">{status.message}</p>
                <div className="hero-fallbacks">
                  <a className="button" href={UPDATER_TELEGRAM} target="_blank" rel="noopener noreferrer">
                    <MessageCircle size={18} />
                    Telegram updates
                  </a>
                  <a className="button button-secondary" href={UPDATER_REPO} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={18} />
                    Updater repository
                  </a>
                  <a className="button button-secondary" href={TELEGRAM_POST} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={18} />
                    Release post
                  </a>
                </div>
              </div>
            )}

            {status.kind === 'ok' && (
              <div className="release-hero">
                <div className="release-meta">
                  <span className="badge badge-unofficial">
                    <Users size={12} aria-hidden="true" />
                    Community
                  </span>
                  <span className="badge badge-unofficial">
                    <Smartphone size={12} aria-hidden="true" />
                    Android
                  </span>
                  <span className={`badge ${getReleaseType(status.release.tag_name, status.release.body).className}`}>
                    {getReleaseType(status.release.tag_name, status.release.body).type}
                  </span>
                  <span className="badge badge-unofficial" title={status.release.tag_name}>
                    <Tag size={12} aria-hidden="true" />
                    {status.release.tag_name}
                  </span>
                  <time className="badge" dateTime={status.release.published_at}>
                    <Calendar size={12} aria-hidden="true" />
                    {formatDate(status.release.published_at)}
                  </time>
                </div>

                {primaryDownload ? (
                  <a
                    className="button button-large button-glow"
                    href={primaryDownload.browser_download_url}
                    aria-label={`Download ${status.release.tag_name}`}
                  >
                    <Download size={22} />
                    Download Latest Version
                  </a>
                ) : (
                  <a
                    className="button button-large button-glow"
                    href={status.release.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={22} />
                    View Release on GitHub
                  </a>
                )}

                <a
                  className="button button-secondary button-large"
                  href={status.release.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={20} />
                  View release notes
                </a>
              </div>
            )}
          </div>

          <aside className="disclaimer">
            <strong>
              <Shield size={16} aria-hidden="true" /> Disclaimer
            </strong>
            {DISCLAIMER} {RISK_NOTICE}
          </aside>
        </div>
      </section>

      <div className="container">
        <section className="features" aria-labelledby="features-title">
          <h2 id="features-title" className="sr-only">
            Features
          </h2>
          <article className="feature-card">
            <div className="feature-icon">
              <Code size={28} />
            </div>
            <h3>Open source</h3>
            <p>Dantotsu is open-source software. Source code is available for review on its repository.</p>
          </article>
          <article className="feature-card">
            <div className="feature-icon">
              <Users size={28} />
            </div>
            <h3>Community driven</h3>
            <p>Join the official Discord and Telegram communities for updates, help, and discussion.</p>
          </article>
          <article className="feature-card">
            <div className="feature-icon">
              <Zap size={28} />
            </div>
            <h3>Always up to date</h3>
            <p>The latest release is fetched directly from the updater repository and listed here.</p>
          </article>
        </section>

        <section className="section section-raised" aria-labelledby="about-title">
          <h2 id="about-title" className="section-heading">
            <Info size={22} aria-hidden="true" />
            What is Dantotsu?
          </h2>
          <p className="about-text">
            Dantotsu is an open-source anime and manga tracking client for Android. It is built around
            AniList (and can integrate with other trackers) and is designed with a clean, modern UI and
            smooth animations. It helps you discover, organize, and keep up with your favorite series.
          </p>
          <ul className="about-list">
            <li>
              <Zap size={16} aria-hidden="true" />
              Track anime and manga lists, progress, and ratings
            </li>
            <li>
              <Zap size={16} aria-hidden="true" />
              Browse trending, popular, and currently airing titles
            </li>
            <li>
              <Zap size={16} aria-hidden="true" />
              Countdowns to upcoming episodes and release notifications
            </li>
            <li>
              <Zap size={16} aria-hidden="true" />
              Highly customizable interface with extension support
            </li>
          </ul>
          <p className="about-note">
            Dantotsu itself is a tracking and management tool. It does not host, stream, or distribute
            copyrighted media. Users are responsible for any third-party services or extensions they choose
            to use.
          </p>
          <div className="hero-fallbacks">
            <a className="button" href={DANTOTSU_WEBSITE} target="_blank" rel="noopener noreferrer">
              <Globe size={18} />
              Official website
            </a>
            <a className="button button-secondary" href={DANTOTSU_GITHUB} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={18} />
              Official GitHub
            </a>
          </div>
        </section>

        {status.kind === 'ok' && (
          <>
            <section className="section section-raised" aria-labelledby="downloads-title">
              <h2 id="downloads-title" className="section-heading">
                <Download size={22} aria-hidden="true" />
                Available files
              </h2>
              {status.release.assets.length === 0 ? (
                <p role="status" className="state">
                  No files are attached to this release.
                </p>
              ) : (
                <div className="cards" role="list">
                  {status.release.assets.map((asset) => (
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
            </section>

            <section className="section" aria-labelledby="notes-title">
              <h2 id="notes-title" className="section-heading">
                <File size={22} aria-hidden="true" />
                Release notes
              </h2>
              <pre className="release-body" aria-label="Release notes">
                {status.release.body || 'No release notes provided.'}
              </pre>
            </section>
          </>
        )}

        <section className="section section-raised" aria-labelledby="community-title">
          <h2 id="community-title" className="section-heading">
            <Users size={22} aria-hidden="true" />
            Community & official links
          </h2>
          <div className="social-grid" role="list">
            <a
              href={DANTOTSU_DISCORD}
              target="_blank"
              rel="noopener noreferrer"
              className="social-card"
              role="listitem"
            >
              <MessageCircle size={22} aria-hidden="true" />
              <span className="social-card-text">
                <span>Official Discord</span>
                <span className="social-sub">
                  {discord
                    ? `${formatCount(discord.members)} members · ${formatCount(discord.online)} online`
                    : 'Almost 20,000 members'}
                </span>
              </span>
              <ExternalLink size={14} aria-hidden="true" />
            </a>
            <a
              href={DANTOTSU_TELEGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="social-card"
              role="listitem"
            >
              <MessageCircle size={22} aria-hidden="true" />
              <span>Official Telegram</span>
              <ExternalLink size={14} aria-hidden="true" />
            </a>
            <a
              href={UPDATER_TELEGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="social-card"
              role="listitem"
            >
              <MessageCircle size={22} aria-hidden="true" />
              <span>Updater Telegram</span>
              <ExternalLink size={14} aria-hidden="true" />
            </a>
            <a
              href={UPDATER_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="social-card"
              role="listitem"
            >
              <ExternalLink size={22} aria-hidden="true" />
              <span>Updater repository</span>
              <ExternalLink size={14} aria-hidden="true" />
            </a>
            <a
              href={DANTOTSU_SOURCE}
              target="_blank"
              rel="noopener noreferrer"
              className="social-card"
              role="listitem"
            >
              <Code size={22} aria-hidden="true" />
              <span>Dantotsu source</span>
              <ExternalLink size={14} aria-hidden="true" />
            </a>
            <NavLink to="/dmca" className="social-card" role="listitem">
              <Shield size={22} aria-hidden="true" />
              <span>DMCA / Legal</span>
            </NavLink>
            <NavLink to="/extensions" className="social-card" role="listitem">
              <Puzzle size={22} aria-hidden="true" />
              <span>Extension setup</span>
            </NavLink>
            <a
              href={REBELONION_SPONSOR}
              target="_blank"
              rel="noopener noreferrer"
              className="social-card sponsor-card"
              role="listitem"
            >
              <Heart size={22} aria-hidden="true" />
              <span>Sponsor rebelonion</span>
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="section section-raised" aria-labelledby="forks-title">
          <h2 id="forks-title" className="section-heading">
            <GitFork size={22} aria-hidden="true" />
            Maintained community forks
          </h2>
          <p className="about-text">
            These are independently maintained community projects based on Dantotsu. Always read their
            README and release notes before installing.
          </p>
          <div className="cards fork-grid" role="list">
            {MAINTAINED_FORKS.map((fork) => (
              <article className="fork-card" key={fork.url} role="listitem">
                <h3>{fork.name}</h3>
                <p className="fork-author">
                  by {fork.author}
                  {forkMeta[fork.url]?.stars != null && (
                    <span className="fork-stars">
                      <Star size={12} aria-hidden="true" />
                      {formatCount(forkMeta[fork.url]!.stars!)}
                    </span>
                  )}
                  {forkMeta[fork.url]?.pushedAt && (
                    <span className="fork-updated">
                      updated {timeAgo(forkMeta[fork.url]!.pushedAt!)}
                    </span>
                  )}
                </p>
                <p className="fork-desc">{fork.description}</p>
                <div className="fork-tags">
                  {fork.tags.map((tag) => (
                    <span className="fork-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  className="card-button"
                  href={fork.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${fork.name} repository`}
                >
                  <ExternalLink size={16} />
                  View fork
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="section section-raised" aria-labelledby="install-title">
          <h2 id="install-title" className="section-heading">
            <Monitor size={22} aria-hidden="true" />
            How to install
          </h2>
          <ol className="install-list">
            <li>
              <CheckCircle size={16} aria-hidden="true" />
              <span>
                Download the latest <strong>.apk</strong> from the release above.
              </span>
            </li>
            <li>
              <CheckCircle size={16} aria-hidden="true" />
              <span>
                Open the downloaded file. Android may ask you to allow installation from this source.
              </span>
            </li>
            <li>
              <CheckCircle size={16} aria-hidden="true" />
              <span>
                Enable <strong>Install from unknown sources</strong> for your browser or file manager.
              </span>
            </li>
            <li>
              <CheckCircle size={16} aria-hidden="true" />
              <span>
                Wait for the installation to finish, then open Dantotsu and sign in with your tracker.
              </span>
            </li>
          </ol>
          <p className="about-note">
            Dantotsu is made for <strong>Android</strong>. For Windows, macOS, Linux, or iOS, see the
            options on the <NavLink to="/resources">resources page</NavLink>.
          </p>
        </section>

        <section className="section section-raised" aria-labelledby="obtainium-title">
          <h2 id="obtainium-title" className="section-heading">
            <RefreshCw size={22} aria-hidden="true" />
            Stay updated with Obtainium
          </h2>
          <p className="about-text">
            <a href={OBTAINIUM_GITHUB} target="_blank" rel="noopener noreferrer">Obtainium</a> is a
            free, open-source Android app that tracks updates directly from sources like GitHub
            releases — no app store needed. Once set up, it notifies you whenever a new Dantotsu
            release is published and installs it for you.
          </p>
          <ol className="install-list">
            <li>
              <CheckCircle size={16} aria-hidden="true" />
              <span>
                Install Obtainium from its{' '}
                <a href={`${OBTAINIUM_GITHUB}/releases`} target="_blank" rel="noopener noreferrer">
                  GitHub releases
                </a>{' '}
                page or from F-Droid.
              </span>
            </li>
            <li>
              <CheckCircle size={16} aria-hidden="true" />
              <span>
                Open Obtainium and tap <strong>Add App</strong>.
              </span>
            </li>
            <li>
              <CheckCircle size={16} aria-hidden="true" />
              <span>
                Paste the updater repository URL:{' '}
                <code>https://github.com/itsmechinmoy/dantotsu-updater</code>
              </span>
            </li>
            <li>
              <CheckCircle size={16} aria-hidden="true" />
              <span>
                Confirm the app details — Obtainium picks the APK from each new release and handles
                updates from then on.
              </span>
            </li>
          </ol>
          <p className="about-note">
            Tip: this also works for the community forks — just paste the fork’s GitHub URL instead.
            Dartotsu even ships a one-tap Obtainium link in its README.
          </p>
          <div className="hero-fallbacks">
            <a className="button" href={OBTAINIUM_ADD} target="_blank" rel="noopener noreferrer">
              <RefreshCw size={18} />
              Add to Obtainium
            </a>
            <a className="button button-secondary" href={OBTAINIUM_GITHUB} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={18} />
              Get Obtainium
            </a>
            <NavLink to="/obtainium" className="button button-secondary">
              <HelpCircle size={18} />
              Full setup guide
            </NavLink>
          </div>
        </section>

        <section className="section section-raised" aria-labelledby="troubleshoot-title">
          <h2 id="troubleshoot-title" className="section-heading">
            <AlertTriangle size={22} aria-hidden="true" />
            Something not loading?
          </h2>
          <p className="about-text">
            If the app feels empty or content fails to load, run through these checks — they fix
            almost every issue:
          </p>
          <ul className="about-list">
            <li>
              <CheckCircle size={16} aria-hidden="true" />
              <span>
                <strong>Sign in first.</strong> Most features need a tracker account — connect
                AniList, MyAnimeList, or Simkl in the app settings. Being signed out is the most
                common reason nothing loads.
              </span>
            </li>
            <li>
              <CheckCircle size={16} aria-hidden="true" />
              <span>
                <strong>Update the app.</strong> Older builds break when sources change. Grab the
                latest release above, or let Obtainium keep it updated for you.
              </span>
            </li>
            <li>
              <CheckCircle size={16} aria-hidden="true" />
              <span>
                <strong>Update your extensions.</strong> Missing or outdated extensions are the other
                big cause of loading failures — see the{' '}
                <NavLink to="/extensions">extension setup page</NavLink> for current repos.
              </span>
            </li>
            <li>
              <CheckCircle size={16} aria-hidden="true" />
              <span>
                <strong>Still stuck?</strong> Ask in the{' '}
                <a href={DANTOTSU_DISCORD} target="_blank" rel="noopener noreferrer">
                  official Discord
                </a>{' '}
                or{' '}
                <a href={DANTOTSU_TELEGRAM} target="_blank" rel="noopener noreferrer">
                  Telegram
                </a>{' '}
                — the community is quick to help.
              </span>
            </li>
          </ul>
        </section>

        <section className="section section-raised" aria-labelledby="faq-title">
          <h2 id="faq-title" className="section-heading">
            <HelpCircle size={22} aria-hidden="true" />
            Frequently asked questions
          </h2>
          <div className="faq-list">
            <details className="faq-item">
              <summary>Is this the official Dantotsu website?</summary>
              <p>
                No. This is an independent community mirror for the updater repository. The official
                website is <a href={DANTOTSU_WEBSITE} target="_blank" rel="noopener noreferrer">dantotsu.app</a>.
              </p>
            </details>
            <details className="faq-item">
              <summary>Does Dantotsu host anime or manga?</summary>
              <p>
                No. Dantotsu is a tracking and management app. It does not host, upload, or distribute
                any media. Any streaming or reading functionality depends on third-party extensions.
              </p>
            </details>
            <details className="faq-item">
              <summary>Is it safe to install APKs from this page?</summary>
              <p>
                The APKs are downloaded directly from the linked GitHub release. Always verify the
                source, check the repository, and install at your own risk.
              </p>
            </details>
            <details className="faq-item">
              <summary>What is a fork?</summary>
              <p>
                A fork is an independent project built from Dantotsu’s source. Forks may add new
                features, support other platforms, or focus on different use cases. They are not
                officially supported by the Dantotsu team.
              </p>
            </details>
            <details className="faq-item">
              <summary>Why isn’t anything loading in the app?</summary>
              <p>
                Three things to check, in order: make sure you’re <strong>signed in</strong> to a
                tracker (AniList, MyAnimeList, or Simkl), the <strong>app is up to date</strong>, and
                your <strong>extensions are installed and current</strong>. Outdated extensions and
                being signed out cause most loading problems.
              </p>
            </details>
            <details className="faq-item">
              <summary>Can I use Dantotsu on Windows, Linux, or iOS?</summary>
              <p>
                Dantotsu is Android-only. On Windows or macOS you can run the APK inside an Android
                emulator such as BlueStacks or LDPlayer, and on Linux via Waydroid. For iOS — or a
                native desktop app — try{' '}
                <a href={DARTOTSU_REPO} target="_blank" rel="noopener noreferrer">Dartotsu</a>, a
                community multiplatform rewrite. See the{' '}
                <NavLink to="/resources">resources page</NavLink> for all options.
              </p>
            </details>
          </div>
        </section>

        <section className="section section-raised" aria-labelledby="how-title">
          <h2 id="how-title" className="section-heading">
            <Info size={22} aria-hidden="true" />
            How this website works
          </h2>
          <div className="features how-features">
            <article className="feature-card">
              <h3>1. Fetches the latest release</h3>
              <p>
                When you load the page, your browser calls the GitHub API for the{' '}
                <code>itsmechinmoy/dantotsu-updater</code> repository and pulls the newest release
                tag, date, assets, and notes.
              </p>
            </article>
            <article className="feature-card">
              <h3>2. Validates everything</h3>
              <p>
                The site checks that release and download URLs come from trusted GitHub domains. It
                strips control characters and ignores any malformed data.
              </p>
            </article>
            <article className="feature-card">
              <h3>3. Shows safe download links</h3>
              <p>
                APKs are not hosted or modified here. The download buttons link directly to GitHub's
                file servers, so you get the exact file published by the updater repo.
              </p>
            </article>
            <article className="feature-card">
              <h3>4. Live fork information</h3>
              <p>
                The “Maintained community forks” section asks GitHub for each fork’s latest push
                date, so you can see which projects are still active.
              </p>
            </article>
            <article className="feature-card">
              <h3>5. Built for privacy</h3>
              <p>
                No tracking, analytics, ads, or API keys. The verification gate stores a simple token
                in your browser for 7 days, and your theme choice is saved locally.
              </p>
            </article>
          </div>
        </section>

        <section className="section section-raised" aria-labelledby="safety-title">
          <h2 id="safety-title" className="section-heading">
            <Shield size={22} aria-hidden="true" />
            Staying safe online
          </h2>
          <div className="features how-features">
            <article className="feature-card">
              <h3>Only download from trusted sources</h3>
              <p>
                Stick to official or well-known community repositories. Double-check the URL before
                downloading anything.
              </p>
            </article>
            <article className="feature-card">
              <h3>Scan files before installing</h3>
              <p>
                Upload APKs to{' '}
                <a href="https://www.virustotal.com" target="_blank" rel="noopener noreferrer">
                  VirusTotal
                </a>{' '}
                to scan with dozens of antivirus engines, or scan with your installed antivirus.
              </p>
            </article>
            <article className="feature-card">
              <h3>Keep your device updated</h3>
              <p>
                Install Android security updates. Only enable “Install unknown apps” for apps and
                browsers you actually use.
              </p>
            </article>
            <article className="feature-card">
              <h3>Use strong, unique passwords</h3>
              <p>
                Do not reuse passwords. Use a password manager and enable two-factor authentication
                wherever possible.
              </p>
            </article>
            <article className="feature-card">
              <h3>Be careful with extensions</h3>
              <p>
                Only install third-party extensions from sources you trust. Extensions can access a lot
                of data and permissions.
              </p>
            </article>
          </div>

          <h3 className="section-subheading">How to scan an APK with an antivirus</h3>
          <ol className="install-list safety-list">
            <li>
              <CheckCircle size={16} aria-hidden="true" />
              <span>Download the APK to a folder you can find, such as your Downloads folder.</span>
            </li>
            <li>
              <CheckCircle size={16} aria-hidden="true" />
              <span>
                Go to{' '}
                <a href="https://www.virustotal.com" target="_blank" rel="noopener noreferrer">
                  virustotal.com
                </a>{' '}
                and upload the APK.
              </span>
            </li>
            <li>
              <CheckCircle size={16} aria-hidden="true" />
              <span>Wait for the scan to finish and review the results from all engines.</span>
            </li>
            <li>
              <CheckCircle size={16} aria-hidden="true" />
              <span>
                If many antivirus engines flag the file, or the results look suspicious, delete it and
                do not install.
              </span>
            </li>
            <li>
              <CheckCircle size={16} aria-hidden="true" />
              <span>
                You can also right-click the file on Windows and choose “Scan with Windows Defender” or
                “Scan with …” if you have another antivirus installed.
              </span>
            </li>
          </ol>
        </section>

        <section className="section section-raised" aria-labelledby="sponsor-title">
          <h2 id="sponsor-title" className="section-heading">
            <Heart size={22} aria-hidden="true" />
            Support the original developer
          </h2>
          <p>
            Dantotsu is built and maintained by <strong>rebelonion</strong>. If you enjoy the app and want
            to support continued development, you can sponsor them directly through GitHub Sponsors.
          </p>
          <div className="hero-actions" style={{ marginTop: '1.25rem' }}>
            <a
              href={REBELONION_SPONSOR}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-large button-glow"
            >
              <Heart size={18} />
              Sponsor rebelonion
            </a>
            <NavLink to="/extensions" className="button button-large button-secondary">
              <Puzzle size={18} />
              Set up extensions
            </NavLink>
          </div>
        </section>
      </div>
    </>
  )
}
