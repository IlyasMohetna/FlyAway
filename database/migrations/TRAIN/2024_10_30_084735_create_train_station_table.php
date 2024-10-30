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

        Schema::create('train_station', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('name');
            $table->bigInteger('address');
            $table->bigInteger('city_id');
            $table->foreign('city_id')->references('id')->on('config__city');
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('train_station');
    }
};
