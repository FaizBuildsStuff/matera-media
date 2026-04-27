"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'
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
    { _key: 'default-1', name: 'Sarah Chen', role: 'VP Marketing', image: 'https://randomuser.me/api/portraits/women/1.jpg', quote: 'Matera Media transformed our ad creative. Our motion ads drove 3x higher CTR.' },
    { _key: 'default-2', name: 'Marcus Webb', role: 'Head of Brand', image: 'https://randomuser.me/api/portraits/men/1.jpg', quote: 'From concept to launch, the team understood our vision perfectly.' },
    { _key: 'default-3', name: 'Elena Rodriguez', role: 'Creator', image: 'https://randomuser.me/api/portraits/women/2.jpg', quote: 'Their production quality and understanding of what converts made the difference.' },
    { _key: 'default-4', name: 'David Park', role: 'CMO, Enterprise', image: 'https://randomuser.me/api/portraits/men/2.jpg', quote: 'Our CAC dropped 25% after we switched to their formats. Unmatched performance.' },
    { _key: 'default-5', name: 'Alexandra Foster', role: 'Director', image: 'https://randomuser.me/api/portraits/women/3.jpg', quote: 'Finally, a partner who gets both creativity and performance. Game-changer.' },
    { _key: 'default-6', name: 'Sebastian G.', role: 'Entrepreneur', image: 'https://randomuser.me/api/portraits/men/3.jpg', quote: 'Worked with the squad a few times—never missed. Every drop felt bespoke.' },
]


const chunkArray = (array: Testimonial[], chunkSize: number): Testimonial[][] => {
    const result: Testimonial[][] = []
    if (!array || !array.length) return result;
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize))
    }
    return result
}

export default function WallOfLoveSection({ content }: { content?: any }) {
    const documentId = content?._documentId;
    const sectionKey = content?._sectionKey;
    const { getLiveItems } = useVisualEditing();

    // 1. Dynamic Data from Sanity with Fallbacks
    const label = content?.label ?? "Client Success";
    const title = content?.title ?? "Trusted by Brands and Creators";
    const description = content?.description ?? "Results-driven production for high-growth B2B brands and creators.";

    // Use Sanity items if they exist, otherwise use defaults
    const originalTestimonials = content?.items && content.items.length > 0
        ? content.items
        : DEFAULT_TESTIMONIALS;

    const testimonialsData = getLiveItems<Testimonial>(documentId || "", sectionKey ? `sections[_key == "${sectionKey}"].items` : "items", originalTestimonials);

    const testimonialChunks = chunkArray(testimonialsData, Math.ceil(testimonialsData.length / 3));

    return (
        <section className="relative w-full py-24 px-6 bg-[#05180D] overflow-hidden font-satoshi">
            <div className="mx-auto max-w-5xl relative z-10">
                {/* --- MINIMALIST HEADER --- */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 mb-5">
                        <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#00ff66] font-bold">
                            {documentId ? (
                                <EditableText id={documentId} field="label" sectionKey={sectionKey} value={label} as="span" />
                            ) : (
                                label
                            )}
                        </span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-black text-white mb-3 tracking-tighter">
                        {documentId ? (
                            <EditableText id={documentId} field="title" sectionKey={sectionKey} value={title} as="span" />
                        ) : (
                            title
                        )}
                    </h2>

                    <div className="text-white/20 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] italic max-w-2xl mx-auto">
                        {documentId ? (
                            <EditableText id={documentId} field="description" sectionKey={sectionKey} value={description} />
                        ) : (
                            description
                        )}
                    </div>

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

                {/* --- CLEAN GRID --- */}
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {testimonialChunks.map((chunk, chunkIndex) => (
                        <div key={chunkIndex} className={`space-y-5 ${chunkIndex === 1 ? 'lg:pt-6' : ''}`}>
                            {chunk.map((testimonial: Testimonial, i: number) => {
                                const itemId = testimonial._key || `${chunkIndex}-${i}`;
                                return (
                                    <Card key={itemId} className="bg-white/1 border-white/4 rounded-[2rem] transition-all duration-500 hover:border-emerald-500/20 group">
                                        <CardContent className="p-8">
                                            {documentId && (
                                                <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
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
                                            <div className="flex gap-1 mb-4">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className="size-3 text-white fill-white opacity-40 group-hover:opacity-80 transition-opacity" />
                                                ))}
                                            </div>

                                            <div className="text-white/90 text-sm md:text-[15px] leading-relaxed mb-6 font-medium tracking-tight italic">
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

                                            <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                                                <div className="size-10 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
                                                    {documentId ? (
                                                        <EditableImage 
                                                            id={documentId} 
                                                            field={`${sectionKey ? `sections[_key == "${sectionKey}"].` : ""}items[_key == "${itemId}"].image`} 
                                                            value={testimonial.image} 
                                                            className="rounded-full w-full h-full object-cover"
                                                            alt={testimonial.name}
                                                        />
                                                    ) : (
                                                        <Avatar className="size-10">
                                                            <AvatarImage src={testimonial.image} alt={testimonial.name} />
                                                            <AvatarFallback className="bg-emerald-500 text-black text-xs font-black">
                                                                {testimonial.name.slice(0, 2).toUpperCase()}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                    )}
                                                </div>

                                                <div className="flex flex-col">
                                                    <h3 className="font-black text-white text-xs tracking-tight uppercase">
                                                        {documentId ? (
                                                            <EditableText 
                                                                id={documentId} 
                                                                field={`${sectionKey ? `sections[_key == "${sectionKey}"].` : ""}items[_key == "${itemId}"].name`} 
                                                                value={testimonial.name} 
                                                                as="span" 
                                                            />
                                                        ) : testimonial.name}
                                                    </h3>
                                                    <span className="text-emerald-400/80 text-[10px] font-bold uppercase tracking-widest mt-0.5">
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
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    ))}
                    {documentId && (
                        <div className="flex items-center justify-center h-full min-h-[300px]">
                            <div className="w-full h-full flex flex-col items-center justify-center gap-4 rounded-[2rem] border-2 border-dashed border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 hover:border-emerald-500/40 transition-all group/big-add p-12">
                                <AddRemoveControls
                                    id={documentId}
                                    field={sectionKey ? `sections[_key == "${sectionKey}"].items` : "items"}
                                    label="Testimonial"
                                    className="scale-150"
                                    fields={[
                                        { name: "name", label: "Client Name", type: "string", placeholder: "e.g. Sarah Chen" },
                                        { name: "role", label: "Role/Title", type: "string", placeholder: "e.g. VP Marketing" },
                                        { name: "image", label: "Image URL", type: "string", placeholder: "https://..." },
                                        { name: "quote", label: "Testimonial Quote", type: "text", placeholder: "Enter the testimonial here..." }
                                    ]}
                                />
                                <span className="text-emerald-400 font-bold uppercase tracking-widest text-xs opacity-40 group-hover/big-add:opacity-100 transition-opacity text-center">
                                    Add New Success Story
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="absolute top-0 left-0 w-full h-40 bg-linear-to-b from-[#05180D] via-[#05180D] to-transparent z-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-40 bg-linear-to-t from-[#05180D] via-[#05180D] to-transparent z-20 pointer-events-none" />
        </section>
    );
}
