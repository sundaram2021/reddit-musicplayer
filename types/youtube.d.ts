declare global {
  interface Window {
    YT?: {
      Player: any;
      PlayerState: any;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

export {};
