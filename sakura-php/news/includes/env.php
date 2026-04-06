<?php

/**
 * news/.env を読み込み putenv / $_ENV に載せる（KEY=value、# 行コメント、前後空白除去）
 */
function news_load_dotenv($path)
{
    if (!is_readable($path)) {
        return false;
    }
    $lines = file($path, FILE_IGNORE_NEW_LINES);
    if ($lines === false) {
        return false;
    }
    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || (isset($line[0]) && $line[0] === '#')) {
            continue;
        }
        $eq = strpos($line, '=');
        if ($eq === false) {
            continue;
        }
        $name = trim(substr($line, 0, $eq));
        $value = trim(substr($line, $eq + 1));
        $len = strlen($value);
        if ($len >= 2) {
            $q0 = $value[0];
            $q1 = $value[$len - 1];
            if (($q0 === '"' && $q1 === '"') || ($q0 === "'" && $q1 === "'")) {
                $value = substr($value, 1, -1);
            }
        }
        if ($name === '') {
            continue;
        }
        putenv($name . '=' . $value);
        $_ENV[$name] = $value;
    }
    return true;
}

function news_env($key, $default = '')
{
    $v = getenv($key);
    if ($v === false || $v === '') {
        return $default;
    }
    return $v;
}

function news_config_from_env()
{
    return array(
        'db' => array(
            'host' => news_env('NEWS_DB_HOST'),
            'port' => news_env('NEWS_DB_PORT'),
            'dbname' => news_env('NEWS_DB_NAME'),
            'user' => news_env('NEWS_DB_USER'),
            'pass' => news_env('NEWS_DB_PASS'),
            'charset' => news_env('NEWS_DB_CHARSET', 'utf8mb4'),
        ),
        'admin' => array(
            'password' => news_env('NEWS_ADMIN_PASSWORD'),
            'password_hash' => news_env('NEWS_ADMIN_PASSWORD_HASH'),
        ),
    );
}

function news_config_validate_db($config)
{
    $db = isset($config['db']) ? $config['db'] : array();
    $missing = array();
    $map = array(
        'host' => 'NEWS_DB_HOST',
        'dbname' => 'NEWS_DB_NAME',
        'user' => 'NEWS_DB_USER',
        'pass' => 'NEWS_DB_PASS',
    );
    foreach ($map as $k => $envName) {
        if (empty($db[$k])) {
            $missing[] = $envName;
        }
    }
    return $missing;
}

function news_config_validate($config)
{
    $missing = news_config_validate_db($config);
    $admin = isset($config['admin']) ? $config['admin'] : array();
    $hasHash = isset($admin['password_hash']) && trim($admin['password_hash']) !== '';
    $hasPlain = isset($admin['password']) && $admin['password'] !== '';
    if (!$hasHash && !$hasPlain) {
        $missing[] = 'NEWS_ADMIN_PASSWORD_HASH or NEWS_ADMIN_PASSWORD';
    }
    return $missing;
}
