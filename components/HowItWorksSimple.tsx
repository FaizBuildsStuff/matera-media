"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Search, Calendar, Camera, LucideIcon } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Step {
  _key?: string;
  title: string;
  description: string;
  icon?: string;
}

interface HowItWorksSimpleProps {
  data: {
    active?: boolean;
    badge?: string;
    title?: string;
    highlight?: string;
    subtitle?: string;
    steps?: Step[];
  };
}

const IconMap: Record<string, LucideIcon> = {
  search: Search,
  calendar: Calendar,
  camera: Camera,
};

const HUDIcon = ({ icon: IconName }: { icon?: string }) => {
  const hudRef = useRef(null);
  const Icon = IconName ? IconMap[IconName] : null;

  useGSAP(() => {
    gsap.to(".hud-ring", {
      rotation: 360,
      duration: 15,
      repeat: -1,
      ease: "none",
    });
    gsap.to(".hud-pulse", {
      scale: 1.15,
      opacity: 0.6,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, { scope: hudRef });

  return (
    <div ref={hudRef} className="relative w-full aspect-square max-w-[160px] mx-auto flex items-center justify-center mb-10">
      {/* Central Glow Orb */}
      <div className="relative z-20 w-16 h-16 bg-emerald-500/5 rounded-full border border-emerald-500/20 flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.15)] backdrop-blur-sm">
        <div className="hud-pulse absolute inset-0 rounded-full bg-emerald-500/10 blur-xl" />
        <div className="relative z-30 flex items-center justify-center">
          {Icon && <Icon className="w-8 h-8 text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]" strokeWidth={1.5} />}
        </div>
      </div>

      {/* Aesthetic Rings */}
      <div className="hud-ring absolute w-[120px] h-[120px] border border-dashed border-emerald-500/20 rounded-full" />
      <div className="absolute w-[100px] h-[100px] border border-emerald-500/5 rounded-full" />

      {/* Decorative Dots */}
      <div className="absolute top-2 right-2 w-1 h-1 bg-emerald-500/40 rounded-full animate-pulse" />
      <div className="absolute bottom-4 left-0 w-1 h-1 bg-emerald-500/20 rounded-full" />
    </div>
  );
};

export const HowItWorksSimple = ({ data }: HowItWorksSimpleProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // if (!data?.active) return null; // Seed script sets active: true for organic page

  const { badge, title, highlight, subtitle, steps } = data || {};

  useGSAP(() => {
    // 1. Staggered Card Reveal
    gsap.fromTo(".gsap-step-card",
      { opacity: 0, y: 40, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      }
    );

    // 2. Ambient Elements Parallax
    gsap.to(".gsap-how-ambient", {
      yPercent: -40,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

  }, { scope: containerRef });

  const renderTitle = () => {
    if (!title || !highlight) return title || "Getting started is simple.";
    const parts = title.split(highlight);
    return (
      <>
        {parts[0]}
        <span className="text-emerald-400 italic">
          {highlight}
        </span>
        {parts[1]}
      </>
    );
  };

  return (
    <section ref={containerRef} className="relative -mt-px py-32 px-6 bg-[#051A0E] overflow-hidden selection:bg-emerald-500/30">

      {/* Seamless Blending Masks */}
      <div className="absolute top-0 left-0 w-full h-48 bg-linear-to-b from-[#051A0E] via-[#051A0E] to-transparent pointer-events-none z-20" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-[#051A0E] via-[#051A0E]/80 to-transparent pointer-events-none z-20" />

      {/* GSAP Ambient Floating Parallax Graphics */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="gsap-how-ambient absolute top-[40%] right-[10%] w-[300px] h-[300px] bg-emerald-500/5 blur-[100px] rounded-full" />
        <div className="gsap-how-ambient absolute top-[60%] left-[5%] w-[250px] h-[250px] bg-emerald-500/5 blur-[80px] rounded-full" />
        <div className="gsap-how-ambient absolute top-[20%] left-[20%] text-emerald-500/10 text-2xl font-light">+</div>
        <div className="gsap-how-ambient absolute top-[70%] right-[15%] text-emerald-500/10 text-3xl font-light">+</div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 text-center">

        {/* Aesthetic Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 mb-10 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2.5 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          <span className="text-emerald-500 text-[10px] font-black tracking-[0.3em] uppercase">
            {badge || "How it works"}
          </span>
        </motion.div>

        {/* Heading */}
        <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.05] mb-8 max-w-4xl mx-auto">
          {renderTitle()}
        </h2>

        {/* Subtitle */}
        <p className="text-white/40 text-lg md:text-xl font-normal mb-24 max-w-2xl mx-auto italic">
          {subtitle || "You get on camera, we handle the rest"}
        </p>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {(steps || [
            { title: "Brand Audit", description: "We get to know you—your voice, your vision, and what kind of content will actually move the needle.", icon: "search" },
            { title: "Content Calendar", description: "We build a tailored content roadmap + fill your calendar with viral-ready ideas and scripts that sound like you.", icon: "calendar" },
            { title: "Full Production", description: "You record—we turn it into scroll-stopping videos, publish across all platforms, and fuel it with SEO.", icon: "camera" }
          ]).map((step, i) => {
            return (
              <div
                key={step._key || i}
                className="gsap-step-card relative p-10 md:p-12 rounded-[2.5rem] border border-white/5 bg-white/2 text-left group hover:border-emerald-500/20 transition-all duration-500 hover:bg-white/4 backdrop-blur-3xl overflow-hidden"
              >
                {/* Premium Texture Overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none rounded-[2.5rem]" />

                {/* Step Number Glowing Node */}
                <div className="absolute top-0 right-10 -translate-y-1/2 flex flex-col items-center">
                  <div className="h-20 w-px bg-linear-to-b from-transparent via-emerald-500/20 to-transparent" />
                  <div className="w-10 h-10 rounded-full bg-[#111] border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xs font-black z-20 shadow-[0_0_20px_rgba(16,185,129,0.2)] group-hover:scale-110 group-hover:border-emerald-500/60 transition-transform">
                    {i + 1}
                  </div>
                </div>

                {/* HUD Icon Illustration */}
                <HUDIcon icon={step.icon} />

                {/* Text Content */}
                <div className="relative z-10">
                  <h3 className="text-white text-2xl font-bold mb-4 tracking-tight group-hover:text-emerald-400 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-white/30 leading-relaxed font-normal text-sm md:text-base group-hover:text-white/40 transition-colors">
                    {step.description}
                  </p>
                </div>

                {/* Bottom Accent Decor */}
                <div className="absolute bottom-4 right-8 text-emerald-500/10 text-4xl font-light select-none">
                  0{i + 1}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
