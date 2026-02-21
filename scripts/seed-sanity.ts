/**
 * Seeds Sanity with content from your hardcoded components.
 * Run once to migrate existing content to Sanity for real-time editing.
 *
 * Usage: npm run seed:sanity
 * (Requires SANITY_API_TOKEN in .env for write access)
 */

import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId) {
  console.error("❌ Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env or .env.local");
  process.exit(1);
}

if (!token) {
  console.error(
    "❌ Missing SANITY_API_TOKEN. Create a token at https://www.sanity.io/manage → API → Tokens (use Editor role)"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

// Content extracted from your components' defaults
const homePageDocument = {
  _id: "home",
  _type: "page",
  title: "Home",
  slug: { _type: "slug", current: "home" },
  sections: [
    {
      _type: "hero",
      _key: "hero-1",
      headline:
        "We help B2B Brands and Creators grow with organic content and high-performance motion ad creatives.",
      ctaPrimary: "Book a Strategy Call",
      ctaPrimaryLink: "#schedule",
      ctaSecondary: "View Work",
      ctaSecondaryLink: "#work",
      videoLabel: "Showreel 2026",
      videoTitle: "Crafting Digital Excellence",
    },
    {
      _type: "testimonials",
      _key: "testimonials-1",
      title: "Trusted by Brands & Creators",
      subtitle: "See why B2B brands and creators partner with us to grow with organic content and high-performance ad creatives.",
    },
    {
      _type: "workShowcase",
      _key: "work-1",
      title: "Selected",
      highlightedWord: "Works",
      description:
        "Shorts & reels that drive results. Filter by category.",
      items: [
        { _key: "work-item-1", title: "Meta UGC Ad", category: "Ad Creatives", tags: ["UGC", "15s"] },
        { _key: "work-item-2", title: "TikTok Performance", category: "Ad Creatives", tags: ["Hook", "6s"] },
        { _key: "work-item-3", title: "YouTube Short", category: "Organic Content", tags: ["Vertical", "60s"] },
        { _key: "work-item-4", title: "Creator Reel", category: "Organic Content", tags: ["Behind Scenes"] },
        { _key: "work-item-5", title: "Product Demo", category: "SaaS Videos", tags: ["Explainer"] },
        { _key: "work-item-6", title: "Feature Launch", category: "SaaS Videos", tags: ["30s"] },
        { _key: "work-item-7", title: "Brand Reveal", category: "Motion Graphics", tags: ["3D", "Cinematic"] },
        { _key: "work-item-8", title: "Logo Animation", category: "Motion Graphics", tags: ["2D"] },
      ],
    },
    {
      _type: "howItWorks",
      _key: "how-1",
      label: "Our Process",
      title: "From Concept to Reality.",
      highlightedWord: "Reality.",
      steps: [
        {
          _key: "step-1",
          id: "01",
          title: "Strategy & Concept",
          description:
            "We dive deep into your brand's core values and objectives to craft a unique visual narrative.",
        },
        {
          _key: "step-2",
          id: "02",
          title: "Production & Design",
          description:
            "Our team brings the concept to life with high-fidelity visuals, motion graphics, and cinematography.",
        },
        {
          _key: "step-3",
          id: "03",
          title: "Launch & Optimization",
          description:
            "We deliver polished assets ready for deployment and help you analyze performance for maximum impact.",
        },
      ],
    },
    {
      _type: "pricing",
      _key: "pricing-1",
      label: "Investment",
      title: "Transparent Pricing.",
      highlightedWord: "Pricing.",
      subtitle:
        "Choose the partnership model that best fits your growth stage. No hidden fees, just results.",
      plans: [
        {
          _key: "plan-1",
          name: "Starter",
          price: "$2,500",
          period: "/project",
          description:
            "Perfect for emerging brands needing a strong visual foundation.",
          features: [
            "Brand Identity System",
            "Social Media Assets (5)",
            "Basic Motion Graphics",
            "2 Rounds of Revisions",
            "Standard Delivery (3 weeks)",
          ],
          popular: false,
        },
        {
          _key: "plan-2",
          name: "Growth",
          price: "$5,000",
          period: "/month",
          description:
            "Comprehensive content production for scaling businesses.",
          features: [
            "Full Brand Strategy",
            "4 High-Performance Video Ads",
            "Unlimited Static Assets",
            "Priority Support",
            "Weekly Strategy Calls",
            "48h Turnaround",
          ],
          popular: true,
        },
        {
          _key: "plan-3",
          name: "Enterprise",
          price: "Custom",
          period: "",
          description:
            "Tailored solutions for large-scale campaigns and organizations.",
          features: [
            "Dedicated Creative Team",
            "Full-Funnel Campaign Production",
            "TVC & Broadcast Quality",
            "24/7 Priority Support",
            "Custom Integrations",
            "White-glove Onboarding",
          ],
          popular: false,
        },
      ],
    },
    {
      _type: "faq",
      _key: "faq-1",
      label: "Common Questions",
      title: "Everything you need to Know.",
      highlightedWord: "Know.",
      items: [
        {
          _key: "faq-1",
          question: "What is your typical turnaround time?",
          answer:
            "Our standard turnaround for most projects is 2-4 weeks, depending on complexity. For expedited deliveries, we offer rush options upon request.",
        },
        {
          _key: "faq-2",
          question: "Do you offer revisions?",
          answer:
            "Absolutely. We include 3 rounds of revisions in our standard packages to ensure the final output aligns perfectly with your vision.",
        },
        {
          _key: "faq-3",
          question: "How does the payment structure work?",
          answer:
            "We typically require a 50% deposit to commence work, with the remaining 50% due upon final delivery. We also offer milestone-based payment plans for larger projects.",
        },
        {
          _key: "faq-4",
          question: "Can you help with strategy, not just production?",
          answer:
            "Yes. Strategy is at the core of what we do. We don't just make things look good; we ensure they perform by aligning creative with your business goals.",
        },
        {
          _key: "faq-5",
          question: "What assets do I need to provide?",
          answer:
            "It depends on the project. Generally, we'll need your brand guidelines, logo files, and any specific footage or copy you want included. We can handle the rest.",
        },
      ],
    },
    {
      _type: "calendlyWidget",
      _key: "calendly-1",
      title: "Let's Build Something Extraordinary",
      highlightedWord: "Extraordinary",
      subtitle:
        "Schedule a 30-minute discovery call. No commitment, just a conversation about your vision and how we can bring it to life.",
      calendlyUrl:
        "https://calendly.com/m-faizurrehman-crypto/30min?primary_color=059669&background_color=05180D&text_color=ffffff",
    },
  ],
};

async function seed() {
  console.log("🌱 Seeding Sanity with your component content...");
  console.log(`   Project: ${projectId}, Dataset: ${dataset}\n`);

  try {
    await client.createOrReplace(homePageDocument);

    // Verify the document was created
    const doc = await client.fetch(
      `*[_id == "home"][0]{ _id, title, "sectionsCount": count(sections) }`
    );
    if (!doc) {
      console.error("❌ Document created but verification fetch failed");
      process.exit(1);
    }
    console.log("✅ Home page seeded successfully!");
    console.log(`   → Document: ${doc._id}, Sections: ${doc.sectionsCount}`);
    console.log("   → Refresh your Studio (F5) or reopen Home Page");
    console.log("   → Edit at http://localhost:3000/studio or npm run studio\n");
  } catch (err) {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  }
}

seed();
