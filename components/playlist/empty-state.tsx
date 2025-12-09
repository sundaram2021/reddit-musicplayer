"use client"

import { Music } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  title?: string
  description?: string
  onRetry?: () => void
}

export function EmptyState({ title = "No songs found", description, onRetry }: EmptyStateProps) {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Music className="text-muted-foreground" size={48} />
        </div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {description && <p className="text-sm text-muted-foreground max-w-sm">{description}</p>}
        {onRetry && (
          <Button onClick={onRetry} size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            Try Again
          </Button>
        )}
      </div>
    </div>
  )
}
