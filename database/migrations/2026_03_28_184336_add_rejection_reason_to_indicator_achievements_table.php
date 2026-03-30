<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('indicator_achievements', function (Blueprint $table) {
            // Alasan penolakan dari Wadir/Direktur kepada Unit Kerja
            $table->text('rejection_reason')->nullable()->after('status_changed_at');
        });
    }

    public function down(): void
    {
        Schema::table('indicator_achievements', function (Blueprint $table) {
            $table->dropColumn('rejection_reason');
        });
    }
};
