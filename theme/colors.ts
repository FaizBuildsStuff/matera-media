// /theme/colors.ts

export const colors = {
  brand: {
    primary: "#10B981",        // Main Emerald
    primaryDark: "#059669",    // Dark Emerald (hover state)
    primaryLight: "#34D399",   // Light Emerald (subtle highlights)

    accent: "#0D9488",         // Dark Turquoise
    accentLight: "#14B8A6",    // Light Turquoise
  },

  background: {
    base: "#05180D",           // Main background (given by client)
    secondary: "#062017",      // Slightly lighter dark section
    tertiary: "#0A2A1B",       // Elevated section background
    glass: "rgba(255, 255, 255, 0.05)", // Glass card background
  },

  text: {
    primary: "#FFFFFF",
    secondary: "rgba(255,255,255,0.75)",
    muted: "rgba(255,255,255,0.5)",
    inverted: "#05180D",
  },

  border: {
    subtle: "rgba(255,255,255,0.1)",
    strong: "rgba(255,255,255,0.2)",
    glow: "rgba(16,185,129,0.4)",
  },

  effects: {
    emeraldGlow: `
      radial-gradient(
        circle at 30% 20%,
        rgba(16,185,129,0.18),
        transparent 45%
      )
    `,
    emeraldToTurquoise: `
      linear-gradient(
        135deg,
        #10B981 0%,
        #0D9488 100%
      )
    `,
    subtleOverlay: "rgba(0, 0, 0, 0.4)",
  },

  button: {
    primaryBg: "#10B981",
    primaryHover: "#059669",
    primaryText: "#FFFFFF",

    ghostBorder: "rgba(255,255,255,0.2)",
    ghostHoverBg: "rgba(255,255,255,0.05)",
  },
};
