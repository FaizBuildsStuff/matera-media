import Link from "next/link";
import { client } from "@/lib/sanity";
import { servicePageQuery } from "@/lib/queries";
import { Button } from "@/components/ui/button";
import { WorkShowcase } from "@/components/WorkShowcase";
import Pricing from "@/components/pricing";
import { CalendlyWidget } from "@/components/CalendlyWidget";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { SectionMerge } from "@/components/SectionMerge";

const BG_BASE = "#05180D";
const BG_SEC = "#062017";

const PROBLEMS = [
  {
    title: "Your ads look goodâ€¦ but donâ€™t convert",
    description:
      "Creative is the #1 lever in paid, yet most brands ship pretty videos without a testing system.",
  },
  {
    title: "Inconsistent hooks and weak retention",
    description:
      "If the first 2 seconds donâ€™t earn attention, youâ€™ll never reach the offer.",
  },
  {
    title: "Youâ€™re guessing what to make next",
    description:
      "Without a creative feedback loop, scaling turns into random iteration and wasted spend.",
  },
];

const SOLUTIONS = [
  {
    title: "Hook testing + iteration loop",
    description:
      "We produce variations fast, read performance signals, and double down on winners.",
  },
  {
    title: "Performance-first editing system",
    description:
      "Pacing, pattern interrupts, captions, and CTA structure designed for watch time and clicks.",
  },
  {
    title: "Creative strategy built into production",
    description:
      "Angles, messaging, and offer clarity mapped before we touch the timeline.",
  },
];

const DEFAULT_RESULTS = [
  { label: "Faster iteration", value: "48â€“72h" },
  { label: "Creative volume", value: "4â€“12/mo" },
  { label: "Systemized testing", value: "Always-on" },
];

export default async function AdCreativesPage() {
  const content = await client.fetch<Record<string, unknown> | null>(servicePageQuery, { slug: "ad-creatives" });
  const sectionLabel = (content?.sectionLabel as string) ?? "Ad Creatives";
  const headlineTitle = (content?.headlineTitle as string) ?? "Performance creative that";
  const headlineHighlight = (content?.headlineHighlight as string) ?? "earns attention";
  const headlineTitleAfter = (content?.headlineTitleAfter as string) ?? "and converts.";
  const headlineSubtitle = (content?.headlineSubtitle as string) ?? "We build an always-on creative system: hooks, angles, iterations, and production built around measurable outcomes.";
  const bookACallHeading = (content?.bookACallHeading as string) ?? "{bookACallHeading}";
  const bookACallCta = (content?.bookACallCta as string) ?? "Book Strategy Call";
  const problems = (content?.problems as { _key?: string; title?: string; description?: string }[] | undefined)?.length
    ? (content.problems as { _key?: string; title?: string; description?: string }[])
    : PROBLEMS.map((p, i) => ({ ...p, _key: `p${i}` }));
  const solutions = (content?.solutions as { _key?: string; title?: string; description?: string }[] | undefined)?.length
    ? (content.solutions as { _key?: string; title?: string; description?: string }[])
    : SOLUTIONS.map((s, i) => ({ ...s, _key: `s${i}` }));
  const results = (content?.results as { _key?: string; label?: string; value?: string }[] | undefined)?.length
    ? (content.results as { _key?: string; label?: string; value?: string }[])
    : DEFAULT_RESULTS.map((r, i) => ({ ...r, _key: `r${i}` }));
  const problemsLabel = (content?.problemsLabel as string) ?? "Problems";
  const problemsTitle = (content?.problemsTitle as string) ?? "What clients are usually going through";
  const solutionsLabel = (content?.solutionsLabel as string) ?? "Solutions";
  const solutionsTitle = (content?.solutionsTitle as string) ?? "How we fix it";
  const resultsLabel = (content?.resultsLabel as string) ?? "Results";
  const resultsTitle = (content?.resultsTitle as string) ?? "Outcomes you can actually feel";
  const plansLabel = (content?.plansLabel as string) ?? "Plans";
  const plansTitle = (content?.plansTitle as string) ?? "Plans built for performance.";
  const plansSubtitle = (content?.plansSubtitle as string) ?? "Pick a tier that matches your testing velocity. Upgrade anytime.";
  const plans = (content?.plans as { _key?: string; name?: string; description?: string; features?: string[]; popular?: boolean }[] | undefined)?.length
    ? (content.plans as { _key?: string; name?: string; description?: string; features?: string[]; popular?: boolean }[])
    : [
        { _key: "ad-lite", name: "Creative Starter", description: "A focused monthly drop to get momentum.", features: ["4 short-form ads", "2 angles + variations", "Performance review call", "48â€“72h iterations"], popular: false },
        { _key: "ad-core", name: "Creative Core", description: "Always-on testing for consistent winners.", features: ["8 short-form ads", "Hook testing system", "Weekly creative sync", "Priority turnaround"], popular: true },
        { _key: "ad-scale", name: "Scale Suite", description: "High-volume creative for aggressive growth.", features: ["12+ ads/month", "Multi-platform variants", "Dedicated strategist", "Rapid iteration loop"], popular: false },
      ];
  const calendlyTitle = (content?.calendlyTitle as string) ?? "Book a Call â€” Ad Creative Audit";
  const calendlySubtitle = (content?.calendlySubtitle as string) ?? "Bring your best-performing ads (and your worst). We'll map hooks, angles, and a 30-day iteration plan.";
  const faqLabel = (content?.faqLabel as string) ?? "FAQs";
  const faqTitle = (content?.faqTitle as string) ?? "Ad creative questions â€” answered.";
  const faqHighlightedWord = (content?.faqHighlightedWord as string) ?? "answered.";
  const faqItems = (content?.faqItems as { _key?: string; question?: string; answer?: string }[] | undefined)?.length
    ? (content.faqItems as { _key?: string; question?: string; answer?: string }[])
    : [
        { _key: "ac-1", question: "Do you handle strategy or only editing?", answer: "Both. We map angles, hooks, and offers before production, then iterate based on performance feedback." },
        { _key: "ac-2", question: "How fast can we ship iterations?", answer: "Typically 48â€“72 hours for iteration cycles once we're in motion." },
        { _key: "ac-3", question: "Will you adapt creatives for different platforms?", answer: "Yesâ€”format, pacing, and text treatments are tailored for each placement (Meta, TikTok, YouTube Shorts, etc.)." },
      ];

  return (
    <div className="flex flex-col min-h-screen bg-[#05180D]">
      <main className="grow">
        {/* Headline */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-[#05180D]">
          <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.18),transparent_45%)]" />
          <div className="absolute -right-24 top-24 w-[520px] h-[520px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
          <SectionMerge toColor={BG_SEC} />

          <div className="relative max-w-7xl mx-auto z-10">
            <p className="text-emerald-300/80 text-xs font-medium tracking-[0.2em] uppercase mb-6">
              {sectionLabel}
            </p>
            <h1 className="text-5xl md:text-7xl font-instrument-sans font-medium text-white tracking-tight leading-[0.95] max-w-4xl">
              {headlineTitle}{" "}
              <span className="font-instrument-serif italic text-emerald-300/90">
                {headlineHighlight}
              </span>{" "}
              {headlineTitleAfter}
            </h1>
            <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed mt-8 max-w-2xl">
              {headlineSubtitle}
            </p>

            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <Link href="#schedule">
                <Button className="h-12 px-8 rounded-full bg-white text-black hover:bg-emerald-50 transition-colors">
                  Book a Call
                </Button>
              </Link>
              <Link href="#work">
                <Button
                  variant="outline"
                  className="h-12 px-8 rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10"
                >
                  Our Work
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Book a Call */}
        <section className="relative py-14 px-6 bg-[#062017]">
          <SectionMerge toColor={BG_BASE} />
          <div className="relative z-10 max-w-7xl mx-auto rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-sm px-8 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-white/40 text-sm tracking-widest uppercase">
                Book a Call
              </p>
              <h2 className="text-2xl md:text-3xl font-instrument-sans font-medium text-white mt-2">
                Letâ€™s audit your creative and map the next 30 days.
              </h2>
            </div>
            <Link href="#schedule">
              <Button className="h-12 px-8 rounded-full bg-emerald-400 text-[#05180D] hover:bg-emerald-300 transition-colors">
                {bookACallCta}
              </Button>
            </Link>
          </div>
        </section>

        {/* Our Work */}
        <div className="relative">
          <WorkShowcase initialCategory="ad-creatives" />
          <SectionMerge toColor={BG_SEC} />
        </div>

        {/* Problems */}
        <section id="problems" className="relative py-32 px-6 overflow-hidden bg-[#062017]">
          <SectionMerge toColor={BG_BASE} />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
          <div className="relative z-10 max-w-7xl mx-auto">
            <p className="text-emerald-300/80 text-xs font-medium tracking-[0.2em] uppercase mb-5">
              {problemsLabel}
            </p>
            <h2 className="text-4xl md:text-5xl font-instrument-sans font-medium text-white mb-10">
              {problemsTitle}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {problems.map((p) => (
                <div
                  key={p._key ?? p.title}
                  className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-8"
                >
                  <h3 className="text-white text-xl font-medium mb-3">
                    {p.title}
                  </h3>
                  <p className="text-white/55 font-light leading-relaxed">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solutions */}
        <section id="solutions" className="relative py-32 px-6 overflow-hidden bg-[#05180D]">
          <SectionMerge toColor={BG_SEC} />
          <div className="absolute right-0 top-1/3 w-[560px] h-[560px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />
          <div className="relative z-10 max-w-7xl mx-auto">
            <p className="text-emerald-300/80 text-xs font-medium tracking-[0.2em] uppercase mb-5">
              {solutionsLabel}
            </p>
            <h2 className="text-4xl md:text-5xl font-instrument-sans font-medium text-white mb-10">
              {solutionsTitle}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {solutions.map((s) => (
                <div
                  key={s._key ?? s.title}
                  className="rounded-3xl border border-emerald-500/15 bg-white/[0.03] backdrop-blur-sm p-8"
                >
                  <h3 className="text-white text-xl font-medium mb-3">
                    {s.title}
                  </h3>
                  <p className="text-white/55 font-light leading-relaxed">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Results */}
        <section id="results" className="relative py-32 px-6 overflow-hidden bg-[#062017]">
          <SectionMerge toColor={BG_BASE} />
          <div className="relative z-10 max-w-7xl mx-auto">
            <p className="text-emerald-300/80 text-xs font-medium tracking-[0.2em] uppercase mb-5">
              {resultsLabel}
            </p>
            <h2 className="text-4xl md:text-5xl font-instrument-sans font-medium text-white mb-10">
              {resultsTitle}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {results.map((r) => (
                <div
                  key={r._key ?? r.label}
                  className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-8"
                >
                  <p className="text-white/50 text-sm tracking-widest uppercase">
                    {r.label}
                  </p>
                  <p className="text-white text-4xl font-semibold tracking-tight mt-4">
                    {r.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Plans */}
        <div className="relative">
          <Pricing
            content={{
              label: plansLabel,
              title: plansTitle,
              subtitle: plansSubtitle,
              plans: plans.map((p) => ({ _key: p._key, name: p.name, description: p.description, features: p.features, popular: p.popular })),
            }}
          />
          <SectionMerge toColor={BG_SEC} />
        </div>

        {/* Calendly */}
        <div className="relative">
          <CalendlyWidget
          content={{
            title: calendlyTitle,
            subtitle:
              "Bring your best-performing ads (and your worst). Weâ€™ll map hooks, angles, and a 30-day iteration plan.",
          }}
          />
          <SectionMerge toColor={BG_BASE} />
        </div>

        {/* FAQs */}
        <div className="relative">
          <FAQ
          content={{
            label: faqLabel,
            title: faqTitle,
            highlightedWord: faqHighlightedWord,
            items: faqItems.map((item) => ({ _key: item._key ?? "", question: item.question, answer: item.answer })),
          }}
          />
          <SectionMerge toColor={BG_BASE} />
        </div>

      </main>

      <Footer />
    </div>
  );
}

