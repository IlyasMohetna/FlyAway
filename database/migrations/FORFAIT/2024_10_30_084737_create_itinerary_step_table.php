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

        Schema::create('itinerary_step', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('title');
            $table->bigInteger('description');
            $table->bigInteger('day');
            $table->bigInteger('rank');
            $table->bigInteger('id_itinerary');
            $table->foreign('id_itinerary')->references('id')->on('itinerary');
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('itinerary_step');
    }
};
