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

        Schema::create('car_gallerie', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('id_car');
            $table->foreign('id_car')->references('id')->on('cars');
            $table->bigInteger('store_path');
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('car_gallerie');
    }
};
