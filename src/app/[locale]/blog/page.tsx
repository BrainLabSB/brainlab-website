import type { Metadata } from "next";
export const metadata: Metadata = { title: "Blog" };
export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  return (
    <section style={{ minHeight: "100vh", paddingTop: "10rem", paddingBottom: "7rem", background: "var(--dark)", padding: "10rem 3rem 7rem" }}>
      <div style={{ maxWidth: "var(--container)", margin: "0 auto" }}>
        <div style={{ fontSize: "0.65rem", letterSpacing: "0.08em", color: "var(--primary)", marginBottom: "0.75rem", textTransform: "uppercase" }}>Blog</div>
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "#fff" }}>Coming soon.</h1>
      </div>
    </section>
  );
}
