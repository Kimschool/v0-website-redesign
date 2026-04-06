<?php
/**
 * 診断用（本番では問題解決後すぐ削除してください）
 * https://www.kcp.ac.jp/news/admin/check.php
 */

header('Content-Type: text/plain; charset=UTF-8');
header('Cache-Control: no-store');

echo "=== KCP news admin diagnostics ===\n\n";

echo "[1] PHP " . PHP_VERSION . " (" . PHP_SAPI . ")\n";

$bootstrap = dirname(__DIR__) . '/includes/bootstrap.php';
$envPath = dirname(__DIR__) . '/.env';
echo "[2] bootstrap path: {$bootstrap}\n";
echo "    readable: " . (is_readable($bootstrap) ? 'yes' : 'NO') . "\n";
echo "[3] .env path: {$envPath}\n";
echo "    readable: " . (is_readable($envPath) ? 'yes' : 'NO') . "\n";

if (!is_readable($bootstrap)) {
    echo "\nFAIL: includes/bootstrap.php が見つかりません。\n";
    exit;
}

try {
    require_once $bootstrap;
    echo "[4] bootstrap loaded: OK\n";
} catch (Exception $e) {
    echo "[4] bootstrap FAIL: " . $e->getMessage() . "\n";
    exit;
}

if (!isset($GLOBALS['config']['db'])) {
    echo "[5] config db: MISSING\n";
    exit;
}
$db = $GLOBALS['config']['db'];
echo "[5] config db host: " . (isset($db['host']) ? $db['host'] : '?') . "\n";
echo "    dbname: " . (isset($db['dbname']) ? $db['dbname'] : '?') . "\n";
echo "    user: " . (isset($db['user']) ? $db['user'] : '?') . "\n";

$adm = isset($GLOBALS['config']['admin']) ? $GLOBALS['config']['admin'] : array();
$authMode = !empty($adm['password_hash']) ? 'NEWS_ADMIN_PASSWORD_HASH' : (isset($adm['password']) && $adm['password'] !== '' ? 'NEWS_ADMIN_PASSWORD' : 'none');
echo "[5b] admin auth: " . $authMode . " (DB は使用しません)\n";

try {
    $pdo = news_db();
    echo "[6] MySQL PDO: OK\n";
    $pdo->query('SELECT 1');
    echo "[7] query SELECT 1: OK\n";
} catch (Exception $e) {
    echo "[6-7] MySQL FAIL: " . $e->getMessage() . "\n";
    exit;
}

try {
    $pdo->query('SELECT 1 FROM news_posts LIMIT 1');
    echo "[8] news_posts table: OK\n";
} catch (Exception $e) {
    echo "[8] news_posts: FAIL " . $e->getMessage() . " (schema.sql を実行したか確認)\n";
}

echo "\n=== end ===\n";
echo "※ この check.php と ping.php は公開されたままにしないでください。削除を推奨します。\n";
