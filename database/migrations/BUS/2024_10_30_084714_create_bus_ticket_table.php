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

        Schema::create('bus_ticket', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('price');
            $table->bigInteger('bus_id');
            $table->foreign('bus_id')->references('id')->on('bus');
            $table->bigInteger('seat_type_id');
            $table->foreign('seat_type_id')->references('id')->on('bus__station');
            $table->bigInteger('passenger_type_id');
            $table->foreign('passenger_type_id')->references('id')->on('bus_passenger_type');
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bus_ticket');
    }
};
