// store/useBukuStoreAPI.js
import { create } from "zustand";
import { fetchBuku, addBuku, updateBuku, deleteBuku } from "@/api/buku";

const useBukuStoreAPI = create((set) => ({
    buku: [],
    loading: false,
    error: null,

    fetchbuku: async () => {
        set({ loading: true, error: null });
        try {
            const data = await fetchBuku();
            set({ buku: data });
        } catch (err) {
            set({ error: err.message });
        } finally {
            set({ loading: false });
        }
    },

    addBook: async (formData) => {
        set({ loading: true, error: null });
        try {
            console.log("FormData yang dikirim:", formData); // debug!
            await addBuku(formData);
            await set((state) => state.fetchbuku());
        } catch (err) {
            console.log("Error addBook:", err);
            set({ error: err.message });
        } finally {
            set({ loading: false });
        }
    },

    updateBook: async (id, formData) => {
        set({ loading: true, error: null });
        try {
            await updateBuku(id, formData);
            await set((state) => state.fetchbuku());
        } catch (err) {
            set({ error: err.message });
        } finally {
            set({ loading: false });
        }
    },

    deleteBook: async (id) => {
        set({ loading: true, error: null });
        try {
            await deleteBuku(id);
            await set((state) => state.fetchbuku());
        } catch (err) {
            set({ error: err.message });
        } finally {
            set({ loading: false });
        }
    },
}));

export default useBukuStoreAPI;
