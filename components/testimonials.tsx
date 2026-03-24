"use client";



import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { Card, CardContent } from '@/components/ui/card'

import { Star } from 'lucide-react'



type Testimonial = {

    _key?: string

    name: string

    role: string

    image: string

    quote: string

}



const DEFAULT_TESTIMONIALS: Testimonial[] = [

    { name: 'Sarah Chen', role: 'VP Marketing', image: 'https://randomuser.me/api/portraits/women/1.jpg', quote: 'Matera Media transformed our ad creative. Our motion ads drove 3x higher CTR.' },

    { name: 'Marcus Webb', role: 'Head of Brand', image: 'https://randomuser.me/api/portraits/men/1.jpg', quote: 'From concept to launch, the team understood our vision perfectly.' },

    { name: 'Elena Rodriguez', role: 'Creator', image: 'https://randomuser.me/api/portraits/women/2.jpg', quote: 'Their production quality and understanding of what converts made the difference.' },

    { name: 'David Park', role: 'CMO, Enterprise', image: 'https://randomuser.me/api/portraits/men/2.jpg', quote: 'Our CAC dropped 25% after we switched to their formats. Unmatched performance.' },

    { name: 'Alexandra Foster', role: 'Director', image: 'https://randomuser.me/api/portraits/women/3.jpg', quote: 'Finally, a partner who gets both creativity and performance. Game-changer.' },

    { name: 'Sebastian G.', role: 'Entrepreneur', image: 'https://randomuser.me/api/portraits/men/3.jpg', quote: 'Worked with the squad a few times—never missed. Every drop felt bespoke.' },

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
    // 1. Dynamic Data from Sanity with Fallbacks
    const label = content?.label ?? "Client Success";
    const title = content?.title ?? "Trusted by Brands and Creators";
    const description = content?.description ?? "Results-driven production for high-growth B2B brands and creators.";

    // Use Sanity items if they exist, otherwise use defaults
    const testimonialsData = content?.items && content.items.length > 0
        ? content.items
        : DEFAULT_TESTIMONIALS;

    const testimonialChunks = chunkArray(testimonialsData, Math.ceil(testimonialsData.length / 3));




    return (

        <section className="relative w-full py-24 px-6 bg-[#05180D] overflow-hidden font-satoshi">

            <div className="mx-auto max-w-5xl relative z-10">



                {/* --- MINIMALIST HEADER --- */}

                <div className="text-center mb-16">

                    <div className="inline-flex items-center px-2 py-0.5 rounded-full border border-white/10 bg-white/5 mb-4">

                        <span className="text-[8px] uppercase tracking-[0.4em] text-white/30 font-black">

                            Client Success

                        </span>

                    </div>



                    <h2 className="text-3xl md:text-5xl font-black text-white mb-3 tracking-tighter">

                        {title}

                    </h2>



                    <p className="text-white/20 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] italic max-w-2xl mx-auto">

                        {description}

                    </p>

                </div>



                {/* --- CLEAN GRID --- */}

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

                    {testimonialChunks.map((chunk, chunkIndex) => (

                        <div key={chunkIndex} className={`space-y-3 ${chunkIndex === 1 ? 'lg:pt-6' : ''}`}>

                            {chunk.map(({ name, role, quote, image, _key }, index: number) => (

                                <Card

                                    key={_key || `${chunkIndex}-${index}`}

                                    className="bg-white/[0.01] border border-white/[0.04] backdrop-blur-md hover:border-white/20 transition-all duration-700 rounded-xl group shadow-none overflow-hidden relative"

                                >

                                    <CardContent className="p-6 relative z-10">

                                        <div className="flex gap-1 mb-4">

                                            {[...Array(5)].map((_, i) => (

                                                <Star key={i} className="size-3 text-white fill-white opacity-40 group-hover:opacity-80 transition-opacity" />

                                            ))}

                                        </div>



                                        <p className="text-white/60 text-[13px] leading-relaxed mb-6 font-medium tracking-tight">

                                            "{quote}"

                                        </p>



                                        <div className="flex items-center gap-2 pt-4 border-t border-white/[0.03]">

                                            <Avatar className="size-7 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">

                                                <AvatarImage src={image} alt={name} />

                                                <AvatarFallback className="text-[8px] font-bold">{name ? name[0] : '?'}</AvatarFallback>

                                            </Avatar>



                                            <div className="flex flex-col">

                                                <h3 className="font-black text-white text-[10px] tracking-tight uppercase">{name}</h3>

                                                <span className="text-emerald-400/40 text-[8px] font-bold uppercase tracking-widest mt-0.5">

                                                    {role}

                                                </span>

                                            </div>

                                        </div>

                                    </CardContent>

                                </Card>

                            ))}

                        </div>

                    ))}

                </div>

            </div>

            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#05180D] to-transparent pointer-events-none z-20" />

        </section>

    );

}