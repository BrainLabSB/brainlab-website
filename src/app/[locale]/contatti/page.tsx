import HubSpotForm from "@/components/HubSpotForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact | Brainlab" };

export default async function ContattiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isIt = locale === "it";
  return (
    <section style={{ minHeight: "100vh", background: "#fff", padding: "9rem 3rem 6rem" }}>
      <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: "0.65rem", letterSpacing: "0.08em", color: "var(--primary)", marginBottom: "0.75rem", textTransform: "uppercase" }}>
          {isIt ? "Contatti" : "Contact"}
        </div>
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "var(--light-text)", marginBottom: "1rem" }}>
          {isIt ? "Iniziamo a lavorare insieme." : "Let's work together."}
        </h1>
        <p style={{ color: "var(--light-text-sec)", fontWeight: 300, marginBottom: "3rem", lineHeight: 1.7 }}>
          {isIt
            ? "Raccontaci il tuo progetto, ti risponderemo entro 24 ore."
            : "Tell us about your project, we'll get back to you within 24 hours."}
        </p>

        {/* Form */}
        <div style={{ textAlign: "left", marginBottom: "4rem" }}>
          <HubSpotForm portalId="20044910" formId="92562939-76c9-404f-86df-62d138e44864" />
        </div>

        {/* Dati aziendali */}
        <div style={{ borderTop: "1px solid var(--light-border)", paddingTop: "2.5rem", marginBottom: "2.5rem", display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "center" }}>
          <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--light-text)" }}>Brain Lab Srl Società Benefit</p>
          <p style={{ fontSize: "0.85rem", color: "var(--light-text-sec)" }}>Corso Monforte 2, 20122 Milano</p>
          <p style={{ fontSize: "0.85rem", color: "var(--light-text-muted)" }}>P.IVA IT11488150969 — REA 11488150969</p>
        </div>

        {/* Mappa */}
        <div style={{ borderRadius: "var(--radius)", overflow: "hidden", height: "320px", width: "100%" }}>
          <iframe
            title="Brainlab — Corso Monforte 2, Milano"
            src="https://maps.google.com/maps?q=Corso+Monforte+2,+20122+Milano&t=&z=16&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
