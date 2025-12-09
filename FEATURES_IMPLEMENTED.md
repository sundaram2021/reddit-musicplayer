# Reddit Music Player - Complete Feature Implementation

## Overview
This is a production-ready Next.js 16 application that fully replicates the reddit.musicplayer.io platform with all original features, including Reddit OAuth authentication, real-time music streaming, comments system, and advanced filtering.

## Core Features Implemented

### 1. Authentication (Reddit OAuth)
- **File**: `lib/reddit-auth.ts`, `components/auth/auth-button.tsx`
- Full Reddit OAuth2 integration
- Secure token management with localStorage
- User profile display with username
- Logout functionality
- Token expiration handling and automatic refresh

### 2. Subreddit Browser
- **File**: `components/subreddit/subreddit-browser.tsx`
- 60+ curated music subreddits across 10+ categories
- Comprehensive categories:
  - Listening Communities
  - Alternative (punk, grunge, post-punk, etc.)
  - Asian (k-pop, j-pop, c-pop, etc.)
  - Blues / Funk / Jazz / Country
  - Electronic / EDM (house, techno, dubstep, etc.)
  - Experimental (avant-garde, noise, etc.)
  - Hip Hop (rap, production, etc.)
  - Pop
  - Rock (indie, prog metal, psych rock, etc.)
  - Chill (lofi, ambient, downtempo, etc.)
  - Production (music production, audio engineering)
  - Other Genres
- Collapsible categories with expand/collapse
- Custom subreddit search
- Scroll area for browsing all subreddits

### 3. Playlist Management
- **File**: `components/playlist/playlist-view.tsx`
- Fetch posts from selected subreddit
- Sort options: Hot, New, Top
- Time frame filters: Today, This Week, This Month, This Year, All Time
- Advanced filtering by:
  - Score range (0-100000+)
  - Music source (YouTube, SoundCloud, Spotify, Bandcamp)
  - Date range
  - Has thumbnail filter
- Search within playlist
- Pagination support (infinite scroll or load more)
- Visual song item display with album art

### 4. Music Player
- **File**: `components/player/audio-player.tsx`
- YouTube embed integration via iframe API
- Play/Pause controls
- Skip forward/backward
- Progress bar with time scrubbing
- Duration display
- Volume control (0-100%)
- Repeat modes (off, repeat all, repeat one)
- Shuffle functionality
- Current time and total time display

### 5. Now Playing Card
- **File**: `components/player/now-playing-card.tsx`
- Large album artwork display
- Pulsing ring animation when playing
- Track title and artist
- Posted by (author)
- Subreddit attribution
- Score display
- Action buttons:
  - Upvote
  - Downvote
  - Comments
  - More options (share, add to playlist)

### 6. Mini Player
- **File**: `components/now-playing/mini-player.tsx`
- Floating mini player widget
- Shows when a song starts playing
- Appears in bottom-right corner
- Quick play/pause control
- Close button
- Shows thumbnail, title, and artist
- Unobtrusive when not needed

### 7. Context Menu
- **File**: `components/player/song-context-menu.tsx`
- Right-click menu on song items
- Options:
  - Open on Reddit (external link)
  - Share (native share or copy link)
  - Add to Favorites
  - Report
- Shows song metadata in menu header

### 8. Comments System
- **File**: `components/comments/comments-thread.tsx`
- Fetch Reddit comments for current post
- Threaded display with proper nesting
- Comment author and score
- Timestamp display
- Collapsible threads
- Limit to first 50 comments for performance
- Loading states and error handling

### 9. Dynamic Page Title
- **File**: `components/app-container.tsx`
- Browser tab title updates when playing
- Format: `"Song Title - Artist Name"`
- Falls back to "Music Player for Reddit" when nothing is playing
- Automatically updates on song change

### 10. SoundCloud Integration
- **File**: `app/api/soundcloud/track/route.ts`
- API route for SoundCloud track metadata
- Requires `SOUNDCLOUD_CLIENT_ID` environment variable
- Fetches track info, artwork, duration, and artist
- Error handling for invalid tracks

### 11. Search and Filter
- **File**: `components/playlist/search-and-filter.tsx`
- Text search across song titles
- Score range slider (0-100000+)
- Source filter (YouTube, SoundCloud, Spotify, Bandcamp, Vimeo)
- Date range filter
- Thumbnail presence filter
- Sort options (date, score, relevance)
- Quick presets for common filters
- Clear all filters button

### 12. Responsive Design
- **File**: `app/globals.css`, all components
- Mobile-first approach
- Sidebar collapses on mobile
- Playlist full-width on small screens
- Comments sidebar responsive width
- Touch-friendly controls
- Collapsible subreddit categories on mobile
- Header menu button for mobile navigation

### 13. Header & Navigation
- **File**: `components/layout/header.tsx`
- Application title with version (0.6.14)
- Menu button (mobile)
- Auth button (login/logout)
- Sticky header
- Dark theme styling

### 14. Performance Optimizations
- **Files**: All components
- SWR for data fetching and caching
- Memoized callbacks
- Lazy component loading
- Image optimization
- Debounced search
- Cache management
- Efficient rendering

## API Routes

### POST /api/reddit/posts
Fetches posts from a subreddit with filtering
**Query Parameters:**
- `subreddit`: Subreddit name (e.g., "listenothis")
- `sort`: "hot", "new", or "top"
- `timeframe`: "hour", "day", "week", "month", "year", "all"
- `limit`: Number of posts (default: 25)

### GET /api/reddit/comments
Fetches comments for a Reddit post
**Query Parameters:**
- `subreddit`: Subreddit name
- `postId`: Reddit post ID

### GET /api/soundcloud/track
Fetches SoundCloud track metadata
**Query Parameters:**
- `url`: SoundCloud track URL

## Environment Variables
\`\`\`
SOUNDCLOUD_CLIENT_ID=your_soundcloud_client_id
REDDIT_OAUTH_CLIENT_ID=your_reddit_client_id
REDDIT_OAUTH_REDIRECT_URI=http://localhost:3000/auth/callback
\`\`\`

## Technology Stack
- Next.js 16 (App Router)
- React 19.2
- TypeScript
- Tailwind CSS v4
- shadcn/ui components
- SWR for data fetching
- Lucide icons
- YouTube iframe API
- Reddit public API (no authentication required for read)

## File Structure
\`\`\`
components/
├── app-container.tsx (main orchestrator)
├── auth/
│   └── auth-button.tsx
├── player/
│   ├── audio-player.tsx
│   ├── now-playing-card.tsx
│   └── song-context-menu.tsx
├── playlist/
│   ├── playlist-view.tsx
│   ├── song-item.tsx
│   └── search-and-filter.tsx
├── subreddit/
│   └── subreddit-browser.tsx
├── comments/
│   ├── comments-thread.tsx
│   └── comment-item.tsx
├── now-playing/
│   └── mini-player.tsx
├── layout/
│   └── header.tsx
└── ui/
    └── shadcn components

lib/
├── reddit-auth.ts
├── reddit-subreddits.ts
├── reddit-client.ts
├── playlist-filter.ts
└── constants.ts

app/
├── api/
│   ├── reddit/
│   │   ├── posts/route.ts
│   │   ├── comments/route.ts
│   │   └── search/route.ts
│   └── soundcloud/
│       └── track/route.ts
├── layout.tsx
├── page.tsx
└── globals.css
\`\`\`

## How to Use

### Installation
\`\`\`bash
npm install
\`\`\`

### Development
\`\`\`bash
npm run dev
\`\`\`

### Build
\`\`\`bash
npm run build
npm start
\`\`\`

### Configuration
1. Create `.env.local` with SoundCloud API key
2. Optional: Add Reddit OAuth credentials for authentication

## Future Enhancements
- Playlist creation and sharing
- User favorites/bookmarks
- Audio visualization
- Keyboard shortcuts (space to play, arrows to skip)
- Dark/light theme toggle
- Spotify playlist export
- Local storage persistence
- Advanced lyrics display
- Genre tagging system
- User preferences storage
- PWA support

## Notes
- Reddit API is public and doesn't require authentication for reading posts/comments
- SoundCloud API key is optional (graceful degradation if not provided)
- YouTube player uses embed API for security and performance
- All timestamps are formatted in human-readable format
- Comments are limited to 50 per post for performance

## Deployment
Ready to deploy to Vercel with one-click integration:
\`\`\`bash
vercel deploy
\`\`\`

No special configuration needed - environment variables can be added through Vercel dashboard.
