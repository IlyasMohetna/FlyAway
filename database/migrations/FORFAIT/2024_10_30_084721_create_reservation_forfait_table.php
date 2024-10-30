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

        Schema::create('reservation_forfait', function (Blueprint $table) {
            $table->id()->foreign('forfait_voyage.id');
            $table->bigInteger('id_forfait');
            $table->bigInteger('id_option_hebergement');
            $table->foreign('id_option_hebergement')->references('id')->on('forfait_mode_hebergement');
            $table->bigInteger('id_mode_transport');
            $table->foreign('id_mode_transport')->references('id')->on('forfait_mode_transport');
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
        Schema::dropIfExists('reservation_forfait');
    }
};
