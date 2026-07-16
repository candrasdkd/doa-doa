# Kumpulan Doa (PWA)

React + TypeScript + Vite. Data doa disimpan lokal di `src/data/doa.json`
(di-bundle ke JS saat build, jadi otomatis ter-precache oleh service worker —
tidak perlu fetch API sama sekali, full offline-first).

## Menjalankan

```bash
npm install
npm run dev       # dev server
npm run build     # production build ke dist/ (generate sw.js otomatis)
npm run preview   # cek hasil build + PWA secara lokal
```

## Struktur data (`src/data/doa.json`)

```ts
interface Doa {
  id: string;
  judul: string;
  kategori: string;
  konteks?: string;
  versions: {
    id: string;
    sumber: string;   // mis. "HR. Bukhari", "Versi Pendek"
    arab: string;
    latin: string;
    artinya: string;
    catatan?: string;
  }[];
}
```

Tinggal tambah/edit object di array JSON ini untuk nambah doa atau nambah versi
bacaan baru pada doa yang sudah ada — tidak perlu ubah komponen.

## Catatan penting

Teks Arab/latin/terjemahan pada `doa.json` ditulis berdasarkan hadis & ayat
yang umum dikenal (Bukhari, Muslim, Abu Dawud, Tirmidzi, Al-Qur'an), tapi
**belum di-cross check huruf per huruf ke mushaf/kitab hadis digital**.
Sebelum dipakai publik, sebaiknya validasi ulang teks Arab & harakatnya ke
referensi terpercaya (mis. app Hisnul Muslim / Muslim Pro / mushaf digital
Kemenag) — terutama karena kesalahan harakat di teks Arab gampang lolos saat
review visual biasa.

## PWA

- Manifest & service worker digenerate otomatis oleh `vite-plugin-pwa`
  (strategi `generateSW`, `registerType: autoUpdate`).
- Karena `doa.json` di-import langsung (bukan di-fetch), seluruh data doa
  otomatis masuk ke JS bundle yang di-precache — buka sekali online, setelahnya
  100% jalan offline termasuk saat data doa baru ditambah lalu di-build ulang.
- Icon PWA ada di `public/pwa-192.png`, `pwa-512.png`, `pwa-maskable-512.png`
  — ganti sesuai branding kalau perlu.

## Fitur

- Search + filter kategori
- Favorit (localStorage, key `doa-favorites`)
- Multi-versi bacaan per doa (tab per versi/sumber riwayat) — lihat contoh
  "Doa Sebelum Makan", "Doa untuk Kedua Orang Tua", dll di `doa.json`
- Back-button friendly (pakai `history.pushState` + hash `#/doa/:id`, tanpa
  react-router karena cuma 2 level navigasi)
