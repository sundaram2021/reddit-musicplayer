declare global {
  interface Window {
    YT?: {
      Player: new (elementId: string, config: YT.PlayerOptions) => YT.Player;
      PlayerState: {
        UNSTARTED: number;
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

declare namespace YT {
  interface Player {
    playVideo(): void;
    pauseVideo(): void;
    stopVideo(): void;
    seekTo(seconds: number, allowSeekAhead: boolean): void;
    setVolume(volume: number): void;
    getVolume(): number;
    getCurrentTime(): number;
    getDuration(): number;
    destroy(): void;
  }

  interface PlayerOptions {
    height?: string;
    width?: string;
    videoId: string;
    playerVars?: PlayerVars;
    events?: PlayerEvents;
  }

  interface PlayerVars {
    autoplay?: 0 | 1;
    controls?: 0 | 1;
    modestbranding?: 0 | 1;
    rel?: 0 | 1;
    [key: string]: any;
  }

  interface PlayerEvents {
    onReady?: (event: PlayerEvent) => void;
    onStateChange?: (event: PlayerEvent) => void;
    onError?: (event: PlayerEvent) => void;
  }

  interface PlayerEvent {
    target: Player;
    data: number;
  }
}

export {};
