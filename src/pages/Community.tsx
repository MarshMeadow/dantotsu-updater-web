import { NavLink } from 'react-router-dom'
import { ExternalLink, MessageCircle } from 'lucide-react'
import Seo from '../components/Seo'
import {
  DANTOTSU_DISCORD,
  DANTOTSU_TELEGRAM,
  UPDATER_TELEGRAM,
  TELEGRAM_POST,
  WEBSITE_REPO,
} from '../constants/links'

const DISCORDS = [
  {
    name: 'Official Dantotsu Discord',
    url: DANTOTSU_DISCORD,
    description: 'The official Discord server for Dantotsu users, developers, and contributors.',
  },
]

const TELEGRAMS = [
  {
    name: 'Official Dantotsu Telegram',
    url: DANTOTSU_TELEGRAM,
    description: 'Official Telegram group for Dantotsu updates and discussion.',
  },
  {
    name: 'Dantotsu Updater Telegram',
    url: UPDATER_TELEGRAM,
    description: 'Community updater channel with release posts and APK links.',
  },
  {
    name: 'Updater Release Post',
    url: TELEGRAM_POST,
    description: 'Direct link to the latest pinned release post on Telegram.',
  },
]

const GITHUB = [
  {
    name: 'Website Repository',
    url: WEBSITE_REPO,
    description: 'The source code for this website. Report issues, suggest features, or contribute.',
  },
]

export default function Community() {
  return (
    <div className="container">
      <Seo
        title="Community - Dantotsu Updater"
        description="Official and community links for Dantotsu, including Discord, Telegram, and GitHub."
      />
      <article className="page-article">
        <h1>Community & Resources</h1>
        <p>
          Find official Dantotsu communities and places to ask questions, get updates, and chat with
          other users.
        </p>

        <section aria-labelledby="community-discord-title">
          <h2 id="community-discord-title">Discord</h2>
          <div className="resource-list">
            {DISCORDS.map((item) => (
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

        <section aria-labelledby="community-telegram-title">
          <h2 id="community-telegram-title">Telegram</h2>
          <div className="resource-list">
            {TELEGRAMS.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="resource-card"
              >
                <div className="resource-main">
                  <MessageCircle size={20} className="resource-icon" aria-hidden="true" />
                  <div>
                    <h3 className="resource-name">{item.name}</h3>
                    <p className="resource-desc">{item.description}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section aria-labelledby="community-github-title">
          <h2 id="community-github-title">GitHub & Source</h2>
          <div className="resource-list">
            {GITHUB.map((item) => (
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

        <p>
          <NavLink to="/resources">More useful resources →</NavLink> •{' '}
          <NavLink to="/">← Back to home</NavLink>
        </p>
      </article>
    </div>
  )
}
