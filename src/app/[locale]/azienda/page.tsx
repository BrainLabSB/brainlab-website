import { client } from "../../../../sanity/lib/client";
import { aboutPageQuery } from "../../../../sanity/lib/queries";
import { type Locale } from "@/lib/translations";
import Link from "next/link";
import type { Metadata } from "next";
import { buildAlternates, buildOpenGraph, twitterCard } from "@/lib/seo";

export const revalidate = 60;

interface AboutData {
  hero?: { tag?: string; title?: string; subtitle?: string };
  mission?: { title?: string; p1?: string; p2?: string; p3?: string };
  values?: { title: string; desc: string }[];
  manifesto?: string[];
  seoTitle?: string; seoDescription?: string;
}

const fallback = {
  en: {
    hero: {
      tag: "About us",
      title: "AI-first.\nBy design.",
      subtitle: "We are a generative AI company based in Milan. We build AI projects end-to-end — in total outsourcing or co-sourcing with our clients' teams.",
    },
    mission: {
      title: "We exist to make AI real for businesses.",
      p1: "Brainlab is a generative AI company based in Milan. We develop AI projects end-to-end — in total outsourcing or co-sourcing with our clients' teams. Every engagement produces working software that delivers measurable business impact.",
      p2: "We work across industries — from sales & marketing to finance and operations — bringing deep expertise in LLMs, prompt engineering, AI agents, and production-grade AI systems. We don't build demos: we build products that companies rely on.",
      p3: "Brainlab is legally registered as a Società Benefit (S.B.) under Italian law — a corporate form that requires us to pursue both profit and a positive impact on society and the environment. This isn't a marketing badge: it's a statutory obligation written into our articles of association, reviewed annually, and reported publicly. For us it means that every AI project we take on must be technically sound, ethically considered, and genuinely useful. We don't build systems that exploit, deceive, or concentrate power unfairly — and we can't, by law.",
    },
    values: [
      { title: "Ship fast", desc: "Working software over perfect plans. We measure progress in weeks and deliverables, not slides and meetings. Velocity is a feature." },
      { title: "Measure everything", desc: "If we can't define what success looks like before we start, we don't start. Every project begins with a clear metric and ends with a result we can point to." },
      { title: "Stay technical", desc: "No slides without code. Everyone on the team builds, tests, and ships. We stay close to the work — always." },
      { title: "Think product", desc: "Technology is the means. The product and its users are the end. We think in user journeys, not model architectures." },
    ],
    manifesto: [
      "We don't build AI for the sake of AI.",
      "We build when the problem is real and the solution is measurable.",
      "We tell clients when AI is not the right answer.",
      "We document what we build so it can outlive us.",
      "We never hide behind complexity.",
      "We take full responsibility for what we ship.",
    ],
    missionTag: "Our mission",
    valuesTag: "How we think",
    manifestoTag: "Our principles",
    cta: "Start a project",
    societaBenefit: "Società Benefit",
  },
  it: {
    hero: {
      tag: "Chi siamo",
      title: "AI-first.\nBy design.",
      subtitle: "Siamo un'azienda di AI generativa con sede a Milano. Sviluppiamo progetti AI end-to-end — in total outsourcing o co-sourcing con i team dei clienti.",
    },
    mission: {
      title: "Esistiamo per rendere l'AI reale per le imprese.",
      p1: "Brainlab è un'azienda di AI generativa con sede a Milano. Sviluppiamo progetti AI end-to-end — in total outsourcing o co-sourcing con i team dei clienti. Ogni ingaggio produce software funzionante che genera impatto di business misurabile.",
      p2: "Lavoriamo in tutti i settori — dalle vendite e marketing alla finanza e alle operations — portando deep expertise in LLM, prompt engineering, AI agent e sistemi AI production-grade. Non costruiamo demo: costruiamo prodotti su cui le aziende si appoggiano davvero.",
      p3: "Brainlab è iscritta come Società Benefit (S.B.) ai sensi della legge italiana — una forma societaria che ci obbliga a perseguire sia il profitto sia un impatto positivo sulla società e sull'ambiente. Non è un badge di marketing: è un obbligo statutario scritto nel nostro atto costitutivo, verificato annualmente e rendicontato pubblicamente. Per noi significa che ogni progetto AI che accettiamo deve essere tecnicamente solido, eticamente considerato e genuinamente utile. Non costruiamo sistemi che sfruttano, ingannano o concentrano il potere in modo scorretto — e per legge non possiamo farlo.",
    },
    values: [
      { title: "Ship fast", desc: "Software funzionante prima dei piani perfetti. Misuriamo il progresso in settimane e deliverable, non in slide e riunioni. La velocità è una feature." },
      { title: "Measure everything", desc: "Se non riusciamo a definire come si misura il successo prima di iniziare, non iniziamo. Ogni progetto parte da una metrica chiara e finisce con un risultato che possiamo mostrare." },
      { title: "Stay technical", desc: "Niente slide senza codice. Tutti nel team costruiscono, testano e rilasciano. Restiamo vicini al lavoro — sempre." },
      { title: "Think product", desc: "La tecnologia è il mezzo. Il prodotto e i suoi utenti sono il fine. Pensiamo in user journey, non in architetture di modelli." },
    ],
    manifesto: [
      "Non costruiamo AI per il gusto di farlo.",
      "Costruiamo quando il problema è reale e la soluzione è misurabile.",
      "Diciamo ai clienti quando l'AI non è la risposta giusta.",
      "Documentiamo ciò che costruiamo perché sopravviva a noi.",
      "Non ci nascondiamo dietro la complessità.",
      "Ci prendiamo piena responsabilità di ciò che rilasciamo.",
    ],
    missionTag: "La nostra missione",
    valuesTag: "Come pensiamo",
    manifestoTag: "I nostri principi",
    cta: "Inizia un progetto",
    societaBenefit: "Società Benefit",
  },
};

const valueIcons = [
  <svg key="a" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  <svg key="b" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  <svg key="c" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  <svg key="d" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const l = locale === "it" ? "it" : "en";
  const data: AboutData = await client.fetch(aboutPageQuery).catch(() => null);
  const title = data?.seoTitle ?? (l === "it" ? "Chi siamo | Brainlab" : "About us | Brainlab");
  const description = data?.seoDescription ?? fallback[l].hero.subtitle;
  return {
    title,
    description,
    alternates: buildAlternates(l, "azienda"),
    openGraph: buildOpenGraph(l, title, description, "azienda"),
    twitter: twitterCard,
  };
}

export default async function AziendaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = (locale === "it" ? "it" : "en") as Locale;
  const f = fallback[l];

  const data: AboutData = await client.fetch(aboutPageQuery).catch(() => null);
  const hero      = data?.hero      ?? f.hero;
  const mission   = data?.mission   ?? f.mission;
  const values    = (data?.values?.length    ?? 0) > 0 ? data!.values!    : f.values;
  const manifesto = (data?.manifesto?.length ?? 0) > 0 ? data!.manifesto! : f.manifesto;

  return (
    <>
      {/* ── HERO ── */}
      <section className="section-dark" style={{ padding: "9rem 3rem 7rem" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <div className="section-tag">{hero.tag}</div>
          <h1 style={{ fontSize: "clamp(2.8rem,6vw,5rem)", fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 1.0, margin: "0.75rem 0 1.5rem", color: "var(--dark-text)", whiteSpace: "pre-line" }}>
            {hero.title}
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--dark-text-sec)", lineHeight: 1.65, fontWeight: 300, maxWidth: 580 }}>
            {hero.subtitle}
          </p>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="section-light">
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "start" }}>
          <div>
            <div className="section-tag">{f.missionTag}</div>
            <h2 style={{ fontSize: "clamp(1.6rem,2.5vw,2.2rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.15, color: "var(--light-text)", marginBottom: "2rem" }}>
              {mission.title}
            </h2>
            {[mission.p1, mission.p2].map((p, i) => p && (
              <p key={i} style={{ fontSize: "0.95rem", color: "var(--light-text-sec)", lineHeight: 1.8, fontWeight: 300, marginBottom: "1.25rem" }}>{p}</p>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Società Benefit card */}
            <div style={{ padding: "2rem", borderRadius: "var(--radius)", background: "var(--primary-light)", border: "1px solid rgba(0,110,183,0.2)" }}>
              <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--primary)", marginBottom: "0.75rem" }}>
                {f.societaBenefit}
              </div>
              <p style={{ fontSize: "0.9rem", color: "var(--light-text-sec)", lineHeight: 1.7, fontWeight: 300 }}>
                {mission.p3}
              </p>
            </div>
            {/* Milano */}
            <div style={{ padding: "1.5rem 2rem", borderRadius: "var(--radius)", border: "1px solid var(--light-border)", background: "var(--light-card)", display: "flex", alignItems: "center", gap: "1rem" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span style={{ fontSize: "0.88rem", color: "var(--light-text-sec)", fontWeight: 400 }}>Corso Monforte 2, 20122 Milano</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="section-dark">
        <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
          <div className="section-tag">{f.valuesTag}</div>
          <h2 className="section-title" style={{ marginBottom: "3rem" }}>
            {l === "it" ? "Quattro principi operativi." : "Four operating principles."}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            {values.map((v, i) => (
              <div key={i} style={{ padding: "2rem", borderRadius: "var(--radius)", border: "1px solid var(--dark-border)", background: "var(--dark-card)", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ width: 42, height: 42, borderRadius: "var(--radius-sm)", background: "rgba(0,110,183,0.12)", border: "1px solid rgba(0,110,183,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)" }}>
                  {valueIcons[i % 4]}
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--dark-text)", letterSpacing: "-0.01em" }}>{v.title}</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--dark-text-sec)", lineHeight: 1.7, fontWeight: 300 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── SOCIETÀ BENEFIT ── */}
      <section className="section-light">
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--primary)", background: "var(--primary-light)", border: "1px solid rgba(0,110,183,0.2)", padding: "0.4rem 0.9rem", borderRadius: "var(--radius-pill)", marginBottom: "1.25rem" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--primary)", display: "inline-block" }} />
              {l === "it" ? "Impresa responsabile" : "Responsible business"}
            </div>
            <h2 style={{ fontSize: "clamp(1.6rem,2.5vw,2.2rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.15, color: "var(--light-text)", marginBottom: "1.5rem" }}>
              {l === "it" ? <>Società Benefit.<br/>Non per scelta di marketing.</> : <>Società Benefit.<br/>Not a marketing choice.</>}
            </h2>
            <p style={{ fontSize: "0.93rem", color: "var(--light-text-sec)", lineHeight: 1.8, fontWeight: 300, marginBottom: "1.25rem" }}>
              {l === "it"
                ? "In Italia, la forma giuridica Società Benefit (S.B.) non è un certificato volontario — è una modifica statutaria che vincola legalmente l'azienda a perseguire, accanto all'obiettivo economico, uno o più obiettivi di beneficio comune. L'impatto viene misurato annualmente con standard verificabili e rendicontato in una relazione pubblica."
                : "In Italy, the Società Benefit (S.B.) legal form is not a voluntary certificate — it's a statutory amendment that legally binds the company to pursue, alongside its economic objective, one or more common benefit goals. Impact is measured annually against verifiable standards and reported in a public disclosure."}
            </p>
            <p style={{ fontSize: "0.93rem", color: "var(--light-text-sec)", lineHeight: 1.8, fontWeight: 300 }}>
              {l === "it"
                ? "Per Brainlab questo si traduce in un principio operativo concreto: non accettiamo progetti che usano l'AI per ingannare utenti, amplificare disinformazione, discriminare persone o concentrare potere in modo scorretto. Non è una policy interna modificabile — è scritto nel nostro atto costitutivo."
                : "For Brainlab this translates into a concrete operating principle: we do not accept projects that use AI to deceive users, amplify disinformation, discriminate against people, or concentrate power unfairly. This is not an internal policy that can be changed — it is written into our articles of association."}
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              {
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
                label: l === "it" ? "Obbligo statutario" : "Statutory obligation",
                desc: l === "it" ? "L'impegno è scritto nell'atto costitutivo, non in una policy modificabile internamente." : "The commitment is written into the articles of association, not an internally modifiable policy.",
              },
              {
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
                label: l === "it" ? "Misurazione annuale" : "Annual measurement",
                desc: l === "it" ? "L'impatto viene misurato ogni anno con standard riconosciuti e rendicontato in una relazione pubblica." : "Impact is measured every year against recognised standards and disclosed in a public report.",
              },
              {
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
                label: l === "it" ? "AI responsabile" : "Responsible AI",
                desc: l === "it" ? "Non accettiamo progetti che usano l'AI per ingannare, discriminare o amplificare disinformazione." : "We do not accept projects that use AI to deceive, discriminate, or amplify disinformation.",
              },
              {
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
                label: l === "it" ? "Impatto positivo" : "Positive impact",
                desc: l === "it" ? "Ogni progetto deve generare valore reale e misurabile, non solo per il cliente ma per il contesto in cui opera." : "Every project must generate real, measurable value — not just for the client but for the context in which it operates.",
              },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", padding: "1.25rem 1.5rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--light-border)", background: "var(--light-card)" }}>
                <div style={{ width: 36, height: 36, borderRadius: "var(--radius-sm)", background: "var(--primary-light)", border: "1px solid rgba(0,110,183,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)", flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--light-text)", marginBottom: "0.25rem" }}>{item.label}</p>
                  <p style={{ fontSize: "0.78rem", color: "var(--light-text-sec)", lineHeight: 1.55, fontWeight: 300 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MANIFESTO ── */}
      <section className="section-light">
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div className="section-tag">{f.manifestoTag}</div>
          <h2 style={{ fontSize: "clamp(1.6rem,2.5vw,2.2rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--light-text)", marginBottom: "3rem", lineHeight: 1.15 }}>
            {l === "it" ? "Cosa crediamo davvero." : "What we actually believe."}
          </h2>
          <ol style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0" }}>
            {manifesto.map((item, i) => (
              <li key={i} style={{ display: "grid", gridTemplateColumns: "2.5rem 1fr", gap: "1.5rem", alignItems: "start", padding: "1.5rem 0", borderBottom: i < manifesto.length - 1 ? "1px solid var(--light-border)" : "none" }}>
                <span style={{ fontSize: "0.65rem", fontWeight: 800, color: "var(--primary)", opacity: 0.5, paddingTop: "0.2rem", fontVariantNumeric: "tabular-nums" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p style={{ fontSize: "1.05rem", fontWeight: 500, color: "var(--light-text)", lineHeight: 1.5, letterSpacing: "-0.01em" }}>
                  {item}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-dark" style={{ textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 className="section-title">
            {l === "it" ? "Costruiamo qualcosa insieme." : "Let's build something together."}
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--dark-text-sec)", lineHeight: 1.7, fontWeight: 300, marginBottom: "2.5rem" }}>
            {l === "it"
              ? "Che tu abbia un progetto concreto o voglia solo esplorare le possibilità — siamo qui."
              : "Whether you have a concrete project or just want to explore what's possible — we're here."}
          </p>
          <Link href={`/${l}#contatti`} className="btn-primary">
            {f.cta}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 7h12M8 2l5 5-5 5"/></svg>
          </Link>
        </div>
      </section>
    </>
  );
}
