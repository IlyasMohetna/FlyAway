<?php

use App\Http\Controllers\Client\Dashboard\DashboardController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Client\BookingController;

Route::group(["prefix"=> "package/booking"], function () {
    Route::get("/", [BookingController::class, "index_show"])->name("client.package.booking.show");
    Route::post("/", [BookingController::class, "store"])->name("client.package.booking.store");
    Route::post("/view/invoice", [BookingController::class, "view_invoice"])->name("client.package.booking.invoice.show");
});

