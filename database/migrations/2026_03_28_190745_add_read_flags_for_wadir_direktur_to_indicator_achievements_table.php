<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('indicator_achievements', function (Blueprint $table) {
            // Notifikasi untuk Wadir: false = ada pengajuan baru yang belum dilihat
            $table->boolean('is_read_wadir')->default(true)->after('rejection_reason');

            // Notifikasi untuk Direktur: false = ada item verified yang siap disetujui
            $table->boolean('is_read_direktur')->default(true)->after('is_read_wadir');
        });
    }

    public function down(): void
    {
        Schema::table('indicator_achievements', function (Blueprint $table) {
            $table->dropColumn(['is_read_wadir', 'is_read_direktur']);
        });
    }
};
