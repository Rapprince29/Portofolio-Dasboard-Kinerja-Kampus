<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('indicator_achievements', function (Blueprint $table) {
            // is_read: apakah Unit Kerja sudah membaca perubahan status ini?
            // Default true, diset false ketika Wadir/Direktur mengubah status
            $table->boolean('is_read')->default(true)->after('proof_path');

            // status_changed_at: kapan status terakhir berubah (untuk sorting notifikasi)
            $table->timestamp('status_changed_at')->nullable()->after('is_read');
        });
    }

    public function down(): void
    {
        Schema::table('indicator_achievements', function (Blueprint $table) {
            $table->dropColumn(['is_read', 'status_changed_at']);
        });
    }
};
