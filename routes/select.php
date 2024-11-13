<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SelectController;

Route::get('/select/city', [SelectController::class, 'city_select'])->name('select.city');
Route::get('/select/package_type', [SelectController::class, 'package_type_select'])->name('select.package_type');
Route::get('/select/lodging', [SelectController::class, 'lodging_select'])->name('select.lodging');
Route::get('/select/transport', [SelectController::class, 'transport_select'])->name('select.transport');


?>
