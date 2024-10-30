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

        Schema::create('flight_inflight_experience', function (Blueprint $table) {
            $table->id();
            $table->foreign('id_flight')->references('id')->on('flight');
            $table->bigInteger('inflight_experience_id');
            $table->foreign('inflight_experience_id')->references('id')->on('flight_inflight_experiences');
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('flight_inflight_experience');
    }
};
