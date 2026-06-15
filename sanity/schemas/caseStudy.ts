import { defineField, defineType } from "sanity";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titolo", type: "string", validation: (R) => R.required() }),
    defineField({
      name: "slug",
      title: "Slug URL",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({ name: "client", title: "Cliente", type: "string" }),
    defineField({ name: "sector", title: "Settore", type: "string" }),
    defineField({ name: "excerpt", title: "Descrizione breve", type: "text", rows: 3 }),
    defineField({
      name: "coverImage",
      title: "Immagine copertina",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Testo alternativo" }],
    }),
    defineField({
      name: "results",
      title: "Risultati chiave",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "metric", title: "Metrica (es. +40%)", type: "string" },
            { name: "label", title: "Descrizione (es. Lead generati)", type: "string" },
          ],
          preview: { select: { title: "metric", subtitle: "label" } },
        },
      ],
    }),
    defineField({
      name: "body",
      title: "Contenuto",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Testo alternativo" }],
        },
      ],
    }),
    defineField({
      name: "services",
      title: "Servizi coinvolti",
      type: "array",
      of: [{ type: "reference", to: [{ type: "service" }] }],
    }),
    defineField({ name: "publishedAt", title: "Data pubblicazione", type: "date" }),
    defineField({ name: "seoTitle", title: "Titolo SEO", type: "string" }),
    defineField({ name: "seoDescription", title: "Descrizione SEO", type: "text", rows: 3 }),
  ],
  preview: {
    select: { title: "title", subtitle: "client", media: "coverImage" },
  },
});
