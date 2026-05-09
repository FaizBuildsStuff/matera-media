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
      // ── Main Reveal ──
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(".hero-reveal", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.12 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full flex flex-col items-center justify-start pt-20 sm:pt-24 md:pt-28 pb-20 sm:pb-24 md:pb-32 px-4 sm:px-6 font-satoshi z-10"
    >
      {/* ── 4K Live Spotlight Background ── */}
      <div className="absolute inset-x-0 top-0 bottom-[-500px] pointer-events-none z-0 overflow-visible">

        {/* BASE — Synced to global background */}
        <div className="absolute inset-0" style={{ background: "#050505" }} />

        {/* SPOTLIGHT CONE — wide soft outer */}
        <div
          className="absolute"
          style={{
            top: "-20%",
            left: "50%",
            width: "70%",
            height: "140%",
            transform: "translateX(-50%)",
            background: "radial-gradient(ellipse 50% 70% at 50% 30%, rgba(45, 106, 79, 0.55) 0%, rgba(27, 67, 50, 0.3) 35%, rgba(13, 43, 26, 0.1) 65%, transparent 85%)",
            willChange: "opacity, transform",
            animation: "spotlightPulse 7s ease-in-out infinite",
          }}
        />

        {/* SPOTLIGHT CORE — bright center */}
        <div
          className="absolute"
          style={{
            top: "-10%",
            left: "50%",
            width: "45%",
            height: "120%",
            transform: "translateX(-50%)",
            background: "radial-gradient(ellipse 45% 60% at 50% 30%, rgba(82, 183, 136, 0.5) 0%, rgba(64, 145, 108, 0.25) 40%, transparent 75%)",
            willChange: "opacity, transform",
            animation: "spotlightDrift 9s ease-in-out infinite",
          }}
        />

        {/* SPOTLIGHT HOT TIP — sharpest brightest point */}
        <div
          className="absolute"
          style={{
            top: "10%",
            left: "50%",
            width: "20%",
            height: "60%",
            transform: "translateX(-50%)",
            background: "radial-gradient(ellipse 50% 50% at 50% 30%, rgba(110, 231, 183, 0.35) 0%, rgba(82, 183, 136, 0.15) 50%, transparent 80%)",
            willChange: "opacity",
            animation: "spotlightFlicker 5s ease-in-out infinite",
          }}
        />

        {/* EDGE VIGNETTE — Synced to #050505 */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, transparent 30%, rgba(5,5,5,0.6) 80%, #050505 100%)",
          }}
        />

        <style>{`
          @keyframes spotlightPulse {
            0%, 100% { opacity: 0.85; transform: translateX(-50%) scale(1); }
            50%      { opacity: 1;    transform: translateX(-50%) scale(1.05); }
          }
          @keyframes spotlightDrift {
            0%, 100% { opacity: 0.9;  transform: translateX(-52%) scale(1); }
            50%      { opacity: 1;    transform: translateX(-48%) scale(1.03); }
          }
          @keyframes spotlightFlicker {
            0%, 100% { opacity: 0.75; }
            50%      { opacity: 1; }
          }
        `}</style>

      </div>

      <div className="relative z-20 w-full max-w-4xl mx-auto flex flex-col items-center text-center mt-4 sm:mt-6 md:mt-8 mb-0">

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
          <div className="hero-reveal relative w-full aspect-video rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] bg-black/40 backdrop-blur-2xl group mb-0 p-1 sm:p-2">
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
