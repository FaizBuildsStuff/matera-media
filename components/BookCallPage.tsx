"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { gsap } from "gsap";
import { CheckCircle2, Sparkles, ShieldCheck, Clock } from "lucide-react";
import { colors } from "@/theme/colors";
import { Card } from "@/components/ui/card";

declare global {
  interface Window {
    Calendly?: any;
  }
}

export type BookingPageContent = {
  title?: string;
  subtitle?: string;
  benefits?: string[];
  trustText?: string;
  calendlyUrl?: string;
};

export function BookCallPage({ content }: { content?: BookingPageContent }) {
  const calendlyRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const title = content?.title ?? "Book your strategy call";

  const subtitle =
    content?.subtitle ??
    "Let's discuss your growth goals and how our high-performance content systems can scale your brand.";

  const benefits =
    content?.benefits ?? [
      "Personalized growth strategy tailored to your brand",
      "30 minute focused strategy session",
      "No pressure call — just actionable insights",
    ];

  const trustText =
    content?.trustText ?? "🔒 Your information stays private.";

  const calendlyUrl =
    content?.calendlyUrl ??
    "https://calendly.com/m-faizurrehman-crypto/30min";

  /* Calendly loader */
  useEffect(() => {
    const initCalendly = () => {
      if (!window.Calendly || !calendlyRef.current) return;

      calendlyRef.current.innerHTML = "";

      window.Calendly.initInlineWidget({
        url: calendlyUrl,
        parentElement: calendlyRef.current,
      });
    };

    if (window.Calendly) {
      initCalendly();
    } else {
      const interval = setInterval(() => {
        if (window.Calendly) {
          initCalendly();
          clearInterval(interval);
        }
      }, 300);

      return () => clearInterval(interval);
    }
  }, [calendlyUrl]);

  /* GSAP animations */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(leftRef.current, {
        x: -80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      tl.from(
        rightRef.current,
        {
          x: 80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.8",
      );

      tl.from(
        ".benefit-item",
        {
          y: 40,
          opacity: 0,
          stagger: 0.15,
          duration: 0.7,
          ease: "power3.out",
        },
        "-=0.6",
      );
    }, containerRef);

    return () => ctx.revert();
  }, [content]);

  const words = title.split(" ");

  const mainTitle =
    words.length > 2 ? words.slice(0, -2).join(" ") : title;

  const highlight =
    words.length > 2 ? words.slice(-2).join(" ") : "";

  return (
    <>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />

      <main
        ref={containerRef}
        className="min-h-screen relative px-6 py-28 overflow-hidden"
        style={{ background: colors.background.base }}
      >
        {/* Glow Layers */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{ background: colors.effects.emeraldGlow }}
        />

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-emerald-500/10 blur-[200px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-start">

          {/* LEFT SIDE */}
          <div ref={leftRef} className="space-y-12">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 text-xs tracking-wider text-white/70 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Matera Media
            </div>

            {/* Title */}
            <div className="space-y-6 max-w-xl">

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight tracking-tight">

                {mainTitle}{" "}

                {highlight && (
                  <span style={{ color: colors.brand.primary }}>
                    {highlight}
                  </span>
                )}

              </h1>

              <p
                className="text-lg leading-relaxed"
                style={{ color: colors.text.secondary }}
              >
                {subtitle}
              </p>
            </div>

            {/* Benefits */}
            <div className="grid gap-5 max-w-lg">
              {benefits.map((benefit, i) => (
                <Benefit key={i} text={benefit} />
              ))}
            </div>

            {/* Trust */}
            <div
              className="pt-6 border-t text-sm"
              style={{
                borderColor: colors.border.subtle,
                color: colors.text.muted,
              }}
            >
              {trustText}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div ref={rightRef} className="relative w-full">

            {/* Glass Card Container */}
            <Card
              className="relative rounded-[28px] overflow-hidden border backdrop-blur-xl shadow-[0_0_80px_rgba(16,185,129,0.08)]"
              style={{
                borderColor: colors.border.subtle,
                background: colors.background.secondary,
              }}
            >

              {/* Top Accent */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-70" />

              {/* Calendly */}
              <div
                ref={calendlyRef}
                className="w-full"
                style={{
                  minWidth: "320px",
                  height: "850px",
                }}
              />

            </Card>
          </div>
        </div>
      </main>
    </>
  );
}

function Benefit({ text }: { text: string }) {
  return (
    <div className="benefit-item flex items-start gap-4">

      <div className="p-2 rounded-lg bg-white/5 border border-white/10">
        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
      </div>

      <p className="text-white/80 leading-relaxed">
        {text}
      </p>

    </div>
  );
}