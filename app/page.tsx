"use client";

import * as React from "react";
import SearchBar from "@/components/search-bar";
import Filters from "@/components/filters";
import DoaCard from "@/components/doa-card";
import doaData from "@/data/doa.json";
import type { DoaItem, Category } from "@/lib/types";
import { matchesQuery } from "@/lib/search";

const ALL_CATS: Category[] = ["harian", "amalan", "shalat", "lainnya"];

export default function Page() {
  const [q, setQ] = React.useState("");
  const [cats, setCats] = React.useState<Category[]>(ALL_CATS);

  const items = (doaData as DoaItem[]).filter(
    (d) =>
      cats.includes(d.category) &&
      (matchesQuery(d.title, q) ||
        matchesQuery(d.latin, q) ||
        matchesQuery(d.translation_id, q))
  );

  return (
    <div className="space-y-4">
      <div className="container-narrow space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight">Kumpulan Doa & Dzikir</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Cari, filter, simpan favorit, dan atur tampilan Arab/Latin/Terjemahan.
        </p>

        {/* PERINGATAN MANGKULAN */}
        <div
          role="alert"
          aria-live="polite"
          className="flex gap-2 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-700 dark:bg-amber-900/20 dark:text-amber-100"
        >
          <span aria-hidden="true">⚠️</span>
          <p className="m-0">
            <span className="font-medium">Peringatan:</span>{" "}
            Sebelum mengamalkan doa/dzikir, pastikan Anda sudah{" "}
            <em>mangkulan</em> kepada guru/orang yang sudah mangkulan.
          </p>
        </div>

        <SearchBar value={q} onChange={setQ} placeholder="Cari doa/dzikir..." />
      </div>

      <Filters active={cats} onChange={setCats} />

      <div className="grid-cards">
        {items.map((d) => (
          <DoaCard key={d.id} item={d} />
        ))}
      </div>

      {items.length === 0 && (
        <p className="py-10 text-center text-neutral-500">
          Tidak ada hasil. Coba kata kunci lain.
        </p>
      )}
    </div>
  );
}
