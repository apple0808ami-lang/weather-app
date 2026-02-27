# Weather Check App

都市名を入力して現在の天気を確認できる、学習用の天気情報アプリです。  
React + TypeScript で実装し、`react-hook-form`、`zod`、`react-query`、Open-Meteo API を利用しています。

## Features
- 都市名検索（日本語入力対応）
- 現在天気の表示
- 気温表示
- 風力表示
- 天気に応じた占いメッセージ表示
- ローディング表示 / エラー表示
- URLクエリ連携（`?city=Tokyo`）

## Tech Stack
- React
- TypeScript
- Vite
- Tailwind CSS（UIクラスで利用）
- react-hook-form
- zod
- @tanstack/react-query
- Open-Meteo API

## Getting Started
### 1. Install
```bash
npm install
```

### 2. Run
```bash
npm run dev
```

### 3. Open
ブラウザで以下にアクセス:
- `http://localhost:5173`

## Project Structure
```txt
.
├─ page.tsx
├─ src/
│  ├─ components/
│  │  ├─ WeatherTopPage.tsx
│  │  ├─ CitySearchForm.tsx
│  │  ├─ WeatherResultSection.tsx
│  │  ├─ LoadingIndicator.tsx
│  │  └─ ErrorMessage.tsx
│  ├─ lib/
│  │  ├─ weatherApi.ts
│  │  └─ validation.ts
│  └─ types/
│     └─ weather.ts
├─ requirements.md
└─ design.md
```

## Documents
- Requirements: `requirements.md`
- Design: `design.md`

## Notes
- Open-Meteo API は無料枠で利用可能です。
- 将来拡張として、履歴・お気に入り都市・花粉情報・雨雲レーダーを想定しています。
