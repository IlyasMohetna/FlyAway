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
        Schema::create('train__ticket', function (Blueprint $table) {
            $table->id();
            $table->decimal('price');
            $table->string('ticket_number', 50);
            $table->string('seat_number', 20);
            $table->foreignId('train_id')->foreign()->references('id')->on('train__train');
            $table->foreignId('seat_type_id')->foreign()->references('id')->on('train__seat_types');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('train__ticket');
    }
};
