<?php 

use App\Http\Controllers\TempController;

Route::get('/temp/upload', [TempController::class, 'show_upload'])->name('temp.upload');
Route::post('/temp/upload', [TempController::class, 'handle_upload'])->name('temp.handle.upload');