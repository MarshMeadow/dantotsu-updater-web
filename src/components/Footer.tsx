import { NavLink } from 'react-router-dom'
import { MessageCircle, GitBranch, ExternalLink, Shield } from 'lucide-react'
import { DISCLAIMER, RISK_NOTICE } from '../constants/legal'
import { DANTOTSU_DISCORD, DANTOTSU_TELEGRAM, UPDATER_TELEGRAM, UPDATER_REPO, DANTOTSU_SOURCE } from '../constants/links'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <nav className="footer-links" aria-label="Footer">
          <a
            href={DANTOTSU_DISCORD}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <ExternalLink size={16} aria-hidden="true" />
            Discord
          </a>
          <a
            href={DANTOTSU_TELEGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <MessageCircle size={16} aria-hidden="true" />
            Dantotsu Telegram
          </a>
          <a
            href={UPDATER_TELEGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <MessageCircle size={16} aria-hidden="true" />
            Updater Telegram
          </a>
          <a
            href={UPDATER_REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <ExternalLink size={16} aria-hidden="true" />
            Updater Repository
          </a>
          <a
            href={DANTOTSU_SOURCE}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <GitBranch size={16} aria-hidden="true" />
            Dantotsu Source
          </a>
          <NavLink to="/dmca" className="footer-link">
            <Shield size={16} aria-hidden="true" />
            DMCA / Legal
          </NavLink>
        </nav>
        <p className="footer-disclaimer">
          {DISCLAIMER} {RISK_NOTICE}
        </p>
      </div>
    </footer>
  )
}
