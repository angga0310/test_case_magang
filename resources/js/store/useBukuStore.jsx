import { create } from 'zustand';

const useBukuStore = create((set) => ({
  bukuList: [],

  tambahBuku: (judul) =>
    set((state) => ({
      bukuList: [
        ...state.bukuList,
        { id: Date.now(), judul, stok: 1, dipinjam: 0 },
      ],
    })),

  pinjamBuku: (id) =>
    set((state) => ({
      bukuList: state.bukuList.map((b) =>
        b.id === id && b.stok > 0
          ? { ...b, stok: b.stok - 1, dipinjam: b.dipinjam + 1 }
          : b
      ),
    })),

  kembalikanBuku: (id) =>
    set((state) => ({
      bukuList: state.bukuList.map((b) =>
        b.id === id && b.dipinjam > 0
          ? { ...b, stok: b.stok + 1, dipinjam: b.dipinjam - 1 }
          : b
      ),
    })),

  hapusBuku: (id) =>
    set((state) => ({
      bukuList: state.bukuList.filter((b) => b.id !== id),
    })),

  updateBuku: (id, newJudul) =>
    set((state) => ({
      bukuList: state.bukuList.map((b) =>
        b.id === id ? { ...b, judul: newJudul } : b
      ),
    })),
}));

export default useBukuStore;
