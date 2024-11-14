<?php

use App\Http\Controllers\Landing\PackageController;
use App\Http\Controllers\LocationController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'package'], function(){
    Route::get('/search', [PackageController::class, 'search_index'])->name('landing.package.search.index');
});
