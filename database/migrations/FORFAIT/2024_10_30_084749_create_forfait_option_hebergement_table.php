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
        Schema::disableForeignKeyConstraints();

        Schema::create('forfait_option_hebergement', function (Blueprint $table) {
            $table->bigInteger('id_forfait');
            $table->foreign('id_forfait')->references('id')->on('forfait_voyage');
            $table->id();
            $table->foreign('id_mode_hebergement')->references('id')->on('forfait_mode_hebergement');
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('forfait_option_hebergement');
    }
};
