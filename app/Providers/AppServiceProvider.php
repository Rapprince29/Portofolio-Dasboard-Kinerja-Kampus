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
        // 🚀 Vercel Fix: Redirect storage to /tmp
        if (isset($_SERVER['VERCEL_URL'])) {
            $this->app->useStoragePath('/tmp');
            config(['view.compiled' => '/tmp/views']);
            
            // Buat folder view jika belum ada
            if (!is_dir('/tmp/views')) {
                mkdir('/tmp/views', 0755, true);
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
