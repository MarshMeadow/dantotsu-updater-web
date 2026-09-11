import { NavLink } from 'react-router-dom'
import { ExternalLink, MessageCircle, Star, Users } from 'lucide-react'
import Seo from '../components/Seo'
import { formatCount } from '../api/github'
import { useDiscordStats, useRepoMeta } from '../hooks/useStats'
import {
  DANTOTSU_DISCORD,
  DANTOTSU_TELEGRAM,
  UPDATER_TELEGRAM,
  TELEGRAM_POST,
  WEBSITE_REPO,
} from '../constants/links'

const DISCORD_INVITE_CODE = DANTOTSU_DISCORD.split('/').pop() ?? ''
const GITHUB_URLS = [WEBSITE_REPO]

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
  const discord = useDiscordStats(DISCORD_INVITE_CODE)
  const repoMeta = useRepoMeta(GITHUB_URLS)

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
          other users. The official Discord server is home to{' '}
          {discord ? `over ${formatCount(discord.members)}` : 'almost 20,000'} members.
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
                    <span className="repo-stars">
                      <Users size={12} aria-hidden="true" />
                      {discord
                        ? `${formatCount(discord.members)} members · ${formatCount(discord.online)} online`
                        : 'Almost 20,000 members'}
                    </span>
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

        <p>
          <NavLink to="/resources">More useful resources →</NavLink> •{' '}
          <NavLink to="/">← Back to home</NavLink>
        </p>
      </article>
    </div>
  )
}
