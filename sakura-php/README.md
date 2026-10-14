# さくらインターネット用 — お知らせ（PHP + MySQL）

Next.js 本体とは別に、`www.kcp.ac.jp` のドキュメントルートへアップロードする PHP です。

---

## ⚠️ このディレクトリは本番サーバと一致していません（2026-10-14 時点）

**ここにある PHP は MySQL 版だが、本番で動いているのは JSON ファイル版である。**
両者は別物なので、**このリポジトリのコードを根拠に本番の挙動を判断してはいけない。**

| | このリポジトリ | 本番 `www.kcp.ac.jp` |
|---|---|---|
| 設置パス | `news/` 想定 | **`/sakura-php/news/`** |
| データ保存先 | MySQL `news_posts` | **`data/news.json`** |
| `includes/db.php` | PDO で MySQL 接続 | 使われていない |
| `article.php` | 素のデザイン・関連記事なし | Next 風デザイン・**「その他のお知らせ」あり** |
| `sql/*.sql` | — | **本番とは無関係** |

本番の MySQL `news_posts` テーブルは存在するが**誰も読んでいない**（`test1` という行が残っている）。
ここに INSERT しても画面は変わらない。

### 実際にあった事故

1. 管理画面から1件登録したら、一覧から既存2記事が消えた
   → 原因は Next 側。API が1件でも返すと静的記事を**置き換えて**いた。
     `lib/news-feed.ts` の `mergeNewsFeed()` で併合するよう修正済み。
2. 既存2記事を DB に入れようとして MySQL に INSERT したが、画面は変わらなかった
   → 本番は JSON 版。`data/news.json` を直接編集して解決。
3. JSON に入れたら「その他のお知らせ」に同じ記事が2回出た
   → 本番 `article.php` が**末尾スラッシュなしの href をハードコード**しており、
     JSON 側が `/news/accreditation/` だと別記事とみなされた。

### href の書き方（重要）

本番 `article.php` のハードコードに合わせ、**末尾スラッシュを付けない**こと。

```
/news/schedule-2026     ← 正
/news/schedule-2026/    ← 誤（「その他のお知らせ」が重複する）
```

Next 側は `normalizeNewsHref()` でスラッシュ差を吸収するため影響を受けないが、
本番 PHP にその処理はない。

### やるべきこと

本番 `/sakura-php/news/` 一式を FTP で取得し、このディレクトリへ反映して同期させる。
それまでは、本番の挙動は HTTP レスポンスを直接確認して判断すること。

---

## 推奨する運用（本番サーバへアップロード）

**KCP の Web サイトと同じさくらサーバ上に `news/` を置き、ブラウザから管理する方法**を推奨します。PHP と MySQL が同じ提供環境内にあるため **追加の SSH トンネルや外部 MySQL 許可は不要**です。

## 公開 URL

| 用途 | URL |
|------|-----|
| 管理画面 | `https://www.kcp.ac.jp/news/admin/` |
| お知らせ一覧（PHP） | `https://www.kcp.ac.jp/news/list.php` |
| 本文ページ（DB の本文・画像パス） | `https://www.kcp.ac.jp/news/article.php?id=数値` |
| **Next 連携用 JSON（一覧）** | `https://www.kcp.ac.jp/news/api/posts.php` |

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
  api/
    posts.php
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

## Next.js との連携（既存の /news ページ）

Next の `components/news-index-page.tsx` と `news-section.tsx` は、**`NEXT_PUBLIC_NEWS_API_URL`** が設定されていればビルド時に埋め込んだ URL へ `fetch` し、**DB のお知らせ一覧**を表示します。

1. 本番ビルドの環境（例: `.env.production`）に次を設定する:

   ```env
   NEXT_PUBLIC_NEWS_API_URL=https://www.kcp.ac.jp/news/api/posts.php
   ```

2. さくらに **`news/api/posts.php`** をデプロイする（読み取り専用・`migration-002` 済みの DB を参照）。

3. JSON の各 `href` は **サイトルートからの絶対パス**です。`link_mode=page` の記事は `/news/article.php?id=…` となり、クリックで PHP の本文ページへ遷移します。`external` は従来どおり `/news/accreditation` など Next 側のページへ向けられます。

4. **未設定**のときは従来どおりリポジトリ内の静的データにフォールバックします。

ローカル開発で `next dev` しつつ本番 API を読む場合は、ブラウザの CORS のため `posts.php` が `Access-Control-Allow-Origin` を返します（既に実装済み）。

## 500 エラー・応答なしのとき

1. **`news/admin/ping.php`** で PHP 動作確認。
2. **`news/admin/check.php`** で `.env`・DB・`news_posts` を確認。
3. 管理画面で SQL エラーになる場合は **`migration-002` を実行したか**、`includes/util.php` がサーバにあるか確認。

## セキュリティ注意

- `.env` をコミットしない。
- 本文は表示時に HTML エスケープしています（改行のみ反映）。管理画面は信頼できる担当者のみが利用する前提です。
