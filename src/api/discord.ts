export interface DiscordStats {
  members: number
  online: number
}

export async function fetchDiscordStats(inviteCode: string): Promise<DiscordStats | null> {
  try {
    const res = await fetch(
      `https://discord.com/api/v9/invites/${encodeURIComponent(inviteCode)}?with_counts=true`,
    )
    if (!res.ok) return null
    const data: unknown = await res.json()
    if (!data || typeof data !== 'object') return null
    const record = data as Record<string, unknown>
    if (typeof record.approximate_member_count !== 'number') return null
    return {
      members: record.approximate_member_count,
      online:
        typeof record.approximate_presence_count === 'number'
          ? record.approximate_presence_count
          : 0,
    }
  } catch {
    return null
  }
}
