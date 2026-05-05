"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { Play, ArrowRight } from "lucide-react";

const getYoutubeId = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

import { EditableText } from "./visual-editing/EditableText";
import { EditableButton } from "./visual-editing/EditableButton";

export const Hero = ({ content }: { content?: any }) => {
  const documentId = content?._documentId;
  const sectionKey = content?._sectionKey;

  const topText = content?.topText || "SERVICE FOUNDERS & INFO ENTREPRENEURS!";
  const headline = content?.headline || "We Will Build A Paid & Organic Content System That Attracts Leads & Closes Deals (Done-For-You)";
  const ctaPrimary = content?.ctaPrimary || "Learn More";
  const ctaLink = content?.ctaPrimaryLink || "#";

  const videoId = getYoutubeId(content?.videoUrl || "");
  const videoUrl = videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1` : "";
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : "";

  const containerRef = useRef<HTMLDivElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(".hero-reveal", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.12 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full flex flex-col items-center justify-start pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-12 md:pb-16 px-4 sm:px-6 font-satoshi z-10"
    >
      {/* ── Powerful Static Nebula Rift Background ── */}
      <div className="absolute inset-0 pointer-events-none z-0">

        {/* Angled "Rift" Beams (Static) */}
        <div className="absolute top-[5%] left-[-10%] w-[100%] h-[400px] bg-emerald-600/[0.1] blur-[140px] rounded-[100%] rotate-[-25deg] z-0" />
        <div className="absolute top-[15%] right-[-10%] w-[80%] h-[500px] bg-lime-500/[0.08] blur-[120px] rounded-[100%] rotate-[15deg] z-0" />
        
        {/* Secondary Cross-Beams */}
        <div className="absolute top-[40%] left-[10%] w-[60%] h-[200px] bg-emerald-400/[0.05] blur-[100px] rounded-[100%] rotate-[35deg] z-0" />
        <div className="absolute top-[50%] right-[10%] w-[50%] h-[300px] bg-cyan-500/[0.04] blur-[110px] rounded-[100%] rotate-[-45deg] z-0" />

        {/* Bottom Bleed Rift */}
        <div className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[120%] h-[400px] bg-emerald-500/[0.06] blur-[140px] rounded-[100%] rotate-[-5deg] z-0" />

        {/* Global Textures */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black,transparent:85%)]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="relative z-20 w-full max-w-[56rem] mx-auto flex flex-col items-center text-center mt-4 sm:mt-6 md:mt-8 mb-8 md:mb-12">

        {/* Top Label */}
        <div className="hero-reveal mb-8 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
          <span className="text-white font-bold text-[9px] sm:text-[10px] tracking-[0.3em] uppercase">
            {documentId ? (
              <EditableText id={documentId} field="topText" sectionKey={sectionKey} value={topText} as="span" />
            ) : (
              topText
            )}
          </span>
        </div>

        {/* ── Modern Heading Bloom ── */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[80%] h-[40%] bg-emerald-500/[0.1] blur-[120px] rounded-full pointer-events-none z-0" />
        <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[50%] h-[30%] bg-lime-500/[0.08] blur-[80px] rounded-full pointer-events-none z-0" />

        {/* Main Headline */}
        <h1 className="hero-reveal text-[1.75rem] sm:text-4xl md:text-[3.5rem] font-black leading-[1.1] tracking-tighter text-white mb-10 w-full max-w-[48rem] px-1 relative z-10">
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/70">
            {documentId ? (
              <EditableText id={documentId} field="headline" sectionKey={sectionKey} value={headline} as="span" />
            ) : (
              headline
            )}
          </span>
        </h1>

        {/* CTA Section */}
        <div className="hero-reveal flex flex-col items-center gap-4 mb-8 sm:mb-10">
          {documentId ? (
            <EditableButton
              id={documentId}
              textField="ctaPrimary"
              linkField="ctaPrimaryLink"
              sectionKey={sectionKey}
              text={ctaPrimary}
              link={ctaLink}
              className="group"
            >
              <div className="flex items-center bg-white rounded-full p-1 sm:p-1.5 pr-5 sm:pr-8 cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_20px_50px_rgba(255,255,255,0.15)] group">
                <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-[3.25rem] md:h-[3.25rem] bg-black rounded-full flex items-center justify-center mr-3 sm:mr-5 group-hover:bg-emerald-500 transition-all duration-500">
                  <ArrowRight className="w-4 h-4 sm:w-[1.125rem] sm:h-[1.125rem] text-white stroke-[2.5] group-hover:rotate-[-45deg] transition-transform" />
                </div>
                <span className="text-black font-bold text-[0.85rem] sm:text-[0.95rem] md:text-base tracking-wide uppercase">
                  {ctaPrimary}
                </span>
              </div>
            </EditableButton>
          ) : (
            <Link href={ctaLink}>
              <div className="flex items-center bg-white rounded-full p-1 sm:p-1.5 pr-5 sm:pr-8 cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_20px_50px_rgba(255,255,255,0.15)] group">
                <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-[3.25rem] md:h-[3.25rem] bg-black rounded-full flex items-center justify-center mr-3 sm:mr-5 group-hover:bg-emerald-500 transition-all duration-500">
                  <ArrowRight className="w-4 h-4 sm:w-[1.125rem] sm:h-[1.125rem] text-white stroke-[2.5] group-hover:rotate-[-45deg] transition-transform" />
                </div>
                <span className="text-black font-bold text-[0.85rem] sm:text-[0.95rem] md:text-base tracking-wide uppercase">
                  {ctaPrimary}
                </span>
              </div>
            </Link>
          )}
        </div>

        {/* Video Player Card (Next-Level Glass Styling) */}
        {videoUrl && (
          <div className="hero-reveal relative w-full aspect-video rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] bg-black/40 backdrop-blur-2xl group mb-8 p-1 sm:p-2">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none z-10" />
            <div className="relative w-full h-full rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-black">
              {!isVideoPlaying ? (
                <div className="absolute inset-0 flex items-center justify-center cursor-pointer z-20" onClick={() => setIsVideoPlaying(true)}>
                  {thumbnailUrl && (
                    <img
                      src={thumbnailUrl}
                      alt="Preview"
                      className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                    />
                  )}
                  {/* Modern Play Button HUD */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-700">
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl rounded-full border border-white/20 animate-[ping_3s_infinite]" />
                    <div className="absolute inset-2 bg-white/20 backdrop-blur-2xl rounded-full border border-white/30" />
                    <div className="relative z-30 w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                      <Play className="w-5 h-5 sm:w-7 sm:h-7 text-black fill-current ml-1" />
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
    </section>
  );
};
