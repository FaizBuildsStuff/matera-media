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

const servicePageAdCreatives = {
  _id: "service-ad-creatives",
  _type: "servicePage",
  slug: "ad-creatives",
  sectionLabel: "Ad Creatives",
  headlineTitle: "Performance creative that",
  headlineHighlight: "earns attention",
  headlineTitleAfter: "and converts.",
  headlineSubtitle:
    "We build an always-on creative system: hooks, angles, iterations, and production built around measurable outcomes.",
  bookACallHeading: "Let's audit your creative and map the next 30 days.",
  bookACallCta: "Book Strategy Call",
  problemsLabel: "Problems",
  problemsTitle: "What clients are usually going through",
  problems: [
    {
      _key: "p1",
      title: "Your ads look good… but don't convert",
      description:
        "Creative is the #1 lever in paid, yet most brands ship pretty videos without a testing system.",
    },
    {
      _key: "p2",
      title: "Inconsistent hooks and weak retention",
      description:
        "If the first 2 seconds don't earn attention, you'll never reach the offer.",
    },
    {
      _key: "p3",
      title: "You're guessing what to make next",
      description:
        "Without a creative feedback loop, scaling turns into random iteration and wasted spend.",
    },
  ],
  solutionsLabel: "Solutions",
  solutionsTitle: "How we fix it",
  solutions: [
    {
      _key: "s1",
      title: "Hook testing + iteration loop",
      description:
        "We produce variations fast, read performance signals, and double down on winners.",
    },
    {
      _key: "s2",
      title: "Performance-first editing system",
      description:
        "Pacing, pattern interrupts, captions, and CTA structure designed for watch time and clicks.",
    },
    {
      _key: "s3",
      title: "Creative strategy built into production",
      description:
        "Angles, messaging, and offer clarity mapped before we touch the timeline.",
    },
  ],
  resultsLabel: "Results",
  resultsTitle: "Outcomes you can actually feel",
  results: [
    { _key: "r1", label: "Faster iteration", value: "48–72h" },
    { _key: "r2", label: "Creative volume", value: "4–12/mo" },
    { _key: "r3", label: "Systemized testing", value: "Always-on" },
  ],
  plansLabel: "Plans",
  plansTitle: "Plans built for performance.",
  plansSubtitle: "Pick a tier that matches your testing velocity. Upgrade anytime.",
  plans: [
    {
      _key: "ad-lite",
      name: "Creative Starter",
      description: "A focused monthly drop to get momentum.",
      features: ["4 short-form ads", "2 angles + variations", "Performance review call", "48–72h iterations"],
      popular: false,
    },
    {
      _key: "ad-core",
      name: "Creative Core",
      description: "Always-on testing for consistent winners.",
      features: ["8 short-form ads", "Hook testing system", "Weekly creative sync", "Priority turnaround"],
      popular: true,
    },
    {
      _key: "ad-scale",
      name: "Scale Suite",
      description: "High-volume creative for aggressive growth.",
      features: ["12+ ads/month", "Multi-platform variants", "Dedicated strategist", "Rapid iteration loop"],
      popular: false,
    },
  ],
  calendlyTitle: "Book a Call — Ad Creative Audit",
  calendlySubtitle:
    "Bring your best-performing ads (and your worst). We'll map hooks, angles, and a 30-day iteration plan.",
  faqLabel: "FAQs",
  faqTitle: "Ad creative questions — answered.",
  faqHighlightedWord: "answered.",
  faqItems: [
    {
      _key: "ac-1",
      question: "Do you handle strategy or only editing?",
      answer:
        "Both. We map angles, hooks, and offers before production, then iterate based on performance feedback.",
    },
    {
      _key: "ac-2",
      question: "How fast can we ship iterations?",
      answer: "Typically 48–72 hours for iteration cycles once we're in motion.",
    },
    {
      _key: "ac-3",
      question: "Will you adapt creatives for different platforms?",
      answer:
        "Yes—format, pacing, and text treatments are tailored for each placement (Meta, TikTok, YouTube Shorts, etc.).",
    },
  ],
};

const servicePageOrganic = {
  ...servicePageAdCreatives,
  _id: "service-organic-content-youtube",
  slug: "organic-content-youtube",
  sectionLabel: "Organic Content / YouTube",
  headlineTitle: "Content that builds",
  headlineHighlight: "authority",
  headlineTitleAfter: "and inbound demand.",
  headlineSubtitle:
    "We engineer a content pipeline that compounds: strategy, scripts, recording workflow, editing, and distribution.",
  bookACallHeading: "Let's design a content system you can sustain.",
  problemsTitle: "What clients are usually going through",
  problems: [
    { _key: "p1", title: "Content is inconsistent", description: "You post when you can, not when the system demands—so growth stalls." },
    { _key: "p2", title: "Great ideas, weak execution", description: "No repeatable structure, no retention engineering, no scalable editing pipeline." },
    { _key: "p3", title: "Views don't turn into pipeline", description: "Without positioning and CTAs, attention never becomes trust (or revenue)." },
  ],
  solutions: [
    { _key: "s1", title: "A repeatable content system", description: "Topics, hooks, and formats built around your ICP and the buying journey." },
    { _key: "s2", title: "Retention-first editing", description: "Pacing, overlays, and narrative structure designed to keep viewers watching." },
    { _key: "s3", title: "Distribution + repurposing", description: "One recording → multiple outputs across Shorts, Reels, TikTok, and long-form." },
  ],
  results: [
    { _key: "r1", label: "Publishing cadence", value: "3–7/wk" },
    { _key: "r2", label: "Repurposing leverage", value: "1 → 8" },
    { _key: "r3", label: "Authority compounding", value: "Month 2+" },
  ],
  resultsTitle: "Growth that compounds over time",
  plansTitle: "Plans for consistent publishing.",
  plansSubtitle: "Choose the cadence that matches your goals and your capacity to record.",
  plans: [
    { _key: "oc-lite", name: "Momentum", description: "Get consistent and start compounding.", features: ["Topic + hook bank", "3 shorts/week", "Editing + captions", "Monthly planning call"], popular: false },
    { _key: "oc-core", name: "Authority", description: "Build credibility with a strong weekly rhythm.", features: ["Content system + formats", "5 shorts/week", "Repurposing package", "Weekly sync"], popular: true },
    { _key: "oc-scale", name: "Dominate", description: "High output across channels, end-to-end.", features: ["7 shorts/week", "Long-form support", "Multi-platform distribution", "Dedicated editor"], popular: false },
  ],
  calendlyTitle: "Book a Call — Content System Blueprint",
  calendlySubtitle: "We'll map topics, formats, cadence, and a workflow your team can actually sustain.",
  faqTitle: "Organic growth questions — answered.",
  faqItems: [
    { _key: "oc-1", question: "Do you help with topics and scripting?", answer: "Yes—topics, hooks, outlines, and repeatable formats are part of the system we build." },
    { _key: "oc-2", question: "Can you repurpose long-form into shorts?", answer: "Absolutely. We can turn long-form recordings into multiple short-form deliverables." },
    { _key: "oc-3", question: "Will this work for B2B?", answer: "Yes. We structure content around buyer intent, credibility, and conversion—not trends." },
  ],
};

const servicePageSaas = {
  ...servicePageAdCreatives,
  _id: "service-saas-videos",
  slug: "saas-videos",
  sectionLabel: "SaaS Videos",
  headlineTitle: "Videos that make your",
  headlineHighlight: "product",
  headlineTitleAfter: "feel obvious to buy.",
  headlineSubtitle: "Explainers, demos, feature launches, and ads designed to increase clarity, trust, and conversion.",
  bookACallHeading: "Let's turn your product into a story prospects understand.",
  problems: [
    { _key: "p1", title: "Your product is complex", description: "Features don't sell themselves—clarity and narrative do. Most SaaS videos explain without persuading." },
    { _key: "p2", title: "Demos feel flat", description: "If the story isn't compelling, prospects bounce before they understand value." },
    { _key: "p3", title: "Inconsistent positioning", description: "Messaging drifts across ads, landing pages, and sales calls—hurting conversion." },
  ],
  solutions: [
    { _key: "s1", title: "Message clarity + narrative", description: "We translate features into outcomes and structure the story around the buyer's job-to-be-done." },
    { _key: "s2", title: "Product-led visuals", description: "UI capture, motion, and pacing designed to feel premium and easy to follow." },
    { _key: "s3", title: "Full-funnel video system", description: "Ads, explainers, onboarding, and feature launches that match each stage of intent." },
  ],
  results: [
    { _key: "r1", label: "Clarity uplift", value: "Instant" },
    { _key: "r2", label: "Sales enablement", value: "Always-on" },
    { _key: "r3", label: "Full-funnel assets", value: "4+" },
  ],
  resultsTitle: "The outcomes: clarity → confidence → conversion",
  plansTitle: "Plans for SaaS video production.",
  plansSubtitle: "From a single flagship asset to a full-funnel system.",
  plans: [
    { _key: "sv-1", name: "Explainer Sprint", description: "One flagship video, built with clarity.", features: ["Messaging workshop", "Script + storyboard", "Motion + UI capture", "Delivery-ready exports"], popular: false },
    { _key: "sv-2", name: "Launch Kit", description: "Launch assets across the funnel.", features: ["Feature launch video", "3 cutdowns", "Landing page embed", "Sales enablement edits"], popular: true },
    { _key: "sv-3", name: "Full-Funnel System", description: "Ongoing production for growth teams.", features: ["Monthly video system", "Ad + product assets", "Onboarding/education", "Dedicated team"], popular: false },
  ],
  calendlyTitle: "Book a Call — SaaS Video Strategy",
  calendlySubtitle: "We'll map your core narrative, video types, and a production plan aligned to your funnel.",
  faqTitle: "SaaS video questions — answered.",
  faqItems: [
    { _key: "sv-f1", question: "Do you write scripts?", answer: "Yes. We handle narrative, structure, and on-screen flow—based on your product and ICP." },
    { _key: "sv-f2", question: "Can you capture our UI and build motion around it?", answer: "Yes—UI capture and motion design are a core part of our SaaS work." },
    { _key: "sv-f3", question: "Can we reuse the footage for ads and onboarding?", answer: "Absolutely. We plan the deliverables so you can repurpose assets across the funnel." },
  ],
};

const legalPagePrivacy = {
  _id: "legal-privacy-policy",
  _type: "legalPage",
  slug: "privacy-policy",
  title: "Your privacy matters.",
  subtitle:
    "This Privacy Policy explains how Matera Media (“we”, “us”, “our”) collects, uses, and protects your information when you use our website and services.",
  lastUpdated: new Date().toISOString().slice(0, 10),
  content: [
    { _key: "c1", heading: "1. Information we collect", body: "Contact details: name, email, company, and messages you send via forms or scheduling tools.\nUsage data: pages viewed, time on site, and basic device/browser info.\nCookies: small files used to improve site experience and measure performance." },
    { _key: "c2", heading: "2. How we use your information", body: "To respond to inquiries and provide requested services.\nTo schedule calls and communicate about projects.\nTo improve our website, offers, and user experience.\nTo comply with legal obligations and prevent fraud/abuse." },
    { _key: "c3", heading: "3. Sharing your information", body: "We do not sell your personal information. We may share data with trusted service providers that help us operate the website and deliver services (e.g. hosting, analytics, scheduling tools). These providers may only use your data to perform services for us." },
    { _key: "c4", heading: "4. Third-party services", body: "Our site may include embedded tools (e.g. Calendly) or links to third-party platforms. Their privacy practices are governed by their own policies." },
    { _key: "c5", heading: "5. Data retention", body: "We retain information for as long as necessary to provide services, meet contractual obligations, or comply with legal requirements." },
    { _key: "c6", heading: "6. Security", body: "We take reasonable measures to protect your information. No method of transmission or storage is 100% secure." },
    { _key: "c7", heading: "7. Your choices", body: "You may request access, correction, or deletion of your personal information where applicable. You can disable cookies in your browser settings." },
    { _key: "c8", heading: "8. Contact us", body: "For privacy questions or requests, contact us at privacy@materamedia.com" },
  ],
};

async function seed() {
  console.log("🌱 Seeding Sanity with your component content...");
  console.log(`   Project: ${projectId}, Dataset: ${dataset}\n`);

  try {
    await client.createOrReplace(homePageDocument);
    console.log("✅ Home page seeded");

    await client.createOrReplace(servicePageAdCreatives);
    console.log("✅ Ad Creatives page seeded");
    await client.createOrReplace(servicePageOrganic);
    console.log("✅ Organic Content / YouTube page seeded");
    await client.createOrReplace(servicePageSaas);
    console.log("✅ SaaS Videos page seeded");
    await client.createOrReplace(legalPagePrivacy);
    console.log("✅ Privacy Policy seeded");

    console.log("\n→ Refresh your Studio (F5) or reopen any document");
    console.log("→ Edit at http://localhost:3000/studio or npm run studio\n");
  } catch (err) {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  }
}

seed();
