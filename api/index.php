<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

// Base TMP
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

// FORCE ENV - Kunci utama menghindari error filesystem read-only
putenv('VERCEL=1');
putenv('APP_ENV=production');
putenv('APP_DEBUG=true');
putenv('LOG_CHANNEL=errorlog'); // Sangat penting! Jangan tulis ke file log.
putenv('CACHE_STORE=array');
putenv('SESSION_DRIVER=cookie');
putenv('VIEW_COMPILED_PATH=' . $baseTmp . '/framework/views');

try {
    require __DIR__ . '/../public/index.php';
} catch (\Exception $e) {
    header('Content-Type: text/plain');
    echo "Laravel Boot Error:\n";
    echo $e->getMessage() . "\n";
    echo "In " . $e->getFile() . " line " . $e->getLine() . "\n";
    exit(1);
}
