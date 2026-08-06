<div id="top"></div>

# 割り切れない研究所（PiLoop）

πを題材にした、少し変わったWeb体験を集める研究所です。

<p>
  <img alt="Node.js" src="https://img.shields.io/badge/-Node.js-000000.svg?logo=node.js&style=for-the-badge">
  <img alt="Vite" src="https://img.shields.io/badge/-Vite-646CFF.svg?logo=vite&style=for-the-badge&logoColor=white">
  <img alt="React" src="https://img.shields.io/badge/-React-20232A.svg?logo=react&style=for-the-badge&logoColor=61DAFB">
  <img alt="TypeScript" src="https://img.shields.io/badge/-TypeScript-3178C6.svg?logo=typescript&style=for-the-badge&logoColor=white">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/-Tailwind_CSS-06B6D4.svg?logo=tailwindcss&style=for-the-badge&logoColor=white">
</p>

## 目次

1. [プロジェクトについて](#プロジェクトについて)
2. [提供中の体験](#提供中の体験)
3. [技術スタック](#技術スタック)
4. [ディレクトリ構成](#ディレクトリ構成)
5. [セットアップ](#セットアップ)
6. [コマンド](#コマンド)
7. [テスト](#テスト)
8. [ライセンス](#ライセンス)

## プロジェクトについて

割り切れない研究所は、数学と日常のコミュニケーションを組み合わせた、遊び心のあるWebアプリケーションです。

役に立つとは限らなくても、誰かに共有したくなる体験を目指しています。

## 提供中の体験

### πで伝える

メッセージを入力し、πではうまく伝わらない結果を楽しむコンテンツです。入力、処理中、結果、再試行までの一連の画面を提供しています。

<p align="right">(<a href="#top">ページ上部へ</a>)</p>

## 技術スタック

| 分類 | 技術 |
| --- | --- |
| UI | React 19、TypeScript 6 |
| ビルド | Vite 8 |
| スタイリング | Tailwind CSS 4 |
| ルーティング | React Router 7 |
| フォーム・バリデーション | React Hook Form、Zod |
| Unit / Component Test | Vitest、Testing Library |
| UIカタログ | Storybook 10 |
| E2E / Visual Regression Test | Playwright 1.61 |

依存パッケージの正確なバージョンは[`package.json`](./package.json)を参照してください。

## ディレクトリ構成

```text
.
├── .github/
│   └── workflows/              # GitHub Actions
├── .storybook/                 # Storybook設定
├── e2e/
│   ├── components/             # E2E用Component Object
│   ├── fixtures/               # Playwrightの共通fixture
│   ├── pages/                  # Page Object Model
│   └── specs/                  # E2E・VRTのspecと基準画像
├── public/                     # 静的ファイル
├── src/
│   ├── app/                    # アプリケーションとルーティング
│   ├── assets/                 # 画像などのアセット
│   ├── components/             # 共有UIコンポーネント
│   ├── features/
│   │   ├── pi-loop/            # 研究所の一覧画面
│   │   └── pi-message/         # 「πで伝える」機能
│   ├── tests/                  # テスト共通設定
│   ├── types/                  # 共有型・ページ定義
│   ├── index.css               # グローバルスタイル
│   └── main.tsx                # エントリーポイント
├── playwright.config.ts        # Playwright設定
├── vite.config.ts              # Vite・Vitest設定
└── package.json
```

<p align="right">(<a href="#top">ページ上部へ</a>)</p>

## セットアップ

### 必要なもの

- Node.js
- npm

### リポジトリの取得

```bash
git clone git@github.com:kishimin/pi-lab.git
cd pi-lab
```

### 依存パッケージのインストール

```bash
npm install
npx playwright install
npx playwright install msedge
```

### 開発サーバーの起動

```bash
npm run dev
```

既定では `http://localhost:5173` で起動します。

<p align="right">(<a href="#top">ページ上部へ</a>)</p>

## コマンド

| コマンド | 内容 |
| --- | --- |
| `npm run dev` | 開発サーバーを起動する |
| `npm run build` | 型チェック後にプロダクションビルドを作成する |
| `npm run preview` | プロダクションビルドをローカルで確認する |
| `npm run lint` | ESLintを実行する |
| `npm run typecheck` | TypeScriptの型チェックを実行する |
| `npm run typecheck:full` | ライブラリを含む完全な型チェックを実行する |
| `npm run test` | Vitestを実行する |
| `npm run test-coverage` | Vitestのカバレッジを取得する |
| `npm run storybook` | Storybookをポート6006で起動する |
| `npm run build-storybook` | Storybookの静的ビルドを作成する |
| `npm run test-storybook` | Storybook Test Runnerを実行する |
| `npm run playwright` | PlaywrightのE2Eテストを実行する |
| `npm run screenshots:pi-message` | Chromiumで「πで伝える」のE2Eテストを実行する |

## テスト

### Unit・Component Test

```bash
npm run test -- --run
```

`src/**/*.test.ts`と`src/**/*.test.tsx`で、ロジック、バリデーション、画面操作、ルーティングを検証します。

### Storybook

```bash
npm run storybook
```

共有コンポーネントと各画面の状態をStorybookで確認できます。

### E2E Test

```bash
npm run playwright
```

Playwrightは開発サーバーを自動起動し、一覧画面から「πで伝える」の結果・再試行までを検証します。`e2e/fixtures/test.ts`が共通のページ遷移とPage Objectを提供し、各specは利用するfixtureを受け取ります。

### Visual Regression Test

VRTはChromium、WebKit、Mobile Chrome、Mobile Safariの各環境で、主要な画面状態をリポジトリ内の基準画像と比較します。

```bash
npx playwright test e2e/specs/vrt.spec.ts
```

意図したデザイン変更で基準画像を更新する場合は、生成された差分を確認してから次を実行します。

```bash
npx playwright test e2e/specs/vrt.spec.ts --update-snapshots
```

基準画像はOS、ブラウザー、フォントの影響を受けます。CI（Linux）との差異を防ぐため、基準画像の更新は次のDockerコマンドで行ってください。

```bash
docker run --rm --network host -v "$(pwd):/work" -w /work \
  mcr.microsoft.com/playwright:v1.61.1-noble \
  bash -c "npm ci && npx playwright test e2e/specs/vrt.spec.ts --update-snapshots"
```

<p align="right">(<a href="#top">ページ上部へ</a>)</p>

## ライセンス

このプロジェクトは[MIT License](./LICENSE)で公開されています。

<p align="right">(<a href="#top">ページ上部へ</a>)</p>
