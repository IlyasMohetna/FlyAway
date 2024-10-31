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
        Schema::create('lodging__room_equipement', function (Blueprint $table) {
            $table->id();
            $table->foreignId('equipement_id')->foreign()->references('id')->on('lodging__equipement');
            $table->foreignId('room_id')->foreign()->references('id')->on('lodging__room');
            $table->boolean('active')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lodging__room_equipement');
    }
};
