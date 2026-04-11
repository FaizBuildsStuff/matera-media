"use client";


import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_CALENDLY_URL =
  "https://calendly.com/m-faizurrehman-crypto/30min?primary_color=10b981&background_color=05180D&text_color=ffffff&hide_landing_page_details=1&hide_gdpr_banner=1";

type CalendlyContent = {
  title?: string;
  subtitle?: string;
  calendlyUrl?: string;
};

export const CalendlyWidget = ({ content }: { content?: CalendlyContent }) => {
  const title = content?.title ?? "Architect Your Next Phase.";
  const subtitle = content?.subtitle ?? "Book a strategic discovery call to explore our performance systems.";
  const calendlyUrl = content?.calendlyUrl || DEFAULT_CALENDLY_URL;

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        widgetRef.current,
        { opacity: 0, scale: 0.98 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: widgetRef.current,
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="schedule"
      className="relative py-32 px-6 bg-[#05180D] overflow-hidden font-satoshi"
    >
      {/* --- THE GRID WITH FADED EDGES --- */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:60px_60px]"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)'
        }}
      />

      {/* --- SMOOTH SECTION BLENDING --- */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#05180D] to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#05180D] to-transparent z-10 pointer-events-none" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/[0.04] blur-[140px] rounded-full pointer-events-none" />

      <div className="relative z-20 max-w-7xl mx-auto">

        {/* --- LOGO --- */}
        <div className="flex justify-center mb-12">
          <Image
            src="/Logo.png"
            alt="Logo"
            width={100}
            height={100}
            className="opacity-70 grayscale brightness-200"
            priority
          />
        </div>

        {/* Header - Forced 1 Line on Desktop */}
        <div ref={headerRef} className="text-center mb-10 md:mb-14 px-4">
          {/* Increased max-w and refined font size */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tighter leading-[1.1] mb-5 max-w-5xl mx-auto">
            {title}
          </h2>
          <p className="text-white/50 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Calendly Widget with Loader */}
        <div ref={widgetRef} className="w-full relative min-h-[700px]">
          {/* Professional Minimalist Loader */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none">
            <div className="w-8 h-8 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-4" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-500/40 font-bold">Loading System</span>
          </div>

          <div
            className="calendly-inline-widget w-full relative z-10"
            data-url={calendlyUrl}
            style={{ minWidth: "320px", height: "950px" }}
          />
        </div>
      </div>
    </section>
  );
};