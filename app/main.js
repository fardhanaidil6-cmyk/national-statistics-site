// DataNusa — router sisi klien. Rute memakai hash agar situs statis ini
// berjalan dari berkas apa adanya tanpa konfigurasi server.

import { beranda, ekonomi, penduduk, sosial, provinsiPage, jelajah } from "./tampilan.js";

const rute = {
  "/": { judul: "DataNusa — Portal Statistik Nasional Indonesia", render: beranda },
  "/ekonomi": { judul: "Ekonomi & Perdagangan — DataNusa", render: ekonomi },
  "/penduduk": { judul: "Kependudukan — DataNusa", render: penduduk },
  "/sosial": { judul: "Sosial & Kesejahteraan — DataNusa", render: sosial },
  "/provinsi": { judul: "Data 38 Provinsi — DataNusa", render: provinsiPage },
  "/jelajah": { judul: "Jelajah Data — DataNusa", render: jelajah },
};

const wadah = document.getElementById("aplikasi");
const tautanNav = document.querySelectorAll("#navUtama a");

function jalurSaatIni() {
  const mentah = window.location.hash.replace(/^#/, "");
  return rute[mentah] ? mentah : "/";
}

function gambar() {
  const jalur = jalurSaatIni();
  const halaman = rute[jalur];
  document.title = halaman.judul;
  const { html, pasang } = halaman.render();
  wadah.innerHTML = html;
  tautanNav.forEach((a) => a.classList.toggle("aktif", a.dataset.rute === jalur));
  if (typeof pasang === "function") pasang();
  window.scrollTo({ top: 0 });
}

window.addEventListener("hashchange", gambar);
gambar();
