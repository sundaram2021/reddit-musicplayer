"use client"

import { useCallback, useEffect, useState } from "react"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Loader, Shuffle, Filter } from "lucide-react"
import { SongItem } from "./song-item"
import { getPostThumbnail, formatTimeAgo, extractYouTubeId } from "@/lib/reddit-client"
import type { RedditPost } from "@/lib/reddit-client"

interface PlaylistViewProps {
  subreddit: string
  sort: "hot" | "new" | "top"
  timeFrame: "hour" | "day" | "week" | "month" | "year" | "all"
  onSongSelect: (song: any) => void
  selectedSongId?: string
}

export function PlaylistView({ subreddit, sort, timeFrame, onSongSelect, selectedSongId }: PlaylistViewProps) {
  const [sortBy, setSortBy] = useState(sort)
  const [filteredSongs, setFilteredSongs] = useState<any[]>([])

  // Fetch posts from API
  const { data, isLoading, error } = useSWR(
    `/api/reddit/posts?subreddit=${subreddit}&sort=${sortBy}&time=${timeFrame}`,
    async (url: string) => {
      const res = await fetch(url)
      if (!res.ok) throw new Error("Failed to fetch posts")
      return res.json()
    },
    { revalidateOnFocus: false },
  )

  // Process Reddit posts into songs
  useEffect(() => {
    if (!data?.posts) {
      setFilteredSongs([])
      return
    }

    const songs = data.posts
      .filter((post: RedditPost) => {
        // Filter for music-related content
        const hasYoutube = /youtube|youtu\.be|soundcloud|spotify|bandcamp/.test(post.url)
        return hasYoutube && post.title
      })
      .map((post: RedditPost) => {
        const youtubeId = extractYouTubeId(post.url)
        const thumbnail = getPostThumbnail(post)

        return {
          id: post.id,
          title: post.title,
          year: new Date(post.created_utc * 1000).getFullYear(),
          score: post.score,
          author: post.author,
          subreddit: post.subreddit,
          timeAgo: formatTimeAgo(post.created_utc),
          source: post.domain,
          comments: post.num_comments,
          image: thumbnail,
          url: post.url,
          youtubeId,
          permalink: post.permalink,
        }
      })

    setFilteredSongs(songs)
  }, [data])

  const handleShuffle = useCallback(() => {
    const shuffled = [...filteredSongs].sort(() => Math.random() - 0.5)
    setFilteredSongs(shuffled)
  }, [filteredSongs])

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Sort Controls */}
      <div className="border-b border-border px-4 py-3 bg-secondary flex items-center justify-between flex-wrap gap-2">
        <div className="flex gap-1">
          {(["hot", "new", "top"] as const).map((s) => (
            <Button
              key={s}
              variant={sortBy === s ? "default" : "ghost"}
              size="sm"
              className="text-xs capitalize"
              onClick={() => setSortBy(s)}
              disabled={isLoading}
            >
              {s}
            </Button>
          ))}
          {sortBy === "top" && (
            <Button variant="ghost" size="sm" className="text-xs" disabled={isLoading}>
              {timeFrame}
            </Button>
          )}
        </div>

        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-muted"
            onClick={handleShuffle}
            disabled={isLoading || filteredSongs.length === 0}
            title="Shuffle"
          >
            <Shuffle size={16} />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-muted" disabled={isLoading} title="Filter">
            <Filter size={16} />
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex-1 flex items-center justify-center">
          <Loader className="animate-spin text-accent" size={32} />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Failed to load songs</p>
            <Button size="sm" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && filteredSongs.length === 0 && (
        <div className="flex-1 flex items-center justify-center p-4">
          <p className="text-sm text-muted-foreground">No songs found in this subreddit</p>
        </div>
      )}

      {/* Songs List */}
      {!isLoading && (
        <div className="flex-1 overflow-y-auto">
          {filteredSongs.map((song, index) => (
            <SongItem
              key={song.id}
              song={song}
              isSelected={selectedSongId === song.id}
              onClick={() => onSongSelect({ ...song, index })}
            />
          ))}
        </div>
      )}
    </div>
  )
}
