import { NavLink } from 'react-router-dom'
import { ExternalLink, GitBranch, Shield, BookOpen, Star, Users, RefreshCw } from 'lucide-react'
import Seo from '../components/Seo'
import { formatCount } from '../api/github'
import { useRepoMeta } from '../hooks/useStats'
import {
  AFTV_DOWNLOADER,
  ALTSTORE,
  BLUESTACKS,
  DANTOTSU_GITHUB,
  DANTOTSU_SOURCE,
  DANTOTSU_WEBSITE,
  DARTOTSU_RELEASES,
  LDPLAYER,
  SEND_FILES_TO_TV,
  SIDESTORE,
  UPDATER_REPO,
  WAYDROID,
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

const PLATFORMS = [
  {
    name: 'Dartotsu — Windows, macOS, iOS & Linux builds',
    url: DARTOTSU_RELEASES,
    description:
      'A community Flutter rewrite of Dantotsu with native builds for Windows, macOS, iOS, and Linux. The closest option to running Dantotsu off Android.',
  },
  {
    name: 'BlueStacks',
    url: BLUESTACKS,
    description:
      'Android emulator for Windows and macOS. Install it, then open the Dantotsu APK inside the emulator.',
  },
  {
    name: 'LDPlayer',
    url: LDPLAYER,
    description:
      'Lightweight Android emulator for Windows that can install and run the Dantotsu APK.',
  },
  {
    name: 'Waydroid',
    url: WAYDROID,
    description:
      'Runs a full Android system inside a container on Linux. Lets you install and run the Dantotsu APK natively on Wayland-based desktops.',
  },
  {
    name: 'AltStore',
    url: ALTSTORE,
    description:
      'Sideloading tool for iPhone and iPad. Needed to install the Dartotsu iOS .ipa, since it is not distributed on the App Store.',
  },
  {
    name: 'SideStore',
    url: SIDESTORE,
    description:
      'An alternative iOS sideloading app for installing unsigned .ipa files such as the Dartotsu iOS build.',
  },
]

const TV = [
  {
    name: 'Downloader (AFTVnews)',
    url: AFTV_DOWNLOADER,
    description:
      'The easiest way to sideload on Fire TV and Android TV. Install it from your TV’s app store, then enter the updater’s GitHub releases URL to fetch the APK.',
  },
  {
    name: 'Send Files to TV',
    url: SEND_FILES_TO_TV,
    description:
      'Sends the APK from your phone or PC to your Android TV over the local network — download on your phone here, then beam it to the TV.',
  },
]

const REPO_URLS = [
  ...OFFICIAL.map((item) => item.url),
  ...MAINTAINED_FORKS.map((fork) => fork.url),
]

export default function Resources() {
  const repoMeta = useRepoMeta(REPO_URLS)

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
                    {repoMeta[item.url]?.stars != null && (
                      <span className="repo-stars">
                        <Star size={12} aria-hidden="true" />
                        {formatCount(repoMeta[item.url]!.stars!)} stars
                      </span>
                    )}
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
                    {repoMeta[fork.url]?.stars != null && (
                      <span className="repo-stars">
                        <Star size={12} aria-hidden="true" />
                        {formatCount(repoMeta[fork.url]!.stars!)} stars
                      </span>
                    )}
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

        <section aria-labelledby="resources-platforms-title">
          <h2 id="resources-platforms-title">Windows, macOS, Linux & iOS</h2>
          <p>
            Dantotsu itself is <strong>Android-only</strong>. There is no official Windows, macOS,
            Linux, or iOS version, and iOS cannot install Android APK files. These community options
            are the closest alternatives:
          </p>
          <div className="resource-list">
            {PLATFORMS.map((item) => (
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
          <p>
            Windows Subsystem for Android was discontinued by Microsoft in March 2025 and is no
            longer available. Emulators and sideloading tools are third-party software — only
            download them from their official sites.
          </p>
        </section>

        <section aria-labelledby="resources-tv-title">
          <h2 id="resources-tv-title">Android TV & Fire TV</h2>
          <p>
            The Dantotsu APK declares Android TV support, so the same release you download
            here can run on Android TV, Google TV, Fire TV devices (Fire OS is Android), and
            TV boxes. There is no TV-specific fork — you sideload the regular APK:
          </p>
          <ol className="install-list">
            <li>On your TV, enable <strong>installing unknown apps</strong> for your file tool.</li>
            <li>Get the APK onto the TV with one of the tools below (pick the <strong>universal</strong> build if unsure).</li>
            <li>Install it, open Dantotsu, and sign in as usual.</li>
          </ol>
          <div className="resource-list">
            {TV.map((item) => (
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
          <p>
            Heads-up: the interface is designed for touchscreens, so some menus may need a
            Bluetooth mouse or a mouse-toggle app on the remote. Extensions and playback
            work the same as on a phone.
          </p>
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
            <NavLink to="/obtainium" className="resource-card">
              <div className="resource-main">
                <RefreshCw size={20} className="resource-icon" aria-hidden="true" />
                <div>
                  <h3 className="resource-name">Auto-update with Obtainium</h3>
                  <p className="resource-desc">Full step-by-step guide to tracking new Dantotsu releases straight from GitHub.</p>
                </div>
              </div>
            </NavLink>
            <NavLink to="/contributors" className="resource-card">
              <div className="resource-main">
                <Users size={20} className="resource-icon" aria-hidden="true" />
                <div>
                  <h3 className="resource-name">Contributors</h3>
                  <p className="resource-desc">The people behind Dantotsu, the updater, and this website — and how to join them.</p>
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
