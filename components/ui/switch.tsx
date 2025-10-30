"use client";
import * as React from "react";

type SwitchProps = {
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
  label?: string;
};

export function Switch({ checked, onCheckedChange, label }: SwitchProps) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer select-none">
      <span className="text-sm">{label}</span>
      <span
        className={
          "w-12 h-7 flex items-center rounded-full p-1 transition-colors " +
          (checked ? "bg-black dark:bg-white" : "bg-neutral-300 dark:bg-neutral-700")
        }
        onClick={() => onCheckedChange(!checked)}
      >
        <span
          className={
            "h-5 w-5 rounded-full bg-white dark:bg-black transition-transform " +
            (checked ? "translate-x-5" : "")
          }
        />
      </span>
    </label>
  );
}
