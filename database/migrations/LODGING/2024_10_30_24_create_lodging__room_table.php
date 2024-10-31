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
        Schema::create('lodging__room', function (Blueprint $table) {
            $table->id();
            $table->string('room_reference', 50);
            $table->bigInteger('numero_chambre');
            $table->foreignId('lodging_id')->foreign()->references('id')->on('lodging__lodging');
            $table->integer('max_adult');
            $table->integer('max_enfant');
            $table->longText('description');
            $table->decimal('surface');
            $table->foreignId('status_id')->foreign()->references('id')->on('lodging__room_status');
            $table->decimal('prix');
            $table->integer('nombre_lit');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lodging__room');
    }
};
