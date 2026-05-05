"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

interface GSAPButtonProps {
  href: string;
  text: string;
}

export const GSAPButton = ({ href, text }: GSAPButtonProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const textPrimaryRef = useRef<HTMLSpanElement>(null);
  const textHoverRef = useRef<HTMLSpanElement>(null);
  const iconPrimaryRef = useRef<HTMLDivElement>(null);
  const iconHoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !fillRef.current || !textPrimaryRef.current || !textHoverRef.current || !iconPrimaryRef.current || !iconHoverRef.current) return;

    const ctx = gsap.context(() => {
      // Build a smooth timeline for the hover effect
      const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.out", duration: 0.6 } });

      tl.to(fillRef.current, { y: "-100%" }, 0)
        // Roll primary text up and fade
        .to(textPrimaryRef.current, { y: -20, opacity: 0, scale: 0.95 }, 0)
        // Roll hover text in from bottom
        .fromTo(textHoverRef.current, { y: 20, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1 }, 0.05)
        // Shoot primary icon up-right
        .to(iconPrimaryRef.current, { x: 20, y: -20, opacity: 0, rotate: 45 }, 0)
        // Shoot hover icon in from bottom-left
        .fromTo(iconHoverRef.current, { x: -20, y: 20, opacity: 0, rotate: -45 }, { x: 0, y: 0, opacity: 1, rotate: -45 }, 0.1);

      const handleMouseEnter = () => tl.play();
      const handleMouseLeave = () => tl.reverse();

      containerRef.current?.addEventListener("mouseenter", handleMouseEnter);
      containerRef.current?.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        containerRef.current?.removeEventListener("mouseenter", handleMouseEnter);
        containerRef.current?.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Link href={href} className="inline-block relative focus:outline-none">
      {/* Outer ambient soft glow */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-white/30 via-white/50 to-white/30 rounded-full blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none" />

      {/* Main Button Container */}
      <div
        ref={containerRef}
        className="relative px-8 md:px-12 h-14 md:h-16 rounded-full border border-white/10  overflow-hidden cursor-pointer shadow-[0_0_30px_rgba(255,255,255,0.15)] flex items-center justify-center group"
      >
        {/* GSAP Fill Layer (slips up on hover) */}
        <div
          ref={fillRef}
          className="absolute top-full left-0 w-full h-[150%] bg-[#10B981] rounded-[50%]"
          style={{ transformOrigin: "top center", borderRadius: "50% 50% 0 0" }}
        />

        {/* Inner Content Container */}
        <div className="relative z-10 flex items-center gap-4">
          
          <div className="relative flex items-center h-5 w-auto overflow-hidden">
             {/* Primary Text */}
            <span ref={textPrimaryRef} className="absolute inset-0 flex items-center gap-2 font-bold text-[10px] md:text-xs uppercase tracking-[0.25em] text-white whitespace-nowrap">
              <Sparkles className="w-3.5 h-3.5 text-white/80" />
              {text}
            </span>
            {/* Hover Text */}
            <span ref={textHoverRef} className="opacity-0 flex items-center gap-2 font-bold text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#051A0E] whitespace-nowrap">
              <Sparkles className="w-3.5 h-3.5 text-[#051A0E]" />
              {text}
            </span>
          </div>

          <div className="relative w-8 h-8 flex items-center justify-center">
             {/* Primary Icon Box */}
            <div ref={iconPrimaryRef} className="absolute inset-0 flex items-center justify-center rounded-full bg-white text-[#051A0E]">
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </div>
             {/* Hover Icon Box */}
            <div ref={iconHoverRef} className="absolute inset-0 flex items-center justify-center rounded-full  text-white/80 opacity-0">
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </div>
          </div>

        </div>
      </div>
    </Link>
  );
};
