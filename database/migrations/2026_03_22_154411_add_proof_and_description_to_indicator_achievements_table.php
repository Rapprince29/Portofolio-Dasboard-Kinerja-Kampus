<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('indicator_achievements', function (Blueprint $table) {
            $table->string('proof_path')->nullable()->after('value');
            $table->text('description')->nullable()->after('proof_path');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('indicator_achievements', function (Blueprint $table) {
            $table->dropColumn(['proof_path', 'description']);
        });
    }
};
