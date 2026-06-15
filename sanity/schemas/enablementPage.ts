import { defineField, defineType } from "sanity";

export const enablementPage = defineType({
  name: "enablementPage",
  title: "Pagina — AI Enablement",
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
      name: "intro",
      title: "Sezione introduttiva",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Titolo",      type: "string" }),
        defineField({ name: "body",  title: "Testo",       type: "text", rows: 5 }),
        defineField({ name: "stats", title: "Statistiche", type: "array", of: [{
          type: "object",
          fields: [
            defineField({ name: "value", title: "Valore (es. 74%)", type: "string" }),
            defineField({ name: "label", title: "Descrizione",      type: "string" }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }]}),
      ],
    }),
    defineField({
      name: "programs",
      title: "Programmi",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "title",       title: "Titolo",          type: "string" }),
          defineField({ name: "description", title: "Descrizione",     type: "text", rows: 4 }),
          defineField({ name: "duration",    title: "Durata tipica",   type: "string" }),
          defineField({ name: "format",      title: "Formato",         type: "string" }),
          defineField({ name: "outcomes",    title: "Risultati attesi", type: "array", of: [{ type: "string" }] }),
        ],
        preview: { select: { title: "title" } },
      }],
    }),
    defineField({
      name: "sectors",
      title: "Settori e funzioni aziendali",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "faqs",
      title: "FAQ",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "question", title: "Domanda", type: "string" }),
          defineField({ name: "answer",   title: "Risposta", type: "text", rows: 3 }),
        ],
        preview: { select: { title: "question" } },
      }],
    }),
    defineField({ name: "seoTitle",       title: "Titolo SEO",      type: "string" }),
    defineField({ name: "seoDescription", title: "Descrizione SEO", type: "text", rows: 3 }),
  ],
  preview: { prepare: () => ({ title: "AI Enablement" }) },
});
