export interface Asset {
  name: string
  size: number
  content_type: string
  browser_download_url: string
}

export interface Release {
  tag_name: string
  name: string
  published_at: string
  html_url: string
  body: string | null
  assets: Asset[]
}

export interface Contributor {
  login: string
  avatar: string
  url: string
  contributions: number
}
