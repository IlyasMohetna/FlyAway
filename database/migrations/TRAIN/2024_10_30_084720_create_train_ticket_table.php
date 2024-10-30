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

        Schema::create('train_ticket', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('price');
            $table->bigInteger('train_id');
            $table->foreign('train_id')->references('id')->on('train');
            $table->bigInteger('seat_type_id');
            $table->foreign('seat_type_id')->references('id')->on('train_seat_types');
            $table->bigInteger('ticket_number');
            $table->bigInteger('seat_number');
            $table->bigInteger('id_client');
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('train_ticket');
    }
};
