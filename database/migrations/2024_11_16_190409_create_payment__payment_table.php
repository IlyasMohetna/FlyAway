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
        Schema::create('payment__payment', function (Blueprint $table) {
            $table->id();
            $table->decimal('amount');
            $table->foreignId('booking_id')->foreign()->references('id')->on('package__booking');
            $table->foreignId('status_id')->foreign()->references('id')->on('payment__payment_status');
            $table->morphs('paymentable');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payment__payment');
    }
};