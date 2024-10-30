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

        Schema::create('factures', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('id_reservation');
            $table->foreign('id_reservation')->references('id')->on('reservation_forfait');
            $table->bigInteger('montant_total');
            $table->bigInteger('id_statut');
            $table->foreign('id_statut')->references('id')->on('facture_statut');
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('factures');
    }
};
