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
import tidur from './tidur.json';
import rumah from './rumah.json';
import perjalanan from './perjalanan.json';
import masjid from './masjid.json';
import kamarMandi from './kamar-mandi.json';
import aktivitasHarian from './aktivitas-harian.json';
import adabAkhlak from './adab-akhlak.json';
import keluarga from './keluarga.json';
import majelis from './majelis.json';
import jenazah from './jenazah.json';

import type { DoaData } from '../types';

const allDoa: DoaData = [
  ...makanMinum,
  ...tidur,
  ...rumah,
  ...perjalanan,
  ...masjid,
  ...kamarMandi,
  ...aktivitasHarian,
  ...adabAkhlak,
  ...keluarga,
  ...majelis,
  ...jenazah,
] as DoaData;

export default allDoa;
