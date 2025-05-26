<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Peminjaman;
use App\Models\Buku;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class PeminjamanController extends Controller
{
    public function pinjamBuku(Request $request)
    {
        try {
            // Logging input data
            Log::info('Request data:', $request->all());

            // Validasi
            $validated = $request->validate([
                'id_user' => 'required|exists:users,id',
                'id_buku' => 'required|exists:buku,id_buku',
            ]);

            $buku = Buku::findOrFail($validated['id_buku']);

            if (!$buku->tersedia) {
                return response()->json(['message' => 'Buku sedang tidak tersedia.'], 400);
            }

            // Debug sebelum create
            Log::info('Mencatat peminjaman', [
                'id_user' => $validated['id_user'],
                'id_buku' => $validated['id_buku'],
                'tanggal_pinjam' => now()->toDateTimeString()
            ]);

            $peminjaman = Peminjaman::create([
                'id_user' => $validated['id_user'],
                'id_buku' => $validated['id_buku'],
                'tanggal_pinjam' => now(),
            ]);

            if (!$peminjaman->exists) {
                Log::error('Gagal menyimpan data peminjaman.');
                return response()->json(['message' => 'Gagal menyimpan data peminjaman.'], 500);
            }

            if (!$buku->tersedia) {
                return response()->json([
                    'message' => 'Buku sedang tidak tersedia.',
                    'buku' => [
                        'id_buku' => $buku->id_buku,
                        'judul' => $buku->judul
                    ]
                ], 400);
            }

            // Update buku
            $buku->tersedia = false;
            $buku->total_dipinjam += 1;
            $buku->save();

            return response()->json([
                'message' => 'Peminjaman berhasil dicatat.',
                'data' => $peminjaman
            ], 201);

        } catch (\Exception $e) {
            // Logging error
            Log::error('Error pinjam buku:', [
                'message' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => $e->getFile(),
            ]);

            return response()->json([
                'message' => 'Terjadi kesalahan.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function daftarPeminjamanUser(Request $request)
{
    try {
        $validated = $request->validate([
            'id_user' => 'required|exists:users,id',
        ]);

        $peminjaman = Peminjaman::where('id_user', $validated['id_user'])
            ->whereNull('tanggal_kembali') // hanya yang belum dikembalikan
            ->with('buku') // relasi ke model Buku (pastikan sudah diatur di model Peminjaman)
            ->get();

        if ($peminjaman->isEmpty()) {
            return response()->json([
                'message' => 'Tidak ada buku yang sedang dipinjam.',
                'data' => []
            ], 200);
        }

        return response()->json([
            'message' => 'Daftar buku yang sedang dipinjam.',
            'data' => $peminjaman
        ], 200);

    } catch (\Exception $e) {
        Log::error('Error daftar peminjaman:', [
            'message' => $e->getMessage(),
            'line' => $e->getLine(),
            'file' => $e->getFile(),
        ]);

        return response()->json([
            'message' => 'Terjadi kesalahan.',
            'error' => $e->getMessage(),
        ], 500);
    }
}

public function kembalikanBuku(Request $request)
{
    try {
        $validated = $request->validate([
            'id_user' => 'required|exists:users,id',
            'id_peminjaman' => 'required|exists:peminjamans,id_peminjaman',
        ]);

        $peminjaman = Peminjaman::where('id_peminjaman', $validated['id_peminjaman'])
            ->where('id_user', $validated['id_user'])
            ->whereNull('tanggal_kembali')
            ->first();

        if (!$peminjaman) {
            return response()->json([
                'message' => 'Data peminjaman tidak ditemukan atau sudah dikembalikan.'
            ], 404);
        }

        // Update tanggal_kembali
        $peminjaman->tanggal_kembali = now();
        $peminjaman->save();

        // Update status buku
        $buku = Buku::find($peminjaman->id_buku);
        $buku->tersedia = true;
        $buku->save();

        return response()->json([
            'message' => 'Buku berhasil dikembalikan.',
            'data' => $peminjaman
        ], 200);

    } catch (\Exception $e) {
        Log::error('Error pengembalian buku:', [
            'message' => $e->getMessage(),
            'line' => $e->getLine(),
            'file' => $e->getFile(),
        ]);

        return response()->json([
            'message' => 'Terjadi kesalahan.',
            'error' => $e->getMessage(),
        ], 500);
    }
}

    

}
