"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { loadYouTubeIframeApi } from "@/lib/loadYouTubeIframeApi";
import { QUIZ_CLIPS, QuizClip, SONGS, SongId } from "@/data/quiz";

type Phase = "start" | "ready" | "playing" | "answering" | "revealed" | "finished";

interface AnswerRecord {
  clip: QuizClip;
  chosen: SongId;
  correct: boolean;
}

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function QuizGame() {
  const [phase, setPhase] = useState<Phase>("start");
  const [order, setOrder] = useState<QuizClip[]>(QUIZ_CLIPS);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [lastChoice, setLastChoice] = useState<SongId | null>(null);

  const playerRef = useRef<YT.Player | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerReadyRef = useRef(false);

  const currentClip = order[index];

  useEffect(() => {
    let cancelled = false;

    loadYouTubeIframeApi().then(() => {
      if (cancelled || !containerRef.current) return;
      playerRef.current = new window.YT.Player(containerRef.current, {
        height: "360",
        width: "640",
        playerVars: {
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          rel: 0,
          fs: 0,
          iv_load_policy: 3,
          playsinline: 1,
        },
        events: {
          onReady: () => {
            playerReadyRef.current = true;
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              setPhase((p) => (p === "playing" ? "answering" : p));
            }
          },
        },
      });
    });

    return () => {
      cancelled = true;
      playerRef.current?.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startQuiz = useCallback(() => {
    setOrder(shuffle(QUIZ_CLIPS));
    setIndex(0);
    setAnswers([]);
    setLastChoice(null);
    setPhase("ready");
  }, []);

  const playCurrentClip = useCallback(() => {
    if (!currentClip || !playerRef.current) return;
    const song = SONGS[currentClip.song];
    setPhase("playing");
    playerRef.current.loadVideoById({
      videoId: song.videoId,
      startSeconds: currentClip.start,
      endSeconds: currentClip.start + currentClip.duration,
    });
    playerRef.current.playVideo();
  }, [currentClip]);

  const answer = useCallback(
    (choice: SongId) => {
      if (!currentClip) return;
      playerRef.current?.stopVideo();
      const correct = choice === currentClip.song;
      setLastChoice(choice);
      setAnswers((prev) => [...prev, { clip: currentClip, chosen: choice, correct }]);
      setPhase("revealed");
    },
    [currentClip]
  );

  const nextQuestion = useCallback(() => {
    if (index + 1 >= order.length) {
      setPhase("finished");
      return;
    }
    setIndex((i) => i + 1);
    setLastChoice(null);
    setPhase("ready");
  }, [index, order.length]);

  const score = answers.filter((a) => a.correct).length;

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-6 p-6">
      <h1 className="text-center text-2xl font-bold">
        HOT LIMIT <span className="text-neutral-400">or</span> HIGH PRESSURE?
      </h1>
      <p className="text-center text-sm text-neutral-500">
        一瞬だけ流れる音源が「HOT LIMIT」と「HIGH PRESSURE」のどちらか当ててください。
        映像は表示されません。
      </p>

      {/* YouTube プレーヤーは常にこのカバーの下に隠れている */}
      <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-xl bg-neutral-900 shadow-lg">
        <div className="absolute inset-0 pointer-events-none opacity-0">
          <div ref={containerRef} className="h-full w-full" />
        </div>

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-neutral-900 text-white">
          {phase === "start" && (
            <button
              onClick={startQuiz}
              className="rounded-full bg-white px-6 py-3 font-semibold text-neutral-900 transition hover:bg-neutral-200"
            >
              クイズを始める
            </button>
          )}

          {phase === "ready" && currentClip && (
            <>
              <p className="text-sm text-neutral-300">
                第 {index + 1} 問 / {order.length} 問
              </p>
              <button
                onClick={playCurrentClip}
                className="rounded-full bg-white px-6 py-3 font-semibold text-neutral-900 transition hover:bg-neutral-200"
              >
                ▶ 再生する
              </button>
            </>
          )}

          {phase === "playing" && (
            <div className="flex flex-col items-center gap-2">
              <div className="h-3 w-3 animate-ping rounded-full bg-red-500" />
              <p className="text-sm text-neutral-300">再生中…（映像は隠しています）</p>
            </div>
          )}

          {phase === "answering" && currentClip && (
            <div className="flex flex-col items-center gap-4">
              <p className="text-sm text-neutral-300">どちらの曲？</p>
              <div className="flex gap-3">
                {(Object.keys(SONGS) as SongId[]).map((songId) => (
                  <button
                    key={songId}
                    onClick={() => answer(songId)}
                    className="rounded-lg bg-white px-4 py-3 font-semibold text-neutral-900 transition hover:bg-neutral-200"
                  >
                    {SONGS[songId].title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {phase === "revealed" && currentClip && lastChoice && (
            <div className="flex flex-col items-center gap-3 px-4 text-center">
              <p className={lastChoice === currentClip.song ? "text-lg font-bold text-green-400" : "text-lg font-bold text-red-400"}>
                {lastChoice === currentClip.song ? "正解！" : "不正解…"}
              </p>
              <p className="text-sm text-neutral-300">
                正解は「{SONGS[currentClip.song].title}」の{currentClip.section}
                （{currentClip.start}秒〜）でした
              </p>
              <button
                onClick={nextQuestion}
                className="rounded-full bg-white px-6 py-3 font-semibold text-neutral-900 transition hover:bg-neutral-200"
              >
                {index + 1 >= order.length ? "結果を見る" : "次の問題へ"}
              </button>
            </div>
          )}

          {phase === "finished" && (
            <div className="flex flex-col items-center gap-4 px-4 text-center">
              <p className="text-xl font-bold">
                スコア: {score} / {answers.length}
              </p>
              <ul className="max-h-40 w-full max-w-xs space-y-1 overflow-y-auto text-left text-xs text-neutral-300">
                {answers.map((a, i) => (
                  <li key={a.clip.id} className={a.correct ? "text-green-400" : "text-red-400"}>
                    第{i + 1}問: {SONGS[a.clip.song].title}（{a.clip.section}） — 回答:{" "}
                    {SONGS[a.chosen].title} {a.correct ? "○" : "×"}
                  </li>
                ))}
              </ul>
              <button
                onClick={startQuiz}
                className="rounded-full bg-white px-6 py-3 font-semibold text-neutral-900 transition hover:bg-neutral-200"
              >
                もう一度挑戦する
              </button>
            </div>
          )}
        </div>
      </div>

      <p className="text-center text-xs text-neutral-400">
        出題区間の秒数は暫定値です。QUIZ_DRAFT.md / src/data/quiz.ts を編集して調整してください。
      </p>
    </div>
  );
}
