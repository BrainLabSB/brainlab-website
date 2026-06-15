"use client";
import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {items.map((item, i) => (
        <div key={i} style={{ borderBottom: "1px solid var(--dark-border)" }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1.4rem 0",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "0.95rem",
              fontWeight: 500,
              color: open === i ? "var(--primary)" : "var(--dark-text)",
              textAlign: "left",
              gap: "1rem",
              fontFamily: "inherit",
              transition: "color 0.2s",
            }}
          >
            <span>{item.question}</span>
            <svg
              width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              style={{ flexShrink: 0, transition: "transform 0.25s", transform: open === i ? "rotate(180deg)" : "rotate(0deg)", color: open === i ? "var(--primary)" : "var(--dark-text-muted)" }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <div style={{
            overflow: "hidden",
            maxHeight: open === i ? 400 : 0,
            transition: "max-height 0.35s ease, padding 0.25s",
            paddingBottom: open === i ? "1.25rem" : 0,
          }}>
            <p style={{ fontSize: "0.88rem", color: "var(--dark-text-sec)", lineHeight: 1.7, fontWeight: 300 }}>
              {item.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
