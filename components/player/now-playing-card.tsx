"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SongContextMenu } from "./song-context-menu"
import { ThumbsUp, ThumbsDown, MessageCircle, Share2, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface NowPlayingCardProps {
  title: string
  artist: string
  subreddit: string
  score: number
  author: string
  thumbnail?: string
  isPlaying?: boolean
  postUrl?: string
}

export function NowPlayingCard({
  title,
  artist,
  subreddit,
  score,
  author,
  thumbnail,
  isPlaying,
  postUrl,
}: NowPlayingCardProps) {
  const [pulse, setPulse] = useState(false)

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => setPulse((p) => !p), 600)
      return () => clearInterval(interval)
    }
  }, [isPlaying])

  return (
    <SongContextMenu title={title} author={artist} subreddit={subreddit} postUrl={postUrl}>
      <Card className="bg-secondary border-border cursor-context-menu">
        <CardContent className="p-4 space-y-3">
          {/* Album Art */}
          <div
            className={`w-full aspect-square rounded-lg bg-muted overflow-hidden flex items-center justify-center ${
              isPlaying ? (pulse ? "ring-2 ring-accent" : "ring-2 ring-accent/50") : ""
            } transition-all duration-300`}
          >
            {thumbnail ? (
              <img src={thumbnail || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center">
                <span className="text-xs text-muted-foreground text-center px-4">No album art</span>
              </div>
            )}
          </div>

          {/* Track Info */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm text-foreground line-clamp-2">{title}</h3>
            <p className="text-xs text-muted-foreground">{artist}</p>
          </div>

          {/* Metadata */}
          <div className="space-y-1 pt-2 border-t border-border">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Posted by</span>
              <span className="text-accent font-medium">{author}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Subreddit</span>
              <span className="text-accent font-medium">r/{subreddit}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Score</span>
              <Badge variant="outline" className="text-accent border-accent">
                {score} points
              </Badge>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-4 gap-2 pt-3 border-t border-border">
            <Button variant="ghost" size="sm" className="h-8 text-xs hover:bg-muted hover:text-accent" title="Upvote">
              <ThumbsUp size={16} />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 text-xs hover:bg-muted hover:text-accent" title="Downvote">
              <ThumbsDown size={16} />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 text-xs hover:bg-muted hover:text-accent" title="Comments">
              <MessageCircle size={16} />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 text-xs hover:bg-muted hover:text-accent">
                  <MoreVertical size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => window.open(postUrl, "_blank")}>
                  <Share2 size={14} className="mr-2" />
                  Share
                </DropdownMenuItem>
                <DropdownMenuItem>Copy Link</DropdownMenuItem>
                <DropdownMenuItem>Add to Playlist</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
    </SongContextMenu>
  )
}
