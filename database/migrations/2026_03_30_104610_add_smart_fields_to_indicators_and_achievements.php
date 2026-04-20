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
        Schema::table('indicators', function (Blueprint $table) {
            $table->string('numerator_label')->nullable()->after('formula');
            $table->string('denominator_label')->nullable()->after('numerator_label');
        });

        Schema::table('indicator_achievements', function (Blueprint $table) {
            $table->double('numerator_value')->nullable()->after('value');
            $table->double('denominator_value')->nullable()->after('numerator_value');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('indicator_achievements', function (Blueprint $table) {
            $table->dropColumn(['numerator_value', 'denominator_value']);
        });

        Schema::table('indicators', function (Blueprint $table) {
            $table->dropColumn(['numerator_label', 'denominator_label']);
        });
    }
};
