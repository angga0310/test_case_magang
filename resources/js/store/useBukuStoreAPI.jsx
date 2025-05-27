import { create } from "zustand";

const API_BASE = "http://146.190.86.93:6969/api/buku";

const useBukuStoreAPI = create((set) => ({
  bukuList: [],
  loading: false,
  error: null,

  fetchBuku: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(API_BASE, { headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error("Gagal fetch buku!");
      const data = await res.json();
      set({ bukuList: data });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  addBuku: async (formData) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      if (!res.ok) throw new Error("Gagal tambah buku!");
      await set((state) => state.fetchBuku());
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  updateBuku: async (id, formData) => {
    formData.append("_method", "PUT");
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      if (!res.ok) throw new Error("Gagal update buku!");
      await set((state) => state.fetchBuku());
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  hapusBuku: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("Gagal hapus buku!");
      await set((state) => state.fetchBuku());
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useBukuStoreAPI;
