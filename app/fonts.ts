import { Inter } from "next/font/google";
import { Noto_Naskh_Arabic } from "next/font/google";

export const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

export const arabic = Noto_Naskh_Arabic({
    subsets: ["arabic"],
    weight: ["400", "700"],
    variable: "--font-arabic",
    display: "swap",
});
