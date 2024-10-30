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

        Schema::create('reservation_voiture', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('id_voiture');
            $table->foreign('id_voiture')->references('id')->on('cars');
            $table->bigInteger('id_client');
            $table->bigInteger('date_debut');
            $table->bigInteger('date_fin');
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservation_voiture');
    }
};
