// DataNusa — deret waktu tahunan, struktur umur, dan data provinsi.
// Semua deret adalah angka resmi yang diterbitkan berkala (BPS);
// label tahun dan periode mengikuti seri aslinya.

// Pertumbuhan PDB riil, persen year-on-year per tahun.
export const pertumbuhanPdb = {
  satuan: "%",
  titik: [
    [2015, 4.88], [2016, 5.03], [2017, 5.07], [2018, 5.17], [2019, 5.02],
    [2020, -2.07], [2021, 3.70], [2022, 5.31], [2023, 5.05], [2024, 5.03],
  ],
};

// Pertumbuhan triwulanan terakhir (y-on-y) untuk konteks terkini.
export const pertumbuhanTriwulan = [
  { periode: "Triwulan I-2025", nilai: 4.87 },
  { periode: "Triwulan II-2025", nilai: 5.12 },
  { periode: "Triwulan III-2025", nilai: 5.04 },
];

// Inflasi tahun kalender (Desember ke Desember), persen.
export const inflasiTahunan = {
  satuan: "%",
  titik: [
    [2015, 3.35], [2016, 3.02], [2017, 3.61], [2018, 3.13], [2019, 2.72],
    [2020, 1.68], [2021, 1.87], [2022, 5.51], [2023, 2.61], [2024, 1.57],
  ],
};

// Inflasi year-on-year bulanan sepanjang 2025, persen.
export const inflasiBulanan2025 = [
  { bulan: "Jan", nilai: 0.76 }, { bulan: "Feb", nilai: 0.48 },
  { bulan: "Mar", nilai: 1.03 }, { bulan: "Apr", nilai: 1.95 },
  { bulan: "Mei", nilai: 1.60 }, { bulan: "Jun", nilai: 1.87 },
  { bulan: "Jul", nilai: 2.37 }, { bulan: "Agu", nilai: 2.31 },
  { bulan: "Sep", nilai: 2.65 }, { bulan: "Okt", nilai: 2.86 },
];

// Persentase penduduk miskin (September, kecuali 2025 = Maret).
export const kemiskinan = {
  satuan: "%",
  titik: [
    [2015, 11.13], [2016, 10.70], [2017, 10.12], [2018, 9.66], [2019, 9.22],
    [2020, 10.19], [2021, 9.71], [2022, 9.57], [2023, 9.36], [2024, 8.57],
    [2025, 8.47],
  ],
};

// Tingkat pengangguran terbuka bulan Agustus, persen.
export const pengangguran = {
  satuan: "%",
  titik: [
    [2015, 6.18], [2016, 5.61], [2017, 5.50], [2018, 5.34], [2019, 5.23],
    [2020, 7.07], [2021, 6.49], [2022, 5.86], [2023, 5.32], [2024, 4.91],
    [2025, 4.85],
  ],
};

// Jumlah penduduk pertengahan tahun, juta jiwa.
export const populasi = {
  satuan: "juta",
  titik: [
    [2015, 255.5], [2016, 258.7], [2017, 261.9], [2018, 265.0], [2019, 268.1],
    [2020, 270.2], [2021, 272.7], [2022, 275.8], [2023, 278.7], [2024, 281.6],
    [2025, 284.4],
  ],
};

// Perdagangan barang tahunan, miliar US$.
export const perdagangan = [
  { tahun: 2015, ekspor: 150.3, impor: 142.7 },
  { tahun: 2016, ekspor: 145.2, impor: 135.7 },
  { tahun: 2017, ekspor: 168.8, impor: 156.9 },
  { tahun: 2018, ekspor: 180.0, impor: 188.7 },
  { tahun: 2019, ekspor: 167.7, impor: 171.3 },
  { tahun: 2020, ekspor: 163.2, impor: 141.6 },
  { tahun: 2021, ekspor: 231.5, impor: 196.2 },
  { tahun: 2022, ekspor: 291.9, impor: 237.4 },
  { tahun: 2023, ekspor: 258.8, impor: 221.9 },
  { tahun: 2024, ekspor: 264.7, impor: 233.7 },
];

// Struktur penduduk menurut kelompok umur lima tahunan (persen dari total),
// dipisah laki-laki dan perempuan — bahan piramida penduduk.
export const kelompokUmur = [
  { umur: "0–4", laki: 4.3, perempuan: 4.1 },
  { umur: "5–9", laki: 4.3, perempuan: 4.0 },
  { umur: "10–14", laki: 4.2, perempuan: 4.0 },
  { umur: "15–19", laki: 4.2, perempuan: 4.0 },
  { umur: "20–24", laki: 4.2, perempuan: 4.1 },
  { umur: "25–29", laki: 4.1, perempuan: 4.0 },
  { umur: "30–34", laki: 3.9, perempuan: 3.8 },
  { umur: "35–39", laki: 3.7, perempuan: 3.6 },
  { umur: "40–44", laki: 3.4, perempuan: 3.4 },
  { umur: "45–49", laki: 3.1, perempuan: 3.1 },
  { umur: "50–54", laki: 2.7, perempuan: 2.8 },
  { umur: "55–59", laki: 2.3, perempuan: 2.4 },
  { umur: "60–64", laki: 1.8, perempuan: 2.0 },
  { umur: "65–69", laki: 1.3, perempuan: 1.5 },
  { umur: "70–74", laki: 0.9, perempuan: 1.1 },
  { umur: "75+", laki: 0.9, perempuan: 1.4 },
];

// 38 provinsi: ibu kota, penduduk (juta jiwa, estimasi pertengahan 2024,
// dibulatkan), dan kepadatan penduduk (jiwa per km²).
export const provinsi = [
  { nama: "Aceh", ibuKota: "Banda Aceh", penduduk: 5.7, kepadatan: 98 },
  { nama: "Sumatera Utara", ibuKota: "Medan", penduduk: 15.9, kepadatan: 218 },
  { nama: "Sumatera Barat", ibuKota: "Padang", penduduk: 5.9, kepadatan: 140 },
  { nama: "Riau", ibuKota: "Pekanbaru", penduduk: 6.9, kepadatan: 79 },
  { nama: "Kepulauan Riau", ibuKota: "Tanjungpinang", penduduk: 2.3, kepadatan: 280 },
  { nama: "Jambi", ibuKota: "Jambi", penduduk: 3.8, kepadatan: 76 },
  { nama: "Sumatera Selatan", ibuKota: "Palembang", penduduk: 9.0, kepadatan: 98 },
  { nama: "Kep. Bangka Belitung", ibuKota: "Pangkalpinang", penduduk: 1.5, kepadatan: 91 },
  { nama: "Bengkulu", ibuKota: "Bengkulu", penduduk: 2.2, kepadatan: 110 },
  { nama: "Lampung", ibuKota: "Bandar Lampung", penduduk: 9.6, kepadatan: 286 },
  { nama: "DKI Jakarta", ibuKota: "Jakarta", penduduk: 10.7, kepadatan: 16113 },
  { nama: "Jawa Barat", ibuKota: "Bandung", penduduk: 50.3, kepadatan: 1422 },
  { nama: "Banten", ibuKota: "Serang", penduduk: 12.6, kepadatan: 1392 },
  { nama: "Jawa Tengah", ibuKota: "Semarang", penduduk: 38.3, kepadatan: 1168 },
  { nama: "DI Yogyakarta", ibuKota: "Yogyakarta", penduduk: 3.9, kepadatan: 1224 },
  { nama: "Jawa Timur", ibuKota: "Surabaya", penduduk: 42.1, kepadatan: 881 },
  { nama: "Bali", ibuKota: "Denpasar", penduduk: 4.4, kepadatan: 761 },
  { nama: "Nusa Tenggara Barat", ibuKota: "Mataram", penduduk: 5.7, kepadatan: 307 },
  { nama: "Nusa Tenggara Timur", ibuKota: "Kupang", penduduk: 5.8, kepadatan: 121 },
  { nama: "Kalimantan Barat", ibuKota: "Pontianak", penduduk: 5.9, kepadatan: 40 },
  { nama: "Kalimantan Tengah", ibuKota: "Palangka Raya", penduduk: 2.9, kepadatan: 19 },
  { nama: "Kalimantan Selatan", ibuKota: "Banjarbaru", penduduk: 4.4, kepadatan: 114 },
  { nama: "Kalimantan Timur", ibuKota: "Samarinda", penduduk: 4.0, kepadatan: 31 },
  { nama: "Kalimantan Utara", ibuKota: "Tanjung Selor", penduduk: 0.8, kepadatan: 11 },
  { nama: "Sulawesi Utara", ibuKota: "Manado", penduduk: 2.8, kepadatan: 186 },
  { nama: "Gorontalo", ibuKota: "Gorontalo", penduduk: 1.3, kepadatan: 115 },
  { nama: "Sulawesi Tengah", ibuKota: "Palu", penduduk: 3.2, kepadatan: 52 },
  { nama: "Sulawesi Barat", ibuKota: "Mamuju", penduduk: 1.6, kepadatan: 95 },
  { nama: "Sulawesi Selatan", ibuKota: "Makassar", penduduk: 9.7, kepadatan: 208 },
  { nama: "Sulawesi Tenggara", ibuKota: "Kendari", penduduk: 2.9, kepadatan: 76 },
  { nama: "Maluku", ibuKota: "Ambon", penduduk: 2.0, kepadatan: 43 },
  { nama: "Maluku Utara", ibuKota: "Sofifi", penduduk: 1.5, kepadatan: 47 },
  { nama: "Papua Barat", ibuKota: "Manokwari", penduduk: 0.6, kepadatan: 9 },
  { nama: "Papua Barat Daya", ibuKota: "Sorong", penduduk: 0.6, kepadatan: 15 },
  { nama: "Papua", ibuKota: "Jayapura", penduduk: 1.1, kepadatan: 13 },
  { nama: "Papua Tengah", ibuKota: "Nabire", penduduk: 1.4, kepadatan: 21 },
  { nama: "Papua Selatan", ibuKota: "Merauke", penduduk: 0.5, kepadatan: 4 },
  { nama: "Papua Pegunungan", ibuKota: "Wamena", penduduk: 1.4, kepadatan: 27 },
];

// Katalog untuk halaman Jelajah Data: deret yang dapat dipilih pengguna.
export const katalogDeret = {
  pertumbuhan: { nama: "Pertumbuhan Ekonomi (%)", deret: pertumbuhanPdb, warna: "utama" },
  inflasi: { nama: "Inflasi Tahunan (%)", deret: inflasiTahunan, warna: "kedua" },
  kemiskinan: { nama: "Kemiskinan (%)", deret: kemiskinan, warna: "kedua" },
  pengangguran: { nama: "Pengangguran Terbuka (%)", deret: pengangguran, warna: "utama" },
  populasi: { nama: "Jumlah Penduduk (juta jiwa)", deret: populasi, warna: "utama" },
};
