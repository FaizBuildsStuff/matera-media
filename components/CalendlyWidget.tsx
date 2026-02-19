'use client';

import Script from 'next/script';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const DEFAULT_CALENDLY_URL = "https://calendly.com/m-faizurrehman-crypto/30min?primary_color=059669&background_color=05180D&text_color=ffffff";

type CalendlyContent = {
    title?: string;
    highlightedWord?: string;
    subtitle?: string;
    calendlyUrl?: string;
};

export const CalendlyWidget = ({ content }: { content?: CalendlyContent }) => {
    const titleText = content?.title ?? "Let's Build Something Extraordinary";
    const highlightedWord = content?.highlightedWord ?? "Extraordinary";
    const subtitle = content?.subtitle ?? "Schedule a 30-minute discovery call. No commitment, just a conversation about your vision and how we can bring it to life.";
    const calendlyUrl = content?.calendlyUrl || DEFAULT_CALENDLY_URL;
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const widgetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (titleRef.current) {
                            gsap.fromTo(titleRef.current,
                                { opacity: 0, y: 30 },
                                { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
                            );
                        }
                        if (widgetRef.current) {
                            gsap.fromTo(widgetRef.current,
                                { opacity: 0, scale: 0.95, y: 20 },
                                { opacity: 1, scale: 1, y: 0, duration: 1, delay: 0.2, ease: 'power3.out' }
                            );
                        }
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section ref={containerRef} className="w-full py-32 relative overflow-hidden bg-[#05180D]" id="schedule">
            {/* Background Ambience */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
                <div ref={titleRef} className="text-center mb-16 opacity-0">
                    <h2 className="text-4xl md:text-5xl font-medium text-white mb-6 font-instrument-sans tracking-tight leading-tight">
                        {titleText.split(highlightedWord)[0]}
                        <span className="text-emerald-400 inline-block relative">
                            {highlightedWord}
                            <span className="absolute -bottom-2 left-0 w-full h-1 bg-emerald-500/30 rounded-full blur-sm"></span>
                        </span>
                        {titleText.split(highlightedWord)[1] || ""}
                    </h2>
                    <p className="text-white/40 text-lg max-w-xl mx-auto font-light leading-relaxed">
                        {subtitle}
                    </p>
                </div>

                <div ref={widgetRef} className="relative max-w-4xl mx-auto opacity-0">
                    {/* Glass Container */}
                    <div className="rounded-3xl p-1 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md shadow-2xl border border-white/5">
                        <div className="bg-[#05180D]/80 rounded-[22px] overflow-hidden relative">
                            <div
                                className="calendly-inline-widget w-full"
                                data-url={calendlyUrl}
                                style={{ minWidth: '320px', height: '1100px' }}
                            />
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-700" />
                </div>

                <Script
                    src="https://assets.calendly.com/assets/external/widget.js"
                    strategy="lazyOnload"
                />
            </div>
        </section>
    );
};
