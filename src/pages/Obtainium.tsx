import { NavLink } from 'react-router-dom'
import {
  AlertTriangle,
  Bell,
  CheckCircle,
  Download,
  ExternalLink,
  HelpCircle,
  RefreshCw,
  Settings,
  Smartphone,
} from 'lucide-react'
import Seo from '../components/Seo'
import CopyText from '../components/CopyText'
import {
  DANTOTSU_DISCORD,
  MAINTAINED_FORKS,
  OBTAINIUM_ADD,
  OBTAINIUM_GITHUB,
  UPDATER_REPO,
} from '../constants/links'

export default function Obtainium() {
  return (
    <div className="container">
      <Seo
        title="Obtainium Setup Guide - Dantotsu Updater"
        description="Step-by-step guide to installing Obtainium and setting it up to auto-update Dantotsu directly from GitHub releases."
      />
      <article className="page-article">
        <h1>Set up auto-updates with Obtainium</h1>
        <p>
          <a href={OBTAINIUM_GITHUB} target="_blank" rel="noopener noreferrer">Obtainium</a> is a
          free, open-source Android app that keeps your apps updated straight from their sources —
          like GitHub releases — without an app store. This guide walks you through installing it and
          adding Dantotsu so you never miss a release.
        </p>

        <section aria-labelledby="obtainium-install-title">
          <h2 id="obtainium-install-title">
            <Download size={20} aria-hidden="true" /> Step 1 — Install Obtainium
          </h2>
          <ol className="install-list">
            <li>
              <CheckCircle size={16} aria-hidden="true" />
              <span>
                Get Obtainium from its{' '}
                <a href={`${OBTAINIUM_GITHUB}/releases`} target="_blank" rel="noopener noreferrer">
                  GitHub releases page
                </a>{' '}
                — download the latest <code>app-release.apk</code>. It is also available on F-Droid
                via the IzzyOnDroid repo.
              </span>
            </li>
            <li>
              <CheckCircle size={16} aria-hidden="true" />
              <span>
                Open the APK and install it. Android will ask you to allow{' '}
                <strong>Install unknown apps</strong> for your browser or file manager — this is
                normal for sideloading.
              </span>
            </li>
          </ol>
        </section>

        <section aria-labelledby="obtainium-add-title">
          <h2 id="obtainium-add-title">
            <Smartphone size={20} aria-hidden="true" /> Step 2 — Add Dantotsu
          </h2>
          <ol className="install-list">
            <li>
              <CheckCircle size={16} aria-hidden="true" />
              <span>
                Open Obtainium and tap <strong>Add App</strong> at the bottom.
              </span>
            </li>
            <li>
              <CheckCircle size={16} aria-hidden="true" />
              <span>
                In <strong>App Source URL</strong>, paste: <CopyText text={UPDATER_REPO} />
              </span>
            </li>
            <li>
              <CheckCircle size={16} aria-hidden="true" />
              <span>
                Tap <strong>Continue</strong>. Obtainium detects the GitHub source and fills in the
                app name and details automatically.
              </span>
            </li>
            <li>
              <CheckCircle size={16} aria-hidden="true" />
              <span>
                If the release has several APKs, pick the one for your device —{' '}
                <strong>universal</strong> works everywhere, or choose <code>arm64-v8a</code> for most
                modern phones.
              </span>
            </li>
            <li>
              <CheckCircle size={16} aria-hidden="true" />
              <span>
                Tap <strong>Add</strong>, then <strong>Install</strong> to get the current release.
              </span>
            </li>
          </ol>
          <p className="about-note">
            Already have Obtainium installed? Use the one-tap link below and skip straight to
            confirming the app.
          </p>
          <div className="hero-fallbacks">
            <a className="button" href={OBTAINIUM_ADD} target="_blank" rel="noopener noreferrer">
              <RefreshCw size={18} />
              Add to Obtainium
            </a>
            <a
              className="button button-secondary"
              href={OBTAINIUM_GITHUB}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={18} />
              Get Obtainium
            </a>
          </div>
        </section>

        <section aria-labelledby="obtainium-updates-title">
          <h2 id="obtainium-updates-title">
            <Bell size={20} aria-hidden="true" /> Step 3 — How updates work
          </h2>
          <ol className="install-list">
            <li>
              <CheckCircle size={16} aria-hidden="true" />
              <span>
                Obtainium checks for new releases in the background on a schedule you can change in{' '}
                <strong>Settings</strong> (default is every few hours).
              </span>
            </li>
            <li>
              <CheckCircle size={16} aria-hidden="true" />
              <span>
                When a new Dantotsu release is published, you get a notification — tap it, then tap{' '}
                <strong>Update</strong> to install over your existing app. Your settings and data are
                kept.
              </span>
            </li>
            <li>
              <CheckCircle size={16} aria-hidden="true" />
              <span>
                For fully silent background installs, Obtainium supports{' '}
                <strong>Shizuku</strong> or root — completely optional, manual taps work fine.
              </span>
            </li>
          </ol>
        </section>

        <section aria-labelledby="obtainium-tips-title">
          <h2 id="obtainium-tips-title">
            <Settings size={20} aria-hidden="true" /> Tips & troubleshooting
          </h2>
          <ul className="about-list">
            <li>
              <AlertTriangle size={16} aria-hidden="true" />
              <span>
                <strong>No update notifications?</strong> Exclude Obtainium from battery optimization
                (Settings → Apps → Obtainium → Battery → Unrestricted) so background checks run on
                time.
              </span>
            </li>
            <li>
              <AlertTriangle size={16} aria-hidden="true" />
              <span>
                <strong>Install blocked?</strong> Make sure Obtainium itself has the{' '}
                <strong>Install unknown apps</strong> permission.
              </span>
            </li>
            <li>
              <AlertTriangle size={16} aria-hidden="true" />
              <span>
                <strong>Wrong version detected?</strong> Open the app entry in Obtainium and check the{' '}
                <strong>version detection</strong> / <strong>APK filter</strong> options — prerelease
                and alpha builds can be toggled per app.
              </span>
            </li>
            <li>
              <AlertTriangle size={16} aria-hidden="true" />
              <span>
                <strong>More help:</strong> the{' '}
                <a href={`${OBTAINIUM_GITHUB}#readme`} target="_blank" rel="noopener noreferrer">
                  Obtainium wiki & README
                </a>{' '}
                cover every option, and the{' '}
                <a href={DANTOTSU_DISCORD} target="_blank" rel="noopener noreferrer">
                  Dantotsu Discord
                </a>{' '}
                can help too.
              </span>
            </li>
          </ul>
        </section>

        <section aria-labelledby="obtainium-forks-title">
          <h2 id="obtainium-forks-title">
            <HelpCircle size={20} aria-hidden="true" /> Works for the forks too
          </h2>
          <p>
            Any project that publishes APKs on GitHub releases can be added the same way. For
            example, paste one of these fork URLs into <strong>Add App</strong>:
          </p>
          <ul className="about-list">
            {MAINTAINED_FORKS.map((fork) => (
              <li key={fork.url}>
                <CheckCircle size={16} aria-hidden="true" />
                <span>
                  <a href={fork.url} target="_blank" rel="noopener noreferrer">
                    {fork.name}
                  </a>{' '}
                  — <CopyText text={fork.url.replace('https://github.com/', '')} />
                </span>
              </li>
            ))}
          </ul>
        </section>

        <p>
          <NavLink to="/resources">More useful resources →</NavLink> •{' '}
          <NavLink to="/">← Back to home</NavLink>
        </p>
      </article>
    </div>
  )
}
