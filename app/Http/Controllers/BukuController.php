<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Buku;
use Illuminate\Support\Facades\Storage;

class BukuController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|string',
            'penulis' => 'required|string',
            'deskripsi' => 'nullable|string',
            'kategori' => 'nullable|string',
            'cover' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'tanggal_masuk' => 'nullable|date',
        ]);

        $coverPath = null;
        if ($request->hasFile('cover')) {
            $coverPath = $request->file('cover')->store('covers', 'public');
        }

        $buku = Buku::create([
            'judul' => $request->judul,
            'penulis' => $request->penulis,
            'deskripsi' => $request->deskripsi,
            'kategori' => $request->kategori,
            'cover_url' => $coverPath ? Storage::url($coverPath) : null,
            'tersedia' => true,
            'tanggal_masuk' => $request->tanggal_masuk,
            'total_dipinjam' => 0,
        ]);

        return response()->json([
            'message' => 'Buku berhasil ditambahkan',
            'data' => $buku
        ], 201);
    }

    public function index()
    {
        return response()->json(\App\Models\Buku::all());
    }

}

