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
        Schema::create('config__city', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50);
            $table->string('postal_code', 15);
            $table->decimal('latitude');
            $table->decimal('longitude');
            $table->foreignId('region_id')->foreign()->references('id')->on('config__region');
            $table->string('wikiData', 25);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('config_city');
    }
};
