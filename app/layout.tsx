import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { inter, arabic } from "./fonts";
import { StoreProvider } from "@/lib/store";
import PWARegister from "@/components/PWARegister";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Doa & Dzikir",
  description: "Aplikasi Doa & Dzikir",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f12" }
  ],
  appleWebApp: { capable: true, statusBarStyle: "default", title: "Doa & Dzikir" },
  manifest: "/manifest.webmanifest",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${arabic.variable} font-sans arabic-theme text-foreground dark:text-fg-dark`}
      >
        <ThemeProvider>
          <StoreProvider>
            <PWARegister />
            <Header />
            <main className="container my-6">{children}</main>
            <Footer />
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
