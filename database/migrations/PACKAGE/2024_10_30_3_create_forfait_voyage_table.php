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
        Schema::create('forfait_voyage', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('id_type_forfait');
            $table->foreign('id_type_forfait')->references('id')->on('type_forfait');
            $table->bigInteger('id_destination');
            $table->foreign('id_destination')->references('id')->on('config__city');
            $table->bigInteger('montant_ht');
            $table->bigInteger('montant_ttc');
            $table->bigInteger('duree');
            $table->bigInteger('titre');
            $table->bigInteger('description');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('forfait_voyage');
    }
};
