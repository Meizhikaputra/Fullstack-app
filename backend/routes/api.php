<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductControler;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/sanctum/csrf-cookie', function (Request $request) {
    return response()->json(['csrf_token' => csrf_token()]);
});
Route::get('/', function () {
    return 'CONECTED';
});

Route::controller(AuthController::class)->group(function () {
    Route::post('/login', 'login');
    Route::post('/register', 'register');
    Route::post('/logout', 'logout')->middleware('auth:sanctum');
});

Route::resource('/products', ProductControler::class);
