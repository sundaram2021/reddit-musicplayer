import { fetchSubredditPosts } from "@/lib/reddit-client"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const subreddit = searchParams.get("subreddit") || "listenothis"
    const sort = (searchParams.get("sort") || "hot") as "hot" | "new" | "top"
    const timeFrame = (searchParams.get("time") || "week") as any
    const limit = Number.parseInt(searchParams.get("limit") || "25")
    const after = searchParams.get("after") || undefined

    const result = await fetchSubredditPosts(subreddit, sort, timeFrame, limit, after)

    return NextResponse.json(result)
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}
