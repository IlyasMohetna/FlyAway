<?php

use App\Http\Controllers\Client\Dashboard\DashboardController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Client\BookingController;


Route::get("/package/booking", [BookingController::class, "index_show"])->name("client.package.booking.show");