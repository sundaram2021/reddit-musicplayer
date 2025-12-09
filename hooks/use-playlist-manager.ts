"use client"

import { useCallback, useState } from "react"

export interface PlaylistTrack {
  id: string
  title: string
  artist: string
  subreddit: string
  author: string
  score: number
  youtubeId?: string
  image?: string
  url: string
}

export function usePlaylistManager() {
  const [playlist, setPlaylist] = useState<PlaylistTrack[]>([])
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)

  const addTrack = useCallback((track: PlaylistTrack) => {
    setPlaylist((prev) => [...prev, track])
  }, [])

  const removeTrack = useCallback(
    (index: number) => {
      setPlaylist((prev) => prev.filter((_, i) => i !== index))
      if (currentTrackIndex >= playlist.length - 1) {
        setCurrentTrackIndex(Math.max(0, currentTrackIndex - 1))
      }
    },
    [currentTrackIndex, playlist.length],
  )

  const clearPlaylist = useCallback(() => {
    setPlaylist([])
    setCurrentTrackIndex(0)
  }, [])

  const moveTrack = useCallback((fromIndex: number, toIndex: number) => {
    setPlaylist((prev) => {
      const newPlaylist = [...prev]
      const [movedTrack] = newPlaylist.splice(fromIndex, 1)
      newPlaylist.splice(toIndex, 0, movedTrack)
      return newPlaylist
    })
  }, [])

  const playNext = useCallback(() => {
    if (currentTrackIndex < playlist.length - 1) {
      setCurrentTrackIndex((prev) => prev + 1)
    }
  }, [currentTrackIndex, playlist.length])

  const playPrevious = useCallback(() => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex((prev) => prev - 1)
    }
  }, [currentTrackIndex])

  const jumpToTrack = useCallback(
    (index: number) => {
      if (index >= 0 && index < playlist.length) {
        setCurrentTrackIndex(index)
      }
    },
    [playlist.length],
  )

  return {
    playlist,
    currentTrackIndex,
    currentTrack: playlist[currentTrackIndex],
    addTrack,
    removeTrack,
    clearPlaylist,
    moveTrack,
    playNext,
    playPrevious,
    jumpToTrack,
  }
}
