"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Star, Quote, ShieldCheck, Zap, ArrowUpRight } from 'lucide-react'
import { useVisualEditing } from "./visual-editing/VisualEditingProvider";
import { EditableText } from "./visual-editing/EditableText";
import { EditableImage } from "./visual-editing/EditableImage";
import { AddRemoveControls } from "./visual-editing/AddRemoveControls";

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
        <section className="relative w-full py-20 px-6 bg-[#05180D] overflow-hidden font-satoshi">
            {/* --- RESTORED TECHNICAL BACKGROUND --- */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
                 style={{ 
                   backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                 }} 
            />
            <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full animate-pulse pointer-events-none" />
            <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-emerald-400/5 blur-[150px] rounded-full animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />

            <div className="mx-auto max-w-6xl relative z-10">
                {/* --- HEADER --- */}
                <div className="flex flex-col items-center text-center mb-16">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 mb-5 backdrop-blur-md">
                        <Zap size={10} className="text-emerald-500" />
                        <span className="text-[9px] uppercase tracking-[0.3em] text-emerald-500 font-black">
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
                        <div className="absolute -top-2 -right-6 size-2 border-t-2 border-r-2 border-emerald-500/30 hidden md:block" />
                        <div className="absolute -bottom-2 -left-6 size-2 border-b-2 border-l-2 border-emerald-500/30 hidden md:block" />
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
                            className={`flex flex-col gap-4 ${
                                chunkIndex === 1 ? 'lg:translate-y-8' : 
                                chunkIndex === 2 ? 'lg:translate-y-4' : ''
                            }`}
                        >
                            {chunk.map((testimonial: Testimonial, i: number) => {
                                const itemId = testimonial._key || `${chunkIndex}-${i}`;
                                const isFeatured = (chunkIndex + i) % 4 === 0;
                                
                                return (
                                    <Card 
                                        key={itemId} 
                                        className={`group relative bg-[#0a2313]/30 border-white/5 rounded-[1.5rem] transition-all duration-700 hover:scale-[1.01] hover:-rotate-0.5 hover:border-emerald-500/30 overflow-hidden backdrop-blur-sm ${
                                            isFeatured ? 'border-emerald-500/10' : ''
                                        }`}
                                    >
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
                                                <div className="size-9 rounded-full overflow-hidden border border-white/10 group-hover:border-emerald-500/40 transition-colors p-0.5">
                                                    {documentId ? (
                                                        <EditableImage 
                                                            id={documentId} 
                                                            field={`${sectionKey ? `sections[_key == "${sectionKey}"].` : ""}items[_key == "${itemId}"].image`} 
                                                            value={testimonial.image} 
                                                            className="w-full h-full object-cover rounded-full"
                                                            alt={testimonial.name}
                                                        />
                                                    ) : (
                                                        <Avatar className="size-full">
                                                            <AvatarImage src={testimonial.image} alt={testimonial.name} />
                                                            <AvatarFallback className="bg-emerald-500 text-black text-[9px] font-black">
                                                                {testimonial.name.slice(0, 2).toUpperCase()}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                    )}
                                                </div>
                                                <div className="flex flex-col">
                                                    <h3 className="font-black text-white text-xs tracking-tight uppercase leading-none mb-1">
                                                        {documentId ? (
                                                            <EditableText 
                                                                id={documentId} 
                                                                field={`${sectionKey ? `sections[_key == "${sectionKey}"].` : ""}items[_key == "${itemId}"].name`} 
                                                                value={testimonial.name} 
                                                                as="span" 
                                                            />
                                                        ) : testimonial.name}
                                                    </h3>
                                                    <span className="text-white/30 text-[9px] font-bold uppercase tracking-widest">
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

                                            {/* --- STARS --- */}
                                            <div className="flex gap-1 mb-4">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className="size-2.5 text-emerald-500 fill-emerald-500 opacity-60" />
                                                ))}
                                            </div>

                                            <div className="text-white/70 text-[13px] md:text-sm leading-relaxed font-medium tracking-tight italic">
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
                            className="px-8 py-3 rounded-full border border-white/10 bg-[#0a2313]/40 text-white font-black text-[10px] hover:bg-emerald-500 hover:text-black transition-all duration-300 uppercase tracking-[0.2em] backdrop-blur-md"
                        >
                            Expand Wall
                        </button>
                    </div>
                )}
            </div>

            {/* Fades */}
            <div className="absolute top-0 left-0 w-full h-40 bg-linear-to-b from-[#05180D] to-transparent z-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-40 bg-linear-to-t from-[#05180D] to-transparent z-20 pointer-events-none" />
        </section>
    );
}
