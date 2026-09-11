import type { Asset, Release } from './types'
import { GITHUB_LATEST_API, GITHUB_RELEASES_API } from '../constants/links'

const TRUSTED_URL_PREFIXES = [
  'https://github.com/',
  'https://objects.githubusercontent.com/',
] as const

function isTrustedUrl(url: string): boolean {
  return TRUSTED_URL_PREFIXES.some((prefix) => url.startsWith(prefix))
}

function sanitizeString(value: string): string {
  // Strip control characters that could break rendering or be used for spoofing.
  return value.replace(/[\x00-\x1F\x7F]/g, '')
}

function validateAsset(item: unknown): Asset | null {
  if (!item || typeof item !== 'object') return null
  const a = item as Record<string, unknown>
  if (
    typeof a.name === 'string' &&
    typeof a.size === 'number' &&
    typeof a.content_type === 'string' &&
    typeof a.browser_download_url === 'string' &&
    isTrustedUrl(a.browser_download_url)
  ) {
    return {
      name: sanitizeString(a.name),
      size: a.size,
      content_type: sanitizeString(a.content_type),
      browser_download_url: a.browser_download_url,
    }
  }
  return null
}

function validateRelease(data: unknown): Release {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid release data received.')
  }

  const release = data as Record<string, unknown>

  if (
    typeof release.tag_name !== 'string' ||
    typeof release.html_url !== 'string' ||
    typeof release.published_at !== 'string'
  ) {
    throw new Error('Release response is missing required fields.')
  }

  if (!release.html_url.startsWith('https://github.com/itsmechinmoy/dantotsu-updater/releases/')) {
    throw new Error('Release URL does not come from the expected repository.')
  }

  const rawAssets = Array.isArray(release.assets) ? release.assets : []
  const assets: Asset[] = []

  for (const item of rawAssets) {
    const a = validateAsset(item)
    if (a) assets.push(a)
  }

  return {
    tag_name: sanitizeString(release.tag_name),
    name: sanitizeString(typeof release.name === 'string' ? release.name : release.tag_name),
    published_at: release.published_at,
    html_url: release.html_url,
    body: typeof release.body === 'string' ? sanitizeString(release.body) : null,
    assets,
  }
}

export async function fetchLatestRelease(): Promise<Release> {
  const res = await fetch(GITHUB_LATEST_API, {
    headers: {
      Accept: 'application/vnd.github+json',
    },
  })

  if (!res.ok) {
    throw new Error(`GitHub API returned ${res.status}`)
  }

  const data: unknown = await res.json()
  return validateRelease(data)
}

export async function fetchAllReleases(): Promise<Release[]> {
  const res = await fetch(GITHUB_RELEASES_API, {
    headers: {
      Accept: 'application/vnd.github+json',
    },
  })

  if (!res.ok) {
    throw new Error(`GitHub API returned ${res.status}`)
  }

  const data: unknown = await res.json()
  if (!Array.isArray(data)) {
    throw new Error('Invalid releases list received.')
  }

  const releases: Release[] = []
  for (const item of data) {
    try {
      releases.push(validateRelease(item))
    } catch {
      // Skip malformed releases.
    }
  }

  return releases
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`
}

export function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return iso
  }
}

export function getPlatform(name: string): string {
  const lower = name.toLowerCase()
  if (lower.endsWith('.apk')) return 'Android'
  if (lower.endsWith('.zip')) return 'Archive'
  if (lower.endsWith('.tar.gz') || lower.endsWith('.tgz')) return 'Source'
  if (lower.endsWith('.tar')) return 'Source'
  if (lower.endsWith('.json')) return 'Metadata'
  return 'Unknown'
}

export function getReleaseType(tag: string, body: string | null): { type: string; className: string } {
  const source = `${tag} ${body ?? ''}`.toLowerCase()
  if (source.includes('nightly') || source.includes('dev') || source.includes('ci')) {
    return { type: 'Development', className: 'badge-dev' }
  }
  if (source.includes('beta')) {
    return { type: 'Beta', className: 'badge-beta' }
  }
  if (source.includes('alpha')) {
    return { type: 'Alpha', className: 'badge-beta' }
  }
  if (source.includes('rc')) {
    return { type: 'Release Candidate', className: 'badge-beta' }
  }
  return { type: 'Stable', className: 'badge-stable' }
}
