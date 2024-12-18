<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LodgingController;

Route::group(['prefix' => 'lodging'], function () {
    Route::get("/", [LodgingController::class, "index"])->name("lodging.index");

    // Type
    Route::get("/type", [LodgingController::class, "type"])->name("lodging.type");
    Route::get("/type/selected", [LodgingController::class, "type_select"])->name("lodging.type.select");
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

    Route::get('/create', [LodgingController::class, 'create_show'])->name('lodging.create.show');
    Route::post('/create', [LodgingController::class, 'store'])->name('lodging.store');

    Route::get('/edit/{lodging_id}', [LodgingController::class, 'edit_lodging_show'])->name('lodging.edit.show');
    Route::post('/edit/{lodging_id}', [LodgingController::class, 'edit_lodging'])->name('lodging.edit');

    Route::get('{lodging_id}/rooms', [LodgingController::class, 'lodging_rooms_index'])->name('lodging.rooms.index');
    Route::get('/room/{room_id}', [LodgingController::class, 'room'])->name('lodging.rooms.data');
    Route::post('/{lodging_id}/room/store', [LodgingController::class, 'room_store'])->name('lodging.room.store');
    Route::delete('/room/{room_id}', [LodgingController::class, 'room_delete'])->name('lodging.rooms.delete');

});
