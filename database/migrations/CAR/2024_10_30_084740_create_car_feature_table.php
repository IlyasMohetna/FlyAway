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

        Schema::create('car_feature', function (Blueprint $table) {
            $table->bigInteger('id_feature');
            $table->foreign('id_feature')->references('id')->on('car_features');
            $table->bigInteger('id_car');
            $table->foreign('id_car')->references('id')->on('cars');
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('car_feature');
    }
};
