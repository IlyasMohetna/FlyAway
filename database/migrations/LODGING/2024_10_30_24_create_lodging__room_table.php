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
        Schema::create('lodging__room', function (Blueprint $table) {
            $table->id();
            $table->string('nom_chambre');
            $table->bigInteger('hebergement_id');
            $table->foreignId('lodging_id')->foreign()->references('id')->on('categorie_chambre_equipement');

            $table->foreign('hebergement_id')->references('id')->on('hebergement');
            $table->bigInteger('type_id');
            $table->bigInteger('max_adult');
            $table->bigInteger('numero_chambre');
            $table->bigInteger('max_enfant');
            $table->bigInteger('description');
            $table->bigInteger('surface');
            $table->bigInteger('situation_id');
            $table->foreign('situation_id')->references('id')->on('situation_chambre');
            $table->bigInteger('prix');
            $table->bigInteger('nombre_lit');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lodging__room');
    }
};
