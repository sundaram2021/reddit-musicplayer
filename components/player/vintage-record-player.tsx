"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { SkipBack, Play, Pause, SkipForward, Volume2 } from "lucide-react"

interface VintageRecordPlayerProps {
  videoId?: string
  onEnded?: () => void
  onPlay?: () => void
  onPause?: () => void
  playlist?: Array<{ id: string; title: string; author: string; youtubeId?: string }>
  currentSongIndex?: number
  onSongSelect?: (index: number) => void
  onNext?: () => void
  onPrevious?: () => void
}

export function VintageRecordPlayer({
  videoId,
  onEnded,
  onPlay,
  onPause,
  playlist = [],
  currentSongIndex = 0,
  onSongSelect,
  onNext,
  onPrevious,
}: VintageRecordPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<any>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // YouTube IFrame API integration
  useEffect(() => {
    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement("script")
      tag.src = "https://www.youtube.com/iframe_api"
      document.body.appendChild(tag)
    }

    // Initialize player when API is ready
    const handleYTReady = () => {
      if (containerRef.current && videoId) {
        initializePlayer()
      }
    }

    if (window.YT && window.YT.Player) {
      handleYTReady()
    } else {
      window.onYouTubeIframeAPIReady = handleYTReady
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [videoId])

  const initializePlayer = () => {
    if (!containerRef.current || !videoId || !window.YT) return

    // Destroy existing player if any
    if (playerRef.current) {
      playerRef.current.destroy()
    }

    playerRef.current = new window.YT.Player("youtube-player-vintage", {
      height: "0",
      width: "0",
      videoId: videoId,
      playerVars: {
        autoplay: 1,
        controls: 0,
        modestbranding: 1,
        rel: 0,
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    })
  }

  const onPlayerReady = (event: { target: any }) => {
    setDuration(event.target.getDuration())
    event.target.setVolume(volume * 100)
    event.target.playVideo()
    setIsPlaying(true)
    onPlay?.()
    startTimeUpdate()
  }

  const onPlayerStateChange = (event: { target: any; data: number }) => {
    if (event.data === window.YT?.PlayerState.PLAYING) {
      setIsPlaying(true)
      onPlay?.()
      startTimeUpdate()
    } else if (event.data === window.YT?.PlayerState.PAUSED) {
      setIsPlaying(false)
      onPause?.()
      stopTimeUpdate()
    } else if (event.data === window.YT?.PlayerState.ENDED) {
      setIsPlaying(false)
      onEnded?.()
      stopTimeUpdate()
    }
  }

  const startTimeUpdate = () => {
    if (intervalRef.current) return
    intervalRef.current = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        setCurrentTime(playerRef.current.getCurrentTime())
      }
    }, 100)
  }

  const stopTimeUpdate = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const handlePlayPause = () => {
    if (!playerRef.current) return

    if (isPlaying) {
      playerRef.current.pauseVideo()
    } else {
      playerRef.current.playVideo()
    }
  }

  const handleTimeUpdate = (value: number[]) => {
    if (playerRef.current && playerRef.current.seekTo) {
      playerRef.current.seekTo(value[0], true)
      setCurrentTime(value[0])
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    if (playerRef.current && playerRef.current.setVolume) {
      playerRef.current.setVolume(newVolume * 100)
    }
  }

  const formatTime = (seconds: number): string => {
    if (!Number.isFinite(seconds)) return "0:00"
    const minutes = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${minutes}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="w-full relative" ref={containerRef}>
      {/* Hidden YouTube Player */}
      <div id="youtube-player-vintage" style={{ display: "none" }} />

      {/* Vintage Record Player UI */}
      <div className="bg-[var(--player-bg)] rounded-lg shadow-2xl p-6 border-4 border-[var(--wood)]">
        {/* Top Section: Record and Tonearm */}
        <div className="flex items-center justify-center mb-6 relative">
          {/* Vinyl Record */}
          <div className="relative">
            <div
              className={`w-48 h-48 rounded-full bg-[var(--vinyl-black)] border-8 border-[var(--vinyl-black)] shadow-lg ${
                isPlaying ? "animate-vinyl" : ""
              }`}
              style={{
                background: "var(--vinyl-gradient)",
              }}
            >
              {/* Center Label */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-[var(--vinyl-label)] border-2 border-[var(--gold)] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[var(--vinyl-black)]" />
                </div>
              </div>
            </div>

            {/* Tonearm */}
            <div className="absolute -right-12 top-1/2 -translate-y-1/2 origin-left">
              <div
                className={`w-24 h-2 bg-[var(--chrome)] rounded-full shadow-md transition-transform duration-500 ${
                  isPlaying ? "rotate-0" : "-rotate-[25deg]"
                }`}
                style={{
                  background: "linear-gradient(to right, #c0c0c0, #e0e0e0, #c0c0c0)",
                }}
              >
                {/* Tonearm Needle */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[var(--gold)] rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4 bg-[var(--wood)] p-3 rounded border-2 border-[var(--gold)]">
          <div className="flex items-center gap-2">
            <span className="text-[var(--vinyl-label)] text-xs font-mono w-10 text-right">
              {formatTime(currentTime)}
            </span>
            <Slider
              value={[currentTime]}
              onValueChange={handleTimeUpdate}
              max={duration || 100}
              step={0.1}
              className="flex-1"
            />
            <span className="text-[var(--vinyl-label)] text-xs font-mono w-10">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-[var(--wood)] rounded-lg p-4 border-2 border-[var(--gold)]">
          {/* Transport Controls */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <Button
              variant="ghost"
              size="lg"
              className="h-12 w-12 rounded-full bg-[var(--chrome)] hover:bg-[var(--gold)] text-[var(--vinyl-black)] shadow-lg border-2 border-[var(--gold)]"
              onClick={onPrevious}
              disabled={!onPrevious}
            >
              <SkipBack size={20} />
            </Button>
            <Button
              size="lg"
              className="h-16 w-16 rounded-full bg-[var(--accent)] hover:bg-[var(--chrome)] text-[var(--vinyl-label)] shadow-xl border-4 border-[var(--gold)]"
              onClick={handlePlayPause}
              disabled={!videoId}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="h-12 w-12 rounded-full bg-[var(--chrome)] hover:bg-[var(--gold)] text-[var(--vinyl-black)] shadow-lg border-2 border-[var(--gold)]"
              onClick={onNext}
              disabled={!onNext}
            >
              <SkipForward size={20} />
            </Button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center justify-center gap-3">
            <Volume2 size={18} className="text-[var(--vinyl-label)]" />
            <Slider
              value={[volume]}
              onValueChange={handleVolumeChange}
              max={1}
              step={0.01}
              className="w-40"
            />
            <span className="text-[var(--vinyl-label)] text-xs font-mono w-8">
              {Math.round(volume * 100)}%
            </span>
          </div>
        </div>

        {/* Vintage Badge */}
        <div className="mt-4 text-center">
          <div className="inline-block bg-[var(--gold)] text-[var(--vinyl-black)] px-4 py-1 rounded-full text-xs font-bold border-2 border-[var(--chrome)] shadow-md">
            ⚡ VINTAGE STEREO ⚡
          </div>
        </div>
      </div>
    </div>
  )
}
