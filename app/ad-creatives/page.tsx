"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { 
  ArrowRight, ArrowLeft, Play, 
  TrendingUp, Activity, MousePointer2, Check, Zap, ShieldCheck 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { InquiryForm } from "@/components/InquiryForm";
import { FAQ } from "@/components/FAQ";

gsap.registerPlugin(ScrollTrigger);

// --- Interfaces for TypeScript Safety ---
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

// --- 1. CENTERED HERO & ENDLESS LOGO CLOUD ---
const HeroCentered = ({ title, highlight, titleAfter, subtitle }: HeroProps) => {
  const brands = ["SAMSUNG", "ADOBE", "SHOPIFY", "NIKE", "STRIPE", "SAMSUNG", "ADOBE", "SHOPIFY"];
  const endlessBrands = [...brands, ...brands];

  return (
    <section className="relative pt-44 pb-16 px-6 overflow-hidden bg-[#05180D] flex flex-col items-center text-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.12),transparent_70%)] pointer-events-none" />
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "circOut" }}
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
          <Button className="h-16 px-12 rounded-full bg-white text-black text-lg font-bold hover:scale-105 transition-all group shadow-[0_0_40px_rgba(255,255,255,0.1)]">
            Book Your Free Audit
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
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

// --- 3. PAIN & FIX (Animated Grid) ---
const AnimatedFeatureGrid = ({ items, title, label, isSolution = false }: FeatureGridProps) => {
  const container = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".feature-card", {
        scrollTrigger: { trigger: container.current, start: "top 85%" },
        y: 60,
        opacity: 0,
        rotateX: -10,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out"
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className={`py-24 px-6 ${isSolution ? 'bg-[#05180D]' : 'bg-[#062017]'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16">
          <p className="text-emerald-500 text-xs font-black tracking-[0.4em] uppercase mb-4">{label}</p>
          <h2 className="text-4xl md:text-6xl text-white font-instrument-sans leading-[1.1]">{title}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div key={i} className="feature-card p-12 rounded-[3.5rem] border border-white/5 bg-white/1 backdrop-blur-3xl hover:bg-white/3 transition-colors border-t-white/10">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-10 text-emerald-400">
                {isSolution ? <ShieldCheck className="w-8 h-8" /> : <Zap className="w-8 h-8" />}
              </div>
              <h3 className="text-white text-2xl font-semibold mb-5 tracking-tight">{item.title}</h3>
              <p className="text-white/40 leading-relaxed font-light">{item.description}</p>
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
            <Link href="#schedule" className="block"><Button className="w-full h-14 rounded-full bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-[10px]">Start Growth</Button></Link>
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
            <Link href="#schedule" className="block"><Button className="w-full h-14 rounded-full bg-white text-black font-bold uppercase tracking-widest text-[10px]">Claim Your Spot</Button></Link>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- 5. RESULTS (IMAGES ONLY) ---
const ResultsSection = ({ items, title }: ResultsProps) => {
  return (
    <section className="py-24 px-6 bg-[#062017] overflow-hidden">
      <div className="max-w-7xl mx-auto mb-20 text-center">
         <h2 className="text-5xl md:text-9xl font-instrument-sans text-white tracking-tighter opacity-90">{title}</h2>
         <div className="flex items-center justify-center gap-2 mt-6 text-white/30 text-[10px] font-bold tracking-[0.3em] uppercase">
            <MousePointer2 className="w-3 h-3" /><span>Click and drag to explore proof</span>
         </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
         {items.map((item, i) => (
           <motion.div drag dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} whileHover={{ scale: 1.05 }} key={i} className="group relative aspect-square rounded-[3rem] overflow-hidden border border-white/10 cursor-grab active:cursor-grabbing bg-white/2">
              {item.image && <Image src={item.image} alt="Result" fill className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700" />}
           </motion.div>
         ))}
      </div>
    </section>
  );
};

// --- 6. OUR PROCESS (GSAP Flow) ---
const ProcessSection = () => {
  const container = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(lineRef.current, { scaleX: 0 }, { 
        scaleX: 1, ease: "none",
        scrollTrigger: { trigger: container.current, start: "top 40%", end: "bottom center", scrub: true } 
      });
    }, container);
    return () => ctx.revert();
  }, []);

  const steps = [
    { name: "Audit", desc: "We strip down your current creative funnel." },
    { name: "Strategy", desc: "Angles mapped to core human desires." },
    { name: "Production", desc: "High-volume asset delivery in 48-72h." },
    { name: "Scaling", desc: "Double down on data-backed winners." }
  ];

  return (
    <section ref={container} className="py-32 px-6 bg-[#05180D] relative">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-6xl md:text-9xl text-white font-instrument-sans tracking-tight mb-32">The System</h2>
        <div className="relative">
          <div ref={lineRef} className="absolute top-0 left-0 w-full h-[1px] bg-emerald-500/50 origin-left hidden md:block" />
          <div className="grid md:grid-cols-4 gap-16">
             {steps.map((step, i) => (
               <div key={i} className="pt-16 relative group">
                  <div className="absolute top-0 -translate-y-1/2 w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.8)] z-10" />
                  <span className="text-emerald-500 font-bold text-xs tracking-widest mb-6 block uppercase">Step 0{i+1}</span>
                  <h3 className="text-white text-3xl font-medium mb-5 tracking-tight">{step.name}</h3>
                  <p className="text-white/40 leading-relaxed font-light text-lg">{step.desc}</p>
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
          label="The Friction"
          title="What clients are usually going through"
          items={[
            { title: "Pretty but Passive", description: "Creative is the #1 lever in paid, yet most brands ship videos without a testing framework." },
            { title: "Retention Leaks", description: "If the first 2 seconds don't stop the scroll, your ad budget is essentially a donation." },
            { title: "Random Iteration", description: "Guessing what to make next leads to inconsistent ROAS and massive wasted spend." }
          ]}
        />
        <AnimatedFeatureGrid 
          isSolution
          label="The Matera Fix"
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