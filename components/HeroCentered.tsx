"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EditableText } from "./visual-editing/EditableText";
import { EditableButton } from "./visual-editing/EditableButton";

export interface HeroProps {
  title?: string;
  highlight?: string;
  titleAfter?: string;
  subtitle?: string;
  sectionLabel?: string;
  ctaText?: string;
  ctaLink?: string;
  _documentId?: string;
  _sectionKey?: string;
}

export const HeroCentered = ({
  title,
  highlight,
  titleAfter,
  subtitle,
  sectionLabel,
  ctaText,
  ctaLink = "#schedule",
  _documentId,
  _sectionKey,
}: HeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(".hc-reveal", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.12 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full flex flex-col items-center justify-start pt-20 sm:pt-28 md:pt-36 pb-12 sm:pb-16 md:pb-28 px-4 sm:px-6  font-satoshi"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft green gradient blooms */}
        <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[70%] bg-blue-600/[0.15] blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-[15%] left-[20%] w-[50%] h-[60%] bg-purple-500/[0.12] blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-[5%] right-[-15%] w-[50%] h-[60%] bg-emerald-500/[0.12] blur-[120px] rounded-full pointer-events-none" />

        {/* Subtle geometric shard lines */}
        <div className="absolute top-0 left-0 w-full h-[700px] opacity-[0.08]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <line x1="0%" y1="25%" x2="38%" y2="0%" stroke="#ffffff" strokeWidth="1" />
            <line x1="72%" y1="0%" x2="100%" y2="35%" stroke="#ffffff" strokeWidth="0.5" />
            <line x1="62%" y1="100%" x2="82%" y2="28%" stroke="#ffffff" strokeWidth="1" />
            <line x1="18%" y1="100%" x2="48%" y2="55%" stroke="#ffffff" strokeWidth="0.5" />
          </svg>
        </div>

        {/* Dot matrix — fades in from bottom */}
        <div
          className="absolute bottom-0 left-0 w-full h-[300px] sm:h-[360px] bg-[image:radial-gradient(rgba(255,255,255,0.12)_1.5px,transparent_1.5px)] [background-size:26px_26px] opacity-60"
          style={{
            maskImage: "linear-gradient(to bottom, transparent 0%, black 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 100%)",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-20 w-full max-w-[56rem] mx-auto flex flex-col items-center text-center mt-4 sm:mt-6 md:mt-8">

        {/* Section Label */}
        {sectionLabel && (
          <div className="hc-reveal text-white font-bold text-[10px] sm:text-xs md:text-sm tracking-widest uppercase mb-5 sm:mb-7 md:mb-8 px-2">
            {_documentId ? (
              <EditableText id={_documentId} field="sectionLabel" sectionKey={_sectionKey} value={sectionLabel} as="span" />
            ) : sectionLabel}
          </div>
        )}

        {/* Main Headline */}
        <h1 className="hc-reveal text-[1.75rem] sm:text-4xl md:text-[3.5rem] font-bold leading-[1.15] sm:leading-[1.12] tracking-tight text-white mb-4 sm:mb-6 md:mb-8 w-full max-w-[48rem] px-1 flex flex-wrap justify-center">
          {_documentId ? (
            <>
              <EditableText id={_documentId} field="headlineTitle" sectionKey={_sectionKey} value={title || ""} as="span" className="mr-3" />
              <EditableText id={_documentId} field="headlineHighlight" sectionKey={_sectionKey} value={highlight || ""} as="span" className="mr-3 text-white/80 italic" />
              <EditableText id={_documentId} field="headlineTitleAfter" sectionKey={_sectionKey} value={titleAfter || ""} as="span" />
            </>
          ) : (
            <>{title} <span className="text-white/80 italic px-1">{highlight}</span> {titleAfter}</>
          )}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <div className="hc-reveal text-white/50 text-sm sm:text-base md:text-lg max-w-2xl text-center mb-6 sm:mb-8 leading-relaxed font-normal px-2">
            {_documentId ? (
              <EditableText id={_documentId} field="headlineSubtitle" sectionKey={_sectionKey} value={subtitle} />
            ) : subtitle}
          </div>
        )}

        {/* CTA — matches Hero.tsx exactly */}
        <div className="hc-reveal">
          {_documentId ? (
            <EditableButton
              id={_documentId}
              textField="heroCta"
              linkField="heroCtaLink"
              sectionKey={_sectionKey}
              text={ctaText || "Book a Strategy Call"}
              link={ctaLink}
            >
              <div className="flex items-center bg-white rounded-full p-1 sm:p-1.5 pr-5 sm:pr-8 cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.15)] group">
                <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-[3.25rem] md:h-[3.25rem] bg-[#00e65c] rounded-full flex items-center justify-center mr-3 sm:mr-5 group-hover:bg-white text-black transition-colors shadow-[0_0_15px_rgba(0,230,92,0.4)]">
                  <ArrowRight className="w-4 h-4 sm:w-[1.125rem] sm:h-[1.125rem] text-[#030b06] stroke-[2.5]" />
                </div>
                <span className="text-[#030b06] font-bold text-[0.85rem] sm:text-[0.95rem] md:text-base tracking-wide mr-1 sm:mr-2">
                  {ctaText || "Book a Strategy Call"}
                </span>
              </div>
            </EditableButton>
          ) : (
            <Link href={ctaLink}>
              <div className="flex items-center bg-white rounded-full p-1 sm:p-1.5 pr-5 sm:pr-8 cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.15)] group">
                <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-[3.25rem] md:h-[3.25rem] bg-[#00e65c] rounded-full flex items-center justify-center mr-3 sm:mr-5 group-hover:bg-white text-black transition-colors shadow-[0_0_15px_rgba(0,230,92,0.4)]">
                  <ArrowRight className="w-4 h-4 sm:w-[1.125rem] sm:h-[1.125rem] text-[#030b06] stroke-[2.5]" />
                </div>
                <span className="text-[#030b06] font-bold text-[0.85rem] sm:text-[0.95rem] md:text-base tracking-wide mr-1 sm:mr-2">
                  {ctaText || "Book a Strategy Call"}
                </span>
              </div>
            </Link>
          )}
        </div>

      </div>
    </section>
  );
};
