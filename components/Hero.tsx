"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Play, ArrowRight, Sparkles } from "lucide-react";
import { GSAPButton } from "./GSAPButton";

const getYoutubeId = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

export const Hero = ({ content }: { content?: any }) => {
  const headline = content?.headline || "We build you a YouTube organic + Paid funnel that books you 20+ calls per month.";
  const hWords = content?.highlightedWords || ["YouTube organic + Paid funnel", "20+ calls per month."];
  const ctaPrimary = content?.ctaPrimary || "Book a Call";
  const ctaLink = content?.ctaPrimaryLink || "#";

  const videoId = getYoutubeId(content?.videoUrl || "");
  const videoUrl = videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1` : "";
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : "";

  const containerRef = useRef<HTMLDivElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(".reveal", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.1 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const renderHeadline = () => {
    const sortedHighlights = [...hWords].sort((a, b) => b.length - a.length);
    const escaped = sortedHighlights.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
    const regex = new RegExp(`(${escaped})`, "gi");
    const parts = headline.split(regex);

    return parts.map((part: string, i: number) => {
      const isMatch = sortedHighlights.some(h => h.toLowerCase() === part.toLowerCase());
      return (
        <span
          key={i}
          className={isMatch ? "text-emerald-400 italic font-semibold px-1" : "text-white"}
          style={isMatch ? { textShadow: "0 0 20px rgba(52, 211, 153, 0.25)" } : {}}
        >
          {part}
        </span>
      );
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full flex flex-col items-center justify-start pt-20 md:pt-32 pb-16 px-6 bg-[#05180D] overflow-hidden font-satoshi border-none"
    >
      {/* 1. Top Glow Atmosphere (Full Coverage to prevent lines) */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.08)_0%,transparent_60%)] pointer-events-none"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.02)_0%,transparent_50%)] pointer-events-none blur-[120px]"
      />

      {/* --- BOTTOM SEAMLESS BLENDING --- */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#05180D] via-[#05180D] to-transparent z-10 pointer-events-none" />

      <div className="relative z-20 w-full max-w-4xl mx-auto flex flex-col items-center mt-6 md:mt-10 mb-8 md:mb-12">

        <h1 className="reveal text-3xl sm:text-4xl md:text-5xl font-semibold leading-[1.2] md:leading-[1.1] tracking-tight text-center mb-8 md:mb-10 text-white max-w-4xl">
          {renderHeadline()}
        </h1>

        {/* Video Player Card - Medium Scale */}
        {videoUrl && (
          <div className="reveal relative w-full max-w-4xl aspect-video rounded-3xl md:rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl bg-black group mb-10">
            {!isVideoPlaying ? (
              <div className="absolute inset-0 flex items-center justify-center cursor-pointer z-10" onClick={() => setIsVideoPlaying(true)}>
                {thumbnailUrl && (
                  <img
                    src={thumbnailUrl}
                    alt="Preview"
                    className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                )}
                <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/5 backdrop-blur-3xl border border-white/10 flex items-center justify-center group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-all duration-500">
                  <Play className="w-6 h-6 text-white fill-current ml-1" />
                </div>
              </div>
            ) : (
              <iframe className="absolute inset-0 w-full h-full" src={videoUrl} allow="autoplay; fullscreen" allowFullScreen />
            )}
          </div>
        )}

        {/* CTA Section (Advanced High-End GSAP Magnetic Button) */}
        <div className="reveal mt-8 flex justify-center z-30">
          <GSAPButton href={ctaLink} text={ctaPrimary} />
        </div>
      </div>

      {/* Grainy Noise Overlay with Smooth Mask */}
      <div
        className="absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none"
        style={{
          maskImage: 'linear-gradient(to bottom, black 0%, black 90%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 90%, transparent 100%)'
        }}
      />
    </section>
  );
};