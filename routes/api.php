<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BukuController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PeminjamanController;

Route::post('/buku', [BukuController::class, 'store']);
Route::get('/getbuku', [BukuController::class, 'index']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/pinjam', [PeminjamanController::class, 'pinjamBuku']);
