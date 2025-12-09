import { fetchPostComments } from "@/lib/reddit-client"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const subreddit = searchParams.get("subreddit") || ""
    const postId = searchParams.get("postId") || ""
    const limit = Number.parseInt(searchParams.get("limit") || "50")

    if (!subreddit || !postId) {
      return NextResponse.json({ error: "Missing subreddit or postId" }, { status: 400 })
    }

    const comments = await fetchPostComments(subreddit, postId, limit)

    return NextResponse.json({ comments })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 })
  }
}
