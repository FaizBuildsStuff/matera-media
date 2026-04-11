"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface HeroProps {
  title?: string;
  highlight?: string;
  titleAfter?: string;
  subtitle?: string;
  sectionLabel?: string;
  ctaText?: string;
}

export const HeroCentered = ({ title, highlight, titleAfter, ctaText }: HeroProps) => {
  return (
    <section className="relative w-full flex flex-col items-center justify-start pt-32 pb-24 px-6 bg-transparent overflow-hidden font-satoshi border-none">
      
      {/* --- COMPLEX BACKGROUND MATCHING THE IMAGE --- */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle geometric/shattered light beams mimicking the background */}
        <div className="absolute top-0 left-[-10%] w-[80%] h-[800px] bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent transform rotate-12 blur-3xl mix-blend-screen" />
        <div className="absolute top-[10%] right-[-20%] w-[60%] h-[800px] bg-gradient-to-bl from-emerald-400/5 via-emerald-900/10 to-transparent transform -rotate-[25deg] blur-3xl mix-blend-screen" />
        
        {/* Sharp abstract lines to mimic cracked glass / geometric shard effect */}
        <div className="absolute top-0 left-0 w-full h-[800px] opacity-[0.12]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <line x1="0%" y1="20%" x2="40%" y2="0%" stroke="#00E676" strokeWidth="1" />
            <line x1="70%" y1="0%" x2="100%" y2="40%" stroke="#00E676" strokeWidth="0.5" />
            <line x1="60%" y1="100%" x2="80%" y2="30%" stroke="#00E676" strokeWidth="1.5" />
            <line x1="20%" y1="100%" x2="50%" y2="50%" stroke="#00E676" strokeWidth="0.5" />
          </svg>
        </div>

        {/* Dense Dot Matrix Pattern at the bottom */}
        <div 
          className="absolute bottom-0 left-0 w-full h-[400px] bg-[image:radial-gradient(rgba(16,185,129,0.15)_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-70"
          style={{ maskImage: "linear-gradient(to bottom, transparent 0%, black 100%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 100%)" }}
        />
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="relative z-20 w-full max-w-5xl mx-auto flex flex-col items-center text-center">

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-[44px] font-bold leading-[1.3] tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 max-w-[850px] mb-8 pb-2">
          {title} {highlight} {titleAfter}
        </h1>

        {/* Specific Client Button Design: White pill, green inner circle */}
        <div className="flex justify-center mb-16">
          <Link 
            href="#schedule" 
            className="group flex items-center bg-white rounded-full p-[3px] pr-8 shadow-[0_0_40px_rgba(0,230,118,0.1)] hover:shadow-[0_0_60px_rgba(0,230,118,0.2)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            {/* Bright Green Circle with icon */}
            <div className="w-10 h-10 rounded-full bg-[#00FF66] flex items-center justify-center mr-4 group-hover:bg-[#00E65C] transition-colors">
              <ArrowRight className="w-[18px] h-[18px] text-white stroke-[2.5]" />
            </div>
            {/* Stark black text */}
            <span className="text-black text-[13px] font-bold tracking-wide">
              {ctaText || "Learn More"}
            </span>
          </Link>
        </div>

      </div>

    </section>
  );
};
