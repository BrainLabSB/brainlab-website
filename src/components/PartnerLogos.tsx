import Image from "next/image";

export interface Partner {
  _id: string;
  name: string;
  url?: string;
  logo: {
    asset: { url: string; metadata: { dimensions: { width: number; height: number } } };
    alt?: string;
  };
}

interface Props {
  partners: Partner[];
  variant?: "marquee" | "grid";
  title?: string;
}

export default function PartnerLogos({ partners, variant = "marquee", title }: Props) {
  if (!partners || partners.length === 0) return null;

  const LogoItem = ({ partner }: { partner: Partner }) => {
    const img = (
      <Image
        src={partner.logo.asset.url}
        alt={partner.logo.alt ?? partner.name}
        width={120}
        height={48}
        className="partner-logo-img"
        style={{ objectFit: "contain" }}
      />
    );
    return partner.url ? (
      <a href={partner.url} target="_blank" rel="noopener noreferrer" className="partner-logo-link" aria-label={partner.name}>
        {img}
      </a>
    ) : (
      <div className="partner-logo-link">{img}</div>
    );
  };

  if (variant === "grid") {
    return (
      <section className="partner-grid-section">
        {title && <p className="partner-section-label">{title}</p>}
        <div className="partner-grid">
          {partners.map((p) => (
            <LogoItem key={p._id} partner={p} />
          ))}
        </div>
      </section>
    );
  }

  // marquee: duplicate items for seamless loop
  const doubled = [...partners, ...partners];

  return (
    <section className="partner-marquee-section">
      {title && <p className="partner-section-label">{title}</p>}
      <div className="partner-marquee-wrap">
        <div className="partner-marquee-track">
          {doubled.map((p, i) => (
            <LogoItem key={`${p._id}-${i}`} partner={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
