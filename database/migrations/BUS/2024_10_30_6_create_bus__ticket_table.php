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
        Schema::create('bus__ticket', function (Blueprint $table) {
            $table->id();
            $table->decimal('price');
            $table->foreignId('bus_line_id')->foreign()->references('id')->on('bus__line');
            $table->foreignId('passenger_type_id')->foreign()->references('id')->on('bus__passenger_type');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bus__ticket');
    }
};
