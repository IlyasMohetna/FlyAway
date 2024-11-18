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
        Schema::create('package__booking', function (Blueprint $table) {
            $table->id();
            $table->date('start_date');
            $table->date('end_date');
            $table->integer('quantity');
            $table->foreignId('package_id')->references('id')->on('package__package');
            $table->foreignId('transportation_mode_id')->foreign()->references('id')->on('package__transportation_modes');
            $table->foreignId('lodging_mode_id')->foreign()->references('id')->on('lodging__lodging');
            $table->foreignId('client_id')->foreign()->references('id')->on('client__client');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('package__booking');
    }
};
