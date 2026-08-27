// Pexels image sourcing. Used at build time to pull hero/section imagery
// so we never ship hotlinks to pexels.com in production HTML.
//
// Requires PEXELS_API_KEY. Get one at https://www.pexels.com/api/

const PEXELS_API = 'https://api.pexels.com/v1'

export interface PexelsPhoto {
  id: number
  width: number
  height: number
  alt: string
  photographer: string
  photographer_url: string
  avg_color: string
  src: {
    original: string
    large2x: string
    large: string
    medium: string
    small: string
    portrait: string
    landscape: string
    tiny: string
  }
}

interface SearchOptions {
  perPage?: number
  orientation?: 'landscape' | 'portrait' | 'square'
  size?: 'large' | 'medium' | 'small'
  color?: string
  page?: number
}

function apiKey(): string {
  const key = process.env.PEXELS_API_KEY
  if (!key) {
    throw new Error('PEXELS_API_KEY is not set, add it to .env.local')
  }
  return key
}

export async function searchPhotos(
  query: string,
  opts: SearchOptions = {}
): Promise<PexelsPhoto[]> {
  const params = new URLSearchParams({
    query,
    per_page: String(opts.perPage ?? 15),
    page: String(opts.page ?? 1),
  })
  if (opts.orientation) params.set('orientation', opts.orientation)
  if (opts.size) params.set('size', opts.size)
  if (opts.color) params.set('color', opts.color)

  const res = await fetch(`${PEXELS_API}/search?${params}`, {
    headers: { Authorization: apiKey() },
    // Cache aggressively, imagery doesn't change between builds.
    next: { revalidate: 60 * 60 * 24 },
  })

  if (!res.ok) {
    throw new Error(`Pexels search failed: ${res.status} ${res.statusText}`)
  }

  const json = (await res.json()) as { photos: PexelsPhoto[] }
  return json.photos
}

export async function getPhoto(id: number): Promise<PexelsPhoto> {
  const res = await fetch(`${PEXELS_API}/photos/${id}`, {
    headers: { Authorization: apiKey() },
    next: { revalidate: 60 * 60 * 24 },
  })
  if (!res.ok) {
    throw new Error(`Pexels photo ${id} failed: ${res.status}`)
  }
  return (await res.json()) as PexelsPhoto
}

/**
 * Pexels requires attribution when photos are displayed.
 * Render this alongside any Pexels-sourced image.
 */
export function attribution(photo: PexelsPhoto): string {
  return `Photo by ${photo.photographer} on Pexels`
}
