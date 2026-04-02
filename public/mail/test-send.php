<?php
// PHP 5.6 compatible Gmail SMTP smoke test.
// Open in browser: https://<domain>/mail/test-send.php

header('Content-Type: text/plain; charset=utf-8');

@ini_set('log_errors', '1');
@ini_set('error_log', __DIR__ . '/mail-error.log');
@error_reporting(E_ALL);

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

load_dotenv_if_present(__DIR__ . '/.env');

// Load PHPMailer
$autoloadCandidates = array(
  __DIR__ . '/vendor/autoload.php',
  __DIR__ . '/../vendor/autoload.php',
  __DIR__ . '/../../vendor/autoload.php',
);
$autoload = null;
foreach ($autoloadCandidates as $p) {
  if (file_exists($p)) { $autoload = $p; break; }
}
if ($autoload === null) {
  echo "FAILED\n";
  echo "Missing vendor/autoload.php (PHPMailer not installed)\n";
  exit;
}
require_once $autoload;

$smtpHost = env_or_default('SMTP_HOST', 'smtp.gmail.com');
$smtpPort = intval(env_or_default('SMTP_PORT', '587'));
$smtpSecure = env_or_default('SMTP_SECURE', 'tls'); // tls|ssl
$smtpUser = env_or_default('SMTP_USER', '');
$smtpPass = env_or_default('SMTP_PASS', '');
$fromEmail = env_or_default('SMTP_FROM', $smtpUser);
$fromName = env_or_default('SMTP_FROM_NAME', 'KCP Website');
$to = env_or_default('MAIL_TO', $smtpUser);
$ccList = env_or_default('MAIL_CC', '');

if ($smtpUser === '' || $smtpPass === '' || $to === '') {
  echo "FAILED\n";
  echo "Missing SMTP_USER/SMTP_PASS/MAIL_TO in .env\n";
  exit;
}

$subject = 'KCP SMTP test - ' . date('Y-m-d H:i:s');
$body = "This is a test email sent via Gmail SMTP.\n\n"
  . "Host: " . (isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : '') . "\n"
  . "URI: " . (isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '') . "\n"
  . "IP: " . (isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '') . "\n";

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

  $mail->send();

  echo "OK\n";
  echo "Sent to: {$to}\n";
  if ($ccList !== '') echo "CC: {$ccList}\n";
  echo "Via: {$smtpHost}:{$smtpPort} ({$smtpSecure})\n";
  exit;
} catch (\PHPMailer\PHPMailer\Exception $e) {
  echo "FAILED\n";
  echo "PHPMailer: " . $e->getMessage() . "\n";
  exit;
} catch (\Exception $e) {
  echo "FAILED\n";
  echo "Error: " . $e->getMessage() . "\n";
  exit;
}

