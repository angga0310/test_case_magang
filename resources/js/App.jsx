import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import AdminLayout from './pages/Admin/AdminLayout';
import Dashboard from './pages/Admin/Dashboard';
import Buku from './pages/Admin/Buku';
import BukuAPI from './pages/Admin/BukuAPI';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Admin Routes (nested) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="buku" element={<Buku />} />
          <Route path="bukuAPI" element={<BukuAPI />} />
        </Route>
      </Routes>
    </Router>
  );
}
