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

export const Hero = ({ content }: { content?: any }) => {
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
      tl.fromTo(".reveal", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.1 });


    }, containerRef);
    return () => ctx.revert();
  }, []);
  return (
    <section
      ref={containerRef}
      className="relative w-full flex flex-col items-center justify-start pt-24 md:pt-32 pb-16 md:pb-24 px-6 overflow-hidden font-satoshi"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft green gradient bloom */}
        <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[70%] bg-emerald-500/[0.06] blur-[120px] rounded-full" />
        <div className="absolute top-[5%] right-[-15%] w-[50%] h-[60%] bg-emerald-400/[0.04] blur-[120px] rounded-full" />

        {/* Subtle geometric shard lines */}
        <div className="absolute top-0 left-0 w-full h-[700px] opacity-[0.08]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <line x1="0%" y1="25%" x2="38%" y2="0%" stroke="#00E676" strokeWidth="1" />
            <line x1="72%" y1="0%" x2="100%" y2="35%" stroke="#00E676" strokeWidth="0.5" />
            <line x1="62%" y1="100%" x2="82%" y2="28%" stroke="#00E676" strokeWidth="1" />
            <line x1="18%" y1="100%" x2="48%" y2="55%" stroke="#00E676" strokeWidth="0.5" />
          </svg>
        </div>

        {/* Dot matrix — fades in from bottom */}
        <div
          className="absolute bottom-0 left-0 w-full h-[360px] bg-[image:radial-gradient(rgba(16,185,129,0.12)_1.5px,transparent_1.5px)] [background-size:26px_26px] opacity-60"
          style={{
            maskImage: "linear-gradient(to bottom, transparent 0%, black 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 100%)",
          }}
        />


      </div>

      <div className="relative z-20 w-full max-w-[56rem] mx-auto flex flex-col items-center text-center mt-6 md:mt-8 mb-8 md:mb-12">

        {/* Top Label */}
        <div className="reveal text-[#00ff66] font-bold text-xs md:text-sm tracking-widest uppercase mb-8">
          {topText}
        </div>

        {/* Main Headline */}
        <h1 className="reveal text-4xl md:text-[3.5rem] font-bold leading-[1.12] tracking-tight text-white mb-8 w-full max-w-[48rem]">
          {headline}
        </h1>

        {/* CTA Section */}
        <div className="reveal flex flex-col items-center gap-4 mb-8">
          <Link href={ctaLink}>
            <div className="flex items-center bg-white rounded-full p-1.5 pr-8 cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.15)] group">
              <div className="w-10 h-10 md:w-[3.25rem] md:h-[3.25rem] bg-[#00e65c] rounded-full flex items-center justify-center mr-5 group-hover:bg-[#00ff66] transition-colors shadow-[0_0_15px_rgba(0,230,92,0.4)]">
                <ArrowRight className="w-[1.125rem] h-[1.125rem] text-[#030b06] stroke-[2.5]" />
              </div>
              <span className="text-[#030b06] font-bold text-[0.95rem] md:text-base tracking-wide mr-2">
                {ctaPrimary}
              </span>
            </div>
          </Link>
        </div>

        {/* Video Player Card (Optional if passed via prop) */}
        {videoUrl && (
          <div className="reveal relative w-full aspect-video rounded-2xl md:rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl bg-black group mb-10">
            {!isVideoPlaying ? (
              <div className="absolute inset-0 flex items-center justify-center cursor-pointer z-10" onClick={() => setIsVideoPlaying(true)}>
                {thumbnailUrl && (
                  <img
                    src={thumbnailUrl}
                    alt="Preview"
                    className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                )}
                <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/5 backdrop-blur-3xl border border-white/10 flex items-center justify-center group-hover:bg-[#00ff66] group-hover:border-[#00ff66] transition-all duration-500">
                  <Play className="w-6 h-6 text-white group-hover:text-[#030b06] fill-current ml-1" />
                </div>
              </div>
            ) : (
              <iframe className="absolute inset-0 w-full h-full" src={videoUrl} allow="autoplay; fullscreen" allowFullScreen />
            )}
          </div>
        )}
      </div>
    </section>
  );
};