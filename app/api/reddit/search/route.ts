import { type NextRequest, NextResponse } from "next/server"
import { fetchSubredditPosts } from "@/lib/reddit-client"
import { filterAndSearchSongs } from "@/lib/playlist-filter"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get("q") || ""
    const subreddit = searchParams.get("subreddit") || "listenothis"
    const sort = (searchParams.get("sort") || "hot") as "hot" | "new" | "top"

    if (!query) {
      return NextResponse.json({ results: [] })
    }

    // Fetch posts from Reddit
    const { posts } = await fetchSubredditPosts(subreddit, sort, "all", 100)

    // Format posts for search
    const songs = posts.map((post) => ({
      id: post.id,
      title: post.title,
      author: post.author,
      score: post.score,
      comments: post.num_comments,
      source: post.domain,
      subreddit: post.subreddit,
      createdAt: new Date(post.created_utc * 1000),
    }))

    // Search and filter
    const results = filterAndSearchSongs(songs, { query })

    return NextResponse.json({ results })
  } catch (error) {
    console.error("Search API error:", error)
    return NextResponse.json({ error: "Failed to search" }, { status: 500 })
  }
}
