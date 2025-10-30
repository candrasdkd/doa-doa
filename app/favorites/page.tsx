"use client";

import * as React from "react";
import DoaCard from "@/components/doa-card";
import doaData from "@/data/doa.json";
import { useStore } from "@/lib/store";
import type { DoaItem } from "@/lib/types";

export default function FavoritesPage() {
  const { state } = useStore();
  const favs = (doaData as DoaItem[]).filter(d => state.favourites[d.id]);
  return (
    <div className="space-y-4">
      <div className="container-narrow">
        <h1 className="text-2xl font-semibold tracking-tight">Favorit</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">Doa & dzikir yang kamu simpan.</p>
      </div>
      <div className="grid-cards">
        {favs.map((d) => <DoaCard key={d.id} item={d} />)}
      </div>
      {favs.length === 0 && (
        <p className="text-center text-neutral-500 py-10">Belum ada favorit. Simpan dari beranda.</p>
      )}
    </div>
  );
}
