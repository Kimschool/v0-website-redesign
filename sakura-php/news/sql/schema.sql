-- KCP お知らせ（さくら MySQL 8.0）
-- 管理者ログインは news/.env を使用します

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS `news_posts` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(500) NOT NULL,
  `excerpt` TEXT NULL,
  `link_mode` ENUM('external','page') NOT NULL DEFAULT 'external' COMMENT 'external=従来のサイト内リンク、page=本文+画像をPHPで表示',
  `body` TEXT NULL COMMENT '本文ページ用（改行はそのまま表示）',
  `gallery_paths` TEXT NULL COMMENT '画像パス 1行1つ 例 /images/foo.jpg',
  `href` VARCHAR(500) NULL COMMENT 'link_mode=external のとき / から始まるパス',
  `display_date` CHAR(10) NOT NULL COMMENT 'YYYY.MM.DD',
  `is_new` TINYINT(1) NOT NULL DEFAULT 0,
  `image_src` VARCHAR(500) NULL COMMENT '一覧用サムネ・任意',
  `published` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY `idx_published_date` (`published`, `display_date`, `id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
