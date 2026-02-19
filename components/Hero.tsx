"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight, Play } from "lucide-react";

type HeroContent = {
  headline?: string;
  highlightedWords?: string[];
  subheadline?: string;
  ctaPrimary?: string;
  ctaPrimaryLink?: string;
  ctaSecondary?: string;
  ctaSecondaryLink?: string;
  videoLabel?: string;
  videoTitle?: string;
};

const DEFAULT_CONTENT: HeroContent = {
  headline: "Scale Revenue\nWith Impact.",
  highlightedWords: ["Revenue", "Impact"],
  subheadline:
    "We help B2B Brands and Creators grow with organic content and high-performance motion ad creatives.",
  ctaPrimary: "Book a Strategy Call",
  ctaPrimaryLink: "#schedule",
  ctaSecondary: "View Work",
  ctaSecondaryLink: "#work",
  videoLabel: "Showreel 2026",
  videoTitle: "Crafting Digital Excellence",
};

function renderHeadline(headline: string, highlightedWords: string[] = []) {
  const lines = headline.split("\n");
  return lines.map((line, lineIdx) => {
    const words = line.split(" ");
    return (
      <React.Fragment key={lineIdx}>
        {words.map((word, wordIdx) => {
          const cleanWord = word.replace(/[.,!?]/g, "");
          const isHighlighted = highlightedWords.some(
            (w) => w.toLowerCase() === cleanWord.toLowerCase()
          );
          return (
            <React.Fragment key={wordIdx}>
              {wordIdx > 0 ? " " : ""}
              {isHighlighted ? (
                <span className="font-instrument-serif italic text-emerald-400/90">
                  {word}
                </span>
              ) : (
                word
              )}
            </React.Fragment>
          );
        })}
        {lineIdx < lines.length - 1 ? <br /> : null}
      </React.Fragment>
    );
  });
}

export const Hero = ({ content }: { content?: HeroContent }) => {
    const c = { ...DEFAULT_CONTENT, ...content };
    const containerRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const subheadRef = useRef<HTMLParagraphElement>(null);
    const videoRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // Initial state set in CSS or via .set() to avoid FOUC
            tl.fromTo(headlineRef.current,
                { y: 100, opacity: 0, clipPath: "inset(0 0 100% 0)" },
                { y: 0, opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 1.5, ease: "power4.out" }
            )
                .fromTo(subheadRef.current,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1 },
                    "-=1"
                )
                .fromTo(ctaRef.current,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1 },
                    "-=0.8"
                )
                .fromTo(videoRef.current,
                    { y: 40, opacity: 0, scale: 0.95 },
                    { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
                    "-=0.6"
                );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6 bg-[#05180D] overflow-hidden"
        >
            {/* Ultra-subtle ambient background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/10 via-[#05180D] to-[#05180D] pointer-events-none" />

            <div className="max-w-7xl w-full mx-auto text-center z-10 flex flex-col items-center relative">

                {/* Headline */}
                <h1
                    ref={headlineRef}
                    className="text-6xl md:text-8xl lg:text-9xl font-instrument-sans font-medium tracking-tighter text-white leading-[0.9] mb-8 mix-blend-screen"
                >
                    {renderHeadline(c.headline || "", c.highlightedWords)}
                </h1>

                {/* Subheading */}
                <p
                    ref={subheadRef}
                    className="max-w-2xl text-lg md:text-xl text-white/60 font-light tracking-wide leading-relaxed mb-12"
                >
                    {c.subheadline}
                </p>

                {/* CTA Buttons */}
                <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
                    <Button
                        asChild
                        size="lg"
                        className="bg-white text-[#05180D] hover:bg-emerald-50 px-10 py-8 text-lg rounded-full font-medium transition-all duration-300 hover:scale-105"
                    >
                        <Link href={c.ctaPrimaryLink || "#schedule"}>
                            {c.ctaPrimary}
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </Button>
                    <Link href={c.ctaSecondaryLink || "#work"} className="text-white/70 hover:text-white flex items-center gap-3 px-6 py-4 rounded-full hover:bg-white/5 transition-all duration-300 group">
                        <span className="text-lg">{c.ctaSecondary}</span>
                    </Link>
                </div>

                {/* Video Placeholder - Glassmorphism */}
                <div
                    ref={videoRef}
                    className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl shadow-emerald-900/20 backdrop-blur-sm group cursor-pointer"
                >
                    <div className="absolute inset-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                        <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                            <Play className="w-8 h-8 text-white fill-white ml-1" />
                        </div>
                    </div>

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05180D]/80 via-transparent to-transparent pointer-events-none" />

                    <div className="absolute bottom-8 left-8 text-left">
                        <p className="text-emerald-400 text-xs uppercase tracking-widest font-medium mb-2">{c.videoLabel}</p>
                        <h3 className="text-white text-2xl font-instrument-serif italic">{c.videoTitle}</h3>
                    </div>
                </div>
            </div>
        </section>
    );
};
