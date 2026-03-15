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
            Get Pricing & Deck
            <div className="ml-3 w-6 h-6 rounded-full bg-black flex items-center justify-center">
              <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Button>
        </Link>
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#05180D] to-transparent pointer-events-none" />
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
      className="snap-center shrink-0 w-[400px] aspect-video bg-white/2 rounded-[2rem] border border-white/10 relative overflow-hidden group cursor-pointer"
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
          <p className="text-white/60 text-[9px] font-bold tracking-widest uppercase">YouTube Video</p>
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
  const label = workData?.description || "High-converting SaaS video content.";
  const items = workData?.items || [];

  return (
    <section className="relative -mt-[1px] pt-0 pb-20 px-6 bg-[#05180D] overflow-hidden border-none">
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

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#05180D] to-transparent pointer-events-none" />
    </section>
  );
};

// --- 3. REIMAGINED 2060 FEATURE GRID ---
const AnimatedFeatureGrid = ({ items, title, label, isSolution = false }: FeatureGridProps) => {
  return (
    <section className="relative py-24 px-6 overflow-hidden bg-[#05180D]">
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/stardust.png")` }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
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
                  <h3 className="text-white text-xl font-bold tracking-tight group-hover:text-emerald-400 transition-colors duration-500">{item.title}</h3>
                  <p className="text-white/30 leading-relaxed font-normal text-sm md:text-base group-hover:text-white/60 transition-colors duration-500">{item.description}</p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-emerald-500/0 group-hover:bg-emerald-500/50 transition-all duration-700 origin-left scale-x-0 group-hover:scale-x-100" />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#05180D] to-transparent pointer-events-none" />
    </section>
  );
};

// --- 4. CENTERED PRICING ---
const CenteredPricing = ({ data }: { data?: any }) => {
  const label = data?.plansLabel || "Investment";
  const title = data?.plansTitle || "Simple plans for SaaS scale.";
  const plans = data?.plans || [
    { name: "Starter SaaS", popular: false, description: "Scale Plan", features: ["2 Demo Videos", "Landing Page Audit", "Strategy Consultation", "Monthly Updates"] },
    { name: "Growth SaaS", popular: true, description: "Dominance Plan", features: ["5 Demo Videos", "Product Onboarding Series", "Ad Creative Suite", "Bi-Weekly Strategy Calls"] }
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
            <div
              key={i}
              className={`p-8 md:p-10 rounded-[2.5rem] border backdrop-blur-3xl transition-all duration-500 ${plan.popular
                ? "relative border-emerald-500/30 bg-white/5 shadow-[0_0_60px_rgba(16,185,129,0.08)] scale-102 z-20"
                : "border-white/5 bg-white/2"
                }`}
            >
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
              <Link href="#schedule" className="block">
                <Button className={`w-full h-12 rounded-full font-bold uppercase tracking-widest text-[9px] ${plan.popular ? 'bg-white text-black' : 'bg-white/5 border border-white/10 text-white'}`}>Book A Call</Button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#05180D] to-transparent pointer-events-none" />
    </section>
  );
};

// --- 5. RESULTS ---
const ResultsSection = ({ items, title }: ResultsProps) => {
  return (
    <section className="py-24 px-6 bg-[#05180D] overflow-hidden text-center relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.1),transparent_70%)] pointer-events-none" />

      <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter opacity-90 mb-16 relative z-10">{title}</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto relative z-10">
        {items?.map((item: ResultItem, i: number) => (
          <div key={i} className="relative aspect-square rounded-[2rem] overflow-hidden border border-white/10 bg-white/5 group">
            {item.image && <Image src={item.image} alt={item.label || "Result Proof"} fill className="object-cover opacity-70 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105" />}
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#05180D] to-transparent pointer-events-none" />
    </section>
  );
};

export default function SaaSVideosPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    client.fetch(servicePageQuery, { slug: "saas-videos" }).then(setData);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#05180D] selection:bg-emerald-500/30">
      <main className="grow">
        <HeroCentered
          sectionLabel={data?.sectionLabel}
          title={data?.headlineTitle || "SaaS product videos that"}
          highlight={data?.headlineHighlight || "convert"}
          titleAfter={data?.headlineTitleAfter || "trials into users."}
          subtitle={data?.headlineSubtitle || "We craft high-converting product demos, explainers, and onboarding videos designed specifically for software companies."}
        />
        <WorkReelsSection workData={data?.work} />
        <AnimatedFeatureGrid
          label={data?.problemsLabel || "The Bottlenecks"}
          title={data?.problemsTitle || "Why your software isn't selling itself"}
          items={data?.problems || [
            { title: "Complex Value Proposition", description: "Users don't instantly understand what your software does, leading to high bounce rates." },
            { title: "Trial Drop-offs", description: "Poor onboarding leads to users abandoning your app before experiencing the 'aha' moment." },
            { title: "Boring Demos", description: "Standard screen recordings fail to engage prospects or showcase the true power of your platform." }
          ]}
        />
        <AnimatedFeatureGrid
          isSolution
          label={data?.solutionsLabel || "The Matera Framework"}
          title={data?.solutionsTitle || "How we visualize your software"}
          items={data?.solutions || [
            { title: "Clear Storytelling", description: "We translate complex technical features into simple, benefit-driven narratives." },
            { title: "Sleek Motion Design", description: "Studio-grade UI animations and motion graphics that make your product look premium." },
            { title: "Conversion-Optimized", description: "Every second is engineered to drive signups, demo requests, and activation." }
          ]}
        />
        <ResultsSection
          title={data?.resultsTitle || "Our Results"}
          items={data?.results || [{ image: "/" }, { image: "/" }, { image: "/" }, { image: "/" }]}
        />
        <CenteredPricing data={data} />
        <InquiryForm sourcePage="saas-videos" />
      </main>
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}