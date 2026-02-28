'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Fingerprint, Zap, Target, LucideIcon, Plus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Step {
    id: string;
    icon: LucideIcon;
    title: string;
    description: string;
}

const DEFAULT_STEPS: Step[] = [
    { id: '01', icon: Target, title: 'Strategy & Concept', description: "Deep-dive brand analysis to craft a high-performance visual narrative." },
    { id: '02', icon: Fingerprint, title: 'Production & Design', description: 'Bringing concepts to life with high-fidelity visuals and cinematic motion.' },
    { id: '03', icon: Zap, title: 'Launch & Optimization', description: 'Deploying assets and analyzing data to maximize revenue impact.' },
];

export const HowItWorks = ({ content }: { content?: any }) => {
    const label = content?.label ?? "Evolution Protocol";
    const titleText = content?.title ?? "Turning Vision into High-Performance";
    const highlightedWord = content?.highlightedWord ?? "High-Performance";
    const steps = DEFAULT_STEPS;

    const sectionRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Central Scanning Line
            gsap.fromTo(lineRef.current, 
                { scaleY: 0 }, 
                { 
                    scaleY: 1, 
                    ease: "none", 
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 20%",
                        end: "bottom 80%",
                        scrub: true
                    } 
                }
            );

            // 2. Kinetic Text Reveal
            const rows = gsap.utils.toArray('.process-row');
            rows.forEach((row: any, i: number) => {
                const isEven = i % 2 === 0;
                gsap.fromTo(row.querySelector('.row-content'), 
                    { 
                        opacity: 0, 
                        x: isEven ? -100 : 100,
                        filter: 'blur(10px)'
                    },
                    {
                        opacity: 1, 
                        x: 0, 
                        filter: 'blur(0px)',
                        duration: 1.5,
                        scrollTrigger: {
                            trigger: row,
                            start: "top 70%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });

            // 3. Parallax Background Text
            gsap.to(".bg-parallax-text", {
                y: -150,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    scrub: 1
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="process"
            className="py-32 px-6 bg-transparent relative overflow-hidden min-h-screen"
        >
            {/* --- ARCHITECTURAL BACKGROUND (NO CARDS) --- */}
            
            {/* Massive Parallax Text Filling Space */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
                <h2 className="bg-parallax-text text-[30vw] font-black text-white/[0.01] uppercase tracking-tighter">
                    PROCESS
                </h2>
            </div>

            {/* Kinetic Background Skeleton */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                <div className="absolute left-[50%] top-0 h-full w-px bg-white/5" />
                <Plus className="absolute top-20 right-[48%] text-emerald-400/20 w-8 h-8" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                
                {/* --- HEADER: ULTRA MINIMAL --- */}
                <div className="text-center mb-40 space-y-6">
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-px w-10 bg-emerald-500" />
                        <span className="text-emerald-500 text-[10px] font-bold tracking-[0.5em] uppercase">{label}</span>
                        <div className="h-px w-10 bg-emerald-500" />
                    </div>
                    <h2 className="text-6xl md:text-9xl font-instrument-sans font-medium text-white tracking-tighter leading-none lowercase">
                        {titleText.split(highlightedWord)[0]}
                        <span className="font-instrument-serif italic text-emerald-400">
                            {highlightedWord}
                        </span>
                    </h2>
                </div>

                {/* --- INTERACTIVE VERTICAL FLOW --- */}
                <div className="relative">
                    {/* The Scanning Progress Line */}
                    <div ref={lineRef} className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] h-full bg-emerald-500 origin-top shadow-[0_0_20px_rgba(16,185,129,0.5)] z-20 hidden md:block" />

                    <div className="space-y-40 md:space-y-0">
                        {steps.map((step, i) => {
                            const isEven = i % 2 === 0;
                            return (
                                <div key={step.id} className="process-row relative md:h-[400px] flex items-center group">
                                    
                                    {/* Central Node */}
                                    <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-emerald-500 border-4 border-black z-30 shadow-[0_0_15px_rgba(16,185,129,1)] scale-0 group-hover:scale-150 transition-transform duration-500 hidden md:block" />

                                    <div className={`row-content w-full md:w-1/2 ${isEven ? 'md:pr-24 md:text-right md:ml-0' : 'md:pl-24 md:text-left md:ml-[50%]'} space-y-6`}>
                                        
                                        {/* Step ID */}
                                        <div className={`flex items-center gap-4 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                                            <span className="text-emerald-500/30 font-instrument-serif italic text-4xl group-hover:text-emerald-400 transition-colors">
                                                {step.id}
                                            </span>
                                            <div className="h-px w-8 bg-white/10" />
                                        </div>

                                        <h3 className="text-4xl md:text-6xl font-medium text-white tracking-tight group-hover:translate-x-2 transition-transform duration-500">
                                            {step.title}
                                        </h3>
                                        
                                        <p className="text-white/40 text-lg md:text-2xl font-light leading-relaxed group-hover:text-white/80 transition-colors duration-500">
                                            {step.description}
                                        </p>

                                        {/* Modern Indicator */}
                                        <div className={`pt-4 flex items-center ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                                            <div className="group/link flex items-center gap-3 cursor-pointer">
                                                <span className="text-[10px] uppercase font-bold text-white/20 tracking-widest group-hover/link:text-emerald-400 transition-colors">Launch Protocol</span>
                                                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover/link:bg-emerald-500 group-hover/link:border-emerald-500 transition-all">
                                                    <ArrowRight className="w-4 h-4 text-white group-hover:text-black transition-colors" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Bottom Protocol Line */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </section>
    );
};