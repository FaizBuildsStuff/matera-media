'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        id: '01',
        title: 'Strategy & Concept',
        description:
            "We dive deep into your brand's core values and objectives to craft a unique visual narrative.",
    },
    {
        id: '02',
        title: 'Production & Design',
        description:
            'Our team brings the concept to life with high-fidelity visuals, motion graphics, and cinematography.',
    },
    {
        id: '03',
        title: 'Launch & Optimization',
        description:
            'We deliver polished assets ready for deployment and help you analyze performance for maximum impact.',
    },
];

export const HowItWorks = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header Animation
            gsap.fromTo(
                headerRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: 'top 85%',
                    },
                }
            );

            // Timeline/List Animation
            const items = listRef.current?.querySelectorAll('.process-item');
            if (items) {
                items.forEach((item, index) => {
                    gsap.fromTo(
                        item,
                        { y: 50, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 1,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: item,
                                start: 'top 80%',
                            },
                        }
                    );
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="process"
            className="py-32 px-6 bg-[#05180D] relative overflow-hidden"
        >
            <div className="absolute -right-20 bottom-0 opacity-[0.02] pointer-events-none select-none rotate-12">
                <img
                    src="/Logo.png"
                    alt="Matera Media Logo"
                    className="w-[800px] h-auto object-contain grayscale"
                />
            </div>

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div ref={headerRef} className="mb-24 md:mb-32">
                    <p className="text-emerald-400 font-medium tracking-widest uppercase text-xs mb-4">
                        Our Process
                    </p>
                    <h2 className="text-4xl md:text-6xl font-instrument-sans font-medium text-white mb-6">
                        From Concept to{' '}
                        <span className="font-instrument-serif italic text-emerald-400">
                            Reality.
                        </span>
                    </h2>
                </div>

                {/* Vertical Process List */}
                <div ref={listRef} className="flex flex-col">
                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            className="process-item group border-t border-white/10 py-12 md:py-16 transition-all duration-500 hover:border-white/30 hover:bg-white/5 px-4 md:px-8 -mx-4 md:-mx-8 rounded-xl"
                        >
                            <div className="flex flex-col md:flex-row md:items-baseline gap-6 md:gap-24">
                                <span className="text- emerald-400/50 group-hover:text-emerald-400 font-instrument-serif italic text-4xl md:text-5xl transition-colors duration-300">
                                    {step.id}
                                </span>
                                <div className="flex-1">
                                    <h3 className="text-3xl md:text-5xl font-instrument-sans font-medium text-white mb-4 group-hover:translate-x-2 transition-transform duration-300">
                                        {step.title}
                                    </h3>
                                </div>
                                <div className="md:w-1/3">
                                    <p className="text-white/50 text-lg leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="border-b border-white/10 w-full" />
                </div>
            </div>
        </section>
    );
};
