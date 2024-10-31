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
        Schema::create('flight__flight_experience', function (Blueprint $table) {
            $table->id();
            $table->foreignId('flight_id')->foreign()->references('id')->on('flight__flight');
            $table->foreignId('experience_type_id')->foreign()->references('id')->on('flight__experience_types');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('flight__flight_experience');
    }
};
