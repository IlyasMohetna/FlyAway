<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/home', function () {
    return Inertia::render('Home');
});

require __DIR__ . '/client/auth.php';
require __DIR__ . '/client/home.php';
