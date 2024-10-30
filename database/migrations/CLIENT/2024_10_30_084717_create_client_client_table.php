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
        Schema::disableForeignKeyConstraints();

        Schema::create('client_client', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->string('firstname', 50);
            $table->string('lastname', 50);
            $table->string('email', 100);
            $table->string('phone', 15);
            $table->string('address_1', 255);
            $table->string('address_2', 255);
            $table->bigInteger('city_id');
            $table->foreign('city_id')->references('id')->on('config__city');
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('client_client');
    }
};
