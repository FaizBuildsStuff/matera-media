"use client";

import React from "react";
import { Hero } from "@/components/Hero";
import { WorkShowcase } from "@/components/WorkShowcase";
import { HowItWorks } from "@/components/HowItWorks";
import { FAQ } from "@/components/FAQ";
import Pricing from "@/components/pricing";
import { CalendlyWidget } from "@/components/CalendlyWidget";
import Testimonials from "./testimonials";
import { CareersSection } from "@/components/career";

type TestimonialsSection = {
  title?: string;
  subtitle?: string;
};

type CareersSectionType = {
  label?: string;
  title?: string;
  highlightedWord?: string;
  items?: Array<{
    title: string;
    department: string;
    location: string;
    type: string;
    link: string;
  }>;
};

// Fix: Match types to component expectations (Removing optional flags where required)
type WorkShowcaseSection = {
  title?: string;
  highlightedWord?: string;
  description?: string;
  items?: Array<{
    _key: string;
    title: string; // Required
    category?: string;
    tags?: string[];
    image?: string;
    videoUrl?: string;
    directVideoUrl?: string; // Added for Sanity PC upload
    videoSource?: "file" | "youtube" | "none"; // Added
    link?: string;
  }>;
};

type HowItWorksSection = {
  label?: string;
  title?: string;
  highlightedWord?: string;
  steps?: Array<{
    _key: string;
    id: string;          // Fix: Changed from string | undefined to string
    title: string;       // Fix: Changed from string | undefined to string
    description: string; // Fix: Changed from string | undefined to string
  }>;
};

type PricingSection = {
  label?: string;
  title?: string;
  highlightedWord?: string;
  subtitle?: string;
  plans?: Array<{
    _key: string;
    name?: string;
    price?: string;
    period?: string;
    description?: string;
    features?: string[];
    popular?: boolean;
  }>;
};

type FAQSection = {
  label?: string;
  title?: string;
  highlightedWord?: string;
  items?: Array<{
    _key: string;
    question?: string;
    answer?: string;
  }>;
};

type CalendlySection = {
  title?: string;
  highlightedWord?: string;
  subtitle?: string;
  calendlyUrl?: string;
};

type HeroSection = {
  headline?: string;
  ctaPrimary?: string;
  ctaPrimaryLink?: string;
  ctaSecondary?: string;
  ctaSecondaryLink?: string;
  videoLabel?: string;
  videoTitle?: string;
  videoUrl?: string;
};

export type SectionBlock =
  | ({ _type: "hero"; _key: string } & HeroSection)
  | ({ _type: "workShowcase"; _key: string } & WorkShowcaseSection)
  | ({ _type: "howItWorks"; _key: string } & HowItWorksSection)
  | ({ _type: "pricing"; _key: string } & PricingSection)
  | ({ _type: "careers"; _key: string } & CareersSectionType)
  | ({ _type: "faq"; _key: string } & FAQSection)
  | ({ _type: "calendlyWidget"; _key: string } & CalendlySection)
  | ({ _type: "testimonials"; _key: string } & TestimonialsSection);

interface SectionRendererProps {
  sections: SectionBlock[] | null | undefined;
}

export function SectionRenderer({ sections }: SectionRendererProps) {
  if (!sections || sections.length === 0) {
    return <DefaultSections />;
  }

  return (
    <>
      {sections.map((section) => (
        <RenderBlock key={section._key} section={section} />
      ))}
    </>
  );
}

// Renamed to avoid collision with SectionBlock type
function RenderBlock({ section }: { section: SectionBlock }) {
  switch (section._type) {
    case "hero":
      return <Hero content={section} />;
    case "testimonials":
      return <Testimonials />;
    case "workShowcase":
      return <WorkShowcase content={section} />;
    case "howItWorks":
      return <HowItWorks content={section} />;
    case "pricing":
      return <Pricing content={section} />;
    case "careers":
      return <CareersSection content={section} />;
    case "faq":
      return <FAQ content={section} />;
    case "calendlyWidget":
      return <CalendlyWidget content={section} />;
    default:
      return null;
  }
}

function DefaultSections() {
  return (
    <>
      <Hero />
      <Testimonials />
      <WorkShowcase />
      <HowItWorks />
      <Pricing />
      <CareersSection />
      <FAQ />
      <CalendlyWidget />
    </>
  );
}