"use client";
import { useEffect } from "react";

export default function PWARegister() {
    useEffect(() => {
        if ("serviceWorker" in navigator) {
            const okProto = window.location.protocol === "https:" || window.location.hostname === "localhost";
            if (okProto) navigator.serviceWorker.register("/sw.js").catch(console.error);
        }
    }, []);
    return null;
}
