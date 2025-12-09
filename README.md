# Music Player for Reddit

A production-ready, feature-complete music streaming application that aggregates music posts from Reddit subreddits. Built with Next.js 16, React 19, TypeScript, and shadcn/ui.

## Features

✨ **Complete Feature Set**
- Reddit OAuth authentication
- 60+ curated music subreddits across 12 categories
- YouTube, SoundCloud, Spotify, Bandcamp, Vimeo support
- Real-time music playback with progress tracking
- Advanced filtering and search
- Threaded comments system
- Dynamic browser title (now playing)
- Context menus with metadata
- Mini player widget
- Responsive mobile-first design

🎵 **Music Player**
- YouTube iframe integration
- Play/pause/skip controls
- Volume control with slider
- Progress bar with time scrubbing
- Repeat modes (off, all, one)
- Shuffle functionality
- Visual album artwork with pulsing animation

🔍 **Discovery & Filtering**
- Search across subreddits
- Filter by score range, source, date
- Sort by hot, new, top
- Time frame selection (today, week, month, year)
- Quick filter presets

💬 **Social Features**
- Reddit comments thread
- Upvote/downvote buttons
- Share functionality
- Context menus (right-click)
- Song metadata display

📱 **Responsive Design**
- Mobile-first approach
- Collapsible sidebar
- Touch-friendly controls
- Optimized for all screen sizes

## Quick Start

### Installation
\`\`\`bash
git clone https://github.com/musicplayer-io/redditmusicplayer-nextjs
cd redditmusicplayer-nextjs
npm install
\`\`\`

### Development
\`\`\`bash
npm run dev
\`\`\`
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build & Deploy
\`\`\`bash
npm run build
npm start
\`\`\`

## Configuration

### Environment Variables
Create `.env.local`:
\`\`\`env
# Optional: SoundCloud integration
SOUNDCLOUD_CLIENT_ID=your_soundcloud_client_id

# Optional: Reddit OAuth
NEXT_PUBLIC_REDDIT_CLIENT_ID=your_reddit_client_id
REDDIT_OAUTH_REDIRECT_URI=http://localhost:3000/auth/callback
\`\`\`

## Project Structure
\`\`\`
├── app/
│   ├── api/              # API routes (Reddit, SoundCloud)
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/
│   ├── app-container.tsx # Main app logic
│   ├── auth/             # Authentication
│   ├── player/           # Music player
│   ├── playlist/         # Playlist management
│   ├── subreddit/        # Subreddit browser
│   ├── comments/         # Comments system
│   ├── now-playing/      # Now playing display
│   ├── layout/           # Layout components
│   └── ui/               # shadcn/ui components
└── lib/
    ├── reddit-auth.ts    # OAuth handling
    ├── reddit-subreddits.ts  # Subreddit list
    ├── reddit-client.ts  # API client
    ├── playlist-filter.ts    # Filtering logic
    └── constants.ts      # App constants
\`\`\`

## Technologies

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19.2 with TypeScript
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui
- **Data Fetching**: SWR with caching
- **Icons**: Lucide React
- **Video**: YouTube iframe API

## Features Breakdown

### 1. Subreddit Browser
Browse 60+ curated music subreddits across 12 categories:
- Listening Communities
- Alternative (punk, grunge, emo, ska)
- Asian (k-pop, j-pop, c-pop)
- Blues / Funk / Jazz / Country
- Electronic / EDM (house, techno, dubstep)
- Experimental (noise, avant-garde)
- Hip Hop (rap, trap, production)
- Pop
- Rock (indie, prog, psych)
- Chill (lofi, ambient, downtempo)
- Production
- Other Genres

### 2. Advanced Filtering
- **Text Search**: Search song titles
- **Score Filter**: Range from 0 to 100,000+
- **Source Filter**: YouTube, SoundCloud, Spotify, Bandcamp, Vimeo
- **Date Filter**: Today, This Week, This Month, This Year, All Time
- **Thumbnail Filter**: Only show posts with album art

### 3. Music Player Controls
- Play/Pause button (amber accent)
- Skip forward/backward
- Volume slider (0-100%)
- Progress bar with real-time scrubbing
- Current time / Total time display
- Repeat mode toggle (off, all, one)
- Shuffle button

### 4. Now Playing Display
- Large album artwork
- Pulsing animation when playing
- Song title and artist
- Posted by (author info)
- Subreddit attribution with link
- Upvote count with badge
- Quick action buttons (upvote, downvote, comments, more)

### 5. Comments System
- Fetch Reddit comments for current post
- Threaded display with nesting
- Author names and scores
- Timestamps
- Collapsible threads
- Limited to 50 comments for performance

### 6. Authentication (Optional)
- Reddit OAuth2 integration
- Secure token storage
- User profile display
- Login/logout functionality
- Token expiration handling

## API Routes

### `/api/reddit/posts`
Fetch Reddit posts from a subreddit
\`\`\`
GET /api/reddit/posts?subreddit=listenothis&sort=hot&timeframe=week&limit=25
\`\`\`

### `/api/reddit/comments`
Fetch comments for a post
\`\`\`
GET /api/reddit/comments?subreddit=listenothis&postId=abc123
\`\`\`

### `/api/soundcloud/track`
Fetch SoundCloud track metadata
\`\`\`
GET /api/soundcloud/track?url=https://soundcloud.com/...
\`\`\`

## Keyboard Shortcuts (Planned)
- `Space` - Play/Pause
- `→` - Next track
- `←` - Previous track
- `↑` - Volume up
- `↓` - Volume down

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Android)

## Performance
- SWR caching with 1-minute cache duration
- Lazy loading of components
- Optimized images with next/image
- Debounced search (500ms)
- Memoized callbacks
- CSS animations and transitions
- Responsive scrollbars

## Accessibility
- Semantic HTML
- ARIA labels and roles
- Keyboard navigation
- Screen reader support
- Color contrast compliance
- Focus management

## Deployment

### Vercel (Recommended)
\`\`\`bash
vercel deploy
\`\`\`

### Docker
\`\`\`bash
docker build -t music-player .
docker run -p 3000:3000 music-player
\`\`\`

### Self-hosted
\`\`\`bash
npm run build
npm start
\`\`\`

## Environment Setup

### Production
1. Deploy to Vercel
2. Add environment variables in Vercel dashboard
3. Set SOUNDCLOUD_CLIENT_ID if using SoundCloud
4. Optional: Configure Reddit OAuth credentials

### Development
1. Copy `.env.local.example` to `.env.local`
2. Add your SoundCloud Client ID
3. Run `npm run dev`

## Contributing
Contributions welcome! Please read contributing guidelines.

## License
MIT - See LICENSE file

## Credits
- Original concept: [musicplayer.io](https://reddit.musicplayer.io)
- Built with Next.js and shadcn/ui
- Uses Reddit public API
- YouTube embed integration

## Support
For issues, feature requests, or questions:
- Open an issue on GitHub
- Check existing documentation in FEATURES_IMPLEMENTED.md

## Roadmap
- [ ] Playlist creation and saving
- [ ] User favorites/bookmarks
- [ ] Audio visualization
- [ ] Keyboard shortcuts
- [ ] Theme customization
- [ ] Spotify playlist export
- [ ] Genre tagging system
- [ ] PWA support
- [ ] Advanced lyrics display
- [ ] Community features

---

**Current Version**: 0.6.14  
**Last Updated**: 2025-01-09  
**Node Version**: 18+  
**React Version**: 19.2+
