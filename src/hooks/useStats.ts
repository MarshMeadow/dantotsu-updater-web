import { useEffect, useState } from 'react'
import { fetchRepoInfo, parseGitHubRepo } from '../api/github'
import type { RepoInfo } from '../api/github'
import { fetchDiscordStats } from '../api/discord'
import type { DiscordStats } from '../api/discord'

export function useRepoMeta(urls: string[]): Record<string, RepoInfo> {
  const [meta, setMeta] = useState<Record<string, RepoInfo>>({})
  const key = urls.join('|')

  useEffect(() => {
    let active = true
    const load = async () => {
      const next: Record<string, RepoInfo> = {}
      await Promise.all(
        key.split('|').map(async (url) => {
          const parsed = parseGitHubRepo(url)
          if (!parsed) return
          const info = await fetchRepoInfo(parsed.owner, parsed.repo)
          if (info) next[url] = info
        }),
      )
      if (active) setMeta(next)
    }
    load()
    return () => {
      active = false
    }
  }, [key])

  return meta
}

export function useDiscordStats(inviteCode: string): DiscordStats | null {
  const [stats, setStats] = useState<DiscordStats | null>(null)

  useEffect(() => {
    let active = true
    fetchDiscordStats(inviteCode).then((result) => {
      if (active && result) setStats(result)
    })
    return () => {
      active = false
    }
  }, [inviteCode])

  return stats
}
