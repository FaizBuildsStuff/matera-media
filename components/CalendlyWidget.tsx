"use client";

import Script from "next/script";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_CALENDLY_URL =
  "https://calendly.com/m-faizurrehman-crypto/30min?primary_color=059669&background_color=05180D&text_color=ffffff";

type CalendlyContent = {
  title?: string;
  subtitle?: string;
  calendlyUrl?: string;
};

export const CalendlyWidget = ({ content }: { content?: CalendlyContent }) => {
  const title =
    content?.title ?? "Let’s Architect Your Next Phase of Growth.";
  const subtitle =
    content?.subtitle ??
    "Book a strategic discovery call to explore how we can build a performance-driven creative system for your brand.";
  const calendlyUrl = content?.calendlyUrl || DEFAULT_CALENDLY_URL;

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Scroll reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      ).fromTo(
        widgetRef.current,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
        "-=0.6"
      );

      // Slow floating glow animation
      gsap.to(glowRef.current, {
        y: 40,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="schedule"
      className="relative py-40 px-6 bg-[#05180D] overflow-hidden"
    >

      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Large Emerald Glow */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 w-[900px] h-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[160px]"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,129,0.25) 0%, transparent 70%)",
        }}
      />

      {/* Secondary Floating Glow */}
      <div className="absolute top-20 left-20 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-20 right-20 w-[350px] h-[350px] bg-teal-400/10 rounded-full blur-[120px] animate-pulse delay-700" />

      <div className="relative z-10 max-w-6xl mx-auto text-center">

        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Image
            src="/Logo.png"
            alt="Matera Media Logo"
            width={120}
            height={120}
            className="opacity-90"
            priority
          />
        </div>

        {/* Header */}
        <div ref={headerRef} className="mb-20">
          <h2 className="text-4xl md:text-6xl font-semibold text-white tracking-tight mb-6 leading-tight">
            {title}
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Calendly */}
        <div ref={widgetRef} className="max-w-4xl mx-auto">
          <div
            className="calendly-inline-widget w-full"
            data-url={calendlyUrl}
            style={{ minWidth: "320px", height: "1000px" }}
          />
        </div>

      </div>

      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </section>
  );
};