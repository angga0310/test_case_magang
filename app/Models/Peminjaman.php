<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Peminjaman extends Model
{
    use HasFactory;

    protected $table = 'peminjamans';
    protected $primaryKey = 'id_peminjaman';
    public $incrementing = true;
    protected $fillable = [
        'id_user', 'id_buku', 'tanggal_pinjam', 'tanggal_kembali'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id');
    }

    public function buku()
    {
        return $this->belongsTo(Buku::class, 'id_buku');
    }
}

