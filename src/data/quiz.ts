export type SongId = "HOT_LIMIT" | "HIGH_PRESSURE";

export interface SongInfo {
  id: SongId;
  title: string;
  videoId: string;
  url: string;
}

export const SONGS: Record<SongId, SongInfo> = {
  HOT_LIMIT: {
    id: "HOT_LIMIT",
    title: "HOT LIMIT",
    videoId: "vBmU5v2EyxM",
    url: "https://www.youtube.com/watch?v=vBmU5v2EyxM",
  },
  HIGH_PRESSURE: {
    id: "HIGH_PRESSURE",
    title: "HIGH PRESSURE",
    videoId: "RlV6cvhC8U0",
    url: "https://www.youtube.com/watch?v=RlV6cvhC8U0",
  },
};

export interface QuizClip {
  /** 一意なID */
  id: string;
  song: SongId;
  /** 出題時に答え合わせ画面へ表示する区間の説明 */
  section: string;
  /** 再生開始秒(暫定値。実際に聴いて調整してください) */
  start: number;
  /** 再生する長さ(秒) */
  duration: number;
}

/**
 * 出題候補クリップ一覧。
 * start / duration は QUIZ_DRAFT.md に記載の通り暫定値です。
 * 実際に2曲を聴きながら値を調整してください。
 */
export const QUIZ_CLIPS: QuizClip[] = [
  {
    id: "hotlimit-intro",
    song: "HOT_LIMIT",
    section: "イントロ",
    start: 5,
    duration: 15,
  },
  {
    id: "highpressure-intro",
    song: "HIGH_PRESSURE",
    section: "イントロ",
    start: 4.5,
    duration: 7,
  },
  {
    id: "hotlimit-prechorus-1",
    song: "HOT_LIMIT",
    section: "サビ前パーカッション(1回目)",
    start: 40,
    duration: 1.5,
  },
  {
    id: "highpressure-prechorus-1",
    song: "HIGH_PRESSURE",
    section: "Aメロ前パーカッション",
    start: 29,
    duration: 2,
  },
  {
    id: "hotlimit-prechorus-2",
    song: "HOT_LIMIT",
    section: "サビ終わりパーカッション",
    start: 87,
    duration: 4,
  },
  {
    id: "highpressure-prechorus-2",
    song: "HIGH_PRESSURE",
    section: "サビ前パーカッション(1回目)",
    start: 60,
    duration: 1.5,
  },
  {
    id: "hotlimit-prechorus-3",
    song: "HOT_LIMIT",
    section: "Cメロ前パーカッション",
    start: 150,
    duration: 10,
  },
  {
    id: "highpressure-prechoru-3",
    song: "HIGH_PRESSURE",
    section: "サビ後パーカッション",
    start: 96,
    duration: 5,
  },
  {
    id: "hotlimit-prechorus-4",
    song: "HOT_LIMIT",
    section: "サビ前パーカッション(2回目)",
    start: 179,
    duration: 1,
  },
  {
    id: "highpressure-prechorus-4",
    song: "HIGH_PRESSURE",
    section: "サビ前パーカッション(2回目)",
    start: 132,
    duration: 1.5,
  },
  {
    id: "highpressure-prechoru-5",
    song: "HIGH_PRESSURE",
    section: "Cメロパーカッション",
    start: 183,
    duration: 12,
  },
];
