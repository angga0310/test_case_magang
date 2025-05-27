import React from "react";

export default function Navbar() {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">PerpustakaanKu</h1>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <a
            href="#features"
            className="hover:underline transition-all duration-200"
          >
            Fitur
          </a>
          <a
            href="#about"
            className="hover:underline transition-all duration-200"
          >
            Tentang
          </a>
          <a
            href="/login"
            className="bg-white text-blue-500 rounded px-4 py-1 font-semibold hover:bg-gray-100 transition-all duration-200"
          >
            Login
          </a>
        </nav>
      </div>
    </header>
  );
}
