export {};

declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady?: () => void;
  }

  namespace YT {
    enum PlayerState {
      UNSTARTED = -1,
      ENDED = 0,
      PLAYING = 1,
      PAUSED = 2,
      BUFFERING = 3,
      CUED = 5,
    }

    interface OnStateChangeEvent {
      data: PlayerState;
      target: Player;
    }

    interface PlayerVars {
      autoplay?: 0 | 1;
      controls?: 0 | 1;
      disablekb?: 0 | 1;
      modestbranding?: 0 | 1;
      rel?: 0 | 1;
      fs?: 0 | 1;
      iv_load_policy?: 1 | 3;
      playsinline?: 0 | 1;
    }

    interface PlayerEvents {
      onReady?: (event: { target: Player }) => void;
      onStateChange?: (event: OnStateChangeEvent) => void;
    }

    interface PlayerOptions {
      height?: string | number;
      width?: string | number;
      videoId?: string;
      playerVars?: PlayerVars;
      events?: PlayerEvents;
    }

    interface LoadVideoOptions {
      videoId: string;
      startSeconds?: number;
      endSeconds?: number;
    }

    class Player {
      constructor(elementId: string | HTMLElement, options: PlayerOptions);
      loadVideoById(options: LoadVideoOptions): void;
      playVideo(): void;
      pauseVideo(): void;
      stopVideo(): void;
      mute(): void;
      unMute(): void;
      destroy(): void;
    }
  }
}
