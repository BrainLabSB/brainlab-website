import HubSpotForm from "@/components/HubSpotForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact" };

export default async function ContattiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isIt = locale === "it";
  return (
    <section style={{ minHeight: "100vh", paddingTop: "10rem", paddingBottom: "7rem", background: "var(--dark)", padding: "10rem 3rem 7rem" }}>
      <div style={{ maxWidth: "640px", margin: "0 auto" }}>
        <div style={{ fontSize: "0.65rem", letterSpacing: "0.08em", color: "var(--primary)", marginBottom: "0.75rem", textTransform: "uppercase" }}>
          {isIt ? "Contatti" : "Contact"}
        </div>
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "#fff", marginBottom: "1rem" }}>
          {isIt ? "Iniziamo a lavorare insieme." : "Let's work together."}
        </h1>
        <p style={{ color: "var(--dark-text-sec)", fontWeight: 300, marginBottom: "3rem", lineHeight: 1.7 }}>
          {isIt
            ? "Raccontaci il tuo progetto — ti risponderemo entro 24 ore."
            : "Tell us about your project — we'll get back to you within 24 hours."}
        </p>
        <HubSpotForm portalId="IL_TUO_PORTAL_ID" formId="IL_TUO_FORM_ID" />
      </div>
    </section>
  );
}
