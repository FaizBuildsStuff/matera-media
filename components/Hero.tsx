
{/* ── Banding-Free Live Hero Background ── */}
<div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">

  {/* BASE — pure black */}
  <div className="absolute inset-0" style={{ background: "#000000" }} />

  {/* GRADIENT 1 — top-left emerald wash, animated */}
  <div
    className="absolute"
    style={{
      top: "-20%",
      left: "-10%",
      width: "80%",
      height: "80%",
      background: "radial-gradient(closest-side at 50% 50%, rgba(16, 185, 129, 0.18), rgba(16, 185, 129, 0.09) 35%, rgba(16, 185, 129, 0.03) 60%, transparent 80%)",
      willChange: "transform",
      animation: "drift1 18s ease-in-out infinite",
    }}
  />

  {/* GRADIENT 2 — top-right lime wash, animated opposite */}
  <div
    className="absolute"
    style={{
      top: "0%",
      right: "-15%",
      width: "70%",
      height: "70%",
      background: "radial-gradient(closest-side at 50% 50%, rgba(132, 204, 22, 0.14), rgba(132, 204, 22, 0.06) 40%, transparent 75%)",
      willChange: "transform",
      animation: "drift2 22s ease-in-out infinite",
    }}
  />

  {/* GRADIENT 3 — bottom-center bleed, slow pulse */}
  <div
    className="absolute"
    style={{
      bottom: "-15%",
      left: "50%",
      marginLeft: "-40%",
      width: "80%",
      height: "60%",
      background: "radial-gradient(closest-side at 50% 50%, rgba(52, 211, 153, 0.12), rgba(52, 211, 153, 0.05) 45%, transparent 75%)",
      willChange: "transform, opacity",
      animation: "drift3 20s ease-in-out infinite",
    }}
  />

  {/* DITHER GRAIN — kills banding */}
  <div
    className="absolute inset-0"
    style={{
      backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')`,
      opacity: 0.08,
      mixBlendMode: "overlay",
      backgroundSize: "180px 180px",
    }}
  />
  <div
    className="absolute inset-0"
    style={{
      backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')`,
      opacity: 0.04,
      mixBlendMode: "soft-light",
      backgroundSize: "120px 120px",
    }}
  />

  <style>{`
    @keyframes drift1 {
      0%, 100% { transform: translate(0, 0) scale(1); }
      50%      { transform: translate(60px, 40px) scale(1.08); }
    }
    @keyframes drift2 {
      0%, 100% { transform: translate(0, 0) scale(1); }
      50%      { transform: translate(-50px, 30px) scale(1.05); }
    }
    @keyframes drift3 {
      0%, 100% { transform: translate(-50%, 0) scale(1); opacity: 0.85; }
      50%      { transform: translate(-50%, -30px) scale(1.1); opacity: 1; }
    }
  `}</style>

</div>
