import { defineField, defineType } from "sanity";

export default defineType({
  name: "hero",
  title: "Hero",
  type: "object",
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "text", // Rows property works here
      rows: 3,
      description: "Main tagline — displayed as minimalist headline.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "highlightedWords",
      title: "Words to Highlight",
      type: "array", // Of property works here
      of: [{ type: "string" }],
      description: "Type a word and PRESS ENTER to save it as a tag.",
      options: {
        layout: "tags",
      },
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
      description: "Paste a YouTube link here.",
    }),
  ],
  preview: {
    select: { headline: "headline" },
    prepare({ headline }) {
      const preview = headline ? headline.slice(0, 60) + "..." : "Hero Section";
      return { title: "Hero", subtitle: preview };
    },
  },
});