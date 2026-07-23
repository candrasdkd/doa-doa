/**
 * index.ts — Titik masuk data doa.
 *
 * Untuk menambah kategori baru:
 *   1. Buat file JSON baru di folder ini, mis. `sholat.json`
 *   2. Import di sini dan tambahkan ke array `allDoa`
 *
 * Urutan tampil di app mengikuti urutan array di bawah.
 */

import makanMinum from './makan-minum.json';
import rumah from './rumah.json';
import perjalanan from './perjalanan.json';
import kamarMandi from './kamar-mandi.json';
import adabAkhlak from './adab-akhlak.json';
import keluarga from './keluarga.json';
import jenazah from './jenazah.json';
import sakit from './sakit.json';

import type { DoaData } from '../types';

const allDoa: DoaData = [
  ...makanMinum,
  ...rumah,
  ...perjalanan,
  ...kamarMandi,
  ...adabAkhlak,
  ...keluarga,
  ...jenazah,
  ...sakit,
] as DoaData;

export default allDoa;
