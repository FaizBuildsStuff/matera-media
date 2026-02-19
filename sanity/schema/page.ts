import { defineField, defineType } from "sanity";

export default defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      initialValue: "Home",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      hidden: ({ document }) => document?.title !== "Home",
    }),
    defineField({
      name: "sections",
      title: "Page Sections",
      type: "array",
      description:
        "Drag and drop to reorder sections. Add, remove, or reorder components on your page.",
      of: [
        { type: "hero" },
        { type: "workShowcase" },
        { type: "howItWorks" },
        { type: "pricing" },
        { type: "faq" },
        { type: "calendlyWidget" },
      ],
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return {
        title: title || "Page",
      };
    },
  },
});
