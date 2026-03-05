import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WorkShowcase } from "@/components/WorkShowcase";
import Pricing from "@/components/pricing";
import { InquiryForm } from "@/components/InquiryForm";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { SectionMerge } from "@/components/SectionMerge";

const BG_BASE = "#05180D";
const BG_SEC = "#062017";

const PROBLEMS = [
  {
    title: "Your product is complex",
    description:
      "Features don’t sell themselves—clarity and narrative do. Most SaaS videos explain without persuading.",
  },
  {
    title: "Demos feel flat",
    description:
      "If the story isn’t compelling, prospects bounce before they understand value.",
  },
  {
    title: "Inconsistent positioning",
    description:
      "Messaging drifts across ads, landing pages, and sales calls—hurting conversion.",
  },
];

const SOLUTIONS = [
  {
    title: "Message clarity + narrative",
    description:
      "We translate features into outcomes and structure the story around the buyer’s job-to-be-done.",
  },
  {
    title: "Product-led visuals",
    description:
      "UI capture, motion, and pacing designed to feel premium and easy to follow.",
  },
  {
    title: "Full-funnel video system",
    description:
      "Ads, explainers, onboarding, and feature launches that match each stage of intent.",
  },
];

const RESULTS = [
  { label: "Clarity uplift", value: "Instant" },
  { label: "Sales enablement", value: "Always-on" },
  { label: "Full-funnel assets", value: "4+" },
];

export default function SaasVideosPage() {
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
              SaaS Videos
            </p>
            <h1 className="text-5xl md:text-7xl font-instrument-sans font-medium text-white tracking-tight leading-[0.95] max-w-4xl">
              Videos that make your{" "}
              <span className="font-instrument-serif italic text-emerald-300/90">
                product
              </span>{" "}
              feel obvious to buy.
            </h1>
            <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed mt-8 max-w-2xl">
              Explainers, demos, feature launches, and ads designed to increase
              clarity, trust, and conversion.
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
                Let’s turn your product into a story prospects understand.
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
          <WorkShowcase initialCategory="saas-videos" />
          <SectionMerge toColor={BG_SEC} />
        </div>

        {/* Problems */}
        <section id="problems" className="relative py-32 px-6 overflow-hidden bg-[#062017]">
          <SectionMerge toColor={BG_BASE} />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
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
          <div className="absolute right-0 top-1/3 w-[560px] h-[560px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none" />
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
              The outcomes: clarity → confidence → conversion
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
            title: "Plans for SaaS video production.",
            subtitle:
              "From a single flagship asset to a full-funnel system.",
            plans: [
              {
                _key: "sv-1",
                name: "Explainer Sprint",
                description: "One flagship video, built with clarity.",
                features: ["Messaging workshop", "Script + storyboard", "Motion + UI capture", "Delivery-ready exports"],
                popular: false,
              },
              {
                _key: "sv-2",
                name: "Launch Kit",
                description: "Launch assets across the funnel.",
                features: ["Feature launch video", "3 cutdowns", "Landing page embed", "Sales enablement edits"],
                popular: true,
              },
              {
                _key: "sv-3",
                name: "Full-Funnel System",
                description: "Ongoing production for growth teams.",
                features: ["Monthly video system", "Ad + product assets", "Onboarding/education", "Dedicated team"],
                popular: false,
              },
            ],
          }}
          />
          <SectionMerge toColor={BG_SEC} />
        </div>

        {/* Inquiry Form */}
        <div className="relative">
        <InquiryForm
            title="Book a Call — SaaS Video Strategy"
            subtitle="We’ll map your core narrative, video types, and a production plan aligned to your funnel."
            sourcePage="saas-videos"
          />
          <SectionMerge toColor={BG_BASE} />
        </div>

        {/* FAQs */}
        <div className="relative">
          <FAQ
          content={{
            label: "FAQs",
            title: "SaaS video questions — answered.",
            highlightedWord: "answered.",
            items: [
              {
                _key: "sv-f1",
                question: "Do you write scripts?",
                answer:
                  "Yes. We handle narrative, structure, and on-screen flow—based on your product and ICP.",
              },
              {
                _key: "sv-f2",
                question: "Can you capture our UI and build motion around it?",
                answer:
                  "Yes—UI capture and motion design are a core part of our SaaS work.",
              },
              {
                _key: "sv-f3",
                question: "Can we reuse the footage for ads and onboarding?",
                answer:
                  "Absolutely. We plan the deliverables so you can repurpose assets across the funnel.",
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

