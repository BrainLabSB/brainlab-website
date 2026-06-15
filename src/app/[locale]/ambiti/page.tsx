import { client } from "../../../../sanity/lib/client";
import { domainsPageQuery } from "../../../../sanity/lib/queries";
import { type Locale } from "@/lib/translations";
import type { Metadata } from "next";
import { buildAlternates, buildOpenGraph, twitterCard } from "@/lib/seo";

export const revalidate = 60;

interface Domain {
  title: string;
  description: string;
  useCases?: string[];
  tools?: string[];
  tags?: string[];
}
interface DomainsPageData {
  hero?: { tag?: string; title?: string; subtitle?: string };
  domains?: Domain[];
  seoTitle?: string;
  seoDescription?: string;
}

const fallback = {
  en: {
    hero: { tag: "Application domains", title: "Generative AI,\napplied where it matters.", subtitle: "We build across industries — wherever generative AI can create real competitive advantage." },
    domains: [
      {
        title: "Sales & Marketing",
        description: "Generative AI is rewriting the rules of B2B and B2C growth. We build AI agents that handle lead generation, content production at scale, campaign optimization, and customer intelligence — moving from manual effort to systematic, measurable outcomes. From automated outreach sequences to personalized customer journeys powered by LLMs, we build systems that compound over time.",
        useCases: ["AI-powered lead qualification and scoring", "Automated personalized outreach at scale", "Content generation for SEO, ads, and email", "Customer segmentation and churn prediction", "Sales copilot for CRM enrichment and follow-up", "Campaign optimization with real-time feedback loops"],
        tools: ["Claude", "Gemini", "OpenAI GPT-4o", "LangChain", "HubSpot API", "Google Ads API", "Pinecone", "n8n"],
        tags: ["Content generation", "Lead scoring", "Sales copilot", "Campaign AI"],
      },
      {
        title: "Finance & Risk",
        description: "Financial operations generate enormous volumes of unstructured data — contracts, reports, regulatory filings, audit trails. We build AI systems that extract, classify, and analyze this data automatically, reducing manual review time and improving accuracy. From compliance automation to intelligent risk dashboards, we bring production-grade AI to financial workflows.",
        useCases: ["Automated extraction from contracts and invoices", "Regulatory compliance monitoring and alerting", "Risk analysis and portfolio intelligence", "AI-powered financial reporting and summaries", "Fraud detection and anomaly identification", "KYC/AML document processing"],
        tools: ["Claude", "Gemini", "OpenAI GPT-4o", "Azure Document Intelligence", "LangChain", "Python", "PostgreSQL", "Power BI"],
        tags: ["Document AI", "Compliance", "Risk analysis", "Reporting"],
      },
      {
        title: "Operations & Process",
        description: "The most valuable AI applications are often internal — tools that make your team dramatically more effective. We build workflow automation, intelligent routing systems, knowledge bases, and AI copilots that reduce friction in daily operations. Whether it's a RAG-powered assistant trained on your company docs or an intelligent ticket triage system, we build tools that teams actually use.",
        useCases: ["RAG-powered internal knowledge assistant", "Intelligent ticket routing and triage", "Automated workflow orchestration", "Meeting summarization and action extraction", "HR onboarding and policy Q&A bot", "Supply chain monitoring with AI alerts"],
        tools: ["Claude", "Gemini", "OpenAI GPT-4o", "LangChain", "Pinecone", "Supabase", "n8n", "Slack API"],
        tags: ["Workflow AI", "Knowledge base", "Internal tools", "RAG"],
      },
      {
        title: "Product & SaaS",
        description: "Building AI-native products requires a different approach than adding AI features to existing software. We design and build from scratch — validating the market, architecting the system, and shipping production-ready MVPs. We treat your product as if it were ours: obsessing over user experience, performance, and scalability from day one.",
        useCases: ["AI-native SaaS MVP from zero to launch", "LLM integration in existing product", "Intelligent search and recommendation engines", "Conversational UI and chatbot products", "AI-powered analytics and insights features", "Multi-tenant AI infrastructure design"],
        tools: ["Claude", "Gemini", "OpenAI GPT-4o", "Next.js", "Supabase", "LangChain", "Stripe", "Vercel"],
        tags: ["MVP", "Product design", "LLM integration", "Scale"],
      },
    ],
    useCasesLabel: "Use cases",
    toolsLabel: "Tools & stack",
    cta: "Start a project",
  },
  it: {
    hero: { tag: "Ambiti applicativi", title: "AI generativa,\ndove conta davvero.", subtitle: "Costruiamo in tutti i settori — ovunque l'AI generativa crei un vantaggio competitivo reale." },
    domains: [
      {
        title: "Sales & Marketing",
        description: "L'AI generativa sta riscrivendo le regole della crescita B2B e B2C. Costruiamo agenti AI che gestiscono lead generation, produzione di contenuti in scala, ottimizzazione delle campagne e customer intelligence — passando dall'effort manuale a outcome sistematici e misurabili. Dall'outreach automatizzato ai customer journey personalizzati da LLM, costruiamo sistemi che si compongono nel tempo.",
        useCases: ["Qualificazione e scoring dei lead con AI", "Outreach personalizzato automatizzato in scala", "Generazione di contenuti per SEO, ads ed email", "Segmentazione clienti e previsione churn", "Sales copilot per arricchimento CRM e follow-up", "Ottimizzazione campagne con feedback loop in tempo reale"],
        tools: ["Claude", "Gemini", "OpenAI GPT-4o", "LangChain", "HubSpot API", "Google Ads API", "Pinecone", "n8n"],
        tags: ["Content generation", "Lead scoring", "Sales copilot", "Campaign AI"],
      },
      {
        title: "Finance & Risk",
        description: "Le operazioni finanziarie generano enormi volumi di dati non strutturati — contratti, report, filing normativi, audit trail. Costruiamo sistemi AI che estraggono, classificano e analizzano questi dati automaticamente, riducendo il tempo di revisione manuale e migliorando la precisione. Dall'automazione della compliance ai dashboard di rischio intelligenti, portiamo AI production-grade nei workflow finanziari.",
        useCases: ["Estrazione automatizzata da contratti e fatture", "Monitoraggio compliance normativa e alerting", "Analisi del rischio e portfolio intelligence", "Report finanziari e sommari AI-powered", "Rilevamento frodi e identificazione anomalie", "Elaborazione documenti KYC/AML"],
        tools: ["Claude", "Gemini", "OpenAI GPT-4o", "Azure Document Intelligence", "LangChain", "Python", "PostgreSQL", "Power BI"],
        tags: ["Document AI", "Compliance", "Risk analysis", "Reporting"],
      },
      {
        title: "Operations & Process",
        description: "Le applicazioni AI più preziose sono spesso interne — strumenti che rendono il tuo team drasticamente più efficace. Costruiamo automazione dei workflow, sistemi di routing intelligente, knowledge base e AI copilot che riducono l'attrito nelle operazioni quotidiane. Che sia un assistente RAG addestrato sui tuoi documenti aziendali o un sistema di triage ticket intelligente, costruiamo tool che i team usano davvero.",
        useCases: ["Assistente knowledge interno RAG-powered", "Routing e triage ticket intelligente", "Orchestrazione workflow automatizzata", "Sintesi riunioni ed estrazione azioni", "Bot Q&A per HR, onboarding e policy", "Monitoring supply chain con alert AI"],
        tools: ["Claude", "Gemini", "OpenAI GPT-4o", "LangChain", "Pinecone", "Supabase", "n8n", "Slack API"],
        tags: ["Workflow AI", "Knowledge base", "Internal tools", "RAG"],
      },
      {
        title: "Product & SaaS",
        description: "Costruire prodotti AI-native richiede un approccio diverso dall'aggiungere feature AI a software esistente. Progettiamo e costruiamo da zero — validando il mercato, progettando l'architettura e rilasciando MVP production-ready. Trattiamo il tuo prodotto come se fosse il nostro: ossessionati da UX, performance e scalabilità dal primo giorno.",
        useCases: ["SaaS AI-native da zero al lancio", "Integrazione LLM in prodotto esistente", "Motori di ricerca e raccomandazione intelligenti", "Prodotti conversazionali e chatbot", "Feature di analytics e insight AI-powered", "Progettazione infrastruttura AI multi-tenant"],
        tools: ["Claude", "Gemini", "OpenAI GPT-4o", "Next.js", "Supabase", "LangChain", "Stripe", "Vercel"],
        tags: ["MVP", "Product design", "LLM integration", "Scale"],
      },
    ],
    useCasesLabel: "Casi d'uso",
    toolsLabel: "Tool e stack",
    cta: "Inizia un progetto",
  },
};

const domainIcons = ["◈", "◎", "⬡", "◇"];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const l = locale === "it" ? "it" : "en";
  const data: DomainsPageData = await client.fetch(domainsPageQuery).catch(() => null);
  const title = data?.seoTitle ?? (l === "it" ? "Ambiti applicativi AI | Brainlab" : "AI Application Domains | Brainlab");
  const description = data?.seoDescription ?? fallback[l].hero.subtitle;
  return {
    title,
    description,
    alternates: buildAlternates(l, "ambiti"),
    openGraph: buildOpenGraph(l, title, description, "ambiti"),
    twitter: twitterCard,
  };
}

export default async function AmbitiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = (locale === "it" ? "it" : "en") as Locale;
  const f = fallback[l];

  const data: DomainsPageData = await client.fetch(domainsPageQuery).catch(() => null);
  const hero    = data?.hero ?? f.hero;
  const domains = (data?.domains?.length ?? 0) > 0 ? data!.domains! : f.domains;

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

      {/* ── DOMAINS ── */}
      {domains.map((domain, i) => (
        <section key={domain.title} className={i % 2 === 0 ? "section-light" : "section-dark"}>
          <div className="r-2col" style={{ maxWidth: "var(--container)", margin: "0 auto" }}>

            {/* Left: title + description + tags */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                <span style={{ fontSize: "1.4rem", opacity: 0.4 }}>{domainIcons[i]}</span>
                <span className="section-tag" style={{ margin: 0 }}>{`0${i + 1}`}</span>
              </div>
              <h2 style={{ fontSize: "clamp(1.6rem,2.5vw,2.2rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.15, color: i % 2 === 0 ? "var(--light-text)" : "var(--dark-text)", marginBottom: "1.25rem" }}>
                {domain.title}
              </h2>
              <p style={{ fontSize: "0.93rem", color: i % 2 === 0 ? "var(--light-text-sec)" : "var(--dark-text-sec)", lineHeight: 1.75, fontWeight: 300, marginBottom: "1.75rem" }}>
                {domain.description}
              </p>
              {domain.tags && domain.tags.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {domain.tags.map((tag, j) => (
                    <span key={j} style={{
                      fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.05em",
                      textTransform: "uppercase", padding: "0.3rem 0.75rem",
                      borderRadius: "var(--radius-pill)",
                      background: i % 2 === 0 ? "var(--primary-light)" : "rgba(0,110,183,0.12)",
                      border: "1px solid rgba(0,110,183,0.2)",
                      color: "var(--primary)",
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Right: use cases + tools */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {domain.useCases && domain.useCases.length > 0 && (
                <div>
                  <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--primary)", marginBottom: "1rem" }}>
                    {f.useCasesLabel}
                  </p>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    {domain.useCases.map((uc, j) => (
                      <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", fontSize: "0.88rem", color: i % 2 === 0 ? "var(--light-text-sec)" : "var(--dark-text-sec)", lineHeight: 1.5 }}>
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--primary)", opacity: 0.7, flexShrink: 0, marginTop: "0.45rem", display: "inline-block" }} />
                        {uc}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {domain.tools && domain.tools.length > 0 && (
                <div>
                  <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--primary)", marginBottom: "1rem" }}>
                    {f.toolsLabel}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {domain.tools.map((tool, j) => (
                      <span key={j} style={{
                        fontSize: "0.75rem", fontWeight: 500,
                        padding: "0.35rem 0.8rem",
                        borderRadius: "var(--radius-sm)",
                        background: i % 2 === 0 ? "var(--light-bg)" : "var(--dark-elevated)",
                        border: `1px solid ${i % 2 === 0 ? "var(--light-border)" : "var(--dark-border)"}`,
                        color: i % 2 === 0 ? "var(--light-text-sec)" : "var(--dark-text-sec)",
                      }}>
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
