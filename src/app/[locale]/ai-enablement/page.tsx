import { client } from "../../../../sanity/lib/client";
import { enablementPageQuery } from "../../../../sanity/lib/queries";
import { type Locale } from "@/lib/translations";
import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import type { Metadata } from "next";
import { buildAlternates, buildOpenGraph, twitterCard } from "@/lib/seo";

export const revalidate = 60;

interface Program { title: string; description: string; duration?: string; format?: string; outcomes?: string[]; }
interface EnablementData {
  hero?: { tag?: string; title?: string; subtitle?: string };
  intro?: { title?: string; body?: string; stats?: { value: string; label: string }[] };
  programs?: Program[];
  sectors?: string[];
  faqs?: { question: string; answer: string }[];
  seoTitle?: string; seoDescription?: string;
}

const fallback = {
  en: {
    hero: {
      tag: "AI Enablement for SMEs",
      title: "Not just products.\nPeople enabled.",
      subtitle: "Generative AI changes the way people work — but only if they know how to use it. We partner with Italian SMEs on their AI adoption journey.",
    },
    intro: {
      title: "The real bottleneck isn't technology. It's people.",
      body: "Most companies experimenting with AI hit the same wall: the tools are available, but the team doesn't know how to use them effectively. Adoption stalls, ROI is invisible, and AI becomes a checkbox rather than a competitive advantage.\n\nWe work with Italian SMEs to close this gap — not with generic e-learning, but with structured programs built around your industry, your roles, and your actual workflows. The result is a team that uses AI with method and confidence, not trial and error.",
      stats: [
        { value: "74%", label: "of employees feel underprepared to work with AI tools" },
        { value: "3x", label: "higher ROI for companies with structured AI training vs. self-directed learning" },
        { value: "60%", label: "of AI initiatives fail due to lack of user adoption, not technology" },
      ],
    },
    programs: [
      {
        title: "AI Literacy for your team",
        description: "A foundational program for teams with no prior AI experience. We cover what generative AI actually is, what it can and cannot do in your specific sector, how to use it safely and responsibly, and how to evaluate AI outputs critically. Delivered as intensive workshops, tailored to your industry context.",
        duration: "1–2 days",
        format: "In-person or remote workshop",
        outcomes: ["Team aligned on AI fundamentals", "Practical understanding of LLM capabilities and limits", "Shared vocabulary for AI discussions internally", "Awareness of data privacy and responsible use"],
      },
      {
        title: "AI-ready process mapping",
        description: "A structured analysis of your operational flows to identify where AI can create real, measurable impact. We map your current processes, score opportunities by effort and expected return, and produce a prioritized roadmap. This is not a theoretical exercise — every recommendation comes with a concrete implementation path.",
        duration: "1–2 weeks",
        format: "Workshop + consulting",
        outcomes: ["Full map of AI opportunities across your operations", "Prioritized roadmap by impact and feasibility", "Identification of quick wins vs. strategic investments", "Clear scope for any subsequent implementation work"],
      },
      {
        title: "Applied prompt engineering",
        description: "Hands-on training designed for specific roles — sales, marketing, finance, operations, legal, HR. Each session focuses on the actual tasks each role performs, teaching participants how to write prompts that get useful outputs for their real day-to-day work. No generic examples: everything is grounded in your company's context.",
        duration: "Half-day per function",
        format: "Hands-on workshop",
        outcomes: ["Role-specific prompt libraries", "Measurable improvement in AI output quality", "Reduced time spent on manual tasks", "Confidence to experiment independently"],
      },
      {
        title: "Ongoing programs",
        description: "AI evolves every week. Structured ongoing programs with periodic updates, tool reviews, and Q&A sessions ensure your team stays current. Available as monthly or quarterly retainers, these programs keep AI adoption alive past the initial training phase and create a culture of continuous learning.",
        duration: "Monthly or quarterly",
        format: "Recurring sessions + async updates",
        outcomes: ["Team stays current with AI developments", "New tools evaluated and integrated as they emerge", "Internal AI champions identified and developed", "Measurable adoption metrics tracked over time"],
      },
    ],
    sectors: ["Sales & Marketing", "Finance & Administration", "Operations", "Legal & Compliance", "Human Resources", "Customer Service", "Product & Tech", "Executive team"],
    faqs: [
      { question: "Are these programs only for technical teams?", answer: "No — they're designed for non-technical people. The goal is to make AI usable for everyone in the company, from sales reps to finance managers. Technical depth is adjusted based on the audience." },
      { question: "Do you deliver programs remotely or in person?", answer: "Both. Most clients combine in-person kick-off workshops with follow-up sessions delivered remotely. We adapt to your team's location and availability." },
      { question: "How many people can participate at once?", answer: "Workshops work best with 8–20 participants. For larger organizations, we run parallel sessions or cascade the program through team leads who become internal trainers." },
      { question: "What tools do you cover in the training?", answer: "We cover the tools most relevant to your team's work — typically Claude, ChatGPT, Gemini, Perplexity, and sector-specific tools. We don't promote one tool over another; we teach your team to evaluate and choose." },
      { question: "How do you measure the impact of the program?", answer: "We define success metrics at the start with you — adoption rates, time saved on specific tasks, quality of AI outputs. For ongoing programs, we track these monthly and report back." },
    ],
    sectorsLabel: "Who it's for",
    programsLabel: "Our programs",
    aiAct: {
      tag: "EU AI Act",
      title: "The AI Act is here.\nIs your company ready?",
      body: "The European AI Act came into force in August 2024 and is being rolled out in phases through 2027. It's the world's first comprehensive AI regulation — and it directly affects any company that uses, deploys, or develops AI systems within the EU.",
      disclaimer: "This section provides general information only and does not constitute legal advice. We recommend consulting a qualified legal professional for compliance guidance specific to your situation.",
      obligations: [
        { label: "August 2025", title: "Prohibited AI systems banned", desc: "AI systems categorized as unacceptable risk (social scoring, real-time biometric surveillance) become illegal." },
        { label: "August 2026", title: "High-risk AI rules apply", desc: "Strict requirements for high-risk AI in HR, credit scoring, education, and critical infrastructure: transparency, human oversight, documentation." },
        { label: "August 2027", title: "Full enforcement", desc: "All remaining provisions apply, including rules for general-purpose AI models like GPT-4 and Claude." },
      ],
      smeNote: "Most SMEs fall into the limited-risk or minimal-risk categories — but all companies using AI must ensure basic transparency obligations: users must know when they are interacting with AI.",
      howWeHelp: "Our AI Enablement programs build the internal literacy your team needs to use AI responsibly and in compliance with the Act — from understanding what counts as high-risk AI to implementing the transparency requirements that apply to your use cases.",
      cta: "Ask us about AI Act compliance",
    },
    faqTitle: "Questions about AI Enablement.",
    cta: "Talk to us",
  },
  it: {
    hero: {
      tag: "AI Enablement per le PMI",
      title: "Non solo prodotti.\nPersone abilitate.",
      subtitle: "L'AI generativa cambia il modo in cui si lavora — ma solo se le persone sanno usarla. Affianchiamo le PMI italiane nel percorso di adozione.",
    },
    intro: {
      title: "Il vero collo di bottiglia non è la tecnologia. Sono le persone.",
      body: "La maggior parte delle aziende che sperimentano l'AI si scontra con lo stesso muro: gli strumenti ci sono, ma il team non sa usarli efficacemente. L'adozione si blocca, il ROI è invisibile e l'AI diventa un checkbox invece di un vantaggio competitivo.\n\nLavoriamo con le PMI italiane per chiudere questo gap — non con e-learning generici, ma con programmi strutturati costruiti sul tuo settore, sui tuoi ruoli e sui tuoi workflow reali. Il risultato è un team che usa l'AI con metodo e fiducia, non per tentativi.",
      stats: [
        { value: "74%", label: "dei dipendenti si sente impreparato a lavorare con strumenti AI" },
        { value: "3x", label: "ROI più alto per le aziende con formazione AI strutturata vs. apprendimento autonomo" },
        { value: "60%", label: "delle iniziative AI fallisce per mancanza di adozione, non per problemi tecnologici" },
      ],
    },
    programs: [
      {
        title: "AI Literacy per il team",
        description: "Un programma fondazionale per team senza esperienza AI precedente. Copriamo cosa è davvero l'AI generativa, cosa può e non può fare nel tuo settore specifico, come usarla in sicurezza e con responsabilità, e come valutare criticamente gli output AI. Erogato come workshop intensivi, su misura per il tuo contesto di settore.",
        duration: "1–2 giorni",
        format: "Workshop in presenza o da remoto",
        outcomes: ["Team allineato sui fondamentali AI", "Comprensione pratica di capacità e limiti degli LLM", "Vocabolario condiviso per le discussioni interne sull'AI", "Consapevolezza su privacy dei dati e uso responsabile"],
      },
      {
        title: "Mappatura processi AI-ready",
        description: "Un'analisi strutturata dei tuoi flussi operativi per identificare dove l'AI può creare impatto reale e misurabile. Mappiamo i tuoi processi attuali, valutiamo le opportunità per sforzo e ritorno atteso e produciamo una roadmap prioritizzata. Non è un esercizio teorico — ogni raccomandazione viene con un percorso di implementazione concreto.",
        duration: "1–2 settimane",
        format: "Workshop + consulenza",
        outcomes: ["Mappa completa delle opportunità AI nelle operazioni", "Roadmap prioritizzata per impatto e fattibilità", "Identificazione di quick win vs. investimenti strategici", "Perimetro chiaro per eventuali lavori di implementazione successivi"],
      },
      {
        title: "Prompt engineering applicato",
        description: "Formazione hands-on progettata per ruoli specifici — sales, marketing, finance, operations, legal, HR. Ogni sessione si concentra sui task reali che ogni ruolo svolge, insegnando ai partecipanti come scrivere prompt che ottengono output utili per il loro lavoro quotidiano concreto. Nessun esempio generico: tutto è radicato nel contesto della tua azienda.",
        duration: "Mezza giornata per funzione",
        format: "Workshop hands-on",
        outcomes: ["Librerie di prompt specifiche per ruolo", "Miglioramento misurabile nella qualità degli output AI", "Tempo ridotto sui task manuali", "Fiducia nel sperimentare autonomamente"],
      },
      {
        title: "Programmi continuativi",
        description: "L'AI evolve ogni settimana. Programmi continuativi strutturati con aggiornamenti periodici, review di nuovi tool e sessioni Q&A garantiscono che il tuo team resti aggiornato. Disponibili come retainer mensili o trimestrali, questi programmi mantengono viva l'adozione AI oltre la fase iniziale di formazione e creano una cultura di apprendimento continuo.",
        duration: "Mensile o trimestrale",
        format: "Sessioni ricorrenti + aggiornamenti async",
        outcomes: ["Team aggiornato sulle evoluzioni AI", "Nuovi tool valutati e integrati man mano che emergono", "AI champion interni identificati e sviluppati", "Metriche di adozione misurate nel tempo"],
      },
    ],
    sectors: ["Sales & Marketing", "Finance & Amministrazione", "Operations", "Legal & Compliance", "Human Resources", "Customer Service", "Product & Tech", "Executive team"],
    faqs: [
      { question: "Questi programmi sono solo per team tecnici?", answer: "No — sono progettati per persone non tecniche. L'obiettivo è rendere l'AI usabile da tutti in azienda, dal commerciale al responsabile finance. La profondità tecnica viene calibrata in base al pubblico." },
      { question: "I programmi vengono erogati in presenza o da remoto?", answer: "Entrambi. La maggior parte dei clienti combina workshop di kick-off in presenza con sessioni di follow-up da remoto. Ci adattiamo alla sede e alla disponibilità del tuo team." },
      { question: "Quante persone possono partecipare contemporaneamente?", answer: "I workshop funzionano meglio con 8–20 partecipanti. Per organizzazioni più grandi, gestiamo sessioni parallele o cassiamo il programma attraverso i team lead che diventano formatori interni." },
      { question: "Quali tool coprite nella formazione?", answer: "Copriamo i tool più rilevanti per il lavoro del tuo team — tipicamente Claude, ChatGPT, Gemini, Perplexity e tool specifici per settore. Non promuoviamo un tool rispetto a un altro: insegniamo al tuo team a valutare e scegliere." },
      { question: "Come misurate l'impatto del programma?", answer: "Definiamo le metriche di successo all'inizio con te — tassi di adozione, tempo risparmiato su task specifici, qualità degli output AI. Per i programmi continuativi, le monitoriamo mensilmente e rendicontiamo." },
    ],
    sectorsLabel: "A chi è rivolto",
    programsLabel: "I nostri programmi",
    aiAct: {
      tag: "EU AI Act",
      title: "L'AI Act è legge.\nLa tua azienda è pronta?",
      body: "Il Regolamento europeo sull'AI (EU AI Act) è entrato in vigore nell'agosto 2024 e viene applicato in fasi fino al 2027. È la prima normativa completa sull'AI al mondo — e riguarda direttamente qualsiasi azienda che usa, distribuisce o sviluppa sistemi AI nell'Unione Europea.",
      disclaimer: "Questa sezione fornisce informazioni di carattere generale e non costituisce consulenza legale. Ti raccomandiamo di consultare un professionista legale qualificato per una guida alla compliance specifica alla tua situazione.",
      obligations: [
        { label: "Agosto 2025", title: "Sistemi AI vietati", desc: "I sistemi AI classificati come rischio inaccettabile (social scoring, sorveglianza biometrica in tempo reale) diventano illegali." },
        { label: "Agosto 2026", title: "Regole per AI ad alto rischio", desc: "Requisiti stringenti per AI ad alto rischio in HR, credit scoring, istruzione e infrastrutture critiche: trasparenza, supervisione umana, documentazione." },
        { label: "Agosto 2027", title: "Enforcement completo", desc: "Si applicano tutte le disposizioni restanti, incluse le regole per i modelli AI general-purpose come GPT-4 e Claude." },
      ],
      smeNote: "La maggior parte delle PMI rientra nelle categorie a rischio limitato o minimo — ma tutte le aziende che usano AI devono garantire obblighi base di trasparenza: gli utenti devono sapere quando interagiscono con un sistema AI.",
      howWeHelp: "I nostri programmi di AI Enablement costruiscono la cultura interna necessaria per usare l'AI in modo responsabile e conforme all'AI Act — dalla comprensione di cosa costituisce AI ad alto rischio all'implementazione dei requisiti di trasparenza applicabili ai vostri use case.",
      cta: "Chiedici dell'AI Act",
    },
    faqTitle: "Domande sull'AI Enablement.",
    cta: "Parla con noi",
  },
};

const programIcons = [
  <svg key="a" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
  <svg key="b" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  <svg key="c" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  <svg key="d" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>,
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const l = locale === "it" ? "it" : "en";
  const data: EnablementData = await client.fetch(enablementPageQuery).catch(() => null);
  const title = data?.seoTitle ?? (l === "it" ? "AI Enablement per le PMI | Brainlab" : "AI Enablement for SMEs | Brainlab");
  const description = data?.seoDescription ?? fallback[l].hero.subtitle;
  return {
    title,
    description,
    alternates: buildAlternates(l, "ai-enablement"),
    openGraph: buildOpenGraph(l, title, description, "ai-enablement"),
    twitter: twitterCard,
  };
}

export default async function AIEnablementPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = (locale === "it" ? "it" : "en") as Locale;
  const f = fallback[l];

  const data: EnablementData = await client.fetch(enablementPageQuery).catch(() => null);
  const hero     = data?.hero     ?? f.hero;
  const intro    = data?.intro    ?? f.intro;
  const programs = (data?.programs?.length ?? 0) > 0 ? data!.programs! : f.programs;
  const sectors  = (data?.sectors?.length  ?? 0) > 0 ? data!.sectors!  : f.sectors;
  const faqs     = (data?.faqs?.length     ?? 0) > 0 ? data!.faqs!     : f.faqs;

  return (
    <>
      {/* ── HERO ── */}
      <section className="section-dark section-hero">
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--primary)", background: "rgba(0,110,183,0.1)", border: "1px solid rgba(0,110,183,0.2)", padding: "0.4rem 0.9rem", borderRadius: "var(--radius-pill)", marginBottom: "1.25rem" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--primary)", display: "inline-block" }} />
            {hero.tag}
          </div>
          <h1 style={{ fontSize: "clamp(3rem,6vw,5rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, margin: "0 0 1.25rem", color: "var(--dark-text)", whiteSpace: "pre-line" }}>
            {hero.title}
          </h1>
          <p style={{ fontSize: "1.05rem", color: "var(--dark-text-sec)", lineHeight: 1.65, fontWeight: 300, maxWidth: 600 }}>
            {hero.subtitle}
          </p>
        </div>
      </section>

      {/* ── INTRO + STATS ── */}
      <section className="section-light">
        <div className="r-2col" style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <div>
            <h2 style={{ fontSize: "clamp(1.5rem,2.5vw,2rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.2, color: "var(--light-text)", marginBottom: "1.5rem" }}>
              {intro.title}
            </h2>
            {intro.body?.split("\n\n").map((para, i) => (
              <p key={i} style={{ fontSize: "0.93rem", color: "var(--light-text-sec)", lineHeight: 1.75, fontWeight: 300, marginBottom: "1rem" }}>
                {para}
              </p>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", paddingTop: "0.5rem" }}>
            {intro.stats?.map((stat, i) => (
              <div key={i} style={{ padding: "1.75rem", borderRadius: "var(--radius)", border: "1px solid var(--light-border)", background: "var(--light-card)" }}>
                <div style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--primary)", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: "0.5rem" }}>
                  {stat.value}
                </div>
                <p style={{ fontSize: "0.82rem", color: "var(--light-text-sec)", lineHeight: 1.5, fontWeight: 300 }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ── */}
      <section className="section-dark">
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <div className="section-tag">{f.sectorsLabel}</div>
          <h2 style={{ fontSize: "clamp(1.6rem,2.5vw,2.2rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--dark-text)", marginBottom: "2rem", lineHeight: 1.15 }}>
            {l === "it" ? "Ogni funzione aziendale può adottare l'AI." : "Every business function can adopt AI."}
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
            {sectors.map((s, i) => (
              <span key={i} style={{ fontSize: "0.82rem", fontWeight: 500, padding: "0.5rem 1.1rem", borderRadius: "var(--radius-pill)", background: "var(--dark-elevated)", border: "1px solid var(--dark-border)", color: "var(--dark-text-sec)" }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>


      {/* ── AI ACT ── */}
      <section className="section-light">
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
            <div className="section-tag" style={{ margin: 0 }}>{f.aiAct.tag}</div>
            <span style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "#b45309", background: "#fef3c7", border: "1px solid #fcd34d", padding: "0.3rem 0.75rem", borderRadius: "var(--radius-pill)" }}>
              {l === "it" ? "In vigore" : "In force"}
            </span>
          </div>
          <div className="r-2col" style={{ marginBottom: "3rem" }}>
            <div>
              <h2 style={{ fontSize: "clamp(1.6rem,2.5vw,2.2rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.15, color: "var(--light-text)", marginBottom: "1.25rem", whiteSpace: "pre-line" }}>
                {f.aiAct.title}
              </h2>
              <p style={{ fontSize: "0.93rem", color: "var(--light-text-sec)", lineHeight: 1.75, fontWeight: 300, marginBottom: "1.5rem" }}>
                {f.aiAct.body}
              </p>
              <div style={{ padding: "1rem 1.25rem", borderRadius: "var(--radius-sm)", background: "#fffbeb", border: "1px solid #fcd34d", fontSize: "0.78rem", color: "#92400e", lineHeight: 1.6 }}>
                ⚠ {f.aiAct.disclaimer}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {f.aiAct.obligations.map((ob: {label: string; title: string; desc: string}, i: number) => (
                <div key={i} style={{ padding: "1.5rem", borderRadius: "var(--radius)", border: "1px solid var(--light-border)", background: "var(--light-card)", display: "grid", gridTemplateColumns: "90px 1fr", gap: "1rem", alignItems: "start" }}>
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--primary)", background: "var(--primary-light)", padding: "0.3rem 0.6rem", borderRadius: "var(--radius-sm)", textAlign: "center", lineHeight: 1.4 }}>
                    {ob.label}
                  </span>
                  <div>
                    <p style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--light-text)", marginBottom: "0.3rem" }}>{ob.title}</p>
                    <p style={{ fontSize: "0.8rem", color: "var(--light-text-sec)", lineHeight: 1.55, fontWeight: 300 }}>{ob.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding: "2rem", borderRadius: "var(--radius)", background: "var(--primary-light)", border: "1px solid rgba(0,110,183,0.2)", display: "grid", gridTemplateColumns: "1fr auto", gap: "2rem", alignItems: "center" }}>
            <div>
              <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--primary)", marginBottom: "0.4rem" }}>
                {l === "it" ? "Per le PMI" : "For SMEs"}
              </p>
              <p style={{ fontSize: "0.88rem", color: "var(--light-text-sec)", lineHeight: 1.6, fontWeight: 300, marginBottom: "0.75rem" }}>{f.aiAct.smeNote}</p>
              <p style={{ fontSize: "0.88rem", color: "var(--light-text-sec)", lineHeight: 1.6, fontWeight: 300 }}>{f.aiAct.howWeHelp}</p>
            </div>
            <Link href={`/${l}#contatti`} className="btn-primary" style={{ whiteSpace: "nowrap", flexShrink: 0 }}>
              {f.aiAct.cta}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 7h12M8 2l5 5-5 5"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── PROGRAMS ── */}
      <section className="section-dark">
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <div className="section-tag">{f.programsLabel}</div>
          <h2 className="section-title" style={{ color: "var(--dark-text)", marginBottom: "3rem" }}>
            {l === "it" ? "Quattro percorsi, un obiettivo." : "Four programs, one goal."}
          </h2>
          <div className="r-2col-sm">
            {programs.map((program, i) => (
              <div key={i} style={{ padding: "2.5rem", borderRadius: "var(--radius)", border: "1px solid var(--light-border)", background: "var(--dark-card)", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div style={{ width: 44, height: 44, borderRadius: "var(--radius-sm)", background: "rgba(0,110,183,0.12)", border: "1px solid rgba(0,110,183,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)" }}>
                  {programIcons[i % 4]}
                </div>
                <div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--dark-text)", letterSpacing: "-0.02em", marginBottom: "0.6rem" }}>
                    {program.title}
                  </h3>
                  <p style={{ fontSize: "0.88rem", color: "var(--dark-text-sec)", lineHeight: 1.7, fontWeight: 300 }}>
                    {program.description}
                  </p>
                </div>
                {(program.duration || program.format) && (
                  <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    {program.duration && (
                      <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--primary)", background: "rgba(0,110,183,0.12)", border: "1px solid rgba(0,110,183,0.15)", padding: "0.3rem 0.75rem", borderRadius: "var(--radius-pill)" }}>
                        ⏱ {program.duration}
                      </span>
                    )}
                    {program.format && (
                      <span style={{ fontSize: "0.72rem", fontWeight: 500, color: "var(--dark-text-sec)", background: "var(--dark-elevated)", border: "1px solid var(--light-border)", padding: "0.3rem 0.75rem", borderRadius: "var(--radius-pill)" }}>
                        {program.format}
                      </span>
                    )}
                  </div>
                )}
                {program.outcomes && program.outcomes.length > 0 && (
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "auto" }}>
                    {program.outcomes.map((o, j) => (
                      <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", fontSize: "0.8rem", color: "var(--dark-text-sec)", lineHeight: 1.45 }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {o}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

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
