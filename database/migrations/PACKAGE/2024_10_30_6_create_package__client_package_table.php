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
        Schema::create('package__client_package', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_client')->foreign()->references('id')->on('client__client');
            $table->foreignId('package_id')->foreign()->references('id')->on('package__package');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('package__client_package');
    }
};
