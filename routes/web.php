<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\HomeController;

Route::get('/', [HomeController::class, 'index'])->name('index');



require __DIR__ . '/client/auth.php';
require __DIR__ . '/client/dashboard.php';
require __DIR__ . '/config/location.php';

Route::group(['prefix' => 'admin'], function () {
    require __DIR__ . '/admin/lodging.php';
    require __DIR__ . '/admin/package.php';
});

require __DIR__ . '/select.php';
