# 刺繍糸カラーファインダー

画像から色を選択して、最適な刺繍糸の色を見つけることができるWebアプリケーションです。

## 機能

- 画像のアップロードと表示
- クリックによる色の選択
- メーカーごとの最適な刺繍糸の表示
- 色差に基づく類似色の検索
- Google検索へのクイックリンク

## 技術スタック

- Next.js
- TypeScript
- Tailwind CSS
- Prisma
- Supabase (PostgreSQL)

## 開発環境のセットアップ

1. リポジトリのクローン:
```bash
git clone https://github.com/yourusername/embroidery-color-finder.git
cd embroidery-color-finder
```

2. 依存関係のインストール:
```bash
npm install
```

3. 環境変数の設定:
`.env`ファイルを作成し、以下の変数を設定:
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
DATABASE_URL=your-database-url
DIRECT_URL=your-direct-database-url
```

4. データベースのマイグレーション:
```bash
npx prisma migrate dev
```

5. 開発サーバーの起動:
```bash
npm run dev
```

## ライセンス

MIT
