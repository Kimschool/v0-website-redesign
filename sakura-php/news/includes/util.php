<?php

/**
 * テキストエリアの改行区切りを正規化（空行除去、/ で始まる行のみ）
 */
function news_normalize_gallery_paths($raw)
{
    if (!is_string($raw) || $raw === '') {
        return '';
    }
    $lines = preg_split('/\r\n|\r|\n/', $raw);
    $out = array();
    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '') {
            continue;
        }
        if (isset($line[0]) && $line[0] === '/') {
            $out[] = $line;
        }
    }
    return implode("\n", $out);
}

/**
 * 一覧・リンク用の相対パス（同一 news/ ディレクトリからの参照想定）
 */
function news_post_list_href($row)
{
    $mode = isset($row['link_mode']) ? $row['link_mode'] : 'external';
    if ($mode === 'page') {
        return 'article.php?id=' . (int) $row['id'];
    }
    $h = isset($row['href']) ? trim((string) $row['href']) : '';
    if ($h !== '') {
        return $h;
    }
    return 'article.php?id=' . (int) $row['id'];
}

/**
 * サイト直下からの絶対パス（先頭 /）。Next.js のトップや /news からリンクする・JSON API 用。
 * 相対の article.php は /news/article.php に直す。
 */
function news_post_href_for_site($row)
{
    $path = news_post_list_href($row);
    if ($path !== '' && isset($path[0]) && $path[0] === '/') {
        return $path;
    }
    return '/news/' . $path;
}

function news_gallery_path_lines($gallery_paths)
{
    if (!is_string($gallery_paths) || $gallery_paths === '') {
        return array();
    }
    $lines = preg_split('/\r\n|\r|\n/', $gallery_paths);
    $out = array();
    foreach ($lines as $line) {
        $line = trim($line);
        if ($line !== '' && isset($line[0]) && $line[0] === '/') {
            $out[] = $line;
        }
    }
    return $out;
}
