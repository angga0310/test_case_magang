import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Admin/Sidebar';

export default function AdminLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 flex-1 min-h-screen bg-gray-100 p-6">
        {/* outlet berfungsi untuk menampilkan konten dari route child */}
        <Outlet />
      </div>
    </div>
  );
}
