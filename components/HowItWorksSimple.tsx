"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Search, Calendar, Camera, LucideIcon } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useVisualEditing } from "./visual-editing/VisualEditingProvider";
import { EditableText } from "./visual-editing/EditableText";
import { AddRemoveControls } from "./visual-editing/AddRemoveControls";

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  search: Search,
  calendar: Calendar,
  camera: Camera,
};

const HUDIcon = ({ icon }: { icon?: string }) => {
  const IconComponent = icon ? ICON_MAP[icon.toLowerCase()] : null;

  return (
    <div className="relative w-16 h-16 mb-8 z-10">
      <div className="absolute inset-0 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm" />
      <div className="absolute inset-0 rounded-2xl bg-white/5 blur-xl" />
      <div className="relative w-full h-full flex items-center justify-center text-white/80/60 group-hover:text-white/80 transition-colors">
        {IconComponent ? (
          <IconComponent className="w-7 h-7" />
        ) : (
          <div className="w-7 h-7 rounded-full border border-white/20 bg-white/10" />
        )}
      </div>
    </div>
  );
};

interface Step {
  _key?: string;
  title: string;
  description: string;
  icon?: string;
}

interface HowItWorksSimpleProps {
  data: {
    active?: boolean;
    badge?: string;
    title?: string;
    highlight?: string;
    subtitle?: string;
    steps?: Step[];
  };
  _documentId?: string;
  _sectionKey?: string;
}

export const HowItWorksSimple = ({ data, _documentId, _sectionKey }: HowItWorksSimpleProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { getLiveItems } = useVisualEditing();

  const { badge, title, highlight, subtitle, steps: originalSteps } = data || {};
  const steps = getLiveItems(_documentId || "", _sectionKey ? `sections[_key == "${_sectionKey}"].howItWorksSimple.steps` : "howItWorksSimple.steps", originalSteps);

  useGSAP(() => {
    // 1. Staggered Card Reveal
    gsap.fromTo(".gsap-step-card",
      { opacity: 0, y: 40, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      }
    );

    // 2. Ambient Elements Parallax
    gsap.to(".gsap-how-ambient", {
      yPercent: -40,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative -mt-px py-32 px-6  selection:bg-white/30">

      {/* Seamless Blending Masks */}
      {/* Top fade removed for glow bleed */}
      {/* Bottom fade removed for glow bleed */}

      {/* GSAP Ambient Floating Parallax Graphics */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="gsap-how-ambient absolute top-[10%] left-[10%] w-[400px] h-[400px] bg-emerald-500/[0.12] blur-[140px] rounded-full pointer-events-none z-0" />
        <div className="gsap-how-ambient absolute top-[40%] right-[10%] w-[300px] h-[300px] bg-blue-600/[0.15] blur-[100px] rounded-full pointer-events-none z-0" />
        <div className="gsap-how-ambient absolute bottom-[10%] left-[30%] w-[500px] h-[500px] bg-purple-500/[0.12] blur-[150px] rounded-full pointer-events-none z-0" />
        <div className="gsap-how-ambient absolute top-[60%] left-[5%] w-[250px] h-[250px] bg-emerald-500/[0.12] blur-[80px] rounded-full" />
        <div className="gsap-how-ambient absolute top-[20%] left-[20%] text-white/10 text-2xl font-light">+</div>
        <div className="gsap-how-ambient absolute top-[70%] right-[15%] text-white/10 text-3xl font-light">+</div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 text-center">

        {/* Aesthetic Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/20 bg-white/5 mb-10 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-white text-black mr-2.5 animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
          <span className="text-white text-[10px] font-black tracking-[0.3em] uppercase">
            {_documentId ? (
              <EditableText id={_documentId} field="howItWorksSimple.badge" value={badge || "How it works"} as="span" />
            ) : (badge || "How it works")}
          </span>
        </motion.div>

        {/* Heading */}
        <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.05] mb-8 max-w-4xl mx-auto flex flex-wrap justify-center">
          {_documentId ? (
            <EditableText id={_documentId} field="howItWorksSimple.title" value={title || "Getting started is simple."} />
          ) : (
            title || "Getting started is simple."
          )}
        </h2>

        {/* Subtitle */}
        <div className="text-white/40 text-lg md:text-xl font-normal mb-16 max-w-2xl mx-auto italic">
          {_documentId ? (
            <EditableText id={_documentId} field="howItWorksSimple.subtitle" value={subtitle || "You get on camera, we handle the rest"} />
          ) : (
            subtitle || "You get on camera, we handle the rest"
          )}
        </div>

        {/* Add Step Control */}
        {_documentId && (
          <div className="flex justify-center mb-10">
            <AddRemoveControls
              id={_documentId}
              field="howItWorksSimple.steps"
              label="Step"
              fields={[
                { name: "title", label: "Step Title", type: "string", placeholder: "e.g. Strategy Phase" },
                { name: "description", label: "Step Description", type: "text", placeholder: "Describe what happens..." }
              ]}
            />
          </div>
        )}

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {(steps || [
            { title: "Brand Audit", description: "We get to know you—your voice, your vision, and what kind of content will actually move the needle.", icon: "search" },
            { title: "Content Calendar", description: "We build a tailored content roadmap + fill your calendar with viral-ready ideas and scripts that sound like you.", icon: "calendar" },
            { title: "Full Production", description: "You record—we turn it into scroll-stopping videos, publish across all platforms, and fuel it with SEO.", icon: "camera" }
          ]).map((step: any, i: number) => {
            return (
              <div
                key={step._key || i}
                className="gsap-step-card relative p-10 md:p-12 rounded-[2.5rem] border border-white/5 bg-white/2 text-left group hover:border-white/20 transition-all duration-500 hover:bg-white/4 backdrop-blur-3xl overflow-hidden"
              >
                {/* Premium Texture Overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none rounded-[2.5rem]" />

                {/* Step Number Glowing Node + Remove Button */}
                <div className="absolute top-0 right-10 -translate-y-1/2 flex flex-col items-center gap-2">
                  <div className="h-20 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                  <div className="w-10 h-10 rounded-full bg-[#111] border border-white/20 flex items-center justify-center text-white/80 text-xs font-black z-20 shadow-[0_0_20px_rgba(255,255,255,0.2)] group-hover:scale-110 group-hover:border-white/20/60 transition-transform">
                    {i + 1}
                  </div>
                  {_documentId && (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <AddRemoveControls
                        id={_documentId}
                        field="howItWorksSimple.steps"
                        itemKey={step._key}
                        label="Step"
                        initialData={step}
                        fields={[
                          { name: "title", label: "Step Title", type: "string", placeholder: "e.g. Strategy Phase" },
                          { name: "description", label: "Step Description", type: "text", placeholder: "Describe what happens..." }
                        ]}
                      />
                    </div>
                  )}
                </div>

                {/* HUD Icon Illustration */}
                <HUDIcon icon={step.icon} />

                {/* Text Content */}
                <div className="relative z-10">
                  <h3 className="text-white text-2xl font-bold mb-4 tracking-tight group-hover:text-white/80 transition-colors">
                    {_documentId ? (
                      <EditableText id={_documentId} field={`howItWorksSimple.steps[_key == "${step._key}"].title`} value={step.title} as="span" />
                    ) : step.title}
                  </h3>
                  <div className="text-white/30 leading-relaxed font-normal text-sm md:text-base group-hover:text-white/40 transition-colors">
                    {_documentId ? (
                      <EditableText id={_documentId} field={`howItWorksSimple.steps[_key == "${step._key}"].description`} value={step.description} />
                    ) : step.description}
                  </div>
                </div>

                {/* Bottom Accent Decor */}
                <div className="absolute bottom-4 right-8 text-white/10 text-4xl font-light select-none">
                  0{i + 1}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
