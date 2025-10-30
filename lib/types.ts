export type Category =
  | "amalan"
  | "harian"
  | "sholat"
  | "lainnya";

export type DoaItem = {
  id: string;
  title: string;
  category: Category;
  arabic: string;
  latin: string;
  translation_id: string;
  source?: string;
  virtue_id?: string;
  recommended_count?: number;
};
