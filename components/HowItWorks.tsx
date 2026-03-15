'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export type HowItWorksProps = {
    content?: {
        label?: string;
        title?: string;
        steps?: Array<{
            id: string;
            title: string;
            description: string;
        }>;
    };
};

const DEFAULT_STEPS = [
    { id: '01', title: 'Strategy & Concept', description: "We study your brand to build winning scripts and creative direction." },
    { id: '02', title: 'Production & Design', description: 'Full-scale production focused on high-conversion visual assets.' },
    { id: '03', title: 'Launch & Optimization', description: 'We launch and tweak results based on real-time performance data.' },
];

export const HowItWorks = ({ content }: HowItWorksProps) => {
    const label = content?.label ?? "Evolution Protocol";
    const titleText = content?.title ?? "How it works";
    const steps = content?.steps?.length ? content.steps : DEFAULT_STEPS;

    const sectionRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(lineRef.current, 
                { scaleY: 0 }, 
                { 
                    scaleY: 1, 
                    ease: "none", 
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 30%",
                        end: "bottom 70%",
                        scrub: true
                    } 
                }
            );

            gsap.to(".ambient-glow", {
                y: (i) => i === 0 ? -100 : 100,
                opacity: 0.4,
                duration: 3,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5
                }
            });

            const rows = gsap.utils.toArray('.process-row');
            rows.forEach((row: any, i: number) => {
                const isEven = i % 2 === 0;
                const xVal = window.innerWidth > 768 ? (isEven ? -50 : 50) : 0;
                const yVal = window.innerWidth > 768 ? 0 : 30;

                gsap.fromTo(row.querySelector('.row-content'), 
                    { 
                        opacity: 0, 
                        x: xVal,
                        y: yVal,
                        filter: 'blur(10px)'
                    },
                    {
                        opacity: 1, 
                        x: 0, 
                        y: 0,
                        filter: 'blur(0px)',
                        duration: 1.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: row,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [content]);

    return (
        <section ref={sectionRef} id="process" className="py-20 px-6 bg-[#05180D] relative overflow-hidden font-satoshi">
            
            {/* --- SEAMLESS MASK OVERLAYS (Tightened) --- */}
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#05180D] to-transparent z-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#05180D] to-transparent z-20 pointer-events-none" />

            {/* --- BACKGROUND FX --- */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                
                <div className="absolute inset-0 overflow-hidden">
                    <div className="ambient-glow absolute top-[10%] -right-[5%] w-[50vw] h-[50vw] bg-emerald-500/10 blur-[120px] rounded-full" />
                    <div className="ambient-glow absolute bottom-[10%] -left-[5%] w-[40vw] h-[40vw] bg-emerald-900/20 blur-[100px] rounded-full" />
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-emerald-500/10 to-transparent" />
                </div>
            </div>

            <div className="max-w-5xl mx-auto relative z-30">
                
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-[1px] w-4 bg-emerald-500/50 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        <span className="text-emerald-500 text-[9px] font-black tracking-[0.4em] uppercase">
                            {label}
                        </span>
                        <div className="h-[1px] w-4 bg-emerald-500/50 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none drop-shadow-sm">
    {titleText}
</h2>
                </div>

                <div className="relative">
                    <div 
                        ref={lineRef} 
                        className="absolute left-1/2 -translate-x-1/2 top-0 w-[1px] h-full bg-emerald-500/30 origin-top z-20 hidden md:block" 
                        style={{
                            maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
                            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)'
                        }}
                    />

                    <div className="space-y-16 md:space-y-0">
                        {steps.map((step, i) => {
                            const isEven = i % 2 === 0;
                            return (
                                <div key={step.id} className="process-row relative md:h-[250px] flex items-center">
                                    <div className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400 z-30 hidden md:block shadow-[0_0_12px_rgba(52,211,153,0.8)]" />

                                    <div className={`row-content w-full md:w-[45%] ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left md:ml-[55%]'} space-y-3`}>
                                        <div className={`flex items-center gap-3 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                                            <span className="text-emerald-500 font-black text-[10px] tracking-[0.3em] uppercase">
                                                Phase {step.id}
                                            </span>
                                        </div>

                                        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight uppercase">
                                            {step.title}
                                        </h3>
                                        
                                        <p className="text-white/40 text-sm md:text-base leading-relaxed group-hover:text-white/60 transition-colors duration-500">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};