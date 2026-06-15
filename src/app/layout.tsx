import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { siteUrl, twitterCard } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Brainlab — Generative AI Company", template: "%s | Brainlab" },
  description:
    "We design and deliver generative AI projects in total outsourcing or co-sourcing. Milan-based generative AI company.",
  openGraph: {
    siteName: "Brainlab",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Brainlab — Generative AI Company" }],
  },
  twitter: twitterCard,
  robots: { index: true, follow: true },
};

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-rubik",
  display: "swap",
});

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Brainlab",
  legalName: "Brainlab S.r.l. Società Benefit",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  foundingDate: "2023",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Corso Monforte 2",
    addressLocality: "Milano",
    postalCode: "20122",
    addressCountry: "IT",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "hello@brainlab.digital",
    availableLanguage: ["Italian", "English"],
  },
  description:
    "Brainlab is a generative AI company based in Milan. We design and deliver AI projects end-to-end — in total outsourcing or co-sourcing with our clients' teams.",
  sameAs: [],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const locale = headersList.get("x-locale") ?? "en";

  return (
    <html lang={locale} suppressHydrationWarning className={rubik.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body style={{ fontFamily: "var(--font-rubik, 'Rubik', system-ui, sans-serif)" }}>
        {children}
      </body>
    </html>
  );
}
