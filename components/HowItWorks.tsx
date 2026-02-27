'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Fingerprint, Zap, Target, LucideIcon } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Step {
    id: string;
    icon: LucideIcon;
    title: string;
    description: string;
}

const DEFAULT_STEPS: Step[] = [
    { id: '01', icon: Target, title: 'Strategy & Concept', description: "We dive deep into your brand's core values to craft a unique visual narrative." },
    { id: '02', icon: Fingerprint, title: 'Production & Design', description: 'Our team brings the concept to life with high-fidelity visuals and motion.' },
    { id: '03', icon: Zap, title: 'Launch & Optimization', description: 'We deliver assets ready for deployment and analyze performance for impact.' },
];

type HowItWorksContent = {
    label?: string;
    title?: string;
    highlightedWord?: string;
    steps?: Array<{ _key: string; id?: string; title?: string; description?: string }>;
};

export const HowItWorks = ({ content }: { content?: HowItWorksContent }) => {
    const label = content?.label ?? "Evolution Protocol";
    const titleText = content?.title ?? "Turning Vision into High-Performance";
    const highlightedWord = content?.highlightedWord ?? "High-Performance";
    
    const steps = (content?.steps && content.steps.length > 0
        ? content.steps.map((s, i) => ({
            id: s.id ?? `0${i + 1}`,
            title: s.title ?? "",
            description: s.description ?? "",
            icon: DEFAULT_STEPS[i]?.icon || Zap
          }))
        : DEFAULT_STEPS
    ).filter((s) => s.title);

    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Progress Bar Logic
            gsap.fromTo(progressRef.current, 
                { scaleY: 0 }, 
                { 
                    scaleY: 1, 
                    ease: "none", 
                    scrollTrigger: {
                        trigger: triggerRef.current,
                        start: "top 20%",
                        end: "bottom 80%",
                        scrub: true
                    } 
                }
            );

            // 2. Individual Step Stagger Reveal
            const stepItems = gsap.utils.toArray('.step-container');
            stepItems.forEach((step: any) => {
                gsap.fromTo(step, 
                    { opacity: 0, x: 50, filter: 'blur(10px)' },
                    {
                        opacity: 1, x: 0, filter: 'blur(0px)',
                        scrollTrigger: {
                            trigger: step,
                            start: "top 80%",
                            end: "top 40%",
                            scrub: 1,
                        }
                    }
                );
            });

            // 3. Title Reveal on Scroll
            gsap.from(".char-reveal", {
                opacity: 0,
                y: 100,
                rotateX: -90,
                stagger: 0.02,
                duration: 1.5,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="process"
            className="py-32 px-6 bg-[#05180D] relative overflow-hidden"
        >
            {/* --- ARCHITECTURAL BACKGROUND --- */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
                 style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/stardust.png")` }} />
            
            {/* Kinetic Glow Orbs */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-400/5 blur-[120px] rounded-full" />

            <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row gap-20">
                
                {/* --- LEFT: STICKY HEADING --- */}
                <div className="lg:w-1/2 lg:sticky lg:top-32 h-fit">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-[1px] w-12 bg-emerald-500/50" />
                        <p className="text-emerald-400 font-bold tracking-[0.5em] uppercase text-[10px]">
                            {label}
                        </p>
                    </div>
                    
                    <h2 className="text-6xl md:text-8xl font-instrument-sans font-medium text-white tracking-tighter leading-[0.85] perspective-1000">
                        {titleText.split(highlightedWord)[0]}
                        <span className="block font-instrument-serif italic text-emerald-400/90 lowercase mt-4 char-reveal">
                            {highlightedWord}
                        </span>
                    </h2>

                    <div className="mt-20 hidden lg:block opacity-20">
                        <p className="text-white text-xs tracking-widest uppercase font-black rotate-90 origin-left">
                            Scroll_To_Explore
                        </p>
                    </div>
                </div>

                {/* --- RIGHT: KINETIC STEPS --- */}
                <div ref={triggerRef} className="lg:w-1/2 relative">
                    {/* Vertical Progress Line */}
                    <div className="absolute left-0 top-0 w-[1px] h-full bg-white/5 hidden md:block">
                        <div ref={progressRef} className="w-full h-full bg-emerald-500 origin-top scale-y-0" />
                    </div>

                    <div className="space-y-32 md:pl-16">
                        {steps.map((step) => (
                            <div key={step.id} className="step-container group relative">
                                {/* Large Shadow Number */}
                                <span className="absolute -left-12 top-0 text-9xl font-black text-white/[0.02] -z-10 select-none hidden md:block group-hover:text-emerald-500/5 transition-colors duration-500">
                                    {step.id}
                                </span>

                                <div className="space-y-8">
                                    <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-emerald-500/50 transition-all duration-500 shadow-2xl">
                                        <step.icon className="w-6 h-6 text-emerald-400" />
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <h3 className="text-4xl font-medium text-white tracking-tight flex items-center gap-4">
                                            {step.title}
                                            <ArrowRight className="w-6 h-6 text-emerald-500/0 -translate-x-4 group-hover:text-emerald-500 group-hover:translate-x-0 transition-all" />
                                        </h3>
                                        <p className="text-white/40 text-xl font-light leading-relaxed max-w-md group-hover:text-white/70 transition-colors">
                                            {step.description}
                                        </p>
                                    </div>

                                    <div className="flex gap-4 pt-4">
                                        <div className="px-4 py-1.5 rounded-full border border-white/5 bg-white/[0.02] text-[10px] uppercase font-bold text-white/40 tracking-widest">
                                            Phase_{step.id}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};