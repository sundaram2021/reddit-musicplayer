"use client"

import { Button } from "@/components/ui/button"
import { Shuffle, Repeat, Filter } from "lucide-react"

interface PlaylistControlsProps {
  onShuffle?: () => void
  onRepeat?: () => void
  onFilter?: () => void
  repeatMode?: "off" | "all" | "one"
}

export function PlaylistControls({ onShuffle, onRepeat, onFilter, repeatMode = "off" }: PlaylistControlsProps) {
  return (
    <div className="flex items-center gap-1">
      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-muted" onClick={onShuffle} title="Shuffle">
        <Shuffle size={16} />
      </Button>

      <Button
        variant={repeatMode !== "off" ? "default" : "ghost"}
        size="sm"
        className={`h-8 w-8 p-0 ${repeatMode !== "off" ? "bg-accent text-accent-foreground hover:bg-accent/90" : "hover:bg-muted"}`}
        onClick={onRepeat}
        title="Repeat"
      >
        <Repeat size={16} />
      </Button>

      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-muted" onClick={onFilter} title="Filter">
        <Filter size={16} />
      </Button>
    </div>
  )
}
