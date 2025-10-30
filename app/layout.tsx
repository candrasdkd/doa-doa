import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { inter, arabic } from "./fonts";
import { StoreProvider } from "@/lib/store";

export const metadata = {
  title: "Doa & Dzikir",
  description: "Aplikasi web Doa & Dzikir yang responsif",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${arabic.variable} font-sans arabic-theme text-foreground dark:text-fg-dark`}
      >
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
