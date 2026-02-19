import { defineField, defineType } from "sanity";

export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ Item",
  type: "object",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { question: "question" },
    prepare({ question }) {
      return {
        title: question ? question.slice(0, 50) + "..." : "FAQ",
      };
    },
  },
});

export default defineType({
  name: "faq",
  title: "FAQ",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Section Label",
      type: "string",
      initialValue: "Common Questions",
    }),
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      initialValue: "Everything you need to Know.",
    }),
    defineField({
      name: "highlightedWord",
      title: "Highlighted Word",
      type: "string",
      initialValue: "Know.",
    }),
    defineField({
      name: "items",
      title: "FAQ Items",
      type: "array",
      of: [{ type: "faqItem" }],
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return {
        title: "FAQ",
        subtitle: title,
      };
    },
  },
});
