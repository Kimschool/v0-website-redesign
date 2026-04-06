<?php

require_once dirname(__DIR__) . '/includes/bootstrap.php';
require_once dirname(__DIR__) . '/includes/upload.php';

function h($s)
{
    return htmlspecialchars($s, ENT_QUOTES | ENT_HTML5, 'UTF-8');
}

if (isset($_GET['logout'])) {
    news_auth_logout();
    header('Location: ./');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = isset($_POST['action']) ? $_POST['action'] : '';

    if ($action === 'login') {
        $pw = isset($_POST['password']) ? (string) $_POST['password'] : '';
        if (news_auth_login($pw)) {
            $_SESSION['news_admin_ok'] = 1;
            header('Location: ./');
            exit;
        }
        $_SESSION['news_login_error'] = 'パスワードが正しくありません。';
        header('Location: ./');
        exit;
    }

    if (!news_auth_logged_in()) {
        http_response_code(403);
        echo 'Forbidden';
        exit;
    }

    if (!news_csrf_verify()) {
        http_response_code(400);
        echo 'CSRF token mismatch';
        exit;
    }

    if ($action === 'delete') {
        $id = isset($_POST['id']) ? (int) $_POST['id'] : 0;
        if ($id > 0) {
            $st = news_db()->prepare('DELETE FROM news_posts WHERE id = ?');
            $st->execute(array($id));
        }
        header('Location: ./');
        exit;
    }

    if ($action === 'save') {
        $id = isset($_POST['id']) ? (int) $_POST['id'] : 0;
        $title = trim(isset($_POST['title']) ? (string) $_POST['title'] : '');
        $excerpt = trim(isset($_POST['excerpt']) ? (string) $_POST['excerpt'] : '');
        $linkMode = (isset($_POST['link_mode']) && $_POST['link_mode'] === 'page') ? 'page' : 'external';
        $body = isset($_POST['body']) ? (string) $_POST['body'] : '';
        $galleryRaw = isset($_POST['gallery_paths']) ? (string) $_POST['gallery_paths'] : '';
        $galleryPaths = news_normalize_gallery_paths($galleryRaw);
        $href = trim(isset($_POST['href']) ? (string) $_POST['href'] : '');
        $displayDate = trim(isset($_POST['display_date']) ? (string) $_POST['display_date'] : '');
        $imageSrc = trim(isset($_POST['image_src']) ? (string) $_POST['image_src'] : '');
        $isNew = isset($_POST['is_new']) ? 1 : 0;
        $published = isset($_POST['published']) ? 1 : 0;

        $err = '';
        if ($title === '') {
            $err = 'タイトルを入力してください。';
        } elseif (!preg_match('/^\d{4}\.\d{2}\.\d{2}$/', $displayDate)) {
            $err = '日付は YYYY.MM.DD 形式で入力してください。';
        } elseif ($linkMode === 'external') {
            if ($href === '' || !isset($href[0]) || $href[0] !== '/') {
                $err = '外部リンク方式では、リンク先を / から始まるパスで入力してください。';
            }
        }

        if ($err !== '') {
            $_SESSION['news_form_error'] = $err;
            $_SESSION['news_form_old'] = $_POST;
            header('Location: ./?edit=' . ($id ?: 'new'));
            exit;
        }

        $galleryUploadErr = '';
        $uploadedGallery = array();
        if (isset($_FILES['gallery_uploads'])) {
            $uploadedGallery = news_save_gallery_uploads_field($_FILES['gallery_uploads'], $galleryUploadErr);
        }
        if ($galleryUploadErr !== '') {
            $_SESSION['news_form_error'] = $galleryUploadErr;
            $_SESSION['news_form_old'] = $_POST;
            header('Location: ./?edit=' . ($id ?: 'new'));
            exit;
        }

        $mergedGallery = $galleryPaths;
        foreach ($uploadedGallery as $upPath) {
            $mergedGallery = ($mergedGallery === '') ? $upPath : ($mergedGallery . "\n" . $upPath);
        }
        $galleryPaths = news_normalize_gallery_paths($mergedGallery);

        $thumbErr = '';
        $thumbSaved = null;
        if (isset($_FILES['thumb_upload'])) {
            $thumbSaved = news_save_one_image_upload($_FILES['thumb_upload'], $thumbErr);
        }
        if ($thumbErr !== '') {
            $_SESSION['news_form_error'] = $thumbErr;
            $_SESSION['news_form_old'] = $_POST;
            header('Location: ./?edit=' . ($id ?: 'new'));
            exit;
        }

        $hrefDb = null;
        if ($linkMode === 'external') {
            $hrefDb = $href;
        }

        $bodyDb = $body === '' ? null : $body;
        $galleryDb = $galleryPaths === '' ? null : $galleryPaths;
        $excerptDb = $excerpt === '' ? null : $excerpt;
        if ($thumbSaved !== null) {
            $imageDb = $thumbSaved;
        } else {
            $imageDb = $imageSrc === '' ? null : $imageSrc;
        }

        $pdo = news_db();
        try {
            if ($id > 0) {
                $st = $pdo->prepare(
                    'UPDATE news_posts SET title=?, excerpt=?, link_mode=?, body=?, gallery_paths=?, href=?, display_date=?, is_new=?, image_src=?, published=? WHERE id=?'
                );
                $st->execute(array(
                    $title,
                    $excerptDb,
                    $linkMode,
                    $bodyDb,
                    $galleryDb,
                    $hrefDb,
                    $displayDate,
                    $isNew,
                    $imageDb,
                    $published,
                    $id,
                ));
            } else {
                $st = $pdo->prepare(
                    'INSERT INTO news_posts (title, excerpt, link_mode, body, gallery_paths, href, display_date, is_new, image_src, published) VALUES (?,?,?,?,?,?,?,?,?,?)'
                );
                $st->execute(array(
                    $title,
                    $excerptDb,
                    $linkMode,
                    $bodyDb,
                    $galleryDb,
                    $hrefDb,
                    $displayDate,
                    $isNew,
                    $imageDb,
                    $published,
                ));
            }
        } catch (Exception $e) {
            $_SESSION['news_form_error'] = '保存に失敗しました。MySQL の migration-002（カラム追加）を実行したか確認してください。';
            $_SESSION['news_form_old'] = $_POST;
            header('Location: ./?edit=' . ($id ?: 'new'));
            exit;
        }
        unset($_SESSION['news_form_old'], $_SESSION['news_form_error']);
        header('Location: ./');
        exit;
    }
}

$loginError = isset($_SESSION['news_login_error']) ? $_SESSION['news_login_error'] : '';
unset($_SESSION['news_login_error']);
$formError = isset($_SESSION['news_form_error']) ? $_SESSION['news_form_error'] : '';
unset($_SESSION['news_form_error']);
$formOld = isset($_SESSION['news_form_old']) ? $_SESSION['news_form_old'] : null;
unset($_SESSION['news_form_old']);

if (!news_auth_logged_in()) {
    header('Content-Type: text/html; charset=UTF-8');
    ?>
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>お知らせ管理 — ログイン</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 400px; margin: 4rem auto; padding: 0 1rem; }
    label { display: block; margin-bottom: .35rem; font-weight: 600; }
    input[type=password] { width: 100%; padding: .6rem; font-size: 1rem; box-sizing: border-box; }
    button { margin-top: 1rem; padding: .6rem 1.2rem; font-size: 1rem; cursor: pointer; }
    .err { color: #b91c1c; margin-bottom: 1rem; }
  </style>
</head>
<body>
  <h1>お知らせ管理</h1>
  <?php if ($loginError !== '') { ?><p class="err"><?= h($loginError) ?></p><?php } ?>
  <form method="post">
    <input type="hidden" name="action" value="login">
    <label for="password">パスワード</label>
    <input type="password" id="password" name="password" required autocomplete="current-password">
    <button type="submit">ログイン</button>
  </form>
</body>
</html>
    <?php
    exit;
}

$editId = isset($_GET['edit']) ? $_GET['edit'] : '';
$editRow = null;
if ($editId !== '' && $editId !== 'new') {
    $eid = (int) $editId;
    if ($eid > 0) {
        $st = news_db()->prepare('SELECT * FROM news_posts WHERE id = ? LIMIT 1');
        $st->execute(array($eid));
        $editRow = $st->fetch() ?: null;
    }
}

$list = news_db()->query('SELECT * FROM news_posts ORDER BY display_date DESC, id DESC')->fetchAll();

header('Content-Type: text/html; charset=UTF-8');
$csrf = news_csrf_token();
?>
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>お知らせ管理</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; padding: 1rem; background: #f4f4f5; }
    .wrap { max-width: 960px; margin: 0 auto; }
    h1 { font-size: 1.25rem; }
    table { width: 100%; border-collapse: collapse; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,.08); }
    th, td { text-align: left; padding: .6rem .75rem; border-bottom: 1px solid #e4e4e7; font-size: .875rem; vertical-align: top; }
    th { background: #fafafa; }
    .card { background: #fff; padding: 1.25rem; border-radius: 8px; margin-bottom: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,.08); }
    label { display: block; margin: .75rem 0 .25rem; font-weight: 600; font-size: .875rem; }
    input[type=text], textarea { width: 100%; max-width: 100%; padding: .5rem; font-size: .9rem; box-sizing: border-box; }
    textarea.body { min-height: 160px; }
    textarea.gallery { min-height: 100px; font-family: ui-monospace, monospace; font-size: .8rem; }
    .row { display: flex; gap: 1rem; flex-wrap: wrap; align-items: center; margin-top: .5rem; }
    .topbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: .5rem; }
    a.btn, button { display: inline-block; padding: .45rem .9rem; font-size: .875rem; border-radius: 6px; text-decoration: none; cursor: pointer; border: none; }
    a.secondary { background: #e4e4e7; color: #18181b; }
    a.danger { background: #fecaca; color: #7f1d1d; }
    button.primary { background: #0085b2; color: #fff; }
    .err { color: #b91c1c; font-size: .875rem; margin-bottom: .75rem; }
    code { font-size: .8rem; background: #f4f4f5; padding: .1rem .35rem; border-radius: 4px; }
    .hint { font-size: .8rem; color: #71717a; margin: .25rem 0 0; }
    fieldset.mode { border: 1px solid #e4e4e7; border-radius: 8px; padding: .75rem 1rem; margin: .5rem 0 1rem; }
    fieldset.mode legend { font-weight: 600; font-size: .875rem; padding: 0 .35rem; }
  </style>
</head>
<body>
<div class="wrap">
  <div class="topbar">
    <h1>お知らせ一覧・登録</h1>
    <div>
      <a class="btn secondary" href="../list.php" target="_blank" rel="noopener">公開一覧</a>
      <a class="btn secondary" href="?logout=1">ログアウト</a>
    </div>
  </div>

  <?php if ($formError !== '') { ?><p class="err"><?= h($formError) ?></p><?php } ?>

  <?php
    $o = $formOld;
    $showForm = $editRow !== null || $editId === 'new' || is_array($formOld);
    $f = static function ($k, $fallback = '') use ($o, $editRow) {
        if (is_array($o) && array_key_exists($k, $o)) {
            return (string) $o[$k];
        }
        if ($editRow) {
            $map = array(
                'display_date' => 'display_date',
                'image_src' => 'image_src',
                'gallery_paths' => 'gallery_paths',
                'link_mode' => 'link_mode',
                'body' => 'body',
            );
            $dbKey = isset($map[$k]) ? $map[$k] : $k;
            if (array_key_exists($dbKey, $editRow)) {
                $v = $editRow[$dbKey];
                if ($k === 'is_new' || $k === 'published') {
                    return (string) (int) $v;
                }
                return $v === null ? '' : (string) $v;
            }
        }
        return $fallback;
    };
    $defaultMode = $f('link_mode', 'external');
    if ($defaultMode !== 'page') {
        $defaultMode = 'external';
    }
  ?>
  <div class="card">
    <h2 style="margin-top:0;font-size:1rem;"><?php
      if (!$showForm) {
          echo '新しいお知らせ';
      } elseif ($editRow) {
          echo '編集';
      } else {
          echo '新規登録';
      }
    ?></h2>
    <?php
    if (!$showForm) {
        echo '<p style="margin:0;"><a class="btn primary" href="?edit=new" style="background:#0085b2;color:#fff;">＋ 新規を追加</a></p>';
    } else {
        $eidVal = $editRow ? (int) $editRow['id'] : 0;
        ?>
    <form method="post" id="news-form" enctype="multipart/form-data">
      <input type="hidden" name="action" value="save">
      <input type="hidden" name="csrf" value="<?= h($csrf) ?>">
      <input type="hidden" name="id" value="<?= $eidVal ?>">

      <fieldset class="mode">
        <legend>掲載方式</legend>
        <label><input type="radio" name="link_mode" value="external" <?= $defaultMode === 'external' ? 'checked' : '' ?>> 従来どおりサイト内の別ページへリンク（例: Next の /news/...）</label>
        <label style="margin-top:.5rem;"><input type="radio" name="link_mode" value="page" <?= $defaultMode === 'page' ? 'checked' : '' ?>> 本文・画像をこのサーバの PHP ページで表示（<code>article.php?id=</code>）</label>
      </fieldset>

      <label for="title">タイトル</label>
      <input type="text" id="title" name="title" required value="<?= h($f('title')) ?>">

      <label for="excerpt">概要（一覧用・任意）</label>
      <textarea id="excerpt" name="excerpt"><?= h($f('excerpt')) ?></textarea>

      <div id="block-external">
        <label for="href">リンク先パス（外部リンク方式のとき必須）</label>
        <input type="text" id="href" name="href" placeholder="/news/..." value="<?= h($f('href')) ?>">
        <p class="hint">サイト内パスを <code>/</code> から入力してください。</p>
      </div>

      <div id="block-page">
        <label for="body">本文（本文ページ方式）</label>
        <textarea class="body" id="body" name="body" placeholder="お知らせの本文"><?= h($f('body')) ?></textarea>
        <label for="gallery_paths">画像パス（手入力・任意・1行1つ）</label>
        <textarea class="gallery" id="gallery_paths" name="gallery_paths" placeholder="/images/example/photo.jpg&#10;/images/example/photo2.jpg"><?= h($f('gallery_paths')) ?></textarea>
        <p class="hint">既にサーバにある画像のパス。先頭は <code>/</code>。下のファイル選択でアップロードしたパスが自動で追記されます。</p>
        <label for="gallery_uploads">画像をサーバにアップロード（複数可・JPEG/PNG/GIF・各5MBまで・最大20枚）</label>
        <input type="file" id="gallery_uploads" name="gallery_uploads[]" accept="image/jpeg,image/png,image/gif" multiple>
      </div>

      <label for="display_date">表示日付（YYYY.MM.DD）</label>
      <input type="text" id="display_date" name="display_date" required pattern="\d{4}\.\d{2}\.\d{2}" placeholder="2026.01.13" value="<?= h($f('display_date', '')) ?>">

      <label for="image_src">一覧サムネ画像パス（任意・手入力）</label>
      <input type="text" id="image_src" name="image_src" placeholder="/images/..." value="<?= h($f('image_src')) ?>">
      <label for="thumb_upload">または 一覧サムネをファイルでアップロード（保存時にパスが自動設定）</label>
      <input type="file" id="thumb_upload" name="thumb_upload" accept="image/jpeg,image/png,image/gif">

      <div class="row">
        <label><input type="checkbox" name="is_new" value="1" <?php
          if (is_array($o)) {
              $chkNew = array_key_exists('is_new', $o);
          } elseif ($editRow) {
              $chkNew = (bool) (int) $editRow['is_new'];
          } else {
              $chkNew = false;
          }
          echo $chkNew ? 'checked' : '';
        ?>> NEW 表示</label>
        <label><input type="checkbox" name="published" value="1" <?php
          if (is_array($o)) {
              $chkPub = array_key_exists('published', $o);
          } elseif ($editRow) {
              $chkPub = (bool) (int) $editRow['published'];
          } else {
              $chkPub = true;
          }
          echo $chkPub ? 'checked' : '';
        ?>> 公開する</label>
      </div>
      <div class="row" style="margin-top:1rem;">
        <button class="primary" type="submit">保存</button>
        <a class="btn secondary" href="./">キャンセル</a>
      </div>
    </form>
    <script>
    (function () {
      var form = document.getElementById('news-form');
      if (!form) return;
      var ext = document.getElementById('block-external');
      var page = document.getElementById('block-page');
      var href = document.getElementById('href');
      function sync() {
        var mode = (form.querySelector('input[name=link_mode]:checked') || {}).value || 'external';
        if (ext) ext.style.display = mode === 'external' ? 'block' : 'none';
        if (page) page.style.display = mode === 'page' ? 'block' : 'none';
        if (href) href.required = (mode === 'external');
      }
      form.querySelectorAll('input[name=link_mode]').forEach(function (r) { r.addEventListener('change', sync); });
      sync();
    })();
    </script>
    <?php } ?>
  </div>

  <table>
    <thead>
      <tr>
        <th>日付</th>
        <th>タイトル</th>
        <th>方式</th>
        <th>リンク先</th>
        <th>公開</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
    <?php if (count($list) === 0) { ?>
      <tr><td colspan="6">まだ記事がありません。<a href="?edit=new">新規登録</a></td></tr>
    <?php } else { foreach ($list as $row) {
        $lm = isset($row['link_mode']) ? $row['link_mode'] : 'external';
        $modeLabel = $lm === 'page' ? '本文' : 'リンク';
        $listHref = news_post_list_href($row);
    ?>
      <tr>
        <td><?= h($row['display_date']) ?></td>
        <td><?= h($row['title']) ?></td>
        <td><?= h($modeLabel) ?></td>
        <td><code><?= h($listHref) ?></code></td>
        <td><?= (int) $row['published'] ? 'はい' : 'いいえ' ?></td>
        <td>
          <a class="btn secondary" href="?edit=<?= (int) $row['id'] ?>">編集</a>
          <form method="post" style="display:inline;" onsubmit="return confirm('削除しますか？');">
            <input type="hidden" name="action" value="delete">
            <input type="hidden" name="csrf" value="<?= h($csrf) ?>">
            <input type="hidden" name="id" value="<?= (int) $row['id'] ?>">
            <button type="submit" class="btn danger" style="margin-left:.25rem;">削除</button>
          </form>
        </td>
      </tr>
    <?php } } ?>
    </tbody>
  </table>

  <p style="margin-top:1.5rem;font-size:.8rem;color:#71717a;">
    公開一覧: <code>../list.php</code> ・ 本文ページ: <code>../article.php?id=</code>
  </p>
</div>
</body>
</html>
