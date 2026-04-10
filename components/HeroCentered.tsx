"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { GSAPButton } from "./GSAPButton";

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
    <section className="relative pt-24 md:pt-32 pb-24 px-6 overflow-hidden bg-[#051A0E] flex flex-col items-center text-center z-30 border-none">

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
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight leading-[1.2] md:leading-[1.1] mb-8 whitespace-pre-wrap">
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

        <div className="mt-8 flex justify-center z-30">
          <GSAPButton href="#schedule" text={ctaText || "Book a Free Audit"} />
        </div>
      </motion.div>

      {/* --- THE "UNDER SECTION" FIX --- */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-linear-to-t from-[#051A0E] via-[#051A0E] to-transparent pointer-events-none z-20" />
    </section>
  );
};
