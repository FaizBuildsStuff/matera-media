"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight, Play, MousePointer2 } from "lucide-react";
import { EncryptedText } from "@/components/ui/encrypted-text";

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
  const ctaPrimary = content?.ctaPrimary || "Book a Strategy Call";
  const ctaLink = content?.ctaPrimaryLink || "#";
  const videoTitle = content?.videoTitle || "Tilt to explore";
  
  const videoId = getYoutubeId(content?.videoUrl || "");
  const videoUrl = formatVideoUrl(content?.videoUrl || "");
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : "";

  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(lightRef.current, { opacity: 0, scaleY: 0 }, { opacity: 1, scaleY: 1, duration: 2 })
        .fromTo(headingRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, "-=1.2")
        .fromTo(ctaRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.5")
        .fromTo(videoWrapperRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 }, "-=0.5");

      const handleMouseMove = (e: MouseEvent) => {
        const xPct = (e.clientX / window.innerWidth - 0.5);
        const yPct = (e.clientY / window.innerHeight - 0.5);
        gsap.to(lightRef.current, { x: xPct * 100, rotate: xPct * 4, duration: 2 });
        if (!isVideoPlaying) {
          gsap.to(videoWrapperRef.current, { rotateY: xPct * 8, rotateX: yPct * -8, duration: 1.5 });
        }
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);
    return () => ctx.revert();
  }, [isVideoPlaying]);

  const renderHeadline = () => {
    const sortedHighlights = [...hWords].sort((a, b) => b.length - a.length);
    const escapedHighlights = sortedHighlights.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
    const regex = new RegExp(`(${escapedHighlights})`, 'gi');
    const parts = headline.split(regex);

    return parts.map((part, i) => {
      const isMatch = sortedHighlights.some(h => h.toLowerCase() === part.toLowerCase());
      if (isMatch) {
        return (
          <span key={i} className="relative inline-block">
            <span className="font-instrument-serif italic text-emerald-200/95">
              <EncryptedText text={part} />
            </span>
            <span className="absolute bottom-0 left-0 w-full h-px bg-emerald-500/40" aria-hidden />
          </span>
        );
      }
      return <span key={i} className="text-white/95">{part}</span>;
    });
  };

  return (
    <section ref={containerRef} className="relative min-h-screen w-full flex flex-col items-center justify-start pt-32 md:pt-48 pb-20 px-4 bg-[#05180D] overflow-hidden">
      
      {/* Soft gradient */}
      <div ref={lightRef} className="absolute top-[-5%] left-1/2 -translate-x-1/2 w-[120vw] h-[70vh] pointer-events-none z-10 opacity-50"
        style={{ background: "radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.1) 0%, transparent 70%)" }}
      />

      {/* Minimal decor */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-15">
        <div className="absolute top-[20%] left-[12%] w-px h-48 bg-emerald-500/30" />
        <div className="absolute top-[35%] right-[12%] w-px h-48 bg-emerald-500/30" />
      </div>

      <div className="relative z-20 w-full max-w-4xl mx-auto flex flex-col items-center">
        {/* Headline */}
        <h1
          ref={headingRef}
          className="text-4xl md:text-5xl lg:text-6xl font-instrument-sans font-medium tracking-tight text-center leading-[1.2] text-balance mb-12 px-2"
        >
          {renderHeadline()}
        </h1>

        {/* CTA */}
        <div ref={ctaRef} className="flex flex-col items-center gap-6 mb-20">
          <Button asChild className="h-12 px-8 rounded-full bg-white text-black hover:bg-emerald-50 transition-colors font-semibold text-sm flex items-center gap-2">
            <Link href={ctaLink}>
              <span>{ctaPrimary}</span>
              <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
                <ArrowRight className="w-3 h-3 text-white" />
              </div>
            </Link>
          </Button>

          <div className="flex items-center gap-2 text-white/30 text-[10px] uppercase tracking-[0.18em] font-medium">
            <MousePointer2 className="w-3 h-3" />
            <span>{videoTitle}</span>
          </div>
        </div>

        {/* Video */}
        {videoUrl && (
          <div
            ref={videoWrapperRef}
            className={`relative w-full aspect-video overflow-hidden bg-black border border-white/10 shadow-2xl transition-all duration-500 transform-gpu ${isVideoPlaying ? 'rounded-none' : 'rounded-2xl md:rounded-3xl'}`}
          >
            {!isVideoPlaying ? (
              <div className="absolute inset-0 flex items-center justify-center cursor-pointer z-30" onClick={() => setIsVideoPlaying(true)}>
                {thumbnailUrl && (
                  <img src={thumbnailUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#05180D] via-transparent to-transparent opacity-60" />
                <div className="relative group/play">
                  <div className="absolute inset-0 bg-emerald-500/15 blur-2xl rounded-full group-hover/play:scale-150 transition-transform duration-500" />
                  <div className="relative w-14 h-14 md:w-20 md:h-20 rounded-full bg-white/5 backdrop-blur-xl border border-white/20 flex items-center justify-center group-hover/play:scale-105 transition-all duration-300">
                    <Play className="w-5 h-5 md:w-7 md:h-7 text-white fill-white ml-0.5" />
                  </div>
                </div>
              </div>
            ) : (
              <iframe className="absolute inset-0 w-full h-full" src={videoUrl} allow="autoplay; fullscreen" allowFullScreen />
            )}
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#05180D] to-transparent z-20 pointer-events-none" />
    </section>
  );
};