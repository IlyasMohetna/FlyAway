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
        Schema::disableForeignKeyConstraints();

        Schema::create('flight_tickets', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('price');
            $table->bigInteger('flight_id');
            $table->foreign('flight_id')->references('id')->on('flight');
            $table->bigInteger('baggage_checkin');
            $table->bigInteger('baggage_cabin');
            $table->bigInteger('passenger_type_id');
            $table->foreign('passenger_type_id')->references('id')->on('flight_passenger_type');
            $table->bigInteger('seat_type_id');
            $table->foreign('seat_type_id')->references('id')->on('flight_seat_type');
            $table->bigInteger('ticket_number');
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('flight_tickets');
    }
};
