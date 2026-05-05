"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { gsap } from "gsap";
import { CheckCircle2, Sparkles, ShieldCheck, Clock, ArrowRight } from "lucide-react";
import { colors } from "@/theme/colors";
import { Card } from "@/components/ui/card";
import { EditableText } from "./visual-editing/EditableText";
import { EditableButton } from "./visual-editing/EditableButton";

declare global {
  interface Window {
    Calendly?: any;
  }
}

export type BookingPageContent = {
  _id?: string;
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

  const documentId = content?._id;
  const title = content?.title ?? "Book your strategy call";
  const subtitle = content?.subtitle ?? "Let's discuss your growth goals and how our high-performance content systems can scale your brand.";
  const benefits = content?.benefits ?? [
    "Personalized growth strategy tailored to your brand",
    "30 minute focused strategy session",
    "No pressure call — just actionable insights",
  ];
  const trustText = content?.trustText ?? "Your information stays private and encrypted.";
  const calendlyUrl = content?.calendlyUrl ?? "https://calendly.com/m-faizurrehman-crypto/30min";

  useEffect(() => {
    const initCalendly = () => {
      if (!window.Calendly || !calendlyRef.current) return;
      calendlyRef.current.innerHTML = "";
      window.Calendly.initInlineWidget({
        url: calendlyUrl,
        parentElement: calendlyRef.current,
        prefill: {},
        utm: {}
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Cinematic Header Reveal
      tl.fromTo(leftRef.current, 
        { y: 30, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "expo.out" }
      );

      tl.fromTo(rightRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "power4.out" },
        "-=0.8"
      );

      tl.from(".benefit-item", {
        x: -20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.5");
    }, containerRef);

    return () => ctx.revert();
  }, [content]);

  return (
    <>
      <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet" />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />

      <main
        ref={containerRef}
        className="min-h-screen relative px-6 py-24 md:py-32 overflow-hidden font-satoshi"
        style={{ background: "#050505" }}
      >
        {/* Atmospheric Layers */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-white/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-[1fr,1.2fr] gap-16 lg:gap-24 items-center">

          {/* CONTENT SECTION */}
          <div ref={leftRef} className="space-y-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/5 bg-white/[0.03] text-[10px] uppercase font-bold tracking-[0.2em] text-white/80 backdrop-blur-md">
              <Sparkles className="size-3" />
              Strategic Booking
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-white leading-[1.1] tracking-tighter font-instrument-sans">
                {documentId ? (
                  <EditableText id={documentId} field="title" value={title} as="span" />
                ) : title}
              </h1>

              <div className="text-lg md:text-xl text-white/40 font-light leading-relaxed max-w-lg whitespace-pre-wrap">
                {documentId ? (
                  <EditableText id={documentId} field="subtitle" value={subtitle} />
                ) : subtitle}
              </div>
            </div>

            <div className="space-y-4 max-w-md">
              {benefits.map((benefit, i) => (
                <div key={i} className="benefit-item group flex items-center gap-4 p-4 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors duration-500">
                  <div className="size-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="size-4 text-white/80" />
                  </div>
                  <div className="text-white/70 text-sm font-medium whitespace-pre-wrap">
                    {documentId ? (
                      <EditableText id={documentId} field={`benefits[${i}]`} value={benefit} as="span" />
                    ) : benefit}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* CALENDLY SECTION */}
          <div ref={rightRef} className="relative group">
            <div className="absolute -inset-4 bg-white/5 blur-3xl rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <Card
              className="relative rounded-[32px] overflow-hidden border border-white/10 backdrop-blur-2xl shadow-2xl"
              style={{ background: "rgba(255, 255, 255, 0.02)" }}
            >
              {/* Decorative Window Buttons */}
              <div className="flex items-center gap-1.5 px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                <div className="size-2 rounded-full bg-white/10" />
                <div className="size-2 rounded-full bg-white/10" />
                <div className="size-2 rounded-full bg-white/10" />
                <span className="ml-4 text-[10px] uppercase tracking-widest text-white/20 font-bold">Secure Booking Portal</span>
              </div>

              <div
                ref={calendlyRef}
                className="w-full h-[650px] md:h-[700px] scrollbar-hide"
                style={{ minWidth: "320px" }}
              />
            </Card>
          </div>
        </div>
      </main>

      <style jsx global>{`
        .calendly-inline-widget iframe {
          filter: invert(0.9) hue-rotate(120deg) contrast(0.9);
          border-radius: 0 0 32px 32px;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}
