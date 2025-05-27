const API_BASE = "/api/buku";

// Ambil semua buku
export async function fetchBuku() {
    const res = await fetch(API_BASE, {
        headers: {
            Accept: "application/json",
        },
    });
    if (!res.ok) throw new Error("Gagal fetch buku!");
    return res.json();
}

// Ambil detail buku
export async function getBukuById(id) {
    const res = await fetch(`${API_BASE}/${id}`, {
        headers: {
            Accept: "application/json",
        },
    });
    if (!res.ok) throw new Error("Gagal fetch buku!");
    return res.json();
}

// Tambah buku
export async function addBuku(formData) {
    // 🚀 JANGAN bikin FormData baru di sini!
    const res = await fetch("/api/buku", {
        method: "POST",
        headers: {
            Accept: "application/json",
        },
        body: formData, // 🚀 langsung kirim FormData yang sudah lengkap!
    });

    if (!res.ok) {
        const errorData = await res.json();
        console.error("Error:", errorData);
        throw new Error("Gagal tambah buku!");
    }
    return res.json();
}

// Update buku (pakai _method=PUT)
export async function updateBuku(id, formData) {
    formData.append("_method", "PUT"); // Laravel-style method spoofing

    const res = await fetch(`${API_BASE}/${id}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
        },
        body: formData, // kirim FormData yang sudah lengkap!
    });

    if (!res.ok) {
        const errorData = await res.json();
        console.error("Error:", errorData);
        throw new Error("Gagal update buku!");
    }
    return res.json();
}

// Hapus buku
export async function deleteBuku(id) {
    const res = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
        },
    });
    if (!res.ok) throw new Error("Gagal hapus buku!");
    return res.json();
}
