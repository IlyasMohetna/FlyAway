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

        Schema::create('hebergement', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('name');
            $table->bigInteger('description');
            $table->bigInteger('star_rating');
            $table->bigInteger('adresse');
            $table->bigInteger('ville_rattachement_id');
            $table->foreign('ville_rattachement_id')->references('id')->on('config__city');
            $table->bigInteger('ville_reel_id');
            $table->foreign('ville_reel_id')->references('id')->on('config__city');
            $table->bigInteger('contact_email');
            $table->bigInteger('contact_telephone');
            $table->bigInteger('checkin_time');
            $table->bigInteger('checkout_time');
            $table->bigInteger('hebergement_type_id');
            $table->foreign('hebergement_type_id')->references('id')->on('hebergement_type');
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hebergement');
    }
};
