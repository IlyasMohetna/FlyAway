<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PackageController;

Route::group(['prefix' => 'package'], function () {
    Route::get("/", [PackageController::class, "index"])->name("package.index");
    Route::post("/store", [PackageController::class, "store"])->name("package.store");

    Route::get("/type", [PackageController::class, "type"])->name("package.type");
    Route::post("/type", [PackageController::class, "type_store"])->name("package.type.store");
    Route::delete("/type/{id}", [PackageController::class, "type_delete"])->name("package.type.delete");

    Route::get("/transport", [PackageController::class, "transportation_index"])->name("package.transport");
    Route::post("/transport", [PackageController::class, "transportation_store"])->name("package.transport.store");
    Route::delete("/transport/{id}", [PackageController::class, "transportation_delete"])->name("package.transport.delete");

    // // Private Clients
    Route::get("/{id}/linked/users", [PackageController::class, "linked_users"])->name("package.link.users.data");
    Route::post("/{id}/link/user", [PackageController::class, "link_user"])->name("package.link.user.add");
    Route::post("/{id}/unlink", [PackageController::class, "unlink_user"])->name("package.link.user.unlink");

    Route::get("/search/client", [PackageController::class, "search_client"])->name("package.link.user.search");
});
