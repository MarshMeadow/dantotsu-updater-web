export const DANTOTSU_DISCORD = 'https://discord.gg/FpwpYPJAy9' as const
export const DANTOTSU_TELEGRAM = 'https://t.me/+gzBCQExtLQo1YTNh' as const
export const UPDATER_TELEGRAM = 'https://t.me/dantotsu_updater' as const
export const TELEGRAM_POST = 'https://t.me/dantotsu_updater/171' as const
export const DANTOTSU_WEBSITE = 'https://dantotsu.app' as const
export const DANTOTSU_GITHUB = 'https://github.com/rebelonion/Dantotsu' as const
export const UPDATER_REPO = 'https://github.com/itsmechinmoy/dantotsu-updater' as const
export const DANTOTSU_SOURCE = 'https://git.rebelonion.dev/rebelonion/Dantotsu/src/branch/dev' as const
export const WEBSITE_REPO = 'https://github.com/MarshMeadow/dantotsu-updater-web' as const
export const GITHUB_LATEST_API = 'https://api.github.com/repos/itsmechinmoy/dantotsu-updater/releases/latest' as const
export const GITHUB_RELEASES_API = 'https://api.github.com/repos/itsmechinmoy/dantotsu-updater/releases?per_page=100' as const

export interface ForkInfo {
  name: string
  description: string
  url: string
  author: string
  tags: string[]
}

export const MAINTAINED_FORKS: ForkInfo[] = [
  {
    name: 'Dartotsu',
    author: 'aayush2622',
    description: 'A Flutter rewrite for Android, iOS, Windows, macOS and Linux. Supports AniList, MyAnimeList and Simkl.',
    url: 'https://github.com/aayush2622/Dartotsu',
    tags: ['multiplatform', 'flutter'],
  },
  {
    name: 'ReDantotsu',
    author: 'AsrOfficialDev',
    description: 'A community remake with a refreshed UI, MyAnimeList rating integration and Liquid Glass theme.',
    url: 'https://github.com/AsrOfficialDev/ReDantotsu',
    tags: ['android', 'remake'],
  },
  {
    name: 'Dantotsu-Alpha',
    author: 'Shebyyy',
    description: 'Automated alpha builds with side-by-side package patching for testing new features early.',
    url: 'https://github.com/Shebyyy/Dantotsu-Alpha',
    tags: ['alpha', 'android'],
  },
  {
    name: 'itsmechinmoy/Dantotsu',
    author: 'itsmechinmoy',
    description: 'A community mirror of the upstream Dantotsu repository with a focus on easy access.',
    url: 'https://github.com/itsmechinmoy/Dantotsu',
    tags: ['mirror', 'android'],
  },
]
