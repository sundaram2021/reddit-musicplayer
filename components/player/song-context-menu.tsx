"use client"

import type React from "react"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
} from "@/components/ui/context-menu"
import { ExternalLink, Share2, Flag, Heart } from "lucide-react"

interface SongContextMenuProps {
  title: string
  author: string
  subreddit: string
  postUrl?: string
  children: React.ReactNode
}

export function SongContextMenu({ title, author, subreddit, postUrl, children }: SongContextMenuProps) {
  const handleOpenReddit = () => {
    if (postUrl) {
      window.open(postUrl, "_blank")
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title,
        text: `Check out "${title}" by ${author} from r/${subreddit}`,
      })
    } else {
      const url = postUrl || window.location.href
      const text = `"${title}" by ${author}`
      navigator.clipboard.writeText(`${text}\n${url}`)
    }
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <div className="px-2 py-1.5">
          <p className="text-sm font-semibold truncate text-foreground">{title}</p>
          <p className="text-xs text-muted-foreground">{author}</p>
          <p className="text-xs text-accent">r/{subreddit}</p>
        </div>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={handleOpenReddit} disabled={!postUrl}>
          <ExternalLink size={14} className="mr-2" />
          <span>Open on Reddit</span>
        </ContextMenuItem>
        <ContextMenuItem onClick={handleShare}>
          <Share2 size={14} className="mr-2" />
          <span>Share</span>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <Heart size={14} className="mr-2" />
          <span>Add to Favorites</span>
        </ContextMenuItem>
        <ContextMenuItem>
          <Flag size={14} className="mr-2" />
          <span>Report</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
