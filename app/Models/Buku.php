<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Buku extends Model
{
    protected $table = 'buku';
    protected $primaryKey = 'id_buku';

    protected $fillable = [
        'id_buku',
        'judul',
        'penulis',
        'deskripsi',
        'kategori',
        'cover_url',
        'tersedia',
        'tanggal_masuk',
        'total_dipinjam',
    ];

    protected $casts = [
        'tersedia' => 'boolean',
        'tanggal_masuk' => 'date',
        'total_dipinjam' => 'integer',
    ];
}
