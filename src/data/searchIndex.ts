export interface SearchItem {
  title: string
  description: string
  keywords: string[]
  to: string
  /** Optional element id to scroll to after navigating */
  section?: string
}

export const SEARCH_INDEX: SearchItem[] = [
  {
    title: 'Home',
    description: 'Latest Dantotsu APK download, release notes and install guide.',
    keywords: ['home', 'download', 'apk', 'latest', 'release', 'install'],
    to: '/',
  },
  {
    title: 'Download the APK',
    description: 'Get the newest Dantotsu Android APK from GitHub releases.',
    keywords: ['download', 'apk', 'android', 'install', 'sideload'],
    to: '/',
    section: 'downloads-title',
  },
  {
    title: 'Install guide',
    description: 'Step-by-step: enable unknown apps and install the APK.',
    keywords: ['install', 'setup', 'sideload', 'apk', 'unknown apps'],
    to: '/',
    section: 'install-title',
  },
  {
    title: 'Troubleshooting',
    description: 'Nothing loading? Sign in, update the app and your extensions.',
    keywords: ['troubleshoot', 'loading', 'error', 'sign in', 'login', 'extensions', 'fix', 'help'],
    to: '/',
    section: 'troubleshoot-title',
  },
  {
    title: 'FAQ',
    description: 'Common questions about Dantotsu, safety and platforms.',
    keywords: ['faq', 'questions', 'help', 'windows', 'ios', 'safe'],
    to: '/',
    section: 'faq-title',
  },
  {
    title: 'Community forks',
    description: 'Dartotsu and other maintained forks of Dantotsu.',
    keywords: ['fork', 'dartotsu', 'forks', 'windows', 'ios', 'linux'],
    to: '/',
    section: 'forks-title',
  },
  {
    title: 'Release archive',
    description: 'Every past updater release with changelogs and APKs.',
    keywords: ['archive', 'old', 'versions', 'previous', 'history', 'changelog'],
    to: '/archive',
  },
  {
    title: 'Obtainium guide',
    description: 'Set up Obtainium for automatic update notifications.',
    keywords: ['obtainium', 'auto update', 'updates', 'automatic', 'notifications'],
    to: '/obtainium',
  },
  {
    title: 'Add Dantotsu to Obtainium',
    description: 'Paste the repo URL and pick the right APK variant.',
    keywords: ['obtainium', 'add app', 'repo', 'arm64', 'universal'],
    to: '/obtainium',
    section: 'obtainium-add-title',
  },
  {
    title: 'Resources',
    description: 'Official links, forks, desktop/iOS options and guides.',
    keywords: ['resources', 'links', 'windows', 'macos', 'linux', 'ios', 'waydroid', 'emulator', 'bluestacks'],
    to: '/resources',
  },
  {
    title: 'Windows, macOS, Linux & iOS',
    description: 'Run Dantotsu or Dartotsu on desktop and Apple devices.',
    keywords: ['windows', 'mac', 'linux', 'ios', 'iphone', 'ipad', 'emulator', 'waydroid', 'altstore', 'sidestore'],
    to: '/resources',
    section: 'resources-platforms-title',
  },
  {
    title: 'Community',
    description: 'Join the Discord (~20k members) and Telegram channels.',
    keywords: ['community', 'discord', 'telegram', 'chat', 'support', 'members'],
    to: '/community',
  },
  {
    title: 'Contributors',
    description: 'The maintainers and everyone who contributes to the project.',
    keywords: ['contributors', 'maintainers', 'rebelonion', 'marshmeadow', 'itsmechinmoy', 'github'],
    to: '/contributors',
  },
  {
    title: 'Extensions setup',
    description: 'Add the extension repo to keep sources working (key required).',
    keywords: ['extensions', 'sources', 'json', 'repo', 'key', 'anime'],
    to: '/extensions',
  },
  {
    title: 'History',
    description: 'From Saikou to Dantotsu and the forks that followed.',
    keywords: ['history', 'saikou', 'origin', 'forks', 'story', 'dartotsu', 'timeline'],
    to: '/history',
  },
  {
    title: 'Settings',
    description: 'Theme, language and animation preferences for this site.',
    keywords: ['settings', 'theme', 'dark', 'light', 'language', 'animations', 'preferences'],
    to: '/settings',
  },
  {
    title: 'Sitemap',
    description: 'A complete list of every page on this site.',
    keywords: ['sitemap', 'pages', 'navigation', 'all pages'],
    to: '/sitemap',
  },
  {
    title: 'DMCA / Legal',
    description: 'Copyright notice and takedown requests.',
    keywords: ['dmca', 'legal', 'copyright', 'takedown'],
    to: '/dmca',
  },
  {
    title: 'Privacy policy',
    description: 'What data this site does (not) collect.',
    keywords: ['privacy', 'data', 'tracking', 'cookies'],
    to: '/privacy',
  },
  {
    title: 'Terms of use',
    description: 'Terms and conditions for using this site.',
    keywords: ['terms', 'conditions', 'use', 'warranty'],
    to: '/terms',
  },
]
