<?php

use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BukuController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PeminjamanController;



Route::post('/login', [AuthController::class, 'login']);

Route::get('/buku', [BukuController::class, 'index']);
Route::post('/buku', [BukuController::class, 'store']);
Route::put('/buku/{id}', [BukuController::class, 'update']);
Route::delete('/buku/{id}', [BukuController::class, 'destroy']);
Route::get('/buku/{id}', [BukuController::class, 'show']);
Route::get('/users', [UserController::class, 'index']);

Route::get('/peminjaman', [PeminjamanController::class, 'daftarPeminjaman']);
Route::post('/peminjaman/pinjam', [PeminjamanController::class, 'pinjamBuku']);
Route::post('/peminjaman/kembali', [PeminjamanController::class, 'kembalikanBuku']);
Route::get('/getpinjam', [PeminjamanController::class, 'daftarPeminjamanUser']);
