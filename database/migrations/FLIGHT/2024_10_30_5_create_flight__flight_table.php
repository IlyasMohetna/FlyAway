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
        Schema::create('flight__flight', function (Blueprint $table) {
            $table->id();
            $table->longText('description');
            $table->foreingId('departure_airport')->references('id')->on('flight__airport');
            $table->foreingId('arrival_airport')->references('id')->on('flight__airport');
            $table->foreignId('airline_id')->references('id')->on('flight__airline');
            $table->dateTime('departure_time');
            $table->dateTime('arrival_time');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('flight__flight');
    }
};
