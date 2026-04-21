<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// ═══════════════════════════════════════════════════════════
// VERCEL SETUP - Harus dilakukan SEBELUM Application dibuat
// ═══════════════════════════════════════════════════════════
if (getenv('VERCEL') === '1') {
    // Buat semua direktori yang dibutuhkan di /tmp
    $vercelDirs = [
        '/tmp/storage/app/public',
        '/tmp/storage/framework/cache/data',
        '/tmp/storage/framework/sessions',
        '/tmp/storage/framework/views',
        '/tmp/storage/logs',
    ];
    foreach ($vercelDirs as $d) {
        if (!is_dir($d)) mkdir($d, 0755, true);
    }

    // Override environment variables
    putenv('VIEW_COMPILED_PATH=/tmp/storage/framework/views');
    $_ENV['VIEW_COMPILED_PATH']    = '/tmp/storage/framework/views';
    $_SERVER['VIEW_COMPILED_PATH'] = '/tmp/storage/framework/views';
}
// ═══════════════════════════════════════════════════════════

// Determine if the application is in maintenance mode...
$maintenanceFile = __DIR__.'/../storage/framework/maintenance.php';
if (getenv('VERCEL') !== '1' && file_exists($maintenanceFile)) {
    require $maintenanceFile;
}

// Register the Composer autoloader...
require __DIR__.'/../vendor/autoload.php';

// Bootstrap Laravel and handle the request...
/** @var Application $app */
$app = require_once __DIR__.'/../bootstrap/app.php';

$app->handleRequest(Request::capture());
