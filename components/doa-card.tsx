"use client";
import * as React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { useRouter } from "next/navigation";
import { Bookmark, Copy, Share2 } from "lucide-react";
import { useStore } from "@/lib/store";
import { DoaItem } from "@/lib/types";

type Props = { item: DoaItem };

export default function DoaCard({ item }: Props) {
  const router = useRouter();
  const { state, toggleFav } = useStore();
  const fav = state.favourites[item.id];

  async function copyText() {
    try {
      const parts: string[] = [];
      parts.push(item.title);
      if (state.showArabic && item.arabic) parts.push(item.arabic);
      if (state.showLatin && item.latin) parts.push(item.latin);
      if (state.showTranslate && item.translation_id) parts.push(item.translation_id);
      if (state.showVirtues && item.virtue_id) parts.push(`Keutamaan/Catatan: ${item.virtue_id}`);
      if (item.source) parts.push(`Sumber: ${item.source}`);
      await navigator.clipboard.writeText(parts.join("\n\n"));
      alert("Teks disalin.");
    } catch {
      alert("Gagal menyalin teks.");
    }
  }

  async function share() {
    const text = [item.title, state.showTranslate ? item.translation_id : ""]
      .filter(Boolean)
      .join("\n\n");
    try {
      if (navigator.share) {
        await navigator.share({ title: item.title, text });
      } else {
        await navigator.clipboard.writeText(text);
        alert("Fitur share tidak didukung, teks disalin.");
      }
    } catch {
      /* ignore */
    }
  }

  const goDetail = () => router.push(`/doa/${item.id}`);

  return (
    <Card
      onClick={goDetail}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && goDetail()}
      tabIndex={0}
      role="button"
      aria-label={`Buka ${item.title}`}
      className="group relative cursor-pointer overflow-hidden border-emerald-900/10 bg-white/70 transition hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-emerald-400/10 dark:bg-neutral-900/60"
    >
      {/* Dekor pojok pola geometri */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 opacity-15 mix-blend-multiply dark:opacity-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 40 40'><g fill='none' stroke='%232d6a4f' stroke-width='1'><path d='M0 20h40M20 0v40'/><path d='M0 0l20 20L40 0M0 40l20-20L40 40'/></g></svg>\")",
          backgroundSize: "40px 40px",
        }}
      />

      <CardHeader className="relative z-10 flex flex-row items-start gap-3">
        <div className="flex-1">
          <CardTitle className="text-emerald-900 dark:text-emerald-200">{item.title}</CardTitle>
          {item.category && (
            <span className="mt-2 inline-flex items-center rounded-full border border-emerald-800/20 bg-emerald-700/10 px-2 py-0.5 text-xs uppercase tracking-wide text-emerald-800 dark:border-emerald-300/20 dark:bg-emerald-300/10 dark:text-emerald-200">
              {item.category}
            </span>
          )}
        </div>

        {/* Favorit */}
        <button
          type="button"
          title={fav ? "Hapus dari Favorit" : "Simpan ke Favorit"}
          onClick={(e) => {
            e.stopPropagation();
            toggleFav(item.id);
          }}
          className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-sm transition
            ${fav
              ? "border-emerald-700 bg-emerald-600 text-white hover:bg-emerald-700 dark:border-emerald-400 dark:bg-emerald-500"
              : "border-emerald-900/20 bg-white/70 text-emerald-800 hover:bg-emerald-50 dark:border-emerald-300/20 dark:bg-neutral-900/60 dark:text-emerald-200 dark:hover:bg-neutral-800"}`}
        >
          <Bookmark size={18} className="shrink-0" {...(fav ? { fill: "currentColor" } : {})} />
          <span className="hidden md:inline">{fav ? "Favorit" : "Simpan"}</span>
        </button>
      </CardHeader>

      <CardContent className="relative z-10 space-y-3">
        {/* Arabic */}
        {state.showArabic && item.arabic && (
          <p
            lang="ar"
            dir="rtl"
            className="text-arabic text-right text-3xl leading-[2.1] text-emerald-900 dark:text-emerald-200"
          >
            {item.arabic}
          </p>
        )}

        {/* Latin */}
        {state.showLatin && item.latin && (
          <p className="text-sm text-neutral-700 dark:text-neutral-300">
            <span className="font-semibold text-emerald-900 dark:text-emerald-200">Latin:</span> {item.latin}
          </p>
        )}

        {/* Terjemahan */}
        {state.showTranslate && item.translation_id && (
          <p className="text-sm text-neutral-700 dark:text-neutral-300">
            <span className="font-semibold text-emerald-900 dark:text-emerald-200">Arti (ID):</span> {item.translation_id}
          </p>
        )}

        {/* Keutamaan */}
        {state.showVirtues && item.virtue_id && (
          <p className="text-sm text-emerald-700 dark:text-emerald-300">
            <span className="font-semibold">Keutamaan/Catatan:</span> {item.virtue_id}
          </p>
        )}

        {item.source && <p className="text-xs text-neutral-500">Sumber: {item.source}</p>}
      </CardContent>

      <CardFooter className="relative z-10 flex gap-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            copyText();
          }}
          className="inline-flex items-center gap-2 rounded-lg border border-emerald-900/20 bg-white/60 px-3 py-1.5 text-sm text-emerald-800 hover:bg-emerald-50 dark:border-emerald-300/20 dark:bg-neutral-900/60 dark:text-emerald-200 dark:hover:bg-neutral-800"
        >
          <Copy size={16} /> Salin
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            share();
          }}
          className="inline-flex items-center gap-2 rounded-lg border border-emerald-900/20 bg-white/60 px-3 py-1.5 text-sm text-emerald-800 hover:bg-emerald-50 dark:border-emerald-300/20 dark:bg-neutral-900/60 dark:text-emerald-200 dark:hover:bg-neutral-800"
        >
          <Share2 size={16} /> Bagikan
        </button>
      </CardFooter>

      {/* Garis aksen bawah ala pasir */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1.5"
        style={{
          background:
            "linear-gradient(90deg, rgba(237,224,197,0) 0%, #efe4c9 25%, #ead9bb 75%, rgba(237,224,197,0) 100%)",
        }}
      />
    </Card>
  );
}
