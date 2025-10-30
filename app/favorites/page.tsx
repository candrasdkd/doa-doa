"use client";

import * as React from "react";
import Link from "next/link";
import DoaCard from "@/components/doa-card";
import doaData from "@/data/doa.json";
import { useStore } from "@/lib/store";
import type { DoaItem } from "@/lib/types";
import { Bookmark } from "lucide-react";

export default function FavoritesPage() {
  const { state, toggleFav } = useStore();

  const favs = React.useMemo(
    () => (doaData as DoaItem[]).filter((d) => state.favourites[d.id]),
    [state.favourites]
  );

  const clearAll = React.useCallback(() => {
    if (favs.length === 0) return;
    if (!confirm("Hapus semua favorit?")) return;
    favs.forEach((d) => toggleFav(d.id));
  }, [favs, toggleFav]);

  return (
    <div className="space-y-4">
      <div className="container-narrow surface-arabic p-4">
        <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-emerald-800 dark:text-emerald-200">
              Favorit
            </h1>
            <p className="text-sm text-emerald-900/80 dark:text-emerald-100/70">
              Doa &amp; dzikir yang kamu simpan.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-emerald-900/20 bg-white/70 px-3 py-1 text-xs font-medium text-emerald-800 dark:border-emerald-300/20 dark:bg-neutral-900/60 dark:text-emerald-200">
              {favs.length} tersimpan
            </span>
            <button
              type="button"
              onClick={clearAll}
              className="inline-flex items-center rounded-lg border border-emerald-900/20 bg-white/60 px-3 py-1.5 text-sm text-emerald-800 hover:bg-emerald-50 disabled:opacity-50 dark:border-emerald-300/20 dark:bg-neutral-900/60 dark:text-emerald-200 dark:hover:bg-neutral-800"
              disabled={favs.length === 0}
            >
              Hapus semua
            </button>
          </div>
        </div>
      </div>

      {favs.length > 0 ? (
        <div className="grid-cards">
          {favs.map((d) => (
            <DoaCard key={d.id} item={d} />
          ))}
        </div>
      ) : (
        <div className="container-narrow">
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-emerald-900/10 bg-white/70 p-10 text-center dark:border-emerald-400/10 dark:bg-neutral-900/60">
            <Bookmark size={28} className="text-emerald-700 dark:text-emerald-300" />
            <p className="text-neutral-600 dark:text-neutral-400">
              Belum ada favorit. Simpan dari beranda.
            </p>
            <Link
              href="/"
              className="inline-flex items-center rounded-lg border border-emerald-900/20 bg-white/60 px-4 py-2 text-sm text-emerald-800 hover:bg-emerald-50 dark:border-emerald-300/20 dark:bg-neutral-900/60 dark:text-emerald-200 dark:hover:bg-neutral-800"
            >
              Ke Beranda
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
