<?php

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

require_once __DIR__ . '/env.php';

$envPath = dirname(__DIR__) . '/.env';
if (!news_load_dotenv($envPath)) {
    http_response_code(500);
    header('Content-Type: text/plain; charset=UTF-8');
    echo ".env が読めません。news/.env.example をコピーして news/.env を作成してください。\n";
    exit;
}

$config = news_config_from_env();
$GLOBALS['config'] = $config;
$missing = news_config_validate($config);
if (!empty($missing)) {
    http_response_code(500);
    header('Content-Type: text/plain; charset=UTF-8');
    echo "環境変数が不足しています: " . implode(', ', $missing) . "\n";
    exit;
}

require_once __DIR__ . '/util.php';
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/csrf.php';
