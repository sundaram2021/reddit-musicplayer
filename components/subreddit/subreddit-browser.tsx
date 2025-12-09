"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Loader, ChevronDown, ChevronRight } from "lucide-react"

export interface Subreddit {
  name: string
  path: string
  category: string
}

interface SubredditBrowserProps {
  categories: Record<string, Subreddit[]>
  selectedSubreddit?: string
  onSelect: (subreddit: string) => void
  onSearch: (query: string) => void
  loading?: boolean
}

export function SubredditBrowser({
  categories,
  selectedSubreddit,
  onSelect,
  onSearch,
  loading,
}: SubredditBrowserProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(Object.keys(categories)))

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim())
      onSelect(`r/${searchQuery.trim()}`)
      setSearchQuery("")
    }
  }

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(category)) {
      newExpanded.delete(category)
    } else {
      newExpanded.add(category)
    }
    setExpandedCategories(newExpanded)
  }

  return (
    <div className="h-full flex flex-col bg-secondary">
      {/* Header & Search */}
      <div className="p-4 border-b border-border space-y-3 flex-shrink-0">
        <h2 className="text-sm font-bold text-foreground">Browse Subreddits</h2>
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            placeholder="Search Reddit"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-sm h-9 bg-background border-border"
            disabled={loading}
          />
          <Button
            type="submit"
            size="sm"
            className="bg-accent hover:bg-accent/90 text-accent-foreground flex-shrink-0"
            disabled={loading}
          >
            {loading ? <Loader size={16} className="animate-spin" /> : <Search size={16} />}
          </Button>
        </form>
      </div>

      {/* Subreddit Categories */}
      <ScrollArea className="flex-1 px-4 py-2">
        <div className="space-y-2 pr-4">
          {Object.entries(categories).map(([category, subreddits]) => (
            <div key={category}>
              <Button
                variant="ghost"
                className="w-full justify-start text-xs font-bold text-muted-foreground hover:text-accent px-2 h-7 mb-1"
                onClick={() => toggleCategory(category)}
              >
                {expandedCategories.has(category) ? (
                  <ChevronDown size={14} className="mr-1" />
                ) : (
                  <ChevronRight size={14} className="mr-1" />
                )}
                {category}
              </Button>

              {expandedCategories.has(category) && (
                <div className="space-y-1">
                  {subreddits.map((subreddit) => (
                    <Button
                      key={subreddit.path}
                      variant={selectedSubreddit === subreddit.path ? "default" : "ghost"}
                      className={`w-full justify-start text-sm h-8 ${
                        selectedSubreddit === subreddit.path
                          ? "bg-accent text-accent-foreground"
                          : "text-foreground hover:bg-muted"
                      }`}
                      onClick={() => onSelect(subreddit.path)}
                      disabled={loading}
                    >
                      {subreddit.name}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
