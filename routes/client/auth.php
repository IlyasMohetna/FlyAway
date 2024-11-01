<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Client\Auth\AuthController;


Route::get("/client/login", [AuthController::class, "show_login"])->name("client.login.show");
Route::post("/client/login", [AuthController::class,"login"])->name("client.login.action");
Route::get("/client/register", [AuthController::class,"show_register"])->name("client.register.show");
Route::post("/client/register", [AuthController::class,"register"])->name("client.register.action");
