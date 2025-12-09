"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { SkipBack, Play, Pause, SkipForward, Volume2, RotateCcw } from "lucide-react"

interface AudioPlayerProps {
  videoId?: string
  onEnded?: () => void
  onPlay?: () => void
  onPause?: () => void
}

export function AudioPlayer({ videoId, onEnded, onPlay, onPause }: AudioPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)

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

    window.onYouTubeIframeAPIReady = handleYTReady
  }, [videoId])

  const initializePlayer = () => {
    if (!containerRef.current) return

    // Create iframe manually for better control
    const iframe = document.createElement("iframe")
    iframe.id = "youtube-player"
    iframe.width = "0"
    iframe.height = "0"
    iframe.src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1`
    iframe.frameBorder = "0"
    iframe.style.display = "none"

    containerRef.current.appendChild(iframe)
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    if (!isPlaying) {
      onPlay?.()
    } else {
      onPause?.()
    }
  }

  const handleTimeUpdate = (value: number[]) => {
    setCurrentTime(value[0])
  }

  const formatTime = (seconds: number): string => {
    if (!Number.isFinite(seconds)) return "0:00"
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="w-full" ref={containerRef}>
      <div className="bg-secondary border-t border-border px-3 py-2 space-y-2">
        {/* Progress Bar */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground w-10 text-right">{formatTime(currentTime)}</span>
          <Slider
            value={[currentTime]}
            onValueChange={handleTimeUpdate}
            max={duration || 100}
            step={1}
            className="flex-1"
          />
          <span className="text-xs text-muted-foreground w-10">{formatTime(duration)}</span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-muted">
              <SkipBack size={16} />
            </Button>
            <Button
              variant="default"
              size="sm"
              className="h-8 w-8 p-0 bg-accent hover:bg-accent/90"
              onClick={handlePlayPause}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-muted">
              <SkipForward size={16} />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-muted">
              <RotateCcw size={16} />
            </Button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <Volume2 size={16} className="text-muted-foreground" />
            <Slider
              value={[volume]}
              onValueChange={(value) => setVolume(value[0])}
              max={1}
              step={0.01}
              className="w-24"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
