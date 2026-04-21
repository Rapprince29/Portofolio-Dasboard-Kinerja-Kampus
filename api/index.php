<?php

// 1. Definisikan path yang sama persis dengan vercel.json
$baseTmp = '/tmp/storage/framework';
$dirs = [
    '/tmp/storage/app/public',
    $baseTmp . '/views',
    $baseTmp . '/cache/data',
    $baseTmp . '/sessions',
];

foreach ($dirs as $dir) {
    if (!is_dir($dir)) {
        @mkdir($dir, 0777, true);
    }
}

// Tes tulis file untuk memastikan folder bisa digunakan
@file_put_contents($baseTmp . '/views/.write_test', 'ok');

// 2. Override Environment secara agresif
$compiledPath = $baseTmp . '/views';
putenv("VIEW_COMPILED_PATH=$compiledPath");
$_ENV['VIEW_COMPILED_PATH'] = $compiledPath;
$_SERVER['VIEW_COMPILED_PATH'] = $compiledPath;

putenv('LOG_CHANNEL=errorlog');
putenv('APP_DEBUG=true');

// 3. Jalankan Laravel
require dirname(__DIR__) . '/public/index.php';
