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
        Schema::create('train__train', function (Blueprint $table) {
            $table->id();
            $table->foreignId('departure_station')->foreign()->references('id')->on('train__station');
            $table->foreignId('arrival_station')->foreign()->references('id')->on('train__station');
            $table->dateTime('departure_time');
            $table->dateTime('arrival_time');
            $table->foreignId('train_company_id')->foreign()->references('id')->on('train__companies');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('train__train');
    }
};
