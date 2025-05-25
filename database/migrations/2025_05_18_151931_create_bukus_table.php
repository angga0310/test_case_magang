<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('buku', function (Blueprint $table) {
            $table->bigIncrements('id_buku'); // auto increment
            $table->string('judul');
            $table->string('penulis');
            $table->text('deskripsi');
            $table->string('kategori');
            $table->string('cover_url');
            $table->boolean('tersedia')->default(true);
            $table->date('tanggal_masuk')->nullable();
            $table->integer('total_dipinjam')->default(0);
            $table->timestamps();
        });

    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('buku');
    }
};
