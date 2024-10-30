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

        Schema::create('carte_bancaire', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('numero');
            $table->bigInteger('expiration_mois');
            $table->bigInteger('expiration_annee');
            $table->bigInteger('cvv');
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('carte_bancaire');
    }
};
