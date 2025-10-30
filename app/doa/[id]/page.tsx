"use client";

import * as React from "react";
import doaData from "@/data/doa.json";
import type { DoaItem } from "@/lib/types";
import { useParams, useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Target, RotateCcw, Sparkles } from "lucide-react";

// Custom hook untuk persistent count dengan error handling
function usePersistentCount(key: string) {
  const [count, setCount] = React.useState<number>(0);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = parseInt(raw);
        if (!isNaN(parsed)) setCount(parsed);
      }
    } catch (error) {
      console.warn("Error reading from localStorage:", error);
    }
  }, [key]);

  const updateCount = React.useCallback((value: number | ((prev: number) => number)) => {
    setCount(prev => {
      const newValue = typeof value === "function" ? value(prev) : value;
      try {
        localStorage.setItem(key, String(newValue));
      } catch (error) {
        console.warn("Error writing to localStorage:", error);
      }
      return newValue;
    });
  }, [key]);

  return [count, updateCount] as const;
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
  const [showConfetti, setShowConfetti] = React.useState(false);

  // Effect untuk document title
  React.useEffect(() => {
    document.title = item ? `${item.title} | Doa & Dzikir` : "Doa tidak ditemukan";
  }, [item]);

  // Effect untuk confetti ketika mencapai target
  React.useEffect(() => {
    if (item?.recommended_count && count >= item.recommended_count) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [count, item?.recommended_count]);

  const handleIncrement = React.useCallback(() => {
    setCount(c => c + 1);
    setBump(true);
    setFlash(true);

    // Haptic feedback
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate?.(10);
      } catch { /* ignore */ }
    }

    setTimeout(() => setBump(false), 150);
    setTimeout(() => setFlash(false), 120);
  }, [setCount]);

  // Keyboard shortcut
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
        handleIncrement();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleIncrement]);

  if (!item) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
        <div className="space-y-4 max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Doa Tidak Ditemukan
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Doa yang Anda cari tidak ditemukan dalam database.
          </p>
          <Button
            onClick={() => router.push("/")}
            className="mt-4"
            size="lg"
          >
            Kembali ke Beranda
          </Button>
        </div>
      </div>
    );
  }

  const recommended = item.recommended_count;
  const progress = recommended && recommended > 0 ? Math.min(count / recommended, 1) : 0;
  const reachedTarget = recommended && count >= recommended;

  // Progress circle configuration
  const size = 220;
  const stroke = 12;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = circumference * progress;

  return (
    <div
      className="relative min-h-[100svh] overflow-hidden bg-gradient-to-br from-emerald-50 via-blue-50 to-cyan-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900"
      onClick={handleIncrement}
      role="button"
      tabIndex={0}
      aria-label="Ketuk di mana saja atau tekan spasi untuk menambah hitungan"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleIncrement();
        }
      }}
    >
      {/* Confetti effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 flex justify-center items-center">
          <div className="animate-confetti">
            <Sparkles className="w-8 h-8 text-yellow-500 animate-bounce" />
          </div>
        </div>
      )}

      {/* Flash tap feedback */}
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-100 ${flash ? "opacity-30" : "opacity-0"
          } bg-emerald-200/50 dark:bg-emerald-400/10`}
      />

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.15)_1px,transparent_0)] bg-[length:20px_20px]" />

      {/* Top bar */}
      <div className="sticky top-0 z-20 flex items-center justify-between p-4 backdrop-blur-lg supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-black/50 border-b border-white/20">
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            router.back();
          }}
          className="gap-2 bg-white/80 dark:bg-neutral-800/80"
        >
          <ChevronLeft className="w-4 h-4" />
          Kembali
        </Button>

        <div className="text-right max-w-[60%]">
          <h1 className="text-lg font-bold leading-tight text-gray-900 dark:text-white line-clamp-2">
            {item.title}
          </h1>
          {recommended && (
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 flex items-center justify-end gap-1">
              <Target className="w-3 h-3" />
              Anjuran: {recommended}x
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="container-narrow px-4 py-6">
        {/* Doa text card */}
        <div
          className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/20 mb-8 space-y-4"
          onClick={(e) => e.stopPropagation()}
        >
          {state.showArabic && (
            <div className="text-center">
              <p
                dir="rtl"
                className="text-3xl leading-loose font-arabic font-medium text-gray-900 dark:text-white"
              >
                {item.arabic}
              </p>
            </div>
          )}

          {state.showLatin && (
            <div className="bg-gray-50/50 dark:bg-neutral-700/50 rounded-lg p-4">
              <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                <span className="font-semibold text-gray-900 dark:text-white">Transliterasi:</span> {item.latin}
              </p>
            </div>
          )}

          {state.showTranslate && item.translation_id && (
            <div className="bg-blue-50/50 dark:bg-blue-900/20 rounded-lg p-4">
              <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                <span className="font-semibold text-gray-900 dark:text-white">Terjemahan:</span> {item.translation_id}
              </p>
            </div>
          )}

          {state.showVirtues && item.virtue_id && (
            <div className="bg-emerald-50/50 dark:bg-emerald-900/20 rounded-lg p-4">
              <p className="text-sm leading-relaxed text-emerald-800 dark:text-emerald-200">
                <span className="font-semibold">Keutamaan:</span> {item.virtue_id}
              </p>
            </div>
          )}

          {item.source && (
            <div className="pt-2 border-t border-gray-200/50 dark:border-gray-600/50">
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                Sumber: {item.source}
              </p>
            </div>
          )}
        </div>

        {/* Counter section */}
        <div className="flex flex-col items-center justify-center space-y-6 mb-8">
          {/* Progress circle */}
          <div className="relative">
            {recommended && (
              <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                className="absolute inset-0"
                aria-hidden="true"
              >
                {/* Background circle */}
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke="currentColor"
                  className="text-gray-200/80 dark:text-gray-700/80"
                  strokeWidth={stroke}
                />
                {/* Progress circle */}
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="none"
                  stroke="currentColor"
                  className={`transition-all duration-500 ease-out ${reachedTarget
                      ? "text-emerald-500"
                      : "text-emerald-400 dark:text-emerald-300"
                    }`}
                  strokeWidth={stroke}
                  strokeLinecap="round"
                  strokeDasharray={`${dash} ${circumference - dash}`}
                  transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
              </svg>
            )}

            {/* Count number */}
            <div className="relative z-10 w-56 h-56 flex items-center justify-center">
              <div
                className={`select-none text-6xl font-black transition-all duration-300 ease-out ${bump ? "scale-110 text-emerald-600" : "scale-100"
                  } ${reachedTarget
                    ? "text-emerald-600 dark:text-emerald-300"
                    : "text-gray-800 dark:text-white"
                  }`}
              >
                {count}
              </div>
            </div>
          </div>

          {/* Progress info */}
          <div className="text-center space-y-3">
            {recommended ? (
              <div className="space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {reachedTarget ? (
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200">
                      <Sparkles className="w-4 h-4" />
                      Target tercapai! 🎉
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Progres: {Math.min(count, recommended)}/{recommended}
                    </span>
                  )}
                </p>
                {progress > 0 && !reachedTarget && (
                  <div className="w-48 bg-gray-200/50 dark:bg-gray-700/50 rounded-full h-2 mx-auto">
                    <div
                      className="bg-emerald-400 dark:bg-emerald-300 h-2 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${progress * 100}%` }}
                    />
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Ketuk di mana saja atau tekan spasi untuk menambah hitungan
              </p>
            )}
          </div>
        </div>

        <div className="h-20" />
      </div>

      {/* Bottom action bar */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 p-4">
        <div className="pointer-events-auto mx-auto flex max-w-screen-sm items-center justify-between gap-3 rounded-2xl border border-white/40 bg-white/90 p-3 shadow-lg backdrop-blur-xl dark:border-neutral-700/40 dark:bg-neutral-800/90">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setCount(0);
            }}
            className="gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>

          <div className="flex-1 text-center">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Tap di mana saja untuk menambah
            </p>
            <p className="text-[10px] text-gray-500 dark:text-gray-500 mt-1">
              atau gunakan tombol <kbd className="px-1 py-0.5 text-xs bg-gray-200 dark:bg-gray-700 rounded">Spasi</kbd>
            </p>
          </div>

          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleIncrement();
            }}
            size="sm"
            className="gap-2 bg-emerald-500 hover:bg-emerald-600 text-white"
          >
            +1
          </Button>
        </div>
      </div>
    </div>
  );
}