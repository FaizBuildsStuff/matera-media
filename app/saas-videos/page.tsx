"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import {
  ArrowRight, ArrowLeft, Play,
  Activity, Check, Zap, ShieldCheck, ArrowUpRight
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { InquiryForm } from "@/components/InquiryForm";
import { FAQ } from "@/components/FAQ";
import { WorkShowcase } from "@/components/WorkShowcase";

gsap.registerPlugin(ScrollTrigger);

// --- Reusable Interfaces ---
interface HeroProps {
  title: string;
  highlight: string;
  titleAfter: string;
  subtitle: string;
}

interface FeatureItem {
  title: string;
  description: string;
}

interface FeatureGridProps {
  items: FeatureItem[];
  title: string;
  label: string;
  isSolution?: boolean;
}

// --- 1. THE 2060 HERO ---
const HeroCentered = ({ title, highlight, titleAfter, subtitle }: HeroProps) => {
  const brands = ["SAAS", "STARTUPS", "TECH", "SOFTWARE", "B2B", "SAAS", "STARTUPS", "TECH"];
  const endlessBrands = [...brands, ...brands];

  return (
    <section className="relative pt-44 pb-16 px-6 overflow-hidden bg-[#05180D] flex flex-col items-center text-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.12),transparent_70%)] pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="relative z-10 max-w-5xl"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
          <Activity className="w-3 h-3 text-emerald-400" />
          <span className="text-white/50 text-[10px] uppercase tracking-[0.3em] font-bold">SaaS Video Production</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-instrument-sans font-medium text-white tracking-tighter leading-[0.9] mb-8">
          {title} <span className="font-instrument-serif italic text-emerald-300">{highlight}</span> {titleAfter}
        </h1>
        <p className="text-white/40 text-lg md:text-2xl font-light max-w-2xl mx-auto leading-relaxed mb-12">
          {subtitle}
        </p>
        <Link href="#schedule">
          <Button className="h-14 px-10 rounded-full bg-white text-black text-base font-bold hover:scale-105 transition-all group shadow-[0_0_40px_rgba(255,255,255,0.1)]">
            Book a Strategy Call
            <div className="ml-3 w-7 h-7 rounded-full bg-black flex items-center justify-center">
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Button>
        </Link>
      </motion.div>
      <div className="mt-20 w-full overflow-hidden opacity-20 select-none pointer-events-none">
        <div className="flex animate-scroll whitespace-nowrap gap-24 items-center w-max">
          {endlessBrands.map((brand, i) => (
            <span key={i} className="text-white text-4xl font-black tracking-tighter opacity-50">{brand}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 2. FAST ACTION FEATURE GRID ---
const AnimatedFeatureGrid = ({ items, title, label, isSolution = false }: FeatureGridProps) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".feature-card",
        { y: 30, opacity: 0, clipPath: "inset(100% 0% 0% 0%)" },
        {
          scrollTrigger: { trigger: container.current, start: "top 85%" },
          y: 0, opacity: 1, clipPath: "inset(0% 0% 0% 0%)",
          stagger: 0.05, duration: 0.6, ease: "expo.out"
        }
      );
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className={`relative py-32 px-6 overflow-hidden ${isSolution ? 'bg-[#05180D]' : 'bg-[#031109]'}`}>
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/stardust.png")` }} />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-8 bg-emerald-500/50" />
              <p className="text-emerald-500 text-[10px] font-bold tracking-[0.5em] uppercase">{label}</p>
            </div>
            <h2 className="text-5xl md:text-7xl text-white font-instrument-sans font-medium tracking-tighter leading-none italic lowercase">
              {title}
            </h2>
          </div>
          <div className="hidden md:block h-px flex-1 bg-white/5 mx-12 mb-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl">
          {items.map((item, i) => (
            <div key={i} className="feature-card group relative p-10 md:p-14 bg-[#031109] transition-all duration-700 hover:bg-white/[0.02]">
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                <ArrowUpRight className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center mb-10 transition-all duration-500 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10">
                  {isSolution ? <ShieldCheck className="w-5 h-5 text-emerald-400" /> : <Zap className="w-5 h-5 text-emerald-400" />}
                </div>
                <div className="space-y-4">
                  <h3 className="text-white text-2xl font-medium tracking-tight group-hover:text-emerald-400 transition-colors duration-500">{item.title}</h3>
                  <p className="text-white/30 leading-relaxed font-light text-base group-hover:text-white/60 transition-colors duration-500">{item.description}</p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-emerald-500/0 group-hover:bg-emerald-500/50 transition-all duration-700 origin-left scale-x-0 group-hover:scale-x-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 3. THE KINETIC SYSTEM ---
const ProcessSection = () => {
  const container = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(lineRef.current,
        { scaleX: 0, scaleY: 0, transformOrigin: "top left" },
        {
          scaleX: 1, scaleY: 1, ease: "none",
          scrollTrigger: { trigger: container.current, start: "top 40%", end: "bottom 60%", scrub: 1 }
        });
    }, container);
    return () => ctx.revert();
  }, []);

  const steps = [
    { name: "Product Deep-Dive", desc: "We learn your software inside-out to understand your core value loop and ideal customer profile." },
    { name: "Scripting & Pre-vis", desc: "Crafting the narrative and pre-visualizing the flow to ensure maximum clarity." },
    { name: "UI & Motion", desc: "Bringing your interface to life with high-end motion graphics and smooth pacing." },
    { name: "Sound & Polish", desc: "Adding dynamic sound design and final polish to deliver a world-class SaaS video." }
  ];

  return (
    <section ref={container} className="py-32 px-6 bg-[#05180D] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 md:mb-32 text-center">
          <p className="text-emerald-500 text-[10px] font-bold tracking-[0.5em] uppercase mb-4">The Workflow</p>
          <h2 className="text-6xl md:text-9xl text-white font-instrument-sans tracking-tight leading-none italic lowercase">the system</h2>
        </div>

        <div className="relative">
          <div ref={lineRef} className="absolute top-0 left-0 md:w-full md:h-[1px] w-[2px] h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)] z-10" />
          <div className="absolute top-0 left-0 md:w-full md:h-[1px] w-[2px] h-full bg-white/5" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16">
            {steps.map((step, i) => (
              <div key={i} className="pt-12 md:pt-16 relative group pl-8 md:pl-0">
                <div className="absolute top-0 left-[-7px] md:left-0 md:-translate-y-1/2 w-4 h-4 rounded-full bg-emerald-500 border-4 border-[#05180D] z-20 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                <span className="text-emerald-500 font-bold text-[10px] tracking-widest mb-4 block uppercase opacity-50">Phase 0{i + 1}</span>
                <h3 className="text-white text-2xl md:text-3xl font-medium mb-5 tracking-tight group-hover:text-emerald-400 transition-colors">{step.name}</h3>
                <p className="text-white/40 leading-relaxed font-light text-base md:text-lg group-hover:text-white/60 transition-colors">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- 4. CENTERED PRICING ---
const CenteredPricing = () => {
  return (
    <section className="py-24 px-6 bg-[#05180D] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/3 blur-[150px] rounded-full pointer-events-none" />
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="text-emerald-500 text-xs font-black tracking-[0.4em] uppercase mb-4">Investment</p>
          <h2 className="text-5xl md:text-7xl font-instrument-sans text-white tracking-tight mb-6">Built for SaaS.</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="p-10 md:p-14 rounded-[3.5rem] border border-white/5 bg-white/2 backdrop-blur-3xl">
            <h3 className="text-white/50 text-sm font-bold uppercase tracking-widest mb-2">Essential</h3>
            <span className="text-white text-5xl font-medium tracking-tighter mb-8 block">Explainer</span>
            <ul className="space-y-5 mb-12">
              {["60-90 Second Length", "Script & Storyboard", "UI Animation", "14-Day Delivery"].map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-white/70 text-sm font-light"><Check className="w-3 h-3 text-emerald-400" />{f}</li>
              ))}
            </ul>
            <Link href="#schedule" className="block"><Button className="w-full h-14 rounded-full bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-[10px]">Get Started</Button></Link>
          </div>
          <div className="relative p-10 md:p-14 rounded-[3.5rem] border border-emerald-500/30 bg-white/5 backdrop-blur-3xl shadow-[0_0_80px_rgba(16,185,129,0.1)] scale-105 z-20">
            <div className="absolute top-8 right-10 px-3 py-1 rounded-full bg-emerald-500 text-black text-[9px] font-black uppercase tracking-widest">Recommended</div>
            <h3 className="text-emerald-400 text-sm font-bold uppercase tracking-widest mb-2">Growth</h3>
            <span className="text-white text-5xl font-medium tracking-tighter mb-8 block">Launch Suite</span>
            <ul className="space-y-5 mb-12">
              {["Hero Explainer Video", "3 Short-Form Ads", "App Store Preview", "Priority Revisions"].map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-white text-sm font-medium"><Check className="w-3 h-3 text-emerald-500" />{f}</li>
              ))}
            </ul>
            <Link href="#schedule" className="block"><Button className="w-full h-14 rounded-full bg-white text-black font-bold uppercase tracking-widest text-[10px]">Dominate Launch</Button></Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function SaaSVideoPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#05180D] selection:bg-emerald-500/30">
      <main className="grow">
        <HeroCentered
          title="SaaS product videos that"
          highlight="convert"
          titleAfter="trials into users."
          subtitle="We craft high-converting product demos, explainers, and onboarding videos designed specifically for software companies."
        />

        <WorkShowcase initialCategory="saas-videos" />

        <AnimatedFeatureGrid
          label="The Challenges"
          title="Why your software isn't selling itself"
          items={[
            { title: "Complex Value Proposition", description: "Users don't instantly understand what your software does, leading to high bounce rates." },
            { title: "Trial Drop-offs", description: "Poor onboarding leads to users abandoning your app before experiencing the 'aha' moment." },
            { title: "Boring Demos", description: "Standard screen recordings fail to engage prospects or showcase the true power of your platform." }
          ]}
        />

        <AnimatedFeatureGrid
          isSolution
          label="The Matera Framework"
          title="How we visualize your software"
          items={[
            { title: "Clear Storytelling", description: "We translate complex technical features into simple, benefit-driven narratives." },
            { title: "Sleek Motion Design", description: "Studio-grade UI animations and motion graphics that make your product look premium." },
            { title: "Conversion-Optimized", description: "Every second is engineered to drive signups, demo requests, and activation." }
          ]}
        />

        <ProcessSection />

        <CenteredPricing />

        <InquiryForm sourcePage="saas-videos" />

        <FAQ
          content={{
            label: "Intelligence",
            title: "Frequently asked.",
            highlightedWord: "asked.",
            items: [
              { _key: "q1", question: "Do you need access to our app?", answer: "Yes, a demo account helps us capture the best possible UI footage for animation." },
              { _key: "q2", question: "How long does a promo video take?", answer: "Typically 2-4 weeks depending on complexity, length, and motion graphics requirements." },
              { _key: "q3", question: "Will this help with paid ads?", answer: "Absolutely. Our videos are designed to be used across landing pages, ads, and investor pitches." }
            ]
          }}
        />
      </main>
      <Footer />
      <style jsx global>{`
        @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .animate-scroll { animation: scroll 25s linear infinite; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}