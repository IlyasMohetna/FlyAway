<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LodgingController;

Route::group(["prefix"=> "lodging"], function () {
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
    Route::post("/categorie", [LodgingController::class, "attribut_categorie_store"])->name("lodging.attribut_categorie.store");
    Route::delete("/categorie/{id}", [LodgingController::class, "attribut_categorie_delete"])->name("lodging.attribut_categorie.delete");

});
