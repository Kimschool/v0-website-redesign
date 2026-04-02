<?php
// PHP 5.6 compatible: contact form mail endpoint (FormData -> $_POST -> mail)

header('Content-Type: application/json; charset=utf-8');

function json_out($code, $payload) {
  http_response_code($code);
  echo json_encode($payload, JSON_UNESCAPED_UNICODE);
  exit;
}

// Log PHP errors to /tmp (FTP may not show it)

// Allow POST only
if (!isset($_SERVER['REQUEST_METHOD']) || $_SERVER['REQUEST_METHOD'] !== 'POST') {
  json_out(405, array('ok' => false, 'error' => 'Method not allowed'));
}

// Fixed routing
$to = 'test@kcp.ac.jp';
// $cc = 'test@kcp.ac.jp';

// Basic input (reply-to only; never use user input as From)
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$name = str_replace(array("\r", "\n"), '', $name);
$email = str_replace(array("\r", "\n"), '', $email);

$subject = '【KCP】証明書発行申込み';
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

  // Map dropdown codes to Japanese
  if ($key === 'gender' && isset($genderMap[$v])) $v = $genderMap[$v];
  if ($key === 'receiveMethod' && isset($receiveMethodMap[$v])) $v = $receiveMethodMap[$v];
  if ($key === 'certificateType' && isset($certificateTypeMap[$v])) $v = $certificateTypeMap[$v];

  if (is_array($v)) $v = json_encode($v, JSON_UNESCAPED_UNICODE);
  $lines[] = $label . '：' . $v;
}

$referer = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '';
$ip = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '';

if ($referer !== '') {
  $lines[] = '';
  $lines[] = '送信元：' . $referer;
}
$ip = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '';
if ($ip !== '') $lines[] = 'IP：' . $ip;

$body = implode("\n", $lines);

// Headers (keep From fixed; do NOT use user input as From)
$headers = array();
$headers[] = 'From: KCP Website <info@kcp.ac.jp>';
$headers[] = 'Reply-To: ' . ($email !== '' ? $email : 'info@kcp.ac.jp');
// $headers[] = 'Cc: ' . $cc;
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headersStr = implode("\r\n", $headers);

$ok = @mail($to, $subject, $body, $headersStr);
if (!$ok) {
  json_out(500, array('ok' => false, 'error' => 'Mail send failed'));
}

json_out(200, array('ok' => true));