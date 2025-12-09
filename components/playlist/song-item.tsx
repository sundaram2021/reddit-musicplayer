"use client"

import { MessageCircle, Play } from "lucide-react"

interface SongItemProps {
  song: {
    id: string
    title: string
    year: number
    score: number
    author: string
    subreddit: string
    timeAgo: string
    source: string
    comments: number
    image: string
  }
  isSelected?: boolean
  onClick: () => void
}

export function SongItem({ song, isSelected, onClick }: SongItemProps) {
  return (
    <div
      className={`px-4 py-3 border-b border-border hover:bg-muted/50 cursor-pointer transition-colors group ${
        isSelected ? "bg-accent/10 border-l-2 border-l-accent" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex gap-3">
        {/* Album Art */}
        <div className="w-16 h-16 rounded bg-muted flex-shrink-0 overflow-hidden relative group/image">
          {song.image ? (
            <img src={song.image || "/placeholder.svg"} alt={song.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
              <Play size={20} className="text-accent/40" />
            </div>
          )}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center">
            <Play size={24} className="text-white" fill="white" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-accent transition-colors">
            {song.title}
          </h3>
          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground flex-wrap">
            <span className="text-accent font-semibold">{song.score}</span>
            <span>•</span>
            <span className="text-accent hover:underline">{song.author}</span>
            <span>in</span>
            <span className="text-accent hover:underline">r/{song.subreddit}</span>
            <span>•</span>
            <span className="whitespace-nowrap">{song.timeAgo}</span>
            <span>•</span>
            <span className="text-muted-foreground/70">{song.source}</span>
          </div>
          <div className="flex items-center gap-2 mt-2 text-xs">
            <button className="hover:text-accent transition-colors flex items-center gap-1">
              <MessageCircle size={14} />
              <span className="text-muted-foreground">{song.comments}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
