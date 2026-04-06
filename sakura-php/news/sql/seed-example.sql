-- 任意: 初期データ例（UTF-8）
-- カラム構成は schema.sql（link_mode / body / gallery_paths 含む）に合わせています。

INSERT INTO news_posts
  (title, excerpt, link_mode, body, gallery_paths, href, display_date, is_new, image_src, published)
VALUES
(
  '2026年長期休みのスケジュール',
  '2026年度の長期休み日程を掲載しています。',
  'external',
  NULL,
  NULL,
  '/news/schedule-2026',
  '2026.01.13',
  1,
  NULL,
  1
),
(
  'KCP地球市民日本語学校が「認定日本語教育機関」に認定されました！',
  '文部科学省より認定日本語教育機関として認定されました。',
  'external',
  NULL,
  NULL,
  '/news/accreditation',
  '2025.11.04',
  0,
  '/images/original_from_customer/8つの窓/08_認定日本語教育機関に認定.jpg',
  1
);
