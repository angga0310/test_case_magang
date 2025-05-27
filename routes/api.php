<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BukuController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PeminjamanController;


Route::get('/buku', [BukuController::class, 'index']);
Route::post('/buku', [BukuController::class, 'store']);
Route::put('/buku/{id}', [BukuController::class, 'update']);
Route::delete('/buku/{id}', [BukuController::class, 'destroy']);
Route::get('/buku/{id}', [BukuController::class, 'show']);
