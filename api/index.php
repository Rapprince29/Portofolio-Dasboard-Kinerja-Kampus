<?php

// 1. Matikan error handler Laravel sementara untuk melihat error asli PHP
ini_set('display_errors', 1);
error_reporting(E_ALL);

// 2. Buat folder tmp
$baseTmp = '/tmp/storage';
$dirs = [
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

// 3. Paksa env
putenv('VERCEL=1');
putenv('APP_ENV=production');
putenv('APP_DEBUG=true');
putenv('CACHE_STORE=array'); // Paksa gunakan RAM untuk cache
putenv('SESSION_DRIVER=cookie');
putenv('VIEW_COMPILED_PATH=' . $baseTmp . '/framework/views');

// 4. Load Laravel
try {
    require __DIR__ . '/../public/index.php';
} catch (\Exception $e) {
    echo "<h1>Laravel Boot Error</h1>";
    echo "<p><strong>Error:</strong> " . $e->getMessage() . "</p>";
    echo "<p><strong>File:</strong> " . $e->getFile() . " on line " . $e->getLine() . "</p>";
    echo "<pre>" . $e->getTraceAsString() . "</pre>";
}
