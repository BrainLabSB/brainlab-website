import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Articoli blog",
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
    defineField({ name: "excerpt", title: "Introduzione / anteprima", type: "text", rows: 3 }),
    defineField({
      name: "coverImage",
      title: "Immagine copertina",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Testo alternativo" }],
    }),
    defineField({
      name: "categories",
      title: "Categorie",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Intelligenza Artificiale", value: "ai" },
          { title: "Marketing digitale", value: "marketing" },
          { title: "Automazione", value: "automazione" },
          { title: "Strategia", value: "strategia" },
          { title: "Casi d'uso", value: "casi-uso" },
        ],
      },
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
    defineField({ name: "publishedAt", title: "Data pubblicazione", type: "datetime" }),
    defineField({ name: "author", title: "Autore", type: "string" }),
    defineField({ name: "seoTitle", title: "Titolo SEO", type: "string" }),
    defineField({ name: "seoDescription", title: "Descrizione SEO", type: "text", rows: 3 }),
  ],
  orderings: [{ title: "Più recenti", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: {
    select: { title: "title", subtitle: "publishedAt", media: "coverImage" },
  },
});
