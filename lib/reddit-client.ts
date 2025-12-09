/**
 * Reddit API Client
 * Handles all interactions with Reddit's JSON API
 */

const REDDIT_API_BASE = "https://www.reddit.com";
const USER_AGENT = "MusicPlayer/1.0 (by musicplayer-io)";

export interface RedditPost {
  id: string;
  title: string;
  author: string;
  score: number;
  created_utc: number;
  url: string;
  domain: string;
  media?: {
    oembed?: {
      thumbnail_url?: string;
    };
  };
  preview?: {
    images?: Array<{
      source?: {
        url?: string;
      };
    }>;
  };
  num_comments: number;
  permalink: string;
  subreddit: string;
}

interface RedditListing {
  data: {
    children: Array<{
      data: RedditPost;
    }>;
    after?: string;
    before?: string;
  };
}

interface RedditComment {
  id: string;
  author: string;
  body: string;
  score: number;
  created_utc: number;
  replies?: {
    data?: {
      children?: Array<{
        data?: RedditComment;
      }>;
    };
  };
}

export async function fetchSubredditPosts(
  subreddit: string,
  sort: "hot" | "new" | "top" = "hot",
  timeFrame: "hour" | "day" | "week" | "month" | "year" | "all" = "week",
  limit = 25,
  after?: string
): Promise<{
  posts: RedditPost[];
  after?: string;
  before?: string;
}> {
  try {
    // Handle custom/placeholder subreddit
    if (subreddit === "custom-reddit" || subreddit === "custom") {
      return { posts: [] };
    }

    // Normalize subreddit name
    const subredditName = subreddit.replace(/^r\//, "").trim();
    if (!subredditName) {
      throw new Error("Invalid subreddit name");
    }

    // Build URL with parameters
    const params = new URLSearchParams({
      limit: limit.toString(),
      raw_json: "1",
    });

    if (after) {
      params.append("after", after);
    }

    // Construct endpoint based on sort type
    let endpoint = `${REDDIT_API_BASE}/r/${subredditName}/${sort}.json`;
    if (sort === "top" || sort === "new") {
      endpoint += `?t=${timeFrame}&${params.toString()}`;
    } else {
      endpoint += `?${params.toString()}`;
    }

    const response = await fetch(endpoint, {
      headers: {
        "User-Agent": USER_AGENT,
      },
      next: { revalidate: 60 }, // Cache for 1 minute
    });

    if (!response.ok) {
      throw new Error(`Reddit API error: ${response.status}`);
    }

    const data: RedditListing = await response.json();
    const posts = data.data.children.map((child) => child.data);

    return {
      posts,
      after: data.data.after,
      before: data.data.before,
    };
  } catch (error) {
    console.error("Error fetching subreddit posts:", error);
    throw error;
  }
}

export async function fetchPostComments(
  subreddit: string,
  postId: string,
  limit = 50
): Promise<RedditComment[]> {
  try {
    const params = new URLSearchParams({
      limit: limit.toString(),
      raw_json: "1",
    });

    const url = `${REDDIT_API_BASE}/r/${subreddit}/comments/${postId}.json?${params.toString()}`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": USER_AGENT,
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error(`Reddit API error: ${response.status}`);
    }

    const data = await response.json();

    // Comments are in the second element of the array
    if (Array.isArray(data) && data[1]?.data?.children) {
      return parseComments(data[1].data.children);
    }

    return [];
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
}

function parseComments(
  comments: Array<{ data?: RedditComment }>
): RedditComment[] {
  return comments
    .filter((comment) => comment.data && comment.data.author !== "[deleted]")
    .map((comment) => {
      const data = comment.data!;
      return {
        id: data.id,
        author: data.author,
        body: data.body,
        score: data.score,
        created_utc: data.created_utc,
        replies: data.replies
          ? {
              data: {
                children: Array.isArray(data.replies?.data?.children)
                  ? data.replies.data.children
                  : [],
              },
            }
          : undefined,
      };
    });
}

export function getPostThumbnail(post: RedditPost): string {
  // Try to get thumbnail from preview
  if (post.preview?.images?.[0]?.source?.url) {
    const url = post.preview.images[0].source.url;
    // Decode HTML entities
    return url
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  }

  // Try media oembed thumbnail
  if (post.media?.oembed?.thumbnail_url) {
    return post.media.oembed.thumbnail_url;
  }

  return "";
}

export function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
}

export function formatTimeAgo(timestamp: number): string {
  const now = Math.floor(Date.now() / 1000);
  const seconds = now - timestamp;

  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return `${Math.floor(seconds / 604800)}w ago`;
}
