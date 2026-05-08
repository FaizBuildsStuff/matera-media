"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Star, Quote, ShieldCheck, Zap, ArrowUpRight } from 'lucide-react'
import { useVisualEditing } from "./visual-editing/VisualEditingProvider";
import { EditableText } from "./visual-editing/EditableText";
import { EditableImage } from "./visual-editing/EditableImage";
import { AddRemoveControls } from "./visual-editing/AddRemoveControls";
import { BorderBeam } from "@/components/ui/BorderBeam";

type Testimonial = {
    _key?: string
    name: string
    role: string
    image: string
    quote: string
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
    { _key: 'default-1', name: 'Sarah Chen', role: 'Head of Growth @ Flow', image: 'https://randomuser.me/api/portraits/women/1.jpg', quote: 'Honestly, I was skeptical at first, but Matera literally changed how we think about ad creative. We were burning cash on generic stuff, but their motion assets actually hit our target ROAS in the first week. It’s been a total game-changer for us.' },
    { _key: 'default-2', name: 'Marcus Webb', role: 'Brand Director @ Nexus', image: 'https://randomuser.me/api/portraits/men/1.jpg', quote: 'It’s so rare to find a team that just *gets* it. No fluff, no endless back-and-forth—just high-quality work that looks exactly like what we had in our heads. The attention to detail they put into every frame is honestly insane.' },
    { _key: 'default-3', name: 'Elena Rodriguez', role: 'Founder @ Aura', image: 'https://randomuser.me/api/portraits/women/2.jpg', quote: 'I finally feel like our brand matches the quality of our product. They didn’t just make a video; they built a visual identity that actually converts visitors into customers. If you’re scaling, you need these guys in your corner.' },
    { _key: 'default-4', name: 'David Park', role: 'CMO @ Enterprise', image: 'https://randomuser.me/api/portraits/men/2.jpg', quote: 'Our CAC dropped by 30% almost immediately after switching to Matera’s formats. They know exactly what stops the scroll. It’s not just about looking pretty; it’s about performance, and they deliver that every single time.' },
    { _key: 'default-5', name: 'Alexandra Foster', role: 'Creative Lead @ Studio', image: 'https://randomuser.me/api/portraits/women/3.jpg', quote: 'Finally, a partner who actually understands the balance between creativity and hard data. They’ve become an extension of our own team. I don’t even have to worry about our Q4 strategy anymore because I know they’ve got it.' },
    { _key: 'default-6', name: 'Sebastian G.', role: 'Entrepreneur', image: 'https://randomuser.me/api/portraits/men/3.jpg', quote: 'Worked with them on three different launches now and they’ve never missed. Every single project feels bespoke and high-impact. They don’t just follow a template; they actually think about what will work for your specific audience.' },
]

const chunkArray = (array: Testimonial[], chunkSize: number): Testimonial[][] => {
    const result: Testimonial[][] = []
    if (!array || !array.length || chunkSize <= 0) return result;
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize))
    }
    return result
}

export default function WallOfLoveSection({ content }: { content?: any }) {
    const [showAll, setShowAll] = useState(false);
    const documentId = content?._documentId;
    const sectionKey = content?._sectionKey;
    const { getLiveItems } = useVisualEditing();

    const label = content?.label ?? "Client Success";
    const title = content?.title ?? "Wall of Love";
    const description = content?.description ?? "Results-driven production for high-growth brands and world-class creators.";

    const originalTestimonials = content?.items && content.items.length > 0
        ? content.items
        : DEFAULT_TESTIMONIALS;

    const testimonialsData = getLiveItems<Testimonial>(documentId || "", sectionKey ? `sections[_key == "${sectionKey}"].items` : "items", originalTestimonials);
    const currentItems = showAll ? testimonialsData : testimonialsData.slice(0, 9);
    const chunkSize = Math.max(1, Math.ceil((currentItems?.length || 0) / 3));
    const testimonialChunks = chunkArray(currentItems, chunkSize);

    return (
        <section className="relative w-full py-12 md:py-16 px-6  font-satoshi">
            {/* --- RESTORED TECHNICAL BACKGROUND --- */}
            {/* Grid removed to connect sections */}
            {/* ── Powerful Static Fractal Rift Wall Background ── */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {/* Multi-layered Static Ambient Rifts */}
                <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[120%] h-[600px] bg-emerald-500/[0.08] blur-[160px] rounded-[100%] rotate-[-15deg] z-0" />
                <div className="absolute bottom-[10%] right-[-10%] w-[90%] h-[500px] bg-lime-400/[0.06] blur-[140px] rounded-[100%] rotate-[18deg] z-0" />

                {/* Secondary Static Sparks */}
                <div className="absolute top-[30%] left-[-10%] w-[400px] h-[400px] bg-emerald-600/[0.1] blur-[120px] rounded-full z-0" />

                {/* Global Textures */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
            </div>

            <div className="mx-auto max-w-6xl relative z-10">
                {/* --- HEADER --- */}
                <div className="flex flex-col items-center text-center mb-16">
                    <div className="flex items-center justify-center mb-5">
                        <span className="text-emerald-500 font-bold text-[10px] sm:text-[11px] tracking-[0.2em] uppercase">
                            {documentId ? (
                                <EditableText id={documentId} field="label" sectionKey={sectionKey} value={label} as="span" />
                            ) : label}
                        </span>
                    </div>

                    <div className="relative inline-block">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tighter italic leading-none">
                            {documentId ? (
                                <EditableText id={documentId} field="title" sectionKey={sectionKey} value={title} as="span" />
                            ) : title}
                        </h2>
                        {/* Decorative Crosshairs - Adjusted to be truly around the heading */}
                        <div className="absolute -top-2 -right-6 size-2 border-t-2 border-r-2 border-white/20 hidden md:block" />
                        <div className="absolute -bottom-2 -left-6 size-2 border-b-2 border-l-2 border-white/20 hidden md:block" />
                    </div>

                    <p className="text-white/20 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] max-w-xl mx-auto italic mt-2">
                        {documentId ? (
                            <EditableText id={documentId} field="description" sectionKey={sectionKey} value={description} />
                        ) : description}
                    </p>

                    {documentId && (
                        <div className="flex justify-center mt-6">
                            <AddRemoveControls
                                id={documentId}
                                field={sectionKey ? `sections[_key == "${sectionKey}"].items` : "items"}
                                label="Testimonial"
                                fields={[
                                    { name: "name", label: "Client Name", type: "string", placeholder: "e.g. Sarah Chen" },
                                    { name: "role", label: "Role/Title", type: "string", placeholder: "e.g. VP Marketing" },
                                    { name: "image", label: "Image URL", type: "string", placeholder: "https://..." },
                                    { name: "quote", label: "Testimonial Quote", type: "text", placeholder: "Enter the testimonial here..." }
                                ]}
                            />
                        </div>
                    )}
                </div>

                {/* --- GRID --- */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {testimonialChunks.map((chunk, chunkIndex) => (
                        <div
                            key={chunkIndex}
                            className={`flex flex-col gap-4 ${chunkIndex === 1 ? 'lg:translate-y-8' :
                                chunkIndex === 2 ? 'lg:translate-y-4' : ''
                                }`}
                        >
                            {chunk.map((testimonial: Testimonial, i: number) => {
                                const itemId = testimonial._key || `${chunkIndex}-${i}`;
                                const isFeatured = (chunkIndex + i) % 4 === 0;

                                return (
                                    <Card
                                        key={itemId}
                                        className={`group relative bg-emerald-950/20 border-white/5 rounded-[2rem] transition-all duration-500 hover:scale-[1.01] overflow-hidden backdrop-blur-md will-change-transform ${isFeatured ? 'border-emerald-500/20' : ''
                                            }`}
                                    >
                                        <BorderBeam
                                            size={250}
                                            duration={20}
                                            delay={i * 2}
                                            colorFrom="#00ffcc"
                                            colorTo="#33ff00"
                                            className="opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                                        />

                                        <CardContent className="p-6 md:p-8 relative z-10">
                                            {documentId && (
                                                <div className="absolute top-3 right-3 z-40 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                                                    <AddRemoveControls
                                                        id={documentId}
                                                        field={sectionKey ? `sections[_key == "${sectionKey}"].items` : "items"}
                                                        itemKey={testimonial._key}
                                                        label="Testimonial"
                                                        initialData={testimonial}
                                                        fields={[
                                                            { name: "name", label: "Client Name", type: "string", placeholder: "e.g. Sarah Chen" },
                                                            { name: "role", label: "Role/Title", type: "string", placeholder: "e.g. VP Marketing" },
                                                            { name: "image", label: "Image URL", type: "string", placeholder: "https://..." },
                                                            { name: "quote", label: "Testimonial Quote", type: "text", placeholder: "Enter the testimonial here..." }
                                                        ]}
                                                    />
                                                </div>
                                            )}

                                            {/* --- AUTHOR --- */}
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="size-10 rounded-full overflow-hidden border border-emerald-500/20 group-hover:border-emerald-500/50 transition-colors p-0.5 bg-emerald-500/5">
                                                    {documentId ? (
                                                        <EditableImage
                                                            id={documentId}
                                                            field={`${sectionKey ? `sections[_key == "${sectionKey}"].` : ""}items[_key == "${itemId}"].image`}
                                                            value={testimonial.image}
                                                            className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-700"
                                                            alt={testimonial.name}
                                                        />
                                                    ) : (
                                                        <Avatar className="size-full">
                                                            <AvatarImage src={testimonial.image} alt={testimonial.name} className="grayscale hover:grayscale-0 transition-all duration-700" />
                                                            <AvatarFallback className="bg-emerald-500 text-white text-[9px] font-black">
                                                                {testimonial.name.slice(0, 2).toUpperCase()}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                    )}
                                                </div>
                                                <div className="flex flex-col">
                                                    <h3 className="font-black text-emerald-50 text-xs tracking-tight uppercase leading-none mb-1 group-hover:text-white transition-colors">
                                                        {documentId ? (
                                                            <EditableText
                                                                id={documentId}
                                                                field={`${sectionKey ? `sections[_key == "${sectionKey}"].` : ""}items[_key == "${itemId}"].name`}
                                                                value={testimonial.name}
                                                                as="span"
                                                            />
                                                        ) : testimonial.name}
                                                    </h3>
                                                    <span className="text-emerald-500/40 text-[9px] font-bold uppercase tracking-widest group-hover:text-emerald-400 transition-colors">
                                                        {documentId ? (
                                                            <EditableText
                                                                id={documentId}
                                                                field={`${sectionKey ? `sections[_key == "${sectionKey}"].` : ""}items[_key == "${itemId}"].role`}
                                                                value={testimonial.role}
                                                                as="span"
                                                            />
                                                        ) : testimonial.role}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Stars removed for cleaner aesthetic */}

                                            <div className="text-emerald-50/70 text-[13px] md:text-sm leading-relaxed font-medium tracking-tight italic group-hover:text-white transition-colors duration-500">
                                                {documentId ? (
                                                    <EditableText
                                                        id={documentId}
                                                        field={`${sectionKey ? `sections[_key == "${sectionKey}"].` : ""}items[_key == "${itemId}"].quote`}
                                                        value={testimonial.quote}
                                                    />
                                                ) : (
                                                    `"${testimonial.quote}"`
                                                )}
                                            </div>

                                            <div className="relative mt-2" />
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    ))}
                </div>

                {/* --- SHOW MORE --- */}
                {!showAll && testimonialsData.length > 9 && (
                    <div className="mt-20 text-center relative z-20">
                        <button
                            onClick={() => setShowAll(true)}
                            className="px-8 py-3 rounded-full border border-white/10 bg-[#0a2313]/40 text-white font-black text-[10px] hover:bg-white text-black hover:text-black transition-all duration-300 uppercase tracking-[0.2em] backdrop-blur-md"
                        >
                            Expand Wall
                        </button>
                    </div>
                )}
            </div>

            {/* Fades disabled to allow glow bleed */}
        </section>
    );
}
