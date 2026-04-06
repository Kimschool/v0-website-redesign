<?php

function news_csrf_token()
{
    if (empty($_SESSION['news_csrf'])) {
        $_SESSION['news_csrf'] = bin2hex(openssl_random_pseudo_bytes(32));
    }
    return $_SESSION['news_csrf'];
}

function news_csrf_verify()
{
    $t = isset($_POST['csrf']) ? $_POST['csrf'] : '';
    $s = isset($_SESSION['news_csrf']) ? $_SESSION['news_csrf'] : '';
    return is_string($t) && $s !== '' && hash_equals($s, $t);
}
