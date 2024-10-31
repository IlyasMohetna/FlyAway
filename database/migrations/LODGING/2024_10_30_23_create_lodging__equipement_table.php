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
        Schema::create('lodging__equipement', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->foreignId('equipement_categorie_id')->foreign()->references('id')->on('lodging__equipement_categories');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lodging__equipement');
    }
};
