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
        Schema::create('client_fidelity', function (Blueprint $table) {
            $table->id();
            $table->integer('point');
            $table->string('subject');
            $table->foreignId('client_id')->foreign()->references('id')->on('client__client');
            $table->foreignId('transaction_type_id')->foreign()->references('id')->on('client__fidelity_transaction_type');            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('client_fidelity');
    }
};