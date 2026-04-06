<?php
/**
 * 管理者パスワードのハッシュを1行で出力します。
 * 使い方: php scripts/hash-password.php 'あなたのパスワード'
 * 出力された文字列を news/.env の NEWS_ADMIN_PASSWORD_HASH に設定してください。
 */
$pw = isset($argv[1]) ? $argv[1] : '';
if ($pw === '') {
    fwrite(STDERR, "Usage: php hash-password.php 'your-password'\n");
    exit(1);
}

echo password_hash($pw, PASSWORD_DEFAULT) . PHP_EOL;
