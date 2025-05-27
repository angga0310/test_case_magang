const API_BASE = '/api/buku';

export async function fetchBuku() {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error('Gagal fetch buku!');
  return res.json();
}

export async function addBuku(judul) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ judul }),
  });
  if (!res.ok) throw new Error('Gagal tambah buku!');
  return res.json();
}

export async function updateBuku(id, judul) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ judul }),
  });
  if (!res.ok) throw new Error('Gagal update buku!');
  return res.json();
}

export async function deleteBuku(id) {
  const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Gagal hapus buku!');
}
