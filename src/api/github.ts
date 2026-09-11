const TRUSTED_API = 'https://api.github.com'

export interface RepoInfo {
  pushedAt: string | null
  stars: number | null
}

export function parseGitHubRepo(url: string): { owner: string; repo: string } | null {
  try {
    const u = new URL(url)
    if (u.hostname !== 'github.com' && u.hostname !== 'www.github.com') return null
    const [, owner, repo] = u.pathname.split('/')
    if (!owner || !repo) return null
    return { owner, repo }
  } catch {
    return null
  }
}

export async function fetchRepoInfo(owner: string, repo: string): Promise<RepoInfo | null> {
  try {
    const res = await fetch(`${TRUSTED_API}/repos/${owner}/${repo}`, {
      headers: { Accept: 'application/vnd.github+json' },
    })
    if (!res.ok) return null
    const data: unknown = await res.json()
    if (!data || typeof data !== 'object') return null
    const record = data as Record<string, unknown>
    return {
      pushedAt: typeof record.pushed_at === 'string' ? record.pushed_at : null,
      stars: typeof record.stargazers_count === 'number' ? record.stargazers_count : null,
    }
  } catch {
    return null
  }
}

export async function fetchRepoPushedAt(owner: string, repo: string): Promise<string | null> {
  const info = await fetchRepoInfo(owner, repo)
  return info?.pushedAt ?? null
}

export function formatCount(n: number): string {
  if (n < 1000) return String(n)
  if (n < 1_000_000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k`
  return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`
}

export function timeAgo(iso: string): string {
  const date = new Date(iso)
  const now = new Date()
  if (Number.isNaN(date.getTime())) return 'unknown'
  const seconds = Math.max(0, Math.floor((now.getTime() - date.getTime()) / 1000))
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  if (seconds < 60) return 'just now'
  if (minutes === 1) return '1 minute ago'
  if (minutes < 60) return `${minutes} minutes ago`
  if (hours === 1) return '1 hour ago'
  if (hours < 24) return `${hours} hours ago`
  if (days === 1) return 'yesterday'
  if (days < 30) return `${days} days ago`
  if (months === 1) return '1 month ago'
  if (months < 12) return `${months} months ago`
  if (years === 1) return '1 year ago'
  return `${years} years ago`
}
