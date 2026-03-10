import { defineType, defineField } from "sanity";

export default defineType({
  name: "careersPage",
  title: "Careers Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title (Internal)",
      type: "string",
      initialValue: "Careers",
    }),
    defineField({
      name: "label",
      title: "Section Label",
      type: "string",
      description: "e.g., JOIN THE TEAM",
    }),
    defineField({
      name: "headline",
      title: "Main Headline",
      type: "string",
      description: "The big text at the top",
    }),
    defineField({
      name: "highlightedWord",
      title: "Highlighted Word",
      type: "string",
      description: "The word to be Satoshi Bold Italic",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "openRoles",
      title: "Open Roles",
      type: "array",
      of: [{ type: "careerRole" }],
    }),
  ],
});