import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-10">
      {/* Ornamen garis pasir di bagian atas */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-px h-[3px]"
        style={{
          background:
            "linear-gradient(90deg, rgba(237,224,197,0) 0%, #efe4c9 18%, #ead9bb 50%, #efe4c9 82%, rgba(237,224,197,0) 100%)",
        }}
      />

      <div className="relative border-t border-emerald-900/10 bg-white/70 dark:border-emerald-400/10 dark:bg-neutral-950/70">
        {/* Pola geometri tipis */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06] mix-blend-multiply dark:opacity-[0.05]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'><g fill='none' stroke='%232d6a4f' stroke-width='1'><path d='M0 20h40M20 0v40'/><path d='M0 0l20 20L40 0M0 40l20-20L40 40'/></g></svg>\")",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="container grid gap-6 py-8 sm:items-center">
          {/* Pesan sumber/rujukan */}
          <p className="text-center text-sm text-emerald-900/80 dark:text-emerald-100/70">
            Sumber bacaan disusun dari berbagai kitab &amp; rujukan. Gunakan dengan bijak.
          </p>
        </div>

        {/* Baris paling bawah */}
        <div className="border-t border-emerald-900/10 dark:border-emerald-400/10">
          <div className="container flex flex-col items-center justify-between gap-2 py-4 text-xs text-emerald-900/70 dark:text-emerald-100/70 sm:flex-row">
            <span>© {year} Doa &amp; Dzikir</span>
            <span lang="ar" className="text-arabic">
              جزاكم اللهُ خيرًا
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
