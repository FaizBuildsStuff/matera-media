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
import { useVisualEditing } from "./visual-editing/VisualEditingProvider";
import { EditableText } from "./visual-editing/EditableText";
import { AddRemoveControls } from "./visual-editing/AddRemoveControls";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const DEFAULT_FAQS = [
    { _key: "item-1", question: "What is your typical turnaround time?", answer: "Our standard turnaround for most projects is 2-4 weeks, depending on complexity. For expedited deliveries, we offer rush options upon request." },
    { _key: "item-2", question: "Do you offer revisions?", answer: "Absolutely. We include 3 rounds of revisions in our standard packages to ensure the final output aligns perfectly with your vision." },
    { _key: "item-3", question: "How does the payment structure work?", answer: "We typically require a 50% deposit to commence work, with the remaining 50% due upon final delivery. We also offer milestone-based payment plans for larger projects." },
    { _key: "item-4", question: "Can you help with strategy, not just production?", answer: "Yes. Strategy is at the core of what we do. We don't just make things look good; we ensure they perform by aligning creative with your business goals." },
    { _key: "item-5", question: "What assets do I need to provide?", answer: "It depends on the project. Generally, we'll need your brand guidelines, logo files, and any specific footage or copy you want included. We can handle the rest." },
];

type FAQContent = {
    label?: string;
    title?: string;
    highlightedWord?: string;
    items?: Array<{ _key: string; question?: string; answer?: string }>;
};

export const FAQ = ({ content }: { content?: FAQContent & { _documentId?: string; _sectionKey?: string } }) => {
    const documentId = content?._documentId;
    const sectionKey = content?._sectionKey;
    const { getLiveItems } = useVisualEditing();

    const label = content?.label ?? "Common Questions";
    const titleText = content?.title ?? "Everything you need to Know.";
    const highlightedWord = content?.highlightedWord ?? "Know.";

    const faqs = getLiveItems<any>(documentId || "", sectionKey ? `sections[_key == "${sectionKey}"].items` : "faqItems",
        (content?.items && content.items.length > 0 ? content.items : DEFAULT_FAQS)
    ).map((i: any, idx: number) => ({
        id: i._key || `item-${idx + 1}`,
        question: i.question ?? "",
        answer: i.answer ?? "",
    })).filter((f: any) => f.question);

    const sectionRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const accordionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headerRef.current,
                { y: 30, opacity: 0 },
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

            gsap.fromTo(accordionRef.current,
                { y: 30, opacity: 0 },
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
        <section ref={sectionRef} id="faq" className="py-12 md:py-16 px-6  relative font-satoshi">
            {/* Intense Digital Horizon & Nebula Design */}
            {/* ── Powerful Static Fractal Rift FAQ Background ── */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                {/* Digital Horizon (Top Edge) */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] md:w-[80%] h-[2px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent blur-[1px] z-10" />

                {/* Multi-layered Static Rifts */}
                <div className="absolute top-[10%] left-[-15%] w-[120%] h-[500px] bg-emerald-600/[0.08] blur-[160px] rounded-[100%] rotate-[-12deg] z-0" />
                <div className="absolute bottom-[-10%] right-[-15%] w-[100%] h-[400px] bg-lime-500/[0.06] blur-[140px] rounded-[100%] rotate-[18deg] z-0" />
                
                {/* Core Energy Radiance (Static) */}
                <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-emerald-400/[0.12] blur-[100px] rounded-full z-0" />

                {/* Subtle Grid Texture */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.015)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
            </div>

            {/* Fontshare Import */}
            <link href="https://api.fontshare.com/v2/css?f[]=satoshi@401&display=swap" rel="stylesheet" />

            {/* --- SEAMLESS MASK OVERLAYS (Disabled) --- */}

            {/* Background Logo Overlay with Masked Bottom */}
            <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none z-0"
                style={{
                    maskImage: 'radial-gradient(circle at center, black, transparent 80%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 80%)'
                }}
            >
                <img src="/Logo.png" alt="Matera Media Logo" className="w-[900px] h-auto object-contain" />
            </div>

            <div className="max-w-3xl mx-auto relative z-30">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-12">
                    <p className="text-emerald-400 font-medium tracking-widest uppercase text-[10px] mb-4">
                        {documentId ? (
                            <EditableText id={documentId} field="label" sectionKey={sectionKey} value={label} as="span" />
                        ) : label}
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight flex flex-wrap justify-center">
                        {documentId ? (
                            <EditableText id={documentId} field="title" sectionKey={sectionKey} value={titleText} />
                        ) : (
                            <>
                                {titleText.split(highlightedWord)[0]}
                                <span className="text-white/80 italic font-medium px-1">
                                    {highlightedWord}
                                </span>
                                {titleText.split(highlightedWord)[1] || ""}
                            </>
                        )}
                    </h2>
                    {documentId && (
                        <div className="flex justify-center mt-4">
                            <AddRemoveControls
                                id={documentId}
                                field={sectionKey ? `sections[_key == "${sectionKey}"].items` : "faqItems"}
                                label="FAQ Item"
                                fields={[
                                    { name: "question", label: "Question", type: "string", placeholder: "e.g. What is your typical turnaround time?" },
                                    { name: "answer", label: "Answer", type: "text", placeholder: "Enter the detailed answer here..." }
                                ]}
                            />
                        </div>
                    )}
                </div>

                {/* FAQ Accordion */}
                <div ref={accordionRef} className="bg-white/3 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq: any) => (
                            <AccordionItem key={faq.id} value={faq.id} className="border-white/10 last:border-b-0 group/faq">
                                <AccordionTrigger className="text-white hover:text-white/80 hover:no-underline text-lg font-medium text-left py-5 whitespace-pre-wrap">
                                    <div className="flex justify-between items-center gap-4 w-full pr-2">
                                        <span className="flex-1">
                                            {documentId ? (
                                                <EditableText
                                                    id={documentId}
                                                    field={`${sectionKey ? `sections[_key == "${sectionKey}"].` : ""}faqItems[_key == "${faq.id}"].question`}
                                                    value={faq.question}
                                                    as="span"
                                                />
                                            ) : faq.question}
                                        </span>
                                        {documentId && (
                                            <div className="opacity-0 group-hover/faq:opacity-100 transition-opacity" onClick={e => e.stopPropagation()}>
                                                <AddRemoveControls
                                                    id={documentId}
                                                    field={sectionKey ? `sections[_key == "${sectionKey}"].faqItems` : "faqItems"}
                                                    itemKey={faq.id}
                                                    label="FAQ Item"
                                                    initialData={faqs.find((f: any) => (f._key || f.id) === faq.id)}
                                                    fields={[
                                                        { name: "question", label: "Question", type: "string", placeholder: "e.g. What is your typical turnaround time?" },
                                                        { name: "answer", label: "Answer", type: "text", placeholder: "Enter the detailed answer here..." }
                                                    ]}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="text-white/40 font-normal leading-relaxed text-base pb-6 whitespace-pre-wrap">
                                    {documentId ? (
                                        <EditableText
                                            id={documentId}
                                            field={`${sectionKey ? `sections[_key == "${sectionKey}"].` : ""}faqItems[_key == "${faq.id}"].answer`}
                                            value={faq.answer}
                                        />
                                    ) : faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
};
