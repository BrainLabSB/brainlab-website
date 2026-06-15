import { client } from "../../../../sanity/lib/client";
import { modelsPageQuery } from "../../../../sanity/lib/queries";
import { type Locale } from "@/lib/translations";
import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import type { Metadata } from "next";
import { buildAlternates, buildOpenGraph, twitterCard } from "@/lib/seo";

export const revalidate = 60;

interface Model {
  title: string;
  description: string;
  ideal: string;
  includes?: string[];
  notFor?: string[];
  tags?: string[];
}
interface ModelsPageData {
  hero?: { tag?: string; title?: string; subtitle?: string };
  models?: Model[];
  faqs?: { question: string; answer: string }[];
  seoTitle?: string;
  seoDescription?: string;
}

const fallback = {
  en: {
    hero: {
      tag: "Engagement models",
      title: "Your terms.\nOur execution.",
      subtitle: "Two ways to work together — structured around your goals, your team, and your timeline.",
    },
    models: [
      {
        title: "Total Outsourcing",
        description: "We take full ownership of the project — from concept to production. You define the business goals and success metrics; we handle strategy, design, engineering, and delivery. No need for an internal AI team: we become your dedicated AI unit for the duration of the engagement.",
        ideal: "Ideal for companies that need to move fast, want a working product without building internal capacity, or are entering AI for the first time.",
        includes: [
          "Dedicated project team (PM, AI engineer, designer)",
          "Weekly syncs and async progress updates",
          "Full technical ownership and infrastructure",
          "QA, testing, and production deployment",
          "Structured handover with documentation",
          "Optional post-launch monitoring retainer",
        ],
        notFor: [
          "Companies that want to retain full day-to-day control of the build",
          "Projects requiring deep integration with internal dev teams",
        ],
        tags: ["Full ownership", "Dedicated team", "End-to-end", "Fast to start"],
      },
      {
        title: "Co-sourcing",
        description: "We embed within your existing team — working alongside your developers, product managers, and domain experts. We bring AI expertise and accelerate delivery while your team retains ownership of the codebase and the product decisions. Knowledge transfer is a core output: your team learns as we build.",
        ideal: "Ideal for companies with an internal tech team that want to add AI capabilities without hiring dedicated AI specialists, or that want to build long-term internal competence.",
        includes: [
          "AI engineers embedded in your team's workflow",
          "Access to our full model, tooling, and architecture expertise",
          "Shared codebase and version control",
          "Pair programming and internal training sessions",
          "Architecture reviews and technical guidance",
          "Flexible engagement — scale up or down by sprint",
        ],
        notFor: [
          "Companies without any internal technical resources",
          "Projects with very short, fixed timelines requiring rapid delivery",
        ],
        tags: ["Embedded team", "Knowledge transfer", "Shared ownership", "Flexible"],
      },
    ],
    faqs: [
      { question: "Can we switch models mid-project?", answer: "Yes. Some clients start with total outsourcing to move fast, then transition to co-sourcing as their internal team builds familiarity. We plan the transition explicitly so nothing is lost." },
      { question: "How do you price each model?", answer: "Total outsourcing is typically priced as a fixed-scope project or a monthly retainer. Co-sourcing is priced per embedded engineer or as a sprint-based engagement. We share a detailed proposal after the initial scoping call." },
      { question: "What does the onboarding process look like?", answer: "Both models start with a 1–2 week discovery phase: we review your context, data, tools, and goals. From there we produce a scoped plan before any engineering begins." },
      { question: "How many projects can you run in parallel?", answer: "We keep our client portfolio intentionally small. We never run more concurrent engagements than we can staff with senior people — quality over volume." },
      { question: "Do you sign NDAs?", answer: "Always, before any scoping conversation. IP produced during the engagement belongs to the client by default." },
    ],
    includesLabel: "What's included",
    notForLabel: "Not the right fit if",
    faqTitle: "Questions about how we engage.",
    cta: "Start a project",
  },
  it: {
    hero: {
      tag: "Modelli di ingaggio",
      title: "Le tue condizioni.\nLa nostra execution.",
      subtitle: "Due modi di lavorare insieme — strutturati intorno ai tuoi obiettivi, al tuo team e alla tua timeline.",
    },
    models: [
      {
        title: "Total Outsourcing",
        description: "Ci prendiamo piena responsabilità del progetto — dal concept alla produzione. Tu definisci gli obiettivi di business e le metriche di successo; noi gestiamo strategia, design, engineering e delivery. Non serve un team AI interno: diventiamo la tua unità AI dedicata per la durata dell'ingaggio.",
        ideal: "Ideale per aziende che devono muoversi velocemente, che vogliono un prodotto funzionante senza costruire capacità interne, o che si affacciano all'AI per la prima volta.",
        includes: [
          "Team di progetto dedicato (PM, AI engineer, designer)",
          "Sync settimanali e aggiornamenti async continuativi",
          "Ownership tecnica completa e gestione infrastruttura",
          "QA, testing e deploy in produzione",
          "Handover strutturato con documentazione completa",
          "Retainer opzionale di monitoring post-lancio",
        ],
        notFor: [
          "Aziende che vogliono mantenere il controllo operativo quotidiano del build",
          "Progetti che richiedono integrazione profonda con team di sviluppo interni",
        ],
        tags: ["Full ownership", "Team dedicato", "End-to-end", "Veloce da avviare"],
      },
      {
        title: "Co-sourcing",
        description: "Ci integriamo nel tuo team esistente — lavorando fianco a fianco con i tuoi sviluppatori, product manager ed esperti di dominio. Portiamo expertise AI e acceleriamo la delivery mentre il tuo team mantiene ownership della codebase e delle decisioni di prodotto. Il knowledge transfer è un output strutturato: il tuo team impara mentre costruiamo.",
        ideal: "Ideale per aziende con un team tecnico interno che vogliono aggiungere capacità AI senza assumere specialisti dedicati, o che vogliono costruire competenza interna duratura.",
        includes: [
          "AI engineer embedded nel workflow del tuo team",
          "Accesso alla nostra expertise completa su modelli, tooling e architettura",
          "Codebase condivisa e version control integrato",
          "Pair programming e sessioni di formazione interna",
          "Architecture review e guida tecnica continua",
          "Ingaggio flessibile — scala su o giù per sprint",
        ],
        notFor: [
          "Aziende senza risorse tecniche interne",
          "Progetti con timeline fisse e brevi che richiedono delivery rapida",
        ],
        tags: ["Team embedded", "Knowledge transfer", "Ownership condivisa", "Flessibile"],
      },
    ],
    faqs: [
      { question: "Possiamo cambiare modello a metà progetto?", answer: "Sì. Alcuni clienti iniziano in total outsourcing per muoversi velocemente, poi transitano al co-sourcing man mano che il team interno acquisisce familiarità. Pianifichiamo la transizione esplicitamente così non si perde nulla." },
      { question: "Come vengono prezzati i due modelli?", answer: "Il total outsourcing viene tipicamente prezzato come progetto a scope fisso o come retainer mensile. Il co-sourcing viene prezzato per engineer embedded o come ingaggio sprint-based. Condividiamo una proposta dettagliata dopo la call di scoping iniziale." },
      { question: "Come funziona l'onboarding?", answer: "Entrambi i modelli partono da una fase di discovery di 1–2 settimane: analizziamo il tuo contesto, dati, tool e obiettivi. Da lì produciamo un piano con scope definito prima che inizi qualsiasi engineering." },
      { question: "Quanti progetti gestite in parallelo?", answer: "Manteniamo il nostro portfolio clienti intenzionalmente piccolo. Non gestiamo mai più ingaggi concorrenti di quanti ne possiamo presidiare con persone senior — qualità prima del volume." },
      { question: "Firmate NDA?", answer: "Sempre, prima di qualsiasi conversazione di scoping. L'IP prodotto durante l'ingaggio appartiene al cliente per default." },
    ],
    includesLabel: "Cosa include",
    notForLabel: "Non è adatto se",
    faqTitle: "Domande su come lavoriamo insieme.",
    cta: "Inizia un progetto",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const l = locale === "it" ? "it" : "en";
  const data: ModelsPageData = await client.fetch(modelsPageQuery).catch(() => null);
  const title = data?.seoTitle ?? (l === "it" ? "Modelli di ingaggio | Brainlab" : "Engagement Models | Brainlab");
  const description = data?.seoDescription ?? fallback[l].hero.subtitle;
  return {
    title,
    description,
    alternates: buildAlternates(l, "modelli"),
    openGraph: buildOpenGraph(l, title, description, "modelli"),
    twitter: twitterCard,
  };
}

export default async function ModelliPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = (locale === "it" ? "it" : "en") as Locale;
  const f = fallback[l];

  const data: ModelsPageData = await client.fetch(modelsPageQuery).catch(() => null);
  const hero   = data?.hero ?? f.hero;
  const models = (data?.models?.length ?? 0) > 0 ? data!.models! : f.models;
  const faqs   = (data?.faqs?.length   ?? 0) > 0 ? data!.faqs!   : f.faqs;

  const themes = ["section-light", "section-dark"] as const;

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

      {/* ── MODELS ── */}
      {models.map((model, i) => {
        const isLight = i % 2 === 0;
        const text    = isLight ? "var(--light-text)"     : "var(--dark-text)";
        const textSec = isLight ? "var(--light-text-sec)" : "var(--dark-text-sec)";
        const border  = isLight ? "var(--light-border)"   : "var(--dark-border)";
        const bgCard  = isLight ? "var(--light-card)"     : "var(--dark-card)";
        const bgPill  = isLight ? "var(--primary-light)"  : "rgba(0,110,183,0.12)";

        return (
          <section key={model.title} className={themes[i % 2]}>
            <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
              {/* Header */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "3rem", marginBottom: "3rem", flexWrap: "wrap" }}>
                <div style={{ flex: "1 1 480px" }}>
                  <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--primary)", display: "block", marginBottom: "0.75rem" }}>
                    {`0${i + 1}`}
                  </span>
                  <h2 style={{ fontSize: "clamp(1.9rem,3vw,2.8rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.08, color: text, marginBottom: "1.25rem" }}>
                    {model.title}
                  </h2>
                  <p style={{ fontSize: "0.95rem", color: textSec, lineHeight: 1.75, fontWeight: 300, maxWidth: 560 }}>
                    {model.description}
                  </p>
                </div>
                {model.ideal && (
                  <div style={{ flex: "0 0 320px", padding: "1.5rem", borderRadius: "var(--radius)", background: bgPill, border: "1px solid rgba(0,110,183,0.2)" }}>
                    <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--primary)", marginBottom: "0.6rem" }}>
                      {l === "it" ? "Ideale per" : "Ideal for"}
                    </p>
                    <p style={{ fontSize: "0.88rem", color: "var(--primary)", lineHeight: 1.6, fontWeight: 400 }}>
                      {model.ideal}
                    </p>
                  </div>
                )}
              </div>

              {/* Includes / Not for */}
              <div style={{ display: "grid", gridTemplateColumns: model.notFor?.length ? "1fr 1fr" : "1fr", gap: "1.5rem" }}>
                {model.includes && model.includes.length > 0 && (
                  <div style={{ padding: "2rem", borderRadius: "var(--radius)", background: bgCard, border: `1px solid ${border}` }}>
                    <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--primary)", marginBottom: "1.25rem" }}>
                      {f.includesLabel}
                    </p>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      {model.includes.map((item, j) => (
                        <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", fontSize: "0.88rem", color: textSec, lineHeight: 1.5 }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {model.notFor && model.notFor.length > 0 && (
                  <div style={{ padding: "2rem", borderRadius: "var(--radius)", background: bgCard, border: `1px solid ${border}` }}>
                    <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--dark-text-muted)", marginBottom: "1.25rem" }}>
                      {f.notForLabel}
                    </p>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      {model.notFor.map((item, j) => (
                        <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", fontSize: "0.88rem", color: textSec, lineHeight: 1.5 }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 2, opacity: 0.4 }}>
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Tags */}
              {model.tags && model.tags.length > 0 && (
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "2rem" }}>
                  {model.tags.map((tag, j) => (
                    <span key={j} style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", padding: "0.3rem 0.75rem", borderRadius: "var(--radius-pill)", background: bgPill, border: "1px solid rgba(0,110,183,0.2)", color: "var(--primary)" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </section>
        );
      })}

      {/* ── FAQ ── */}
      <section className="section-dark">
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 3rem" }}>
          <div className="section-tag">FAQ</div>
          <h2 className="section-title" style={{ marginBottom: "3rem" }}>{f.faqTitle}</h2>
          <FaqAccordion items={faqs} />
          <div style={{ marginTop: "3rem", display: "flex", justifyContent: "center" }}>
            <Link href={`/${l}#contatti`} className="btn-primary">
              {f.cta}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 7h12M8 2l5 5-5 5"/></svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
