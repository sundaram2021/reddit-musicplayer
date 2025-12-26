"use client"

import { useState, useCallback, useEffect } from "react"
import useSWR from "swr"
import { VintageRecordPlayer } from "./player/vintage-record-player"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { extractYouTubeId } from "@/lib/reddit-client"

interface SongData {
  id: string
  title: string
  author: string
  subreddit: string
  score: number
  image?: string
  youtubeId?: string
  postUrl?: string
}

export function AppContainer() {
  const [selectedSubreddit, setSelectedSubreddit] = useState("r/listenothis")
  const [currentSong, setCurrentSong] = useState<SongData | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playlist, setPlaylist] = useState<SongData[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  // Fetch posts from API
  const { data, isLoading } = useSWR(
    `/api/reddit/posts?subreddit=${selectedSubreddit}&sort=hot&time=week`,
    async (url: string) => {
      const res = await fetch(url)
      if (!res.ok) throw new Error("Failed to fetch posts")
      return res.json()
    },
    { revalidateOnFocus: false }
  )

  // Process Reddit posts into songs
  useEffect(() => {
    if (!data?.posts) {
      setPlaylist([])
      return
    }

    const songs = data.posts
      .filter((post: any) => {
        const hasYoutube = /youtube|youtu\.be/.test(post.url)
        return hasYoutube && post.title
      })
      .map((post: any) => {
        const youtubeId = extractYouTubeId(post.url)
        return {
          id: post.id,
          title: post.title,
          author: post.author,
          subreddit: post.subreddit_name_prefixed,
          score: post.score,
          image: post.thumbnail && post.thumbnail !== "self" ? post.thumbnail : undefined,
          youtubeId,
          postUrl: `https://reddit.com${post.permalink}`,
        }
      })
      .filter((song: SongData) => song.youtubeId)

    setPlaylist(songs)
  }, [data])

  useEffect(() => {
    if (currentSong && isPlaying) {
      document.title = `${currentSong.title} - ${currentSong.author}`
    } else {
      document.title = "Vintage Music Player"
    }
  }, [currentSong, isPlaying])

  const handleSongSelect = useCallback((song: SongData) => {
    setCurrentSong(song)
    setIsPlaying(true)
  }, [])

  const handleNext = useCallback(() => {
    if (playlist.length === 0) return
    const currentIndex = playlist.findIndex((s) => s.id === currentSong?.id)
    const nextIndex = (currentIndex + 1) % playlist.length
    setCurrentSong(playlist[nextIndex])
    setIsPlaying(true)
  }, [playlist, currentSong])

  const handlePrevious = useCallback(() => {
    if (playlist.length === 0) return
    const currentIndex = playlist.findIndex((s) => s.id === currentSong?.id)
    const prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1
    setCurrentSong(playlist[prevIndex])
    setIsPlaying(true)
  }, [playlist, currentSong])

  const handlePlaylistSongSelect = useCallback(
    (index: number) => {
      if (playlist[index]) {
        setCurrentSong(playlist[index])
        setIsPlaying(true)
      }
    },
    [playlist]
  )

  // Filter songs based on search
  const filteredSongs = playlist.filter((song) =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.author.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background text-foreground flex overflow-hidden">
      {/* Left Sidebar - Songs List */}
      <div className="w-full md:w-96 bg-secondary border-r border-border flex flex-col">
        {/* Search Bar */}
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search songs or artists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background border-border"
            />
          </div>
        </div>

        {/* Songs List */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-secondary">
          {isLoading ? (
            <div className="p-4 text-center text-muted-foreground">Loading songs...</div>
          ) : filteredSongs.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">No songs found</div>
          ) : (
            <div className="p-2">
              {filteredSongs.map((song) => (
                <button
                  key={song.id}
                  onClick={() => handleSongSelect(song)}
                  className={`w-full text-left p-3 rounded-md mb-2 transition-colors ${
                    currentSong?.id === song.id
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-muted"
                  }`}
                  aria-label={`Play ${song.title} by ${song.author}`}
                  role="button"
                  tabIndex={0}
                >
                  <div className="font-medium text-sm truncate">{song.title}</div>
                  <div className="text-xs text-muted-foreground truncate mt-1">{song.author}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Side - Vintage Record Player */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-3xl">
          <VintageRecordPlayer
            videoId={currentSong?.youtubeId}
            onEnded={() => {
              setIsPlaying(false)
              if (playlist.length > 0) {
                handleNext()
              }
            }}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            playlist={playlist}
            currentSongIndex={playlist.findIndex((s) => s.id === currentSong?.id)}
            onSongSelect={handlePlaylistSongSelect}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
          
          {/* Current Song Info */}
          {currentSong && (
            <div className="mt-6 text-center">
              <h2 className="text-2xl font-semibold text-foreground mb-2">{currentSong.title}</h2>
              <p className="text-muted-foreground">by {currentSong.author}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
