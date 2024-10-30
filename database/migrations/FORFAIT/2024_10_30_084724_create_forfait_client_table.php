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

        Schema::create('forfait_client', function (Blueprint $table) {
            $table->id();
            $table->foreign('id_client')->references('id')->on('client__client');
            $table->bigInteger('id_forfait');
            $table->foreign('id_forfait')->references('id')->on('forfait_voyage');
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('forfait_client');
    }
};
