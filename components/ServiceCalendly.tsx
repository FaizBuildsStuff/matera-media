"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { EditableText } from "./visual-editing/EditableText";
import { EditableButton } from "./visual-editing/EditableButton";

const DEFAULT_CALENDLY_URL =
  "https://calendly.com/m-faizurrehman-crypto/30min?primary_color=10b981&background_color=05180D&text_color=ffffff&hide_landing_page_details=1&hide_gdpr_banner=1";

type ServiceCalendlyProps = {
  content?: {
    title?: string;
    subtitle?: string;
    calendlyUrl?: string;
    highlightedWord?: string;
    _documentId?: string;
  };
};

export function ServiceCalendly({ content }: ServiceCalendlyProps) {
  const documentId = content?._documentId;
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
      className="relative py-40 px-6 "
    >
      <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,700,900&display=swap" rel="stylesheet" />
      {/* Background Patterns */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[95%] h-[400px] bg-emerald-600/[0.15] blur-[220px] rounded-[100%] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[60%] h-[500px] bg-lime-500/[0.1] blur-[180px] rounded-[100%] pointer-events-none" />
      <div className="absolute bottom-[0%] left-[-10%] w-[60%] h-[400px] bg-green-500/[0.1] blur-[200px] rounded-[100%] pointer-events-none" />

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
            {documentId ? (
              <EditableText id={documentId} field="calendlyTitle" value={title} as="span" />
            ) : title}
          </h2>
          <div className="text-white/60 text-lg whitespace-pre-wrap">
            {documentId ? (
              <EditableText id={documentId} field="calendlySubtitle" value={subtitle} />
            ) : (
              content?.highlightedWord ? (
                subtitle.split(new RegExp("(" + content.highlightedWord + ")", "gi")).map((part, i) =>
                  part.toLowerCase() === content.highlightedWord!.toLowerCase() ? (
                    <span
                      key={i}
                      className="text-white/80 font-medium"
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
              )
            )}
          </div>
          
        </div>

        {/* --- SCROLLBAR FIX WRAPPER --- */}
        <div className="relative min-h-[960px] overflow-hidden">
          {/* Loading State */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mb-4" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">
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
