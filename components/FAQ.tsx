"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const faqs = [
    {
        id: "item-1",
        question: "What is your typical turnaround time?",
        answer: "Our standard turnaround for most projects is 2-4 weeks, depending on complexity. For expedited deliveries, we offer rush options upon request.",
    },
    {
        id: "item-2",
        question: "Do you offer revisions?",
        answer: "Absolutely. We include 3 rounds of revisions in our standard packages to ensure the final output aligns perfectly with your vision.",
    },
    {
        id: "item-3",
        question: "How does the payment structure work?",
        answer: "We typically require a 50% deposit to commence work, with the remaining 50% due upon final delivery. We also offer milestone-based payment plans for larger projects.",
    },
    {
        id: "item-4",
        question: "Can you help with strategy, not just production?",
        answer: "Yes. Strategy is at the core of what we do. We don't just make things look good; we ensure they perform by aligning creative with your business goals.",
    },
    {
        id: "item-5",
        question: "What assets do I need to provide?",
        answer: "It depends on the project. Generally, we'll need your brand guidelines, logo files, and any specific footage or copy you want included. We can handle the rest.",
    },
];

export const FAQ = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const accordionRef = useRef<HTMLDivElement>(null);

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

            // Accordion Animation
            gsap.fromTo(accordionRef.current,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: accordionRef.current,
                        start: "top 80%",
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="faq" className="py-32 px-6 bg-[#05180D] relative overflow-hidden">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none">
                <img src="/Logo.png" alt="Matera Media Logo" className="w-[900px] h-auto object-contain" />
            </div>

            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-16">
                    <p className="text-emerald-400 font-medium tracking-widest uppercase text-xs mb-4">Common Questions</p>
                    <h2 className="text-4xl md:text-5xl font-instrument-sans font-medium text-white mb-6">
                        Everything you need <br /> to <span className="font-instrument-serif italic text-emerald-400">Know.</span>
                    </h2>
                </div>

                {/* FAQ Accordion */}
                <div ref={accordionRef} className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq) => (
                            <AccordionItem key={faq.id} value={faq.id} className="border-white/10 last:border-b-0">
                                <AccordionTrigger className="text-white hover:text-emerald-400 hover:no-underline text-lg font-instrument-sans font-medium text-left">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-white/60 font-light leading-relaxed text-base">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
};
