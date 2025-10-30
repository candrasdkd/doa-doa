"use client";

import * as React from "react";
import doaData from "@/data/doa.json";
import type { DoaItem } from "@/lib/types";
import { useParams, useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";

function usePersistentCount(key: string) {
  const [count, setCount] = React.useState<number>(0);
  React.useEffect(() => {
    const raw = localStorage.getItem(key);
    if (raw) setCount(parseInt(raw) || 0);
  }, [key]);
  React.useEffect(() => {
    localStorage.setItem(key, String(count));
  }, [key, count]);
  return [count, setCount] as const;
}

export default function DoaDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const item = (doaData as DoaItem[]).find(d => d.id === id);
  const { state } = useStore();

  const [count, setCount] = usePersistentCount(`dzikir.count.${id}`);

  React.useEffect(() => {
    if (!item) document.title = "Doa tidak ditemukan";
    else document.title = item.title + " | Doa & Dzikir";
  }, [item]);

  if (!item) {
    return (
      <div className="container space-y-4">
        <p>Doa tidak ditemukan.</p>
        <Button onClick={() => router.push("/")}>Kembali</Button>
      </div>
    );
  }

  const recommended = item.recommended_count;

  return (
    <div className="space-y-6 container-narrow">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{item.title}</h1>
          {recommended ? (
            <p className="text-sm text-neutral-600 dark:text-neutral-400">Anjuran jumlah: {recommended}</p>
          ) : null}
        </div>
        <Button variant="outline" onClick={() => router.back()}>Kembali</Button>
      </div>

      <div className="card space-y-3">
        {state.showArabic && (
          <p dir="rtl" className="text-3xl leading-relaxed font-semibold">{item.arabic}</p>
        )}
        {state.showLatin && (
          <p className="text-sm"><span className="font-semibold">Latin:</span> {item.latin}</p>
        )}
        {state.showTranslate && item.translation_id && (
          <p className="text-sm"><span className="font-semibold">Arti:</span> {item.translation_id}</p>
        )}
        {state.showVirtues && item.virtue_id && (
          <p className="text-sm text-emerald-700 dark:text-emerald-300"><span className="font-semibold">Keutamaan:</span> {item.virtue_id}</p>
        )}
        {item.source && <p className="text-xs text-neutral-500">Sumber: {item.source}</p>}
      </div>

      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">Jumlah hitungan</p>
            <div className="text-5xl font-bold">{count}</div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="primary" onClick={() => setCount(count + 1)}>Tambah</Button>
            <Button variant="outline" onClick={() => setCount(0)}>Reset</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
