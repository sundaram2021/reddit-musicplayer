"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Search, Settings, X } from "lucide-react"
import type { FilterOptions } from "@/lib/playlist-filter"

interface SearchAndFilterProps {
  onSearch: (query: string) => void
  onFilter: (options: FilterOptions) => void
  onClear: () => void
  hasActiveFilters?: boolean
}

export function SearchAndFilter({ onSearch, onFilter, onClear, hasActiveFilters }: SearchAndFilterProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [minScore, setMinScore] = useState(0)
  const [maxScore, setMaxScore] = useState(100)
  const [sortBy, setSortBy] = useState<"score" | "date" | "comments" | "relevance">("score")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [source, setSource] = useState("all")
  const [hasImage, setHasImage] = useState(false)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    onSearch(query)
  }

  const handleApplyFilters = () => {
    onFilter({
      query: searchQuery,
      minScore,
      maxScore,
      sortBy,
      sortOrder,
      source: source as any,
      hasImage,
    })
  }

  return (
    <div className="border-b border-border px-4 py-3 space-y-2 bg-secondary">
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <Input
            placeholder="Search songs, artists..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-8 h-9 text-sm bg-background border-border"
          />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant={hasActiveFilters ? "default" : "ghost"}
              size="sm"
              className={`h-9 ${hasActiveFilters ? "bg-accent text-accent-foreground hover:bg-accent/90" : "hover:bg-muted"}`}
            >
              <Settings size={16} />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:w-96 bg-secondary border-border p-0 flex flex-col">
            <SheetHeader className="px-6 py-4 border-b border-border">
              <SheetTitle className="text-lg font-bold">Filter & Sort</SheetTitle>
              <SheetDescription className="text-xs text-muted-foreground">Customize your playlist view</SheetDescription>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto">
              <div className="space-y-6 px-6 py-4">
                {/* Sort By */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-foreground block">Sort By</Label>
                  <Select value={sortBy} onValueChange={(v) => setSortBy(v as any)}>
                    <SelectTrigger className="bg-background border-border h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-secondary border-border">
                      <SelectItem value="score">Score</SelectItem>
                      <SelectItem value="date">Date</SelectItem>
                      <SelectItem value="comments">Comments</SelectItem>
                      <SelectItem value="relevance">Relevance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort Order */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-foreground block">Order</Label>
                  <Select value={sortOrder} onValueChange={(v) => setSortOrder(v as any)}>
                    <SelectTrigger className="bg-background border-border h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-secondary border-border">
                      <SelectItem value="desc">Highest First</SelectItem>
                      <SelectItem value="asc">Lowest First</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Score Range */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-foreground block">Score Range</Label>
                  <div className="space-y-4 pt-2">
                    <div>
                      <span className="text-xs text-muted-foreground">Min: {minScore}</span>
                      <Slider
                        value={[minScore]}
                        onValueChange={([v]) => setMinScore(v)}
                        max={100}
                        step={5}
                        className="w-full mt-2"
                      />
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">Max: {maxScore}</span>
                      <Slider
                        value={[maxScore]}
                        onValueChange={([v]) => setMaxScore(v)}
                        max={1000}
                        step={10}
                        className="w-full mt-2"
                      />
                    </div>
                  </div>
                </div>

                {/* Source */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-foreground block">Source</Label>
                  <Select value={source} onValueChange={setSource}>
                    <SelectTrigger className="bg-background border-border h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-secondary border-border">
                      <SelectItem value="all">All Sources</SelectItem>
                      <SelectItem value="youtube">YouTube</SelectItem>
                      <SelectItem value="soundcloud">SoundCloud</SelectItem>
                      <SelectItem value="spotify">Spotify</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Has Image */}
                <div className="flex items-center gap-3 pt-2">
                  <Checkbox id="has-image" checked={hasImage} onCheckedChange={(v) => setHasImage(v === true)} />
                  <Label htmlFor="has-image" className="text-sm font-medium cursor-pointer">
                    Only with album art
                  </Label>
                </div>
              </div>
            </div>

            {/* Actions - Sticky Footer */}
            <div className="border-t border-border px-6 py-4 flex gap-2 bg-secondary">
              <Button variant="ghost" size="sm" onClick={onClear} className="flex-1 hover:bg-muted">
                Reset
              </Button>
              <Button
                onClick={handleApplyFilters}
                className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                size="sm"
              >
                Apply
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" className="h-9 hover:bg-muted" onClick={onClear}>
            <X size={16} />
          </Button>
        )}
      </div>
    </div>
  )
}
