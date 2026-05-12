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
import { SectionBackground } from "./SectionBackground";

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
      className="relative w-full flex flex-col items-center justify-start pt-20 sm:pt-24 md:pt-28 pb-20 sm:pb-24 md:pb-32 px-4 sm:px-6 font-satoshi z-10 border-none outline-none"
    >
      {/* ── Luxury Moving Cinematic Background ── */}
      <SectionBackground index={0} variant="hero" />


      <div className="relative z-20 w-full max-w-4xl mx-auto flex flex-col items-center text-center mt-4 sm:mt-6 md:mt-8 mb-0">

        {/* Top Label */}
        <div className="hero-reveal mb-8 flex items-center justify-center">
          <span className="text-emerald-400 font-bold text-[10px] sm:text-[11px] tracking-[0.2em] uppercase drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]">
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
        <div className="hero-reveal flex flex-col items-center gap-4 mb-12 sm:mb-16">
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
              <div className="flex items-center bg-white rounded-full p-1.5 pr-6 sm:pr-8 cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_10px_40px_rgba(16,185,129,0.3)] hover:shadow-[0_10px_50px_rgba(16,185,129,0.5)] group">
                <div className="w-10 h-10 sm:w-11 sm:h-11 bg-emerald-500 rounded-full flex items-center justify-center mr-4 transition-all duration-500 group-hover:bg-emerald-400">
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-black stroke-[3px]" />
                </div>
                <span className="text-black font-bold text-[0.95rem] sm:text-[1.05rem] tracking-tight">
                  {ctaPrimary}
                </span>
              </div>
            </EditableButton>
          ) : (
            <Link href={ctaLink}>
              <div className="flex items-center bg-white rounded-full p-1.5 pr-6 sm:pr-8 cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_10px_40px_rgba(16,185,129,0.3)] hover:shadow-[0_10px_50px_rgba(16,185,129,0.5)] group">
                <div className="w-10 h-10 sm:w-11 sm:h-11 bg-emerald-500 rounded-full flex items-center justify-center mr-4 transition-all duration-500 group-hover:bg-emerald-400">
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-black stroke-[3px]" />
                </div>
                <span className="text-black font-bold text-[0.95rem] sm:text-[1.05rem] tracking-tight">
                  {ctaPrimary}
                </span>
              </div>
            </Link>
          )}
        </div>

        {/* Video Player Section with Epic Glow */}
        {videoUrl && (
          <div className="hero-reveal relative w-full aspect-video group mb-0 overflow-visible">

            {/* Glass Container */}
            <div className="relative z-10 w-full h-full rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden border border-white/10 group-hover:border-emerald-500/30 transition-colors duration-700 shadow-[0_20px_80px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(16,185,129,0.05)] bg-black/40 backdrop-blur-2xl p-1 sm:p-2">
              <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent pointer-events-none z-10" />

              {/* Inner Video Container */}
              <div className="relative w-full h-full rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-black shadow-inner">
                {!isVideoPlaying ? (
                  <div className="absolute inset-0 flex items-center justify-center cursor-pointer z-20" onClick={() => setIsVideoPlaying(true)}>
                    {thumbnailUrl && (
                      <>
                        <img
                          src={thumbnailUrl}
                          alt="Preview"
                          className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-50 group-hover:scale-105 transition-all duration-1000"
                        />
                        {/* Inner subtle emerald overlay to match theme */}
                        <div className="absolute inset-0 bg-emerald-900/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-1000" />
                      </>
                    )}

                    {/* Modern Play Button HUD */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-700">
                      <div className="absolute inset-0 bg-emerald-500/20 backdrop-blur-3xl rounded-full border border-emerald-400/30 animate-[ping_3s_infinite]" />
                      <div className="absolute inset-2 bg-white/20 backdrop-blur-2xl rounded-full border border-white/30 shadow-[0_0_30px_rgba(16,185,129,0.4)]" />
                      <div className="relative z-30 w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.8)] group-hover:shadow-[0_0_50px_rgba(16,185,129,0.8)] transition-shadow duration-500">
                        <Play className="w-5 h-5 sm:w-7 sm:h-7 text-black fill-current ml-1" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <iframe className="absolute inset-0 w-full h-full" src={videoUrl} allow="autoplay; fullscreen" allowFullScreen />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};