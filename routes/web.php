<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;

Route::get('/home', function () {
    return Inertia::render('Home');
})->name('home');



require __DIR__ . '/client/auth.php';
require __DIR__ . '/client/home.php';
require __DIR__ . '/config/location.php';
