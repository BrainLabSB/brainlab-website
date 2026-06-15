import { defineField, defineType } from "sanity";

export const modelsPage = defineType({
  name: "modelsPage",
  title: "Pagina — Modelli di ingaggio",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({ name: "tag",      title: "Tag",         type: "string" }),
        defineField({ name: "title",    title: "Titolo",      type: "string" }),
        defineField({ name: "subtitle", title: "Sottotitolo", type: "text", rows: 2 }),
      ],
    }),
    defineField({
      name: "models",
      title: "Modelli",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "title",       title: "Titolo",            type: "string" }),
          defineField({ name: "description", title: "Descrizione",       type: "text", rows: 4 }),
          defineField({ name: "ideal",       title: "Ideale per",        type: "text", rows: 2 }),
          defineField({ name: "includes",    title: "Cosa include",      type: "array", of: [{ type: "string" }] }),
          defineField({ name: "notFor",      title: "Non è adatto se",   type: "array", of: [{ type: "string" }] }),
          defineField({ name: "tags",        title: "Tag",               type: "array", of: [{ type: "string" }] }),
        ],
        preview: { select: { title: "title" } },
      }],
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
  preview: { prepare: () => ({ title: "Modelli di ingaggio" }) },
});
