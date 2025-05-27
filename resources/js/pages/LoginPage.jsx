import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      navigate('/admin');
    } else {
      alert('Username atau password salah');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login Admin</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 border rounded mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
