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

        Schema::create('bus', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('departure_city');
            $table->bigInteger('arrival_city');
            $table->bigInteger('departure_time');
            $table->bigInteger('arrival_time');
            $table->bigInteger('bus_company_id');
            $table->foreign('bus_company_id')->references('id')->on('bus_companies');
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bus');
    }
};
