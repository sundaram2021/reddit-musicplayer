/**
 * Playlist Filtering and Search Utilities
 */

export interface FilterOptions {
  query?: string
  minScore?: number
  maxScore?: number
  sortBy?: "score" | "date" | "comments" | "relevance"
  sortOrder?: "asc" | "desc"
  source?: "youtube" | "soundcloud" | "spotify" | "all"
  dateRange?: "today" | "week" | "month" | "year" | "all"
  hasImage?: boolean
}

export function filterAndSearchSongs(songs: any[], options: FilterOptions): any[] {
  let filtered = [...songs]

  // Text search
  if (options.query) {
    const query = options.query.toLowerCase()
    filtered = filtered.filter(
      (song) =>
        song.title.toLowerCase().includes(query) ||
        song.author.toLowerCase().includes(query) ||
        song.subreddit.toLowerCase().includes(query),
    )
  }

  // Score filter
  if (options.minScore !== undefined) {
    filtered = filtered.filter((song) => song.score >= options.minScore)
  }
  if (options.maxScore !== undefined) {
    filtered = filtered.filter((song) => song.score <= options.maxScore)
  }

  // Source filter
  if (options.source && options.source !== "all") {
    filtered = filtered.filter((song) => song.source.includes(options.source))
  }

  // Image filter
  if (options.hasImage) {
    filtered = filtered.filter((song) => song.image)
  }

  // Date range filter
  if (options.dateRange && options.dateRange !== "all") {
    const now = Date.now()
    let timeLimit = 0

    switch (options.dateRange) {
      case "today":
        timeLimit = now - 24 * 60 * 60 * 1000
        break
      case "week":
        timeLimit = now - 7 * 24 * 60 * 60 * 1000
        break
      case "month":
        timeLimit = now - 30 * 24 * 60 * 60 * 1000
        break
      case "year":
        timeLimit = now - 365 * 24 * 60 * 60 * 1000
        break
    }

    filtered = filtered.filter((song) => {
      const songTime = new Date(song.createdAt).getTime()
      return songTime >= timeLimit
    })
  }

  // Sorting
  const sortBy = options.sortBy || "score"
  const sortOrder = options.sortOrder === "asc" ? 1 : -1

  filtered.sort((a, b) => {
    let aVal = 0
    let bVal = 0

    switch (sortBy) {
      case "score":
        aVal = a.score
        bVal = b.score
        break
      case "date":
        aVal = new Date(a.createdAt).getTime()
        bVal = new Date(b.createdAt).getTime()
        break
      case "comments":
        aVal = a.comments
        bVal = b.comments
        break
      case "relevance":
        // Simple relevance based on title match length
        if (options.query) {
          const query = options.query.toLowerCase()
          aVal = a.title.toLowerCase().indexOf(query)
          bVal = b.title.toLowerCase().indexOf(query)
          return aVal - bVal
        }
        return 0
    }

    return (bVal - aVal) * sortOrder
  })

  return filtered
}

export function getFilterPresets() {
  return {
    trending: {
      sortBy: "score" as const,
      sortOrder: "desc" as const,
      dateRange: "week" as const,
    },
    newest: {
      sortBy: "date" as const,
      sortOrder: "desc" as const,
    },
    mostCommented: {
      sortBy: "comments" as const,
      sortOrder: "desc" as const,
    },
    highScore: {
      minScore: 50,
      sortBy: "score" as const,
      sortOrder: "desc" as const,
    },
  }
}
