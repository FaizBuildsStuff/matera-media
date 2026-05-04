"use client";

import React, { useRef } from "react";
import {
  X,
  Check,
  Video,
  Clapperboard,
  Users,
  DollarSign
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useVisualEditing } from "./visual-editing/VisualEditingProvider";
import { EditableText } from "./visual-editing/EditableText";
import { AddRemoveControls } from "./visual-editing/AddRemoveControls";

gsap.registerPlugin(ScrollTrigger);

interface Item {
  _key?: string;
  title: string;
  description?: string;
}

interface ProblemSolutionComparisonProps {
  problems: Item[];
  solutions: Item[];
  problemsLabel?: string;
  solutionsLabel?: string;
  problemsTitle?: string;
  solutionsTitle?: string;
  _documentId?: string;
  _sectionKey?: string;
}

const ProblemGraphic = () => {
  const hudRef = useRef(null);

  useGSAP(() => {
    gsap.to(".prob-ring", { rotation: -180, duration: 12, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".prob-ring-inner", { rotation: 360, duration: 20, repeat: -1, ease: "none" });
    // Removed blinking animation
  }, { scope: hudRef });

  return (
    <div ref={hudRef} className="relative w-full aspect-square max-w-[200px] mx-auto flex items-center justify-center">
      <div className="relative z-20 w-20 h-20 bg-red-500/5 rounded-full border border-red-500/20 flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.15)] backdrop-blur-sm">
        <div className="absolute inset-0 rounded-full bg-red-500/10 blur-xl" />
        <div className="relative z-30 w-12 h-12 flex items-center justify-center text-red-500/60">
          <X className="w-8 h-8 stroke-[2.5]" />
        </div>
      </div>
      <div className="prob-ring absolute w-[140px] h-[140px] border border-dashed border-red-500/20 rounded-full" />
      <div className="prob-ring-inner absolute w-[110px] h-[110px] border border-red-500/10 border-t-red-500/40 border-l-red-500/10 rounded-full" />
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <div className="absolute top-2 right-4 p-1.5 bg-black/40 backdrop-blur-md rounded-xl border border-red-500/20 text-red-400">
          <DollarSign className="w-4 h-4 opacity-40" />
        </div>
        <div className="absolute bottom-6 left-2 p-1.5 bg-black/40 backdrop-blur-md rounded-xl border border-red-500/20 text-red-400">
          <Users className="w-4 h-4 opacity-40" />
        </div>
        <div className="absolute top-1/2 -left-2 -translate-y-1/2 p-2 bg-red-500/20 rounded-full text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
          <X className="w-3 h-3 stroke-3" />
        </div>
      </div>
    </div>
  );
};

const HUDGraphic = () => {
  const hudRef = useRef(null);

  useGSAP(() => {
    gsap.to(".hud-ring", { rotation: 360, duration: 20, repeat: -1, ease: "none" });
    gsap.to(".hud-ring-inner", { rotation: -360, duration: 15, repeat: -1, ease: "none" });
    gsap.to(".hud-pulse", { scale: 1.1, opacity: 0.5, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut" });
  }, { scope: hudRef });

  return (
    <div ref={hudRef} className="relative w-full aspect-square max-w-[200px] mx-auto flex items-center justify-center">
      <div className="relative z-20 w-20 h-20 bg-emerald-500/5 rounded-full border border-emerald-500/20 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.15)] backdrop-blur-sm">
        <div className="hud-pulse absolute inset-0 rounded-full bg-emerald-500/10 blur-xl" />
        <div className="relative z-30 w-12 h-12 flex items-center justify-center">
          <img src="/Logo.png" alt="Logo" className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
        </div>
      </div>
      <div className="hud-ring absolute w-[140px] h-[140px] border border-dashed border-emerald-500/20 rounded-full" />
      <div className="hud-ring-inner absolute w-[110px] h-[110px] border border-emerald-500/10 border-t-emerald-500/40 rounded-full" />
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <div className="absolute top-4 left-4 p-1.5 bg-black/40 backdrop-blur-md rounded-xl border border-emerald-500/20 text-emerald-400">
          <Video className="w-4 h-4" />
        </div>
        <div className="absolute bottom-4 right-4 p-1 bg-emerald-500 rounded-full text-black shadow-[0_0_15px_rgba(16,185,129,0.5)]">
          <Check className="w-3 h-3 stroke-3" />
        </div>
        <div className="absolute top-1/2 -right-1 -translate-y-1/2 p-1.5 bg-black/40 backdrop-blur-md rounded-xl border border-emerald-500/20 text-emerald-400">
          <Clapperboard className="w-4 h-4" />
        </div>
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-5 h-5 rounded-full border border-emerald-500/30 bg-emerald-950/50 overflow-hidden">
              <div className="w-full h-full bg-emerald-500/10 flex items-center justify-center">
                <Users className="w-2.5 h-2.5 text-emerald-500/40" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ProblemSolutionComparison = ({
  problems: originalProblems,
  solutions: originalSolutions,
  problemsLabel = "The Problem",
  solutionsLabel = "The Matera Solution",
  problemsTitle = "Old Way",
  solutionsTitle = "Dominate Media",
  _documentId,
  _sectionKey
}: ProblemSolutionComparisonProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { getLiveItems } = useVisualEditing();

  const getPath = (field: string) => _sectionKey ? `sections[_key == "${_sectionKey}"].${field}` : field;

  const problems = getLiveItems(_documentId || "", getPath("problems"), originalProblems);
  const solutions = getLiveItems(_documentId || "", getPath("solutions"), originalSolutions);

  useGSAP(() => {
    gsap.to(".gsap-bg-text", {
      xPercent: -20, ease: "none", force3D: true,
      scrollTrigger: { trigger: containerRef.current, start: "top bottom", end: "bottom top", scrub: 0.5 }
    });
    gsap.fromTo(".gsap-spine", { scaleY: 0 }, {
      scaleY: 1, ease: "none",
      scrollTrigger: { trigger: containerRef.current, start: "top 60%", end: "bottom 30%", scrub: true }
    });
    gsap.utils.toArray('.gsap-orb').forEach((el: any, i) => {
      gsap.to(el, {
        x: "random(-100, 100)",
        y: "random(-100, 100)",
        duration: "random(10, 20)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-24 px-6 bg-[#05180D] overflow-hidden" style={{ perspective: "1000px" }}>
      {/* Top & Bottom Glowing Border Mixers */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-linear-to-r from-transparent via-emerald-500/20 to-transparent z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[40px] bg-emerald-500/5 blur-[30px] rounded-full z-10 pointer-events-none" />

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-linear-to-r from-transparent via-emerald-500/20 to-transparent z-10" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[40px] bg-emerald-500/5 blur-[30px] rounded-full z-10 pointer-events-none" />

      {/* Background Elements Container with Vertical Masking */}
      <div className="absolute inset-0 z-0 pointer-events-none"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)'
        }}>

        {/* Technical Grid Overlay */}
        <div className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(16,185,129,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(16,185,129,0.05) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Dynamic Ambient Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="gsap-orb absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-emerald-500/15 blur-[120px] rounded-full" />
          <div className="gsap-orb absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-emerald-400/10 blur-[150px] rounded-full" />
          <div className="gsap-orb absolute top-[40%] right-[20%] w-[300px] h-[300px] bg-emerald-600/5 blur-[100px] rounded-full" />
        </div>

        {/* Parallax Background Text */}
        <div className="absolute inset-0 flex flex-col justify-around overflow-hidden opacity-[0.03] select-none">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className={`gsap-bg-text whitespace-nowrap font-black text-[12vh] md:text-[18vh] leading-none text-white uppercase tracking-[0.1em] ${i % 2 === 0 ? 'ml-[-20%]' : 'ml-[20%]'}`} style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}>
              MATERA MEDIA • DOMINATE YOUR MARKET • MATERA MEDIA • DOMINATE YOUR MARKET
            </div>
          ))}
        </div>

        {/* Subtle Grain Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />
      </div>

      {/* Central Spine (The 'Middle' Separator) */}
      <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/5 z-0 -translate-x-1/2">
        <div className="gsap-spine w-full h-full bg-linear-to-b from-transparent via-emerald-500/30 to-transparent origin-top shadow-[0_0_20px_rgba(16,185,129,0.1)]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-stretch">

          {/* --- PROBLEM CARD --- */}
          <div className="gsap-problem-card group relative flex flex-col p-6 md:p-8 rounded-[2rem] bg-red-950/20 border border-red-500/10 shadow-[0_0_80px_rgba(220,38,38,0.05)] hover:border-red-500/20 transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay rounded-[2.5rem] pointer-events-none" />
            <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-red-500/5 blur-[80px] rounded-full pointer-events-none" />

            <div className="h-40 md:h-48 flex items-center justify-center relative z-10 mix-blend-screen">
              <ProblemGraphic />
            </div>

            <div className="mt-8 relative z-10">
              <div className="flex justify-between items-center mb-3">
                <span className="text-red-500 text-[10px] font-black tracking-[0.3em] block uppercase opacity-80 border border-red-500/20 rounded-full px-3 py-1 w-fit bg-red-500/5">
                  {_documentId ? (
                    <EditableText id={_documentId} field={getPath("problemsLabel")} value={problemsLabel} as="span" />
                  ) : problemsLabel}
                </span>
                {_documentId && (
                  <AddRemoveControls
                    id={_documentId}
                    field={getPath("problems")}
                    label="Problem"
                    fields={[
                      { name: "title", label: "Problem Title", type: "string", placeholder: "e.g. Low conversion rates" },
                      { name: "description", label: "Problem Description", type: "text", placeholder: "Describe the pain point..." }
                    ]}
                  />
                )}
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tighter mb-6">
                {_documentId ? (
                  <EditableText id={_documentId} field={getPath("problemsTitle")} value={problemsTitle} as="span" />
                ) : problemsTitle}
              </h2>

              <ul className="space-y-4">
                {problems.map((item: any, i: number) => (
                  <li key={item._key || i} className="gsap-problem-item flex items-start gap-4 p-3 rounded-2xl bg-red-950/20 border border-red-500/5 hover:border-red-500/20 transition-all duration-300 group/item">
                    <div className="mt-1 w-6 h-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 text-red-400">
                      <X className="w-3 h-3" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-white/90 text-base font-bold tracking-tight mb-1">
                          {_documentId ? (
                            <EditableText id={_documentId} field={`${getPath("problems")}[_key == "${item._key}"].title`} value={item.title} as="span" />
                          ) : item.title}
                        </h4>
                        {_documentId && (
                          <AddRemoveControls
                            id={_documentId}
                            field={getPath("problems")}
                            itemKey={item._key}
                            label="Problem"
                            initialData={item}
                            fields={[
                              { name: "title", label: "Problem Title", type: "string", placeholder: "e.g. Low conversion rates" },
                              { name: "description", label: "Problem Description", type: "text", placeholder: "Describe the pain point..." }
                            ]}
                            className="opacity-0 group-hover/item:opacity-100 transition-opacity shrink-0"
                          />
                        )}
                      </div>
                      {item.description && (
                        <div className="text-white/40 text-[13px] font-medium leading-relaxed">
                          {_documentId ? (
                            <EditableText id={_documentId} field={`${getPath("problems")}[_key == "${item._key}"].description`} value={item.description} />
                          ) : item.description}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* --- SOLUTION CARD --- */}
          <div className="gsap-solution-card group relative flex flex-col p-6 md:p-8 rounded-[2rem] bg-emerald-950/20 border border-emerald-500/20 shadow-[0_0_80px_rgba(16,185,129,0.05)] overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay rounded-[2.5rem] pointer-events-none" />
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />

            <div className="h-40 md:h-48 flex items-center justify-center relative z-10 mix-blend-screen">
              <HUDGraphic />
            </div>

            <div className="mt-8 relative z-10">
              <div className="flex justify-between items-center mb-3">
                <span className="text-emerald-400 text-[10px] font-black tracking-[0.3em] block uppercase border border-emerald-500/20 rounded-full px-3 py-1 w-fit bg-emerald-500/5 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                  {_documentId ? (
                    <EditableText id={_documentId} field={getPath("solutionsLabel")} value={solutionsLabel} as="span" />
                  ) : solutionsLabel}
                </span>
                {_documentId && (
                  <AddRemoveControls
                    id={_documentId}
                    field={getPath("solutions")}
                    label="Solution"
                    fields={[
                      { name: "title", label: "Solution Title", type: "string", placeholder: "e.g. High-performance creative" },
                      { name: "description", label: "Solution Description", type: "text", placeholder: "Describe how we solve it..." }
                    ]}
                  />
                )}
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tighter mb-6">
                {_documentId ? (
                  <EditableText id={_documentId} field={getPath("solutionsTitle")} value={solutionsTitle} as="span" />
                ) : solutionsTitle}
              </h2>

              <ul className="space-y-4">
                {solutions.map((item: any, i: number) => (
                  <li key={item._key || i} className="gsap-solution-item flex items-start gap-4 p-3 rounded-2xl bg-emerald-950/30 border border-emerald-500/10 hover:border-emerald-500/30 hover:bg-emerald-900/20 transition-all duration-300 group/item">
                    <div className="mt-1 w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                      <Check className="w-3 h-3 text-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-white text-base font-bold tracking-tight mb-1">
                          {_documentId ? (
                            <EditableText id={_documentId} field={`${getPath("solutions")}[_key == "${item._key}"].title`} value={item.title} as="span" />
                          ) : item.title}
                        </h4>
                        {_documentId && (
                          <AddRemoveControls
                            id={_documentId}
                            field={getPath("solutions")}
                            itemKey={item._key}
                            label="Solution"
                            initialData={item}
                            fields={[
                              { name: "title", label: "Solution Title", type: "string", placeholder: "e.g. High-performance creative" },
                              { name: "description", label: "Solution Description", type: "text", placeholder: "Describe how we solve it..." }
                            ]}
                            className="opacity-0 group-hover/item:opacity-100 transition-opacity shrink-0"
                          />
                        )}
                      </div>
                      {item.description && (
                        <div className="text-white/60 text-[13px] font-medium leading-relaxed">
                          {_documentId ? (
                            <EditableText id={_documentId} field={`${getPath("solutions")}[_key == "${item._key}"].description`} value={item.description} />
                          ) : item.description}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
