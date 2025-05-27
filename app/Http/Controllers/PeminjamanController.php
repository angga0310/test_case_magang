<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Peminjaman;
use App\Models\Buku;
use Illuminate\Support\Facades\Log;

class PeminjamanController extends Controller
{
    /**
     * Pinjam buku.
     */
    public function pinjamBuku(Request $request)
    {
        try {
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

            // Catat peminjaman
            $peminjaman = Peminjaman::create([
                'id_user' => $validated['id_user'],
                'id_buku' => $validated['id_buku'],
                'tanggal_pinjam' => now(),
            ]);

            if (!$peminjaman->exists) {
                Log::error('Gagal menyimpan data peminjaman.');
                return response()->json(['message' => 'Gagal menyimpan data peminjaman.'], 500);
            }

            // Update status buku
            $buku->tersedia = false;
            $buku->total_dipinjam += 1;
            $buku->save();

            return response()->json([
                'message' => 'Peminjaman berhasil dicatat.',
                'data' => $peminjaman
            ], 201);

        } catch (\Exception $e) {
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

    /**
     * Daftar buku yang sedang dipinjam user.
     */
    public function daftarPeminjamanUser(Request $request)
    {
        try {
            $validated = $request->validate([
                'id_user' => 'required|exists:users,id',
            ]);

            // Ambil data peminjaman + relasi user dan buku
            $peminjaman = Peminjaman::with(['buku', 'user'])
                ->where('id_user', $validated['id_user'])
                ->whereNull('tanggal_kembali')
                ->get();

            return response()->json([
                'message' => $peminjaman->isEmpty() ? 'Tidak ada buku yang sedang dipinjam.' : 'Daftar buku yang sedang dipinjam.',
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

    /**
     * Kembalikan buku.
     */
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
