"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader } from "lucide-react"

interface CommentComposerProps {
  onSubmit: (text: string) => Promise<void>
  isLoading?: boolean
  placeholder?: string
}

export function CommentComposer({ onSubmit, isLoading, placeholder = "Add a comment..." }: CommentComposerProps) {
  const [text, setText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!text.trim()) return

    setIsSubmitting(true)
    try {
      await onSubmit(text)
      setText("")
    } catch (error) {
      console.error("Failed to submit comment:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isDisabled = isSubmitting || isLoading || !text.trim()

  return (
    <div className="border-t border-border p-3 bg-secondary space-y-2">
      <Textarea
        placeholder={placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="text-xs h-16 bg-background border-border resize-none"
        disabled={isSubmitting || isLoading}
      />
      <div className="flex gap-2 justify-end">
        <Button variant="ghost" size="sm" onClick={() => setText("")} disabled={isDisabled} className="text-xs">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isDisabled}
          className="bg-accent hover:bg-accent/90 text-accent-foreground text-xs h-8"
        >
          {isSubmitting ? (
            <>
              <Loader size={12} className="animate-spin mr-1" />
              Posting...
            </>
          ) : (
            "Post Comment"
          )}
        </Button>
      </div>
    </div>
  )
}
