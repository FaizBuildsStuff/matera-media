"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight, Play, Star, Plus, MousePointer2 } from "lucide-react";
import { EncryptedText } from "@/components/ui/encrypted-text";

// 1. HELPER: Extract YouTube ID & Format Embed URL
const getYoutubeId = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
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
  videoLabel?: string;
  videoTitle?: string;
  videoUrl?: string;
};

export const Hero = ({ content }: { content?: HeroContent }) => {
  const headline = content?.headline || "Growth Systems that turn Attention into Revenue.";
  const hWords = content?.highlightedWords || ["Growth Systems", "Revenue"];
  
  const ctaPrimary = content?.ctaPrimary || "Start Your Project";
  const ctaLink = content?.ctaPrimaryLink || "#";
  const videoLabel = content?.videoLabel || "Redefining Attention 2026";
  const videoTitle = content?.videoTitle || "Tilt to explore";
  
  const videoId = getYoutubeId(content?.videoUrl || "");
  const videoUrl = formatVideoUrl(content?.videoUrl || "");
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : "";

  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const highlightBoxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lightRef = useRef<HTMLDivElement>(null);

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(lightRef.current, { opacity: 0, scaleY: 0 }, { opacity: 1, scaleY: 1, duration: 2 })
        .fromTo(".hero-badge", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8 }, "-=1.5")
        .fromTo(wordsRef.current,
          { y: 60, opacity: 0, rotateX: -45, transformOrigin: "top" },
          { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.05 }, "-=1")
        .fromTo(highlightBoxRefs.current.filter(Boolean),
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1, stagger: 0.1, ease: "back.out(1.7)" }, "-=0.8")
        .fromTo(".stripe", { opacity: 0 }, { opacity: 1, duration: 1, stagger: 0.1 }, "-=1")
        .fromTo(".doodle", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.1, ease: "back.out(1.7)" }, "-=0.8")
        .fromTo(ctaRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=1")
        .fromTo(videoWrapperRef.current,
          { y: 100, opacity: 0, scale: 0.9, rotateX: 15 },
          { y: 0, opacity: 1, scale: 1, rotateX: 0, duration: 1.8 }, "-=1.4");

      const handleMouseMove = (e: MouseEvent) => {
        const xPct = (e.clientX / window.innerWidth - 0.5);
        const yPct = (e.clientY / window.innerHeight - 0.5);
        gsap.to(lightRef.current, { x: xPct * 120, rotate: xPct * 6, duration: 2, ease: "power2.out" });
        gsap.to(".stripe", { x: xPct * 30, y: yPct * 20, duration: 1.5, ease: "power2.out", stagger: 0.02 });
        if (!isVideoPlaying) {
          gsap.to(videoWrapperRef.current, { rotateY: xPct * 10, rotateX: yPct * -10, duration: 1.5, ease: "power3.out" });
        }
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);
    return () => ctx.revert();
  }, [isVideoPlaying, headline]);

  useEffect(() => {
    if (isVideoPlaying && videoWrapperRef.current) {
      gsap.to(videoWrapperRef.current, { borderRadius: "0rem", duration: 0.8, ease: "expo.out" });
    }
  }, [isVideoPlaying]);

  // --- NEW LOGIC: Multi-word highlight support ---
  const renderHeadline = () => {
    // Sort by length (desc) to prevent short words from matching inside long phrases
    const sortedHighlights = [...hWords].sort((a, b) => b.length - a.length);
    const escapedHighlights = sortedHighlights.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
    const regex = new RegExp(`(${escapedHighlights})`, 'gi');
    
    const parts = headline.split(regex);
    let highlightCounter = 0;

    return parts.map((part, i) => {
      const isMatch = sortedHighlights.some(h => h.toLowerCase() === part.toLowerCase());
      
      if (isMatch) {
        const currentIdx = highlightCounter++;
        return (
          <span key={i} ref={(el) => { if (el) wordsRef.current[i] = el; }} className="inline-block relative mx-[0.15em] will-change-transform">
             <span className="relative inline-block px-5 py-1.5">
                <div 
                  ref={(el) => { highlightBoxRefs.current[currentIdx] = el; }}
                  className="absolute inset-0 z-[-1] rounded-full bg-white/10 border border-white/30 backdrop-blur-md shadow-[0_0_25px_rgba(255,255,255,0.08)]"
                />
                <EncryptedText text={part} className="font-instrument-serif italic text-white" />
             </span>
          </span>
        );
      }
      
      // For non-highlighted text, split by space so each word can animate individually
      return part.split(" ").map((word, wordIdx) => (
        word && (
          <span 
            key={`${i}-${wordIdx}`} 
            ref={(el) => { if (el) wordsRef.current[i + wordIdx + 100] = el; }} 
            className="inline-block mx-[0.15em] text-white/80 will-change-transform"
          >
            {word}
          </span>
        )
      ));
    });
  };

  return (
    <section ref={containerRef} className="relative min-h-screen w-full flex flex-col items-center justify-start pt-24 md:pt-40 pb-20 px-4 md:px-6 bg-[#05180D] overflow-hidden perspective-2000">
      
      <div 
        ref={lightRef}
        className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[700px] pointer-events-none z-10 origin-top"
        style={{
          background: "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.15) 0%, transparent 70%)",
          maskImage: "linear-gradient(to bottom, black, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
        }}
      />

      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <div className="stripe absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        <div className="stripe absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
        <div className="stripe absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        <Star className="doodle absolute top-[15%] right-[12%] w-6 h-6 text-white opacity-20" />
        <Plus className="doodle absolute bottom-[35%] left-[10%] w-5 h-5 text-white opacity-20" />
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col items-center">
        
        <div className="hero-badge flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl mb-12">
          <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span className="text-white text-[10px] uppercase tracking-[0.3em] font-bold">{videoLabel}</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-instrument-sans font-medium tracking-tight text-white leading-[1.2] text-center mb-14 max-w-4xl">
          {renderHeadline()}
        </h1>

        <div ref={ctaRef} className="flex flex-col items-center gap-6 mb-24 md:mb-32">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-white/0 via-white/40 to-white/0 rounded-none blur-md group-hover:via-white/70 animate-tilt pointer-events-none opacity-50" />
            
            <Button asChild className="relative h-16 px-12 rounded-none bg-white text-black hover:bg-white transition-all duration-500 font-bold text-lg overflow-hidden flex items-center gap-3 group-hover:shadow-[0_0_50px_rgba(255,255,255,0.3)]">
              <Link href={ctaLink}>
                <span className="relative z-10">{ctaPrimary}</span>
                <div className="relative z-10 w-8 h-8 rounded-full bg-black flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/40 opacity-40 group-hover:animate-shine" />
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-2 text-white/40 text-[10px] tracking-[0.2em] uppercase font-bold">
            <MousePointer2 className="w-3 h-3" />
            <span>{videoTitle}</span>
          </div>
        </div>

        {videoUrl && (
          <div
            ref={videoWrapperRef}
            className={`relative w-full max-w-[1000px] aspect-video overflow-hidden bg-black border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] group/video transform-gpu transition-all duration-700 ${isVideoPlaying ? 'rounded-none border-white/0' : 'rounded-[2rem] md:rounded-[3rem]'}`}
          >
            {!isVideoPlaying ? (
              <div className="absolute inset-0 flex items-center justify-center cursor-pointer z-30 overflow-hidden" onClick={() => setIsVideoPlaying(true)}>
                {thumbnailUrl && (
                  <img 
                    src={thumbnailUrl} 
                    alt="Work Preview" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover/video:scale-105 opacity-50 grayscale hover:grayscale-0"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#05180D] via-transparent to-[#05180D]/40 opacity-90" />
                <div className="relative">
                  <div className="absolute inset-0 bg-white/10 blur-3xl rounded-full scale-150 transition-all duration-700" />
                  <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full bg-white/5 backdrop-blur-3xl border border-white/20 flex items-center justify-center group-hover/video:scale-110 transition-all duration-700">
                    <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white ml-1.5" />
                  </div>
                </div>
              </div>
            ) : (
              <iframe 
                className="absolute inset-0 w-full h-full" 
                src={videoUrl} 
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen 
              />
            )}
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes tilt { 0%, 50%, 100% { transform: rotate(0deg); } 25% { transform: rotate(0.5deg); } 75% { transform: rotate(-0.5deg); } }
        @keyframes shine { 100% { left: 125%; } }
        .animate-tilt { animation: tilt 10s infinite linear; }
        .animate-shine { animation: shine 0.75s infinite; }
      `}</style>

      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#05180D] via-[#05180D]/80 to-transparent z-20 pointer-events-none" />
    </section>
  );
};