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
      className="relative w-full flex flex-col items-center justify-start pt-24 md:pt-32 pb-16 md:pb-24 px-6 bg-[#030b06] overflow-hidden font-satoshi"
    >
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 z-0 bg-no-repeat bg-cover bg-center pointer-events-none opacity-50"
        style={{ backgroundImage: `url('/herobg.png')` }}
      />

      {/* Dark gradient overlay to blend into the website */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#030b06]/20 via-[#030b06]/60 to-[#05180d] pointer-events-none" />

      {/* Top Glow Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[60vh] bg-[radial-gradient(ellipse_at_top,rgba(0,255,102,0.12)_0%,transparent_60%)] pointer-events-none z-10" />

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