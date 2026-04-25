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
import { EditableText } from "./visual-editing/EditableText";
import { AddRemoveControls } from "./visual-editing/AddRemoveControls";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const DEFAULT_FAQS = [
    { id: "item-1", question: "What is your typical turnaround time?", answer: "Our standard turnaround for most projects is 2-4 weeks, depending on complexity. For expedited deliveries, we offer rush options upon request." },
    { id: "item-2", question: "Do you offer revisions?", answer: "Absolutely. We include 3 rounds of revisions in our standard packages to ensure the final output aligns perfectly with your vision." },
    { id: "item-3", question: "How does the payment structure work?", answer: "We typically require a 50% deposit to commence work, with the remaining 50% due upon final delivery. We also offer milestone-based payment plans for larger projects." },
    { id: "item-4", question: "Can you help with strategy, not just production?", answer: "Yes. Strategy is at the core of what we do. We don't just make things look good; we ensure they perform by aligning creative with your business goals." },
    { id: "item-5", question: "What assets do I need to provide?", answer: "It depends on the project. Generally, we'll need your brand guidelines, logo files, and any specific footage or copy you want included. We can handle the rest." },
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

    const label = content?.label ?? "Common Questions";
    const titleText = content?.title ?? "Everything you need to Know.";
    const highlightedWord = content?.highlightedWord ?? "Know.";
    const faqs = (content?.items && content.items.length > 0
        ? content.items.map((i, idx) => ({
            id: i._key || `item-${idx + 1}`,
            question: i.question ?? "",
            answer: i.answer ?? "",
        }))
        : DEFAULT_FAQS
    ).filter((f) => f.question);

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
        <section ref={sectionRef} id="faq" className="py-20 px-6 bg-[#05180D] relative overflow-hidden font-satoshi">
            {/* Fontshare Import */}
            <link href="https://api.fontshare.com/v2/css?f[]=satoshi@401&display=swap" rel="stylesheet" />

            {/* --- SEAMLESS MASK OVERLAYS (Tightened) --- */}
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#05180D] to-transparent z-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#05180D] to-transparent z-20 pointer-events-none" />

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
                                <span className="text-emerald-400 italic font-medium px-1">
                                    {highlightedWord}
                                </span>
                                {titleText.split(highlightedWord)[1] || ""}
                            </>
                        )}
                    </h2>
                    {documentId && (
                        <div className="flex justify-center mt-4">
                            <AddRemoveControls id={documentId} field={sectionKey ? `sections[_key == "${sectionKey}"].items` : "faqItems"} label="FAQ Item" />
                        </div>
                    )}
                </div>

                {/* FAQ Accordion */}
                <div ref={accordionRef} className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq) => (
                            <AccordionItem key={faq.id} value={faq.id} className="border-white/10 last:border-b-0 group/faq">
                                <AccordionTrigger className="text-white hover:text-emerald-400 hover:no-underline text-lg font-medium text-left py-5 whitespace-pre-wrap">
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