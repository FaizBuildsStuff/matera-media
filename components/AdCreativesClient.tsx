"use client";

import React from "react";
import { ServiceCalendly } from "@/components/ServiceCalendly";
import { ProblemSolutionComparison } from "@/components/ProblemSolutionComparison";
import { HeroCentered } from "@/components/HeroCentered";
import { ProcessSection } from "@/components/ProcessSection";
import { ResultsSection } from "@/components/ResultsSection";
import { CenteredPricing } from "@/components/CenteredPricing";
import { WorkReelsSection } from "@/components/WorkReelsSection";


export default function AdCreativesClient({ data }: { data: any }) {
  const documentId = data?._id;

  return (
    <div className="flex flex-col min-h-screen bg-[#05180D] selection:bg-emerald-500/30">
      <main className="grow">
        <HeroCentered
          sectionLabel={data?.sectionLabel}
          title={data?.headlineTitle || "Performance creative that"}
          highlight={data?.headlineHighlight || "earns attention"}
          titleAfter={data?.headlineTitleAfter || "and converts."}
          subtitle={data?.headlineSubtitle || "An always-on creative system: hooks, angles, and iterations built for measurable revenue growth."}
          ctaText={data?.heroCta}
          _documentId={documentId}
        />
        <WorkReelsSection workData={data?.work} documentId={documentId} />
        <ProblemSolutionComparison
          problems={data?.problems || []}
          solutions={data?.solutions || []}
          problemsLabel={data?.problemsLabel || "The Problem"}
          problemsTitle={data?.problemsTitle || "Old Way"}
          solutionsLabel={data?.solutionsLabel || "The Matera Solution"}
          solutionsTitle={data?.solutionsTitle || "Dominate Media"}
          _documentId={documentId}
        />
        <ResultsSection
          title={data?.resultsTitle || "Our Results"}
          items={data?.results || []}
          documentId={documentId}
          label={data?.resultsLabel}
        />
        <ProcessSection data={data} documentId={documentId} />
        <CenteredPricing data={data} documentId={documentId} />
        <ServiceCalendly content={{
          title: data?.calendlyTitle,
          subtitle: data?.calendlySubtitle,
          calendlyUrl: data?.calendlyUrl,
          highlightedWord: data?.calendlyHighlightedWord,
          _documentId: documentId
        }} />
      </main>
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
