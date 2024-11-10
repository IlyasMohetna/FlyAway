<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LodgingController;

Route::group(['prefix' => 'lodging', 'middleware' => 'auth'], function () {
    Route::get("/", [LodgingController::class, "index"])->name("lodging.index");

    // Type
    Route::get("/type", [LodgingController::class, "type"])->name("lodging.type");
    Route::post("/type", [LodgingController::class, "type_store"])->name("lodging.type.store");
    Route::delete("/type/{id}", [LodgingController::class, "type_delete"])->name("lodging.type.delete");
    //

    // Attribut
    Route::get("/attribut", [LodgingController::class, "attribut_categories"])->name("lodging.attribut");
    Route::get("/attribut/{categorie}", [LodgingController::class, "attribut_by_categorie"])->name("lodging.attribut.data");
    Route::post("/attribut/", [LodgingController::class, "attribut_store"])->name("lodging.attribut.store");
    Route::delete("/attribut/{id}", [LodgingController::class, "attribut_delete"])->name("lodging.attribut.delete");
    Route::post("/attribut/categorie", [LodgingController::class, "attribut_categorie_store"])->name("lodging.attribut_categorie.store");
    Route::delete("/attribut/categorie/{id}", [LodgingController::class, "attribut_categorie_delete"])->name("lodging.attribut_categorie.delete");

    //Equipement
    Route::get("/equipement", [LodgingController::class, "equipement_categories"])->name("lodging.equipement");
    Route::get("/equipement/{categorie}", [LodgingController::class, "equipement_by_categorie"])->name("lodging.equipement.data");
    Route::post("/equipement", [LodgingController::class, "equipement_store"])->name("lodging.equipement.store");
    Route::delete("/equipement/{id}", [LodgingController::class, "equipement_delete"])->name("lodging.equipement.delete");
    Route::post("/equipement/categorie", [LodgingController::class, "equipement_categorie_store"])->name("lodging.equipement_categorie.store");
    Route::delete("/equipement/categorie/{id}", [LodgingController::class, "equipement_categorie_delete"])->name("lodging.equipement_categorie.delete");

});
