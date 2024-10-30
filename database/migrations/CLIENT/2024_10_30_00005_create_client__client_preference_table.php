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
        Schema::create('client__client_preference', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->foreign()->references('id')->on('client__client');
            $table->foreignId('preference_type_id')->foreign()->references('id')->on('client__preferences_type');            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('client__client_preference');
    }
};
