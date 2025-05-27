import { useState } from "react";
import useBukuStore from "../../store/useBukuStore";

export default function Buku() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(null); // 'add' | 'edit' | null
  const [judulInput, setJudulInput] = useState("");
  const [editBukuId, setEditBukuId] = useState(null);

  const {
    bukuList,
    tambahBuku,
    pinjamBuku,
    kembalikanBuku,
    hapusBuku,
    updateBuku,
  } = useBukuStore();

  const filteredBuku = bukuList.filter((buku) =>
    (buku.judul || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleTambahBuku = (e) => {
    e.preventDefault();
    if (judulInput.trim()) {
      tambahBuku(judulInput.trim());
      setJudulInput("");
      setShowModal(null);
    }
  };

  const handleUpdateBuku = (e) => {
    e.preventDefault();
    if (judulInput.trim()) {
      updateBuku(editBukuId, judulInput.trim());
      setEditBukuId(null);
      setJudulInput("");
      setShowModal(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Manajemen Buku</h2>

        {/* Search & Buttons */}
        <div className="flex flex-wrap gap-2 mb-4 items-center">
          <input
            type="text"
            placeholder="Cari buku..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-1 rounded flex-1 min-w-[200px]"
          />
          <button
            onClick={() => setShowModal("add")}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          >
            + Tambah Buku
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 border">Judul</th>
                <th className="px-3 py-2 border">Stok</th>
                <th className="px-3 py-2 border">Status</th>
                <th className="px-3 py-2 border">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredBuku.length > 0 ? (
                filteredBuku.map((buku) => (
                  <tr key={buku.id} className="hover:bg-gray-50">
                    <td className="px-3 py-2 border">{buku.judul}</td>
                    <td className="px-3 py-2 border text-center">{buku.stok}</td>
                    <td className="px-3 py-2 border text-center">
                      {buku.dipinjam ? (
                        <span className="text-yellow-600 font-semibold">Dipinjam</span>
                      ) : (
                        <span className="text-green-600 font-semibold">Tersedia</span>
                      )}
                    </td>
                    <td className="px-3 py-2 border text-center flex gap-1 justify-center">
                      {!buku.dipinjam ? (
                        <button
                          onClick={() => pinjamBuku(buku.id)}
                          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                        >
                          Pinjam
                        </button>
                      ) : (
                        <button
                          onClick={() => kembalikanBuku(buku.id)}
                          className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                        >
                          Kembali
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setEditBukuId(buku.id);
                          setJudulInput(buku.judul);
                          setShowModal("edit");
                        }}
                        className="bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => hapusBuku(buku.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    Tidak ada buku.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal Tambah/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded p-4 w-80">
            <h2 className="text-lg font-bold mb-2">
              {showModal === "add" ? "Tambah Buku" : "Edit Buku"}
            </h2>
            <form
              onSubmit={showModal === "add" ? handleTambahBuku : handleUpdateBuku}
              className="space-y-2"
            >
              <input
                type="text"
                value={judulInput}
                onChange={(e) => setJudulInput(e.target.value)}
                placeholder="Judul buku"
                className="border rounded px-2 py-1 w-full"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(null)}
                  className="px-3 py-1 border rounded"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className={`${
                    showModal === "add"
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-purple-500 hover:bg-purple-600"
                  } text-white px-3 py-1 rounded`}
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
