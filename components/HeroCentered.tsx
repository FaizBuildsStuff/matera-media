"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";

export interface HeroProps {
  title?: string;
  highlight?: string;
  titleAfter?: string;
  subtitle?: string;
  sectionLabel?: string;
  ctaText?: string;
}

export const HeroCentered = ({
  title,
  highlight,
  titleAfter,
  subtitle,
  sectionLabel,
  ctaText,
}: HeroProps) => {
  return (
    <section className="relative w-full flex flex-col items-center justify-start pt-36 pb-28 px-6 bg-[#05180D] overflow-hidden font-satoshi">

      {/* ── Background Ripple ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <BackgroundRippleEffect rows={15} cols={35} cellSize={64} />

        {/* Bottom Fade Mask to prevent section bleed */}
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#05180D] to-transparent z-10" />
      </div>

      {/* ── Background (Legacy Atmospheric) ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-40">
        {/* Soft green gradient blooms */}
        <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[70%] bg-emerald-500/[0.08] blur-[140px] rounded-full" />
        <div className="absolute top-[5%] right-[-15%] w-[50%] h-[60%] bg-emerald-400/[0.06] blur-[140px] rounded-full" />

        {/* Subtle geometric shard lines */}
        <div className="absolute top-0 left-0 w-full h-[700px] opacity-[0.08]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <line x1="0%" y1="25%" x2="38%" y2="0%" stroke="#00E676" strokeWidth="1" />
            <line x1="72%" y1="0%" x2="100%" y2="35%" stroke="#00E676" strokeWidth="0.5" />
            <line x1="62%" y1="100%" x2="82%" y2="28%" stroke="#00E676" strokeWidth="1" />
            <line x1="18%" y1="100%" x2="48%" y2="55%" stroke="#00E676" strokeWidth="0.5" />
          </svg>
        </div>

        {/* Dot matrix — fades in from bottom */}
        <div
          className="absolute bottom-0 left-0 w-full h-[360px] bg-[image:radial-gradient(rgba(16,185,129,0.12)_1.5px,transparent_1.5px)] [background-size:26px_26px] opacity-60"
          style={{
            maskImage: "linear-gradient(to bottom, transparent 0%, black 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 100%)",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-20 w-full max-w-4xl mx-auto flex flex-col items-center text-center">

        {/* Main headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-[1.1] tracking-tight max-w-[820px] mb-8 uppercase">
          <span className="inline bg-gradient-to-b from-white via-white to-zinc-500 bg-clip-text text-transparent decoration-clone">
            {title}{" "}
            {highlight && (
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-emerald-300 to-emerald-700 pr-1">
                {highlight}
              </span>
            )}{" "}
            {titleAfter}
          </span>
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-white/50 text-base md:text-lg max-w-2xl text-center mb-8 leading-relaxed font-normal">
            {subtitle}
          </p>
        )}

        {/* CTA — matches Hero.tsx exactly */}
        <Link
          href="#schedule"
          className="group flex items-center bg-white rounded-full p-[3px] pr-7 shadow-[0_0_40px_rgba(0,230,118,0.08)] hover:shadow-[0_0_60px_rgba(0,230,118,0.18)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          <div className="w-9 h-9 rounded-full bg-[#00FF66] flex items-center justify-center mr-3.5 group-hover:bg-emerald-400 transition-colors">
            <ArrowRight className="w-4 h-4 text-white stroke-[2.5]" />
          </div>
          <span className="text-black text-[13px] font-bold tracking-wide">
            {ctaText || "Book a Strategy Call"}
          </span>
        </Link>

      </div>
    </section>
  );
};
