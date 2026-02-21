import { defineField, defineType } from "sanity";

export default defineType({
  name: "inquiry",
  title: "Inquiry",
  type: "document",
  icon: () => "📋",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "company",
      title: "Company / Brand",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "serviceInterest",
      title: "Service Interest",
      type: "string",
      options: {
        list: [
          { title: "Ad Creatives", value: "ad-creatives" },
          { title: "Organic Content / YouTube", value: "organic-content-youtube" },
          { title: "SaaS Videos", value: "saas-videos" },
        ],
        layout: "dropdown",
      },
    }),
    defineField({
      name: "budget",
      title: "Budget Range",
      type: "string",
      options: {
        list: [
          { title: "Under $2k/mo", value: "under-2k" },
          { title: "$2k – $5k/mo", value: "2k-5k" },
          { title: "$5k – $10k/mo", value: "5k-10k" },
          { title: "$10k+/mo", value: "10k-plus" },
          { title: "Not sure yet", value: "unsure" },
        ],
        layout: "dropdown",
      },
    }),
    defineField({
      name: "timeline",
      title: "Timeline",
      type: "string",
      options: {
        list: [
          { title: "ASAP", value: "asap" },
          { title: "Within 2 weeks", value: "2-weeks" },
          { title: "Within 1 month", value: "1-month" },
          { title: "Within 3 months", value: "3-months" },
          { title: "Exploring options", value: "exploring" },
        ],
        layout: "dropdown",
      },
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "sourcePage",
      title: "Source Page",
      type: "string",
      description: "Page where the form was submitted",
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  orderings: [
    {
      title: "Submitted At, New",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
    {
      title: "Submitted At, Old",
      name: "submittedAtAsc",
      by: [{ field: "submittedAt", direction: "asc" }],
    },
  ],
  preview: {
    select: { name: "name", company: "company", submittedAt: "submittedAt" },
    prepare({ name, company, submittedAt }) {
      const date = submittedAt ? new Date(submittedAt).toLocaleDateString() : "";
      return {
        title: name || "Unnamed",
        subtitle: company ? `${company} • ${date}` : date,
      };
    },
  },
});
