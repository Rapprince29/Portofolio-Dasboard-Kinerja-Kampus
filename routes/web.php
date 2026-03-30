<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\IndicatorController;
use App\Http\Controllers\AchievementController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    /**
     * Rute Terpusat (Single Hub) untuk Semua Role - Sistem Clean Architecture
     */
    Route::get('/achievements', [AchievementController::class, 'index'])->name('achievements.index');
    Route::post('/notifications/mark-read', [AchievementController::class, 'markNotificationsRead'])->name('notifications.mark-read');
    // [POLLING] Endpoint ringan untuk cek jumlah notif tanpa reload halaman
    Route::get('/notifications/count', [AchievementController::class, 'getNotificationCount'])->name('notifications.count');

    Route::middleware('can:is-unit-kerja')->group(function () {
        // [MODAL] Menyimpan Capaian Baru (Satu per satu)
        Route::post('/achievements', [AchievementController::class, 'store'])->name('achievements.store');
        Route::delete('/achievements/{achievement}', [AchievementController::class, 'destroy'])->name('achievements.destroy');
    });

    Route::middleware('can:is-wadir')->group(function () {
        // [ACTION] Wadir/Direktur memverifikasi, menyetujui, menolak
        Route::patch('/achievements/{achievement}/verify', [AchievementController::class, 'verify'])->name('achievements.verify');
        Route::patch('/achievements/{achievement}/approve', [AchievementController::class, 'approve'])->name('achievements.approve');
        Route::patch('/achievements/{achievement}/reject', [AchievementController::class, 'reject'])->name('achievements.reject');
        // [DELETE] Direktur & Superadmin bisa hapus capaian yang tidak valid lagi
        Route::delete('/achievements/{achievement}', [AchievementController::class, 'destroy'])->name('achievements.destroy');
    });

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
