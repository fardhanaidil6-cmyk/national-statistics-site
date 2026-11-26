// DataNusa — program penyerahan entri (Node 22, hanya pustaka standar).
//
// Situsnya sendiri adalah folder app/ di samping berkas ini: berkas statis
// biasa (HTML, CSS, modul JS) yang dibuka peramban tanpa langkah bangun dan
// tanpa satu pun permintaan jaringan. Program ini menyerahkan situs itu ke
// penilai: menyalin app/ dan screenshots/ ke folder keluaran, lalu menulis
// dossier.json — ringkasan berisi tangkapan layar, berkas muatan pertama,
// dan sumber situs — memakai buildDossier dari vendor/makefun-frontend.ts.
// Berkas vendor itu sengaja tidak diubah: penilai menuntut dossier.json
// sama persis byte-demi-byte dengan yang ditulis salinan resmi mereka.
//
// Di luar penilai, MAKEFUN_OUTPUT_DIR menggantikan /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// Pratinjau lokal: node serve.ts lalu buka http://localhost:8080.

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const folderEntri = fileURLToPath(new URL('.', import.meta.url));
const folderKeluar = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Salin situs dan tangkapan layarnya apa adanya ke folder keluaran.
mkdirSync(folderKeluar, { recursive: true });
cpSync(join(folderEntri, 'app'), join(folderKeluar, 'app'), { recursive: true });
mkdirSync(join(folderKeluar, 'screenshots'), { recursive: true });
if (existsSync(join(folderEntri, 'screenshots'))) {
  cpSync(join(folderEntri, 'screenshots'), join(folderKeluar, 'screenshots'), { recursive: true });
}

// Batas-batas penilai diteruskan ke buildDossier agar entri yang akan
// ditolak server (tangkapan layar lebih dari 4 atau lebih dari 256 KiB,
// app/ lebih dari 993 berkas atau 16 MiB) gagal di sini, bukan di sana.
const batasDossier = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
};
const berkasDossier = join(folderKeluar, 'dossier.json');
writeFileSync(berkasDossier, buildDossier(folderKeluar, batasDossier));
console.log(`DataNusa terserahkan: app/ + screenshots/ + ${berkasDossier}`);
