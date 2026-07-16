export interface DoaVersion {
  id: string;
  /** Sumber/riwayat bacaan, mis. "HR. Bukhari", "Versi Pendek", "Versi Panjang" */
  sumber: string;
  arab: string;
  latin: string;
  artinya: string;
  /** Catatan singkat tambahan di bawah teks doa */
  catatan?: string;
  /**
   * Keterangan panjang / penjelasan tambahan.
   * Bisa dipakai untuk menjelaskan variasi kata ganti, tata cara, dll.
   * Mendukung teks biasa atau baris terpisah dengan "\n".
   */
  keterangan?: string;
}

export interface Doa {
  id: string;
  judul: string;
  kategori: string;
  /** Konteks singkat kapan doa ini dibaca */
  konteks?: string;
  versions: DoaVersion[];
}

export type DoaData = Doa[];
