# Reddit Music Player - Implementation Guide

## Overview

This is a production-ready Next.js 16 application that replicates the Reddit Music Player functionality. The app streams music from Reddit communities and integrates with YouTube, SoundCloud, and Spotify.

## Architecture

### Core Structure

- **`components/`** - React components organized by feature
  - `app-container.tsx` - Main application wrapper
  - `player/` - Audio player and now-playing components
  - `playlist/` - Playlist view and song items
  - `subreddit/` - Subreddit browser and navigation
  - `comments/` - Comments thread and display
  - `common/` - Shared UI components (loading, errors)

- **`app/`** - Next.js 16 App Router pages and API routes
  - `api/reddit/` - API routes for Reddit integration
  - `api/reddit/posts` - Fetch subreddit posts
  - `api/reddit/comments` - Fetch post comments
  - `api/reddit/search` - Search and filter songs

- **`lib/`** - Utility functions and business logic
  - `reddit-client.ts` - Reddit API client
  - `music-source-parser.ts` - Extract music metadata
  - `playlist-filter.ts` - Search and filter utilities
  - `constants.ts` - Application constants

- **`hooks/`** - Custom React hooks
  - `use-player-state.ts` - Player state management
  - `use-playlist-manager.ts` - Playlist management
  - `use-debounce.ts` - Debounce utility
  - `use-local-storage.ts` - LocalStorage integration

## Key Features

### 1. Reddit Integration
- Fetch posts from any subreddit via Reddit's JSON API
- Cache responses for 1 minute to reduce API calls
- Support for multiple sort options (hot, new, top)

### 2. Music Player
- YouTube, SoundCloud, and Spotify integration
- Play/pause, skip, and progress controls
- Volume adjustment
- Repeat modes (off, all, one)
- Shuffle functionality

### 3. Playlist Management
- Add/remove tracks
- Reorder tracks
- Jump to specific track
- Persistent state with localStorage

### 4. Search & Filtering
- Full-text search across title, artist, subreddit
- Filter by score range, date range, and source
- Sort by score, date, comments, or relevance
- Real-time search with debouncing

### 5. Comments System
- Display Reddit comments with threading
- Collapsible nested replies
- Show score, author, and timestamp
- Reply functionality (UI placeholder)

### 6. Responsive Design
- Mobile-first approach
- Sidebar collapses on smaller screens
- Touch-friendly controls
- Optimized for all screen sizes

## Performance Optimizations

- **React Compiler**: Enabled for automatic memoization
- **Cache Components**: Built-in caching at component level
- **SWR**: Client-side data fetching with cache and revalidation
- **Image Optimization**: Remote image patterns for Reddit/YouTube
- **Debouncing**: Delayed search to reduce API calls
- **Memoization**: Utility functions for expensive computations

## API Routes

### GET /api/reddit/posts
Fetch posts from a subreddit with sorting and pagination.

Query Parameters:
- `subreddit` - Subreddit name (required)
- `sort` - Sort type: hot, new, top (default: hot)
- `time` - Time frame for top: hour, day, week, month, year, all
- `limit` - Number of posts (default: 25)
- `after` - Pagination cursor

### GET /api/reddit/comments
Fetch comments for a specific post.

Query Parameters:
- `subreddit` - Subreddit name (required)
- `postId` - Post ID (required)
- `limit` - Number of comments (default: 50)

### GET /api/reddit/search
Search and filter posts across subreddits.

Query Parameters:
- `q` - Search query (required)
- `subreddit` - Subreddit name (default: listenothis)
- `sort` - Sort type

## Data Flow

1. User selects subreddit → Fetches posts from Reddit API
2. Posts are converted to song objects with metadata
3. User searches/filters → Filter utilities process songs
4. User clicks song → Sets current track in player
5. Player emits YouTube video ID → Audio plays
6. Comments loaded for current song → Display in thread
7. User can scroll, search, and navigate playlist

## Styling

- **Color System**: Dark theme with amber accent (Tailwind v4 oklch colors)
- **Typography**: Geist font family for consistency
- **Layout**: Flexbox-based responsive design
- **Components**: shadcn/ui components with custom theming

## Configuration

### Environment Variables
No external API keys required - Reddit's JSON API is public!

### Tailwind CSS v4
All styling uses Tailwind's utility classes with custom semantic tokens defined in `globals.css`.

## Development

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
\`\`\`

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome)

## Future Enhancements

- User authentication with Reddit OAuth
- Playlist saving and sharing
- Comment creation with Reddit account
- Audio visualization
- Keyboard shortcuts
- Playlist export/import
- Advanced filtering with genre tags
- User preferences and themes
\`\`\`

```json file="" isHidden
