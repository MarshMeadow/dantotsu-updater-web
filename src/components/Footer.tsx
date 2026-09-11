import { NavLink } from 'react-router-dom'
import { MessageCircle, GitBranch, ExternalLink, Shield, Download, Lock, Heart, Globe, Users, RefreshCw, Map, History, Settings } from 'lucide-react'
import { DISCLAIMER, RISK_NOTICE } from '../constants/legal'
import { useI18n } from '../i18n'
import { DANTOTSU_DISCORD, DANTOTSU_TELEGRAM, UPDATER_TELEGRAM, UPDATER_REPO, DANTOTSU_SOURCE, WEBSITE_REPO, REBELONION_SPONSOR, MARSHMEADOW_WEBSITE, MARSHMEADOW_LIST, MARSHMEADOW_GITHUB } from '../constants/links'

export default function Footer() {
  const { t } = useI18n()
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
            href={REBELONION_SPONSOR}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <Heart size={16} aria-hidden="true" />
            Sponsor rebelonion
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
          <a
            href={WEBSITE_REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <ExternalLink size={16} aria-hidden="true" />
            Website GitHub
          </a>
          <NavLink to="/community" className="footer-link">
            <MessageCircle size={16} aria-hidden="true" />
            {t('nav.community')}
          </NavLink>
          <NavLink to="/resources" className="footer-link">
            <GitBranch size={16} aria-hidden="true" />
            {t('nav.resources')}
          </NavLink>
          <NavLink to="/contributors" className="footer-link">
            <Users size={16} aria-hidden="true" />
            {t('footer.contributors')}
          </NavLink>
          <NavLink to="/obtainium" className="footer-link">
            <RefreshCw size={16} aria-hidden="true" />
            {t('footer.obtainiumGuide')}
          </NavLink>
          <NavLink to="/sitemap" className="footer-link">
            <Map size={16} aria-hidden="true" />
            {t('footer.sitemap')}
          </NavLink>
          <NavLink to="/history" className="footer-link">
            <History size={16} aria-hidden="true" />
            {t('footer.history')}
          </NavLink>
          <NavLink to="/settings" className="footer-link">
            <Settings size={16} aria-hidden="true" />
            {t('nav.settings')}
          </NavLink>
          <NavLink to="/archive" className="footer-link">
            <Download size={16} aria-hidden="true" />
            {t('nav.archive')}
          </NavLink>
          <NavLink to="/extensions" className="footer-link">
            <Lock size={16} aria-hidden="true" />
            {t('footer.extensions')}
          </NavLink>
          <NavLink to="/dmca" className="footer-link">
            <Shield size={16} aria-hidden="true" />
            {t('footer.legal')}
          </NavLink>
          <NavLink to="/privacy" className="footer-link">
            <Shield size={16} aria-hidden="true" />
            {t('footer.privacy')}
          </NavLink>
          <NavLink to="/terms" className="footer-link">
            <Shield size={16} aria-hidden="true" />
            {t('footer.terms')}
          </NavLink>
          <a
            href={MARSHMEADOW_WEBSITE}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <Globe size={16} aria-hidden="true" />
            MarshMeadow
          </a>
          <a
            href={MARSHMEADOW_LIST}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <ExternalLink size={16} aria-hidden="true" />
            n3k0s list
          </a>
          <a
            href={MARSHMEADOW_GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <GitBranch size={16} aria-hidden="true" />
            MarshMeadow GitHub
          </a>
        </nav>
        <p className="footer-disclaimer">
          {DISCLAIMER} {RISK_NOTICE}
        </p>
      </div>
    </footer>
  )
}
