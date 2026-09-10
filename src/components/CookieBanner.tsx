"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const CONSENT_KEY = "bl_cookie_consent";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

function loadGTM(id: string) {
  if (!id || document.getElementById("gtm-script")) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
  const s = document.createElement("script");
  s.id = "gtm-script";
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${id}`;
  document.head.appendChild(s);
}

export default function CookieBanner({ gtmId, locale }: { gtmId?: string; locale: string }) {
  const [visible, setVisible] = useState(false);
  const isIt = locale === "it";

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      setVisible(true);
    } else if (consent === "accepted" && gtmId) {
      loadGTM(gtmId);
    }
  }, [gtmId]);

  function accept() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    if (gtmId) loadGTM(gtmId);
    setVisible(false);
  }

  function reject() {
    localStorage.setItem(CONSENT_KEY, "rejected");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed", bottom: "1.5rem", left: "50%", transform: "translateX(-50%)",
      zIndex: 9999, width: "calc(100% - 3rem)", maxWidth: "860px",
      background: "#ffffff", borderRadius: "16px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)",
      padding: "1.5rem 2rem",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1.25rem" }}>
        <div style={{ maxWidth: "640px" }}>
          <p style={{ fontSize: "0.88rem", fontWeight: 700, color: "#1a1d23", marginBottom: "0.4rem" }}>
            {isIt
              ? "Il futuro del marketing passa per il rispetto della Privacy 🚀"
              : "Great marketing starts with respecting your privacy 🚀"}
          </p>
          <p style={{ fontSize: "0.8rem", color: "#5a5f6b", lineHeight: 1.65 }}>
            {isIt ? (
              <>Utilizziamo i cookie per migliorare la tua esperienza di navigazione, offrirti contenuti personalizzati e analizzare il traffico. Cliccando "Accetta tutti" acconsenti al loro utilizzo. <Link href="/it/privacy" style={{ color: "#006eb7" }}>Privacy & Cookie Policy</Link></>
            ) : (
              <>We use cookies to improve your browsing experience, offer personalised content and analyse traffic. By clicking "Accept all" you consent to their use. <Link href="/en/privacy" style={{ color: "#006eb7" }}>Privacy & Cookie Policy</Link></>
            )}
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", flexShrink: 0 }}>
          <button onClick={reject} style={{
            background: "transparent", border: "1px solid #e4e7ec",
            color: "#1a1d23", padding: "0.55rem 1.2rem",
            borderRadius: "100px", fontSize: "0.78rem", fontWeight: 500, cursor: "pointer",
            fontFamily: "inherit",
          }}>
            {isIt ? "Rifiuta tutti" : "Reject all"}
          </button>
          <button onClick={accept} style={{
            background: "transparent", border: "1px solid #e4e7ec",
            color: "#1a1d23", padding: "0.55rem 1.2rem",
            borderRadius: "100px", fontSize: "0.78rem", fontWeight: 500, cursor: "pointer",
            fontFamily: "inherit",
          }}>
            {isIt ? "Accetta tutti" : "Accept all"}
          </button>
        </div>
      </div>
    </div>
  );
}
