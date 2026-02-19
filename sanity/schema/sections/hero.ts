import { defineField, defineType } from "sanity";

export default defineType({
  name: "hero",
  title: "Hero",
  type: "object",
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "text",
      rows: 3,
      description: "Main headline text. Use line breaks for multiple lines.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "highlightedWords",
      title: "Highlighted Words",
      type: "array",
      of: [{ type: "string" }],
      description: "Words to style with emerald accent (e.g. Revenue, Impact)",
    }),
    defineField({
      name: "subheadline",
      title: "Subheadline",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "ctaPrimary",
      title: "Primary CTA Text",
      type: "string",
      initialValue: "Book a Strategy Call",
    }),
    defineField({
      name: "ctaPrimaryLink",
      title: "Primary CTA Link",
      type: "string",
      initialValue: "#schedule",
    }),
    defineField({
      name: "ctaSecondary",
      title: "Secondary CTA Text",
      type: "string",
      initialValue: "View Work",
    }),
    defineField({
      name: "ctaSecondaryLink",
      title: "Secondary CTA Link",
      type: "string",
      initialValue: "#work",
    }),
    defineField({
      name: "videoLabel",
      title: "Video Label",
      type: "string",
      initialValue: "Showreel 2026",
    }),
    defineField({
      name: "videoTitle",
      title: "Video Title",
      type: "string",
      initialValue: "Crafting Digital Excellence",
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      description: "Optional: Link to video or showreel",
    }),
  ],
  preview: {
    select: { headline: "headline" },
    prepare({ headline }) {
      const preview = headline
        ? headline.split("\n")[0].slice(0, 50) + "..."
        : "Hero Section";
      return {
        title: "Hero",
        subtitle: preview,
      };
    },
  },
});
