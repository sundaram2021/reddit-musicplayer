"use client"

import { useState, useCallback, useEffect } from "react"
import { VintageRecordPlayer } from "./player/vintage-record-player"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { extractYouTubeId } from "@/lib/reddit-client"
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
}

// Get all music subreddits from all categories (excluding "Favorite")
const getAllMusicSubreddits = () => {
  const subreddits: string[] = []
  Object.entries(REDDIT_SUBREDDITS).forEach(([category, subs]) => {
    if (category !== "Favorite") {
      subs.forEach((sub) => {
        if (sub.path.startsWith("r/")) {
          subreddits.push(sub.path)
        }
      })
    }
  })
  return subreddits
}

// Mock data for demonstration when API fails - 100+ songs
const getMockSongs = (): SongData[] => {
  const songs: SongData[] = [
    { id: "mock1", title: "Tame Impala - The Less I Know The Better", author: "TameImpalaMusic", subreddit: "r/indieheads", score: 4521, youtubeId: "sBzrzS1Ag_g", postUrl: "https://reddit.com/r/indieheads" },
    { id: "mock2", title: "Arctic Monkeys - Do I Wanna Know?", author: "ArcticMonkeysVEVO", subreddit: "r/indie_rock", score: 3892, youtubeId: "bpOSxM0rNPM", postUrl: "https://reddit.com/r/indie_rock" },
    { id: "mock3", title: "Kendrick Lamar - HUMBLE.", author: "KendrickLamarVEVO", subreddit: "r/hiphopheads", score: 5234, youtubeId: "tvTRZJ-4EyI", postUrl: "https://reddit.com/r/hiphopheads" },
    { id: "mock4", title: "Flume - Never Be Like You feat. Kai", author: "FlumeAUS", subreddit: "r/electronicmusic", score: 2987, youtubeId: "Ly7uj0JwgKg", postUrl: "https://reddit.com/r/electronicmusic" },
    { id: "mock5", title: "ODESZA - A Moment Apart", author: "ODESZA", subreddit: "r/electronicmusic", score: 3421, youtubeId: "6t6Y-w-TT9Q", postUrl: "https://reddit.com/r/electronicmusic" },
    { id: "mock6", title: "Mac DeMarco - Chamber of Reflection", author: "MacDeMarcoVEVO", subreddit: "r/listenothis", score: 4123, youtubeId: "NY8IS0ssnXQ", postUrl: "https://reddit.com/r/listenothis" },
    { id: "mock7", title: "Anderson .Paak - Come Down", author: "AndersonPaak", subreddit: "r/hiphopheads", score: 3654, youtubeId: "ferZnZ0_rSM", postUrl: "https://reddit.com/r/hiphopheads" },
    { id: "mock8", title: "Glass Animals - Heat Waves", author: "GlassAnimalsVEVO", subreddit: "r/indieheads", score: 4890, youtubeId: "mRD0-GxqHVo", postUrl: "https://reddit.com/r/indieheads" },
    { id: "mock9", title: "The Strokes - Reptilia", author: "TheStrokesVEVO", subreddit: "r/indie_rock", score: 5123, youtubeId: "b8-tXG8KrWs", postUrl: "https://reddit.com/r/indie_rock" },
    { id: "mock10", title: "Beach House - Space Song", author: "BeachHouseBALT", subreddit: "r/indieheads", score: 3987, youtubeId: "RBtlPT23PTM", postUrl: "https://reddit.com/r/indieheads" },
    { id: "mock11", title: "Daft Punk - Get Lucky", author: "DaftPunkVEVO", subreddit: "r/electronicmusic", score: 6543, youtubeId: "5NV6Rdv1a3I", postUrl: "https://reddit.com/r/electronicmusic" },
    { id: "mock12", title: "FKA twigs - Two Weeks", author: "FKAtwigs", subreddit: "r/popheads", score: 2876, youtubeId: "3yDP9MKVhZc", postUrl: "https://reddit.com/r/popheads" },
    { id: "mock13", title: "Tyler, The Creator - EARFQUAKE", author: "tylerthecreator", subreddit: "r/hiphopheads", score: 5432, youtubeId: "HmAsUQEFYGI", postUrl: "https://reddit.com/r/hiphopheads" },
    { id: "mock14", title: "MGMT - Electric Feel", author: "MGMTVEVO", subreddit: "r/indieheads", score: 4234, youtubeId: "MmZexg8sxyk", postUrl: "https://reddit.com/r/indieheads" },
    { id: "mock15", title: "Bon Iver - Holocene", author: "boniver", subreddit: "r/indieheads", score: 3765, youtubeId: "TWcyIpul8OE", postUrl: "https://reddit.com/r/indieheads" },
    { id: "mock16", title: "Alt-J - Breezeblocks", author: "AltJVEVO", subreddit: "r/indieheads", score: 4421, youtubeId: "rVeMiVU77wo", postUrl: "https://reddit.com/r/indieheads" },
    { id: "mock17", title: "Childish Gambino - Redbone", author: "ChildishGambinoVEVO", subreddit: "r/hiphopheads", score: 5621, youtubeId: "Kp7eSUU9oy8", postUrl: "https://reddit.com/r/hiphopheads" },
    { id: "mock18", title: "Portugal. The Man - Feel It Still", author: "PortugalTheMan", subreddit: "r/indieheads", score: 3921, youtubeId: "pBkHHoOIIn8", postUrl: "https://reddit.com/r/indieheads" },
    { id: "mock19", title: "The Weeknd - Blinding Lights", author: "TheWeekndVEVO", subreddit: "r/popheads", score: 7234, youtubeId: "4NRXx6U8ABQ", postUrl: "https://reddit.com/r/popheads" },
    { id: "mock20", title: "Billie Eilish - bad guy", author: "BillieEilishVEVO", subreddit: "r/popheads", score: 6821, youtubeId: "DyDfgMOUjCI", postUrl: "https://reddit.com/r/popheads" },
    { id: "mock21", title: "Gorillaz - Feel Good Inc.", author: "GorilladVEVO", subreddit: "r/electronicmusic", score: 5987, youtubeId: "HyHNuVaZJ-k", postUrl: "https://reddit.com/r/electronicmusic" },
    { id: "mock22", title: "Toro y Moi - Ordinary Pleasure", author: "ToroYMoi", subreddit: "r/indieheads", score: 2987, youtubeId: "x6oYJJRaxoU", postUrl: "https://reddit.com/r/indieheads" },
    { id: "mock23", title: "Frank Ocean - Nights", author: "FrankOcean", subreddit: "r/hiphopheads", score: 6234, youtubeId: "r4l9bFqgMaQ", postUrl: "https://reddit.com/r/hiphopheads" },
    { id: "mock24", title: "Radiohead - Paranoid Android", author: "Radiohead", subreddit: "r/indie_rock", score: 5432, youtubeId: "fHiGbolFFGw", postUrl: "https://reddit.com/r/indie_rock" },
    { id: "mock25", title: "LCD Soundsystem - Dance Yrself Clean", author: "LCDSoundsystem", subreddit: "r/electronicmusic", score: 4876, youtubeId: "OoA0cTC228M", postUrl: "https://reddit.com/r/electronicmusic" },
    { id: "mock26", title: "M83 - Midnight City", author: "M83VEVO", subreddit: "r/electronicmusic", score: 5234, youtubeId: "dX3k_QDnzHE", postUrl: "https://reddit.com/r/electronicmusic" },
    { id: "mock27", title: "Phoenix - 1901", author: "PhoenixVEVO", subreddit: "r/indieheads", score: 4123, youtubeId: "HL548cHH3OY", postUrl: "https://reddit.com/r/indieheads" },
    { id: "mock28", title: "Two Door Cinema Club - What You Know", author: "TwoDoorCinemaClub", subreddit: "r/indieheads", score: 3876, youtubeId: "YXwYJyrKK5A", postUrl: "https://reddit.com/r/indieheads" },
    { id: "mock29", title: "Foster The People - Pumped Up Kicks", author: "FosterThePeopleVEVO", subreddit: "r/indieheads", score: 4987, youtubeId: "SDTZ7iX4vTQ", postUrl: "https://reddit.com/r/indieheads" },
    { id: "mock30", title: "CHVRCHES - The Mother We Share", author: "CHVRCHES", subreddit: "r/electronicmusic", score: 3654, youtubeId: "_mTRvJ9fugM", postUrl: "https://reddit.com/r/electronicmusic" },
  ]
  
  // Add 70 more songs by duplicating and modifying
  for (let i = 31; i <= 100; i++) {
    const baseIndex = (i - 31) % 30
    const baseSong = songs[baseIndex]
    songs.push({
      id: `mock${i}`,
      title: `${baseSong.title} (Live)`,
      author: baseSong.author,
      subreddit: baseSong.subreddit,
      score: baseSong.score - Math.floor(Math.random() * 1000),
      youtubeId: baseSong.youtubeId,
      postUrl: baseSong.postUrl,
    })
  }
  
  return songs
}

export function AppContainer() {
  const [currentSong, setCurrentSong] = useState<SongData | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playlist, setPlaylist] = useState<SongData[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  // Fetch posts from multiple subreddits
  useEffect(() => {
    const fetchAllSongs = async () => {
      setIsLoading(true)
      const allSongs: SongData[] = []
      const subreddits = getAllMusicSubreddits()
      
      // Fetch from first 10 subreddits to avoid too many API calls
      const subredditsToFetch = subreddits.slice(0, 10)
      
      try {
        const promises = subredditsToFetch.map(async (subreddit) => {
          try {
            const res = await fetch(`/api/reddit/posts?subreddit=${subreddit}&sort=hot&time=week`)
            if (!res.ok) return []
            const data = await res.json()
            
            if (!data?.posts) return []
            
            return data.posts
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
          } catch (error) {
            console.error(`Error fetching from ${subreddit}:`, error)
            return []
          }
        })
        
        const results = await Promise.all(promises)
        results.forEach((songs) => {
          allSongs.push(...songs)
        })
        
        // If no songs were fetched (API failures), use mock data
        if (allSongs.length === 0) {
          console.log("Using mock data as fallback")
          setPlaylist(getMockSongs())
        } else {
          // Sort by score (popularity)
          allSongs.sort((a, b) => b.score - a.score)
          setPlaylist(allSongs)
        }
      } catch (error) {
        console.error("Error fetching songs:", error)
        // Use mock data on error
        setPlaylist(getMockSongs())
      } finally {
        setIsLoading(false)
      }
    }

    fetchAllSongs()
  }, [])

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
    song.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.subreddit.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="h-screen bg-background text-foreground flex overflow-hidden">
      {/* Left Sidebar - Songs List */}
      <div className="w-full md:w-96 bg-secondary border-r border-border flex flex-col h-screen">
        {/* Search Bar */}
        <div className="p-4 border-b border-border flex-shrink-0">
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
        <div className="flex-1 overflow-y-auto">
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
                  <div className="text-xs text-muted-foreground truncate mt-1">
                    {song.author} • {song.subreddit}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Side - Vintage Record Player */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 h-screen overflow-hidden">
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
