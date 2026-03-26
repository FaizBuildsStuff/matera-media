"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ArrowLeft, Play, X, Volume2, VolumeX,
  Activity, Check, Zap, ShieldCheck, ArrowUpRight,
  CloudRain,
  UserX,
  XCircle
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ServiceCalendly } from "@/components/ServiceCalendly";
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
  ctaText?: string;
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

// --- 1. CENTERED HERO (Refined Weights & Contrast) ---
const HeroCentered = ({ title, highlight, titleAfter, subtitle, ctaText }: HeroProps) => {
  return (
    <section className="relative pt-32 pb-24 px-6 overflow-hidden bg-[#051A0E] flex flex-col items-center text-center z-30">
      <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,700,900&display=swap" rel="stylesheet" />
      
      {/* --- REFINED SPOTLIGHTS (Pushed back to let text breathe) --- */}
      <div className="absolute top-[-25%] left-[-15%] w-[50%] h-[50%] bg-white/[0.02] blur-[180px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-[-15%] right-[-20%] w-[40%] h-[40%] bg-white/[0.02] blur-[160px] rounded-full pointer-events-none z-0" />

      {/* Subtle Central Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.03),transparent_80%)] pointer-events-none z-0" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-40 max-w-4xl mt-12 md:mt-20"
      >
        {/* Changed font-black to font-bold and tracking-tighter to tracking-tight for better legibility */}
        <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-8 whitespace-pre-wrap">
          {title}{" "}
          <span
            className="text-emerald-400 px-2 inline-block whitespace-pre-wrap"
            style={{ 
                fontFamily: "'Satoshi', sans-serif", 
                fontStyle: "italic", 
                fontWeight: 500, // Slightly heavier than before to stop blending
                textShadow: "0 0 20px rgba(52, 211, 153, 0.2)" // Subtle glow to make it pop
            }}
          >
            {highlight}
          </span>{" "}
          {titleAfter}
        </h1>

        <p className="text-white/40 text-base md:text-lg font-normal max-w-2xl mx-auto leading-relaxed mb-12 whitespace-pre-wrap">
          {subtitle}
        </p>

        <Link href="#schedule">
          <Button className="h-12 px-8 rounded-full bg-white text-black text-[10px] font-black tracking-widest hover:scale-105 transition-all group shadow-[0_0_40px_rgba(255,255,255,0.1)] whitespace-pre-wrap">
            {ctaText || "Book a Free Audit"}
            <div className="ml-3 w-6 h-6 rounded-full bg-black flex items-center justify-center">
              <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Button>
        </Link>
      </motion.div>

      {/* --- THE "UNDER SECTION" FIX --- */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#051A0E] via-[#051A0E] to-transparent pointer-events-none z-20" />
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
        <p className="text-emerald-400 text-[9px] font-black tracking-widest mb-1.5">{item.category}</p>
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

// --- 2. REELS WORK SECTION (Connected with Hero Spotlights) ---
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
    <section className="relative -mt-[1px] pt-24 pb-20 px-6 bg-[#051A0E] overflow-hidden border-none z-10">
      
      {/* --- TOP CONNECTION MASK --- */}
      {/* This creates the 'Under the Hero' effect by starting with solid #051A0E */}
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-[#051A0E] via-[#051A0E] to-transparent pointer-events-none z-20" />

      {/* --- MATCHING WHITE SPOTLIGHTS --- */}
      {/* Soft spotlight coming from the left to match Hero atmosphere */}
      <div className="absolute top-[10%] left-[-15%] w-[50%] h-[50%] bg-white/[0.02] blur-[160px] rounded-full pointer-events-none z-0" />
      {/* Soft spotlight on the right */}
      <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-white/[0.02] blur-[140px] rounded-full pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-30">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-3">{title}</h2>
            <p className="text-emerald-400 text-lg italic font-medium opacity-80">{label}</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => scroll('left')} className="p-4 rounded-full border border-white/10 text-white hover:bg-white hover:text-black transition-all">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button onClick={() => scroll('right')} className="p-4 rounded-full border border-white/10 text-white hover:bg-white hover:text-black transition-all">
              <ArrowRight className="w-5 h-5" />
            </button>
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

      {/* Bottom Mask for next section connection */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#051A0E] via-[#051A0E]/80 to-transparent pointer-events-none z-20" />
    </section>
  );
};

// --- 3. REIMAGINED 2060 FEATURE GRID (Case & Line Break Fix) ---
const AnimatedFeatureGrid = ({ items, title, label, isSolution = false }: FeatureGridProps) => {
  
  const getProblemIcon = (index: number) => {
    const icons = [
      <CloudRain className="w-5 h-5 text-red-500" />, 
      <UserX className="w-5 h-5 text-red-500" />,      
      <XCircle className="w-5 h-5 text-red-500" />     
    ];
    return icons[index % icons.length];
  };

  return (
    <section className="relative -mt-[1px] py-24 px-6 overflow-hidden bg-[#051A0E] border-none z-10">
      
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-[#051A0E] via-[#051A0E] to-transparent pointer-events-none z-20" />
      <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-white/[0.02] blur-[160px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[10%] left-[-15%] w-[40%] h-[40%] bg-white/[0.02] blur-[140px] rounded-full pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-30">
        {/* --- HEADER --- */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className={`h-px w-8 ${isSolution ? 'bg-emerald-500/50' : 'bg-red-500/50'}`} />
            <p className={`${isSolution ? 'text-emerald-500' : 'text-red-500'} text-[10px] font-bold tracking-[0.5em] uppercase whitespace-pre-wrap`}>
              {label}
            </p>
            <div className={`h-px w-8 ${isSolution ? 'bg-emerald-500/50' : 'bg-red-500/50'}`} />
          </div>
          
          {/* REMOVED 'lowercase' and fixed 'leading' for line breaks */}
          <h2 className="text-4xl md:text-5xl text-white font-black tracking-tighter leading-tight italic max-w-2xl whitespace-pre-wrap">
            {title}
          </h2>
        </div>

        {/* --- THE GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items?.map((item: any, i: number) => (
            <div 
              key={i} 
              className={`relative p-10 rounded-[2.5rem] transition-all duration-500 flex flex-col items-center text-center
                ${isSolution 
                  ? 'bg-white/[0.02] border border-white/5 shadow-2xl' 
                  : 'bg-red-500/[0.01] border border-red-500/20 shadow-[0_0_40px_rgba(239,68,68,0.03)]' 
                }`}
            >
              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-8 mx-auto
                  ${isSolution ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-red-500/10 border border-red-500/20'}`}
                >
                  {isSolution ? (
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  ) : (
                    getProblemIcon(i)
                  )}
                </div>

                <div className="space-y-3">
                  <h3 className="text-white text-xl font-bold tracking-tight whitespace-pre-wrap">
                    {item.title}
                  </h3>
                  <p className="text-white/30 leading-relaxed font-normal text-sm md:text-base max-w-[280px] mx-auto whitespace-pre-wrap">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#051A0E] via-[#051A0E]/80 to-transparent pointer-events-none z-20" />
    </section>
  );
};
// --- 4. CENTERED PRICING (2-Plan Focus Version) ---
const CenteredPricing = ({ data }: { data?: any }) => {
  const label = data?.plansLabel || "Investment";
  const title = data?.plansTitle || "Plans built for scale.";
  const plans = data?.plans || [];

  const isSinglePlan = plans.length === 1;
  const isTwoPlans = plans.length === 2;

  return (
    <section className="relative -mt-[1px] py-24 px-6 bg-[#051A0E] overflow-hidden border-none z-10">
      
      {/* --- BG LIGHTING --- */}
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-[#051A0E] via-[#051A0E] to-transparent pointer-events-none z-20" />
      <div className="absolute top-[10%] right-[-5%] w-[40%] h-[40%] bg-white/[0.03] blur-[160px] rounded-full pointer-events-none z-0" />

      {/* Adaptive Container: Narrow for 1, Medium for 2, Wide for 3+ */}
      <div className={`
        ${isSinglePlan ? 'max-w-md' : isTwoPlans ? 'max-w-4xl' : 'max-w-7xl'} 
        mx-auto relative z-30
      `}>
        <div className="text-center mb-16">
          <p className="text-emerald-500 text-[10px] font-black tracking-[0.4em] mb-4 whitespace-pre-wrap">{label}</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-5 whitespace-pre-wrap">{title}</h2>
        </div>

        {/* Grid Setup: 2 plans are centered using flex or grid-cols-2 */}
        <div className={`
          grid gap-8 items-stretch
          ${isSinglePlan ? 'grid-cols-1' : isTwoPlans ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-3'}
        `}>
          {plans.map((plan: any, i: number) => (
            <div 
              key={i} 
              className={`flex flex-col p-8 md:p-10 rounded-[2.5rem] border backdrop-blur-3xl transition-all duration-700 w-full
                ${plan.popular 
                  ? "relative border-emerald-500/40 bg-white/[0.05] shadow-[0_0_80px_rgba(16,185,129,0.12)] scale-105 z-20" 
                  : "border-white/10 bg-white/[0.02] opacity-80 scale-100"
                }
              `}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-emerald-500 text-black text-[9px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                  Most Popular
                </div>
              )}
              
              <h3 className={`${plan.popular ? 'text-emerald-400' : 'text-white/40'} text-[10px] font-bold tracking-widest mb-2 whitespace-pre-wrap`}>
                {plan.description}
              </h3>
              
              <span className="text-white text-4xl font-bold tracking-tighter mb-8 block whitespace-pre-wrap">
                {plan.name}
              </span>
              
              <ul className="space-y-4 mb-10 flex-1">
                {plan.features?.map((f: string, idx: number) => (
                  <li key={idx} className={`flex items-center gap-2.5 text-sm ${plan.popular ? 'text-white' : 'text-white/60'}`}>
                    <Check className={`w-3.5 h-3.5 ${plan.popular ? 'text-emerald-500' : 'text-emerald-800'}`} />
                    {f}
                  </li>
                ))}
              </ul>
              
              <Link href="#schedule" className="block mt-auto">
                <Button className={`w-full h-12 rounded-full font-black uppercase tracking-widest text-[9px] transition-all
                  ${plan.popular 
                    ? 'bg-white text-black hover:bg-emerald-500 hover:text-white' 
                    : 'bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black'
                  }
                `}>
                  I Need This
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#051A0E] via-[#051A0E]/80 to-transparent pointer-events-none z-20" />
    </section>
  );
};
// --- 5. RESULTS (Connected Lighting) ---
const ResultsSection = ({ items, title }: ResultsProps) => {
  return (
    <section className="relative -mt-[1px] py-24 px-6 bg-[#051A0E] overflow-hidden text-center border-none z-10">
      
      {/* --- TOP CONNECTION MASK --- */}
      {/* Merges with the section above */}
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-[#051A0E] via-[#051A0E] to-transparent pointer-events-none z-20" />

      {/* --- LUXURY WHITE SPOTLIGHTS --- */}
      {/* Large soft top-center spotlight */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[60%] h-[50%] bg-white/[0.03] blur-[160px] rounded-full pointer-events-none z-0" />
      {/* Subtle side glow */}
      <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[40%] bg-white/[0.02] blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-30">
        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter opacity-90 mb-16 whitespace-pre-wrap">
          {title}
        </h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {items?.map((item: ResultItem, i: number) => (
            <div key={i} className="relative aspect-square rounded-[2rem] overflow-hidden border border-white/10 bg-white/5 group">
              {item.image && (
                <Image 
                  src={item.image} 
                  alt={item.label || "Result Proof"} 
                  fill 
                  className="object-cover opacity-70 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105" 
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* --- BOTTOM BLEND MASK --- */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#051A0E] via-[#051A0E]/80 to-transparent pointer-events-none z-20" />
    </section>
  );
};
// --- 6. OUR PROCESS (Connected Lighting) ---
const ProcessSection = ({ data }: { data?: any }) => {
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

  const label = data?.processLabel || "The Workflow";
  const title = data?.processTitle || "the system";
  const steps = data?.processSteps || [
    { name: "Creative Audit", desc: "Data-driven analysis of your historical performance to identify hook-leakage." },
    { name: "Strategy Mapping", desc: "Strategy roadmap based on core human desires and direct-response triggers." },
    { name: "Asset Production", desc: "High-volume delivery of studio-grade videos built specifically for high CTR." },
    { name: "Performance Scaling", desc: "Rapid iterations of data-backed winners to lower CAC and maximize ROAS." }
  ];

  return (
    <section ref={container} className="relative -mt-[1px] py-24 px-6 bg-[#051A0E] overflow-hidden border-none z-10">
      
      {/* --- TOP CONNECTION MASK --- */}
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-[#051A0E] via-[#051A0E] to-transparent pointer-events-none z-20" />

      {/* --- LUXURY WHITE SPOTLIGHTS --- */}
      {/* Soft spotlight on the left side */}
      <div className="absolute top-[10%] left-[-10%] w-[45%] h-[50%] bg-white/[0.02] blur-[160px] rounded-full pointer-events-none z-0" />
      {/* Soft spotlight on the right side */}
      <div className="absolute bottom-[10%] right-[-15%] w-[40%] h-[50%] bg-white/[0.02] blur-[140px] rounded-full pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-30">
        <div className="mb-16 md:mb-20">
          <p className="text-emerald-500 text-[9px] font-black tracking-[0.4em] mb-3">{label}</p>
          <h2 className="text-5xl md:text-7xl text-white font-black tracking-tighter leading-none italic">{title}</h2>
        </div>
        
        <div className="relative">
          {/* Progress Line */}
          <div ref={lineRef} className="absolute top-0 left-0 md:w-full md:h-px w-[2px] h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)] z-10" />
          <div className="absolute top-0 left-0 md:w-full md:h-px w-[2px] h-full bg-white/5" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12">
            {steps.map((step: any, i: number) => (
              <div key={i} className="pt-10 md:pt-14 relative group pl-8 md:pl-0">
                {/* Step Circle - Updated border to match #051A0E */}
                <div className="absolute top-0 left-[-7px] md:left-0 md:-translate-y-1/2 w-3.5 h-3.5 rounded-full bg-emerald-500 border-4 border-[#051A0E] z-20 group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                
                <span className="text-emerald-500 font-bold text-[9px] tracking-widest mb-3 block uppercase opacity-50 group-hover:opacity-100 transition-opacity">Step 0{i + 1}</span>
                <h3 className="text-white text-xl md:text-2xl font-bold mb-4 tracking-tight group-hover:text-emerald-400 transition-colors whitespace-pre-wrap">{step.name}</h3>
                <p className="text-white/40 leading-relaxed font-normal text-sm md:text-base group-hover:text-white/60 transition-colors whitespace-pre-wrap">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- BOTTOM BLEND MASK --- */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#051A0E] via-[#051A0E]/80 to-transparent pointer-events-none z-20" />
    </section>
  );
};

export default function AdCreativesPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    client.fetch(servicePageQuery, { slug: "ad-creatives" }).then(setData);
  }, []);

  if (!data) {
    return (
      <div className="flex flex-col min-h-screen bg-[#05180D] items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-emerald-500/20 border-t-emerald-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#05180D] selection:bg-emerald-500/30">
      <main className="grow">
        <HeroCentered
          sectionLabel={data?.sectionLabel}
          title={data?.headlineTitle || "Performance creative that"}
          highlight={data?.headlineHighlight || "earns attention"}
          titleAfter={data?.headlineTitleAfter || "and converts."}
          subtitle={data?.headlineSubtitle || "An always-on creative system: hooks, angles, and iterations built for measurable revenue growth."}
          ctaText={data?.heroCta}
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
        <ProcessSection data={data} />
        <CenteredPricing data={data} />
        <ServiceCalendly content={{
          title: data?.calendlyTitle,
          subtitle: data?.calendlySubtitle,
          calendlyUrl: data?.calendlyUrl,
          highlightedWord: data?.calendlyHighlightedWord,
        }} />
      </main>
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}