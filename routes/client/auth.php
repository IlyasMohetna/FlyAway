<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;


Route::get("/client/login", [AuthController::class, "show_login"])->name("client.login.show");
