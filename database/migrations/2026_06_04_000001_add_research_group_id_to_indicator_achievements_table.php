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
            $table->foreignId('research_group_id')->nullable()->after('indicator_id')->constrained('research_groups')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('indicator_achievements', function (Blueprint $table) {
            $table->dropForeign(['research_group_id']);
            $table->dropColumn('research_group_id');
        });
    }
};
