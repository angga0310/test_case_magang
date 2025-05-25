<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Peminjaman;
use App\Models\Buku;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

class PeminjamanController extends Controller
{
    public function pinjamBuku(Request $request)
{
    $request->validate([
        'id_user' => 'required|exists:users,id',
        'id_buku' => 'required|exists:buku,id_buku',
    ]);

    $buku = Buku::findOrFail($request->id_buku);

    if (!$buku->tersedia) {
        return response()->json(['message' => 'Buku sedang tidak tersedia.'], 400);
    }

    $peminjaman = Peminjaman::create([
        'id_user' => $request->id_user, // user_id
        'id_buku' => $request->id_buku,
        'tanggal_pinjam' => now(),
    ]);

    $buku->tersedia = false;
    $buku->total_dipinjam += 1;
    $buku->save();

    return response()->json([
        'message' => 'Peminjaman berhasil dicatat.',
        'data' => $peminjaman
    ]);
}

}
