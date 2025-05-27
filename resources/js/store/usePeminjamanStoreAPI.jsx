import { create } from "zustand";

const API_BASE = "http://146.190.86.93:6969/api/peminjaman";

const usePeminjamanStore = create((set) => ({
    peminjamanList: [],
    loading: false,
    error: null,

    // ✅ Ambil semua data peminjaman (untuk semua user)
    fetchPeminjamanList: async () => {
        set({ loading: true, error: null });
        try {
            const res = await fetch(API_BASE, {
                headers: { Accept: "application/json" },
            });
            if (!res.ok) throw new Error("Gagal fetch daftar peminjaman!");
            const result = await res.json();

            // Pastikan yang di-set adalah ke 'peminjamanList' bukan yang lain
            set({ peminjamanList: result || [] });

            console.log("Daftar Peminjaman Response:", result);
            return result;
        } catch (err) {
            set({ error: err.message });
            throw err;
        } finally {
            set({ loading: false });
        }
    },

    // ✅ Pinjam Buku
    pinjamBuku: async (data) => {
        set({ loading: true, error: null });
        try {
            const res = await fetch(`${API_BASE}/pinjam`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error("Gagal meminjam buku!");
            const result = await res.json();

            console.log("Pinjam Buku Response:", result);
            return result;
        } catch (err) {
            set({ error: err.message });
            throw err;
        } finally {
            set({ loading: false });
        }
    },

    // ✅ Ambil data peminjaman user tertentu
    fetchPeminjamanUser: async (id_user) => {
        set({ loading: true, error: null });
        try {
            const res = await fetch(
                `${API_BASE}/daftar?${new URLSearchParams({ id_user })}`,
                {
                    headers: { Accept: "application/json" },
                }
            );
            if (!res.ok) throw new Error("Gagal fetch daftar peminjaman user!");
            const result = await res.json();

            // Update data peminjamanList
            set({ peminjamanList: result.data || [] });
        } catch (err) {
            set({ error: err.message });
        } finally {
            set({ loading: false });
        }
    },

    // ✅ Kembalikan Buku
    kembalikanBuku: async (data) => {
        set({ loading: true, error: null });
        try {
            const res = await fetch(`${API_BASE}/kembali`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error("Gagal mengembalikan buku!");
            const result = await res.json();

            console.log("Kembalikan Buku Response:", result);
            return result;
        } catch (err) {
            set({ error: err.message });
            throw err;
        } finally {
            set({ loading: false });
        }
    },
}));

export default usePeminjamanStore;
