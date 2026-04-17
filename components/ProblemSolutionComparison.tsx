"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import {
  X,
  Check,
  Video,
  Mic,
  Clapperboard,
  Instagram,
  Twitter,
  Youtube,
  Search,
  Users,
  DollarSign
} from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Item {
  title: string;
  description?: string;
}

interface ProblemSolutionComparisonProps {
  problems: Item[];
  solutions: Item[];
  problemsLabel?: string;
  solutionsLabel?: string;
  problemsTitle?: string;
  solutionsTitle?: string;
}

const ProblemGraphic = () => {
  const hudRef = useRef(null);

  useGSAP(() => {
    gsap.to(".prob-ring", {
      rotation: -180,
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    gsap.to(".prob-ring-inner", {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none",
    });
    gsap.to(".prob-pulse", {
      scale: 1.15,
      opacity: 0.4,
      duration: 0.15,
      repeat: -1,
      yoyo: true,
      ease: "steps(2)" // Glitchy vibe
    });
  }, { scope: hudRef });

  return (
    <div ref={hudRef} className="relative w-full aspect-square max-w-[200px] mx-auto flex items-center justify-center">
      {/* Central Glitch Orb */}
      <div className="relative z-20 w-20 h-20 bg-red-500/5 rounded-full border border-red-500/20 flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.15)] backdrop-blur-sm">
        <div className="prob-pulse absolute inset-0 rounded-full bg-red-500/10 blur-xl" />
        <div className="relative z-30 w-12 h-12 flex items-center justify-center text-red-500/60">
          <X className="w-8 h-8 stroke-[2.5] prob-pulse" />
        </div>
      </div>

      {/* Rotating Broken Rings */}
      <div className="prob-ring absolute w-[140px] h-[140px] border border-dashed border-red-500/20 rounded-full" />
      <div className="prob-ring-inner absolute w-[110px] h-[110px] border border-red-500/10 border-t-red-500/40 border-l-red-500/10 rounded-full" />

      {/* Scattered Icons */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <div className="absolute top-2 right-4 p-1.5 bg-black/40 backdrop-blur-md rounded-xl border border-red-500/20 text-red-400">
          <DollarSign className="w-4 h-4 opacity-40" />
        </div>
        <div className="absolute bottom-6 left-2 p-1.5 bg-black/40 backdrop-blur-md rounded-xl border border-red-500/20 text-red-400">
          <Users className="w-4 h-4 opacity-40" />
        </div>
        <div className="absolute top-1/2 -left-2 -translate-y-1/2 p-2 bg-red-500/20 rounded-full text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
           <X className="w-3 h-3 stroke-[3]" />
        </div>
      </div>
    </div>
  );
};

const HUDGraphic = () => {
  const hudRef = useRef(null);

  useGSAP(() => {
    gsap.to(".hud-ring", {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none",
    });
    gsap.to(".hud-ring-inner", {
      rotation: -360,
      duration: 15,
      repeat: -1,
      ease: "none",
    });
    gsap.to(".hud-pulse", {
      scale: 1.1,
      opacity: 0.5,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, { scope: hudRef });

  return (
    <div ref={hudRef} className="relative w-full aspect-square max-w-[200px] mx-auto flex items-center justify-center">
      {/* Central Logo Orb */}
      <div className="relative z-20 w-20 h-20 bg-emerald-500/5 rounded-full border border-emerald-500/20 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.15)] backdrop-blur-sm">
        <div className="hud-pulse absolute inset-0 rounded-full bg-emerald-500/10 blur-xl" />
        <div className="relative z-30 w-12 h-12 flex items-center justify-center">
          <img src="/Logo.png" alt="Logo" className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
        </div>
      </div>

      {/* Rotating Rings */}
      <div className="hud-ring absolute w-[140px] h-[140px] border border-dashed border-emerald-500/20 rounded-full" />
      <div className="hud-ring-inner absolute w-[110px] h-[110px] border border-emerald-500/10 border-t-emerald-500/40 rounded-full" />

      {/* Icons Orbiting or Stacked */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <div className="absolute top-4 left-4 p-1.5 bg-black/40 backdrop-blur-md rounded-xl border border-emerald-500/20 text-emerald-400">
          <Video className="w-4 h-4" />
        </div>
        <div className="absolute bottom-4 right-4 p-1 bg-emerald-500 rounded-full text-black shadow-[0_0_15px_rgba(16,185,129,0.5)]">
          <Check className="w-3 h-3 stroke-[3]" />
        </div>
        <div className="absolute top-1/2 -right-1 -translate-y-1/2 p-1.5 bg-black/40 backdrop-blur-md rounded-xl border border-emerald-500/20 text-emerald-400">
          <Clapperboard className="w-4 h-4" />
        </div>
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-5 h-5 rounded-full border border-emerald-500/30 bg-emerald-950/50 overflow-hidden">
              <div className="w-full h-full bg-emerald-500/10 flex items-center justify-center">
                <Users className="w-2.5 h-2.5 text-emerald-500/40" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export const ProblemSolutionComparison = ({
  problems,
  solutions,
  problemsLabel = "The Problem",
  solutionsLabel = "The Matera Solution",
  problemsTitle = "Old Way",
  solutionsTitle = "Dominate Media"
}: ProblemSolutionComparisonProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Text Background Parallax
    gsap.to(".gsap-bg-text", {
      xPercent: -20,
      ease: "none",
      force3D: true,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5,
      }
    });

    // 2. Central drawing spine
    gsap.fromTo(".gsap-spine",
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          end: "bottom 30%",
          scrub: true,
        }
      }
    );

    // 3. Ambient Parallax Elements
    gsap.utils.toArray('.gsap-ambient').forEach((el: any, i) => {
      gsap.to(el, {
        yPercent: -50 * (i + 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-20 px-6 bg-[#051A0E] overflow-hidden" style={{ perspective: "1000px" }}>
      {/* Scroll-Parallax Marquee Background */}
      <div className="absolute inset-0 flex flex-col justify-around pointer-events-none z-0 overflow-hidden opacity-[0.02] select-none" style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' }}>
        {[1, 2, 3, 4, 5].map((_, i) => (
          <div
            key={i}
            className={`gsap-bg-text whitespace-nowrap font-black text-[10vh] md:text-[15vh] leading-none text-white uppercase tracking-tighter ${i % 2 === 0 ? 'ml-[10%]' : 'ml-[-10%]'}`}
            style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
          >
            MATERA MEDIA • DOMINATE YOUR MARKET • MATERA MEDIA • DOMINATE YOUR MARKET
          </div>
        ))}
      </div>

      {/* Advanced GSAP Central Spine Line */}
      <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[0.5px] bg-linear-to-b from-transparent via-white/5 to-transparent z-0">
        <div className="gsap-spine w-full h-full bg-linear-to-b from-transparent via-emerald-500 to-transparent origin-top shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
      </div>

      {/* GSAP Ambient Floating Parallax Graphics */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="gsap-ambient absolute top-[40%] right-[10%] w-[300px] h-[300px] bg-emerald-500/10 blur-[80px] rounded-full" />
        <div className="gsap-ambient absolute top-[60%] left-[5%] w-[250px] h-[250px] bg-red-500/5 blur-[70px] rounded-full" />

        {/* Aesthetic Plus Crosses floating */}
        <div className="gsap-ambient absolute top-[80%] left-[20%] text-white/5 text-2xl font-light">+</div>
        <div className="gsap-ambient absolute top-[30%] right-[25%] text-emerald-500/10 text-3xl font-light">+</div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-stretch">

          {/* --- PROBLEM CARD (LEFT) --- */}
          <div className="gsap-problem-card group relative flex flex-col p-6 md:p-8 rounded-[2rem] bg-red-950/20 border border-red-500/10 shadow-[0_0_80px_rgba(220,38,38,0.05)] hover:border-red-500/20 transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay rounded-[2.5rem] pointer-events-none" />
            <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-red-500/5 blur-[80px] rounded-full pointer-events-none" />

            <div className="h-40 md:h-48 flex items-center justify-center relative z-10 mix-blend-screen">
              <ProblemGraphic />
            </div>

            <div className="mt-8 relative z-10">
              <span className="text-red-500 text-[10px] font-black tracking-[0.3em] mb-3 block uppercase opacity-80 border border-red-500/20 rounded-full px-3 py-1 w-fit bg-red-500/5">
                {problemsLabel}
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tighter mb-6">
                {problemsTitle}
              </h2>

              <ul className="space-y-4">
                {problems.map((item, i) => (
                  <li key={i} className="gsap-problem-item flex items-start gap-4 p-3 rounded-2xl bg-red-950/20 border border-red-500/5 hover:border-red-500/20 transition-all duration-300">
                    <div className="mt-1 w-6 h-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)] text-red-400">
                      <X className="w-3 h-3" />
                    </div>
                    <div>
                      <h4 className="text-white/90 text-base font-bold tracking-tight mb-1">
                        {item.title}
                      </h4>
                      {item.description && (
                        <p className="text-white/40 text-[13px] font-medium leading-relaxed max-w-xs">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* --- SOLUTION CARD (RIGHT) --- */}
          <div className="gsap-solution-card group relative flex flex-col p-6 md:p-8 rounded-[2rem] bg-emerald-950/20 border border-emerald-500/20 shadow-[0_0_80px_rgba(16,185,129,0.05)] overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay rounded-[2.5rem] pointer-events-none" />
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />

            <div className="h-40 md:h-48 flex items-center justify-center relative z-10 mix-blend-screen">
              <HUDGraphic />
            </div>

            <div className="mt-8 relative z-10">
              <span className="text-emerald-400 text-[10px] font-black tracking-[0.3em] mb-3 block uppercase border border-emerald-500/20 rounded-full px-3 py-1 w-fit bg-emerald-500/5 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                {solutionsLabel}
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tighter mb-6">
                {solutionsTitle}
              </h2>

              <ul className="space-y-4">
                {solutions.map((item, i) => (
                  <li key={i} className="gsap-solution-item flex items-start gap-4 p-3 rounded-2xl bg-emerald-950/30 border border-emerald-500/10 hover:border-emerald-500/30 hover:bg-emerald-900/20 transition-all duration-300">
                    <div className="mt-1 w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                      <Check className="w-3 h-3 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-white text-base font-bold tracking-tight mb-1">
                        {item.title}
                      </h4>
                      {item.description && (
                        <p className="text-white/60 text-[13px] font-medium leading-relaxed max-w-xs">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
