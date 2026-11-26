// DataNusa — indikator utama dan tabel sorotan.
// Angka mengikuti publikasi statistik resmi Indonesia (BPS) pada periode
// yang tercantum; nilai dibulatkan untuk tampilan tanpa mengubah makna.

export const indikatorUtama = [
  {
    id: "populasi",
    label: "Jumlah Penduduk",
    nilai: "284,4",
    satuan: "juta jiwa",
    periode: "Pertengahan 2025",
    delta: "+2,8 juta jiwa dalam setahun",
    kelasDelta: "netral",
    aksen: false,
  },
  {
    id: "pdb",
    label: "Produk Domestik Bruto",
    nilai: "Rp22.139",
    satuan: "triliun (2024)",
    periode: "Harga berlaku, setahun penuh",
    delta: "Tumbuh 5,03% pada 2024",
    kelasDelta: "naik-baik",
    aksen: false,
  },
  {
    id: "inflasi",
    label: "Inflasi (year-on-year)",
    nilai: "2,86",
    satuan: "%",
    periode: "Oktober 2025",
    delta: "Di dalam sasaran 2,5±1%",
    kelasDelta: "turun-baik",
    aksen: true,
  },
  {
    id: "kemiskinan",
    label: "Penduduk Miskin",
    nilai: "8,47",
    satuan: "% (23,85 juta jiwa)",
    periode: "Maret 2025",
    delta: "Turun dari 9,03% (Mar 2024)",
    kelasDelta: "turun-baik",
    aksen: true,
  },
  {
    id: "pengangguran",
    label: "Pengangguran Terbuka",
    nilai: "4,85",
    satuan: "% angkatan kerja",
    periode: "Agustus 2025",
    delta: "Terendah sejak era reformasi",
    kelasDelta: "turun-baik",
    aksen: false,
  },
  {
    id: "dagang",
    label: "Surplus Neraca Dagang",
    nilai: "US$31,0",
    satuan: "miliar (2024)",
    periode: "Ekspor US$264,7 M · Impor US$233,7 M",
    delta: "Surplus 5 tahun beruntun",
    kelasDelta: "naik-baik",
    aksen: false,
  },
];

// Tabel sorotan di beranda: indikator, nilai terakhir, periode, arah perubahan.
export const sorotan = [
  { nama: "Pertumbuhan ekonomi (y-on-y)", nilai: "5,04%", periode: "Triwulan III-2025", arah: "Stabil di kisaran 5%" },
  { nama: "PDB per kapita", nilai: "Rp78,6 juta", periode: "2024", arah: "Naik dari Rp75,0 juta" },
  { nama: "Inflasi inti (y-on-y)", nilai: "2,36%", periode: "Oktober 2025", arah: "Terkendali" },
  { nama: "Indeks Pembangunan Manusia", nilai: "74,20", periode: "2024", arah: "Naik 0,85 poin" },
  { nama: "Rasio Gini pengeluaran", nilai: "0,375", periode: "Maret 2025", arah: "Turun dari 0,379" },
  { nama: "Umur harapan hidup", nilai: "72,4 tahun", periode: "2024", arah: "Naik 0,3 tahun" },
  { nama: "Tingkat partisipasi angkatan kerja", nilai: "70,6%", periode: "Agustus 2025", arah: "Naik dari 70,0%" },
  { nama: "Ekspor nonmigas", nilai: "US$249,5 M", periode: "2024", arah: "94,3% dari total ekspor" },
];

// Struktur PDB menurut lapangan usaha, 2024 (persen terhadap PDB).
export const strukturPdb = [
  { nama: "Industri Pengolahan", persen: 19.0 },
  { nama: "Perdagangan Besar & Eceran", persen: 13.1 },
  { nama: "Pertanian & Perikanan", persen: 12.6 },
  { nama: "Pertambangan & Penggalian", persen: 10.4 },
  { nama: "Konstruksi", persen: 10.0 },
  { nama: "Transportasi & Pergudangan", persen: 6.5 },
  { nama: "Informasi & Komunikasi", persen: 4.4 },
  { nama: "Jasa Keuangan", persen: 4.3 },
  { nama: "Lapangan Usaha Lainnya", persen: 19.7 },
];
