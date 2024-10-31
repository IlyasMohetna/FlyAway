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
        Schema::create('bus__line', function (Blueprint $table) {
            $table->id();
            $table->foreignId('departure_station_id')->foreign()->references('id')->on('bus__station');
            $table->foreignId('arrival_station_id')->foreign()->references('id')->on('bus__station');
            $table->dateTime('departure_time');
            $table->dateTime('arrival_time');
            $table->foreignId('bus_id')->foreign()->references('id')->on('bus__bus');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bus__line');
    }
};
