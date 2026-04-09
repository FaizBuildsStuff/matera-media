"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface HeroProps {
  title?: string;
  highlight?: string;
  titleAfter?: string;
  subtitle?: string;
  sectionLabel?: string;
  ctaText?: string;
}

export const HeroCentered = ({ title, highlight, titleAfter, subtitle, ctaText }: HeroProps) => {
  return (
    <section className="relative pt-32 pb-24 px-6 overflow-hidden bg-[#051A0E] flex flex-col items-center text-center z-30 border-none">

      {/* --- REFINED SPOTLIGHTS (Full Coverage to prevent lines) --- */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.02)_0%,transparent_50%)] pointer-events-none z-0 blur-[120px]" 
      />
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.02)_0%,transparent_50%)] pointer-events-none z-0 blur-[120px]" 
      />

      {/* Subtle Central Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.03),transparent_80%)] pointer-events-none z-0" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-40 max-w-4xl mt-12 md:mt-20"
      >
        <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-[1.05] mb-8 whitespace-pre-wrap">
          {title}{" "}
          <span
            className="text-emerald-400 px-2 inline-block whitespace-pre-wrap italic font-semibold"
            style={{
              textShadow: "0 0 20px rgba(52, 211, 153, 0.25)"
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
          <Button className="h-12 px-8 rounded-full bg-white text-black text-[10px] font-bold tracking-widest hover:scale-105 active:scale-95 hover:bg-white hover:text-black active:bg-white active:text-black transition-all group shadow-[0_0_40px_rgba(255,255,255,0.1)] whitespace-pre-wrap">
            {ctaText || "Book a Free Audit"}
            <div className="ml-3 w-6 h-6 rounded-full bg-black flex items-center justify-center">
              <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Button>
        </Link>
      </motion.div>

      {/* --- THE "UNDER SECTION" FIX --- */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-linear-to-t from-[#051A0E] via-[#051A0E] to-transparent pointer-events-none z-20" />
    </section>
  );
};
