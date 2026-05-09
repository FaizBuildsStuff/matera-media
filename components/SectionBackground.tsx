"use client";

import React from "react";

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
  // Determine accent colors based on type or index
  const getColors = () => {
    if (color) return { primary: color, secondary: color };

    const colors = [
      { primary: "rgba(52,211,153,0.12)", secondary: "rgba(16,185,129,0.07)" }, // Emerald (Hero default)
      { primary: "rgba(16,185,129,0.15)", secondary: "rgba(5,150,105,0.08)" }, // Forest
      { primary: "rgba(163,230,53,0.1)", secondary: "rgba(101,163,13,0.06)" }, // Lime
      { primary: "rgba(52,211,153,0.08)", secondary: "rgba(20,184,166,0.05)" }, // Teal
      { primary: "rgba(167,243,208,0.12)", secondary: "rgba(52,211,153,0.06)" }, // Mint
    ];

    // Pick color based on index to ensure uniqueness
    return colors[index % colors.length];
  };

  const { primary, secondary } = getColors();

  // Unique spotlight positions based on index
  const spotlightPos = [
    { left: "50%", top: "-10%", rotate: "3deg" },
    { left: "20%", top: "10%", rotate: "-15deg" },
    { left: "80%", top: "5%", rotate: "12deg" },
    { left: "30%", top: "-5%", rotate: "8deg" },
    { left: "70%", top: "15%", rotate: "-10deg" },
  ][index % 5];

  const animationName = `spotSweep-${index}`;

  if (variant === "hero") {
    return (
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
        }}
      >
        {/* ── Deep Green Orb Gradient Background (suraj.dsgn style) ── */}
        {/* BASE — pure black canvas with seamless bottom transition (Extended to prevent gaps) */}
        <div
          className="absolute inset-x-0 top-0 -bottom-[120px]"
          style={{
            background: "linear-gradient(to bottom, #060a06 50%, #050505 100%)",
          }}
        />

        {/* MAIN ORB — glowing mass reaching behind heading and video */}
        <div
          className="absolute z-0"
          style={{
            top: "15%",
            left: "5%",
            width: "90%",
            height: "80%",
            borderRadius: "50%",
            background: "radial-gradient(circle at 40% 50%, #2d6a4f 0%, #1b4332 30%, #0d2b1a 55%, transparent 85%)",
            filter: "blur(60px)",
            opacity: 0.9,
          }}
        />

        {/* BRIGHT HOT SPOT — focused radiance behind the core content area */}
        <div
          className="absolute z-0"
          style={{
            top: "35%",
            left: "15%",
            width: "60%",
            height: "60%",
            borderRadius: "50%",
            background: "radial-gradient(circle at 45% 45%, #52b788 0%, #40916c 25%, #2d6a4f 50%, transparent 80%)",
            filter: "blur(40px)",
            opacity: 0.6,
          }}
        />

        {/* SECONDARY SPREAD — upper atmosphere fill */}
        <div
          className="absolute z-0"
          style={{
            top: "5%",
            left: "-10%",
            width: "80%",
            height: "75%",
            borderRadius: "50%",
            background: "radial-gradient(circle at 50% 50%, #1b4332 0%, #081c10 50%, transparent 85%)",
            filter: "blur(80px)",
            opacity: 0.7,
          }}
        />

        {/* RIGHT SIDE STAYS DARK — Transition to global theme */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "linear-gradient(to right, transparent 30%, #050505 90%)",
          }}
        />

        {/* TOP STAYS BLACK — Transition to global theme */}
        <div
          className="absolute top-0 left-0 right-0 z-0"
          style={{
            height: "45%",
            background: "linear-gradient(to bottom, #050505 0%, transparent 100%)",
          }}
        />

        {/* GRAIN — Optimized single layer */}
        <div
          className="absolute inset-0 z-10"
          style={{
            backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')`,
            opacity: 0.05,
            mixBlendMode: "overlay",
          }}
        />
      </div>
    );
  }

  return (
    <div
      className="absolute inset-0 pointer-events-none z-0"
      style={{
        opacity,
      }}
    >
      {/* MAIN AMBIENT GLOW — Optimized Blur */}
      <div
        className="absolute inset-x-[-30%] inset-y-[-30%] z-0"
        style={{
          background: `radial-gradient(circle at ${spotlightPos.left} ${spotlightPos.top === "-10%" ? "35%" : "50%"}, 
            ${primary} 0%, 
            ${secondary} 35%, 
            rgba(0,0,0,0) 70%)`,
          filter: "blur(100px)",
        }}
      />

      {/* PRIMARY SPOTLIGHT — Hardware Accelerated ONLY if animating */}
      <div
        className="absolute z-0"
        style={{
          top: spotlightPos.top,
          left: spotlightPos.left,
          width: "120%",
          height: "150%",
          marginLeft: "-60%",
          transformOrigin: "50% 0%",
          background: `radial-gradient(ellipse 55% 75% at 50% 28%, 
            rgba(82,183,136,0.38) 0%, 
            rgba(60,140,100,0.22) 30%, 
            rgba(0,0,0,0) 80%)`,
          filter: "blur(100px)",
          animation: `${animationName} ${20 + index}s ease-in-out infinite`,
          opacity: 0.95,
          transform: `rotate(${spotlightPos.rotate})`,
          willChange: "transform",
        }}
      />

      {/* INNER BLOOM — Simplified */}
      <div
        className="absolute z-0"
        style={{
          top: `calc(${spotlightPos.top} + 8%)`,
          left: spotlightPos.left,
          width: "50%",
          height: "100%",
          marginLeft: "-25%",
          transformOrigin: "50% 0%",
          background: `radial-gradient(ellipse 50% 65% at 50% 25%, 
            rgba(167,243,208,0.2) 0%, 
            rgba(0,0,0,0) 70%)`,
          filter: "blur(80px)",
          animation: `${animationName} ${20 + index}s ease-in-out infinite`,
          opacity: 0.9,
          transform: `rotate(${spotlightPos.rotate})`,
          willChange: "transform",
        }}
      />

      {/* SUBTLE CENTER HIGHLIGHT */}
      <div
        className="absolute z-0"
        style={{
          top: "15%",
          left: "50%",
          width: "40%",
          height: "40%",
          marginLeft: "-20%",
          background: `radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 75%)`,
          filter: "blur(60px)",
          opacity: 0.6,
        }}
      />

      <style>{`
        @keyframes ${animationName} {
          0%, 100% {
            transform: rotate(${parseInt(spotlightPos.rotate) - 3}deg) scale(1.04);
          }
          50% {
            transform: rotate(${parseInt(spotlightPos.rotate) + 3}deg) scale(0.96);
          }
        }
      `}</style>
    </div>
  );
};

