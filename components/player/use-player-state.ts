"use client"

import { useState, useCallback } from "react"

export interface PlaylistItem {
  id: string
  title: string
  artist: string
  source: "youtube" | "soundcloud" | "spotify"
  sourceUrl: string
  thumbnail?: string
  subreddit: string
  author: string
  score: number
  youtubeId?: string
}

export function usePlayerState() {
  const [playlist, setPlaylist] = useState<PlaylistItem[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [repeatMode, setRepeatMode] = useState<"off" | "all" | "one">("off")
  const [isShuffle, setIsShuffle] = useState(false)

  const currentTrack = playlist[currentIndex]

  const play = useCallback(() => {
    setIsPlaying(true)
  }, [])

  const pause = useCallback(() => {
    setIsPlaying(false)
  }, [])

  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev)
  }, [])

  const next = useCallback(() => {
    if (!playlist.length) return

    let newIndex = currentIndex + 1
    if (newIndex >= playlist.length) {
      if (repeatMode === "all") {
        newIndex = 0
      } else {
        newIndex = currentIndex
      }
    }
    setCurrentIndex(newIndex)
  }, [currentIndex, playlist.length, repeatMode])

  const previous = useCallback(() => {
    if (!playlist.length) return
    const newIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }, [currentIndex, playlist.length])

  const toggleRepeat = useCallback(() => {
    setRepeatMode((prev) => {
      if (prev === "off") return "all"
      if (prev === "all") return "one"
      return "off"
    })
  }, [])

  const toggleShuffle = useCallback(() => {
    setIsShuffle((prev) => !prev)
    if (!isShuffle && playlist.length > 1) {
      // Shuffle the playlist
      const shuffled = [...playlist].sort(() => Math.random() - 0.5)
      setPlaylist(shuffled)
    }
  }, [isShuffle, playlist])

  const addToPlaylist = useCallback((track: PlaylistItem) => {
    setPlaylist((prev) => [...prev, track])
  }, [])

  const clearPlaylist = useCallback(() => {
    setPlaylist([])
    setCurrentIndex(0)
    setIsPlaying(false)
  }, [])

  const jumpToTrack = useCallback(
    (index: number) => {
      if (index >= 0 && index < playlist.length) {
        setCurrentIndex(index)
        setIsPlaying(true)
      }
    },
    [playlist.length],
  )

  return {
    playlist,
    setPlaylist,
    currentTrack,
    currentIndex,
    isPlaying,
    repeatMode,
    isShuffle,
    play,
    pause,
    togglePlayPause,
    next,
    previous,
    toggleRepeat,
    toggleShuffle,
    addToPlaylist,
    clearPlaylist,
    jumpToTrack,
  }
}
