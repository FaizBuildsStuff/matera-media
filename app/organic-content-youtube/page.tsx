import Link from "next/link";
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
    title: "Content is inconsistent",
    description:
      "You post when you can, not when the system demands—so growth stalls.",
  },
  {
    title: "Great ideas, weak execution",
    description:
      "No repeatable structure, no retention engineering, no scalable editing pipeline.",
  },
  {
    title: "Views don’t turn into pipeline",
    description:
      "Without positioning and CTAs, attention never becomes trust (or revenue).",
  },
];

const SOLUTIONS = [
  {
    title: "A repeatable content system",
    description:
      "Topics, hooks, and formats built around your ICP and the buying journey.",
  },
  {
    title: "Retention-first editing",
    description:
      "Pacing, overlays, and narrative structure designed to keep viewers watching.",
  },
  {
    title: "Distribution + repurposing",
    description:
      "One recording → multiple outputs across Shorts, Reels, TikTok, and long-form.",
  },
];

const RESULTS = [
  { label: "Publishing cadence", value: "3–7/wk" },
  { label: "Repurposing leverage", value: "1 → 8" },
  { label: "Authority compounding", value: "Month 2+" },
];

export default function OrganicContentYouTubePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#05180D]">
      <main className="grow">
        {/* Headline */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-[#05180D]">
          <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.18),transparent_45%)]" />
          <div className="absolute -left-24 top-24 w-[520px] h-[520px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
          <SectionMerge toColor={BG_SEC} />

          <div className="relative max-w-7xl mx-auto z-10">
            <p className="text-emerald-300/80 text-xs font-medium tracking-[0.2em] uppercase mb-6">
              Organic Content / YouTube
            </p>
            <h1 className="text-5xl md:text-7xl font-instrument-sans font-medium text-white tracking-tight leading-[0.95] max-w-4xl">
              Content that builds{" "}
              <span className="font-instrument-serif italic text-emerald-300/90">
                authority
              </span>{" "}
              and inbound demand.
            </h1>
            <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed mt-8 max-w-2xl">
              We engineer a content pipeline that compounds: strategy, scripts,
              recording workflow, editing, and distribution.
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
                Let’s design a content system you can sustain.
              </h2>
            </div>
            <Link href="#schedule">
              <Button className="h-12 px-8 rounded-full bg-emerald-400 text-[#05180D] hover:bg-emerald-300 transition-colors">
                Book Strategy Call
              </Button>
            </Link>
          </div>
        </section>

        {/* Our Work */}
        <div className="relative">
          <WorkShowcase initialCategory="organic-content" />
          <SectionMerge toColor={BG_SEC} />
        </div>

        {/* Problems */}
        <section id="problems" className="relative py-32 px-6 overflow-hidden bg-[#062017]">
          <SectionMerge toColor={BG_BASE} />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
          <div className="relative z-10 max-w-7xl mx-auto">
            <p className="text-emerald-300/80 text-xs font-medium tracking-[0.2em] uppercase mb-5">
              Problems
            </p>
            <h2 className="text-4xl md:text-5xl font-instrument-sans font-medium text-white mb-10">
              What clients are usually going through
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {PROBLEMS.map((p) => (
                <div
                  key={p.title}
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
          <div className="absolute left-0 top-1/3 w-[560px] h-[560px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />
          <div className="relative z-10 max-w-7xl mx-auto">
            <p className="text-emerald-300/80 text-xs font-medium tracking-[0.2em] uppercase mb-5">
              Solutions
            </p>
            <h2 className="text-4xl md:text-5xl font-instrument-sans font-medium text-white mb-10">
              How we fix it
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {SOLUTIONS.map((s) => (
                <div
                  key={s.title}
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
              Results
            </p>
            <h2 className="text-4xl md:text-5xl font-instrument-sans font-medium text-white mb-10">
              Growth that compounds over time
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {RESULTS.map((r) => (
                <div
                  key={r.label}
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
            label: "Plans",
            title: "Plans for consistent publishing.",
            subtitle:
              "Choose the cadence that matches your goals and your capacity to record.",
            plans: [
              {
                _key: "oc-lite",
                name: "Momentum",
                description: "Get consistent and start compounding.",
                features: ["Topic + hook bank", "3 shorts/week", "Editing + captions", "Monthly planning call"],
                popular: false,
              },
              {
                _key: "oc-core",
                name: "Authority",
                description: "Build credibility with a strong weekly rhythm.",
                features: ["Content system + formats", "5 shorts/week", "Repurposing package", "Weekly sync"],
                popular: true,
              },
              {
                _key: "oc-scale",
                name: "Dominate",
                description: "High output across channels, end-to-end.",
                features: ["7 shorts/week", "Long-form support", "Multi-platform distribution", "Dedicated editor"],
                popular: false,
              },
            ],
          }}
          />
          <SectionMerge toColor={BG_SEC} />
        </div>

        {/* Calendly */}
        <div className="relative">
          <CalendlyWidget
          content={{
            title: "Book a Call — Content System Blueprint",
            subtitle:
              "We’ll map topics, formats, cadence, and a workflow your team can actually sustain.",
          }}
        />
          <SectionMerge toColor={BG_BASE} />
        </div>

        {/* FAQs */}
        <div className="relative">
          <FAQ
          content={{
            label: "FAQs",
            title: "Organic growth questions — answered.",
            highlightedWord: "answered.",
            items: [
              {
                _key: "oc-1",
                question: "Do you help with topics and scripting?",
                answer:
                  "Yes—topics, hooks, outlines, and repeatable formats are part of the system we build.",
              },
              {
                _key: "oc-2",
                question: "Can you repurpose long-form into shorts?",
                answer:
                  "Absolutely. We can turn long-form recordings into multiple short-form deliverables.",
              },
              {
                _key: "oc-3",
                question: "Will this work for B2B?",
                answer:
                  "Yes. We structure content around buyer intent, credibility, and conversion—not trends.",
              },
            ],
          }}
          />
          <SectionMerge toColor={BG_BASE} />
        </div>

      </main>

      <Footer />
    </div>
  );
}

