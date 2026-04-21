<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use App\Models\User;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // 🚀 Vercel Fix: Arahkan storage ke /tmp
        // Folder sudah dibuat di api/index.php sebelum Laravel boot
        if (env('VERCEL') === '1') {
            $this->app->useStoragePath('/tmp/storage');
            config([
                'view.compiled'              => '/tmp/storage/framework/views',
                'cache.stores.file.path'     => '/tmp/storage/framework/cache/data',
                'session.files'              => '/tmp/storage/framework/sessions',
                'logging.channels.single.path' => '/tmp/storage/logs/laravel.log',
            ]);
        }

        Vite::prefetch(concurrency: 3);

        Gate::define('is-superadmin', function (User $user) {
            return strtolower($user->role) === 'superadmin';
        });

        Gate::define('is-wadir', function (User $user) {
            return in_array(strtolower($user->role), ['superadmin', 'wadir', 'direktur']);
        });

        Gate::define('is-direktur', function (User $user) {
            return in_array(strtolower($user->role), ['superadmin', 'direktur']);
        });

        /**
         * 🔒 Gate Akses Unit Kerja
         * Menggunakan `strtolower` untuk mencegah error 403 jika penulisan 
         * di database bermacam-macam (misalnya kapital 'Unit Kerja' vs 'unit_kerja').
         */
        Gate::define('is-unit-kerja', function (User $user) {
            return strtolower($user->role) === 'unit_kerja';
        });
    }
}
