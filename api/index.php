<?php

// ==================================================
// VERCEL BOOTSTRAP
// Buat semua folder /tmp yang dibutuhkan Laravel
// SEBELUM framework di-load
// ==================================================

$tmpDirs = [
    '/tmp/views',
    '/tmp/cache',
    '/tmp/sessions',
    '/tmp/logs',
    '/tmp/framework',
    '/tmp/framework/cache',
    '/tmp/framework/cache/data',
    '/tmp/framework/sessions',
    '/tmp/framework/views',
    '/tmp/app',
    '/tmp/app/public',
];

foreach ($tmpDirs as $dir) {
    if (!is_dir($dir)) {
        @mkdir($dir, 0755, true);
    }
}

// ==================================================
// Deteksi path root project secara dinamis
// (Vercel mungkin menaruh file di /var/task atau /var/task/user)
// ==================================================

// Ambil direktori tempat file ini berada (/api/)
$apiDir = __DIR__;
// Root project adalah satu level di atas /api/
$projectRoot = dirname($apiDir);

// Path menuju public/index.php
$laravelEntry = $projectRoot . '/public/index.php';

// Jika tidak ketemu, coba path alternatif Vercel
if (!file_exists($laravelEntry)) {
    $possibleRoots = [
        '/var/task',
        '/var/task/user',
        '/var/task/src',
    ];

    foreach ($possibleRoots as $root) {
        $candidate = $root . '/public/index.php';
        if (file_exists($candidate)) {
            $laravelEntry = $candidate;
            $projectRoot   = $root;
            break;
        }
    }
}

// Tampilkan error jika masih tidak ketemu
if (!file_exists($laravelEntry)) {
    http_response_code(500);
    echo '<pre>';
    echo "Laravel entry point not found!\n";
    echo "API dir    : {$apiDir}\n";
    echo "Project root tested: {$projectRoot}\n";
    echo "Looking for: {$laravelEntry}\n";
    echo "\nFiles in /var/task:\n";
    if (is_dir('/var/task')) {
        foreach (scandir('/var/task') as $f) echo "  {$f}\n";
    }
    echo '</pre>';
    exit(1);
}

// Validasi vendor
if (!file_exists($projectRoot . '/vendor/autoload.php')) {
    http_response_code(500);
    echo '<pre>';
    echo "vendor/autoload.php not found!\n";
    echo "Project root: {$projectRoot}\n";
    echo '</pre>';
    exit(1);
}

// Forward semua request ke Laravel
require $laravelEntry;
