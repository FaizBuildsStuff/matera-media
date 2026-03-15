"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ArrowLeft, Play, X, Volume2, VolumeX,
  Activity, Check, Zap, ShieldCheck, ArrowUpRight
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { InquiryForm } from "@/components/InquiryForm";
import { client } from "@/lib/sanity";
import { servicePageQuery } from "@/lib/queries";

gsap.registerPlugin(ScrollTrigger);

// --- Interfaces ---
interface HeroProps {
  title?: string;
  highlight?: string;
  titleAfter?: string;
  subtitle?: string;
  sectionLabel?: string;
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
  label?: string;
  value?: string;
}

interface ResultsProps {
  items: ResultItem[];
  title: string;
}

// --- 1. CENTERED HERO ---
const HeroCentered = ({ title, highlight, titleAfter, subtitle, sectionLabel }: HeroProps) => {
  const brands = ["SAMSUNG", "ADOBE", "SHOPIFY", "NIKE", "STRIPE", "SAMSUNG", "ADOBE", "SHOPIFY"];
  const endlessBrands = [...brands, ...brands];

  return (
    <section className="relative pt-32 pb-10 px-6 overflow-hidden bg-[#05180D] flex flex-col items-center text-center">
      <link href="https://api.fontshare.com/v2/css?f[]=satoshi@401&display=swap" rel="stylesheet" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.15),transparent_70%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="relative z-10 max-w-4xl mt-12 md:mt-20"
      >
        <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-[0.9] mb-8">
          {title}{" "}
          <span
            className="text-emerald-500 px-1"
            style={{ fontFamily: "'Satoshi', sans-serif", fontStyle: "italic", fontWeight: 400 }}
          >
            {highlight}
          </span>{" "}
          {titleAfter}
        </h1>
        <p className="text-white/40 text-base md:text-lg font-normal max-w-2xl mx-auto leading-relaxed mb-12">
          {subtitle}
        </p>
        <Link href="#schedule">
          <Button className="h-12 px-8 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all group shadow-[0_0_40px_rgba(255,255,255,0.1)]">
            Book a Free Audit
            <div className="ml-3 w-6 h-6 rounded-full bg-black flex items-center justify-center">
              <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Button>
        </Link>
      </motion.div>
    </section>
  );
};

// --- Reel Card Component ---
const ReelCard = ({ item, isPlaying, onToggle }: { item: any; isPlaying: boolean; onToggle: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
        videoRef.current.muted = false;
      } else {
        videoRef.current.pause();
        videoRef.current.muted = true;
      }
    }
  }, [isPlaying]);

  return (
    <div
      onClick={onToggle}
      className="snap-center shrink-0 w-[240px] md:w-[280px] h-[440px] md:h-[500px] bg-white/2 rounded-[2rem] border border-white/10 relative overflow-hidden group cursor-pointer"
    >
      <div className="absolute inset-0 z-0">
        {item.videoSource === "file" && item.directVideoUrl ? (
          <video
            ref={videoRef}
            src={item.directVideoUrl + "#t=0.1"}
            className={`w-full h-full object-cover transition-opacity duration-500 ${isPlaying ? 'opacity-100' : 'opacity-50 group-hover:opacity-70'}`}
            preload="metadata"
            loop
            playsInline
          />
        ) : item.image ? (
          <Image src={item.image} alt={item.title} fill className="object-cover opacity-50 group-hover:opacity-70 transition-opacity" />
        ) : (
          <div className="w-full h-full bg-emerald-950/50" />
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10" />

      <div className="absolute inset-0 flex items-center justify-center z-20">
        {!isPlaying && (
          <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
            <Play className="fill-current w-4 h-4 ml-1" />
          </div>
        )}
      </div>

      <div className="absolute bottom-8 left-8 z-20">
        <p className="text-emerald-400 text-[9px] font-black uppercase tracking-widest mb-1.5">{item.category}</p>
        <h4 className="text-white text-lg font-bold tracking-tight mb-2">{item.title}</h4>
        {isPlaying && (
          <div className="flex items-center gap-2 text-white/50 text-[8px] uppercase tracking-widest font-bold">
            <Volume2 className="w-2.5 h-2.5 text-emerald-400" />
            Playing
          </div>
        )}
      </div>

      {item.videoSource === "youtube" && !isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-30 group-hover:bg-black/20 transition-all pointer-events-none">
          <p className="text-white/60 text-[9px] font-bold tracking-widest uppercase">YouTube Reel</p>
        </div>
      )}

      {isPlaying && item.videoSource === "youtube" && (
        <div className="absolute inset-0 z-40 bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${item.videoUrl?.split('v=')[1]?.split('&')[0]}?autoplay=1&mute=0&controls=0&loop=1&playlist=${item.videoUrl?.split('v=')[1]?.split('&')[0]}`}
            className="w-full h-full"
            allow="autoplay"
          />
        </div>
      )}
    </div>
  );
};

// --- 2. REELS WORK SECTION ---
const WorkReelsSection = ({ workData }: { workData?: any }) => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const title = workData?.title || "Our Work";
  const label = workData?.description || "Industry-leading performance creative.";
  const items = workData?.items || [];

  return (
    <section className="relative -mt-[1px] pt-0 pb-20 px-6 bg-[#05180D] overflow-hidden border-none">
      {/* Background glow for blending */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.08),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-3">{title}</h2>
            <p className="text-emerald-400 text-lg italic font-medium opacity-80">{label}</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => scroll('left')} className="p-4 rounded-full border border-white/10 text-white hover:bg-white hover:text-black transition-all"><ArrowLeft className="w-5 h-5" /></button>
            <button onClick={() => scroll('right')} className="p-4 rounded-full border border-white/10 text-white hover:bg-white hover:text-black transition-all"><ArrowRight className="w-5 h-5" /></button>
          </div>
        </div>
        <div ref={scrollRef} className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4">
          {items.map((item: any, i: number) => (
            <ReelCard
              key={item._key || i}
              item={item}
              isPlaying={playingId === (item._key || String(i))}
              onToggle={() => setPlayingId(playingId === (item._key || String(i)) ? null : (item._key || String(i)))}
            />
          ))}
        </div>
      </div>

      {/* Mask to blend with next section */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#05180D] to-transparent pointer-events-none" />
    </section>
  );
};

// --- 3. REIMAGINED 2060 FEATURE GRID ---
const AnimatedFeatureGrid = ({ items, title, label, isSolution = false }: FeatureGridProps) => {
  return (
    <section className={`relative py-24 px-6 overflow-hidden ${isSolution ? 'bg-[#05180D]' : 'bg-[#05180D]'}`}>
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/stardust.png")` }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-6 bg-emerald-500/50" />
              <p className="text-emerald-500 text-[9px] font-black tracking-[0.4em] uppercase">{label}</p>
            </div>
            <h2 className="text-4xl md:text-5xl text-white font-black tracking-tighter leading-none italic lowercase">
              {title}
            </h2>
          </div>
          <div className="hidden md:block h-px flex-1 bg-white/5 mx-10 mb-4" />
        </div>

        {/* --- GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
          {items?.map((item: FeatureItem, i: number) => (
            <div key={i} className="feature-card group relative p-8 md:p-10 bg-[#05180D] transition-all duration-700 hover:bg-white/2">
              <div className="absolute top-0 right-0 p-5 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-3 group-hover:translate-x-0">
                <ArrowUpRight className="w-4 h-4 text-emerald-500" />
              </div>

              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-white/3 border border-white/10 flex items-center justify-center mb-8 transition-all duration-500 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10">
                  {isSolution ? <ShieldCheck className="w-4 h-4 text-emerald-400" /> : <Zap className="w-4 h-4 text-emerald-400" />}
                </div>

                <div className="space-y-3">
                  <h3 className="text-white text-xl font-bold tracking-tight group-hover:text-emerald-400 transition-colors duration-500">
                    {item.title}
                  </h3>
                  <p className="text-white/30 leading-relaxed font-normal text-sm md:text-base group-hover:text-white/60 transition-colors duration-500">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-emerald-500/0 group-hover:bg-emerald-500/50 transition-all duration-700 origin-left scale-x-0 group-hover:scale-x-100" />
            </div>
          ))}
        </div>
      </div>

      {/* Mask to blend with next section */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#05180D] to-transparent pointer-events-none" />
    </section>
  );
};

// --- 4. CENTERED PRICING ---
const CenteredPricing = ({ data }: { data?: any }) => {
  const label = data?.plansLabel || "Investment";
  const title = data?.plansTitle || "Plans built for scale.";
  const plans = data?.plans || [
    { name: "Growth Core", popular: false, description: "The Starter", features: ["8 Custom Ads / Mo", "Hook Testing Framework", "Monthly Audit", "72h Turnaround"] },
    { name: "Scale Suite", popular: true, description: "The Dominator", features: ["16+ Custom Ads / Mo", "Full-Funnel Content", "Weekly Sync", "24h Priority"] }
  ];

  return (
    <section className="py-24 px-6 bg-[#05180D] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/3 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <p className="text-emerald-500 text-[10px] font-black tracking-[0.4em] uppercase mb-4">{label}</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-5">{title}</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 items-center">
          {plans.map((plan: any, i: number) => (
            <div key={i} className={`p-8 md:p-10 rounded-[2.5rem] border backdrop-blur-3xl transition-all duration-500 ${plan.popular ? "relative border-emerald-500/30 bg-white/5 shadow-[0_0_60px_rgba(16,185,129,0.08)] scale-102 z-20" : "border-white/5 bg-white/2"}`}>
              {plan.popular && <div className="absolute top-6 right-8 px-2.5 py-1 rounded-full bg-emerald-500 text-black text-[8px] font-black uppercase tracking-widest">Recommended</div>}
              <h3 className={`${plan.popular ? 'text-emerald-400' : 'text-white/50'} text-[10px] font-bold uppercase tracking-widest mb-1.5`}>{plan.description}</h3>
              <span className="text-white text-4xl font-bold tracking-tighter mb-8 block">{plan.name}</span>
              <ul className="space-y-4 mb-10">
                {plan.features?.map((f: string, idx: number) => (
                  <li key={idx} className={`flex items-center gap-2.5 text-sm ${plan.popular ? 'text-white font-medium' : 'text-white/70 font-normal'}`}>
                    <Check className={`w-3 h-3 ${plan.popular ? 'text-emerald-500' : 'text-emerald-400'}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="#schedule" className="block"><Button className={`w-full h-12 rounded-full font-bold uppercase tracking-widest text-[9px] ${plan.popular ? 'bg-white text-black' : 'bg-white/5 border border-white/10 text-white'}`}>Book A Call</Button></Link>
            </div>
          ))}
        </div>
      </div>

      {/* Mask for next section */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#05180D] to-transparent pointer-events-none" />
    </section>
  );
};

// --- 5. RESULTS ---
const ResultsSection = ({ items, title }: ResultsProps) => {
  return (
    <section className="py-24 px-6 bg-[#05180D] overflow-hidden text-center relative">
      {/* Atmospheric radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.1),transparent_70%)] pointer-events-none" />

      <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter opacity-90 mb-16 relative z-10">{title}</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto relative z-10">
        {items?.map((item: ResultItem, i: number) => (
          <div key={i} className="relative aspect-square rounded-[2rem] overflow-hidden border border-white/10 bg-white/5 group">
            {item.image && <Image src={item.image} alt={item.label || "Result Proof"} fill className="object-cover opacity-70 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105" />}
          </div>
        ))}
      </div>

      {/* Mask for next section */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#05180D] to-transparent pointer-events-none" />
    </section>
  );
};

// --- 6. OUR PROCESS ---
const ProcessSection = () => {
  const container = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(lineRef.current, { scaleX: 0, scaleY: 0, transformOrigin: "top left" }, {
        scaleX: 1, scaleY: 1, ease: "none",
        scrollTrigger: { trigger: container.current, start: "top 40%", end: "bottom 60%", scrub: 1 }
      });
    }, container);
    return () => ctx.revert();
  }, []);

  const steps = [
    { name: "Creative Audit", desc: "Data-driven analysis of your historical performance to identify hook-leakage." },
    { name: "Strategy Mapping", desc: "Strategy roadmap based on core human desires and direct-response triggers." },
    { name: "Asset Production", desc: "High-volume delivery of studio-grade videos built specifically for high CTR." },
    { name: "Performance Scaling", desc: "Rapid iterations of data-backed winners to lower CAC and maximize ROAS." }
  ];

  return (
    <section ref={container} className="py-24 px-6 bg-[#05180D] relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16 md:mb-20">
          <p className="text-emerald-500 text-[9px] font-black tracking-[0.4em] uppercase mb-3">The Workflow</p>
          <h2 className="text-5xl md:text-7xl text-white font-black tracking-tighter leading-none italic lowercase">the system</h2>
        </div>
        <div className="relative">
          <div ref={lineRef} className="absolute top-0 left-0 md:w-full md:h-px w-[2px] h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)] z-10" />
          <div className="absolute top-0 left-0 md:w-full md:h-px w-[2px] h-full bg-white/5" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12">
            {steps.map((step, i) => (
              <div key={i} className="pt-10 md:pt-14 relative group pl-8 md:pl-0">
                <div className="absolute top-0 left-[-7px] md:left-0 md:-translate-y-1/2 w-3.5 h-3.5 rounded-full bg-emerald-500 border-4 border-[#05180D] z-20 group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                <span className="text-emerald-500 font-bold text-[9px] tracking-widest mb-3 block uppercase opacity-50 group-hover:opacity-100 transition-opacity">Step 0{i + 1}</span>
                <h3 className="text-white text-xl md:text-2xl font-bold mb-4 tracking-tight group-hover:text-emerald-400 transition-colors">{step.name}</h3>
                <p className="text-white/40 leading-relaxed font-normal text-sm md:text-base group-hover:text-white/60 transition-colors">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default function AdCreativesPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    client.fetch(servicePageQuery, { slug: "ad-creatives" }).then(setData);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#05180D] selection:bg-emerald-500/30">
      <main className="grow">
        <HeroCentered
          sectionLabel={data?.sectionLabel}
          title={data?.headlineTitle || "Performance creative that"}
          highlight={data?.headlineHighlight || "earns attention"}
          titleAfter={data?.headlineTitleAfter || "and converts."}
          subtitle={data?.headlineSubtitle || "An always-on creative system: hooks, angles, and iterations built for measurable revenue growth."}
        />
        <WorkReelsSection workData={data?.work} />
        <AnimatedFeatureGrid
          label={data?.problemsLabel || "The Problem"}
          title={data?.problemsTitle || "What brands usually go through"}
          items={data?.problems || [
            { title: "Pretty but Passive", description: "Creative is the #1 lever in paid, yet most brands ship videos without a testing framework." },
            { title: "Retention Leaks", description: "If the first 2 seconds don't stop the scroll, your ad budget is essentially a donation." },
            { title: "Random Iteration", description: "Guessing what to make next leads to inconsistent ROAS and massive wasted spend." }
          ]}
        />
        <AnimatedFeatureGrid
          isSolution
          label={data?.solutionsLabel || "The Matera Solution"}
          title={data?.solutionsTitle || "How we solve for growth"}
          items={data?.solutions || [
            { title: "Hook Testing Engine", description: "We produce rapid variations to find the specific hooks that earn the click." },
            { title: "Direct-Response Edits", description: "Pacing, pattern interrupts, and captions designed specifically for watch time." },
            { title: "Strategy-First Design", description: "Messaging and offer clarity mapped out before we ever touch a timeline." }
          ]}
        />
        <ResultsSection
          title={data?.resultsTitle || "Our Results"}
          items={data?.results || [{ image: "/" }, { image: "/results/s2.png" }, { image: "/results/s3.png" }, { image: "/results/s4.png" }]}
        />
        <ProcessSection />
        <CenteredPricing data={data} />
        <InquiryForm sourcePage="ad-creatives" />
      </main>
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}