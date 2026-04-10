<?php
// PHP 5.6: contact form → staff に HTML+plain（multipart）／申請者へ自動返信
// SMTP_USER+SMTP_PASS あり: PHPMailer（test-send.php と同じ）。なければ mail()。

function json_out($code, $payload) {
  send_mail_cors_headers();
  if (!headers_sent()) {
    header('Content-Type: application/json; charset=utf-8');
  }
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

function mail_utf8_subject($subject) {
  if ($subject === '') {
    return '';
  }
  if (function_exists('mb_encode_mimeheader')) {
    return mb_encode_mimeheader($subject, 'UTF-8', 'B', "\r\n");
  }
  return '=?UTF-8?B?' . base64_encode($subject) . '?=';
}

function mail_utf8_display_name($name) {
  if ($name === '') {
    return '';
  }
  if (preg_match('/^[\x09\x20-\x7E]*$/', $name)) {
    return $name;
  }
  if (function_exists('mb_encode_mimeheader')) {
    return mb_encode_mimeheader($name, 'UTF-8', 'B', "\r\n");
  }
  return '=?UTF-8?B?' . base64_encode($name) . '?=';
}

function cert_h($s) {
  return htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
}

function cert_mail_nl2br_html($s) {
  return nl2br(cert_h($s), true);
}

function kcp_phpmailer_configure_smtp($mail, $smtpHost, $smtpPort, $smtpSecure, $smtpUser, $smtpPass) {
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
}

// CORS
function send_mail_cors_headers() {
  if (headers_sent()) {
    return;
  }
  $allow = env_or_default('MAIL_CORS_ORIGIN', '*');
  header('Access-Control-Allow-Origin: ' . $allow);
  header('Vary: Origin');
  header('Access-Control-Allow-Methods: POST, OPTIONS');
  header('Access-Control-Allow-Headers: Accept, Content-Type');
  header('Access-Control-Max-Age: 86400');
}

load_dotenv_if_present(__DIR__ . '/.env');
load_dotenv_if_present(dirname(dirname(__DIR__)) . '/.env');

send_mail_cors_headers();

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit;
}

if (!isset($_SERVER['REQUEST_METHOD']) || $_SERVER['REQUEST_METHOD'] !== 'POST') {
  json_out(405, array('ok' => false, 'error' => 'Method not allowed'));
}

$to = env_or_default('MAIL_TO', '');
if ($to === '') {
  json_out(500, array('ok' => false, 'error' => 'Missing MAIL_TO (set in .env)'));
}

$fromEmail = env_or_default('MAIL_FROM_EMAIL', env_or_default('SMTP_FROM', 'info@kcp.ac.jp'));
$fromName = env_or_default('MAIL_FROM_NAME', env_or_default('SMTP_FROM_NAME', 'KCP Website'));

$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$name = str_replace(array("\r", "\n"), '', $name);
$email = str_replace(array("\r", "\n"), '', $email);
if (isset($_POST['postalCode'])) {
  $_POST['postalCode'] = str_replace(array("\r", "\n"), '', trim((string) $_POST['postalCode']));
}
$userEmail = (filter_var($email, FILTER_VALIDATE_EMAIL) !== false) ? $email : '';
$replyFallback = env_or_default('MAIL_REPLY_FALLBACK', $fromEmail);

$subjectPrefix = env_or_default('MAIL_SUBJECT_PREFIX', '【KCP】証明書発行申込み');
$subject = $subjectPrefix;
if ($name !== '') {
  $subject .= ' - ' . $name;
}

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

$fieldOrder = array(
  'nameKanji', 'name', 'gender', 'nationality', 'birthDate', 'studentId',
  'postalCode', 'address', 'phone', 'email', 'certificateType', 'purpose', 'submissionPlace',
  'receiveMethod', 'notes',
);

$pairs = array();
foreach ($fieldOrder as $key) {
  if (!isset($labels[$key])) continue;
  if (!isset($_POST[$key])) continue;
  $v = $_POST[$key];
  if ($v === '' || $v === null) continue;

  if ($key === 'gender' && isset($genderMap[$v])) {
    $v = $genderMap[$v];
  }
  if ($key === 'receiveMethod' && isset($receiveMethodMap[$v])) {
    $v = $receiveMethodMap[$v];
  }
  if ($key === 'certificateType') {
    if (is_array($v)) {
      $parts = array();
      foreach ($v as $one) {
        $one = trim((string) $one);
        if ($one === '') continue;
        $parts[] = isset($certificateTypeMap[$one]) ? $certificateTypeMap[$one] : $one;
      }
      $v = implode('、', $parts);
      if ($v === '') continue;
    } elseif (isset($certificateTypeMap[$v])) {
      $v = $certificateTypeMap[$v];
    }
  }

  if (is_array($v)) {
    $v = json_encode($v, JSON_UNESCAPED_UNICODE);
  }

  $pairs[] = array('label' => $labels[$key], 'value' => (string) $v, 'key' => $key);
}

$referer = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '';
$ip = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '';

$srcLabel = '送信元';
$ipLabel = 'IP';

$plainLines = array();
foreach ($pairs as $p) {
  $plainLines[] = $p['label'] . '：' . $p['value'];
}
if ($referer !== '') {
  $plainLines[] = '';
  $plainLines[] = $srcLabel . '：' . $referer;
}
if ($ip !== '') {
  $plainLines[] = $ipLabel . '：' . $ip;
}
$plainBody = implode("\n", $plainLines);

$htmlSubtitle = env_or_default('MAIL_HTML_SUBTITLE', '');
if ($htmlSubtitle === '') {
  $htmlSubtitle = 'KCP ウェブサイトフォームからの送信';
}
$htmlFooter = env_or_default('MAIL_HTML_FOOTER', '');
if ($htmlFooter === '') {
  $htmlFooter = 'このメールは自動送信です。返信は「返信」機能をご利用ください。';
}

$htmlTitle = cert_h($subject);

$htmlRows = '';
foreach ($pairs as $p) {
  $ld = cert_h($p['label']);
  $rawVal = $p['value'];
  if ($p['key'] === 'email' && filter_var($rawVal, FILTER_VALIDATE_EMAIL) !== false) {
    $vd = '<a href="mailto:' . cert_h($rawVal) . '">' . cert_h($rawVal) . '</a>';
  } elseif ($p['key'] === 'notes' || $p['key'] === 'purpose' || $p['key'] === 'address') {
    $vd = cert_mail_nl2br_html($rawVal);
  } else {
    $vd = cert_h($rawVal);
  }
  $htmlRows .= '<tr><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;background:#f3f4f6;font-weight:600;width:38%;vertical-align:top;">'
    . $ld . '</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;vertical-align:top;">'
    . $vd . '</td></tr>';
}

if ($referer !== '') {
  $htmlRows .= '<tr><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;background:#f3f4f6;font-weight:600;vertical-align:top;">'
    . cert_h($srcLabel) . '</td><td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;vertical-align:top;">'
    . '<a href="' . cert_h($referer) . '">' . cert_h($referer) . '</a></td></tr>';
}
if ($ip !== '') {
  $htmlRows .= '<tr><td style="padding:10px 14px;background:#f3f4f6;font-weight:600;vertical-align:top;">'
    . cert_h($ipLabel) . '</td><td style="padding:10px 14px;">' . cert_h($ip) . '</td></tr>';
}

$htmlBody = '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="margin:0;padding:16px;background:#e5e7eb;font-family:\'Hiragino Sans\',\'Hiragino Kaku Gothic ProN\',Meiryo,sans-serif;font-size:14px;line-height:1.5;color:#111827;">'
  . '<div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.08);">'
  . '<div style="padding:20px 22px 8px;">'
  . '<h1 style="margin:0 0 8px;font-size:20px;line-height:1.3;">' . $htmlTitle . '</h1>'
  . '<p style="margin:0;color:#6b7280;font-size:13px;">' . cert_h($htmlSubtitle) . '</p>'
  . '</div>'
  . '<table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">'
  . $htmlRows
  . '</table>'
  . '<p style="margin:0;padding:14px 22px 18px;color:#9ca3af;font-size:12px;">' . cert_h($htmlFooter) . '</p>'
  . '</div></body></html>';

$replyTo = ($userEmail !== '') ? $userEmail : $replyFallback;
if ($fromName !== '') {
  $fromHeaderMail = mail_utf8_display_name($fromName) . ' <' . $fromEmail . '>';
} else {
  $fromHeaderMail = $fromEmail;
}

$boundary = '=_kcp_' . substr(md5(uniqid((string) mt_rand(), true)), 0, 24);
$mimeBody = '--' . $boundary . "\r\n"
  . "Content-Type: text/plain; charset=UTF-8\r\n"
  . "Content-Transfer-Encoding: 8bit\r\n\r\n"
  . $plainBody . "\r\n\r\n"
  . '--' . $boundary . "\r\n"
  . "Content-Type: text/html; charset=UTF-8\r\n"
  . "Content-Transfer-Encoding: 8bit\r\n\r\n"
  . $htmlBody . "\r\n\r\n"
  . '--' . $boundary . '--';

$subjectForMail = mail_utf8_subject($subject);

$autoReplySubjectRaw = env_or_default('MAIL_AUTOREPLY_SUBJECT', '【KCP】申請ありがとうございます');
$autoReplyPlain =
  "このメールは自動で送信されています。\n"
  . "申請ありがとうございます。\n"
  . "内容は受け付けました。\n"
  . "現在、確認中です。\n"
  . "確認が終わりましたら、ご連絡いたします。\n"
  . "※数日たっても連絡がない場合は、学校までお問い合わせください。\n";

$autoReplyHtml = '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="margin:0;padding:16px;background:#e5e7eb;font-family:\'Hiragino Sans\',\'Hiragino Kaku Gothic ProN\',Meiryo,sans-serif;font-size:14px;line-height:1.5;color:#111827;">'
  . '<div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.08);">'
  . '<div style="padding:20px 22px;">'
  . '<h1 style="margin:0 0 14px;font-size:20px;line-height:1.3;">申請ありがとうございます</h1>'
  . '<div style="font-size:14px;color:#111827;line-height:1.6;">'
  . '<p style="margin:0 0 10px;">このメールは自動で送信されています。</p>'
  . '<p style="margin:0 0 10px;">申請ありがとうございます。内容は受け付けました。</p>'
  . '<p style="margin:0 0 10px;">現在、確認中です。確認が終わりましたら、ご連絡いたします。</p>'
  . '<p style="margin:0;color:#6b7280;font-size:13px;">※数日たっても連絡がない場合は、学校までお問い合わせください。</p>'
  . '</div></div></div></body></html>';

$autoBoundary = '=_kcp_ar_' . substr(md5(uniqid((string) mt_rand(), true)), 0, 24);
$autoMimeBody = '--' . $autoBoundary . "\r\n"
  . "Content-Type: text/plain; charset=UTF-8\r\n"
  . "Content-Transfer-Encoding: 8bit\r\n\r\n"
  . $autoReplyPlain . "\r\n\r\n"
  . '--' . $autoBoundary . "\r\n"
  . "Content-Type: text/html; charset=UTF-8\r\n"
  . "Content-Transfer-Encoding: 8bit\r\n\r\n"
  . $autoReplyHtml . "\r\n\r\n"
  . '--' . $autoBoundary . '--';

$autoSubjectForMail = mail_utf8_subject($autoReplySubjectRaw);

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
$envelopeFrom = env_or_default('MAIL_ENVELOPE_FROM', '');

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
    kcp_phpmailer_configure_smtp($mail, $smtpHost, $smtpPort, $smtpSecure, $smtpUser, $smtpPass);
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
    $mail->isHTML(true);
    $mail->Body = $htmlBody;
    $mail->AltBody = $plainBody;
    $mail->send();

    if ($userEmail !== '') {
      $mail2 = new \PHPMailer\PHPMailer\PHPMailer(true);
      $mail2->CharSet = 'UTF-8';
      kcp_phpmailer_configure_smtp($mail2, $smtpHost, $smtpPort, $smtpSecure, $smtpUser, $smtpPass);
      $mail2->setFrom($fromEmail, $fromName);
      $mail2->addAddress($userEmail);
      $mail2->addReplyTo($fromEmail);
      $mail2->Subject = $autoReplySubjectRaw;
      $mail2->isHTML(true);
      $mail2->Body = $autoReplyHtml;
      $mail2->AltBody = $autoReplyPlain;
      $mail2->send();
    }
  } catch (\PHPMailer\PHPMailer\Exception $e) {
    json_out(500, array('ok' => false, 'error' => 'Mail send failed', 'detail' => $e->getMessage()));
  } catch (\Exception $e) {
    json_out(500, array('ok' => false, 'error' => 'Mail send failed', 'detail' => $e->getMessage()));
  }
} else {
  $headers = array();
  $headers[] = 'From: ' . $fromHeaderMail;
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
  $headers[] = 'Content-Type: multipart/alternative; boundary="' . $boundary . '"';
  $headersStr = implode("\r\n", $headers);

  $ok = false;
  if ($envelopeFrom !== '' && filter_var($envelopeFrom, FILTER_VALIDATE_EMAIL) !== false) {
    $ok = @mail($to, $subjectForMail, $mimeBody, $headersStr, '-f ' . escapeshellarg($envelopeFrom));
  } else {
    $ok = @mail($to, $subjectForMail, $mimeBody, $headersStr);
  }
  if (!$ok) {
    json_out(500, array(
      'ok' => false,
      'error' => 'Mail send failed',
      'detail' => 'PHP mail() failed. Set SMTP_USER and SMTP_PASS in .env to use Gmail SMTP like test-send.php.',
    ));
  }

  if ($userEmail !== '') {
    $autoHeaders = array();
    $autoHeaders[] = 'From: ' . $fromHeaderMail;
    $autoHeaders[] = 'Reply-To: ' . $fromEmail;
    $autoHeaders[] = 'MIME-Version: 1.0';
    $autoHeaders[] = 'Content-Type: multipart/alternative; boundary="' . $autoBoundary . '"';
    $autoHeadersStr = implode("\r\n", $autoHeaders);
    $autoOk = false;
    if ($envelopeFrom !== '' && filter_var($envelopeFrom, FILTER_VALIDATE_EMAIL) !== false) {
      $autoOk = @mail($userEmail, $autoSubjectForMail, $autoMimeBody, $autoHeadersStr, '-f ' . escapeshellarg($envelopeFrom));
    } else {
      $autoOk = @mail($userEmail, $autoSubjectForMail, $autoMimeBody, $autoHeadersStr);
    }
    if (!$autoOk) {
      json_out(500, array('ok' => false, 'error' => 'Mail send failed'));
    }
  }
}

json_out(200, array('ok' => true));
