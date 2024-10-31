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
        Schema::create('car__car_feature', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_car_feature_type')->foreign()->references('id')->on('car__features_type');
            $table->foreignId('id_car')->foreign()->references('id')->on('car__car');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('car__car_feature');
    }
};
