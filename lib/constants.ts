"use client"

/**
 * Application Constants
 */

export const APP_NAME = "Music Player for Reddit"
export const APP_VERSION = "0.6.14"
export const REDDIT_API_BASE = "https://www.reddit.com"
export const USER_AGENT = "MusicPlayer/1.0 (by musicplayer-io)"

export const DEFAULT_SORT = "hot" as const
export const DEFAULT_TIME_FRAME = "week" as const
export const DEFAULT_LIMIT = 25

export const MUSIC_DOMAINS = ["youtube.com", "youtu.be", "soundcloud.com", "spotify.com", "bandcamp.com", "vimeo.com"]

export const CACHE_DURATIONS = {
  POSTS: 60,
  COMMENTS: 300,
  SEARCH: 600,
}

// Reddit OAuth Config (can be overridden by env vars)
export const REDDIT_OAUTH_CONFIG = {
  clientId: process.env.NEXT_PUBLIC_REDDIT_CLIENT_ID || "",
  redirectUri: typeof window !== "undefined" ? window.location.origin + "/auth/callback" : "",
  scope: ["identity", "read", "submit"],
}

// SoundCloud Config
export const SOUNDCLOUD_CONFIG = {
  clientId: process.env.SOUNDCLOUD_CLIENT_ID || "",
  apiBase: "https://api.soundcloud.com",
}

// UI Constants
export const TIME_FILTERS = [
  { value: "hour", label: "Today" },
  { value: "day", label: "This Week" },
  { value: "week", label: "This Month" },
  { value: "month", label: "This Year" },
  { value: "year", label: "All Time" },
  { value: "all", label: "All Time" },
] as const

export const SORT_OPTIONS = [
  { value: "hot", label: "Hot" },
  { value: "new", label: "New" },
  { value: "top", label: "Top" },
] as const
