"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Zap } from "lucide-react";
import { colors } from "@/theme/colors";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const PLANS = [
    {
        name: "Brand Foundation",
        description:
            "For brands building a strong visual and strategic base.",
        features: [
            "Brand Positioning & Messaging Framework",
            "Visual Identity System (Logo, Typography, Colors)",
            "Creative Direction Guide",
            "5 High-Impact Social Assets",
            "Launch Strategy Consultation",
        ],
        popular: false,
    },
    {
        name: "Growth Engine",
        description:
            "Ongoing performance creative for scaling brands.",
        features: [
            "Monthly High-Performance Video Ads",
            "Unlimited Static & Social Creatives",
            "Ad Creative Strategy & Testing Plan",
            "Weekly Performance Review Calls",
            "48–72h Creative Turnaround",
            "Dedicated Creative Strategist",
        ],
        popular: true,
    },
    {
        name: "Full-Funnel Domination",
        description:
            "Enterprise-level campaign systems for aggressive growth.",
        features: [
            "Full-Funnel Campaign Creative",
            "Advanced Motion & Broadcast-Level Production",
            "Landing Page Creative Direction",
            "Multi-Channel Ad Systems",
            "Dedicated Creative Team",
            "Priority 24/7 Support",
        ],
        popular: false,
    },
];

export type PricingContent = {
    label?: string;
    title?: string;
    highlightedWord?: string;
    subtitle?: string;
    plans?: Array<{
        _key?: string;
        name?: string;
        price?: string;
        period?: string;
        description?: string;
        features?: string[];
        popular?: boolean;
    }>;
};

export default function Pricing({ content }: { content?: PricingContent }) {
    const label = content?.label ?? "Investment";
    const title = content?.title ?? "Our offers.";
    const subtitle = content?.subtitle ?? "Two core disciplines. One goal: measurable growth.";
    const plans = (content?.plans && content.plans.length > 0
        ? content.plans.map((p) => ({
            name: p.name ?? "",
            description: p.description ?? "",
            features: p.features ?? [],
            popular: p.popular ?? false,
        }))
        : PLANS
    ).filter((p) => p.name);

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
                    <p className="text-white/60 max-w-2xl mx-auto text-lg">
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
                                    ? "bg-white/10 border-emerald-500/30 shadow-2xl shadow-emerald-900/20 scale-105 md:-mt-6 z-10"
                                    : "bg-white/5 border-white/10 hover:border-white/20"
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-400 via-emerald-200 to-emerald-400" />
                            )}

                            <CardHeader className="pb-8">
                                {plan.popular && (
                                    <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs border border-emerald-500/20 w-fit">
                                        <Zap className="w-3 h-3 fill-emerald-300" />
                                        Most Popular
                                    </div>
                                )}

                                <CardTitle className="text-xl font-semibold text-white mb-3">
                                    {plan.name}
                                </CardTitle>

                                <p className="text-white/60 text-sm leading-relaxed">
                                    {plan.description}
                                </p>
                            </CardHeader>

                            <CardContent className="flex-grow space-y-6">
                                <hr className="border-white/10 border-dashed" />
                                <ul className="space-y-4 text-sm text-white/80">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="mt-1 rounded-full bg-emerald-500/20 p-1">
                                                <Check className="w-3 h-3 text-emerald-400" />
                                            </div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>

                            <CardFooter className="mt-auto pt-8">
                                <Link href="#schedule" className="w-full">
                                    <Button
                                        className={`w-full h-12 rounded-full text-sm font-medium transition-all duration-300 ${plan.popular
                                                ? "bg-white text-black hover:bg-emerald-50 hover:scale-[1.02]"
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