import React from "react";

export default function Hero() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-24 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h2 className="text-5xl font-extrabold mb-4 drop-shadow-md">
        Selamat Datang di PerpustakaanKu
      </h2>
      <p className="max-w-xl mb-8 text-lg text-white/80">
        Temukan buku favoritmu, pinjam buku online, dan nikmati manajemen buku
        yang efisien!
      </p>
      <a
        href="/login"
        className="bg-white text-blue-500 px-8 py-3 rounded font-semibold hover:bg-gray-100 transition-all duration-300 shadow-md"
      >
        Mulai Sekarang
      </a>
    </main>
  );
}
