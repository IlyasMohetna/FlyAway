<?php 

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TempController;

Route::get('/temp/upload', [TempController::class, 'show_upload'])->name('temp.upload');
Route::post('/temp/upload/countries', [TempController::class, 'handle_upload_countries'])->name('temp.handle.upload.countries');
Route::post('/temp/upload/states', [TempController::class, 'handle_upload_states'])->name('temp.handle.upload.states');
Route::get('/temp/upload/cities', [TempController::class, 'handle_upload_cities'])->name('temp.handle.upload.cities');