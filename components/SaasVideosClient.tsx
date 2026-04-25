"use client";

import React from "react";
import { ServiceCalendly } from "@/components/ServiceCalendly";
import { HeroCentered } from "@/components/HeroCentered";
import { ProcessSection } from "@/components/ProcessSection";
import { ResultsSection } from "@/components/ResultsSection";
import { CenteredPricing } from "@/components/CenteredPricing";
import { WorkReelsSection } from "@/components/WorkReelsSection";
import { ProblemSolutionComparison } from "@/components/ProblemSolutionComparison";

export default function SaasVideosClient({ data }: { data: any }) {
  const documentId = data?._id;

  return (
    <div className="flex flex-col min-h-screen bg-[#05180D] selection:bg-emerald-500/30">
      <main className="grow">
        <HeroCentered
          sectionLabel={data?.sectionLabel}
          title={data?.headlineTitle || "SaaS videos that"}
          highlight={data?.headlineHighlight || "convert visitors"}
          titleAfter={data?.headlineTitleAfter || "into loyal users."}
          subtitle={data?.headlineSubtitle || "Explainer videos, product demos, and onboarding flows engineered to reduce churn and drive sign-ups."}
          ctaText={data?.heroCta}
          _documentId={documentId}
        />
        <WorkReelsSection workData={data?.work} documentId={documentId} />
        <ProblemSolutionComparison
          problems={data?.problems || []}
          solutions={data?.solutions || []}
          problemsLabel={data?.problemsLabel || "The Problem"}
          problemsTitle={data?.problemsTitle || "The Old Way"}
          solutionsLabel={data?.solutionsLabel || "The Matera Solution"}
          solutionsTitle={data?.solutionsTitle || "SaaS That Converts"}
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
