"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

const getYoutubeId = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

/** Renders a headline string, wrapping any `highlightedWords` in an emerald italic span */
function HighlightedHeadline({
  headline,
  highlightedWords,
}: {
  headline: string;
  highlightedWords?: string[];
}) {
  if (!highlightedWords || highlightedWords.length === 0) {
    return <>{headline}</>;
  }

  // Build a regex that matches any of the highlighted words
  const escaped = highlightedWords.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const regex = new RegExp(`(${escaped.join("|")})`, "g");
  const parts = headline.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        highlightedWords.includes(part) ? (
          <span
            key={i}
            className="text-emerald-500 italic"
            style={{ fontFamily: "'Satoshi', sans-serif" }}
          >
            {part}
          </span>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  );
}

export const Hero = ({ content }: { content?: any }) => {
  const headline =
    content?.headline ||
    "We Will Build A Paid & Organic Content System That Attracts Leads & Closes Deals (Done-For-You)";
  const highlightedWords: string[] = content?.highlightedWords || [];
  const ctaPrimary = content?.ctaPrimary || "Book a Strategy Call";
  const ctaLink = content?.ctaPrimaryLink || "#schedule";

  const videoId = getYoutubeId(content?.videoUrl || "");
  const videoUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1`
    : "";
  const thumbnailUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : "";

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <section className="relative w-full flex flex-col items-center justify-start pt-36 pb-28 px-6 bg-transparent overflow-hidden font-satoshi">

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

      {/* ── Content ── */}
      <div className="relative z-20 w-full max-w-4xl mx-auto flex flex-col items-center text-center gap-0">

        {/* Main headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.25] tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 max-w-[820px] mb-6">
          <HighlightedHeadline headline={headline} highlightedWords={highlightedWords} />
        </h1>
        
        {/* CTA */}
        <Link
          href={ctaLink}
          className="group flex items-center bg-white rounded-full p-[3px] pr-7 shadow-[0_0_40px_rgba(0,230,118,0.08)] hover:shadow-[0_0_60px_rgba(0,230,118,0.18)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          <div className="w-9 h-9 rounded-full bg-[#00FF66] flex items-center justify-center mr-3.5 group-hover:bg-emerald-400 transition-colors">
            <ArrowRight className="w-4 h-4 text-white stroke-[2.5]" />
          </div>
          <span className="text-black text-[13px] font-bold tracking-wide">
            {ctaPrimary}
          </span>
        </Link>

        {/* Video embed */}
        {videoUrl && (
          <div className="relative w-full max-w-4xl aspect-[16/9] rounded-2xl overflow-hidden border border-white/5 bg-[#0A1A10] mt-16 shadow-2xl">
            {!isVideoPlaying ? (
              <div
                className="absolute inset-0 flex items-center justify-center cursor-pointer group/vid"
                onClick={() => setIsVideoPlaying(true)}
              >
                {thumbnailUrl && (
                  <img
                    src={thumbnailUrl}
                    alt="Preview"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale-[0.3] group-hover/vid:opacity-80 group-hover/vid:scale-[1.02] transition-all duration-700 ease-out"
                  />
                )}
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative z-20">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center group-hover/vid:scale-110 transition-all duration-300 shadow-xl">
                    <Play className="w-6 h-6 text-black fill-black ml-0.5" />
                  </div>
                </div>
              </div>
            ) : (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={videoUrl}
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
};