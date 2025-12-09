"use client"

import { Loader } from "lucide-react"

interface LoadingSpinnerProps {
  size?: number
  message?: string
}

export function LoadingSpinner({ size = 32, message }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8">
      <Loader className="animate-spin text-accent" size={size} />
      {message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  )
}
