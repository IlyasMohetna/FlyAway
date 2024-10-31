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
        Schema::create('car__car', function (Blueprint $table) {
            $table->id();
            $table->foreignId('agency_id')->foreign()->references('id')->on('car__agency');
            $table->foreignId('type_id')->foreign()->references('id')->on('car__types');
            $table->integer('max_passengers');
            $table->enum('gear_shift', ['manual', 'automatic']);
            $table->integer('baggage');
            $table->integer('door');
            $table->decimal('daily_price');
            $table->string('feautre_image');
            $table->longText('description');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('car__car');
    }
};
