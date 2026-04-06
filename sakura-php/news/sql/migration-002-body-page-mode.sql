-- 既存 DB 向け: 本文・ギャラリーパス・リンクモードを追加（未適用の場合のみ実行）
SET NAMES utf8mb4;

ALTER TABLE `news_posts`
  ADD COLUMN `link_mode` ENUM('external','page') NOT NULL DEFAULT 'external' COMMENT 'external=従来のサイト内リンク、page=本文+画像をPHPで表示' AFTER `excerpt`,
  ADD COLUMN `body` TEXT NULL COMMENT '本文ページ用（改行はそのまま表示）' AFTER `link_mode`,
  ADD COLUMN `gallery_paths` TEXT NULL COMMENT '画像パス 1行1つ' AFTER `body`;

-- 上記 ADD が「既にカラムがある」で失敗する場合は、個別に実行するかスキップしてください。

ALTER TABLE `news_posts` MODIFY `href` VARCHAR(500) NULL COMMENT 'link_mode=external のとき / から始まるパス';
