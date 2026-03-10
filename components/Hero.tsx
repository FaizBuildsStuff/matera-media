"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight, Play, Star } from "lucide-react";

const getYoutubeId = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const formatVideoUrl = (url: string) => {
  const id = getYoutubeId(url);
  return id ? `https://www.youtube.com/embed/${id}?autoplay=1&modestbranding=1&rel=0` : url;
};

type HeroContent = {
  headline?: string;
  highlightedWords?: string[];
  ctaPrimary?: string;
  ctaPrimaryLink?: string;
  videoUrl?: string;
};

export const Hero = ({ content }: { content?: HeroContent }) => {
  const headline = content?.headline || "Growth Systems that turn Attention into Revenue.";
  const hWords = content?.highlightedWords || ["Growth Systems", "Revenue"];
  const ctaPrimary = content?.ctaPrimary || "Book a Strategy Call";
  const ctaLink = content?.ctaPrimaryLink || "#";

  const videoId = getYoutubeId(content?.videoUrl || "");
  const videoUrl = formatVideoUrl(content?.videoUrl || "");
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : "";

  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.fromTo(lightRef.current, { opacity: 0, scale: 0.8 }, { opacity: 0.4, scale: 1, duration: 2.5 })
        // Staggered fade-up for all headline parts including highlights
        .fromTo(wordsRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.04 }, "-=2")
        .fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=1")
        .fromTo(videoWrapperRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5 }, "-=1.2");

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPct = (clientX / window.innerWidth - 0.5);
        const yPct = (clientY / window.innerHeight - 0.5);
        gsap.to(lightRef.current, { x: xPct * 100, y: yPct * 50, duration: 2 });
        if (!isVideoPlaying) {
          gsap.to(videoWrapperRef.current, { rotateY: xPct * 4, rotateX: yPct * -4, duration: 1.5 });
        }
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);
    return () => ctx.revert();
  }, [headline, isVideoPlaying]);

  const renderHeadline = () => {
    const sortedHighlights = [...hWords].sort((a, b) => b.length - a.length);
    const escapedHighlights = sortedHighlights.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
    const regex = new RegExp(`(${escapedHighlights})`, "gi");
    const parts = headline.split(regex);

    // Resetting refs array to ensure correct mapping on re-renders
    wordsRef.current = [];

    return parts.map((part: string, i: number) => {
      const isMatch = sortedHighlights.some((h) => h.toLowerCase() === part.toLowerCase());
      
      if (isMatch) {
        return (
          <span 
            key={i} 
            ref={(el) => { if (el) wordsRef.current.push(el); }} 
            className="relative inline-block text-emerald-400 font-medium italic px-1" 
            style={{ fontFamily: "'Satoshi', sans-serif" }}
          >
            {part}
          </span>
        );
      }
      
      return part.split(" ").map((word: string, wordIdx: number) => {
        if (word === "") return null;
        return (
          <span 
            key={`${i}-${wordIdx}`} 
            ref={(el) => { if (el) wordsRef.current.push(el); }} 
            className="inline-block mx-[0.1em] whitespace-nowrap"
          >
            {word}
          </span>
        );
      });
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-start pt-32 md:pt-40 pb-40 px-6 bg-[#020a05] overflow-hidden"
      style={{
        fontFamily: "'Satoshi', sans-serif",
        maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
      }}
    >
      <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,401&display=swap" rel="stylesheet" />

      {/* Atmospheric Lighting */}
      <div ref={lightRef} className="absolute top-[-10%] left-[-5%] w-[110vw] h-[80vh] pointer-events-none z-0 opacity-30 blur-[100px]"
        style={{ background: "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.2) 0%, transparent 70%)" }} />

      <div className="relative z-20 w-full max-w-5xl mx-auto flex flex-col items-center">

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium text-white leading-[1.15] text-center mb-10 max-w-4xl tracking-tight">
          {renderHeadline()}
        </h1>

        <div ref={ctaRef} className="flex flex-col items-center gap-6 mb-20">
          <Button asChild className="h-12 px-8 rounded-full bg-white text-black hover:bg-emerald-400 hover:text-black transition-all duration-300 font-bold text-sm shadow-xl">
            <Link href={ctaLink} className="flex items-center gap-2">
              <span>{ctaPrimary}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>

          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => <div key={i} className="w-7 h-7 rounded-full border border-[#020a05] bg-neutral-800" />)}
            </div>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-1.5">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-2.5 h-2.5 fill-emerald-500 text-emerald-500" />)}
              </div>
              <span className="text-[10px] text-white/40 uppercase tracking-wider font-bold">50+ Happy Clients</span>
            </div>
          </div>
        </div>

        {videoUrl && (
          <div ref={videoWrapperRef} className={`relative w-full max-w-4xl aspect-video group transition-all duration-700 ease-out shadow-2xl z-30 ${isVideoPlaying ? "scale-105" : "rounded-xl overflow-hidden border border-white/5"}`}>
            <div className="relative w-full h-full bg-neutral-950">
              {!isVideoPlaying ? (
                <div className="absolute inset-0 flex items-center justify-center cursor-pointer z-30" onClick={() => setIsVideoPlaying(true)}>
                  {thumbnailUrl && <img src={thumbnailUrl} alt="Work Preview" className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-70 group-hover:scale-105" />}
                  <div className="relative z-40">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:border-emerald-500">
                      <Play className="w-6 h-6 md:w-8 md:h-8 text-white fill-current" />
                    </div>
                  </div>
                </div>
              ) : (
                <iframe className="absolute inset-0 w-full h-full" src={videoUrl} allow="autoplay; fullscreen" allowFullScreen />
              )}
            </div>
          </div>
        )}
      </div>

      <div className="absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none" />
    </section>
  );
};