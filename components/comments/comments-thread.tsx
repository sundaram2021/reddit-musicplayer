"use client"

import { useEffect, useState } from "react"
import useSWR from "swr"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader, MessageSquare } from "lucide-react"
import { CommentItem } from "./comment-item"

interface CommentsThreadProps {
  subreddit: string
  postId: string
  postTitle?: string
}

export interface Comment {
  id: string
  author: string
  body: string
  score: number
  created_utc: number
  depth?: number
  replies?: Comment[]
}

export function CommentsThread({ subreddit, postId, postTitle }: CommentsThreadProps) {
  const [displayedComments, setDisplayedComments] = useState<Comment[]>([])

  // Fetch comments from API
  const { data, isLoading, error } = useSWR(
    postId ? `/api/reddit/comments?subreddit=${subreddit}&postId=${postId}` : null,
    async (url) => {
      const res = await fetch(url)
      if (!res.ok) throw new Error("Failed to fetch comments")
      return res.json()
    },
    { revalidateOnFocus: false },
  )

  useEffect(() => {
    if (data?.comments) {
      // Flatten comments tree structure for display
      const comments = flattenComments(data.comments)
      setDisplayedComments(comments.slice(0, 50)) // Limit to first 50
    }
  }, [data])

  const flattenComments = (comments: Comment[], depth = 0): Comment[] => {
    const flattened: Comment[] = []
    for (const comment of comments) {
      flattened.push({ ...comment, depth })
      if (comment.replies?.length) {
        flattened.push(...flattenComments(comment.replies, depth + 1))
      }
    }
    return flattened
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border px-4 py-3 bg-secondary sticky top-0 z-10">
        <h2 className="text-sm font-bold flex items-center gap-2">
          <MessageSquare size={16} />
          Comments
        </h2>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex-1 flex items-center justify-center">
          <Loader className="animate-spin text-accent" size={24} />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex-1 flex items-center justify-center p-4">
          <p className="text-xs text-muted-foreground text-center">Failed to load comments</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && displayedComments.length === 0 && (
        <div className="flex-1 flex items-center justify-center p-4">
          <p className="text-xs text-muted-foreground text-center">No comments yet</p>
        </div>
      )}

      {/* Comments List */}
      {!isLoading && (
        <ScrollArea className="flex-1">
          <div className="divide-y divide-border">
            {displayedComments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} depth={comment.depth || 0} />
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  )
}
