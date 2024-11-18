<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Client\BookingController;
use App\Http\Controllers\Client\DashboardController;


Route::group(['prefix' => 'dashboard'], function () {
    Route::get("bookings", [DashboardController::class, "bookings_list"])->name("client.dashboard.bookings.show");
    Route::get("fidelity", [DashboardController::class, "fidelity_list"])->name("client.dashboard.fidelity.show");
    Route::get("payments", [DashboardController::class, "payments_list"])->name("client.dashboard.payments.show");
    Route::post("/view/booking/invoice", action: [BookingController::class, "view_booking_invoice"])->name("client.dashboard.booking.invoice.show");
    Route::post("/view/payment/invoice", action: [BookingController::class, "view_payment_invoice"])->name("client.dashboard.payment.invoice.show");
});
