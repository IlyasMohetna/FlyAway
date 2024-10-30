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

        Schema::create('train', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('departure_station');
            $table->foreign('departure_station')->references('id')->on('train_station');
            $table->bigInteger('arrival_station');
            $table->foreign('arrival_station')->references('id')->on('train_station');
            $table->bigInteger('departure_date');
            $table->bigInteger('arrival_date');
            $table->bigInteger('train_company_id');
            $table->foreign('train_company_id')->references('id')->on('train_companies');
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('train');
    }
};
