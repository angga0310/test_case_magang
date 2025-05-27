import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-indigo-700 text-white fixed top-0 left-0 p-6">
      <h2 className="text-2xl font-bold mb-8">Perpustakaan</h2>
      <nav className="space-y-4">
        <Link to="/admin" className="block hover:bg-indigo-600 px-4 py-2 rounded">Dashboard</Link>
        <Link to="/admin/buku" className="block hover:bg-indigo-600 px-4 py-2 rounded">Buku</Link>
        <Link to="/admin/bukuAPI" className="block hover:bg-indigo-600 px-4 py-2 rounded">Buku API</Link>
      </nav>
    </aside>
  );
}
