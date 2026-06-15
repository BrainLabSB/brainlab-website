import type { Metadata } from "next";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://brainlab.digital";

export type Locale = "en" | "it";

/**
 * Genera le alternates (canonical + hreflang) per una data pagina.
 * @param locale  locale corrente ("en" | "it")
 * @param path    percorso senza locale, es. "" per homepage, "come-lavoriamo" per la pagina omonima
 */
export function buildAlternates(locale: Locale, path: string): Metadata["alternates"] {
  const seg = path ? `/${path}` : "";
  return {
    canonical: `${siteUrl}/${locale}${seg}`,
    languages: {
      "en": `${siteUrl}/en${seg}`,
      "it": `${siteUrl}/it${seg}`,
      "x-default": `${siteUrl}/en${seg}`,
    },
  };
}

/**
 * Genera i tag Open Graph per una data pagina.
 */
export function buildOpenGraph(
  locale: Locale,
  title: string,
  description: string,
  path: string
): NonNullable<Metadata["openGraph"]> {
  const seg = path ? `/${path}` : "";
  return {
    title,
    description,
    url: `${siteUrl}/${locale}${seg}`,
    siteName: "Brainlab",
    locale: locale === "it" ? "it_IT" : "en_US",
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Brainlab — Generative AI Company",
      },
    ],
  };
}

/**
 * Twitter / X card metadata.
 */
export const twitterCard: Metadata["twitter"] = {
  card: "summary_large_image",
  site: "@brainlabai",
  creator: "@brainlabai",
};
