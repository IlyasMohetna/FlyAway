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
        Schema::create('flight', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('description');
            $table->bigInteger('from_airport');
            $table->foreign('from_airport')->references('id')->on('airport');
            $table->bigInteger('to_airport');
            $table->foreign('to_airport')->references('id')->on('airport');
            $table->bigInteger('airline_id');
            $table->foreign('airline_id')->references('id')->on('flight_airline');
            $table->bigInteger('departure_time');
            $table->bigInteger('arrival_time');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('flight');
    }
};
