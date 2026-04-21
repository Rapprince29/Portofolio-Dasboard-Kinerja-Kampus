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
        // 🚀 Vercel Fix: Redirect storage ke /tmp (filesystem read-only)
        if (env('VERCEL') || isset($_SERVER['VERCEL']) || isset($_SERVER['VERCEL_URL'])) {

            // Buat semua folder yang dibutuhkan Laravel di /tmp
            $dirs = [
                '/tmp/storage',
                '/tmp/storage/app',
                '/tmp/storage/app/public',
                '/tmp/storage/framework',
                '/tmp/storage/framework/cache',
                '/tmp/storage/framework/cache/data',
                '/tmp/storage/framework/sessions',
                '/tmp/storage/framework/views',
                '/tmp/storage/logs',
                '/tmp/views',
            ];
            foreach ($dirs as $dir) {
                if (!is_dir($dir)) {
                    @mkdir($dir, 0755, true);
                }
            }

            // Arahkan Laravel ke /tmp sebagai storage
            $this->app->useStoragePath('/tmp/storage');

            // Override config untuk path yang perlu writable
            config([
                'view.compiled'    => '/tmp/storage/framework/views',
                'cache.stores.file.path' => '/tmp/storage/framework/cache/data',
                'session.files'    => '/tmp/storage/framework/sessions',
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
