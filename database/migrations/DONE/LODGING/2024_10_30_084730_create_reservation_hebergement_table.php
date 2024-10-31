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

        Schema::create('reservation_hebergement', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('id_client');
            $table->foreign('id_client')->references('id')->on('client__client');
            $table->bigInteger('id_chambre');
            $table->bigInteger('special_requirements');
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
        Schema::dropIfExists('reservation_hebergement');
    }
};
