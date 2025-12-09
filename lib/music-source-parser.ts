/**
 * Music Source Parser
 * Extracts music metadata from various platforms
 */

export interface MusicTrack {
  id: string
  title: string
  artist: string
  source: "youtube" | "soundcloud" | "spotify" | "bandcamp" | "unknown"
  sourceUrl: string
  duration?: number
  thumbnail?: string
}

export function parseMusicFromUrl(url: string, postTitle: string): MusicTrack | null {
  // YouTube
  if (isYouTubeUrl(url)) {
    const videoId = extractYouTubeId(url)
    if (videoId) {
      const { artist, title } = extractArtistAndTitle(postTitle)
      return {
        id: videoId,
        title: title || postTitle,
        artist: artist || "Unknown Artist",
        source: "youtube",
        sourceUrl: `https://www.youtube.com/watch?v=${videoId}`,
        thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      }
    }
  }

  // SoundCloud
  if (isSoundCloudUrl(url)) {
    const { artist, title } = extractArtistAndTitle(postTitle)
    return {
      id: generateId(),
      title: title || postTitle,
      artist: artist || "Unknown Artist",
      source: "soundcloud",
      sourceUrl: url,
    }
  }

  // Spotify
  if (isSpotifyUrl(url)) {
    const trackId = extractSpotifyId(url)
    if (trackId) {
      const { artist, title } = extractArtistAndTitle(postTitle)
      return {
        id: trackId,
        title: title || postTitle,
        artist: artist || "Unknown Artist",
        source: "spotify",
        sourceUrl: url,
      }
    }
  }

  return null
}

function isYouTubeUrl(url: string): boolean {
  return /youtube\.com|youtu\.be/.test(url)
}

function isSoundCloudUrl(url: string): boolean {
  return /soundcloud\.com/.test(url)
}

function isSpotifyUrl(url: string): boolean {
  return /spotify\.com/.test(url)
}

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) {
      return match[1]
    }
  }
  return null
}

function extractSpotifyId(url: string): string | null {
  const match = url.match(/\/track\/([a-zA-Z0-9]+)/)
  return match ? match[1] : null
}

function extractArtistAndTitle(text: string): { artist: string; title: string } {
  // Try to split by " – " or " - "
  const parts = text.split(/\s*–\s*|\s*-\s*/)

  if (parts.length >= 2) {
    return {
      artist: parts[0].trim(),
      title: parts[1].trim(),
    }
  }

  return {
    artist: "",
    title: text,
  }
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}
