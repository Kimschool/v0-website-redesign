<?php
/**
 * DB の公開お知らせ一覧（PHP）。Next 側と独立して閲覧用。
 */
require_once __DIR__ . '/includes/bootstrap-readonly.php';

function h($s)
{
    return htmlspecialchars($s, ENT_QUOTES | ENT_HTML5, 'UTF-8');
}

try {
    $sql = 'SELECT id, title, excerpt, href, display_date, is_new, image_src, link_mode
            FROM news_posts WHERE published = 1
            ORDER BY display_date DESC, id DESC';
    $list = news_db()->query($sql)->fetchAll();
} catch (Exception $e) {
    http_response_code(500);
    header('Content-Type: text/plain; charset=UTF-8');
    echo "Error";
    exit;
}

header('Content-Type: text/html; charset=UTF-8');
?>
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>お知らせ一覧</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; padding: 1rem; background: #f4f4f5; color: #18181b; }
    .wrap { max-width: 720px; margin: 0 auto; }
    h1 { font-size: 1.25rem; margin-bottom: 1rem; }
    ul { list-style: none; padding: 0; margin: 0; }
    li { background: #fff; border-radius: 10px; margin-bottom: .65rem; box-shadow: 0 1px 3px rgba(0,0,0,.06); }
    li a { display: block; padding: .85rem 1rem; text-decoration: none; color: inherit; }
    li a:hover { background: #fafafa; }
    .d { font-size: .8rem; color: #71717a; margin-bottom: .2rem; }
    .t { font-weight: 600; font-size: .95rem; }
    .e { font-size: .85rem; color: #52525b; margin-top: .35rem; line-height: 1.45; }
    .new { display: inline-block; font-size: .65rem; background: #0085b2; color: #fff; padding: .1rem .35rem; border-radius: 4px; margin-left: .35rem; vertical-align: middle; }
    .empty { background: #fff; padding: 1.5rem; border-radius: 10px; color: #71717a; }
  </style>
</head>
<body>
<div class="wrap">
  <h1>お知らせ一覧</h1>
  <?php if (count($list) === 0) { ?>
  <p class="empty">掲載中のお知らせはありません。</p>
  <?php } else { ?>
  <ul>
    <?php foreach ($list as $row) {
        $href = news_post_list_href($row);
        $isNew = (int) $row['is_new'];
        $ex = isset($row['excerpt']) ? trim((string) $row['excerpt']) : '';
    ?>
    <li>
      <a href="<?= h($href) ?>">
        <div class="d"><?= h($row['display_date']) ?><?php if ($isNew) { ?><span class="new">NEW</span><?php } ?></div>
        <div class="t"><?= h($row['title']) ?></div>
        <?php if ($ex !== '') { ?><div class="e"><?= h($ex) ?></div><?php } ?>
      </a>
    </li>
    <?php } ?>
  </ul>
  <?php } ?>
</div>
</body>
</html>
