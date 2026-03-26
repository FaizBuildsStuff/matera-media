"use client";

import Image from "next/image";
import { useEffect } from "react";

const DEFAULT_CALENDLY_URL =
  "https://calendly.com/m-faizurrehman-crypto/30min?primary_color=10b981&background_color=05180D&text_color=ffffff&hide_landing_page_details=1&hide_gdpr_banner=1";

type ServiceCalendlyProps = {
  content?: {
    title?: string;
    subtitle?: string;
    calendlyUrl?: string;
    highlightedWord?: string;
  };
};

export function ServiceCalendly({ content }: ServiceCalendlyProps) {
  const title = content?.title ?? "Let's start a conversation.";
  const subtitle = content?.subtitle ?? "Choose a time below to discuss how we can help your business.";
  const calendlyUrl = content?.calendlyUrl || DEFAULT_CALENDLY_URL;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section
      id="schedule"
      className="relative py-40 px-6 bg-[#05180D] overflow-hidden"
    >
      <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,700,900&display=swap" rel="stylesheet" />
      {/* Background Patterns */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[180px] bg-emerald-500/12 pointer-events-none" />
      <div className="absolute top-20 right-20 w-[280px] h-[280px] bg-teal-400/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="flex justify-center mb-10">
          <Image
            src="/Logo.png"
            alt="Matera Media"
            width={80}
            height={80}
            className="opacity-90"
          />
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4 whitespace-pre-wrap">
            {title}
          </h2>
          <p className="text-white/60 text-lg whitespace-pre-wrap">
            {content?.highlightedWord ? (
              subtitle.split(new RegExp("(" + content.highlightedWord + ")", "gi")).map((part, i) =>
                part.toLowerCase() === content.highlightedWord!.toLowerCase() ? (
                  <span 
                    key={i} 
                    className="text-emerald-400 font-medium" 
                    style={{ 
                      fontFamily: "'Satoshi', sans-serif", 
                      fontStyle: "italic", 
                      textShadow: "0 0 25px rgba(52, 211, 153, 0.25)" 
                    }}>
                    {part}
                  </span>
                ) : (
                  part
                )
              )
            ) : (
              subtitle
            )}
          </p>
        </div>

        {/* --- SCROLLBAR FIX WRAPPER --- */}
        <div className="relative min-h-[960px] overflow-hidden">
          {/* Loading State */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none">
            <div className="w-8 h-8 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-4" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-500/40 font-bold">
              Loading Calendar
            </span>
          </div>

          {/* Calendly Inline Widget with forced hidden overflow */}
          <div
            className="calendly-inline-widget w-full relative z-10"
            data-url={calendlyUrl}
            style={{ 
              minWidth: "320px", 
              height: "960px", 
              overflow: "hidden" 
            }}
          />
        </div>
      </div>
    </section>
  );
}