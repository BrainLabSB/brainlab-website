import Link from "next/link";
import Image from "next/image";
import { home, type Locale } from "@/lib/translations";

export default function Footer({ locale }: { locale: Locale }) {
  const t = home[locale].footer;
  return (
    <footer className="site-footer">
      <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
        <Image src="/logo_color2.png" alt="Brainlab" width={100} height={28}
          style={{ objectFit: "contain", height: "28px", width: "auto", opacity: 0.6 }} />
        <span className="footer-info">{t.copy}</span>
      </div>
      <div className="footer-links">
        <a href="https://linkedin.com/company/brainlab-digital" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://github.com/brainlab-digital" target="_blank" rel="noopener noreferrer">GitHub</a>
        <Link href={`/${locale}/privacy`}>Privacy</Link>
      </div>
    </footer>
  );
}
