import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "Pagina — Azienda",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({ name: "tag",      title: "Tag",         type: "string" }),
        defineField({ name: "title",    title: "Titolo",      type: "string" }),
        defineField({ name: "subtitle", title: "Sottotitolo", type: "text", rows: 3 }),
      ],
    }),
    defineField({
      name: "mission",
      title: "Missione",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Titolo sezione", type: "string" }),
        defineField({ name: "p1",    title: "Paragrafo 1",    type: "text", rows: 4 }),
        defineField({ name: "p2",    title: "Paragrafo 2",    type: "text", rows: 4 }),
        defineField({ name: "p3",    title: "Paragrafo 3 (Società Benefit)", type: "text", rows: 4 }),
      ],
    }),
    defineField({
      name: "values",
      title: "Valori",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "title", title: "Titolo",      type: "string" }),
          defineField({ name: "desc",  title: "Descrizione", type: "text", rows: 3 }),
        ],
        preview: { select: { title: "title" } },
      }],
    }),
    defineField({
      name: "manifesto",
      title: "Manifesto (lista principi)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "seoTitle",       title: "Titolo SEO",      type: "string" }),
    defineField({ name: "seoDescription", title: "Descrizione SEO", type: "text", rows: 3 }),
  ],
  preview: { prepare: () => ({ title: "Azienda" }) },
});
