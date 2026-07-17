"use client";

import { useEffect } from "react";

/** Registers the offline shell only in browsers that support service workers. */
export default function PwaRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // The trip hub remains fully usable online if registration is unavailable.
      });
    }
  }, []);

  return null;
}
