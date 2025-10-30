"use client";

import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import { Bookmark, Home, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Header() {
  const pathname = usePathname();
  const Tab = ({ href, icon: Icon, label }: any) => (
    <Link
      href={href}
      className={clsx(
        "inline-flex items-center gap-2 rounded-xl px-3 py-2",
        pathname === href
          ? "bg-black text-white dark:bg-white dark:text-black"
          : "hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-transparent"
      )}
    >
      <Icon size={18} /> <span className="hidden sm:inline">{label}</span>
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur">
      <div className="container flex items-center justify-between py-3">
        <Link href="/" className="font-semibold tracking-tight text-lg">Doa & Dzikir</Link>
        <nav className="flex items-center gap-2">
          <Tab href="/" icon={Home} label="Beranda" />
          <Tab href="/favorites" icon={Bookmark} label="Favorit" />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
