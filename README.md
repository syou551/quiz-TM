# HOT LIMIT or HIGH PRESSURE?

「HOT LIMIT」と「HIGH PRESSURE」の一瞬だけ流れる音源を聴いて、どちらの曲かを当てる[Next.js](https://nextjs.org)製クイズアプリです。

## Getting Started

開発サーバーを起動:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

[http://localhost:3000](http://localhost:3000) をブラウザで開くと確認できます。

## 構成

- [src/components/QuizGame.tsx](src/components/QuizGame.tsx) — クイズ本体のUI/ロジック(YouTube IFrame APIで音声のみ再生し、映像は隠しています)
- [src/data/quiz.ts](src/data/quiz.ts) — 出題候補クリップ(`start` / `duration` など)と曲情報の定義
- [QUIZ_DRAFT.md](QUIZ_DRAFT.md) — 出題区間の下書きメモ

出題区間の秒数は暫定値です。実際に2曲を聴きながら `src/data/quiz.ts` を編集して調整してください。

## Learn More

Next.jsについて詳しく知りたい場合は以下を参照してください。

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

[Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) からデプロイするのが最も簡単です。

詳細は[Next.jsのデプロイ手順](https://nextjs.org/docs/app/building-your-application/deploying)を確認してください。
# quiz-TM
