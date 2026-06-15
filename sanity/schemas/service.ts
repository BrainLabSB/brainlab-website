import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Servizi",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Nome servizio", type: "string", validation: (R) => R.required() }),
    defineField({
      name: "slug",
      title: "Slug URL",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({ name: "excerpt", title: "Descrizione breve (per la lista servizi)", type: "text", rows: 3 }),
    defineField({ name: "icon", title: "Icona (emoji o nome icona)", type: "string" }),
    defineField({
      name: "coverImage",
      title: "Immagine copertina",
      type: "image",
      options: { hotspot: true },
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
    defineField({ name: "seoTitle", title: "Titolo SEO", type: "string" }),
    defineField({ name: "seoDescription", title: "Descrizione SEO", type: "text", rows: 3 }),
    defineField({ name: "order", title: "Ordine nella lista", type: "number" }),
  ],
  orderings: [{ title: "Ordine", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", media: "coverImage" },
  },
});
