"use client";

import React, { useEffect, useRef, useState } from "react";
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

gsap.registerPlugin(ScrollTrigger);

// --- Interfaces ---
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

interface ResultItem {
  image: string;
}

interface ResultsProps {
  items: ResultItem[];
  title: string;
}

// --- 1. CENTERED HERO ---
const HeroCentered = ({ title, highlight, titleAfter, subtitle }: HeroProps) => {
  const brands = ["SAMSUNG", "ADOBE", "SHOPIFY", "NIKE", "STRIPE", "SAMSUNG", "ADOBE", "SHOPIFY"];
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
          <span className="text-white/50 text-[10px] uppercase tracking-[0.3em] font-bold">Performance Systems</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-instrument-sans font-medium text-white tracking-tighter leading-[0.9] mb-8">
          {title} <span className="font-instrument-serif italic text-emerald-300">{highlight}</span> {titleAfter}
        </h1> 
        <p className="text-white/40 text-lg md:text-2xl font-light max-w-2xl mx-auto leading-relaxed mb-12">
          {subtitle}
        </p>
        <Link href="#schedule">
          <Button className="h-14 px-10 rounded-full bg-white text-black text-base font-bold hover:scale-105 transition-all group shadow-[0_0_40px_rgba(255,255,255,0.1)]">
            Book a Free Audit 
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

// --- 2. REELS WORK SECTION ---
const WorkReelsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 px-6 bg-[#062017] border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-instrument-sans text-white tracking-tight mb-4">Our Work</h2>
            <p className="text-emerald-400 text-xl italic font-instrument-serif opacity-80">Industry-leading performance creative.</p>
          </div>
          <div className="flex gap-4">
            <button onClick={() => scroll('left')} className="p-5 rounded-full border border-white/10 text-white hover:bg-white hover:text-black transition-all"><ArrowLeft className="w-6 h-6" /></button>
            <button onClick={() => scroll('right')} className="p-5 rounded-full border border-white/10 text-white hover:bg-white hover:text-black transition-all"><ArrowRight className="w-6 h-6" /></button>
          </div>
        </div>
        <div ref={scrollRef} className="flex gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="snap-center shrink-0 w-[300px] h-[540px] bg-white/2 rounded-[2.5rem] border border-white/10 relative overflow-hidden group cursor-pointer">
               <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent z-10" />
               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-20"><div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center"><Play className="fill-current w-5 h-5 ml-1" /></div></div>
               <div className="absolute bottom-10 left-10 z-20">
                  <p className="text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-2">Ad Creative</p>
                  <h4 className="text-white text-xl font-medium tracking-tight">Case Study 0{i}</h4>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 3. REIMAGINED 2060 FEATURE GRID (FAST ACTION) ---
const AnimatedFeatureGrid = ({ items, title, label, isSolution = false }: FeatureGridProps) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".feature-card", 
        { y: 30, opacity: 0, clipPath: "inset(100% 0% 0% 0%)" }, 
        {
          scrollTrigger: { trigger: container.current, start: "top 90%" },
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

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
                <div className="mt-12 flex items-center gap-4 opacity-20 group-hover:opacity-50 transition-opacity">
                  <span className="text-[9px] font-black text-white tracking-[0.3em] uppercase">Module_0{i+1}</span>
                  <div className="h-[1px] w-8 bg-white/20" />
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

// --- 4. CENTERED PRICING ---
const CenteredPricing = () => {
  return (
    <section className="py-24 px-6 bg-[#05180D] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/3 blur-[150px] rounded-full pointer-events-none" />
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="text-emerald-500 text-xs font-black tracking-[0.4em] uppercase mb-4">Investment</p>
          <h2 className="text-5xl md:text-7xl font-instrument-sans text-white tracking-tight mb-6">Plans built for scale.</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="p-10 md:p-14 rounded-[3.5rem] border border-white/5 bg-white/2 backdrop-blur-3xl">
            <h3 className="text-white/50 text-sm font-bold uppercase tracking-widest mb-2">The Starter</h3>
            <span className="text-white text-5xl font-medium tracking-tighter mb-8 block">Growth Core</span>
            <ul className="space-y-5 mb-12">
              {["8 Custom Ads / Mo", "Hook Testing Framework", "Monthly Audit", "72h Turnaround"].map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-white/70 text-sm font-light"><Check className="w-3 h-3 text-emerald-400" />{f}</li>
              ))}
            </ul>
            <Link href="#schedule" className="block"><Button className="w-full h-14 rounded-full bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-[10px]">Book A Call</Button></Link>
          </div>
          <div className="relative p-10 md:p-14 rounded-[3.5rem] border border-emerald-500/30 bg-white/5 backdrop-blur-3xl shadow-[0_0_80px_rgba(16,185,129,0.1)] scale-105 z-20">
            <div className="absolute top-8 right-10 px-3 py-1 rounded-full bg-emerald-500 text-black text-[9px] font-black uppercase tracking-widest">Recommended</div>
            <h3 className="text-emerald-400 text-sm font-bold uppercase tracking-widest mb-2">The Dominator</h3>
            <span className="text-white text-5xl font-medium tracking-tighter mb-8 block">Scale Suite</span>
            <ul className="space-y-5 mb-12">
              {["16+ Custom Ads / Mo", "Full-Funnel Content", "Weekly Sync", "24h Priority"].map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-white text-sm font-medium"><Check className="w-3 h-3 text-emerald-500" />{f}</li>
              ))}
            </ul>
            <Link href="#schedule" className="block"><Button className="w-full h-14 rounded-full bg-white text-black font-bold uppercase tracking-widest text-[10px]">Book A Call</Button></Link>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- 5. RESULTS (STATIC & MODERN) ---
const ResultsSection = ({ items, title }: ResultsProps) => {
  return (
    <section className="py-24 px-6 bg-[#062017] overflow-hidden text-center">
      <h2 className="text-5xl md:text-9xl font-instrument-sans text-white tracking-tighter opacity-90 mb-20">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
         {items.map((item, i) => (
           <div key={i} className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/10 bg-white/5 group">
             {item.image && (
                <Image 
                    src={item.image} 
                    alt="Result Proof" 
                    fill 
                    className="object-cover opacity-70 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105" 
                />
             )}
           </div>
         ))}
      </div>
    </section>
  );
};

// --- 6. OUR PROCESS (RESPONSIVE KINETIC LINE) ---
const ProcessSection = () => {
  const container = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Progress line: Horizontal on PC, Vertical on Mobile
      gsap.fromTo(lineRef.current, 
        { 
          scaleX: 0, 
          scaleY: 0, 
          transformOrigin: "top left" 
        }, 
        { 
          scaleX: 1, 
          scaleY: 1, 
          ease: "none",
          scrollTrigger: { 
              trigger: container.current, 
              start: "top 40%", 
              end: "bottom 60%", 
              scrub: 1 
          } 
      });
    }, container);
    return () => ctx.revert();
  }, []);

  const steps = [
    { name: "Creative Audit", desc: "Data-driven analysis of your historical performance to identify hook-leakage." },
    { name: "Strategy Mapping", desc: "Crafting a 30-day roadmap based on core human desires and direct-response triggers." },
    { name: "Asset Production", desc: "High-volume delivery of studio-grade videos built specifically for high CTR." },
    { name: "Performance Scaling", desc: "Rapid iterations of data-backed winners to lower CAC and maximize ROAS." }
  ];

  return (
    <section ref={container} className="py-32 px-6 bg-[#05180D] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 md:mb-32">
            <p className="text-emerald-500 text-[10px] font-bold tracking-[0.5em] uppercase mb-4">The Workflow</p>
            <h2 className="text-6xl md:text-9xl text-white font-instrument-sans tracking-tight leading-none italic lowercase">
              the system
            </h2>
        </div>

        <div className="relative">
          {/* Progress line: Vertical on mobile (left), Horizontal on PC (top) */}
          <div 
            ref={lineRef} 
            className="absolute 
              top-0 left-0 
              md:w-full md:h-[1px] 
              w-[2px] h-full 
              bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)] 
              z-10" 
          />
          
          {/* Static Background Track Line */}
          <div className="absolute top-0 left-0 md:w-full md:h-[1px] w-[2px] h-full bg-white/5" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16">
             {steps.map((step, i) => (
               <div key={i} className="pt-12 md:pt-16 relative group pl-8 md:pl-0">
                  {/* Bullet Dot */}
                  <div className="absolute top-0 left-[-7px] md:left-0 md:-translate-y-1/2 w-4 h-4 rounded-full bg-emerald-500 border-4 border-[#05180D] z-20 group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                  
                  <span className="text-emerald-500 font-bold text-[10px] tracking-widest mb-4 block uppercase opacity-50 group-hover:opacity-100 transition-opacity">
                    Step 0{i+1}
                  </span>
                  <h3 className="text-white text-2xl md:text-3xl font-medium mb-5 tracking-tight group-hover:text-emerald-400 transition-colors">
                    {step.name}
                  </h3>
                  <p className="text-white/40 leading-relaxed font-light text-base md:text-lg group-hover:text-white/60 transition-colors">
                    {step.desc}
                  </p>
               </div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default async function AdCreativesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#05180D] selection:bg-emerald-500/30">
      <main className="grow">
        <HeroCentered 
          title="Performance creative that"
          highlight="earns attention"
          titleAfter="and converts."
          subtitle="An always-on creative system: hooks, angles, and iterations built for measurable revenue growth."
        />
        <WorkReelsSection />
        <AnimatedFeatureGrid 
          label="The Problem"
          title="What brands usually go through"
          items={[
            { title: "Pretty but Passive", description: "Creative is the #1 lever in paid, yet most brands ship videos without a testing framework." },
            { title: "Retention Leaks", description: "If the first 2 seconds don't stop the scroll, your ad budget is essentially a donation." },
            { title: "Random Iteration", description: "Guessing what to make next leads to inconsistent ROAS and massive wasted spend." }
          ]}
        />
        <AnimatedFeatureGrid 
          isSolution
          label="The Matera Solution"
          title="How we solve for growth"
          items={[
            { title: "Hook Testing Engine", description: "We produce rapid variations to find the specific hooks that earn the click." },
            { title: "Direct-Response Edits", description: "Pacing, pattern interrupts, and captions designed specifically for watch time." },
            { title: "Strategy-First Design", description: "Messaging and offer clarity mapped out before we ever touch a timeline." }
          ]}
        />
        <ResultsSection title="Our Results" items={[{ image: "/results/s1.png" }, { image: "/results/s2.png" }, { image: "/results/s3.png" }, { image: "/results/s4.png" }]} />
        <ProcessSection />
        <CenteredPricing />
        <InquiryForm sourcePage="ad-creatives" />
        <FAQ content={{ items: [] }} />
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