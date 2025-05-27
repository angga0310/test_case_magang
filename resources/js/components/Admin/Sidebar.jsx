import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';
import { LogOut } from 'lucide-react'; // pakai icon lucide-react

export default function Sidebar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-64 h-screen bg-indigo-700 text-white fixed top-0 left-0 p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-8">Perpustakaan</h2>
        <nav className="space-y-4">
          {/* <Link to="/admin" className="block hover:bg-indigo-600 px-4 py-2 rounded">Dashboard</Link> */}
          <Link to="/admin" className="block hover:bg-indigo-600 px-4 py-2 rounded">Buku</Link>
          <Link to="/admin/peminjaman" className="block hover:bg-indigo-600 px-4 py-2 rounded">Peminjaman</Link>
        </nav>
      </div>

      {/* Bagian User Info + Logout */}
      {user && (
        <div className="flex items-center justify-between bg-indigo-600 p-2 rounded mt-8">
          {/* Avatar (pakai gambar user atau default) */}
          <img
            src={user.avatar || '/default_profil.png'} // ganti sesuai field avatar user
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />

          {/* Nama user */}
          <span className="mx-2">{user.name}</span>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-700 transition"
            title="Logout"
          >
            <LogOut />
          </button>
        </div>
      )}
    </aside>
  );
}
