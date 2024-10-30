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

        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('agence_id');
            $table->foreign('agence_id')->references('id')->on('car_agency');
            $table->bigInteger('representation_city');
            $table->bigInteger('type_id');
            $table->foreign('type_id')->references('id')->on('car_types');
            $table->bigInteger('max_passengers');
            $table->bigInteger('gear_shift');
            $table->bigInteger('baggage');
            $table->bigInteger('door');
            $table->bigInteger('daily_price');
            $table->bigInteger('feautre_image');
            $table->bigInteger('description_html');
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cars');
    }
};
