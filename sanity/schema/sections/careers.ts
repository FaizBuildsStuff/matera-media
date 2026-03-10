import { defineType, defineField } from "sanity";

export const careerRole = defineType({
  name: "careerRole",
  title: "Career Role",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Job Title", type: "string" }),
    defineField({ name: "department", title: "Department", type: "string" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "type", title: "Job Type (e.g. Full-time)", type: "string" }),
    defineField({ name: "link", title: "Application Link", type: "string" }),
  ],
});

export default defineType({
  name: "careers",
  title: "Careers Section",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Section Label", type: "string" }),
    defineField({ name: "title", title: "Main Title", type: "string" }),
    defineField({ name: "highlightedWord", title: "Highlighted Word", type: "string" }),
    defineField({
      name: "items",
      title: "Open Roles",
      type: "array",
      of: [{ type: "careerRole" }],
    }),
  ],
});