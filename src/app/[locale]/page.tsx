import type { Metadata } from "next";
import Link from "next/link";
import { client } from "../../../sanity/lib/client";
import { caseStudiesQuery } from "../../../sanity/lib/queries";
import SanityImage from "@/components/SanityImage";
import { home, type Locale } from "@/lib/translations";
import { buildAlternates, buildOpenGraph, twitterCard } from "@/lib/seo";


export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const l = (locale === "it" ? "it" : "en") as Locale;

  const titles = {
    en: "Brainlab — Generative AI Company",
    it: "Brainlab — Generative AI Company",
  };
  const descriptions = {
    en: "We design and deliver generative AI projects in total outsourcing or co-sourcing. Milan-based generative AI company.",
    it: "Progettiamo e realizziamo progetti di AI generativa in total outsourcing o co-sourcing. Azienda di AI generativa con sede a Milano.",
  };

  return {
    title: titles[l],
    description: descriptions[l],
    alternates: buildAlternates(l, ""),
    openGraph: buildOpenGraph(l, titles[l], descriptions[l], ""),
    twitter: twitterCard,
  };
}

export const revalidate = 60;

interface CaseStudy {
  _id: string; title: string; slug: { current: string };
  client?: string; sector?: string; excerpt?: string;
  coverImage?: object; results?: { metric: string; label: string }[];
}

async function getCaseStudies(): Promise<CaseStudy[]> {
  try { return await client.fetch<CaseStudy[]>(caseStudiesQuery); }
  catch { return []; }
}

const marqueeItems = [
  "Generative AI","Sales & Marketing","Finance & Risk","RAG Systems",
  "AI Agents","Process Automation","Content Generation","LLM Orchestration",
  "Predictive Analytics","Document Intelligence",
];

const domainIcons = [
  <svg key="d1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:"22px",height:"22px"}}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
  <svg key="d2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:"22px",height:"22px"}}><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  <svg key="d3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:"22px",height:"22px"}}><path d="M12 8V4H8"/><path d="M2 12a10 10 0 1 0 10-10"/><circle cx="12" cy="12" r="2"/></svg>,
  <svg key="d4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:"22px",height:"22px"}}><path d="M12 2L2 7v10l10 5 10-5V7l-10-5z"/><path d="M12 22V12M2 7l10 5 10-5"/></svg>,
];

const enablementIcons = [
  <svg key="e1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:"18px",height:"18px"}}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  <svg key="e2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:"18px",height:"18px"}}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  <svg key="e3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:"18px",height:"18px"}}><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
  <svg key="e4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:"18px",height:"18px"}}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
];

const modelIcons = [
  <svg key="m1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:"22px",height:"22px"}}><path d="M20 7h-9M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>,
  <svg key="m2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:"22px",height:"22px"}}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
];

const valueIcons = [
  <svg key="v1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:"18px",height:"18px"}}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
  <svg key="v2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:"18px",height:"18px"}}><path d="M3 3v18h18"/><path d="M7 16l4-4 4 4 6-6"/></svg>,
  <svg key="v3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:"18px",height:"18px"}}><path d="M16 18l6-6-6-6"/><path d="M8 6l-6 6 6 6"/></svg>,
  <svg key="v4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:"18px",height:"18px"}}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
];

const processIcons = [
  <svg key="p1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:"22px",height:"22px"}}><circle cx="12" cy="12" r="3"/><path d="M12 2v4m0 12v4m-7.07-15.07 2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83"/></svg>,
  <svg key="p2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:"22px",height:"22px"}}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 17.5h7M17.5 14v7"/></svg>,
  <svg key="p3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:"22px",height:"22px"}}><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
  <svg key="p4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:"22px",height:"22px"}}><path d="M5 12l5 5L20 7"/></svg>,
];

interface Props { params: Promise<{ locale: string }>; }

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const safeLocale = (locale === "it" ? "it" : "en") as Locale;
  const c = home[safeLocale];
  const caseStudies = await getCaseStudies();

  return (
    <>
      {/* ── HERO ── */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "8rem 3rem 5rem", position: "relative", background: "var(--dark)", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "-10%", right: "-5%", width: "700px", height: "700px",
          background: "radial-gradient(circle, rgba(0,110,183,0.08) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", width: "100%" }}>
          <div style={{ fontSize: "0.68rem", letterSpacing: "0.06em", color: "var(--primary)", marginBottom: "2rem",
            display: "inline-flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ width: "32px", height: "1px", background: "var(--primary)", display: "inline-block" }} />
            {c.hero.tag}
          </div>
          <h1 style={{ fontSize: "clamp(3.5rem, 7vw, 6rem)", fontWeight: 800, lineHeight: 1.02,
            letterSpacing: "-0.04em", maxWidth: "800px", marginBottom: "2rem", color: "#fff" }}>
            {c.hero.h1a}<br />{c.hero.h1b}<br />
            <span style={{ color: "var(--primary)" }}>{c.hero.accent}</span>
          </h1>
          <p style={{ fontSize: "1.1rem", lineHeight: 1.75, color: "var(--dark-text-sec)",
            maxWidth: "500px", marginBottom: "3rem", fontWeight: 300 }}>{c.hero.sub}</p>
          <div className="hero-actions">
            <Link href={`/${safeLocale}/contatti`} className="btn-primary">
              {c.hero.cta1}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 7h12M8 2l5 5-5 5"/></svg>
            </Link>
            <a href={`/${safeLocale}/#work`} className="btn-ghost">
              {c.hero.cta2}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 7h12M8 2l5 5-5 5"/></svg>
            </a>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: "2.5rem", left: "3rem", fontSize: "0.6rem",
          color: "var(--dark-text-muted)", letterSpacing: "0.08em", display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {c.hero.scroll}
          <span style={{ width: "1px", height: "32px", background: "var(--dark-text-muted)", display: "inline-block", animation: "pulse 2s ease-in-out infinite" }} />
        </div>
        <style>{`@keyframes pulse{0%,100%{opacity:0.3}50%{opacity:1}}`}</style>
      </section>

      {/* ── MARQUEE ── */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...marqueeItems,...marqueeItems].map((item,i)=><span key={i} className="marquee-item">{item}</span>)}
        </div>
      </div>

      {/* ── PROCESS ── */}
      <section className="section-light" id="how">
        <div className="section-header-row reveal" style={{ maxWidth:"var(--container)", margin:"0 auto" }}>
          <div>
            <div className="section-tag">{c.process.tag}</div>
            <h2 className="section-title" style={{ color:"var(--light-text)" }}>{c.process.title1}<br/>{c.process.title2}</h2>
          </div>
          <p className="section-desc">{c.process.desc}</p>
        </div>
        <div className="process-flow reveal" style={{ maxWidth:"var(--container)", margin:"0 auto" }}>
          {c.process.steps.map((s,i)=>(
            <div key={s.num} className="process-step">
              <div className="step-icon-wrap"><div className="step-icon">{processIcons[i]}</div></div>
              <div className="step-num">{s.num}</div>
              <h3 className="step-name">{s.name}</h3>
              <p className="step-text">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── DOMAINS ── */}
      <section className="section-dark" id="domains">
        <div className="section-header-row reveal" style={{ maxWidth:"var(--container)", margin:"0 auto" }}>
          <div>
            <div className="section-tag">{c.domains.tag}</div>
            <h2 className="section-title">{c.domains.title1}<br/>{c.domains.title2}</h2>
          </div>
          <p className="section-desc dark">{c.domains.desc}</p>
        </div>
        <div className="build-grid reveal" style={{ maxWidth:"var(--container)", margin:"0 auto" }}>
          {c.domains.cards.map((d,i)=>(
            <div key={d.title} className="build-card">
              <div className="build-icon">{domainIcons[i]}</div>
              <h3>{d.title}</h3>
              <p>{d.desc}</p>
              <div className="build-tags">
                {d.tags.map(tag=><span key={tag} className="build-tag">{tag}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── AI ENABLEMENT ── */}
      <section className="section-light" id="enablement" style={{ background:"#fff" }}>
        <div className="enablement-layout">
          <div className="enablement-intro reveal">
            <div className="enablement-badge">{c.enablement.badge}</div>
            <div className="section-tag">{c.enablement.tag}</div>
            <h2 className="section-title" style={{ color:"var(--light-text)", marginBottom:"1.25rem" }}>
              {c.enablement.title1}<br/>{c.enablement.title2}
            </h2>
            <p style={{ fontSize:"0.95rem", color:"var(--light-text-sec)", lineHeight:1.75, fontWeight:300, marginBottom:"1rem" }}>{c.enablement.desc1}</p>
            <p style={{ fontSize:"0.95rem", color:"var(--light-text-sec)", lineHeight:1.75, fontWeight:300, marginBottom:"2rem" }}>{c.enablement.desc2}</p>
            <div className="enablement-pills">
              {c.enablement.pills.map(p=><span key={p} className="enablement-pill">{p}</span>)}
            </div>
            <Link href={`/${safeLocale}/contatti`} className="btn-primary">{c.enablement.cta}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 7h12M8 2l5 5-5 5"/></svg>
            </Link>
          </div>
          <div className="enablement-cards reveal">
            {c.enablement.cards.map((card,i)=>(
              <div key={card.title} className="enablement-card">
                <div className="enablement-card-icon">{enablementIcons[i]}</div>
                <div><h4>{card.title}</h4><p>{card.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENGAGEMENT MODELS ── */}
      <section className="section-light" id="models">
        <div className="section-header-row reveal" style={{ maxWidth:"var(--container)", margin:"0 auto" }}>
          <div>
            <div className="section-tag">{c.models.tag}</div>
            <h2 className="section-title" style={{ color:"var(--light-text)" }}>{c.models.title1}<br/>{c.models.title2}</h2>
          </div>
          <p className="section-desc">{c.models.desc}</p>
        </div>
        <div className="model-simple-grid reveal" style={{ maxWidth:"var(--container)", margin:"0 auto" }}>
          {c.models.cards.map((m,i)=>(
            <div key={m.title} className="model-simple-card">
              <div className="model-simple-icon">{modelIcons[i]}</div>
              <h3>{m.title}</h3>
              <p>{m.desc}</p>
              <div className="build-tags">
                {m.tags.map(tag=><span key={tag} className="build-tag">{tag}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WORK ── */}
      <section className="section-light" id="work" style={{ background:"#eef1f5", paddingTop:"7rem" }}>
        <div className="section-header-row reveal" style={{ maxWidth:"var(--container)", margin:"0 auto" }}>
          <div>
            <div className="section-tag">{c.work.tag}</div>
            <h2 className="section-title" style={{ color:"var(--light-text)" }}>{c.work.title1}<br/>{c.work.title2}</h2>
          </div>
          <p className="section-desc">{c.work.desc}</p>
        </div>
        <div className="work-grid reveal" style={{ maxWidth:"var(--container)", margin:"0 auto" }}>
          {caseStudies.length > 0
            ? caseStudies.slice(0,3).map((cs)=>(
              <Link key={cs._id} href={`/${safeLocale}/case-study/${cs.slug.current}`} className="work-card">
                {cs.coverImage
                  ? <div className="work-visual"><SanityImage value={cs.coverImage as Parameters<typeof SanityImage>[0]["value"]} width={400} height={160}/></div>
                  : <div className="work-visual"><span className="work-visual-label">{cs.sector??cs.client??"Case Study"}</span></div>}
                <div className="work-body">
                  <h3>{cs.title}</h3>
                  {cs.excerpt&&<p>{cs.excerpt}</p>}
                  {cs.results?.[0]&&<div className="work-metric"><span className="work-metric-val">{cs.results[0].metric}</span><span className="work-metric-label">{cs.results[0].label}</span></div>}
                </div>
              </Link>
            ))
            : c.work.placeholders.map((cs)=>(
              <div key={cs.title} className="work-card" style={{ cursor:"default" }}>
                <div className="work-visual"><span className="work-visual-label">{cs.sector}</span></div>
                <div className="work-body">
                  <h3>{cs.title}</h3>
                  <p>{cs.desc}</p>
                  <div className="work-metric">
                    <span className="work-metric-val">{cs.metric}</span>
                    <span className="work-metric-label">{cs.label}</span>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="section-dark" id="about">
        <div className="reveal" style={{ maxWidth:"var(--container)", margin:"0 auto" }}>
          <div className="section-tag">{c.about.tag}</div>
          <h2 className="section-title" style={{ marginBottom:"3rem" }}>{c.about.title}</h2>
          <div className="about-grid">
            <div className="about-text">
              <p>{c.about.p1}</p>
              <p style={{ marginTop:"1.25rem" }}>{c.about.p2}</p>
              <p style={{ marginTop:"1.25rem" }}>{c.about.p3}</p>
            </div>
            <div className="values-list">
              {c.about.values.map((v,i)=>(
                <div key={v.title} className="value-card">
                  <div className="value-icon">{valueIcons[i]}</div>
                  <div><h4>{v.title}</h4><span>{v.desc}</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div style={{ position:"relative", maxWidth:"640px", margin:"0 auto" }}>
          <h2>{c.cta.title1}<br/>{c.cta.title2}</h2>
          <p className="cta-sub">{c.cta.sub}</p>
          <Link href={`/${safeLocale}/contatti`} className="btn-white">
            {c.cta.btn}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 7h12M8 2l5 5-5 5"/></svg>
          </Link>
        </div>
      </section>
    </>
  );
}
