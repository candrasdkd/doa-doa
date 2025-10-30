"use client";

import * as React from "react";
import SearchBar from "@/components/search-bar";
import Filters from "@/components/filters";
import DoaCard from "@/components/doa-card";
import doaData from "@/data/doa.json";
import type { DoaItem, Category } from "@/lib/types";
import { matchesQuery } from "@/lib/search";

const ALL_CATS: Category[] = ["harian", "amalan", "shalat", "lainnya"];

/** Modal peringatan */
function WarningModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="warning-title" className="fixed inset-0 z-50 flex items-start justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div className="relative mx-auto mt-24 w-[min(560px,92%)] overflow-hidden rounded-2xl border border-emerald-700/30 bg-white shadow-2xl dark:border-emerald-400/20 dark:bg-neutral-900">
        <div className="flex items-center gap-2 bg-emerald-700/90 px-5 py-3 text-white dark:bg-emerald-800/90">
          <span aria-hidden="true">⚠️</span>
          <h2 id="warning-title" className="text-base font-semibold">Peringatan Mangkulan</h2>
        </div>
        <div className="px-5 py-4 text-sm text-neutral-800 dark:text-neutral-200">
          Sebelum mengamalkan doa/dzikir, pastikan Anda telah <em>mangkulan</em> kepada guru atau orang yang memiliki sanad (rantai) mangkulan. Mengamalkan dengan bimbingan lebih utama.
        </div>
        <div className="flex justify-end gap-2 px-5 pb-5">
          <button
            onClick={onClose}
            className="inline-flex items-center rounded-lg border border-emerald-700/30 bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-emerald-400/30 dark:bg-emerald-700 dark:hover:bg-emerald-600"
          >
            Mengerti
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [q, setQ] = React.useState("");
  const [cats, setCats] = React.useState<Category[]>(ALL_CATS);
  const [showWarning, setShowWarning] = React.useState(false);

  React.useEffect(() => setShowWarning(true), []);

  const items = (doaData as DoaItem[]).filter(
    (d) =>
      cats.includes(d.category) &&
      (matchesQuery(d.title, q) || matchesQuery(d.latin, q) || matchesQuery(d.translation_id, q))
  );

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="space-y-4">
        <div className="container-narrow space-y-3 surface-arabic p-4">
          <h1 className="text-2xl font-semibold tracking-tight text-emerald-800 dark:text-emerald-200">
            Kumpulan Doa & Dzikir
          </h1>
          <p className="text-sm text-emerald-900/80 dark:text-emerald-100/70">
            Cari, filter, simpan favorit, dan atur tampilan Arab/Latin/Terjemahan.
          </p>
          <SearchBar value={q} onChange={setQ} placeholder="Cari doa/dzikir..." />
        </div>

        <div className="container-narrow">
          <div className="surface-arabic p-3">
            <Filters active={cats} onChange={setCats} />
          </div>
        </div>

        <div className="grid-cards">
          {items.map((d) => (
            <DoaCard key={d.id} item={d} />
          ))}
        </div>

        {items.length === 0 && (
          <p className="py-10 text-center text-neutral-600 dark:text-neutral-400">Tidak ada hasil. Coba kata kunci lain.</p>
        )}
      </div>

      <WarningModal open={showWarning} onClose={() => setShowWarning(false)} />
    </div>
  );
}
