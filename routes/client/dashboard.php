<?php

use App\Http\Controllers\Client\Dashboard\DashboardController;
use Illuminate\Support\Facades\Route;


Route::get("/client/dashboard", [DashboardController::class, "index_show"])->middleware('auth')->name("client.dashboard.show");
