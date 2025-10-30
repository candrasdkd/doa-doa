"use client";
import * as React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
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
    const parts: string[] = [];
    parts.push(item.title);
    if (state.showArabic) parts.push(item.arabic);
    if (state.showLatin) parts.push(item.latin);
    if (state.showTranslate) parts.push(item.translation_id);
    if (state.showVirtues) parts.push(item.virtue_id ?? '');
    const text = parts.join("\n\n");
    await navigator.clipboard.writeText(text);
    alert("Teks disalin.");
  }

  async function share() {
    const text = item.title + "\n\n" + item.translation_id;
    if (navigator.share) {
      await navigator.share({ title: item.title, text });
    } else {
      await navigator.clipboard.writeText(text);
      alert("Fitur share tidak didukung, teks disalin.");
    }
  }

  return (
    <Card onClick={() => router.push(`/doa/${item.id}`)} className="cursor-pointer">
      <CardHeader>
        <CardTitle className="flex-1">{item.title}</CardTitle>
        <button className={"btn " + (fav ? "bg-black text-white dark:bg-white dark:text-black" : "")}
          onClick={(e) => { e.stopPropagation(); toggleFav(item.id); }} title="Favorit">
          <Bookmark size={18} />
          <span className="hidden md:inline">{fav ? "Favorit" : "Simpan"}</span>
        </button>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Arabic */}
        {/* Show Arabic in larger size and right-to-left if enabled */}
        {state.showArabic && (
          <p dir="rtl" className="text-2xl leading-relaxed font-semibold">
            {item.arabic}
          </p>
        )}
        {state.showLatin && item.latin && (
          <p className="text-sm text-neutral-700 dark:text-neutral-300">
            <span className="font-semibold">Latin:</span> {item.latin}
          </p>
        )}
        {state.showTranslate && item.translation_id && (
          <p className="text-sm text-neutral-700 dark:text-neutral-300">
            <span className="font-semibold">Arti (ID):</span> {item.translation_id}
          </p>
        )}
        {state.showVirtues && item.virtue_id && (
          <p className="text-sm text-emerald-700 dark:text-emerald-300"><span className="font-semibold">Keutamaan:</span> {item.virtue_id}</p>
        )}
        {item.source && (
          <p className="text-xs text-neutral-500">Sumber: {item.source}</p>
        )}
      </CardContent>
      <CardFooter>
        <button className="btn" onClick={(e) => { e.stopPropagation(); copyText(); }}><Copy size={16} /> Salin</button>
        <button className="btn" onClick={(e) => { e.stopPropagation(); share(); }}><Share2 size={16} /> Bagikan</button>
      </CardFooter>
    </Card>
  );
}
