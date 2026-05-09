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
  const headline = content?.headline || "We help B2B Brands and Content Creators scale their revenue through Organic Content and Motion Ad Creatives";
  const ctaPrimary = content?.ctaPrimary || "Book a Strategy Call";
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
      {/* ── MATERA MEDIA — 4K Cinematic Nebula Rift ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* === DEEP CORE GLOW === */}
        <div className="absolute top-[30%] left-[35%] w-[700px] h-[700px] rounded-full z-0"
          style={{
            background: "radial-gradient(ellipse at center, rgba(16,185,129,0.18) 0%, rgba(5,150,105,0.10) 40%, transparent 75%)",
            filter: "blur(80px)",
          }}
        />

        {/* === RIFT BEAMS — Angled, cinematic === */}
        <div className="absolute z-0"
          style={{
            top: "-8%",
            left: "-15%",
            width: "95%",
            height: "480px",
            background: "linear-gradient(105deg, rgba(16,185,129,0.13) 0%, rgba(52,211,153,0.07) 50%, transparent 100%)",
            filter: "blur(100px)",
            borderRadius: "60% 40% 50% 60%",
            transform: "rotate(-22deg)",
          }}
        />

        <div className="absolute z-0"
          style={{
            top: "5%",
            right: "-20%",
            width: "80%",
            height: "420px",
            background: "linear-gradient(75deg, transparent 0%, rgba(74,222,128,0.06) 50%, rgba(16,185,129,0.09) 100%)",
            filter: "blur(110px)",
            borderRadius: "50% 60% 40% 55%",
            transform: "rotate(18deg)",
          }}
        />

        {/* === MID ATMOSPHERE === */}
        <div className="absolute z-0"
          style={{
            top: "38%",
            left: "-5%",
            width: "55%",
            height: "280px",
            background: "radial-gradient(ellipse, rgba(5,150,105,0.10) 0%, rgba(6,95,70,0.05) 60%, transparent 100%)",
            filter: "blur(90px)",
            transform: "rotate(28deg)",
          }}
        />

        <div className="absolute z-0"
          style={{
            top: "45%",
            right: "-5%",
            width: "52%",
            height: "320px",
            background: "radial-gradient(ellipse, rgba(16,185,129,0.07) 0%, rgba(20,184,166,0.04) 55%, transparent 100%)",
            filter: "blur(100px)",
            transform: "rotate(-40deg)",
          }}
        />

        {/* Center horizontal sweep */}
        <div className="absolute z-0"
          style={{
            top: "55%",
            left: "5%",
            width: "90%",
            height: "160px",
            background: "linear-gradient(90deg, transparent 0%, rgba(52,211,153,0.05) 30%, rgba(16,185,129,0.08) 55%, rgba(52,211,153,0.04) 80%, transparent 100%)",
            filter: "blur(60px)",
          }}
        />

        {/* === BOTTOM BLEED === */}
        <div className="absolute z-0"
          style={{
            bottom: "-120px",
            left: "50%",
            transform: "translateX(-50%) rotate(-4deg)",
            width: "130%",
            height: "450px",
            background: "radial-gradient(ellipse at center, rgba(16,185,129,0.09) 0%, rgba(5,150,105,0.05) 50%, transparent 75%)",
            filter: "blur(130px)",
          }}
        />

        {/* Bottom-left corner accent */}
        <div className="absolute z-0"
          style={{
            bottom: "0",
            left: "-10%",
            width: "40%",
            height: "300px",
            background: "radial-gradient(ellipse, rgba(6,95,70,0.12) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        {/* === SHARP HIGHLIGHT STREAKS === */}
        <div className="absolute z-0"
          style={{
            top: "22%",
            left: "15%",
            width: "45%",
            height: "2px",
            background: "linear-gradient(90deg, transparent, rgba(52,211,153,0.25), transparent)",
            filter: "blur(3px)",
            transform: "rotate(-8deg)",
          }}
        />

        <div className="absolute z-0"
          style={{
            top: "68%",
            right: "10%",
            width: "35%",
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(74,222,128,0.2), transparent)",
            filter: "blur(2px)",
            transform: "rotate(5deg)",
          }}
        />

        {/* === GRAIN / NOISE LAYER === */}
        <div
          className="absolute inset-0 z-10"
          style={{
            backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
            opacity: 0.055,
            mixBlendMode: "overlay",
          }}
        />

        <div
          className="absolute inset-0 z-10"
          style={{
            backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
            opacity: 0.025,
            mixBlendMode: "screen",
            backgroundSize: "150px 150px",
          }}
        />

        {/* === VIGNETTE === */}
        <div
          className="absolute inset-0 z-20"
          style={{
            background: "radial-gradient(ellipse at center, transparent 30%, rgba(5,8,5,0.5) 70%, rgba(3,5,3,0.85) 100%)",
          }}
        />

        {/* Top vignette strip */}
        <div
          className="absolute top-0 left-0 right-0 h-32 z-20"
          style={{
            background: "linear-gradient(to bottom, rgba(5,8,5,0.7) 0%, transparent 100%)",
          }}
        />

        {/* Bottom vignette strip */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 z-20"
          style={{
            background: "linear-gradient(to top, rgba(5,8,5,0.7) 0%, transparent 100%)",
          }}
        />
      </div>

      <div className="relative z-20 w-full max-w-4xl mx-auto flex flex-col items-center text-center mt-4 sm:mt-6 md:mt-8 mb-8 md:mb-12">

        {/* Top Label */}
        <div className="hero-reveal mb-8 flex items-center justify-center">
          <span className="text-emerald-500 font-bold text-[10px] sm:text-[11px] tracking-[0.2em] uppercase">
            {documentId ? (
              <EditableText id={documentId} field="topText" sectionKey={sectionKey} value={topText} as="span" />
            ) : (
              topText
            )}
          </span>
        </div>

        {/* ── Modern Heading Bloom ── */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[80%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none z-0" />
        <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[50%] h-[30%] bg-lime-500/8 blur-[80px] rounded-full pointer-events-none z-0" />

        {/* Main Headline */}
        <h1 className="hero-reveal text-[2rem] sm:text-4xl md:text-[3.5rem] font-semibold leading-[1.15] tracking-tight text-white mb-10 w-full max-w-3xl px-1 relative z-10">
          {documentId ? (
            <EditableText id={documentId} field="headline" sectionKey={sectionKey} value={headline} as="span" />
          ) : (
            headline
          )}
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
              <div className="flex items-center bg-white rounded-full p-1.5 pr-6 sm:pr-8 cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_20px_50px_rgba(16,185,129,0.15)] group">
                <div className="w-10 h-10 sm:w-11 sm:h-11 bg-emerald-500 rounded-full flex items-center justify-center mr-4 transition-all duration-500">
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-black stroke-3" />
                </div>
                <span className="text-black font-semibold text-[0.95rem] sm:text-[1.05rem] tracking-tight">
                  {ctaPrimary}
                </span>
              </div>
            </EditableButton>
          ) : (
            <Link href={ctaLink}>
              <div className="flex items-center bg-white rounded-full p-1.5 pr-6 sm:pr-8 cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_20px_50px_rgba(16,185,129,0.15)] group">
                <div className="w-10 h-10 sm:w-11 sm:h-11 bg-emerald-500 rounded-full flex items-center justify-center mr-4 transition-all duration-500">
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-black stroke-3" />
                </div>
                <span className="text-black font-semibold text-[0.95rem] sm:text-[1.05rem] tracking-tight">
                  {ctaPrimary}
                </span>
              </div>
            </Link>
          )}
        </div>

        {/* Video Player Card (Next-Level Glass Styling) */}
        {videoUrl && (
          <div className="hero-reveal relative w-full aspect-video rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] bg-black/40 backdrop-blur-2xl group mb-8 p-1 sm:p-2">
            <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent pointer-events-none z-10" />
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
