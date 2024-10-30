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
        Schema::create('employe__employe', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->foreign()->references('id')->on('users');
            $table->string('firstname', 50);
            $table->string('lastname', 50);
            $table->foreignId('post_id')->foreign()->references('id')->on('employe__post');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employe__employe');
    }
};
