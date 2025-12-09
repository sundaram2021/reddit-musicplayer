"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Play, Pause } from "lucide-react"

interface MiniPlayerProps {
  isVisible: boolean
  onClose: () => void
  title?: string
  artist?: string
  thumbnail?: string
  isPlaying?: boolean
  onPlayPause?: () => void
}

export function MiniPlayer({
  isVisible,
  onClose,
  title = "No Song",
  artist = "Unknown",
  thumbnail,
  isPlaying = false,
  onPlayPause,
}: MiniPlayerProps) {
  const [showMini, setShowMini] = useState(isVisible)

  useEffect(() => {
    setShowMini(isVisible)
  }, [isVisible])

  if (!showMini) return null

  return (
    <div className="fixed bottom-20 right-4 z-30 w-72">
      <Card className="bg-secondary border-border shadow-lg overflow-hidden">
        <div className="flex gap-3 p-3">
          {/* Thumbnail */}
          <div className="w-16 h-16 flex-shrink-0 rounded bg-muted overflow-hidden">
            {thumbnail ? (
              <img src={thumbnail || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/20" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 flex flex-col justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground truncate">{title}</p>
              <p className="text-xs text-muted-foreground truncate">{artist}</p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 pt-1">
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0 hover:bg-muted" onClick={onPlayPause}>
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              </Button>
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0 hover:bg-muted ml-auto" onClick={onClose}>
                <X size={14} />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
