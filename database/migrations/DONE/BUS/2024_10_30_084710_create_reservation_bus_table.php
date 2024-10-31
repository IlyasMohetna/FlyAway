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
        Schema::create('reservation_bus', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('id_ticket');
            $table->foreign('id_ticket')->references('id')->on('bus_ticket');
            $table->bigInteger('id_client');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservation_bus');
    }
};
