// DataNusa — pembangun grafik SVG murni tanpa pustaka luar.
// Setiap fungsi menerima data dan mengembalikan string SVG yang siap
// disisipkan ke halaman; kelas CSS-nya diatur di style.css.

// Format angka gaya Indonesia: pemisah ribuan titik, desimal koma.
export function formatID(angka, desimal = 2) {
  const tetap = Number(angka).toFixed(desimal);
  const [bulat, sisa] = tetap.split(".");
  const bertitik = bulat.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return desimal > 0 ? `${bertitik},${sisa}` : bertitik;
}

// Pilihan domain sumbu y yang "rapi": sertakan nol bila dekat, beri ruang napas.
function domainY(nilai, paksaNol = true) {
  let min = Math.min(...nilai);
  let max = Math.max(...nilai);
  if (paksaNol) { min = Math.min(min, 0); max = Math.max(max, 0); }
  if (min === max) { max = min + 1; }
  const rentang = max - min;
  const langkahKasar = rentang / 4;
  const pangkat = Math.pow(10, Math.floor(Math.log10(langkahKasar)));
  const langkah = [1, 2, 2.5, 5, 10].map((m) => m * pangkat).find((m) => m >= langkahKasar) || 10 * pangkat;
  const bawah = Math.floor(min / langkah) * langkah;
  const atas = Math.ceil(max / langkah) * langkah;
  const garis = [];
  for (let v = bawah; v <= atas + 1e-9; v += langkah) garis.push(Math.round(v * 100) / 100);
  return { bawah, atas, garis };
}

const L = { kiri: 52, kanan: 16, atas: 14, bawah: 30 };

// Grafik garis satu deret dari titik [x, y].
export function grafikGaris(titik, opsi = {}) {
  const lebar = opsi.lebar || 720;
  const tinggi = opsi.tinggi || 300;
  const kelas = opsi.kelas || "";
  const xs = titik.map((t) => t[0]);
  const ys = titik.map((t) => t[1]);
  const d = domainY(ys, opsi.paksaNol !== false);
  const xMin = Math.min(...xs), xMax = Math.max(...xs);
  const wPlot = lebar - L.kiri - L.kanan;
  const hPlot = tinggi - L.atas - L.bawah;
  const X = (x) => L.kiri + ((x - xMin) / (xMax - xMin)) * wPlot;
  const Y = (y) => L.atas + (1 - (y - d.bawah) / (d.atas - d.bawah)) * hPlot;

  let s = `<svg viewBox="0 0 ${lebar} ${tinggi}" role="img" aria-label="Grafik garis">`;
  for (const g of d.garis) {
    s += `<line class="kisi" x1="${L.kiri}" x2="${lebar - L.kanan}" y1="${Y(g)}" y2="${Y(g)}"/>`;
    s += `<text class="label-sumbu" x="${L.kiri - 8}" y="${Y(g) + 4}" text-anchor="end">${formatID(g, Math.abs(g) < 10 && g % 1 !== 0 ? 1 : 0)}</text>`;
  }
  if (d.bawah < 0 && d.atas > 0) {
    s += `<line class="sumbu" x1="${L.kiri}" x2="${lebar - L.kanan}" y1="${Y(0)}" y2="${Y(0)}"/>`;
  }
  const loncat = Math.max(1, Math.round(titik.length / 8));
  titik.forEach((t, i) => {
    if (i % loncat === 0 || i === titik.length - 1) {
      s += `<text class="label-sumbu" x="${X(t[0])}" y="${tinggi - 8}" text-anchor="middle">${t[0]}</text>`;
    }
  });
  const jalur = titik.map((t, i) => `${i === 0 ? "M" : "L"}${X(t[0]).toFixed(1)},${Y(t[1]).toFixed(1)}`).join(" ");
  s += `<path class="garis-deret ${kelas}" d="${jalur}"/>`;
  titik.forEach((t, i) => {
    s += `<circle class="titik ${kelas}" cx="${X(t[0])}" cy="${Y(t[1])}" r="3.4"><title>${t[0]}: ${formatID(t[1])}${opsi.satuan || ""}</title></circle>`;
  });
  const akhir = titik[titik.length - 1];
  s += `<text class="label-nilai" x="${X(akhir[0]) - 4}" y="${Y(akhir[1]) - 10}" text-anchor="end">${formatID(akhir[1])}${opsi.satuan || ""}</text>`;
  return s + "</svg>";
}

// Grafik batang vertikal dari [{label, nilai}].
export function grafikBatang(data, opsi = {}) {
  const lebar = opsi.lebar || 720;
  const tinggi = opsi.tinggi || 300;
  const kelas = opsi.kelas || "";
  const d = domainY(data.map((b) => b.nilai));
  const wPlot = lebar - L.kiri - L.kanan;
  const hPlot = tinggi - L.atas - L.bawah;
  const Y = (y) => L.atas + (1 - (y - d.bawah) / (d.atas - d.bawah)) * hPlot;
  const slot = wPlot / data.length;
  const wBatang = Math.min(46, slot * 0.62);

  let s = `<svg viewBox="0 0 ${lebar} ${tinggi}" role="img" aria-label="Grafik batang">`;
  for (const g of d.garis) {
    s += `<line class="kisi" x1="${L.kiri}" x2="${lebar - L.kanan}" y1="${Y(g)}" y2="${Y(g)}"/>`;
    s += `<text class="label-sumbu" x="${L.kiri - 8}" y="${Y(g) + 4}" text-anchor="end">${formatID(g, 0)}</text>`;
  }
  data.forEach((b, i) => {
    const x = L.kiri + slot * i + (slot - wBatang) / 2;
    const y = Y(Math.max(b.nilai, 0));
    const h = Math.abs(Y(b.nilai) - Y(0));
    s += `<rect class="batang ${kelas}" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${wBatang}" height="${Math.max(h, 1).toFixed(1)}" rx="3"><title>${b.label}: ${formatID(b.nilai)}${opsi.satuan || ""}</title></rect>`;
    s += `<text class="label-nilai" x="${(x + wBatang / 2).toFixed(1)}" y="${(y - 6).toFixed(1)}" text-anchor="middle">${formatID(b.nilai, opsi.desimal ?? 1)}</text>`;
    s += `<text class="label-sumbu" x="${(x + wBatang / 2).toFixed(1)}" y="${tinggi - 8}" text-anchor="middle">${b.label}</text>`;
  });
  return s + "</svg>";
}

// Grafik batang berpasangan (dua seri) dari [{label, a, b}].
export function grafikBatangGrup(data, opsi = {}) {
  const lebar = opsi.lebar || 720;
  const tinggi = opsi.tinggi || 320;
  const semua = data.flatMap((b) => [b.a, b.b]);
  const d = domainY(semua);
  const wPlot = lebar - L.kiri - L.kanan;
  const hPlot = tinggi - L.atas - L.bawah;
  const Y = (y) => L.atas + (1 - (y - d.bawah) / (d.atas - d.bawah)) * hPlot;
  const slot = wPlot / data.length;
  const wBatang = Math.min(24, slot * 0.32);

  let s = `<svg viewBox="0 0 ${lebar} ${tinggi}" role="img" aria-label="Grafik batang berpasangan">`;
  for (const g of d.garis) {
    s += `<line class="kisi" x1="${L.kiri}" x2="${lebar - L.kanan}" y1="${Y(g)}" y2="${Y(g)}"/>`;
    s += `<text class="label-sumbu" x="${L.kiri - 8}" y="${Y(g) + 4}" text-anchor="end">${formatID(g, 0)}</text>`;
  }
  data.forEach((b, i) => {
    const tengah = L.kiri + slot * i + slot / 2;
    [["a", ""], ["b", "kedua"]].forEach(([kunci, kelas], j) => {
      const x = tengah + (j === 0 ? -wBatang - 1.5 : 1.5);
      const y = Y(b[kunci]);
      const h = Math.abs(Y(b[kunci]) - Y(0));
      s += `<rect class="batang ${kelas}" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${wBatang}" height="${Math.max(h, 1).toFixed(1)}" rx="2.5"><title>${b.label} — ${j === 0 ? opsi.namaA : opsi.namaB}: ${formatID(b[kunci])}</title></rect>`;
    });
    s += `<text class="label-sumbu" x="${tengah}" y="${tinggi - 8}" text-anchor="middle">${b.label}</text>`;
  });
  return s + "</svg>";
}

// Batang horizontal berlabel dari [{nama, nilai}] — untuk peringkat.
export function grafikBatangH(data, opsi = {}) {
  const lebar = opsi.lebar || 720;
  const baris = 30;
  const tinggi = data.length * baris + 12;
  const maks = Math.max(...data.map((b) => b.nilai));
  const xNama = 168;
  const wPlot = lebar - xNama - 74;
  let s = `<svg viewBox="0 0 ${lebar} ${tinggi}" role="img" aria-label="Grafik batang horizontal">`;
  data.forEach((b, i) => {
    const y = 8 + i * baris;
    const w = Math.max(3, (b.nilai / maks) * wPlot);
    s += `<text class="label-sumbu" x="${xNama - 10}" y="${y + 16}" text-anchor="end" style="font-size:12.5px;fill:var(--tinta)">${b.nama}</text>`;
    s += `<rect class="batang ${opsi.kelas || ""}" x="${xNama}" y="${y + 3}" width="${w.toFixed(1)}" height="17" rx="4"><title>${b.nama}: ${formatID(b.nilai, opsi.desimal ?? 1)}${opsi.satuan || ""}</title></rect>`;
    s += `<text class="label-nilai" x="${(xNama + w + 8).toFixed(1)}" y="${y + 16}">${formatID(b.nilai, opsi.desimal ?? 1)}${opsi.satuan || ""}</text>`;
  });
  return s + "</svg>";
}

// Donat dari [{nama, persen}] — mengembalikan SVG + legenda HTML.
export function grafikDonat(data, opsi = {}) {
  const ukuran = 250;
  const cx = ukuran / 2, cy = ukuran / 2, r = 104, tebal = 34;
  const warna = ["#17608f", "#cf3a22", "#2e8b6e", "#e0a21a", "#5b7fa6", "#8a5ba6", "#4a9e9b", "#b0562f", "#7a8a99"];
  let sudut = -Math.PI / 2;
  let s = `<svg viewBox="0 0 ${ukuran} ${ukuran}" role="img" aria-label="Diagram donat" style="max-width:250px;margin:0 auto">`;
  data.forEach((b, i) => {
    const sapuan = (b.persen / 100) * Math.PI * 2;
    const x1 = cx + r * Math.cos(sudut), y1 = cy + r * Math.sin(sudut);
    const x2 = cx + r * Math.cos(sudut + sapuan), y2 = cy + r * Math.sin(sudut + sapuan);
    const besar = sapuan > Math.PI ? 1 : 0;
    s += `<path d="M${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 ${besar} 1 ${x2.toFixed(1)},${y2.toFixed(1)}" fill="none" stroke="${warna[i % warna.length]}" stroke-width="${tebal}"><title>${b.nama}: ${formatID(b.persen, 1)}%</title></path>`;
    sudut += sapuan;
  });
  s += `<text x="${cx}" y="${cy - 4}" text-anchor="middle" style="font-size:21px;font-weight:750;fill:var(--laut-gelap)">${opsi.tengah || "100%"}</text>`;
  s += `<text x="${cx}" y="${cy + 17}" text-anchor="middle" class="label-sumbu">${opsi.bawahTengah || ""}</text></svg>`;
  const legenda = data.map((b, i) =>
    `<span><i style="background:${warna[i % warna.length]}"></i>${b.nama} — ${formatID(b.persen, 1)}%</span>`).join("");
  return { svg: s, legenda };
}

// Piramida penduduk: batang berpasangan kiri (laki) / kanan (perempuan).
export function grafikPiramida(data) {
  const lebar = 720;
  const baris = 27;
  const tinggi = data.length * baris + 30;
  const tengah = lebar / 2;
  const maks = Math.max(...data.flatMap((b) => [b.laki, b.perempuan]));
  const skala = (lebar / 2 - 108) / maks;
  let s = `<svg viewBox="0 0 ${lebar} ${tinggi}" role="img" aria-label="Piramida penduduk">`;
  s += `<text class="label-nilai" x="${tengah - 108}" y="14" text-anchor="end" style="fill:var(--laut-terang)">Laki-laki</text>`;
  s += `<text class="label-nilai" x="${tengah + 108}" y="14" style="fill:var(--aksen)">Perempuan</text>`;
  data.forEach((b, i) => {
    const y = 24 + i * baris;
    const wL = b.laki * skala, wP = b.perempuan * skala;
    s += `<rect class="batang" x="${(tengah - 44 - wL).toFixed(1)}" y="${y}" width="${wL.toFixed(1)}" height="18" rx="3"><title>${b.umur} laki-laki: ${formatID(b.laki, 1)}%</title></rect>`;
    s += `<rect class="batang kedua" x="${(tengah + 44).toFixed(1)}" y="${y}" width="${wP.toFixed(1)}" height="18" rx="3"><title>${b.umur} perempuan: ${formatID(b.perempuan, 1)}%</title></rect>`;
    s += `<text class="label-sumbu" x="${tengah}" y="${y + 13}" text-anchor="middle" style="font-size:12px">${b.umur}</text>`;
    s += `<text class="label-sumbu" x="${(tengah - 52 - wL).toFixed(1)}" y="${y + 13}" text-anchor="end">${formatID(b.laki, 1)}</text>`;
    s += `<text class="label-sumbu" x="${(tengah + 52 + wP).toFixed(1)}" y="${y + 13}">${formatID(b.perempuan, 1)}</text>`;
  });
  return s + "</svg>";
}
