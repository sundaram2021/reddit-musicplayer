/**
 * SoundCloud Track API Route
 * Fetches track metadata from SoundCloud
 * Requires SOUNDCLOUD_CLIENT_ID environment variable
 */

import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const trackUrl = searchParams.get("url")

  if (!trackUrl) {
    return NextResponse.json({ error: "Track URL required" }, { status: 400 })
  }

  const clientId = process.env.SOUNDCLOUD_CLIENT_ID

  if (!clientId) {
    return NextResponse.json({ error: "SoundCloud API key not configured" }, { status: 500 })
  }

  try {
    const response = await fetch(
      `https://api.soundcloud.com/resolve?url=${encodeURIComponent(trackUrl)}&client_id=${clientId}`,
    )

    if (!response.ok) {
      return NextResponse.json({ error: "Track not found" }, { status: 404 })
    }

    const data = (await response.json()) as {
      id: number
      title: string
      user: { username: string }
      artwork_url: string | null
      duration: number
      permalink_url: string
    }

    return NextResponse.json({
      id: data.id,
      title: data.title,
      artist: data.user.username,
      artwork: data.artwork_url,
      duration: data.duration,
      url: data.permalink_url,
    })
  } catch (error) {
    console.error("SoundCloud API error:", error)
    return NextResponse.json({ error: "Failed to fetch track metadata" }, { status: 500 })
  }
}
