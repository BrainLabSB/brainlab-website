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
      position: "fixed", bottom: "1rem", left: "50%", transform: "translateX(-50%)",
      zIndex: 9999, width: "calc(100% - 2rem)", maxWidth: "560px",
      background: "#ffffff", borderRadius: "12px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.14), 0 1px 6px rgba(0,0,0,0.08)",
      padding: "1rem 1.25rem",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1a1d23", marginBottom: "0.25rem" }}>
            {isIt
              ? "Il futuro del marketing passa per il rispetto della Privacy 🚀"
              : "Great marketing starts with respecting your privacy 🚀"}
          </p>
          <p style={{ fontSize: "0.73rem", color: "#5a5f6b", lineHeight: 1.5, margin: 0 }}>
            {isIt ? (
              <>Usiamo cookie analitici e di marketing previo consenso. <Link href="/it/privacy" style={{ color: "#006eb7" }}>Privacy & Cookie Policy</Link></>
            ) : (
              <>We use analytics and marketing cookies with your consent. <Link href="/en/privacy" style={{ color: "#006eb7" }}>Privacy & Cookie Policy</Link></>
            )}
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
          <button onClick={reject} style={{
            background: "transparent", border: "1px solid #d1d5db",
            color: "#374151", padding: "0.45rem 1rem",
            borderRadius: "100px", fontSize: "0.75rem", fontWeight: 500, cursor: "pointer",
            fontFamily: "inherit", whiteSpace: "nowrap",
          }}>
            {isIt ? "Rifiuta tutti" : "Reject all"}
          </button>
          <button onClick={accept} style={{
            background: "#1a1d23", border: "none",
            color: "#ffffff", padding: "0.45rem 1rem",
            borderRadius: "100px", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer",
            fontFamily: "inherit", whiteSpace: "nowrap",
          }}>
            {isIt ? "Accetta tutti" : "Accept all"}
          </button>
        </div>
      </div>
    </div>
  );
}
