<?php

use App\Http\Controllers\Client\Dashboard\DashboardController;
use Illuminate\Support\Facades\Route;


Route::get("/dashboard", [DashboardController::class, "index_show"])->name("client.dashboard.show");
