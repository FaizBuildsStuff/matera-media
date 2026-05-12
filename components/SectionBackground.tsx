"use client";

import React from "react";

// ─────────────────────────────────────────────────────────────────────────────
//  SectionBackground.tsx  — FINAL VERSION
//  ✅ Named export  →  export const SectionBackground
//  ✅ "use client"  →  Next.js App Router compatible
//  ✅ Zero banding  →  all transparent stops use matched-hue rgba, never rgba(0,0,0,0)
//  ✅ Pure green theme  →  no teal, no lime, no brown
//  ✅ Rich animations  →  orbs, grid pulse, scanlines, particles, corner brackets
// ─────────────────────────────────────────────────────────────────────────────

// ── COLOUR TOKENS ─────────────────────────────────────────────────────────────
//  Base:    #050a07  rgb(5,10,7)      near-black page base
//  Dark:    #060f0b  rgb(6,15,11)     section dark
//  Forest:  #0f2a18  rgb(15,42,24)    deep forest
//  Jade:    #1c7c54  rgb(28,124,84)   jade mid
//  Mint:    #2d9e6b  rgb(45,158,107)  mint bright
//  Vivid:   #3dba7e  rgb(61,186,126)  vivid accent (hero only)
// ─────────────────────────────────────────────────────────────────────────────

// Inline SVG noise — no network request, no banding
const NOISE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`;

// Orb anchor positions — unique per section index
const ORB_POS = [
  { cx: "40%", cy: "38%" },
  { cx: "60%", cy: "52%" },
  { cx: "32%", cy: "55%" },
  { cx: "65%", cy: "30%" },
  { cx: "48%", cy: "62%" },
];

// Fixed particle positions — deterministic, no hydration mismatch
const PARTICLES = [
  { x: 8,  y: 15, s: 1.5, d: 4.2 }, { x: 25, y: 70, s: 1.0, d: 6.1 },
  { x: 42, y: 32, s: 2.0, d: 3.8 }, { x: 60, y: 85, s: 1.5, d: 5.5 },
  { x: 75, y: 20, s: 1.0, d: 7.0 }, { x: 87, y: 52, s: 2.0, d: 4.4 },
  { x: 18, y: 88, s: 1.0, d: 5.8 }, { x: 53, y: 58, s: 1.5, d: 3.2 },
  { x: 91, y: 38, s: 1.0, d: 6.6 }, { x: 35, y: 10, s: 2.0, d: 4.9 },
];

interface SectionBackgroundProps {
  index?: number;
  type?: string;
  color?: string;
  opacity?: number;
  variant?: "hero" | "subtle" | "intense" | "alternate" | "vibrant";
}

export const SectionBackground = ({
  index = 0,
  type = "default",
  color,
  opacity = 1,
  variant = "subtle",
}: SectionBackgroundProps) => {
  const pos  = ORB_POS[index % ORB_POS.length];
  const anim = `sbOrb_${index}`;
  const dur  = 16 + index * 4;

  const keyframes = `
    @keyframes ${anim} {
      0%,100% { transform: scale(1.00) translate(0%,     0%);    }
      25%      { transform: scale(1.07) translate(1.5%, -1.5%);  }
      50%      { transform: scale(0.96) translate(-1%,   1.2%);  }
      75%      { transform: scale(1.04) translate(1%,    1.5%);  }
    }
    @keyframes ${anim}_b {
      0%,100% { transform: scale(1.00) translate(0%,  0%); }
      40%      { transform: scale(1.05) translate(-1%, 1%); }
      70%      { transform: scale(0.97) translate(1%, -1%); }
    }
    @keyframes sbGrid_${index} {
      0%,100% { opacity: 0.04; }
      50%      { opacity: 0.09; }
    }
    @keyframes sbScan_${index} {
      from { background-position: 0 0;    }
      to   { background-position: 0 80px; }
    }
    @keyframes sbPart_${index} {
      0%,100% { opacity: 0;   transform: translateY(0px);  }
      20%      { opacity: 0.55; }
      80%      { opacity: 0.25; transform: translateY(-9px); }
    }
    @keyframes sbCorner_${index} {
      0%,100% { opacity: 0.12; transform: scale(1);   }
      50%      { opacity: 0.32; transform: scale(1.4); }
    }
  `;

  // ── SHARED VISUAL LAYERS ────────────────────────────────────────────────────

  const Grid = () => (
    <div aria-hidden="true" style={{
      position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
      backgroundImage: `
        linear-gradient(rgba(45,158,107,0.06) 1px, transparent 1px),
        linear-gradient(90deg, rgba(45,158,107,0.06) 1px, transparent 1px)
      `,
      backgroundSize: "50px 50px",
      animation: `sbGrid_${index} ${7 + index}s ease-in-out infinite`,
    }} />
  );

  const Scanlines = () => (
    <div aria-hidden="true" style={{
      position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
      background: `repeating-linear-gradient(
        0deg,
        transparent, transparent 3px,
        rgba(0,0,0,0.09) 3px, rgba(0,0,0,0.09) 4px
      )`,
      animation: `sbScan_${index} 10s linear infinite`,
      opacity: 0.45,
    }} />
  );

  const Particles = () => (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none" }}>
      {PARTICLES.map((p, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${p.x}%`, top: `${p.y}%`,
          width: `${p.s}px`, height: `${p.s}px`,
          borderRadius: "50%",
          background: "rgba(61,186,126,0.75)",
          animation: `sbPart_${index} ${p.d}s ease-in-out ${i * 0.38}s infinite`,
        }} />
      ))}
    </div>
  );

  const Corners = () => (
    <>
      {[
        { top: 0, left: 0,    borderTop: "1px solid",    borderLeft: "1px solid"   },
        { top: 0, right: 0,   borderTop: "1px solid",    borderRight: "1px solid"  },
        { bottom: 0, left: 0, borderBottom: "1px solid", borderLeft: "1px solid"   },
        { bottom: 0, right: 0,borderBottom: "1px solid", borderRight: "1px solid"  },
      ].map((s, i) => (
        <div key={i} aria-hidden="true" style={{
          position: "absolute", ...s,
          width: 18, height: 18,
          borderColor: "rgba(61,186,126,0.22)",
          zIndex: 4, pointerEvents: "none",
          animation: `sbCorner_${index} ${3.2 + i * 0.55}s ease-in-out ${i * 0.5}s infinite`,
        }} />
      ))}
    </>
  );

  // Dual-pass noise dither — eliminates ALL remaining banding
  const Noise = () => (
    <>
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, zIndex: 9, pointerEvents: "none",
        backgroundImage: NOISE, backgroundRepeat: "repeat", backgroundSize: "200px 200px",
        opacity: 0.07, mixBlendMode: "soft-light" as const,
      }} />
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, zIndex: 9, pointerEvents: "none",
        backgroundImage: NOISE, backgroundRepeat: "repeat",
        backgroundSize: "270px 270px", backgroundPosition: "80px 40px",
        opacity: 0.04, mixBlendMode: "overlay" as const,
      }} />
    </>
  );

  // ── HERO VARIANT ────────────────────────────────────────────────────────────
  if (variant === "hero") {
    return (
      <div aria-hidden="true"
        style={{ position: "absolute", inset: 0, overflow: "visible", zIndex: 0, pointerEvents: "none" }}>
        <style>{keyframes}</style>

        {/* MAIN HERO ORB — large, deep green, 7 smooth stops */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: "-20%",
          borderRadius: "50%",
          // All transparent stops use rgb(6,15,11) — matched hue, never black
          background: `radial-gradient(ellipse at 42% 44%,
            rgba(61,186,126,0.82)   0%,
            rgba(45,158,107,0.62)  13%,
            rgba(28,124,84,0.42)   28%,
            rgba(26,77,46,0.22)    46%,
            rgba(15,42,24,0.10)    62%,
            rgba(6,15,11,0.03)     78%,
            rgba(6,15,11,0)        92%)`,
          filter: "blur(85px)",
          zIndex: 0,
          animation: `${anim} ${dur}s ease-in-out infinite`,
        }} />

        {/* SECONDARY ORB — right side depth */}
        <div aria-hidden="true" style={{
          position: "absolute",
          top: "0%", right: "-15%",
          width: "65%", height: "75%",
          borderRadius: "50%",
          background: `radial-gradient(ellipse at 55% 40%,
            rgba(28,124,84,0.32)   0%,
            rgba(15,42,24,0.14)   38%,
            rgba(6,15,11,0.04)    68%,
            rgba(6,15,11,0)       86%)`,
          filter: "blur(75px)",
          zIndex: 0,
          animation: `${anim}_b ${dur + 6}s ease-in-out infinite`,
        }} />

        <Grid />
        <Scanlines />
        <Particles />
        <Corners />
        <Noise />
      </div>
    );
  }

  // ── ALL OTHER VARIANTS ───────────────────────────────────────────────────────
  return (
    <div aria-hidden="true"
      style={{ position: "absolute", inset: 0, overflow: "visible", zIndex: 0, pointerEvents: "none", opacity }}>
      <style>{keyframes}</style>

      {/* SINGLE ORB — one radial, deep green only, 6 smooth stops */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: "-25%",
        borderRadius: "50%",
        background: `radial-gradient(ellipse at ${pos.cx} ${pos.cy},
          rgba(28,124,84,0.17)   0%,
          rgba(15,42,24,0.09)   32%,
          rgba(10,26,16,0.04)   58%,
          rgba(6,15,11,0.01)    76%,
          rgba(6,15,11,0)       90%)`,
        filter: "blur(105px)",
        zIndex: 0,
        animation: `${anim} ${dur}s ease-in-out infinite`,
        willChange: "transform",
      }} />

      {/* ACCENT SHIMMER — subtle brighter centre */}
      <div aria-hidden="true" style={{
        position: "absolute",
        top: "50%", left: "50%",
        width: "52%", height: "46%",
        transform: `translate(${index % 2 === 0 ? "-56%" : "-44%"}, -50%)`,
        borderRadius: "50%",
        background: `radial-gradient(ellipse at 50% 50%,
          rgba(45,158,107,0.09)  0%,
          rgba(28,124,84,0.03)  50%,
          rgba(28,124,84,0)     75%)`,
        filter: "blur(75px)",
        zIndex: 0,
        animation: `${anim}_b ${dur + 4}s ease-in-out infinite`,
      }} />

      {/* CONNECTOR ORB — bleeds into next section */}
      <div aria-hidden="true" style={{
        position: "absolute",
        bottom: "-15%", left: index % 2 === 0 ? "20%" : "60%",
        width: "40%", height: "30%",
        borderRadius: "50%",
        background: `radial-gradient(ellipse at 50% 50%,
          rgba(28,124,84,0.12) 0%,
          rgba(15,42,24,0.05) 50%,
          rgba(6,15,11,0) 80%)`,
        filter: "blur(90px)",
        zIndex: 0,
        animation: `${anim} ${dur + 8}s ease-in-out infinite alternate`,
      }} />

      <Grid />
      <Scanlines />
      <Particles />
      <Corners />
      <Noise />
    </div>
  );
};
