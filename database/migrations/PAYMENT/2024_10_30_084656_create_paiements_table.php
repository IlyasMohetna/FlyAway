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

        Schema::create('paiements', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('montant');
            $table->bigInteger('id_facture');
            $table->foreign('id_facture')->references('id')->on('factures');
            $table->bigInteger('type_moyen_paiement');
            $table->bigInteger('id_moyen_paiement');
            $table->foreign('id_moyen_paiement')->references('id')->on('carte_bancaire');
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paiements');
    }
};
