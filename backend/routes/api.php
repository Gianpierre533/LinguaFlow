<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\UserLanguageController;



Route::middleware('auth:sanctum')->group(function () {
    Route::post('/user-languages', [UserLanguageController::class, 'store']);
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);

Route::get('/ping', function () {
    return response()->json([
        'message' => 'La conexión con Laravel funciona correctamente',
    ]);
});