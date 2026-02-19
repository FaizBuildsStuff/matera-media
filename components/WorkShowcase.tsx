"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Play } from "lucide-react";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface WorkItem {
    id: string;
    title: string;
    category: string;
    tags: string[];
    image?: string;
}

const DEFAULT_WORKS: WorkItem[] = [
    { id: "1", title: "Luma Interface", category: "Product Design", tags: ["UI/UX", "Motion"] },
    { id: "2", title: "Apex Finance", category: "Brand Identiy", tags: ["Branding", "Strategy"] },
    { id: "3", title: "Nvidia Reveal", category: "Commercial", tags: ["3D Animation", "VFX"] },
    { id: "4", title: "Flow State", category: "Art Direction", tags: ["Concept", "Visuals"] },
];

type WorkShowcaseContent = {
    title?: string;
    highlightedWord?: string;
    description?: string;
    items?: Array<{ _key: string; title?: string; category?: string; tags?: string[]; image?: string }>;
};

export const WorkShowcase = ({ content }: { content?: WorkShowcaseContent }) => {
    const title = content?.title ?? "Selected";
    const highlightedWord = content?.highlightedWord ?? "Works";
    const description = content?.description ?? "A curated selection of projects that define our approach to digital storytelling and visual excellence.";
    const works: WorkItem[] = (content?.items && content.items.length > 0
        ? content.items.map((i, idx) => ({
            id: i._key || String(idx),
            title: i.title ?? "",
            category: i.category ?? "",
            tags: i.tags ?? [],
            image: i.image,
          }))
        : DEFAULT_WORKS
    ).filter((w) => w.title);
    const sectionRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

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

            // Grid Items Animation
            const items = gridRef.current?.querySelectorAll(".work-item");
            if (items) {
                gsap.fromTo(items,
                    { y: 60, opacity: 0, scale: 0.95 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: gridRef.current,
                            start: "top 80%",
                        }
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="work" className="py-32 px-6 bg-[#05180D] relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-900/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -left-20 top-40 opacity-[0.03] pointer-events-none select-none">
                <img src="/Logo.png" alt="Matera Media Logo" className="w-[600px] h-auto object-contain" />
            </div>

            <div className="max-w-7xl mx-auto">
                <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-instrument-sans font-medium text-white mb-4">
                            {title} <span className="font-instrument-serif italic text-emerald-400">{highlightedWord}</span>
                        </h2>
                        <p className="text-white/60 max-w-md font-light">
                            {description}
                        </p>
                    </div>
                </div>

                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {works.map((work) => (
                        <div key={work.id} className="work-item group cursor-pointer">
                            {/* Card Media */}
                            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-white/5 border border-white/10 mb-6 transition-all duration-500 group-hover:border-white/20 group-hover:shadow-2xl group-hover:shadow-emerald-900/20">

                                <div className="absolute inset-0 bg-[#0A2215]/50 group-hover:bg-[#0A2215]/30 transition-colors duration-500" />

                                {/* Placeholder Content/Pattern */}
                                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent" />

                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center scale-90 group-hover:scale-100 transition-transform duration-500 delay-100">
                                        <Play className="w-6 h-6 text-white fill-white ml-1" />
                                    </div>
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-2xl text-white font-medium mb-2 group-hover:text-emerald-400 transition-colors duration-300">
                                        {work.title}
                                    </h3>
                                    <p className="text-white/50 text-sm mb-3">{work.category}</p>
                                </div>
                                <div className="flex flex-wrap gap-2 justify-end max-w-[50%]">
                                    {work.tags.map((tag) => (
                                        <Badge
                                            key={tag}
                                            variant="secondary"
                                            className="bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border-white/5 transition-all text-[10px] tracking-wide uppercase px-2 py-0.5"
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
