<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LodgingController;

Route::group(["prefix"=> "lodging"], function () {
    Route::get("/lodging", [LodgingController::class, "index"])->name("lodging.index");
    Route::get("/lodging/table", [LodgingController::class, "index_table"])->name("lodging.index.table");
});
