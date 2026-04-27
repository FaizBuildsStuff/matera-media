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
import { ResultsSection } from "@/components/ResultsSection";
import { ProcessSection } from "@/components/ProcessSection";
import { AddRemoveControls } from "./visual-editing/AddRemoveControls";

// --- TYPES ---

type TestimonialsSection = {
  label?: string;
  title?: string;
  description?: string;
  items?: Array<{
    _key: string;
    name: string;
    role: string;
    quote: string;
    image?: string;
  }>;
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

type WorkShowcaseSection = {
  title?: string;
  highlightedWord?: string;
  description?: string;
  items?: Array<{
    _key: string;
    title: string;
    category?: string;
    tags?: string[];
    image?: string;
    videoUrl?: string;
    directVideoUrl?: string;
    videoSource?: "file" | "youtube" | "none";
    link?: string;
  }>;
};

type HowItWorksSection = {
  label?: string;
  title?: string;
  highlightedWord?: string;
  steps?: Array<{
    _key: string;
    id: string;
    title: string;
    description: string;
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

type ResultsSectionType = {
  resultsLabel?: string;
  resultsTitle?: string;
  results?: any[];
};

type ProcessSectionType = {
  processLabel?: string;
  processTitle?: string;
  processSteps?: any[];
};

export type SectionBlock =
  | ({ _type: "hero"; _key: string } & HeroSection)
  | ({ _type: "workShowcase"; _key: string } & WorkShowcaseSection)
  | ({ _type: "howItWorks"; _key: string } & HowItWorksSection)
  | ({ _type: "pricing"; _key: string } & PricingSection)
  | ({ _type: "careers"; _key: string } & CareersSectionType)
  | ({ _type: "faq"; _key: string } & FAQSection)
  | ({ _type: "calendlyWidget"; _key: string } & CalendlySection)
  | ({ _type: "testimonials"; _key: string } & TestimonialsSection)
  | ({ _type: "resultsSection"; _key: string } & ResultsSectionType)
  | ({ _type: "processSection"; _key: string } & ProcessSectionType);

interface SectionRendererProps {
  sections: SectionBlock[] | null | undefined;
  documentId?: string;
}

// --- MAIN RENDERER ---

export function SectionRenderer({ sections, documentId }: SectionRendererProps) {
  return (
    <main className="bg-[#05180D] min-h-screen flex flex-col">
      {!sections || sections.length === 0 ? (
        <DefaultSections />
      ) : (
        sections.map((section, index) => (
          <div key={section._key} className="relative group/section">
            <RenderBlock section={section} documentId={documentId} />
            
            {/* Section-level Controls */}
            {documentId && (
              <div className="absolute top-4 right-4 z-50 opacity-0 group-hover/section:opacity-100 transition-opacity">
                <AddRemoveControls 
                  id={documentId} 
                  field="sections" 
                  itemKey={section._key} 
                  label="Section"
                  className="bg-black/80 backdrop-blur-md p-2 rounded-full border border-white/10 shadow-2xl"
                  newItemTemplate={{ _type: "hero", _key: Math.random().toString(36).substring(7) }}
                  fields={[
                    { 
                      name: "_type", 
                      label: "Section Type", 
                      type: "string", 
                      placeholder: "hero, workShowcase, howItWorks, pricing, faq, calendlyWidget, testimonials, resultsSection, processSection" 
                    }
                  ]}
                />
              </div>
            )}
          </div>
        ))
      )}
      {documentId && (
        <div className="flex justify-center py-10 border-t border-white/5 bg-[#05180D]">
          <AddRemoveControls 
            id={documentId} 
            field="sections" 
            label="Section" 
            newItemTemplate={{ _type: "hero", _key: Math.random().toString(36).substring(7) }}
            fields={[
              { 
                name: "_type", 
                label: "Section Type", 
                type: "string", 
                placeholder: "hero, workShowcase, howItWorks, pricing, faq, calendlyWidget, testimonials, resultsSection, processSection" 
              }
            ]}
          />
        </div>
      )}
    </main>
  );
}

function RenderBlock({ section, documentId }: { section: SectionBlock; documentId?: string }) {
  // We return the components directly without wrapping divs to avoid extra spacing
  switch (section._type) {
    case "hero":
      return <Hero content={{ ...section, _documentId: documentId, _sectionKey: section._key }} />;
    case "testimonials":
      return <Testimonials content={{ ...section, _documentId: documentId, _sectionKey: section._key }} />;
    case "workShowcase":
      return <WorkShowcase content={{ ...section, _documentId: documentId, _sectionKey: section._key }} />;
    case "howItWorks":
      return <HowItWorks content={{ ...section, _documentId: documentId, _sectionKey: section._key }} />;
    case "pricing":
      return <Pricing content={{ ...section, _documentId: documentId, _sectionKey: section._key }} />;
    case "careers":
      return <CareersSection content={{ ...section, _documentId: documentId, _sectionKey: section._key }} />;
    case "faq":
      return <FAQ content={{ ...section, _documentId: documentId, _sectionKey: section._key }} />;
    case "calendlyWidget":
      return <CalendlyWidget content={{ ...section, _documentId: documentId, _sectionKey: section._key }} />;
    case "resultsSection":
      return <ResultsSection 
        items={section.results || []} 
        label={section.resultsLabel} 
        title={section.resultsTitle || ""} 
        documentId={documentId} 
      />;
    case "processSection":
      return <ProcessSection 
        data={{
          processSteps: section.processSteps || [],
          processLabel: section.processLabel,
          processTitle: section.processTitle
        }}
        documentId={documentId} 
      />;
    default:
      return null;
  }
}

function DefaultSections() {
  return (
    <>
      <Hero />
      <Testimonials content={undefined} />
      <WorkShowcase />
      <HowItWorks />
      <Pricing />
      <CareersSection />
      <FAQ />
      <CalendlyWidget />
    </>
  );
}