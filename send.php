<?php
// PHP contact form mail endpoint (FormData -> $_POST -> Gmail SMTP)

header('Content-Type: application/json; charset=utf-8');

// Make errors visible in a log file on shared hosting.
// (Avoid display_errors in production; log only.)
@ini_set('log_errors', '1');
@ini_set('error_log', __DIR__ . '/mail-error.log');
@error_reporting(E_ALL);

function json_out($code, $payload) {
  http_response_code($code);
  echo json_encode($payload, JSON_UNESCAPED_UNICODE);
  exit;
}

// PHPMailer 6 requires PHP >= 5.5
if (defined('PHP_VERSION_ID') && PHP_VERSION_ID < 50500) {
  json_out(500, array('ok' => false, 'error' => 'PHP version too old', 'detail' => PHP_VERSION));
}

function load_dotenv_if_present($path) {
  if (!file_exists($path)) return;
  $lines = @file($path, FILE_IGNORE_NEW_LINES);
  if ($lines === false) return;

  foreach ($lines as $line) {
    $line = trim($line);
    if ($line === '') continue;
    if ($line[0] === '#') continue;

    $eqPos = strpos($line, '=');
    if ($eqPos === false) continue;

    $key = trim(substr($line, 0, $eqPos));
    $val = trim(substr($line, $eqPos + 1));
    if ($key === '') continue;

    // Strip optional surrounding quotes
    $len = strlen($val);
    if ($len >= 2) {
      $first = $val[0];
      $last = $val[$len - 1];
      if (($first === '"' && $last === '"') || ($first === "'" && $last === "'")) {
        $val = substr($val, 1, $len - 2);
      }
    }

    // Don't overwrite already-set environment variables
    $existing = getenv($key);
    if ($existing !== false && $existing !== null && $existing !== '') continue;

    // Export
    putenv($key . '=' . $val);
    $_ENV[$key] = $val;
  }
}

function env_or_default($key, $defaultValue) {
  $v = getenv($key);
  if ($v === false || $v === null || $v === '') return $defaultValue;
  return $v;
}

// Allow POST only
if (!isset($_SERVER['REQUEST_METHOD']) || $_SERVER['REQUEST_METHOD'] !== 'POST') {
  json_out(405, array('ok' => false, 'error' => 'Method not allowed'));
}

// Optional: load .env from same directory (common on shared hosting)
load_dotenv_if_present(__DIR__ . '/.env');

// Load PHPMailer (installed via Composer)
$autoload = __DIR__ . '/vendor/autoload.php';
if (!file_exists($autoload)) {
  json_out(500, array('ok' => false, 'error' => 'Missing vendor/autoload.php. Run: composer install'));
}
require_once $autoload;

// Basic input (reply-to only; never use user input as From)
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$name = str_replace(array("\r", "\n"), '', $name);
$email = str_replace(array("\r", "\n"), '', $email);
if (isset($_POST['postalCode'])) {
  $_POST['postalCode'] = str_replace(array("\r", "\n"), '', trim((string) $_POST['postalCode']));
}
$userEmail = (filter_var($email, FILTER_VALIDATE_EMAIL) !== false) ? $email : '';

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
  'postalCode' => '郵便番号',
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
$rows = array();
foreach ($labels as $key => $label) {
  if (!isset($_POST[$key])) continue;
  $v = $_POST[$key];
  if ($v === '' || $v === null) continue;

  // Map dropdown codes to Japanese
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
  $rows[] = array($label, (string)$v);
}

$referer = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '';
$ip = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '';

if ($referer !== '') {
  $lines[] = '';
  $lines[] = '送信元：' . $referer;
  $rows[] = array('送信元', $referer);
}
$ip = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '';
if ($ip !== '') {
  $lines[] = 'IP：' . $ip;
  $rows[] = array('IP', $ip);
}

$bodyText = implode("\n", $lines);

function h($s) {
  return htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
}

$tableRowsHtml = '';
foreach ($rows as $r) {
  $k = isset($r[0]) ? $r[0] : '';
  $v = isset($r[1]) ? $r[1] : '';
  $tableRowsHtml .=
    '<tr>'
    . '<td style="padding:10px 12px;border:1px solid #e5e7eb;background:#f9fafb;font-weight:600;white-space:nowrap;vertical-align:top;">' . h($k) . '</td>'
    . '<td style="padding:10px 12px;border:1px solid #e5e7eb;vertical-align:top;word-break:break-word;">' . nl2br(h($v)) . '</td>'
    . '</tr>';
}

$bodyHtml =
  '<div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#111827;line-height:1.5;">'
  . '<div style="max-width:720px;margin:0 auto;padding:24px;">'
  . '<div style="padding:18px 20px;border:1px solid #e5e7eb;border-radius:12px;background:#ffffff;">'
  . '<div style="font-size:18px;font-weight:700;margin:0 0 12px;">' . h($subject) . '</div>'
  . '<div style="font-size:13px;color:#6b7280;margin:0 0 18px;">KCP Website form submission</div>'
  . '<table role="presentation" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;">'
  . $tableRowsHtml
  . '</table>'
  . '</div>'
  . '<div style="font-size:12px;color:#9ca3af;margin-top:12px;">'
  . 'This email was sent automatically. If you need to reply, use Reply-To.'
  . '</div>'
  . '</div>'
  . '</div>';

$autoReplyText =
  "このメールは自動で送信されています。\n"
  . "申請ありがとうございます。\n"
  . "内容は受け付けました。\n"
  . "現在、確認中です。\n"
  . "確認が終わりましたら、ご連絡いたします。\n"
  . "※数日たっても連絡がない場合は、学校までお問い合わせください。\n";

$autoReplyHtml =
  '<div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#111827;line-height:1.6;">'
  . '<div style="max-width:720px;margin:0 auto;padding:24px;">'
  . '<div style="padding:18px 20px;border:1px solid #e5e7eb;border-radius:12px;background:#ffffff;">'
  . '<div style="font-size:18px;font-weight:700;margin:0 0 12px;">申請ありがとうございます</div>'
  . '<div style="font-size:14px;color:#111827;">'
  . '<p style="margin:0 0 10px;">このメールは自動で送信されています。</p>'
  . '<p style="margin:0 0 10px;">申請ありがとうございます。内容は受け付けました。</p>'
  . '<p style="margin:0 0 10px;">現在、確認中です。確認が終わりましたら、ご連絡いたします。</p>'
  . '<p style="margin:0;color:#6b7280;">※数日たっても連絡がない場合は、学校までお問い合わせください。</p>'
  . '</div>'
  . '</div>'
  . '</div>'
  . '</div>';

// Gmail SMTP (Google Workspace) — all from .env (see .env.example)
// Required: SMTP_USER, SMTP_PASS, MAIL_TO
// Optional: SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_FROM, SMTP_FROM_NAME,
//           MAIL_CC, MAIL_REPLY_FALLBACK, MAIL_SUBJECT_PREFIX, MAIL_AUTOREPLY_SUBJECT
$smtpHost = env_or_default('SMTP_HOST', 'smtp.gmail.com');
$smtpPort = intval(env_or_default('SMTP_PORT', '587'));
$smtpSecure = env_or_default('SMTP_SECURE', 'tls');
$smtpUser = env_or_default('SMTP_USER', '');
$smtpPass = env_or_default('SMTP_PASS', '');
$fromEmail = env_or_default('SMTP_FROM', 'info@kcp.ac.jp');
$fromName = env_or_default('SMTP_FROM_NAME', 'KCP Website');
$to = env_or_default('MAIL_TO', '');
$replyFallback = env_or_default('MAIL_REPLY_FALLBACK', $fromEmail);
$replyTo = ($userEmail !== '') ? $userEmail : $replyFallback;
$autoReplySubject = env_or_default('MAIL_AUTOREPLY_SUBJECT', '【KCP】申請ありがとうございます');

if ($to === '') {
  json_out(500, array('ok' => false, 'error' => 'Missing MAIL_TO (set in .env)'));
}
if ($smtpUser === '' || $smtpPass === '') {
  json_out(500, array('ok' => false, 'error' => 'Missing SMTP_USER/SMTP_PASS (set in .env)'));
}

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

  // Envelope / headers
  $mail->setFrom($fromEmail, $fromName);
  $mail->addAddress($to);
  $mail->addReplyTo($replyTo);
  $mail->Subject = $subject;
  $mail->isHTML(true);
  $mail->Body = $bodyHtml;
  $mail->AltBody = $bodyText;

  // If you need CC later, provide comma-separated list in MAIL_CC
  $ccList = env_or_default('MAIL_CC', '');
  if ($ccList !== '') {
    $parts = preg_split('/\s*,\s*/', $ccList);
    foreach ($parts as $ccAddr) {
      if ($ccAddr === '') continue;
      if (filter_var($ccAddr, FILTER_VALIDATE_EMAIL) === false) continue;
      $mail->addCC($ccAddr);
    }
  }

  $mail->send();

  // Auto-reply to applicant (only when a valid email was provided)
  if ($userEmail !== '') {
    $mail2 = new \PHPMailer\PHPMailer\PHPMailer(true);
    $mail2->CharSet = 'UTF-8';

    $mail2->isSMTP();
    $mail2->Host = $smtpHost;
    $mail2->SMTPAuth = true;
    $mail2->Username = $smtpUser;
    $mail2->Password = $smtpPass;
    $mail2->Port = $smtpPort;

    if ($smtpSecure === 'ssl') {
      $mail2->SMTPSecure = \PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS;
    } else {
      $mail2->SMTPSecure = \PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
    }

    $mail2->setFrom($fromEmail, $fromName);
    $mail2->addAddress($userEmail);
    $mail2->addReplyTo($fromEmail);
    $mail2->Subject = $autoReplySubject;
    $mail2->isHTML(true);
    $mail2->Body = $autoReplyHtml;
    $mail2->AltBody = $autoReplyText;
    $mail2->send();
  }
} catch (\PHPMailer\PHPMailer\Exception $e) {
  json_out(500, array('ok' => false, 'error' => 'Mail send failed', 'detail' => $e->getMessage()));
} catch (\Exception $e) {
  json_out(500, array('ok' => false, 'error' => 'Mail send failed', 'detail' => $e->getMessage()));
}

json_out(200, array('ok' => true));