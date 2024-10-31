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
        Schema::create('package__itinerary', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('titre');
            $table->bigInteger('jour');
            $table->bigInteger('description');
            $table->bigInteger('id_forfait');
            $table->foreign('id_forfait')->references('id')->on('forfait_voyage');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('package__itinerary');
    }
};
