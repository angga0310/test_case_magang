import React, { useEffect, useState } from "react";
import useBukuStoreAPI from "../../store/useBukuStoreAPI";

export default function BukuAPI() {
  const {
    bukuList,
    fetchBuku,
    addBuku,
    updateBuku,
    hapusBuku,
    loading,
    error,
  } = useBukuStoreAPI();

  const [search, setSearch] = useState("");
  const [judul, setJudul] = useState("");
  const [penulis, setPenulis] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [kategori, setKategori] = useState("");
  const [tanggalMasuk, setTanggalMasuk] = useState("");
  const [cover, setCover] = useState(null);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(null); // 'add' | 'edit' | null

  useEffect(() => {
    fetchBuku();
  }, [fetchBuku]);

  const filteredBuku = bukuList.filter((b) =>
    (b.judul || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("penulis", penulis);
    formData.append("deskripsi", deskripsi);
    formData.append("kategori", kategori);
    formData.append("tanggal_masuk", tanggalMasuk);
    if (cover) formData.append("cover_url", cover);

    try {
      if (showModal === "add") {
        await addBuku(formData);
      } else if (showModal === "edit" && editId) {
        await updateBuku(editId, formData);
      }

      // Reset form
      setJudul("");
      setPenulis("");
      setDeskripsi("");
      setKategori("");
      setTanggalMasuk("");
      setCover(null);
      setEditId(null);
      setShowModal(null);
    } catch (err) {
      console.error(err);
    }
  };

  const openEditModal = (buku) => {
    setEditId(buku.id_buku);
    setJudul(buku.judul);
    setPenulis(buku.penulis || "");
    setDeskripsi(buku.deskripsi || "");
    setKategori(buku.kategori || "");
    setTanggalMasuk(
      buku.tanggal_masuk
        ? new Date(buku.tanggal_masuk).toISOString().split("T")[0]
        : ""
    );
    setCover(null);
    setShowModal("edit");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Manajemen Buku</h2>

        {/* Search & Button */}
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

        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 border">Judul</th>
                <th className="px-3 py-2 border">Penulis</th>
                <th className="px-3 py-2 border">Deskripsi</th>
                <th className="px-3 py-2 border">Cover</th>
                <th className="px-3 py-2 border">Tanggal Masuk</th>
                <th className="px-3 py-2 border">Status</th>
                <th className="px-3 py-2 border">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredBuku.length > 0 ? (
                filteredBuku.map((buku) => (
                  <tr key={buku.id_buku} className="hover:bg-gray-50">
                    <td className="px-3 py-2 border">{buku.judul}</td>
                    <td className="px-3 py-2 border text-center">{buku.penulis}</td>
                    <td className="px-3 py-2 border">{buku.deskripsi}</td>
                    <td className="px-3 py-2 border text-center">
                      {buku.cover_url && (
                        <img
                          src={buku.cover_url}
                          alt="cover"
                          className="h-10 mx-auto"
                        />
                      )}
                    </td>
                    <td className="text-center border">
                      {new Date(buku.tanggal_masuk).toLocaleDateString("en-CA")}
                    </td>
                    <td className="text-center border">
                      {buku.tersedia == "1" ? (
                        <span className="text-green-500">Tersedia</span>
                      ) : (
                        <span className="text-red-500">Dipinjam</span>
                      )}
                    </td>
                    <td className="px-3 py-2 text-center flex items-center gap-1 justify-center">
                      <button
                        onClick={() => openEditModal(buku)}
                        className="bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              "Yakin ingin menghapus buku ini?"
                            )
                          ) {
                            hapusBuku(buku.id_buku);
                          }
                        }}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4">
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
            <form onSubmit={handleAddOrUpdate} className="space-y-2">
              <input
                type="text"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                placeholder="Judul buku"
                className="border rounded px-2 py-1 w-full"
                required
              />
              <input
                type="text"
                value={penulis}
                onChange={(e) => setPenulis(e.target.value)}
                placeholder="Penulis"
                className="border rounded px-2 py-1 w-full"
                required
              />
              <textarea
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                placeholder="Deskripsi (opsional)"
                className="border rounded px-2 py-1 w-full"
              />
              <input
                type="text"
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
                placeholder="Kategori (opsional)"
                className="border rounded px-2 py-1 w-full"
              />
              <input
                type="date"
                value={tanggalMasuk}
                onChange={(e) => setTanggalMasuk(e.target.value)}
                placeholder="Tanggal Masuk (opsional)"
                className="border rounded px-2 py-1 w-full"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setCover(e.target.files[0])}
                className="border rounded px-2 py-1 w-full"
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
