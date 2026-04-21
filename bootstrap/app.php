<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

/*
|--------------------------------------------------------------------------
| Create The Application
|--------------------------------------------------------------------------
*/
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
| VERCEL OVERRIDE (Akar Masalah Path)
|--------------------------------------------------------------------------
*/
if (isset($_SERVER['VERCEL']) || env('VERCEL')) {
    // Paksa storage path ke /tmp
    $app->useStoragePath('/tmp');
    
    // Paksa compiled view path ke /tmp/views yang sudah kita buat di api/index.php
    config(['view.compiled' => '/tmp/views']);
    config(['cache.stores.file.path' => '/tmp/cache']);
    config(['session.files' => '/tmp/sessions']);
}

return $app;
