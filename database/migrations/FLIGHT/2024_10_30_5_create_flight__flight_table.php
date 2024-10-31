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
            $table->dateTime('departure_time');
            $table->dateTime('arrival_time');
            $table->foreignId('departure_airport')->foreign()->references('id')->on('flight__airport');
            $table->foreignId('arrival_airport')->foreign()->references('id')->on('flight__airport');
            $table->foreignId('airline_id')->foreign()->references('id')->on('flight__airline');
            $table->timestamps();
            $table->softDeletes();
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
