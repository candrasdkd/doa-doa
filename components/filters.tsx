
"use client";
import * as React from "react";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { useStore } from "@/lib/store";
import type { Category } from "@/lib/types";

const categories: { key: Category; label: string }[] = [
  { key: "harian", label: "Doa Harian" },
];

const ALL = categories.map(c => c.key);

type Props = {
  active: Category[];
  onChange: (cats: Category[]) => void;
};

export default function Filters({ active, onChange }: Props) {
  const { state, toggle } = useStore();
  const allSelected = active.length === ALL.length;

  function toggleCat(c: Category) {
    if (active.includes(c)) onChange(active.filter(v => v != c));
    else onChange([...active, c]);
  }

  function reset() { onChange(ALL); }

  function onMobileChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const v = e.target.value;
    if (v === "all") onChange(ALL);
    else onChange([v as Category]);
  }

  return (
    <div className="flex flex-col gap-3 card">
      {/* Mobile: dropdown */}
      <div className="flex items-center gap-2">
        <select
          className="input"
          value={allSelected ? "all" : active[0]}
          onChange={onMobileChange}
        >
          <option value="all">Semua Doa</option>
          {categories.map(c => (
            <option key={c.key} value={c.key}>{c.label}</option>
          ))}
        </select>
        {!allSelected && (
          <button className="badge" onClick={reset}>Reset</button>
        )}
      </div>

      {/* Desktop: badges multi-select */}
      {/* <div className="hidden sm:flex flex-wrap items-center gap-2">
        {categories.map(c => (
          <button key={c.key} onClick={() => toggleCat(c.key)}>
            <Badge active={active.includes(c.key)}>{c.label}</Badge>
          </button>
        ))}
        <button className="badge" onClick={reset}>Reset</button>
      </div> */}

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
    </div>
  );
}
