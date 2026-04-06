<?php

function news_auth_logged_in()
{
    return !empty($_SESSION['news_admin_ok']);
}

/**
 * Node.js / Python bcrypt などの $2b$ を PHP 側で扱いやすくする
 */
function news_auth_normalize_bcrypt_hash($hash)
{
    $hash = trim($hash);
    if ($hash === '') {
        return '';
    }
    if (strncmp($hash, '$2b$', 4) === 0) {
        return '$2y$' . substr($hash, 4);
    }
    return $hash;
}

function news_auth_login($password)
{
    global $config;
    $admin = isset($config['admin']) ? $config['admin'] : array();
    $hash = isset($admin['password_hash']) ? trim($admin['password_hash']) : '';
    if ($hash !== '') {
        $hash = news_auth_normalize_bcrypt_hash($hash);
        return password_verify($password, $hash);
    }
    $plain = isset($admin['password']) ? $admin['password'] : '';
    if ($plain === '') {
        return false;
    }
    return hash_equals($plain, $password);
}

function news_auth_logout()
{
    $_SESSION = array();
    if (ini_get('session.use_cookies')) {
        $p = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $p['path'], $p['domain'], !empty($p['secure']), !empty($p['httponly']));
    }
    session_destroy();
}
