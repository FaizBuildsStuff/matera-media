"use client";

import React from "react";
import { ServiceCalendly } from "@/components/ServiceCalendly";
import { HeroCentered } from "@/components/HeroCentered";
import { ProcessSection } from "@/components/ProcessSection";
import { ResultsSection } from "@/components/ResultsSection";
import { CenteredPricing } from "@/components/CenteredPricing";
import { WorkReelsSection } from "@/components/WorkReelsSection";
import { ProblemSolutionComparison } from "@/components/ProblemSolutionComparison";
import { SectionBackground } from "@/components/SectionBackground";

export default function SaasVideosClient({ data }: { data: any }) {
  const documentId = data?._id;

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] selection:bg-white/30 overflow-x-clip relative">
      <main className="grow flex flex-col">
        {/* HERO SECTION */}
        <div className="relative overflow-visible -mt-px">
          <SectionBackground index={0} variant="hero" />
          <HeroCentered
            sectionLabel={data?.sectionLabel}
            title={data?.headlineTitle || "SaaS videos that"}
            highlight={data?.headlineHighlight || "convert visitors"}
            titleAfter={data?.headlineTitleAfter || "into loyal users."}
            subtitle={data?.headlineSubtitle || "Explainer videos, product demos, and onboarding flows engineered to reduce churn and drive sign-ups."}
            ctaText={data?.heroCta}
            _documentId={documentId}
          />
        </div>

        {/* WORK REELS */}
        <div className="relative overflow-visible -mt-px">
          <SectionBackground index={1} variant="subtle" />
          <WorkReelsSection workData={data?.work} documentId={documentId} />
        </div>

        {/* RESULTS */}
        <div className="relative overflow-visible -mt-px">
          <SectionBackground index={2} variant="subtle" />
          <ResultsSection
            title={data?.resultsTitle || "Our Results"}
            items={data?.results || []}
            documentId={documentId}
            label={data?.resultsLabel}
          />
        </div>

        {/* PROCESS */}
        <div className="relative overflow-visible -mt-px">
          <SectionBackground index={3} variant="subtle" />
          <ProcessSection data={data} documentId={documentId} />
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
