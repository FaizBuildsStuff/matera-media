{/* ── 4K Live Moving Spotlight Background ── */}
<div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">

  {/* BASE */}
  <div className="absolute inset-0" style={{ background: "#050805" }} />

  {/* SPOTLIGHT CONE — wide soft outer, swings */}
  <div
    className="absolute"
    style={{
      top: "-20%",
      left: "50%",
      width: "70%",
      height: "140%",
      marginLeft: "-35%",
      transformOrigin: "50% 0%",
      background: "radial-gradient(ellipse 50% 70% at 50% 30%, rgba(45, 106, 79, 0.55) 0%, rgba(27, 67, 50, 0.3) 35%, rgba(13, 43, 26, 0.1) 65%, transparent 85%)",
      willChange: "transform",
      animation: "swingWide 11s ease-in-out infinite",
    }}
  />

  {/* SPOTLIGHT CORE — brighter inner, swings opposite */}
  <div
    className="absolute"
    style={{
      top: "-10%",
      left: "50%",
      width: "45%",
      height: "120%",
      marginLeft: "-22.5%",
      transformOrigin: "50% 0%",
      background: "radial-gradient(ellipse 45% 60% at 50% 30%, rgba(82, 183, 136, 0.5) 0%, rgba(64, 145, 108, 0.25) 40%, transparent 75%)",
      willChange: "transform",
      animation: "swingTight 9s ease-in-out infinite",
    }}
  />

  {/* HOT TIP — pulses */}
  <div
    className="absolute"
    style={{
      top: "10%",
      left: "50%",
      width: "20%",
      height: "60%",
      marginLeft: "-10%",
      transformOrigin: "50% 0%",
      background: "radial-gradient(ellipse 50% 50% at 50% 30%, rgba(110, 231, 183, 0.4) 0%, rgba(82, 183, 136, 0.18) 50%, transparent 80%)",
      willChange: "transform, opacity",
      animation: "hotTipMove 7s ease-in-out infinite",
    }}
  />

  {/* GRAIN */}
  <div
    className="absolute inset-0"
    style={{
      backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')`,
      opacity: 0.07,
      mixBlendMode: "overlay",
    }}
  />

  {/* VIGNETTE */}
  <div
    className="absolute inset-0"
    style={{
      background: "radial-gradient(ellipse at center, transparent 30%, rgba(5,8,5,0.6) 80%, #050805 100%)",
    }}
  />

  <style>{`
    @keyframes swingWide {
      0%   { transform: rotate(-18deg) scale(1); }
      50%  { transform: rotate(18deg) scale(1.05); }
      100% { transform: rotate(-18deg) scale(1); }
    }
    @keyframes swingTight {
      0%   { transform: rotate(12deg) scale(1); }
      50%  { transform: rotate(-12deg) scale(1.03); }
      100% { transform: rotate(12deg) scale(1); }
    }
    @keyframes hotTipMove {
      0%   { transform: rotate(-8deg); opacity: 0.8; }
      50%  { transform: rotate(8deg);  opacity: 1; }
      100% { transform: rotate(-8deg); opacity: 0.8; }
    }
  `}</style>

</div>
