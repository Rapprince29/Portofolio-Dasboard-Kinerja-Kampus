<?php

/**
 * Vercel PHP Entry Point untuk Laravel 12
 *
 * Strategi: set semua environment variable dan buat folder /tmp
 * SEBELUM Composer autoloader dan Laravel diload.
 */

// ─── 1. Buat semua folder writable di /tmp ───────────────────────────────────
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

// ─── 2. Set environment variables lewat putenv() ─────────────────────────────
// Ini memastikan getenv() dan $_ENV sama-sama mengambil nilai yang benar
// bahkan sebelum Laravel membaca .env
$envVars = [
    'VERCEL'               => '1',
    'APP_ENV'              => 'production',
    'APP_DEBUG'            => 'true',
    'LOG_CHANNEL'          => 'errorlog',
    'SESSION_DRIVER'       => 'cookie',
    'CACHE_STORE'          => 'array',
    'VIEW_COMPILED_PATH'   => '/tmp/storage/framework/views',
    'CACHE_DRIVER'         => 'array',
];

foreach ($envVars as $key => $value) {
    if (getenv($key) === false) {
        putenv("$key=$value");
        $_ENV[$key]    = $value;
        $_SERVER[$key] = $value;
    }
}

// ─── 3. Tentukan path root project ───────────────────────────────────────────
$root = dirname(__DIR__); // satu level di atas /api/

// ─── 4. Validasi file kritis ─────────────────────────────────────────────────
$autoloader  = $root . '/vendor/autoload.php';
$entryPoint  = $root . '/public/index.php';

if (!file_exists($autoloader)) {
    http_response_code(500);
    echo "<pre>ERROR: vendor/autoload.php tidak ditemukan.\nRoot: $root\n";
    echo "Isi direktori root:\n";
    foreach (scandir($root) as $f) echo "  $f\n";
    echo '</pre>';
    exit(1);
}

if (!file_exists($entryPoint)) {
    http_response_code(500);
    echo "<pre>ERROR: public/index.php tidak ditemukan.\nRoot: $root</pre>";
    exit(1);
}

// ─── 5. Bootstrap Laravel ────────────────────────────────────────────────────
require $entryPoint;
