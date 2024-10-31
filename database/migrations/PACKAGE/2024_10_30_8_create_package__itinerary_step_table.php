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
        Schema::create('package__itinerary_step', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->longText('description');
            $table->integer('day');
            $table->integer('rank');
            $table->foreignId('id_itinerary')->foreign()->references('id')->on('package__itinerary');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('package__itinerary_step');
    }
};
