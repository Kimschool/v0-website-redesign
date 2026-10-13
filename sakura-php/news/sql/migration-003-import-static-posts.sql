-- 既存のハードコード記事2件を DB に取り込む
--
-- これまで一覧の2記事は Next.js 側 (lib/news-articles.ts) に直接書かれており、
-- 管理画面から編集・削除できなかった。一覧カードの情報を DB に移し、
-- 管理窓口を管理画面に一本化する。
--
-- 記事ページ本体 (/news/schedule-2026/ , /news/accreditation/) は
-- 表組みなどのレイアウトを持つ React ページなので、そのまま残す。
-- よって link_mode は 'page' ではなく 'external' を使い、href で既存ページを指す。
--
-- 実行は1回だけ。重複実行を防ぐため href で存在チェックしてから INSERT する。

SET NAMES utf8mb4;

INSERT INTO `news_posts`
  (`title`, `excerpt`, `link_mode`, `href`, `display_date`, `is_new`, `image_src`, `published`)
SELECT
  '2026年長期休みのスケジュール',
  '2026年度の春休み・GW・夏休み・お盆・冬休みなど長期休みの日程を掲載しています。',
  'external',
  '/news/schedule-2026/',
  '2026.01.13',
  1,
  NULL,
  1
FROM DUAL
WHERE NOT EXISTS (
  SELECT 1 FROM `news_posts` WHERE `href` = '/news/schedule-2026/'
);

INSERT INTO `news_posts`
  (`title`, `excerpt`, `link_mode`, `href`, `display_date`, `is_new`, `image_src`, `published`)
SELECT
  'KCP地球市民日本語学校が「認定日本語教育機関」に認定されました！',
  '文部科学省より認定日本語教育機関として認定。教育プログラムの質が公的基準を満たした証です。',
  'external',
  '/news/accreditation/',
  '2025.11.04',
  0,
  '/images/original_from_customer/8つの窓/08_認定日本語教育機関に認定.jpg',
  1
FROM DUAL
WHERE NOT EXISTS (
  SELECT 1 FROM `news_posts` WHERE `href` = '/news/accreditation/'
);

-- 確認用
-- SELECT id, display_date, title, href, published FROM news_posts ORDER BY display_date DESC, id DESC;
