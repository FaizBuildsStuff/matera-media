import { defineField, defineType } from "sanity";

export const workItem = defineType({
  name: "workItem",
  title: "Work Item",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Ad Creatives", value: "Ad Creatives" },
          { title: "Organic Content / YouTube", value: "Organic Content" },
          { title: "SaaS Videos", value: "SaaS Videos" },
          { title: "Motion Graphics", value: "Motion Graphics" },
        ],
      },
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "image",
      title: "Thumbnail / Cover Image",
      type: "image",
      options: { hotspot: true },
      description: "This shows as the preview or if no video is provided.",
    }),
    defineField({
      name: "videoSource",
      title: "Video Source",
      type: "string",
      options: {
        list: [
          { title: "Upload Video (Direct from PC)", value: "file" },
          { title: "YouTube URL", value: "youtube" },
          { title: "None (Image Only)", value: "none" },
        ],
        layout: "radio",
      },
      initialValue: "file",
    }),
    defineField({
      name: "videoFile",
      title: "Video Upload",
      type: "file",
      description: "Upload MP4/WebM videos directly from your computer.",
      options: {
        accept: "video/*",
      },
      hidden: ({ parent }) => parent?.videoSource !== "file",
    }),
    defineField({
      name: "videoUrl",
      title: "YouTube URL",
      type: "url",
      description: "e.g., https://www.youtube.com/watch?v=...",
      hidden: ({ parent }) => parent?.videoSource !== "youtube",
    }),
    defineField({
      name: "link",
      title: "External Link",
      type: "url",
      description: "Optional link when clicking the item",
    }),
  ],
  preview: {
    select: { title: "title", media: "image" },
    prepare({ title, media }) {
      return { 
        title: title || "Work Item",
        media: media 
      };
    },
  },
});

export default defineType({
  name: "workShowcase",
  title: "Work Showcase",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "text",
      rows: 2,
      initialValue: "Our Work",
      description: "Displayed as the heading above the reel cards (e.g. 'Our Work', 'Selected Reels')",
    }),
    defineField({
      name: "highlightedWord",
      title: "Highlighted Word",
      type: "text",
      rows: 2,
      initialValue: "Works",
    }),
    defineField({
      name: "description",
      title: "Subtitle / Tagline",
      type: "text",
      rows: 2,
      description: "Short italic tagline shown below the section title (e.g. 'High-converting SaaS video content.')",
    }),
    defineField({
      name: "items",
      title: "Work Items",
      type: "array",
      of: [{ type: "workItem" }],
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return {
        title: "Work Showcase",
        subtitle: title,
      };
    },
  },
});