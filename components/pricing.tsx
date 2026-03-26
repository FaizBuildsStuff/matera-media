"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_SOLUTIONS = [
  {
    name: "Performance Ads",
    tagline: "High-Response",
    description: "Direct-response assets engineered to stop the scroll and convert intent.",
    features: ["A/B Hook Variations", "Competitor Ad Analysis", "Multi-Platform Scale", "Motion Design"],
    popular: false,
  },
  {
    name: "Winner Ad Creatives",
    tagline: "Scale Authority",
    description: "A high-fidelity content engine designed for long-term community trust.",
    features: ["Full YouTube Production", "Viral Short-Form Systems", "SEO Strategy", "High-End Editing"],
    popular: true,
  },
  {
    name: "Product Stories",
    tagline: "Visual Narratives",
    description: "Transform complex SaaS features into clear, kinetic visual explainers.",
    features: ["UI/UX Kinetic Animations", "Workflow Explainers", "Sales Demos", "Guided Visual Tours"],
    popular: false,
  },
];

export default function Pricing({ content }: { content?: any }) {
  const title = content?.title ?? "Built for Absolute Velocity.";
  const highlightedWord = content?.highlightedWord ?? "Absolute";
  const subtitle = content?.subtitle ?? "Choose the creative discipline that aligns with your revenue infrastructure.";
  const plans = content?.plans?.length > 0 ? content.plans : DEFAULT_SOLUTIONS;

  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(`.glow-${index}`, {
      opacity: 1,
      x: x,
      y: y,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (index: number) => {
    gsap.to(`.glow-${index}`, {
      opacity: 0,
      duration: 0.6,
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".pricing-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-6 bg-[#05180D] relative overflow-hidden font-satoshi selection:bg-emerald-500/30">

      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#05180D] to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#05180D] to-transparent z-20 pointer-events-none" />

      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-0" />
      <div className="absolute top-[5%] right-[10%] w-[50%] h-[50%] bg-[#10B981]/5 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-30">

        <div className="mb-14 flex flex-col items-center text-center gap-4">
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[1.1] max-w-5xl uppercase italic">
            {title.split(' ').map((word: string, i: number) => {
              const cleanWord = word.replace(/\W/g, "");
              return (
                <span key={i} className={cleanWord === highlightedWord ? "text-[#10B981] not-italic" : ""}>
                  {word}{" "}
                </span>
              );
            })}
          </h2>
          <p className="max-w-2xl text-white/40 text-lg md:text-xl font-normal leading-relaxed whitespace-pre-wrap">
            {subtitle}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {plans.map((plan: any, idx: number) => {
              const isMiddle = idx === 1;

              return (
                <div
                  key={idx}
                  onMouseMove={(e) => handleMouseMove(e, idx)}
                  onMouseLeave={() => handleMouseLeave(idx)}
                  className={`pricing-card group relative flex flex-col p-10 rounded-[3rem] border transition-all duration-700 backdrop-blur-3xl overflow-hidden ${isMiddle
                      ? "bg-white/[0.05] border-[#10B981]/40 shadow-[0_40px_120px_-20px_rgba(16,185,129,0.3)] scale-105 z-30 md:-translate-y-6"
                      : "bg-white/2 border-white/5 hover:border-white/10 z-10 opacity-80 hover:opacity-100"
                    }`}
                >
                  {isMiddle && (
                    <div className="absolute top-0 right-10 px-6 py-2 bg-[#10B981] text-[#05180D] text-[9px] font-black uppercase tracking-[0.2em] rounded-b-2xl shadow-lg">
                      Most Demanded
                    </div>
                  )}

                  <div className={`glow-${idx} pointer-events-none absolute -inset-px opacity-0 rounded-[3rem] transition-opacity duration-500`}
                    style={{ background: `radial-gradient(600px circle at var(--x) var(--y), rgba(16,185,129,0.15), transparent 40%)`, transform: 'translate(-50%, -50%)', left: 0, top: 0, width: '1200px', height: '1200px' }} />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="mb-7">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#10B981] opacity-80">{plan.tagline}</span>
                    </div>

                    <h3 className="text-3xl font-black text-white mb-4 tracking-tighter uppercase">
                      {plan.name}
                    </h3>
                    <p className="text-white/30 text-sm font-normal leading-relaxed mb-10 whitespace-pre-wrap">
                      {plan.description}
                    </p>

                    {/* GAP REDUCED: mb-12 changed to mb-6 */}
                    <div className="flex-1 space-y-4 mb-6 pt-2">
                      {plan.features?.map((feature: string, fIdx: number) => (
                        <div key={fIdx} className="flex items-center gap-3">
                          <Check className="size-3 text-[#10B981]" />
                          <span className="text-sm font-normal text-white/50 group-hover:text-white/80 transition-colors">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Link href="/book" className="mt-auto">
                      <Button className={`w-full h-16 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-500 flex justify-between px-10 group ${isMiddle
                          ? "bg-white text-black hover:bg-[#10B981]"
                          : "bg-white/5 text-white border border-white/10 hover:bg-white hover:text-black"
                        }`}>
                        I need this
                        <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}