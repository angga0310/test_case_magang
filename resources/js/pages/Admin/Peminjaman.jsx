import React, { useState, useEffect } from "react";
import usePeminjamanStoreAPI from "../../store/usePeminjamanStoreAPI";

export default function Peminjaman() {
    const {
        fetchPeminjamanList,
        pinjamBuku,
        kembalikanBuku,
        peminjamanList,
        loading,
        error,
    } = usePeminjamanStoreAPI();

    const [showModal, setShowModal] = useState(false);
    const [idUser, setIdUser] = useState("");
    const [idBuku, setIdBuku] = useState("");
    const [users, setUsers] = useState([]);
    const [bukuList, setBukuList] = useState([]);
    const [tanggalPinjam, setTanggalPinjam] = useState("");

    // Ambil daftar user
    const fetchUsers = async () => {
        try {
            const res = await fetch("http://146.190.86.93:6969/api/users", {
                headers: { Accept: "application/json" },
            });
            if (!res.ok) throw new Error("Gagal fetch users");
            const data = await res.json();
            setUsers(data);
        } catch (e) {
            console.error("Gagal fetch users:", e);
        }
    };

    // Ambil daftar buku
    const fetchBuku = async () => {
        try {
            const res = await fetch("http://146.190.86.93:6969/api/buku", {
                headers: { Accept: "application/json" },
            });
            if (!res.ok) throw new Error("Gagal fetch buku");
            const data = await res.json();
            setBukuList(data);
        } catch (e) {
            console.error("Gagal fetch buku:", e);
        }
    };

    // Saat halaman pertama kali dimuat, langsung ambil semua peminjaman
    useEffect(() => {
        fetchPeminjamanList();
    }, []);

    // Saat modal muncul, ambil data user & buku
    useEffect(() => {
        if (showModal) {
            fetchUsers();
            fetchBuku();
        }
    }, [showModal]);

    // Tambah Peminjaman
    const handleTambahPeminjaman = async (e) => {
        e.preventDefault();
        try {
            const data = {
                id_user: parseInt(idUser),
                id_buku: parseInt(idBuku),
            };
            if (tanggalPinjam) data.tanggal_pinjam = tanggalPinjam;

            await pinjamBuku(data);
            alert("Buku berhasil dipinjam!");
            setShowModal(false);
            setIdUser("");
            setIdBuku("");
            setTanggalPinjam("");
            await fetchPeminjamanList(); // refresh tabel
        } catch (e) {
            console.error(e);
            alert("Gagal meminjam buku");
        }
    };

    // Kembalikan Buku
    const handleKembalikan = async (id_user, id_peminjaman) => {
        console.log("Mengembalikan buku:", { id_user, id_peminjaman }); // 🔎 Tambahkan log
        try {
            await kembalikanBuku({ id_user, id_peminjaman });
            alert("Buku berhasil dikembalikan!");
            await fetchPeminjamanList();
        } catch (e) {
            console.error(e);
            alert("Gagal mengembalikan buku");
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Manajemen Peminjaman</h2>

            <button
                onClick={() => setShowModal(true)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mb-4"
            >
                + Tambah Peminjaman
            </button>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="overflow-x-auto bg-white rounded shadow">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-3 py-2 border">Nama User</th>
                            <th className="px-3 py-2 border">ID Buku</th>
                            <th className="px-3 py-2 border">Tanggal Pinjam</th>
                            <th className="px-3 py-2 border">
                                Tanggal Kembali
                            </th>
                            <th className="px-3 py-2 border">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {peminjamanList.length > 0 ? (
                            peminjamanList.map((p) => (
                                <tr
                                    key={p.id_peminjaman}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-3 py-2 border text-center">
                                        {p.user ? p.user.name : p.id_user}
                                    </td>
                                    <td className="px-3 py-2 border text-center">
                                        {p.buku ? p.buku.judul : p.id_buku}
                                    </td>
                                    <td className="px-3 py-2 border text-center">
                                        {p.tanggal_pinjam}
                                    </td>
                                    <td className="px-3 py-2 border text-center">
                                        {p.tanggal_kembali || "-"}
                                    </td>
                                    <td className="px-3 py-2 border text-center">
                                        {p.dikembalikan === 0 ? (
                                            <button
                                                onClick={() =>
                                                    handleKembalikan(
                                                        p.id_user,
                                                        p.id_peminjaman
                                                    )
                                                }
                                                className="bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-600"
                                            >
                                                Kembalikan
                                            </button>
                                        ) : (
                                            <span className="text-green-600 font-semibold">
                                                Sudah Dikembalikan
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-4">
                                    Tidak ada data.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded p-4 w-80">
                        <h2 className="text-lg font-bold mb-2">
                            Tambah Peminjaman
                        </h2>
                        <form
                            onSubmit={handleTambahPeminjaman}
                            className="space-y-2"
                        >
                            <select
                                value={idUser}
                                onChange={(e) => setIdUser(e.target.value)}
                                className="border rounded px-2 py-1 w-full"
                                required
                            >
                                <option value="">Pilih User</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={idBuku}
                                onChange={(e) => setIdBuku(e.target.value)}
                                className="border rounded px-2 py-1 w-full"
                                required
                            >
                                <option value="">Pilih Buku</option>
                                {bukuList.map((buku) => (
                                    <option
                                        key={buku.id_buku}
                                        value={buku.id_buku}
                                    >
                                        {buku.judul}
                                    </option>
                                ))}
                            </select>

                            <input
                                type="date"
                                value={tanggalPinjam}
                                onChange={(e) =>
                                    setTanggalPinjam(e.target.value)
                                }
                                className="border rounded px-2 py-1 w-full"
                            />

                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-3 py-1 border rounded"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
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
