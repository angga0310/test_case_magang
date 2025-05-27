<?php

use App\Http\Controllers\BukuController;
use Illuminate\Support\Facades\Route;

Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');

Route::get('/fix-password', function() {
    $user = \App\Models\User::where('email', 'bayukrisna@gmail.com')->first();
    $user->password = \Hash::make('12345678');
    $user->save();
    return 'Password berhasil di-hash!';
});

