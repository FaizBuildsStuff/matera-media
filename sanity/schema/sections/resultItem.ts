import { defineField, defineType } from "sanity";

export default defineType({
  name: "resultItem",
  title: "Result Item",
  type: "object",
  fields: [
    defineField({
      name: "clientName",
      title: "Client Name",
      type: "string",
    }),
    defineField({
      name: "clientAvatar",
      title: "Client Avatar",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "title",
      title: "Result Title / Huge Value",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "description",
      title: "Result Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "label",
      title: "Label (Old/Fallback)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "value",
      title: "Value (Old/Fallback)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "image",
      title: "Result Proof / Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "title", value: "value", image: "image" },
    prepare({ title, value, image }) {
      return { title: title || value || "Result", subtitle: "Result Item", media: image };
    },
  },
});
