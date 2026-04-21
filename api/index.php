<?php

// ==================================================
// VERCEL - Setup SEBELUM Laravel boot
// Path Vercel: /var/task/user/ (bukan /var/task/)
// ==================================================

// Buat semua folder writable di /tmp
$tmpDirs = [
    '/tmp/storage',
    '/tmp/storage/app',
    '/tmp/storage/app/public',
    '/tmp/storage/framework',
    '/tmp/storage/framework/cache',
    '/tmp/storage/framework/cache/data',
    '/tmp/storage/framework/sessions',
    '/tmp/storage/framework/views',
    '/tmp/storage/logs',
];

foreach ($tmpDirs as $dir) {
    if (!is_dir($dir)) {
        @mkdir($dir, 0755, true);
    }
}

// Override env variables yang dibutuhkan Laravel
// sebelum framework di-load
$_ENV['VERCEL']              = '1';
$_SERVER['VERCEL']           = '1';
$_ENV['VIEW_COMPILED_PATH']  = '/tmp/storage/framework/views';
$_SERVER['VIEW_COMPILED_PATH'] = '/tmp/storage/framework/views';

// Tentukan root project
// Di Vercel, file ini ada di /var/task/user/api/index.php
$projectRoot = dirname(__DIR__);

// Validasi: pastikan autoloader tersedia
$autoloaderPath = $projectRoot . '/vendor/autoload.php';
if (!file_exists($autoloaderPath)) {
    http_response_code(500);
    header('Content-Type: text/plain');
    echo "ERROR: vendor/autoload.php not found at: {$autoloaderPath}\n";
    echo "Project root: {$projectRoot}\n";
    echo "Files at root:\n";
    if (is_dir($projectRoot)) {
        foreach (array_slice(scandir($projectRoot), 0, 20) as $f) {
            echo "  $f\n";
        }
    }
    exit(1);
}

// Validasi: pastikan public/index.php tersedia
$laravelEntry = $projectRoot . '/public/index.php';
if (!file_exists($laravelEntry)) {
    http_response_code(500);
    header('Content-Type: text/plain');
    echo "ERROR: public/index.php not found at: {$laravelEntry}\n";
    exit(1);
}

// Bootstrap Laravel
require $laravelEntry;
