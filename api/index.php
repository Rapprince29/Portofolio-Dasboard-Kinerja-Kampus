<?php

// 1. Setup folder /tmp secepat mungkin
$storagePath = '/tmp/storage';
if (!is_dir($storagePath . '/framework/views')) {
    mkdir($storagePath . '/framework/views', 0755, true);
    mkdir($storagePath . '/framework/cache/data', 0755, true);
    mkdir($storagePath . '/framework/sessions', 0755, true);
    mkdir($storagePath . '/app/public', 0755, true);
    mkdir($storagePath . '/logs', 0755, true);
}

// 2. Environment Variables penting
putenv('APP_CONFIG_CACHE=/tmp/storage/framework/config.php');
putenv('VIEW_COMPILED_PATH=/tmp/storage/framework/views');
putenv('LOG_CHANNEL=errorlog');

// 3. Panggil entry point Laravel asli
require __DIR__ . '/../public/index.php';
