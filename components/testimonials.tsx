"use client";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'

type Testimonial = {
    name: string
    role: string
    image: string
    quote: string
}

const testimonials: Testimonial[] = [
    {
        name: 'Sarah Chen',
        role: 'VP Marketing, B2B SaaS',
        image: 'https://randomuser.me/api/portraits/women/1.jpg',
        quote: 'Matera Media transformed our ad creative. Our motion ads drove 3x higher CTR and we saw real revenue impact in the first quarter. Their strategic approach to B2B content is unmatched.',
    },
    {
        name: 'Marcus Webb',
        role: 'Head of Brand, Tech Startup',
        image: 'https://randomuser.me/api/portraits/men/1.jpg',
        quote: 'From concept to launch, the team understood our vision. The organic content strategy they built helped us grow our audience by 40% in six months. Highly recommend.',
    },
    {
        name: 'Elena Rodriguez',
        role: 'Creator & YouTuber',
        image: 'https://randomuser.me/api/portraits/women/2.jpg',
        quote: 'Matera Media helped me level up my YouTube presence. Their production quality and understanding of what converts made all the difference. My channel has never looked better.',
    },
    {
        name: 'David Park',
        role: 'CMO, Enterprise',
        image: 'https://randomuser.me/api/portraits/men/2.jpg',
        quote: 'We\'ve worked with many agencies. Matera Media stands out for their motion ad creatives—they convert. Our CAC dropped 25% after we switched to their ad formats.',
    },
    {
        name: 'Alexandra Foster',
        role: 'Content Director',
        image: 'https://randomuser.me/api/portraits/women/3.jpg',
        quote: 'Finally, a partner who gets both creativity and performance. Their organic content doesn\'t just look good—it drives actual pipeline and revenue. Game-changer for our brand.',
    },
]

const chunkArray = (array: Testimonial[], chunkSize: number): Testimonial[][] => {
    const result: Testimonial[][] = []
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize))
    }
    return result
}

const testimonialChunks = chunkArray(testimonials, Math.ceil(testimonials.length / 3))

export default function WallOfLoveSection() {
    return (
        <section className="py-32 px-6 bg-[#05180D] relative overflow-hidden" style={{ fontFamily: "'Satoshi', sans-serif" }}>
            
            {/* Grain Texture */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            
            <div className="mx-auto max-w-6xl relative z-10">
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                        <span className="text-[10px] uppercase tracking-[0.25em] text-emerald-400 font-bold">Client Success</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-medium text-white mb-6 tracking-tight">
                        Trusted by industry leaders
                    </h2>
                    <p className="text-white/60 max-w-xl mx-auto font-medium leading-relaxed uppercase text-[11px] tracking-widest">
                        Results-driven production for high-growth B2B brands and creators.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {testimonialChunks.map((chunk, chunkIndex) => (
                        <div key={chunkIndex} className={`space-y-6 ${chunkIndex === 1 ? 'lg:pt-12' : ''}`}>
                            {chunk.map(({ name, role, quote, image }, index: number) => (
                                <Card
                                    key={index}
                                    className="bg-white/[0.03] border border-white/[0.1] backdrop-blur-2xl hover:border-emerald-500/40 hover:bg-white/[0.05] transition-all duration-500 rounded-2xl group shadow-2xl"
                                >
                                    <CardContent className="p-8">
                                        {/* Star Rating System */}
                                        <div className="flex gap-1 mb-6">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="size-3 fill-emerald-400 text-emerald-400" />
                                            ))}
                                        </div>

                                        <div className="mb-8">
                                            <p className="text-white/90 font-medium text-[15px] leading-relaxed tracking-wide italic">
                                                "{quote}"
                                            </p>
                                        </div>
                                        
                                        <div className="flex items-center gap-4 border-t border-white/[0.08] pt-6">
                                            <Avatar className="size-11 border border-white/10 transition-all duration-500 group-hover:scale-105">
                                                <AvatarImage alt={name} src={image} />
                                                <AvatarFallback className="bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                                                    {name.split(' ').map(n => n[0]).join('')}
                                                </AvatarFallback>
                                            </Avatar>

                                            <div className="flex flex-col">
                                                <h3 className="font-bold text-white text-[13px] uppercase tracking-wider">{name}</h3>
                                                {/* Sharper, non-blurred role text */}
                                                <span className="text-emerald-400/90 block text-[10px] font-bold uppercase tracking-wider mt-0.5">
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

            {/* Subtle Gradient Fade for Section Merging */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#05180D] to-transparent pointer-events-none" />
        </section>
    )
}