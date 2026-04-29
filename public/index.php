<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// 🚀 VERCEL BOOTSTRAP: Buat folder wajib di /tmp secepat mungkin
if (getenv('VERCEL') == '1') {
    $baseTmp = '/tmp/storage/framework';
    $dirs = [
        '/tmp/storage/app/public',
        $baseTmp . '/views',
        $baseTmp . '/cache/data',
        $baseTmp . '/sessions',
        '/tmp/storage/bootstrap/cache',
        '/tmp/storage/logs',
    ];
    foreach ($dirs as $dir) {
        if (!is_dir($dir)) {
            @mkdir($dir, 0777, true);
        }
    }
    
    // Set env agar Laravel tahu di mana mencari
    putenv("VIEW_COMPILED_PATH=$baseTmp/views");
}

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require __DIR__.'/../vendor/autoload.php';

// Bootstrap Laravel and handle the request...
/** @var Application $app */
$app = require_once __DIR__.'/../bootstrap/app.php';

$app->handleRequest(Request::capture());
