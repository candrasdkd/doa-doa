# Doa & Dzikir — Next.js + Tailwind

Aplikasi web **Doa & Dzikir** responsif menggunakan **Next.js (App Router)**, **Tailwind**, dan **next-themes**.
Fitur utama:
- Pencarian cepat (debounced) pada judul, latin, dan terjemahan
- Filter kategori (Pagi, Petang, Setelah Sholat, Harian, Shalat, Lainnya)
- Toggle tampilkan **Arab / Latin / Terjemahan**
- Simpan **Favorit** (LocalStorage, client-side)
- **Dark / Light** mode
- Tombol **Salin** dan **Bagikan**

> Catatan: Dataset awal hanya contoh. Tambahkan data di `data/doa.json` untuk melengkapi.

## Menjalankan

```bash
# 1) Instal dependencies
npm install

# 2) Jalankan dev server
npm run dev

# 3) Buka
http://localhost:3000
```

## Struktur Proyek

```
app/
  layout.tsx
  page.tsx
  favorites/
    page.tsx
components/
  header.tsx
  footer.tsx
  theme-provider.tsx
  theme-toggle.tsx
  search-bar.tsx
  filters.tsx
  doa-card.tsx
  ui/
    button.tsx
    input.tsx
    badge.tsx
    card.tsx
    switch.tsx
data/
  doa.json
lib/
  store.ts
  types.ts
  search.ts
styles & configs (Tailwind, PostCSS, TS)
```

## Menambah Data Doa/Dzikir

Edit file `data/doa.json` dengan format:

```json
{
  "id": "unik-kamu",
  "title": "Judul Doa",
  "category": "pagi | petang | setelah-sholat | harian | shalat | lainnya",
  "arabic": "teks arab...",
  "latin": "teks latin...",
  "translation_id": "arti bahasa Indonesia...",
  "source": "opsional sumber hadits/kitab"
}
```

## Kustomisasi UI
- Komponen UI sederhana ada di `components/ui/*` (mirip shadcn gaya ringan).
- Edit `app/globals.css` untuk utilitas dan gaya global.
- Tipografi pakai font **Inter** dari Google Fonts (lihat `app/fonts.ts`).

## Produksi
- Build: `npm run build`
- Start: `npm start`

---

Dibuat sebagai starter yang rapi dan mudah dikembangkan lanjut. Semoga bermanfaat.
