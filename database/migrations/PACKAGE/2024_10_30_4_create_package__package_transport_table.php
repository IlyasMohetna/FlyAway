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
        Schema::create('package__package_transport', function (Blueprint $table) {
            $table->id();
            $table->foreignId('transportation_mode_id')->foreign()->references('id')->on('package__transportation_modes');
            $table->foreignId('package_id')->foreign()->references('id')->on('package__package');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('package__package_transport');
    }
};
