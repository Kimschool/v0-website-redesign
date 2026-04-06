<?php

function news_db()
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }
    global $config;
    if (!isset($config['db'])) {
        throw new RuntimeException('config db missing');
    }
    $c = $config['db'];
    // DSN に charset= を付けると、古い mysqlnd（PHP 5.6 等）が MySQL 8 の
    // 文字セット応答で HY000/2054 になることがあります。接続後 SET NAMES で指定する。
    $dsn = sprintf('mysql:host=%s;dbname=%s', $c['host'], $c['dbname']);
    if (!empty($c['port'])) {
        $dsn .= ';port=' . (int) $c['port'];
    }
    $charset = isset($c['charset']) ? $c['charset'] : 'utf8mb4';
    if ($charset === 'utf8') {
        $init = 'SET NAMES utf8 COLLATE utf8_unicode_ci';
    } else {
        $init = 'SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci';
    }
    $pdo = new PDO($dsn, $c['user'], $c['pass'], array(
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
        PDO::MYSQL_ATTR_INIT_COMMAND => $init,
    ));
    return $pdo;
}
