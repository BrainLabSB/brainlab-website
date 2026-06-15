import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

const locales = ["en", "it"] as const;

const staticPages = [
  "",                 // homepage
  "come-lavoriamo",
  "ambiti",
  "modelli",
  "ai-enablement",
  "azienda",
  "blog",
  "case-study",
  "servizi",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of staticPages) {
      const seg = page ? `/${page}` : "";
      entries.push({
        url: `${siteUrl}/${locale}${seg}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1.0 : 0.8,
        alternates: {
          languages: {
            en: `${siteUrl}/en${seg}`,
            it: `${siteUrl}/it${seg}`,
          },
        },
      });
    }
  }

  return entries;
}
