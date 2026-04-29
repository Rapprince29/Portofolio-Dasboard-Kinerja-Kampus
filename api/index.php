<?php

// 1. Setup folder /tmp
$baseTmp = '/tmp/storage/framework';
$dirs = [
    '/tmp/storage/app/public',
    $baseTmp . '/views',
    $baseTmp . '/cache/data',
    $baseTmp . '/sessions',
    '/tmp/storage/logs',
];
foreach ($dirs as $dir) {
    if (!is_dir($dir)) {
        @mkdir($dir, 0777, true);
    }
}

// 2. Set Environment Variables yang akan dibaca otomatis oleh config Laravel
$envOverrides = [
    'VERCEL' => '1',
    'APP_ENV' => 'production',
    'APP_DEBUG' => 'true',
    'LOG_CHANNEL' => 'errorlog',
    'VIEW_COMPILED_PATH' => $baseTmp . '/views',
    'SESSION_DRIVER' => 'cookie',
    'CACHE_STORE' => 'array',
];

foreach ($envOverrides as $key => $val) {
    putenv("$key=$val");
    $_ENV[$key] = $val;
    $_SERVER[$key] = $val;
}

// 3. Masuk ke aplikasi
require dirname(__DIR__) . '/public/index.php';
