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
            $table->string('titre');
            $table->integer('jour');
            $table->foreignId('package_id')->foreign()->references('id')->on('package__package');
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