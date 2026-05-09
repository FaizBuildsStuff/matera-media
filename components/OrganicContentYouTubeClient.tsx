"use client";

import React from "react";
import { ServiceCalendly } from "@/components/ServiceCalendly";
import { HeroCentered } from "@/components/HeroCentered";
import { HowItWorksSimple } from "@/components/HowItWorksSimple";
import { ProcessSection } from "@/components/ProcessSection";
import { ResultsSection } from "@/components/ResultsSection";
import { CenteredPricing } from "@/components/CenteredPricing";
import { WorkReelsSection } from "@/components/WorkReelsSection";
import { SectionBackground } from "@/components/SectionBackground";

export default function OrganicContentYouTubeClient({ data }: { data: any }) {
  const documentId = data?._id;

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] selection:bg-white/30 overflow-x-clip relative">
      <main className="grow flex flex-col">
        {/* HERO SECTION */}
        <div className="relative overflow-visible -mt-px">
          <SectionBackground index={0} variant="hero" />
          <HeroCentered
            sectionLabel={data?.sectionLabel}
            title={data?.headlineTitle || "Organic YouTube content that"}
            highlight={data?.headlineHighlight || "builds authority"}
            titleAfter={data?.headlineTitleAfter || "and drives real growth."}
            subtitle={data?.headlineSubtitle || "A strategy-first YouTube system focused on storytelling, retention, and long-term audience building — not paid ads."}
            ctaText={data?.heroCta}
            _documentId={documentId}
          />
        </div>

        {/* WORK REELS */}
        <div className="relative overflow-visible -mt-px">
          <SectionBackground index={1} variant="subtle" />
          <WorkReelsSection workData={data?.work} documentId={documentId} />
        </div>

        {/* HOW IT WORKS */}
        <div className="relative overflow-visible -mt-px">
          <SectionBackground index={2} variant="subtle" />
          <HowItWorksSimple
            data={data?.howItWorksSimple || {
              active: true,
              badge: "How it works",
              title: "Getting started is simple.",
              highlight: "simple.",
              subtitle: "You get on camera, we handle the rest",
              steps: [
                { title: "Brand Audit", description: "We get to know you—your voice, your vision, and what kind of content will actually move the needle.", icon: "search" },
                { title: "Content Calendar", description: "We build a tailored content roadmap + fill your calendar with viral-ready ideas and scripts that sound like you.", icon: "calendar" },
                { title: "Full Production", description: "You record—we turn it into scroll-stopping videos, publish across all platforms, and fuel it with SEO.", icon: "camera" }
              ]
            }}
            _documentId={documentId}
          />
        </div>

        {/* RESULTS */}
        <div className="relative overflow-visible -mt-px">
          <SectionBackground index={3} variant="subtle" />
          <ResultsSection
            title={data?.resultsTitle || "Our Results"}
            items={data?.results || []}
            documentId={documentId}
            label={data?.resultsLabel}
          />
        </div>

        {/* PRICING */}
        <div className="relative overflow-visible -mt-px">
          <SectionBackground index={4} variant="subtle" />
          <CenteredPricing data={data} documentId={documentId} />
        </div>

        {/* CALENDLY */}
        <div className="relative overflow-visible -mt-px">
          <SectionBackground index={5} variant="subtle" />
          <ServiceCalendly content={{
            title: data?.calendlyTitle,
            subtitle: data?.calendlySubtitle,
            calendlyUrl: data?.calendlyUrl,
            highlightedWord: data?.calendlyHighlightedWord,
            _documentId: documentId
          }} />
        </div>
      </main>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
