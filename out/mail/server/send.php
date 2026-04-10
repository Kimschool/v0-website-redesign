<?php
// PHP 5.6 compatible: contact form mail endpoint (FormData -> $_POST)
// - SMTP_USER + SMTP_PASS が .env にある場合: PHPMailer で SMTP 送信（test-send.php と同じ経路）
// - 未設定の場合のみ PHP mail()（サーバの sendmail 依存。共有レンタルでは多くの環境で未構成のため失敗しやすい）

header('Content-Type: application/json; charset=utf-8');

function json_out($code, $payload) {
  http_response_code($code);
  echo json_encode($payload, JSON_UNESCAPED_UNICODE);
  exit;
}

function load_dotenv_if_present($path) {
  if (!file_exists($path)) return;
  $lines = @file($path, FILE_IGNORE_NEW_LINES);
  if ($lines === false) return;

  foreach ($lines as $line) {
    $line = trim($line);
    if ($line === '') continue;
    if (isset($line[0]) && $line[0] === '#') continue;

    $eqPos = strpos($line, '=');
    if ($eqPos === false) continue;

    $key = trim(substr($line, 0, $eqPos));
    $val = trim(substr($line, $eqPos + 1));
    if ($key === '') continue;

    $len = strlen($val);
    if ($len >= 2) {
      $first = $val[0];
      $last = $val[$len - 1];
      if (($first === '"' && $last === '"') || ($first === "'" && $last === "'")) {
        $val = substr($val, 1, $len - 2);
      }
    }

    $existing = getenv($key);
    if ($existing !== false && $existing !== null && $existing !== '') continue;

    putenv($key . '=' . $val);
    $_ENV[$key] = $val;
  }
}

function env_or_default($key, $defaultValue) {
  $v = getenv($key);
  if ($v === false || $v === null || $v === '') return $defaultValue;
  return $v;
}

// This directory first, then project root fills any keys still unset (PHP 5.6: nested dirname)
load_dotenv_if_present(__DIR__ . '/.env');
load_dotenv_if_present(dirname(dirname(__DIR__)) . '/.env');

// Allow POST only
if (!isset($_SERVER['REQUEST_METHOD']) || $_SERVER['REQUEST_METHOD'] !== 'POST') {
  json_out(405, array('ok' => false, 'error' => 'Method not allowed'));
}

$to = env_or_default('MAIL_TO', '');
if ($to === '') {
  json_out(500, array('ok' => false, 'error' => 'Missing MAIL_TO (set in .env)'));
}

$fromEmail = env_or_default('MAIL_FROM_EMAIL', env_or_default('SMTP_FROM', 'info@kcp.ac.jp'));
$fromName = env_or_default('MAIL_FROM_NAME', env_or_default('SMTP_FROM_NAME', 'KCP Website'));

// Basic input (reply-to only; never use user input as From)
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$name = str_replace(array("\r", "\n"), '', $name);
$email = str_replace(array("\r", "\n"), '', $email);
$userEmail = (filter_var($email, FILTER_VALIDATE_EMAIL) !== false) ? $email : '';
$replyFallback = env_or_default('MAIL_REPLY_FALLBACK', $fromEmail);

$subjectPrefix = env_or_default('MAIL_SUBJECT_PREFIX', '【KCP】証明書発行申込み');
$subject = $subjectPrefix;
if ($name !== '') $subject .= ' - ' . $name;

// Value mappings (dropdowns)
$genderMap = array(
  'male' => '男性',
  'female' => '女性',
  'other' => 'その他',
);
$receiveMethodMap = array(
  'mail' => '郵送',
  'pickup' => '本人がお受け取り',
  'proxy' => '代理人がお受け取り',
);
$certificateTypeMap = array(
  'attendance' => '出席・成績証明書',
  'graduation' => '卒業証明書・修了証明書',
  'withdrawal' => '退学証明書',
  'other' => 'その他',
);

// Labels for email body
$labels = array(
  'nameKanji' => '漢字氏名',
  'name' => '英文氏名',
  'gender' => '性別',
  'nationality' => '国籍',
  'birthDate' => '生年月日',
  'studentId' => '学籍番号',
  'address' => '現住所',
  'phone' => '電話番号',
  'email' => 'メールアドレス',
  'certificateType' => '証明書の種類',
  'purpose' => '申請の目的',
  'submissionPlace' => '提出先',
  'receiveMethod' => '受け取り方法',
  'notes' => '備考',
);

$lines = array();
foreach ($labels as $key => $label) {
  if (!isset($_POST[$key])) continue;
  $v = $_POST[$key];
  if ($v === '' || $v === null) continue;

  if ($key === 'gender' && isset($genderMap[$v])) $v = $genderMap[$v];
  if ($key === 'receiveMethod' && isset($receiveMethodMap[$v])) $v = $receiveMethodMap[$v];
  if ($key === 'certificateType') {
    if (is_array($v)) {
      $parts = array();
      foreach ($v as $one) {
        $one = trim((string)$one);
        if ($one === '') continue;
        $parts[] = isset($certificateTypeMap[$one]) ? $certificateTypeMap[$one] : $one;
      }
      $v = implode('、', $parts);
      if ($v === '') continue;
    } elseif (isset($certificateTypeMap[$v])) {
      $v = $certificateTypeMap[$v];
    }
  }

  if (is_array($v)) $v = json_encode($v, JSON_UNESCAPED_UNICODE);
  $lines[] = $label . '：' . $v;
}

$referer = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '';
$ip = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '';

if ($referer !== '') {
  $lines[] = '';
  $lines[] = '送信元：' . $referer;
}
if ($ip !== '') $lines[] = 'IP：' . $ip;

$body = implode("\n", $lines);

$replyTo = ($userEmail !== '') ? $userEmail : $replyFallback;
$fromHeader = $fromName !== '' ? ($fromName . ' <' . $fromEmail . '>') : $fromEmail;

$smtpHost = env_or_default('SMTP_HOST', 'smtp.gmail.com');
$smtpPort = intval(env_or_default('SMTP_PORT', '587'));
$smtpSecure = env_or_default('SMTP_SECURE', 'tls');
$smtpUser = env_or_default('SMTP_USER', '');
$smtpPass = env_or_default('SMTP_PASS', '');

$autoloadCandidates = array(
  __DIR__ . '/vendor/autoload.php',
  __DIR__ . '/../vendor/autoload.php',
  __DIR__ . '/../../vendor/autoload.php',
);
$autoload = null;
foreach ($autoloadCandidates as $p) {
  if (file_exists($p)) {
    $autoload = $p;
    break;
  }
}

$ccList = env_or_default('MAIL_CC', '');

if ($smtpUser !== '' && $smtpPass !== '') {
  if ($autoload === null) {
    json_out(500, array(
      'ok' => false,
      'error' => 'SMTP is configured but PHPMailer not found',
      'detail' => 'Install Composer deps so vendor/autoload.php exists (same as test-send.php).',
    ));
  }
  require_once $autoload;
  try {
    $mail = new \PHPMailer\PHPMailer\PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->isSMTP();
    $mail->Host = $smtpHost;
    $mail->SMTPAuth = true;
    $mail->Username = $smtpUser;
    $mail->Password = $smtpPass;
    $mail->Port = $smtpPort;
    if ($smtpSecure === 'ssl') {
      $mail->SMTPSecure = \PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS;
    } else {
      $mail->SMTPSecure = \PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
    }
    $mail->setFrom($fromEmail, $fromName);
    $mail->addAddress($to);
    $mail->addReplyTo($replyTo);
    if ($ccList !== '') {
      $parts = preg_split('/\s*,\s*/', $ccList);
      foreach ($parts as $ccAddr) {
        if ($ccAddr === '') continue;
        if (filter_var($ccAddr, FILTER_VALIDATE_EMAIL) === false) continue;
        $mail->addCC($ccAddr);
      }
    }
    $mail->Subject = $subject;
    $mail->Body = $body;
    $mail->isHTML(false);
    $mail->send();
  } catch (\PHPMailer\PHPMailer\Exception $e) {
    json_out(500, array('ok' => false, 'error' => 'Mail send failed', 'detail' => $e->getMessage()));
  } catch (\Exception $e) {
    json_out(500, array('ok' => false, 'error' => 'Mail send failed', 'detail' => $e->getMessage()));
  }
} else {
  $headers = array();
  $headers[] = 'From: ' . $fromHeader;
  $headers[] = 'Reply-To: ' . $replyTo;
  if ($ccList !== '') {
    $parts = preg_split('/\s*,\s*/', $ccList);
    $ccOk = array();
    foreach ($parts as $ccAddr) {
      if ($ccAddr === '') continue;
      if (filter_var($ccAddr, FILTER_VALIDATE_EMAIL) === false) continue;
      $ccOk[] = $ccAddr;
    }
    if (count($ccOk) > 0) {
      $headers[] = 'Cc: ' . implode(', ', $ccOk);
    }
  }
  $headers[] = 'MIME-Version: 1.0';
  $headers[] = 'Content-Type: text/plain; charset=UTF-8';
  $headersStr = implode("\r\n", $headers);
  $ok = @mail($to, $subject, $body, $headersStr);
  if (!$ok) {
    json_out(500, array(
      'ok' => false,
      'error' => 'Mail send failed',
      'detail' => 'PHP mail() failed. Set SMTP_USER and SMTP_PASS in .env to use Gmail SMTP like test-send.php.',
    ));
  }
}

json_out(200, array('ok' => true));
