"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useVisualEditing } from "./visual-editing/VisualEditingProvider";
import { EditableText } from "./visual-editing/EditableText";
import { AddRemoveControls } from "./visual-editing/AddRemoveControls";

gsap.registerPlugin(ScrollTrigger);

interface ProcessStep {
  _key: string;
  name: string;
  desc: string;
}

interface ProcessSectionProps {
  data?: {
    processLabel?: string;
    processTitle?: string;
    processSteps?: ProcessStep[];
  };
  documentId?: string;
}

export const ProcessSection = ({ data, documentId }: ProcessSectionProps) => {
  const container = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const { getLiveItems, getLiveValue } = useVisualEditing();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(lineRef.current, { scaleX: 0, scaleY: 0, transformOrigin: "top left" }, {
        scaleX: 1, scaleY: 1, ease: "none",
        scrollTrigger: { trigger: container.current, start: "top 40%", end: "bottom 60%", scrub: 1 }
      });
    }, container);
    return () => ctx.revert();
  }, []);

  const label = getLiveValue(documentId || "", "processLabel", data?.processLabel || "The Workflow");
  const title = getLiveValue(documentId || "", "processTitle", data?.processTitle || "the system");
  const originalSteps = data?.processSteps || [];
  const steps = getLiveItems(documentId || "", "processSteps", originalSteps);

  return (
    <section ref={container} className="relative -mt-px py-12 md:py-16 px-6  border-none z-10">
      {/* Fades disabled to allow glow bleed */}
      {/* Intense Nebula Beam Design */}
      <div className="absolute top-[10%] left-[-10%] w-[110%] h-[500px] bg-emerald-600/[0.1] blur-[160px] rounded-[100%] rotate-[-12deg] pointer-events-none z-0" />
      <div className="absolute bottom-[0%] right-[-10%] w-[80%] h-[400px] bg-lime-400/[0.08] blur-[140px] rounded-[100%] rotate-[15deg] pointer-events-none z-0" />
      <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-emerald-400/[0.12] blur-[110px] rounded-full pointer-events-none z-0 animate-pulse" />

      <div className="max-w-7xl mx-auto relative z-30">
        <div className="mb-16 md:mb-20">
          <div className="flex justify-between items-center mb-3">
            <div className="text-white text-[10px] font-bold tracking-[0.4em] uppercase">
              {documentId ? (
                <EditableText id={documentId} field="processLabel" value={label} as="span" />
              ) : label}
            </div>
            {documentId && (
              <AddRemoveControls
                id={documentId}
                field="processSteps"
                label="Step"
                fields={[
                  { name: "name", label: "Step Name", type: "string", placeholder: "e.g. Discovery Call" },
                  { name: "desc", label: "Step Description", type: "text", placeholder: "Describe what happens in this step..." }
                ]}
              />
            )}
          </div>
          <h2 className="text-5xl md:text-7xl text-white font-bold tracking-tight leading-none italic">
            {documentId ? (
              <EditableText id={documentId} field="processTitle" value={title} as="span" />
            ) : title}
          </h2>
        </div>

        <div className="relative">
          <div ref={lineRef} className="absolute top-0 left-0 md:w-full md:h-px w-[2px] h-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.6)] z-10" />
          <div className="absolute top-0 left-0 md:w-full md:h-px w-[2px] h-full bg-white/5" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12">
            {steps.map((step: any, i: number) => (
              <div key={step._key || i} className="pt-10 md:pt-14 relative group pl-8 md:pl-0">
                <div className="absolute top-0 left-[-7px] md:left-0 md:-translate-y-1/2 w-3.5 h-3.5 rounded-full bg-lime-400 border-4 border-[#051A0E] z-20 group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(163,230,53,0.5)]" />

                <div className="flex justify-between items-start mb-3">
                  <span className="text-white font-bold text-[9px] tracking-widest block uppercase opacity-50 group-hover:opacity-100 transition-opacity">Step 0{i + 1}</span>
                  {documentId && (
                    <AddRemoveControls
                      id={documentId}
                      field="processSteps"
                      itemKey={step._key}
                      label="Step"
                      initialData={step}
                      fields={[
                        { name: "name", label: "Step Name", type: "string", placeholder: "e.g. Discovery Call" },
                        { name: "desc", label: "Step Description", type: "text", placeholder: "Describe what happens in this step..." }
                      ]}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  )}
                </div>

                <h3 className="text-white text-xl md:text-2xl font-bold mb-4 tracking-tight group-hover:text-white/80 transition-colors whitespace-pre-wrap">
                  {documentId ? (
                    <EditableText id={documentId} field={`processSteps[_key == "${step._key}"].name`} value={step.name} as="span" />
                  ) : step.name}
                </h3>
                <div className="text-white/40 leading-relaxed font-normal text-sm md:text-base group-hover:text-white/60 transition-colors whitespace-pre-wrap">
                  {documentId ? (
                    <EditableText id={documentId} field={`processSteps[_key == "${step._key}"].desc`} value={step.desc} />
                  ) : step.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Bottom fade disabled to allow glow bleed */}
    </section>
  );
};
