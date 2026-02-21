"use client";

/**
 * Gradient overlay that merges one section's color into the next.
 * Place at the bottom of a section; `toColor` is the next section's background.
 */
export function SectionMerge({ toColor = "#062017" }: { toColor?: string }) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 h-40 md:h-52 pointer-events-none z-0"
      style={{
        background: `linear-gradient(to top, ${toColor}, transparent)`,
      }}
      aria-hidden
    />
  );
}
