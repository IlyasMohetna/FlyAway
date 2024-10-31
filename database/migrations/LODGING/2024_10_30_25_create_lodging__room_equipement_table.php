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
        Schema::create('lodging__room_equipement', function (Blueprint $table) {
            $table->bigInteger('id_equipement');
            $table->foreign('id_equipement')->references('id')->on('equipement');
            $table->bigInteger('id_chambre');
            $table->foreign('id_chambre')->references('id')->on('chambre');
            $table->bigInteger('active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lodging__room_equipement');
    }
};
