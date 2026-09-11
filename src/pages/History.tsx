import { NavLink } from 'react-router-dom'
import { ExternalLink, GitFork, History as HistoryIcon, Sparkles, Swords, Wrench } from 'lucide-react'
import Seo from '../components/Seo'
import { DANTOTSU_GITHUB, DARTOTSU_REPO, UPDATER_REPO, WEBSITE_REPO } from '../constants/links'

export default function History() {
  return (
    <div className="container">
      <Seo
        title="History - Dantotsu Updater"
        description="The story of Dantotsu: from Saikou to Dantotsu and the community forks that followed."
      />
      <article className="page-article">
        <h1>
          <HistoryIcon size={28} className="page-icon" aria-hidden="true" />
          The story so far
        </h1>
        <p>
          Dantotsu did not appear out of nowhere — it is part of a chain of open-source
          community projects, each one keeping anime and manga tracking alive on Android
          after the last one stopped. Here is how we got here.
        </p>

        <div className="timeline">
          <section className="timeline-item" aria-labelledby="history-saikou">
            <div className="timeline-dot" aria-hidden="true">
              <Swords size={18} />
            </div>
            <div className="timeline-card">
              <span className="timeline-era">Before Dantotsu · ~2021–2023</span>
              <h2 id="history-saikou">Saikou</h2>
              <p>
                <strong>Saikou</strong> was the original open-source AniList client for
                Android — a clean, elegant app for tracking and streaming anime and manga.
                When its developer could no longer actively maintain it, the project
                effectively stopped, leaving a big gap in the community.
              </p>
              <p>
                Saikou's README now points users to Dantotsu as its recommended successor.
              </p>
            </div>
          </section>

          <section className="timeline-item" aria-labelledby="history-dantotsu">
            <div className="timeline-dot" aria-hidden="true">
              <Sparkles size={18} />
            </div>
            <div className="timeline-card">
              <span className="timeline-era">2023 – today</span>
              <h2 id="history-dantotsu">Dantotsu</h2>
              <p>
                <strong>Dantotsu</strong> (断トツ — "the best of the best") was created by{' '}
                <a href={DANTOTSU_GITHUB} target="_blank" rel="noopener noreferrer">
                  rebelonion <ExternalLink size={12} aria-hidden="true" />
                </a>{' '}
                — in the project's own words, "crafted from the ashes of Saikou". It keeps
                the same Android-first philosophy and adds extension support
                (Tachiyomi/Aniyomi-style), plus sync with AniList, MyAnimeList and Simkl.
              </p>
              <p>
                This is the app this website distributes — Android APKs only. For desktop
                or iOS, see the forks below or the{' '}
                <NavLink to="/resources">resources page</NavLink>.
              </p>
            </div>
          </section>

          <section className="timeline-item" aria-labelledby="history-forks">
            <div className="timeline-dot" aria-hidden="true">
              <GitFork size={18} />
            </div>
            <div className="timeline-card">
              <span className="timeline-era">After Dantotsu · the forks</span>
              <h2 id="history-forks">Community forks</h2>
              <p>
                <a href={DARTOTSU_REPO} target="_blank" rel="noopener noreferrer">
                  <strong>Dartotsu</strong> <ExternalLink size={12} aria-hidden="true" />
                </a>{' '}
                is a full Flutter rewrite of Dantotsu by aayush2622. Because Flutter is
                cross-platform, Dartotsu ships native builds for <strong>Windows, macOS,
                Linux and iOS</strong> — something the Android-only original cannot do.
              </p>
              <p>
                <a href={UPDATER_REPO} target="_blank" rel="noopener noreferrer">
                  <strong>itsmechinmoy's updater</strong>{' '}
                  <ExternalLink size={12} aria-hidden="true" />
                </a>{' '}
                maintains the release mirror and Telegram distribution this site is built
                around, making updates easy to find when upstream links move or break.
              </p>
              <p>
                Other community efforts include <strong>ReDantotsu</strong> (a remake with a
                refreshed UI) and <strong>Dantotsu-Alpha</strong> (automated alpha builds for
                early testing) — see the full list on the{' '}
                <NavLink to="/resources">resources page</NavLink>.
              </p>
            </div>
          </section>

          <section className="timeline-item" aria-labelledby="history-site">
            <div className="timeline-dot" aria-hidden="true">
              <Wrench size={18} />
            </div>
            <div className="timeline-card">
              <span className="timeline-era">This website</span>
              <h2 id="history-site">Dantotsu Updater</h2>
              <p>
                This site is a community-run companion maintained by{' '}
                <a href={WEBSITE_REPO} target="_blank" rel="noopener noreferrer">
                  MarshMeadow <ExternalLink size={12} aria-hidden="true" />
                </a>
                . It collects the latest releases, an archive of every version with
                fallback sources, the Obtainium auto-update guide, and links to the wider
                community — so you always have a working download even if one source goes
                down.
              </p>
              <p>
                Want to be part of the story? Check the{' '}
                <NavLink to="/contributors">contributors page</NavLink> to see how to help.
              </p>
            </div>
          </section>
        </div>

        <p className="about-note">
          This is a community-maintained summary, not official documentation — details may
          be incomplete. The repositories linked above are the source of truth.
        </p>

        <p>
          <NavLink to="/">← Back to home</NavLink>
        </p>
      </article>
    </div>
  )
}
