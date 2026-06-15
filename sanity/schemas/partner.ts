import { defineField, defineType } from "sanity";

export const partner = defineType({
  name: "partner",
  title: "Partner & Clienti",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nome",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
      validation: (R) => R.required(),
      fields: [
        defineField({ name: "alt", title: "Testo alternativo", type: "string" }),
      ],
    }),
    defineField({
      name: "url",
      title: "URL sito web (opzionale)",
      type: "url",
    }),
    defineField({
      name: "active",
      title: "Visibile",
      type: "boolean",
      initialValue: true,
      description: "Deseleziona per nascondere senza eliminare.",
    }),
    defineField({
      name: "order",
      title: "Ordine",
      type: "number",
      initialValue: 99,
    }),
  ],
  orderings: [
    { title: "Ordine", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", media: "logo" },
  },
});
