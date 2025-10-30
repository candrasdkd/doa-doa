"use client";
import * as React from "react";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { useStore } from "@/lib/store";
import type { Category } from "@/lib/types";

/** Kategori ditampilkan (sinkron dengan ALL_CATS di page) */
const categories: { key: Category; label: string }[] = [
  { key: "harian", label: "Doa Harian" },
  { key: "amalan", label: "Amalan Harian" },
  { key: "shalat", label: "Doa Shalat" },
  { key: "lainnya", label: "Lainnya" },
];

const ALL = categories.map((c) => c.key);

type Props = {
  active: Category[];
  onChange: (cats: Category[]) => void;
};

export default function Filters({ active, onChange }: Props) {
  const { state, toggle } = useStore();
  const allSelected = active.length === ALL.length;

  // Safety: jangan biarkan kosong (kembalikan ke ALL)
  React.useEffect(() => {
    if (active.length === 0) onChange(ALL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active.length]);

  function toggleCat(c: Category) {
    if (active.includes(c)) onChange(active.filter((v) => v !== c));
    else onChange([...active, c]);
  }

  function reset() {
    onChange(ALL);
  }

  function onMobileChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const v = e.target.value;
    if (v === "all") onChange(ALL);
    else onChange([v as Category]);
  }

  return (
    <fieldset className="flex flex-col gap-4 card" aria-labelledby="filters-title">
      <legend id="filters-title" className="sr-only">
        Filter Doa & Dzikir
      </legend>

      {/* Mobile: dropdown single-select */}
      <div className="flex items-center gap-2 sm:hidden">
        <label htmlFor="cat-mobile" className="sr-only">
          Pilih kategori
        </label>
        <select
          id="cat-mobile"
          className="input"
          value={allSelected ? "all" : active[0]}
          onChange={onMobileChange}
        >
          <option value="all">Semua Doa</option>
          {categories.map((c) => (
            <option key={c.key} value={c.key}>
              {c.label}
            </option>
          ))}
        </select>
        {!allSelected && (
          <button type="button" className="badge" onClick={reset}>
            Reset
          </button>
        )}
      </div>

      {/* Desktop: badges multi-select */}
      <div className="hidden sm:flex flex-wrap items-center gap-2">
        {categories.map((c) => {
          const activeCat = active.includes(c.key);
          return (
            <button
              key={c.key}
              type="button"
              onClick={() => toggleCat(c.key)}
              aria-pressed={activeCat}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg"
              title={c.label}
            >
              {/* Badge dari UI lib kamu, diasumsikan punya prop `active` */}
              <Badge active={activeCat}>{c.label}</Badge>
            </button>
          );
        })}
        {!allSelected && (
          <button type="button" className="badge" onClick={reset}>
            Reset
          </button>
        )}
      </div>

      {/* Preferensi tampilan konten */}
      <div className="flex flex-wrap items-center gap-4">
        <Switch
          checked={state.showArabic}
          onCheckedChange={() => toggle("showArabic")}
          label="Arab"
        />
        <Switch
          checked={state.showLatin}
          onCheckedChange={() => toggle("showLatin")}
          label="Latin"
        />
        <Switch
          checked={state.showTranslate}
          onCheckedChange={() => toggle("showTranslate")}
          label="Terjemahan"
        />
        <Switch
          checked={state.showVirtues}
          onCheckedChange={() => toggle("showVirtues")}
          label="Keutamaan"
        />
      </div>
    </fieldset>
  );
}
