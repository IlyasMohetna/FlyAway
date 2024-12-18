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
        Schema::create('config__country', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('iso2', 2);
            $table->string('iso3', 3);
            $table->string('logo');
            $table->decimal('latitude');
            $table->decimal('longitude');
            $table->string('phone_code', 10);
            $table->string('numeric_code');
            $table->string('currency_code');
            $table->string('currency_name', 50);
            $table->string('currency_symbol', 10);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('config__country');
    }
};
