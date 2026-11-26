// DataNusa — perender setiap halaman. Setiap fungsi mengembalikan
// { html, pasang } — pasang() dijalankan setelah HTML terpasang untuk
// menggambar grafik SVG dan menghidupkan kontrol interaktif.

import { indikatorUtama, sorotan, strukturPdb } from "./data-indikator.js";
import {
  pertumbuhanPdb, pertumbuhanTriwulan, inflasiTahunan, inflasiBulanan2025,
  kemiskinan, pengangguran, populasi, perdagangan, kelompokUmur, provinsi,
  katalogDeret,
} from "./data-deret.js";
import {
  formatID, grafikGaris, grafikBatang, grafikBatangGrup, grafikBatangH,
  grafikDonat, grafikPiramida,
} from "./grafik.js";

function judulHalaman(kicker, judul, lead) {
  return `<div class="remah"><a href="#/">Beranda</a> › ${kicker}</div>
  <div class="judul-halaman"><h1>${judul}</h1><p>${lead}</p></div>`;
}

function kartuKpi(k) {
  return `<article class="kpi ${k.aksen ? "aksen" : ""}">
    <span class="label">${k.label}</span>
    <span class="nilai">${k.nilai} <small>${k.satuan}</small></span>
    <span class="periode">${k.periode}</span>
    <span class="delta"><span class="lencana ${k.kelasDelta}">${k.delta}</span></span>
  </article>`;
}

/* ---------------- Beranda ---------------- */
export function beranda() {
  const html = `
  <section class="pahlawan">
    <p class="kicker">Statistik Resmi · Republik Indonesia</p>
    <h1>Indonesia dalam angka yang bisa dipercaya</h1>
    <p class="lead">Dari pertumbuhan ekonomi sampai jumlah penduduk per provinsi — DataNusa merangkum statistik nasional terbaru dalam grafik yang jernih, terbuka, dan mudah dijelajahi siapa pun.</p>
    <div class="pita">
      <div><b>284,4 juta</b><span>Penduduk (2025)</span></div>
      <div><b>5,03%</b><span>Pertumbuhan PDB 2024</span></div>
      <div><b>38</b><span>Provinsi tercakup</span></div>
      <div><b>8,47%</b><span>Kemiskinan — rekor terendah</span></div>
    </div>
  </section>

  <section class="bagian">
    <div class="bagian-judul"><h2>Indikator Utama</h2><p>Angka terakhir yang diterbitkan untuk setiap seri</p></div>
    <div class="kpi-grid">${indikatorUtama.map(kartuKpi).join("")}</div>
  </section>

  <section class="bagian grid grid-2">
    <article class="kartu">
      <h3>Pertumbuhan Ekonomi 2015–2024</h3>
      <p class="sub">PDB riil, persen year-on-year. Ekonomi Indonesia hanya terkontraksi sekali dalam satu dekade — pada 2020 — lalu kembali ke jalur 5%.</p>
      <div class="grafik" id="gr-beranda-tumbuh"></div>
      <p class="sumber">Sumber: Berita Resmi Statistik PDB tahunan.</p>
    </article>
    <article class="kartu">
      <h3>Sorotan Indikator</h3>
      <p class="sub">Potret cepat kesejahteraan dan kinerja ekonomi terkini.</p>
      <table class="data">
        <tbody>
          ${sorotan.map((s) => `<tr><td>${s.nama}</td><td class="angka"><b>${s.nilai}</b></td><td>${s.periode}</td></tr>`).join("")}
        </tbody>
      </table>
      <p class="sumber">Arah perubahan dan rincian ada di halaman Ekonomi dan Sosial.</p>
    </article>
  </section>

  <section class="bagian">
    <div class="bagian-judul"><h2>Jelajahi Statistik</h2><p>Lima pintu masuk ke data nasional</p></div>
    <div class="tautan-grid">
      <a class="kartu-tautan" href="#/ekonomi"><span class="ikon">📈</span><h3>Ekonomi</h3><p>PDB, inflasi, dan perdagangan luar negeri beserta tren sepuluh tahunnya.</p><span class="panah">Buka →</span></a>
      <a class="kartu-tautan" href="#/penduduk"><span class="ikon">👥</span><h3>Penduduk</h3><p>Piramida umur, laju pertumbuhan, dan sebaran penduduk antarwilayah.</p><span class="panah">Buka →</span></a>
      <a class="kartu-tautan" href="#/sosial"><span class="ikon">🤝</span><h3>Sosial</h3><p>Kemiskinan, pengangguran, pembangunan manusia, dan ketimpangan.</p><span class="panah">Buka →</span></a>
      <a class="kartu-tautan" href="#/provinsi"><span class="ikon">🗺️</span><h3>Provinsi</h3><p>Tabel lengkap 38 provinsi — cari dan urutkan menurut penduduk atau kepadatan.</p><span class="panah">Buka →</span></a>
      <a class="kartu-tautan" href="#/jelajah"><span class="ikon">🔎</span><h3>Jelajah Data</h3><p>Pilih sendiri indikator, rentang tahun, dan bentuk grafiknya.</p><span class="panah">Buka →</span></a>
      <a class="kartu-tautan" href="#/ekonomi"><span class="ikon">⚖️</span><h3>Neraca Dagang</h3><p>Ekspor US$264,7 miliar melawan impor US$233,7 miliar pada 2024.</p><span class="panah">Buka →</span></a>
    </div>
  </section>`;
  return {
    html,
    pasang() {
      document.getElementById("gr-beranda-tumbuh").innerHTML =
        grafikGaris(pertumbuhanPdb.titik, { satuan: "%", tinggi: 280 });
    },
  };
}

/* ---------------- Ekonomi ---------------- */
export function ekonomi() {
  const html = `
  ${judulHalaman("Ekonomi", "Ekonomi & Perdagangan", "Produk domestik bruto, inflasi, dan perdagangan luar negeri — tiga mesin utama statistik ekonomi nasional.")}
  <section class="bagian grid grid-3">
    <article class="kpi"><span class="label">PDB Harga Berlaku</span><span class="nilai">Rp22.139 <small>triliun</small></span><span class="periode">Tahun 2024</span><span class="delta"><span class="lencana naik-baik">≈ US$1.396 miliar</span></span></article>
    <article class="kpi"><span class="label">PDB per Kapita</span><span class="nilai">Rp78,6 <small>juta</small></span><span class="periode">Tahun 2024</span><span class="delta"><span class="lencana naik-baik">≈ US$4.960 per orang</span></span></article>
    <article class="kpi aksen"><span class="label">Inflasi Oktober 2025</span><span class="nilai">2,86 <small>% y-on-y</small></span><span class="periode">Inflasi inti 2,36%</span><span class="delta"><span class="lencana turun-baik">Dalam sasaran bank sentral</span></span></article>
  </section>

  <section class="bagian grid grid-2">
    <article class="kartu">
      <h3>Pertumbuhan PDB 2015–2024</h3>
      <p class="sub">Persen year-on-year. Triwulan III-2025 ekonomi tumbuh 5,04% — laju 5% terjaga tiga triwulan beruntun.</p>
      <div class="grafik" id="gr-eko-tumbuh"></div>
      <table class="data" style="margin-top:12px"><tbody>
        ${pertumbuhanTriwulan.map((t) => `<tr><td>${t.periode}</td><td class="angka"><b>${formatID(t.nilai)}%</b></td></tr>`).join("")}
      </tbody></table>
    </article>
    <article class="kartu">
      <h3>Struktur PDB 2024</h3>
      <p class="sub">Sumbangan tiap lapangan usaha terhadap PDB. Industri pengolahan tetap menjadi penyumbang terbesar.</p>
      <div class="grafik" id="gr-eko-struktur" style="text-align:center"></div>
      <div class="legenda" id="gr-eko-struktur-legenda"></div>
    </article>
  </section>

  <section class="bagian grid grid-2">
    <article class="kartu">
      <h3>Inflasi Tahunan 2015–2024</h3>
      <p class="sub">Inflasi tahun kalender. Lonjakan 2022 (5,51%) dipicu harga energi dan pangan global; dua tahun terakhir inflasi kembali ke kisaran 1,5–2,6%.</p>
      <div class="grafik" id="gr-eko-inflasi"></div>
    </article>
    <article class="kartu">
      <h3>Inflasi Bulanan 2025 (y-on-y)</h3>
      <p class="sub">Sepuluh bulan pertama 2025: tekanan harga merangkak naik dari 0,48% pada Februari ke 2,86% pada Oktober, tetap di bawah batas atas sasaran 3,5%.</p>
      <div class="grafik" id="gr-eko-inflasi-bulan"></div>
    </article>
  </section>

  <section class="bagian">
    <article class="kartu">
      <h3>Ekspor dan Impor 2015–2024</h3>
      <p class="sub">Neraca perdagangan barang, miliar US$. Indonesia mencatat surplus sejak 2020; defisit terakhir terjadi pada 2018–2019.</p>
      <div class="grafik" id="gr-eko-dagang"></div>
      <div class="legenda"><span><i></i>Ekspor</span><span><i class="kedua"></i>Impor</span></div>
      <p class="sumber">Komoditas ekspor utama: batu bara, minyak sawit, besi dan baja, gas alam, serta mesin dan peralatan listrik.</p>
    </article>
  </section>`;
  return {
    html,
    pasang() {
      document.getElementById("gr-eko-tumbuh").innerHTML = grafikGaris(pertumbuhanPdb.titik, { satuan: "%", tinggi: 280 });
      const donat = grafikDonat(strukturPdb, { tengah: "Rp22.139 T", bawahTengah: "PDB 2024" });
      document.getElementById("gr-eko-struktur").innerHTML = donat.svg;
      document.getElementById("gr-eko-struktur-legenda").innerHTML = donat.legenda;
      document.getElementById("gr-eko-inflasi").innerHTML = grafikGaris(inflasiTahunan.titik, { satuan: "%", tinggi: 280, kelas: "kedua" });
      document.getElementById("gr-eko-inflasi-bulan").innerHTML = grafikBatang(
        inflasiBulanan2025.map((b) => ({ label: b.bulan, nilai: b.nilai })), { satuan: "%", tinggi: 280, desimal: 2 });
      document.getElementById("gr-eko-dagang").innerHTML = grafikBatangGrup(
        perdagangan.map((t) => ({ label: String(t.tahun), a: t.ekspor, b: t.impor })),
        { namaA: "Ekspor", namaB: "Impor" });
    },
  };
}

/* ---------------- Penduduk ---------------- */
export function penduduk() {
  const terpadat = [...provinsi].sort((a, b) => b.penduduk - a.penduduk).slice(0, 8);
  const html = `
  ${judulHalaman("Penduduk", "Kependudukan", "Indonesia adalah negara berpenduduk terbanyak keempat di dunia. Halaman ini merangkum jumlah, struktur umur, dan sebaran penduduknya.")}
  <section class="bagian grid grid-3">
    <article class="kpi"><span class="label">Jumlah Penduduk</span><span class="nilai">284,4 <small>juta</small></span><span class="periode">Pertengahan 2025</span><span class="delta"><span class="lencana netral">Terbanyak ke-4 di dunia</span></span></article>
    <article class="kpi"><span class="label">Kepadatan Nasional</span><span class="nilai">149 <small>jiwa/km²</small></span><span class="periode">Rata-rata seluruh daratan</span><span class="delta"><span class="lencana netral">56% penduduk tinggal di Jawa</span></span></article>
    <article class="kpi"><span class="label">Umur Median</span><span class="nilai">30,4 <small>tahun</small></span><span class="periode">Separuh penduduk lebih muda</span><span class="delta"><span class="lencana naik-baik">Bonus demografi berlangsung</span></span></article>
  </section>

  <section class="bagian">
    <article class="kartu">
      <h3>Piramida Penduduk</h3>
      <p class="sub">Persentase penduduk menurut kelompok umur lima tahunan dan jenis kelamin. Basis yang lebar di umur kerja muda menunjukkan struktur penduduk yang masih muda dan produktif.</p>
      <div class="grafik" id="gr-pend-piramida"></div>
      <p class="sumber">Rasio jenis kelamin 102 — terdapat 102 laki-laki untuk setiap 100 perempuan.</p>
    </article>
  </section>

  <section class="bagian grid grid-2">
    <article class="kartu">
      <h3>Pertumbuhan Jumlah Penduduk</h3>
      <p class="sub">Juta jiwa, pertengahan tahun. Laju pertumbuhan kini sekitar 1,0% per tahun, melambat dari 1,5% pada awal 2000-an.</p>
      <div class="grafik" id="gr-pend-populasi"></div>
    </article>
    <article class="kartu">
      <h3>Provinsi Berpenduduk Terbanyak</h3>
      <p class="sub">Juta jiwa, estimasi pertengahan 2024. Jawa Barat sendiri menampung hampir seperlima penduduk Indonesia.</p>
      <div class="grafik" id="gr-pend-provinsi"></div>
      <p class="sumber">Tabel lengkapnya ada di halaman <a href="#/provinsi">Provinsi</a>.</p>
    </article>
  </section>`;
  return {
    html,
    pasang() {
      document.getElementById("gr-pend-piramida").innerHTML = grafikPiramida(kelompokUmur);
      document.getElementById("gr-pend-populasi").innerHTML = grafikGaris(populasi.titik, { satuan: "", tinggi: 280, paksaNol: false });
      document.getElementById("gr-pend-provinsi").innerHTML = grafikBatangH(
        terpadat.map((p) => ({ nama: p.nama, nilai: p.penduduk })), { satuan: " jt", tinggi: 280 });
    },
  };
}

/* ---------------- Sosial ---------------- */
export function sosial() {
  const html = `
  ${judulHalaman("Sosial", "Sosial & Kesejahteraan", "Kemiskinan, pekerjaan, dan pembangunan manusia — ukuran apakah pertumbuhan ekonomi benar-benar dirasakan warga.")}
  <section class="bagian grid grid-2">
    <article class="kartu">
      <h3>Kemiskinan 2015–2025</h3>
      <p class="sub">Persentase penduduk miskin. Sempat naik ke 10,19% saat pandemi 2020, kini 8,47% (Maret 2025) — titik terendah yang pernah tercatat.</p>
      <div class="grafik" id="gr-sos-miskin"></div>
    </article>
    <article class="kartu">
      <h3>Pengangguran Terbuka 2015–2025</h3>
      <p class="sub">Persen angkatan kerja, bulan Agustus. Pasar kerja pulih penuh dari pandemi; tingkat 4,85% pada 2025 adalah yang terendah dalam lebih dari dua dekade.</p>
      <div class="grafik" id="gr-sos-nganggur"></div>
    </article>
  </section>

  <section class="bagian">
    <div class="bagian-judul"><h2>Indikator Kesejahteraan</h2><p>Potret pembangunan manusia dan ketimpangan terakhir</p></div>
    <div class="kpi-grid">
      <article class="kpi"><span class="label">Indeks Pembangunan Manusia</span><span class="nilai">74,20</span><span class="periode">2024 — kategori tinggi</span><span class="delta"><span class="lencana naik-baik">Naik 0,85 poin setahun</span></span></article>
      <article class="kpi aksen"><span class="label">Rasio Gini</span><span class="nilai">0,375</span><span class="periode">Maret 2025</span><span class="delta"><span class="lencana turun-baik">Ketimpangan menurun perlahan</span></span></article>
      <article class="kpi"><span class="label">Umur Harapan Hidup</span><span class="nilai">72,4 <small>tahun</small></span><span class="periode">2024</span><span class="delta"><span class="lencana naik-baik">Naik dari 71,9 (2020)</span></span></article>
      <article class="kpi"><span class="label">Melek Huruf (15+)</span><span class="nilai">97,1 <small>%</small></span><span class="periode">2024</span><span class="delta"><span class="lencana naik-baik">Kelompok muda: 99,8%</span></span></article>
      <article class="kpi"><span class="label">Rata-rata Lama Sekolah</span><span class="nilai">8,85 <small>tahun</small></span><span class="periode">Penduduk 25 tahun ke atas</span><span class="delta"><span class="lencana netral">Setara kelas 3 SMP</span></span></article>
      <article class="kpi"><span class="label">Bekerja di Sektor Formal</span><span class="nilai">42,1 <small>%</small></span><span class="periode">Agustus 2025</span><span class="delta"><span class="lencana naik-baik">Naik dari 40,8% (2023)</span></span></article>
    </div>
  </section>`;
  return {
    html,
    pasang() {
      document.getElementById("gr-sos-miskin").innerHTML = grafikGaris(kemiskinan.titik, { satuan: "%", tinggi: 280, kelas: "kedua" });
      document.getElementById("gr-sos-nganggur").innerHTML = grafikBatang(
        pengangguran.titik.map((t) => ({ label: String(t[0]), nilai: t[1] })), { satuan: "%", tinggi: 280 });
    },
  };
}

/* ---------------- Provinsi ---------------- */
export function provinsiPage() {
  const html = `
  ${judulHalaman("Provinsi", "Data 38 Provinsi", "Penduduk dan kepadatan untuk seluruh provinsi di Indonesia. Gunakan kotak pencarian dan pengurutan untuk menelusuri tabel.")}
  <section class="bagian">
    <div class="kontrol">
      <div class="fld"><label for="cariProv">Cari provinsi / ibu kota</label>
        <input type="search" id="cariProv" placeholder="mis. Jawa, Medan, Papua…"></div>
      <div class="fld"><label for="urutProv">Urutkan menurut</label>
        <select id="urutProv">
          <option value="penduduk">Penduduk terbanyak</option>
          <option value="kepadatan">Kepadatan tertinggi</option>
          <option value="nama">Nama (A–Z)</option>
        </select></div>
    </div>
    <div class="tabel-bungkus">
      <table class="data">
        <thead><tr><th>No</th><th>Provinsi</th><th>Ibu Kota</th><th class="angka">Penduduk (juta)</th><th class="angka">Kepadatan (jiwa/km²)</th><th style="width:26%">Perbandingan Penduduk</th></tr></thead>
        <tbody id="isiProvinsi"></tbody>
      </table>
    </div>
    <p class="hasil-info" id="infoProvinsi"></p>
    <p class="sumber">Estimasi pertengahan 2024, dibulatkan. Kepadatan Jakarta (16.113 jiwa/km²) jauh melampaui provinsi lain — provinsi terjarang adalah Papua Selatan dengan 4 jiwa/km².</p>
  </section>`;

  function barisHtml(p, i, maks) {
    const lebar = Math.max(2, (p.penduduk / maks) * 100);
    return `<tr><td>${i + 1}</td><td><b>${p.nama}</b></td><td>${p.ibuKota}</td>
      <td class="angka">${formatID(p.penduduk, 1)}</td><td class="angka">${formatID(p.kepadatan, 0)}</td>
      <td><div class="bar-mini" style="width:${lebar.toFixed(0)}%"></div></td></tr>`;
  }

  return {
    html,
    pasang() {
      const isi = document.getElementById("isiProvinsi");
      const info = document.getElementById("infoProvinsi");
      const cari = document.getElementById("cariProv");
      const urut = document.getElementById("urutProv");
      const maks = Math.max(...provinsi.map((p) => p.penduduk));
      function gambar() {
        const kata = cari.value.trim().toLowerCase();
        let daftar = provinsi.filter((p) =>
          p.nama.toLowerCase().includes(kata) || p.ibuKota.toLowerCase().includes(kata));
        if (urut.value === "penduduk") daftar.sort((a, b) => b.penduduk - a.penduduk);
        if (urut.value === "kepadatan") daftar.sort((a, b) => b.kepadatan - a.kepadatan);
        if (urut.value === "nama") daftar.sort((a, b) => a.nama.localeCompare(b.nama, "id"));
        isi.innerHTML = daftar.map((p, i) => barisHtml(p, i, maks)).join("");
        const total = daftar.reduce((s, p) => s + p.penduduk, 0);
        info.textContent = `Menampilkan ${daftar.length} dari 38 provinsi · total penduduk tampil ${formatID(total, 1)} juta jiwa.`;
      }
      cari.addEventListener("input", gambar);
      urut.addEventListener("change", gambar);
      gambar();
    },
  };
}

/* ---------------- Jelajah Data ---------------- */
export function jelajah() {
  const html = `
  ${judulHalaman("Jelajah Data", "Jelajah Data Interaktif", "Susun tampilanmu sendiri: pilih indikator, bentuk grafik, dan tahun awal deret — grafik dan tabelnya berubah seketika.")}
  <section class="bagian">
    <article class="kartu">
      <div class="kontrol">
        <div class="fld"><label for="pilihDeret">Indikator</label>
          <select id="pilihDeret">
            ${Object.entries(katalogDeret).map(([k, v]) => `<option value="${k}">${v.nama}</option>`).join("")}
          </select></div>
        <div class="fld"><label for="pilihBentuk">Bentuk grafik</label>
          <select id="pilihBentuk">
            <option value="garis">Garis</option>
            <option value="batang">Batang</option>
          </select></div>
        <div class="fld"><label for="pilihTahun">Dari tahun: <span id="labelTahun">2015</span></label>
          <input type="range" id="pilihTahun" min="2015" max="2022" step="1" value="2015"></div>
      </div>
      <div class="grafik" id="gr-jelajah"></div>
      <p class="hasil-info" id="infoJelajah"></p>
    </article>
  </section>
  <section class="bagian">
    <div class="tabel-bungkus">
      <table class="data">
        <thead><tr><th>Tahun</th><th class="angka">Nilai</th><th class="angka">Perubahan (poin)</th></tr></thead>
        <tbody id="isiJelajah"></tbody>
      </table>
    </div>
  </section>`;
  return {
    html,
    pasang() {
      const selDeret = document.getElementById("pilihDeret");
      const selBentuk = document.getElementById("pilihBentuk");
      const selTahun = document.getElementById("pilihTahun");
      const labelTahun = document.getElementById("labelTahun");
      const wadah = document.getElementById("gr-jelajah");
      const info = document.getElementById("infoJelajah");
      const isi = document.getElementById("isiJelajah");
      function gambar() {
        const entri = katalogDeret[selDeret.value];
        const dari = Number(selTahun.value);
        labelTahun.textContent = String(dari);
        const titik = entri.deret.titik.filter((t) => t[0] >= dari);
        const kelas = entri.warna === "kedua" ? "kedua" : "";
        wadah.innerHTML = selBentuk.value === "garis"
          ? grafikGaris(titik, { satuan: "", tinggi: 320, kelas, paksaNol: entri.deret.satuan !== "juta" })
          : grafikBatang(titik.map((t) => ({ label: String(t[0]), nilai: t[1] })), { tinggi: 320, kelas, desimal: 2 });
        isi.innerHTML = titik.map((t, i) => {
          const ubah = i === 0 ? "—" : formatID(t[1] - titik[i - 1][1]);
          return `<tr><td>${t[0]}</td><td class="angka"><b>${formatID(t[1])}</b> ${entri.deret.satuan}</td><td class="angka">${ubah}</td></tr>`;
        }).join("");
        const awal = titik[0], akhir = titik[titik.length - 1];
        info.textContent = `${entri.nama}: dari ${formatID(awal[1])} (${awal[0]}) menjadi ${formatID(akhir[1])} (${akhir[0]}) — berubah ${formatID(akhir[1] - awal[1])} poin dalam ${akhir[0] - awal[0]} tahun.`;
      }
      selDeret.addEventListener("change", gambar);
      selBentuk.addEventListener("change", gambar);
      selTahun.addEventListener("input", gambar);
      gambar();
    },
  };
}
