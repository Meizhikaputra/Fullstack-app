<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::controller(AuthController::class)->group(function () {
    Route::post('/login', 'login');
    Route::post('/register', 'register');
    Route::post('/logout', 'logout')->middleware('auth:sanctum');
});


Route::controller(ProductController::class)->group(function () {
    Route::get('/products', 'index');
    Route::put('/products/{id}', 'update')->middleware('auth:sanctum');
    Route::post('/products', 'store')->middleware('auth:sanctum');
    Route::get('/products/{id}', 'show');
    Route::delete('/products/{id}', 'destroy')->middleware('auth:sanctum');
});


Route::controller(CartController::class)->group(function () {
    Route::get('/carts', 'index')->middleware('auth:sanctum');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
