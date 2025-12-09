"use client"

import type React from "react"

import { Component, type ReactNode } from "react"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex flex-col items-center justify-center gap-3 p-8 bg-destructive/10 rounded-lg border border-destructive">
            <AlertCircle className="text-destructive" size={32} />
            <h3 className="font-semibold text-foreground">Something went wrong</h3>
            <p className="text-sm text-muted-foreground max-w-sm text-center">{this.state.error?.message}</p>
            <Button onClick={this.handleReset} size="sm" className="mt-2">
              Try Again
            </Button>
          </div>
        )
      )
    }

    return this.props.children
  }
}
