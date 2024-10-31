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
        Schema::create('flight__airport', function (Blueprint $table) {
            $table->id();
            $table->string('iata_code', 20);
            $table->string('name', 100);
            $table->decimal('latitude');
            $table->decimal('longitude');
            $table->foreignId('city_id')->foreign()->references('id')->on('config__city');
            $table->foreignId('type_id')->foreign()->references('id')->on('flight__airport_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('flight__airport');
    }
};
