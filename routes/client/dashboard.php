<?php

use App\Http\Controllers\Client\DashboardController;
use Illuminate\Support\Facades\Route;


Route::group(['prefix' => 'dashboard'], function () {
    Route::get("bookings", [DashboardController::class, "bookings_list"])->name("client.dashboard.bookings.show");
});
