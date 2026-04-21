<?php

// ==================================================
// VERCEL BOOTSTRAP - Buat semua folder /tmp yang
// dibutuhkan Laravel SEBELUM framework di-load
// ==================================================
$tmpDirs = [
    '/tmp/views',
    '/tmp/cache',
    '/tmp/sessions',
    '/tmp/logs',
    '/tmp/framework',
    '/tmp/framework/cache',
    '/tmp/framework/cache/data',
    '/tmp/framework/sessions',
    '/tmp/framework/views',
    '/tmp/app',
    '/tmp/app/public',
];

foreach ($tmpDirs as $dir) {
    if (!is_dir($dir)) {
        @mkdir($dir, 0755, true);
    }
}

// Aktifkan error reporting untuk debugging (set false setelah berhasil)
ini_set('display_errors', '0');
error_reporting(E_ALL);

// Validasi vendor folder
if (!file_exists(__DIR__ . '/../vendor/autoload.php')) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Vendor not found. Make sure /vendor is committed to Git or Vercel has a build step to install dependencies.',
        'hint'  => 'Run: git add vendor && git commit'
    ]);
    exit(1);
}

// Forward semua request ke Laravel
require __DIR__ . '/../public/index.php';
