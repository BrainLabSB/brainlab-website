import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Brainlab",
  robots: { index: false },
};

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isIt = locale === "it";

  return (
    <section style={{ background: "#fff", padding: "9rem 3rem 6rem" }}>
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <div style={{ fontSize: "0.65rem", letterSpacing: "0.08em", color: "var(--primary)", marginBottom: "0.75rem", textTransform: "uppercase" }}>
          {isIt ? "Informativa" : "Legal"}
        </div>
        <h1 style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "var(--light-text)", marginBottom: "0.75rem" }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: "0.82rem", color: "var(--light-text-muted)", marginBottom: "3rem" }}>
          {isIt ? "Ultimo aggiornamento: settembre 2026" : "Last updated: September 2026"}
        </p>

        {isIt ? (
          <div style={{ fontSize: "0.92rem", lineHeight: 1.8, color: "var(--light-text-sec)", display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div>
              <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--light-text)", marginBottom: "0.5rem" }}>1. Titolare del trattamento</h2>
              <p>Brain Lab Srl Società Benefit, con sede in Corso Monforte 2, 20122 Milano — P.IVA IT11488150969. Per qualsiasi richiesta relativa al trattamento dei dati personali scrivere a: <a href="mailto:info@brainlab.digital" style={{ color: "var(--primary)" }}>info@brainlab.digital</a></p>
            </div>
            <div>
              <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--light-text)", marginBottom: "0.5rem" }}>2. Dati trattati e finalità</h2>
              <p>Trattiamo i dati personali forniti volontariamente attraverso il modulo di contatto presente sul sito (nome, cognome, indirizzo email, contenuto del messaggio) esclusivamente per rispondere alle richieste ricevute e, previo consenso, per l'invio di comunicazioni commerciali. I dati di navigazione (indirizzo IP, browser, pagine visitate) vengono raccolti automaticamente per finalità statistiche aggregate e di sicurezza.</p>
            </div>
            <div>
              <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--light-text)", marginBottom: "0.5rem" }}>3. Base giuridica</h2>
              <p>Il trattamento si basa sul consenso dell'interessato (art. 6, par. 1, lett. a, GDPR) per le comunicazioni di marketing; sull'esecuzione di misure precontrattuali (art. 6, par. 1, lett. b) per la gestione delle richieste di contatto; sul legittimo interesse (art. 6, par. 1, lett. f) per le finalità di sicurezza e statistiche aggregate.</p>
            </div>
            <div>
              <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--light-text)", marginBottom: "0.5rem" }}>4. Conservazione</h2>
              <p>I dati di contatto vengono conservati per il tempo strettamente necessario a gestire la richiesta e, in caso di rapporto contrattuale, per 10 anni ai sensi degli obblighi di legge. I dati di navigazione vengono conservati per un massimo di 12 mesi.</p>
            </div>
            <div>
              <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--light-text)", marginBottom: "0.5rem" }}>5. Comunicazione e trasferimento</h2>
              <p>I dati non vengono venduti né ceduti a terzi per scopi commerciali. Possono essere comunicati a fornitori tecnici (hosting, CRM, strumenti di analisi) che operano in qualità di responsabili del trattamento ai sensi dell'art. 28 GDPR. Alcuni fornitori potrebbero operare al di fuori dello Spazio Economico Europeo; in tali casi il trasferimento avviene nel rispetto delle garanzie previste dal GDPR (clausole contrattuali standard o decisioni di adeguatezza).</p>
            </div>
            <div>
              <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--light-text)", marginBottom: "0.5rem" }}>6. Diritti degli interessati</h2>
              <p>L'interessato ha diritto di accesso, rettifica, cancellazione, limitazione del trattamento, portabilità e opposizione (artt. 15–21 GDPR). Può inoltre revocare il consenso in qualsiasi momento. Per esercitare tali diritti scrivere a <a href="mailto:info@brainlab.digital" style={{ color: "var(--primary)" }}>info@brainlab.digital</a>. Ha altresì diritto di proporre reclamo all'Autorità Garante per la protezione dei dati personali (www.garanteprivacy.it).</p>
            </div>
            <div>

            <div>
              <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--light-text)", marginBottom: "0.5rem" }}>7. Cookie</h2>
              <p style={{ marginBottom: "1.25rem" }}>Il sito utilizza cookie tecnici necessari al funzionamento e, previo consenso, cookie analitici di terze parti (Google Analytics / GTM). Per maggiori informazioni o per gestire le preferenze è possibile contattarci all'indirizzo indicato al punto 1. La navigazione senza prestare consenso ai cookie non tecnici non comporta limitazioni all'utilizzo del sito.</p>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
                  <thead>
                    <tr style={{ background: "var(--light-bg)", borderBottom: "2px solid var(--light-border)" }}>
                      <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontWeight: 700, color: "var(--light-text)" }}>Nome</th>
                      <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontWeight: 700, color: "var(--light-text)" }}>Tipo</th>
                      <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontWeight: 700, color: "var(--light-text)" }}>Finalità</th>
                      <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontWeight: 700, color: "var(--light-text)" }}>Durata</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "bl_cookie_consent", type: "Tecnico", purpose: "Salva la preferenza cookie dell'utente (accettato/rifiutato)", duration: "Persistente (localStorage)" },
                      { name: "__hstc", type: "Marketing (HubSpot)", purpose: "Tracciamento visitatori per il CRM HubSpot", duration: "13 mesi" },
                      { name: "hubspotutk", type: "Marketing (HubSpot)", purpose: "Identifica il visitatore per la deduplicazione dei contatti", duration: "13 mesi" },
                      { name: "__hssc", type: "Marketing (HubSpot)", purpose: "Traccia le sessioni di navigazione", duration: "30 minuti" },
                      { name: "__hssrc", type: "Marketing (HubSpot)", purpose: "Determina se l'utente ha riavviato il browser", duration: "Sessione" },
                      { name: "_ga", type: "Analitico (Google)", purpose: "Distingue gli utenti per Google Analytics", duration: "2 anni" },
                      { name: "_gid", type: "Analitico (Google)", purpose: "Distingue gli utenti (sessione breve)", duration: "24 ore" },
                      { name: "_ga_*", type: "Analitico (Google)", purpose: "Mantiene lo stato della sessione per Google Analytics 4", duration: "2 anni" },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid var(--light-border)", background: i % 2 === 0 ? "#fff" : "var(--light-bg)" }}>
                        <td style={{ padding: "0.65rem 1rem", fontFamily: "monospace", fontSize: "0.75rem", color: "var(--light-text)" }}>{row.name}</td>
                        <td style={{ padding: "0.65rem 1rem", color: "var(--light-text-sec)" }}>{row.type}</td>
                        <td style={{ padding: "0.65rem 1rem", color: "var(--light-text-sec)" }}>{row.purpose}</td>
                        <td style={{ padding: "0.65rem 1rem", color: "var(--light-text-sec)", whiteSpace: "nowrap" }}>{row.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            </div>
          </div>
        ) : (
          <div style={{ fontSize: "0.92rem", lineHeight: 1.8, color: "var(--light-text-sec)", display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div>
              <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--light-text)", marginBottom: "0.5rem" }}>1. Data Controller</h2>
              <p>Brain Lab Srl Società Benefit, Corso Monforte 2, 20122 Milan, Italy — VAT IT11488150969. For any request related to the processing of personal data: <a href="mailto:info@brainlab.digital" style={{ color: "var(--primary)" }}>info@brainlab.digital</a></p>
            </div>
            <div>
              <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--light-text)", marginBottom: "0.5rem" }}>2. Data processed and purposes</h2>
              <p>We process personal data voluntarily provided through the contact form on this site (name, surname, email address, message content) solely to respond to inquiries and, where consent has been given, to send commercial communications. Navigation data (IP address, browser, pages visited) are collected automatically for aggregated statistical and security purposes.</p>
            </div>
            <div>
              <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--light-text)", marginBottom: "0.5rem" }}>3. Legal basis</h2>
              <p>Processing is based on the data subject's consent (Art. 6(1)(a) GDPR) for marketing communications; on pre-contractual measures (Art. 6(1)(b)) for handling contact requests; and on legitimate interest (Art. 6(1)(f)) for security and aggregated statistics.</p>
            </div>
            <div>
              <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--light-text)", marginBottom: "0.5rem" }}>4. Retention</h2>
              <p>Contact data is retained for the time strictly necessary to handle the request and, where a contractual relationship exists, for 10 years under applicable legal obligations. Navigation data is retained for a maximum of 12 months.</p>
            </div>
            <div>
              <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--light-text)", marginBottom: "0.5rem" }}>5. Disclosure and transfer</h2>
              <p>Data is not sold or transferred to third parties for commercial purposes. It may be shared with technical service providers (hosting, CRM, analytics tools) acting as data processors under Art. 28 GDPR. Some providers may operate outside the European Economic Area; in such cases, transfers are made in accordance with GDPR safeguards (standard contractual clauses or adequacy decisions).</p>
            </div>
            <div>
              <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--light-text)", marginBottom: "0.5rem" }}>6. Your rights</h2>
              <p>You have the right to access, rectify, erase, restrict processing, port your data, and object (Arts. 15–21 GDPR). You may also withdraw consent at any time. To exercise these rights, write to <a href="mailto:info@brainlab.digital" style={{ color: "var(--primary)" }}>info@brainlab.digital</a>. You also have the right to lodge a complaint with the Italian Data Protection Authority (www.garanteprivacy.it).</p>
            </div>
            <div>

            <div>
              <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--light-text)", marginBottom: "0.5rem" }}>7. Cookies</h2>
              <p style={{ marginBottom: "1.25rem" }}>This site uses technical cookies necessary for operation and, with your consent, third-party analytics cookies (Google Analytics / GTM). To manage your preferences or for more information, contact us at the address in section 1. Browsing without consenting to non-technical cookies does not limit your use of the site.</p>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
                  <thead>
                    <tr style={{ background: "var(--light-bg)", borderBottom: "2px solid var(--light-border)" }}>
                      <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontWeight: 700, color: "var(--light-text)" }}>Name</th>
                      <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontWeight: 700, color: "var(--light-text)" }}>Type</th>
                      <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontWeight: 700, color: "var(--light-text)" }}>Purpose</th>
                      <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontWeight: 700, color: "var(--light-text)" }}>Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "bl_cookie_consent", type: "Technical", purpose: "Stores the user's cookie preference (accepted/rejected)", duration: "Persistent (localStorage)" },
                      { name: "__hstc", type: "Marketing (HubSpot)", purpose: "Visitor tracking for HubSpot CRM", duration: "13 months" },
                      { name: "hubspotutk", type: "Marketing (HubSpot)", purpose: "Identifies the visitor for contact deduplication", duration: "13 months" },
                      { name: "__hssc", type: "Marketing (HubSpot)", purpose: "Tracks browsing sessions", duration: "30 minutes" },
                      { name: "__hssrc", type: "Marketing (HubSpot)", purpose: "Determines if the user restarted their browser", duration: "Session" },
                      { name: "_ga", type: "Analytics (Google)", purpose: "Distinguishes users for Google Analytics", duration: "2 years" },
                      { name: "_gid", type: "Analytics (Google)", purpose: "Distinguishes users (short session)", duration: "24 hours" },
                      { name: "_ga_*", type: "Analytics (Google)", purpose: "Maintains session state for Google Analytics 4", duration: "2 years" },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid var(--light-border)", background: i % 2 === 0 ? "#fff" : "var(--light-bg)" }}>
                        <td style={{ padding: "0.65rem 1rem", fontFamily: "monospace", fontSize: "0.75rem", color: "var(--light-text)" }}>{row.name}</td>
                        <td style={{ padding: "0.65rem 1rem", color: "var(--light-text-sec)" }}>{row.type}</td>
                        <td style={{ padding: "0.65rem 1rem", color: "var(--light-text-sec)" }}>{row.purpose}</td>
                        <td style={{ padding: "0.65rem 1rem", color: "var(--light-text-sec)", whiteSpace: "nowrap" }}>{row.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid var(--light-border)" }}>
          <Link href={`/${locale}`} style={{ fontSize: "0.82rem", color: "var(--primary)" }}>
            ← {isIt ? "Torna alla home" : "Back to home"}
          </Link>
        </div>
      </div>
    </section>
  );
}
