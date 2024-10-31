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
        Schema::create('lodging__attribut_terms', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('attribut_categorie_id')->foreign()->references('id')->on('lodging__attribut_categories');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lodging__attribut_terms');
    }
};
