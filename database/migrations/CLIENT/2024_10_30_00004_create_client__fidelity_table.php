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
        Schema::create('client__fidelity', function (Blueprint $table) {
            $table->id();
            $table->integer('point');
            $table->string('subject');
            $table->foreignId('client_id')->foreign()->references('id')->on('client__client');
            $table->foreignId('transaction_type_id')->foreign()->references('id')->on('client__fidelity_transaction_type');  
            $table->timestamps();
            $table->softDeletes();          
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('client__fidelity');
    }
};
