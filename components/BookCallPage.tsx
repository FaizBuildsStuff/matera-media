"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { gsap } from "gsap";
import { CheckCircle2, Sparkles } from "lucide-react";
import { colors } from "@/theme/colors";

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

  // Calendly loader
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

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
      );

      gsap.fromTo(
        rightRef.current,
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, delay: 0.2, ease: "power3.out" },
      );

      gsap.fromTo(
        ".benefit-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          delay: 0.4,
          duration: 0.7,
          ease: "power3.out",
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, [content]);

  // Safe title highlight
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
        className="min-h-screen relative px-6 py-24 overflow-hidden"
        style={{ background: colors.background.base }}
      >
        {/* Glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{ background: colors.effects.emeraldGlow }}
        />

        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-start">
          {/* LEFT */}
          <div ref={leftRef} className="space-y-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-wider text-white/70">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Strategy Session
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-tight">
                {mainTitle}{" "}
                {highlight && (
                  <span style={{ color: colors.brand.primary }}>
                    {highlight}
                  </span>
                )}
              </h1>

              <p
                className="text-lg max-w-md"
                style={{ color: colors.text.secondary }}
              >
                {subtitle}
              </p>
            </div>

            <div className="space-y-5">
              {benefits.map((benefit, i) => (
                <Benefit key={i} text={benefit} />
              ))}
            </div>

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

          {/* RIGHT */}
          <div ref={rightRef} className="w-full">
            <div
              ref={calendlyRef}
              className="w-full rounded-3xl border backdrop-blur-sm shadow-2xl"
              style={{
                minWidth: "320px",
                height: "850px",
                borderColor: colors.border.subtle,
                background: colors.background.secondary,
              }}
            />
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
      <p className="text-white/80 leading-relaxed">{text}</p>
    </div>
  );
}

