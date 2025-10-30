import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { inter } from "./fonts";
import { StoreProvider } from "@/lib/store";

export const metadata = {
  title: "Doa & Dzikir - Next.js",
  description: "Aplikasi web Doa & Dzikir yang responsif dengan Next.js + Tailwind",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans bg-white text-foreground dark:bg-neutral-950 dark:text-fg-dark`}>
        <ThemeProvider>
          <StoreProvider>
            <Header />
            <main className="container my-6">{children}</main>
            <Footer />
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
