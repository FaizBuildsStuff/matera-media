import { defineField, defineType } from "sanity";

export const processStep = defineType({
  name: "processStep",
  title: "Process Step",
  type: "object",
  fields: [
    defineField({
      name: "id",
      title: "Step Number",
      type: "string",
      description: "e.g. 01, 02, 03",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: { title: "title", id: "id" },
    prepare({ title, id }) {
      return { title: `${id} - ${title}` };
    },
  },
});

export default defineType({
  name: "howItWorks",
  title: "How It Works",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Section Label",
      type: "string",
      initialValue: "Our Process",
    }),
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      initialValue: "From Concept to Reality.",
    }),
    defineField({
      name: "highlightedWord",
      title: "Highlighted Word",
      type: "string",
      initialValue: "Reality.",
    }),
    defineField({
      name: "steps",
      title: "Process Steps",
      type: "array",
      of: [{ type: "processStep" }],
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return {
        title: "How It Works",
        subtitle: title,
      };
    },
  },
});
