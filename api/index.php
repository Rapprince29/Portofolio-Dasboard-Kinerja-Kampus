<?php

// 1. Buat folder wajib Laravel di /tmp (karena Vercel read-only)
$dirs = [
    '/tmp/storage/app/public',
    '/tmp/storage/framework/cache/data',
    '/tmp/storage/framework/sessions',
    '/tmp/storage/framework/views',
    '/tmp/storage/logs',
];
foreach ($dirs as $dir) {
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
}

// 2. Paksa environment variable untuk Vercel
putenv('APP_ENV=production');
putenv('APP_DEBUG=true'); // Set true dulu untuk cari error jika masih ada
putenv('VIEW_COMPILED_PATH=/tmp/storage/framework/views');
putenv('CACHE_DRIVER=array');
putenv('SESSION_DRIVER=cookie');

// 3. Muat aplikasi Laravel dari folder public
require __DIR__ . '/../public/index.php';
