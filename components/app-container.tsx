"use client"

import { useState, useCallback, useEffect } from "react"
import { SubredditBrowser } from "./subreddit/subreddit-browser"
import { PlaylistView } from "./playlist/playlist-view"
import { NowPlayingCard } from "./player/now-playing-card"
import { CommentsThread } from "./comments/comments-thread"
import { VintageRecordPlayer } from "./player/vintage-record-player"
import { SearchAndFilter } from "./playlist/search-and-filter"
import { MiniPlayer } from "./now-playing/mini-player"
import { Header } from "./layout/header"
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable"
import type { FilterOptions } from "@/lib/playlist-filter"
import { REDDIT_SUBREDDITS } from "@/lib/reddit-subreddits"

interface SongData {
  id: string
  title: string
  author: string
  subreddit: string
  score: number
  image?: string
  youtubeId?: string
  postUrl?: string
  index?: number
}

export function AppContainer() {
  const [selectedSubreddit, setSelectedSubreddit] = useState("r/listenothis")
  const [sort, setSort] = useState<"hot" | "new" | "top">("hot")
  const [timeFrame, setTimeFrame] = useState<"hour" | "day" | "week" | "month" | "year" | "all">("week")
  const [currentSong, setCurrentSong] = useState<SongData | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [filters, setFilters] = useState<FilterOptions>({})
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showMiniPlayer, setShowMiniPlayer] = useState(false)
  const [playlist, setPlaylist] = useState<SongData[]>([])

  useEffect(() => {
    if (currentSong && isPlaying) {
      document.title = `${currentSong.title} - ${currentSong.author}`
    } else {
      document.title = "Music Player for Reddit"
    }
  }, [currentSong, isPlaying])

  const handleSubredditSelect = useCallback((subreddit: string) => {
    setSelectedSubreddit(subreddit)
    setSort("hot")
  }, [])

  const handleSearch = useCallback((query: string) => {
    setSelectedSubreddit(`r/${query}`)
    setSort("hot")
  }, [])

  const handleSongSelect = useCallback((song: SongData) => {
    setCurrentSong(song)
    setIsPlaying(true)
    setShowMiniPlayer(true)
    
    // Add to playlist if not already there
    setPlaylist((prev) => {
      const exists = prev.find(s => s.id === song.id)
      if (!exists) {
        return [...prev, song]
      }
      return prev
    })
  }, [])

  const handleFilter = useCallback((options: FilterOptions) => {
    setFilters(options)
  }, [])

  const handleClearFilters = useCallback(() => {
    setFilters({})
  }, [])

  const handleNext = useCallback(() => {
    if (playlist.length === 0) return
    const currentIndex = playlist.findIndex(s => s.id === currentSong?.id)
    const nextIndex = (currentIndex + 1) % playlist.length
    setCurrentSong(playlist[nextIndex])
    setIsPlaying(true)
  }, [playlist, currentSong])

  const handlePrevious = useCallback(() => {
    if (playlist.length === 0) return
    const currentIndex = playlist.findIndex(s => s.id === currentSong?.id)
    const prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1
    setCurrentSong(playlist[prevIndex])
    setIsPlaying(true)
  }, [playlist, currentSong])

  const handlePlaylistSongSelect = useCallback((index: number) => {
    if (playlist[index]) {
      setCurrentSong(playlist[index])
      setIsPlaying(true)
    }
  }, [playlist])

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Content with Resizable Panels */}
      <div className="flex flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          {/* Sidebar - Desktop Only */}
          {sidebarOpen && (
            <>
              <ResizablePanel defaultSize={20} minSize={15} maxSize={30} className="hidden lg:block">
                <div className="h-full overflow-y-scroll overflow-x-hidden border-r border-border bg-background scrollbar-thin scrollbar-thumb-muted scrollbar-track-background">
                  <SubredditBrowser
                    categories={REDDIT_SUBREDDITS}
                    selectedSubreddit={selectedSubreddit}
                    onSelect={handleSubredditSelect}
                    onSearch={handleSearch}
                  />
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle className="hidden lg:flex" />
            </>
          )}

          {/* Playlist Section */}
          <ResizablePanel defaultSize={40} minSize={30}>
            <div className="h-full flex flex-col overflow-hidden">
              <SearchAndFilter
                onSearch={handleSearch}
                onFilter={handleFilter}
                onClear={handleClearFilters}
                hasActiveFilters={Object.keys(filters).length > 0}
              />
              <div className="flex-1 overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-muted scrollbar-track-background">
                <PlaylistView
                  subreddit={selectedSubreddit}
                  sort={sort}
                  timeFrame={timeFrame}
                  onSongSelect={handleSongSelect}
                  selectedSongId={currentSong?.id}
                />
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Right Sidebar - Now Playing & Comments */}
          <ResizablePanel defaultSize={40} minSize={25}>
            <div className="h-full flex flex-col overflow-hidden bg-secondary border-l border-border">
              {/* Now Playing */}
              <div className="shrink-0 border-b border-border overflow-y-scroll max-h-[45%] p-4 scrollbar-thin scrollbar-thumb-muted scrollbar-track-secondary">
                {currentSong ? (
                  <NowPlayingCard
                    title={currentSong.title}
                    artist={currentSong.author}
                    subreddit={currentSong.subreddit}
                    score={currentSong.score}
                    author={currentSong.author}
                    thumbnail={currentSong.image}
                    isPlaying={isPlaying}
                  />
                ) : (
                  <div className="text-center py-8">
                    <p className="text-sm text-muted-foreground">No song selected</p>
                    <p className="text-xs text-muted-foreground mt-2">Click a song to play</p>
                  </div>
                )}
              </div>

              {/* Comments */}
              <div className="flex-1 overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-muted scrollbar-track-secondary">
                <CommentsThread
                  subreddit={selectedSubreddit.replace("r/", "")}
                  postId={currentSong?.id || ""}
                  postTitle={currentSong?.title}
                />
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Player Footer */}
      <footer className="bg-secondary border-t border-border sticky bottom-0 z-50">
        <VintageRecordPlayer
          videoId={currentSong?.youtubeId}
          onEnded={() => {
            setIsPlaying(false)
            handleNext()
          }}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          playlist={playlist}
          currentSongIndex={playlist.findIndex(s => s.id === currentSong?.id)}
          onSongSelect={handlePlaylistSongSelect}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      </footer>

      {/* Mini Player */}
      <MiniPlayer
        isVisible={showMiniPlayer && isPlaying}
        onClose={() => setShowMiniPlayer(false)}
        title={currentSong?.title}
        artist={currentSong?.author}
        thumbnail={currentSong?.image}
        isPlaying={isPlaying}
        onPlayPause={() => setIsPlaying(!isPlaying)}
      />
    </div>
  )
}
