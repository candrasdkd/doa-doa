"use client";
import * as React from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

export default function SearchBar({ value, onChange, placeholder }: Props) {
  const [local, setLocal] = React.useState(value);
  React.useEffect(() => setLocal(value), [value]);

  React.useEffect(() => {
    const t = setTimeout(() => onChange(local), 250);
    return () => clearTimeout(t);
  }, [local]);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-2.5" size={18} />
      <Input
        className="pl-9"
        type="search"
        style={{ paddingLeft: 30 }}
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        placeholder={placeholder || "Cari judul, teks latin/terjemahan..."}
      />
    </div>
  );
}
