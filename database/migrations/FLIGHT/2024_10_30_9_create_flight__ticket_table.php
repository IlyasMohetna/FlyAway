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
        Schema::create('flight__ticket', function (Blueprint $table) {
            $table->id();
            $table->decimal('price');
            $table->string('ticket_number', 50);
            $table->string('seat_number', 20);
            $table->integer('baggage_checkin');
            $table->integer('baggage_cabin');
            $table->foreignId('flight_id')->foreign()->references('id')->on('flight__flight');
            $table->foreignId('passenger_type_id')->foreign()->references('id')->on('flight__passenger_type');
            $table->foreignId('seat_type_id')->foreign()->references('id')->on('flight__seat_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('flight__ticket');
    }
};
