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

        Schema::create('payment__credit_card', function (Blueprint $table) {
            $table->id();
            $table->text('card_number');
            $table->text('cardholder_name');
            $table->text('expiration_date');
            $table->text('cvv');
            $table->foreignId('client_id')->foreign()->references('id')->on('client__client');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payment__credit_card');
    }
};
