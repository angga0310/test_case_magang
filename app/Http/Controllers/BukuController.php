<?php

namespace App\Http\Controllers;

use App\Models\Buku;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BukuController extends Controller
{
    public function index()
    {
        $buku = Buku::all();
        return response()->json($buku);
    }

    public function show($id)  // TAMBAHKAN INI!
    {
        $buku = Buku::findOrFail($id);
        return response()->json($buku);
    }

    public function store(Request $request)
    {
        \Log::info('Request diterima:', $request->all());

        $data = $request->validate([
            'judul' => 'required|string',
            'penulis' => 'required|string',
            'deskripsi' => 'nullable|string',
            'kategori' => 'nullable|string',
            'cover_url' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'tanggal_masuk' => 'nullable|date',
        ]);

        if ($request->hasFile('cover_url')) {
            // Ambil file cover
            $file = $request->file('cover_url');
            // Nama file unik (pakai timestamp)
            $fileName = time() . '_' . $file->getClientOriginalName();
            // Simpan langsung ke public/img
            $file->move(public_path('img'), $fileName);

            // URL akses publik
            $data['cover_url'] = asset('img/' . $fileName);
        }

        $data['tersedia'] = true;
        $data['total_dipinjam'] = 0;

        $buku = Buku::create($data);

        return response()->json($buku);
    }


    public function update(Request $request, $id)
    {
        \Log::info('Masuk ke controller update!');
        \Log::info('Request:', $request->all());

        $data = $request->validate([
            'judul' => 'required|string',
            'penulis' => 'required|string',
            'deskripsi' => 'nullable|string',
            'kategori' => 'nullable|string',
            'cover' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'tanggal_masuk' => 'nullable|date',
            'tersedia' => 'nullable|boolean',
            'total_dipinjam' => 'nullable|integer',
        ]);

        \Log::info('Data valid:', $data);

        $buku = Buku::findOrFail($id);

        if ($request->hasFile('cover')) {
            // Hapus file lama di public/img
            if ($buku->cover_url) {
                // Contoh cover_url: http://127.0.0.1:8000/img/1653656237_nama.jpg
                $parsedUrl = parse_url($buku->cover_url);
                $oldPath = public_path($parsedUrl['path']); // hasil: public/img/xxx.jpg

                if (file_exists($oldPath)) {
                    unlink($oldPath);
                }
            }

            // Simpan file cover baru di public/img
            $file = $request->file('cover');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('img'), $fileName);

            // Update URL cover
            $data['cover_url'] = asset('img/' . $fileName);
        }

        $buku->update($data);

        return response()->json([
            'message' => 'Buku berhasil diupdate!',
            'data' => $buku
        ], 200);
    }

    public function destroy($id)
    {
        $buku = Buku::findOrFail($id);

        if ($buku->cover_url) {
            $oldPath = str_replace(asset('storage') . '/', '', $buku->cover_url);
            Storage::disk('public')->delete($oldPath);
        }

        $buku->delete();

        return response()->json(['message' => 'Buku berhasil dihapus!']);
    }
}

