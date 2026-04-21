<?php

// 1. Tentukan root project secara absolut
$projectRoot = dirname(__DIR__);

// 2. Buat folder di /tmp dengan izin penuh 0777
// Vercel hanya menjamin /tmp bisa ditulis
$tmpViewPath = '/tmp/views';
$tmpCachePath = '/tmp/cache';
$tmpSessionPath = '/tmp/sessions';

if (!is_dir($tmpViewPath)) @mkdir($tmpViewPath, 0777, true);
if (!is_dir($tmpCachePath)) @mkdir($tmpCachePath, 0777, true);
if (!is_dir($tmpSessionPath)) @mkdir($tmpSessionPath, 0777, true);

// 3. Environment Variables (Akar masalah View Binding)
putenv('APP_ENV=production');
putenv('APP_DEBUG=true');
putenv('LOG_CHANNEL=errorlog');
putenv('CACHE_STORE=array');
putenv('SESSION_DRIVER=cookie');
putenv('VIEW_COMPILED_PATH=' . $tmpViewPath);
putenv('DATA_CACHE_PATH=' . $tmpCachePath);

// 4. Masuk ke aplikasi Laravel
require $projectRoot . '/public/index.php';
