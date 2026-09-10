"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const CONSENT_KEY = "bl_cookie_consent";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    BL_GTM_ID?: string;
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

export default function CookieBanner({ gtmId }: { gtmId?: string }) {
  const [visible, setVisible] = useState(false);
  const [locale, setLocale] = useState("it");

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      setVisible(true);
    } else if (consent === "accepted" && gtmId) {
      loadGTM(gtmId);
    }
    setLocale(document.documentElement.lang?.startsWith("en") ? "en" : "it");
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

  const isIt = locale === "it";

  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 9999,
      background: "rgba(12,15,20,0.97)", backdropFilter: "blur(16px)",
      borderTop: "1px solid #252a35",
      padding: "1.25rem 2rem",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      flexWrap: "wrap", gap: "1rem",
    }}>
      <p style={{ fontSize: "0.82rem", color: "#8b90a0", maxWidth: "640px", lineHeight: 1.6 }}>
        {isIt
          ? <>Questo sito usa cookie tecnici necessari al funzionamento e, con il tuo consenso, cookie analitici di terze parti. <Link href="/it/privacy" style={{ color: "#006eb7" }}>Privacy Policy</Link></>
          : <>This site uses technical cookies necessary for operation and, with your consent, third-party analytics cookies. <Link href="/en/privacy" style={{ color: "#006eb7" }}>Privacy Policy</Link></>
        }
      </p>
      <div style={{ display: "flex", gap: "0.75rem", flexShrink: 0 }}>
        <button onClick={reject} style={{
          background: "transparent", border: "1px solid #555b6e",
          color: "#e4e6eb", padding: "0.55rem 1.2rem",
          borderRadius: "100px", fontSize: "0.78rem", fontWeight: 500, cursor: "pointer",
          fontFamily: "inherit",
        }}>
          {isIt ? "Rifiuta tutti" : "Reject all"}
        </button>
        <button onClick={accept} style={{
          background: "transparent", border: "1px solid #555b6e",
          color: "#e4e6eb", padding: "0.55rem 1.2rem",
          borderRadius: "100px", fontSize: "0.78rem", fontWeight: 500, cursor: "pointer",
          fontFamily: "inherit",
        }}>
          {isIt ? "Accetta tutti" : "Accept all"}
        </button>
      </div>
    </div>
  );
}
