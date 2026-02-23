"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Zap, BarChart3, PlayCircle, Rocket } from "lucide-react";
import { colors } from "@/theme/colors";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const PLANS = [
    {
        name: "Performance Ad Creatives",
        icon: <BarChart3 className="w-5 h-5 text-emerald-400" />,
        description: "High-converting motion ads designed to stop the scroll and lower your CAC.",
        features: [
            "Direct-Response Video Ad Frameworks",
            "A/B Hook & CTA Testing Variations",
            "Strategic Competitor Ad Analysis",
            "Platform Optimization (FB, IG, LI, TT)",
            "High-End Motion Graphics & UGC Style",
        ],
        popular: false,
    },
    {
        name: "Organic & YouTube Systems",
        icon: <PlayCircle className="w-5 h-5 text-emerald-400" />,
        description: "Build authority and community with a consistent, high-quality content engine.",
        features: [
            "Full-Service YouTube Production",
            "Viral Short-Form Content (Reels/Shorts)",
            "Content Strategy & Topic Research",
            "SEO-Optimized Metadata & Thumbnails",
            "Dedicated Video Editing Workflow",
        ],
        popular: true,
    },
    {
        name: "SaaS Product Videos",
        icon: <Rocket className="w-5 h-5 text-emerald-400" />,
        description: "Transform complex features into clear, high-production product stories.",
        features: [
            "Professional Platform Walkthroughs",
            "Kinetic Typography & UI Animations",
            "Explainers for Complex Workflows",
            "Sales-Enablement Demo Videos",
            "Interactive Product Tours",
        ],
        popular: false,
    },
];

export type PricingContent = {
    label?: string;
    title?: string;
    subtitle?: string;
    plans?: Array<{
        _key?: string;
        name?: string;
        description?: string;
        features?: string[];
        popular?: boolean;
    }>;
};

export default function Pricing({ content }: { content?: PricingContent }) {
    const label = content?.label ?? "Solutions";
    const title = content?.title ?? "Tailored for Growth.";
    const subtitle = content?.subtitle ?? "Choose the discipline that aligns with your current revenue goals.";
    
    const plans = (content?.plans && content.plans.length > 0
        ? content.plans.map((p, idx) => ({
            ...p,
            icon: PLANS[idx]?.icon || <Check className="w-5 h-5 text-emerald-400" />
        }))
        : PLANS
    );

    const sectionRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                headerRef.current,
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: "top 85%",
                    },
                }
            );

            const cards = cardsRef.current?.children;
            if (cards) {
                gsap.fromTo(
                    cards,
                    { y: 80, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        stagger: 0.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: cardsRef.current,
                            start: "top 80%",
                        },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="pricing"
            className="py-32 px-6 bg-[#05180D] relative overflow-hidden"
        >
            {/* Subtle emerald glow */}
            <div
                className="absolute inset-0 pointer-events-none opacity-40"
                style={{ background: colors.effects.emeraldGlow }}
            />

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-20 space-y-6">
                    <p className="text-emerald-400 font-medium tracking-widest uppercase text-xs">{label}</p>
                    <h2 className="text-4xl md:text-5xl font-semibold text-white">
                        {title}
                    </h2>
                    <p className="text-white/60 max-w-2xl mx-auto text-lg font-light">
                        {subtitle}
                    </p>
                </div>

                {/* Cards */}
                <div
                    ref={cardsRef}
                    className="grid gap-8 md:grid-cols-3 items-stretch"
                >
                    {plans.map((plan, index) => (
                        <Card
                            key={plan.name ?? index}
                            className={`relative flex flex-col h-full border transition-all duration-500 overflow-hidden group ${plan.popular
                                    ? "bg-white/[0.08] border-emerald-500/30 shadow-2xl shadow-emerald-900/20 scale-105 md:-mt-6 z-10"
                                    : "bg-white/[0.03] border-white/10 hover:border-white/20"
                                } rounded-[2rem]`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-500 via-emerald-200 to-emerald-500" />
                            )}

                            <CardHeader className="pb-8 pt-10 px-8">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                                        {(plan as any).icon}
                                    </div>
                                    {plan.popular && (
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] border border-emerald-500/20 uppercase font-bold tracking-wider">
                                            <Zap className="w-3 h-3 fill-emerald-300" />
                                            Most Popular
                                        </div>
                                    )}
                                </div>

                                <CardTitle className="text-2xl font-semibold text-white mb-3">
                                    {plan.name}
                                </CardTitle>

                                <p className="text-white/50 text-sm leading-relaxed font-light">
                                    {plan.description}
                                </p>
                            </CardHeader>

                            <CardContent className="flex-grow space-y-6 px-8">
                                <hr className="border-white/10 border-dashed" />
                                <ul className="space-y-4 text-sm text-white/80 font-light">
                                    {plan.features?.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="mt-1 rounded-full bg-emerald-500/10 p-1 flex-shrink-0">
                                                <Check className="w-3 h-3 text-emerald-400" />
                                            </div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>

                            <CardFooter className="mt-auto pt-8 pb-10 px-8">
                                <Link href="#schedule" className="w-full">
                                    <Button
                                        className={`w-full h-14 rounded-full text-sm font-bold transition-all duration-500 ${plan.popular
                                                ? "bg-white text-black hover:bg-emerald-50 hover:scale-[1.02] shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                                                : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
                                            }`}
                                    >
                                        Book Strategy Call
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}