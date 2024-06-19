<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductControler;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::controller(AuthController::class)->group(function () {
    Route::post('/login', 'login');
    Route::post('/register', 'register');
    Route::post('/logout', 'logout')->middleware('auth:sanctum');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});

Route::resource('/products', ProductControler::class);
