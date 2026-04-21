<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

$app = Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })
    ->create();

/*
|--------------------------------------------------------------------------
| VERCEL OVERRIDE (Sync Path)
|--------------------------------------------------------------------------
*/
if (isset($_SERVER['VERCEL']) || env('VERCEL')) {
    // Sinkronkan dengan api/index.php
    $app->useStoragePath('/tmp/storage');
    
    config([
        'view.compiled' => '/tmp/storage/framework/views',
        'cache.stores.file.path' => '/tmp/storage/framework/cache/data',
        'session.files' => '/tmp/storage/framework/sessions',
    ]);
}

return $app;
