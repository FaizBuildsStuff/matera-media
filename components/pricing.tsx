"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { Check, Zap, ArrowRight, MousePointer2 } from "lucide-react";
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
    name: "Organic Systems",
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
  const label = content?.label ?? "Solutions";
  const title = content?.title ?? "Built for Absolute Velocity.";
  const highlightedWord = content?.highlightedWord ?? "Absolute";
  const subtitle = content?.subtitle ?? "Choose the creative discipline that aligns with your current revenue infrastructure.";
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
      // Parallax for Background Orbs
      gsap.to(".bg-orb", {
        yPercent: 15,
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: 1,
        },
      });

      // Cinematic Reveal - FIXED: Added clearProps to prevent permanent blur
      gsap.fromTo(".pricing-card", 
        { 
          y: 60, 
          opacity: 0, 
          filter: "blur(10px)" 
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.1,
          ease: "expo.out",
          clearProps: "filter", // This removes the filter property after animation
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
    <section
      ref={sectionRef}
      className="py-32 px-6 bg-[#05180D] relative overflow-hidden font-satoshi"
    >
      <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400&display=swap" rel="stylesheet" />

      {/* --- BACKGROUND FX --- */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
      <div className="bg-orb absolute top-[-10%] right-[10%] w-[50%] h-[50%] bg-[#10B981]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="bg-orb absolute bottom-[-5%] left-[5%] w-[40%] h-[40%] bg-[#10B981]/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* --- HEADER --- */}
        <div className="mb-28 flex flex-col items-center text-center gap-8">
          <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#10B981]/5 border border-[#10B981]/10 backdrop-blur-md">
            <MousePointer2 className="size-3 text-[#10B981]" />
            <span className="text-[9px] font-medium uppercase tracking-[0.5em] text-[#10B981]">
              {label}
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-medium text-white tracking-tighter leading-[1.1] max-w-5xl">
            {title.split(' ').map((word: string, i: number) => {
              const cleanWord = word.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
              const isMatch = cleanWord === highlightedWord;
              return (
                <span key={i} className={isMatch ? "italic font-normal text-[#10B981]" : ""}>
                  {word}{" "}
                </span>
              );
            })}
          </h2>
          <p className="max-w-2xl text-white/40 text-lg md:text-xl font-normal leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* --- GRID --- */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan: any, idx: number) => (
            <div
              key={idx}
              onMouseMove={(e) => handleMouseMove(e, idx)}
              onMouseLeave={() => handleMouseLeave(idx)}
              style={{ willChange: 'transform, opacity' }}
              className={`pricing-card group relative flex flex-col p-10 rounded-[3rem] border transition-all duration-500 backdrop-blur-3xl overflow-hidden ${
                plan.popular 
                  ? "bg-white/4 border-[#10B981]/30 shadow-[0_40px_120px_-20px_rgba(16,185,129,0.2)]" 
                  : "bg-white/2 border-white/5 hover:border-white/10"
              }`}
            >
              {/* Interactive Hover Glow */}
              <div className={`glow-${idx} pointer-events-none absolute -inset-px opacity-0 rounded-[3rem] transition-opacity duration-500`} 
                   style={{ background: `radial-gradient(600px circle at var(--x) var(--y), rgba(16,185,129,0.15), transparent 40%)`, transform: 'translate(-50%, -50%)', left: 0, top: 0, width: '1200px', height: '1200px' }} />

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-7">
                  {plan.popular && <Zap className="size-4 text-[#10B981] fill-[#10B981] animate-pulse" />}
                </div>

                <h3 className="text-3xl font-semibold text-white mb-4 tracking-tighter uppercase">
                  {plan.name}
                </h3>
                <p className="text-white/30 text-sm font-normal leading-relaxed mb-10">
                  {plan.description}
                </p>

                <div className="flex-1 space-y-4 mb-12">
                  {plan.features?.map((feature: string, fIdx: number) => (
                    <div key={fIdx} className="flex items-center gap-3">
                      <div className="size-5 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#10B981]/50 transition-colors">
                        <Check className="size-2 text-[#10B981]" />
                      </div>
                      <span className="text-sm font-normal text-white/50 group-hover:text-white/80 transition-colors">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <Link href="/book" className="mt-auto">
                  <Button className={`w-full h-16 rounded-2xl font-medium uppercase tracking-[0.2em] text-[10px] transition-all duration-500 flex justify-between px-10 group shadow-2xl ${
                    plan.popular 
                      ? "bg-[#10B981] text-[#05180D] hover:bg-white" 
                      : "bg-white/5 text-white border border-white/10 hover:bg-white hover:text-[#05180D]"
                  }`}>
                    Book Strategy Call
                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* --- FOOTER --- */}
        <div className="mt-28 flex flex-col items-center gap-4 opacity-10">
            <div className="h-px w-20 bg-white" />
            <div className="text-[8px] font-medium uppercase tracking-[1em] text-white">
              Encryption Level: Elite
            </div>
        </div>
      </div>
    </section>
  );
}