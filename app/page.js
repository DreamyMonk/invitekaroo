"use client";

import { useEffect, useRef } from "react";

// The Community Host Dashboard is a self-contained SPA (ported verbatim from the
// reference): markup in /public/dash.html, styles in /dash.css, logic in
// /dash.js. We mount it here and let dash.js drive it. The Firebase bridge
// appended to dash.js publishes programmes to Firestore (`programs`), which the
// Invite Karoo app reads live.
export default function Page() {
  const ref = useRef(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.__ikDashBooted) return; // guard StrictMode double-invoke
    window.__ikDashBooted = true;

    const loadScript = (src) =>
      new Promise((res, rej) => {
        const s = document.createElement("script");
        s.src = src;
        s.async = false;
        s.onload = res;
        s.onerror = rej;
        document.body.appendChild(s);
      });

    (async () => {
      try {
        const html = await fetch("/dash.html").then((r) => r.text());
        if (ref.current) ref.current.innerHTML = html;
        await loadScript("https://www.gstatic.com/firebasejs/10.12.5/firebase-app-compat.js");
        await loadScript("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth-compat.js");
        await loadScript("https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore-compat.js");
        await loadScript("/dash.js");
      } catch (e) {
        console.error("Dashboard boot failed", e);
      }
    })();
  }, []);

  return <div ref={ref} id="ik-dash-root" />;
}
