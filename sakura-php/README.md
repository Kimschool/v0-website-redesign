# さくらインターネット用 — お知らせ（PHP + MySQL）

Next.js 本体とは別に、`www.kcp.ac.jp` のドキュメントルートへアップロードする PHP です。

## 推奨する運用（本番サーバへアップロード）

**KCP の Web サイトと同じさくらサーバ上に `news/` を置き、ブラウザから管理する方法**を推奨します。PHP と MySQL が同じ提供環境内にあるため **追加の SSH トンネルや外部 MySQL 許可は不要**です。

## 公開 URL

| 用途 | URL |
|------|-----|
| 管理画面 | `https://www.kcp.ac.jp/news/admin/` |
| お知らせ一覧（PHP） | `https://www.kcp.ac.jp/news/list.php` |
| 本文ページ（DB の本文・画像パス） | `https://www.kcp.ac.jp/news/article.php?id=数値` |

**掲載方式（管理画面で選択）**

- **リンク**: 従来どおりサイト内パス（例: Next の `/news/accreditation`）へジャンプ。
- **本文**: タイトル・日付・本文テキスト・一覧用サムネ・**複数画像パス（DB に改行区切りで保存）**を `article.php` で表示。画像ファイル自体は別途サーバに配置し、パスだけ登録します。

## フォルダ構成（例）

```text
news/
  .env
  list.php
  article.php
  admin/
    index.php
  includes/
    bootstrap.php
    bootstrap-readonly.php
    env.php
    util.php
    upload.php
    db.php
  uploads/
    .htaccess
    auth.php
    csrf.php
```

## セットアップ

1. **`news/.env.example` を `news/.env` にコピー**し、DB と管理パスワードを設定。
2. **MySQL**
   - 新規: `sql/schema.sql` を実行。
   - **既に旧 `news_posts` がある場合**: `sql/migration-002-body-page-mode.sql` を実行（`link_mode` / `body` / `gallery_paths` 追加、`href` を NULL 可に）。
3. 管理画面から登録。
   - 画像アップロードは **`news/uploads/`** に保存され、DB には `/news/uploads/ファイル名` が入ります。`uploads` フォルダと **`uploads/.htaccess`** をサーバに置き、書き込み権限を確認してください。
   - JPEG / PNG / GIF、各 5MB まで、ギャラリーは 1 回最大 20 枚。`post_max_size` / `upload_max_filesize` が小さいと保存に失敗します。

## Next.js 側

`NEXT_PUBLIC_NEWS_API_URL` は不要です。トップのお知らせ欄は **未設定時リポジトリ内の静的データ**のまま動きます。PHP 一覧へ誘導する場合はサイト内に `/news/list.php` へのリンクを置いてください。

## 500 エラー・応答なしのとき

1. **`news/admin/ping.php`** で PHP 動作確認。
2. **`news/admin/check.php`** で `.env`・DB・`news_posts` を確認。
3. 管理画面で SQL エラーになる場合は **`migration-002` を実行したか**、`includes/util.php` がサーバにあるか確認。

## セキュリティ注意

- `.env` をコミットしない。
- 本文は表示時に HTML エスケープしています（改行のみ反映）。管理画面は信頼できる担当者のみが利用する前提です。
