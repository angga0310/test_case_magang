import React from "react";

export default function Features() {
  return (
    <section id="features" className="min-h-screen bg-white text-gray-800 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h3 className="text-2xl font-bold mb-6 text-center">Fitur Unggulan</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-100 rounded p-4 shadow hover:shadow-lg transition">
            <h4 className="font-semibold mb-2">Pinjam Buku</h4>
            <p className="text-sm">
              Pinjam buku dengan mudah dan cepat hanya dengan beberapa klik.
            </p>
          </div>
          <div className="bg-gray-100 rounded p-4 shadow hover:shadow-lg transition">
            <h4 className="font-semibold mb-2">Manajemen Stok</h4>
            <p className="text-sm">
              Pantau stok buku dan status pinjaman dengan real-time.
            </p>
          </div>
          <div className="bg-gray-100 rounded p-4 shadow hover:shadow-lg transition">
            <h4 className="font-semibold mb-2">Pencarian Cepat</h4>
            <p className="text-sm">
              Temukan buku favoritmu dengan fitur pencarian yang akurat.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
