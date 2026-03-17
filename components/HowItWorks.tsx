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
                        end: "bottom 80%",
                        scrub: true
                    } 
                }
            );

            gsap.to(".ambient-glow", {
                y: (i) => i === 0 ? -150 : 150,
                opacity: 0.5,
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
                const xVal = window.innerWidth > 768 ? (isEven ? -60 : 60) : 0;

                gsap.fromTo(row.querySelector('.row-content'), 
                    { 
                        opacity: 0, 
                        x: xVal,
                        y: 40,
                        filter: 'blur(12px)'
                    },
                    {
                        opacity: 1, 
                        x: 0, 
                        y: 0,
                        filter: 'blur(0px)',
                        duration: 1.4,
                        ease: "power4.out",
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
        <section ref={sectionRef} id="process" className="py-32 px-6 bg-[#05180D] relative overflow-hidden font-satoshi selection:bg-emerald-500/30">
            
            {/* Seamless Blending Masks */}
            <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#05180D] to-transparent z-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#05180D] to-transparent z-20 pointer-events-none" />

            {/* Background FX */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                <div className="absolute inset-0 overflow-hidden">
                    <div className="ambient-glow absolute top-[5%] -right-[10%] w-[60vw] h-[60vw] bg-emerald-500/10 blur-[150px] rounded-full" />
                    <div className="ambient-glow absolute bottom-[5%] -left-[10%] w-[50vw] h-[50vw] bg-emerald-900/20 blur-[130px] rounded-full" />
                </div>
            </div>

            <div className="max-w-6xl mx-auto relative z-30">
                
                {/* Header Section - SIZE FIXED HERE */}
                <div className="text-center mb-24 md:mb-32">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="h-[1px] w-8 bg-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.4)]" />
                        <span className="text-emerald-500 text-[10px] font-black tracking-[0.5em] uppercase">
                            {label}
                        </span>
                        <div className="h-[1px] w-8 bg-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.4)]" />
                    </div>
                    {/* Changed from text-8xl to text-6xl */}
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-[0.85] italic drop-shadow-2xl">
                        {titleText}
                    </h2>
                </div>

                <div className="relative">
                    <div 
                        ref={lineRef} 
                        className="absolute left-1/2 -translate-x-1/2 top-0 w-[1px] h-full bg-emerald-500/20 origin-top z-20 hidden md:block" 
                        style={{
                            maskImage: 'linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)',
                            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)'
                        }}
                    />

                    <div className="space-y-24 md:space-y-0">
                        {steps.map((step, i) => {
                            const isEven = i % 2 === 0;
                            return (
                                <div key={step.id} className="process-row relative md:h-[300px] flex items-center">
                                    <div className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-emerald-400 z-30 hidden md:block shadow-[0_0_15px_rgba(52,211,153,1)]" />

                                    <div className={`row-content w-full md:w-[46%] ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left md:ml-[54%]'} space-y-4`}>
                                        <div className={`flex items-center gap-3 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                                            <span className="text-emerald-500 font-black text-[11px] tracking-[0.4em] uppercase opacity-80">
                                                Phase {step.id}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl md:text-4xl font-black text-white tracking-tighter uppercase leading-none">
                                            {step.title}
                                        </h3>
                                        
                                        <p className="text-white/40 text-base md:text-lg leading-relaxed font-normal max-w-lg mx-auto md:mx-0">
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