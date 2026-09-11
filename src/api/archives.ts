export interface ArchiveOrgItem {
  identifier: string
  title: string
  date?: string
  downloads?: number
  description?: string
}

const ENDPOINT = 'https://archive.org/advancedsearch.php'

export function archiveOrgItemUrl(identifier: string): string {
  return `https://archive.org/details/${encodeURIComponent(identifier)}`
}

export async function fetchArchiveOrgItems(query = 'dantotsu'): Promise<ArchiveOrgItem[]> {
  const params = new URLSearchParams({
    q: query,
    rows: '30',
    output: 'json',
  })
  params.append('fl[]', 'identifier')
  params.append('fl[]', 'title')
  params.append('fl[]', 'date')
  params.append('fl[]', 'downloads')
  params.append('fl[]', 'description')
  params.append('sort[]', 'downloads desc')

  const res = await fetch(`${ENDPOINT}?${params.toString()}`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)

  const data = (await res.json()) as { response?: { docs?: unknown } }
  const docs = data?.response?.docs
  if (!Array.isArray(docs)) throw new Error('Unexpected Archive.org response')

  return docs
    .filter(
      (d): d is ArchiveOrgItem =>
        typeof d === 'object' &&
        d !== null &&
        typeof (d as ArchiveOrgItem).identifier === 'string' &&
        typeof (d as ArchiveOrgItem).title === 'string',
    )
    .map((d) => ({
      identifier: d.identifier,
      title: d.title,
      date: typeof d.date === 'string' ? d.date : undefined,
      downloads: typeof d.downloads === 'number' ? d.downloads : undefined,
      description: typeof d.description === 'string' ? d.description : undefined,
    }))
}
