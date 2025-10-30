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
  const item = (doaData as DoaItem[]).find((d) => d.id === id);
  const { state } = useStore();

  const [count, setCount] = usePersistentCount(`dzikir.count.${id}`);
  const [bump, setBump] = React.useState(false);
  const [flash, setFlash] = React.useState(false);

  React.useEffect(() => {
    if (!item) document.title = "Doa tidak ditemukan";
    else document.title = item.title + " | Doa & Dzikir";
  }, [item]);

  if (!item) {
    return (
      <div className="container space-y-4">
        <p>Doa tidak ditemukan.</p>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            router.push("/");
          }}
        >
          Kembali
        </Button>
      </div>
    );
  }

  const recommended = item.recommended_count;

  const handleIncrement = () => {
    setCount((c) => c + 1);
    setBump(true);
    setFlash(true);
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try { (navigator as any).vibrate?.(10); } catch { }
    }
    setTimeout(() => setBump(false), 150);
    setTimeout(() => setFlash(false), 120);
  };

  const progress =
    recommended && recommended > 0 ? Math.min(count / recommended, 1) : 0;

  const size = 220;
  const stroke = 12;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = circumference * progress;

  const reachedTarget = recommended && count >= recommended;

  return (
    <div
      className="relative min-h-[100svh] overflow-hidden bg-gradient-to-b from-emerald-50 to-white dark:from-neutral-900 dark:to-black"
      onClick={handleIncrement}
      aria-label="Ketuk di mana saja untuk menambah hitungan"
    >
      {/* Flash tap feedback */}
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-100 ${flash ? "opacity-20" : "opacity-0"
          } bg-white/40 dark:bg-white/10`}
      />

      {/* Top bar */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-white/40 dark:supports-[backdrop-filter]:bg-black/30">
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            router.back();
          }}
        >
          Kembali
        </Button>
        <div className="text-right">
          <h1 className="text-base font-semibold leading-tight">{item.title}</h1>
          {recommended ? (
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Anjuran: {recommended}x
            </p>
          ) : null}
        </div>
      </div>

      {/* Content */}
      <div className="container-narrow px-4">
        {/* Doa text card */}
        <div
          className="card mt-2 space-y-3"
          onClick={(e) => e.stopPropagation()}
        >
          {state.showArabic && (
            <p
              dir="rtl"
              className="text-3xl leading-relaxed font-semibold tracking-wide"
            >
              {item.arabic}
            </p>
          )}
          {state.showLatin && (
            <p className="text-sm">
              <span className="font-semibold">Latin:</span> {item.latin}
            </p>
          )}
          {/* {state.showTranslate && item.translation_id && (
            <p className="text-sm">
              <span className="font-semibold">Arti:</span> {item.translation_id}
            </p>
          )}
          {state.showVirtues && item.virtue_id && (
            <p className="text-sm text-emerald-700 dark:text-emerald-300">
              <span className="font-semibold">Keutamaan:</span> {item.virtue_id}
            </p>
          )} */}
          {item.source && (
            <p className="text-xs text-neutral-500">Sumber: {item.source}</p>
          )}
        </div>

        {/* Focus counter */}
        <div className="relative mx-auto my-8 flex w-full max-w-sm items-center justify-center">
          <div
            className={`relative flex h-[${size}px] w-[${size}px] items-center justify-center`}
          >
            {/* SVG progress ring */}
            {recommended ? (
              <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                className="absolute"
                aria-hidden="true"
              >
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke="currentColor"
                  className="text-neutral-200 dark:text-neutral-800"
                  strokeWidth={stroke}
                />
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke="currentColor"
                  className={`${reachedTarget
                    ? "text-emerald-500"
                    : "text-emerald-400 dark:text-emerald-300"
                    } transition-all duration-200 ease-out`}
                  strokeWidth={stroke}
                  strokeLinecap="round"
                  strokeDasharray={`${dash} ${circumference - dash}`}
                  transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
              </svg>
            ) : null}

            {/* Count number */}
            <div
              className={`relative z-10 select-none text-7xl font-extrabold leading-none tracking-tight transition-transform duration-150 ${bump ? "scale-110" : "scale-100"
                } ${reachedTarget ? "text-emerald-600 dark:text-emerald-300" : ""}`}
            >
              {count}
            </div>
          </div>
        </div>

        {/* Target badge */}
        {recommended ? (
          <div className="mb-2 text-center">
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              {reachedTarget ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200">
                  ✅ Target tercapai
                </span>
              ) : (
                <>
                  Progres: {Math.min(count, recommended)}/{recommended}
                </>
              )}
            </p>
          </div>
        ) : (
          <p className="mb-2 text-center text-sm text-neutral-700 dark:text-neutral-300">
            Ketuk di mana saja untuk menambah hitungan.
          </p>
        )}

        <div className="h-24" />
      </div>

      {/* Bottom action bar */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 p-4">
        <div className="pointer-events-auto mx-auto flex max-w-screen-sm items-center justify-between gap-2 rounded-2xl border border-neutral-200/60 bg-white/80 p-2 backdrop-blur dark:border-neutral-700/60 dark:bg-neutral-900/70">
          <Button
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              setCount((c) => c + 1);
            }}
          >
            +1
          </Button>
          <div className="text-xs text-neutral-500">
            Tap di mana saja untuk menambah
          </div>
          <Button
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              setCount(0);
            }}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
