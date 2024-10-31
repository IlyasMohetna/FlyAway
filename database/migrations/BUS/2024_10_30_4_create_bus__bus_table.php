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
        Schema::create('bus__bus', function (Blueprint $table) {
            $table->id();
            $table->string('plate', 50);
            $table->string('color', 50);
            $table->string('number_of_seats');
            $table->integer('number_of_doors');
            $table->string('photo');
            $table->foreignId('bus_company_id')->foreign()->references('id')->on('bus__companies');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bus__bus');
    }
};
