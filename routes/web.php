<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Client\BookingController;
use App\Http\Controllers\HomeController;

Route::get('/', [HomeController::class, 'index'])->name('index');


require __DIR__ . '/temp.php';

require __DIR__ . '/client/auth.php';
require __DIR__ . '/client/dashboard.php';

require __DIR__ . '/config/location.php';

include __DIR__ . '/landing/package.php';

Route::group(['prefix' => 'admin'], function () {
    require __DIR__ . '/admin/auth.php';
    Route::group(['middleware' => ['admin']], function () {
        require __DIR__ . '/admin/dashboard.php';
        require __DIR__ . '/admin/lodging.php';
        require __DIR__ . '/admin/package.php';
        require __DIR__ . '/admin/client.php';
    });
});

Route::group(['prefix' => 'client'], function () {
    require __DIR__ . '/client/auth.php';
    Route::group(['middleware' => ['client']], function () {
        require __DIR__ . '/client/dashboard.php';
        require __DIR__ . '/landing/booking.php';
    });
});

require __DIR__ . '/select.php';
