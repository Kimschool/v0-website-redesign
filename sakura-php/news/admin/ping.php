<?php
/**
 * 診断用: PHP がこのディレクトリで動いているかだけ確認します。
 * 正常なら {"ok":true,...} が返ります。問題解決後は削除して構いません。
 */
header('Content-Type: application/json; charset=UTF-8');
header('Cache-Control: no-store');
echo json_encode([
    'ok' => true,
    'php' => PHP_VERSION,
    'sapi' => PHP_SAPI,
    'dir' => __DIR__,
], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
