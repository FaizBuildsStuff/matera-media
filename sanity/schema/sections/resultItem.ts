import { defineField, defineType } from "sanity";

export default defineType({
  name: "resultItem",
  title: "Result Item",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Result Proof / Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { label: "label", value: "value" },
    prepare({ label, value }) {
      return { title: label, subtitle: value };
    },
  },
});
