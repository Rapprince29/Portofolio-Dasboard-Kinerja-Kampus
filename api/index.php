<?php

// 1. Buat folder wajib Laravel di /tmp
$baseTmp = '/tmp/storage';
$dirs = [
    $baseTmp,
    $baseTmp . '/app/public',
    $baseTmp . '/framework/cache/data',
    $baseTmp . '/framework/sessions',
    $baseTmp . '/framework/views',
    $baseTmp . '/logs',
];
foreach ($dirs as $dir) {
    if (!is_dir($dir)) {
        @mkdir($dir, 0755, true);
    }
}

// 2. Paksa environment variable
putenv('VERCEL=1');
putenv('APP_ENV=production');
putenv('APP_DEBUG=true');
putenv('VIEW_COMPILED_PATH=' . $baseTmp . '/framework/views');

// 3. Masuk ke aplikasi
require __DIR__ . '/../public/index.php';
