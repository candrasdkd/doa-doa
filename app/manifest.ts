// app/manifest.ts
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Doa & Dzikir",
        short_name: "Doa",
        description: "Aplikasi Doa & Dzikir",
        start_url: "/?source=pwa",
        scope: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#10603f",
        icons: [
            { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
            { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
            { src: "/icons/icon-512-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" }
        ]
    };
}
