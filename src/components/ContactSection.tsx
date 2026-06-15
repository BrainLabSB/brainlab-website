import HubSpotForm from "@/components/HubSpotForm";
import type { Locale } from "@/lib/translations";

const content = {
  en: {
    tag: "Contact us",
    title: "Let's talk about your project.",
    sub: "Tell us what you're working on — we'll get back to you within 24 hours.",
    address: "Corso Monforte 2, 20122 Milano",
  },
  it: {
    tag: "Contattaci",
    title: "Parliamo del tuo progetto.",
    sub: "Raccontaci cosa stai costruendo — ti rispondiamo entro 24 ore.",
    address: "Corso Monforte 2, 20122 Milano",
  },
};

interface Props {
  locale: Locale;
}

export default function ContactSection({ locale }: Props) {
  const t = content[locale];

  return (
    <section className="contact-section" id="contatti">
      <div className="contact-inner">
        {/* Left: form */}
        <div className="contact-form-col">
          <span className="section-tag">{t.tag}</span>
          <h2 className="contact-title">{t.title}</h2>
          <p className="contact-sub">{t.sub}</p>
          <HubSpotForm
            portalId="20044910"
            formId="92562939-76c9-404f-86df-62d138e44864"
            region="na1"
          />
        </div>

        {/* Right: map */}
        <div className="contact-map-col">
          <div className="contact-map-wrap">
            <iframe
              title="Brainlab — Corso Monforte 2, Milano"
              src="https://maps.google.com/maps?q=Corso+Monforte+2,+20122+Milano&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="contact-address">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            {t.address}
          </p>
        </div>
      </div>
    </section>
  );
}
