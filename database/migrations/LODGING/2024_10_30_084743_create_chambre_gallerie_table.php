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

        Schema::create('chambre_gallerie', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('nom_fichier');
            $table->bigInteger('type_mime');
            $table->bigInteger('taille');
            $table->bigInteger('driver_stockage');
            $table->bigInteger('chambre_id');
            $table->foreign('chambre_id')->references('id')->on('chambre');
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chambre_gallerie');
    }
};
