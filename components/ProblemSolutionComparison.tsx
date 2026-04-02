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

const RetroTV = () => {
  const screenRef = useRef(null);

  useGSAP(() => {
    // Glitch effect for the screen
    const tl = gsap.timeline({ repeat: -1 });
    tl.to(".tv-glitch", {
      opacity: 0.8,
      x: "random(-5, 5)",
      duration: 0.1,
      ease: "steps(2)",
    })
    .to(".tv-glitch", {
      opacity: 0,
      x: 0,
      duration: 0.2,
    }, "+=1")
    .to(".tv-flicker", {
      opacity: "random(0.3, 0.6)",
      duration: 0.05,
      repeat: 3,
      yoyo: true,
    });
  }, { scope: screenRef });

  return (
    <div ref={screenRef} className="relative w-full aspect-[4/3] max-w-sm mx-auto mb-8 group">
      {/* TV Bezel */}
      <div className="absolute inset-0 bg-[#1a1a1a] rounded-[3rem] border-[12px] border-[#2a2a2a] shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_2px_10px_rgba(255,255,255,0.1)] overflow-hidden">
        {/* The Screen */}
        <div className="absolute inset-4 bg-[#0a0a0a] rounded-[2rem] overflow-hidden border-4 border-[#121212] shadow-inner">
          {/* Static/Grain Effect */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
          
          {/* Content (Simulated Person/Glitch) */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <div className="w-full h-full bg-linear-to-b from-red-950/20 to-black/40 flex items-center justify-center">
              <div className="relative">
                <Users className="w-24 h-24 text-white/5 opacity-20" />
                <div className="tv-glitch absolute inset-0 text-red-500/40 blur-[2px] opacity-0 select-none pointer-events-none">
                  <Users className="w-24 h-24" />
                </div>
              </div>
            </div>
          </div>

          {/* Scanlines Overlay */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]" />
          
          {/* Vignette */}
          <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.8)] z-20 pointer-events-none" />
          
          {/* Flicker */}
          <div className="tv-flicker absolute inset-0 bg-white/5 opacity-0 z-30 pointer-events-none" />
        </div>

        {/* TV Dial/Buttons Area (Right side) */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4">
          <div className="w-8 h-8 rounded-full bg-[#121212] border-2 border-[#222] shadow-lg flex items-center justify-center">
            <div className="w-1 h-3 bg-red-500/20 rounded-full" />
          </div>
          <div className="w-8 h-8 rounded-full bg-[#121212] border-2 border-[#222] shadow-lg" />
          <div className="flex flex-col gap-1 mt-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-6 h-1 bg-[#121212] rounded-full opacity-50" />
            ))}
          </div>
        </div>
      </div>

      {/* Tags Floating Left */}
      <div className="absolute -left-4 top-1/4 flex flex-col gap-3 z-40">
        {["Sales", "Audience", "Money"].map((label, i) => (
          <motion.div
            key={i}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="flex items-center gap-2 px-4 py-2 bg-black/80 backdrop-blur-md rounded-full border border-white/5 text-[10px] font-bold tracking-widest text-white/60"
          >
            <X className="w-3 h-3 text-red-500" />
            {label.toUpperCase()}
          </motion.div>
        ))}
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
    <div ref={hudRef} className="relative w-full aspect-square max-w-[260px] mx-auto flex items-center justify-center">
      {/* Central Money Orb */}
      <div className="relative z-20 w-24 h-24 bg-emerald-500/10 rounded-full border border-emerald-500/30 flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.2)]">
        <div className="hud-pulse absolute inset-0 rounded-full bg-emerald-500/20 blur-xl" />
        <div className="relative z-30">
          <div className="text-emerald-400 font-black text-3xl italic tracking-tighter">MD</div>
        </div>
      </div>

      {/* Rotating Rings */}
      <div className="hud-ring absolute w-[180px] h-[180px] border border-dashed border-emerald-500/20 rounded-full" />
      <div className="hud-ring-inner absolute w-[140px] h-[140px] border-2 border-emerald-500/10 border-t-emerald-500/40 rounded-full" />

      {/* Icons Orbiting or Stacked */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
         <div className="absolute top-6 left-6 p-2 bg-black/40 backdrop-blur-md rounded-2xl border border-emerald-500/20 text-emerald-400">
            <Video className="w-5 h-5" />
         </div>
         <div className="absolute bottom-6 right-6 p-1.5 bg-emerald-500 rounded-full text-black shadow-[0_0_20px_rgba(16,185,129,0.5)]">
            <Check className="w-4 h-4 stroke-[3]" />
         </div>
         <div className="absolute top-1/2 -right-2 -translate-y-1/2 p-2 bg-black/40 backdrop-blur-md rounded-2xl border border-emerald-500/20 text-emerald-400">
            <Clapperboard className="w-5 h-5" />
         </div>
         <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-6 h-6 rounded-full border border-emerald-500/30 bg-emerald-950/50 overflow-hidden">
                <div className="w-full h-full bg-emerald-500/10 flex items-center justify-center">
                  <Users className="w-3 h-3 text-emerald-500/40" />
                </div>
              </div>
            ))}
         </div>
      </div>

      {/* Tags Floating Right */}
       <div className="absolute -right-8 top-1/3 flex flex-col gap-3 z-40">
        {["Sales", "Audience", "Money"].map((label, i) => (
          <motion.div
            key={i}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1 + i * 0.1 }}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-black rounded-full shadow-[0_5px_15px_rgba(16,185,129,0.3)] text-[10px] font-black tracking-widest"
          >
            <Check className="w-3 h-3" />
            {label.toUpperCase()}
          </motion.div>
        ))}
      </div>

      {/* Platform Icons Bottom Left */}
      <div className="absolute bottom-0 left-0 flex gap-3">
        <Instagram className="w-5 h-5 text-emerald-500/40" />
        <Twitter className="w-5 h-5 text-emerald-500/40" />
        <Youtube className="w-5 h-5 text-emerald-500/40" />
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
  return (
    <section className="relative py-20 px-6 bg-[#051A0E] overflow-hidden">
      {/* Background Grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-30" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          
          {/* --- PROBLEM CARD (LEFT) --- */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group relative flex flex-col p-8 md:p-10 rounded-[2.5rem] bg-linear-to-b from-white/[0.03] to-transparent border border-white/5 hover:border-red-500/20 transition-all duration-700"
          >
            <div className="absolute top-0 left-1/4 right-1/4 h-px bg-linear-to-r from-transparent via-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="h-72 flex items-center justify-center">
              <RetroTV />
            </div>

            <div className="mt-8">
              <span className="text-red-500 text-[10px] font-black tracking-[0.4em] mb-4 block uppercase opacity-60">
                {problemsLabel}
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-8 italic uppercase">
                {problemsTitle}
              </h2>

              <ul className="space-y-4">
                {problems.map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="mt-1.5 w-4 h-4 rounded-full border border-red-500/30 flex items-center justify-center shrink-0">
                      <div className="w-1 h-1 rounded-full bg-red-500" />
                    </div>
                    <div>
                      <h4 className="text-white/60 text-base font-bold tracking-tight leading-tight mb-1">
                        {item.title}
                      </h4>
                      {item.description && (
                        <p className="text-white/30 text-sm font-normal leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* --- SOLUTION CARD (RIGHT) --- */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group relative flex flex-col p-8 md:p-10 rounded-[2.5rem] bg-linear-to-b from-white/[0.08] to-emerald-950/20 border border-white/10 hover:border-emerald-500/40 shadow-[0_20px_80px_rgba(0,0,0,0.3)] transition-all duration-700 overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="absolute top-0 left-1/4 right-1/4 h-px bg-linear-to-r from-transparent via-emerald-500/40 to-transparent" />

            <div className="h-72 flex items-center justify-center">
              <HUDGraphic />
            </div>

            <div className="mt-8">
              <span className="text-emerald-400 text-[10px] font-black tracking-[0.4em] mb-4 block uppercase">
                {solutionsLabel}
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-8 uppercase">
                {solutionsTitle}
              </h2>

              <ul className="space-y-4">
                {solutions.map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-emerald-500/20 hover:bg-white/[0.05] transition-all"
                  >
                    <div className="mt-1 w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-white text-base font-bold tracking-tight mb-1">
                        {item.title}
                      </h4>
                      {item.description && (
                        <p className="text-white/50 text-sm font-normal leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
