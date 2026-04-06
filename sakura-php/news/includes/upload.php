<?php

/** 1ファイルあたりの上限（バイト） */
define('NEWS_UPLOAD_MAX_BYTES', 5 * 1024 * 1024);

/** 1回の保存で受け付けるギャラリー画像の最大枚数 */
define('NEWS_UPLOAD_MAX_FILES', 20);

/** Web から見えるパス（ドキュメントルートから。news が /news/ にある前提） */
define('NEWS_UPLOAD_URL_PREFIX', '/news/uploads');

/**
 * 保存先ディレクトリ（news/uploads）
 */
function news_upload_dir_fs()
{
    return dirname(__DIR__) . '/uploads';
}

/**
 * 1枚保存。成功時は /news/uploads/ファイル名 を返す。
 */
function news_save_one_image_upload($file, &$errMsg)
{
    $errMsg = '';
    if (!isset($file['error']) || !isset($file['tmp_name'])) {
        $errMsg = 'アップロード情報が不正です。';
        return null;
    }
    if ($file['error'] === UPLOAD_ERR_NO_FILE) {
        return null;
    }
    if ($file['error'] !== UPLOAD_ERR_OK) {
        $errMsg = 'ファイルのアップロードに失敗しました（コード ' . (int) $file['error'] . '）。';
        return null;
    }
    if (!is_uploaded_file($file['tmp_name'])) {
        $errMsg = 'アップロードされたファイルを読めません。';
        return null;
    }
    if ($file['size'] > NEWS_UPLOAD_MAX_BYTES) {
        $errMsg = 'ファイルサイズは ' . (NEWS_UPLOAD_MAX_BYTES / 1024 / 1024) . 'MB 以下にしてください。';
        return null;
    }

    $tmp = $file['tmp_name'];
    $info = @getimagesize($tmp);
    if ($info === false) {
        $errMsg = '画像ファイル（JPEG / PNG / GIF）のみアップロードできます。';
        return null;
    }
    $mime = isset($info['mime']) ? $info['mime'] : '';
    $extMap = array(
        'image/jpeg' => 'jpg',
        'image/png' => 'png',
        'image/gif' => 'gif',
    );
    if (!isset($extMap[$mime])) {
        $errMsg = '対応形式は JPEG / PNG / GIF のみです。';
        return null;
    }
    $ext = $extMap[$mime];

    $dir = news_upload_dir_fs();
    if (!is_dir($dir)) {
        if (!@mkdir($dir, 0755, true)) {
            $errMsg = '保存用フォルダ uploads を作成できません。権限を確認してください。';
            return null;
        }
    }
    if (!is_writable($dir)) {
        $errMsg = 'uploads フォルダに書き込みできません。';
        return null;
    }

    $name = bin2hex(openssl_random_pseudo_bytes(16)) . '.' . $ext;
    $dest = $dir . '/' . $name;
    if (!move_uploaded_file($tmp, $dest)) {
        $errMsg = 'サーバへの保存に失敗しました。';
        return null;
    }
    @chmod($dest, 0644);

    return NEWS_UPLOAD_URL_PREFIX . '/' . $name;
}

/**
 * $_FILES['gallery_uploads'] 複数対応。パスの配列を返す。
 */
function news_save_gallery_uploads_field($filesField, &$errMsg)
{
    $errMsg = '';
    $out = array();
    if (!isset($filesField['tmp_name'])) {
        return $out;
    }

    if (!is_array($filesField['tmp_name'])) {
        if ($filesField['error'] === UPLOAD_ERR_NO_FILE) {
            return $out;
        }
        $one = news_save_one_image_upload($filesField, $errMsg);
        if ($errMsg !== '') {
            return array();
        }
        if ($one !== null) {
            $out[] = $one;
        }
        return $out;
    }

    $n = count($filesField['tmp_name']);
    if ($n > NEWS_UPLOAD_MAX_FILES) {
        $errMsg = '一度にアップロードできる画像は最大 ' . NEWS_UPLOAD_MAX_FILES . ' 枚です。';
        return array();
    }

    for ($i = 0; $i < $n; $i++) {
        if ($filesField['error'][$i] === UPLOAD_ERR_NO_FILE) {
            continue;
        }
        $slice = array(
            'name' => isset($filesField['name'][$i]) ? $filesField['name'][$i] : '',
            'type' => isset($filesField['type'][$i]) ? $filesField['type'][$i] : '',
            'tmp_name' => $filesField['tmp_name'][$i],
            'error' => $filesField['error'][$i],
            'size' => isset($filesField['size'][$i]) ? $filesField['size'][$i] : 0,
        );
        $rowErr = '';
        $one = news_save_one_image_upload($slice, $rowErr);
        if ($rowErr !== '') {
            $errMsg = $rowErr;
            return array();
        }
        if ($one !== null) {
            $out[] = $one;
        }
    }
    return $out;
}
