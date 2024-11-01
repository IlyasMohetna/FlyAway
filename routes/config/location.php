<?php

use App\Http\Controllers\LocationController;
use Illuminate\Support\Facades\Route;


Route::get('/config/countries', [LocationController::class, 'getCountries'])->name('countries');
Route::get('/config/regions/{country}', [LocationController::class, 'getRegions'])->name('regions');
Route::get('/config/cities/{region}', [LocationController::class, 'getCities'])->name('cities');
