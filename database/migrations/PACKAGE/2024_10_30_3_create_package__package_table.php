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
        Schema::create('package__package', function (Blueprint $table) {
            $table->id();
            $table->string('title', 120);
            $table->decimal('amount_ht');
            $table->decimal('amount_ttc');
            $table->integer('duration');
            $table->longText('description');
            $table->foreignId('package_type_id')->foreign()->references('id')->on('package__package_type');
            $table->foreignId('destination_id')->foreign()->references('id')->on('config__city');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('package__package');
    }
};
