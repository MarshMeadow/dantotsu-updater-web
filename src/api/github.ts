const TRUSTED_API = 'https://api.github.com'

export async function fetchRepoPushedAt(owner: string, repo: string): Promise<string | null> {
  const res = await fetch(`${TRUSTED_API}/repos/${owner}/${repo}`, {
    headers: { Accept: 'application/vnd.github+json' },
  })
  if (!res.ok) return null
  const data: unknown = await res.json()
  if (!data || typeof data !== 'object') return null
  const record = data as Record<string, unknown>
  return typeof record.pushed_at === 'string' ? record.pushed_at : null
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
