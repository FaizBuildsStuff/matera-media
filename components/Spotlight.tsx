"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const Spotlight = () => {
    const spotlightRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!spotlightRef.current) return;

            // Use clientX/Y for fixed position tracking
            const x = e.clientX;
            const y = e.clientY;

            gsap.to(spotlightRef.current, {
                "--x": `${x}px`,
                "--y": `${y}px`,
                duration: 0.5,
                ease: "power2.out",
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div
            ref={spotlightRef}
            className="fixed inset-0 pointer-events-none z-[5] mix-blend-soft-light"
            style={{
                background: "radial-gradient(circle 800px at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.15), transparent 80%)"
            } as React.CSSProperties}
        />
    );
};
