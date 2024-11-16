<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Client\AuthController;


Route::get("/login", [AuthController::class, "show_login"])->name("client.login.show");
Route::post("/login", [AuthController::class,"login"])->name("client.login.action");
Route::get("/register", [AuthController::class,"show_register"])->name("client.register.show");
Route::post("/register", [AuthController::class,"register"])->name("client.register.action");
