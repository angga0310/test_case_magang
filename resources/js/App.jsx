import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import AdminLayout from './pages/Admin/AdminLayout';
import Dashboard from './pages/Admin/Dashboard';
import Buku from './pages/Admin/Buku';
import BukuAPI from './pages/Admin/BukuAPI';
import Peminjaman from './pages/Admin/Peminjaman';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Admin Routes (nested) */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* <Route index element={<Dashboard />} /> */}
          {/* <Route path="buku" element={<Buku />} /> */}
          <Route index element={<BukuAPI />} />
          <Route path="peminjaman" element={<Peminjaman />} />
        </Route>
      </Routes>
    </Router>
  );
}
