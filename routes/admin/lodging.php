<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LodgingController;

Route::group(["prefix"=> "lodging"], function () {
    Route::get("/lodging", [LodgingController::class, "index"])->name("lodging.index");
    Route::get("/lodging/type", [LodgingController::class, "type"])->name("lodging.type");
    Route::post("/lodging/type", [LodgingController::class, "type_store"])->name("lodging.type.store");
    Route::delete("/lodging/type/{id}", [LodgingController::class, "type_delete"])->name("lodging.type.delete");
});
