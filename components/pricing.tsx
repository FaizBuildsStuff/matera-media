"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Zap } from "lucide-react";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const plans = [
    {
        name: "Starter",
        price: "$2,500",
        period: "/project",
        description: "Perfect for emerging brands needing a strong visual foundation.",
        features: [
            "Brand Identity System",
            "Social Media Assets (5)",
            "Basic Motion Graphics",
            "2 Rounds of Revisions",
            "Standard Delivery (3 weeks)"
        ],
        popular: false
    },
    {
        name: "Growth",
        price: "$5,000",
        period: "/month",
        description: "Comprehensive content production for scaling businesses.",
        features: [
            "Full Brand Strategy",
            "4 High-Performance Video Ads",
            "Unlimited Static Assets",
            "Priority Support",
            "Weekly Strategy Calls",
            "48h Turnaround"
        ],
        popular: true
    },
    {
        name: "Enterprise",
        price: "Custom",
        period: "",
        description: "Tailored solutions for large-scale campaigns and organizations.",
        features: [
            "Dedicated Creative Team",
            "Full-Funnel Campaign Production",
            "TVC & Broadcast Quality",
            "24/7 Priority Support",
            "Custom Integrations",
            "White-glove Onboarding"
        ],
        popular: false
    }
];

export default function Pricing() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header Animation
            gsap.fromTo(headerRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: "top 85%",
                    }
                }
            );

            // Cards Animation
            const cards = cardsRef.current?.children;
            if (cards) {
                gsap.fromTo(cards,
                    { y: 80, opacity: 0, scale: 0.9 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        stagger: 0.2,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: cardsRef.current,
                            start: "top 75%",
                        }
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="pricing" className="py-32 px-6 bg-[#05180D] relative overflow-hidden">

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-20 space-y-4">
                    <p className="text-emerald-400 font-medium tracking-widest uppercase text-xs">Investment</p>
                    <h2 className="text-4xl md:text-5xl font-instrument-sans font-medium text-white">
                        Transparent <span className="font-instrument-serif italic text-emerald-400">Pricing.</span>
                    </h2>
                    <p className="text-white/60 max-w-xl mx-auto font-light text-lg">
                        Choose the partnership model that best fits your growth stage. No hidden fees, just results.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div ref={cardsRef} className="grid gap-8 md:grid-cols-3 items-start">
                    {plans.map((plan, index) => (
                        <Card
                            key={index}
                            className={`relative flex flex-col h-full border-white/10 backdrop-blur-sm transition-all duration-500 overflow-hidden group hover:border-white/20 hover:shadow-2xl hover:shadow-emerald-900/10 ${plan.popular
                                ? "bg-white/10 border-emerald-500/30 shadow-lg shadow-emerald-900/20 scale-105 md:-mt-4 z-10"
                                : "bg-white/5"
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-400 via-emerald-200 to-emerald-400" />
                            )}

                            <CardHeader className="pb-8">
                                {plan.popular && (
                                    <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-medium w-fit border border-emerald-500/20">
                                        <Zap className="w-3 h-3 fill-emerald-300" /> Most Popular
                                    </div>
                                )}
                                <CardTitle className="text-xl font-instrument-sans font-medium text-white mb-2">
                                    {plan.name}
                                </CardTitle>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-semibold text-white tracking-tight">{plan.price}</span>
                                    {plan.period && <span className="text-white/50 text-sm font-light">{plan.period}</span>}
                                </div>
                                <CardDescription className="text-white/60 font-light mt-4 leading-relaxed">
                                    {plan.description}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-6 flex-grow">
                                <hr className="border-white/10 border-dashed" />
                                <ul className="space-y-4 text-sm font-light text-white/80">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 group-hover:text-white transition-colors">
                                            <div className="mt-0.5 rounded-full bg-emerald-500/20 p-0.5">
                                                <Check className="w-3 h-3 text-emerald-400" />
                                            </div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>

                            <CardFooter className="mt-auto pt-8">
                                <Button
                                    className={`w-full h-12 rounded-full text-base font-medium transition-all duration-300 ${plan.popular
                                        ? "bg-white text-black hover:bg-emerald-50 hover:scale-[1.02]"
                                        : "bg-white/10 text-white hover:bg-white/20 border border-white/5"
                                        }`}
                                >
                                    Get Started
                                </Button>
                            </CardFooter>

                            {/* Background Gradient on Hover */}
                            <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
