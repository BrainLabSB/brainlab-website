import { client } from "../../../../sanity/lib/client";
import { processPageQuery } from "../../../../sanity/lib/queries";
import { type Locale } from "@/lib/translations";
import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import type { Metadata } from "next";
import { buildAlternates, buildOpenGraph, twitterCard } from "@/lib/seo";

export const revalidate = 60;

interface ProcessPageData {
  hero?: { tag?: string; title?: string; subtitle?: string };
  steps?: { num: string; name: string; title: string; summary: string; outputs?: string[] }[];
  models?: { title: string; desc: string; ideal: string; tags?: string[] }[];
  faqs?: { question: string; answer: string }[];
  seoTitle?: string;
  seoDescription?: string;
}

const fallback = {
  en: {
    hero: { tag: "How we work", title: "Your project.\nOur engine.", subtitle: "We integrate with your team or take full ownership — from concept to production, in weeks." },
    steps: [
      { num: "01", name: "Concept", title: "Define the opportunity", summary: "We analyze your business context, identify high-impact AI opportunities, and define a clear project scope together.", outputs: ["AI opportunity map", "Project brief", "Success metrics"] },
      { num: "02", name: "Prototype", title: "Build fast, learn faster", summary: "Rapid, working prototypes tested with real data, real models, and your team's feedback before scaling up.", outputs: ["Working prototype", "Validation report", "Iteration plan"] },
      { num: "03", name: "Craft", title: "Engineering for production", summary: "Production-grade engineering — prompt design, model optimization, UX refinement, and infrastructure that scales.", outputs: ["Production-ready system", "Technical documentation", "Performance benchmarks"] },
      { num: "04", name: "Deliver", title: "Ship, monitor, iterate", summary: "We ship, monitor, and iterate. Full handover or ongoing management — you choose the model that works for you.", outputs: ["Live deployment", "Monitoring setup", "Handover or retainer"] },
    ],
    models: [
      { title: "Total Outsourcing", desc: "We own the entire project — concept, design, engineering, and delivery. You define the goals, we build the solution.", ideal: "Ideal when you need speed and don't have an internal AI team.", tags: ["Full ownership", "Dedicated team", "End-to-end"] },
      { title: "Co-sourcing", desc: "We embed within your team — bringing AI expertise while you retain control and internal knowledge.", ideal: "Ideal when you have internal resources and want to build lasting AI capabilities.", tags: ["Embedded team", "Knowledge transfer", "Shared ownership"] },
    ],
    faqs: [
      { question: "How long does a typical project take?", answer: "Most projects go from kick-off to first production deployment in 6–12 weeks. We always aim for a working MVP within the first 4 weeks." },
      { question: "Do we need an internal AI team to work with you?", answer: "No. In total outsourcing mode, you only need to provide business context and feedback. In co-sourcing, your team participates actively." },
      { question: "How do you handle data privacy and confidentiality?", answer: "We sign NDAs before any project kick-off. Data is processed only on agreed infrastructure, and we follow GDPR guidelines throughout." },
      { question: "What happens after the project is delivered?", answer: "We offer ongoing monitoring and iteration retainers, plus a structured handover with documentation and training." },
      { question: "Can you work with our existing tech stack?", answer: "Yes. We adapt to your environment — cloud provider, existing APIs, internal tools. We don't lock you into proprietary infrastructure." },
    ],
    modelsTag: "Engagement models",
    modelsTitle: "Two ways to work together.",
    faqTitle: "Common questions.",
    cta: "Start a project",
  },
  it: {
    hero: { tag: "Come lavoriamo", title: "Il tuo progetto.\nIl nostro motore.", subtitle: "Ci integriamo nel tuo team o prendiamo piena responsabilità — dal concept alla produzione, in settimane." },
    steps: [
      { num: "01", name: "Concept", title: "Definire l'opportunità", summary: "Analizziamo il tuo contesto di business, identifichiamo le opportunità AI ad alto impatto e definiamo insieme un perimetro chiaro.", outputs: ["Mappa delle opportunità AI", "Project brief", "Metriche di successo"] },
      { num: "02", name: "Prototype", title: "Costruire veloce, imparare più veloce", summary: "Prototipi funzionanti testati con dati reali, modelli reali e il feedback del tuo team prima di scalare.", outputs: ["Prototipo funzionante", "Report di validazione", "Piano di iterazione"] },
      { num: "03", name: "Craft", title: "Engineering per la produzione", summary: "Engineering production-grade — prompt design, ottimizzazione modelli, UX refinement e infrastruttura che scala.", outputs: ["Sistema production-ready", "Documentazione tecnica", "Benchmark di performance"] },
      { num: "04", name: "Deliver", title: "Rilasciare, monitorare, iterare", summary: "Consegniamo, monitoriamo e iteriamo. Handover completo o gestione continuativa — scegli il modello che funziona per te.", outputs: ["Deploy in produzione", "Setup monitoring", "Handover o retainer"] },
    ],
    models: [
      { title: "Total Outsourcing", desc: "Siamo proprietari dell'intero progetto — concept, design, engineering e delivery. Tu definisci gli obiettivi, noi costruiamo la soluzione.", ideal: "Ideale quando hai bisogno di velocità e non hai un team AI interno.", tags: ["Full ownership", "Team dedicato", "End-to-end"] },
      { title: "Co-sourcing", desc: "Ci integriamo nel tuo team — portando expertise AI mentre tu mantieni il controllo e la conoscenza interna.", ideal: "Ideale quando hai risorse interne e vuoi costruire capacità AI durature.", tags: ["Team embedded", "Knowledge transfer", "Ownership condivisa"] },
    ],
    faqs: [
      { question: "Quanto dura un progetto tipico?", answer: "La maggior parte dei progetti va dal kick-off al primo deploy in 6–12 settimane. Puntiamo sempre a un MVP funzionante entro le prime 4 settimane." },
      { question: "Serve un team AI interno per lavorare con voi?", answer: "No. In total outsourcing è sufficiente fornire contesto di business e feedback. In co-sourcing il tuo team partecipa attivamente." },
      { question: "Come gestite privacy e riservatezza dei dati?", answer: "Firmiamo NDA prima di qualsiasi kick-off. I dati vengono elaborati solo su infrastruttura concordata e seguiamo le linee guida GDPR." },
      { question: "Cosa succede dopo la consegna?", answer: "Offriamo retainer di monitoring e iterazione continuativa, più un handover strutturato con documentazione e formazione." },
      { question: "Riuscite a lavorare con il nostro stack esistente?", answer: "Sì. Ci adattiamo al vostro ambiente — cloud provider, API esistenti, tool interni. Non vi leghiamo a infrastrutture proprietarie." },
    ],
    modelsTag: "Modelli di ingaggio",
    modelsTitle: "Due modi di lavorare insieme.",
    faqTitle: "Domande frequenti.",
    cta: "Inizia un progetto",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const l = locale === "it" ? "it" : "en";
  const data: ProcessPageData = await client.fetch(processPageQuery).catch(() => null);
  const title = data?.seoTitle ?? (l === "it" ? "Come lavoriamo | Brainlab" : "How we work | Brainlab");
  const description = data?.seoDescription ?? fallback[l].hero.subtitle;
  return {
    title,
    description,
    alternates: buildAlternates(l, "come-lavoriamo"),
    openGraph: buildOpenGraph(l, title, description, "come-lavoriamo"),
    twitter: twitterCard,
  };
}

export default async function ComeLavoriamoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = (locale === "it" ? "it" : "en") as Locale;
  const f = fallback[l];

  const data: ProcessPageData = await client.fetch(processPageQuery).catch(() => null);
  const steps  = (data?.steps?.length  ?? 0) > 0 ? data!.steps!  : f.steps;
  const models = (data?.models?.length ?? 0) > 0 ? data!.models! : f.models;
  const faqs   = (data?.faqs?.length   ?? 0) > 0 ? data!.faqs!   : f.faqs;
  const hero   = data?.hero ?? f.hero;

  return (
    <>
      {/* ── HERO ── */}
      <section className="section-dark section-hero">
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <div className="section-tag">{hero.tag}</div>
          <h1 style={{ fontSize: "clamp(2.4rem,5vw,4rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, margin: "0.75rem 0 1.25rem", color: "var(--dark-text)", whiteSpace: "pre-line" }}>
            {hero.title}
          </h1>
          <p style={{ fontSize: "1.05rem", color: "var(--dark-text-sec)", lineHeight: 1.65, fontWeight: 300, maxWidth: 600 }}>
            {hero.subtitle}
          </p>
        </div>
      </section>

      {/* ── STEPS ── */}
      <section className="section-dark" style={{ paddingTop: "2rem", paddingBottom: "7rem" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 3rem" }}>
          {steps.map((step, i) => (
            <div key={step.num} style={{ display: "grid", gridTemplateColumns: "72px 1fr", gap: "2.5rem", padding: "3.5rem 0", borderBottom: i < steps.length - 1 ? "1px solid var(--dark-border)" : "none" }}>
              <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--primary)", opacity: 0.3, lineHeight: 1, paddingTop: "0.3rem" }}>
                {step.num}
              </div>
              <div>
                <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--primary)", marginBottom: "0.5rem" }}>
                  {step.name}
                </div>
                <h2 style={{ fontSize: "clamp(1.3rem,2.2vw,1.75rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--dark-text)", marginBottom: "0.9rem", lineHeight: 1.2 }}>
                  {step.title}
                </h2>
                <p style={{ fontSize: "0.93rem", color: "var(--dark-text-sec)", lineHeight: 1.7, fontWeight: 300, maxWidth: 560, marginBottom: step.outputs?.length ? "1.25rem" : 0 }}>
                  {step.summary}
                </p>
                {step.outputs && step.outputs.length > 0 && (
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    {step.outputs.map((o, j) => (
                      <li key={j} style={{ fontSize: "0.8rem", color: "var(--dark-text-muted)", display: "flex", alignItems: "center", gap: "0.6rem" }}>
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--primary)", opacity: 0.7, flexShrink: 0, display: "inline-block" }} />
                        {o}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── MODELS ── */}
      <section className="section-light">
        <div className="section-header-row reveal" style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <div>
            <div className="section-tag">{f.modelsTag}</div>
            <h2 className="section-title" style={{ color: "var(--light-text)" }}>{f.modelsTitle}</h2>
          </div>
        </div>
        <div className="r-2col-sm" style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          {models.map((m, i) => (
            <div key={i} style={{ padding: "2.5rem", borderRadius: "var(--radius)", border: "1px solid var(--light-border)", background: "var(--light-card)", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--light-text)", letterSpacing: "-0.02em" }}>{m.title}</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--light-text-sec)", lineHeight: 1.65, fontWeight: 300 }}>{m.desc}</p>
              {m.ideal && (
                <p style={{ fontSize: "0.82rem", color: "var(--primary)", background: "var(--primary-light)", border: "1px solid rgba(0,110,183,0.15)", padding: "0.6rem 0.9rem", borderRadius: "var(--radius-sm)" }}>
                  {m.ideal}
                </p>
              )}
              {m.tags && m.tags.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "auto" }}>
                  {m.tags.map((t, j) => (
                    <span key={j} style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", padding: "0.3rem 0.7rem", borderRadius: "var(--radius-pill)", background: "var(--light-bg)", border: "1px solid var(--light-border)", color: "var(--light-text-sec)" }}>
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-dark">
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 3rem" }}>
          <div className="section-tag">FAQ</div>
          <h2 className="section-title" style={{ marginBottom: "3rem" }}>{f.faqTitle}</h2>
          <FaqAccordion items={faqs} />
          <div style={{ marginTop: "3rem", display: "flex", justifyContent: "center" }}>
            <Link href={`/${l}#contatti`} className="btn-primary">{f.cta}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 7h12M8 2l5 5-5 5"/></svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
