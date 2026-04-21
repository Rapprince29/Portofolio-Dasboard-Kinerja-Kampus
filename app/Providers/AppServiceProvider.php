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
        // 🚀 Vercel Fix: Redirect storage to /tmp (read-only filesystem)
        if (env('VERCEL') || isset($_SERVER['VERCEL']) || isset($_SERVER['VERCEL_URL'])) {
            $this->app->useStoragePath('/tmp');
            config(['view.compiled' => '/tmp/views']);

            // Buat semua folder yang dibutuhkan oleh Laravel di /tmp
            $dirs = [
                '/tmp/views',
                '/tmp/cache',
                '/tmp/sessions',
                '/tmp/framework',
                '/tmp/framework/cache',
                '/tmp/framework/sessions',
                '/tmp/framework/views',
                '/tmp/logs',
            ];
            foreach ($dirs as $dir) {
                if (!is_dir($dir)) {
                    @mkdir($dir, 0755, true);
                }
            }
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
