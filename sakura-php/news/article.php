<?php
/**
 * お知らせ本文ページ（link_mode=page）。外部リンク記事は href へリダイレクト。
 */
require_once __DIR__ . '/includes/bootstrap-readonly.php';

$id = isset($_GET['id']) ? (int) $_GET['id'] : 0;
if ($id <= 0) {
    http_response_code(404);
    header('Content-Type: text/plain; charset=UTF-8');
    echo "Not found";
    exit;
}

try {
    $st = news_db()->prepare(
        'SELECT * FROM news_posts WHERE id = ? AND published = 1 LIMIT 1'
    );
    $st->execute(array($id));
    $row = $st->fetch();
} catch (Exception $e) {
    http_response_code(500);
    header('Content-Type: text/plain; charset=UTF-8');
    echo "Error";
    exit;
}

if (!$row) {
    http_response_code(404);
    header('Content-Type: text/plain; charset=UTF-8');
    echo "Not found";
    exit;
}

$mode = isset($row['link_mode']) ? $row['link_mode'] : 'external';
if ($mode === 'external') {
    $h = isset($row['href']) ? trim((string) $row['href']) : '';
    if ($h !== '' && isset($h[0]) && $h[0] === '/') {
        header('Location: ' . $h, true, 302);
        exit;
    }
}

function h($s)
{
    return htmlspecialchars($s, ENT_QUOTES | ENT_HTML5, 'UTF-8');
}

$title = $row['title'];
$date = $row['display_date'];
$body = isset($row['body']) ? (string) $row['body'] : '';
$gallery = news_gallery_path_lines(isset($row['gallery_paths']) ? $row['gallery_paths'] : '');
$hero = isset($row['image_src']) ? trim((string) $row['image_src']) : '';

header('Content-Type: text/html; charset=UTF-8');
?>
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title><?= h($title) ?> — お知らせ</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; padding: 1.25rem; background: #fafafa; color: #18181b; line-height: 1.65; }
    .wrap { max-width: 720px; margin: 0 auto; background: #fff; padding: 1.5rem 1.25rem 2rem; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,.08); }
    .meta { font-size: .875rem; color: #71717a; margin-bottom: .75rem; }
    h1 { font-size: 1.35rem; margin: 0 0 1rem; line-height: 1.35; }
    .body { white-space: pre-wrap; word-break: break-word; margin-bottom: 1.5rem; }
    .hero { max-width: 100%; height: auto; border-radius: 8px; margin-bottom: 1.25rem; }
    .gallery { display: flex; flex-direction: column; gap: 1rem; }
    .gallery img { max-width: 100%; height: auto; border-radius: 8px; }
    .back { margin-top: 2rem; font-size: .875rem; }
    .back a { color: #0085b2; }
  </style>
</head>
<body>
<div class="wrap">
  <p class="meta"><?= h($date) ?></p>
  <h1><?= h($title) ?></h1>
  <?php if ($hero !== '') { ?>
  <img class="hero" src="<?= h($hero) ?>" alt="">
  <?php } ?>
  <?php if ($body !== '') { ?>
  <div class="body"><?= h($body) ?></div>
  <?php } ?>
  <?php if (count($gallery) > 0) { ?>
  <div class="gallery">
    <?php foreach ($gallery as $src) { ?>
    <img src="<?= h($src) ?>" alt="">
    <?php } ?>
  </div>
  <?php } ?>
  <p class="back"><a href="list.php">お知らせ一覧へ</a></p>
</div>
</body>
</html>
