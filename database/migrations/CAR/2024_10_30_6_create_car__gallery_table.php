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
        Schema::create('car__gallery', function (Blueprint $table) {
            $table->id();
            $table->string('file_name');
            $table->string('mime_type');
            $table->integer('size');
            $table->string('storage_driver');
            $table->foreignId('car_id')->references('id')->on('car__car');    
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('car__gallery');
    }
};
