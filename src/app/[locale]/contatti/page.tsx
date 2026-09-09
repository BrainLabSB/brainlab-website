import HubSpotForm from "@/components/HubSpotForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact | Brainlab" };

export default async function ContattiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isIt = locale === "it";
  return (
    <section style={{ minHeight: "100vh", background: "#fff", padding: "9rem 3rem 6rem" }}>
      <div style={{ maxWidth: "640px", margin: "0 auto" }}>
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
        <HubSpotForm portalId="20044910" formId="92562939-76c9-404f-86df-62d138e44864" />
      </div>
    </section>
  );
}
