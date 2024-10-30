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

        Schema::create('chambre', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('nom_chambre');
            $table->bigInteger('hebergement_id');
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

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chambre');
    }
};
