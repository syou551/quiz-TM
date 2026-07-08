let apiPromise: Promise<void> | null = null;

/**
 * YouTube IFrame Player API の script タグを一度だけ挿入し、
 * window.YT が使える状態になったら resolve する。
 */
export function loadYouTubeIframeApi(): Promise<void> {
  if (apiPromise) return apiPromise;

  apiPromise = new Promise((resolve) => {
    if (typeof window === "undefined") return;

    if (window.YT && window.YT.Player) {
      resolve();
      return;
    }

    const previousCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousCallback?.();
      resolve();
    };

    if (!document.getElementById("youtube-iframe-api")) {
      const tag = document.createElement("script");
      tag.id = "youtube-iframe-api";
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }
  });

  return apiPromise;
}
