<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AuthController;


Route::get("/login", [AuthController::class, "show_login"])->name("admin.login.show");
Route::post("/login", [AuthController::class,"login"])->name("admin.login.action");
