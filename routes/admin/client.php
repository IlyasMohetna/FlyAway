<?php

use App\Http\Controllers\Admin\ClientController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'client'], function () {
    // Client List
    Route::get("/", [ClientController::class, "client_index"])->name("client.index");
    Route::put('{id}/toggle_active', [ClientController::class, 'toggle_active'])->name('client.toggle_active');
    // Route::post("/", [LodgingController::class, "client_store"])->name("client.store");

    // Route::get("/show/{id}", [LodgingController::class, "type"])->name("client.show");
    // Route::delete("/{id}", [LodgingController::class, "type_delete"])->name("client.delete");
});
