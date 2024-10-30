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

        Schema::create('hebergement_attribut', function (Blueprint $table) {
            $table->id();
            $table->foreign('id_hotel')->references('id')->on('hebergement');
            $table->bigInteger('id_attribut_terme');
            $table->foreign('id_attribut_terme')->references('id')->on('attribut_termes');
            $table->bigInteger('actif');
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hebergement_attribut');
    }
};
