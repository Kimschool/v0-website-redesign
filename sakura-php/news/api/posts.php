<?php
/**
 * お知らせ一覧 JSON（読み取り専用）— Next.js の NEXT_PUBLIC_NEWS_API_URL から取得用
 * link_mode=page の記事は href が /news/article.php?id= になる
 */
header('Content-Type: application/json; charset=UTF-8');

$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
if ($origin !== '') {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
} else {
    header('Access-Control-Allow-Origin: *');
}
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(array('error' => 'method_not_allowed', 'items' => array()), JSON_UNESCAPED_UNICODE);
    exit;
}

require_once dirname(__DIR__) . '/includes/bootstrap-readonly.php';

try {
    $sql = 'SELECT id, title, excerpt, href, display_date, is_new, image_src, link_mode
            FROM news_posts
            WHERE published = 1
            ORDER BY display_date DESC, id DESC';
    $st = news_db()->query($sql);
    $rows = $st->fetchAll();
    $items = array();
    foreach ($rows as $r) {
        $img = isset($r['image_src']) ? trim((string) $r['image_src']) : '';
        $excerptVal = null;
        if (isset($r['excerpt']) && $r['excerpt'] !== null && $r['excerpt'] !== '') {
            $excerptVal = $r['excerpt'];
        }
        $items[] = array(
            'id' => (string) $r['id'],
            'title' => $r['title'],
            'excerpt' => $excerptVal,
            'href' => news_post_href_for_site($r),
            'date' => $r['display_date'],
            'isNew' => (bool) (int) $r['is_new'],
            'imageSrc' => $img !== '' ? $img : null,
        );
    }
    echo json_encode(array('items' => $items), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(array('error' => 'server_error', 'items' => array()), JSON_UNESCAPED_UNICODE);
}
