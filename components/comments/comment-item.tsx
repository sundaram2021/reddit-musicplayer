"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ChevronDown, ChevronRight } from "lucide-react"
import { formatTimeAgo } from "@/lib/reddit-client"

interface CommentItemProps {
  comment: {
    id: string
    author: string
    body: string
    score: number
    created_utc: number
    replies?: any[]
  }
  depth: number
}

export function CommentItem({ comment, depth }: CommentItemProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const isReply = depth > 0

  if (!isExpanded && isReply) {
    return (
      <div className="p-3 hover:bg-muted/30 transition-colors cursor-pointer" onClick={() => setIsExpanded(true)}>
        <div className="flex items-center gap-2">
          <ChevronRight size={14} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground">[{comment.author}]</span>
          <span className="text-xs text-muted-foreground truncate">{comment.body.substring(0, 50)}...</span>
        </div>
      </div>
    )
  }

  return (
    <div
      className="border-l-2 border-border hover:bg-muted/20 transition-colors"
      style={{ marginLeft: `${depth * 8}px` }}
    >
      <div className="p-3 space-y-1">
        {/* Author & Meta */}
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2 min-w-0">
            {isReply && (
              <Button
                variant="ghost"
                size="sm"
                className="h-5 w-5 p-0 flex-shrink-0 hover:bg-muted"
                onClick={() => setIsExpanded(false)}
              >
                <ChevronDown size={12} />
              </Button>
            )}
            <div className="truncate">
              <a href={`https://reddit.com/user/${comment.author}`} target="_blank" rel="noopener noreferrer">
                <span className="text-xs font-semibold text-accent hover:underline">{comment.author}</span>
              </a>
              <span className="text-xs text-muted-foreground ml-1">{formatTimeAgo(comment.created_utc)}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <ThumbsUp size={12} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{comment.score}</span>
          </div>
        </div>

        {/* Comment Body */}
        <p className="text-xs text-foreground leading-relaxed line-clamp-3 break-words">{comment.body}</p>

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs hover:bg-muted">
            Reply
          </Button>
          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs hover:bg-muted">
            Share
          </Button>
        </div>
      </div>
    </div>
  )
}
