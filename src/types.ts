export interface DoaVersion {
  id: string;
  /** Sumber/riwayat bacaan, mis. "HR. Bukhari", "Versi Pendek", "Versi Panjang" */
  sumber: string;
  arab: string;
  latin: string;
  artinya: string;
  catatan?: string;
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
