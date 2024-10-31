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
        Schema::create('lodging__lodging', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->longText('description');
            $table->enum('star_rating', [1,2,3,4,5]);
            $table->string('address_1');
            $table->string('address_2')->nullable();
            $table->foreignId('linked_city_id')->foreign()->references('id')->on('config__city');
            $table->foreignId('real_city_id')->foreign()->references('id')->on('config__city');
            $table->string('email', 120);
            $table->string('phone', 15);
            $table->time('check_in');
            $table->time('check_out');
            $table->foreignId('lodging_type_id')->foreign()->references('id')->on('lodging__type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lodging__lodging');
    }
};
