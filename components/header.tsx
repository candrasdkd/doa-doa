"use client";

import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import { Bookmark, Home } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Header() {
  const pathname = usePathname();

  const Tab = ({ href, icon: Icon, label }: any) => {
    const active = pathname === href;
    return (
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className={clsx(
          "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500",
          active
            ? "bg-emerald-600 text-white border border-emerald-600 shadow-[inset_0_1px_0_rgba(255,255,255,.15)] dark:bg-emerald-500 dark:border-emerald-500"
            : "border border-emerald-900/10 bg-white/60 text-emerald-800 hover:bg-emerald-50/80 dark:border-emerald-300/10 dark:bg-neutral-900/60 dark:text-emerald-200 dark:hover:bg-neutral-800"
        )}
      >
        <Icon size={18} />
        <span className="hidden sm:inline">{label}</span>
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur">
      <div className="relative border-b border-transparent bg-white/70 dark:bg-neutral-950/70">
        {/* pola geometri tipis di header (halus) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08] mix-blend-multiply dark:opacity-[0.06]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'><g fill='none' stroke='%232d6a4f' stroke-width='1'><path d='M0 20h40M20 0v40'/><path d='M0 0l20 20L40 0M0 40l20-20L40 40'/></g></svg>\")",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="container flex items-center justify-between py-3">
          {/* Brand */}
          <Link href="/" className="group flex items-center gap-3">
            {/* Logomark mihrab + bulan sabit */}
            <span
              aria-hidden="true"
              className="grid h-10 w-10 place-items-center rounded-xl border border-emerald-900/15 bg-white/70 shadow-sm ring-1 ring-emerald-900/5 dark:border-emerald-300/10 dark:bg-neutral-900/60"
            >
              <svg
                viewBox="0 0 48 48"
                className="h-6 w-6 text-emerald-700 dark:text-emerald-300"
              >
                {/* mihrab */}
                <path
                  d="M12 38V20c0-6.5 5.5-10 12-14 6.5 4 12 7.5 12 14v18h-6V22c0-4.2-3.3-6.7-6-8-2.7 1.3-6 3.8-6 8v16h-6z"
                  fill="currentColor"
                  fillOpacity="0.18"
                />
                {/* bulan sabit */}
                <path
                  d="M32.5 18.5c-5.8 0-10.5 4.7-10.5 10.5 0 4 2.2 7.5 5.6 9.3-6.4-1-11.3-6.6-11.3-13.3 0-7.4 6-13.5 13.5-13.5 2.7 0 5.2.8 7.3 2.1-1.3-.3-2.7-.4-4.1-.1-0.2 0-0.4 0.1-0.5 0.1z"
                  fill="currentColor"
                />
              </svg>
            </span>

            <div className="leading-tight">
              <div className="font-semibold tracking-tight text-lg text-emerald-900 dark:text-emerald-200">
                Doa &amp; Dzikir
              </div>
              {/* subtitle Arab kecil */}
              <div
                lang="ar"
                className="text-arabic -mt-0.5 text-[12px] leading-[1.8] text-emerald-800/80 dark:text-emerald-200/80"
                title="Ad'iyah wa Adzkar"
              >
                أدعية وأذكار
              </div>
            </div>
          </Link>

          {/* Nav */}
          <nav className="flex items-center gap-2">
            <Tab href="/" icon={Home} label="Beranda" />
            <Tab href="/favorites" icon={Bookmark} label="Favorit" />
            <ThemeToggle />
          </nav>
        </div>

        {/* Ornamen garis bawah ala “pasir” */}
        <div
          aria-hidden="true"
          className="h-[3px] w-full"
          style={{
            background:
              "linear-gradient(90deg, rgba(237,224,197,0) 0%, #efe4c9 18%, #ead9bb 50%, #efe4c9 82%, rgba(237,224,197,0) 100%)",
          }}
        />
      </div>
    </header>
  );
}
