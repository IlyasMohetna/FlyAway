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
        Schema::create('lodging__attribut', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lodging_id')->foreign()->references('id')->on('lodging__lodging');
            $table->foreignId('attribut_term_id')->foreign()->references('id')->on('lodging__attribut_terms');
            $table->boolean('actif')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lodging__attribut');
    }
};
